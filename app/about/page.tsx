/**
 * About Us Page
 * Explains the mission, vision, and team behind StyleSmart.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Target, Users, Zap, Award } from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';

export default function AboutPage() {
    return (
        <MainLayout>
            <div className="pt-24 pb-32">
                <div className="max-w-5xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-xs font-bold mb-6 border border-accent/20"
                        >
                            <Heart className="w-3 h-3" /> OUR STORY
                        </motion.div>
                        <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight">We Believe Confidence <br /> is a Daily Choice</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            StyleSmart was born out of a simple frustration: standing in front of a full closet and feeling like you have nothing to wear. We combined AI intelligence with fashion expertise to solve that problem forever.
                        </p>
                    </div>

                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-8 mb-32">
                        <Card className="p-10 rounded-[3rem] bg-primary text-white border-none shadow-2xl shadow-primary/20">
                            <Target className="w-12 h-12 mb-6 opacity-40" />
                            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                            <p className="text-lg opacity-80 leading-relaxed">
                                To democratize personal styling by providing everyone with an AI assistant that understands their wardrobe, the environment, and their personal identity.
                            </p>
                        </Card>
                        <Card className="p-10 rounded-[3rem] bg-accent text-white border-none shadow-2xl shadow-accent/20">
                            <Sparkles className="w-12 h-12 mb-6 opacity-40" />
                            <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                            <p className="text-lg opacity-80 leading-relaxed">
                                To become the ultimate lifestyle companion, expanding beyond fashion into holistic health, diet, and daily wellness support.
                            </p>
                        </Card>
                    </div>

                    {/* Values */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-12">The Values That Drive Us</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                            {[
                                { title: "Innovation First", icon: <Zap className="text-primary" /> },
                                { title: "User Obsessed", icon: <Users className="text-accent" /> },
                                { title: "Quality Data", icon: <Award className="text-secondary" /> },
                                { title: "Ethical AI", icon: <Sparkles className="text-yellow-500" /> },
                                { title: "Style for All", icon: <Heart className="text-red-500" /> },
                                { title: "Sustainable", icon: <Zap className="text-green-500" /> }
                            ].map((value, i) => (
                                <div key={i} className="space-y-4">
                                    <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mx-auto text-2xl">
                                        {value.icon}
                                    </div>
                                    <p className="font-bold">{value.title}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
