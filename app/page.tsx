/**
 * Home Page / Landing Page
 * Showcases app features and encourages sign up/login
 * Includes hero section, features, testimonials, and call-to-action
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Sparkles,
  Cloud,
  Calendar,
  TrendingUp,
  Heart,
  Zap,
  Shield,
  Users,
  ArrowRight,
} from 'lucide-react';

/**
 * Feature card data structure
 */
interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

/**
 * Home page component with hero and feature sections
 */
export default function HomePage() {
  // Get auth store for session state
  const { isAuthenticated, user } = useAuthStore();

  // Feature list with icons and descriptions
  const features: Feature[] = [
    {
      id: 'ai-stylist',
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Interactive AI Stylist',
      description: 'The core of StyleSmart: Pick any item and let our AI suggest the perfect combinations to complete your look.',
    },
    {
      id: 'weather-location',
      icon: <Cloud className="w-6 h-6" />,
      title: 'Location-Aware Weather',
      description: 'Real-time location tracking provides hyper-local weather forecasts to ensure your outfit is always context-ready.',
    },
    {
      id: 'daily-outfit-picker',
      icon: <Calendar className="w-6 h-6" />,
      title: 'Combination Insights',
      description: 'Detailed breakdowns of why your daily outfits work, from color harmony to silhouette balance.',
    },
    {
      id: 'wardrobe-management',
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Smart Wardrobe Management',
      description: 'Organize, categorize, and track your clothing items with detailed analytics.',
    },
    {
      id: 'style-analytics',
      icon: <Heart className="w-6 h-6" />,
      title: 'Style Analytics',
      description: 'Discover your style patterns, color preferences, and fashion trends over time.',
    },
    {
      id: 'sustainability',
      icon: <Zap className="w-6 h-6" />,
      title: 'Sustainability Tracking',
      description: 'Monitor your eco-friendly choices and make more sustainable fashion decisions.',
    },
  ];

  // Testimonial data
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Fashion Designer',
      quote: 'StyleSmart has transformed how I organize my wardrobe. The AI recommendations are incredibly accurate!',
      avatar: 'S',
    },
    {
      name: 'Emma Rodriguez',
      role: 'Busy Professional',
      quote: 'No more decision paralysis about what to wear. StyleSmart saves me 20 minutes every morning.',
      avatar: 'E',
    },
    {
      name: 'Jessica Chen',
      role: 'Style Enthusiast',
      quote: 'The color psychology insights are fascinating. I feel more confident in my outfit choices now.',
      avatar: 'J',
    },
  ];

  return (
      <MainLayout>
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="text-center max-w-3xl mx-auto">
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <Zap className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
              AI-Powered Fashion Intelligence
            </span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-pretty">
              Your Personal Fashion
              <span className="block text-accent">AI Assistant</span>
            </h1>

            {/* Hero Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
              Discover your perfect style with intelligent outfit recommendations, smart wardrobe
              management, and daily styling suggestions powered by AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                  <>
                    <Button
                        size="lg"
                        asChild
                        className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center gap-2"
                    >
                      <Link href="/daily-outfit">
                        Get Today&apos;s Outfit <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        asChild
                        className="h-12 border-border hover:bg-muted"
                    >
                      <Link href="/wardrobe">View Wardrobe</Link>
                    </Button>
                  </>
              ) : (
                  <>
                    <Button
                        size="lg"
                        asChild
                        className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center gap-2"
                    >
                      <Link href="/register">
                        Get Started Free <ArrowRight className="w-5 h-5" />
                      </Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        asChild
                        className="h-12 border-border hover:bg-muted"
                    >
                      <Link href="/login">Sign In</Link>
                    </Button>
                  </>
              )}
            </div>

            {/* Hero Stats */}
            <div className="mt-12 grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">10k+</div>
                <div className="text-sm text-muted-foreground mt-1">Active Users</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">50k+</div>
                <div className="text-sm text-muted-foreground mt-1">Outfits Created</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-foreground">98%</div>
                <div className="text-sm text-muted-foreground mt-1">User Satisfaction</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 sm:py-16 lg:py-20 border-t border-border">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Powerful Features
              </h2>
              <p className="text-lg text-muted-foreground">
                Everything you need for smart, confident styling
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                  <Card
                      key={feature.id}
                      className="p-6 hover:shadow-lg hover:border-accent/50 transition-all duration-300 cursor-pointer group"
                  >
                    {/* Feature Icon */}
                    <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
                      {feature.icon}
                    </div>

                    {/* Feature Content */}
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 lg:py-20 border-t border-border">
          <div className="max-w-4xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Loved by Stylish People
              </h2>
              <p className="text-lg text-muted-foreground">
                See what our users say about StyleSmart
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                  <Card
                      key={index}
                      className="p-6 flex flex-col hover:shadow-lg hover:border-accent/50 transition-all duration-300"
                  >
                    {/* Testimonial Quote */}
                    <p className="text-foreground mb-4 flex-1 italic">
                      &quot;{testimonial.quote}&quot;
                    </p>

                    {/* Testimonial Author */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <div className="w-10 h-10 rounded-full bg-accent/20 text-accent flex items-center justify-center font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 border-t border-border">
          <div className="max-w-2xl mx-auto text-center">
            {/* CTA Content */}
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Style?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users discovering their perfect look with StyleSmart
            </p>

            {/* CTA Button */}
            {!isAuthenticated && (
                <Button
                    size="lg"
                    asChild
                    className="h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold flex items-center gap-2 mx-auto"
                >
                  <Link href="/register">
                    Create Free Account <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 lg:py-20 border-t border-border">
          <div className="max-w-2xl mx-auto">
            {/* Section Header */}
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-8 text-center">
              Frequently Asked Questions
            </h2>

            {/* FAQ Items */}
            <div className="space-y-4">
              {[
                {
                  q: 'How does the AI recommendation work?',
                  a: 'Our AI analyzes your wardrobe, style preferences, weather conditions, and past outfit choices to generate personalized recommendations.',
                },
                {
                  q: 'Can I upload photos of my clothes?',
                  a: 'Yes! You can upload photos when adding items to your wardrobe for easy visual reference and identification.',
                },
                {
                  q: 'Is my data private and secure?',
                  a: 'Absolutely. We use industry-standard encryption and never share your data with third parties.',
                },
                {
                  q: 'Can I use StyleSmart offline?',
                  a: 'Currently, StyleSmart requires an internet connection to access the AI recommendations and cloud features.',
                },
              ].map((faq, index) => (
                  <details
                      key={index}
                      className="group border border-border rounded-lg p-4 hover:border-accent/50 transition-colors cursor-pointer"
                  >
                    <summary className="font-semibold text-foreground flex items-center justify-between">
                      {faq.q}
                      <span className="text-muted-foreground group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                    </summary>
                    <p className="text-muted-foreground mt-3">{faq.a}</p>
                  </details>
              ))}
            </div>
          </div>
        </section>
      </MainLayout>
  );
}
