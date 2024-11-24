"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../../lib/utils";
import Link from "next/link";
import { HiHome, HiUser, HiMail, HiCreditCard } from 'react-icons/hi';

// Define a type for nav items
interface NavItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

export const FloatingNav = ({
  className,
}: {
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  const navItems: NavItem[] = [
    {
      name: "",
      link: "/",
      icon: <HiHome className="w-5 h-5" />,
    },
    {
      name: "",
      link: "/about",
      icon: <HiUser className="w-5 h-5" />,
    },
    {
      name: "",
      link: "/contact",
      icon: <HiMail className="w-5 h-5" />,
    },
    {
      name: "",
      link: "/billing",
      icon: <HiCreditCard className="w-5 h-5" />,
    },
  ];

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const direction = current! - scrollYProgress.getPrevious()!;

      if (direction > 0) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn(
            "flex max-w-fit fixed top-6 left-0 right-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-5",
            className
        )}
      >
        {navItems.map((navItem: NavItem, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-2 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500",
              "text-sm md:text-base",
              "transition-all duration-500",
              "hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.7)]",
              "after:absolute after:h-[150%] after:w-[150%] after:rounded-full after:-z-10",
              "after:opacity-0 hover:after:opacity-100",
              "after:transition-opacity after:duration-300",
              "after:bg-gradient-to-r after:from-blue-500/30 after:via-violet-500/30 after:to-blue-500/30",
              "after:blur-xl",
              "hover:after:animate-pulse",
              "before:absolute before:h-[120%] before:w-[120%] before:rounded-full before:-z-10",
              "before:opacity-0 hover:before:opacity-100",
              "before:transition-opacity before:duration-300",
              "before:bg-gradient-to-r before:from-blue-400/40 before:via-violet-400/40 before:to-blue-400/40",
              "before:blur-lg",
              "before:hover:animate-pulse"
            )}
          >
            {navItem.icon}
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        <button className={cn(
          "text-xs md:text-sm",
          "border font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full",
          "transition-all duration-500",
          "hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.7)]",
          "after:absolute after:h-[150%] after:w-[150%] after:rounded-full after:-z-10 after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2",
          "after:opacity-0 hover:after:opacity-100",
          "after:transition-opacity after:duration-300",
          "after:bg-gradient-to-r after:from-blue-500/30 after:via-violet-500/30 after:to-blue-500/30",
          "after:blur-xl",
          "hover:after:animate-pulse",
          "before:absolute before:h-[120%] before:w-[120%] before:rounded-full before:-z-10 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2",
          "before:opacity-0 hover:before:opacity-100",
          "before:transition-opacity before:duration-300",
          "before:bg-gradient-to-r before:from-blue-400/40 before:via-violet-400/40 before:to-blue-400/40",
          "before:blur-lg",
          "before:hover:animate-pulse"
        )}>
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-violet-500 to-transparent h-px animate-glow" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
