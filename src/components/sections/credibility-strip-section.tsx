/**
 * Credibility Strip Section Component
 * 
 * Location: /components/sections/credibility-strip-section.tsx
 * 
 * Purpose: Provides reassurance and credibility without testimonials,
 * highlighting experience, resources, and clear stances.
 */

"use client";

const CredibilityStripSection = () => {
  const credibilityPoints = [
    "Built on over 20 plus years of digital product, marketing, and technology experience",
    "Training and resources built from the real work you do every day, not theory",
    "Guardrails baked in so leaders stay in control",
    "Focus on tools you already use so you avoid buying yet another platform or login to manage",
    "Commitment to training, SOP updates, and simple documentation so your team keeps momentum after the project ends"
  ];

  return (
    <section
      className="py-16 bg-background border-t border-gray/10"
      aria-labelledby="credibility-heading"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <h2 id="credibility-heading" className="heading-xl mb-12 text-center">
            Why Flow AI is your trusted AI partner
          </h2>

          <ul className="space-y-6">
            {credibilityPoints.map((point) => (
              <li key={point} className="flex items-start">
                <div className="w-6 h-6 rounded-full bg-primary mr-4 flex-shrink-0 mt-1 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700 flex-grow">{point}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CredibilityStripSection;

