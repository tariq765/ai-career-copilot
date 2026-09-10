import { Navbar } from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { FeaturesSection } from "@/components/landing/features-section";
import { DetailAndFaqSection } from "@/components/landing/detail-faq-section";
import { FinalCtaAndFooter } from "@/components/landing/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col justify-between">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DetailAndFaqSection />
      <FinalCtaAndFooter />
    </main>
  );
}
