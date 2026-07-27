import { HeroSection } from "@/components/sections/hero";
import { ValueSection } from "@/components/sections/value";
import { ProblemSection } from "@/components/sections/problem";
import { ServicesSection } from "@/components/sections/services";
import { MethodSection } from "@/components/sections/method";
import { DifferentiationSection } from "@/components/sections/differentiation";
import { AiSection } from "@/components/sections/ai-section";
import { SectorsSection } from "@/components/sections/sectors";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { CtaSection } from "@/components/sections/cta";
import { ContactSection } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <div className="section-defer">
        <ValueSection />
      </div>
      <div className="section-defer">
        <ProblemSection />
      </div>
      <div className="section-defer">
        <ServicesSection />
      </div>
      <div className="section-defer">
        <MethodSection />
      </div>
      <div className="section-defer">
        <DifferentiationSection />
      </div>
      <div className="section-defer">
        <AiSection />
      </div>
      <div className="section-defer">
        <SectorsSection />
      </div>
      <div className="section-defer">
        <TestimonialsSection />
      </div>
      <CtaSection />
      <div className="section-defer">
        <ContactSection />
      </div>
    </>
  );
}
