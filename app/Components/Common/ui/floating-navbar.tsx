"use client";
import React from "react";
import { cn } from "../../../lib/utils";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { HiHome, HiCode, HiSun, HiMoon } from 'react-icons/hi';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { SignupFormDemo } from "@/app/Components/Common/ui/SignupForm";

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
  const { theme, setTheme } = useTheme();
  const [showSignup, setShowSignup] = React.useState(false);

  const navItems: NavItem[] = [
    {
      name: "",
      link: "/",
      icon: <HiHome className="w-5 h-5" />,
    },
    {
      name: "",
      link: "/projects",
      icon: <HiCode className="w-5 h-5" />,
    },
    {
      name: "",
      link: "/none",
      icon: (
        <Image 
          src="/usdc-logo.png"  // Adjust path to match your asset location
          alt="USDC"
          width={20}
          height={20}
          className="w-5 h-5"
        />
      ),
    },
  ];

  return (
    <>
      <div
        className={cn(
          "flex max-w-full top-0 left-0 right-0",
          "dark:bg-black/85 bg-white/85 backdrop-blur-md",
          "z-50 px-8 py-2 items-center justify-between",
          "relative h-16",
          "max-w-[95rem] mx-auto",
          className
        )}
      >
        <div className="flex items-center space-x-5">
          {navItems.map((navItem: NavItem, idx: number) => (
            <Link
              key={`link=${idx}`}
              href={navItem.link}
              className={cn(
                "relative dark:text-neutral-50 items-center flex space-x-2 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500",
                pathname === navItem.link && "text-red-500 dark:text-violet-400",
                "text-sm md:text-base",
                "transition-all duration-500",
                "hover:drop-shadow-[0_0_15px_rgba(239,68,68,0.7)] dark:hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.7)]",
                "after:absolute after:h-[150%] after:w-[150%] after:rounded-full after:-z-10",
                "after:opacity-0 hover:after:opacity-100",
                "after:transition-opacity after:duration-300",
                "after:bg-gradient-to-r after:from-red-500/30 after:via-red-500/30 after:to-red-500/30 dark:after:from-blue-500/30 dark:after:via-violet-500/30 dark:after:to-blue-500/30",
                "after:blur-xl",
                "hover:after:animate-pulse",
                "before:absolute before:h-[120%] before:w-[120%] before:rounded-full before:-z-10",
                "before:opacity-0 hover:before:opacity-100",
                "before:transition-opacity before:duration-300",
                "before:bg-gradient-to-r before:from-red-400/40 before:via-red-400/40 before:to-red-400/40 dark:before:from-blue-400/40 dark:before:via-violet-400/40 dark:before:to-blue-400/40",
                "before:blur-lg",
                "before:hover:animate-pulse"
              )}
            >
              {navItem.icon}
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={cn(
              "p-2 rounded-full",
              "transition-all duration-500",
              "hover:drop-shadow-[0_0_15px_rgba(139,92,246,0.7)]",
              "text-neutral-600 dark:text-neutral-50",
              "hover:text-neutral-500 dark:hover:text-neutral-300"
            )}
          >
            {theme === 'dark' ? (
              <HiSun className="w-5 h-5" />
            ) : (
              <HiMoon className="w-5 h-5" />
            )}
          </button>
          {pathname === '/beta' && (
            <button 
              onClick={() => setShowSignup(true)}
              className={cn(
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
          )}
        </div>
      </div>

      {showSignup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="relative">
            <button 
              onClick={() => setShowSignup(false)}
              className="absolute top-2 right-2 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
            >
              ✕
            </button>
            <SignupFormDemo />
          </div>
        </div>
      )}
    </>
  );
};
