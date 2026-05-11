/**
 * Cookie Policy Page
 * Explains how StyleSmart uses tracking technologies in a transparent way.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, Eye, Settings2 } from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';

export default function CookiesPage() {
    const cookieTypes = [
        {
            title: "Essential Cookies",
            desc: "These are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences or logging in.",
            icon: <Shield className="w-6 h-6 text-primary" />
        },
        {
            title: "Performance Cookies",
            desc: "These allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site.",
            icon: <Eye className="w-6 h-6 text-accent" />
        },
        {
            title: "Functionality Cookies",
            desc: "These enable the website to provide enhanced functionality and personalization. They may be set by us or by third party providers whose services we have added to our pages.",
            icon: <Settings2 className="w-6 h-6 text-secondary" />
        }
    ];

    return (
        <MainLayout>
            <div className="pt-24 pb-32">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-bold mb-6 border border-accent/20"
                        >
                            <Cookie className="w-3 h-3" /> TRANSPARENCY
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6">Cookie Policy</h1>
                        <p className="text-xl text-muted-foreground">How we use cookies to improve your style journey.</p>
                    </div>

                    <Card className="p-8 md:p-12 rounded-[3rem] border-none shadow-2xl bg-card space-y-12">
                        <section className="space-y-6">
                            <h2 className="text-3xl font-bold">What are cookies?</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Cookies are small text files that are stored on your browser or the hard drive of your computer or other device when you visit our Site. This allows the Site to recognise you as a user either for the duration of your visit (using a &apos;session cookie&apos;) or for repeat visits (a &apos;persistent cookie&apos;). They are not harmful and do not contain any information such as your home address, date of birth or credit card details.
                            </p>
                        </section>

                        <div className="grid gap-6">
                            {cookieTypes.map((type, idx) => (
                                <Card key={idx} className="p-8 rounded-[2rem] border-border/50 bg-muted/30 shadow-none hover:bg-muted/50 transition-colors">
                                    <div className="flex gap-6">
                                        <div className="shrink-0 p-4 bg-white rounded-2xl shadow-sm">
                                            {type.icon}
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-bold">{type.title}</h3>
                                            <p className="text-muted-foreground text-sm leading-relaxed">{type.desc}</p>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <section className="space-y-6">
                            <h2 className="text-3xl font-bold">Managing Cookies</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                Most browsers allow you to refuse to accept cookies and to delete cookies. The methods for doing so vary from browser to browser, and from version to version. You can however obtain up-to-date information about blocking and deleting cookies via these links:
                            </p>
                            <div className="flex flex-wrap gap-4 pt-2">
                                {[
                                    { name: "Chrome", url: "https://support.google.com/chrome/answer/95647" },
                                    { name: "Firefox", url: "https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" },
                                    { name: "Safari", url: "https://support.apple.com/kb/ph21411" },
                                    { name: "Edge", url: "https://support.microsoft.com/en-gb/help/4468242/microsoft-edge-browsing-data-and-privacy" }
                                ].map((browser) => (
                                    <a 
                                        key={browser.name} 
                                        href={browser.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 bg-muted rounded-xl text-sm font-bold opacity-60 hover:opacity-100 hover:text-primary hover:bg-primary/10 transition-all"
                                    >
                                        {browser.name}
                                    </a>
                                ))}
                            </div>
                        </section>

                        <div className="pt-12 border-t border-border text-center">
                            <p className="text-sm text-muted-foreground italic">Last updated: May 9, 2024</p>
                        </div>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
}
