'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { AnimatedSection } from '../Components/Common/AnimatedSection';
import { HeroParallax } from '../Components/Common/ui/hero-parallax';

const products = [
  {
    title: "Personal Portfolio Website",
    link: "https://shubhsheth.info",
    thumbnail: "/webfolio-project.png",
    description: "Created on Next.js, Tailwind CSS, and Framer Motion | Hosted on Vercel.",
  },
  // ... rest of the products array (copy from app/page.tsx)
  {
    title: "To be added.",
    link: "https://gomoonbeam.com",
    thumbnail: "/skyline-0.jpg",
    description: "Mumbai is a platform for creating and sharing AI-powered content.",
  },
  {
    title: "To be added..",
    link: "https://gomoonbeam.com",
    thumbnail: "/skyline-1.jpeg",
    description: "Mumbai is a platform for creating and sharing AI-powered content.",
  },
  {
    title: "To be added...",
    link: "https://gomoonbeam.com",
    thumbnail: "/skyline-2.jpg",
    description: "Mumbai is a platform for creating and sharing AI-powered content.",
  },
  {
    title: "To be added....",
    link: "https://gomoonbeam.com",
    thumbnail: "/skyline-3.jpg",
    description: "Mumbai is a platform for creating and sharing AI-powered content.",
  },
  {
    title: "To be added.....",
    link: "https://gomoonbeam.com",
    thumbnail: "/skyline-4.jpg",
    description: "Mumbai is a platform for creating and sharing AI-powered content.",
  },
  {
    title: "To be added......",
    link: "https://gomoonbeam.com",
    thumbnail: "/skyline-5.jpg",
    description: "Mumbai is a platform for creating and sharing AI-powered content.",
  },


];

export default function ProjectsPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null;

  return (
    <AnimatedSection>
      <section className="min-h-screen">
        <div className="relative w-full">
          <div className="relative">
            <HeroParallax products={products} />
          </div>
        </div>
      </section>
    </AnimatedSection>  
  );
}
