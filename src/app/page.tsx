'use client'

import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useTransform } from 'framer-motion'


export default function Portfolio() {
  const lenisRef = useRef<Lenis | null>(null)
  const { scrollY } = useScroll()
  
  // Mouse tracking eye state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [leftEyeCenter, setLeftEyeCenter] = useState({ x: 0, y: 0 })
  const [rightEyeCenter, setRightEyeCenter] = useState({ x: 0, y: 0 })
  
  // Optimized parallax transforms
  const y1 = useTransform(scrollY, [0, 300], [0, -50])
  const y2 = useTransform(scrollY, [0, 300], [0, -100])
  const opacity = useTransform(scrollY, [0, 200], [1, 0])

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

  const scrollToSection = (elementId: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(`#${elementId}`, {
        offset: 0,
        duration: 2,
        easing: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
      })
    }
  }

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
            <p className="text-base md:text-lg text-[#F5F5F0]/30 max-w-2xl mx-auto leading-relaxed">
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
                  className="absolute inset-0 bg-[#F5F5F0] shadow-lg"
                  style={{
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    filter: 'drop-shadow(0 0 8px rgba(245, 245, 240, 0.3))'
                  }}
                >
                  {/* Inner Triangle Eye Area */}
                  <div 
                    className="absolute bg-[#F5F5F0] opacity-90"
                    style={{
                      width: '70%',
                      height: '70%',
                      left: '15%',
                      top: '25%',
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                    }}
                  >
                    {/* Pupil */}
                    <div 
                      className="absolute bg-[#2D1810] rounded-full transition-all duration-150 ease-out"
                      style={{
                        width: '14px',
                        height: '14px',
                        left: '50%',
                        top: '60%',
                        transform: `translate(calc(-50% + ${leftPupil.x}px), calc(-50% + ${leftPupil.y}px))`
                      }}
                    >
                      {/* Light reflection */}
                      <div 
                        className="absolute bg-[#F5F5F0] rounded-full opacity-90"
                        style={{
                          width: '4px',
                          height: '4px',
                          left: '20%',
                          top: '20%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            {[
              { icon: '/insta.png', href: 'https://instagram.com/shubhsheth', label: 'Instagram' },
              { icon: '/pngegg.png', href: 'https://linkedin.com/in/shubhsheth', label: 'LinkedIn' },
              { 
                icon: (
                  <svg className="w-12 h-12 text-mocha-light" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                ), 
                href: 'https://x.com/shubhsheth', 
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
                {typeof social.icon === 'string' ? (
                  <img 
                    src={social.icon} 
                    alt={social.label}
                    className="w-12 h-12 object-contain"
                    style={{ filter: 'brightness(0) saturate(100%) invert(95%) sepia(6%) saturate(208%) hue-rotate(315deg) brightness(108%) contrast(94%)' }}
                  />
                ) : (
                  social.icon
                )}
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
                  className="absolute inset-0 bg-[#F5F5F0] shadow-lg"
                  style={{
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    filter: 'drop-shadow(0 0 8px rgba(245, 245, 240, 0.3))'
                  }}
                >
                  {/* Inner Triangle Eye Area */}
                  <div 
                    className="absolute bg-[#F5F5F0] opacity-90"
                    style={{
                      width: '70%',
                      height: '70%',
                      left: '15%',
                      top: '25%',
                      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                    }}
                  >
                    {/* Pupil */}
                    <div 
                      className="absolute bg-[#2D1810] rounded-full transition-all duration-150 ease-out"
                      style={{
                        width: '14px',
                        height: '14px',
                        left: '50%',
                        top: '60%',
                        transform: `translate(calc(-50% + ${rightPupil.x}px), calc(-50% + ${rightPupil.y}px))`
                      }}
                    >
                      {/* Light reflection */}
                      <div 
                        className="absolute bg-[#F5F5F0] rounded-full opacity-90"
                        style={{
                          width: '4px',
                          height: '4px',
                          left: '20%',
                          top: '20%'
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>


        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen flex items-center justify-center py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-7xl font-light mb-8 gradient-text bangers-regular">
            About Me
          </h2>
          <p className="text-xl md:text-1xl text-mocha-light/80 leading-relaxed mb-12 max-w-2xl mx-auto">
            I'm Shubh Sheth - passionate AI Engineer and CS Student monetizing AI Agents. 
            I specialize in creating multi-agentic AI systems that push the boundaries of what's possible in human-computer interaction.
          </p>
          
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
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl glass-effect hover-lift"
              >
                <span className="text-4xl mx-auto mb-4 block group-hover:scale-110 transition-transform duration-300">{feature.emoji}</span>
                <h3 className="text-xl font-semibold text-mocha-light mb-2">{feature.title}</h3>
                <p className="text-mocha-light/70">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen flex items-center justify-center py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-6xl mx-auto"
        >
                      <h2 className="text-5xl md:text-7xl font-light mb-16 gradient-text bangers-regular text-center">
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
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
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
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="min-h-screen flex items-center justify-center py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
                      <h2 className="text-5xl md:text-7xl font-light mb-16 gradient-text bangers-regular text-center">
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
            ].map((exp, index) => (
              <motion.div
                key={exp.company}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
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
              </motion.div>
            ))}
        </div>
        </motion.div>
      </section>

      {/* Education Section */}
      <section id="education" className="min-h-screen flex items-center justify-center py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-7xl font-light mb-16 gradient-text bangers-regular">
            Education
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
            ].map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.3, duration: 0.8 }}
                viewport={{ once: true }}
                className="p-8 rounded-2xl glass-effect hover-lift"
              >
                <span className="text-5xl mb-6 block">{edu.emoji}</span>
                <h3 className="text-2xl font-semibold text-mocha-light mb-2">{edu.degree}</h3>
                <p className="text-xl text-mocha-accent mb-2">{edu.field}</p>
                <p className="text-mocha-light/70 mb-2">{edu.school}</p>
                <p className="text-mocha-light/60 mb-4">{edu.year}</p>
                <p className="text-sm text-mocha-light/80">{edu.focus}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-12 p-6 rounded-2xl glass-effect"
          >
            <h3 className="text-xl font-semibold text-mocha-light mb-4">Certifications & Courses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-mocha-light/70">
              <div>• AWS Certified Solutions Architect</div>
              <div>• Google Cloud Professional ML Engineer</div>
              <div>• Advanced React & Next.js Specialization</div>
              <div>• Machine Learning Engineering Certification</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen flex items-center justify-center py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-7xl font-light mb-8 gradient-text bangers-regular">
            Let's Connect
          </h2>
          <p className="text-xl md:text-2xl text-mocha-light/80 leading-relaxed mb-12">
            Ready to build something amazing together? I'm always excited to discuss new opportunities and innovative projects.
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
            ].map((contact, index) => (
              <motion.a
                key={contact.title}
                href={contact.href}
          target="_blank"
          rel="noopener noreferrer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl glass-effect hover-lift block"
              >
                <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform duration-300">{contact.emoji}</span>
                <h3 className="text-xl font-semibold text-mocha-light mb-2">{contact.title}</h3>
                <p className="text-mocha-accent">{contact.value}</p>
              </motion.a>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => window.location.href = 'mailto:shubh@example.com'}
              className="px-12 py-4 bg-gradient-to-r from-mocha-accent to-mocha-light text-mocha-brown rounded-full font-medium text-lg hover-lift transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Conversation
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-16 text-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-mocha-light/60"
        >
          <p className="text-lg mb-4">Ready to build the future together?</p>
          <motion.button
            onClick={() => window.location.href = 'mailto:shubh@example.com'}
            className="px-8 py-3 bg-mocha-accent text-mocha-brown rounded-full font-medium hover-lift hover:bg-mocha-light transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Connect
          </motion.button>
        </motion.div>
      </footer>
    </div>
  )
}
