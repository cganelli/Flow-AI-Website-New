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
    canonical: "https://flowai.com/faq",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main" role="main" className="pt-20">
        <FAQContent />
      </main>

      <Footer />
    </div>
  );
}
