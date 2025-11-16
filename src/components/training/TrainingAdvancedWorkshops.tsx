/**
 * TrainingAdvancedWorkshops Component
 * 
 * Location: /components/training/TrainingAdvancedWorkshops.tsx
 * 
 * Purpose: Displays cards for advanced workshops with links to detailed sections.
 */

import React from "react";
import { WorkshopCard } from "./training-types";

interface TrainingAdvancedWorkshopsProps {
  title: string;
  cards: WorkshopCard[];
}

export function TrainingAdvancedWorkshops(
  props: TrainingAdvancedWorkshopsProps,
) {
  const { title, cards } = props;

  return (
    <section className="pt-6 pb-9 md:pt-8 md:pb-12 bg-black">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto">
          <h2 className="heading-lg text-center mb-8 text-white">{title}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {cards.map((card) => (
              <article
                key={card.id}
                className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    {card.shortText}
                  </p>
                </div>
                <a
                  href={`#${card.anchorId}`}
                  className="text-sm font-semibold text-primary hover:underline inline-flex items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
                  aria-label={`View details for ${card.title}`}
                >
                  View details
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

