'use client'

import { useAuth } from '@/kit/hooks/useAuth'
import KitLoader from '@/kit/components/KitLoader'
import AuthRedirect from '../hooks/AuthRedirect'
import { ChildrenType } from '@/@core/types'

export default function AuthGuard({ children }: ChildrenType) {
    const { loading, isLoggedIn } = useAuth()

    if (loading) {
        // Optionally render a loading state
        return (
            <div className='h-screen flex justify-center'>
                <KitLoader isLoading={true} />
            </div>
        )
    }

    return isLoggedIn() ? <>{children}</> : <AuthRedirect />
}
