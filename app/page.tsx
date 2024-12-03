"use client";
// app/page.tsx
import React from 'react';
import HeroSection from './Components/HeroSection/HeroSection';
import { AnimatedSection } from './Components/Common/AnimatedSection';
import { InfiniteMovingCards } from './Components/Common/ui/infinite-moving-cards';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FocusCards } from './Components/Common/ui/focus-cards';

const cards = [
  {
    title: "Penn State University",
    description: "B.S. in Computer Science and Engineering",
    src: "/psu.jpg",
    logo: "/psu-logo.png",
  },
  {
    title: "Foothill College",
    description: "Computer Science",
    src: "/foothillW.jpg",
    logo: "/foothill.png",
  },
  {
    title: "Cathedral Vidya School",
    description: "IB Diploma Programme",
    src: "/cvsl-4.jpg",
    logo: "/cvsl.png",
  },
]

const items = [
  {
    quote: "Python",
    name: "Numpy | Pandas | Scikit-Learn | PyTorch | TensorFlow | FastAPI | Flask | MySQL | Requests | Matplotlib | Object-Oriented Programming | Design Patterns | Deep Learning | Data Structures & Algorithms | RESTful APIs | Docker | Kubernetes | Git | CI/CD Pipelines",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 5 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "JavaScript",
    name: "React.js | Next.js | Node.js | MongoDB",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 4 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "R",
    name: "R | R Shiny | ggplot2 | dplyr | tidyr | stringr | purrr | readr | lubridate | tidyverse",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 2 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "AWS",
    name: "AWS | EC2 | S3 | Lambda | CloudFront | CloudWatch | CloudTrail | CloudFormation",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 2 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "Docker",
    name: "Docker | Docker Compose | Docker Swarm | Docker Machine | Docker Hub",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 3 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,
  },
];

export default function HomePage() {
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
            items={items}
            direction="left"
            speed="fast"
            pauseOnHover={true}
          />
        </div>
      </div>

      {/* TEST Content Section */}
      <AnimatedSection>
        <div className="flex flex-col items-center justify-center max-w-[85rem] mx-auto w-full mt-20 md:mt-10 px-4 md:px-8 lg:px-16">
          <motion.h1
            className="bg-clip-text text-transparent text-center bg-gradient-to-br from-black via-gray-700 to-gray-800 dark:from-gray-100 dark:via-gray-300 dark:to-gray-500 text-2xl md:text-4xl lg:text-5xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
          >
            Education
          </motion.h1>
        </div>
        <section id="about" className="mt-10 mb-40 w-full px-4">
          <FocusCards cards={cards} />
        </section>
      </AnimatedSection>

    </div>
  );
}