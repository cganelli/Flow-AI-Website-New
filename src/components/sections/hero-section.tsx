"use client";

import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  const statisticsData = [
    {
      number: "24",
      description: "number of business days a year freed up with AI",
      ariaLabel: "24 business days per year freed up with AI automation"
    },
    {
      number: "40%",
      description: "projected boost in employee productivity from AI",
      ariaLabel: "40 percent projected boost in employee productivity from AI"
    },
    {
      number: "27%",
      description: "increase in conversion rates driven by AI-powered sales tools",
      ariaLabel: "27 percent increase in conversion rates driven by AI-powered sales tools"
    },
    {
      number: "40%",
      description: "faster response time by salespeople using AI tools, driving revenue growth",
      ariaLabel: "40 percent faster response time by salespeople using AI tools"
    },
    {
      number: "68%",
      description: "reduction in average resolution time for organizations using AI and automation in customer service",
      ariaLabel: "68 percent reduction in average resolution time for organizations using AI"
    },
    {
      number: "64%",
      description: "decrease in error rates thanks to AI implementation, reducing costly rework and customer complaints",
      ariaLabel: "64 percent decrease in error rates thanks to AI implementation"
    }
  ];

  return (
    <section
      className="pt-8 pb-12 md:pt-16 md:pb-20 relative overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <div className="container-custom">
        {/* Hero Header */}
        <header className="max-w-4xl mx-auto text-center mb-10 md:mb-16">
          <h1 id="hero-heading" className="heading-xl mb-6">
            AI Solutions That Grow Your Business — Not Your Payroll
          </h1>
          <p className="text-lg md:text-xl text-gray max-w-5xl mx-auto">
            Custom automation systems that turn missed calls into booked appointments, build a lead-generating engine that runs 24/7, and boost productivity without adding headcount.
          </p>
        </header>

        {/* Mobile CTA Button - Only visible on mobile */}
        <div className="text-center mb-8 md:hidden">
          <a
            href="#book-appointment"
            className="btn-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            aria-label="Claim Your FREE AI Audit - Book appointment"
          >
            Claim Your FREE Audit
          </a>
        </div>

        {/* Statistics Section */}
        <section aria-labelledby="statistics-heading">
          <h2 id="statistics-heading" className="sr-only">AI Impact Statistics</h2>

          {/* Statistics Cards - Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6">
            {statisticsData.slice(0, 3).map((stat, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray/10 text-center"
                role="region"
                aria-label={stat.ariaLabel}
              >
                <div
                  className="text-4xl font-bold mb-4 text-primary"
                  aria-hidden="true"
                >
                  {stat.number}
                </div>
                <p className="text-lg font-medium">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Statistics Cards - Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
            {statisticsData.slice(3, 6).map((stat, index) => (
              <div
                key={index + 3}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray/10 text-center"
                role="region"
                aria-label={stat.ariaLabel}
              >
                <div
                  className="text-4xl font-bold mb-4 text-primary"
                  aria-hidden="true"
                >
                  {stat.number}
                </div>
                <p className="text-lg font-medium">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Button */}
        <div className="text-center">
          <a
            href="#book-appointment"
            className="btn-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
            aria-label="Let AI Help You - Book your free consultation"
          >
            Let AI Help You
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
