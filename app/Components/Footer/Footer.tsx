// components/Footer/Footer.tsx
import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      icon: <FaGithub className="w-6 h-6" />,
      href: "https://github.com/shubhsheth",
      label: "GitHub",
      hoverClass: "hover:text-github-gray"
    },
    {
      icon: <FaLinkedin className="w-6 h-6" />,
      href: "https://linkedin.com/in/shubhsheth",
      label: "LinkedIn",
      hoverClass: "hover:text-linkedin-blue"
    },
    {
      icon: <FaTwitter className="w-6 h-6" />,
      href: "https://twitter.com/shubhsheth",
      label: "Twitter",
      hoverClass: "hover:text-twitter-blue"
    },
    {
      icon: <HiMail className="w-6 h-6" />,
      href: "mailto:contact@shubhsheth.com",
      label: "Email",
      hoverClass: "hover:text-red-500"
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
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className={`text-neutral-400 ${link.hoverClass}`} aria-label={link.label}>
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;