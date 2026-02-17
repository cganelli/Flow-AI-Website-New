"use client";

import { useEffect, useState } from "react";
import type { PlanFullDay } from "@/lib/leadMagnet/plans";

export function getDaySectionId(dayLabel: string): string {
  return `day-${dayLabel.replace(/\s+/g, "-").toLowerCase()}`;
}

type RoadmapStickyBarProps = {
  fullDays: PlanFullDay[];
  blueprintCallUrl: string;
  /** When set, shows a subtle "Download PDF" link that opens the disclaimer modal before PDF download. */
  onDownloadClick?: () => void;
};

export function RoadmapStickyBar({ fullDays, blueprintCallUrl, onDownloadClick }: RoadmapStickyBarProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ids = fullDays.map((d) => getDaySectionId(d.dayLabel));
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (elements.length === 0) return;

    const targetTop = 140;
    const updateActive = () => {
      let bestIndex = 0;
      let bestDistance = Number.POSITIVE_INFINITY;
      for (let index = 0; index < elements.length; index++) {
        const el = elements[index];
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - targetTop);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      }
      setActiveIndex(bestIndex);
    };

    const observer = new IntersectionObserver(
      () => updateActive(),
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.1, 0.5, 1] }
    );
    for (const el of elements) observer.observe(el);
    updateActive();

    const onScroll = () => requestAnimationFrame(updateActive);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [fullDays]);

  return (
    <nav
      className="sticky top-24 z-30 border-b border-neutral-200 bg-white/95 backdrop-blur shadow-sm scroll-smooth pt-2 pb-3"
      aria-label="Roadmap progress"
    >
      <div className="container-custom flex flex-nowrap items-center justify-between gap-3 overflow-hidden">
        <ul className="flex flex-nowrap items-center gap-2 min-w-0 overflow-x-auto py-1">
          {fullDays.map((day, index) => {
            const id = getDaySectionId(day.dayLabel);
            const isActive = activeIndex === index;
            return (
              <li key={day.dayLabel}>
                <a
                  href={`#${id}`}
                  onClick={() => setActiveIndex(index)}
                  className={`inline-flex items-center rounded-lg border-2 px-5 py-3 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-1 ${
                    isActive
                      ? "border-orange-500 bg-white text-neutral-900"
                      : "border-neutral-200 bg-white text-neutral-700 hover:border-[#EA3D2A] hover:text-[#EA3D2A]"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {day.dayLabel}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-shrink-0 items-center gap-4">
          {onDownloadClick != null && (
            <button
              type="button"
              onClick={onDownloadClick}
              className="flex items-center gap-3 text-base font-normal text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-1 rounded border-0 bg-transparent py-2 px-3 whitespace-nowrap"
              aria-label="Download PDF"
            >
              <PdfIcon className="h-7 w-7 flex-shrink-0" />
              Download PDF
            </button>
          )}
          <a
            href={blueprintCallUrl}
            target={blueprintCallUrl.startsWith("http") ? "_blank" : undefined}
            rel={blueprintCallUrl.startsWith("http") ? "noreferrer" : undefined}
            className="btn btn-primary whitespace-nowrap text-sm font-semibold px-6 py-3 flex-shrink-0"
          >
            Let us build it for you
          </a>
        </div>
      </div>
    </nav>
  );
}

function PdfIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <title>PDF document</title>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 15h6M9 18h6M9 12v6" />
    </svg>
  );
}
