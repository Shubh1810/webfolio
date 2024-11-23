// app/about/page.tsx
import React from 'react';
import { AnimatedSection } from '../Components/Common/AnimatedSection';
import Image from 'next/image';

const AboutPage: React.FC = () => {
  return (
    <AnimatedSection>
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Me</h1>
          <div className="flex flex-col md:flex-row items-center justify-center mb-6">
            <div className="w-48 h-48 md:w-64 md:h-64 mb-6 md:mb-0">
              <Image
                src="/profile.jpeg"
                alt="Your Name"
                className="rounded-full object-cover"
                width={256}
                height={256}
              />
            </div>
            <div className="md:ml-8">
              <p className="text-lg md:text-xl mb-4">
                Hello! I&apos;m Shubh Sheth, a passionate Web Developer & Designer with a knack for creating sleek and user-friendly websites. I specialize in building responsive and interactive web applications using modern technologies like Next.js, React, and Tailwind CSS.
              </p>
              <p className="text-lg md:text-xl">
                My journey in web development has equipped me with the skills to tackle complex challenges and deliver solutions that not only meet but exceed client expectations. I&apos;m always eager to learn and embrace new technologies to enhance my craft.
              </p>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            <a
              href="mailto:your.email@example.com"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
            >
              Get in Touch
            </a>
            <a
              href="/resume.pdf" // Ensure this path points to your resume
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-700 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded"
            >
              View Resume
            </a>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default AboutPage;