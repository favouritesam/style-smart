import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * TYPE DEFINITIONS FOR STORE
 * Defines all data structures used across the application
 */

export interface User {
    id: string;
    email: string;
    fullName: string;
    avatar?: string;
    stylePreference?: string;
    stylePreferences?: {
        style: 'casual' | 'formal' | 'minimalist' | 'bohemian' | 'classic' | 'trendy';
        colors?: string[];
    };
    favoriteColors?: string[];
}

export interface AuthResponse {
    token: string;
    refreshToken?: string;
    user: User;
}

export interface WardrobeItem {
    id: string;
    name: string;
    color: string;
    category: 'tops' | 'bottoms' | 'outerwear' | 'shoes' | 'accessories' | 'shorts' | 'trousers' | 'gowns' | 'skirts' | 'hoodies' | 'slippers' | 'caps' | 'polos' | 'nightwear';
    image?: string;
    isFavorite?: boolean;
    createdAt: string;
}

export interface Outfit {
    id: string;
    name: string;
    items: WardrobeItem[];
    occasion?: string;
    weather?: string;
    confidence: number;
    image?: string;
}

export interface Recommendation {
    id: string;
    outfit: Outfit;
    reason: string;
    occasion: string;
    weather?: string;
    sustainability?: number;
    image?: string;
}

/**
 * AUTH STORE
 * Manages user authentication, login state, and user profile
 */
export interface AuthStore {
    // State
    user: User | null;
    token: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;

    // Actions
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => void;
    login: (userData: AuthResponse) => void;
    updateUser: (data: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            // Initial state
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // Set user information
            setUser: (user) => set({ user, isAuthenticated: !!user }),

            // Update user partial information
            updateUser: (data) => set((state) => ({
                user: state.user ? { ...state.user, ...data } : null
            })),

            // Set authentication token
            setToken: (token) => set({ token }),

            // Set loading state for async operations
            setIsLoading: (isLoading) => set({ isLoading }),

            // Set error message
            setError: (error) => set({ error }),

            // Handle logout - clear all auth data
            logout: () => {
                // Clear cookie
                document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
                
                set({
                    user: null,
                    token: null,
                    refreshToken: null,
                    isAuthenticated: false,
                    error: null,
                });
            },

            // Handle login - store user and tokens
            login: (data) => {
                // Set cookie for middleware
                if (data.token) {
                    document.cookie = `auth-token=${data.token}; path=/; max-age=604800; SameSite=Lax`;
                }

                set({
                    user: data.user,
                    token: data.token,
                    refreshToken: data.refreshToken || null,
                    isAuthenticated: true,
                    error: null,
                });
            },
        }),
        {
            name: 'auth-store', // localStorage key
        }
    )
);

/**
 * WARDROBE STORE
 * Manages user's clothing items and wardrobe collection
 */
export interface WardrobeStore {
    // State
    items: WardrobeItem[];
    filteredItems: WardrobeItem[];
    isLoading: boolean;
    error: string | null;
    selectedCategory: string | null;
    selectedColor: string | null;
    searchQuery: string;

    // Actions
    setItems: (items: WardrobeItem[]) => void;
    addItem: (item: WardrobeItem) => void;
    removeItem: (itemId: string) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSelectedCategory: (category: string | null) => void;
    setSelectedColor: (color: string | null) => void;
    setSearchQuery: (query: string) => void;
    filterItems: () => void;
    toggleFavorite: (itemId: string) => void;
}

export const useWardrobeStore = create<WardrobeStore>()(
    persist(
        (set, get) => ({
            // Initial state: A collection of 140 unique items (10 per category)
            items: [
                // GOWNS (10 unique items)
                ...[
                    { name: 'Red Flowing Gown', id: '1774460699436-c408cc1408c3' },
                    { name: 'Vintage Brown Gown', id: '1776841819019-999c928d9928' },
                    { name: 'Staircase Elegance', id: '1776841818478-16dbaba4001a' },
                    { name: 'Sparkly Pink Dress', id: '1768767112566-dc12dbe40aae' },
                    { name: 'Marble Hall Gown', id: '1776841818483-700f88aace44' },
                    { name: 'Wedding White Dress', id: '1771254240476-6a2fb1ee7a0f' },
                    { name: 'Silver Rose Gown', id: '1764329343810-327cb3497f1a' },
                    { name: 'Gold Sparkle Dress', id: '1770344327399-0f5bb1f93756' },
                    { name: 'Royal Brown Gown', id: '1776841818487-3383b74bf1f8' },
                    { name: 'Ornate Occasion Dress', id: '1771774469794-f7b8ede0d0a4' }
                ].map((g, i) => ({
                    id: `gown-v6-${i+1}`, name: g.name, category: 'gowns', color: '#000000', 
                    image: `https://images.unsplash.com/photo-${g.id}?q=80&w=800`, createdAt: new Date().toISOString()
                })),

                // SHORTS (10 unique items)
                ...[
                    { name: 'Classic Denim Shorts', id: '1617817435745-1eb486e641a3' },
                    { name: 'Casual Summer Shorts', id: '1617953556171-ac63ba470a02' },
                    { name: 'Linen Comfort Shorts', id: '1617953644310-e690da9be982' },
                    { name: 'Urban Style Shorts', id: '1617953350574-d8f032ff3b29' },
                    { name: 'Rack Denim Shorts', id: '1617953734671-9f9d2971454a' },
                    { name: 'Beachfront Shorts', id: '1617951907145-53f6eb87a3a3' },
                    { name: 'Modern Female Shorts', id: '1617952236317-0bd127407984' },
                    { name: 'Khaki Adventure Shorts', id: '1617951639883-6a10179adb1e' },
                    { name: 'City Walker Shorts', id: '1714289742786-e96caadf80aa' },
                    { name: 'Vintage Denim Cutoffs', id: '1602437234309-f158b0f83155' }
                ].map((s, i) => ({
                    id: `shorts-v6-${i+1}`, name: s.name, category: 'shorts', color: '#1e40af', 
                    image: `https://images.unsplash.com/photo-${s.id}?q=80&w=800`, createdAt: new Date().toISOString()
                })),

                // TROUSERS (10 unique items)
                ...[
                    '1594633312681-425c7b97ccd1', '1624378439575-d8705ad7ae80', '1582552938357-32b906df40cb', 
                    '1594932224028-159197771bb7', '1584370848010-d7fe6bc767ec', '1506629864150-d3173d94266e',
                    '1517441581617-1d4274c160e1', '1524378439575-d8705ad7ae80', '1539533018447-63fcce2678e3',
                    '1541099649105-f69ad21f3246'
                ].map((id, i) => ({
                    id: `trousers-v6-${i+1}`, name: `${['Wool', 'Pleated', 'Check', 'Linen', 'Chino', 'Cargo', 'Slim', 'Tailored', 'Business', 'Formal'][i]} Trousers`, 
                    category: 'trousers', color: '#374151', image: `https://images.unsplash.com/photo-${id}?q=80&w=800`, createdAt: new Date().toISOString()
                })),

                // Other categories (110 items)
                ...Array.from({ length: 110 }).map((_, i) => {
                    const cats = ['tops', 'bottoms', 'outerwear', 'shoes', 'skirts', 'hoodies', 'accessories', 'slippers', 'polos', 'nightwear', 'caps'];
                    const cat = cats[i % cats.length];
                    const ids = [
                        '1583744179724-944445847494', '1562157879-1f1f07af489a', '1618354691373-d851c5e5a99ad', 
                        '1542291026-7eec264c27ff', '1525966222134-fcfa99b8ae77', '1556821840-3a63f95609a7', 
                        '1524592094714-0f0654e20314', '1595950653106-6c9ebd614d3a', '1598033129183-c4f50c717658', 
                        '1614705827065-65c3db473466', '1588850561407-ed78c282e89b', '1514327605112-b887c0e61c0a'
                    ];
                    return {
                        id: `gen-v6-${i}`, name: `${cat.charAt(0).toUpperCase() + cat.slice(1)} Variant ${Math.floor(i/cats.length) + 1}`, 
                        category: cat as any, 
                        color: '#000000', 
                        image: `https://images.unsplash.com/photo-${ids[(i + Math.floor(i/13)) % ids.length]}?q=80&w=800`,
                        createdAt: new Date().toISOString()
                    };
                })
            ],
            filteredItems: [],
            isLoading: false,
            error: null,
            selectedCategory: null,
            selectedColor: null,
            searchQuery: '',

            // Set all wardrobe items from API
            setItems: (items) => set({ items }),

            // Add single item to wardrobe
            addItem: (item) => {
                set((state) => ({
                    items: [...state.items, item],
                }));
                get().filterItems();
            },

            // Remove item from wardrobe by ID
            removeItem: (itemId) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== itemId),
                }));
                get().filterItems();
            },

            // Set loading state
            setIsLoading: (loading) => set({ isLoading: loading }),

            // Set error message
            setError: (error) => set({ error }),

            // Filter by category
            setSelectedCategory: (category) => {
                set({ selectedCategory: category });
                get().filterItems();
            },

            // Filter by color
            setSelectedColor: (color) => {
                set({ selectedColor: color });
                get().filterItems();
            },

            // Set search query
            setSearchQuery: (query) => {
                set({ searchQuery: query });
                get().filterItems();
            },

            // Filter items based on selected filters and search
            filterItems: () => {
                const state = get();
                let filtered = [...state.items];

                // Filter by category if selected
                if (state.selectedCategory) {
                    filtered = filtered.filter(
                        (item) => item.category === state.selectedCategory
                    );
                }

                // Filter by color if selected
                if (state.selectedColor) {
                    filtered = filtered.filter((item) => item.color === state.selectedColor);
                }

                // Filter by search query
                if (state.searchQuery) {
                    const query = state.searchQuery.toLowerCase();
                    filtered = filtered.filter((item) =>
                        item.name.toLowerCase().includes(query)
                    );
                }

                set({ filteredItems: filtered });
            },
            
            // Toggle favorite status for an item
            toggleFavorite: (itemId) => {
                set((state) => ({
                    items: state.items.map(item => 
                        item.id === itemId ? { ...item, isFavorite: !item.isFavorite } : item
                    )
                }));
                get().filterItems();
            },
        }),
        {
            name: 'wardrobe-store-v6',
        }
    )
);

/**
 * RECOMMENDATIONS STORE
 * Manages outfit recommendations and suggestions
 */
export interface RecommendationsStore {
    // State
    recommendations: Recommendation[];
    savedOutfits: Recommendation[];
    isLoading: boolean;
    error: string | null;

    // Actions
    setRecommendations: (recommendations: Recommendation[]) => void;
    addRecommendation: (recommendation: Recommendation) => void;
    removeRecommendation: (id: string) => void;
    setIsLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    toggleSaveOutfit: (recommendation: Recommendation) => void;
}

export const useRecommendationsStore = create<RecommendationsStore>()(
    persist(
        (set) => ({
            // Initial state
            recommendations: [],
            savedOutfits: [],
            isLoading: false,
            error: null,

            // Set all recommendations from API
            setRecommendations: (recommendations) => set({ recommendations }),

            // Add single recommendation
            addRecommendation: (recommendation) =>
                set((state) => ({
                    recommendations: [...state.recommendations, recommendation],
                })),

            // Remove recommendation by ID
            removeRecommendation: (id) =>
                set((state) => ({
                    recommendations: state.recommendations.filter(
                        (rec) => rec.id !== id
                    ),
                })),

            // Set loading state
            setIsLoading: (loading) => set({ isLoading: loading }),

            // Set error message
            setError: (error) => set({ error }),

            // Toggle save status for an outfit
            toggleSaveOutfit: (rec) => {
                set((state) => {
                    const isSaved = state.savedOutfits.find(s => s.id === rec.id);
                    if (isSaved) {
                        return { savedOutfits: state.savedOutfits.filter(s => s.id !== rec.id) };
                    } else {
                        return { savedOutfits: [...state.savedOutfits, rec] };
                    }
                });
            }
        }),
        {
            name: 'recommendations-store',
        }
    )
);

/**
 * UI STORE
 * Manages global UI state like modals, theme, and notifications
 */
export interface UIStore {
    // State
    isDarkMode: boolean;
    sidebarOpen: boolean;
    mobileMenuOpen: boolean;

    // Actions
    toggleDarkMode: () => void;
    setSidebarOpen: (open: boolean) => void;
    setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>()(
    persist(
        (set) => ({
            // Initial state
            isDarkMode: false,
            sidebarOpen: true,
            mobileMenuOpen: false,

            // Toggle dark mode theme
            toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

            // Control sidebar visibility
            setSidebarOpen: (open) => set({ sidebarOpen: open }),

            // Control mobile menu visibility
            setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
        }),
        {
            name: 'ui-store',
        }
    )
);
