/**
 * AI Style Chat - The Intelligent Fashion Consultant
 * A highly dynamic, responsive, and functional chat interface for personalized style advice.
 */

'use client';

import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Send, 
    Sparkles, 
    Bot, 
    Mic, 
    ShoppingBag,
    Search,
    X,
    Zap,
    Info,
    CheckCircle2
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuthStore, useWardrobeStore, type WardrobeItem } from '@/lib/store';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
    attachment?: WardrobeItem;
    suggestions?: string[];
    outfitSuggestion?: {
        name: string;
        items: WardrobeItem[];
        description: string;
    };
}

export default function AIAssistantPage() {
    const { user } = useAuthStore();
    const { items: wardrobeItems } = useWardrobeStore();
    
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            role: 'assistant',
            content: `Bonjour ${user?.fullName.split(' ')[0] || 'Style Enthusiast'}! I'm your personal StyleSmart consultant. How can we elevate your aesthetic today?`,
            timestamp: new Date(),
            suggestions: [
                "Plan an outfit for a gala",
                "How to style my denim jacket?",
                "What's trending this season?",
                "Check my wardrobe sustainability"
            ]
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [showWardrobePicker, setShowWardrobePicker] = useState(false);
    const [selectedAttachment, setSelectedAttachment] = useState<WardrobeItem | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const scrollRef = useRef<HTMLDivElement>(null);
    const messageIdCounter = useRef(100);

    const generateId = useCallback(() => {
        messageIdCounter.current += 1;
        return messageIdCounter.current.toString();
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const filteredWardrobe = useMemo(() => {
        return wardrobeItems.filter(item => 
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.category.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [wardrobeItems, searchQuery]);

    const generateAIResponse = useCallback((input: string, attachment?: WardrobeItem): Message => {
        const lower = input.toLowerCase();
        const timestamp = new Date();
        const id = generateId();

        if (attachment) {
            return {
                id,
                role: 'assistant',
                content: `That's a stunning ${attachment.name}! Given its ${attachment.color} hue and ${attachment.category} style, I'd recommend pairing it with some neutral tones to let it pop. Would you like me to find a specific combination from your closet?`,
                timestamp,
                suggestions: ["Find a matching bottom", "Suggest shoes", "Save as favorite"]
            };
        }

        if (lower.includes('gala') || lower.includes('formal')) {
            // Find a gown or formal item if exists
            const gown = wardrobeItems.find(i => i.category === 'gowns');
            return {
                id,
                role: 'assistant',
                content: "A gala requires sophistication. I've curated a high-impact look from your collection that balances elegance with modern flair.",
                timestamp,
                outfitSuggestion: {
                    name: "Midnight Elegance",
                    items: gown ? [gown] : [wardrobeItems[0] as WardrobeItem, wardrobeItems[5] as WardrobeItem], // Fallback
                    description: "This look focuses on clean lines and luxury textures. Perfect for making an entrance."
                },
                suggestions: ["Change the accessories", "Check weather suitability"]
            };
        }

        if (lower.includes('sustainability')) {
            return {
                id,
                role: 'assistant',
                content: "Your wardrobe is currently 78% sustainable! You're making great choices. To improve, consider focusing on organic fibers for your next purchase.",
                timestamp,
                suggestions: ["Show sustainable brands", "Analyze materials"]
            };
        }

        return {
            id,
            role: 'assistant',
            content: "I've analyzed your request against current fashion trends and your unique style profile. The key here is 'effortless chic'—balancing structured pieces with relaxed elements.",
            timestamp,
            suggestions: ["Tell me more", "Show examples", "Plan for tomorrow"]
        };
    }, [generateId, wardrobeItems]);

    const handleSendMessage = useCallback(async (e?: React.FormEvent, content?: string) => {
        if (e) e.preventDefault();
        const text = content || input;
        if (!text.trim() && !selectedAttachment) return;

        const userMessage: Message = {
            id: generateId(),
            role: 'user',
            content: text,
            timestamp: new Date(),
            attachment: selectedAttachment || undefined
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setSelectedAttachment(null);
        setIsTyping(true);

        // Simulate AI response logic
        setTimeout(() => {
            const assistantMessage = generateAIResponse(text, userMessage.attachment);
            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 1500);
    }, [input, selectedAttachment, generateId, generateAIResponse]);

    return (
        <MainLayout>
            <div className="min-h-[calc(100vh-80px)] bg-slate-50/50 flex flex-col relative overflow-hidden">
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col lg:flex-row gap-6 p-4 md:p-8 relative z-10">
                    {/* Sidebar: Status & Info (Hidden on mobile) */}
                    <div className="hidden lg:flex flex-col gap-6 w-80">
                        <Card className="p-6 rounded-[2.5rem] border-none shadow-xl bg-white space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white">
                                    <Bot className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="font-black text-lg">Style AI</h2>
                                    <Badge variant="outline" className="text-[10px] font-black uppercase text-green-500 border-green-500/20 bg-green-50">Online</Badge>
                                </div>
                            </div>
                            
                            <div className="space-y-4 pt-4 border-t border-slate-100">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-muted-foreground uppercase">Style Profile</span>
                                    <span className="text-xs font-black">Modern Minimalist</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-muted-foreground uppercase">Wardrobe Size</span>
                                    <span className="text-xs font-black">{wardrobeItems.length} Items</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 rounded-[2.5rem] border-none shadow-xl bg-slate-900 text-white flex-1 relative overflow-hidden">
                            <Zap className="absolute top-4 right-4 w-12 h-12 text-primary/20" />
                            <h3 className="font-black text-xl mb-4 relative z-10">Styling Tip of the Day</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-6 relative z-10">
                                &quot;Monochromatic looks aren&apos;t just for black and white. Try varying shades of sage green or ocean blue for a sophisticated, unified aesthetic.&quot;
                            </p>
                            <Button className="w-full rounded-full bg-white text-black font-black hover:bg-slate-200">
                                LEARN MORE
                            </Button>
                        </Card>
                    </div>

                    {/* Main Chat Area */}
                    <div className="flex-1 flex flex-col h-full min-h-[600px] max-h-[85vh]">
                        <Card className="flex-1 bg-white/80 backdrop-blur-xl border-none shadow-2xl rounded-[3rem] overflow-hidden flex flex-col relative">
                            {/* Chat Header (Mobile Friendly) */}
                            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-white/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary lg:hidden">
                                        <Bot className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-black tracking-tight">AI Style Consultant</h3>
                                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Personalized Fashion Advice</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="rounded-full">
                                        <Info className="w-4 h-4 text-muted-foreground" />
                                    </Button>
                                </div>
                            </div>

                            {/* Messages Area */}
                            <div 
                                ref={scrollRef}
                                className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8 no-scrollbar"
                            >
                                <AnimatePresence mode="popLayout">
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            className={`flex items-start gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                        >
                                            <Avatar className={`w-10 h-10 rounded-2xl shadow-lg ${msg.role === 'user' ? 'border-2 border-primary' : ''}`}>
                                                {msg.role === 'assistant' ? (
                                                    <div className="w-full h-full bg-primary flex items-center justify-center text-white">
                                                        <Bot className="w-6 h-6" />
                                                    </div>
                                                ) : (
                                                    <AvatarImage src={user?.avatar} />
                                                )}
                                                <AvatarFallback>{msg.role === 'assistant' ? 'AI' : 'U'}</AvatarFallback>
                                            </Avatar>

                                            <div className={`flex flex-col space-y-3 max-w-[85%] md:max-w-[70%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                                {/* Attached Wardrobe Item */}
                                                {msg.attachment && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="mb-2 p-2 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-center gap-3 pr-6"
                                                    >
                                                        <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                                                            <img src={msg.attachment.image} alt={msg.attachment.name} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Attached Item</p>
                                                            <p className="text-sm font-black">{msg.attachment.name}</p>
                                                        </div>
                                                    </motion.div>
                                                )}

                                                {/* Message Bubble */}
                                                <div className={`p-6 rounded-[2rem] text-sm leading-relaxed shadow-sm ${
                                                    msg.role === 'assistant' 
                                                        ? 'bg-white text-slate-800 rounded-tl-none border border-slate-100' 
                                                        : 'bg-primary text-white rounded-tr-none'
                                                }`}>
                                                    {msg.content}
                                                </div>

                                                {/* Outfit Suggestion Card */}
                                                {msg.outfitSuggestion && (
                                                    <Card className="mt-4 p-6 rounded-[2.5rem] bg-slate-900 text-white border-none shadow-xl w-full">
                                                        <div className="flex items-center gap-3 mb-4">
                                                            <Sparkles className="w-5 h-5 text-primary" />
                                                            <h4 className="font-black text-sm uppercase tracking-widest">{msg.outfitSuggestion.name}</h4>
                                                        </div>
                                                        <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
                                                            {msg.outfitSuggestion.items.map((item, idx) => (
                                                                <div key={idx} className="w-20 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <p className="text-xs text-slate-400 mb-6 italic">&quot;{msg.outfitSuggestion.description}&quot;</p>
                                                        <Button variant="outline" className="w-full rounded-full border-white/20 hover:bg-white hover:text-black font-black text-[10px]">
                                                            VIEW FULL OUTFIT
                                                        </Button>
                                                    </Card>
                                                )}
                                                
                                                {/* AI Suggestions */}
                                                {msg.suggestions && (
                                                    <div className="flex flex-wrap gap-2 pt-2">
                                                        {msg.suggestions.map((s, i) => (
                                                            <button
                                                                key={i}
                                                                onClick={() => handleSendMessage(undefined, s)}
                                                                className="px-4 py-2 bg-white hover:bg-primary hover:text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-100 shadow-sm transition-all duration-300"
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
                                            <div className="w-10 h-10 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg">
                                                <Bot className="w-6 h-6" />
                                            </div>
                                            <div className="bg-white p-6 rounded-[2rem] rounded-tl-none border border-slate-100 shadow-sm flex items-center gap-1">
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Wardrobe Attachment Preview */}
                            <AnimatePresence>
                                {selectedAttachment && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-6 py-4 bg-primary/5 border-t border-primary/10 flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-primary shadow-md">
                                                <img src={selectedAttachment.image} alt={selectedAttachment.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-primary uppercase tracking-widest">Selected to discuss</p>
                                                <p className="text-sm font-black">{selectedAttachment.name}</p>
                                            </div>
                                        </div>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            onClick={() => setSelectedAttachment(null)}
                                            className="rounded-full hover:bg-primary/10"
                                        >
                                            <X className="w-5 h-5 text-primary" />
                                        </Button>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Input Area */}
                            <div className="p-6 md:p-8 bg-white border-t border-slate-100">
                                <form 
                                    onSubmit={handleSendMessage}
                                    className="relative flex items-center gap-4 bg-slate-50 rounded-[2.5rem] p-2 pr-4 shadow-inner border-2 border-transparent focus-within:border-primary/20 transition-all duration-300"
                                >
                                    <Button 
                                        type="button" 
                                        variant="ghost" 
                                        size="icon" 
                                        onClick={() => setShowWardrobePicker(true)}
                                        className="rounded-full shrink-0 w-12 h-12 bg-white shadow-sm hover:scale-110 transition-transform"
                                    >
                                        <ShoppingBag className="w-5 h-5 text-primary" />
                                    </Button>
                                    <Input 
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        placeholder="Ask your Style Assistant..."
                                        className="border-none focus-visible:ring-0 bg-transparent text-sm h-12 font-medium"
                                    />
                                    <div className="flex items-center gap-2">
                                        <Button type="button" variant="ghost" size="icon" className="rounded-full shrink-0 hidden sm:flex hover:bg-primary/5">
                                            <Mic className="w-5 h-5 text-muted-foreground" />
                                        </Button>
                                        <Button 
                                            type="submit" 
                                            disabled={(!input.trim() && !selectedAttachment) || isTyping}
                                            className="rounded-full w-12 h-12 p-0 shrink-0 shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all"
                                        >
                                            <Send className="w-5 h-5" />
                                        </Button>
                                    </div>
                                </form>
                                <p className="text-[10px] text-center mt-4 text-muted-foreground font-black tracking-widest uppercase opacity-50">
                                    StyleSmart AI leverages your wardrobe data for personalized advice
                                </p>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Wardrobe Picker Modal */}
                <AnimatePresence>
                    {showWardrobePicker && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowWardrobePicker(false)}
                                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative bg-white w-full max-w-2xl max-h-[80vh] rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col"
                            >
                                <div className="p-8 border-b border-slate-100 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-2xl font-black tracking-tight">Select from Wardrobe</h3>
                                        <p className="text-sm text-muted-foreground font-medium">Choose an item to discuss with your stylist</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => setShowWardrobePicker(false)} className="rounded-full">
                                        <X className="w-6 h-6" />
                                    </Button>
                                </div>
                                
                                <div className="p-6 bg-slate-50/50">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                        <Input 
                                            placeholder="Search items..." 
                                            className="pl-12 rounded-full border-none shadow-sm h-12 font-medium"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-2 sm:grid-cols-3 gap-4 no-scrollbar">
                                    {filteredWardrobe.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => {
                                                setSelectedAttachment(item);
                                                setShowWardrobePicker(false);
                                            }}
                                            className="group cursor-pointer"
                                        >
                                            <div className="aspect-[3/4] rounded-3xl overflow-hidden relative mb-2 shadow-sm border-2 border-transparent group-hover:border-primary transition-all">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
                                                        <CheckCircle2 className="w-6 h-6" />
                                                    </div>
                                                </div>
                                                <Badge className="absolute top-3 left-3 bg-black/30 backdrop-blur-md border-none text-[8px] font-black uppercase tracking-widest">
                                                    {item.category}
                                                </Badge>
                                            </div>
                                            <p className="text-xs font-black px-2 truncate">{item.name}</p>
                                        </motion.div>
                                    ))}
                                </div>
                                
                                <div className="p-8 border-t border-slate-100 bg-slate-50/30 flex justify-end">
                                    <Button 
                                        onClick={() => setShowWardrobePicker(false)}
                                        className="rounded-full px-8 font-black"
                                    >
                                        CANCEL
                                    </Button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </MainLayout>
    );
}
