/**
 * TrainingTrackCard Component
 * 
 * Location: /components/training/TrainingTrackCard.tsx
 * 
 * Purpose: Displays a product-style card for training tracks and workshops with dark header,
 * orange accent bar, icon circle, gray pill labels, and outcome highlight strip.
 */

import type React from "react";

type TrainingTrackCardProps = {
  id?: string; // Optional ID for anchor linking
  trackLabel: string; // e.g., "Core track 1", "Core track 2", "Advanced workshop"
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  bestFor: string[];
  learnSections?: {
    label: string;
    items: string[];
  }[];
  formatItems: string[];
  outcomeItems: string[];
  outcomeHighlight: string;
};

export function TrainingTrackCard({
  id,
  trackLabel,
  title,
  subtitle,
  icon,
  bestFor,
  learnSections = [],
  formatItems,
  outcomeItems,
  outcomeHighlight,
}: TrainingTrackCardProps) {
  return (
    <section
      id={id}
      className="relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
    >
      {/* Left accent bar */}
      <div className="absolute inset-y-0 left-0 w-1 bg-[#EA3D2A]" />

      {/* Header band */}
      <div className="flex items-center gap-4 bg-[#131212] px-6 py-5 pl-8">
        {/* Icon circle */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#EA3D2A] bg-[#131212]">
          {icon ?? (
            <svg
              viewBox="0 0 64 64"
              aria-hidden="true"
              className="h-7 w-7 text-[#EA3D2A]"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="14" y="16" width="36" height="26" rx="3" />
                <line x1="14" y1="24" x2="50" y2="24" />
                <path d="M26 30h12" />
              </g>
            </svg>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-base md:text-lg font-bold uppercase tracking-[0.16em] text-[#EA3D2A]">
            {trackLabel}
          </span>
          <h3 className="text-lg font-semibold leading-snug text-white">
            {title}
          </h3>
          <p className="text-sm text-neutral-300">{subtitle}</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 pb-6 pt-6">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {/* Left column: Best for + Format */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-800">
                Best for
              </span>
              <ul className="mt-3 space-y-1 text-sm text-neutral-900">
                {bestFor.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#EA3D2A]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-800">
                Format
              </span>
              <ul className="mt-3 space-y-1 text-sm text-neutral-900">
                {formatItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#EA3D2A]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right column: What the team learns + Outcomes */}
          <div className="flex flex-col gap-6">
            {learnSections.map((section) => (
              <div key={section.label}>
                <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-800">
                  {section.label}
                </span>
                <ul className="mt-3 space-y-1 text-sm text-neutral-900">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#EA3D2A]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-800">
                Outcomes
              </span>
              <ul className="mt-3 space-y-1 text-sm text-neutral-900">
                {outcomeItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#EA3D2A]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom outcome strip */}
        <div className="mt-6 rounded-xl bg-[#FFE5DE] px-4 py-3 text-sm text-neutral-900">
          <div className="flex items-start gap-2">
            <div 
              className="mt-[3px] flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#EA3D2A] text-lg font-bold text-[#EA3D2A]"
              aria-label="Key outcome"
              role="img"
            >
              <span aria-hidden="true">✓</span>
            </div>
            <p>{outcomeHighlight}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

