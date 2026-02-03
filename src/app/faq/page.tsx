import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import FAQContent from "@/components/faq/faq-content";

export const metadata: Metadata = {
  title: "AI Automation FAQs | Flow AI",
  description: "Get answers to common questions about AI automation and how Flow AI can benefit your business.",
  keywords: [
    "AI automation FAQ",
    "automation questions",
    "AI business help",
    "automation cost",
    "Flow AI questions"
  ],
  alternates: {
    canonical: "https://thisisflowai.com/faq/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FAQPage() {
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
        <FAQContent />
      </main>

      <Footer />
    </div>
  );
}
