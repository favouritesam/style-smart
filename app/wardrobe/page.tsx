/**
 * Wardrobe Page Component
 * Premium redesign for managing clothing items with visual categories and advanced filtering.
 */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    Plus,
    Search,
    Filter,
    Trash2,
    Loader2,
    ShoppingBag,
    Grid,
    List,
    ChevronRight,
    Tag,
    Palette,
    Heart
} from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useWardrobeStore, WardrobeItem } from '@/lib/store';
import {toast} from "sonner";

/**
 * Animation Variants
 */
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: { 
        opacity: 0, 
        scale: 0.95, 
        transition: { duration: 0.2 } 
    }
};

export default function WardrobePage() {
    const {
        items,
        filteredItems,
        isLoading,
        error,
        selectedCategory,
        searchQuery,
        setItems,
        setIsLoading,
        setError,
        setSelectedCategory,
        setSearchQuery,
        removeItem,
    } = useWardrobeStore();

    const categories = [
        'tops', 'bottoms', 'outerwear', 'shoes', 'shorts', 'trousers', 
        'gowns', 'skirts', 'hoodies', 'accessories', 'slippers', 
        'caps', 'polos', 'nightwear'
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 15;

    // Reset pagination when filter changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, searchQuery]);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const paginatedItems = filteredItems.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    return (
        <MainLayout>
            <div className="min-h-screen pb-24 pt-0">
                {/* Hero / Header Section */}
                <div className="max-w-7xl mx-auto px-4 mb-8 pt-8">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <h1 className="text-4xl md:text-5xl font-black text-foreground mb-2">My Wardrobe</h1>
                            <p className="text-muted-foreground text-lg">Curate and organize your personal style collection.</p>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-3"
                        >
                            <Link href="/wardrobe/add">
                                <Button className="rounded-2xl h-12 px-6 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                                    <Plus className="w-5 h-5 mr-2" /> Add New Item
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Filters & Search Bar */}
                <div className="max-w-7xl mx-auto px-4 mb-10">
                    <Card className="p-2 rounded-3xl bg-card/50 backdrop-blur-md border-border/50 shadow-xl overflow-hidden">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                            {/* Category Tabs */}
                            <div className="flex-1 flex overflow-x-auto no-scrollbar p-1 gap-1">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`px-6 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap transition-all ${
                                        selectedCategory === null
                                            ? 'bg-primary text-primary-foreground shadow-md'
                                            : 'hover:bg-muted text-muted-foreground'
                                    }`}
                                >
                                    All Items
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => setSelectedCategory(cat as any)}
                                        className={`px-6 py-2.5 rounded-2xl text-sm font-bold whitespace-nowrap capitalize transition-all ${
                                            selectedCategory === cat
                                                ? 'bg-primary text-primary-foreground shadow-md'
                                                : 'hover:bg-muted text-muted-foreground'
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>

                            <Separator className="hidden lg:block h-8 w-[1px] bg-border/50 mx-2" />

                            {/* Search */}
                            <div className="relative flex-1 lg:max-w-xs p-1">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input 
                                    placeholder="Search your closet..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 h-11 bg-transparent border-none focus-visible:ring-0 rounded-2xl"
                                />
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Grid Content */}
                <div className="max-w-7xl mx-auto px-4">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div 
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center py-32"
                            >
                                <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
                                <p className="text-muted-foreground animate-pulse">Syncing your wardrobe...</p>
                            </motion.div>
                        ) : filteredItems.length === 0 ? (
                            <motion.div 
                                key="empty"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center py-32 text-center"
                            >
                                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
                                    <ShoppingBag className="w-10 h-10 text-muted-foreground opacity-20" />
                                </div>
                                <h2 className="text-2xl font-bold mb-2">No items found</h2>
                                <p className="text-muted-foreground max-w-xs mx-auto mb-8">
                                    Try adjusting your filters or add some new pieces to your collection.
                                </p>
                                <Button variant="outline" onClick={() => {setSelectedCategory(null); setSearchQuery('');}} className="rounded-xl">
                                    Clear All Filters
                                </Button>
                            </motion.div>
                        ) : (
                            <>
                                <motion.div 
                                    key="grid"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                                >
                                    {paginatedItems.map((item) => (
                                        <motion.div 
                                            key={item.id} 
                                            variants={itemVariants}
                                            layout
                                            className="group"
                                        >
                                            <Card className="relative h-full flex flex-col rounded-[2rem] border-none shadow-xl bg-card/50 backdrop-blur-sm overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500">
                                                {/* Item Color/Image Preview */}
                                                <div 
                                                    className="aspect-[3/4] w-full relative transition-transform duration-700 group-hover:scale-105 overflow-hidden"
                                                    style={{ backgroundColor: !item.image ? item.color : undefined }}
                                                >
                                                    {item.image ? (
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.name} 
                                                            className="w-full h-full object-cover" 
                                                        />
                                                    ) : (
                                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                                                            <ShoppingBag className="w-8 h-8 text-white opacity-40" />
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    
                                                    {/* Category Badge */}
                                                    <div className="absolute top-4 left-4">
                                                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                                                            {item.category}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Item Info */}
                                                <div className="p-5 flex flex-col flex-1 bg-card">
                                                    <h3 className="font-bold text-sm line-clamp-1 mb-1 group-hover:text-primary transition-colors">{item.name}</h3>
                                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                                                        <div className="flex items-center gap-2">
                                                            <div 
                                                                className="w-3 h-3 rounded-full border border-border/50" 
                                                                style={{ backgroundColor: item.color }} 
                                                            />
                                                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">{item.color}</span>
                                                        </div>
                                                        <div className="flex gap-1">
                                                            <button 
                                                                onClick={() => {
                                                                    useWardrobeStore.getState().toggleFavorite(item.id);
                                                                    toast.success(item.isFavorite ? 'Removed from favorites' : 'Added to favorites');
                                                                }}
                                                                className={`p-2 rounded-full transition-colors ${
                                                                    item.isFavorite 
                                                                        ? 'bg-primary/10 text-primary' 
                                                                        : 'text-muted-foreground hover:bg-muted'
                                                                }`}
                                                            >
                                                                <Heart className={`w-3.5 h-3.5 ${item.isFavorite ? 'fill-current' : ''}`} />
                                                            </button>
                                                            <button 
                                                                onClick={() => {
                                                                    removeItem(item.id);
                                                                    toast.error('Item removed from wardrobe');
                                                                }}
                                                                className="p-2 hover:bg-destructive/10 text-muted-foreground hover:text-destructive rounded-full transition-colors"
                                                            >
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>

                                {/* Pagination Controls */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-4 mt-12">
                                        <Button
                                            variant="outline"
                                            disabled={currentPage === 1}
                                            onClick={() => {
                                                setCurrentPage(prev => Math.max(1, prev - 1));
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className="rounded-xl border-border/50 bg-card/50 backdrop-blur-md px-6"
                                        >
                                            Previous
                                        </Button>
                                        <div className="flex items-center gap-2">
                                            {Array.from({ length: totalPages }).map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        setCurrentPage(i + 1);
                                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                                    }}
                                                    className={`w-10 h-10 rounded-xl font-bold transition-all ${
                                                        currentPage === i + 1
                                                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110'
                                                            : 'bg-card/50 text-muted-foreground hover:bg-muted'
                                                    }`}
                                                >
                                                    {i + 1}
                                                </button>
                                            ))}
                                        </div>
                                        <Button
                                            variant="outline"
                                            disabled={currentPage === totalPages}
                                            onClick={() => {
                                                setCurrentPage(prev => Math.min(totalPages, prev + 1));
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }}
                                            className="rounded-xl border-border/50 bg-card/50 backdrop-blur-md px-6"
                                        >
                                            Next
                                        </Button>
                                    </div>
                                )}
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* Wardrobe Summary Footer */}
                {!isLoading && filteredItems.length > 0 && (
                    <div className="max-w-7xl mx-auto px-4 mt-20">
                        <Card className="p-12 md:p-20 rounded-[4rem] bg-slate-50/50 backdrop-blur-sm border-none shadow-inner flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
                            <div className="flex flex-col items-center">
                                <p className="text-6xl font-black text-primary mb-2">{items.length}</p>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Items</p>
                            </div>
                            
                            <div className="hidden md:block w-[1px] h-20 bg-border/50" />
                            
                            <div className="flex flex-col items-center">
                                <p className="text-6xl font-black text-accent mb-2">{categories.length}</p>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Categories</p>
                            </div>
                            
                            <div className="hidden md:block w-[1px] h-20 bg-border/50" />
                            
                            <div className="flex flex-col items-center">
                                <p className="text-6xl font-black text-secondary mb-2">85%</p>
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Wardrobe Health</p>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}

// Helper component for mobile scrollbar
function Separator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={`shrink-0 bg-border ${className}`} {...props} />
}
