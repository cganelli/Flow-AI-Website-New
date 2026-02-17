"use client";

import { PrimaryButton } from "./PrimaryButton";

/**
 * Standalone Fit Check section for pages that don't have plan/submission (e.g. book-call).
 * CTA scrolls to the Calendly widget.
 */
export function FitCheckSectionStatic() {
  return (
    <section
      id="fit-check"
      className="py-16 bg-black text-white"
      aria-labelledby="fit-check-static-heading"
    >
      <div className="container-custom">
        <div className="max-w-6xl mx-auto text-center">
          <h2
            id="fit-check-static-heading"
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
            <PrimaryButton as="a" href="#book-appointment">
              Book my Fit Check
            </PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  );
}
