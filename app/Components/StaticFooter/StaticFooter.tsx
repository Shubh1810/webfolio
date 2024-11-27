import Image from 'next/image';
import Link from 'next/link';

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
      border-white/10
      bg-white/[0.02]
      backdrop-blur-md
      text-gray-400
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
        max-w-6xl 
        mx-auto 
        px-4
        relative
        z-10
      ">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* About Me */}
          <div>
            <h3 className="text-white font-semibold mb-4">About Me</h3>
            <p className="text-sm">
              I am a sophomore international student specializing in Artificial Intelligence and Machine Learning. Passionate about developing innovative solutions and eager to contribute to impactful projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/projects" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link 
                  href="/resume" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Resume
                </Link>
              </li>
              <li>
                <Link 
                  href="/blog" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/faq" 
                  className="hover:text-white transition-colors duration-200"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <p className="text-sm">
              Interested in collaborating or have a question? Feel free to reach out via email or connect with me on social media.
            </p>
            <p className="mt-2">
              <a
                href="mailto:shethshubh@gmail.com"
                className="hover:text-white transition-colors duration-200"
              >
                shethshubh@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center flex-wrap gap-6 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="group relative w-8 h-8"
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
                  width={32}
                  height={32}
                  className="
                    opacity-70
                    group-hover:opacity-100
                    transition-opacity duration-300 ease-out
                    group-hover:drop-shadow-[0_0_6px_var(--glow-color)]
                  "
                />
              </div>
            </a>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center">
          <p className="text-sm">
            © {currentYear} <span className="text-white">Shubh Sheth</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default StaticFooter;