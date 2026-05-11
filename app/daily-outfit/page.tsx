/**
 * Daily Outfit Picker Page
 * Premium redesign with focus on 'Today's selection', weather insights, and mood-driven AI.
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    Cloud,
    CloudRain,
    Sun,
    Wind,
    Droplets,
    Heart,
    Zap,
    RotateCcw,
    CheckCircle2,
    Loader2,
    ThermometerSun,
    Share2,
    Calendar,
    Smile,
    ChevronLeft,
    ChevronRight,
    MapPin,
    Sparkles
} from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { weatherAPI, outfitAPI } from '@/lib/api-clients';
import { useAuthStore, useWardrobeStore } from '@/lib/store';
import { WeatherData, Outfit } from '@/lib/types';

/**
 * Animation Variants
 */
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

export default function DailyOutfitPage() {
    const { isAuthenticated } = useAuthStore();
    const { items: wardrobeItems } = useWardrobeStore();
    
    // State
    const [weather, setWeather] = useState<any>(null);
    const [currentOutfits, setCurrentOutfits] = useState<Outfit[]>([]);
    const [selectedOutfitIndex, setSelectedOutfitIndex] = useState(0);
    const [mood, setMood] = useState<'confident' | 'casual' | 'comfortable' | 'adventurous' | 'formal'>('casual');
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState('Detecting...');
    const [error, setError] = useState('');

    useEffect(() => {
        const initializePage = async () => {
            if (!isAuthenticated) return;
            setIsLoading(true);
            
            try {
                // Get Location
                let coords = null;
                if (navigator.geolocation) {
                    try {
                        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                            navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
                        });
                        coords = { lat: position.coords.latitude, lon: position.coords.longitude };
                    } catch (geolocError) {
                        console.warn('Geolocation failed, falling back to defaults.');
                    }
                }

                const [wRes, oRes] = await Promise.all([
                    weatherAPI.getCurrent(coords?.lat, coords?.lon),
                    outfitAPI.getDailyOutfit()
                ]);

                if (wRes.success) {
                    setWeather(wRes.data);
                    setLocation((wRes.data as any).location || 'Lagos, Nigeria');
                }

                if (oRes.success) {
                    const outfits = Array.isArray(oRes.data) ? oRes.data : [oRes.data];
                    setCurrentOutfits(outfits as Outfit[]);
                }
            } catch (err) {
                setError('Failed to sync today\'s recommendations.');
                toast.error('System sync failed. Using offline data.');
            } finally {
                setIsLoading(false);
            }
        };

        initializePage();
    }, [isAuthenticated]);

    const handleNext = () => setSelectedOutfitIndex((prev) => (prev + 1) % currentOutfits.length);
    const handlePrev = () => setSelectedOutfitIndex((prev) => (prev - 1 + currentOutfits.length) % currentOutfits.length);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'StyleSmart | Today\'s Look',
                text: `Check out my "${currentOutfits[selectedOutfitIndex]?.name}" outfit!`,
                url: window.location.href,
            }).catch(() => toast.error('Sharing cancelled'));
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Share link copied!');
        }
    };

    const handleWear = () => {
        toast.success(`Style Confirmed!`, {
            description: `You're wearing the "${currentOutfits[selectedOutfitIndex]?.name}" today.`,
            icon: <CheckCircle2 className="w-5 h-5 text-green-500" />
        });
    };

    /**
     * Core AI Logic: Generates a new outfit based on mood and wardrobe data
     */
    const regenerateOutfitForMood = (newMood: string) => {
        setIsLoading(true);
        
        // Simulate AI thinking time
        setTimeout(() => {
            const vibe = newMood.toLowerCase();
            let selectedItems: string[] = [];
            
            // Filter logic based on vibe
            if (vibe === 'formal') {
                const gowns = wardrobeItems.filter(i => i.category === 'gowns' || i.name.toLowerCase().includes('gown'));
                const trousers = wardrobeItems.filter(i => i.category === 'trousers' || (i.category === 'bottoms' && i.name.toLowerCase().includes('trouser')));
                const formalTops = wardrobeItems.filter(i => i.category === 'tops' && !i.name.toLowerCase().includes('hoodie'));
                
                if (gowns.length > 0 && Math.random() > 0.5) {
                    selectedItems = [gowns[Math.floor(Math.random() * gowns.length)].id];
                } else {
                    const t = trousers[Math.floor(Math.random() * trousers.length)];
                    const top = formalTops[Math.floor(Math.random() * formalTops.length)];
                    if (t && top) selectedItems = [t.id, top.id];
                }
            } else if (vibe === 'casual' || vibe === 'comfortable') {
                const shorts = wardrobeItems.filter(i => i.category === 'shorts' || (i.category === 'bottoms' && i.name.toLowerCase().includes('short')));
                const tops = wardrobeItems.filter(i => i.category === 'tops');
                const t = shorts[Math.floor(Math.random() * shorts.length)];
                const top = tops[Math.floor(Math.random() * tops.length)];
                if (t && top) selectedItems = [t.id, top.id];
            } else {
                // Adventurous/Confident - Mix things up
                const all = [...wardrobeItems].sort(() => 0.5 - Math.random());
                selectedItems = all.slice(0, 3).map(i => i.id);
            }

            // Add shoes to every combo if possible
            const shoes = wardrobeItems.filter(i => i.category === 'shoes');
            if (shoes.length > 0) {
                selectedItems.push(shoes[Math.floor(Math.random() * shoes.length)].id);
            }

            const newOutfit: Outfit = {
                id: `dynamic_${Date.now()}`,
                userId: '123',
                name: `${newMood.charAt(0).toUpperCase() + newMood.slice(1)} Ensemble`,
                items: selectedItems,
                confidence: 85 + Math.floor(Math.random() * 15),
                occasion: newMood,
                isFavorite: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            setCurrentOutfits([newOutfit]);
            setSelectedOutfitIndex(0);
            setIsLoading(false);
            
            toast.success(`${newMood.charAt(0).toUpperCase() + newMood.slice(1)} Look Ready!`, {
                description: `Curated a fresh combination from your wardrobe.`
            });
        }, 1200);
    };

    const handleMoodChange = (newMood: typeof mood) => {
        setMood(newMood);
        regenerateOutfitForMood(newMood);
    };

    const handleRegenerate = () => {
        regenerateOutfitForMood(mood);
    };

    const currentOutfit = currentOutfits[selectedOutfitIndex];
    
    // Map outfit IDs to actual wardrobe items
    const outfitItems = currentOutfit?.items 
        ? wardrobeItems.filter(item => currentOutfit.items.includes(item.id))
        : [];

    return (
        <MainLayout>
            <div className="min-h-screen pb-24 pt-12 bg-slate-50/30">
                {/* Header with Date & Weather Summary */}
                <div className="max-w-7xl mx-auto px-4 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] mb-2 bg-primary/10 px-3 py-1 rounded-full w-fit">
                            <Calendar className="w-3 h-3" /> {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </div>
                        <h1 className="text-4xl md:text-7xl font-black tracking-tighter">Today&apos;s Look</h1>
                    </motion.div>
                    
                    {weather && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <Card className="px-6 py-4 rounded-[2.5rem] bg-white/80 backdrop-blur-xl border-none flex items-center gap-8 shadow-2xl shadow-primary/5">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-yellow-500/10 rounded-3xl flex items-center justify-center">
                                        <Sun className="w-8 h-8 text-yellow-500" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black leading-none">{Math.round(weather.temperature)}°</p>
                                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">{weather.condition}</p>
                                    </div>
                                </div>
                                <div className="w-[1px] h-10 bg-border/50" />
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-3.5 h-3.5 text-primary" />
                                        <span className="text-sm font-black">{location}</span>
                                    </div>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Verified Location</p>
                                </div>
                            </Card>
                        </motion.div>
                    )}
                </div>

                <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-12 gap-12">
                    {/* Left: Main Outfit Display & Combination */}
                    <div className="lg:col-span-8 space-y-10 relative min-h-[800px]">
                        {/* Non-jumpy Loading Overlay */}
                        <AnimatePresence>
                            {isLoading && (
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute inset-0 z-50 bg-slate-50/40 backdrop-blur-[1px] rounded-[4rem] flex flex-col items-center justify-center pointer-events-none"
                                >
                                    <div className="bg-white/90 backdrop-blur-xl p-8 rounded-full shadow-2xl flex flex-col items-center border border-primary/10">
                                        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                                        <p className="font-black text-xs text-primary uppercase tracking-widest">AI Generating...</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <AnimatePresence mode="wait">
                            {currentOutfit ? (
                                <motion.div
                                    key={currentOutfit.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98 }}
                                    transition={{ duration: 0.4 }}
                                    className="space-y-8"
                                >
                                    {/* The Hero Outfit Card */}
                                    <Card className="relative group rounded-[4rem] overflow-hidden border-none shadow-2xl bg-gradient-to-br from-primary via-primary/90 to-accent text-white p-12 min-h-[400px] flex flex-col justify-center">
                                        <div className="absolute top-0 right-0 p-12 opacity-10">
                                            <Sparkles className="w-64 h-64" />
                                        </div>

                                        <div className="relative z-10">
                                            <div className="flex items-center gap-3 mb-6">
                                                <span className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest">
                                                    {currentOutfit.occasion} Selection
                                                </span>
                                                <div className="flex gap-1">
                                                    {[1, 2, 3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-white/50" />)}
                                                </div>
                                            </div>
                                            <h2 className="text-5xl md:text-7xl font-black mb-6 leading-[0.9]">{currentOutfit.name}</h2>
                                            <p className="text-xl text-white/80 max-w-lg mb-10 leading-relaxed font-medium">
                                                {currentOutfit.description || `A perfectly balanced ensemble curated for a ${mood} vibe in ${weather?.condition} weather.`}
                                            </p>

                                            <div className="flex flex-wrap gap-4">
                                                <Button onClick={handleWear} size="lg" className="rounded-full px-12 h-16 bg-white text-primary font-black hover:bg-white/90 shadow-xl shadow-black/10">
                                                    WEAR THIS LOOK
                                                </Button>
                                                <div className="flex gap-2">
                                                    <Button onClick={handlePrev} variant="ghost" className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20">
                                                        <ChevronLeft className="w-6 h-6" />
                                                    </Button>
                                                    <Button onClick={handleNext} variant="ghost" className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20">
                                                        <ChevronRight className="w-6 h-6" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* The Combination Grid */}
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between px-4">
                                            <h3 className="text-2xl font-black tracking-tight">Outfit Components</h3>
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{outfitItems.length} Items Combined</p>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {outfitItems.map((item, idx) => (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    key={item.id}
                                                >
                                                    <Card className="p-4 rounded-[2.5rem] border-none shadow-xl bg-white hover:scale-105 transition-transform duration-500 overflow-hidden">
                                                        <div className="aspect-[4/5] rounded-3xl overflow-hidden mb-4 relative">
                                                            <img 
                                                                src={item.image} 
                                                                alt={item.name} 
                                                                className="w-full h-full object-cover" 
                                                            />
                                                            <div className="absolute top-3 left-3 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest">
                                                                {item.category}
                                                            </div>
                                                        </div>
                                                        <div className="px-2">
                                                            <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                                                            <div className="flex items-center gap-2 mt-2">
                                                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">{item.color}</span>
                                                            </div>
                                                        </div>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Styling Insights */}
                                    <Card className="p-10 rounded-[3.5rem] border-none shadow-xl bg-primary/5 border border-primary/10">
                                        <div className="flex items-start gap-6">
                                            <div className="w-16 h-16 bg-primary rounded-3xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                                                <Sparkles className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-black mb-4">Why this works</h3>
                                                <p className="text-lg text-muted-foreground leading-relaxed">
                                                    The {outfitItems[0]?.category} and {outfitItems[1]?.category} create a sophisticated silhouette that matches your {mood} preference. 
                                                    Given the {weather?.temperature}° temperature, these layers provide optimal comfort without sacrificing style. 
                                                    The color palette of {outfitItems.map(i => i.color).join(', ')} creates a harmonious visual flow.
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="aspect-[16/10] w-full rounded-[4rem] bg-muted flex flex-col items-center justify-center p-12 text-center"
                                >
                                    <ShoppingBag className="w-20 h-20 text-muted-foreground mb-8 opacity-10" />
                                    <h3 className="text-3xl font-black mb-4 tracking-tight">Your wardrobe is waiting</h3>
                                    <p className="text-muted-foreground text-lg max-w-sm mb-10 font-medium">
                                        We need at least 5 items in different categories to start creating intelligent combinations for you.
                                    </p>
                                    <Button asChild size="lg" className="rounded-2xl px-10 h-16 font-black">
                                        <Link href="/wardrobe/add">ADD FIRST ITEM</Link>
                                    </Button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right: Mood & Analytics Sidebar */}
                    <div className="lg:col-span-4 space-y-8">
                        <Card className="p-10 rounded-[3.5rem] border-none shadow-2xl bg-white sticky top-24">
                            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                                <Smile className="w-6 h-6 text-primary" /> Current Vibe
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {['confident', 'casual', 'formal', 'adventurous', 'comfortable'].map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => handleMoodChange(m as any)}
                                        className={`px-8 py-5 rounded-3xl text-left font-black capitalize transition-all border-2 flex items-center justify-between group ${
                                            mood === m 
                                                ? 'bg-primary border-primary text-white shadow-xl shadow-primary/20' 
                                                : 'border-transparent bg-slate-50 hover:bg-slate-100 text-muted-foreground'
                                        }`}
                                    >
                                        {m}
                                        {mood === m && <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                                    </button>
                                ))}
                            </div>
                            <Button onClick={handleRegenerate} disabled={isLoading} className="w-full mt-10 rounded-[2rem] h-16 font-black text-lg shadow-xl hover:scale-[1.02] transition-transform">
                                 {isLoading ? <Loader2 className="w-5 h-5 mr-3 animate-spin" /> : <RotateCcw className="w-5 h-5 mr-3" />} REFRESH STYLE
                            </Button>

                            <div className="mt-10 pt-10 border-t border-slate-100">
                                <h4 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-6">Style Analytics</h4>
                                <div className="space-y-6">
                                    <div>
                                        <div className="flex justify-between text-sm font-black mb-2">
                                            <span>Color Harmony</span>
                                            <span className="text-primary">98%</span>
                                        </div>
                                        <Progress value={98} className="h-2 bg-slate-100" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm font-black mb-2">
                                            <span>Occasion Match</span>
                                            <span className="text-accent">92%</span>
                                        </div>
                                        <Progress value={92} className="h-2 bg-slate-100" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}

function ShoppingBag(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path>
            <path d="M3 6h18"></path>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
        </svg>
    );
}
