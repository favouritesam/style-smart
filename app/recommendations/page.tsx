/**
 * Recommendations Page Component
 * Premium AI-powered outfit recommendations with visual-first cards and style analytics.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    Sparkles,
    TrendingUp,
    Calendar,
    Loader2,
    Heart,
    Share2,
    ChevronRight,
    Zap,
    Cloud,
    Shield,
    Shuffle,
    Bookmark
} from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useRecommendationsStore, Recommendation } from '@/lib/store';

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

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
};

export default function RecommendationsPage() {
    const router = useRouter();
    const { recommendations, isLoading, error, setRecommendations, setIsLoading, setError } = useRecommendationsStore();
    const [activeTab, setActiveTab] = useState<'all' | 'formal' | 'casual'>('all');

    const handleRefresh = async () => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        toast.success('Style suggestions refreshed!', {
            description: 'AI has analyzed new trends for you.'
        });
        setIsLoading(false);
    };

    const handleShare = (name: string) => {
        if (navigator.share) {
            navigator.share({
                title: 'Check out this StyleSmart outfit!',
                text: `I just found the "${name}" outfit on StyleSmart.`,
                url: window.location.href,
            }).catch(() => toast.error('Sharing failed'));
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    const handleSave = (rec: Recommendation) => {
        const isCurrentlySaved = useRecommendationsStore.getState().savedOutfits.find(s => s.id === rec.id);
        useRecommendationsStore.getState().toggleSaveOutfit(rec);
        
        toast.success(isCurrentlySaved ? `Removed from collection` : `"${rec.outfit.name}" saved to your collection!`, {
            icon: <Bookmark className={`w-5 h-5 text-primary ${!isCurrentlySaved ? 'fill-primary' : ''}`} />
        });
    };

    const handleViewDetails = (id: string) => {
        router.push(`/recommendations/${id}`);
    };

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (recommendations.length > 0) return;
            setIsLoading(true);
            try {
                // Mock recommendations for demo
                const mockRecs = [
                    {
                        id: '1',
                        outfit: { id: 'o1', name: 'Midnight Corporate', items: [], confidence: 96, occasion: 'Formal' },
                        reason: 'Ideal for high-stakes presentations and corporate events.',
                        occasion: 'Business Professional',
                        weather: 'Cloudy',
                        sustainability: 88,
                        image: '/images/recommendations/midnight_corporate.png'
                    },
                    {
                        id: '2',
                        outfit: { id: 'o2', name: 'Urban Weekend', items: [], confidence: 92, occasion: 'Casual' },
                        reason: 'Comfortable layers for city walks and brunch.',
                        occasion: 'Casual Outing',
                        weather: 'Sunny',
                        sustainability: 94,
                        image: '/images/recommendations/urban_weekend.png'
                    },
                    {
                        id: '3',
                        outfit: { id: 'o3', name: 'Summer Gala', items: [], confidence: 98, occasion: 'Formal' },
                        reason: 'A bold, sophisticated look for special occasions.',
                        occasion: 'Black Tie',
                        weather: 'Clear Night',
                        sustainability: 75,
                        image: '/images/recommendations/summer_gala.png'
                    },
                    {
                        id: '4',
                        outfit: { id: 'o4', name: 'Minimalist Monday', items: [], confidence: 89, occasion: 'Casual' },
                        reason: 'Clean lines and neutral tones for a focused workday.',
                        occasion: 'Office Casual',
                        weather: 'Mild',
                        sustainability: 91,
                        image: '/images/recommendations/minimalist_monday.png'
                    }

                ];
                setRecommendations(mockRecs);
            } catch (err) {
                setError('Failed to load AI suggestions');
            } finally {
                setIsLoading(false);
            }
        };
        fetchRecommendations();
    }, []);

    return (
        <MainLayout>
            <div className="min-h-screen pb-32 pt-12">
                {/* Header Section */}
                <div className="max-w-7xl mx-auto px-4 mb-16">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-2xl"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold mb-4 border border-accent/20">
                                <Sparkles className="w-3 h-3" /> AI-DRIVEN STYLE
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-4">Curated Just for You</h1>
                            <p className="text-xl text-muted-foreground">Our AI analyzed your closet and today&apos;s weather to find your perfect match.</p>
                        </motion.div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex gap-4"
                        >
                            <Button onClick={handleRefresh} disabled={isLoading} variant="outline" size="lg" className="rounded-2xl h-14 px-8 border-2">
                                {isLoading ? <Loader2 className="w-5 h-5 mr-2 animate-spin" /> : <Shuffle className="w-5 h-5 mr-2" />} Refresh
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="max-w-7xl mx-auto px-4">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-40"
                            >
                                <div className="relative">
                                    <Loader2 className="w-16 h-16 animate-spin text-primary opacity-20" />
                                    <Sparkles className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                                </div>
                                <p className="mt-6 text-muted-foreground font-bold tracking-widest uppercase text-xs">Styling your future...</p>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="content"
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="grid lg:grid-cols-2 gap-8"
                            >
                                {recommendations.map((rec) => (
                                    <motion.div key={rec.id} variants={cardVariants}>
                                        <Card className="group relative h-full flex flex-col md:flex-row rounded-[3rem] border-none shadow-2xl bg-card overflow-hidden hover:shadow-primary/5 transition-all duration-500">
                                            {/* Left/Top: Visual representation */}
                                            <div className="w-full md:w-2/5 aspect-square md:aspect-auto relative bg-muted overflow-hidden">
                                                {rec.image ? (
                                                    <img 
                                                        src={rec.image} 
                                                        alt={rec.outfit.name} 
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                    />
                                                ) : (
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="w-32 h-32 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-700">
                                                            <Sparkles className="w-12 h-12 text-primary opacity-40" />
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute top-6 left-6 flex flex-col gap-2">
                                                    <div className="px-3 py-1 bg-white/50 backdrop-blur-md text-[10px] font-black uppercase rounded-full shadow-sm">
                                                        {rec.weather}
                                                    </div>
                                                    <div className="px-3 py-1 bg-white/50 backdrop-blur-md text-[10px] font-black uppercase rounded-full shadow-sm">
                                                        {rec.outfit.occasion}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right/Bottom: Content */}
                                            <div className="flex-1 p-8 md:p-10 flex flex-col">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h3 className="text-2xl font-black mb-1 leading-tight">{rec.outfit.name}</h3>
                                                        <p className="text-sm font-bold text-primary uppercase tracking-tighter">{rec.occasion}</p>
                                                    </div>
                                                    <button onClick={() => handleSave(rec)} className="p-2 hover:bg-muted rounded-full transition-colors">
                                                        <Bookmark className={`w-5 h-5 ${useRecommendationsStore.getState().savedOutfits.find(s => s.id === rec.id) ? 'text-primary fill-primary' : 'text-muted-foreground'}`}  />
                                                    </button>
                                                </div>
                                                
                                                <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                                                    &quot;{rec.reason}&quot;
                                                </p>

                                                <div className="space-y-6">
                                                    <div className="space-y-2">
                                                        <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                                                            <span>AI Confidence</span>
                                                            <span className="text-primary">{rec.outfit.confidence}%</span>
                                                        </div>
                                                        <Progress value={rec.outfit.confidence} className="h-1.5 bg-muted" />
                                                    </div>

                                                    <div className="flex items-center gap-4">
                                                        <Link href={`/recommendations/${rec.id}`} className="flex-1">
                                                            <Button className="w-full h-12 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-bold">
                                                                View Details
                                                            </Button>
                                                        </Link>
                                                        <Button onClick={() => handleShare(rec.outfit.name)} variant="outline" className="p-3 h-12 w-12 rounded-2xl border-2">
                                                            <Share2 className="w-5 h-5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Insight Banner */}
                {!isLoading && (
                    <div className="max-w-7xl mx-auto px-4 mt-20">
                        <Card className="p-8 md:p-12 rounded-[4rem] bg-gradient-to-br from-primary via-primary/90 to-accent text-white border-none relative overflow-hidden shadow-2xl shadow-primary/20">
                            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-black mb-6">Style Statistics</h2>
                                    <p className="text-xl opacity-80 mb-8 max-w-md">Your wardrobe sustainability score has increased by 12% this month. Keep it up!</p>
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-3xl font-black">85%</p>
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-60">Sustainable</p>
                                        </div>
                                        <div className="w-[1px] bg-white/20" />
                                        <div>
                                            <p className="text-3xl font-black">128</p>
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-60">Outfits Logged</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:flex justify-center">
                                    <div className="w-48 h-48 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20">
                                        <TrendingUp className="w-24 h-24 text-white opacity-40" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
