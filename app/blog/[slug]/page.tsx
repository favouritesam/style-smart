/**
 * Dynamic Blog Post Page
 * Displays full article content with premium typography and layout.
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    Calendar, 
    User, 
    ArrowLeft, 
    Share2, 
    MessageCircle, 
    Bookmark,
    Sparkles,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

import { MainLayout } from '@/components/layout/MainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function BlogPostPage() {
    const params = useParams();
    const commentSectionRef = React.useRef<HTMLDivElement>(null);

    const scrollToComments = () => {
        commentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        toast.success("Welcome to the community!");
    };
    const slug = params.slug as string;

    // Mock data for articles
    const articles = {
        "mastering-color-harmony": {
            title: "Mastering Color Harmony: A Guide for Beginners",
            subtitle: "Understanding the science behind complementary, analogous, and triadic colors.",
            date: "May 12, 2024",
            author: "StyleSmart Team",
            category: "Style Tips",
            content: `
                <p>Color is one of the most powerful tools in your fashion arsenal. It can change your mood, influence how others perceive you, and even make you look more vibrant. However, many people stick to neutrals because they're afraid of making a mistake. In this guide, we'll break down the basics of color harmony so you can start experimenting with confidence.</p>
                
                <h3>The Color Wheel</h3>
                <p>The foundation of color theory is the color wheel. Developed by Isaac Newton in 1666, it's a visual representation of how colors relate to one another. Primary colors (red, blue, yellow) form the base, while secondary and tertiary colors are created by mixing them.</p>
                
                <h3>Complementary Colors</h3>
                <p>These are colors that sit directly opposite each other on the wheel, like blue and orange or red and green. When paired together, they create a high-contrast, high-energy look. To master this without looking like a costume, try pairing a dominant color with an accessory in its complement.</p>
                
                <h3>Analogous Colors</h3>
                <p>Analogous colors are neighbors on the wheel (e.g., blue, blue-green, and green). This creates a harmonious and serene look that is naturally pleasing to the eye. This is a great way to build a monochromatic-adjacent outfit with depth.</p>
                
                <h3>Triadic Colors</h3>
                <p>A triadic scheme uses three colors evenly spaced around the wheel. This offers high contrast while maintaining harmony. Think primary colors used in soft pastels for a sophisticated take on this bold concept.</p>
            `,
            readTime: "6 min read",
            image: "/api/placeholder/1200/600"
        },
        "ai-changing-fashion": {
            title: "How AI is Changing the Way We Dress",
            subtitle: "From personalized recommendations to virtual try-ons, technology is the new tailor.",
            date: "May 10, 2024",
            author: "Sarah J.",
            category: "Technology",
            content: `
                <p>Artificial Intelligence is no longer just for data centers and sci-fi movies. It's moving into our closets. At StyleSmart, we're at the forefront of this revolution, using machine learning to help you look your best every single day.</p>
                
                <h3>Predictive Styling</h3>
                <p>Traditional styling relies on human intuition. AI styling relies on pattern recognition at scale. By analyzing millions of successful outfit combinations, our algorithms can suggest pairings you might never have considered, but that work perfectly for your body type and the current weather.</p>
                
                <h3>The End of the 'Nothing to Wear' Syndrome</h3>
                <p>Most people only wear 20% of their wardrobe 80% of the time. AI helps you rediscover those 'hidden' gems in your closet by suggesting new ways to wear items you've owned for years. It's like having a professional stylist who knows every single thread you own.</p>
            `,
            readTime: "4 min read",
            image: "/api/placeholder/1200/600"
        },
        "minimalist-wardrobe-essentials": {
            title: "5 Essentials for a Minimalist Wardrobe",
            subtitle: "Quality over quantity is the secret to a timeless closet.",
            date: "May 8, 2024",
            author: "Mark R.",
            category: "Style Tips",
            content: `
                <p>The minimalist movement isn't about owning nothing; it's about owning the right things. A capsule wardrobe of high-quality essentials ensures you always have something to wear for any occasion.</p>
                
                <h3>1. The Perfect White T-Shirt</h3>
                <p>It sounds basic, but a high-quality white tee is the backbone of dozens of outfits. Look for heavy-weight cotton that isn't see-through.</p>
                
                <h3>2. Tailored Trousers</h3>
                <p>Whether in navy, charcoal, or black, a pair of trousers that fit perfectly can take you from the office to a dinner date effortlessly.</p>
                
                <h3>3. The Versatile Blazer</h3>
                <p>An unstructured blazer can dress up a pair of jeans or complete a formal look. It's the ultimate layering piece.</p>
            `,
            readTime: "5 min read",
            image: "/api/placeholder/1200/600"
        },
        "dressing-for-rain-style-function": {
            title: "Dressing for the Rain: Style Meets Function",
            subtitle: "Stay dry without sacrificing your aesthetic.",
            date: "May 5, 2024",
            author: "Elena T.",
            category: "Weather",
            content: `
                <p>Rainy days often lead to uninspired outfits. But with the right technical fabrics and layering strategies, you can stay dry and look sharp.</p>
                
                <h3>Gore-Tex and Beyond</h3>
                <p>Modern waterproofing technology has come a long way. You no longer need to wear a rubber yellow raincoat. Look for breathable membranes that let heat out while keeping water from getting in.</p>
                
                <h3>Footwear Strategies</h3>
                <p>Leather is naturally water-resistant but needs care. On heavy rain days, opt for treated suede or high-end rubberized boots that mimic the silhouette of a classic Chelsea boot.</p>
            `,
            readTime: "3 min read",
            image: "/api/placeholder/1200/600"
        }
    };

    const article = articles[slug as keyof typeof articles];

    if (!article) {
        return (
            <MainLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-4xl font-black mb-4">Article Not Found</h2>
                        <Button asChild variant="outline">
                            <Link href="/blog">Back to Blog</Link>
                        </Button>
                    </div>
                </div>
            </MainLayout>
        );
    }

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: article.title,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Link copied to clipboard!");
        }
    };

    return (
        <MainLayout>
            <article className="pt-24 pb-40">
                {/* Progress Bar (Mock) */}
                <div className="fixed top-16 left-0 w-full h-1 bg-muted z-50">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2 }}
                        className="h-full bg-primary"
                    />
                </div>

                <div className="max-w-4xl mx-auto px-4">
                    {/* Breadcrumbs / Back Link */}
                    <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-12"
                    >
                        <Link href="/blog" className="inline-flex items-center text-sm font-bold text-muted-foreground hover:text-primary transition-colors group">
                            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> BACK TO INSIGHTS
                        </Link>
                    </motion.div>

                    {/* Article Header */}
                    <header className="mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 inline-block">
                                {article.category}
                            </span>
                            <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.95]">
                                {article.title}
                            </h1>
                            <p className="text-xl md:text-2xl text-muted-foreground font-medium mb-12 leading-relaxed">
                                {article.subtitle}
                            </p>
                            
                            <div className="flex flex-wrap items-center justify-between gap-8 py-8 border-y border-border/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-black">
                                        {article.author.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="font-black text-sm uppercase tracking-widest">{article.author}</p>
                                        <p className="text-xs text-muted-foreground font-bold uppercase tracking-tighter mt-1">Written on {article.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button onClick={handleShare} variant="ghost" size="icon" className="rounded-xl">
                                        <Share2 className="w-5 h-5" />
                                    </Button>
                                    <Button onClick={() => toast.success("Article saved!")} variant="ghost" size="icon" className="rounded-xl">
                                        <Bookmark className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </header>

                    {/* Article Body */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="prose prose-slate prose-xl max-w-none 
                            prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground
                            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-8
                            prose-h3:text-3xl prose-h3:mt-16 prose-h3:mb-6
                        "
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Interaction Footer */}
                    <footer className="mt-24 pt-12 border-t border-border">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-green-500" />
                                <span className="font-bold text-muted-foreground">This guide was verified by our style experts.</span>
                            </div>
                            <div className="flex gap-4">
                                <Button onClick={scrollToComments} variant="outline" className="rounded-2xl h-12 px-6 font-bold flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4" /> Discuss
                                </Button>
                                <Button onClick={handleShare} className="rounded-2xl h-12 px-6 font-bold flex items-center gap-2">
                                    <Share2 className="w-4 h-4" /> Share Article
                                </Button>
                            </div>
                        </div>
                    </footer>

                    {/* Community Discussion Section */}
                    <div ref={commentSectionRef} className="mt-32 pt-20 border-t border-border">
                        <div className="flex items-center justify-between mb-12">
                            <h3 className="text-3xl font-black tracking-tight">Community Discussion</h3>
                            <span className="px-4 py-1.5 bg-muted rounded-full text-xs font-bold text-muted-foreground uppercase tracking-widest">12 Comments</span>
                        </div>

                        <div className="space-y-8 mb-16">
                            {[
                                { user: "Amadi", initial: "A", text: "This guide is amazing! I always struggled with color harmony until I saw that triadic tip.", date: "2 hours ago" },
                                { user: "Chinelo", initial: "C", text: "Does this apply to accessories too? I'm trying to match my bags better.", date: "5 hours ago" }
                            ].map((comment, i) => (
                                <Card key={i} className="p-6 rounded-3xl border-none bg-slate-50/50 shadow-sm flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-black shrink-0">
                                        {comment.initial}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="font-bold text-sm">{comment.user}</span>
                                            <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{comment.date}</span>
                                        </div>
                                        <p className="text-muted-foreground leading-relaxed">{comment.text}</p>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        <Card className="p-8 rounded-[2.5rem] border-2 border-dashed border-border bg-transparent flex flex-col items-center justify-center text-center">
                            <MessageCircle className="w-12 h-12 text-muted-foreground mb-4 opacity-20" />
                            <h4 className="text-xl font-bold mb-2">Join the conversation</h4>
                            <p className="text-muted-foreground mb-8 max-w-sm">Sign in to share your thoughts with the StyleSmart community.</p>
                            <Button asChild className="rounded-2xl h-12 px-8 font-black">
                                <Link href="/login">SIGN IN TO POST</Link>
                            </Button>
                        </Card>
                    </div>
                </div>

                {/* Newsletter Box */}
                <div className="max-w-4xl mx-auto px-4 mt-32">
                    <Card className="p-12 md:p-16 rounded-[4rem] bg-gradient-to-br from-primary to-accent text-white border-none text-center shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-10">
                            <Sparkles className="w-48 h-48" />
                        </div>
                        <h3 className="text-3xl md:text-5xl font-black mb-6 relative z-10">Stay Smart, Stay Stylish</h3>
                        <p className="text-xl text-white/80 mb-10 max-w-xl mx-auto relative z-10 font-medium">
                            Join 50,000+ fashion enthusiasts receiving our weekly AI-curated style insights.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="flex-1 h-16 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 px-6 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50"
                            />
                            <Button onClick={() => toast.success("Check your email to confirm subscription!")} className="h-16 px-10 rounded-2xl bg-white text-primary font-black hover:bg-white/90">
                                SUBSCRIBE
                            </Button>
                        </div>
                    </Card>
                </div>
            </article>
        </MainLayout>
    );
}
