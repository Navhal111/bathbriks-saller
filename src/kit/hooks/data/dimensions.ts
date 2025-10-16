import useSWR from 'swr';
import type { CustomError } from '@/kit/models/CustomError';
import type { Params } from '@/kit/services/axiosService';
import { GetAllResponse } from '@/kit/models/_generic';
import { API_VERSION, fetchAll } from './fetchers';
import BaseModel from '@/kit/models/BaseModel';

export interface DimensionType extends BaseModel {
    name: string;
}

const DIMENSIONS_LIST_PATH = 'products/fetch-dimensions-list';

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