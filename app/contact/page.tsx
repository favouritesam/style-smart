/**
 * Contact Page
 * Premium contact/sales inquiry interface for Elite plan and general support.
 */

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Mail, 
    MessageCircle, 
    ArrowLeft, 
    Send, 
    CheckCircle2, 
    Globe, 
    Users,
    Zap,
    MapPin
} from 'lucide-react';
import Link from 'next/link';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsSubmitting(false);
        setSubmitted(true);
        toast.success("Message sent! Our team will contact you soon.");
    };

    return (
        <MainLayout>
            <div className="pt-24 pb-32 min-h-screen bg-slate-50/50">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-12"
                    >
                        <Link href="/pricing" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> BACK TO PRICING
                        </Link>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Left Column: Content */}
                        <div className="space-y-12">
                            <div className="space-y-6">
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold mb-2"
                                >
                                    <Users className="w-3 h-3" /> ELITE CONCIERGE
                                </motion.div>
                                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95]">
                                    Let's Design Your <br /> <span className="text-primary">Perfect Fit.</span>
                                </h1>
                                <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                                    Interested in the Elite plan or have a custom request? Fill out the form and our head stylist will reach out within 24 hours.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="p-3 bg-white rounded-2xl w-fit shadow-sm">
                                        <Mail className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Email Us</h4>
                                        <p className="text-sm text-muted-foreground">elite@stylesmart.ai</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-3 bg-white rounded-2xl w-fit shadow-sm">
                                        <Globe className="w-6 h-6 text-accent" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold">Global Support</h4>
                                        <p className="text-sm text-muted-foreground">Available 24/7 for Elite members</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-12 border-t border-slate-200">
                                <div className="flex items-center gap-4 text-sm font-bold text-muted-foreground">
                                    <MapPin className="w-4 h-4" /> Based in London, UK
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Form */}
                        <div>
                            {!submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                >
                                    <Card className="p-8 md:p-12 rounded-[3rem] border-none shadow-2xl bg-white">
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-2">
                                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name</Label>
                                                <Input required placeholder="Jane Doe" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/20" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address</Label>
                                                <Input required type="email" placeholder="jane@example.com" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/20" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Subject</Label>
                                                <Input required placeholder="Elite Plan Inquiry" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/20" />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Your Message</Label>
                                                <Textarea required placeholder="Tell us about your style goals..." className="min-h-[150px] rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/20 p-4" />
                                            </div>
                                            <Button 
                                                type="submit" 
                                                disabled={isSubmitting}
                                                className="w-full h-16 rounded-[2rem] bg-primary hover:bg-primary/90 text-lg font-black shadow-xl shadow-primary/20 group"
                                            >
                                                {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                                                {!isSubmitting && <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                            </Button>
                                        </form>
                                    </Card>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="h-full flex flex-col items-center justify-center text-center space-y-6"
                                >
                                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-xl shadow-green-200">
                                        <CheckCircle2 className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-3xl font-black">Message Sent!</h3>
                                        <p className="text-muted-foreground">Our Elite concierge team will contact you shortly.</p>
                                    </div>
                                    <Button asChild variant="outline" className="h-14 px-8 rounded-2xl font-bold border-2">
                                        <Link href="/">RETURN HOME</Link>
                                    </Button>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
