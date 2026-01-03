/**
 * Common Solutions Section Component
 * 
 * Location: /components/sections/common-solutions-section.tsx
 * 
 * Purpose: Displays common AI solutions for businesses with problem, outcome, and next step.
 */

"use client";

import Link from "next/link";

const CommonSolutionsSection = () => {
  const solutions = [
    {
      title: "Lead follow up and sales pipeline",
      oneLine: "Make sure every lead gets a fast, consistent follow up without adding headcount.",
      bullets: [
        "Auto follow up sequences across email and SMS",
        "Simple rules for handoff to humans when deals need a real person",
        "Weekly summary for owners and sales leaders"
      ],
      cta: "See how this works",
      ctaHref: "/solutions#lead-follow-up"
    },
    {
      title: "Client invoicing and payments",
      oneLine: "Reduce late payments and make it easier for clients to pay you on time.",
      bullets: [
        "Send invoices on a consistent schedule without manual chasing",
        "Use smart reminders and nudges so clients pay before they slip through the cracks",
        "Flag high-risk or overdue accounts so you or your team can step in fast"
      ],
      cta: "See how this works",
      ctaHref: "/solutions#client-invoicing"
    },
    {
      title: "Client onboarding and handoff",
      oneLine: "Cut manual back and forth when you bring new clients on.",
      bullets: [
        "Intake forms that feed straight into your tools",
        "AI helpers to draft welcome emails and next steps",
        "Status snapshots for owners and account managers"
      ],
      cta: "See how this works",
      ctaHref: "/solutions#client-onboarding"
    },
    {
      title: "Support and FAQ automation",
      oneLine: "Answer common questions faster while keeping humans for edge cases.",
      bullets: [
        "AI answers for standard questions across chat and email",
        "Clear rules for when to escalate to a person",
        "Logs so you see what people ask the most"
      ],
      cta: "See how this works",
      ctaHref: "/solutions#support-faq"
    }
  ];

  return (
    <section
      className="py-16 bg-background"
      aria-labelledby="solutions-heading"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <h2 id="solutions-heading" className="heading-xl mb-12 text-center">
            Common AI solutions for your business
          </h2>

          {/* Solution Cards - 2x2 Grid on Desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <article
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray/10 flex flex-col"
                role="article"
                aria-labelledby={`solution-${index}-heading`}
              >
                <h3
                  id={`solution-${index}-heading`}
                  className="text-2xl font-bold mb-4"
                >
                  {solution.title}
                </h3>
                <p className="text-lg text-gray-700 mb-6 flex-grow">
                  {solution.oneLine}
                </p>
                <Link
                  href={solution.ctaHref}
                  className="btn-primary-outline text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={`${solution.cta} - ${solution.title}`}
                >
                  {solution.cta}
                </Link>
              </article>
              ))}
          </div>

          {/* CTA Button */}
          <div className="text-center mt-12">
            <a
              href="/solutions"
              className="btn-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
              aria-label="See all solutions"
            >
              See all solutions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommonSolutionsSection;

