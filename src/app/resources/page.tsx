import type { Metadata } from "next";
import { Suspense } from "react";
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
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Skip to main content
      </a>
      <Header />

      <main id="main" className="pt-20">
        <Suspense fallback={<div className="container-custom py-16">Loading resources...</div>}>
          <ResourcesContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

