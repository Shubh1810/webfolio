"use client";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "../../../lib/utils";

type Logo = string | {
  dark: string;
  light: string;
};

type Card = {
  title: string;
  src: string;
  description: string;
  logo: Logo;
};

// Function to get the correct logo based on the theme
const getLogo = (logo: Logo): string => {
  if (typeof logo === 'string') {
    return logo;
  }
  return logo.dark; // Always use dark theme logo
};

export const Card = React.memo(
  ({
    card,
    index,
    hovered,
    setHovered,
  }: {
    card: Card;
    index: number;
    hovered: number | null;
    setHovered: React.Dispatch<React.SetStateAction<number | null>>;
  }) => {
    // Function to get overlay color based on card title
    const getOverlayColor = (title: string) => {
      switch (title) {
        case "Penn State University":
          return "bg-blue-950/80";
        case "Foothill College":
          return "bg-red-950/80";
        case "Cathedral Vidya School":
          return "bg-violet-950/80";
        case "CP Goenka International School":
          return "bg-green-950/80";
        default:
          return "bg-black/80";
      }
    };

    // Function to get shadow color based on card title
    const getShadowColor = (title: string) => {
      switch (title) {
        case "Penn State University":
          return "shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:shadow-[0_30px_60px_rgba(8,_112,_184,_0.5)]";
        case "Foothill College":
          return "shadow-[0_20px_50px_rgba(220,_38,_38,_0.7)] hover:shadow-[0_30px_60px_rgba(220,_38,_38,_0.5)]";
        case "Cathedral Vidya School":
          return "shadow-[0_20px_50px_rgba(139,_92,_246,_0.7)] hover:shadow-[0_30px_60px_rgba(139,_92,_246,_0.5)]";
        case "CP Goenka International School":
          return "shadow-[0_20px_50px_rgba(34,_197,_94,_0.7)] hover:shadow-[0_30px_60px_rgba(34,_197,_94,_0.5)]";
        default:
          return "shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] hover:shadow-[0_30px_60px_rgba(8,_112,_184,_0.5)]";
      }
    };

    // Get logo size based on title
    const getLogoSize = (title: string) => {
      if (title === "Cathedral Vidya School") {
        return {
          width: 80,  // Smaller size for CVSL
          height: 60
        };
      }
      return {
        width: 120,  // Default size for other logos
        height: 80
      };
    };

    const logoSize = getLogoSize(card.title);

    return (
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div className="absolute -top-12 z-20 w-32 h-24 flex items-center justify-center">
          <Image
            src={getLogo(card.logo)}
            alt={`${card.title} logo`}
            width={logoSize.width}
            height={logoSize.height}
            className="object-contain drop-shadow-md hover:drop-shadow-xl transition-all duration-300"
          />
        </div>
        
        {/* Card */}
        <div
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className={cn(
            "rounded-lg relative bg-neutral-900 overflow-hidden h-60 md:h-96 w-full",
            "transition-all duration-500 ease-out",
            getShadowColor(card.title),
            "hover:-translate-y-2",
            "mt-12",
            hovered !== null && hovered !== index && "blur-sm scale-[0.98] opacity-70"
          )}
        >
          <Image
            src={card.src}
            alt={card.title}
            aria-label={card.description}
            fill
            className="object-cover absolute inset-0"
          />
          <div 
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              getOverlayColor(card.title),
              hovered === index ? "opacity-100" : "opacity-0"
            )}
          />
          <div 
            className={cn(
              "absolute inset-0 flex flex-col items-start justify-end py-8 px-4",
              "transition-all duration-300 ease-in-out z-10"
            )}
          >
            <div 
              className={cn(
                "text-xl md:text-2xl font-medium text-white drop-shadow-lg",
                "transition-all duration-300 delay-100",
                hovered === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {card.title}
            </div>
            <div 
              className={cn(
                "text-sm text-white mt-2 font-medium",
                "transition-all duration-300 delay-200",
                hovered === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              )}
            >
              {card.description || "No description available"}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = "Card";

export function FocusCards({ cards }: { cards: Card[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl mx-auto md:px-8 w-full">
      {cards.map((card, index) => (
        <div 
          key={card.title} 
          className={cn(
            "mb-12 md:mb-0",
            // Center align the 4th card (index 3) by spanning the middle column
            index === 3 && "md:col-start-2 md:col-span-1"
          )}
        >
          <Card
            card={card}
            index={index}
            hovered={hovered}
            setHovered={setHovered}
          />
        </div>
      ))}
    </div>
  );
}
