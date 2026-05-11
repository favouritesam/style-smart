/**
 * Pricing Page
 * Transparent pricing plans with premium aesthetic and interactive comparison.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { 
    Check, 
    Zap, 
    Sparkles, 
    Star, 
    Smartphone, 
    Infinity,
    Cloud,
    ShoppingBag,
    ShieldCheck
} from 'lucide-react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

export default function PricingPage() {
    const plans = [
        {
            name: "Essential",
            price: "0",
            description: "Perfect for anyone getting started with their style journey.",
            icon: <Smartphone className="w-6 h-6 text-muted-foreground" />,
            features: [
                "Up to 20 wardrobe items",
                "Daily weather sync",
                "Basic outfit suggestions",
                "Occasion-based filters",
                "Community access"
            ],
            buttonText: "Get Started",
            link: "/register",
            premium: false
        },
        {
            name: "Style Pro",
            price: "12",
            description: "The complete styling experience for fashion enthusiasts.",
            icon: <Sparkles className="w-6 h-6 text-accent" />,
            features: [
                "Unlimited wardrobe items",
                "AI-powered styling logic",
                "Priority weather alerts",
                "Sustainability scoring",
                "Ad-free experience",
                "Early access to Phase 2",
                "Backup & Cloud sync"
            ],
            buttonText: "Upgrade to Pro",
            link: "/checkout?plan=pro",
            premium: true,
            popular: true
        },
        {
            name: "Elite",
            price: "29",
            description: "Concierge styling and full lifestyle health tracking.",
            icon: <Star className="w-6 h-6 text-yellow-500" />,
            features: [
                "Everything in Pro",
                "1-on-1 AI Stylist access",
                "Diet & Health tracking",
                "Virtual try-on preview",
                "Custom wardrobe reports",
                "Exclusive brand discounts"
            ],
            buttonText: "Join Elite",
            link: "/checkout?plan=elite",
            premium: true
        }
    ];

    return (
        <MainLayout>
            <div className="pt-24 pb-32">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/20"
                    >
                        <Zap className="w-3 h-3" /> FLEXIBLE PRICING
                    </motion.div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6">Invest in Your Confidence</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Choose the plan that fits your lifestyle. Start for free and upgrade as you grow.
                    </p>
                </div>

                {/* Pricing Cards Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
                >
                    {plans.map((plan, idx) => (
                        <motion.div key={idx} variants={cardVariants}>
                            <Card className={`relative h-full flex flex-col p-8 rounded-[2.5rem] border-2 transition-all duration-300 ${
                                plan.popular 
                                    ? 'border-primary shadow-2xl shadow-primary/20 scale-105 z-10' 
                                    : 'border-border hover:border-primary/30 bg-card/50'
                            }`}>
                                {plan.popular && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                                        MOST POPULAR
                                    </div>
                                )}

                                <div className="flex items-center gap-4 mb-6">
                                    <div className={`p-3 rounded-2xl ${plan.premium ? 'bg-primary/10' : 'bg-muted'}`}>
                                        {plan.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{plan.name}</h3>
                                        <p className="text-xs text-muted-foreground">Billed monthly</p>
                                    </div>
                                </div>

                                <div className="mb-8">
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black">$</span>
                                        <span className="text-6xl font-black tracking-tight">{plan.price}</span>
                                        <span className="text-muted-foreground font-medium">/mo</span>
                                    </div>
                                    <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                                        {plan.description}
                                    </p>
                                </div>

                                <div className="space-y-4 mb-10 flex-1">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-3">
                                            <div className={`mt-1 p-0.5 rounded-full ${plan.premium ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className="text-sm font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link href={plan.link} className="w-full">
                                    <Button 
                                        variant={plan.popular ? 'default' : 'outline'} 
                                        className={`w-full h-14 rounded-2xl text-lg font-bold transition-all duration-300 ${
                                            plan.popular ? 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30' : ''
                                        }`}
                                    >
                                        {plan.buttonText}
                                    </Button>
                                </Link>
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Trust Badges */}
                <div className="mt-24 text-center">
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-10">Trusted by modern individuals everywhere</p>
                    <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale contrast-125">
                        <div className="flex items-center gap-2 font-bold text-xl"><Cloud className="w-6 h-6" /> iCloud</div>
                        <div className="flex items-center gap-2 font-bold text-xl"><ShoppingBag className="w-6 h-6" /> Shopify</div>
                        <div className="flex items-center gap-2 font-bold text-xl"><Zap className="w-6 h-6" /> Stripe</div>
                        <div className="flex items-center gap-2 font-bold text-xl"><ShieldCheck className="w-6 h-6" /> Auth0</div>
                    </div>
                </div>

                {/* FAQ Preview */}
                <div className="max-w-3xl mx-auto mt-32 px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-6">
                        {[
                            { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel at any time from your account settings with no hidden fees." },
                            { q: "Is my wardrobe data secure?", a: "Absolutely. We use industry-standard encryption to protect your images and personal style data." }
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-card border border-border">
                                <h4 className="font-bold mb-2">{faq.q}</h4>
                                <p className="text-muted-foreground text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
