import {InfiniteQueryUpdaterMeta, updateDataResult, updateInfiteDataResult} from "./queryUtils"
import {AnyResponseData, RequestError, Response, ResponseResult} from "./requestTypes"
import {getDataResult} from "./requestUtils"
import {useCallback} from "react"
import {InfiniteData, QueryKey, useQueryClient} from "react-query"

export type KeyProvider<TVariables> = QueryKey | ((variables: TVariables) => QueryKey)

export type QueryCacheUpdaterOptions = {
  defaultOnError?: (error: RequestError) => void
}

export const useQueryCacheUpdater = <
  TVariables,
  TCachedData extends AnyResponseData,
  TData extends AnyResponseData = unknown,
>(
  keyProvider: KeyProvider<TVariables>,
  {defaultOnError}: QueryCacheUpdaterOptions = {},
) => {
  const getKey = useCallback(
    (variables: TVariables) => (typeof keyProvider === "function" ? keyProvider(variables) : keyProvider),
    [keyProvider],
  )

  const client = useQueryClient()

  const getCachedData = useCallback(
    (variables: TVariables): ResponseResult<TCachedData> | undefined => {
      const key = getKey(variables)
      return getDataResult(client.getQueryData<TCachedData | Response<TCachedData>>(key))
    },
    [client, getKey],
  )

  const updateCachedData = useCallback(
    (variables: TVariables, updater: (data: ResponseResult<TCachedData>) => ResponseResult<TCachedData>) => {
      const key = getKey(variables)
      const old_data = client.getQueryData<TCachedData | Response<TCachedData>>(key)
      let new_data: TCachedData | Response<TCachedData> | undefined = undefined
      if (old_data) {
        new_data = updateDataResult<TCachedData>(old_data as any, result => updater(result))
        client.setQueryData(key, new_data)
      }
      return {
        old_data,
        new_data,
      }
    },
    [client, getKey],
  )

  const updateCachedInfiniteData = useCallback(
    (
      variables: TVariables,
      updater: (data: ResponseResult<TCachedData>, meta: InfiniteQueryUpdaterMeta) => ResponseResult<TCachedData>,
    ) => {
      const key = getKey(variables)
      const old_data = client.getQueryData<InfiniteData<TCachedData | Response<TCachedData>>>(key)
      let new_data: InfiniteData<TCachedData | Response<TCachedData>> | undefined = undefined
      if (old_data) {
        new_data = updateInfiteDataResult<TCachedData>(old_data as any, (result, meta) => updater(result, meta))
        client.setQueryData(key, new_data)
      }
      return {
        old_data,
        new_data,
      }
    },
    [client, getKey],
  )

  const onOptimisticUpdateError = useCallback(
    <TContext>(error: any, variables: TVariables, context: TContext) => {
      const key = getKey(variables)
      client.setQueryData(key, context)
      if (defaultOnError && error) {
        defaultOnError(error)
      }
    },
    [client, getKey, defaultOnError],
  )

  const onUpdateSettled = useCallback(
    (data: TData, error: any, variables: TVariables) => {
      const key = getKey(variables)
      client.invalidateQueries(key)
    },
    [getKey, client],
  )

  return {
    getKey,
    getCachedData,
    updateCachedData,
    updateCachedInfiniteData,
    onOptimisticUpdateMutateGenerator: useCallback(
      (updater: (input: ResponseResult<TCachedData>, variables: TVariables) => ResponseResult<TCachedData>) =>
        async (variables: TVariables) => {
          await client.cancelQueries(getKey(variables))
          const update_result = updateCachedData(variables, data => updater(data, variables))
          return update_result.old_data
        },
      [updateCachedData, client, getKey],
    ),
    onOptimisticUpdateError,
    onUpdateSettled,
  }
}
