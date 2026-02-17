"use client";

import type { PlanPreviewDay } from "@/lib/leadMagnet/plans";

type ResultsPreviewGridProps = {
  previewDays: PlanPreviewDay[];
};

export function ResultsPreviewGrid({ previewDays }: ResultsPreviewGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {previewDays.map((day) => (
        <div
          key={day.dayLabel}
          className="rounded-lg border border-base-300 bg-base-100 p-4"
        >
          <p className="mb-1 text-sm font-semibold text-base-content/70">
            {day.dayLabel}
          </p>
          <p className="font-semibold text-base-content">{day.title}</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-base-content/80">
            {day.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
