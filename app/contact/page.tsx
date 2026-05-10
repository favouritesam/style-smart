/**
 * Contact Page
 * Premium contact form and support information.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, MapPin, Send, Loader2 } from 'lucide-react';

import { toast } from 'sonner';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ContactPage() {
    return (
        <MainLayout>
            <div className="pt-24 pb-32">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Contact Info */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-12"
                        >
                            <div className="space-y-6">
                                <h1 className="text-4xl md:text-7xl font-black leading-tight">Get in Touch</h1>
                                <p className="text-xl text-muted-foreground leading-relaxed max-w-md">
                                    Have a question about StyleSmart? Our team is here to help you revolutionize your wardrobe.
                                </p>
                            </div>

                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Email Us</p>
                                        <p className="text-xl font-bold">hello@stylesmart.ai</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-all duration-500">
                                        <MessageSquare className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Support Chat</p>
                                        <p className="text-xl font-bold">Available 24/7</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-6 group">
                                    <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-all duration-500">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-muted-foreground mb-1">Office</p>
                                        <p className="text-xl font-bold">New York, NY</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right: Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <Card className="p-10 md:p-12 rounded-[3rem] border-none shadow-2xl bg-card">
                                <form className="space-y-6" onSubmit={(e) => {
                                    e.preventDefault();
                                    toast.success("Message sent successfully!", { description: "Our team will get back to you shortly." });
                                }}>
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold uppercase tracking-wider">Full Name</Label>
                                            <Input placeholder="John Doe" className="rounded-xl h-12 bg-muted border-none" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-bold uppercase tracking-wider">Email Address</Label>
                                            <Input placeholder="john@example.com" className="rounded-xl h-12 bg-muted border-none" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold uppercase tracking-wider">Subject</Label>
                                        <Input placeholder="How can we help?" className="rounded-xl h-12 bg-muted border-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-sm font-bold uppercase tracking-wider">Message</Label>
                                        <textarea 
                                            className="w-full h-40 rounded-xl bg-muted border-none p-4 text-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                                            placeholder="Tell us more about your inquiry..."
                                        />
                                    </div>
                                    <Button className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-lg font-bold shadow-lg shadow-primary/20">
                                        <Send className="w-5 h-5 mr-2" /> Send Message
                                    </Button>
                                </form>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
