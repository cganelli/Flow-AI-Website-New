/**
 * Free Starter Kit Section Component
 * 
 * Location: /components/sections/free-starter-kit-section.tsx
 * 
 * Purpose: Provides a clear, free entry point focused on training and adoption
 * with email capture for the starter kit, including detailed sub-bullets.
 */

"use client";

import ContactCaptureForm from '@/components/contact-capture-form';

const FreeStarterKitSection = () => {
  const kitContent = [
    {
      title: "Intro lessons",
      items: [
        "Lesson 1: Ship your first AI win in under 60 minutes",
        "Lesson 2: Prompt basics so you get clearer, more useful answers",
        "Lesson 3: Hallucinations and guardrails so people know what to trust"
      ]
    },
    {
      title: "Templates and prompts",
      items: [
        "Email and message helper prompts for faster replies that still sound like you",
        "Meeting notes and recap template so you leave each meeting with clear decisions and next steps",
        "Slide outline prompt to turn rough ideas into a first draft deck"
      ]
    },
    {
      title: "Guardrails for safe use",
      items: [
        "How to handle confidential and regulated information",
        "Tone and brand checks so the output still sounds like your company",
        "When a human decision is required and AI stays in a support role"
      ]
    }
  ];

  return (
    <section
      id="starter-kit"
      className="py-16 bg-gradient-to-br from-primary/5 to-primary/10 scroll-mt-24"
      aria-labelledby="starter-kit-heading"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <h2 id="starter-kit-heading" className="heading-xl mb-6 text-center">
            FREE AI starter kit
          </h2>

          <p className="text-xl text-gray-700 mb-12 text-center max-w-3xl mx-auto">
            Get a short, guided path and a curated set of lessons, prompts, and guardrails to use this month.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left side - Kit Contents */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold mb-6">What you get inside:</h3>
              {kitContent.map((section) => (
                <div key={section.title} className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-900">
                    {section.title}
                  </h4>
                  <ul className="space-y-2 ml-4">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start text-gray-700">
                        <span className="text-gray-900 mr-2 flex-shrink-0">–</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right side - Email Capture Form */}
            <div>
              <ContactCaptureForm
                title="Get your FREE AI starter kit"
                subtitle="Enter your email to receive the FREE AI starter kit."
                buttonText="Get your FREE AI starter kit"
                showCalendlyAfterSubmit={false}
                formId="starter-kit"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FreeStarterKitSection;
