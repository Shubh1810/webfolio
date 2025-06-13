"use client";
// app/page.tsx
import React, { Suspense, useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './Components/HeroSection/HeroSection';
import { InfiniteMovingCards } from './Components/Common/ui/infinite-moving-cards';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { FocusCards } from './Components/Common/ui/focus-cards';
import { useScreenSize } from './hooks/useScreenSize';
import { SparklesCore } from './Components/Common/ui/sparkles';

// Dynamic imports for performance optimization
const Room = dynamic(() => import('./components/3d/Room'), { 
  ssr: false
});

const cards = [
  {
    title: "Penn State University",
    description: "B.S. in Computer Science and Engineering",
    src: "/psu.jpg",
    logo: {
      dark: "/psu.png",
      light: "/psu.png",
    },
  },
  {
    title: "Foothill College",
    description: "A.S.T in Computer Science",
    src: "/foothillW.jpg",
    logo: "/foothill.png",
  },
  {
    title: "Cathedral Vidya School",
    description: "IB Diploma Programme",
    src: "/cvsl-4.jpg",
    logo: "/cvsl.png",
  },
  {
    title: "CP Goenka International School",
    description: "High School Diploma (IGCSE)",
    src: "/cpgis.jpg",
    logo: "/cpgis-logo.png",
  },
]

const items = [
  {
    quote: "Python",
    name: "Numpy | Pandas | Scikit-Learn | PyTorch | FastAPI | Flask | MySQL | Requests | Matplotlib | Object-Oriented Programming | Design Patterns | Deep Learning | Data Structures & Algorithms | RESTful APIs | API Development",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 5 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "UX",
    name: "TypeScript | React | Next.js | Node.js | Tailwind CSS | Framer Motion | Figma",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 5 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "Developer Tools",
    name: "GitLab | GitHub | VSCode | Jupyter Notebook | Eclipse | OpenAI API| Anthropic API",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 5 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "Cloud",
    name: "AWS | S3 | Lambda | Google Cloud | Docker | Kubernetes | Nginx",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 3 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "AI",
    name: "LangChain | LangGraph | PyTorch | TensorFlow | Scikit-Learn | Keras | SciPy | OpenCV | Tesseract | AutoGen",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 5 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,

  },
  {
    quote: "System Design",
    name: " Microservices | Domain-driven design | GraphQL | RESTful APIs | API Development | WebSockets",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 4 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,
  },
];

// Projects data - TODO: Replace with your actual projects
const PROJECTS = [
  {
    id: 1,
    title: "AI Multi-Agent System",
    description: "A sophisticated multi-agent AI system built with React, Python, and OpenAI API",
    tech: ["React", "Python", "OpenAI", "FastAPI"],
    link: "https://github.com",
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

// Progressive loading components
function CyberLoader() {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
      <div className="relative">
        <motion.div
          className="w-24 h-24 border-2 border-cyan-400 rounded-lg"
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute inset-0 border-2 border-pink-500 rounded-lg"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Cyber glyph SVG */}
        <svg 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-cyan-400"
          viewBox="0 0 24 24" 
          fill="currentColor"
        >
          <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zM12 4.5L19.5 8.5v7L12 19.5 4.5 15.5v-7L12 4.5z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      </div>
      <div className="absolute bottom-8 text-cyan-400 font-mono text-sm animate-pulse">
        INITIALIZING NEURAL INTERFACE...
      </div>
    </div>
  );
}

// Fallback for unsupported browsers
function StaticFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
          YOUR NAME
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl">
          WebGL not supported. Upgrade your browser for the full cyber experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <motion.a
            href="#projects"
            className="p-6 bg-gray-800 border border-cyan-400 rounded-lg hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05, borderColor: '#06b6d4' }}
          >
            <h3 className="text-cyan-400 font-bold mb-2">PROJECTS</h3>
            <p className="text-gray-300">Explore my digital creations</p>
          </motion.a>
          <motion.a
            href="#about"
            className="p-6 bg-gray-800 border border-pink-500 rounded-lg hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05, borderColor: '#ec4899' }}
          >
            <h3 className="text-pink-500 font-bold mb-2">ABOUT</h3>
            <p className="text-gray-300">Learn about my journey</p>
          </motion.a>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="p-6 bg-gray-800 border border-yellow-400 rounded-lg hover:bg-gray-700 transition-colors"
            whileHover={{ scale: 1.05, borderColor: '#fbbf24' }}
          >
            <h3 className="text-yellow-400 font-bold mb-2">RESUME</h3>
            <p className="text-gray-300">Download my CV</p>
          </motion.a>
        </div>
      </div>
    </div>
  );
}

// Modals container - rendered outside Canvas to avoid Three.js conflicts
function ModalsContainer({ 
  activeSection, 
  onSectionChange 
}: { 
  activeSection: string | null;
  onSectionChange: (section: string | null) => void;
}) {
  return (
    <>
      {/* Projects Modal */}
      <AnimatePresence>
        {activeSection === 'projects' && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onSectionChange(null)}
          >
            <motion.div
              className="bg-black bg-opacity-90 border-2 border-cyan-400 rounded-lg p-6 min-w-[400px] max-w-[600px] max-h-[500px] overflow-y-auto"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-cyan-400 font-mono">
                  {'>'} PROJECTS.EXE
                </h2>
                <button
                  onClick={() => onSectionChange(null)}
                  className="text-red-400 hover:text-red-300 font-mono text-xl"
                >
                  [X]
                </button>
              </div>
              
              <div className="space-y-4">
                {PROJECTS.map((project) => (
                  <motion.div
                    key={project.id}
                    className="border border-gray-600 rounded p-4 hover:border-cyan-400 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-lg font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-cyan-400 bg-opacity-20 text-cyan-400 text-xs rounded font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-cyan-400 text-black font-bold text-sm rounded hover:bg-cyan-300 transition-colors"
                    >
                      VIEW PROJECT
                    </a>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <a
                  href="https://github.com" // TODO: Replace with your GitHub
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 font-mono text-sm"
                >
                  VIEW ALL PROJECTS ON GITHUB →
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* About Modal */}
      <AnimatePresence>
        {activeSection === 'about' && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onSectionChange(null)}
          >
            <motion.div
              className="bg-black bg-opacity-90 border-2 border-pink-500 rounded-lg p-6 min-w-[400px] max-w-[500px]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-pink-500 font-mono">
                  {'>'} ABOUT.EXE
                </h2>
                <button
                  onClick={() => onSectionChange(null)}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Main UI overlay
function UIOverlay({ 
  activeSection, 
  onSectionChange,
  isWebGLSupported 
}: { 
  activeSection: string | null;
  onSectionChange: (section: string | null) => void;
  isWebGLSupported: boolean;
}) {
  return (
    <>
      {/* Top navigation */}
      <nav className="fixed top-0 left-0 right-0 z-30 p-6">
        <div className="flex justify-between items-center">
          <motion.h1 
            className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            YOUR NAME {/* TODO: Replace with your actual name */}
          </motion.h1>
          
          <div className="flex gap-4">
            <motion.button
              className="px-4 py-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors font-mono text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSectionChange(activeSection === 'help' ? null : 'help')}
            >
              HELP
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Help overlay */}
      <AnimatePresence>
        {activeSection === 'help' && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onSectionChange(null)}
          >
            <motion.div
              className="bg-gray-900 border border-cyan-400 rounded-lg p-8 max-w-md mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-cyan-400 mb-4">NAVIGATION</h2>
              <div className="space-y-2 text-gray-300 font-mono text-sm">
                <p>• Click LAPTOP → View Projects</p>
                <p>• Click DRONE → About Info</p>
                <p>• Click DOOR → Download Resume</p>
                <p>• Mouse/Touch → Rotate Camera</p>
                <p>• Scroll → Zoom In/Out</p>
                <p>• ESC → Close Modals</p>
              </div>
              <button
                className="mt-6 px-4 py-2 bg-cyan-400 text-black font-bold rounded hover:bg-cyan-300 transition-colors"
                onClick={() => onSectionChange(null)}
              >
                GOT IT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status indicator */}
      <div className="fixed bottom-6 left-6 z-30">
        <motion.div
          className="flex items-center gap-2 px-3 py-2 bg-black bg-opacity-60 border border-cyan-400 rounded font-mono text-xs text-cyan-400"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          NEURAL LINK ACTIVE
        </motion.div>
      </div>

      {/* Accessibility hint */}
      <div className="fixed bottom-6 right-6 z-30">
        <motion.p
          className="text-xs text-gray-500 font-mono max-w-xs text-right"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Press TAB to navigate between interactive objects
        </motion.p>
      </div>
    </>
  );
}

// WebGL support detection
function useWebGLSupport() {
  const [isSupported, setIsSupported] = useState(true);
  
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsSupported(!!gl);
    } catch (e) {
      setIsSupported(false);
    }
  }, []);
  
  return isSupported;
}

// Main component
export default function CyberPunkPortfolio() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [roomLoaded, setRoomLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isWebGLSupported = useWebGLSupport();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Respect prefers-reduced-motion
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (mounted) {
      const timer = setTimeout(() => {
        setLoading(false);
        // Give a bit more time for Room to load
        setTimeout(() => setRoomLoaded(true), 500);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [mounted]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveSection(null);
      }
      // TODO: Add Tab navigation between 3D objects
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) return null;

  // Show loading screen
  if (loading) {
    return <CyberLoader />;
  }

  // Fallback for unsupported browsers
  if (!isWebGLSupported) {
    return <StaticFallback />;
  }

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      {/* 3D Scene */}
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 2, 8], fov: 60 }}
        className="absolute inset-0"
        performance={{ min: 0.1 }}
        dpr={[1, 1.5]} // Limit pixel ratio for mobile performance
        gl={{ 
          antialias: false, // Disable for mobile performance
          alpha: false,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={null}>
          {roomLoaded && (
            <Room 
              onInteraction={setActiveSection}
              activeSection={activeSection}
              prefersReducedMotion={prefersReducedMotion}
            />
          )}
        </Suspense>
      </Canvas>

      {/* Loading indicator for 3D scene */}
      {!roomLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-cyan-400 font-mono text-sm animate-pulse">
            LOADING 3D INTERFACE...
          </div>
        </div>
      )}

      {/* UI Overlay */}
      <UIOverlay 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isWebGLSupported={isWebGLSupported}
      />

      {/* Modals outside Canvas */}
      <ModalsContainer 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
    </div>
  );
}