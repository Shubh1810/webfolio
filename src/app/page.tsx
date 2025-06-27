'use client'

import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useTransform } from 'framer-motion'


export default function Portfolio() {
  const lenisRef = useRef<Lenis | null>(null)
  const { scrollY } = useScroll()
  
  // Theme state
  const [isDark, setIsDark] = useState(true)
  
  // Mouse tracking eye state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [leftEyeCenter, setLeftEyeCenter] = useState({ x: 0, y: 0 })
  const [rightEyeCenter, setRightEyeCenter] = useState({ x: 0, y: 0 })
  
  // Optimized parallax transforms
  const y1 = useTransform(scrollY, [0, 300], [0, -50])

  useEffect(() => {
    // Check for theme from localStorage and document class
    const savedTheme = localStorage.getItem('theme')
    const documentIsDark = document.documentElement.classList.contains('dark')
    setIsDark(savedTheme === 'dark' || documentIsDark)
    
    // Listen for theme changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'))
    })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Initialize Lenis with optimized settings for 2025
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
      autoRaf: true, // Use Lenis built-in RAF
    })

    // Mouse tracking for eye
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    const updateEyeCenters = () => {
      const leftEyeElement = document.getElementById('left-eye')
      const rightEyeElement = document.getElementById('right-eye')
      
      if (leftEyeElement) {
        const rect = leftEyeElement.getBoundingClientRect()
        setLeftEyeCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        })
      }
      
      if (rightEyeElement) {
        const rect = rightEyeElement.getBoundingClientRect()
        setRightEyeCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        })
      }
    }

    updateEyeCenters()
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', updateEyeCenters)
    window.addEventListener('resize', updateEyeCenters)

    // Cleanup on unmount
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy()
      }
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', updateEyeCenters)
      window.removeEventListener('resize', updateEyeCenters)
    }
  }, [])



  // Calculate pupil positions for both eyes
  const calculatePupilPosition = (eyeCenter: { x: number; y: number }) => {
    const deltaX = mousePos.x - eyeCenter.x
    const deltaY = mousePos.y - eyeCenter.y
    const angle = Math.atan2(deltaY, deltaX)
    const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY), 200)
    const maxDistance = 8 // Maximum distance pupil can move from center
    const normalizedDistance = Math.min(distance / 200, 1) * maxDistance
    
    return {
      x: Math.cos(angle) * normalizedDistance,
      y: Math.sin(angle) * normalizedDistance
    }
  }

  const leftPupil = calculatePupilPosition(leftEyeCenter)
  const rightPupil = calculatePupilPosition(rightEyeCenter)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">


        {/* Animated Background Elements */}
        <motion.div
          style={{ y: y1 }}
          className="absolute inset-0 opacity-20"
        >
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-mocha-accent/30 to-transparent blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-gradient-to-l from-mocha-accent/20 to-transparent blur-3xl" />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          className="text-center z-10 px-6 lg:mt-40"
        >
          {/* Tagline Above Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-4"
          >
            <p className={`text-sm md:text-base max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
              isDark ? 'text-[#F5F5F0]/30' : 'text-[#2D1810]/30'
            }`}>
              BUILDING AI PRODUCTS
            </p>
          </motion.div>

          {/* Signature Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-8"
          >
            
            <div className="text-9xl md:text-[10rem] lg:text-[15rem] amarante-regular text-mocha-light mb-0 tracking-[-0.1em]">
              Shubh
            </div>
            <div className="text-9xl md:text-[10rem] lg:text-[15rem] amarante-regular text-mocha-accent tracking-[-0.1em] -mt-8 md:-mt-12 lg:-mt-20">
              Sheth
            </div>
          </motion.div>

          {/* Social Links with Illuminati Eyes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center justify-center gap-6 mb-12"
          >
            {/* Left Illuminati Eye */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.4, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <div 
                id="left-eye"
                className="relative w-12 h-12"
              >
                {/* Triangle Container using CSS clip-path */}
                <div 
                  className="absolute inset-0 shadow-lg transition-colors duration-300"
                  style={{
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    backgroundColor: isDark ? '#F5F5F0' : '#2D1810',
                    filter: isDark
                      ? 'drop-shadow(0 0 8px rgba(245, 245, 240, 0.3))' 
                      : 'drop-shadow(0 0 8px rgba(245, 230, 216, 0.5))'
                  }}
                >
                  {/* Inner Triangle Eye Area */}
                  <div 
                    className="absolute opacity-90 transition-colors duration-300"
                    style={{
                      width: '70%',
                      height: '70%',
                      left: '15%',
                      top: '25%',
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                      backgroundColor: isDark ? '#F5F5F0' : '#2D1810'
                    }}
                  >
                    {/* Pupil */}
                    <div 
                      className="absolute rounded-full transition-all duration-150 ease-out"
                      style={{
                        width: '14px',
                        height: '14px',
                        left: '50%',
                        top: '60%',
                        backgroundColor: isDark ? '#2D1810' : '#F5F5F0',
                        transform: `translate(calc(-50% + ${leftPupil.x}px), calc(-50% + ${leftPupil.y}px))`
                      }}
                    >
                      {/* Light reflection */}
                      <div 
                        className="absolute rounded-full opacity-90 transition-colors duration-300"
                        style={{
                          width: '4px',
                          height: '4px',
                          left: '20%',
                          top: '20%',
                          backgroundColor: isDark ? '#F5F5F0' : '#2D1810'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {[
              { 
                icon: (
                  <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: isDark ? '#00E5FF' : '#22C55E' }}>
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.44z"/>
                  </svg>
                ), 
                href: 'https://instagram.com/shubh.sheth', 
                label: 'Instagram' 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: isDark ? '#00E5FF' : '#22C55E' }}>
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.30.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                ), 
                href: 'https://github.com/Shubh1810', 
                label: 'GitHub' 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: isDark ? '#00E5FF' : '#22C55E' }}>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ), 
                href: 'https://linkedin.com/in/shubhsheth', 
                label: 'LinkedIn' 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 md:w-12 md:h-12" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ color: isDark ? '#00E5FF' : '#22C55E' }}>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                ), 
                href: 'https://x.com/sheth_js', 
                label: 'X' 
              },
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
            target="_blank"
            rel="noopener noreferrer"
                className="group hover:scale-110 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                {social.icon}
              </motion.a>
            ))}

            {/* Right Illuminati Eye */}
            <motion.div
              initial={{ opacity: 0, scale: 0, rotate: 180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 1.6, duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <div 
                id="right-eye"
                className="relative w-12 h-12"
              >
                {/* Triangle Container using CSS clip-path */}
                <div 
                  className="absolute inset-0 shadow-lg transition-colors duration-300"
                  style={{
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    backgroundColor: isDark ? '#F5F5F0' : '#2D1810',
                    filter: isDark
                      ? 'drop-shadow(0 0 8px rgba(245, 245, 240, 0.3))' 
                      : 'drop-shadow(0 0 8px rgba(245, 230, 216, 0.5))'
                  }}
                >
                  {/* Inner Triangle Eye Area */}
                  <div 
                    className="absolute opacity-90 transition-colors duration-300"
                    style={{
                      width: '70%',
                      height: '70%',
                      left: '15%',
                      top: '25%',
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                      backgroundColor: isDark ? '#F5F5F0' : '#2D1810'
                    }}
                  >
                    {/* Pupil */}
                    <div 
                      className="absolute rounded-full transition-all duration-150 ease-out"
                      style={{
                        width: '14px',
                        height: '14px',
                        left: '50%',
                        top: '60%',
                        backgroundColor: isDark ? '#2D1810' : '#F5F5F0',
                        transform: `translate(calc(-50% + ${rightPupil.x}px), calc(-50% + ${rightPupil.y}px))`
                      }}
                    >
                      {/* Light reflection */}
                      <div 
                        className="absolute rounded-full opacity-90 transition-colors duration-300"
                        style={{
                          width: '4px',
                          height: '4px',
                          left: '20%',
                          top: '20%',
                          backgroundColor: isDark ? '#F5F5F0' : '#2D1810'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* About Me snippet */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            <p 
              className="text-md md:text-xl leading-relaxed max-w-2xl mx-auto mt-12 transition-colors duration-300"
              style={{
                color: isDark ? 'rgba(245, 245, 240, 0.8)' : '#000000'
              }}
            >
                I&apos;m Shubh Sheth - an AI engineer monetizing AI agents. 
                I specialize in converting multi-agentic autonomy into SaaS and enterprise revenue streams.
                </p>
          </motion.div>

        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="flex items-center justify-center py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <h2 
              className="text-4xl md:text-5xl font-light bangers-regular text-left mr-6"
              style={{
                color: isDark ? '#F5F5F0' : '#2D1810'
              }}
            >
              About
            </h2>
            <div 
              className="flex-1 h-px"
              style={{
                background: isDark ? 'rgba(245, 245, 240, 0.2)' : 'rgba(45, 24, 16, 0.2)'
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16">
            {/* Left Column - Description */}
            <div className="space-y-6">
              <p 
                className="text-lg leading-relaxed"
                style={{
                  color: isDark ? 'rgba(245, 245, 240, 0.8)' : '#000000'
                }}
              >
                My work sits at the intersection of large-scale <span className="font-semibold">AI systems</span>, autonomous multi-agent architectures, and product-led growth. I design both the interfaces and the back-end pipelines that <span className="font-semibold">turn cutting-edge products into revenue-generating applications</span>.
              </p>
             
            </div>

            {/* Right Column - Expertise Cards */}
            <div className="space-y-4">
            <p 
                className="text-lg leading-relaxed"
                style={{
                  color: isDark ? 'rgba(245, 245, 240, 0.8)' : '#000000'
                }}
              >
                I&apos;m pursuing a Bachelor of Science in Computer Science from Penn State University. That technical foundation combined with silicon valley exposure of shipping products that look elegant with go-to-market strategy.
              </p>
              {[
                {
                  title: 'Autonomous Agent Engineering',
                  description: 'Full-stack execution agents for real-world UI workflows'
                },
                {
                  title: 'Optimizing LLM Infra',
                  description: 'Low-latency inference pipelines for high-throughput environments'
                },
                {
                  title: 'AI Monetization',
                  description: 'Translating advanced ML systems into scalable revenue models'
                }
              ].map((expertise) => (
                <div
                  key={expertise.title}
                  className="p-6 rounded-2xl hover-lift transition-all duration-300"
                  style={{
                    backgroundColor: isDark ? '#FFFFFF' : '#2D1810',
                    color: isDark ? '#1A0F08' : '#FFFFFF'
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{expertise.title}</h3>
                    </div>
                    <div className="text-sm font-medium ml-4">
                      {expertise.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-light bangers-regular text-left mr-6"
              style={{
                color: isDark ? '#F5F5F0' : '#2D1810'
              }}
            >
              Projects
            </h2>
            <div 
              className="flex-1 h-px"
              style={{
                background: isDark ? 'rgba(245, 245, 240, 0.2)' : 'rgba(45, 24, 16, 0.2)'
              }}
            />
          </div>
          
          <div className="space-y-12">
            {[
              'TenderPost',
              'Knox AI'
            ].map((projectName) => (
              <motion.div
                key={projectName}
                className="group cursor-pointer w-full"
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                {/* Narrower Borderless Image Box */}
                <div 
                  className="w-1/2 mx-auto h-60 md:h-72 lg:h-80 overflow-hidden transition-all duration-300 rounded-lg"
                  style={{
                    backgroundColor: isDark ? '#00E5FF' : '#22C55E'
                  }}
                >
                  {/* Placeholder content - could be replaced with actual images */}
                  <div className="w-full h-full flex items-center justify-center">
                    <div 
                      className="text-4xl md:text-5xl font-bold"
                      style={{
                        color: 'rgba(255, 255, 255, 0.9)'
                      }}
                    >
                      {projectName}
                    </div>
                  </div>
                </div>
                
                {/* Project Title */}
                <h3 
                  className="text-2xl font-semibold mt-6 transition-colors duration-300"
                  style={{
                    color: isDark ? '#F5F5F0' : '#2D1810'
                  }}
                >
                  {projectName}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="flex items-center justify-center py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-light bangers-regular text-left mr-6"
              style={{
                color: isDark ? '#F5F5F0' : '#2D1810'
              }}
            >
              Experience
            </h2>
            <div 
              className="flex-1 h-px"
              style={{
                background: isDark ? 'rgba(245, 245, 240, 0.2)' : 'rgba(45, 24, 16, 0.2)'
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - AI Agent Project */}
            <div>
              <h3 
                className="text-2xl font-semibold mb-2"
                style={{
                  color: isDark ? '#F5F5F0' : '#2D1810'
                }}
              >
                Multi-Agent AI Systems
              </h3>
              <p 
                className="text-lg mb-6"
                style={{
                  color: isDark ? 'rgba(245, 245, 240, 0.6)' : 'rgba(45, 24, 16, 0.6)'
                }}
              >
                Independent Project • 2024
              </p>
              <p 
                className="text-base leading-relaxed"
                style={{
                  color: isDark ? 'rgba(245, 245, 240, 0.8)' : 'rgba(45, 24, 16, 0.8)'
                }}
              >
                Architected and built autonomous agent systems capable of complex workflow automation. Implemented real-time coordination between multiple AI agents using custom orchestration layers and distributed task management.
              </p>
            </div>

            {/* Right Column - AI Monetization Project */}
            <div>
              <h3 
                className="text-2xl font-semibold mb-2"
                style={{
                  color: isDark ? '#F5F5F0' : '#2D1810'
                }}
              >
                AI SaaS Platform Development
              </h3>
              <p 
                className="text-lg mb-6"
                style={{
                  color: isDark ? 'rgba(245, 245, 240, 0.6)' : 'rgba(45, 24, 16, 0.6)'
                }}
              >
                Startup Project • 2023-2024
              </p>
              <p 
                className="text-base leading-relaxed"
                style={{
                  color: isDark ? 'rgba(245, 245, 240, 0.8)' : 'rgba(45, 24, 16, 0.8)'
                }}
              >
                Designed and developed revenue-generating AI products from prototype to production. Built scalable infrastructure supporting machine learning pipelines and implemented monetization strategies for AI-powered applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Infinite Moving Banners */}
      <section className="py-16 overflow-hidden">
        {/* First Banner - Moving Right */}
        <div className="relative">
          {/* Left Edge Fade */}
          <div 
            className="absolute left-0 top-0 w-24 h-full z-10 pointer-events-none"
            style={{
              background: isDark 
                ? 'linear-gradient(to right, #0A0503 0%, rgba(10, 5, 3, 0.8) 50%, transparent 100%)' 
                : 'linear-gradient(to right, #F5E6D8 0%, rgba(245, 230, 216, 0.8) 50%, transparent 100%)'
            }}
          />
          {/* Right Edge Fade */}
          <div 
            className="absolute right-0 top-0 w-24 h-full z-10 pointer-events-none"
            style={{
              background: isDark 
                ? 'linear-gradient(to left, #0A0503 0%, rgba(10, 5, 3, 0.8) 50%, transparent 100%)' 
                : 'linear-gradient(to left, #F5E6D8 0%, rgba(245, 230, 216, 0.8) 50%, transparent 100%)'
            }}
          />
          <div className="flex whitespace-nowrap animate-scroll-right">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="flex items-center space-x-8 mr-8">
                <div className="flex items-center space-x-4">
                  <span 
                    className="text-6xl md:text-8xl exo-2 tracking-wider"
                    style={{
                      color: isDark ? '#CCFF00' : '#84CC16'
                    }}
                  >
                    AI
                  </span>
                  <svg 
                    className="w-8 h-8 md:w-12 md:h-12" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    style={{
                      color: isDark ? 'rgba(101, 50, 15, 0.3)' : 'rgba(75, 35, 10, 0.25)'
                    }}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span 
                    className="text-6xl md:text-8xl exo-2 tracking-wider"
                    style={{
                      color: isDark ? '#CCFF00' : '#84CC16'
                    }}
                  >
                    MONETIZATION
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <svg 
                    className="w-8 h-8 md:w-12 md:h-12" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    style={{
                      color: isDark ? 'rgba(101, 50, 15, 0.3)' : 'rgba(75, 35, 10, 0.25)'
                    }}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span 
                    className="text-6xl md:text-8xl exo-2 tracking-wider"
                    style={{
                      color: isDark ? '#CCFF00' : '#84CC16'
                    }}
                  >
                    SCALING
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second Banner - Moving Left */}
        <div className="relative">
          {/* Left Edge Fade */}
          <div 
            className="absolute left-0 top-0 w-24 h-full z-10 pointer-events-none"
            style={{
              background: isDark 
                ? 'linear-gradient(to right, #0A0503 0%, rgba(10, 5, 3, 0.8) 50%, transparent 100%)' 
                : 'linear-gradient(to right, #F5E6D8 0%, rgba(245, 230, 216, 0.8) 50%, transparent 100%)'
            }}
          />
          {/* Right Edge Fade */}
          <div 
            className="absolute right-0 top-0 w-24 h-full z-10 pointer-events-none"
            style={{
              background: isDark 
                ? 'linear-gradient(to left, #0A0503 0%, rgba(10, 5, 3, 0.8) 50%, transparent 100%)' 
                : 'linear-gradient(to left, #F5E6D8 0%, rgba(245, 230, 216, 0.8) 50%, transparent 100%)'
            }}
          />
          <div className="flex whitespace-nowrap animate-scroll-left">
            {Array.from({ length: 8 }, (_, i) => (
              <div key={i} className="flex items-center space-x-8 mr-8">
                <div className="flex items-center space-x-4">
                  <span 
                    className="text-6xl md:text-8xl exo-2 tracking-wider"
                    style={{
                      color: isDark ? '#CCFF00' : '#84CC16'
                    }}
                  >
                    PRODUCTIZATION
                  </span>
                  <svg 
                    className="w-8 h-8 md:w-12 md:h-12" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    style={{
                      color: isDark ? 'rgba(101, 50, 15, 0.3)' : 'rgba(75, 35, 10, 0.25)'
                    }}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span 
                    className="text-6xl md:text-8xl exo-2 tracking-wider"
                    style={{
                      color: isDark ? '#CCFF00' : '#84CC16'
                    }}
                  >
                    AI
                  </span>
                  <svg 
                    className="w-8 h-8 md:w-12 md:h-12" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    style={{
                      color: isDark ? 'rgba(101, 50, 15, 0.3)' : 'rgba(75, 35, 10, 0.25)'
                    }}
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span 
                    className="text-6xl md:text-8xl exo-2 tracking-wider"
                    style={{
                      color: isDark ? '#CCFF00' : '#84CC16'
                    }}
                  >
                    MONETIZATION
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="flex items-center justify-center py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-16">
            <h2 
              className="text-4xl md:text-5xl font-light bangers-regular text-left mr-6"
              style={{
                color: isDark ? '#F5F5F0' : '#2D1810'
              }}
            >
              Education
            </h2>
            <div 
              className="flex-1 h-px"
              style={{
                background: isDark ? 'rgba(245, 245, 240, 0.2)' : 'rgba(45, 24, 16, 0.2)'
              }}
            />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
            {/* Left Column - Master's Degree */}
            <div>
              <h3 
                className="text-2xl font-semibold mb-2"
                style={{
                  color: isDark ? '#F5F5F0' : '#2D1810'
                }}
              >
                Bachelor of Science in Computer Science
              </h3>
              <p 
                className="text-lg mb-6"
                style={{
                  color: isDark ? 'rgba(245, 245, 240, 0.6)' : 'rgba(45, 24, 16, 0.6)'
                }}
              >
                Penn State University
              </p>
              <p 
                className="text-base leading-relaxed"
                style={{
                  color: isDark ? 'rgba(245, 245, 240, 0.8)' : 'rgba(45, 24, 16, 0.8)'
                }}
              >
                Currently focused on distributed systems, autonomous agents, and AI infrastructure—building scalable systems that push the limits of real-world deployment.
              </p>
            </div>

            {/* Right Column - Bachelor's Degree */}
            <div>
              <h3 
                className="text-2xl font-semibold mb-2"
                style={{
                  color: isDark ? '#F5F5F0' : '#2D1810'
                }}
              >
                Associate of Science in Computer Science
              </h3>
              <p 
                className="text-lg mb-6"
                style={{
                  color: isDark ? 'rgba(245, 245, 240, 0.6)' : 'rgba(45, 24, 16, 0.6)'
                }}
              >
                Foothill College
              </p>
              <p 
                className="text-base leading-relaxed"
                style={{
                  color: isDark ? 'rgba(245, 245, 240, 0.8)' : 'rgba(45, 24, 16, 0.8)'
                }}
              >
                Graduated with a strong foundation in systems programming, machine learning, and software engineering—bridging deep technical fluency with applied product thinking.
              </p>
            </div>
          </div>
        </div>
      </section>

            {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center pt-0 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <h2 
              className="text-4xl md:text-5xl font-light bangers-regular text-left mr-6"
              style={{
                color: isDark ? '#F5F5F0' : '#2D1810'
              }}
            >
              Contact
            </h2>
            <div 
              className="flex-1 h-px"
              style={{
                background: isDark ? 'rgba(245, 245, 240, 0.2)' : 'rgba(45, 24, 16, 0.2)'
              }}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Contact Info */}
            <div className="space-y-4">
              <div>
                <p 
                  className="text-base leading-relaxed mb-6"
                  style={{
                    color: isDark ? 'rgba(245, 245, 240, 0.8)' : 'rgba(0, 0, 0, 0.8)'
                  }}
                >
                  Looking to start a project or you need consultation? Feel free to contact me.
                </p>
                
                <div className="space-y-3">
                  <div>
                    <p 
                      className="text-base"
                      style={{
                        color: isDark ? 'rgba(245, 245, 240, 0.9)' : 'rgba(0, 0, 0, 0.9)'
                      }}
                    >
                      San Francisco, CA, USA
                    </p>
                  </div>
                  
                  <div>
                    <a 
                      href="mailto:shethshubh@gmail.com"
                      className="text-base hover:underline transition-colors duration-300"
                      style={{
                        color: isDark ? '#00E5FF' : '#22C55E'
                      }}
                    >
                      shethshubh@gmail.com
                    </a>
                  </div>
                  
                  <div>
                    <a 
                      href="https://shubhsheth.info"
          target="_blank"
          rel="noopener noreferrer"
                      className="text-base hover:underline transition-colors duration-300"
                      style={{
                        color: isDark ? '#00E5FF' : '#22C55E'
                      }}
                    >
                      www.shubhsheth.info
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column - Contact Form */}
            <div className="space-y-4">
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-3 py-3 rounded-md border-0 focus:outline-none focus:ring-2 transition-all duration-300 text-sm"
                      style={{
                        backgroundColor: isDark ? 'rgba(245, 245, 240, 0.1)' : 'rgba(45, 24, 16, 0.1)',
                        color: isDark ? '#F5F5F0' : '#2D1810'
                      }}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full px-3 py-3 rounded-md border-0 focus:outline-none focus:ring-2 transition-all duration-300 text-sm"
                      style={{
                        backgroundColor: isDark ? 'rgba(245, 245, 240, 0.1)' : 'rgba(45, 24, 16, 0.1)',
                        color: isDark ? '#F5F5F0' : '#2D1810'
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <textarea
                    rows={6}
                    placeholder="Message..."
                    className="w-full px-4 py-4 rounded-2xl border-0 focus:outline-none focus:ring-2 transition-all duration-300 resize-none"
                    style={{
                      backgroundColor: isDark ? 'rgba(245, 245, 240, 0.1)' : 'rgba(45, 24, 16, 0.1)',
                      color: isDark ? '#F5F5F0' : '#2D1810'
                    }}
                  />
                </div>
                
                <motion.button
                  type="submit"
                  className="w-full py-3 rounded-md font-semibold text-base transition-all duration-300 hover-lift"
                  style={{
                    backgroundColor: isDark ? '#00E5FF' : '#22C55E',
                    color: isDark ? '#1A0F08' : '#FFFFFF'
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send
                </motion.button>
              </form>
            </div>
          </div>
        </div>
      </section>


    </div>
  )
}
