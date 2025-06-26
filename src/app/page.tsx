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
          className="text-center z-10 px-6 lg:mt-60"
        >
          {/* Tagline Above Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-8"
          >
            <p className={`text-base md:text-lg max-w-2xl mx-auto leading-relaxed transition-colors duration-300 ${
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
                      : 'drop-shadow(0 0 8px rgba(45, 24, 16, 0.3))'
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
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-mocha-light" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                ), 
                href: 'https://instagram.com/shubh.sheth', 
                label: 'Instagram' 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-mocha-light" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                ), 
                href: 'https://github.com/Shubh1810', 
                label: 'GitHub' 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-mocha-light" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ), 
                href: 'https://linkedin.com/in/shubhsheth', 
                label: 'LinkedIn' 
              },
              { 
                icon: (
                  <svg className="w-10 h-10 md:w-12 md:h-12 text-mocha-light" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
                      : 'drop-shadow(0 0 8px rgba(45, 24, 16, 0.3))'
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
            <p className="text-xl md:text-1xl text-mocha-light/80 leading-relaxed max-w-2xl mx-auto mt-12">
                I&apos;m Shubh Sheth - passionate AI Engineer and CS Student monetizing AI Agents. 
                I specialize in creating multi-agentic AI systems that push the boundaries of what&apos;s possible in human-computer interaction.
            </p>
          </motion.div>

        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-light mb-8 gradient-text bangers-regular text-left">
            About Me
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {[
              {
                emoji: '🤖',
                title: 'AI Engineering',
                description: 'Multi-agent systems, LLMs, and intelligent automation'
              },
              {
                emoji: '💻',
                title: 'Full-Stack Development',
                description: 'React, Next.js, Node.js, and modern web technologies'
              },
              {
                emoji: '🚀',
                title: 'Product Innovation',
                description: 'From concept to deployment, building products that matter'
              }
            ].map((feature) => (
              <div
                key={feature.title}
                className="group p-6 rounded-2xl glass-effect hover-lift text-left"
              >
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">{feature.emoji}</span>
                <h3 className="text-xl font-semibold text-mocha-light mb-2">{feature.title}</h3>
                <p className="text-mocha-light/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center py-32 px-6">
        <div className="max-w-4xl mx-auto">
                      <h2 className="text-5xl md:text-7xl font-light mb-16 gradient-text bangers-regular text-left">
              Projects
            </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {[
              {
                emoji: '🤖',
                title: 'Multi-Agent AI Platform',
                description: 'Advanced AI system with multiple specialized agents working together to solve complex problems.',
                tech: ['Python', 'LangChain', 'FastAPI', 'React'],
                status: 'In Development'
              },
              {
                emoji: '💬',
                title: 'Smart Chat Interface',
                description: 'Intelligent conversation platform with context awareness and personalized responses.',
                tech: ['Next.js', 'TypeScript', 'OpenAI', 'Tailwind'],
                status: 'Live'
              },
              {
                emoji: '📊',
                title: 'AI Analytics Dashboard',
                description: 'Real-time analytics platform powered by machine learning insights and predictive modeling.',
                tech: ['React', 'D3.js', 'Node.js', 'MongoDB'],
                status: 'Completed'
              },
              {
                emoji: '🔗',
                title: 'API Orchestration System',
                description: 'Microservices architecture with intelligent routing and load balancing capabilities.',
                tech: ['Node.js', 'Docker', 'Kubernetes', 'GraphQL'],
                status: 'Live'
              }
            ].map((project) => (
              <div
                key={project.title}
                className="group p-8 rounded-2xl glass-effect hover-lift"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{project.emoji}</span>
                  <span className="text-sm text-mocha-accent px-3 py-1 rounded-full glass-effect">
                    {project.status}
                  </span>
                </div>
                <h3 className="text-2xl font-semibold text-mocha-light mb-4">{project.title}</h3>
                <p className="text-mocha-light/70 mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="text-xs text-mocha-accent px-2 py-1 rounded-md glass-effect">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center py-32 px-6">
        <div className="max-w-4xl mx-auto">
                      <h2 className="text-5xl md:text-7xl font-light mb-16 gradient-text bangers-regular text-left">
              Experience
            </h2>
          
          <div className="space-y-12">
            {[
              {
                company: 'AI Innovations Inc.',
                role: 'Senior AI Engineer',
                period: '2022 - Present',
                description: 'Leading development of multi-agentic AI systems and machine learning infrastructure. Built scalable AI solutions serving 100K+ users.',
                achievements: ['Led team of 8 engineers', 'Increased model accuracy by 35%', 'Reduced inference time by 60%']
              },
              {
                company: 'TechFlow Solutions',
                role: 'Full-Stack Developer',
                period: '2020 - 2022',
                description: 'Developed and maintained web applications using modern JavaScript frameworks. Collaborated with cross-functional teams to deliver high-quality products.',
                achievements: ['Built 12+ production applications', 'Improved page load times by 45%', 'Mentored 5 junior developers']
              },
              {
                company: 'Digital Dynamics',
                role: 'Frontend Developer',
                period: '2018 - 2020',
                description: 'Created responsive web interfaces and interactive user experiences. Specialized in React ecosystem and modern CSS frameworks.',
                achievements: ['Delivered 20+ client projects', 'Achieved 98% client satisfaction', 'Implemented design systems']
              }
            ].map((exp) => (
              <div
                key={exp.company}
                className="p-8 rounded-2xl glass-effect hover-lift"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-mocha-light">{exp.role}</h3>
                    <p className="text-xl text-mocha-accent">{exp.company}</p>
                  </div>
                  <span className="text-mocha-light/60 mt-2 md:mt-0">{exp.period}</span>
                </div>
                <p className="text-mocha-light/80 mb-4 leading-relaxed">{exp.description}</p>
                <div className="space-y-2">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center text-mocha-light/70">
                      <span className="text-mocha-accent mr-2">•</span>
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>
            ))}
        </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="min-h-screen flex items-center justify-center py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-light mb-16 gradient-text bangers-regular text-left">
            Education
          </h2>
          <div className="space-y-12">
            {/* Using Flexbox for a robust two-column layout */}
            <div className="flex flex-col md:flex-row gap-8">
              {[
                {
                  emoji: '🎓',
                  degree: 'Master of Science',
                  field: 'Computer Science',
                  school: 'Tech University',
                  year: '2018',
                  focus: 'Artificial Intelligence & Machine Learning'
                },
                {
                  emoji: '📚',
                  degree: 'Bachelor of Engineering',
                  field: 'Software Engineering',
                  school: 'Engineering College',
                  year: '2016',
                  focus: 'Web Development & Database Systems'
                }
              ].map((edu) => (
                <div
                  key={edu.degree}
                  className="p-8 rounded-2xl glass-effect hover-lift text-left flex-1"
                >
                  <span className="text-5xl mb-6 block">{edu.emoji}</span>
                  <h3 className="text-2xl font-semibold text-mocha-light mb-2">{edu.degree}</h3>
                  <p className="text-xl text-mocha-accent mb-2">{edu.field}</p>
                  <p className="text-mocha-light/70 mb-2">{edu.school}</p>
                  <p className="text-mocha-light/60 mb-4">{edu.year}</p>
                  <p className="text-sm text-mocha-light/80">{edu.focus}</p>
                </div>
              ))}
            </div>
            
            <div className="p-6 rounded-2xl glass-effect text-left">
              <h3 className="text-xl font-semibold text-mocha-light mb-4">Certifications & Courses</h3>
              {/* Using a standard grid for certifications */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-mocha-light/70">
                <div>• AWS Certified Solutions Architect</div>
                <div>• Google Cloud Professional ML Engineer</div>
                <div>• Advanced React & Next.js Specialization</div>
                <div>• Machine Learning Engineering Certification</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-light mb-8 gradient-text bangers-regular text-left">
            Let&apos;s Connect
          </h2>
          <p className="text-xl md:text-2xl text-mocha-light/80 leading-relaxed mb-12">
            Ready to build something amazing together? I&apos;m always excited to discuss new opportunities and innovative projects.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                emoji: '📧',
                title: 'Email',
                value: 'shubh@example.com',
                href: 'mailto:shubh@example.com'
              },
              {
                emoji: '💼',
                title: 'LinkedIn',
                value: 'linkedin.com/in/shubhsheth',
                href: 'https://linkedin.com/in/shubhsheth'
              },
              {
                emoji: '💻',
                title: 'GitHub',
                value: 'github.com/shubhsheth',
                href: 'https://github.com/shubhsheth'
              }
            ].map((contact) => (
              <a
                key={contact.title}
                href={contact.href}
          target="_blank"
          rel="noopener noreferrer"
                className="group p-6 rounded-2xl glass-effect hover-lift block"
              >
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">{contact.emoji}</span>
                <h3 className="text-xl font-semibold text-mocha-light mb-2">{contact.title}</h3>
                <p className="text-mocha-accent">{contact.value}</p>
              </a>
            ))}
          </div>
          
          <div>
            <motion.button
              onClick={() => window.location.href = 'mailto:shubh@example.com'}
              className="px-12 py-4 bg-gradient-to-r from-mocha-accent to-mocha-light text-mocha-brown rounded-full font-medium text-lg hover-lift transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Conversation
            </motion.button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center">
        <div className="text-mocha-light/60">
          <p className="text-lg mb-4">Ready to build the future together?</p>
                      <motion.button
              onClick={() => window.location.href = 'mailto:shubh@example.com'}
              className="px-8 py-3 bg-mocha-accent text-mocha-brown rounded-full font-medium hover-lift hover:bg-mocha-light transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let&apos;s Connect
            </motion.button>
        </div>
      </footer>
    </div>
  )
}
