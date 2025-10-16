import useSWR from 'swr'
import { customRequest, API_VERSION, fetchAll, fetchOne } from '@/kit/hooks/data/fetchers'
import type { UserResponse, User } from '@/kit/models/User'
import { useSWRUpdateOne } from '@/kit/hooks/data/swr/useSWRUpdateOne'
import useSWRDeleteOneAndRefreshAll from '@/kit/hooks/data/swr/useSWRDeleteOneAndRefreshAll'
import type { Params } from '@/kit/services/axiosService'
import type { GetAllResponse, GetOneResponse } from '@/kit/models/_generic'
import type { CustomError } from '@/kit/models/CustomError'
import authConfig from '@/config/auth'
import storage from '@/kit/services/storage'

const USER_DETAIL_PATH_NAME = 'seller/fetch-profile'
const USER_UPDATE_PATH_NAME = 'user'

const useSWRUserDetail = (shouldFetch = true) => {
    const sellerId = storage.getItem(authConfig.storageUserIDName)
    const { data, error, isLoading, isValidating, mutate } = useSWR(
        shouldFetch ? [USER_DETAIL_PATH_NAME] : null,
        ([name]) => {
            return customRequest<UserResponse, UserResponse>({
                name,
                method: 'GET',
                apiVersion: API_VERSION,
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
        user: data,
        userError: error,
        isLoadingUser: isLoading,
        isUserValidating: isValidating,
        refreshUser: mutate
    }
}

const useUpdateUser = (id = '') => {
    const { data, error, isMutating, reset, update } = useSWRUpdateOne<User>({
        path: USER_UPDATE_PATH_NAME,
        id
    })

    return {
        data,
        error,
        isUpdatingUser: isMutating,
        reset,
        update
    }
}

const useDeleteUser = () => {
    const { data, error, isDeleting, reset, deleteRecord } = useSWRDeleteOneAndRefreshAll<User>({
        path: USER_UPDATE_PATH_NAME
    })

    return {
        data,
        error,
        isDeleting,
        reset,
        deleteRecord
    }
}

const useGetAllUser = (params?: Params, shouldFetch = true) => {
    const { data, error, isValidating, isLoading, mutate } = useSWR<GetAllResponse<User>, CustomError[]>(
        shouldFetch ? [USER_UPDATE_PATH_NAME, params] : null,
        (): Promise<GetAllResponse<User>> => fetchAll(USER_UPDATE_PATH_NAME, params),
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            keepPreviousData: true
        }
    )

    return {
        users: data,
        usersError: error,
        isLoadingUsers: isLoading,
        isValidatingUsers: isValidating,
        refreshUsers: mutate
    }
}

const useGetOneUser = (id = '', params?: Params, shouldFetch = true) => {
    const { data, error, isValidating, isLoading, mutate } = useSWR<GetOneResponse<User>, CustomError[]>(
        shouldFetch ? [USER_UPDATE_PATH_NAME, params] : null,
        (): Promise<GetOneResponse<User>> => fetchOne(USER_UPDATE_PATH_NAME, id, params),
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            keepPreviousData: true
        }
    )

    return {
        user: data?.data,
        userError: error,
        isLoadingUser: isLoading,
        isValidatingUser: isValidating,
        refreshUser: mutate
    }
}

export {
    useSWRUserDetail,
    useUpdateUser,
    useDeleteUser,
    useGetAllUser,
    useGetOneUser
}