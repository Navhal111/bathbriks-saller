import { API_VERSION, fetchAll } from '@/kit/hooks/data/fetchers'
import useSWR from 'swr'
import type { CustomError } from '@/kit/models/CustomError'
import type { Params } from '@/kit/services/axiosService'
import { GetAllResponse } from '@/kit/models/_generic';
import useSWRDeleteOneAndRefreshAll from './swr/useSWRDeleteOneAndRefreshAll';
import { TransactionType } from '@/kit/models/Transaction';

const TRANSACTION_LIST_PATH = 'admin/transaction';

const useGetAllTransactionList = (params?: Params, shouldFetch = true) => {
    const { data, error, isValidating, isLoading, mutate } = useSWR<GetAllResponse<TransactionType>, CustomError[]>(
        shouldFetch ? [`${API_VERSION}/${TRANSACTION_LIST_PATH}`, params] : null,
        (): Promise<GetAllResponse<TransactionType>> => fetchAll(TRANSACTION_LIST_PATH, params),
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            keepPreviousData: true,
        }
    )

    return {
        TransactionList: data,
        TransactionListError: error,
        isTransactionListLoading: isLoading,
        isValidatingTransactionList: isValidating,
        refreshTransactionList: mutate
    }
}

const useDeleteTransaction = (id = '', params?: Params) => {
    const { data, error, isDeleting, reset, deleteRecord } = useSWRDeleteOneAndRefreshAll<TransactionType>({
        path: TRANSACTION_LIST_PATH,
        id,
        key: params
    })

    return {
        data,
        error,
        isDeleting,
        reset,
        deleteRecord
    }
}

export { useGetAllTransactionList, useDeleteTransaction }
