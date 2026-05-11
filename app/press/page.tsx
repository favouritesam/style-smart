/**
 * Press Page
 * Media resources, press releases, and brand assets for StyleSmart.
 */

'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
    Newspaper, 
    Download, 
    Image as ImageIcon, 
    Mail, 
    Share2, 
    ExternalLink,
    Zap,
    Users
} from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

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
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.5 }
    }
};

export default function PressPage() {
    const releases = [
        {
            date: "May 1, 2024",
            title: "StyleSmart Reaches 1 Million Active Users Milestone",
            category: "Milestone"
        },
        {
            date: "April 15, 2024",
            title: "Introducing StyleSmart Phase 2: The Future of Health & Fashion",
            category: "Product Launch"
        },
        {
            date: "March 10, 2024",
            title: "StyleSmart Secures $15M Series A Funding for AI Expansion",
            category: "Corporate"
        }
    ];

    return (
        <MainLayout>
            <div className="pt-24 pb-32">
                <div className="max-w-7xl mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-24 max-w-3xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary text-xs font-bold mb-6 border border-secondary/20"
                        >
                            <Newspaper className="w-3 h-3" /> MEDIA HUB
                        </motion.div>
                        <h1 className="text-4xl md:text-7xl font-black mb-8 leading-tight">Press Resources</h1>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Welcome to the StyleSmart media center. Here you can find our latest news, official assets, and contact information for media inquiries.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Latest News */}
                        <div className="lg:col-span-2 space-y-8">
                            <h2 className="text-3xl font-black flex items-center gap-3">
                                <Zap className="w-6 h-6 text-primary" /> Latest Releases
                            </h2>
                            <motion.div 
                                variants={containerVariants}
                                initial="hidden"
                                animate="visible"
                                className="space-y-6"
                            >
                                {releases.map((release, i) => (
                                    <motion.div key={i} variants={itemVariants}>
                                        <Card onClick={() => toast.info("Opening full press release...")} className="group p-8 rounded-[2.5rem] border-border/50 hover:border-primary/30 transition-all cursor-pointer shadow-xl">
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                                                <div className="space-y-2">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">{release.category}</span>
                                                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors leading-tight">{release.title}</h3>
                                                    <p className="text-sm text-muted-foreground font-medium">{release.date}</p>
                                                </div>
                                                <Button variant="ghost" className="p-3 h-12 w-12 rounded-full hover:bg-primary hover:text-white transition-all">
                                                    <ExternalLink className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </Card>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Sidebar: Media Kit & Contact */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-black flex items-center gap-3">
                                <ImageIcon className="w-6 h-6 text-accent" /> Media Kit
                            </h2>
                            <Card className="p-8 rounded-[3rem] border-none shadow-2xl bg-gradient-to-br from-primary to-accent text-white overflow-hidden relative">
                                <div className="relative z-10 space-y-6">
                                    <p className="font-bold text-lg opacity-90">Download our complete brand assets including logos, high-res photos, and company bio.</p>
                                    <Button onClick={() => toast.success("Preparing media kit download...")} className="w-full h-14 rounded-2xl bg-white text-primary hover:bg-white/90 font-black shadow-xl">
                                        <Download className="w-5 h-5 mr-2" /> DOWNLOAD KIT (.ZIP)
                                    </Button>
                                    <p className="text-[10px] uppercase font-black tracking-widest opacity-60 text-center">Version 2.4 | 145 MB</p>
                                </div>
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                            </Card>

                            <Card className="p-8 rounded-[3rem] border-none shadow-2xl bg-card space-y-6">
                                <h3 className="text-xl font-black flex items-center gap-2">
                                    <Mail className="w-5 h-5 text-secondary" /> Media Contacts
                                </h3>
                                <div className="space-y-4">
                                    <div className="p-4 rounded-2xl bg-muted/50 border border-border/50">
                                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">General Inquiries</p>
                                        <p className="font-bold">press@stylesmart.ai</p>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-muted/50 border border-border/50">
                                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Partnerships</p>
                                        <p className="font-bold">partners@stylesmart.ai</p>
                                    </div>
                                </div>
                                <Button 
                                    onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({ title: 'StyleSmart Newsroom', url: window.location.href });
                                        } else {
                                            navigator.clipboard.writeText(window.location.href);
                                            toast.success("Newsroom link copied to clipboard!");
                                        }
                                    }}
                                    variant="outline" 
                                    className="w-full h-12 rounded-xl font-bold border-2"
                                >
                                    <Share2 className="w-4 h-4 mr-2" /> SHARE NEWSROOM
                                </Button>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
