/**
 * Final CTA Section Component
 * 
 * Location: /components/sections/final-cta-section.tsx
 * 
 * Purpose: Provides a single clear next step at the bottom of the homepage
 * with primary and secondary CTAs and reassurance line.
 */

"use client";

const FinalCtaSection = () => {
  return (
    <section
      className="py-16 bg-background border-t border-gray/10"
      aria-labelledby="final-cta-heading"
    >
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 id="final-cta-heading" className="heading-xl mb-8">
            Ready to see what AI can do?
          </h2>

          {/* Two CTAs - Side by Side on Desktop, Stacked on Mobile */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
            <a
              href="#starter-kit"
              className="btn-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary w-full md:w-auto text-center"
              aria-label="Get your FREE AI starter kit"
            >
              Get your FREE AI starter kit
            </a>
            <a
              href="#book-appointment"
              className="btn-primary-outline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 w-full md:w-auto text-center"
              aria-label="Book your FREE AI audit"
            >
              Book your FREE AI audit
            </a>
          </div>

          {/* Reassurance Line */}
          <p className="text-sm text-gray-600">
            Zero obligation, clear next steps for your team either way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;

