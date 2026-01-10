/**
 * TrainingFinalCta Component
 * 
 * Location: /components/training/TrainingFinalCta.tsx
 * 
 * Purpose: Displays the final call-to-action section for the Training page.
 */

import React from "react";

interface TrainingFinalCtaProps {
  title: string;
  bodyLines: string[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryLabel: string;
  secondaryHref: string;
}

export function TrainingFinalCta(props: TrainingFinalCtaProps) {
  const {
    title,
    bodyLines,
    primaryCtaLabel,
    primaryCtaHref,
  } = props;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="heading-lg mb-6">{title}</h2>
          <div className="space-y-2 text-lg text-gray-600 mb-8">
            {bodyLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href={primaryCtaHref} 
              className="btn-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={primaryCtaLabel}
            >
              {primaryCtaLabel}
            </a>
            <a 
              href="/faq#training-faqs"
              className="btn-primary-outline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="View Training FAQs"
            >
              View Training FAQs
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

