// app/page.tsx
import React from 'react';
import HeroSection from './Components/HeroSection/HeroSection';
import { AnimatedSection } from './Components/Common/AnimatedSection';
import { TextHoverEffect } from './Components/Common/ui/text-hover-effect';
import { ParallaxScroll } from './Components/Common/ui/parallax-scroll';

// Method 1: If your images are in the public folder
const images = [
  "/me1.jpeg",
  "/fam.jpeg",
  "/me2.jpeg",
  "/me1.jpeg",
  "/fam.jpeg",
  "/me2.jpeg"
  
];


export default function HomePage() {
  return (
    <div className="flex flex-col items-center min-h-screen w-full relative overflow-x-hidden">
      {/* Main content */}
      <main className="relative z-[2] flex-1 p-4">
        <div className="-mt-5">
          <HeroSection />
        </div>
        <ParallaxScroll images={images} />
        
        {/* Rest of your sections remain the same */}
        <AnimatedSection>
          <section id="about" className="mt-80 w-screen">
            <div className="text-[clamp(6rem,20vw,25rem)] font-[169] italic mb-20">
              <TextHoverEffect 
                text="Tech Stack" 
                duration={0.4}
              />
            </div>
            <p>Python,Flask,Next.js&hellip;</p>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section id="projects" className="mt-40">
            <div className="text-[clamp(6rem,20vw,25rem)] font-[169] italic mb-20">
              <TextHoverEffect 
                text="Projects" 
                duration={0.4}
              />
            </div>
            <p>Showcase your projects&hellip;</p>
          </section>
        
          <section id="contact" className="mt-40">
            <div className="text-[clamp(6rem,20vw,25rem)] font-[169] italic mb-20">
              <TextHoverEffect 
                text="Contact" 
                duration={0.4}
              />
            </div>
            <p>How to reach you&hellip;</p>
          </section>
        </AnimatedSection>
      </main>
    </div>
  );
}