"use client";

import { AnimatedSection } from '../Components/Common/AnimatedSection';
import { SearchBar } from '../Components/Common/ui/SearchBar';
import { Button } from '../Components/Common/ui/button';
import React from "react";  
import { IconBrandGithub } from '@tabler/icons-react';
import { SignupFormDemo } from '../Components/Common/ui/SignupForm';
import { useState } from "react";
import { motion } from 'framer-motion';

export default function BetaPage() {
  const [showSignup, setShowSignup] = useState(false);
  

  return (
    <AnimatedSection>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <motion.h1
            className="bg-clip-text text-transparent text-left bg-gradient-to-br from-black via-gray-700 to-gray-800 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            Anythin.ai
          </motion.h1>
        <SearchBar 
          placeholders={[" Messi is the G.O.A.T   🚧  ❌", " under construction 🛠️❌", " Search    🔍❌", "it's litt!!!!🚀❌", "AI  ❌"]} 
          onChange={() => {}} 
          onSubmit={() => {}} 
        />
        <div className="flex flex-row gap-4 mt-8">
          <Button 
            text="GitHub" 
            onClick={() => {}} 
            icon={<IconBrandGithub />} 
          />
          <Button 
            text="Login   🚧" 
            onClick={() => setShowSignup(true)}
            icon
          />
        </div>
      </div>

      {showSignup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative">
            <button 
              onClick={() => setShowSignup(false)}
              className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              ✕
            </button>
            <SignupFormDemo />
          </div>
        </div>
      )}
    </AnimatedSection>
  );
}