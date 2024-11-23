"use client";
import { motion } from "framer-motion";

export const SkylineOverlay = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden h-[70vh]">
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
          filter: 'grayscale(80%) brightness(85%) sepia(0%) hue-rotate(300deg)',
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