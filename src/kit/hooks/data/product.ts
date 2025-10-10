
import useSWR from 'swr'
import type { CustomError } from '@/kit/models/CustomError'
import type { Params } from '@/kit/services/axiosService'
import { GetAllObjectResponse, GetOneResponse } from '@/kit/models/_generic';
import { useSWRUpdateOne } from './swr/useSWRUpdateOne';
import useSWRDeleteOneAndRefreshAll from './swr/useSWRDeleteOneAndRefreshAll';
import { API_VERSION, customRequest, fetchAll, fetchOne } from './fetchers';
import { CreateProductType, ProductType } from '@/kit/models/Product';
import authConfig from '@/config/auth'
import storage from '@/kit/services/storage'
import useSWRMutation from 'swr/mutation';
import { FetcherCreate } from './fetchers/type';
import { MediaType } from '@/kit/models/media';

const PRODUCT_LIST_PATH = 'products/fetch-products';
const PRODUCT_PATH = 'products/fetch-product-detail';
const ADD_PRODUCT_PATH = 'products/add-product';
const EDIT_PRODUCT_PATH = 'products/edit-product';
const DELETE_PRODUCT_PATH = 'products/delete-product';
const UPDATE_MEDIA_PATH = 'products/add-product-media';

const useGetAllProductList = (params?: Params, shouldFetch = true) => {
    const { data, error, isValidating, isLoading, mutate } = useSWR<GetAllObjectResponse<ProductType>, CustomError[]>(
        shouldFetch ? [`${API_VERSION}/${PRODUCT_LIST_PATH}`, params] : null,
        (): Promise<GetAllObjectResponse<ProductType>> => fetchAll(PRODUCT_LIST_PATH, params, undefined, undefined, true),
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            keepPreviousData: true,
        }
    )

    return {
        ProductList: data,
        ProductListError: error,
        isProductListLoading: isLoading,
        isValidatingProductList: isValidating,
        refreshProductList: mutate
    }
}

const useGetOneProduct = (id = '', params?: Params) => {
    const { data, error, isLoading, isValidating, mutate } = useSWR<GetOneResponse<CreateProductType>, CustomError[]>(
        id ? [`${PRODUCT_PATH}/${id}`, params] : null,
        (): Promise<GetOneResponse<CreateProductType>> => fetchOne(PRODUCT_PATH, id, params, undefined, undefined, true),
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

const useCreateProduct = (shouldFetch = true, params?: Params) => {
    const sellerId = storage.getItem(authConfig.storageUserIDName)

    const { data, error, isMutating, reset, trigger } = useSWRMutation(
        shouldFetch ? [`${ADD_PRODUCT_PATH}`] : null,
        ([name]: string[], { arg }: { arg: FetcherCreate<any> }) =>
            customRequest<any, any>({
                name: name,
                method: 'POST',
                payload: arg.body,
                isCategoryAPI: true,
                headers: {
                    'x-seller-id': sellerId,
                },
            })
    )

    return {
        onCreateProduct: data,
        createProductError: error,
        isCreatingProduct: isMutating,
        createProductReset: reset,
        createProduct: (record: Partial<any>) => {
            return trigger({
                body: record
            })
        }
    }
}

const useUpdateProduct = () => {
    const { data, error, isMutating, reset, update } = useSWRUpdateOne<CreateProductType>({
        path: EDIT_PRODUCT_PATH,
        isCategoryAPI: true,
    })

    return {
        data,
        error,
        isUpdatingProduct: isMutating,
        reset,
        update
    }
}

const useDeleteProduct = (id = '', params?: Params) => {
    const { data, error, isDeleting, reset, deleteRecord } = useSWRDeleteOneAndRefreshAll<ProductType>({
        path: DELETE_PRODUCT_PATH,
        id,
        key: params,
        isCategoryAPI: true,
    })

    return {
        data,
        error,
        isDeleting,
        reset,
        deleteRecord
    }
}

const useUpdateMedia = (id = '') => {
    const { data, error, isMutating, reset, update } = useSWRUpdateOne<MediaType>({
        path: UPDATE_MEDIA_PATH,
        id,
        isCategoryAPI: true,
    })

    return {
        data,
        error,
        isUpdatingMedia: isMutating,
        reset,
        update
    }
}


export { useGetAllProductList, useGetOneProduct, useCreateProduct, useUpdateProduct, useDeleteProduct, useUpdateMedia }
