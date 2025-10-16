import { API_VERSION, fetchAll, fetchOne } from '@/kit/hooks/data/fetchers'
import useSWR from 'swr'
import type { CustomError } from '@/kit/models/CustomError'
import type { Params } from '@/kit/services/axiosService'
import { GetAllObjectResponse, GetOneResponse } from '@/kit/models/_generic';
import { useSWRUpdateOne } from './swr/useSWRUpdateOne';
import useSWRDeleteOneAndRefreshAll from './swr/useSWRDeleteOneAndRefreshAll';
import { SellerOrderType } from '@/kit/models/Order';

// Live order API paths
const SELLER_ORDER_LIST_PATH = 'orders/seller/orders';

const useGetSellerOrderList = (params?: Params, shouldFetch = true) => {
    const { data, error, isValidating, isLoading, mutate } = useSWR<GetAllObjectResponse<SellerOrderType>, CustomError[]>(
        shouldFetch ? [`${API_VERSION}/${SELLER_ORDER_LIST_PATH}`, params] : null,
        (): Promise<GetAllObjectResponse<SellerOrderType>> => fetchAll(SELLER_ORDER_LIST_PATH, params, undefined, API_VERSION, false, true),
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            keepPreviousData: true,
        }
    )

    return {
        SellerOrderList: data,
        SellerOrderListError: error,
        isSellerOrderListLoading: isLoading,
        isValidatingSellerOrderList: isValidating,
        refreshSellerOrderList: mutate
    }
}

const useGetOneSellerOrder = (id = '', params?: Params) => {
    const { data, error, isLoading, isValidating, mutate } = useSWR<GetOneResponse<SellerOrderType>, CustomError[]>(
        id ? [`${SELLER_ORDER_LIST_PATH}/${id}`, params] : null,
        (): Promise<GetOneResponse<SellerOrderType>> => fetchOne(SELLER_ORDER_LIST_PATH, id, params, undefined, API_VERSION, false, true),
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    )

    return {
        data,
        error,
        isLoading,
        isValidating,
        mutate
    }
}

const useUpdateSellerOrder = (id = '') => {
    const { data, error, isMutating, reset, update } = useSWRUpdateOne<SellerOrderType>({
        path: SELLER_ORDER_LIST_PATH,
        id,
        isOrderAPI: true
    })

    return {
        data,
        error,
        isUpdatingSellerOrder: isMutating,
        reset,
        update
    }
}

const useDeleteSellerOrder = (id = '', params?: Params) => {
    const { data, error, isDeleting, reset, deleteRecord } = useSWRDeleteOneAndRefreshAll<SellerOrderType>({
        path: SELLER_ORDER_LIST_PATH,
        id,
        key: params,
        isOrderAPI: true
    })

    return {
        data,
        error,
        isDeleting,
        reset,
        deleteRecord
    }
}

export {
    useGetSellerOrderList,
    useGetOneSellerOrder,
    useUpdateSellerOrder,
    useDeleteSellerOrder
}