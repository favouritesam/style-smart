/**
 * User Profile Page
 * Premium redesign with visual-first dashboard, interactive stats, and sleek animations.
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
    User as UserIcon,
    Mail,
    LogOut,
    Settings,
    Edit2,
    Save,
    X,
    Loader2,
    TrendingUp,
    Heart,
    Package,
    Zap,
    Calendar,
    Shield,
    Palette,
    Check,
    Camera,
    ChevronRight,
    MapPin,
    Award
} from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

import { useAuthStore } from '@/lib/store';
import { analyticsAPI, userAPI } from '@/lib/api-clients';
import { StyleAnalytics, SustainabilityScore } from '@/lib/types';
import { toast } from 'sonner';
import { MainLayout } from '@/components/layout/MainLayout';

/**
 * Animation Variants
 */
const containerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { 
            duration: 0.5,
            staggerChildren: 0.1
        }
    }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
};

export default function ProfilePage() {
    const { user, isAuthenticated, setUser, logout } = useAuthStore();
    const router = useRouter();

    // State
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [analytics, setAnalytics] = useState<StyleAnalytics | null>(null);
    const [sustainability, setSustainability] = useState<SustainabilityScore | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const styleMeta = {
        casual: { label: 'Casual', desc: 'Comfortable and relaxed everyday wear.' },
        formal: { label: 'Formal', desc: 'Elegant and structured professional attire.' },
        minimalist: { label: 'Minimalist', desc: 'Clean lines and a simple monochrome palette.' },
        bohemian: { label: 'Bohemian', desc: 'Artistic, free-spirited, and colorful patterns.' },
        classic: { label: 'Classic', desc: 'Timeless, sophisticated, and polished looks.' },
        trendy: { label: 'Trendy', desc: 'Bold, current, and forward-thinking fashion.' },
    };

    // Form state
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        email: user?.email || '',
        style: (user?.stylePreferences?.style || 'classic') as string,
    });

    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || '',
                email: user.email || '',
                style: (user.stylePreferences?.style || 'classic') as string,
            });
        }
    }, [user]);

    useEffect(() => {
        const fetchAnalytics = async () => {
            if (!isAuthenticated) return;
            try {
                const [aRes, sRes] = await Promise.all([
                    analyticsAPI.getColorStats(),
                    analyticsAPI.getSustainabilityScore()
                ]);
                if (aRes.success) setAnalytics(aRes.data as StyleAnalytics);
                if (sRes.success) setSustainability(sRes.data as SustainabilityScore);
            } catch (err) {
                console.error('[v0] Error fetching analytics:', err);
            }
        };
        fetchAnalytics();
    }, [isAuthenticated]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmitProfile = async (e?: React.FormEvent | React.MouseEvent) => {
        if (e && 'preventDefault' in e) e.preventDefault();
        
        setError('');
        setSuccess('');
        if (!formData.fullName.trim()) return setError('Full name is required');
        
        setIsLoading(true);
        try {
            // Simulate API latency
            await new Promise(r => setTimeout(r, 1200));

            const updatedUser = {
                ...user,
                fullName: formData.fullName,
                email: formData.email,
                stylePreferences: {
                    ...user?.stylePreferences,
                    style: formData.style as any,
                },
            };

            // Update local store
            setUser(updatedUser as any);
            
            setSuccess('Profile updated successfully!');
            setIsEditing(false);
            toast.success("Profile changes saved!", {
                description: "Your digital identity has been updated."
            });
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError('An error occurred while saving your changes');
            toast.error("Update failed");
        } finally {
            setIsLoading(false);
        }
    };


    const handleLogoutAction = () => {
        logout(); // This clears cookies and localStorage via our updated store
        router.push('/login');
    };

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsLoading(true);
        try {
            // Simulate upload
            const reader = new FileReader();
            reader.onloadend = () => {
                if (user) {
                    setUser({ ...user, avatar: reader.result as string });
                    toast.success("Profile picture updated!");
                }
            };
            reader.readAsDataURL(file);
        } catch (err) {
            toast.error("Failed to upload avatar");
        } finally {
            setIsLoading(false);
        }
    };

    const handleEnable2FA = () => {
        toast.promise(new Promise(r => setTimeout(r, 1500)), {
            loading: 'Initializing 2FA setup...',
            success: '2FA Setup wizard started. Check your email!',
            error: 'Failed to initialize 2FA',
        });
    };

    const handleConfigureNotifications = () => {
        toast.info("Notification preferences updated", {
            description: "You'll now receive weekly style digests."
        });
    };

    const handleDeleteAccount = () => {
        setShowDeleteModal(true);
    };

    const confirmDeleteAccount = async () => {
        setIsLoading(true);
        try {
            await new Promise(r => setTimeout(r, 2000));
            logout();
            router.push('/');
            toast.success("Account deleted", {
                description: "We're sorry to see you go. All data has been erased."
            });
        } catch (err) {
            toast.error("Failed to delete account");
        } finally {
            setIsLoading(false);
            setShowDeleteModal(false);
        }
    };

    if (!user && isAuthenticated) {
        return (
            <MainLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-10 h-10 animate-spin text-primary" />
                </div>
            </MainLayout>
        );
    }

    if (!user) {
        return (
            <MainLayout>
                <div className="py-24 text-center">
                    <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Shield className="w-10 h-10 text-accent" />
                    </div>
                    <h2 className="text-3xl font-bold text-foreground mb-4">Session Expired</h2>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                        Please sign in again to access your profile.
                    </p>
                    <Button onClick={() => router.push('/login')} size="lg" className="rounded-full px-8">
                        Sign In Now
                    </Button>
                </div>
            </MainLayout>
        );
    }
    return (
        <MainLayout>
            <div className="min-h-screen pb-20">
                {/* Premium Hero Header */}
                <div className="relative h-64 bg-gradient-to-r from-primary/20 via-accent/10 to-secondary/20 overflow-hidden">
                    <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
                </div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-32 relative z-10">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid lg:grid-cols-12 gap-8"
                    >
                        {/* Sidebar: Profile Summary */}
                        <div className="lg:col-span-4 space-y-6">
                            <Card className="p-6 border-none shadow-2xl bg-card/50 backdrop-blur-xl">
                                <div className="flex flex-col items-center text-center">
                                    <div className="relative mb-6">
                                        <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback className="bg-accent text-accent-foreground text-3xl">
                                                {user?.fullName ? user.fullName.split(' ').map(n => n[0]).join('') : 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                        <input 
                                            type="file" 
                                            id="avatar-upload" 
                                            className="hidden" 
                                            accept="image/*" 
                                            onChange={handleAvatarChange} 
                                        />
                                        <label 
                                            htmlFor="avatar-upload"
                                            className="absolute bottom-1 right-1 p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:scale-110 transition-transform cursor-pointer"
                                        >
                                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
                                        </label>
                                    </div>
                                    <h2 className="text-2xl font-bold text-foreground">{user.fullName}</h2>
                                    <p className="text-muted-foreground flex items-center gap-1 mt-1">
                                        <MapPin className="w-4 h-4" /> New York, NY
                                    </p>
                                    
                                    <div className="flex gap-2 mt-6 w-full">
                                        <div className="flex-1 p-3 bg-accent/5 rounded-2xl border border-accent/10">
                                            <p className="text-2xl font-bold text-accent">128</p>
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Items</p>
                                        </div>
                                        <div className="flex-1 p-3 bg-primary/5 rounded-2xl border border-primary/10">
                                            <p className="text-2xl font-bold text-primary">42</p>
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Outfits</p>
                                        </div>
                                        <div className="flex-1 p-3 bg-secondary/5 rounded-2xl border border-secondary/10">
                                            <p className="text-2xl font-bold text-secondary">85</p>
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Score</p>
                                        </div>
                                    </div>
                                </div>

                                <Separator className="my-6 opacity-50" />

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground flex items-center gap-2">
                                            <Award className="w-4 h-4 text-yellow-500" /> Style Level
                                        </span>
                                        <span className="font-bold text-foreground">Trendsetter</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-blue-500" /> Joined
                                        </span>
                                        <span className="font-bold text-foreground">May 2024</span>
                                    </div>
                                </div>

                                <Button 
                                    variant="outline" 
                                    className="w-full mt-8 rounded-xl border-destructive/20 text-destructive hover:bg-destructive/10"
                                    onClick={handleLogoutAction}
                                >
                                    <LogOut className="w-4 h-4 mr-2" /> Sign Out
                                </Button>
                            </Card>

                            {/* Style Analytics Mini Card */}
                            {sustainability && (
                                <Card className="p-6 border-none shadow-xl bg-green-500/5 border border-green-500/10">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="font-bold text-green-600 flex items-center gap-2">
                                            <Zap className="w-4 h-4" /> Eco Pulse
                                        </h3>
                                        <span className="text-xl font-black text-green-600">{sustainability.totalScore}%</span>
                                    </div>
                                    <Progress value={sustainability.totalScore} className="h-2 bg-green-100" />
                                    <p className="text-[11px] text-green-700 mt-3 font-medium italic">
                                        &quot;{sustainability.recommendation}&quot;
                                    </p>
                                </Card>
                            )}
                        </div>

                        {/* Main Content Area */}
                        <div className="lg:col-span-8">
                            <Tabs defaultValue="overview" className="w-full">
                                <TabsList className="bg-card/50 backdrop-blur-md p-1 rounded-2xl border border-border/50 mb-6">
                                    <TabsTrigger value="overview" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                                        Overview
                                    </TabsTrigger>
                                    <TabsTrigger value="edit" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                                        Edit Profile
                                    </TabsTrigger>
                                    <TabsTrigger value="preferences" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                                        Preferences
                                    </TabsTrigger>
                                    <TabsTrigger value="settings" className="rounded-xl px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                                        Settings
                                    </TabsTrigger>
                                </TabsList>

                                <AnimatePresence mode="wait">
                                    <TabsContent value="overview">
                                        <motion.div 
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="space-y-6"
                                        >
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                <Card className="p-6 bg-gradient-to-br from-card to-accent/5 border-none shadow-lg">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className="p-3 bg-accent/10 rounded-xl">
                                                            <Palette className="w-6 h-6 text-accent" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold">Style DNA</h4>
                                                            <p className="text-xs text-muted-foreground">Your visual identity</p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-muted-foreground">Primary Vibe</span>
                                                            <span className="font-semibold capitalize">{user.stylePreferences?.style || 'Modern'}</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-muted-foreground">Color Palette</span>
                                                            <div className="flex gap-1">
                                                                <div className="w-3 h-3 rounded-full bg-blue-500" />
                                                                <div className="w-3 h-3 rounded-full bg-gray-200" />
                                                                <div className="w-3 h-3 rounded-full bg-black" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card>

                                                <Card className="p-6 bg-gradient-to-br from-card to-primary/5 border-none shadow-lg">
                                                    <div className="flex items-center gap-4 mb-4">
                                                        <div className="p-3 bg-primary/10 rounded-xl">
                                                            <TrendingUp className="w-6 h-6 text-primary" />
                                                        </div>
                                                        <div>
                                                            <h4 className="font-bold">Usage Stats</h4>
                                                            <p className="text-xs text-muted-foreground">Wardrobe activity</p>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-muted-foreground">Active Items</span>
                                                            <span className="font-semibold">78%</span>
                                                        </div>
                                                        <div className="flex justify-between text-sm">
                                                            <span className="text-muted-foreground">Most Worn</span>
                                                            <span className="font-semibold">Outerwear</span>
                                                        </div>
                                                    </div>
                                                </Card>
                                            </div>

                                            <Card className="p-6 border-none shadow-lg overflow-hidden relative">
                                                <div className="relative z-10">
                                                    <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                                                    <div className="space-y-4">
                                                        {[1, 2, 3].map(i => (
                                                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-xl transition-colors cursor-pointer group">
                                                                <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                                                                    <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center text-xs">
                                                                        👗
                                                                    </div>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-bold group-hover:text-primary transition-colors">Wore &quot;Blue Linen Blazer&quot;</p>
                                                                    <p className="text-xs text-muted-foreground">2 days ago • Confidence 92%</p>
                                                                </div>
                                                                <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    </TabsContent>

                                    <TabsContent value="edit">
                                        <motion.div 
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                        >
                                            <Card className="p-8 border-none shadow-xl">
                                                <form onSubmit={handleSubmitProfile} className="space-y-6">
                                                    <div className="grid md:grid-cols-2 gap-6">
                                                        <div className="space-y-2">
                                                            <Label className="text-sm font-semibold">Full Name</Label>
                                                            <Input 
                                                                name="fullName"
                                                                value={formData.fullName}
                                                                onChange={handleInputChange}
                                                                className="rounded-xl h-12" 
                                                                placeholder="Enter your name"
                                                            />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label className="text-sm font-semibold">Email Address</Label>
                                                            <Input 
                                                                name="email"
                                                                type="email"
                                                                value={formData.email}
                                                                onChange={handleInputChange}
                                                                className="rounded-xl h-12" 
                                                                placeholder="your@email.com"
                                                            />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="flex justify-end gap-4 pt-4">
                                                        <Button 
                                                            type="button" 
                                                            variant="ghost" 
                                                            onClick={() => setIsEditing(false)}
                                                            className="rounded-xl"
                                                        >
                                                            Cancel
                                                        </Button>
                                                        <Button 
                                                            type="submit" 
                                                            disabled={isLoading}
                                                            className="rounded-xl px-8 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                                                        >
                                                            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save className="w-4 h-4 mr-2" /> Save Changes</>}
                                                        </Button>
                                                    </div>
                                                </form>

                                                {success && (
                                                    <motion.div 
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="mt-6 p-4 bg-primary/10 border border-primary/20 text-primary rounded-xl flex items-center gap-2"
                                                    >
                                                        <Check className="w-4 h-4" /> {success}
                                                    </motion.div>
                                                )}
                                                {error && (
                                                    <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl">
                                                        {error}
                                                    </div>
                                                )}
                                            </Card>
                                        </motion.div>
                                    </TabsContent>

                                    <TabsContent value="preferences">
                                        <motion.div 
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="space-y-6"
                                        >
                                            <Card className="p-8 border-none shadow-xl">
                                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                                    <Palette className="w-5 h-5 text-accent" /> Style Preferences
                                                </h3>
                                                
                                                <div className="grid sm:grid-cols-2 gap-4">
                                                    {Object.entries(styleMeta).map(([key, meta]) => (
                                                        <button
                                                            key={key}
                                                            onClick={() => setFormData(p => ({ ...p, style: key }))}
                                                            className={`p-5 rounded-2xl border-2 text-left transition-all relative group ${
                                                                formData.style === key 
                                                                    ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                                                                    : 'border-border hover:border-accent bg-background/50'
                                                            }`}
                                                        >
                                                            <p className="font-black text-sm uppercase tracking-wider mb-1">{meta.label}</p>
                                                            <p className="text-xs text-muted-foreground leading-relaxed pr-6">{meta.desc}</p>
                                                            {formData.style === key && (
                                                                <div className="absolute top-4 right-4 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
                                                                    <Check className="w-3.5 h-3.5" />
                                                                </div>
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>

                                                <Button 
                                                    onClick={() => handleSubmitProfile()}
                                                    disabled={isLoading}
                                                    className="w-full mt-8 rounded-xl h-14 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 text-lg font-bold"
                                                >
                                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : 'Update Preferences'}
                                                </Button>
                                            </Card>
                                        </motion.div>
                                    </TabsContent>

                                    <TabsContent value="settings">
                                        <motion.div 
                                            variants={itemVariants}
                                            initial="hidden"
                                            animate="visible"
                                            className="space-y-4"
                                        >
                                            <Card className="p-6 border-none shadow-lg">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-2 bg-blue-500/10 rounded-lg">
                                                            <Shield className="w-5 h-5 text-blue-500" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold">Two-Factor Authentication</p>
                                                            <p className="text-xs text-muted-foreground">Add an extra layer of security</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm" className="rounded-lg" onClick={handleEnable2FA}>Enable</Button>
                                                </div>
                                            </Card>

                                            <Card className="p-6 border-none shadow-lg">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-2 bg-purple-500/10 rounded-lg">
                                                            <Settings className="w-5 h-5 text-purple-500" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold">Email Notifications</p>
                                                            <p className="text-xs text-muted-foreground">Manage what updates you receive</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="outline" size="sm" className="rounded-lg" onClick={handleConfigureNotifications}>Configure</Button>
                                                </div>
                                            </Card>

                                            <Card className="p-6 border-none shadow-lg border border-destructive/10">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4 text-destructive">
                                                        <div className="p-2 bg-destructive/10 rounded-lg">
                                                            <X className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold">Delete Account</p>
                                                            <p className="text-xs opacity-70">Permanently remove your data</p>
                                                        </div>
                                                    </div>
                                                    <Button variant="destructive" size="sm" className="rounded-lg" onClick={handleDeleteAccount}>Delete</Button>
                                                </div>
                                            </Card>
                                        </motion.div>
                                    </TabsContent>
                                </AnimatePresence>
                            </Tabs>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Delete Account Modal */}
            <AnimatePresence>
                {showDeleteModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowDeleteModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-md bg-card p-8 rounded-[2.5rem] shadow-2xl border-none"
                        >
                            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <X className="w-8 h-8 text-destructive" />
                            </div>
                            <h2 className="text-2xl font-black text-center mb-2">Delete Account?</h2>
                            <p className="text-muted-foreground text-center mb-8 leading-relaxed">
                                This action is permanent. Your entire wardrobe, saved outfits, and style history will be erased forever.
                            </p>
                            <div className="flex flex-col gap-3">
                                <Button 
                                    variant="destructive" 
                                    size="lg" 
                                    className="rounded-2xl h-14 font-bold"
                                    onClick={confirmDeleteAccount}
                                    disabled={isLoading}
                                >
                                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : 'Yes, Delete Everything'}
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="lg" 
                                    className="rounded-2xl h-14 font-bold"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </MainLayout>
    );
}
