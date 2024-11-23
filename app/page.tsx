// app/page.tsx
import React from 'react';
import HeroSection from './Components/HeroSection/HeroSection';
import { AnimatedSection } from './Components/Common/AnimatedSection';
import AboutSection from '../Components/AboutSection/AboutSection';
import styles from './Home.module.css';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>
        <AnimatedSection>
          <section id="about">
            <h2>About Me</h2>
            <p>Information about yourself...</p>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section id="projects">
            <h2>Projects</h2>
            <p>Showcase your projects...</p>
          </section>
        </AnimatedSection>
        <AnimatedSection>
          <section id="contact">
            <h2>Contact</h2>
            <p>How to reach you...</p>
          </section>
        </AnimatedSection>
      </main>
    </div>
  );
}