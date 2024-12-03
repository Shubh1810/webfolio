"use client";
// app/page.tsx
import React from 'react';
import HeroSection from './Components/HeroSection/HeroSection';
import { InfiniteMovingCards } from './Components/Common/ui/infinite-moving-cards';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { FocusCards } from './Components/Common/ui/focus-cards';


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
    name: "Numpy | Pandas | Scikit-Learn | PyTorch | FastAPI | Flask | MySQL | Requests | Matplotlib | Object-Oriented Programming | Design Patterns | Deep Learning | Data Structures & Algorithms | RESTful APIs | CI/CD Pipelines",
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
    name: "React.js | React Hooks | Next.js | Node.js | MongoDB",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 4 ? 
          <FaStar key={i} className="text-red-500 dark:text-violet-800/70" /> :
          <FaRegStar key={i} className="text-red-500 dark:text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "Developer Tools",
    name: "Git | GitHub | VSCode | Replit | Docker | Kubernetes | Vercel",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 5 ? 
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
    quote: "Machine Learning",
    name: "PyTorch | TensorFlow | TensorFlow.js | TensorFlow Lite | Scikit-Learn | Matplotlib | Keras | SciPy | OpenCV | PyTorch Lightning | PyTorch Geometric | PyTorch Transformers | PyTorch Text | PyTorch Vision | PyTorch Quantization | PyTorch Quantization Aware Training",
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

      {/* Education Section */}
      <div className="flex flex-col items-center justify-center max-w-[85rem] mx-auto w-full mt-32 md:mt-24 mb-32 md:mb-24 px-4 md:px-8 lg:px-16 bg-white dark:bg-black">
        <div className="flex items-center w-full max-w-4xl relative z-10">
          <motion.div 
            className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
          <div className="px-8">
            <motion.h1
              className="italic bg-clip-text text-transparent text-center bg-gradient-to-br from-gray-600 via-gray-500 to-gray-400 dark:from-gray-400 dark:via-gray-500 dark:to-gray-600 text-2xl md:text-4xl lg:text-5xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight whitespace-nowrap"
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
          <motion.div 
            className="h-[1px] w-full bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-100"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          />
        </div>
      </div>
      <section id="about" className="mt-16 mb-40 w-full px-4 md:px-8 lg:px-16">
        <FocusCards cards={cards} />
      </section>

    </div>
  );
}