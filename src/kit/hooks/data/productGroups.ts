import useSWR from 'swr';
import type { CustomError } from '@/kit/models/CustomError';
import type { Params } from '@/kit/services/axiosService';
import { GetAllResponse } from '@/kit/models/_generic';
import { API_VERSION, fetchAll } from './fetchers';
import BaseModel from '@/kit/models/BaseModel';

export interface ProductGroupType extends BaseModel {
    name: string;
}

const PRODUCT_GROUPS_SEARCH_PATH = 'products/search-product-groups';

// Hook to search product groups
export const useSearchProductGroups = (query: string, enabled: boolean = true) => {
    const params = query ? { name: query } : undefined;
    const { data, error, isLoading, mutate } = useSWR<GetAllResponse<ProductGroupType>, CustomError[]>(
        enabled && query ? [`${API_VERSION}/${PRODUCT_GROUPS_SEARCH_PATH}`, params] : null,
        (): Promise<GetAllResponse<ProductGroupType>> => fetchAll(PRODUCT_GROUPS_SEARCH_PATH, params, undefined, undefined, true),
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 500,
            keepPreviousData: true,
        }
    );

    return {
        ProductGroupsList: data,
        isProductGroupsListLoading: isLoading,
        isProductGroupsListError: error,
        mutateProductGroupsList: mutate,
    };
};