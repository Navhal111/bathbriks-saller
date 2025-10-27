import useSWR from 'swr';
import type { CustomError } from '@/kit/models/CustomError';
import type { Params } from '@/kit/services/axiosService';
import { CreateOneResponse, GetAllResponse } from '@/kit/models/_generic';
import { API_VERSION, customRequest, fetchAll } from './fetchers';
import BaseModel from '@/kit/models/BaseModel';
import storage from '@/kit/services/storage';
import authConfig from '@/config/auth'
import { Dimension } from '@/kit/models/Dimension';
import useSWRCreateOne from './swr/useSWRCreateOne';
import { LinkProduct } from '@/kit/models/LinkProduct';

export interface DimensionType extends BaseModel {
    name: string;
}

const DIMENSIONS_LIST_PATH = 'products/fetch-dimensions-list';
const GET_DIMENSIONS_LIST_PATH = 'products/fetch-dimension-products';
const LINK_PRODUCTS_PATH = 'products/link-products';

// Hook to get all dimensions
export const useGetAllDimensionsList = (params?: Params) => {
    const { data, error, isLoading, mutate } = useSWR<GetAllResponse<DimensionType>, CustomError[]>(
        [`${API_VERSION}/${DIMENSIONS_LIST_PATH}`, params],
        (): Promise<GetAllResponse<DimensionType>> => fetchAll(DIMENSIONS_LIST_PATH, params, undefined, undefined, true),
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            keepPreviousData: true,
        }
    );

    return {
        DimensionsList: data,
        isDimensionsListLoading: isLoading,
        isDimensionsListError: error,
        mutateDimensionsList: mutate,
    };
};

export const useGetDimensionsList = (params?: Params, shouldFetch = true) => {
    const sellerId = storage.getItem(authConfig.storageUserIDName)
    const { data, error, isLoading, isValidating, mutate } = useSWR(
        shouldFetch ? [`${GET_DIMENSIONS_LIST_PATH}`, params] : null,
        ([name]) => {
            return customRequest<Dimension, Dimension>({
                name,
                method: 'GET',
                params,
                apiVersion: API_VERSION,
                isCategoryAPI: true,
                headers: {
                    'x-seller-id': sellerId,
                },
            })
        },
        {
            revalidateOnMount: true,
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false
        }
    )

    return {
        GetDimensionsList: data,
        isGetDimensionsListLoading: isLoading,
        isGetDimensionsListError: error,
        isUserValidating: isValidating,
        mutateGetDimensionsList: mutate,
    }
}

export const useCreateLinkProduct = (params?: Params) => {
    const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<LinkProduct>>({
        path: LINK_PRODUCTS_PATH,
        key: params,
        isCategoryAPI: true,
    })

    return {
        onCreateLinkProduct: data,
        createLinkProductError: error,
        isCreatingLinkProduct: isMutating,
        createLinkProductReset: reset,
        createLinkProduct: create
    }
}