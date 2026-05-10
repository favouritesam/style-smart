/**
 * Onboarding Page
 * First-time user setup wizard for style preferences and wardrobe initialization
 * Features: style preference selection, wardrobe tour, and feature introduction
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    ChevronRight,
    CheckCircle2,
    Sparkles,
    Package,
    Cloud,
    Calendar,
    Heart,
} from 'lucide-react';
import { useAppContext } from '@/lib/context';
import {userAPI} from "@/lib/api-clients";
import {useRouter} from "next/navigation";
import {MainLayout} from "@/components/layout/MainLayout";
// import { userAPI } from '@/lib/api-client';

/**
 * Onboarding page component with multi-step wizard
 */
export default function OnboardingPage() {
    // Get user context
    const { user, isAuthenticated } = useAppContext();
    const router = useRouter();

    // Onboarding state
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedStyle, setSelectedStyle] = useState<string>('');
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Style options for selection
    const styleOptions = [
        {
            id: 'casual',
            label: 'Casual',
            description: 'Relaxed, comfortable, everyday look',
            emoji: '😎',
        },
        {
            id: 'formal',
            label: 'Formal',
            description: 'Professional, polished, sophisticated',
            emoji: '🎩',
        },
        {
            id: 'minimalist',
            label: 'Minimalist',
            description: 'Simple, clean, essential pieces',
            emoji: '⚪',
        },
        {
            id: 'bohemian',
            label: 'Bohemian',
            description: 'Free-spirited, artistic, eclectic',
            emoji: '🌸',
        },
        {
            id: 'classic',
            label: 'Classic',
            description: 'Timeless, elegant, refined style',
            emoji: '✨',
        },
        {
            id: 'trendy',
            label: 'Trendy',
            description: 'Fashion-forward, current, bold',
            emoji: '🚀',
        },
    ];

    // Color options for selection
    const colorOptions = [
        'Black',
        'White',
        'Gray',
        'Navy',
        'Blue',
        'Red',
        'Pink',
        'Green',
        'Brown',
        'Beige',
        'Purple',
    ];

    /**
     * Toggle color selection
     */
    const toggleColor = (color: string) => {
        setSelectedColors((prev) =>
            prev.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color]
        );
    };

    /**
     * Handle next step or finish onboarding
     */
    const handleNext = async () => {
        if (currentStep === 3) {
            // Save preferences and finish
            setIsLoading(true);
            try {
                // Update user preferences in backend
                const response = await userAPI.updatePreferences({
                    style: selectedStyle,
                    favoriteColors: selectedColors,
                });

                if (response.success) {
                    // Redirect to profile page
                    router.push('/profile');
                }
            } catch (err) {
                console.error('[v0] Error saving preferences:', err);
            } finally {
                setIsLoading(false);
            }
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    /**
     * Handle skip onboarding
     */
    const handleSkip = () => {
        router.push('/profile');
    };

    // Check authentication
    if (!isAuthenticated || !user) {
        return (
            <MainLayout hideFooter>
                <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12">
                    <Card className="w-full max-w-md p-8 text-center">
                        <h2 className="text-2xl font-bold text-foreground mb-4">
                            Sign up to get started
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Create an account to personalize your StyleSmart experience
                        </p>
                        <Button asChild className="w-full bg-primary hover:bg-primary/90">
                            <Link href="/register">Create Account</Link>
                        </Button>
                    </Card>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout hideFooter>
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
                <div className="w-full max-w-2xl">
                    {/* Progress Bar */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">
                Step {currentStep} of 3
              </span>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleSkip}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                Skip
                            </Button>
                        </div>
                        <div className="h-2 bg-border rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${(currentStep / 3) * 100}%` }}
                            />
                        </div>
                    </div>

                    {/* Step 1: Welcome */}
                    {currentStep === 1 && (
                        <Card className="p-8 sm:p-12">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-4xl mx-auto mb-6">
                                    👋
                                </div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Welcome to StyleSmart!
                                </h1>
                                <p className="text-lg text-muted-foreground">
                                    Let&apos;s set up your profile to get personalized outfit
                                    recommendations
                                </p>
                            </div>

                            {/* Features Overview */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                                        <Sparkles className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">
                                            AI-Powered Recommendations
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Get outfit suggestions tailored to your style and
                                            preferences
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                                        <Cloud className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">
                                            Weather Integration
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Outfits that match the weather and your plans
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                                        <Package className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">
                                            Smart Wardrobe
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Organize and track all your clothing items in one place
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                                        <Calendar className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">
                                            Daily Outfit Picker
                                        </h3>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Start your day with the perfect outfit picked just for
                                            you
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* CTA Button */}
                            <Button
                                onClick={handleNext}
                                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2"
                            >
                                Get Started <ChevronRight className="w-5 h-5" />
                            </Button>
                        </Card>
                    )}

                    {/* Step 2: Style Selection */}
                    {currentStep === 2 && (
                        <Card className="p-8 sm:p-12">
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                What&apos;s your style?
                            </h1>
                            <p className="text-muted-foreground mb-8">
                                Help us understand your fashion preferences
                            </p>

                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                {styleOptions.map((style) => (
                                    <button
                                        key={style.id}
                                        onClick={() => setSelectedStyle(style.id)}
                                        className={`p-4 rounded-lg border-2 text-left transition-all ${
                                            selectedStyle === style.id
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-accent'
                                        }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-semibold text-foreground">
                                                {style.label}
                                            </h3>
                                            <span className="text-2xl">{style.emoji}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {style.description}
                                        </p>
                                    </button>
                                ))}
                            </div>

                            {/* Navigation */}
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentStep(1)}
                                    className="border-border hover:bg-muted"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    disabled={!selectedStyle}
                                    className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 disabled:opacity-50"
                                >
                                    Continue <ChevronRight className="w-5 h-5" />
                                </Button>
                            </div>
                        </Card>
                    )}

                    {/* Step 3: Color Preferences */}
                    {currentStep === 3 && (
                        <Card className="p-8 sm:p-12">
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                Favorite colors
                            </h1>
                            <p className="text-muted-foreground mb-8">
                                Select the colors you love to wear (at least 3)
                            </p>

                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => toggleColor(color)}
                                        className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 transition-all ${
                                            selectedColors.includes(color)
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-accent'
                                        }`}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full border-2"
                                            style={{
                                                backgroundColor: color.toLowerCase(),
                                                borderColor: color.toLowerCase() === 'white' ? '#ccc' : color.toLowerCase(),
                                            }}
                                        />
                                        <span className="text-xs font-medium text-foreground text-center">
                      {color}
                    </span>
                                        {selectedColors.includes(color) && (
                                            <CheckCircle2 className="w-4 h-4 text-primary absolute -top-2 -right-2" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            {/* Helper Text */}
                            <p className="text-sm text-muted-foreground mb-8">
                                {selectedColors.length === 0
                                    ? 'Select at least 3 colors'
                                    : `${selectedColors.length} selected`}
                            </p>

                            {/* Navigation */}
                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setCurrentStep(2)}
                                    className="border-border hover:bg-muted"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleNext}
                                    disabled={selectedColors.length < 3 || isLoading}
                                    className="flex-1 h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold gap-2 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <>
                                            <Sparkles className="w-5 h-5 animate-spin" />
                                            Finishing...
                                        </>
                                    ) : (
                                        <>
                                            Complete <CheckCircle2 className="w-5 h-5" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </MainLayout>
    );
}
