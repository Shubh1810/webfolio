import { AnimatedSection } from '../Components/Common/AnimatedSection';
import { HeroParallax } from '../Components/Common/ui/hero-parallax';

const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
    description: "Moonbeam is a platform for creating and sharing AI-powered content.",
  },
  // ... rest of the products array (copy from app/page.tsx)
  {
    title: "To be added.",
    link: "https://gomoonbeam.com",
    thumbnail: "/skyline-0.jpg",
    description: "Mumbai is a platform for creating and sharing AI-powered content.",
  },
  {
    title: "To be added..",
    link: "https://gomoonbeam.com",
    thumbnail: "/skyline-1.jpeg",
    description: "Mumbai is a platform for creating and sharing AI-powered content.",
  },
  {
    title: "To be added...",
    link: "https://gomoonbeam.com",
    thumbnail: "/skyline-2.jpg",
    description: "Mumbai is a platform for creating and sharing AI-powered content.",
  },
  {
    title: "To be added....",
    link: "https://gomoonbeam.com",
    thumbnail: "/skyline-3.jpg",
    description: "Mumbai is a platform for creating and sharing AI-powered content.",
  },
  {
    title: "To be added.....",
    link: "https://gomoonbeam.com",
    thumbnail: "/skyline-4.jpg",
    description: "Mumbai is a platform for creating and sharing AI-powered content.",
  },
  {
    title: "To be added......",
    link: "https://gomoonbeam.com",
    thumbnail: "/skyline-5.jpg",
    description: "Mumbai is a platform for creating and sharing AI-powered content.",
  },


];

export default function ProjectsPage() {
  return (
    <AnimatedSection>
      <section className="min-h-screen">
        <div className="relative w-full">
          <div className="relative">
            <HeroParallax products={products} />
          </div>
        </div>
      </section>
    </AnimatedSection>  
  );
}
