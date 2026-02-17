"use client";

import { useState } from "react";
import type { LeadMagnetSubmission } from "@/lib/leadMagnet/types";
import type { PlanContent } from "@/lib/leadMagnet/plans";
import { getPlanComparisonContent } from "@/lib/leadMagnet/blueprintCallContent";
import { buildCalendlyUrl, CALENDLY_CAMPAIGN } from "@/lib/leadMagnet/calendly";
import { WeBuildItForYouCard } from "@/components/leadMagnet/WeBuildItForYouCard";
import {
  WHAT_HAPPENS_LEFT,
  WHAT_HAPPENS_RIGHT,
} from "@/components/leadMagnet/WhatHappensOnCallSection";

type BlueprintCallSectionProps = {
  submission: LeadMagnetSubmission;
  plan: PlanContent;
};

export function BlueprintCallSection({ submission, plan }: BlueprintCallSectionProps) {
  const [showCalendly, setShowCalendly] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
  const url = buildCalendlyUrl(baseUrl, submission, plan.meta.name, {
    utmCampaign: CALENDLY_CAMPAIGN.WE_BUILD_IT,
  });
  const hasCalendlyUrl = Boolean(url?.startsWith("http"));
  const content = getPlanComparisonContent(plan.meta.slug);

  return (
    <section
      id="prefer-done-for-you"
      className="py-16 bg-black text-white scroll-mt-[200px]"
      aria-labelledby="blueprint-call-heading"
    >
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            id="blueprint-call-heading"
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          >
            Prefer the &quot;Done-For-You&quot; route?
          </h2>
          <p className="mt-4 text-xl text-white/90">
            Want this system running by next Friday?
          </p>

          {/* Choose Your Path: two-column comparison (plan-specific) */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto text-left">
            {/* Column 1: I'll Build It Myself */}
            <div className="rounded-xl bg-neutral-200 border border-neutral-300 p-6">
              <h3 className="text-lg font-bold text-neutral-900">
                I&apos;ll Build It Myself
              </h3>
              <p className="mt-3 text-sm text-neutral-700">
                <span className="font-semibold">Time:</span> {content.diy.time}
              </p>
              {content.diy.calendar != null && (
                <p className="mt-1 text-sm text-neutral-700">
                  <span className="font-semibold">Calendar:</span> {content.diy.calendar}
                </p>
              )}
              <p className="mt-3 text-sm font-semibold text-neutral-900">DIY risk</p>
              <ul className="mt-2 space-y-1">
                {content.diy.riskBullets.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-neutral-700">
                    <span className="text-neutral-500 flex-shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: We build it for you */}
            <WeBuildItForYouCard content={content.flow} />
          </div>

          {/* What Happens on the Call: headline centered, two columns of left-justified bullets */}
          <div className="mt-10 max-w-4xl mx-auto">
            <h3 className="text-4xl font-semibold text-white text-center">What Happens on the Call</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
              <ul className="space-y-2 text-white/90 text-lg list-none">
                {WHAT_HAPPENS_LEFT.map((item) => (
                  <li key={item} className="flex gap-2 items-start">
                    <span className="text-[#EA3D2A] flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2 text-white/90 text-lg list-none">
                {WHAT_HAPPENS_RIGHT.map((item) => (
                  <li key={item} className="flex gap-2 items-start">
                    <span className="text-[#EA3D2A] flex-shrink-0">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Book a We build it for you Call CTA: toggles expand to show Calendly link below */}
          <div className="mt-10 flex justify-center">
            {hasCalendlyUrl ? (
              <button
                type="button"
                onClick={() => setShowCalendly((v) => !v)}
                className="btn btn-primary whitespace-nowrap text-sm font-semibold px-6 py-3 flex-shrink-0"
              >
                {showCalendly ? "Hide booking link" : "Book a \"We build it for you\" Call"}
              </button>
            ) : (
              <a
                href="/book-call"
                className="btn btn-primary whitespace-nowrap text-sm font-semibold px-6 py-3 flex-shrink-0"
              >
                Book a &quot;We build it for you&quot; Call
              </a>
            )}
          </div>

          {/* Expanded: Calendly link (below What Happens, revealed when CTA clicked) */}
          {hasCalendlyUrl && showCalendly && (
            <div className="mt-6 max-w-4xl mx-auto text-center" id="blueprint-calendly-link">
              <p className="text-white/90 text-lg mb-3">Book your call:</p>
              <a
                href={url ?? ""}
                target="_blank"
                rel="noreferrer"
                className="text-[#EA3D2A] font-semibold underline underline-offset-2 hover:text-white/90 break-all"
              >
                {url}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
