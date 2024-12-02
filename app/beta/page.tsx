"use client";

import { AnimatedSection } from '../Components/Common/AnimatedSection';
import { SearchBar } from '../Components/Common/ui/SearchBar';
import { Button } from '../Components/Common/ui/button';
import React from "react";  
import { IconBrandGithub, IconX } from '@tabler/icons-react';
import { IconBrandLine } from '@tabler/icons-react';
import { SignupFormDemo } from '../Components/Common/ui/SignupForm';
import { cn } from '../lib/utils';
import { useState } from "react";

export default function BetaPage() {
  const [showSignup, setShowSignup] = useState(false);
  

  return (
    <AnimatedSection>
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <SearchBar 
          placeholders={[" 🚧  ❌", " 🛠️  ❌", " 🔍  ❌", "🚀  ❌", "AI  ❌"]} 
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