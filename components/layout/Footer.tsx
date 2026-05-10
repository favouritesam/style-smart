/**
 * Footer Component
 * Bottom section with links, copyright, and app information
 * Responsive design: stacked on mobile, multi-column on desktop
 */

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

/**
 * Footer section with company info and links
 */
export function Footer() {
    const currentYear = new Date().getFullYear();

    // Footer link sections
    const linkSections = [
        {
            title: 'Product',
            links: [
                { label: 'Features', href: '/features' },
                { label: 'How it Works', href: '/how-it-works' },
                { label: 'Pricing', href: '/pricing' },
                { label: 'Blog', href: '/blog' },
            ],
        },
        {
            title: 'Company',
            links: [
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Careers', href: '/careers' },
                { label: 'Press', href: '/press' },
            ],
        },
        {
            title: 'Legal',
            links: [
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Cookie Policy', href: '/cookies' },
                { label: 'Accessibility', href: '/accessibility' },
            ],
        },
    ];

    return (
        <footer className="bg-card border-t border-border mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Footer content grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand and description column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-sm">
                                S
                            </div>
                            <span className="text-lg font-bold text-foreground">StyleSmart</span>
                        </Link>
                        <p className="text-sm text-muted-foreground mb-4">
                            Your personal AI fashion assistant. Discover the perfect outfit every day.
                        </p>
                        {/* Social links placeholder */}
                        <div className="flex gap-4">
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-accent transition-colors"
                                aria-label="Twitter"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7a4.5 4.5 0 01-1.26-.1z" />
                                </svg>
                            </a>
                            <a
                                href="#"
                                className="text-muted-foreground hover:text-accent transition-colors"
                                aria-label="Instagram"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <rect
                                        x="2"
                                        y="2"
                                        width="20"
                                        height="20"
                                        rx="5"
                                        ry="5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                    <path
                                        d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Link sections */}
                    {linkSections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-sm font-semibold text-foreground mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-muted-foreground hover:text-accent transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Divider */}
                <div className="border-t border-border pt-8 mt-8">
                    {/* Bottom footer with copyright and info */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground">
                            © {currentYear} StyleSmart. All rights reserved.
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                            Made with{' '}
                            <Heart className="w-4 h-4 text-accent fill-accent" /> by
                            the StyleSmart team
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
