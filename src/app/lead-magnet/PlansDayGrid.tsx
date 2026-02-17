"use client";

import { useState, useCallback } from "react";
import type { PlanV2 } from "./types";

type StepRowProps = {
  step: { id: string; label: string; prompt: string };
};
function StepRow({ step }: StepRowProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyPrompt = useCallback(() => {
    navigator.clipboard.writeText(step.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [step.prompt]);

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-base-content">{step.label}</span>
        <button
          type="button"
          onClick={copyPrompt}
          className="btn btn-ghost btn-xs"
        >
          {copied ? "Copied" : "Copy prompt"}
        </button>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="btn btn-ghost btn-xs"
        >
          {expanded ? "Hide prompt" : "Show prompt"}
        </button>
      </div>
      {expanded && (
        <div className="rounded border border-base-300 bg-base-100 p-3">
          <pre className="whitespace-pre-line text-xs font-sans text-base-content/90">
            {step.prompt}
          </pre>
        </div>
      )}
    </div>
  );
}

type DayCardProps = {
  planDay: PlanV2["days"][0];
};
function DayCard({ planDay }: DayCardProps) {
  return (
    <div className="rounded-lg border border-base-300 bg-base-100 p-4">
      <div className="mb-2">
        <p className="text-sm font-semibold text-base-content/70">
          Day {planDay.day}
        </p>
        <p className="font-bold text-base-content">{planDay.title}</p>
      </div>
      <p className="mb-3 text-sm text-base-content/80">{planDay.summary}</p>
      <div className="space-y-3">
        <p className="text-xs font-semibold text-base-content/70">Steps</p>
        <ol className="list-decimal space-y-3 pl-4">
          {planDay.steps.map((step) => (
            <li key={step.id}>
              <StepRow step={step} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

type PlansDayGridProps = {
  plan: PlanV2;
};
export function PlansDayGrid({ plan }: PlansDayGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {plan.days.map((day) => (
        <DayCard key={day.day} planDay={day} />
      ))}
    </div>
  );
}
