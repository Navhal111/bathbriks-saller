import { API_VERSION, fetchAll } from '@/kit/hooks/data/fetchers'
import useSWR from 'swr'
import type { CustomError } from '@/kit/models/CustomError'
import type { Params } from '@/kit/services/axiosService'
import useSWRCreateOne from './swr/useSWRCreateOne';
import { CreateOneResponse, GetAllResponse } from '@/kit/models/_generic';
import { useSWRUpdateOne } from './swr/useSWRUpdateOne';
import useSWRDeleteOneAndRefreshAll from './swr/useSWRDeleteOneAndRefreshAll';
import { SubCategoryType } from '@/kit/models/SubCategory';

const SUB_CATEGORY_LIST_PATH = 'admin/sub-category';

const useGetAllSubCategoryList = (params?: Params, shouldFetch = true) => {
    const { data, error, isValidating, isLoading, mutate } = useSWR<GetAllResponse<SubCategoryType>, CustomError[]>(
        shouldFetch ? [`${API_VERSION}/${SUB_CATEGORY_LIST_PATH}`, params] : null,
        (): Promise<GetAllResponse<SubCategoryType>> => fetchAll(SUB_CATEGORY_LIST_PATH, params),
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
        path: SUB_CATEGORY_LIST_PATH,
        key: params
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
        path: SUB_CATEGORY_LIST_PATH,
        id
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
        path: SUB_CATEGORY_LIST_PATH,
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

export { useGetAllSubCategoryList, useCreateSubCategory, useUpdateSubCategory, useDeleteSubCategory }
