import { API_VERSION, fetchAll } from '@/kit/hooks/data/fetchers'
import useSWR from 'swr'
import type { CustomError } from '@/kit/models/CustomError'
import type { Params } from '@/kit/services/axiosService'
import useSWRCreateOne from './swr/useSWRCreateOne';
import { CreateOneResponse, GetAllResponse } from '@/kit/models/_generic';
import { useSWRUpdateOne } from './swr/useSWRUpdateOne';
import useSWRDeleteOneAndRefreshAll from './swr/useSWRDeleteOneAndRefreshAll';
import { OrderType } from '@/kit/models/Order';

const ORDER_LIST_PATH = 'admin/orders';

const useGetAllOrderList = (params?: Params, shouldFetch = true) => {
    const { data, error, isValidating, isLoading, mutate } = useSWR<GetAllResponse<OrderType>, CustomError[]>(
        shouldFetch ? [`${API_VERSION}/${ORDER_LIST_PATH}`, params] : null,
        (): Promise<GetAllResponse<OrderType>> => fetchAll(ORDER_LIST_PATH, params),
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            keepPreviousData: true,
        }
    )

    return {
        OrderList: data,
        OrderListError: error,
        isOrderListLoading: isLoading,
        isValidatingOrderList: isValidating,
        refreshOrderList: mutate
    }
}

const useCreateOrder = (params?: Params) => {
    const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<OrderType>>({
        path: ORDER_LIST_PATH,
        key: params
    })

    return {
        onCreateOrder: data,
        createOrderError: error,
        isCreatingOrder: isMutating,
        createOrderReset: reset,
        createOrder: create
    }
}

const useUpdateOrder = (id = '') => {
    const { data, error, isMutating, reset, update } = useSWRUpdateOne<OrderType>({
        path: ORDER_LIST_PATH,
        id
    })

    return {
        data,
        error,
        isUpdatingOrder: isMutating,
        reset,
        update
    }
}

const useDeleteOrder = (id = '', params?: Params) => {
    const { data, error, isDeleting, reset, deleteRecord } = useSWRDeleteOneAndRefreshAll<OrderType>({
        path: ORDER_LIST_PATH,
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

export { useGetAllOrderList, useCreateOrder, useUpdateOrder, useDeleteOrder }
