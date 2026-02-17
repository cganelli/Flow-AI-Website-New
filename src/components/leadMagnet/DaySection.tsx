"use client";

import { useState } from "react";
import { Card } from "./Card";
import { StepCard } from "./StepCard";
import type { PlanFullDay } from "@/lib/leadMagnet/plans";

type DaySectionProps = {
  day: PlanFullDay;
  /** When true, this day is expanded (used for PDF export so all content is visible). */
  defaultExpanded?: boolean;
  /** When true, always show content (used during PDF capture). */
  forceExpanded?: boolean;
};

export function DaySection({ day, defaultExpanded = false, forceExpanded = false }: DaySectionProps) {
  const [open, setOpen] = useState(defaultExpanded);
  const isOpen = forceExpanded || open;
  const id = `day-${day.dayLabel.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <section id={id} className="scroll-mt-[10rem]">
      <Card accent>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="w-full text-left focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-2 rounded-lg -m-2 p-2"
          aria-expanded={isOpen}
          aria-controls={`${id}-content`}
          id={`${id}-button`}
        >
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#EA3D2A]">
            {day.dayLabel}
          </p>
          <h2 className="mt-2 text-xl font-semibold text-neutral-900 flex items-center justify-between gap-2">
            {day.title}
            <span className="flex-shrink-0 text-neutral-500" aria-hidden>
              {isOpen ? "−" : "+"}
            </span>
          </h2>
        </button>
        {isOpen && (
          <section id={`${id}-content`} aria-labelledby={`${id}-button`}>
            <p className="mt-2 text-sm text-neutral-700">{day.summary}</p>
            <div className="mt-6 space-y-4">
              {day.steps.map((s) => (
                <StepCard key={s.stepNumber} step={s} alwaysShowPrompt />
              ))}
            </div>
          </section>
        )}
      </Card>
    </section>
  );
}
