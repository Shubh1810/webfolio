// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { FloatingNav } from './Components/Common/ui/floating-navbar';
import StaticFooter from './Components/StaticFooter/StaticFooter';
import { cn } from "./lib/utils";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: 'Shubh Sheth | AI Agent Developer',
  description: 'Shubh Sheth - A 23 year old in Palo Alto building the next big thing as an AI software developer specializing in machine learning, generative AI, and innovative tech solutions',
  keywords: ['Shubh Sheth', 'Shubh', 'Sheth', 'Crypto trading', 'AI Solution', 'Tech Solutions', 'AI developer', 'AI engineer', 'Machine Learning Engineer', 'prompt engineering', 'LLM', 'Generative AI', 'Generative AI Engineer', 'Generative AI Developer', "dev", "AI Agent Developer", "AI Agent Engineer", "AI Agent", "Agentic Workflow", "Agentic Automation", "Automation"],
  authors: [{ name: 'Shubh Sheth' }],
  metadataBase: new URL('https://shubhsheth.info'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
    },
  },
  openGraph: {
    title: 'Shubh Sheth | AI Agent Developer',
    description: 'Shubh Sheth - A 23 year old in Palo Alto building the next big thing as an AI software developer specializing in machine learning, generative AI, and innovative tech solutions',
    url: 'https://shubhsheth.info',
    siteName: 'Shubh Sheth',
    images: [
      {
        url: '/thumbnail-s.jpeg',
        width: 1200,
        height: 630,
        alt: 'Shubh Sheth - AI Agent Developer',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubh Sheth | AI Agent Developer',
    description: 'Shubh Sheth - A 23 year old in Palo Alto building the next big thing',
    images: [{
      url: '/thumbnail-s.jpeg',
      alt: 'Shubh Sheth - AI Developer',
    }],
    creator: '@shubhsheth',
    site: '@shubhsheth',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/thumbnail-s.jpeg',
    shortcut: '/thumbnail-s.jpeg',
    apple: '/thumbnail-s.jpeg',
  },
  verification: {
    google: 'your-google-site-verification-code', // Add your Google verification code if you have one
  },
  category: 'technology',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/thumbnail-s.jpeg" />
        {/* JSON-LD structured data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Shubh Sheth",
              "url": "https://shubhsheth.info",
              "image": "https://shubhsheth.info/thumbnail-s.jpeg",
              "jobTitle": "AI Software Developer",
              "worksFor": {
                "@type": "Organization",
                "name": "Self-employed"
              },
              "description": "Shubh Sheth - AI software developer specializing in machine learning and generative AI solutions and consultancy",
              "sameAs": [
                "https://github.com/Shubh1810",
                "https://www.linkedin.com/in/shubh-sheth-98219433l/",
                // Add your other social media profiles
              ],
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": "https://shubhsheth.info"
              }
            })
          }}
        />
        <meta name="author" content="Shubh Sheth" />
      </head>
      <body className="antialiased dark bg-black text-white">
        <FloatingNav />
        <div className="fixed inset-0 bg-black -z-10" />
        <div 
          className="fixed inset-0 h-full w-full pointer-events-none -z-[5] block"
          style={{
            backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            opacity: 0.25
          }}
        />
        <div 
          className="fixed pointer-events-none inset-0 -z-[1] block"
          style={{
            background: 'radial-gradient(circle at center, transparent 15%, black)'
          }}
        />
        {children}
        <StaticFooter />
        <Analytics />
      </body>
    </html>
  );
}