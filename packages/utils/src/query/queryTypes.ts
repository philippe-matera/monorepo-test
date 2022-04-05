import {QueryFunctionContext, QueryKey} from "react-query"

import {PaginationParams} from "./requestTypes"

export type PaginatedQueryFunctionContext<TKey extends QueryKey = QueryKey> = QueryFunctionContext<
  TKey,
  PaginationParams | undefined
>
