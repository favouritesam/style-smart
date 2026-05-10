/**
 * Careers Page
 * Showcases company culture and open positions with a premium, high-impact design.
 */

'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
    Briefcase, 
    Rocket, 
    Heart, 
    Globe, 
    Zap, 
    Users, 
    ArrowRight,
    MapPin,
    Clock
} from 'lucide-react';

import { toast } from 'sonner';
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

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

export default function CareersPage() {
    const jobs = [
        {
            title: "Senior AI Engineer",
            department: "Engineering",
            location: "Remote / New York",
            type: "Full-time"
        },
        {
            title: "Product Designer (UI/UX)",
            department: "Design",
            location: "Remote / London",
            type: "Full-time"
        },
        {
            title: "Fashion Data Scientist",
            department: "Data",
            location: "Remote",
            type: "Contract"
        },
        {
            title: "Growth Marketing Manager",
            department: "Marketing",
            location: "Remote / Lagos",
            type: "Full-time"
        }
    ];

    const perks = [
        { title: "Remote First", icon: <Globe className="text-blue-500" />, desc: "Work from anywhere in the world." },
        { title: "Equity & Ownership", icon: <Zap className="text-yellow-500" />, desc: "Be a true part of our success." },
        { title: "Health & Wellness", icon: <Heart className="text-red-500" />, desc: "Full medical coverage and gym perks." },
        { title: "Growth Budget", icon: <Rocket className="text-primary" />, desc: "$2k annual learning & development budget." }
    ];

    return (
        <MainLayout>
            <div className="pt-24 pb-32">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-4 text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-xs font-bold mb-6 border border-primary/20"
                    >
                        <Users className="w-3 h-3" /> JOIN THE REVOLUTION
                    </motion.div>
                    <h1 className="text-5xl md:text-8xl font-black mb-8 leading-tight">Help Us Define the <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">Future of Style</span></h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        We&apos;re looking for visionaries, builders, and fashion-forward thinkers to help us build the world&apos;s most intelligent lifestyle companion.
                    </p>
                </section>

                {/* Culture / Perks Grid */}
                <section className="max-w-7xl mx-auto px-4 mb-32">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {perks.map((perk, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Card className="p-8 rounded-[2.5rem] border-none shadow-xl bg-card hover:shadow-2xl transition-all h-full">
                                    <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-6 text-2xl">
                                        {perk.icon}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{perk.title}</h3>
                                    <p className="text-muted-foreground text-sm">{perk.desc}</p>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Open Positions */}
                <section className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-3xl font-black">Open Positions</h2>
                        <span className="px-4 py-1 bg-muted rounded-full text-xs font-bold">{jobs.length} Opportunities</span>
                    </div>

                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-4"
                    >
                        {jobs.map((job, idx) => (
                            <motion.div key={idx} variants={itemVariants}>
                                <Card className="group p-6 md:p-8 rounded-[2rem] border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-all duration-300 cursor-pointer shadow-lg">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="space-y-1">
                                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-medium">
                                                <span className="flex items-center gap-1.5"><Briefcase className="w-4 h-4" /> {job.department}</span>
                                                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</span>
                                                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {job.type}</span>
                                            </div>
                                        </div>
                                        <Button onClick={() => toast.success("Application started!", { description: "We'll be in touch soon." })} className="rounded-xl h-12 px-6 group-hover:bg-primary transition-all">
                                            Apply Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </motion.div>
                </section>

                {/* Bottom CTA */}
                <section className="max-w-5xl mx-auto px-4 mt-40">
                    <Card className="p-12 md:p-20 rounded-[4rem] bg-foreground text-background border-none text-center relative overflow-hidden shadow-2xl">
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black mb-8">Don&apos;t see your role?</h2>
                            <p className="text-xl opacity-70 mb-12 max-w-xl mx-auto">
                                We&apos;re always looking for exceptional talent. Send us an open application and tell us how you can help StyleSmart grow.
                            </p>
                            <Button onClick={() => toast.success("Open application received!")} size="lg" className="rounded-full px-12 h-16 text-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black">
                                Send Open Application
                            </Button>
                        </div>
                        {/* Decorative background blobs */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
                    </Card>
                </section>
            </div>
        </MainLayout>
    );
}
