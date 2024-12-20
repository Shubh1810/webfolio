import React from 'react';
import Image from 'next/image';

const StaticFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      sideIcon: '/github-side.png',
      href: 'https://github.com/Shubh1810',
      label: 'GitHub',
      glowColor: 'rgba(88, 101, 242, 0.8)',
    },
    {
      sideIcon: '/linkedin-side.png',
      href: 'https://linkedin.com/in/shubh-sheth-98219433l',
      label: 'LinkedIn',
      glowColor: 'rgba(40, 103, 178, 0.8)',
    },
    {
      sideIcon: '/x-side.png',
      href: 'https://x.com/Shubh_1810',
      label: 'X (Twitter)',
      glowColor: 'rgba(29, 161, 242, 0.8)',
    },
    {
      sideIcon: '/telegram-side.png',
      href: 'https://t.me/BluntSF',
      label: 'Telegram',
      glowColor: 'rgba(37, 176, 231, 0.8)',
    },
    {
      sideIcon: '/instagram-side.png',
      href: 'https://instagram.com/shubh.sheth',
      label: 'Instagram',
      glowColor: 'rgba(225, 48, 108, 0.8)',
    },
    {
      sideIcon: '/snapchat-side.png',
      href: 'https://snapchat.com/add/Shubh-18',
      label: 'Snapchat',
      glowColor: 'rgba(255, 252, 0, 0.8)',
    },
    {
      sideIcon: '/discord-side.png',
      href: 'https://discord.gg/yourinvite',
      label: 'Discord',
      glowColor: 'rgba(88, 101, 242, 0.8)',
    },
    {
      sideIcon: '/email-side.png',
      href: 'mailto:shethshubh@gmail.com',
      label: 'Email',
      glowColor: 'rgba(255, 255, 255, 0.8)',
    },
  ];

  return (
    <footer className="
      w-full 
      py-10 
      mt-auto
      border-t 
      border-black/10 dark:border-white/10
      bg-white/[0.02]
      backdrop-blur-md
      text-gray-600 dark:text-gray-400
      relative
      overflow-hidden
    ">
      {/* Subtle glass shade */}
      <div className="
        absolute
        inset-0
        bg-gradient-to-b
        from-white/[0.05]
        via-transparent
        to-transparent
        mix-blend-overlay
        pointer-events-none
      " />

      <div className="
        max-w-2xl 
        mx-auto 
        px-4
        relative
        z-10
        flex
        flex-col
        items-center
        text-center
      ">
        {/* Top Section */}
        <div className="w-full mb-12">
          {/* Contact */}
          <div className="text-center">
            <h3 className="text-gray-900 dark:text-white font-semibold mb-4">Contact</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm mx-auto">
              Interested in collaborating or have a question? Feel free to reach out via email or connect with me on social media.
            </p>
            <p className="mt-2">
              <a
                href="mailto:shethshubh@gmail.com"
                className="hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                shethshubh@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center flex-wrap gap-3 md:gap-6 mb-8 px-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="group relative w-6 h-6 md:w-8 md:h-8"
              style={{ '--glow-color': link.glowColor } as React.CSSProperties}
            >
              <div
                className="
                  relative w-full h-full
                  transition-transform duration-300 ease-out
                  group-hover:scale-110
                  group-hover:drop-shadow-[0_0_10px_var(--glow-color)]
                "
              >
                <Image
                  src={link.sideIcon}
                  alt={link.label}
                  width={24}
                  height={24}
                  className="
                    opacity-70
                    group-hover:opacity-100
                    transition-opacity duration-300 ease-out
                    group-hover:drop-shadow-[0_0_6px_var(--glow-color)]
                    md:w-8 md:h-8
                  "
                />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-sm">
            © <span className="text-black dark:text-white">Shubh Sheth</span> {currentYear}. 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default StaticFooter;