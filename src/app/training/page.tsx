import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { TrainingHero } from "@/components/training/TrainingHero";
import { TrainingAudienceSection } from "@/components/training/TrainingAudienceSection";
import { TrainingHowItWorks } from "@/components/training/TrainingHowItWorks";
import { TrainingCoreTracksCards } from "@/components/training/TrainingCoreTracksCards";
import { TrainingAdvancedWorkshops } from "@/components/training/TrainingAdvancedWorkshops";
import { TrainingTracksGrid } from "@/components/training/TrainingTracksGrid";
import { TrainingFinalCta } from "@/components/training/TrainingFinalCta";
import {
  heroContent,
  audienceContent,
  howItWorksContent,
  coreTracksTitle,
  coreTracks,
  advancedWorkshopsSectionTitle,
  advancedWorkshopCards,
  workshopDetails,
  finalCtaContent,
} from "@/components/training/training-data";

export const metadata: Metadata = {
  title: "AI Training For Real-World Work | Flow AI",
  description: "Flow AI runs live, hands-on training for teams of 5 to 100 people. Sessions focus on real tasks such as emails, meetings, reports, and core processes.",
  keywords: [
    "AI training",
    "business AI training",
    "corporate AI training",
    "AI workshops",
    "AI automation training",
    "Flow AI training",
    "team AI training"
  ],
  alternates: {
    canonical: "https://thisisflowai.com/training/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Skip to main content
      </a>
      <Header />

      <main id="main" className="pt-20">
        <TrainingHero {...heroContent} />
        <TrainingAudienceSection {...audienceContent} />
        <TrainingHowItWorks {...howItWorksContent} />
        <TrainingCoreTracksCards title={coreTracksTitle} tracks={coreTracks} />
        <TrainingAdvancedWorkshops
          title={advancedWorkshopsSectionTitle}
          cards={advancedWorkshopCards}
        />
        <TrainingTracksGrid
          coreTracks={coreTracks}
          workshopDetails={workshopDetails}
        />
        <TrainingFinalCta {...finalCtaContent} />
      </main>

      <Footer />
    </div>
  );
}

