'use client'

import type { ReactNode, Dispatch, SetStateAction } from 'react'

import { createContext, useState, useEffect } from 'react'

import { useRouter } from 'next/navigation'
import storage from '@/kit/services/storage'
import authConfig from '@/config/auth'
import { useSWRLogout } from '@/kit/hooks/data/auth'
import type { User } from '@/kit/models/User'
import { useSWRUserDetail } from '@/kit/hooks/data/user'

const defaultProvider = {
    isLoggedIn: (): boolean => false,
    setLoading: (() => { }) as Dispatch<SetStateAction<boolean>>,
    loading: true,
    isLoadingLogout: false,
    user: null,
    setUser: (() => { }) as Dispatch<SetStateAction<any>>,
    logout: async () => { },
    onRefreshUser: async () => { },
}

const AuthContext = createContext<{
    user: User | null
    loading: boolean
    isLoadingLogout: boolean
    setUser: Dispatch<SetStateAction<User | null>>
    setLoading: Dispatch<SetStateAction<boolean>>
    isLoggedIn: () => boolean
    logout: () => void
    onRefreshUser: () => void
}>(defaultProvider)

type Props = {
    children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [userLogined, setUserLogined] = useState<boolean>(false)

    const { user: userDetail, isLoadingUser, refreshUser: onRefreshUser } = useSWRUserDetail(userLogined)
    const { deleteRecord: onLogoutUser, isDeleting: isLoadingLogout } = useSWRLogout()

    // Hooks
    const router = useRouter()

    useEffect(() => {
        const initAuth = async (): Promise<void> => {
            // Retrieve stored tokens and user data
            const userId = storage.getItem(authConfig.storageUserIDName)
            const userData = storage.getItem(authConfig.storageUserDetailName)
            const { accessToken, refreshToken } = getTokens()

            // If any critical auth data is missing, clear login data and stop loading
            if (!accessToken || !refreshToken || !userId || !userData) {
                setLoading(false)
                clearLoginData()

                return
            }

            try {
                setLoading(true)

                // Ensure userDetail is available and ready
                if (userDetail?.data) {
                    // Update user state and initialize company
                    setUser({ ...userDetail.data })
                    // Store user details in local storage
                    storage.setItem(authConfig.storageUserIDName, userDetail.data.id)
                    storage.setItem(authConfig.storageUserDetailName, JSON.stringify(userDetail.data))
                }
            } catch (error) {
                handleLogout()
            } finally {
                setLoading(false)
            }
        }

        // Only run initAuth when userDetail has loaded
        if (!isLoadingUser) {
            initAuth()
        }
    }, [isLoadingUser, userDetail]) // Depend on isLoadingUser and userDetail

    const isLoggedIn = (): boolean => {
        const accessToken = storage.getItem(authConfig.storageTokenKeyName)
        const refreshToken = storage.getItem(authConfig.storageRefreshKeyName)
        const userId = storage.getItem(authConfig.storageUserIDName)
        const userData: User = storage.getItem(authConfig.storageUserDetailName) as unknown as User

        return (
            Boolean(accessToken) &&
            Boolean(refreshToken) &&
            Boolean(userId) &&
            Boolean(userData)
        )
    }

    const clearLoginData = () => {
        storage.removeItem(authConfig.storageUserIDName)
        storage.removeItem(authConfig.storageUserDetailName)
        storage.removeItem(authConfig.storageTokenKeyName)
        storage.removeItem(authConfig.storageRefreshKeyName)
    }

    const handleLogout = async () => {
        // await onLogoutUser({ ...user })
        clearLoginData()
        router.push('/login')
    }

    const getTokens = () => {
        const accessToken = storage.getItem(authConfig.storageTokenKeyName)!
        const refreshToken = storage.getItem(authConfig.storageRefreshKeyName)!

        return {
            accessToken,
            refreshToken
        }
    }

    useEffect(() => {
        const initializeUserState = () => {
            const isUserLoggedIn = isLoggedIn()
            setUserLogined(isUserLoggedIn)
        }

        initializeUserState()
    }, [user])

    const values = {
        user,
        loading,
        setUser,
        setLoading,
        isLoggedIn,
        isLoadingLogout,
        logout: handleLogout,
        onRefreshUser,
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
