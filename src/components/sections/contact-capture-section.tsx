"use client";

import ContactCaptureForm from '../contact-capture-form';

interface ContactCaptureSectionProps {
  formId?: string;
}

const BULLETS = [
  {
    title: "Demystify the Tech",
    body: "Ask anything about ChatGPT, Claude, or automation tools without the jargon.",
  },
  {
    title: "Spot Your \"Low-Hanging Fruit\"",
    body: "We'll identify 2–3 manual tasks you can automate this week to save immediate time.",
  },
  {
    title: "Reality Check",
    body: "Not everything should be automated. We'll tell you what's worth the investment and what isn't.",
  },
  {
    title: "Zero Sales Pressure",
    body: "This is about exploration, not a pitch. You leave with a clearer map of your AI potential.",
  },
];

const ContactCaptureSection = ({ formId = "hero" }: ContactCaptureSectionProps) => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-xl mb-4">
              Book a 20-Minute AI Information Session
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No obligation. No sales pitch. Just a 20-minute 1-on-1 to answer your questions about AI, workflows, and automation, and identify where your business can save the most time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - 20 Minutes. Your Questions. Real Answers. + bullets */}
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                20 Minutes. Your Questions. Real Answers.
              </h3>
              <ul className="space-y-4">
                {BULLETS.map((item) => (
                  <li key={item.title} className="flex items-start space-x-4">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600 text-sm mt-0.5">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right side - Form */}
            <div>
              <ContactCaptureForm
                title="Book a 20-Minute AI Information Session"
                subtitle="No obligation. No sales pitch. Just a 20-minute 1-on-1 to answer your questions about AI, workflows, and automation."
                buttonText="Claim My Info Session"
                showCalendlyAfterSubmit={true}
                formId={formId}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCaptureSection;
