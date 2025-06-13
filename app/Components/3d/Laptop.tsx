'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Float, Text } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

interface LaptopProps {
  position: [number, number, number];
  onInteraction: (section: string | null) => void;
  isActive: boolean;
  prefersReducedMotion: boolean;
}

// Projects data - TODO: Replace with your actual projects
const PROJECTS = [
  {
    id: 1,
    title: "AI Tender Automation System",
    description: "A sophisticated multi-agent AI system built with React, Python, and OpenAI API",
    tech: ["React", "Python", "OpenAI", "FastAPI"],
    link: "https://github.com/Shubh1810/uptender-ai.git",
    image: "/api/placeholder/300/200"
  },
  {
    id: 2,
    title: "3D Portfolio Website",
    description: "Interactive 3D portfolio built with React Three Fiber and Next.js",
    tech: ["Next.js", "Three.js", "TypeScript", "GSAP"],
    link: "https://github.com",
    image: "/api/placeholder/300/200"
  },
  {
    id: 3,
    title: "Cyber Security Dashboard",
    description: "Real-time security monitoring dashboard with threat detection",
    tech: ["React", "D3.js", "Node.js", "MongoDB"],
    link: "https://github.com",
    image: "/api/placeholder/300/200"
  }
];

// Removed modal component - now handled in ModalsContainer

export function Laptop({ position, onInteraction, isActive, prefersReducedMotion }: LaptopProps) {
  const laptopRef = useRef<THREE.Group>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Hover animation
  useFrame((state) => {
    if (laptopRef.current && !prefersReducedMotion) {
      if (hovered || isActive) {
        laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.1;
        laptopRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      } else {
        laptopRef.current.rotation.y = THREE.MathUtils.lerp(laptopRef.current.rotation.y, 0, 0.1);
        laptopRef.current.position.y = THREE.MathUtils.lerp(laptopRef.current.position.y, position[1], 0.1);
      }
    }

    // Screen glow effect
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      const intensity = hovered || isActive ? 0.8 : 0.3;
      material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, intensity, 0.1);
    }
  });

  const handleClick = () => {
    setShowModal(true);
    onInteraction('projects');
  };

  const handleClose = () => {
    setShowModal(false);
    onInteraction(null);
  };

  return (
    <group
      ref={laptopRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Laptop base */}
      <Box args={[2, 0.1, 1.5]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial
          color="#333333"
          metalness={0.8}
          roughness={0.2}
          emissive="#111111"
          emissiveIntensity={0.2}
        />
      </Box>

      {/* Laptop screen */}
      <Box args={[1.7, 1.2, 0.05]} position={[0, 0.65, -0.4]} rotation={[-Math.PI * 0.1, 0, 0]} castShadow>
        <meshStandardMaterial
          color="#000000"
          metalness={0.9}
          roughness={0.1}
        />
      </Box>

      {/* Screen display */}
      <Box
        ref={screenRef}
        args={[1.5, 1, 0.01]}
        position={[0, 0.65, -0.35]}
        rotation={[-Math.PI * 0.1, 0, 0]}
      >
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.3}
        />
      </Box>

      {/* Keyboard */}
      <Box args={[1.6, 0.02, 1]} position={[0, 0.06, 0.2]} castShadow>
        <meshStandardMaterial
          color="#222222"
          metalness={0.5}
          roughness={0.5}
        />
      </Box>

      {/* Floating label */}
      {(hovered || isActive) && (
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
          <Text
            position={[0, 2, 0]}
            fontSize={0.3}
            color="#00ffff"
            anchorX="center"
            anchorY="middle"
            font="/fonts/cyber-font.woff" // TODO: Add font file
          >
            PROJECTS.EXE
          </Text>
        </Float>
      )}

      {/* Holographic effect */}
      {!prefersReducedMotion && (hovered || isActive) && (
        <group>
          {Array.from({ length: 5 }, (_, i) => (
            <Box
              key={i}
              args={[2.2 + i * 0.1, 0.01, 0.01]}
              position={[0, 0.5 + i * 0.2, 0]}
              rotation={[0, 0, 0]}
            >
              <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={0.5 - i * 0.1}
                transparent
                opacity={0.3 - i * 0.05}
              />
            </Box>
          ))}
        </group>
      )}

      {/* Modal handled in parent ModalsContainer */}
    </group>
  );
} 