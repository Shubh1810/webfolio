"use client";
// app/page.tsx
import React from 'react';
import HeroSection from './Components/HeroSection/HeroSection';
import { InfiniteMovingCards } from './Components/Common/ui/infinite-moving-cards';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FocusCards } from './Components/Common/ui/focus-cards';
import { useScreenSize } from './hooks/useScreenSize';
import { SparklesCore } from './Components/Common/ui/sparkles';
const cards = [
  {
    title: "Penn State University",
    description: "B.S. in Computer Science and Engineering",
    src: "/psu.jpg",
    logo: {
      dark: "/psu-white.png",
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
    quote: "TypeScript",
    name: "React.js | React Hooks | React Toolkit | Next.js | Node.js ",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 3 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "Developer Tools",
    name: "Git | GitHub | VSCode | Jupyter Notebook | Eclipse  ",
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
        i < 4 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "AI",
    name: "LangChain | LangFlow | PyTorch | TensorFlow | TensorFlow.js | TensorFlow Lite | Scikit-Learn | Keras | SciPy | OpenCV | Tesseract  ",
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
    name: " Microservices | Domain-driven design",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 4 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,
  },
];



export default function HomePage() {
  const isMobile = useScreenSize();

  return (
    <div className="relative w-full">
      {/* Hero Section with Vanta */}
      <div className="relative">
        <HeroSection />
      </div>

      {/* Moving Cards Section */}
      <div className="relative mt-20 overflow-hidden w-screen">
        <div className="max-w-[180rem] mx-auto px-8 md:px-12 lg:px-16">
          <InfiniteMovingCards
            key={isMobile ? 'fast-mode' : 'normal-mode'}
            items={items}
            direction="left"
            speed={isMobile ? "fast" : "normal"}
            pauseOnHover={true}
          />
        </div>
      </div>

      {/* Education Section */}
      <div className="flex flex-col items-center justify-center max-w-[85rem] mx-auto w-full mt-32 md:mt-24 mb-32 md:mb-24 px-4 md:px-8 lg:px-16">
        <motion.div 
          className="relative flex items-center w-full max-w-4xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Heading Container */}
          <div className="relative px-8 py-4 w-full">
            {/* Heading Text */}
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4 text-center"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Education
            </motion.h1>

            {/* Sparkles Container */}
            <div className="flex justify-center w-full">
              <div className="w-full max-w-[40rem] h-20 relative">
                {/* Theme-responsive gradients */}
                <div className="absolute left-0 right-0 top-0 bg-gradient-to-r from-transparent via-yellow-500 dark:via-indigo-500 to-transparent h-[2px] w-3/4 mx-auto blur-sm" />
                <div className="absolute left-0 right-0 top-0 bg-gradient-to-r from-transparent via-orange-500 dark:via-indigo-500 to-transparent h-px w-3/4 mx-auto" />
                <div className="absolute left-0 right-0 top-0 bg-gradient-to-r from-transparent via-red-500 dark:via-sky-500 to-transparent h-[5px] w-1/4 mx-auto blur-sm" />
                <div className="absolute left-0 right-0 top-0 bg-gradient-to-r from-transparent via-red-500 dark:via-sky-500 to-transparent h-px w-1/4 mx-auto" />

                {/* Core component */}
                <SparklesCore
                  background="transparent"
                  minSize={0.4}
                  maxSize={1}
                  particleDensity={1200}
                  className="w-full h-full dark:invert"
                  particleColor="rgba(0, 0, 0, 0.7)"
                />

                {/* Radial Gradient */}
                <div className="absolute inset-0 w-full h-full bg-white dark:bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <section id="about" className="mt-16 mb-40 w-full px-4 md:px-8 lg:px-16">
        <FocusCards cards={cards} />
      </section>

    </div>
  );
}