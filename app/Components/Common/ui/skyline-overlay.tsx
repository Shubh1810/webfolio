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

  const styles = {
    backgroundImage: "url('/skyline.jpg')",
    backgroundSize: `${zoom * 100}% auto`,
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    height: '120%',
    filter: 'grayscale(80%) brightness(85%)',
    transform: `translateY(-${(zoom - 1) * 20}px)`,
  } as const;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden h-[60vh] -mt-3">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center grayscale"
        style={styles}
      />
    </div>
  );
}; 