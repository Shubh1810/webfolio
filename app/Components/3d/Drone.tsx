'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Float, Text } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { motion } from 'framer-motion';

interface DroneProps {
  position: [number, number, number];
  onInteraction: (section: string | null) => void;
  isActive: boolean;
  prefersReducedMotion: boolean;
}

// About data - TODO: Replace with your actual information
const ABOUT_DATA = {
  name: "YOUR NAME", // TODO: Replace with actual name
  title: "Full-Stack Developer & AI Engineer",
  bio: "Passionate about creating cutting-edge solutions at the intersection of AI and web development. Experienced in building scalable applications, multi-agent systems, and immersive 3D experiences.",
  skills: [
    "React/Next.js",
    "TypeScript",
    "Python",
    "AI/ML",
    "Three.js",
    "Node.js",
    "Docker",
    "AWS"
  ],
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Technologies Mastered", value: "20+" },
    { label: "Coffee Consumed", value: "∞" }
  ]
};

// About modal component
function AboutModal({ 
  isOpen, 
  onClose 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  if (!isOpen) return null;

  return (
    <Html
      position={[0, 1, 0]}
      transform
      occlude
      style={{
        transition: 'all 0.3s',
        opacity: isOpen ? 1 : 0,
        transform: `scale(${isOpen ? 1 : 0.8})`,
      }}
    >
      <motion.div
        className="bg-black bg-opacity-90 border-2 border-pink-500 rounded-lg p-6 min-w-[400px] max-w-[500px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-pink-500 font-mono">
            {'>'} ABOUT.EXE
          </h2>
          <button
            onClick={onClose}
            className="text-red-400 hover:text-red-300 font-mono text-xl"
          >
            [X]
          </button>
        </div>
        
        <div className="space-y-6">
          {/* Bio Section */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2">{ABOUT_DATA.name}</h3>
            <p className="text-pink-400 font-mono text-sm mb-3">{ABOUT_DATA.title}</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              {ABOUT_DATA.bio}
            </p>
          </div>

          {/* Skills Section */}
          <div>
            <h4 className="text-md font-bold text-pink-500 mb-3 font-mono">SKILLS:</h4>
            <div className="flex flex-wrap gap-2">
              {ABOUT_DATA.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-pink-500 bg-opacity-20 text-pink-400 text-xs rounded font-mono border border-pink-500"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div>
            <h4 className="text-md font-bold text-pink-500 mb-3 font-mono">STATS:</h4>
            <div className="grid grid-cols-2 gap-4">
              {ABOUT_DATA.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-xs text-gray-400 font-mono">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <a
            href="mailto:your.email@example.com" // TODO: Replace with your email
            className="text-pink-500 hover:text-pink-400 font-mono text-sm"
          >
            CONTACT.EXE →
          </a>
        </div>
      </motion.div>
    </Html>
  );
}

export function Drone({ position, onInteraction, isActive, prefersReducedMotion }: DroneProps) {
  const droneRef = useRef<THREE.Group>(null);
  const propellerRefs = useRef<THREE.Mesh[]>([]);
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Drone floating animation
  useFrame((state) => {
    if (droneRef.current && !prefersReducedMotion) {
      // Base floating movement
      droneRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
      droneRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      
      // Enhanced movement when hovered or active
      if (hovered || isActive) {
        droneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
        droneRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 1.2) * 0.2;
      } else {
        droneRef.current.rotation.y = THREE.MathUtils.lerp(droneRef.current.rotation.y, 0, 0.1);
        droneRef.current.position.x = THREE.MathUtils.lerp(droneRef.current.position.x, position[0], 0.1);
      }
    }

    // Propeller rotation
    propellerRefs.current.forEach((propeller) => {
      if (propeller && !prefersReducedMotion) {
        propeller.rotation.y += 0.5;
      }
    });
  });

  const handleClick = () => {
    setShowModal(true);
    onInteraction('about');
  };

  const handleClose = () => {
    setShowModal(false);
    onInteraction(null);
  };

  return (
    <group
      ref={droneRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Drone body */}
      <Box args={[1, 0.3, 0.6]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial
          color="#444444"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff00ff"
          emissiveIntensity={hovered || isActive ? 0.3 : 0.1}
        />
      </Box>

      {/* Drone arms */}
      {[
        [-0.8, 0, -0.8],
        [0.8, 0, -0.8],
        [-0.8, 0, 0.8],
        [0.8, 0, 0.8],
      ].map((armPosition, index) => (
        <group key={index}>
          {/* Arm */}
          <Box args={[0.1, 0.1, 0.6]} position={armPosition} castShadow>
            <meshStandardMaterial
              color="#333333"
              metalness={0.7}
              roughness={0.3}
            />
          </Box>
          
          {/* Propeller base */}
          <Sphere args={[0.08]} position={armPosition} castShadow>
            <meshStandardMaterial
              color="#ff00ff"
              emissive="#ff00ff"
              emissiveIntensity={0.5}
            />
          </Sphere>
          
          {/* Propeller blades */}
          <Box
            ref={(el) => {
              if (el) propellerRefs.current[index] = el;
            }}
            args={[0.6, 0.02, 0.02]}
            position={[armPosition[0], armPosition[1] + 0.1, armPosition[2]]}
            castShadow
          >
            <meshStandardMaterial
              color="#cccccc"
              metalness={0.8}
              roughness={0.1}
            />
          </Box>
          
          <Box
            args={[0.02, 0.02, 0.6]}
            position={[armPosition[0], armPosition[1] + 0.1, armPosition[2]]}
            castShadow
          >
            <meshStandardMaterial
              color="#cccccc"
              metalness={0.8}
              roughness={0.1}
            />
          </Box>
        </group>
      ))}

      {/* LED lights */}
      {!prefersReducedMotion && (
        <group>
          <Sphere args={[0.05]} position={[0.3, -0.1, 0.2]}>
            <meshStandardMaterial
              color="#00ff00"
              emissive="#00ff00"
              emissiveIntensity={Math.sin(Date.now() * 0.01) * 0.5 + 0.5}
            />
          </Sphere>
          <Sphere args={[0.05]} position={[-0.3, -0.1, 0.2]}>
            <meshStandardMaterial
              color="#ff0000"
              emissive="#ff0000"
              emissiveIntensity={Math.sin(Date.now() * 0.01 + Math.PI) * 0.5 + 0.5}
            />
          </Sphere>
        </group>
      )}

      {/* Floating label */}
      {(hovered || isActive) && (
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.3}
            color="#ff00ff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/cyber-font.woff" // TODO: Add font file
          >
            ABOUT.EXE
          </Text>
        </Float>
      )}

      {/* Energy field effect */}
      {!prefersReducedMotion && (hovered || isActive) && (
        <group>
          {Array.from({ length: 3 }, (_, i) => (
            <Sphere
              key={i}
              args={[0.8 + i * 0.3]}
              position={[0, 0, 0]}
            >
              <meshStandardMaterial
                color="#ff00ff"
                emissive="#ff00ff"
                emissiveIntensity={0.2 - i * 0.05}
                transparent
                opacity={0.1 - i * 0.02}
                wireframe
              />
            </Sphere>
          ))}
        </group>
      )}

      {/* About modal */}
      <AboutModal isOpen={showModal} onClose={handleClose} />
    </group>
  );
} 