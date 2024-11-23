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
        className
      )}
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFF1D6_0%,#DAA520_50%,#FFEFD1_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-transparent px-6 py-1 text-sm font-medium text-white backdrop-brightness-0">
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
