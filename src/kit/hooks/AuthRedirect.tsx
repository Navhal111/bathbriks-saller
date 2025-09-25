'use client'

import { redirect, usePathname } from 'next/navigation'
import type { User } from '@/kit/models/User'
import storage from '@/kit/services/storage'
import authConfig from '@/config/auth'

const AuthRedirect = () => {
    const pathname = usePathname()

    const userData = storage.getItem(authConfig.storageUserDetailName)
        ? (storage.getItem(authConfig.storageUserDetailName) as unknown as User)
        : null

    const redirectUrl = `/login?redirectTo=${pathname}`
    const login = `/login`
    const homePage = '/'

    // Redirect logic
    if (!userData) {
        return redirect(redirectUrl)
    }

    return redirect(pathname === login ? login : pathname === homePage ? login : redirectUrl)
}

export default AuthRedirect
