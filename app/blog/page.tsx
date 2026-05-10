/**
 * Blog Page
 * Modern blog layout for style tips, AI updates, and fashion trends.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

import { toast } from 'sonner';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
    const posts = [
        {
            title: "How AI is Changing the Way We Dress",
            excerpt: "Discover how machine learning algorithms are helping people find their perfect color combinations.",
            date: "May 10, 2024",
            author: "Sarah J.",
            category: "Technology",
            color: "bg-blue-500/10 text-blue-500"
        },
        {
            title: "5 Essentials for a Minimalist Wardrobe",
            excerpt: "Building a versatile closet doesn't require hundreds of items. Here are the core pieces you need.",
            date: "May 8, 2024",
            author: "Mark R.",
            category: "Style Tips",
            color: "bg-accent/10 text-accent"
        },
        {
            title: "Dressing for the Rain: Style Meets Function",
            excerpt: "Don't let bad weather ruin your outfit. Learn how to layer effectively while staying dry.",
            date: "May 5, 2024",
            author: "Elena T.",
            category: "Weather",
            color: "bg-primary/10 text-primary"
        }
    ];

    return (
        <MainLayout>
            <div className="pt-24 pb-32">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h1 className="text-4xl md:text-6xl font-black mb-6">Style Insights</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            The latest in AI fashion, styling tips, and StyleSmart product updates.
                        </p>
                    </div>

                    {/* Featured Post */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16"
                    >
                        <Card className="p-8 md:p-12 rounded-[3rem] border-none shadow-2xl bg-gradient-to-br from-card to-muted flex flex-col lg:flex-row gap-12 items-center">
                            <div className="flex-1 space-y-6">
                                <span className="px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-widest">Featured Post</span>
                                <h2 className="text-3xl md:text-5xl font-black leading-tight">Mastering Color Harmony: <br /> A Guide for Beginners</h2>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    Understanding the color wheel is the first step to looking effortlessly put together. We break down the science of matching.
                                </p>
                                <div className="flex items-center gap-6 pt-4">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Calendar className="w-4 h-4" /> May 12, 2024
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <User className="w-4 h-4" /> StyleSmart Team
                                    </div>
                                </div>
                                <Button onClick={() => toast.info("Opening full article...")} size="lg" className="rounded-2xl px-8 h-14 bg-primary hover:bg-primary/90 text-lg font-bold group">
                                    Read Article <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                            <div className="flex-1 w-full aspect-video lg:aspect-square bg-primary/5 rounded-[2rem] border border-primary/10 flex items-center justify-center">
                                <Sparkles className="w-32 h-32 text-primary opacity-20" />
                            </div>
                        </Card>
                    </motion.div>

                    {/* Post Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <Card className="group h-full p-8 rounded-[2.5rem] border-border/50 hover:border-primary/30 transition-all duration-300 flex flex-col shadow-lg hover:shadow-2xl">
                                    <span className={`self-start px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 ${post.color}`}>
                                        {post.category}
                                    </span>
                                    <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{post.title}</h3>
                                    <p className="text-muted-foreground mb-8 flex-1 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="pt-6 border-t border-border flex items-center justify-between">
                                        <span className="text-xs font-bold text-muted-foreground">{post.date}</span>
                                        <button onClick={() => toast.info("Opening article...")} className="p-2 bg-muted rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
