"use client";
import React from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { cn } from "../../../lib/utils";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { HiHome, HiUser, HiMail, HiCreditCard } from 'react-icons/hi';
import { useScrollDirection } from '../../../hooks/useScrollDirection';

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
  const pathname = usePathname();
  const scrollDirection = useScrollDirection();
  const [isAtTop, setIsAtTop] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shouldShow = scrollDirection === 'up' || isAtTop;

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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ y: -100 }}
        animate={{
          y: shouldShow ? 0 : -100,
          opacity: shouldShow ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className={cn(
          "flex max-w-fit fixed top-6 left-0 right-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black/85 bg-white/85 backdrop-blur-md shadow-lg z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-5",
          !isAtTop && "shadow-[0_2px_8px_rgba(0,0,0,0.15)]",
          className
        )}
      >
        {navItems.map((navItem: NavItem, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              "relative dark:text-neutral-50 items-center flex space-x-2 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500",
              pathname === navItem.link && "text-violet-500 dark:text-violet-400",
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
