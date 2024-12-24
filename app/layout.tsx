"use client";

import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { FloatingNav } from './Components/Common/ui/floating-navbar';
import StaticFooter from './Components/StaticFooter/StaticFooter';
import './globals.css';
import { cn } from "./lib/utils";

export const metadata: Metadata = {
  title: 'Shubh Sheth',
  description: 'Personal website showcasing my work as an AI software developer',
  // ... rest of metadata
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <FloatingNav />
          <div className="fixed inset-0 bg-white dark:bg-black -z-10" />
          {/* ... rest of your layout */}
          {children}
          <StaticFooter />
        </ThemeProvider>
      </body>
    </html>
  );
} 