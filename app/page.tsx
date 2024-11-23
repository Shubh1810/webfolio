// app/page.tsx
import React from 'react';
import HeroSection from './Components/HeroSection/HeroSection';
import { AnimatedSection } from './Components/Common/AnimatedSection';
import { TextHoverEffect } from './Components/Common/ui/text-hover-effect';
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.gridBackground}></div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <main className={styles.mainContent}>
        <div className="-mt-5">
          <HeroSection />
        </div>
        <AnimatedSection>
          <section id="about" className="mt-80 w-screen">
            <div className="text-[clamp(6rem,20vw,25rem)] font-[169] italic mb-20">
              <TextHoverEffect 
                text="About Me" 
                duration={0.4}
              />
            </div>
            <p>Information about yourself&hellip;</p>
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
        </AnimatedSection>
        <AnimatedSection>
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