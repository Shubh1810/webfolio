import { AnimatedSection } from '../Components/Common/AnimatedSection';
import { TextHoverEffect } from '../Components/Common/ui/text-hover-effect';

export default function BetaPage() {
  return (
    <AnimatedSection>
      <div className="flex flex-col items-center justify-center h-screen">
        <TextHoverEffect text="Beta" />
      </div>
    </AnimatedSection>
  );
}