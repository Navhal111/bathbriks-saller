import { Params } from "@/kit/services/axiosService"
import { Headers } from "@/kit/services/axiosService"


export interface FetcherUpdate<U> {
  body: Partial<U>
  headers?: Headers
  params?: Params
}

export interface FetcherCreate<C> {
  body: Partial<C>
  headers?: Headers
  params?: Params
}

export interface FetcherParams {
  params: Params
}
