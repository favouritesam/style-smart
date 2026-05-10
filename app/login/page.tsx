/**
 * Login Page
 * User authentication form with email and password
 * Features form validation, error handling, and success redirection
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
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';
// import { authAPI } from '@/lib/api-client';
import { AuthResponse } from '@/lib/types';
import { useAuthStore } from '@/lib/store';
import {authAPI} from "@/lib/api-clients";

/**
 * Login page component
 */
export default function LoginPage() {
    // Form state management
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Router for navigation after successful login
    const router = useRouter();

    // Get auth store actions from Zustand
    const { login } = useAuthStore();

    /**
     * Handle form submission
     * Validates input, calls login API, and redirects on success
     */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        // Prevent default form submission
        e.preventDefault();

        // Reset previous errors
        setError('');

        // Validate input fields
        if (!email.trim() || !password.trim()) {
            setError('Please fill in all fields');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Validate password length
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        setIsLoading(true);

        try {
            // Call login API with credentials
            const response = await authAPI.login(email, password);

            // Debug: log the response to understand its structure
            console.log('[v0] Login response:', response);

            if (response.success && response.data) {
                // Extract authentication token from response
                const authData = response.data as AuthResponse;

                // Store in Zustand store (automatically persists to localStorage via Zustand middleware)
                login(authData);

                // Store token in localStorage for API calls
                if (authData.token) {
                    localStorage.setItem('auth-token', authData.token);
                }

                // Navigate to home page after successful login
                router.replace('/');
            } else {
                // Display error message from API
                setError(response.error || 'Login failed. Please try again.');
                setIsLoading(false);
            }
        } catch (err) {
            // Handle network or unexpected errors
            setError('An error occurred. Please try again later.');
            console.error('[v0] Login error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Toggle password visibility
     */
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <MainLayout hideFooter>
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <Card className="w-full max-w-md shadow-lg">
                    <div className="p-8 sm:p-10">
                        {/* Page Header */}
                        <div className="mb-8 text-center">
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                Welcome Back
                            </h1>
                            <p className="text-muted-foreground">
                                Sign in to your StyleSmart account
                            </p>
                        </div>

                        {/* Error Message Display */}
                        {error && (
                            <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                                <p className="text-sm text-destructive">{error}</p>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
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
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-sm font-medium">
                                        Password
                                    </Label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-xs text-accent hover:text-primary transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isLoading}
                                        className="pl-10 pr-10 h-11 bg-input border-border focus:border-accent focus:ring-accent"
                                    />
                                    {/* Password visibility toggle button */}
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        disabled={isLoading}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                                        aria-label="Toggle password visibility"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
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
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </Button>
                        </form>

                        {/* Sign Up Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-muted-foreground">
                                Don&apos;t have an account?{' '}
                                <Link
                                    href="/register"
                                    className="text-accent hover:text-primary font-medium transition-colors"
                                >
                                    Create one here
                                </Link>
                            </p>
                        </div>

                        {/* Demo Credentials (For Testing) */}
                        <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
                            <p className="text-xs text-muted-foreground font-medium mb-2">
                                Demo Credentials:
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Email: <span className="font-mono text-foreground">demo@stylesmart.com</span>
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Password: <span className="font-mono text-foreground">demo123</span>
                            </p>
                        </div>
                    </div>
                </Card>
            </div>
        </MainLayout>
    );
}
