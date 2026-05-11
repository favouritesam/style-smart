/**
 * Checkout Page
 * Premium payment and plan selection interface with high-fidelity aesthetics.
 */

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    CreditCard, 
    ShieldCheck, 
    Lock, 
    ArrowLeft, 
    CheckCircle2, 
    Zap,
    Sparkles,
    Shield,
    Globe,
    ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const PLAN_CONFIG: Record<string, { name: string; price: string; features: string[] }> = {
    pro: {
        name: "Style Pro",
        price: "12.00",
        features: ["Unlimited Items", "AI Styling Logic", "Cloud Sync"],
    },
    elite: {
        name: "Elite",
        price: "29.00",
        features: ["Everything in Pro", "1-on-1 AI Stylist", "Diet & Health Tracking", "Virtual Try-On"],
    },
};

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const planKey = searchParams.get('plan') || 'pro';
    const planDetails = PLAN_CONFIG[planKey] ?? PLAN_CONFIG['pro'];
    const [isProcessing, setIsProcessing] = useState(false);
    const [step, setStep] = useState(1);

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsProcessing(false);
        setStep(2);
        toast.success(`Payment successful! Welcome to ${planDetails.name}.`);
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

                    <AnimatePresence mode="wait">
                        {step === 1 ? (
                            <motion.div 
                                key="form"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid lg:grid-cols-3 gap-12"
                            >
                                {/* Left Column: Checkout Form */}
                                <div className="lg:col-span-2 space-y-8">
                                    <div className="space-y-2">
                                        <h1 className="text-4xl font-black tracking-tight">Finalize Your Plan</h1>
                                        <p className="text-muted-foreground">Complete your payment details to unlock StyleSmart <span className="font-bold text-primary">{planDetails.name}</span>.</p>
                                    </div>

                                    <Card className="p-8 md:p-10 rounded-[3rem] border-none shadow-2xl bg-white">
                                        <form onSubmit={handlePayment} className="space-y-8">
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">First Name</Label>
                                                    <Input required placeholder="Jane" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/20" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Last Name</Label>
                                                    <Input required placeholder="Doe" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/20" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Card Information</Label>
                                                <div className="relative">
                                                    <Input required placeholder="0000 0000 0000 0000" className="h-14 pl-12 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/20" />
                                                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Expiry Date</Label>
                                                    <Input required placeholder="MM/YY" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/20" />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">CVV</Label>
                                                    <Input required placeholder="123" className="h-14 rounded-2xl bg-slate-50 border-none focus-visible:ring-2 focus-visible:ring-primary/20" />
                                                </div>
                                            </div>

                                            <div className="pt-6">
                                                <Button 
                                                    type="submit" 
                                                    disabled={isProcessing}
                                                    className="w-full h-16 rounded-[2rem] bg-primary hover:bg-primary/90 text-lg font-black shadow-xl shadow-primary/20 group"
                                                >
                                                    {isProcessing ? (
                                                        <motion.div 
                                                            animate={{ rotate: 360 }}
                                                            transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                                                            className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                                                        />
                                                    ) : (
                                                        <>PAY AND UPGRADE <ArrowLeft className="ml-2 w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" /></>
                                                    )}
                                                </Button>
                                            </div>
                                        </form>

                                        <div className="mt-8 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-8 opacity-40 grayscale">
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><ShieldCheck className="w-4 h-4" /> Secure Payment</div>
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><Lock className="w-4 h-4" /> SSL Encrypted</div>
                                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"><Globe className="w-4 h-4" /> Global Gateway</div>
                                        </div>
                                    </Card>
                                </div>

                                {/* Right Column: Order Summary */}
                                <div className="space-y-8">
                                    <h2 className="text-2xl font-black tracking-tight">Order Summary</h2>
                                    <Card className="p-8 rounded-[3rem] border-none shadow-xl bg-gradient-to-br from-primary to-accent text-white overflow-hidden relative">
                                        <div className="relative z-10 space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                                                    <Sparkles className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="text-xl font-black">{planDetails.name}</h3>
                                                    <p className="text-xs opacity-80 font-bold uppercase tracking-widest">Monthly Billing</p>
                                                </div>
                                            </div>

                                            <div className="space-y-3 pt-4 border-t border-white/20">
                                                <div className="flex justify-between font-bold">
                                                    <span className="opacity-70">Plan Subtotal</span>
                                                    <span>${planDetails.price}</span>
                                                </div>
                                                <div className="flex justify-between font-bold">
                                                    <span className="opacity-70">Tax (0%)</span>
                                                    <span>$0.00</span>
                                                </div>
                                                <div className="flex justify-between text-2xl font-black pt-4 border-t border-white/20">
                                                    <span>Total</span>
                                                    <span>${planDetails.price}</span>
                                                </div>
                                            </div>

                                            <div className="pt-4 space-y-4">
                                                <p className="text-[10px] font-black uppercase tracking-widest opacity-60">INCLUDED FEATURES</p>
                                                <div className="space-y-2">
                                                    {planDetails.features.map((f, i) => (
                                                        <div key={i} className="flex items-center gap-2 text-sm font-bold">
                                                            <CheckCircle2 className="w-4 h-4 text-white" /> {f}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {/* Abstract Shape */}
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                                    </Card>

                                    <Card className="p-8 rounded-[2.5rem] border-none shadow-lg bg-white flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-2xl">
                                            <Shield className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">30-Day Money Back</h4>
                                            <p className="text-xs text-muted-foreground">Not satisfied? Get a full refund anytime.</p>
                                        </div>
                                    </Card>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="max-w-xl mx-auto text-center space-y-8 py-20"
                            >
                                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-primary/20">
                                    <CheckCircle2 className="w-12 h-12 text-white" />
                                </div>
                                <div className="space-y-4">
                                    <h1 className="text-5xl font-black tracking-tight">You're {planDetails.name}!</h1>
                                    <p className="text-xl text-muted-foreground leading-relaxed">
                                        Your account has been upgraded to <strong>{planDetails.name}</strong> successfully. You now have full access to all included features.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                    <Button asChild size="lg" className="h-16 px-10 rounded-[2rem] font-black shadow-xl shadow-primary/20">
                                        <Link href="/wardrobe">EXPLORE WARDROBE</Link>
                                    </Button>
                                    <Button asChild variant="outline" size="lg" className="h-16 px-10 rounded-[2rem] font-black border-2">
                                        <Link href="/">BACK HOME</Link>
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </MainLayout>
    );
}
