// components/Footer/Footer.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useScrollDirection } from '../../hooks/useScrollDirection';

const Footer: React.FC = () => {
  const scrollDirection = useScrollDirection();
  const [isStaticFooterVisible, setIsStaticFooterVisible] = useState(false);

  useEffect(() => {
    // Create the observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStaticFooterVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when even 10% of the target is visible
      }
    );

    // Find and observe the static footer
    const staticFooter = document.querySelector('#static-footer');
    if (staticFooter) {
      observer.observe(staticFooter);
    }

    return () => observer.disconnect();
  }, []);

  const socialLinks = [
    {
      sideIcon: "/github-side.png",
      href: "https://github.com/Shubh1810",
      label: "GitHub",
      glowColor: "rgba(114, 137, 218, 0.8)"
    },
    {
      sideIcon: "/linkedin-side.png",
      href: "https://linkedin.com/in/shubh-sheth-98219433l",
      label: "LinkedIn",
      glowColor: "rgba(10, 102, 194, 0.8)"
    },
    {
      sideIcon: "/x-side.png",
      href: "https://x.com/Shubh_1810",
      label: "X (Twitter)",
      glowColor: "rgba(29, 161, 242, 0.8)"
    },
    {
      sideIcon: "/telegram-side.png",
      href: "https://t.me/BluntSF",
      label: "Telegram",
      glowColor: "rgba(37, 176, 231, 0.8)"
    },
    {
      sideIcon: "/instagram-side.png",
      href: "https://instagram.com/shubh.sheth",
      label: "Instagram",
      glowColor: "rgba(255, 0, 110, 0.8)"
    },
    {
      sideIcon: "/snapchat-side.png",
      href: "https://snapchat.com/add/Shubh-18",
      label: "Snapchat",
      glowColor: "rgba(255, 255, 0, 0.8)"
    },
    {
      sideIcon: "/discord-side.png",
      href: "https://discord.gg/yourinvite",
      label: "Discord",
      glowColor: "rgba(114, 137, 218, 0.8)"
    },
    {
      sideIcon: "/email-side.png",
      href: "mailto:shethshubh@gmail.com",
      label: "Email",
      glowColor: "rgba(255, 255, 255, 0.8)"
    }
  ];

  return (
    <footer className={`
      fixed 
      left-0 
      w-full 
      py-4 
      px-4 
      z-10
      transition-all 
      duration-500 
      ease-in-out
      ${scrollDirection === 'up' ? 'translate-y-full' : 'translate-y-0'}
      ${isStaticFooterVisible ? 'bottom-24' : 'bottom-0'}
    `}>
      <div className="
        max-w-6xl 
        mx-auto 
        flex 
        justify-center 
        items-center 
        gap-4
      ">
        <div className="
          flex 
          items-center 
          gap-3
          justify-center
        ">
          {socialLinks.map((link) => (
            <a 
              key={link.label} 
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative w-8 h-8 overflow-visible" 
              aria-label={link.label}
              style={{
                '--glow-color': link.glowColor
              } as React.CSSProperties}
            >
              <div className="
                relative 
                w-full 
                h-full 
                transition-[transform,filter]
                duration-300 
                ease-out
                group-hover:scale-125
                group-hover:drop-shadow-[0_0_10px_var(--glow-color)]
              ">
                <Image 
                  src={link.sideIcon}
                  alt={link.label}
                  width={32}
                  height={32}
                  className="
                    opacity-40 
                    group-hover:opacity-100 
                    transition-[opacity,filter]
                    duration-300
                    ease-out
                    group-hover:drop-shadow-[0_0_6px_var(--glow-color)]
                  "
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;