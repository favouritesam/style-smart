/**
 * Features Page
 * Highlights the core capabilities of StyleSmart with interactive sections and premium visuals.
 */

'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
    Sparkles, 
    Cloud, 
    ShoppingBag, 
    Zap, 
    Calendar, 
    Shield, 
    Palette, 
    Camera, 
    Heart,
    Smartphone,
    TrendingUp,
    CheckCircle2
} from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

/**
 * Animation Variants
 */
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

export default function FeaturesPage() {
    const features = [
        {
            title: "AI-Powered Recommendations",
            description: "Our advanced algorithms analyze your wardrobe, the weather, and your destination to suggest the perfect outfit.",
            icon: <Sparkles className="w-8 h-8 text-accent" />,
            color: "bg-accent/10",
            details: ["Color Harmony matching", "Occasion-specific filters", "Style compatibility scoring"]
        },
        {
            title: "Weather Intelligence",
            description: "Never get caught in the rain or dress too warm again. Real-time weather sync ensures your outfit matches the forecast.",
            icon: <Cloud className="w-8 h-8 text-blue-500" />,
            color: "bg-blue-500/10",
            details: ["Real-time local forecast", "Rain & UV protection alerts", "Layering suggestions"]
        },
        {
            title: "Smart Wardrobe Management",
            description: "Digitalize your entire closet with ease. Categorize, search, and track your clothes from anywhere.",
            icon: <ShoppingBag className="w-8 h-8 text-primary" />,
            color: "bg-primary/10",
            details: ["Instant photo upload", "Category organization", "Color & brand tracking"]
        },
        {
            title: "Daily Outfit Picker",
            description: "The 'What Should I Wear?' feature takes the stress out of your morning routine with one-tap suggestions.",
            icon: <Calendar className="w-8 h-8 text-secondary" />,
            color: "bg-secondary/10",
            details: ["Morning notifications", "Mood-based selection", "Quick save to favorites"]
        }
    ];

    return (
        <MainLayout>
            <div className="pt-20 pb-24 overflow-hidden">
                {/* Hero Section */}
                <section className="relative py-20 px-4 mb-20 text-center">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-bold mb-6 border border-accent/20">
                            <Zap className="w-4 h-4" /> REVOLUTIONIZING FASHION
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 leading-tight">
                            The Future of Your <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                                Wardrobe is AI
                            </span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                            StyleSmart combines fashion sense with weather intelligence to make dressing well simple, personalized, and stress-free.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/register">
                                <Button size="lg" className="rounded-full px-12 h-16 text-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black shadow-2xl shadow-primary/30">
                                    Start Your Journey
                                </Button>
                            </Link>
                            <Link href="/how-it-works">
                                <Button variant="outline" size="lg" className="rounded-full px-12 h-16 text-xl border-2 font-bold">
                                    See How it Works
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Decorative Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
                </section>

                {/* Features Grid */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-2 gap-8"
                    >
                        {features.map((feature, idx) => (
                            <motion.div 
                                key={idx}
                                variants={itemVariants}
                                className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 shadow-xl hover:shadow-primary/5"
                            >
                                <div className={`w-16 h-16 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-muted-foreground mb-8 text-lg">
                                    {feature.description}
                                </p>
                                <div className="space-y-3">
                                    {feature.details.map((detail, i) => (
                                        <div key={i} className="flex items-center gap-2 text-sm text-foreground/80">
                                            <CheckCircle2 className="w-4 h-4 text-primary" /> {detail}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Mobile Preview Section */}
                <section className="py-24 mt-20 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div 
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="space-y-8"
                            >
                                <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                                    Your personal stylist, <br />
                                    right in your pocket.
                                </h2>
                                <p className="text-xl text-muted-foreground">
                                    StyleSmart is designed for the modern lifestyle. Whether you&apos;re a busy professional, a student, or just someone looking to improve your style, we provide the tools you need.
                                </p>
                                <div className="space-y-6">
                                    {[
                                        { title: "Universal Compatibility", icon: <Smartphone /> },
                                        { title: "Real-time Syncing", icon: <TrendingUp /> },
                                        { title: "Secure Data", icon: <Shield /> }
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className="p-3 bg-card rounded-xl shadow-md">
                                                {item.icon}
                                            </div>
                                            <span className="text-lg font-semibold">{item.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="relative flex justify-center"
                            >
                                {/* Mockup Representation */}
                                <div className="w-72 h-[580px] bg-foreground rounded-[3rem] border-8 border-card shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-background flex flex-col p-6">
                                        <div className="w-20 h-4 bg-muted rounded-full mx-auto mb-8" />
                                        <div className="w-full h-32 bg-primary/20 rounded-2xl mb-4" />
                                        <div className="space-y-3">
                                            <div className="w-full h-4 bg-muted rounded-full" />
                                            <div className="w-3/4 h-4 bg-muted rounded-full" />
                                        </div>
                                        <div className="mt-auto grid grid-cols-2 gap-2">
                                            <div className="h-20 bg-accent/10 rounded-xl" />
                                            <div className="h-20 bg-secondary/10 rounded-xl" />
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl -z-10" />
                                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl -z-10" />
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Final CTA */}
                <section className="max-w-5xl mx-auto px-4 mt-24 text-center">
                    <Card className="p-12 rounded-[3rem] bg-gradient-to-br from-primary via-primary/80 to-accent text-white border-none overflow-hidden relative shadow-2xl shadow-primary/20">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to transform <br /> your style?</h2>
                            <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto">
                                Join thousands of users who are already saving time and looking better every day.
                            </p>
                            <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-12 h-14 text-lg font-bold">
                                Start Your Journey
                            </Button>
                        </div>
                        {/* Decorative blobs */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
                    </Card>
                </section>
            </div>
        </MainLayout>
    );
}
