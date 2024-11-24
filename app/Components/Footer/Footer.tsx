// components/Footer/Footer.tsx
import React from 'react';
import { HiMail } from 'react-icons/hi';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      frontView: "/icons/github-front.png",
      sideView: "/icons/github-side.png",
      href: "https://github.com/Shubh1810",
      label: "GitHub",
    },
    {
      frontView: "/icons/linkedin-front.png",
      sideView: "/icons/linkedin-side.png",
      href: "https://linkedin.com/in/shubh-sheth-98219433l",
      label: "LinkedIn",
    },
    {
      frontView: "/icons/x-front.png",
      sideView: "/icons/x-side.png",
      href: "https://x.com/Shubh_1810",
      label: "X (Twitter)",
    },
    {
      frontView: "/icons/telegram-front.png",
      sideView: "/icons/telegram-side.png",
      href: "https://t.me/yourusername",
      label: "Telegram",
    },
    {
      frontView: "/icons/instagram-front.png",
      sideView: "/icons/instagram-side.png",
      href: "https://instagram.com/yourusername",
      label: "Instagram",
    },
    {
      frontView: "/icons/snapchat-front.png",
      sideView: "/icons/snapchat-side.png",
      href: "https://snapchat.com/add/yourusername",
      label: "Snapchat",
    },
    {
      frontView: "/icons/discord-front.png",
      sideView: "/icons/discord-side.png",
      href: "https://discord.gg/yourinvite",
      label: "Discord",
    },
    {
      frontView: "/icons/email-front.png",
      sideView: "/icons/email-side.png",
      href: "mailto:shethshubh@gmail.com",
      label: "Email",
    }
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full py-8 px-4 z-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-neutral-400">
          &copy; {new Date().getFullYear()} Shubh Sheth. All rights reserved.
        </p>
        
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-6 h-6 group perspective"
              aria-label={link.label}
            >
              <div className="relative preserve-3d transition-transform duration-500 ease-out group-hover:rotate-y-90">
                {/* Front View */}
                <img
                  src={link.frontView}
                  alt={`${link.label} front`}
                  className="w-6 h-6 absolute backface-hidden"
                />
                {/* Side View */}
                <img
                  src={link.sideView}
                  alt={`${link.label} side`}
                  className="w-6 h-6 absolute backface-hidden rotate-y-90 origin-left"
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