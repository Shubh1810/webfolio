import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Amarante } from 'next/font/google'
import { Bangers } from 'next/font/google'
import { Ubuntu } from 'next/font/google'
import Header from '@/components/header'
import './globals.css'

// Optimize font loading with subset and display swap
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

const amarante = Amarante({
  subsets: ['latin'],
  variable: '--font-amarante',
  display: 'swap',
  weight: '400',
  preload: true,
})

const bangers = Bangers({
  subsets: ['latin'],
  variable: '--font-bangers',
  display: 'swap',
  weight: '400',
  preload: true,
})

const ubuntu = Ubuntu({
  subsets: ['latin'],
  variable: '--font-ubuntu',
  display: 'swap',
  weight: ['300', '400', '500', '700'],
  preload: true,
})

// Optimized metadata for SEO and performance
export const metadata: Metadata = {
  title: 'Shubh Sheth - AI Engineer & Full Stack Developer',
  description: 'Portfolio of Shubh Sheth - Building the future with AI and cutting-edge web technologies',
  keywords: ['AI Engineer', 'Full Stack Developer', 'Next.js', 'React', 'Portfolio'],
  authors: [{ name: 'Shubh Sheth' }],
  creator: 'Shubh Sheth',
  metadataBase: new URL('https://shubhsheth.dev'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://shubhsheth.dev',
    title: 'Shubh Sheth - AI Engineer & Full Stack Developer',
    description: 'Portfolio of Shubh Sheth - Building the future with AI and cutting-edge web technologies',
    siteName: 'Shubh Sheth Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubh Sheth - AI Engineer & Full Stack Developer',
    description: 'Portfolio of Shubh Sheth - Building the future with AI and cutting-edge web technologies',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${amarante.variable} ${bangers.variable} ${ubuntu.variable} dark`}>
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Performance optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#3C2414" />
        <meta name="color-scheme" content="dark light" />
        
        {/* Prefetch DNS for better performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className="font-ubuntu antialiased text-white overflow-x-hidden">
        <Header />
        {children}
      </body>
    </html>
  )
} 