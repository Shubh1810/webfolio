import { AnimatedSection } from '../Components/Common/AnimatedSection';
import { HeroParallax } from '../Components/Common/ui/hero-parallax';
import Link from 'next/link';

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
    title: "Mumbai",
    link: "https://gomoonbeam.com",
    thumbnail: "/mumbai-night-1.jpg",
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
