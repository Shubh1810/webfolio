// app/page.tsx
import React from 'react';
import HeroSection from './Components/HeroSection/HeroSection';
import { AnimatedSection } from './Components/Common/AnimatedSection';
import { TextHoverEffect } from './Components/Common/ui/text-hover-effect';
import { InfiniteMovingCards } from './Components/Common/ui/infinite-moving-cards';
import { FaStar, FaRegStar } from 'react-icons/fa';

const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },
 
  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },
 
  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },
 
  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

const items = [
  {
    quote: "Python",
    name: "Numpy | Pandas | Scikit-Learn | PyTorch | TensorFlow | FastAPI | Flask | MySQL | Requests | Matplotlib | Object-Oriented Programming | Design Patterns | Deep Learning | Data Structures & Algorithms | RESTful APIs | Docker | Kubernetes | Git | CI/CD Pipelines",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 5 ? 
          <FaStar key={i} className="text-violet-800/70" /> :
          <FaRegStar key={i} className="text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "JavaScript",
    name: "React.js | Next.js | Node.js | MongoDB",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 4 ? 
          <FaStar key={i} className="text-violet-800/70" /> :
          <FaRegStar key={i} className="text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "R",
    name: "R | R Shiny | ggplot2 | dplyr | tidyr | stringr | purrr | readr | lubridate | tidyverse",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 3 ? 
          <FaStar key={i} className="text-violet-800/70" /> :
          <FaRegStar key={i} className="text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "AWS",
    name: "AWS | EC2 | S3 | Lambda | CloudFront | CloudWatch | CloudTrail | CloudFormation",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 3 ? 
          <FaStar key={i} className="text-violet-800/70" /> :
          <FaRegStar key={i} className="text-violet-800/70" />
      ))}
    </div>,
  },
  {
    quote: "Docker",
    name: "Docker | Docker Compose | Docker Swarm | Docker Machine | Docker Hub",
    title: <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        i < 3 ? 
          <FaStar key={i} className="text-violet-800/70" /> :
          <FaRegStar key={i} className="text-violet-800/70" />
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
      <div className="relative mt-20">
        <InfiniteMovingCards
          items={items}
          direction="left"
          speed="fast"
          pauseOnHover={true}
        />
      </div>

      {/* TEST Content Section */}
      <AnimatedSection>
        <section id="about" className="mt-40 w-full px-4">
          <div className="text-[clamp(6rem,20vw,25rem)] font-[169] italic mb-20">
            <TextHoverEffect 
              text="TEST" 
              duration={0.4}
            />
          </div>
        </section>
        <section id="about" className="mt-40 w-full px-4">
          <div className="text-[clamp(6rem,20vw,25rem)] font-[169] italic mb-20">
            <TextHoverEffect 
              text="PROJECT89" 
              duration={0.4}
            />
          </div>
        </section>
      </AnimatedSection>

    </div>
  );
}