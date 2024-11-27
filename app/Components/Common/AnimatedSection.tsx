// components/Common/AnimatedSection.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { throttle } from 'lodash';

interface AnimatedSectionProps {
  children: React.ReactNode;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ children }) => {
  const controls = useAnimation();
  const lastScrollTop = useRef(0);
  const scrollDirection = useRef<'up' | 'down' | null>(null);
  const isMounted = useRef(false);

  const handleScroll = throttle(() => {
    if (!isMounted.current) return;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop.current) {
      // Scrolling down
      if (scrollDirection.current !== 'down') {
        scrollDirection.current = 'down';
        requestAnimationFrame(() => {
          controls.start({
            y: 0,
            transition: { type: 'spring', stiffness: 50, damping: 20 },
          });
        });
      }
    } else if (scrollTop < lastScrollTop.current) {
      // Scrolling up
      if (scrollDirection.current !== 'up') {
        scrollDirection.current = 'up';
        requestAnimationFrame(() => {
          controls.start({
            y: -50,
            transition: { type: 'tween', duration: 0.8 },
          });
        });
      }
    }

    lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
  }, 200);

  useEffect(() => {
    isMounted.current = true;
    
    // Initial animation setup
    controls.set({ y: 0 });
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <motion.section animate={controls} initial={{ y: 0 }}>
      {children}
    </motion.section>
  );
};

export { AnimatedSection };