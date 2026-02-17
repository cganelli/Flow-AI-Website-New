"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout/layout";
import { WeBuildItForYouCard } from "@/components/leadMagnet/WeBuildItForYouCard";
import { WhatHappensOnCallBox } from "@/components/leadMagnet/WhatHappensOnCallSection";
import { getPlanComparisonContent } from "@/lib/leadMagnet/blueprintCallContent";
import { buildBookCallCalendlyParams } from "@/lib/leadMagnet/calendly";
import { loadSubmission } from "@/lib/leadMagnet/storage";
import { selectPlanFromQ2, getPlanBySlug, type PlanSlug } from "@/lib/leadMagnet/plans";

const defaultPlan = getPlanBySlug("lead-follow-up");

// BookCallPage: plan title/subtitle from quiz, "We build it for you" card + Calendly, then What Happens on the Call.
export default function BookCallPage() {
  const [embedDomain, setEmbedDomain] = useState("same.dev");
  const [planSlug, setPlanSlug] = useState<PlanSlug>("lead-follow-up");
  const [planName, setPlanName] = useState(defaultPlan.meta.name);
  const [planOneLiner, setPlanOneLiner] = useState(defaultPlan.meta.oneLiner);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isLocalhost =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";
    setEmbedDomain(isLocalhost ? "localhost" : "same.dev");

    const sub = loadSubmission();
    const slug = sub
      ? selectPlanFromQ2(sub.answers.a2WorkPilesUp).slug
      : "lead-follow-up";
    const plan = getPlanBySlug(slug);
    setPlanSlug(slug);
    setPlanName(plan.meta.name);
    setPlanOneLiner(plan.meta.oneLiner);
  }, []);

  const calendlyIframeUrl = `https://calendly.com/carissa-thisisflowai/30min?embed_domain=${embedDomain}&embed_type=Inline&hide_event_type_details=1&primary_color=f97316&${buildBookCallCalendlyParams(planName)}`;
  const weBuildItContent = getPlanComparisonContent(planSlug).flow;

  return (
    <Layout>
      <main
        id="main"
        tabIndex={-1}
        aria-labelledby="book-call-heading"
        className="outline-none focus-visible:outline-none"
      >
        <h1 id="book-call-heading" className="sr-only">
          Book a call
        </h1>
        <section
          id="book-call-section"
          className="py-16 md:py-20 bg-background"
          aria-labelledby="calendly-heading"
        >
          <div className="container-custom">
            <h2 id="calendly-heading" className="sr-only">
              Schedule your call
            </h2>
            <div className="max-w-6xl mx-auto mb-8 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-neutral-900">
                Book your &quot;We Build It&quot; Call
              </h2>
              <p className="mt-2 text-lg text-neutral-600 max-w-2xl mx-auto">
                to walk through your current setup and goals so we can recommend the right solution for your business.
              </p>
              <p className="mt-4 font-semibold text-neutral-900">{planName}</p>
              <p className="mt-1 text-base text-neutral-600">{planOneLiner}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto items-start">
              <div className="order-2 lg:order-1 flex flex-col gap-6">
                <WeBuildItForYouCard content={weBuildItContent} />
                <WhatHappensOnCallBox />
              </div>
              <div className="order-1 lg:order-2">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-neutral-200 sticky top-24">
                  <iframe
                    src={calendlyIframeUrl}
                    width="100%"
                    height="700"
                    frameBorder={0}
                    title="Schedule your meeting with Flow AI"
                    className="rounded-lg"
                    style={{ minWidth: "320px", height: "700px" }}
                    aria-label="Calendly booking widget"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
