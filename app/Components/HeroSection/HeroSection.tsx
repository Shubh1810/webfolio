'use client';
// components/HeroSection/HeroSection.tsx
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { TfiSoundcloud } from 'react-icons/tfi';
import { FlipWords } from '../../Components/Common/ui/flip-words';
import { Button } from '../Common/ui/button';
import { useTheme } from 'next-themes';

// Define a type for the Vanta effect
type VantaEffect = {
  destroy: () => void;
} | null;

const HeroSection: React.FC = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const [vantaEffect, setVantaEffect] = useState<VantaEffect>(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Split into two separate effects
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only proceed with Vanta setup if mounted
    if (!mounted) return;

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
        if (vantaEffect) vantaEffect.destroy();
        
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
            color: theme === 'dark' ? 0x10105 : 0x959596,
            shininess: 35.0,
            waveHeight: 15.0,
            zoom: 0.75,
            waveSpeed: 0.5,
            mouseEase: true,
          })
        );
      };
    };

    // Cleanup function
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [mounted, theme]);

  // Profile Image Source
  const profileImageSrc = '/mainpicc.png'; // Update path as needed

  return (
    <div className="relative h-[60vh] w-full mt-14 md:-mt-3">
      {/* Vanta container */}
      <div 
        ref={vantaRef}
        className="absolute left-0 top-0 w-full h-full z-0 opacity-100"
      />

      {/* Edge blending gradients */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Top blend - increased height and smoother transition */}
        <div className="absolute -top-20 w-full h-52 bg-gradient-to-b from-white from-5% via-white/98 via-30% via-white/95 via-60% dark:from-black dark:via-black/98 dark:via-black/95 to-transparent" />

        {/* Bottom blend - increased height and smoother transition */}
        <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-white from-5% via-white/98 via-30% via-white/95 via-60% dark:from-black dark:via-black/98 dark:via-black/95 to-transparent" />

        {/* Inverted bottom blend - increased height and smoother transition */}
        <div className="absolute bottom-0 translate-y-full w-full h-32 bg-gradient-to-b from-white dark:from-black via-white/95 dark:via-black/95 to-transparent" />


      </div>
      
      {/* Hero Content and Profile Picture Container */}
      <div className="relative z-[2] h-full flex flex-col-reverse md:flex-row md:justify-between items-center p-8 max-w-[100rem] mx-auto">
        {/* Hero Content */}
        <div className="flex flex-col items-start justify-center w-full mt-8 md:mt-0 md:ml-8 lg:ml-16">
          <motion.h1
            className="bg-clip-text text-transparent text-left bg-gradient-to-br from-black via-gray-700 to-gray-800 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight"
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
              words={["AI | ML Developer", "Web3 | Crypto Enthusiast", "Python Developer", "Autonomous Systems Developer", "Full Stack Developer", "Data Analyst", "Systems Architect"]}
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
          <div className="mb-8 md:mb-0 md:mt-0 self-center md:self-center relative md:mr-8 lg:mr-16">
            {/* Black shadow glow effect */}
            <div className="absolute -inset-2 rounded-full bg-black opacity-100 animate-fade-in blur-2xl" />
            
            {/* Indian flag gradient glow effect - only in dark mode */}
            <div 
              className="absolute -inset-2 rounded-full bg-gradient-to-b from-orange-400 via-slate-100/80 to-green-400 opacity-0 blur-2xl hidden dark:block transition-opacity duration-700 ease-in-out"
              style={{ opacity: mounted ? 0.25 : 0 }}
            />
            
            <Image
              src={profileImageSrc}
              alt="Profile Picture"
              width={150}
              height={150}
              priority={true}
              className="relative object-cover md:w-[200px] md:h-[200px] transition-all duration-300"
              onLoad={(event) => {
                const img = event.target as HTMLImageElement;
                img.classList.remove('opacity-0');
                img.classList.add('opacity-100');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
          

export default HeroSection;