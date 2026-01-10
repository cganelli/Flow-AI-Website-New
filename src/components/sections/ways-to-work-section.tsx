/**
 * Ways to Work Section Component
 * 
 * Location: /components/sections/ways-to-work-section.tsx
 * 
 * Purpose: Displays three clear offers/paths for working with Flow AI:
 * Strategy and Implementation, Team Training, and Self-Serve Resources.
 */

"use client";

const WaysToWorkSection = () => {
  const offers = [
    {
      title: "Strategy and implementation",
      description: "Design and build AI agents and workflows inside your current tools.",
      who: "Best for companies with revenue in place and manual processes slowing growth.",
      cta: "See how projects work",
      ctaHref: "#consulting-program-heading"
    },
    {
      title: "Team training",
      description: "Live training that turns staff into confident AI users on real work.",
      who: "Best for helping you and your team reduce manual work and increase productivity",
      cta: "View training tracks",
      ctaHref: "/training"
    },
    {
      title: "Self-serve resources",
      description: "Lessons, prompt packs, and agents for teams that want to start fast.",
      who: "Best for companies testing AI before a larger project.",
      cta: "Browse resources",
      ctaHref: "/resources"
    }
  ];

  return (
    <section
      className="py-8 md:py-12 bg-black text-white"
      aria-labelledby="ways-to-work-heading"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <h2 id="ways-to-work-heading" className="heading-xl mb-12 text-center text-white">
            How to get started with AI
          </h2>

          {/* Three Tiles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offers.map((offer) => {
              const headingId = `offer-${offer.title.replace(/\\s+/g, "-").toLowerCase()}-heading`;
              return (
                <article
                  key={offer.title}
                  className="bg-white p-8 rounded-xl shadow-sm border border-gray/10 flex flex-col"
                  aria-labelledby={headingId}
                >
                  <h3
                    id={headingId}
                    className="text-2xl font-bold mb-4 text-black"
                  >
                    {offer.title}
                  </h3>
                  <p className="text-lg text-black mb-6 flex-grow">
                    {offer.description}
                  </p>
                  <p className="text-sm text-black mb-6 italic">
                    {offer.who}
                  </p>
                  <a
                    href={offer.ctaHref}
                    className="btn-primary-outline text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={`${offer.cta} - ${offer.title}`}
                  >
                    {offer.cta}
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaysToWorkSection;

