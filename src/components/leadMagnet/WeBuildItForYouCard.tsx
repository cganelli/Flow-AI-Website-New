"use client";

import type { PlanComparisonContent } from "@/lib/leadMagnet/blueprintCallContent";

const BRAND_COLOR = "#EA3D2A";

function CheckIcon({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <title>Check</title>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

type WeBuildItForYouCardProps = {
  content: PlanComparisonContent["flow"];
};

export function WeBuildItForYouCard({ content }: WeBuildItForYouCardProps) {
  return (
    <div
      className="relative rounded-xl bg-white border-2 shadow-2xl p-6 h-fit"
      style={{ borderColor: BRAND_COLOR }}
    >
      <span
        className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wide"
        style={{ backgroundColor: BRAND_COLOR }}
      >
        Most Popular
      </span>
      <h3 className="text-lg font-bold text-neutral-900 mt-2">
        We build it for you
      </h3>
      <p className="mt-2 text-sm text-neutral-700">
        <span className="font-semibold">Time:</span> {content.time}
      </p>
      <p className="mt-3 text-sm font-semibold text-neutral-900">Implementation output:</p>
      <ul className="mt-2 space-y-1">
        {content.implementationOutput.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-neutral-800">
            <CheckIcon className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: BRAND_COLOR }} />
            {item}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm font-semibold text-neutral-900">Quality assurance:</p>
      <ul className="mt-2 space-y-1">
        {content.qualityAssurance.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-neutral-800">
            <CheckIcon className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: BRAND_COLOR }} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
