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

  const handleScroll = throttle(() => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop.current) {
      // Scrolling down
      if (scrollDirection.current !== 'down') {
        scrollDirection.current = 'down';
        controls.start({
          y: 0,
          transition: { type: 'spring', stiffness: 50, damping: 20 },
        });
      }
    } else if (scrollTop < lastScrollTop.current) {
      // Scrolling up
      if (scrollDirection.current !== 'up') {
        scrollDirection.current = 'up';
        controls.start({
          y: -50,
          transition: { type: 'tween', duration: 0.8 },
        });
      }
    }

    lastScrollTop.current = scrollTop <= 0 ? 0 : scrollTop;
  }, 200); // Adjust the throttle delay as needed

  useEffect(() => {
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