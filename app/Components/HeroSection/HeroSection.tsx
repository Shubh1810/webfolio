'use client';
// components/HeroSection/HeroSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { FlipWords } from '../../Components/Common/ui/flip-words';
import { TextHoverEffect } from '../../Components/Common/ui/text-hover-effect';
import { Button } from '../Common/ui/button';

// Define a type for the Vanta effect
type VantaEffect = {
  destroy: () => void;
} | null;

const HeroSection: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<VantaEffect>(null);

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
    <div className="relative h-[60vh] w-full">
      {/* Vanta container */}
      <div 
        ref={vantaRef}
        className="absolute left-1/2 -translate-x-1/2 w-screen z-0"
      />

      {/* Gradient overlays - reduced opacity */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {/* Top blend */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/40 to-transparent" />
        
        {/* Bottom blend */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        {/* Very subtle radial overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent to-transparent" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-[2] h-full">
        <motion.h1
          className="absolute top-8 left-0 right-0 mx-auto w-fit text-3xl md:text-4xl px-4 py-2 bg-black/10 backdrop-blur-sm rounded-full"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          <TextHoverEffect text="Shubh Sheth" duration={0.4} className="font-bold text-4xl md:text-5xl" />
        </motion.h1>

        <div className="flex flex-col items-center justify-center h-full font-bold">
          <h2 className="text-xl md:text-2xl mb-8">
            <div className="text-base md:text-lg font-medium text-neutral-800 dark:text-neutral-200 font-['SF Pro Display']">
              <FlipWords 
                words={["Generative AI Developer", "Web3 | Crypto Enthusiast", "Machine Learning Engineer", "AI Researcher", "Tech Innovator"]}
                duration={2000}
                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
              />
            </div>
          </h2>
          
          <div className="flex gap-6 justify-center md:flex-row flex-col">
            <Button
              text="View My Work"
              href="#projects"
              icon={<FiArrowRight className="h-6 w-6" />}
            />
            <Button
              text="Contact Me"
              href="#contact"
              icon={<FiArrowRight className="h-6 w-6" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;