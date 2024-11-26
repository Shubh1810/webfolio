// app/layout.tsx
import './globals.css';
import Footer from './Components/Footer/Footer';
import { Metadata } from 'next';
import { FloatingNav } from './Components/Common/ui/floating-navbar';

export const metadata: Metadata = {
  title: 'Shubh Sheth | Portfolio',
  description: 'Personal portfolio showcasing my work as an AI software developer',
  keywords: ['Shubh Sheth', 'Shubh', 'Sheth', 'developer', 'software engineer', 'web development', 'AI developer', 'AI engineer', 'Machine Learning Engineer', 'prompt engineering', 'LLM', 'Generative AI', 'Generative AI Engineer', 'Generative AI Developer',],
  authors: [{ name: 'Shubh Sheth' }],
  openGraph: {
    title: 'Shubh Sheth | Portfolio',
    description: 'Personal portfolio showcasing my work as an AI software developer',
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
      <body className="min-h-screen bg-transparent">
        <FloatingNav />
        <div className="fixed inset-0 bg-black -z-10" />
        <div 
          className="fixed inset-0 h-full w-full pointer-events-none -z-[5]"
          style={{
            backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
            opacity: 0.15
          }}
        />
        <div 
          className="fixed pointer-events-none inset-0 -z-[1]"
          style={{
            background: 'radial-gradient(circle at center, transparent 15%, black)'
          }}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}