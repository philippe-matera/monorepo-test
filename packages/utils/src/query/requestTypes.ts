import {AxiosError, AxiosResponse} from "axios"

export type PaginationData = {
  total_count: number
  count: number
  start_cursor: string
  end_cursor: string
  has_next_page: boolean
  has_previous_page: boolean
}

export type Response<T = unknown> = AxiosResponse<T>
export type ResponseData<T = unknown> = {result: T}
export type ArrayResponseData<T = unknown> = {results: T[]}
export type PaginatedResponseData<T = unknown> = ArrayResponseData<T> & {meta: PaginationData}
export type AnyResponseData<T = unknown> = T | ResponseData<T> | PaginatedResponseData<T> | ArrayResponseData<T>
export type RequestErrorData = {code: string; message: string; details?: string}
export type RequestLegacyErrorData = {error: string}
export type RequestError = AxiosError<RequestErrorData | RequestLegacyErrorData>

export type RequestParams<T = Record<string, unknown>> = T & {includes?: any}
export type PaginationParams = {
  limit?: number
  before?: string
  after?: string
  order?: any
  filters?: any
}
export type PaginatedRequestParams<T = Record<string, unknown>> = RequestParams<T> & PaginationParams
export type AnyRequestParams<T = unknown> = T | RequestParams<T> | PaginatedRequestParams<T>

export type ResponseResult<T extends AnyResponseData> = T extends ArrayResponseData
  ? T["results"]
  : T extends ResponseData
  ? T["result"]
  : T
