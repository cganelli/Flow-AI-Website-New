"use client";

import Link from "next/link";

const AIBenefitsSection = () => {
  const benefits = [
    "Unlock new revenue streams (on autopilot, 24/7)",
    "Eliminate repetitive tasks & free up your team's time",
    "Build scalable, automated systems that drive growth"
  ];

  return (
    <section className="py-16 bg-background border-t border-gray/10">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h2 className="heading-lg mb-12 text-center">
            Solutions That Save You Time &amp; Money
          </h2>

          <div className="mb-10">
            <h3 className="text-xl mb-6 text-center">Growing companies use AI to:</h3>

            <ul className="space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center">
                  <div className="w-5 h-5 rounded-full bg-primary mr-3 flex-shrink-0" />
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <a href="#book-appointment" className="btn-primary">
              Get Your Free AI Audit
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIBenefitsSection;
