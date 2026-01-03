"use client";

import Link from "next/link";
import type { UseCase } from "@/lib/useCaseTypes";
import { LINKS } from "@/lib/links";

type Props = {
  useCase: UseCase;
};

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-800">
      {children}
    </span>
  );
}

function SectionCard({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <div>
      <Pill>{title}</Pill>
      <ul className="mt-3 space-y-1 text-sm text-neutral-900">
        {bullets.map((b) => (
          <li key={b} className="flex gap-2">
            <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#EA3D2A]" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BeforeAfter({ before, after }: { before: string[]; after: string[] }) {
  return (
    <div className="w-full">
      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-800">
            Before
          </span>
          <ul className="mt-3 space-y-1 text-sm text-neutral-900">
            {before.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#EA3D2A]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="inline-flex items-center rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-neutral-800">
            After
          </span>
          <ul className="mt-3 space-y-1 text-sm text-neutral-900">
            {after.map((b) => (
              <li key={b} className="flex gap-2">
                <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#EA3D2A]" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Outcomes({ outcomes }: { outcomes: UseCase["outcomes"] }) {
  return (
    <div className="w-full">
      <Pill>Outcomes / Benefits</Pill>
      <ul className="mt-3 space-y-3 text-sm text-neutral-900">
        {outcomes.map((o) => (
          <li key={o.text} className="flex gap-2">
            <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-[#EA3D2A]" />
            <div className="min-w-0">
              <div>{o.text}</div>
              {o.sources && o.sources.length > 0 ? (
                <div className="mt-1 flex flex-wrap gap-2 text-xs">
                  {o.sources.map((s, idx) => (
                    <a
                      key={s}
                      href={s}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Source ${idx + 1} for outcome: ${o.text.substring(0, 50)}${o.text.length > 50 ? "..." : ""}`}
                      className="rounded-full border border-black/10 bg-black/5 px-2 py-0.5 text-neutral-700 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-1"
                    >
                      Source
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function removePunctuation(text: string): string {
  return text.replace(/[.,;:!?]+$/, '');
}

export default function UseCaseCard({ useCase }: Props) {
  return (
    <article className="relative flex flex-col h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      {/* Left accent bar */}
      <div className="absolute inset-y-0 left-0 w-1 bg-[#EA3D2A]" aria-hidden="true" />

      {/* Header band */}
      <div className="flex items-start justify-between gap-4 bg-[#131212] px-6 py-5 pl-8">
        <div className="flex flex-1 flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="text-xs md:text-sm font-bold uppercase tracking-[0.16em] text-[#EA3D2A]" aria-label={`Tier: ${useCase.tier}`}>
              {useCase.tier.toUpperCase()}
            </span>
          </div>
          <h2 className="text-lg font-semibold leading-snug text-white">
            {removePunctuation(useCase.title)}
          </h2>
          {useCase.subtitle ? (
            <p className="text-sm text-neutral-300">{useCase.subtitle}</p>
          ) : null}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-8 pb-8 pt-6">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          {/* Left column */}
          <div className="flex flex-col gap-6">
            <SectionCard title="Problem to Solve" bullets={useCase.problemToSolve} />
          </div>

          {/* Right column */}
          <div className="flex flex-col gap-6">
            <SectionCard title="What You Get" bullets={useCase.whatYouGet} />
          </div>
        </div>

        {/* Before/After - Full width */}
        <div className="mt-6">
          <BeforeAfter before={useCase.before} after={useCase.after} />
        </div>

        {/* Outcomes - Full width */}
        <div className="mt-6">
          <Outcomes outcomes={useCase.outcomes} />
        </div>

        {/* CTA Button - Fixed distance from bottom using margin-top auto */}
        <div className="mt-auto pt-8 pb-0 flex justify-center">
          <Link
            href={LINKS.freeAudit.href}
            className="inline-flex items-center justify-center rounded-lg bg-[#EA3D2A] px-6 py-3 text-sm font-semibold text-white hover:bg-[#EA3D2A]/90 focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-2"
            aria-label={`Book a FREE AI audit for ${useCase.title}`}
          >
            Book a FREE AI audit
          </Link>
        </div>
      </div>
    </article>
  );
}
