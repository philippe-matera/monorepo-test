import {DefaultOptions, InfiniteData} from "react-query"

/* eslint-disable no-redeclare */
import {Response, AnyResponseData, PaginatedResponseData, ResponseData, ResponseResult} from "./requestTypes"
import {
  checkIsArrayResponseData,
  checkIsPaginatedResponseData,
  checkIsResponse,
  checkIsResponseData,
  getDataResult,
} from "./requestUtils"

type integer = number

export const getPaginatedResponseNextPageParam = (last_page: any) => {
  const data = checkIsResponse(last_page) ? last_page.data : last_page
  if (data && checkIsPaginatedResponseData(data)) {
    return data.meta.has_next_page
      ? {
          after: data.meta.end_cursor,
        }
      : undefined
  }
}

export const getPaginatedResponsePreviousPageParam = (last_page: any) => {
  const data = checkIsResponse(last_page) ? last_page.data : last_page
  if (data && checkIsPaginatedResponseData(data)) {
    return data.meta.has_previous_page
      ? {
          before: data.meta.start_cursor,
        }
      : undefined
  }
}

export const DEFAULT_QUERY_PAGINATION_OPTIONS: DefaultOptions["queries"] = {
  getNextPageParam: getPaginatedResponseNextPageParam,
  getPreviousPageParam: getPaginatedResponsePreviousPageParam,
}

export const checkIsInfiniteData = <T>(data: InfiniteData<T> | T): data is InfiniteData<T> =>
  data && Object.getOwnPropertyNames(data).includes("pages") && Object.getOwnPropertyNames(data).includes("pageParams")

export const transformInfiniteDataPages = <TInput, TOutput>(
  data: InfiniteData<TInput>,
  transform: (input: TInput) => TOutput,
) => ({
  ...data,
  pages: data.pages.map(transform),
})

export const selectInfiniteDataResult = <TData extends PaginatedResponseData>(
  data: InfiniteData<TData>,
): InfiniteData<ResponseResult<TData>> => transformInfiniteDataPages(data, getDataResult)

export const selectInfiniteDataResultGenerator = <TData extends PaginatedResponseData, TOutput>(
  transform: (result: ResponseResult<TData>) => TOutput,
) => (data: InfiniteData<TData>): InfiniteData<TOutput> =>
  transformInfiniteDataPages(data, page => transform(getDataResult(page)))

export function selectDataResult<TData extends AnyResponseData>(
  response: Response<TData> | TData,
): ResponseResult<TData>
export function selectDataResult<TData extends PaginatedResponseData>(
  response: Response<InfiniteData<TData>> | InfiniteData<TData>,
): InfiniteData<ResponseResult<TData>>
export function selectDataResult<TData extends AnyResponseData>(
  response: Response<TData> | TData | Response<InfiniteData<TData>> | InfiniteData<TData>,
): ResponseResult<TData> | InfiniteData<ResponseResult<TData>> {
  const data = checkIsResponse(response) ? response.data : response
  if (checkIsInfiniteData(data)) {
    return selectInfiniteDataResult(data as InfiniteData<PaginatedResponseData>) as InfiniteData<ResponseResult<TData>>
  }
  return getDataResult(data)
}

export function updateDataResult<TData extends AnyResponseData>(
  data: TData,
  updater: (result: ResponseResult<TData>) => ResponseResult<TData>,
): TData
export function updateDataResult<TData extends AnyResponseData>(
  response: Response<TData>,
  updater: (result: ResponseResult<TData>) => ResponseResult<TData>,
): Response<TData>
export function updateDataResult<TData extends AnyResponseData>(
  response: Response<TData> | TData,
  updater: (result: ResponseResult<TData>) => ResponseResult<TData>,
): Response<AnyResponseData> | AnyResponseData {
  if (checkIsResponse(response)) {
    return {
      ...response,
      data: updateDataResult(response.data, updater),
    }
  } else if (checkIsArrayResponseData(response)) {
    return {
      ...(response ?? {}),
      results: updater(response.results as ResponseResult<TData>),
    }
  } else if (checkIsResponseData(response)) {
    return {
      ...(response as ResponseData<TData>),
      result: updater(response.result as ResponseResult<TData>),
    }
  }
  return updater(response as ResponseResult<TData>)
}

export type InfiniteQueryUpdaterMeta = {
  page_index: integer
  pages_count: integer
}

export function updateInfiteDataResult<TData extends AnyResponseData>(
  data: InfiniteData<TData>,
  updater: (result: ResponseResult<TData>, meta: InfiniteQueryUpdaterMeta) => ResponseResult<TData>,
): InfiniteData<TData>
export function updateInfiteDataResult<TData extends AnyResponseData>(
  data: InfiniteData<Response<TData>>,
  updater: (result: ResponseResult<TData>, meta: InfiniteQueryUpdaterMeta) => ResponseResult<TData>,
): InfiniteData<Response<TData>>
export function updateInfiteDataResult<TData extends AnyResponseData>(
  data: InfiniteData<Response<TData> | TData>,
  updater: (result: ResponseResult<TData>, meta: InfiniteQueryUpdaterMeta) => ResponseResult<TData>,
): InfiniteData<Response<AnyResponseData> | AnyResponseData> {
  const pages = data.pages
  return {
    ...data,
    pages: pages.map((page, page_index) => {
      const meta = {page_index, pages_count: pages.length}
      return checkIsResponse(page)
        ? updateDataResult(page, (result: ResponseResult<TData>) => updater(result, meta))
        : updateDataResult(page, (result: ResponseResult<TData>) => updater(result, meta))
    }),
  }
}
