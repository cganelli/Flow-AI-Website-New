"use client";

import Link from "next/link";
import type { PlanSlug } from "@/lib/leadMagnet/plans";

type ResultsCtasProps = {
  slug: PlanSlug;
};

export function ResultsCtas({ slug }: ResultsCtasProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <Link href={`/plans/${slug}`} className="btn btn-primary">
        Open your DIY plan
      </Link>
      <Link
        href={`/plans/${slug}#fit-check`}
        className="btn btn-secondary"
      >
        Learn how Flow AI can build it for you
      </Link>
    </div>
  );
}
