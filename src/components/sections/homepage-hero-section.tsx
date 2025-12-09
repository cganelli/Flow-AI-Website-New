/**
 * Homepage Hero Section Component
 * 
 * Location: /components/sections/homepage-hero-section.tsx
 * 
 * Purpose: Displays the hero section for the homepage with updated headline,
 * subheadline, primary and secondary CTAs, and target audience line.
 */

"use client";

const HomepageHeroSection = () => {
  return (
    <section
      className="pt-8 pb-8 md:pt-12 md:pb-12 relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container-custom">
        {/* Hero Header */}
        <header className="max-w-4xl mx-auto text-center mb-8 md:mb-10">
          <h1 id="hero-heading" className="heading-xl mb-6">
            AI Solutions that get results - not more headcount.
          </h1>
          <p className="text-lg md:text-xl text-gray max-w-5xl mx-auto mb-8">
            Save time, reduce manual work, and use AI with the tools you already have—without adding staff.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mb-6">
            <a
              href="#starter-kit"
              className="btn-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              aria-label="Get your FREE AI starter kit"
            >
              Get your FREE AI starter kit
            </a>
            <a
              href="/training"
              className="btn-primary-outline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="See training for your team"
            >
              See training for your team
            </a>
          </div>

          {/* Target Audience Line */}
          <p className="text-sm md:text-base text-gray-600">
            For small business owners, department heads, and leadership teams
          </p>
        </header>
      </div>
    </section>
  );
};

export default HomepageHeroSection;

