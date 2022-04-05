import {
  AnyResponseData,
  ArrayResponseData,
  PaginatedResponseData,
  RequestError,
  RequestErrorData,
  RequestLegacyErrorData,
  Response,
  ResponseData,
  ResponseResult as ResponseDataResult,
} from "./requestTypes"

export const checkIsResponse = (response: any): response is Response =>
  response &&
  ["data", "status", "statusText", "headers", "config"].every(propepty =>
    Object.getOwnPropertyNames(response).includes(propepty),
  )

export const checkIsRequestError = (error: any): error is RequestError =>
  error && Object.getOwnPropertyNames(error).includes("isAxiosError") && error.isAxiosError

export const checkIsRequestLegacyErrorData = (
  error_data: RequestErrorData | RequestLegacyErrorData,
): error_data is RequestLegacyErrorData => error_data && Object.getOwnPropertyNames(error_data).includes("error")

export const getRequestErrorMessage = (error: RequestError): string | undefined => {
  const data = error.response?.data
  if (data) {
    if (checkIsRequestLegacyErrorData(data)) {
      return data.error
    } else {
      return data.message
    }
  }
}

export const checkIsArrayResponseData = <T>(data: AnyResponseData<T>): data is ArrayResponseData<T> =>
  data && Object.getOwnPropertyNames(data).includes("results")

export const checkIsPaginatedResponseData = <T>(data: AnyResponseData<T>): data is PaginatedResponseData<T> => {
  if (data && checkIsArrayResponseData(data) && Object.getOwnPropertyNames(data).includes("meta")) {
    const meta = (data as PaginatedResponseData).meta
    const meta_property_names = meta && Object.getOwnPropertyNames(meta)
    return (
      meta_property_names.includes("count") &&
      meta_property_names.includes("start_cursor") &&
      meta_property_names.includes("end_cursor") &&
      meta_property_names.includes("total_count") &&
      meta_property_names.includes("has_next_page") &&
      meta_property_names.includes("has_previous_page")
    )
  }
  return false
}

export const checkIsResponseData = <T>(data: AnyResponseData<T>): data is ResponseData<T> =>
  data && Object.getOwnPropertyNames(data).includes("result")

export const getDataResult = <TData extends AnyResponseData>(
  response: TData | Response<TData>,
): ResponseDataResult<TData> => {
  const data = checkIsResponse(response) ? response.data : response
  if (checkIsArrayResponseData(data)) {
    return data.results as ResponseDataResult<TData>
  } else if (checkIsResponseData(data)) {
    return data.result as ResponseDataResult<TData>
  }
  return data as ResponseDataResult<TData>
}
