// app/page.tsx
import React from 'react';
import HeroSection from './Components/HeroSection/HeroSection';
import { AnimatedSection } from './Components/Common/AnimatedSection';
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
          <section id="about">
            <h2>About Me</h2>
            <p>Information about yourself&hellip;</p>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section id="projects">
            <h2>Projects</h2>
            <p>Showcase your projects&hellip;</p>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section id="contact">
            <h2>Contact</h2>
            <p>How to reach you&hellip;</p>
          </section>
        </AnimatedSection>
      </main>
    </div>
  );
}