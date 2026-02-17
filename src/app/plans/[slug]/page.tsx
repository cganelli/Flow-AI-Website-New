import { notFound } from "next/navigation";
import Link from "next/link";
import type { PlanV2Key } from "@/app/lead-magnet/types";
import { plansV2 } from "@/app/lead-magnet/plans-v2";
import { PlansDayGrid } from "@/app/lead-magnet/PlansDayGrid";
import type { Metadata } from "next";

const VALID_SLUGS: PlanV2Key[] = ["plan1", "plan2", "plan3", "plan4", "plan5"];

function isValidSlug(slug: string): slug is PlanV2Key {
  return VALID_SLUGS.includes(slug as PlanV2Key);
}

export async function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    return { title: "Plan not found" };
  }
  const plan = plansV2[slug];
  return {
    title: `${plan.name} – 7-Day Plan | Flow AI`,
    description: plan.oneLiner,
    openGraph: {
      title: `${plan.name} – 7-Day Plan`,
      description: plan.oneLiner,
    },
  };
}

export default async function PlanPage({ params }: PageProps) {
  const { slug } = await params;
  if (!isValidSlug(slug)) {
    notFound();
  }
  const plan = plansV2[slug];

  return (
    <div className="min-h-screen bg-base-100">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-8">
          <Link
            href="/lead-magnet"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Get your free 7-day plan
          </Link>
        </div>

        <header className="mb-10 space-y-2">
          <h1 className="text-3xl font-semibold text-base-content">
            {plan.name}
          </h1>
          <p className="text-lg text-base-content/80">{plan.oneLiner}</p>
        </header>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">Your 7-day plan</h2>
          <PlansDayGrid plan={plan} />
        </section>

        <section className="mb-10 space-y-4">
          <h2 className="text-xl font-semibold">Do-It-Yourself</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="card border border-base-300 bg-base-100">
              <div className="card-body gap-3">
                <div className="text-sm text-base-content/80">
                  <p>
                    <span className="font-semibold text-base-content">Time:</span>{" "}
                    {plan.diyTime}
                  </p>
                  <p>
                    <span className="font-semibold text-base-content">
                      Calendar:
                    </span>{" "}
                    {plan.diyCalendar}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">You will need:</p>
                  <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/80">
                    {plan.diyNeeds.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="card border border-base-300 bg-base-100">
              <div className="card-body gap-3">
                <p className="text-sm font-semibold">DIY risk</p>
                <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/80">
                  {plan.diyRisks.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">Have us build it for you</h2>
          <div className="card border border-base-300 bg-base-100">
            <div className="card-body gap-3">
              <p className="text-sm font-semibold text-base-content">
                {plan.buildOutput.title}
              </p>
              <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/80">
                {plan.buildOutput.bullets
                  .filter((item): item is string => typeof item === "string")
                  .map((item) => (
                    <li key={item}>{item}</li>
                  ))}
              </ul>
              {plan.buildOutput.bullets.map((item) =>
                typeof item === "object" && "sub" in item ? (
                  <div key={item.label}>
                    <p className="mt-2 text-sm font-semibold text-base-content">
                      {item.label}
                    </p>
                    <ul className="list-disc space-y-1 pl-5 text-sm text-base-content/80">
                      {item.sub.map((s) => (
                        <li key={s}>{s}</li>
                      ))}
                    </ul>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-xl font-semibold">DIY starter kit</h2>
          <div className="card border border-base-300 bg-base-100">
            <div className="card-body gap-4">
              <p className="text-sm text-base-content/80">
                Copy-paste prompts and a simple setup you can do yourself.
              </p>
              <div className="space-y-3">
                {plan.diyStarterKit.prompts.map((p) => (
                  <div
                    key={p.title}
                    className="rounded border border-base-300 bg-base-100 p-3"
                  >
                    <p className="mb-1 text-xs font-semibold text-base-content/80">
                      {p.title}
                    </p>
                    <pre className="whitespace-pre-line font-sans text-xs text-base-content/80">
                      {p.prompt}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="card border border-base-300 bg-base-100">
          <div className="card-body items-start gap-4">
            <h2 className="text-xl font-semibold">Book a 30-minute Fit Check</h2>
            <p className="text-sm text-base-content/80">
              Get this plan built for you in 7 business days, with approvals,
              alerts, and reporting built in.
            </p>
            <Link
              href="/book-call"
              className="btn btn-primary"
            >
              Book a 30-minute Fit Check
            </Link>
            <p className="text-xs text-base-content/70">
              Weekdays, 10am to 6pm Eastern.
            </p>
          </div>
        </section>

        <div className="mt-10 border-t border-base-300 pt-8">
          <Link
            href="/lead-magnet"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Answer 5 questions and get a personalized plan
          </Link>
        </div>
      </div>
    </div>
  );
}
