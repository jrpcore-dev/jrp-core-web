import { SiteNavbar } from "@/components/site-navbar";
import { Hero } from "@/components/hero";
import { ServicesSection } from "@/components/services-section";
import { EcosystemSection } from "@/components/ecosystem-section";

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteNavbar />
      <main aria-label="Inicio">
        <Hero />
        <ServicesSection />
        <EcosystemSection />
      </main>
    </div>
  );
}
