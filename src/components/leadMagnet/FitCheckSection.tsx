"use client";

import type { LeadMagnetSubmission } from "@/lib/leadMagnet/types";
import type { PlanContent } from "@/lib/leadMagnet/plans";
import { buildCalendlyUrl } from "@/lib/leadMagnet/calendly";
import { PrimaryButton } from "./PrimaryButton";

type FitCheckSectionProps = {
  submission: LeadMagnetSubmission;
  plan: PlanContent;
};

export function FitCheckSection({ submission, plan }: FitCheckSectionProps) {
  const baseUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
  const url = buildCalendlyUrl(baseUrl, submission, plan.meta.name);

  return (
    <section
      id="fit-check"
      className="py-16 bg-black text-white"
      aria-labelledby="fit-check-heading"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            id="fit-check-heading"
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          >
            Fit Check
          </h2>
          <p className="mt-3 text-xl text-white/90 max-w-2xl mx-auto">
            A 30-minute call to see if we can build this plan for you in 7 business days.
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-white/20 bg-white/5 p-6 text-left">
              <h3 className="font-semibold text-white">What happens on the call</h3>
              <p className="mt-2 text-sm text-white/90">
                We pick one process to implement first, confirm triggers and owners, and agree what done looks like in 7 days.
              </p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/5 p-6 text-left">
              <h3 className="font-semibold text-white">What you leave with</h3>
              <p className="mt-2 text-sm text-white/90">
                A fixed-scope build proposal and next steps to get started.
              </p>
            </div>
            <div className="rounded-xl border border-white/20 bg-white/5 p-6 text-left">
              <h3 className="font-semibold text-white">What this is not</h3>
              <p className="mt-2 text-sm text-white/90">
                Not a sales pitch. Not a demo. A working session to scope one pilot.
              </p>
            </div>
          </div>
          <div className="mt-10">
            {url ? (
              <PrimaryButton as="a" href={url} target="_blank" rel="noreferrer">
                Book my Fit Check
              </PrimaryButton>
            ) : (
              <PrimaryButton as="a" href="/book-call">
                Book my Fit Check
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
