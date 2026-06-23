/**
 * Header/Navigation Component
 * Top navigation bar with brand logo, menu items, and user actions
 * Responsive design: stacked on mobile, horizontal on desktop
 */

'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {
    Menu,
    X,
    LogOut,
    User,
    MoreVertical,
    Sparkles,
    Calendar,
    ShoppingBag,
    Bot,
    Heart,
    MessageSquare
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useAuthStore} from '@/lib/store';

/**
 * Header component with responsive navigation
 * Uses Zustand for state management
 * Displays navigation to main pages: Wardrobe, Recommendations, Daily Outfit
 */
export function Header() {
    const router = useRouter();
    // Get user and auth data from Zustand store
    const {user, isAuthenticated, logout} = useAuthStore();

    // Mobile menu toggle state
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    /**
     * Handle mobile menu toggle
     */
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    /**
     * Close mobile menu after navigation
     */
    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    // Navigation links shown in header - only visible when authenticated
    const navLinks = [

        {label: 'Home', href: '/', icon: null},
        {label: 'Wardrobe', href: '/wardrobe', icon: ShoppingBag},
        {label: 'AI Stylist', href: '/ai-stylist', icon: Bot},
        {label: 'Daily Outfit', href: '/daily-outfit', icon: Calendar},
        {label: 'Saved Gems', href: '/favorites', icon: Heart},
        {label: 'Recommendations', href: '/recommendations', icon: Sparkles},
        {label: 'AI Chat', href: '/ai-assistant', icon: MessageSquare},
    ];

    return (
        <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <Link
                        href="/"
                        className="flex items-center gap-2 flex-shrink-0 group"
                        onClick={closeMobileMenu}
                    >
                        {/* Brand text with hover effect */}
                        <div className="flex items-center gap-2">
                            <div
                                className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-sm">
                                S
                            </div>
                            <span
                                className="text-lg font-bold text-foreground hidden sm:inline group-hover:text-accent transition-colors">
                StyleSmart
              </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation Menu - only show for authenticated users */}
                    {isAuthenticated && (
                        <nav className="hidden md:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className="px-3 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-muted rounded-md transition-all duration-200 flex items-center gap-2"
                                    >
                                        {Icon && <Icon className="w-4 h-4"/>}
                                        {link.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    )}

                    {/* User Actions Area */}
                    <div className="flex items-center gap-2">
                        {isAuthenticated && user ? (
                            // Authenticated user actions
                            <div className="hidden sm:flex items-center gap-3">
                                <span className="text-sm text-muted-foreground">
                                    {user.fullName.split(' ')[0]}
                                </span>
                                {user.avatar ? (
                                    <img
                                        src={user.avatar}
                                        alt={user.fullName}
                                        className="w-8 h-8 rounded-full object-cover border border-accent"
                                    />
                                ) : (
                                    <div
                                        className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center text-xs font-bold">
                                        {user.fullName.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                        ) : (
                            // Unauthenticated user actions
                            <div className="hidden sm:flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    asChild
                                    className="text-sm font-medium"
                                >
                                    <Link href="/login">Sign In</Link>
                                </Button>
                                <Button
                                    size="sm"
                                    asChild
                                    className="text-sm font-medium"
                                >
                                    <Link href="/register">Sign Up</Link>
                                </Button>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-muted hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6"/>
                            ) : (
                                <Menu className="w-6 h-6"/>
                            )}
                        </button>

                        {/* User menu dropdown for authenticated users - Desktop */}
                        {isAuthenticated && (
                            <div className="hidden sm:block">
                                <details className="relative inline-block">
                                    <summary
                                        className="cursor-pointer p-2 rounded-md hover:bg-muted transition-colors"
                                        // aria-label="User menu"
                                    >
                                        {/*<MoreVertical className="w-5 h-5" />*/}
                                    </summary>
                                    <div
                                        className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-2 z-10">
                                        <Link
                                            href="/profile"
                                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors"
                                            onClick={closeMobileMenu}
                                        >
                                            <User className="w-4 h-4"/>
                                            Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                // Clear user from Zustand store and localStorage
                                                logout();
                                                localStorage.removeItem('userToken');
                                                localStorage.removeItem('refreshToken');
                                                router.push('/login');
                                            }}
                                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted w-full text-left text-destructive transition-colors"
                                        >
                                            <LogOut className="w-4 h-4"/>
                                            Logout
                                        </button>
                                    </div>
                                </details>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation Menu - Slides down when menu button is clicked */}
                {isMobileMenuOpen && (
                    <nav className="md:hidden pb-4 border-t border-border">
                        <div className="flex flex-col gap-2 pt-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="px-4 py-2 text-sm font-medium text-foreground hover:text-accent hover:bg-muted rounded-md transition-all duration-200"
                                    onClick={closeMobileMenu}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Mobile Auth Links */}
                            {!isAuthenticated && (
                                <div className="flex flex-col gap-2 pt-2 border-t border-border">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        asChild
                                        className="w-full justify-start"
                                    >
                                        <Link href="/login" onClick={closeMobileMenu}>
                                            Sign In
                                        </Link>
                                    </Button>
                                    <Button
                                        size="sm"
                                        asChild
                                        className="w-full justify-start"
                                    >
                                        <Link href="/register" onClick={closeMobileMenu}>
                                            Sign Up
                                        </Link>
                                    </Button>
                                </div>
                            )}

                            {/* Mobile User Menu */}
                            {isAuthenticated && (
                                <div className="flex flex-col gap-2 pt-2 border-t border-border">
                                    <Link
                                        href="/profile"
                                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted rounded-md transition-colors"
                                        onClick={closeMobileMenu}
                                    >
                                        <User className="w-4 h-4"/>
                                        Profile
                                    </Link>
                                    <button
                                        onClick={() => {
                                            // Clear user from Zustand store and localStorage
                                            logout();
                                            localStorage.removeItem('userToken');
                                            localStorage.removeItem('refreshToken');
                                            closeMobileMenu();
                                            router.push('/login');
                                        }}
                                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted rounded-md text-destructive w-full transition-colors"
                                    >
                                        <LogOut className="w-4 h-4"/>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </nav>
                )}
            </div>
        </header>
    );
}
