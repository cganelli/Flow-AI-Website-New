/**
 * Featured Training Section Component
 * 
 * Location: /components/sections/featured-training-section.tsx
 * 
 * Purpose: Displays featured training options with one main card (AI For Everyday Work)
 * and two sub-cards (AI For Beginners and AI For Leaders).
 */

"use client";

const FeaturedTrainingSection = () => {
  const mainCard = {
    title: "AI For Everyday Work",
    summary: "A live 90 minute session where you and your staff learn how to use AI on real work from your business. We walk through current tasks, show where AI fits, and run examples end to end. Your team leaves with clear next steps and a short list of workflows for future improvements.",
    bullets: [
      "Tailored to your tools, processes, and examples",
      "Hands on demos using real work you do every week",
      "Follow up checklist so everyone knows what to try next"
    ],
    cta: "Learn about AI for everyday work",
    ctaHref: "/training#track-everyday-work"
  };

  const subCards = [
    {
      title: "AI For Beginners",
      summary: "A friendly introduction for those who are new to AI and feel unsure where to start.",
      bullets: [
        "Plain language overview of what AI is and what it does",
        "Live demos of simple wins in email, documents, and meetings",
        "Guardrails so staff know what is safe and what is not"
      ],
      cta: "Learn about AI For Beginners",
      ctaHref: "/training#track-foundations"
    },
    {
      title: "AI For Leaders",
      summary: "A session for owners and managers who need a clear view of AI, risk, and results.",
      bullets: [
        "Where AI fits in strategy, not only in tools",
        "How to set expectations and goals for AI projects",
        "Simple way to measure value and adoption over time"
      ],
      cta: "Learn about AI For Leaders",
      ctaHref: "/training#track-leaders-strategy"
    }
  ];

  return (
    <section
      className="py-16 bg-black text-white"
      aria-labelledby="featured-training-heading"
    >
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          <h2 id="featured-training-heading" className="heading-xl mb-12 text-center">
            Featured training for your business
          </h2>

          {/* Desktop Layout: Main card 2/3 width left, sub-cards stacked on right */}
          <div className="hidden lg:grid lg:grid-cols-3 gap-8">
            {/* Main Card - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white/10 rounded-xl p-8 md:p-12 border border-white/20">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  {mainCard.title}
                </h3>
                
                <p className="text-2xl text-gray-300 mb-8">
                  {mainCard.summary}
                </p>

                <ul className="space-y-4 mb-8">
                  {mainCard.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary mr-3 flex-shrink-0 mt-1 flex items-center justify-center">
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
                      <span className="text-lg text-gray-200">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div>
                  <a
                    href={mainCard.ctaHref}
                    className="btn-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                    aria-label={mainCard.cta}
                  >
                    {mainCard.cta}
                  </a>
                </div>
              </div>
            </div>

            {/* Sub Cards - Stacked on right, takes 1 column */}
            <div className="lg:col-span-1 space-y-6">
              {subCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white/5 rounded-xl p-6 border border-white/10"
                >
                  <h4 className="text-2xl font-bold mb-4">
                    {card.title}
                  </h4>
                  
                  <p className="text-base text-gray-300 mb-6">
                    {card.summary}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {card.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-primary mr-2 flex-shrink-0 mt-0.5 flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm text-gray-200">{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href={card.ctaHref}
                    className="btn-primary-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={card.cta}
                  >
                    {card.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Layout: Stack main card first, then sub-cards */}
          <div className="lg:hidden space-y-6">
            {/* Main Card */}
            <div className="bg-white/10 rounded-xl p-8 border border-white/20">
              <h3 className="text-3xl font-bold mb-6">
                {mainCard.title}
              </h3>
              
              <p className="text-2xl text-gray-300 mb-8">
                {mainCard.summary}
              </p>

              <ul className="space-y-4 mb-8">
                {mainCard.bullets.map((bullet, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary mr-3 flex-shrink-0 mt-1 flex items-center justify-center">
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
                    <span className="text-lg text-gray-200">{bullet}</span>
                  </li>
                ))}
              </ul>

              <div>
                <a
                  href={mainCard.ctaHref}
                  className="btn-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                  aria-label={mainCard.cta}
                >
                  {mainCard.cta}
                </a>
              </div>
            </div>

            {/* Sub Cards */}
            {subCards.map((card, index) => (
              <div
                key={index}
                className="bg-white/5 rounded-xl p-6 border border-white/10"
              >
                <h4 className="text-2xl font-bold mb-4">
                  {card.title}
                </h4>
                
                <p className="text-base text-gray-300 mb-6">
                  {card.summary}
                </p>

                <ul className="space-y-3 mb-6">
                  {card.bullets.map((bullet, bulletIndex) => (
                    <li key={bulletIndex} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-primary mr-2 flex-shrink-0 mt-0.5 flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm text-gray-200">{bullet}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={card.ctaHref}
                  className="btn-primary-outline text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={card.cta}
                >
                  {card.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTrainingSection;
