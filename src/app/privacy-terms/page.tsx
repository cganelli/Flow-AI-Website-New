import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import PrivacyTermsContent from "@/components/privacy-terms/privacy-terms-content";

export const metadata: Metadata = {
  title: "Privacy Policy & Terms - Flow AI | Data Protection & Service Terms",
  description: "Read Flow AI's privacy policy and terms of service. Learn how we protect your data and the terms governing our AI automation services.",
  keywords: [
    "privacy policy",
    "terms of service",
    "data protection",
    "Flow AI terms",
    "AI automation privacy"
  ],
};

export default function PrivacyTermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main id="main" role="main" className="pt-20">
        <PrivacyTermsContent />
      </main>

      <Footer />
    </div>
  );
}
