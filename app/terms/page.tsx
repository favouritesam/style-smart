/**
 * Terms and Conditions Page
 * Professional legal documentation following the StyleSmart design system.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Lock, Scale } from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';

export default function TermsPage() {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            content: "By accessing or using the StyleSmart application, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, do not use our services."
        },
        {
            title: "2. User Accounts",
            content: "You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. You must be at least 13 years old to use StyleSmart."
        },
        {
            title: "3. Wardrobe Data & Content",
            content: "When you upload images of your wardrobe, you retain ownership of your content. However, you grant StyleSmart a worldwide, non-exclusive, royalty-free license to use, process, and analyze your content to provide recommendations and improve our AI models."
        },
        {
            title: "4. Prohibited Conduct",
            content: "You agree not to use StyleSmart for any unlawful purpose or in any way that interrupts, damages, or impairs the service. This includes uploading malicious code, spamming other users, or attempting to reverse engineer our algorithms."
        },
        {
            title: "5. Termination",
            content: "We reserve the right to terminate or suspend your account and access to StyleSmart at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users or us."
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
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/20"
                        >
                            <Scale className="w-3 h-3" /> LEGAL FRAMEWORK
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-black mb-6">Terms and Conditions</h1>
                        <p className="text-xl text-muted-foreground">Please read these terms carefully before using our platform.</p>
                    </div>

                    <Card className="p-8 md:p-12 rounded-[3rem] border-none shadow-2xl bg-card space-y-12">
                        {sections.map((section, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="space-y-4"
                            >
                                <h2 className="text-2xl font-bold flex items-center gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-sm font-black text-primary">
                                        {idx + 1}
                                    </span>
                                    {section.title}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed pl-11">
                                    {section.content}
                                </p>
                            </motion.div>
                        ))}

                        <div className="pt-12 border-t border-border flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-center gap-3 text-sm font-bold text-muted-foreground">
                                <ShieldCheck className="w-5 h-5 text-green-500" /> Secure Legal Framework
                            </div>
                            <p className="text-sm text-muted-foreground italic">Last updated: May 9, 2024</p>
                        </div>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
}
