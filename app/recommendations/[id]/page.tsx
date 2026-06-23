/**
 * Recommendation Details Page
 * Dynamic route to view full details of an AI-generated outfit recommendation.
 */

'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
    ChevronLeft, 
    Sparkles, 
    Cloud,
    Zap, 
    Share2,
    Check,
    Bookmark,
    ShoppingBag,
    Info,
    Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { AnimatePresence } from 'framer-motion';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useRecommendationsStore } from '@/lib/store';

export default function RecommendationDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { recommendations } = useRecommendationsStore();
    const [showSuccessScreen, setShowSuccessScreen] = React.useState(false);
    const [isSaving, setIsSaving] = React.useState(false);
    
    // Find the specific recommendation
    const recommendation = recommendations.find(r => r.id === params.id);

    // Fallback if not found (direct navigation or refresh)
    if (!recommendation) {
        return (
            <MainLayout>
                <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                    <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
                        <Info className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4">Recommendation Not Found</h1>
                    <p className="text-muted-foreground mb-8 max-w-md">
                        The recommendation you are looking for might have expired or been removed.
                    </p>
                    <Link href="/recommendations">
                        <Button className="rounded-xl px-8">Back to Recommendations</Button>
                    </Link>
                </div>
            </MainLayout>
        );
    }

    const handleWear = () => {
        toast.success("Outfit logged as today's choice!", {
            description: "Confidence +10. Have a great day!",
            icon: <Check className="w-5 h-5 text-green-500" />
        });
    };

    const handleSave = async () => {
        setIsSaving(true);
        // Simulate save
        await new Promise(r => setTimeout(r, 800));
        setIsSaving(false);
        setShowSuccessScreen(true);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'StyleSmart Recommendation',
                text: `I'm wearing the ${recommendation.outfit.name} today!`,
                url: window.location.href,
            }).catch(() => toast.error('Sharing failed'));
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success('Link copied to clipboard!');
        }
    };

    return (
        <MainLayout>
            <div className="min-h-screen pb-24 pt-8">
                {/* Back Navigation */}
                <div className="max-w-6xl mx-auto px-4 mb-8">
                    <Link href="/recommendations" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors font-bold group">
                        <div className="p-2 bg-muted rounded-full mr-3 group-hover:-translate-x-1 transition-transform">
                            <ChevronLeft className="w-5 h-5" />
                        </div>
                        Back to AI Suggestions
                    </Link>
                </div>

                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-12 gap-12 items-start">
                        
                        {/* Left Column: Visual Preview */}
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-5 space-y-6"
                        >
                            <Card className="aspect-[4/5] rounded-[3.5rem] overflow-hidden border-none shadow-2xl bg-muted relative flex items-center justify-center group">
                                {recommendation.image ? (
                                    <img 
                                        src={recommendation.image} 
                                        alt={recommendation.outfit.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                                    />
                                ) : (
                                    <motion.div 
                                        className="w-48 h-48 bg-white/30 backdrop-blur-2xl rounded-full flex items-center justify-center shadow-2xl border border-white/40"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ type: 'spring', stiffness: 300 }}
                                    >
                                        <Sparkles className="w-24 h-24 text-primary opacity-60" />
                                    </motion.div>
                                )}
                                
                                {/* Status Overlays */}
                                <div className="absolute top-8 left-8 flex flex-col gap-3">
                                    <Badge className="bg-white/70 backdrop-blur-md text-foreground border-none px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">
                                        <Cloud className="w-3 h-3 mr-2" /> {recommendation.weather || 'Perfect Weather'}
                                    </Badge>
                                    <Badge className="bg-white/70 backdrop-blur-md text-foreground border-none px-4 py-2 rounded-full font-black text-[10px] uppercase tracking-widest shadow-lg">
                                        <Zap className="w-3 h-3 mr-2" /> {recommendation.outfit.occasion || 'Everyday'}
                                    </Badge>
                                </div>
                            </Card>

                            <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-card/50 backdrop-blur-md">
                                <h3 className="text-lg font-black mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-accent" /> Why This Works
                                </h3>
                                <p className="text-muted-foreground leading-relaxed italic">
                                    &quot;{recommendation.reason}&quot;
                                </p>
                            </Card>
                        </motion.div>

                        {/* Right Column: Details & Selection */}
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:col-span-7 space-y-8"
                        >
                            <div>
                                <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tighter">{recommendation.outfit.name}</h1>
                                <div className="flex flex-wrap gap-4 items-center">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-black text-xs uppercase tracking-widest">
                                        {recommendation.outfit.confidence}% Match
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-600 rounded-full font-black text-xs uppercase tracking-widest">
                                        Sustainable Choice
                                    </div>
                                </div>
                            </div>

                            <Separator className="bg-border/50" />

                            {/* Outfit Breakdown */}
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black">The Components</h2>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { icon: '🧥', name: 'Premium Overcoat', cat: 'Outerwear' },
                                        { icon: '👕', name: 'Cotton Crew Neck', cat: 'Tops' },
                                        { icon: '👖', name: 'Tapered Chinos', cat: 'Bottoms' },
                                        { icon: '👟', name: 'Minimalist Sneakers', cat: 'Shoes' }
                                    ].map((item, i) => (
                                        <Card key={i} className="p-4 rounded-2xl border-none shadow-md bg-card hover:bg-muted/50 transition-colors cursor-pointer group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm">{item.name}</p>
                                                    <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{item.cat}</p>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>

                            <Separator className="bg-border/50" />

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button 
                                    onClick={handleWear}
                                    className="flex-1 h-16 rounded-[2rem] bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                                >
                                    <Check className="w-6 h-6" /> I&apos;M WEARING THIS
                                </Button>
                                <div className="flex gap-4">
                                    <Button 
                                        variant="outline" 
                                        onClick={handleSave}
                                        disabled={isSaving}
                                        className={`h-16 w-16 rounded-[2rem] border-2 flex items-center justify-center p-0 transition-all ${isSaving ? 'scale-90 opacity-50' : 'hover:border-primary hover:text-primary'}`}
                                    >
                                        {isSaving ? <Loader2 className="w-6 h-6 animate-spin" /> : <Bookmark className="w-6 h-6" />}
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        onClick={handleShare}
                                        className="h-16 w-16 rounded-[2rem] border-2 flex items-center justify-center p-0"
                                    >
                                        <Share2 className="w-6 h-6" />
                                    </Button>
                                </div>
                            </div>

                            {/* Additional Style Insights */}
                            <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-gradient-to-r from-background to-muted/50 relative overflow-hidden">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center">
                                        <Zap className="w-8 h-8 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-lg">Style Psychology</h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            This color palette communicates reliability and openness, perfect for {recommendation.occasion.toLowerCase()}.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Celebration / Success Screen Overlay */}
            <AnimatePresence>
                {showSuccessScreen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 40 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="relative w-full max-w-lg overflow-hidden rounded-[4rem] bg-card shadow-2xl border border-border/50"
                        >
                            {/* Decorative Background */}
                            <div className="absolute inset-0 z-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

                            <div className="relative z-10 p-12 flex flex-col items-center text-center">
                                {/* Success Icon/Image */}
                                <motion.div 
                                    initial={{ rotate: -15, scale: 0 }}
                                    animate={{ rotate: 0, scale: 1 }}
                                    transition={{ delay: 0.2, type: "spring" }}
                                    className="w-32 h-32 rounded-[2.5rem] bg-primary text-primary-foreground flex items-center justify-center mb-10 shadow-2xl shadow-primary/30"
                                >
                                    <ShoppingBag className="w-16 h-16" />
                                    <motion.div 
                                        className="absolute -top-2 -right-2 w-10 h-10 bg-accent text-white rounded-full flex items-center justify-center shadow-lg border-4 border-card"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <Check className="w-5 h-5 font-black" />
                                    </motion.div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <h2 className="text-4xl font-black tracking-tighter mb-4 uppercase">
                                        Saved to your collection!
                                    </h2>
                                    <p className="text-muted-foreground text-lg mb-10 max-w-xs mx-auto font-medium">
                                        &quot;{recommendation.outfit.name}&quot; has been securely archived in your style library.
                                    </p>
                                </motion.div>

                                <motion.div 
                                    className="flex flex-col w-full gap-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <Link href="/wardrobe" className="w-full">
                                        <Button className="w-full h-16 rounded-[2rem] text-lg font-black bg-foreground text-background hover:bg-foreground/90">
                                            VIEW COLLECTION
                                        </Button>
                                    </Link>
                                    <Button 
                                        variant="ghost" 
                                        onClick={() => setShowSuccessScreen(false)}
                                        className="h-14 rounded-2xl font-bold text-muted-foreground hover:text-foreground"
                                    >
                                        Dismiss
                                    </Button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MainLayout>
    );
}
