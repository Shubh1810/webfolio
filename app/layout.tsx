// app/layout.tsx
import './globals.css';
import ThreeScript from './Components/ThreeScript'
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import { Metadata } from 'next';
import Script from 'next/script'
import HeroSection from './Components/HeroSection/HeroSection';

export const metadata: Metadata = {
  title: 'Shubh Sheth | Portfolio',
  description: 'Personal portfolio showcasing my work as an AI software developer',
  keywords: ['portfolio', 'developer', 'software engineer', 'web development', 'AI developer', 'AI engineer', 'Machine Learning Engineer', 'prompt engineering', 'LLM', 'Generative AI', 'Generative AI Engineer', 'Generative AI Developer', 'Generative AI Engineer', 'Generative AI Developer',],
  authors: [{ name: 'Shubh Sheth' }],
  openGraph: {
    title: 'Shubh Sheth | Portfolio',
    description: 'Personal portfolio showcasing my work as a software developer',
    url: 'https://shubhsheth.com',
    siteName: 'Shubh Sheth Portfolio',
    images: [
      {
        url: '/profile.jpeg', // Add your Open Graph image
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shubh Sheth | Portfolio',
    description: 'Personal portfolio showcasing my work as an AI software developer',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  }
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <HeroSection />
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}