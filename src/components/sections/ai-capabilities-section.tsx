"use client";

import Link from "next/link";

interface AICapabilitiesSectionProps {
  sectionId?: string;
}

const AICapabilitiesSection = ({ sectionId = "ai-capabilities" }: AICapabilitiesSectionProps) => {
  const capabilities = [
    "Client Invoicing",
    "Lead Generation",
    "Project Management",
    "Client Onboarding",
    "Automated Marketing",
    "Data Entry and Processing",
    "Financial Reporting",
    "Social Media Management",
    "Customer Support",
    "Performance Tracking",
    "Appointment Setting",
    "Feedback Collection"
  ];

  return (
    <section
      id={sectionId}
      className="py-16 bg-black text-white"
      aria-labelledby={`${sectionId}-heading`}
    >
      <div className="container-custom">
        <header className="max-w-4xl mx-auto text-center mb-12">
          <h2 id={`${sectionId}-heading`} className="heading-lg mb-2">
            If AI can do all of THIS
          </h2>
          <p className="text-xl italic">
            (imagine what it could do for YOUR company)
          </p>
        </header>

        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8"
          role="list"
          aria-label="AI automation capabilities"
        >
          {capabilities.map((capability, index) => (
            <div
              key={capability}
              className="border border-white/20 p-4 rounded-lg text-center"
              role="listitem"
              tabIndex={0}
              aria-label={`AI capability: ${capability}`}
            >
              {capability}
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#book-appointment"
            className="btn-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Learn What AI Can Do For You - Book consultation"
          >
            Learn What AI Can Do For You
          </a>
        </div>
      </div>
    </section>
  );
};

export default AICapabilitiesSection;
