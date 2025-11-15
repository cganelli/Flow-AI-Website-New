import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ResourcesContent from "@/components/resources/resources-content";

export const metadata: Metadata = {
  title: "Resources | Flow AI - Lessons, Agents & GPTs, Prompt Packs & Templates",
  description: "Access Flow AI course lessons, AI agents and GPTs, prompt packs, templates, and worksheets to accelerate your AI journey.",
  keywords: [
    "AI resources",
    "AI lessons",
    "AI agents",
    "GPTs",
    "prompt templates",
    "AI worksheets",
    "Flow AI course",
    "AI for Gen X"
  ],
  alternates: {
    canonical: "https://flowai.com/resources",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main" role="main" className="pt-20">
        <ResourcesContent />
      </main>

      <Footer />
    </div>
  );
}

