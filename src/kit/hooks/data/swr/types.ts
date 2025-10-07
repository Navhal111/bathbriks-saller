import type { Params, Headers } from '@/kit/services/axiosService'
import type { GetAllResponse } from '@/kit/models/_generic'
import type BaseModel from '@/kit/models/BaseModel'

export type SWRMutationConfiguration = Record<string, boolean | string | number>

export type SWRUpdateOptimisticDataFunction<T> = (currentData: Partial<T> | undefined, body: Partial<T>) => Partial<T>

export type SWRUpdateAndRefreshAllOptimisticDataFunction<T extends BaseModel> = (
  currentRecords: GetAllResponse<T>,
  updatedRecord: Partial<T>
) => GetAllResponse<T>

export interface UseSWRUpdateOne {
  path: string
  id?: string
  apiVersion?: string
  isCategoryAPI?: boolean
}

export interface useSWRUpdateOneAndRefresh {
  path: string
  id: string
  key?: Params
  isCategoryAPI?: boolean
}

export interface useSWRDeleteOneAndRefresh {
  path: string
  id?: string
  key?: Params
  apiVersion?: string
  isCategoryAPI?: boolean
}

export interface useCustomSWRDeleteOneAndRefreshAll {
  path: string
  key?: Params
  isCategoryAPI?: boolean
  options: {
    path: string
    payload?: object
    params?: Params
    headers?: Headers
  }
}

export interface UseSWRCreateOne {
  path: string
  key?: Params
  apiVersion?: string
  isCategoryAPI?: boolean
}
