'use client';

import React from 'react';
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
    title: "Multi-Agentic AI ",
    link: "https://gomoonbeam.com",
    thumbnail: "/kira-project.png",
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
    title: "Acuron Products - India",
    link: "https://gomoonbeam.com",
    thumbnail: "/acuron.png",
    description: "Mumbai is a platform for creating and sharing AI-powered content.",
  },
  {
    title: "AI Tender Automation System",
    link: "https://github.com/Shubh1810/uptender-ai.git",
    thumbnail: "/tender-proj.png",
    description: "Mumbai is a platform for creating and sharing AI-powered content.",
  },


];

export default function ProjectsPage() {
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
