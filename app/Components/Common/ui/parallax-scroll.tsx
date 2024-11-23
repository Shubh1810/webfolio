"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "../../../lib/utils";

interface ParallaxScrollProps {
  images: string[];
  className?: string;
}

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({ images, className }) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef,
    offset: ['start start', 'end start'],
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <div className={cn('h-[40rem] overflow-y-auto w-full', className)} ref={gridRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10">
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              style={{ y: translateFirst }}
              key={`grid-1-${idx}`}
            >
              <Image
                src={el}
                className="h-80 w-full object-cover object-top rounded-lg"
                height={320}
                width={400}
                alt={`Image ${idx + 1}`}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div
              style={{ y: translateSecond }}
              key={`grid-2-${idx}`}
            >
              <Image
                src={el}
                className="h-80 w-full object-cover object-top rounded-lg"
                height={320}
                width={400}
                alt={`Image ${third + idx + 1}`}
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div
              style={{ y: translateThird }}
              key={`grid-3-${idx}`}
            >
              <Image
                src={el}
                className="h-80 w-full object-cover object-top rounded-lg"
                height={320}
                width={400}
                alt={`Image ${2 * third + idx + 1}`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};