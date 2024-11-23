'use client';
// components/HeroSection/HeroSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../Common/ui/button';
import styles from './HeroSection.module.css';
import GLOBE from 'vanta/dist/vanta.globe.min'; // Import the desired Vanta effect
import * as THREE from 'three';
import { FlipWords } from "../flip-words";

// Add this type definition
type VantaEffect = {
  destroy: () => void;
} | null;

const HeroSection: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<VantaEffect>(null);
  const roles = [
    "Generative AI Developer",
    "Web3 | Crypto Enthusiast",
    "Machine Learning Engineer",
    "AI Researcher",
    "Tech Innovator"
  ];


  useEffect(() => {
    if (!vantaEffect && typeof window !== 'undefined') {
      setVantaEffect(
        GLOBE({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 800,
          minWidth: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x0077ff,
          backgroundColor: 0x0,
          size: 1.50,
          speed: 1.0
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <section className={styles.hero} id="home" ref={vantaRef}>
      <div className={styles.heroContent}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Shubh Sheth
        </motion.h1>
        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
        <div className="text-xl md:text-2xl font-medium text-neutral-800 dark:text-neutral-200">
        <FlipWords 
          words={roles}
          duration={2000}
          className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
        />
        </div>

        </motion.p>
        <div className={styles.buttonGroup}>
          <Button variant="default" size="lg" asChild>
            <a href="#projects" className={styles.buttonLink}>
              View My Work <FiArrowRight className={styles.buttonIcon} />
            </a>
          </Button>
          <Button variant="default" size="lg" asChild>
            <a href="#contact" className={styles.buttonLink}>
              Contact Me <FiArrowRight className={styles.buttonIcon} />
            </a>
          </Button>
        </div>
        <motion.div
          className={styles.scrollDown}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FiArrowRight className={styles.scrollIcon} />
          <span>Scroll Down</span>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;