"use client";
import React from "react";
import { cn } from "../../../lib/utils";

interface ButtonProps {
  text: string;
  href: string;
  icon: React.ReactNode;
  className?: string;
}

export const Button = ({
  text,
  href,
  icon,
  className,
}: ButtonProps) => {
  return (
    <a 
      href={href}
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[1px]",
        "focus:outline-none focus:ring-2 focus:ring-slate-400",
        "focus:ring-offset-2 focus:ring-offset-slate-50",
        "shadow-[0_0_2rem_-0.5rem_#ef4444] dark:shadow-[0_0_2rem_-0.5rem_#6366f1]",
        "hover:shadow-[0_0_3rem_-0.5rem_#22c55e] dark:hover:shadow-[0_0_3rem_-0.5rem_#818cf8]",
        className
      )}
    >
      <span className={cn(
        "absolute inset-[-1000%]",
        "animate-[spin_2s_linear_infinite]",
        "bg-[conic-gradient(from_90deg_at_50%_50%,#ef4444_0%,#f59e0b_50%,#22c55e_100%)]",
        "dark:bg-[conic-gradient(from_90deg_at_50%_50%,#818cf8_0%,#6366f1_50%,#a855f7_100%)]"
      )} />
      <span className={cn(
        "inline-flex h-full w-full cursor-pointer items-center justify-center",
        "rounded-full px-6 py-1 text-sm font-medium",
        "bg-slate-50/80 backdrop-blur-3xl dark:bg-slate-950/80",
        "text-black dark:text-white",
        "transition-all duration-300",
        "hover:text-[#422006] dark:hover:text-[#e0e7ff]"
      )}>
        <span className="flex items-center gap-2">
          {text}
          {icon && (
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              {icon}
            </span>
          )}
        </span>
      </span>
    </a>
  );
};
