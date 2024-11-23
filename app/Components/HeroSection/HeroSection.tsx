'use client';
// components/HeroSection/HeroSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { FlipWords } from "../flip-words";
import { TextHoverEffect } from "../ui/text-hover-effect";
import * as THREE from 'three';

const HeroSection: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<any>(null);

  useEffect(() => {
    // Load THREE.js first
    const loadThree = document.createElement('script');
    loadThree.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    loadThree.async = false;
    document.body.appendChild(loadThree);

    // Load Vanta after THREE.js
    loadThree.onload = () => {
      const loadVanta = document.createElement('script');
      loadVanta.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js';
      loadVanta.async = false;
      document.body.appendChild(loadVanta);

      // Initialize Vanta effect after scripts are loaded
      loadVanta.onload = () => {
        if (!vantaEffect) {
          setVantaEffect(
            // @ts-ignore
            VANTA.WAVES({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              color: 0x10105,
              shininess: 37.00,
              waveHeight: 25.00,
              zoom: 0.75
            })
          )
        }
        return () => {
          if (vantaEffect) vantaEffect.destroy()
        }
      }
    }
  }, [vantaEffect])

  return (
    <section
    ref={vantaRef}
    className="relative h-[50vh] w-full">
      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pt-16">
        <motion.h1
          className="text-5xl md:text-7xl mb-8 px-6 py-3 bg-black/10 backdrop-blur-sm rounded-full"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          <TextHoverEffect text="Shubh Sheth" duration={0.4} />
        </motion.h1>
        <h2 className="text-xl md:text-2xl mb-8">
          <div className="text-xl md:text-2xl font-medium text-neutral-800 dark:text-neutral-200">
            <FlipWords 
              words={["Generative AI Developer", "Web3 | Crypto Enthusiast", "Machine Learning Engineer", "AI Researcher", "Tech Innovator"]}
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

      </div>
    </section>
  );
};

export default HeroSection;