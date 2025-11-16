/**
 * TrainingWorkshopDetails Component
 * 
 * Location: /components/training/TrainingWorkshopDetails.tsx
 * 
 * Purpose: Displays detailed information for each advanced workshop.
 */

import React from "react";
import { WorkshopDetail } from "./training-types";

interface TrainingWorkshopDetailsProps {
  title: string;
  details: WorkshopDetail[];
}

export function TrainingWorkshopDetails(props: TrainingWorkshopDetailsProps) {
  const { title, details } = props;

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto space-y-10">
          <h2 className="heading-lg text-center mb-8">{title}</h2>
          {details.map((workshop) => (
            <article
              key={workshop.id}
              id={workshop.id}
              className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 shadow-sm"
            >
              <h2 className="heading-md mb-3">
                {workshop.title}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {workshop.shortOverview}
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                  <h3 className="text-sm font-semibold mb-3 text-gray-900">
                    Who it is for
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {workshop.whoFor.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2 space-y-6">
                  {workshop.learnPoints.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3 className="text-sm font-semibold mb-3 text-gray-900">
                        {section.title}
                      </h3>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {section.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-gray-900">Format</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {workshop.format.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold mb-3 text-gray-900">Outcomes</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {workshop.outcomes.map((item, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

