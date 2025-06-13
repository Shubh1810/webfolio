'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { 
  Environment, 
  OrbitControls, 
  Text, 
  Box, 
  Sphere,
  Plane,
  Float,
  Stars,
  useGLTF
} from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

interface RoomProps {
  onInteraction: (section: string | null) => void;
  activeSection: string | null;
  prefersReducedMotion: boolean;
}

// Cyber-punk color palette
const COLORS = {
  primary: '#00ffff',    // Cyan
  secondary: '#ff00ff',  // Magenta
  accent: '#ffff00',     // Yellow
  neon: '#00ff41',       // Matrix green
  warning: '#ff3333',    // Red
};

// MacBook Pro 3D Model Component
function MacBookModel({ position, scale = 1, hovered, isActive }: {
  position: [number, number, number];
  scale?: number;
  hovered: boolean;
  isActive: boolean;
}) {
  // Using a fallback approach - create a realistic MacBook with primitives
  return (
    <group position={position} scale={scale}>
      {/* MacBook Base */}
      <Box args={[1.4, 0.08, 1]} position={[0, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial
          color="#c0c0c0"
          metalness={0.9}
          roughness={0.1}
          emissive="#001122"
          emissiveIntensity={hovered || isActive ? 0.2 : 0.05}
        />
      </Box>
      
      {/* MacBook Screen */}
      <group rotation={[-Math.PI * 0.05, 0, 0]} position={[0, 0.04, -0.45]}>
        {/* Screen Back */}
        <Box args={[1.35, 0.85, 0.05]} position={[0, 0.42, 0]} castShadow>
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.8}
            roughness={0.2}
          />
        </Box>
        
        {/* Screen Display */}
        <Box args={[1.2, 0.75, 0.01]} position={[0, 0.42, 0.03]} castShadow>
          <meshStandardMaterial
            color="#000000"
            emissive="#00ffff"
            emissiveIntensity={hovered || isActive ? 0.6 : 0.2}
          />
        </Box>
        
        {/* Apple Logo (glowing) */}
        <Sphere args={[0.03]} position={[0, 0.65, -0.025]}>
          <meshStandardMaterial
            color="#ffffff"
            emissive="#ffffff"
            emissiveIntensity={0.8}
          />
        </Sphere>
      </group>
      
      {/* Keyboard Area */}
      <Box args={[1.2, 0.01, 0.7]} position={[0, 0.045, 0.1]} castShadow>
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.3}
          roughness={0.7}
        />
      </Box>
      
      {/* Trackpad */}
      <Box args={[0.3, 0.005, 0.2]} position={[0, 0.05, 0.25]} castShadow>
        <meshStandardMaterial
          color="#333333"
          metalness={0.6}
          roughness={0.3}
        />
      </Box>
      
      {/* Status indicators */}
      {hovered || isActive ? (
        <>
          {/* Power indicator */}
          <Sphere args={[0.01]} position={[0.6, 0.05, -0.4]}>
            <meshStandardMaterial
              color="#00ff00"
              emissive="#00ff00"
              emissiveIntensity={1}
            />
          </Sphere>
          
          {/* Screen glow effect */}
          <Box args={[1.3, 0.8, 0.01]} position={[0, 0.42, 0.04]}>
            <meshStandardMaterial
              color="#00ffff"
              transparent
              opacity={0.3}
              emissive="#00ffff"
              emissiveIntensity={0.5}
            />
          </Box>
        </>
      ) : null}
    </group>
  );
}

// Interactive MacBook Laptop
function Laptop({ position, onInteraction, isActive, prefersReducedMotion }: { 
  position: [number, number, number]; 
  onInteraction: (section: string | null) => void; 
  isActive: boolean;
  prefersReducedMotion: boolean;
}) {
  const laptopRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (laptopRef.current) {
      if (hovered || isActive) {
        laptopRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.05;
        laptopRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.02;
      } else {
        laptopRef.current.rotation.y = THREE.MathUtils.lerp(laptopRef.current.rotation.y, 0, 0.1);
        laptopRef.current.position.y = THREE.MathUtils.lerp(laptopRef.current.position.y, position[1], 0.1);
      }
    }
  });

  return (
    <group
      ref={laptopRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => onInteraction('projects')}
    >
      <MacBookModel 
        position={[0, 0, 0]} 
        scale={1.2}
        hovered={hovered}
        isActive={isActive}
      />
      
      {(hovered || isActive) && (
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.25}
            color="#00ffff"
            anchorX="center"
            anchorY="middle"
          >
            PROJECTS
          </Text>
        </Float>
      )}
      
      {/* Holographic effect around MacBook */}
      {!prefersReducedMotion && (hovered || isActive) && (
        <group>
          {Array.from({ length: 3 }, (_, i) => (
            <Box
              key={i}
              args={[1.8 + i * 0.1, 0.01, 1.4 + i * 0.1]}
              position={[0, 0.05 + i * 0.1, 0]}
            >
              <meshStandardMaterial
                color="#00ffff"
                emissive="#00ffff"
                emissiveIntensity={0.4 - i * 0.1}
                transparent
                opacity={0.2 - i * 0.05}
                wireframe
              />
            </Box>
          ))}
        </group>
      )}
    </group>
  );
}

// Simple interactive drone
function Drone({ position, onInteraction, isActive }: { 
  position: [number, number, number]; 
  onInteraction: (section: string | null) => void; 
  isActive: boolean; 
}) {
  const droneRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (droneRef.current) {
      droneRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 1.5) * 0.3;
      droneRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      
      if (hovered || isActive) {
        droneRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
        droneRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 1.2) * 0.2;
      } else {
        droneRef.current.rotation.y = THREE.MathUtils.lerp(droneRef.current.rotation.y, 0, 0.1);
        droneRef.current.position.x = THREE.MathUtils.lerp(droneRef.current.position.x, position[0], 0.1);
      }
    }
  });

  return (
    <group
      ref={droneRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={() => onInteraction('about')}
    >
      <Box args={[1, 0.3, 0.6]} position={[0, 0, 0]} castShadow>
        <meshStandardMaterial
          color="#444444"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff00ff"
          emissiveIntensity={hovered || isActive ? 0.3 : 0.1}
        />
      </Box>
      {[
        [-0.8, 0, -0.8],
        [0.8, 0, -0.8],
        [-0.8, 0, 0.8],
        [0.8, 0, 0.8],
      ].map((armPosition, index) => (
        <group key={index}>
          <Box args={[0.1, 0.1, 0.6]} position={armPosition as [number, number, number]} castShadow>
            <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} />
          </Box>
          <Sphere args={[0.08]} position={armPosition as [number, number, number]} castShadow>
            <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={0.5} />
          </Sphere>
        </group>
      ))}
      {(hovered || isActive) && (
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
          <Text
            position={[0, 1.5, 0]}
            fontSize={0.3}
            color="#ff00ff"
            anchorX="center"
            anchorY="middle"
          >
            ABOUT
          </Text>
        </Float>
      )}
    </group>
  );
}

// Moon Surface Floor Component
function MoonFloor() {
  const moonRef = useRef<THREE.Group>(null);
  const gltf = useGLTF('/moon/scene.gltf');

  useFrame((state) => {
    if (moonRef.current) {
      // Subtle rotation for the moon
      moonRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  // Ensure original materials are preserved
  React.useEffect(() => {
    if (gltf.scene) {
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          // Preserve original material properties
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.envMapIntensity = 0.1; // Reduce environment map influence
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [gltf]);

  return (
    <group ref={moonRef}>
      <primitive 
        object={gltf.scene.clone()} 
        scale={[12, 12, 12]} 
        position={[0, -12, 0]}
        receiveShadow
        castShadow
      />
      
      {/* Dedicated neutral lighting for moon */}
      <pointLight
        position={[0, 10, 0]}
        intensity={2}
        color="#ffffff"
        distance={30}
        decay={1}
      />
      
      {/* Add some ambient lunar lighting */}
      <Sphere args={[0.2]} position={[0, 15, 0]}>
        <meshStandardMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </Sphere>
      
      {/* Subtle crater glow effects */}
      {Array.from({ length: 8 }, (_, i) => (
        <Sphere key={i} args={[0.12]} position={[
          Math.cos(i * Math.PI * 2 / 8) * 10,
          -10,
          Math.sin(i * Math.PI * 2 / 8) * 10
        ]}>
          <meshStandardMaterial
            color={COLORS.primary}
            emissive={COLORS.primary}
            emissiveIntensity={0.4}
            transparent
            opacity={0.6}
          />
        </Sphere>
      ))}
    </group>
  );
}

// Simple interactive door
function Door({ position, onInteraction, isActive }: { 
  position: [number, number, number]; 
  onInteraction: (section: string | null) => void; 
  isActive: boolean; 
}) {
  const doorRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = React.useState(false);

  useFrame((state) => {
    if (doorRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      doorRef.current.scale.setScalar(scale);
    }
  });

  const handleClick = () => {
    window.open('/resume.pdf', '_blank');
    onInteraction('resume');
    setTimeout(() => onInteraction(null), 1000);
  };

  return (
    <group
      ref={doorRef}
      position={position}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={handleClick}
    >
      <Box args={[0.2, 4, 0.2]} position={[-1.1, 2, 0]} castShadow>
        <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} emissive="#ffff00" emissiveIntensity={0.1} />
      </Box>
      <Box args={[0.2, 4, 0.2]} position={[1.1, 2, 0]} castShadow>
        <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} emissive="#ffff00" emissiveIntensity={0.1} />
      </Box>
      <Box args={[2.4, 0.2, 0.2]} position={[0, 4.1, 0]} castShadow>
        <meshStandardMaterial color="#333333" metalness={0.7} roughness={0.3} emissive="#ffff00" emissiveIntensity={0.1} />
      </Box>
      <Box args={[2, 4, 0.1]} position={[0, 2, 0]} castShadow>
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.3}
          roughness={0.7}
          emissive="#ffff00"
          emissiveIntensity={hovered || isActive ? 0.2 : 0.05}
        />
      </Box>
      <Box args={[0.1, 0.3, 0.1]} position={[0.8, 2, 0.1]} castShadow>
        <meshStandardMaterial color="#ffff00" metalness={0.9} roughness={0.1} emissive="#ffff00" emissiveIntensity={0.5} />
      </Box>
      {(hovered || isActive) && (
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
          <Text
            position={[0, 5.5, 0]}
            fontSize={0.3}
            color="#ffff00"
            anchorX="center"
            anchorY="middle"
          >
            RESUME
          </Text>
        </Float>
      )}
    </group>
  );
}

// Main Room component
export default function Room({ onInteraction, activeSection, prefersReducedMotion }: RoomProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  // Camera animation setup
  useEffect(() => {
    if (!prefersReducedMotion) {
      gsap.fromTo(
        camera.position,
        { y: 10, z: 15 },
        { y: 2, z: 8, duration: 2, ease: "power2.out" }
      );
    }
  }, [camera, prefersReducedMotion]);

  // Handle section changes with camera movements
  useEffect(() => {
    if (prefersReducedMotion) return;

    const tl = gsap.timeline();

    switch (activeSection) {
      case 'projects':
        tl.to(camera.position, { x: -2, y: 1, z: 4, duration: 1 });
        break;
      case 'about':
        tl.to(camera.position, { x: 0, y: 3, z: 2, duration: 1 });
        break;
      case 'resume':
        tl.to(camera.position, { x: 2, y: 1, z: 4, duration: 1 });
        break;
      default:
        tl.to(camera.position, { x: 0, y: 2, z: 8, duration: 1 });
    }

    return () => {
      tl.kill();
    };
  }, [activeSection, camera, prefersReducedMotion]);

  return (
    <group ref={groupRef}>
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} color={COLORS.primary} />
      
      {/* Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        color={COLORS.neon}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      
      {/* Accent lights */}
      <pointLight position={[-10, 5, -10]} intensity={0.2} color={COLORS.secondary} distance={8} />
      <pointLight position={[10, 5, 10]} intensity={0.2} color={COLORS.accent} distance={8} />
      
      {/* Moon Surface Floor */}
      <MoonFloor />
      
      {/* Floating UFO Platform */}
      <group position={[-3, 1.8, 2]}>
        {/* Main UFO Disc */}
        <Box
          args={[4.5, 0.3, 3]}
          position={[0, 0, 0]}
          castShadow
          receiveShadow
          rotation={[0, 0, 0]}
        >
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.9}
            roughness={0.1}
            emissive={COLORS.primary}
            emissiveIntensity={0.2}
          />
        </Box>
        
        {/* UFO Ring Detail */}
        <Box
          args={[5, 0.1, 3.5]}
          position={[0, 0.2, 0]}
          castShadow
        >
          <meshStandardMaterial
            color="#333333"
            metalness={0.8}
            roughness={0.2}
            emissive={COLORS.accent}
            emissiveIntensity={0.3}
          />
        </Box>

        {/* Fire Thrusters */}
        {[
          [-1.8, -0.8, -1.2],
          [1.8, -0.8, -1.2],
          [-1.8, -0.8, 1.2],
          [1.8, -0.8, 1.2]
        ].map((thrusterPos, index) => (
          <group key={index} position={thrusterPos as [number, number, number]}>
            {/* Thruster Nozzle */}
            <Box args={[0.3, 0.5, 0.3]} castShadow>
              <meshStandardMaterial
                color="#333333"
                metalness={0.9}
                roughness={0.1}
              />
            </Box>
            
            {/* Fire Effect */}
            <group position={[0, -0.8, 0]}>
              {Array.from({ length: 4 }, (_, i) => (
                <Sphere
                  key={i}
                  args={[0.1 - i * 0.02]}
                  position={[0, -i * 0.15, 0]}
                >
                  <meshStandardMaterial
                    color={i < 2 ? "#ff6600" : "#ffff00"}
                    emissive={i < 2 ? "#ff3300" : "#ffaa00"}
                    emissiveIntensity={1}
                    transparent
                    opacity={0.8 - i * 0.15}
                  />
                </Sphere>
              ))}
            </group>
          </group>
        ))}
        
        {/* UFO Lights */}
        {Array.from({ length: 8 }, (_, i) => (
          <Sphere
            key={i}
            args={[0.05]}
            position={[
              Math.cos(i * Math.PI * 2 / 8) * 2,
              0.25,
              Math.sin(i * Math.PI * 2 / 8) * 1.2
            ]}
          >
            <meshStandardMaterial
              color={COLORS.primary}
              emissive={COLORS.primary}
              emissiveIntensity={1}
            />
          </Sphere>
        ))}
      </group>

      {/* Interactive objects */}
              <Laptop 
          position={[-3, 2, 2]} 
          onInteraction={onInteraction} 
          isActive={activeSection === 'projects'} 
          prefersReducedMotion={prefersReducedMotion}
        />
      
      <Drone
        position={[2, 1, 6]}
        onInteraction={onInteraction}
        isActive={activeSection === 'about'}
      />
      
      <Door
        position={[4, 0, -8]}
        onInteraction={onInteraction}
        isActive={activeSection === 'resume'}
      />

      {/* Professional Desk Decorations */}
      
      {/* Coffee Mug */}
      <group position={[-4.2, 2.2, 2.8]}>
        <Box args={[0.15, 0.25, 0.15]} castShadow>
          <meshStandardMaterial
            color="#2d2d2d"
            metalness={0.1}
            roughness={0.9}
          />
        </Box>
        {/* Coffee Mug Handle */}
        <Box args={[0.02, 0.1, 0.05]} position={[0.12, 0, 0]} castShadow>
          <meshStandardMaterial
            color="#2d2d2d"
            metalness={0.1}
            roughness={0.9}
          />
        </Box>
        {/* Steam effect */}
        {Array.from({ length: 3 }, (_, i) => (
          <Sphere
            key={i}
            args={[0.01]}
            position={[0, 0.3 + i * 0.1, 0]}
          >
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.3 - i * 0.1}
              emissive="#ffffff"
              emissiveIntensity={0.2}
            />
          </Sphere>
        ))}
      </group>

      {/* Cyberpunk Subwoofer */}
      <group position={[-1.8, 2.3, 1.5]}>
        {/* Main Subwoofer Body */}
        <Box args={[0.8, 0.8, 0.6]} position={[0, 0, 0]} castShadow>
          <meshStandardMaterial
            color="#000000"
            metalness={0.9}
            roughness={0.05}
            emissive="#001122"
            emissiveIntensity={0.1}
          />
        </Box>
        
        {/* Piano Black Front Panel */}
        <Box args={[0.82, 0.82, 0.02]} position={[0, 0, 0.31]} castShadow>
          <meshStandardMaterial
            color="#000000"
            metalness={1}
            roughness={0}
            emissive={COLORS.primary}
            emissiveIntensity={0.05}
          />
        </Box>
        
        {/* Speaker Cone */}
        <Sphere args={[0.25]} position={[0, 0, 0.35]} castShadow>
          <meshStandardMaterial
            color="#1a1a1a"
            metalness={0.3}
            roughness={0.8}
          />
        </Sphere>
        
        {/* Speaker Center */}
        <Sphere args={[0.08]} position={[0, 0, 0.4]} castShadow>
          <meshStandardMaterial
            color="#333333"
            metalness={0.8}
            roughness={0.2}
          />
        </Sphere>
        
        {/* LED Status Lights */}
        {Array.from({ length: 3 }, (_, i) => (
          <Sphere
            key={i}
            args={[0.02]}
            position={[0.25, 0.3 - i * 0.1, 0.32]}
          >
            <meshStandardMaterial
              color={COLORS.primary}
              emissive={COLORS.primary}
              emissiveIntensity={1}
            />
          </Sphere>
        ))}
        
        {/* Bass Port */}
        <Box args={[0.15, 0.05, 0.1]} position={[0, -0.3, 0.25]} castShadow>
          <meshStandardMaterial
            color="#000000"
            metalness={0.9}
            roughness={0.1}
          />
        </Box>
      </group>

      {/* Small Desk Plant */}
      <group position={[-1.8, 2.2, 2.8]}>
        {/* Pot */}
        <Box args={[0.15, 0.15, 0.15]} castShadow>
          <meshStandardMaterial
            color="#654321"
            metalness={0.1}
            roughness={0.9}
          />
        </Box>
        {/* Plant stems */}
        {Array.from({ length: 5 }, (_, i) => (
          <Box
            key={i}
            args={[0.01, 0.2 + Math.random() * 0.1, 0.01]}
            position={[
              (Math.random() - 0.5) * 0.1,
              0.15,
              (Math.random() - 0.5) * 0.1
            ]}
            rotation={[
              (Math.random() - 0.5) * 0.3,
              Math.random() * Math.PI,
              (Math.random() - 0.5) * 0.3
            ]}
            castShadow
          >
            <meshStandardMaterial
              color="#228B22"
              metalness={0.1}
              roughness={0.8}
              emissive="#004400"
              emissiveIntensity={0.1}
            />
          </Box>
        ))}
      </group>

      {/* Cyberpunk Siri AI Lamp */}
      <group position={[-4.5, 2.4, 1.5]}>
        {/* AI Base Platform */}
        <Box args={[0.3, 0.05, 0.3]} castShadow>
          <meshStandardMaterial
            color="#000000"
            metalness={1}
            roughness={0}
            emissive={COLORS.primary}
            emissiveIntensity={0.2}
          />
        </Box>
        
        {/* Holographic Projector Core */}
        <Sphere args={[0.08]} position={[0, 0.12, 0]} castShadow>
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.9}
            roughness={0.1}
            emissive={COLORS.primary}
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </Sphere>
        
        {/* AI Voice Visualization Rings */}
        {Array.from({ length: 4 }, (_, i) => (
          <group key={i} position={[0, 0.12, 0]} rotation={[0, 0, 0]}>
            <Box
              args={[0.4 + i * 0.1, 0.01, 0.4 + i * 0.1]}
              position={[0, 0.05 + i * 0.03, 0]}
            >
              <meshStandardMaterial
                color={COLORS.primary}
                emissive={COLORS.primary}
                emissiveIntensity={0.6 - i * 0.1}
                transparent
                opacity={0.4 - i * 0.08}
                wireframe
              />
            </Box>
          </group>
        ))}
        
        {/* Siri Wave Pattern */}
        {Array.from({ length: 8 }, (_, i) => (
          <Box
            key={i}
            args={[0.02, 0.1 + Math.sin(i) * 0.05, 0.02]}
            position={[
              Math.cos(i * Math.PI * 2 / 8) * 0.12,
              0.15,
              Math.sin(i * Math.PI * 2 / 8) * 0.12
            ]}
            castShadow
          >
            <meshStandardMaterial
              color={COLORS.secondary}
              emissive={COLORS.secondary}
              emissiveIntensity={0.8}
              transparent
              opacity={0.7}
            />
          </Box>
        ))}
        
        {/* Status LED Ring */}
        {Array.from({ length: 12 }, (_, i) => (
          <Sphere
            key={i}
            args={[0.01]}
            position={[
              Math.cos(i * Math.PI * 2 / 12) * 0.13,
              0.03,
              Math.sin(i * Math.PI * 2 / 12) * 0.13
            ]}
          >
            <meshStandardMaterial
              color={COLORS.accent}
              emissive={COLORS.accent}
              emissiveIntensity={1}
            />
          </Sphere>
        ))}
        
        {/* Floating Hologram Text */}
        <Text
          position={[0, 0.4, 0]}
          fontSize={0.03}
          color={COLORS.primary}
          anchorX="center"
          anchorY="middle"
        >
          NEURAL AI
        </Text>
      </group>

      {/* Cyber stars background */}
      {!prefersReducedMotion && (
        <Stars
          radius={100}
          depth={50}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={0.5}
        />
      )}

      {/* Controls */}
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        minDistance={3}
        maxDistance={15}
        maxPolarAngle={Math.PI / 2}
        enablePan={false}
        makeDefault
      />

      {/* Environment */}
      <Environment preset="night" />
      
      {/* Room title floating text */}
      <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
        <Text
          position={[0, 6, -8]}
          fontSize={1}
          color={COLORS.primary}
          anchorX="center"
          anchorY="middle"
          maxWidth={10}
        >
          NEURAL INTERFACE
        </Text>
      </Float>
    </group>
  );
}

// Preload the moon GLTF model
useGLTF.preload('/moon/scene.gltf');