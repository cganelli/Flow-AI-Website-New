import React, { Suspense } from 'react';
import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import ContactContent from "@/components/contact/contact-content";
import EmailJsFormBridge from '@/components/EmailJsFormBridge';

export const metadata: Metadata = {
  title: "Contact Flow AI | Schedule Your Free AI Audit",
  description: "Reach out to Flow AI to discover how our automation solutions can transform your business operations and boost productivity.",
  keywords: [
    "contact Flow AI",
    "AI automation consultation",
    "free AI audit",
    "business automation",
    "AI automation support",
    "customer service"
  ],
  alternates: {
    canonical: "https://flowai.com/contact",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Skip to main content
      </a>
      <EmailJsFormBridge />
      <Header />

      <main id="main" className="pt-20">
        <Suspense fallback={<div>Loading...</div>}>
          <ContactContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
