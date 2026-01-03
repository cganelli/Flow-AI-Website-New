"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Layout from "@/components/layout/layout";
import HomepageHeroSection from "@/components/sections/homepage-hero-section";
import BenchmarkStripSection from "@/components/sections/benchmark-strip-section";
import WaysToWorkSection from "@/components/sections/ways-to-work-section";
import CommonSolutionsSection from "@/components/sections/common-solutions-section";
import FeaturedTrainingSection from "@/components/sections/featured-training-section";
import ConsultingProgramSection from "@/components/sections/consulting-program-section";
import CredibilityStripSection from "@/components/sections/credibility-strip-section";
import FreeStarterKitSection from "@/components/sections/free-starter-kit-section";
import ResourcesPreviewSection from "@/components/sections/resources-preview-section";
import FinalCtaSection from "@/components/sections/final-cta-section";

export default function HomePage() {
  const pathname = usePathname();

  // Handle anchor links when navigating from other pages
  useEffect(() => {
    if (typeof window !== "undefined" && pathname === "/") {
      const hash = window.location.hash;
      if (hash) {
        // Small delay to ensure page is rendered
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    }
  }, [pathname]);
  return (
    <Layout>
      <main id="main" role="main" aria-label="Main content">
        <HomepageHeroSection />
        <BenchmarkStripSection />
        <WaysToWorkSection />
        <CommonSolutionsSection />
        <FeaturedTrainingSection />
        <ConsultingProgramSection />
        <CredibilityStripSection />
        <FreeStarterKitSection />
        <ResourcesPreviewSection />
        <FinalCtaSection />
      </main>
    </Layout>
  );
}
