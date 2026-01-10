import React from 'react';
import type { Metadata } from 'next';
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

export const metadata: Metadata = {
  title: 'Accessibility | Flow AI',
  description: 'Flow AI is committed to WCAG 2.2 AA accessibility with regular audits, inclusive design, and clear feedback channels.',
};

export default function AccessibilityPage() {
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
        <div className="container-custom py-12">
          <h1 className="heading-xl mb-4">Accessibility Statement</h1>

          <section className="space-y-4">
            <div className="space-y-2">
              <h2 className="heading-lg">Our Commitment</h2>
              <p>
                Flow AI is committed to making our website accessible and usable for everyone. We believe in the power of inclusive design and are dedicated to providing a digital environment that is accessible to all users, regardless of ability or assistive technology.
              </p>
            </div>

            <div className="space-y-2">
              <h2 className="heading-lg">Conformance Status</h2>
              <p>
                The Web Content Accessibility Guidelines (WCAG) 2.2 defines requirements for designers and developers to improve accessibility. Our goal is to maintain substantial conformance with WCAG 2.2 Level AA standards. We view accessibility as a core component of our development cycle and perform regular audits to ensure we are meeting these objectives.
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="heading-lg">Measures We Take</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Keyboard Navigation:</strong> All pages are designed to be navigable via keyboard with clearly visible focus indicators.</li>
                <li><strong>Semantic Structure:</strong> Proper use of HTML5 landmarks, hierarchical headings, and descriptive labels to assist assistive technologies.</li>
                <li><strong>Visual Standards:</strong> Color contrast ratios that meet or exceed 4.5:1 for all text elements, and avoiding reliance on color alone to convey information.</li>
                <li><strong>Input and Interaction:</strong> Design considerations for pointer gestures and input modalities to support a wide range of devices.</li>
                <li><strong>Alternative Text:</strong> Meaningful alt text for non-text content to ensure context is preserved for screen reader users.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h2 className="heading-lg">Assessment Approach</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Automated Audits:</strong> Continuous testing using industry-standard tools and AI-assisted accessibility reviews.</li>
                <li><strong>Manual Verification:</strong> Regular manual keyboard-only testing to ensure functional flow and the absence of “keyboard traps.”</li>
                <li><strong>Code-Level Review:</strong> Regular analysis of code architecture specifically against WCAG 2.2 AA criteria to identify and remediate potential barriers.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <h2 className="heading-lg">Feedback</h2>
              <p>
                If you experience accessibility barriers on this site, please contact us so we can work to resolve the issue:
              </p>
              <p>
                Email:{" "}
                <a
                  className="text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  href="mailto:accessibility@thisisflowai.com"
                  aria-label="Contact Flow AI accessibility team via email"
                >
                  accessibility@thisisflowai.com
                </a>
              </p>
              <p>Response Time: We aim to respond to accessibility-related inquiries within 5 business days.</p>
            </div>

            <div className="space-y-1">
              <h2 className="heading-lg">Updates</h2>
              <p>This statement was last updated in January 2026 following a review against WCAG 2.2 standards.</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
