'use client';
// components/HeroSection/HeroSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AiFillDashboard } from 'react-icons/ai';
import { FlipWords } from '../../Components/Common/ui/flip-words';
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
            // @ts-expect-error VANTA is loaded dynamically
            VANTA.WAVES({
              el: vantaRef.current,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 200.0,
              scale: 1.0,
              scaleMobile: 1.0,
              color: 0x10105,
              shininess: 45.0,
              waveHeight: 25.0,
              waveSpeed: 0.25,
              zoom: 0.75
            })
          );
        }
        return () => {
          if (vantaEffect) vantaEffect.destroy();
        };
      };
    };
  }, [vantaEffect]);

  return (
    <div className="relative h-[60vh] w-full -mt-3">
      {/* Vanta container */}
      <div 
        ref={vantaRef}
        className="absolute left-0 top-0 w-full h-full z-0"
      />

      {/* Edge blending gradients */}
      <div className="absolute left-0 top-0 w-full h-full z-[1]">
        {/* Top blend */}
        <div className="absolute -top-14 w-full h-40 bg-gradient-to-b from-black via-black/95 to-transparent" />
        
        {/* Bottom blend - darker and more gradual */}
        <div className="absolute -bottom-12 w-full h-60 bg-gradient-to-t from-black via-black/90 to-transparent" />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-[2] h-full flex flex-col items-start justify-start p-8">
        <motion.h1
          className="bg-clip-text text-transparent text-left bg-gradient-to-br from-gray-200 via-gray-400 to-gray-600 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: "easeOut"
          }}
        >
          Hello, <br /> I&apos;m Shubh Sheth
        </motion.h1>

        <div className="mt-4 text-base md:text-xl font-mono">
          <FlipWords 
            words={["Generative AI Developer", "Web3 | Crypto Enthusiast", "Machine Learning Engineer", "AI Researcher", "Deep Learning Engineer", "Data Analyst"]}
            duration={2000}
            className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 font-mono"
          />
        </div>
        
        <div className="flex gap-6 justify-start mt-8 flex-row">
          <Button
            text="Beta"
            href="/beta"
            icon={<AiFillDashboard className="h-6 w-6" />}

          />
          
        </div>
      </div>
    </div>
  );
};

export default HeroSection;