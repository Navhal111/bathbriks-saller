
import useSWR from 'swr'
import type { CustomError } from '@/kit/models/CustomError'
import type { Params } from '@/kit/services/axiosService'
import useSWRCreateOne from './swr/useSWRCreateOne';
import { CreateOneResponse, GetAllResponse } from '@/kit/models/_generic';
import { useSWRUpdateOne } from './swr/useSWRUpdateOne';
import useSWRDeleteOneAndRefreshAll from './swr/useSWRDeleteOneAndRefreshAll';
import { API_VERSION, fetchAll } from './fetchers';
import { BrandType } from '@/kit/models/Brand';

const BRAND_LIST_PATH = 'products/fetch-brands-list';
const ADD_BRAND_PATH = 'products/add-brand';
const EDIT_BRAND_PATH = 'products/edit-brand';
const DELETE_BRAND_PATH = 'products/delete-brand';

const useGetAllBrandList = (params?: Params, shouldFetch = true) => {
    const { data, error, isValidating, isLoading, mutate } = useSWR<GetAllResponse<BrandType>, CustomError[]>(
        shouldFetch ? [`${API_VERSION}/${BRAND_LIST_PATH}`, params] : null,
        (): Promise<GetAllResponse<BrandType>> => fetchAll(BRAND_LIST_PATH, params, undefined, undefined, true),
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            keepPreviousData: true,
        }
    )

    return {
        BrandList: data,
        BrandListError: error,
        isBrandListLoading: isLoading,
        isValidatingBrandList: isValidating,
        refreshBrandList: mutate
    }
}

const useCreateBrand = (params?: Params) => {
    const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<BrandType>>({
        path: ADD_BRAND_PATH,
        key: params,
        isCategoryAPI: true,
    })

    return {
        onCreateBrand: data,
        createBrandError: error,
        isCreatingBrand: isMutating,
        createBrandReset: reset,
        createBrand: create
    }
}

const useUpdateBrand = (id = '') => {
    const { data, error, isMutating, reset, update } = useSWRUpdateOne<BrandType>({
        path: EDIT_BRAND_PATH,
        id,
        isCategoryAPI: true,
    })

    return {
        data,
        error,
        isUpdatingBrand: isMutating,
        reset,
        update
    }
}

const useDeleteBrand = (id = '', params?: Params) => {
    const { data, error, isDeleting, reset, deleteRecord } = useSWRDeleteOneAndRefreshAll<BrandType>({
        path: DELETE_BRAND_PATH,
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

export { useGetAllBrandList, useCreateBrand, useUpdateBrand, useDeleteBrand }
