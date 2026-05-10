/**
 * How It Works Page
 * Visual step-by-step guide on how StyleSmart operates.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { 
    Camera, 
    Upload, 
    Cpu, 
    CloudRain, 
    Shirt, 
    CheckCircle2,
    ArrowRight,
    Sparkles
} from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';

/**
 * Animation Variants
 */
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.3 }
    }
};

const stepVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
    }
};

export default function HowItWorksPage() {
    const steps = [
        {
            number: "01",
            title: "Digitize Your Closet",
            description: "Simply take photos of your clothes or upload from your gallery. Our system automatically categorizes your items by type and color.",
            icon: <Camera className="w-10 h-10 text-primary" />,
            subSteps: ["Instant Category Detection", "Color Analysis", "Brand Logging"]
        },
        {
            number: "02",
            title: "Set Your Vibe",
            description: "Tell us where you're going—work, a wedding, or just hanging out. Our AI filters your wardrobe for the appropriate style level.",
            icon: <Cpu className="w-10 h-10 text-accent" />,
            subSteps: ["Occasion Filters", "Mood Selection", "Formal vs. Casual"]
        },
        {
            number: "03",
            title: "Sync with Nature",
            description: "StyleSmart checks real-time weather in your location. No more shivering in a t-shirt or sweating in wool.",
            icon: <CloudRain className="w-10 h-10 text-blue-500" />,
            subSteps: ["Live Forecast Sync", "Layering Logic", "Accessory Suggestions"]
        },
        {
            number: "04",
            title: "Get Your Perfect Outfit",
            description: "Receive a personalized outfit recommendation. Don't like it? Tap 'Shuffle' for another curated combination.",
            icon: <Shirt className="w-10 h-10 text-secondary" />,
            subSteps: ["Confidence Score", "Sustainability Check", "Quick Edit Mode"]
        }
    ];

    return (
        <MainLayout>
            <div className="pt-24 pb-32">
                {/* Header */}
                <div className="text-center mb-24 max-w-3xl mx-auto px-4">
                    <h1 className="text-4xl md:text-6xl font-black mb-6">Simple Steps to <br /> Perfect Style</h1>
                    <p className="text-xl text-muted-foreground">
                        We&apos;ve combined advanced AI with real-world intelligence to make your morning routine effortless.
                    </p>
                </div>

                {/* Steps Section */}
                <div className="max-w-7xl mx-auto px-4">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-32"
                    >
                        {steps.map((step, idx) => (
                            <motion.div 
                                key={idx} 
                                variants={stepVariants}
                                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-16 items-center`}
                            >
                                {/* Content */}
                                <div className="flex-1 space-y-6">
                                    <span className="text-8xl font-black text-primary/10 select-none leading-none">
                                        {step.number}
                                    </span>
                                    <div className="flex items-center gap-4">
                                        <div className="p-4 rounded-2xl bg-card shadow-lg">
                                            {step.icon}
                                        </div>
                                        <h2 className="text-3xl font-bold">{step.title}</h2>
                                    </div>
                                    <p className="text-xl text-muted-foreground leading-relaxed">
                                        {step.description}
                                    </p>
                                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                        {step.subSteps.map((sub, i) => (
                                            <li key={i} className="flex items-center gap-2 font-medium">
                                                <CheckCircle2 className="w-5 h-5 text-primary" /> {sub}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Visual Placeholder / Graphic */}
                                <div className="flex-1 w-full max-w-xl">
                                    <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-card to-muted flex items-center justify-center p-12 relative overflow-hidden shadow-2xl border border-border/50">
                                        <div className="w-full h-full rounded-2xl bg-background/50 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center gap-8 group">
                                            <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                                {React.cloneElement(step.icon as React.ReactElement, { className: 'w-16 h-16 text-primary' } as any)}
                                            </div>
                                            <div className="space-y-4 w-full px-8">
                                                <div className="h-4 bg-muted rounded-full w-full" />
                                                <div className="h-4 bg-muted rounded-full w-2/3" />
                                            </div>
                                        </div>
                                        {/* Decorative circles */}
                                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
                                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom CTA */}
                <section className="text-center mt-32 mb-16">
                    <h2 className="text-4xl font-black mb-8">Ready to step up your style?</h2>
                    <Link href="/register">
                        <Button size="lg" className="rounded-full px-12 h-16 text-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black shadow-2xl shadow-primary/30">
                            Start My Journey <Sparkles className="ml-2 w-5 h-5" />
                        </Button>
                    </Link>
                </section>
            </div>
        </MainLayout>
    );
}
