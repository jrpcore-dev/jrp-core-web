import { SiteNavbar } from "@/components/site-navbar";
import { Hero } from "@/components/hero";
import { ServicesSection } from "@/components/services-section";
import { StackSection } from "@/components/stack-section";
import { ProcessSection } from "@/components/process-section";
import { ProductShowcase } from "@/components/product-showcase";
import { FinalCta } from "@/components/final-cta";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteNavbar />
      <main aria-label="Inicio">
        <Hero />
        <ServicesSection />
        <StackSection />
        <ProcessSection />
        <ProductShowcase />
        <FinalCta />
      </main>
    </div>
  );
}
