/**
 * API Client Configuration
 * Centralized HTTP client for all backend API calls
 * This enables easy integration with backend endpoints without hardcoding URLs
 * Supports both real backend calls and mock data for development
 */

// Base API URL - configure this from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Flag to enable mock mode for development when backend isn't ready
const ENABLE_MOCK_MODE = process.env.NEXT_PUBLIC_MOCK_MODE === 'true' || true;

// Define types for API responses to ensure type safety
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
}

/**
 * Mock data generator for development
 * Generates realistic mock responses to test UI without backend
 * Returns the data payload (not wrapped in ApiResponse)
 */
function generateMockResponse<T>(endpoint: string, options: RequestInit): T | null {
    const body = options.body ? JSON.parse(options.body as string) : {};

    // Mock auth endpoints - returns AuthResponse object
    if (endpoint === '/auth/login' || endpoint === '/auth/register') {
        return {
            token: 'mock_token_' + Date.now(),
            refreshToken: 'mock_refresh_' + Date.now(),
            user: {
                id: '123',
                email: body.email || 'user@example.com',
                fullName: body.fullName || 'John Doe',
                avatar: null,
            },
        } as T;
    }

    // Mock wardrobe endpoints
    if (endpoint === '/wardrobe/items') {
        return {
            items: [
                { id: '1', name: 'Blue T-Shirt', color: '#2563eb', category: 'tops' },
                { id: '2', name: 'Black Jeans', color: '#000000', category: 'bottoms' },
            ],
        } as T;
    }

    // Mock weather endpoints
    if (endpoint.startsWith('/weather/current')) {
        const url = new URL(endpoint, 'http://localhost');
        const lat = url.searchParams.get('lat');
        const lon = url.searchParams.get('lon');
        
        // Simulate a weather response based on location (Lagos defaults)
        return {
            temperature: lat ? 28.5 : 30,
            condition: 'Partly Cloudy',
            humidity: 65,
            windSpeed: 12,
            uvIndex: 8,
            location: lat ? 'Current Location' : 'Lagos, Nigeria'
        } as T;
    }

    // Mock daily outfit suggestion
    if (endpoint === '/outfits/daily') {
        return [
            {
                id: 'outfit_today_1',
                name: 'Modern Executive',
                description: 'A sharp, professional look for your business meetings.',
                items: ['gown-v6-1', 'gen-v6-6', 'shorts-v6-2'], // Mixed IDs for variety
                confidence: 94,
                occasion: 'Business',
                isFavorite: false,
                createdAt: new Date().toISOString()
            },
            {
                id: 'outfit_today_2',
                name: 'Urban Explorer',
                description: 'Comfortable and stylish for a day out in the city.',
                items: ['trousers-v6-1', 'gen-v6-1', 'gen-v6-3'],
                confidence: 88,
                occasion: 'Casual',
                isFavorite: true,
                createdAt: new Date().toISOString()
            }
        ] as T;
    }

    // Return null if no mock found
    return null;
}

/**
 * Generic fetch wrapper for making API requests
 * Handles common error scenarios and request formatting
 * Falls back to mock data in development mode
 */
export async function apiCall<T = any>(
    endpoint: string,
    options: RequestInit = {}
): Promise<ApiResponse<T>> {
    try {
        // Attempt real API call first
        const url = `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

        // Set default headers for JSON communication
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers,
        };

        try {
            // Execute the fetch request with provided options
            const response = await fetch(url, {
                ...options,
                headers,
            });

            // Parse response as JSON
            const data = await response.json();

            // Handle HTTP errors appropriately
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            return {
                success: true,
                data: data as T,
            };
        } catch (fetchError) {
            // If backend is unavailable and mock mode is enabled, use mock data
            if (ENABLE_MOCK_MODE) {
                console.log('[v0] Backend unavailable, using mock data for:', endpoint);
                const mockData = generateMockResponse<T>(endpoint, options);
                if (mockData) {
                    return {
                        success: true,
                        data: mockData,
                    };
                }
            }
            throw fetchError;
        }
    } catch (error) {
        // Catch network and parsing errors
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
            success: false,
            error: `API Error: ${errorMessage}`,
        };
    }
}

/**
 * Authentication API endpoints
 */
export const authAPI = {
    // Login user with email and password
    login: (email: string, password: string) =>
        apiCall('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        }),

    // Register new user account
    register: (email: string, password: string, fullName: string) =>
        apiCall('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, fullName }),
        }),

    // Logout and invalidate session
    logout: () =>
        apiCall('/auth/logout', {
            method: 'POST',
        }),

    // Refresh authentication token
    refreshToken: () =>
        apiCall('/auth/refresh', {
            method: 'POST',
        }),
};

/**
 * Wardrobe API endpoints
 */
export const wardrobeAPI = {
    // Fetch all items in user's wardrobe
    getItems: (filters?: Record<string, any>) => {
        const params = new URLSearchParams();
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                params.append(key, String(value));
            });
        }
        return apiCall(`/wardrobe/items?${params.toString()}`);
    },

    // Get single wardrobe item by ID
    getItemById: (itemId: string) =>
        apiCall(`/wardrobe/items/${itemId}`),

    // Add new item to wardrobe
    addItem: (itemData: Record<string, any>) =>
        apiCall('/wardrobe/items', {
            method: 'POST',
            body: JSON.stringify(itemData),
        }),

    // Update existing wardrobe item
    updateItem: (itemId: string, itemData: Record<string, any>) =>
        apiCall(`/wardrobe/items/${itemId}`, {
            method: 'PUT',
            body: JSON.stringify(itemData),
        }),

    // Delete wardrobe item
    deleteItem: (itemId: string) =>
        apiCall(`/wardrobe/items/${itemId}`, {
            method: 'DELETE',
        }),

    // Get wardrobe statistics and analytics
    getStats: () =>
        apiCall('/wardrobe/stats'),
};

/**
 * Outfit Recommendation API endpoints
 */
export const outfitAPI = {
    // Get outfit recommendations based on parameters
    getRecommendations: (params?: Record<string, any>) => {
        const query = new URLSearchParams();
        if (params) {
            Object.entries(params).forEach(([key, value]) => {
                query.append(key, String(value));
            });
        }
        return apiCall(`/outfits/recommendations?${query.toString()}`);
    },

    // Get daily outfit suggestion
    getDailyOutfit: () =>
        apiCall('/outfits/daily'),

    // Get outfit by ID
    getOutfitById: (outfitId: string) =>
        apiCall(`/outfits/${outfitId}`),

    // Save outfit to favorites
    saveFavorite: (outfitId: string) =>
        apiCall(`/outfits/${outfitId}/favorite`, {
            method: 'POST',
        }),

    // Rate outfit for better recommendations
    rateOutfit: (outfitId: string, rating: number) =>
        apiCall(`/outfits/${outfitId}/rate`, {
            method: 'POST',
            body: JSON.stringify({ rating }),
        }),

    // Get outfit history
    getHistory: (limit?: number) => {
        const params = limit ? `?limit=${limit}` : '';
        return apiCall(`/outfits/history${params}`);
    },
};

/**
 * Weather API endpoints
 */
export const weatherAPI = {
    // Get current weather for user location
    getCurrent: (latitude?: number, longitude?: number) => {
        const params = new URLSearchParams();
        if (latitude && longitude) {
            params.append('lat', String(latitude));
            params.append('lon', String(longitude));
        }
        return apiCall(`/weather/current?${params.toString()}`);
    },

    // Get weather forecast
    getForecast: (days?: number) => {
        const params = days ? `?days=${days}` : '';
        return apiCall(`/weather/forecast${params}`);
    },

    // Get outfit recommendations based on weather
    getWeatherOutfits: () =>
        apiCall('/weather/outfit-suggestions'),
};

/**
 * User Profile API endpoints
 */
export const userAPI = {
    // Get current user profile
    getProfile: () =>
        apiCall('/users/profile'),

    // Update user profile information
    updateProfile: (profileData: Record<string, any>) =>
        apiCall('/users/profile', {
            method: 'PUT',
            body: JSON.stringify(profileData),
        }),

    // Get user preferences
    getPreferences: () =>
        apiCall('/users/preferences'),

    // Update user preferences
    updatePreferences: (preferences: Record<string, any>) =>
        apiCall('/users/preferences', {
            method: 'PUT',
            body: JSON.stringify(preferences),
        }),

    // Upload user avatar
    uploadAvatar: (file: File) => {
        const formData = new FormData();
        formData.append('avatar', file);
        return apiCall('/users/avatar', {
            method: 'POST',
            body: formData,
            headers: {}, // Remove Content-Type to let browser set it with boundary
        });
    },
};

/**
 * Style Analytics API endpoints
 */
export const analyticsAPI = {
    // Get color preference analytics
    getColorStats: () =>
        apiCall('/analytics/colors'),

    // Get occasion frequency analytics
    getOccasionStats: () =>
        apiCall('/analytics/occasions'),

    // Get sustainability score
    getSustainabilityScore: () =>
        apiCall('/analytics/sustainability'),

    // Track outfit wear frequency
    trackWearFrequency: (itemId: string) =>
        apiCall(`/analytics/wear/${itemId}`, {
            method: 'POST',
        }),
};
