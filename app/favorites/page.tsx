/**
 * Favorites / Liked Collection Page
 * Displays all individual clothing items and complete outfits that the user has liked.
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Heart, 
    Bookmark, 
    Sparkles, 
    ShoppingBag, 
    Trash2, 
    ChevronRight,
    Search,
    Filter,
    Plus
} from 'lucide-react';
import Link from 'next/link';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWardrobeStore, useRecommendationsStore } from '@/lib/store';

export default function FavoritesPage() {
    const { items: allItems, toggleFavorite } = useWardrobeStore();
    const { savedOutfits, toggleSaveOutfit } = useRecommendationsStore();
    
    const [activeSection, setActiveSection] = useState<'items' | 'outfits'>('items');
    const [searchQuery, setSearchQuery] = useState('');

    const favoriteItems = allItems.filter(item => item.isFavorite);
    
    const filteredItems = favoriteItems.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredOutfits = (savedOutfits || []).filter(rec => 
        rec.outfit.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <MainLayout>
            <div className="min-h-screen pb-24 pt-12">
                {/* Header */}
                <div className="max-w-7xl mx-auto px-4 mb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                    >
                        <div>
                            <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-4">Saved Gems</h1>
                            <p className="text-xl text-muted-foreground max-w-lg">
                                Your personal curation of favorite pieces and AI-suggested combinations.
                            </p>
                        </div>
                        
                        <div className="flex gap-2 p-1.5 bg-slate-100 rounded-3xl w-fit">
                            <button 
                                onClick={() => setActiveSection('items')}
                                className={`px-8 py-3 rounded-2xl font-black transition-all ${
                                    activeSection === 'items' 
                                        ? 'bg-white shadow-lg text-primary' 
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Items ({favoriteItems.length})
                            </button>
                            <button 
                                onClick={() => setActiveSection('outfits')}
                                className={`px-8 py-3 rounded-2xl font-black transition-all ${
                                    activeSection === 'outfits' 
                                        ? 'bg-white shadow-lg text-primary' 
                                        : 'text-muted-foreground hover:text-foreground'
                                }`}
                            >
                                Outfits ({savedOutfits.length})
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4">
                    {/* Search & Filter Bar */}
                    <div className="relative mb-10">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input 
                            placeholder={`Search through your liked ${activeSection}...`}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-16 pl-14 pr-8 rounded-[2rem] bg-white border-none shadow-xl text-lg font-medium focus-visible:ring-primary/20"
                        />
                    </div>

                    <AnimatePresence mode="wait">
                        {activeSection === 'items' ? (
                            filteredItems.length > 0 ? (
                                <motion.div 
                                    key="items-grid"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
                                >
                                    {filteredItems.map((item) => (
                                        <Card key={item.id} className="group rounded-[2.5rem] border-none shadow-xl overflow-hidden hover:scale-105 transition-transform duration-500 bg-white">
                                            <div className="aspect-[3/4] relative overflow-hidden">
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    className="w-full h-full object-cover" 
                                                />
                                                <button 
                                                    onClick={() => toggleFavorite(item.id)}
                                                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-primary shadow-lg"
                                                >
                                                    <Heart className="w-5 h-5 fill-current" />
                                                </button>
                                                <div className="absolute top-4 left-4 px-3 py-1 bg-black/20 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest">
                                                    {item.category}
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <h3 className="font-bold text-sm line-clamp-1">{item.name}</h3>
                                                <div className="flex items-center gap-2 mt-3">
                                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                                                    <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.color}</span>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="items-empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-40 text-center flex flex-col items-center"
                                >
                                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                        <Heart className="w-10 h-10 text-muted-foreground opacity-20" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-2">No liked items yet</h3>
                                    <p className="text-muted-foreground mb-8">Go to your wardrobe and heart the pieces you love!</p>
                                    <Link href="/wardrobe">
                                        <Button className="rounded-2xl h-14 px-8 font-black">BROWSE WARDROBE</Button>
                                    </Link>
                                </motion.div>
                            )
                        ) : (
                            filteredOutfits.length > 0 ? (
                                <motion.div 
                                    key="outfits-grid"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                                >
                                    {filteredOutfits.map((rec) => (
                                        <Card key={rec.id} className="group rounded-[3rem] border-none shadow-2xl bg-white overflow-hidden flex flex-col">
                                            <div className="aspect-[16/10] relative overflow-hidden">
                                                <img 
                                                    src={rec.image} 
                                                    alt={rec.outfit.name} 
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                                                    <div>
                                                        <span className="text-[10px] font-black text-white/70 uppercase tracking-widest block mb-1">
                                                            {rec.occasion}
                                                        </span>
                                                        <h3 className="text-2xl font-black text-white">{rec.outfit.name}</h3>
                                                    </div>
                                                    <button 
                                                        onClick={() => toggleSaveOutfit(rec)}
                                                        className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-xl"
                                                    >
                                                        <Bookmark className="w-6 h-6 fill-current" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-8 flex-1 flex flex-col justify-between">
                                                <p className="text-muted-foreground italic mb-6">"{rec.reason}"</p>
                                                <Link href={`/recommendations/${rec.id}`}>
                                                    <Button variant="outline" className="w-full h-12 rounded-2xl border-2 font-bold group">
                                                        VIEW DETAILS <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </Card>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="outfits-empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="py-40 text-center flex flex-col items-center"
                                >
                                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                        <Bookmark className="w-10 h-10 text-muted-foreground opacity-20" />
                                    </div>
                                    <h3 className="text-2xl font-black mb-2">No saved outfits</h3>
                                    <p className="text-muted-foreground mb-8">Save combinations from your daily look or recommendations page.</p>
                                    <Link href="/daily-outfit">
                                        <Button className="rounded-2xl h-14 px-8 font-black">GET RECOMMENDATIONS</Button>
                                    </Link>
                                </motion.div>
                            )
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </MainLayout>
    );
}
