
import useSWR from 'swr'
import type { CustomError } from '@/kit/models/CustomError'
import type { Params } from '@/kit/services/axiosService'
import useSWRCreateOne from './swr/useSWRCreateOne';
import { CreateOneResponse, GetAllResponse } from '@/kit/models/_generic';
import { useSWRUpdateOne } from './swr/useSWRUpdateOne';
import useSWRDeleteOneAndRefreshAll from './swr/useSWRDeleteOneAndRefreshAll';
import { CategoryType } from '@/kit/models/Category';
import { API_VERSION, fetchAll } from './fetchers';

const CATEGORY_LIST_PATH = 'products/fetch-categories-list';
const ADD_CATEGORY_PATH = 'products/add-category';
const EDIT_CATEGORY_PATH = 'products/edit-category';
const DELETE_CATEGORY_PATH = 'products/delete-category';

const useGetAllCategoryList = (params?: Params, shouldFetch = true) => {
    const { data, error, isValidating, isLoading, mutate } = useSWR<GetAllResponse<CategoryType>, CustomError[]>(
        shouldFetch ? [`${API_VERSION}/${CATEGORY_LIST_PATH}`, params] : null,
        (): Promise<GetAllResponse<CategoryType>> => fetchAll(CATEGORY_LIST_PATH, params, undefined, undefined, true),
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
        path: ADD_CATEGORY_PATH,
        key: params,
        isCategoryAPI: true,
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
        path: EDIT_CATEGORY_PATH,
        id,
        isCategoryAPI: true,
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
        path: DELETE_CATEGORY_PATH,
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

export { useGetAllCategoryList, useCreateCategory, useUpdateCategory, useDeleteCategory }
