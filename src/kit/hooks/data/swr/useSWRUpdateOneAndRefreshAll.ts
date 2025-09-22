import useSWRMutation from 'swr/mutation'

import type { FetcherUpdate } from '@/kit/hooks/data/fetchers/type'
import { updateOne } from '@/kit/hooks/data/fetchers'
import type {
  SWRMutationConfiguration,
  useSWRUpdateOneAndRefresh,
  SWRUpdateAndRefreshAllOptimisticDataFunction
} from '@/kit/hooks/data/swr/types'
import type BaseModel from '@/kit/models/BaseModel'
import type { GetAllResponse } from '@/kit/models/_generic'
import { swrMutationConfig } from '@/config/swrConfigs'

/**
 * Wrapper around `useSWRMutation` mutation hook.
 *
 * By default, it will refresh the whole getRequest for those data.
 * An example would be the media page where a list of medias are displayed
 * in a table. If one of the media records is updated, this hook will update
 * the local cache immediately, which avoids the extra getAll request.
 * If you need to trigger the GetAll request after updating one record pass
 * revalidate: true on the update method options.
 *
 * Pass a custom `customOptimisticData` to provide a custom way to update
 * data, different from the default implementation.
 *
 * @use
 * Only use when you know the id of the record to update and the cache key
 * for the GetAll request.
 */
const useSWRUpdateOneAndRefreshAll = <T extends BaseModel>({
  path,
  id,
  key
}: useSWRUpdateOneAndRefresh) => {
  const { data, error, trigger, reset, isMutating } = useSWRMutation(
    key ? [path, key] : [path],
    ([name]: string[], { arg }: { arg: FetcherUpdate<T> }) =>
      updateOne<T>(name, id, arg.body, arg.params, arg.headers, '')
  )

  const defaultOptimisticData = (currentRecords: GetAllResponse<T>, updatedRecord: Partial<T>): GetAllResponse<T> => {
    if (currentRecords?.data) {
      const records = currentRecords?.data?.filter(record => record.id !== updatedRecord.id)

      return {
        data: [updatedRecord as T, ...records],
        meta: {
          ...currentRecords?.meta
        }
      }
    }

    return {
      data: [updatedRecord as T],
      meta: {
        currentPage: 0,
        recordsPerPage: 10,
        totalPages: 0,
        totalRecords: 0
      }
    }
  }

  return {
    data,
    error,
    isUpdating: isMutating,
    reset,
    updateRecord: (
      updatedRecord: Partial<T>,
      customOptimisticData?: SWRUpdateAndRefreshAllOptimisticDataFunction<T>,
      options?: SWRMutationConfiguration
    ) => {
      const optimisticDataFn: SWRUpdateAndRefreshAllOptimisticDataFunction<T> =
        customOptimisticData || defaultOptimisticData

      return trigger(
        {
          body: updatedRecord
        },
        {
          optimisticData: (currentRecords: GetAllResponse<T> | undefined): GetAllResponse<T> =>
            optimisticDataFn(currentRecords as GetAllResponse<T>, updatedRecord),

          ...swrMutationConfig,
          ...options
        }
      )
    }
  }
}

export default useSWRUpdateOneAndRefreshAll
