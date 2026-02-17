"use client";

import { Card } from "./Card";
import type { PlanPreviewDay } from "@/lib/leadMagnet/plans";

function getDaySectionId(dayLabel: string): string {
  return `day-${dayLabel.replace(/\s+/g, "-").toLowerCase()}`;
}

type PreviewGridProps = {
  previewDays: PlanPreviewDay[];
  /** When true, each card links to the corresponding day section for smooth scroll */
  makeCardsClickable?: boolean;
};

export function PreviewGrid({ previewDays, makeCardsClickable = false }: PreviewGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-7 items-stretch">
      {previewDays.map((day) => {
        const content = (
          <>
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#EA3D2A]">
              {day.dayLabel}
            </p>
            <h3 className="mt-2 text-base font-semibold text-neutral-900">
              {day.title}
            </h3>
            <ul className="mt-3 space-y-1 text-sm text-neutral-700">
              {day.bullets.slice(0, 3).map((bullet) => (
                <li key={bullet} className="flex gap-2">
                  <span className="mt-[6px] h-[6px] w-[6px] flex-shrink-0 rounded-full bg-[#EA3D2A]" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </>
        );
        if (makeCardsClickable) {
          const sectionId = getDaySectionId(day.dayLabel);
          return (
            <a
              key={day.dayLabel}
              href={`#${sectionId}`}
              className="block h-full transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-2 rounded-2xl"
            >
              <Card accent className="h-full">{content}</Card>
            </a>
          );
        }
        return (
          <Card key={day.dayLabel} accent className="h-full">
            {content}
          </Card>
        );
      })}
    </div>
  );
}
