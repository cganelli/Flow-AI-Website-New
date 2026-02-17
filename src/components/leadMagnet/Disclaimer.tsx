"use client";

import { DISCLAIMER_PAGE_TEXT } from "@/lib/leadMagnet/disclaimer";

type DisclaimerProps = {
  /** Optional container class (e.g. max-w-6xl mx-auto to match accordion width) */
  containerClassName?: string;
  /** When true, use minimal vertical padding (e.g. for results page under Day 7) */
  compact?: boolean;
};

export function Disclaimer({ containerClassName, compact }: DisclaimerProps) {
  return (
    <section
      className={`border-t border-neutral-200 px-4 bg-background ${compact ? "py-3" : "py-8"}`}
      aria-label="Disclaimer"
    >
      <div className={containerClassName ?? "mx-auto max-w-3xl"}>
        <h2 className="text-sm font-semibold text-neutral-700">DIY use notice</h2>
        <p className="mt-2 text-sm text-neutral-600">
          {DISCLAIMER_PAGE_TEXT}
        </p>
      </div>
    </section>
  );
}
