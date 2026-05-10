/**
 * Registration Page
 * New user account creation with form validation
 * Includes password strength indicator and terms agreement
 */

'use client';

import React, { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Loader2, CheckCircle2 } from 'lucide-react';
import { AuthResponse } from '@/lib/types';
import { useAuthStore } from '@/lib/store';
import {authAPI} from "@/lib/api-clients";

/**
 * Password strength calculator
 * Returns strength level and visual feedback
 */
function calculatePasswordStrength(password: string): {
    strength: 'weak' | 'medium' | 'strong';
    score: number;
} {
    let score = 0;

    // Check length
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    // Check character variety
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 2) return { strength: 'weak', score };
    if (score <= 4) return { strength: 'medium', score };
    return { strength: 'strong', score };
}

/**
 * Registration page component
 */
export default function RegisterPage() {
    // Form state management
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Router for navigation after successful registration
    const router = useRouter();

    // Get auth store actions from Zustand
    const { login } = useAuthStore();

    // Calculate password strength
    const passwordStrength = calculatePasswordStrength(password);

    /**
     * Handle form submission
     * Validates input, calls register API, and redirects on success
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        // Prevent default form submission
        e.preventDefault();

        // Reset previous errors
        setError('');

        // Validate all fields are filled
        if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            setError('Please fill in all fields');
            return;
        }

        // Validate full name
        if (fullName.trim().length < 2) {
            setError('Full name must be at least 2 characters');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Validate password length
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        // Validate password strength
        if (passwordStrength.strength === 'weak') {
            setError('Password is too weak. Use uppercase, lowercase, numbers, and symbols.');
            return;
        }

        // Validate passwords match
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate terms acceptance
        if (!acceptTerms) {
            setError('Please accept the terms and conditions');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // Call registration API with user data
            const response = await authAPI.register(email, password, fullName);

            if (response.success && response.data) {
                // Extract authentication token from response
                const authData = response.data as AuthResponse;

                // Store in Zustand store (automatically persists to localStorage)
                login(authData);

                // Store token in localStorage for API calls
                if (authData.token) {
                    localStorage.setItem('auth-token', authData.token);
                }

                // Navigate to profile after successful registration
                router.replace('/profile');
            } else {
                // Display error message from API if registration failed
                setError(response.error || 'Registration failed. Please try again.');
                setIsLoading(false);
            }
        } catch (err) {
            // Handle network or unexpected errors
            setError('An error occurred. Please try again later.');
            console.error('[v0] Registration error:', err);
            setIsLoading(false);
        }
    };

    /**
     * Toggle password visibility
     */
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    /**
     * Toggle confirm password visibility
     */
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <MainLayout hideFooter>
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md shadow-lg">
                    <div className="p-8 sm:p-10">
                        {/* Page Header */}
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                Create Account
                            </h1>
                            <p className="text-muted-foreground">
                                Join StyleSmart and discover your perfect style
                            </p>
                        </div>

                        {/* Error Message Display */}
                        {error && (
                            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )}

                        {/* Registration Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Full Name Input Field */}
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-sm font-medium">
                                    Full Name
                                </Label>
                                <div className="relative">
                                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        disabled={isLoading}
                                        className="pl-10 h-11 bg-input border-border focus:border-accent focus:ring-accent"
                                    />
                                </div>
                            </div>

                            {/* Email Input Field */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isLoading}
                                        className="pl-10 h-11 bg-input border-border focus:border-accent focus:ring-accent"
                                    />
                                </div>
                            </div>

                            {/* Password Input Field */}
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                        className="pl-10 pr-10 h-11 bg-input border-border focus:border-accent focus:ring-accent text-foreground"
                                        autoComplete="new-password"
                                    />
                                    {/* Password visibility toggle button - click to show/hide password */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            togglePasswordVisibility();
                                        }}
                                        disabled={isLoading}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors disabled:opacity-50 p-1"
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {password && (
                                    <div className="mt-2">
                                        <div className="flex gap-1 mb-1">
                                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                                <div
                                                    key={i}
                                                    className={`h-1 flex-1 rounded-full transition-colors ${
                                                        i <= passwordStrength.score
                                                            ? passwordStrength.strength === 'weak'
                                                                ? 'bg-destructive'
                                                                : passwordStrength.strength === 'medium'
                                                                    ? 'bg-accent'
                                                                    : 'bg-primary'
                                                            : 'bg-border'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-xs text-muted-foreground capitalize">
                                            Password strength: {passwordStrength.strength}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Input Field */}
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" className="text-sm font-medium">
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={isLoading}
                                        className="pl-10 pr-10 h-11 bg-input border-border focus:border-accent focus:ring-accent text-foreground"
                                        autoComplete="new-password"
                                    />
                                    {/* Password visibility toggle button - click to show/hide confirm password */}
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            toggleConfirmPasswordVisibility();
                                        }}
                                        disabled={isLoading}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-accent transition-colors disabled:opacity-50 p-1"
                                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                {/* Password Match Indicator */}
                                {confirmPassword && password && (
                                    <div className="flex items-center gap-2 mt-1">
                                        {password === confirmPassword ? (
                                            <>
                                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                                <p className="text-xs text-primary font-medium">Passwords match</p>
                                            </>
                                        ) : (
                                            <p className="text-xs text-destructive font-medium">Passwords do not match</p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Terms and Conditions Checkbox */}
                            <div className="flex items-start gap-3">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={acceptTerms}
                                    onChange={(e) => setAcceptTerms(e.target.checked)}
                                    disabled={isLoading}
                                    className="mt-1 w-4 h-4 rounded border-border cursor-pointer accent-accent"
                                />
                                <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer">
                                    I agree to the{' '}
                                    <Link href="/terms" className="text-accent hover:text-primary transition-colors">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="/privacy" className="text-accent hover:text-primary transition-colors">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-11 bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all duration-200"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="text-accent hover:text-primary font-medium transition-colors"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </MainLayout>
    );
}
