
import useSWRMutation from 'swr/mutation'

import type { FetcherUpdate } from '@/kit/hooks/data/fetchers/type'
import { deleteOne } from '@/kit/hooks/data/fetchers'
import type { SWRMutationConfiguration, useSWRDeleteOneAndRefresh } from '@/kit/hooks/data/swr/types'
import { swrMutationConfig } from '@/config/swrConfigs'
import { QuestionnaireResponse } from '@/kit/models/questionnaire'

export const useSWRDelete = <T extends { id: number }>({
    path,
    id,
    key,
    apiVersion
  }: useSWRDeleteOneAndRefresh) => {
    const { data, error, trigger, reset, isMutating } = useSWRMutation(
      key ? [path, key] : [path],
      ([name]: string[], { arg }: { arg: FetcherUpdate<T> }) =>
        deleteOne(name, id, arg.params, arg.headers, apiVersion)
    );
  
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
            optimisticData: (currentRecords: QuestionnaireResponse | undefined): QuestionnaireResponse => {
              if (currentRecords?.data) {
                const updatedData = currentRecords.data.filter(
                  (record) => record.id !== deletedRecord.id
                );
  
                return {
                  ...currentRecords,
                  data: updatedData
                };
              }
  
              return {
                status: 200,
                responseCode: 200,
                success: true,
                message: "Optimistic update fallback",
                data: [],
                err: null
              };
            },
            ...swrMutationConfig,
            ...options
          }
        );
      }
    };
  };
  
  