// Purpose: Page entry for the lead magnet quiz flow at /lead-magnet. Location: src/app/lead-magnet/page.tsx
"use client";

import { ErrorBoundary } from "@/components/ui/error-boundary";
import dynamic from "next/dynamic";

const LeadMagnetWizard = dynamic(() => import("./LeadMagnetWizard").then((m) => m.LeadMagnetWizard), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-6">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-base-content/70">Loading quiz...</p>
      </div>
    </div>
  ),
});

export default function LeadMagnetPage() {
  return (
    <>
      <div id="navigation" className="sr-only" aria-hidden="true">
        <a href="/">Home</a>
      </div>
      <main id="main">
        <ErrorBoundary
          fallback={
            <div className="min-h-screen bg-base-100 flex items-center justify-center p-6">
              <div className="card bg-base-200 shadow-sm max-w-md w-full">
                <div className="card-body gap-4">
                  <h1 className="text-xl font-semibold text-error">Something went wrong</h1>
                  <p className="text-base-content/80">
                    The 7-Day Plan quiz couldn&apos;t load. Please refresh the page or try again in a few minutes.
                  </p>
                  <a href="/lead-magnet/" className="btn btn-primary">
                    Try again
                  </a>
                </div>
              </div>
            </div>
          }
        >
          <LeadMagnetWizard />
        </ErrorBoundary>
      </main>
    </>
  );
}
