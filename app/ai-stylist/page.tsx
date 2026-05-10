/**
 * AI Stylist - The "Mix & Match" Assistant
 * This is the core engine for helping users combine clothing items.
 */

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Sparkles, 
    Zap, 
    ArrowRight, 
    Plus, 
    Info, 
    CloudSun, 
    RotateCcw,
    CheckCircle2,
    ShoppingBag,
    Search,
    ChevronRight,
    MapPin,
    Heart
} from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { useWardrobeStore } from '@/lib/store';
import { WardrobeItem } from '@/lib/types';

export default function AIStylistPage() {
    const { items: wardrobeItems } = useWardrobeStore();
    
    // State
    const [selectedItem, setSelectedItem] = useState<WardrobeItem | null>(null);
    const [recommendations, setRecommendations] = useState<WardrobeItem[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSelectionModal, setShowSelectionModal] = useState(false);

    // Filter items for selection
    const filteredItems = useMemo(() => {
        return wardrobeItems.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [wardrobeItems, searchQuery]);

    // Simple AI Simulation logic to find "matches"
    const generateMatches = async (item: WardrobeItem) => {
        setIsAnalyzing(true);
        // Simulate thinking time
        await new Promise(r => setTimeout(r, 1500));

        // Find items in different categories
        const matches: WardrobeItem[] = [];
        const categories = ['tops', 'bottoms', 'shoes', 'outerwear', 'accessories'].filter(c => c !== item.category);
        
        categories.forEach(cat => {
            const potential = wardrobeItems.filter(i => i.category === cat);
            if (potential.length > 0) {
                // Randomly pick one for the "AI" feel
                matches.push(potential[Math.floor(Math.random() * potential.length)]);
            }
        });

        setRecommendations(matches.slice(0, 3));
        setIsAnalyzing(false);
        toast.success("AI Styling Complete!", {
            description: `We've found the perfect complements for your ${item.name}.`
        });
    };

    const handleItemSelect = (item: WardrobeItem) => {
        setSelectedItem(item);
        setShowSelectionModal(false);
        generateMatches(item);
    };

    return (
        <MainLayout>
            <div className="min-h-screen pt-12 pb-24 bg-slate-50/50">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-2 text-primary font-black uppercase tracking-widest text-[10px] mb-3 bg-primary/10 px-4 py-1.5 rounded-full w-fit">
                            <Sparkles className="w-3.5 h-3.5" /> Intelligent Style Assistant
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
                            Mix & <span className="text-primary italic">Match</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl font-medium">
                            Select any item from your wardrobe, and our AI will build a complete, professionally styled combination for you.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-12 gap-12">
                        {/* Left: Selected Item / Input */}
                        <div className="lg:col-span-5 space-y-8">
                            <h3 className="text-2xl font-black flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">1</span>
                                Choose Base Item
                            </h3>

                            {!selectedItem ? (
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    className="cursor-pointer"
                                    onClick={() => setShowSelectionModal(true)}
                                >
                                    <Card className="aspect-square rounded-[3.5rem] border-4 border-dashed border-slate-200 bg-white flex flex-col items-center justify-center p-12 text-center group hover:border-primary/50 transition-all duration-500">
                                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary/5 transition-all">
                                            <Plus className="w-12 h-12 text-slate-300 group-hover:text-primary transition-colors" />
                                        </div>
                                        <h4 className="text-2xl font-black mb-2 tracking-tight">Pick from Closet</h4>
                                        <p className="text-muted-foreground font-medium">Start with a top, bottom, or gown</p>
                                    </Card>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="relative"
                                >
                                    <Card className="overflow-hidden rounded-[3.5rem] border-none shadow-2xl bg-white p-6 group">
                                        <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 relative">
                                            <img 
                                                src={selectedItem.image} 
                                                alt={selectedItem.name} 
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                            />
                                            <div className="absolute top-6 left-6 px-4 py-2 bg-black/30 backdrop-blur-md rounded-full text-[10px] font-black text-white uppercase tracking-widest">
                                                {selectedItem.category}
                                            </div>
                                        </div>
                                        <div className="px-4 pb-4 flex justify-between items-end">
                                            <div>
                                                <h4 className="text-2xl font-black leading-tight mb-1">{selectedItem.name}</h4>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedItem.color }} />
                                                    <span className="text-xs font-bold text-muted-foreground uppercase">{selectedItem.color}</span>
                                                </div>
                                            </div>
                                            <Button onClick={() => setShowSelectionModal(true)} variant="outline" size="sm" className="rounded-full font-black text-[10px] border-2">
                                                CHANGE
                                            </Button>
                                        </div>
                                    </Card>
                                </motion.div>
                            )}

                            {selectedItem && (
                                <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-white">
                                    <h4 className="font-black text-sm uppercase tracking-widest text-muted-foreground mb-6">Stylist Preferences</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                                            <span className="font-bold text-sm">Target Occasion</span>
                                            <Badge className="rounded-lg bg-primary">Business Casual</Badge>
                                        </div>
                                        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                                            <span className="font-bold text-sm">Vibe Matching</span>
                                            <Badge variant="outline" className="rounded-lg border-2 border-primary/20 text-primary font-black">Complementary</Badge>
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </div>

                        {/* Right: AI Analysis & Combinations */}
                        <div className="lg:col-span-7 space-y-8">
                            <h3 className="text-2xl font-black flex items-center gap-2">
                                <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">2</span>
                                AI Suggestions
                            </h3>

                            <AnimatePresence mode="wait">
                                {isAnalyzing ? (
                                    <motion.div
                                        key="analyzing"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-[500px] flex flex-col items-center justify-center text-center p-12 bg-white rounded-[3.5rem] shadow-xl"
                                    >
                                        <div className="relative mb-10">
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1], rotate: 360 }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                                className="w-24 h-24 border-4 border-primary/10 border-t-primary rounded-full"
                                            />
                                            <Zap className="w-10 h-10 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                                        </div>
                                        <h4 className="text-3xl font-black tracking-tighter mb-4">Analyzing Your Style...</h4>
                                        <p className="text-muted-foreground font-medium max-w-sm">
                                            Scanning 140 items to find the perfect color and texture combinations for you.
                                        </p>
                                    </motion.div>
                                ) : recommendations.length > 0 ? (
                                    <motion.div
                                        key="results"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="space-y-8"
                                    >
                                        {/* The Big Combo Card */}
                                        <Card className="p-10 rounded-[3.5rem] bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden">
                                            <div className="absolute bottom-0 right-0 p-8 opacity-20 rotate-12">
                                                <Zap className="w-48 h-48" />
                                            </div>
                                            
                                            <div className="relative z-10">
                                                <div className="flex items-center gap-4 mb-8">
                                                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center">
                                                        <Sparkles className="w-6 h-6 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-black tracking-tight">The Mastermind Combo</h4>
                                                        <p className="text-white/50 text-xs font-bold uppercase tracking-widest">96% Style Harmony</p>
                                                    </div>
                                                </div>

                                                <p className="text-lg font-medium text-white/80 leading-relaxed mb-10 italic">
                                                    &quot;This combination utilizes tonal layering to create a modern, effortlessly chic look. The {selectedItem?.category} acts as a focal point, while the {recommendations[0]?.category} adds essential contrast.&quot;
                                                </p>

                                                <div className="flex gap-4">
                                                    <Button className="rounded-full px-10 h-14 bg-white text-black font-black hover:bg-white/90">
                                                        SAVE OUTFIT
                                                    </Button>
                                                    <Button variant="outline" className="rounded-full h-14 w-14 bg-white/5 border-white/20">
                                                        <Heart className="w-5 h-5" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>

                                        {/* Individual Match Cards */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {recommendations.map((item, idx) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                >
                                                    <Card className="p-4 rounded-[2.5rem] bg-white border-none shadow-xl group hover:scale-[1.03] transition-all duration-500">
                                                        <div className="aspect-square rounded-3xl overflow-hidden mb-4 relative">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                            <div className="absolute top-3 left-3 px-3 py-1 bg-black/30 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest">
                                                                {item.category}
                                                            </div>
                                                        </div>
                                                        <h5 className="font-black text-sm mb-1">{item.name}</h5>
                                                        <div className="flex items-center gap-1.5">
                                                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                                            <span className="text-[10px] font-bold text-muted-foreground uppercase">Matches Base</span>
                                                        </div>
                                                    </Card>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ) : (
                                    <div className="h-[400px] flex flex-col items-center justify-center text-center p-12 bg-white/40 border-2 border-dashed border-slate-200 rounded-[3.5rem]">
                                        <ShoppingBag className="w-16 h-16 text-slate-200 mb-6" />
                                        <h4 className="text-xl font-bold text-slate-400">Waiting for your selection</h4>
                                        <p className="text-slate-400 max-w-xs mt-2 font-medium italic">
                                            Select an item on the left to activate the AI Stylist.
                                        </p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selection Modal (Full Screen Overlay) */}
            <AnimatePresence>
                {showSelectionModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            className="bg-white w-full max-w-5xl h-full rounded-[3.5rem] overflow-hidden flex flex-col relative"
                        >
                            {/* Modal Close */}
                            <Button 
                                onClick={() => setShowSelectionModal(false)}
                                variant="ghost" 
                                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 z-10"
                            >
                                <Plus className="w-6 h-6 rotate-45" />
                            </Button>

                            <div className="p-12 pb-6 border-b">
                                <h3 className="text-4xl font-black tracking-tighter mb-6">Select Base Item</h3>
                                <div className="relative">
                                    <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                    <Input 
                                        className="pl-14 h-16 rounded-2xl bg-slate-50 border-none text-lg font-bold"
                                        placeholder="Search your wardrobe..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto p-12 pt-8">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {filteredItems.length > 0 ? (
                                        filteredItems.map(item => (
                                            <div 
                                                key={item.id}
                                                onClick={() => handleItemSelect(item)}
                                                className="cursor-pointer group"
                                            >
                                                <div className="aspect-[3/4] rounded-3xl overflow-hidden mb-4 relative">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                        <Badge className="bg-white text-primary font-black px-4 py-2">SELECT</Badge>
                                                    </div>
                                                </div>
                                                <h5 className="font-bold text-sm truncate">{item.name}</h5>
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">{item.category}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-20 text-center">
                                            <p className="text-slate-400 font-bold">No items found matching your search.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </MainLayout>
    );
}
