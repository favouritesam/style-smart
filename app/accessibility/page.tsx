/**
 * Accessibility Page
 * Outlines StyleSmart's commitment to inclusive design and WCAG standards.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Accessibility as AccessibilityIcon, Heart, Shield, Sparkles, CheckCircle2 } from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';

export default function AccessibilityPage() {
    const commitments = [
        "WCAG 2.1 AA level compliance as our minimum standard.",
        "Full keyboard navigation support for all interactive elements.",
        "Screen reader optimization with proper ARIA attributes.",
        "High contrast mode and customizable font scaling options.",
        "Regular accessibility audits by third-party specialists."
    ];

    return (
        <MainLayout>
            <div className="pt-24 pb-32">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold mb-6 border border-blue-500/20"
                        >
                            <AccessibilityIcon className="w-3 h-3" /> INCLUSIVITY
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6">Accessibility at StyleSmart</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            We believe that style and technology should be accessible to everyone, regardless of ability.
                        </p>
                    </div>

                    <Card className="p-8 md:p-12 rounded-[3.5rem] border-none shadow-2xl bg-card space-y-12">
                        <section className="space-y-6">
                            <h2 className="text-3xl font-black">Our Commitment</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                StyleSmart is committed to digital accessibility, and to conforming to the Web Content Accessibility Guidelines (WCAG) 2.1, Level AA and complying with the Americans with Disabilities Act (ADA) effective communication requirements, and other applicable regulations.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4 pt-4">
                                {commitments.map((text, i) => (
                                    <div key={i} className="flex gap-3 items-start p-4 bg-muted/50 rounded-2xl border border-border/50">
                                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                                        <span className="text-sm font-medium leading-tight">{text}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/10 space-y-6">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="p-3 bg-white rounded-xl shadow-md">
                                    <Heart className="w-6 h-6 text-red-500" />
                                </div>
                                <h2 className="text-2xl font-black">We value your feedback</h2>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                We are always working to improve the accessibility of our platform. If you encounter any barriers or have suggestions on how we can improve your experience, please let us know.
                            </p>
                            <div className="pt-4">
                                <p className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-2">Contact our Accessibility Team</p>
                                <p className="text-2xl font-black text-primary">accessibility@stylesmart.ai</p>
                            </div>
                        </section>

                        <section className="space-y-6">
                            <h2 className="text-3xl font-black">Future Roadmap</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                In Phase 2 of StyleSmart, we are introducing voice-activated outfit picking and haptic feedback for color identification to further support users with visual impairments.
                            </p>
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
