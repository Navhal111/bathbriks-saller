import { API_VERSION, fetchAll } from '@/kit/hooks/data/fetchers'
import useSWR from 'swr'
import type { CustomError } from '@/kit/models/CustomError'
import type { Params } from '@/kit/services/axiosService'
import useSWRCreateOne from './swr/useSWRCreateOne';
import { CreateOneResponse, GetAllResponse } from '@/kit/models/_generic';
import { useSWRUpdateOne } from './swr/useSWRUpdateOne';
import useSWRDeleteOneAndRefreshAll from './swr/useSWRDeleteOneAndRefreshAll';
import { ReturnOrderType } from '@/kit/models/ReturnOrder';

const RETURN_ORDER_LIST_PATH = 'admin/return-orders';

const useGetAllReturnOrderList = (params?: Params, shouldFetch = true) => {
    const { data, error, isValidating, isLoading, mutate } = useSWR<GetAllResponse<ReturnOrderType>, CustomError[]>(
        shouldFetch ? [`${API_VERSION}/${RETURN_ORDER_LIST_PATH}`, params] : null,
        (): Promise<GetAllResponse<ReturnOrderType>> => fetchAll(RETURN_ORDER_LIST_PATH, params),
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            keepPreviousData: true,
        }
    )

    return {
        ReturnOrderList: data,
        ReturnOrderListError: error,
        isReturnOrderListLoading: isLoading,
        isValidatingReturnOrderList: isValidating,
        refreshReturnOrderList: mutate
    }
}

const useCreateReturnOrder = (params?: Params) => {
    const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<ReturnOrderType>>({
        path: RETURN_ORDER_LIST_PATH,
        key: params
    })

    return {
        onCreateReturnOrder: data,
        createReturnOrderError: error,
        isCreatingReturnOrder: isMutating,
        createReturnOrderReset: reset,
        createReturnOrder: create
    }
}

const useUpdateReturnOrder = (id = '') => {
    const { data, error, isMutating, reset, update } = useSWRUpdateOne<ReturnOrderType>({
        path: RETURN_ORDER_LIST_PATH,
        id
    })

    return {
        data,
        error,
        isUpdatingReturnOrder: isMutating,
        reset,
        update
    }
}

const useDeleteReturnOrder = (id = '', params?: Params) => {
    const { data, error, isDeleting, reset, deleteRecord } = useSWRDeleteOneAndRefreshAll<ReturnOrderType>({
        path: RETURN_ORDER_LIST_PATH,
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

export { useGetAllReturnOrderList, useCreateReturnOrder, useUpdateReturnOrder, useDeleteReturnOrder }
