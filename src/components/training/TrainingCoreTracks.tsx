/**
 * TrainingCoreTracks Component
 * 
 * Location: /components/training/TrainingCoreTracks.tsx
 * 
 * Purpose: Displays the core training tracks with detailed information about each track.
 */

import React from "react";
import type { TrainingTrack } from "./training-types";

interface TrainingCoreTracksProps {
  title: string;
  tracks: TrainingTrack[];
}

export function TrainingCoreTracks(props: TrainingCoreTracksProps) {
  const { title, tracks } = props;

  return (
    <section className="py-9 md:py-12 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto space-y-8">
          <h2 className="heading-lg text-center mb-8">{title}</h2>
          {tracks.map((track) => (
            <article
              key={track.id}
              id={`track-${track.id}`}
              className="bg-white rounded-lg border border-gray-200 p-6 md:p-8 shadow-sm"
            >
              <h3 className="heading-md mb-3">
                {track.title}
              </h3>
              <p className="text-lg text-gray-600 mb-6">
                {track.shortOverview}
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="md:col-span-1">
                  <h4 className="text-sm font-semibold mb-3 text-gray-900">Best for</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    {track.bestFor.map((item) => (
                      <li key={item} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-2 space-y-6">
                  {track.learnSections.map((section) => (
                    <div key={section.title}>
                      <h4 className="text-sm font-semibold mb-3 text-gray-900">
                        {section.title}
                      </h4>
                      <ul className="space-y-2 text-sm text-gray-700">
                        {section.points.map((point) => (
                          <li key={point} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-gray-900">Format</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {track.format.map((item) => (
                        <li key={item} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-gray-900">Outcomes</h4>
                    <ul className="space-y-2 text-sm text-gray-700">
                      {track.outcomes.map((item) => (
                        <li key={item} className="flex items-start">
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

