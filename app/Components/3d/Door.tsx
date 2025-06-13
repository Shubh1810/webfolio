'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Float, Text } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

interface DoorProps {
  position: [number, number, number];
  onInteraction: (section: string | null) => void;
  isActive: boolean;
  prefersReducedMotion: boolean;
}

export function Door({ position, onInteraction, isActive, prefersReducedMotion }: DoorProps) {
  const doorRef = useRef<THREE.Group>(null);
  const doorPanelRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Door animation
  useFrame((state) => {
    if (doorRef.current && !prefersReducedMotion) {
      // Subtle breathing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      doorRef.current.scale.setScalar(scale);
    }

    // Door opening animation
    if (doorPanelRef.current) {
      const targetRotation = (hovered || isActive) ? -Math.PI * 0.3 : 0;
      doorPanelRef.current.rotation.y = THREE.MathUtils.lerp(
        doorPanelRef.current.rotation.y,
        targetRotation,
        0.1
      );
    }
  });

  const handleClick = () => {
    // Open resume PDF in new tab
    window.open('/resume.pdf', '_blank'); // TODO: Replace with actual resume path
    onInteraction('resume');
    
    // Reset after a short delay
    setTimeout(() => {
      onInteraction(null);
    }, 1000);
  };

  return (
    <group
      ref={doorRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      {/* Door frame */}
      <group>
        {/* Left frame */}
        <Box args={[0.2, 4, 0.2]} position={[-1.1, 2, 0]} castShadow>
          <meshStandardMaterial
            color="#333333"
            metalness={0.7}
            roughness={0.3}
            emissive="#ffff00"
            emissiveIntensity={0.1}
          />
        </Box>
        
        {/* Right frame */}
        <Box args={[0.2, 4, 0.2]} position={[1.1, 2, 0]} castShadow>
          <meshStandardMaterial
            color="#333333"
            metalness={0.7}
            roughness={0.3}
            emissive="#ffff00"
            emissiveIntensity={0.1}
          />
        </Box>
        
        {/* Top frame */}
        <Box args={[2.4, 0.2, 0.2]} position={[0, 4.1, 0]} castShadow>
          <meshStandardMaterial
            color="#333333"
            metalness={0.7}
            roughness={0.3}
            emissive="#ffff00"
            emissiveIntensity={0.1}
          />
        </Box>
      </group>

      {/* Door panel */}
      <Box
        ref={doorPanelRef}
        args={[2, 4, 0.1]}
        position={[0, 2, 0]}
        castShadow
      >
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.3}
          roughness={0.7}
          emissive="#ffff00"
          emissiveIntensity={hovered || isActive ? 0.2 : 0.05}
        />
      </Box>

      {/* Door handle */}
      <Box args={[0.1, 0.3, 0.1]} position={[0.8, 2, 0.1]} castShadow>
        <meshStandardMaterial
          color="#ffff00"
          metalness={0.9}
          roughness={0.1}
          emissive="#ffff00"
          emissiveIntensity={0.5}
        />
      </Box>

      {/* Door window */}
      <Box args={[0.8, 0.8, 0.02]} position={[0, 3, 0.06]}>
        <meshStandardMaterial
          color="#ffff00"
          emissive="#ffff00"
          emissiveIntensity={hovered || isActive ? 0.8 : 0.3}
          transparent
          opacity={0.7}
        />
      </Box>

      {/* Floating label */}
      {(hovered || isActive) && (
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
          <Text
            position={[0, 5.5, 0]}
            fontSize={0.3}
            color="#ffff00"
            anchorX="center"
            anchorY="middle"
            font="/fonts/cyber-font.woff" // TODO: Add font file
          >
            RESUME.PDF
          </Text>
        </Float>
      )}

      {/* Light beam effect */}
      {!prefersReducedMotion && (hovered || isActive) && (
        <group>
          {/* Light beam from door */}
          <Box
            args={[0.1, 0.1, 3]}
            position={[0, 2, 1.5]}
            rotation={[0, 0, 0]}
          >
            <meshStandardMaterial
              color="#ffff00"
              emissive="#ffff00"
              emissiveIntensity={0.8}
              transparent
              opacity={0.3}
            />
          </Box>
          
          {/* Floor light spot */}
          <Box
            args={[1, 0.01, 1]}
            position={[0, -1.99, 3]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <meshStandardMaterial
              color="#ffff00"
              emissive="#ffff00"
              emissiveIntensity={0.6}
              transparent
              opacity={0.4}
            />
          </Box>
        </group>
      )}

      {/* Scan lines effect */}
      {!prefersReducedMotion && (hovered || isActive) && (
        <group>
          {Array.from({ length: 8 }, (_, i) => (
            <Box
              key={i}
              args={[2.2, 0.02, 0.01]}
              position={[0, 0.5 + i * 0.5, 0.12]}
            >
              <meshStandardMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={0.6}
                transparent
                opacity={0.4}
              />
            </Box>
          ))}
        </group>
      )}
    </group>
  );
} 