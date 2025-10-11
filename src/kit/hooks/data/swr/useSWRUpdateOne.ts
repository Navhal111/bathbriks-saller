import useSWRMutation from 'swr/mutation'

import type { FetcherUpdate } from '@/kit/hooks/data/fetchers/type'
import { updateOne } from '@/kit/hooks/data/fetchers'
import type {
  UseSWRUpdateOne,
  SWRMutationConfiguration,
  SWRUpdateOptimisticDataFunction
} from '@/kit/hooks/data/swr/types'
import type BaseModel from '@/kit/models/BaseModel'
import { swrMutationConfig } from '@/config/swrConfigs'

/**
 * Wrapper around `useSWRMutation` mutation hook. Use this hook whenever you need
 * to mutate remote data. It requires the path of the model you are mutation
 * and the id as initial prop. Both the path and the id will be used to
 * generate a unique cache key. It must be the same key as the `useSWR` in
 * order for `SWR` to handle revalidation and race conditions
 *
 * The custom hook exports all the `useSWRMutation` hook return values. Use
 * those as needed.
 *
 * It offers a wrapper around the trigger method to update the data. With
 * the ability to pass the id of the model you need to mutate and the payload.
 *
 * Also, you can pass a third argument to the `update` method for additional
 * options supported by SWR library for mutations.
 *
 * @use
 * Only use when you know the id of the record to update. Usually used on
 * getOne cases, where the record is already available. It will update the
 * record and reflect the changes in the UI without triggering a GET request.
 */
export const useSWRUpdateOne = <T extends BaseModel>({ path, id, apiVersion, isCategoryAPI }: UseSWRUpdateOne) => {
  const { data, error, trigger, reset, isMutating } = useSWRMutation(
    [id ? `${path}/${id}` : `${path}`],
    ([], { arg }: { arg: FetcherUpdate<T> }) =>
      updateOne<T>(path, arg.body, id, arg.params, arg.headers, apiVersion, isCategoryAPI)
  )

  const defaultOptimisticData = (currentRecord: Partial<T> | undefined, record: Partial<T>) => {
    return { ...currentRecord, ...record }
  }

  return {
    data,
    error,
    isMutating,
    reset,
    update: (
      record: Partial<T>,
      customOptimisticData?: SWRUpdateOptimisticDataFunction<T>,
      options?: SWRMutationConfiguration
    ) => {
      const optimisticDataFn: SWRUpdateOptimisticDataFunction<T> = customOptimisticData || defaultOptimisticData

      return trigger(
        {
          body: record
        },
        {
          optimisticData: (currentRecord: Partial<T> | undefined) => optimisticDataFn(currentRecord, record),
          ...swrMutationConfig,
          ...options
        }
      )
    }
  }
}
