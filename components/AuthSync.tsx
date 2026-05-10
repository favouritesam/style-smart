'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/lib/store';

/**
 * AuthSync Component
 * Synchronizes the authentication token from Zustand/localStorage to document cookies.
 * This is necessary because Next.js middleware (proxy.ts) only has access to cookies,
 * while the client-side state is stored in localStorage.
 */
export function AuthSync() {
    const { token, isAuthenticated } = useAuthStore();

    useEffect(() => {
        // Only run on the client
        if (typeof window === 'undefined') return;

        const syncCookie = () => {
            const cookieMatch = document.cookie.match(/(^|;)\s*auth-token\s*=\s*([^;]+)/);
            const cookieToken = cookieMatch ? cookieMatch[2] : null;

            if (isAuthenticated && token) {
                // If authenticated but cookie is missing or different, update it
                if (!cookieToken || cookieToken !== token) {
                    document.cookie = `auth-token=${token}; path=/; max-age=604800; SameSite=Lax`;
                    console.log('[AuthSync] Token synced to cookie');
                }
            } else if (!isAuthenticated && cookieToken) {
                // If not authenticated but cookie exists, remove it
                document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
                console.log('[AuthSync] Cookie cleared');
            }
        };

        syncCookie();
    }, [token, isAuthenticated]);

    return null; // This component doesn't render anything
}
