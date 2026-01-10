/**
 * TrainingHero Component
 * 
 * Location: /components/training/TrainingHero.tsx
 * 
 * Purpose: Displays the hero section for the Training page with badge, title, subtitle, and CTAs.
 */

import React from "react";

interface TrainingHeroProps {
  title: string;
  subtitleLines: string[];
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export function TrainingHero(props: TrainingHeroProps) {
  const {
    title,
    subtitleLines,
    primaryCtaLabel,
    primaryCtaHref,
    secondaryCtaLabel,
    secondaryCtaHref,
  } = props;

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="heading-xl mb-6">
            {title}
          </h1>
          <div className="space-y-2 text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            {subtitleLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href={primaryCtaHref}
              className="btn-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={primaryCtaLabel}
            >
              {primaryCtaLabel}
            </a>
            <a
              href={secondaryCtaHref}
              className="btn-primary-outline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={secondaryCtaLabel}
            >
              {secondaryCtaLabel}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

