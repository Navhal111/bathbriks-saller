import useSWRMutation from 'swr/mutation'

import type { FetcherUpdate } from '@/kit/hooks/data/fetchers/type'
import type { SWRMutationConfiguration, useCustomSWRDeleteOneAndRefreshAll } from '@/kit/hooks/data/swr/types'
import type BaseModel from '@/kit/models/BaseModel'
import type { GetAllResponse } from '@/kit/models/_generic'
import { request } from '@/kit/services/axiosService'
import { swrMutationConfig } from '@/config/swrConfigs'

/**
 * Same as useSWRDeleteOneAndRefresh but it uses the axios request
 * method which offers more flexibility. The reason is that APIs do not
 * follow the same standard.
 */
const useSWRDeleteOneAndRefreshAll = <T extends BaseModel>({
  path,
  key,
  options
}: useCustomSWRDeleteOneAndRefreshAll) => {
  const { data, error, trigger, reset, isMutating } = useSWRMutation(
    key ? [path, key] : [path],
    ([]: string[], {}: { arg: FetcherUpdate<T> }) =>
      request({
        path: options.path,
        method: 'DELETE',
        payload: options.payload,
        params: options.params,
        headers: options.headers
      })
  )

  return {
    data,
    error,
    isDeleting: isMutating,
    reset,
    deleteRecord: (deletedRecord: Partial<T>, options?: SWRMutationConfiguration) => {
      return trigger(
        {
          body: {}
        },
        {
          optimisticData: (currentRecords: GetAllResponse<T> | undefined): GetAllResponse<T> => {
            if (currentRecords?.data) {
              const records = currentRecords?.data?.filter(record => record?.id !== deletedRecord?.id)

              return {
                data: [...records],
                meta: {
                  ...currentRecords?.meta
                }
              }
            }

            return {
              data: [],
              meta: {
                currentPage: 0,
                recordsPerPage: 10,
                totalPages: 0,
                totalRecords: 0
              }
            }
          },
          ...swrMutationConfig,
          ...options
        }
      )
    }
  }
}

export default useSWRDeleteOneAndRefreshAll
