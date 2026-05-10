/**
 * Add Wardrobe Item Page
 * Premium, visual-first form for adding new clothing items to the digital closet.
 */

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Camera,
    Upload,
    X,
    Loader2,
    ChevronLeft,
    Check,
    Plus,
    Palette,
    Tag as TagIcon,
    Sparkles,
    ShoppingBag,
    Layers
} from 'lucide-react';
import { toast } from 'sonner';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuthStore, useWardrobeStore, WardrobeItem } from '@/lib/store';

export default function AddItemPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuthStore();
    const { addItem } = useWardrobeStore();

    // Form State
    const [name, setName] = useState('');
    const [category, setCategory] = useState<WardrobeItem['category']>('tops');
    const [color, setColor] = useState('#000000');
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const categories = [
        { id: 'tops', label: 'Tops', icon: '👕' },
        { id: 'bottoms', label: 'Bottoms', icon: '👖' },
        { id: 'outerwear', label: 'Outerwear', icon: '🧥' },
        { id: 'shoes', label: 'Shoes', icon: '👟' },
        { id: 'accessories', label: 'Accessories', icon: '🕶️' },
    ];

    const presetColors = [
        '#000000', '#FFFFFF', '#1e3a8a', '#991b1b', '#166534', 
        '#4b5563', '#d97706', '#7c3aed', '#db2777', '#ca8a04'
    ];

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result as string);
            reader.readAsDataURL(file);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return toast.error('Please enter an item name');

        setIsLoading(true);
        // Simulate API call
        await new Promise(r => setTimeout(r, 1000));

        const newItem: WardrobeItem = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            category,
            color,
            image: imagePreview || undefined,
            createdAt: new Date().toISOString()
        };

        addItem(newItem);
        toast.success(`"${name}" added to your wardrobe!`, {
            description: "Ready to be styled.",
            icon: <Check className="w-5 h-5 text-green-500" />
        });
        
        router.push('/wardrobe');
    };

    return (
        <MainLayout>
            <div className="min-h-screen flex flex-col lg:flex-row bg-background">
                {/* Visual Column: Full Height Image/Upload */}
                <div className="lg:w-1/2 relative bg-muted flex flex-col min-h-[50vh] lg:min-h-screen overflow-hidden">
                    <motion.div 
                        className="absolute inset-0 z-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        {imagePreview ? (
                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-muted via-accent/5 to-primary/5 flex items-center justify-center p-12">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-background rounded-full flex items-center justify-center mb-6 mx-auto shadow-xl">
                                        <Camera className="w-10 h-10 text-primary" />
                                    </div>
                                    <h2 className="text-3xl font-black mb-2 uppercase tracking-tighter">Snap Your Style</h2>
                                    <p className="text-muted-foreground text-sm max-w-[200px] mx-auto font-medium">Add a new piece to your digital collection.</p>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Interaction Layer */}
                    <label className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center bg-black/0 hover:bg-black/20 transition-colors group">
                        {!imagePreview && <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />}
                        {imagePreview && (
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 backdrop-blur-md px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 font-black text-xs uppercase tracking-widest">
                                <Upload className="w-4 h-4" /> Change Image
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            </div>
                        )}
                    </label>

                    {/* Tip Overlay */}
                    <div className="absolute bottom-8 left-8 right-8 z-20">
                        <Card className="p-6 rounded-[2rem] bg-background/40 backdrop-blur-xl border-white/20 shadow-2xl flex items-start gap-4">
                            <div className="p-3 bg-primary text-primary-foreground rounded-2xl">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-foreground">AI Enhancement</h4>
                                <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    Our AI will automatically detect textures and color profiles to refine your recommendations.
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Details Column */}
                <div className="lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center bg-card relative overflow-y-auto">
                    {/* Back Link */}
                    <div className="mb-12">
                        <Link href="/wardrobe" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors font-bold group">
                            <div className="p-2 bg-muted rounded-full mr-3 group-hover:-translate-x-1 transition-transform">
                                <ChevronLeft className="w-5 h-5" />
                            </div>
                            Exit to Closet
                        </Link>
                    </div>

                    <div className="max-w-md mx-auto w-full space-y-12">
                        <div>
                            <h1 className="text-4xl lg:text-6xl font-black tracking-tighter mb-4">New Piece</h1>
                            <p className="text-muted-foreground font-medium">Define the DNA of your new item.</p>
                        </div>

                        <form onSubmit={handleAdd} className="space-y-10">
                                {/* Item Name */}
                                <div className="space-y-4">
                                    <Label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                        <TagIcon className="w-3.5 h-3.5" /> Item Name
                                    </Label>
                                    <Input 
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Vintage Silk Scarf"
                                        className="h-16 rounded-2xl border-2 focus-visible:ring-primary text-xl font-bold px-6 bg-background"
                                    />
                                </div>

                                {/* Category Selection */}
                                <div className="space-y-4">
                                    <Label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                        <Layers className="w-3.5 h-3.5" /> Category
                                    </Label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => setCategory(cat.id as any)}
                                                className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
                                                    category === cat.id 
                                                        ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                                                        : 'border-border hover:border-accent bg-background/50'
                                                }`}
                                            >
                                                <span className="text-2xl">{cat.icon}</span>
                                                <span className="text-[10px] font-bold uppercase tracking-wider">{cat.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Picker */}
                                <div className="space-y-4">
                                    <Label className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                                        <Palette className="w-3.5 h-3.5" /> Color Identity
                                    </Label>
                                    <div className="flex flex-wrap gap-3 p-4 bg-background/50 rounded-2xl border-2 border-border">
                                        {presetColors.map((c) => (
                                            <button
                                                key={c}
                                                type="button"
                                                onClick={() => setColor(c)}
                                                className={`w-10 h-10 rounded-full border-2 transition-all ${
                                                    color === c ? 'scale-125 border-primary shadow-lg ring-4 ring-primary/20' : 'border-white/50 scale-100 hover:scale-110'
                                                }`}
                                                style={{ backgroundColor: c }}
                                            />
                                        ))}
                                        <div className="relative">
                                            <input 
                                                type="color" 
                                                value={color} 
                                                onChange={(e) => setColor(e.target.value)}
                                                className="opacity-0 absolute inset-0 w-10 h-10 cursor-pointer"
                                            />
                                            <div className="w-10 h-10 rounded-full border-2 border-dashed border-muted-foreground flex items-center justify-center">
                                                <Plus className="w-4 h-4 text-muted-foreground" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Action */}
                                <div className="pt-6">
                                    <Button 
                                        disabled={isLoading}
                                        className="w-full h-16 rounded-[2rem] text-lg font-black bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl shadow-primary/20 flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-6 h-6 animate-spin" />
                                                ANALYZING...
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingBag className="w-6 h-6" />
                                                ADD TO CLOSET
                                            </>
                                        )}
                                    </Button>
                                    
                                    {!isAuthenticated && (
                                        <p className="text-[10px] text-center mt-6 text-muted-foreground font-medium flex items-center justify-center gap-1">
                                            <Sparkles className="w-3 h-3 text-accent" />
                                            Item will be saved to your local wardrobe.
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </MainLayout>
        );
    }

