/**
 * Privacy Policy Page
 * Standard legal template with StyleSmart branding.
 */

'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';

export default function PrivacyPage() {
    return (
        <MainLayout>
            <div className="pt-24 pb-32">
                <div className="max-w-4xl mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-black mb-12">Privacy Policy</h1>
                    <Card className="p-10 md:p-12 rounded-[3rem] border-none shadow-xl space-y-8 leading-relaxed">
                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold">1. Information We Collect</h2>
                            <p className="text-muted-foreground">
                                We collect information that you provide directly to us, such as when you create or modify your account, upload wardrobe items, or contact support. This may include your name, email address, images of clothing, and style preferences.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
                            <p className="text-muted-foreground">
                                We use the information we collect to provide, maintain, and improve our services, such as generating outfit recommendations, providing weather-based suggestions, and personalizing your experience.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold">3. Data Security</h2>
                            <p className="text-muted-foreground">
                                We implement industry-standard security measures to protect your personal data and images. However, no method of transmission over the Internet or electronic storage is 100% secure.
                            </p>
                        </section>

                        <section className="space-y-4">
                            <h2 className="text-2xl font-bold">4. Changes to This Policy</h2>
                            <p className="text-muted-foreground">
                                We may update this privacy policy from time to time. If we make changes, we will notify you by revising the date at the top of the policy and, in some cases, we may provide you with additional notice.
                            </p>
                        </section>
                        
                        <div className="pt-8 border-t border-border">
                            <p className="text-sm text-muted-foreground italic">Last updated: May 9, 2024</p>
                        </div>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
}
