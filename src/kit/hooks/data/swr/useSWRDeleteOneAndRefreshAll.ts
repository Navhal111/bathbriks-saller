import useSWRMutation from 'swr/mutation'

import type { FetcherUpdate } from '@/kit/hooks/data/fetchers/type'
import { deleteOne } from '@/kit/hooks/data/fetchers'
import type { SWRMutationConfiguration, useSWRDeleteOneAndRefresh } from '@/kit/hooks/data/swr/types'
import type BaseModel from '@/kit/models/BaseModel'
import type { GetAllResponse } from '@/kit/models/_generic'
import { swrMutationConfig } from '@/config/swrConfigs'

/**
 * Wrapper around `useSWRMutation` mutation hook. Use this hook whenever you need
 * to delete a record from a list and refresh whole list
 *
 * @example
 * In the media page, the media records are displayed under a table.
 * Deleting a record should refresh the whole table, meaning it should
 * trigger a GET request.
 *
 * The hook requires the path, the id of the record that will be deleted and
 * the key, which is the cache key. It's the same key used by the GetAll
 * which fetches the media by page.
 *
 * @use
 * Only used when you know the id of the record to delete and the cache key
 * of the list that will be refreshed after delete.
 */
const useSWRDeleteOneAndRefreshAll = <T extends BaseModel>({
  path,
  id,
  key,
  apiVersion,
  isCategoryAPI
}: useSWRDeleteOneAndRefresh) => {
  const { data, error, trigger, reset, isMutating } = useSWRMutation(
    key ? [path, key] : [path],
    ([name]: string[], { arg }: { arg: FetcherUpdate<T> }) =>
      deleteOne(name, id, arg.params, arg.headers, apiVersion, isCategoryAPI)
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
              const records = currentRecords?.data?.filter(record => record.id !== deletedRecord.id)

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
