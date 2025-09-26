import { API_VERSION, fetchAll } from '@/kit/hooks/data/fetchers'
import useSWR from 'swr'
import type { CustomError } from '@/kit/models/CustomError'
import type { Params } from '@/kit/services/axiosService'
import useSWRCreateOne from './swr/useSWRCreateOne';
import { CreateOneResponse, GetAllObjectResponse, GetAllResponse } from '@/kit/models/_generic';
import { useSWRUpdateOne } from './swr/useSWRUpdateOne';
import useSWRDeleteOneAndRefreshAll from './swr/useSWRDeleteOneAndRefreshAll';
import { SubCategoryType } from '@/kit/models/SubCategory';

const SUB_CATEGORY_LIST_PATH = 'products/fetch-subcategories-list';
const SUB_ADD_CATEGORY_PATH = 'products/add-subcategory';
const SUB_EDIT_CATEGORY_PATH = 'products/edit-subcategory';
const SUB_DELETE_CATEGORY_PATH = 'products/delete-subcategory';

const useGetAllSubCategoryList = (params?: Params, shouldFetch = true) => {
    const { data, error, isValidating, isLoading, mutate } = useSWR<GetAllObjectResponse<SubCategoryType>, CustomError[]>(
        shouldFetch ? [`${API_VERSION}/${SUB_CATEGORY_LIST_PATH}`, params] : null,
        (): Promise<GetAllObjectResponse<SubCategoryType>> => fetchAll(SUB_CATEGORY_LIST_PATH, params, undefined, undefined, true),
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            keepPreviousData: true,
        }
    )

    return {
        SubCategoryList: data,
        SubCategoryListError: error,
        isSubCategoryListLoading: isLoading,
        isValidatingSubCategoryList: isValidating,
        refreshSubCategoryList: mutate
    }
}

const useCreateSubCategory = (params?: Params) => {
    const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<SubCategoryType>>({
        path: SUB_ADD_CATEGORY_PATH,
        key: params,
        isCategoryAPI: true,
    })

    return {
        onCreateSubCategory: data,
        createSubCategoryError: error,
        isCreatingSubCategory: isMutating,
        createSubCategoryReset: reset,
        createSubCategory: create
    }
}

const useUpdateSubCategory = (id = '') => {
    const { data, error, isMutating, reset, update } = useSWRUpdateOne<SubCategoryType>({
        path: SUB_EDIT_CATEGORY_PATH,
        id,
        isCategoryAPI: true,
    })

    return {
        data,
        error,
        isUpdatingSubCategory: isMutating,
        reset,
        update
    }
}

const useDeleteSubCategory = (id = '', params?: Params) => {
    const { data, error, isDeleting, reset, deleteRecord } = useSWRDeleteOneAndRefreshAll<SubCategoryType>({
        path: SUB_DELETE_CATEGORY_PATH,
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

export { useGetAllSubCategoryList, useCreateSubCategory, useUpdateSubCategory, useDeleteSubCategory }
