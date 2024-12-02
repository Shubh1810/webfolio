// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { FloatingNav } from './Components/Common/ui/floating-navbar';
import StaticFooter from './Components/StaticFooter/StaticFooter';
import { ThemeProvider } from './providers/ThemeProvider'
import { cn } from "./lib/utils";

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
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen antialiased"
      )}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingNav />
          <div className="fixed inset-0 bg-white dark:bg-black -z-10" />
          <div 
            className="fixed inset-0 h-full w-full pointer-events-none -z-[5] dark:block hidden"
            style={{
              backgroundImage: `radial-gradient(circle at center, white 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
              opacity: 0.15
            }}
          />
          <div 
            className="fixed inset-0 h-full w-full pointer-events-none -z-[5] dark:hidden block"
            style={{
              backgroundImage: `radial-gradient(circle at center, black 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
              opacity: 0.15
            }}
          />
          <div 
            className="fixed pointer-events-none inset-0 -z-[1] dark:block hidden"
            style={{
              background: 'radial-gradient(circle at center, transparent 15%, black)'
            }}
          />
          {children}
          <StaticFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}