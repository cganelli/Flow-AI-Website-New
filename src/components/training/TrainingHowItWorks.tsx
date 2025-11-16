/**
 * TrainingHowItWorks Component
 * 
 * Location: /components/training/TrainingHowItWorks.tsx
 * 
 * Purpose: Displays how Flow AI training works with format, flexible groups, foundations, and follow-up information.
 * Styled to match the "Our Process" section on the home page with 4 columns.
 */

import React from "react";

interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  image: string;
}

interface TrainingHowItWorksProps {
  title: string;
  steps: HowItWorksStep[];
}

export function TrainingHowItWorks(props: TrainingHowItWorksProps) {
  const { title, steps } = props;

  return (
    <section
      className="py-16 bg-background"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container-custom">
        {/* Section Header */}
        <header className="text-center mb-16">
          <h2 id="how-it-works-heading" className="heading-xl mb-8">{title}</h2>
        </header>

        {/* Steps Grid - 4 columns */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          role="list"
          aria-label="Four-step Flow AI training process"
        >
          {steps.map((step) => (
            <article
              key={step.number}
              className="text-center"
              role="listitem"
              aria-labelledby={`how-it-works-step-${step.number}-heading`}
            >
              {/* Step Number */}
              <div
                className="text-brand-lg mb-6"
                style={{ fontSize: 'clamp(40px, 2.5rem + 1.5vw, 60px)', fontWeight: 700 }}
                aria-label={`Step ${step.number}`}
              >
                {step.number}
              </div>

              {/* Step Title */}
              <h3
                id={`how-it-works-step-${step.number}-heading`}
                className="text-2xl md:text-4xl font-bold mb-6 leading-tight text-[#EA3D2A]"
              >
                {step.title}
              </h3>

              {/* Step Image */}
              <div className="mb-6 flex justify-center">
                <img
                  src={step.image}
                  alt={`Illustration for ${step.title} step in Flow AI training`}
                  className="w-24 h-24 md:w-28 md:h-28"
                  role="img"
                  loading="lazy"
                />
              </div>

              {/* Step Description */}
              <p className="text-black text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

