"use client";

import type { PlanFullDay } from "@/lib/leadMagnet/plans";

type DayNavProps = {
  fullDays: PlanFullDay[];
};

export function DayNav({ fullDays }: DayNavProps) {
  return (
    <nav className="rounded-lg border border-base-300 bg-base-100 p-4" aria-label="Day navigation">
      <p className="mb-2 text-sm font-semibold text-base-content/70">Jump to day</p>
      <ul className="flex flex-wrap gap-2">
        {fullDays.map((day) => {
          const id = `day-${day.dayLabel.replace(/\s+/g, "-").toLowerCase()}`;
          return (
            <li key={day.dayLabel}>
              <a
                href={`#${id}`}
                className="btn btn-ghost btn-sm"
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
