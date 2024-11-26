'use client';
// components/HeroSection/HeroSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TfiSoundcloud } from 'react-icons/tfi';
import { FlipWords } from '../../Components/Common/ui/flip-words';
import { Button } from '../Common/ui/button';
import { TextHoverEffect } from '../Common/ui/text-hover-effect';

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

  // Profile Image Source
  const profileImageSrc = '/mainpicc.png'; // Update path as needed

  return (
    <div className="relative h-[60vh] w-full mt-20 md:-mt-3">
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
        <div className="absolute bottom-0 w-full h-[20vh] bg-gradient-to-b from-black via-black/90 to-transparent translate-y-full" />

        {/* Tech Stack Text */}
            <div className="absolute -bottom-14 left-8 z-[5]">
          <TextHoverEffect
            text="Tech Stack"
            duration={0.4}
          />
        </div>
      </div>
      
      {/* Hero Content and Profile Picture Container */}
      <div className="relative z-[2] h-full flex flex-col-reverse md:flex-row md:justify-between items-center p-8">
        {/* Hero Content */}
        <div className="flex flex-col items-start justify-center w-full mt-8 md:mt-0">
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
              words={["AI | ML Developer", "Web3 | Crypto Enthusiast", "Python | R Developer", "Autonomous Systems Developer", "System Architect"]}
              duration={2000}
              className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-500 font-mono"
            />
          </div>
          
          <div className="flex gap-6 justify-start mt-8 flex-row">
            <Button
              text="Beta"
              href="/beta"
              icon={<TfiSoundcloud className="h-6 w-6" />}
            />
          </div>
        </div>

        {/* Profile Picture */}
        {profileImageSrc && (
          <div className="mb-8 md:mb-0 md:mt-0 self-center md:self-center relative">
            {/* Indian flag gradient glow effect - with smoother fade */}
            <div className="absolute -inset-2 right-[-250px] rounded-l-full bg-gradient-to-b from-orange-400/90 via-slate-100/40 to-green-400/90 opacity-20 blur-2xl" />
            <Image
              src={profileImageSrc}
              alt="Profile Picture"
              width={150}
              height={150}
              className="relative object-cover md:w-[200px] md:h-[200px]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
          

export default HeroSection;