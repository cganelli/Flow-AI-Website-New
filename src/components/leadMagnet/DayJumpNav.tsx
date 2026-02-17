"use client";

import type { PlanFullDay } from "@/lib/leadMagnet/plans";

type DayJumpNavProps = {
  fullDays: PlanFullDay[];
};

export function DayJumpNav({ fullDays }: DayJumpNavProps) {
  return (
    <nav
      className="flex flex-wrap items-center gap-2 rounded-lg border border-neutral-200 bg-white px-4 py-3 shadow-sm"
      aria-label="Jump to day"
    >
      <span className="text-sm font-semibold text-neutral-700 mr-2">
        Jump to day
      </span>
      <ul className="flex flex-wrap gap-2">
        {fullDays.map((day) => {
          const id = `day-${day.dayLabel.replace(/\s+/g, "-").toLowerCase()}`;
          return (
            <li key={day.dayLabel}>
              <a
                href={`#${id}`}
                className="inline-flex items-center rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-800 hover:border-[#EA3D2A] hover:text-[#EA3D2A] focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-1 transition-colors"
              >
                {day.dayLabel}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
