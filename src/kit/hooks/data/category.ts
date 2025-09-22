import { API_VERSION, fetchAll } from '@/kit/hooks/data/fetchers'
import useSWR from 'swr'
import type { CustomError } from '@/kit/models/CustomError'
import type { Params } from '@/kit/services/axiosService'
import useSWRCreateOne from './swr/useSWRCreateOne';
import { CreateOneResponse, GetAllResponse } from '@/kit/models/_generic';
import { useSWRUpdateOne } from './swr/useSWRUpdateOne';
import useSWRDeleteOneAndRefreshAll from './swr/useSWRDeleteOneAndRefreshAll';
import { CategoryType } from '@/kit/models/Category';

const CATEGORY_LIST_PATH = 'admin/product-category';

const useGetAllCategoryList = (params?: Params, shouldFetch = true) => {
    const { data, error, isValidating, isLoading, mutate } = useSWR<GetAllResponse<CategoryType>, CustomError[]>(
        shouldFetch ? [`${API_VERSION}/${CATEGORY_LIST_PATH}`, params] : null,
        (): Promise<GetAllResponse<CategoryType>> => fetchAll(CATEGORY_LIST_PATH, params),
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            keepPreviousData: true,
        }
    )

    return {
        CategoryList: data,
        CategoryListError: error,
        isCategoryListLoading: isLoading,
        isValidatingCategoryList: isValidating,
        refreshCategoryList: mutate
    }
}

const useCreateCategory = (params?: Params) => {
    const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<CategoryType>>({
        path: CATEGORY_LIST_PATH,
        key: params
    })

    return {
        onCreateCategory: data,
        createCategoryError: error,
        isCreatingCategory: isMutating,
        createCategoryReset: reset,
        createCategory: create
    }
}

const useUpdateCategory = (id = '') => {
    const { data, error, isMutating, reset, update } = useSWRUpdateOne<CategoryType>({
        path: CATEGORY_LIST_PATH,
        id
    })

    return {
        data,
        error,
        isUpdatingCategory: isMutating,
        reset,
        update
    }
}

const useDeleteCategory = (id = '', params?: Params) => {
    const { data, error, isDeleting, reset, deleteRecord } = useSWRDeleteOneAndRefreshAll<CategoryType>({
        path: CATEGORY_LIST_PATH,
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

export { useGetAllCategoryList, useCreateCategory, useUpdateCategory, useDeleteCategory }
