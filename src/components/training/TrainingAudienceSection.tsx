/**
 * TrainingAudienceSection Component
 * 
 * Location: /components/training/TrainingAudienceSection.tsx
 * 
 * Purpose: Displays the target audience section with two columns for small business and corporate teams.
 */

import React from "react";

interface AudienceColumn {
  title: string;
  bullets: string[];
}

interface TrainingAudienceSectionProps {
  smallBusiness: AudienceColumn;
  corporateTeams: AudienceColumn;
  footerLine: string;
}

export function TrainingAudienceSection(props: TrainingAudienceSectionProps) {
  const { smallBusiness, corporateTeams, footerLine } = props;

  return (
    <section className="py-12 md:py-16 bg-black" aria-labelledby="training-audience-heading">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <h2 id="training-audience-heading" className="sr-only">Training Audience</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[smallBusiness, corporateTeams].map((col) => (
              <div key={col.title}>
                <h3 className="heading-md mb-4 text-white">{col.title}</h3>
                <ul className="space-y-2 text-white">
                  {col.bullets.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-white">
            {footerLine}
          </p>
        </div>
      </div>
    </section>
  );
}

