/**
 * TypeScript Type Definitions for StyleSmart App
 * Defines all data models and interface contracts
 */

/**
 * User authentication and profile types
 */
export interface User {
    id: string;
    email: string;
    fullName: string;
    avatar?: string;
    stylePreferences?: StylePreferences;
    createdAt: string;
    updatedAt: string;
}

export interface StylePreferences {
    favoriteColors: string[];
    preferredOccasions: string[];
    clothingSizes: {
        top?: string;
        bottom?: string;
        dress?: string;
        shoes?: string;
    };
    budget?: number;
    style: 'casual' | 'formal' | 'minimalist' | 'bohemian' | 'classic' | 'trendy';
}

/**
 * Wardrobe item types
 */
export interface WardrobeItem {
    id: string;
    userId: string;
    name: string;
    category: 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';
    color: string;
    pattern?: string;
    size?: string;
    brand?: string;
    price?: number;
    purchaseDate?: string;
    image: string;
    condition: 'new' | 'like-new' | 'good' | 'worn' | 'archived';
    occasions: string[];
    tags: string[];
    lastWorn?: string;
    wearCount: number;
    isVegan?: boolean;
    material?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Outfit composition and recommendation types
 */
export interface Outfit {
    id: string;
    userId: string;
    name?: string;
    items: string[]; // Array of WardrobeItem IDs
    occasion?: string;
    season?: 'spring' | 'summer' | 'fall' | 'winter';
    confidence?: number; // 0-100 score
    colorHarmony?: number; // 0-100 score
    styleScore?: number; // 0-100 score
    description?: string;
    image?: string;
    isFavorite: boolean;
    wearDate?: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * Weather-based outfit data
 */
export interface WeatherOutfitSuggestion {
    id: string;
    outfit: Outfit;
    temperature: number;
    weatherCondition: string;
    temperatureRange: {
        min: number;
        max: number;
    };
    suitabilityScore: number; // 0-100
}

/**
 * Weather and location information
 */
export interface WeatherData {
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    uvIndex?: number;
    sunrise?: string;
    sunset?: string;
    forecast?: WeatherForecast[];
}

export interface WeatherForecast {
    date: string;
    highTemp: number;
    lowTemp: number;
    condition: string;
    precipitation?: number;
}

/**
 * Daily outfit picker state
 */
export interface DailyOutfitPicker {
    date: string;
    outfit?: Outfit;
    weather?: WeatherData;
    occasion?: string;
    mood?: 'confident' | 'casual' | 'comfortable' | 'adventurous' | 'formal';
    notes?: string;
}

/**
 * Style analytics and statistics
 */
export interface StyleAnalytics {
    colorPreferences: Record<string, number>;
    categoryUsage: Record<string, number>;
    occasionFrequency: Record<string, number>;
    seasonalTrends: Record<string, number>;
    averageOutfitValue: number;
    totalWearableValue: number;
    mostWornItems: WardrobeItem[];
    leastWornItems: WardrobeItem[];
}

/**
 * Sustainability tracking
 */
export interface SustainabilityScore {
    totalScore: number; // 0-100
    veganItems: number;
    sustainableBrands: number;
    locallySourced: number;
    recommendation: string;
}

/**
 * Comment/feedback on outfits
 */
export interface OutfitComment {
    id: string;
    outfitId: string;
    userId: string;
    text: string;
    rating: number; // 1-5 stars
    createdAt: string;
}

/**
 * Notification types
 */
export interface Notification {
    id: string;
    userId: string;
    type: 'reminder' | 'suggestion' | 'alert' | 'achievement';
    title: string;
    message: string;
    actionUrl?: string;
    read: boolean;
    createdAt: string;
}

/**
 * User achievement/badge system
 */
export interface Achievement {
    id: string;
    userId: string;
    type: 'stylist' | 'explorer' | 'sustainable' | 'consistent' | 'trendsetter';
    title: string;
    description: string;
    icon: string;
    unlockedAt: string;
}

/**
 * Filter and search parameters
 */
export interface WardrobeFilter {
    category?: string;
    color?: string;
    occasion?: string;
    season?: string;
    condition?: string;
    tags?: string[];
    brand?: string;
    priceRange?: {
        min: number;
        max: number;
    };
    search?: string;
}

export interface OutfitFilter {
    occasion?: string;
    season?: string;
    minConfidence?: number;
    isFavorite?: boolean;
    search?: string;
}

/**
 * Authentication response types
 */
export interface AuthResponse {
    user: User;
    token: string;
    refreshToken?: string;
}

/**
 * Form submission types
 */
export interface AddWardrobeItemForm {
    name: string;
    category: WardrobeItem['category'];
    color: string;
    pattern?: string;
    size?: string;
    brand?: string;
    price?: number;
    occasions: string[];
    tags: string[];
    material?: string;
    isVegan?: boolean;
}

export interface UserProfileForm {
    fullName: string;
    email: string;
    stylePreferences?: StylePreferences;
}

/**
 * Pagination helper type
 */
export interface PaginatedResponse<T> {
    items: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}
