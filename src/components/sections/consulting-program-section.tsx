/**
 * Consulting Program Section Component
 * 
 * Location: /components/sections/consulting-program-section.tsx
 * 
 * Purpose: Highlights the "Flow AI Scale Sprint" consulting program with
 * clear steps and outcomes, mirroring the clarity of similar programs.
 */

"use client";

const ConsultingProgramSection = () => {
  const steps = [
    {
      title: "Frame",
      description: "Frame the highest value workflows for AI based on revenue, cost, and risk."
    },
    {
      title: "Forge",
      description: "Forge the AI agents, prompts, and automations inside your current tools."
    },
    {
      title: "Field test",
      description: "Field test the new system with real data and staff, then fix the gaps you find."
    },
    {
      title: "Formalize",
      description: "Formalize the process with SOP updates, training, and simple guardrails."
    }
  ];

  return (
    <section
      className="py-6 md:py-10 bg-background border-t border-gray/10"
      aria-labelledby="consulting-program-heading"
    >
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <h2 id="consulting-program-heading" className="heading-xl mb-12 text-center">
            AI projects that work
          </h2>

          <div className="bg-white rounded-xl shadow-sm border border-gray/10 p-6 md:p-10 mb-6">
            {/* 4 Steps in a Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {steps.map((step, index) => {
                // Map step titles to SVG file names
                const svgMap: Record<string, string> = {
                  "Frame": "Frame.svg",
                  "Forge": "Forge.svg",
                  "Field test": "FIELDTEST.svg",
                  "Formalize": "FORMALIZE.svg"
                };
                const svgPath = `/images/${svgMap[step.title]}`;
                
                const formatDescription = (desc: string, keyword: string) => {
                  // Find the keyword in the description (case-insensitive)
                  const regex = new RegExp(`(${keyword})`, 'gi');
                  const parts = desc.split(regex);
                  
                  return (
                    <>
                      {parts.map((part, i) => 
                        part.toLowerCase() === keyword.toLowerCase() ? (
                          <strong key={i} className="uppercase">{part}</strong>
                        ) : (
                          part
                        )
                      )}
                    </>
                  );
                };
                
                return (
                  <div
                    key={index}
                    className="text-center"
                    role="article"
                    aria-labelledby={`step-${index}-heading`}
                  >
                    <div className="mb-4 flex justify-center">
                      <img
                        src={svgPath}
                        alt={`${step.title} step icon`}
                        className="w-[120px] h-[120px] md:w-[160px] md:h-[160px]"
                        loading="lazy"
                      />
                    </div>
                    <h4
                      id={`step-${index}-heading`}
                      className="sr-only"
                    >
                      {step.title}
                    </h4>
                    <p className="text-gray-600 text-xl" aria-label={`${step.title}: ${step.description}`}>
                      {formatDescription(step.description, step.title)}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Output Line */}
            <div className="bg-primary/5 rounded-lg p-6 mb-6">
              <p className="text-2xl text-gray-700 text-center">
                <strong>You get FLOW:</strong> a live system, documented steps, and a team that knows how to use it.
              </p>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="/contact?topic=projects"
                className="btn-primary bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary"
                aria-label="Learn about AI projects with Flow AI"
              >
                Learn about AI projects with Flow AI
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultingProgramSection;

