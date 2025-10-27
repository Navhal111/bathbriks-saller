import useSWRMutation from 'swr/mutation'

import type { FetcherCreate } from '@/kit/hooks/data/fetchers/type'
import { createOne } from '@/kit/hooks/data/fetchers'
import type { SWRMutationConfiguration, UseSWRCreateOne } from '@/kit/hooks/data/swr/types'
import type BaseModel from '@/kit/models/BaseModel'
import type { GetAllResponse } from '@/kit/models/_generic'
import { swrMutationConfig } from '@/config/swrConfigs'

/**
 * Wrapper around `useSWRMutation` mutation hook. Use this hook whenever you need
 * to create a new record. It requires the path of the model you are
 * creating. The path would be used to generate a unique cache key.
 *
 * The custom hook exports all the `useSWRMutation` hook return values. Use
 * those as needed.
 *
 * It offers a wrapper around the trigger method to create the record. With
 * the ability to pass the payload and other options for `useSWRMutation`.
 *
 * SWR supports Optimistic UI, meaning when a new record is created it can
 * be immediately added to a list of records in local cache. This allows for
 * a better user experience because the UI feels faster. After the new
 * record is added, the remote mutation would still happen. An API POST
 * request would be triggered to persist the new record in the DB.
 *
 * At this point you have an updated UI which shows the new record in a list
 * of existing records (like a table) but you still need to trigger a GET
 * request for all the records. That's because the record added to local
 * cache is not the full record. So you need to refresh the table data in
 * behind without the user noticing it. In order to do that, the
 * `useSWRCreateOne` cache key must be the same as the `useSWR` or
 * `useSWRImmutable` hook and pass the revalidate option as part of the
 * create method.
 *
 * By having the same `key` and `revalidate` set to true SWR will take care of
 * updating the local cache.
 *
 */
const useSWRCreateOne = <T extends BaseModel>({ path, key, apiVersion, isCategoryAPI }: UseSWRCreateOne) => {
  const { data, error, trigger, reset, isMutating } = useSWRMutation(
    key ? [path, key] : [path],
    ([name]: string[], { arg }: { arg: FetcherCreate<T> }) =>
      createOne<T>(name, arg.body, arg.params, arg.headers, apiVersion, isCategoryAPI)
  )

  return {
    data,
    error,
    isMutating,
    reset,
    create: (record: Partial<T>, options?: SWRMutationConfiguration, headers?: { [key: string]: string }) => {
      return trigger(
        {
          body: record,
          headers,
        },
        {
          optimisticData: (currentRecords: GetAllResponse<T> | undefined): GetAllResponse<T> => {
            if (currentRecords?.data) {
              return {
                data: [record as T, ...currentRecords?.data],
                meta: {
                  ...currentRecords?.meta
                }
              }
            }

            return {
              data: [record as T],
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

export default useSWRCreateOne
