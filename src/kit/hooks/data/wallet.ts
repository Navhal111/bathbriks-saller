import { API_VERSION, fetchAll } from '@/kit/hooks/data/fetchers'
import useSWR from 'swr'
import type { CustomError } from '@/kit/models/CustomError'
import type { Params } from '@/kit/services/axiosService'
import { CreateOneResponse, GetAllResponse } from '@/kit/models/_generic';
import { WalletType } from '@/kit/models/Wallet';
import useSWRCreateOne from './swr/useSWRCreateOne';

const WALLET_LIST_PATH = 'admin/wallet';

const useGetAllWalletList = (params?: Params, shouldFetch = true) => {
    const { data, error, isValidating, isLoading, mutate } = useSWR<GetAllResponse<WalletType>, CustomError[]>(
        shouldFetch ? [`${API_VERSION}/${WALLET_LIST_PATH}`, params] : null,
        (): Promise<GetAllResponse<WalletType>> => fetchAll(WALLET_LIST_PATH, params),
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            keepPreviousData: true,
        }
    )

    return {
        WalletList: data,
        WalletListError: error,
        isWalletListLoading: isLoading,
        isValidatingWalletList: isValidating,
        refreshWalletList: mutate
    }
}


const useCreateWallet = (params?: Params) => {
    const { data, error, isMutating, reset, create } = useSWRCreateOne<CreateOneResponse<WalletType>>({
        path: WALLET_LIST_PATH,
        key: params
    })

    return {
        onCreateWallet: data,
        createWalletError: error,
        isCreatingWallet: isMutating,
        createWalletReset: reset,
        createWallet: create
    }
}


export { useGetAllWalletList, useCreateWallet }
