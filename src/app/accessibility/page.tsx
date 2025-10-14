import React from 'react';
import { Metadata } from 'next';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: 'Accessibility | Flow AI',
  description: 'Flow AI is committed to making our website accessible and usable for everyone. Learn about our accessibility measures and how to contact us with feedback.',
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main id="main" role="main" className="pt-20">
        <div className="container-custom py-12">
          <h1 className="heading-xl mb-4">Accessibility</h1>
          <p className="mb-4">
            We are committed to making our website accessible and usable for everyone.
            Our goal is WCAG 2.1 AA conformance. We run automated checks (axe & Pa11y),
            manual keyboard and screen reader testing, and fix issues promptly.
          </p>
          <h2 className="heading-lg mb-2">Feedback</h2>
          <p className="mb-4">
            If you experience accessibility barriers on this site, please contact us at{' '}
            <a className="text-primary hover:underline" href="mailto:accessibility@thisisflowai.com">
              accessibility@thisisflowai.com
            </a>{' '}
            or call <a className="text-primary hover:underline" href="tel:+15082059941">(508) 205-9941</a>. We aim to respond within 2 business days.
          </p>
          <h2 className="heading-lg mb-2">Measures we take</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Keyboard-navigable pages with visible focus.</li>
            <li>Proper landmarks, headings, labels, and alt text.</li>
            <li>Color contrast meeting or exceeding 4.5:1.</li>
            <li>Regular automated audits and manual testing.</li>
          </ul>
          <p className="mt-6 text-sm text-gray">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
