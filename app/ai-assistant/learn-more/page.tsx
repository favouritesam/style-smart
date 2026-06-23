/**
 * Style Intelligence Guide - Learn More Screen
 * Educational content about AI styling, color theory, and wardrobe optimization.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    ArrowLeft, 
    Sparkles, 
    Zap, 
    CheckCircle2, 
    Palette, 
    Layers, 
    Wind, 
    Star,
    BookOpen,
    Target
} from 'lucide-react';
import Link from 'next/link';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function StyleGuidePage() {
    const stylingPrinciples = [
        {
            title: "Color Harmony",
            description: "Learn how to use complementary and analogous color schemes to create visually striking outfits.",
            icon: Palette,
            color: "text-rose-500",
            bg: "bg-rose-50"
        },
        {
            title: "Layering Mastery",
            description: "The art of combining textures and weights to stay comfortable and stylish in any weather.",
            icon: Layers,
            color: "text-blue-500",
            bg: "bg-blue-50"
        },
        {
            title: "Occasion Alignment",
            description: "Understanding dress codes from 'Business Casual' to 'Black Tie' and everything in between.",
            icon: Target,
            color: "text-amber-500",
            bg: "bg-amber-50"
        }
    ];

    const faqItems = [
        {
            q: "How does the AI Assistant suggest outfits?",
            a: "Our AI analyzes your wardrobe items across several vectors: color harmony, category matching, occasion suitability, and current fashion trends. It looks for pieces that complement each other's visual weight and style profile."
        },
        {
            q: "Can I customize my style preferences?",
            a: "Absolutely! Your Style Profile is dynamic. The more you interact with the AI and save outfits, the better it understands your personal aesthetic, whether it's 'Modern Minimalist' or 'Eclectic Bohemian'."
        },
        {
            q: "What makes a 'Sustainable' wardrobe?",
            a: "We track the longevity, material source, and frequency of wear for your items. A sustainable wardrobe focuses on high-quality, versatile pieces that you'll love and wear for years, rather than fast-fashion trends."
        }
    ];

    return (
        <MainLayout>
            <div className="min-h-screen bg-white pb-24">
                {/* Hero Header */}
                <div className="relative h-[400px] overflow-hidden bg-slate-900 flex items-center justify-center text-center px-4">
                    <div className="absolute inset-0 opacity-40">
                        <img 
                            src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000" 
                            className="w-full h-full object-cover" 
                            alt="Fashion Background" 
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 max-w-3xl"
                    >
                        <Link href="/ai-assistant" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-8 font-black text-xs uppercase tracking-[0.2em]">
                            <ArrowLeft className="w-4 h-4" /> Back to Assistant
                        </Link>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                            Style <span className="text-primary italic">Intelligence</span>
                        </h1>
                        <p className="text-xl text-slate-300 font-medium leading-relaxed">
                            Master the art of dressing well with the help of our advanced AI stylist and deep fashion insights.
                        </p>
                    </motion.div>
                </div>

                <div className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
                    {/* Core Principles Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-24">
                        {stylingPrinciples.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Card className="p-8 rounded-[2.5rem] border-none shadow-2xl bg-white hover:scale-105 transition-transform duration-500 h-full">
                                    <div className={`w-14 h-14 ${item.bg} rounded-2xl flex items-center justify-center mb-6`}>
                                        <item.icon className={`w-7 h-7 ${item.color}`} />
                                    </div>
                                    <h3 className="text-2xl font-black mb-4 tracking-tight">{item.title}</h3>
                                    <p className="text-muted-foreground font-medium leading-relaxed">
                                        {item.description}
                                    </p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Detailed Section: The AI Method */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                        <div>
                            <Badge className="bg-primary/10 text-primary border-none font-black px-4 py-1 rounded-full mb-6">
                                OUR TECHNOLOGY
                            </Badge>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8 leading-none">
                                How StyleSmart <span className="text-primary">Thinks</span>
                            </h2>
                            <p className="text-lg text-muted-foreground font-medium leading-relaxed mb-10">
                                Our AI isn&apos;t just picking random items. It follows a rigorous methodology derived from professional styling standards, tailored to your unique physical attributes and wardrobe inventory.
                            </p>
                            
                            <div className="space-y-6">
                                {[
                                    { title: "Visual Weight Analysis", desc: "Balancing silhouettes to ensure your outfit looks proportional." },
                                    { title: "Contextual Relevance", desc: "Factoring in weather, location, and event type." },
                                    { title: "Trend Integration", desc: "Mixing timeless classics with current high-fashion aesthetics." }
                                ].map((step, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="shrink-0 w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-black mt-1">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <h4 className="font-black text-lg mb-1">{step.title}</h4>
                                            <p className="text-sm text-muted-foreground font-medium">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -inset-4 bg-primary/5 rounded-[4rem] blur-2xl" />
                            <Card className="relative overflow-hidden rounded-[3.5rem] border-none shadow-2xl aspect-square">
                                <img 
                                    src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000" 
                                    className="w-full h-full object-cover" 
                                    alt="Style Analysis" 
                                />
                                <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="bg-white/90 backdrop-blur-md p-8 rounded-[2.5rem] shadow-2xl max-w-xs text-center border border-white">
                                        <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
                                        <h4 className="font-black text-xl mb-2 italic">Stylist Intelligence</h4>
                                        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Version 2.4.0 Active</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>

                    {/* FAQ / Deep Dive */}
                    <div className="bg-slate-50 rounded-[4rem] p-12 md:p-20 mb-24">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-4xl font-black tracking-tighter mb-4">Frequently Asked Questions</h2>
                            <p className="text-muted-foreground font-medium italic">&quot;Everything you need to know about your new AI stylist.&quot;</p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {faqItems.map((item, i) => (
                                <div key={i} className="space-y-4">
                                    <h4 className="font-black text-xl leading-tight text-slate-900">{item.q}</h4>
                                    <p className="text-muted-foreground text-sm font-medium leading-relaxed">{item.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <Card className="p-12 md:p-20 rounded-[4rem] bg-slate-900 text-white text-center border-none shadow-2xl relative overflow-hidden">
                        <Zap className="absolute top-0 left-0 w-64 h-64 text-white/5 -translate-x-1/2 -translate-y-1/2 rotate-12" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
                                Ready to <span className="text-primary italic">Transform?</span>
                            </h2>
                            <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-medium">
                                Start a conversation with your Style Assistant now and experience the future of personal styling.
                            </p>
                            <Button size="lg" className="rounded-full h-16 px-12 text-lg font-black bg-white text-black hover:bg-slate-200" asChild>
                                <Link href="/ai-assistant">START CHATTING NOW</Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </MainLayout>
    );
}
