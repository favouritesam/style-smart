/**
 * Main Layout Wrapper
 * Provides consistent header, footer, and layout structure across all pages
 * Ensures responsive design and proper spacing
 */

import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface MainLayoutProps {
    children: React.ReactNode;
    fullWidth?: boolean; // Option to disable max-width constraint
    hideFooter?: boolean; // Option to hide footer on specific pages
}

/**
 * Main layout component wrapping header, content, and footer
 */
export function MainLayout({
                               children,
                               fullWidth = false,
                               hideFooter = false,
                           }: MainLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header - Fixed at top */}
            <Header />

            {/* Main Content Area - Grows to fill available space */}
            <main
                className={`flex-1 ${
                    fullWidth ? 'w-full' : 'w-full'
                }`}
            >
                <div
                    className={`${
                        fullWidth
                            ? 'w-full'
                            : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
                    }`}
                >
                    {children}
                </div>
            </main>

            {/* Footer - Pinned to bottom */}
            {!hideFooter && <Footer />}
        </div>
    );
}
