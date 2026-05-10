/**
 * AI Style Assistant Page
 * Interactive AI chat interface for style advice, wardrobe management, and outfit planning.
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Send, 
    Sparkles, 
    User, 
    Bot, 
    Image as ImageIcon, 
    Mic, 
    RefreshCw,
    Plus,
    ShoppingBag,
    Calendar,
    ChevronRight,
    Search
} from 'lucide-react';
import { toast } from 'sonner';

import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/lib/store';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    suggestions?: string[];
}

export default function AIAssistantPage() {
    const { user } = useAuthStore();
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: `Hello ${user?.fullName.split(' ')[0] || 'there'}! I'm your StyleSmart AI. How can I help you elevate your look today?`,
            timestamp: new Date(),
            suggestions: [
                "What should I wear for a rainy brunch?",
                "Analyze my wardrobe sustainability",
                "Suggest a formal outfit for tonight",
                "How can I style my new navy blazer?"
            ]
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = async (e?: React.FormEvent, content?: string) => {
        if (e) e.preventDefault();
        const text = content || input;
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: generateAIResponse(text),
                timestamp: new Date(),
                suggestions: ["Show me more options", "Save this look", "Check my wardrobe"]
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const generateAIResponse = (input: string): string => {
        const lower = input.toLowerCase();
        if (lower.includes('brunch')) return "For a rainy brunch, I recommend layering a waterproof trench coat over a lightweight cashmere sweater and tapered chinos. Add some leather Chelsea boots—they handle the moisture well while keeping you sharp!";
        if (lower.includes('blazer')) return "Your navy blazer is incredibly versatile! Try pairing it with dark wash denim and a crisp white t-shirt for a 'smart-casual' vibe, or with charcoal trousers for a more professional setting.";
        if (lower.includes('sustainability')) return "Based on your current wardrobe, 85% of your items are sustainably sourced. You're doing great! Try to look for more organic cotton or recycled polyester in your next purchase to hit 90%.";
        return "That's an interesting style question! Based on your wardrobe and preferences, I'd suggest focusing on clean silhouettes and tonal layering to create a modern, cohesive look.";
    };

    return (
        <MainLayout>
            <div className="h-[calc(100vh-100px)] flex flex-col pt-4">
                {/* Header Area */}
                <div className="max-w-4xl mx-auto w-full px-4 mb-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full font-black text-[10px] uppercase tracking-widest border border-primary/20 mb-4">
                            <Sparkles className="w-3 h-3" /> Style Assistant Alpha
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter">Intelligent Styling</h1>
                    </motion.div>
                </div>

                {/* Chat Container */}
                <div className="flex-1 max-w-4xl mx-auto w-full px-4 overflow-hidden flex flex-col">
                    <Card className="flex-1 bg-card/50 backdrop-blur-xl border-none shadow-2xl rounded-[3rem] overflow-hidden flex flex-col relative">
                        {/* Messages Area */}
                        <div 
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar"
                        >
                            <AnimatePresence mode="popLayout">
                                {messages.map((msg) => (
                                    <motion.div
                                        key={msg.id}
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                                            msg.role === 'assistant' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                        }`}>
                                            {msg.role === 'assistant' ? <Bot className="w-6 h-6" /> : <User className="w-6 h-6" />}
                                        </div>
                                        <div className={`flex flex-col space-y-3 max-w-[80%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                            <div className={`p-6 rounded-[2rem] text-sm leading-relaxed shadow-sm ${
                                                msg.role === 'assistant' 
                                                    ? 'bg-background rounded-tl-none' 
                                                    : 'bg-primary text-primary-foreground rounded-tr-none'
                                            }`}>
                                                {msg.content}
                                            </div>
                                            
                                            {/* AI Suggestions */}
                                            {msg.suggestions && (
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {msg.suggestions.map((s, i) => (
                                                        <button
                                                            key={i}
                                                            onClick={() => handleSendMessage(undefined, s)}
                                                            className="px-4 py-2 bg-muted/50 hover:bg-muted text-[10px] font-bold uppercase tracking-widest rounded-full border border-border transition-colors"
                                                        >
                                                            {s}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}

                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="w-10 h-10 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-lg">
                                            <Bot className="w-6 h-6" />
                                        </div>
                                        <div className="bg-background p-6 rounded-[2rem] rounded-tl-none shadow-sm flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-background/50 border-t border-border/50">
                            <form 
                                onSubmit={handleSendMessage}
                                className="relative flex items-center gap-4 bg-background rounded-[2rem] p-2 pr-4 shadow-inner border-2 border-border focus-within:border-primary transition-colors"
                            >
                                <Button type="button" variant="ghost" size="icon" className="rounded-full shrink-0">
                                    <Plus className="w-5 h-5 text-muted-foreground" />
                                </Button>
                                <Input 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask your Style Assistant..."
                                    className="border-none focus-visible:ring-0 bg-transparent text-sm h-12"
                                />
                                <div className="flex items-center gap-2">
                                    <Button type="button" variant="ghost" size="icon" className="rounded-full shrink-0 hidden sm:flex">
                                        <Mic className="w-5 h-5 text-muted-foreground" />
                                    </Button>
                                    <Button 
                                        type="submit" 
                                        disabled={!input.trim() || isTyping}
                                        className="rounded-full w-10 h-10 p-0 shrink-0 shadow-lg shadow-primary/20"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </form>
                            <p className="text-[10px] text-center mt-4 text-muted-foreground font-bold tracking-widest uppercase">
                                StyleSmart AI can make mistakes. Consider checking your wardrobe details.
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Footer Quick Actions (Desktop) */}
                <div className="hidden lg:flex justify-center gap-12 py-8 opacity-40 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Wardrobe Sync</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Daily Planning</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Real-time Advice</span>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
