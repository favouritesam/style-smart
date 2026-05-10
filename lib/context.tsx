/**
 * Global App Context Provider
 * Manages authentication, user data, and app-wide state
 * Provides centralized state management without Redux complexity
 */

'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { User, WardrobeItem, Outfit } from './types';
import {userAPI} from "@/lib/api-clients";

/**
 * Define the shape of the app context
 */
interface AppContextType {
    // Authentication state
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (user: User | null) => void;

    // Wardrobe state
    wardrobeItems: WardrobeItem[];
    setWardrobeItems: (items: WardrobeItem[]) => void;
    addWardrobeItem: (item: WardrobeItem) => void;
    removeWardrobeItem: (itemId: string) => void;

    // Outfit state
    savedOutfits: Outfit[];
    setSavedOutfits: (outfits: Outfit[]) => void;
    addSavedOutfit: (outfit: Outfit) => void;

    // Error handling
    error: string | null;
    setError: (error: string | null) => void;
    clearError: () => void;
}

/**
 * Create the context with undefined initial value
 * Prevents accidental usage outside of provider
 */
const AppContext = createContext<AppContextType | undefined>(undefined);

/**
 * Provider component that wraps the application
 * Initializes state and provides functions to update it
 */
export function AppProvider({ children }: { children: React.ReactNode }) {
    // Authentication state
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Wardrobe state
    const [wardrobeItems, setWardrobeItems] = useState<WardrobeItem[]>([]);

    // Outfit state
    const [savedOutfits, setSavedOutfits] = useState<Outfit[]>([]);

    // Error state
    const [error, setError] = useState<string | null>(null);

    /**
     * Initialize user data on app load
     * Fetches current user profile from backend if authenticated
     */
    useEffect(() => {
        const initializeUser = async () => {
            try {
                // Check for token in auth-store (Zustand persist)
                const authData = localStorage.getItem('auth-store');
                let token = null;
                
                if (authData) {
                    const parsed = JSON.parse(authData);
                    token = parsed.state?.token;
                }

                if (token) {
                    // Fetch user profile from backend
                    const response = await userAPI.getProfile();
                    if (response.success && response.data) {
                        setUser(response.data as User);
                    }
                }
            } catch (err) {
                console.error('[StyleSmart] Failed to initialize user context:', err);
            } finally {
                setIsLoading(false);
            }
        };

        initializeUser();
    }, []);

    /**
     * Add wardrobe item to state
     * Called when a new item is added from the backend
     */
    const addWardrobeItem = useCallback((item: WardrobeItem) => {
        setWardrobeItems((prev) => [item, ...prev]);
    }, []);

    /**
     * Remove wardrobe item from state
     * Called when item is deleted from backend
     */
    const removeWardrobeItem = useCallback((itemId: string) => {
        setWardrobeItems((prev) => prev.filter((item) => item.id !== itemId));
    }, []);

    /**
     * Add outfit to saved outfits
     * Called when user saves an outfit they like
     */
    const addSavedOutfit = useCallback((outfit: Outfit) => {
        setSavedOutfits((prev) => [outfit, ...prev]);
    }, []);

    /**
     * Clear error messages
     */
    const clearError = useCallback(() => {
        setError(null);
    }, []);

    /**
     * Construct the context value object
     */
    const value: AppContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        setUser,
        wardrobeItems,
        setWardrobeItems,
        addWardrobeItem,
        removeWardrobeItem,
        savedOutfits,
        setSavedOutfits,
        addSavedOutfit,
        error,
        setError,
        clearError,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/**
 * Custom hook to use app context
 * Ensures context is only used inside provider
 */
export function useAppContext() {
    const context = useContext(AppContext);

    if (context === undefined) {
        throw new Error('useAppContext must be used within AppProvider');
    }

    return context;
}
