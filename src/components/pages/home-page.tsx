"use client";

import Layout from "@/components/layout/layout";
import HeroSection from "@/components/sections/hero-section";
import PartnersSection from "@/components/sections/partners-section";
import AIFeaturesSection from "@/components/sections/ai-features-section";
import TrustedBySection from "@/components/sections/trusted-by-section";
import AIBenefitsSection from "@/components/sections/ai-benefits-section";
import CaseStudiesSection from "@/components/sections/case-studies-section";
import AICapabilitiesSection from "@/components/sections/ai-capabilities-section";
import ProcessSection from "@/components/sections/process-section";
import ContactCaptureSection from "@/components/sections/contact-capture-section";
import TeamSection from "@/components/sections/team-section";
import TestimonialsSection from "@/components/sections/testimonials-section";
import BusinessOwnersSection from "@/components/sections/business-owners-section";

export default function HomePage() {
  return (
    <Layout>
      <main id="main-content" role="main" aria-label="Main content">
        <HeroSection />

        {/* Desktop layout - original order */}
        <div className="hidden md:block">
          <PartnersSection />
          <AIFeaturesSection />
          <AIBenefitsSection />
          <AICapabilitiesSection />
          <ProcessSection />
          <ContactCaptureSection />
        </div>

        {/* Mobile layout - reordered sections */}
        <div className="block md:hidden">
          <ContactCaptureSection />
          <AIBenefitsSection />
          <AICapabilitiesSection />
          <ProcessSection />
          <PartnersSection />
          <AIFeaturesSection />
        </div>

        {/* <TrustedBySection /> - Hidden: Client logos */}
        {/* <CaseStudiesSection /> - Hidden: Two case study cards with "View More" link */}
        {/* <TeamSection /> - Hidden: Team member cards with photos and descriptions */}
        {/* <TestimonialsSection /> - Hidden: Client testimonials */}
        {/* <BusinessOwnersSection /> - Hidden: TikTok views content and testimonial */}
      </main>
    </Layout>
  );
}
