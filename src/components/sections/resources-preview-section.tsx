/**
 * Resources Preview Section Component
 * 
 * Location: /components/sections/resources-preview-section.tsx
 * 
 * Purpose: Shows the depth of the Flow AI ecosystem with 3 cards linking
 * to different resource categories (Lessons, Agents & GPTs, Packs & Templates).
 */

"use client";

const ResourcesPreviewSection = () => {
  const resourceCards = [
    {
      title: "Lessons",
      description: "Step-by-step video lessons from the Flow AI course, AI for Gen X",
      href: "/resources?category=lessons"
    },
    {
      title: "Agents and GPTs",
      description: "AI specialists built for specific jobs like competitive analysis and executive summaries",
      href: "/resources?category=agents-gpts"
    },
    {
      title: "Packs and templates",
      description: "Worksheets, prompts, and materials to accompany lessons or use standalone",
      href: "/resources?category=packs-templates"
    }
  ];

  return (
    <section
      className="py-16 bg-background border-t border-gray/10"
      aria-labelledby="resources-preview-heading"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <h2 id="resources-preview-heading" className="heading-xl mb-12 text-center">
            FREE resources for your AI journey
          </h2>

          {/* 3 Cards in a Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resourceCards.map((card, index) => (
              <article
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm border border-gray/10 flex flex-col hover:shadow-md transition-shadow"
                role="article"
                aria-labelledby={`resource-${index}-heading`}
              >
                <h3
                  id={`resource-${index}-heading`}
                  className="text-2xl font-bold mb-4"
                >
                  {card.title}
                </h3>
                <p className="text-gray-700 mb-6 flex-grow">
                  {card.description}
                </p>
                <a
                  href={card.href}
                  className="btn-primary-outline text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label={`Browse ${card.title} resources`}
                >
                  Browse {card.title.toLowerCase()}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesPreviewSection;

