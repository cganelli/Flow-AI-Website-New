"use client";

interface ProcessSectionProps {
  sectionId?: string;
}

const ProcessSection = ({ sectionId = "process" }: ProcessSectionProps) => {
  const processSteps = [
    {
      number: "1",
      title: "We FRAME the AI strategy around your business goals",
      description: "We analyze your workflows, uncover high-impact opportunities, and design a custom AI roadmap that fits your operations.",
      image: "/images/Frame.svg",
      keyWord: "FRAME"
    },
    {
      number: "2",
      title: "We FORGE and implement your custom AI system FAST",
      description: "From automations to custom agents, we build powerful AI tools that integrate with your existing platforms and deliver real results.",
      image: "/images/Forge.svg",
      keyWord: "FORGE"
    },
    {
      number: "3",
      title: "We FINE-TUNE and scale your custom AI system as you grow",
      description: "As your business evolves, we optimize and expand your AI systems to keep performance high and results compounding.",
      image: "/images/FineTune.svg",
      keyWord: "FINE-TUNE"
    }
  ];

  const formatTitle = (title: string, keyWord: string) => {
    const parts = title.split(keyWord);
    if (parts.length === 2) {
      return (
        <>
          {parts[0]}
          <span className="text-brand-lg">{keyWord}</span>
          {parts[1]}
        </>
      );
    }
    return title;
  };

  return (
    <section
      className="py-16 bg-background"
      id={sectionId}
      aria-labelledby={`${sectionId}-heading`}
    >
      <div className="container-custom">
        {/* Section Header */}
        <header className="text-center mb-16">
          <h2 id={`${sectionId}-heading`} className="heading-xl mb-8">Our Process</h2>
        </header>

        {/* Process Steps Grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          role="list"
          aria-label="Three-step AI implementation process"
        >
          {processSteps.map((step, index) => (
            <article
              key={step.number}
              className="text-center"
              role="listitem"
              aria-labelledby={`${sectionId}-step-${step.number}-heading`}
            >
              {/* Step Number */}
              <div
                className="text-6xl font-bold text-brand-lg mb-6"
                aria-label={`Step ${step.number}`}
              >
                {step.number}
              </div>

              {/* Step Title */}
              <h3
                id={`${sectionId}-step-${step.number}-heading`}
                className="text-xl md:text-2xl font-bold mb-8 leading-tight"
              >
                {formatTitle(step.title, step.keyWord)}
              </h3>

              {/* Step Image */}
              <div className="mb-8 flex justify-center">
                <img
                  src={step.image}
                  alt={step.number === "1" ? "Illustration representing the FRAME step in AI strategy development" :
                       step.number === "2" ? "Graphic depicting the FORGE phase of AI implementation" :
                       "Image showing the FINE-TUNE process for optimizing AI systems"}
                  className="w-32 h-32 md:w-40 md:h-40"
                  role="img"
                  loading="lazy"
                />
              </div>

              {/* Step Description */}
              <p className="text-gray text-sm md:text-base leading-relaxed">
                {step.description}
              </p>
            </article>
          ))}
        </div>

        {/* Bottom Tagline */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold">
            We help your business <span className="text-brand-lg">FLOW</span>
          </h3>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
