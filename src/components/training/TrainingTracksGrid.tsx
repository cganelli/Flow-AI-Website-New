/**
 * TrainingTracksGrid Component
 * 
 * Location: /components/training/TrainingTracksGrid.tsx
 * 
 * Purpose: Displays all training track cards in a responsive grid layout.
 */

import React from "react";
import { TrainingTrackCard } from "./TrainingTrackCard";
import type { TrainingTrack } from "./training-types";
import type { WorkshopDetail } from "./training-types";

interface TrainingTracksGridProps {
  coreTracks: TrainingTrack[];
  workshopDetails: WorkshopDetail[];
}

export function TrainingTracksGrid({
  coreTracks,
  workshopDetails,
}: TrainingTracksGridProps) {
  // Helper function to create outcome highlight from outcomes array
  const createOutcomeHighlight = (outcomes: string[], trackTitle: string): string => {
    if (outcomes.length === 0) return "";
    
    // Special cases for specific tracks with custom highlights
    if (trackTitle.includes("Foundations")) {
      return "Your team leaves with one AI workflow per person and a shared baseline.";
    }
    if (trackTitle.includes("Everyday Work")) {
      return "Immediate time savings on writing and communication tasks with reusable templates.";
    }
    if (trackTitle.includes("Leaders")) {
      return "Simple AI adoption plan for the next 90 days with draft guardrails and priority workflows.";
    }
    if (trackTitle.includes("Automation Opportunities")) {
      return "Ranked list of automation opportunities with clear start-here recommendations.";
    }
    if (trackTitle.includes("Process Redesign")) {
      return "Updated SOPs ready to share with staff, plus a template for future improvements.";
    }
    if (trackTitle.includes("AI Champions")) {
      return "Internal group that supports day-to-day AI questions with a shared library of workflows.";
    }
    
    // Fallback: use the first outcome
    return outcomes[0];
  };

  return (
    <section className="py-12 md:py-16 bg-[#F5F5F5]">
      <div className="container-custom">
        <div className="max-w-7xl mx-auto">
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            {/* Core Training Tracks */}
            {coreTracks.map((track, index) => (
              <TrainingTrackCard
                key={track.id}
                id={`track-${track.id}`}
                trackLabel={`Core track ${index + 1}`}
                title={track.title}
                subtitle={track.shortOverview}
                bestFor={track.bestFor}
                learnSections={track.learnSections.map((section) => ({
                  label: section.title,
                  items: section.points,
                }))}
                formatItems={track.format}
                outcomeItems={track.outcomes}
                outcomeHighlight={createOutcomeHighlight(track.outcomes, track.title)}
              />
            ))}

            {/* Advanced Workshops */}
            {workshopDetails.map((workshop, index) => (
              <TrainingTrackCard
                key={workshop.id}
                id={workshop.id}
                trackLabel="Advanced workshop"
                title={workshop.title}
                subtitle={workshop.shortOverview}
                bestFor={workshop.whoFor}
                learnSections={workshop.learnPoints.map((section) => ({
                  label: section.title,
                  items: section.points,
                }))}
                formatItems={workshop.format}
                outcomeItems={workshop.outcomes}
                outcomeHighlight={createOutcomeHighlight(workshop.outcomes, workshop.title)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

