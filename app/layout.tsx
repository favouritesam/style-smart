import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppProvider } from '@/lib/context'
import { AuthSync } from '@/components/AuthSync'
import { Toaster } from 'sonner'
import './globals.css'
import React from "react";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'StyleSmart - Your Personal Fashion AI',
  description: 'Discover your perfect style with AI-powered outfit recommendations, wardrobe management, and daily outfit picking',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode
}>) {
  return (
      <html lang="en" className="bg-background" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background" suppressHydrationWarning>
      <Toaster position="top-center" richColors />
      {/* App context provider for global state management */}
      <AppProvider>
        <AuthSync />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </AppProvider>
      </body>
      </html>
  )
}
