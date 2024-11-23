'use client';
// components/HeroSection/HeroSection.tsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../Common/ui/button';
import GLOBE from 'vanta/dist/vanta.globe.min';
import * as THREE from 'three';
import { FlipWords } from "../flip-words";
import { TextHoverEffect } from "../ui/text-hover-effect";

const HeroSection: React.FC = () => {
  const vantaRef = React.useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);
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
          minHeight: 200,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x0077ff,
          backgroundColor: 0x0,
          size: 1.50,
          speed: 1.0,
          points: 10.00,
          maxDistance: 25.00,
          spacing: 15.00
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <section 
      className="relative w-full h-screen overflow-hidden rounded-b-[100px]" 
      id="home" 
      ref={vantaRef}
    >
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center -ml-[40%] -mt-[16%]">
        <motion.h1
          className="text-4xl md:text-6xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <TextHoverEffect text="Shubh Sheth" duration={0.3} />
        </motion.h1>
        <h2 className="text-xl md:text-2xl mb-8">
          <div className="text-xl md:text-2xl font-medium text-neutral-800 dark:text-neutral-200">
            <FlipWords 
              words={roles}
              duration={2000}
              className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
            />
          </div>
        </h2>
        
        <div className="flex gap-4 justify-center md:flex-row flex-col">
          <a 
            className="flex items-center px-6 py-3 bg-white/20 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:bg-white/10 backdrop-blur-0 relative group"
            href="#projects"
          >
            View My Work
            <span className="ml-2 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 animate-wiggle">
              <FiArrowRight className="h-6 w-6 text-white" />
            </span>
          </a>
          <a 
            className="flex items-center px-6 py-3 bg-white/20 text-white rounded-lg transition-all duration-300 hover:scale-105 hover:bg-white/10 backdrop-blur-0 relative group"
            href="#contact"
          >
            Contact Me
            <span className="ml-2 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110 animate-wiggle">
              <FiArrowRight className="h-6 w-6 text-white" />
            </span>
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="text-2xl mb-2 animate-bounce">
            <FiArrowRight className="h-6 w-6 text-white" />
          </span>
          <span className="text-sm text-neutral-500">Scroll Down</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;