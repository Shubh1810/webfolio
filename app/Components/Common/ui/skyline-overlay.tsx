"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const SkylineOverlay = () => {
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const updateZoom = () => {
      const width = window.innerWidth;
      if (width <= 640) { // mobile
        setZoom(2); // More zoom for mobile
      } else if (width <= 768) { // small tablets
        setZoom(1.75);
      } else if (width <= 1024) { // tablets
        setZoom(1.5);
      } else { // desktop
        setZoom(1);
      }
    };

    // Initial zoom
    updateZoom();

    // Update zoom on resize
    window.addEventListener('resize', updateZoom);
    return () => window.removeEventListener('resize', updateZoom);
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden h-[60vh] -mt-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.433 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center transform -translate-y-12 grayscale"
        style={{
          backgroundImage: "url('/skyline.jpg')",
          backgroundSize: '100% auto',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          height: '120%',
          filter: 'grayscale(100%) brightness(85%)',
        }}
      />
      
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black via-black/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-black via-black/95 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
      </div>
    </div>
  );
}; 