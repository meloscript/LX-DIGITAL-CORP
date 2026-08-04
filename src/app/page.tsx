import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero";
import { HeroSparks } from "@/components/sections/hero-sparks";

const ValueSection = dynamic(() =>
  import("@/components/sections/value").then((m) => m.ValueSection)
);
const ProblemSection = dynamic(() =>
  import("@/components/sections/problem").then((m) => m.ProblemSection)
);
const ServicesSection = dynamic(() =>
  import("@/components/sections/services").then((m) => m.ServicesSection)
);
const MethodSection = dynamic(() =>
  import("@/components/sections/method").then((m) => m.MethodSection)
);
const DifferentiationSection = dynamic(() =>
  import("@/components/sections/differentiation").then(
    (m) => m.DifferentiationSection
  )
);
const AiSection = dynamic(() =>
  import("@/components/sections/ai-section").then((m) => m.AiSection)
);
const SectorsSection = dynamic(() =>
  import("@/components/sections/sectors").then((m) => m.SectorsSection)
);
const TestimonialsSection = dynamic(() =>
  import("@/components/sections/testimonials").then((m) => m.TestimonialsSection)
);
const CtaSection = dynamic(() =>
  import("@/components/sections/cta").then((m) => m.CtaSection)
);
const ContactSection = dynamic(() =>
  import("@/components/sections/contact").then((m) => m.ContactSection)
);

export default function HomePage() {
  return (
    <>
      <div className="hero-mock-stage">
        <HeroSparks />
        <HeroSection />
      </div>
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
      <div className="section-defer">
        <CtaSection />
      </div>
      <div className="section-defer">
        <ContactSection />
      </div>
    </>
  );
}
