
import useSWR from 'swr'
import type { CustomError } from '@/kit/models/CustomError'
import type { Params } from '@/kit/services/axiosService'
import useSWRCreateOne from './swr/useSWRCreateOne';
import { CreateOneResponse, GetAllObjectResponse, GetAllResponse } from '@/kit/models/_generic';
import { useSWRUpdateOne } from './swr/useSWRUpdateOne';
import useSWRDeleteOneAndRefreshAll from './swr/useSWRDeleteOneAndRefreshAll';
import { API_VERSION, fetchAll } from './fetchers';
import { CreateProductType, ProductType } from '@/kit/models/Product';

const PRODUCT_LIST_PATH = 'products/fetch-products';
const ADD_PRODUCT_PATH = 'products/add-product';
const EDIT_PRODUCT_PATH = 'products/edit-product';
const DELETE_PRODUCT_PATH = 'products/delete-product';

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

const useCreateProduct = (params?: Params) => {
    const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<CreateProductType>>({
        path: ADD_PRODUCT_PATH,
        key: params,
        isCategoryAPI: true,
    })

    return {
        onCreateProduct: data,
        createProductError: error,
        isCreatingProduct: isMutating,
        createProductReset: reset,
        createProduct: create
    }
}

const useUpdateProduct = (id = '') => {
    const { data, error, isMutating, reset, update } = useSWRUpdateOne<CreateProductType>({
        path: EDIT_PRODUCT_PATH,
        id,
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

export { useGetAllProductList, useCreateProduct, useUpdateProduct, useDeleteProduct }
