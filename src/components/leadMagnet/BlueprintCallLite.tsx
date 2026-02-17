"use client";

import type { LeadMagnetSubmission } from "@/lib/leadMagnet/types";
import type { PlanContent } from "@/lib/leadMagnet/plans";
import { buildCalendlyUrl, CALENDLY_CAMPAIGN } from "@/lib/leadMagnet/calendly";

type BlueprintCallLiteProps = {
  submission: LeadMagnetSubmission;
  plan: PlanContent;
};

export function BlueprintCallLite({ submission, plan }: BlueprintCallLiteProps) {
  const baseUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
  const url = buildCalendlyUrl(baseUrl, submission, plan.meta.name, { utmCampaign: CALENDLY_CAMPAIGN.WE_BUILD_IT });
  const href = url || "/book-call";

  return (
    <section
      aria-labelledby="blueprint-call-lite-heading"
      className="rounded-2xl border-2 border-[#EA3D2A]/30 bg-[#EA3D2A]/5 py-6 px-6 text-center"
    >
      <h2
        id="blueprint-call-lite-heading"
        className="text-xl font-bold text-neutral-900"
      >
        Want this system running by next Friday?
      </h2>
      <p className="mt-2 text-sm text-neutral-700">
        Skip the setup. We&apos;ll build it for you in 7 days.
      </p>
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        className="btn btn-primary whitespace-nowrap text-sm font-semibold px-6 py-3 flex-shrink-0 mt-4 inline-flex items-center justify-center"
      >
        Let us build it for you
      </a>
    </section>
  );
}
