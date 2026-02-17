"use client";

import { CopyPrompt } from "./CopyPrompt";
import type { PlanDayStep } from "@/lib/leadMagnet/plans";

type StepCardProps = {
  step: PlanDayStep;
  /** When true, prompt is always visible and only Copy is shown (used inside day accordion). */
  alwaysShowPrompt?: boolean;
};

export function StepCard({ step, alwaysShowPrompt = false }: StepCardProps) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-neutral-50/80 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#EA3D2A]">
        Step {step.stepNumber}
      </p>
      <h4 className="mt-1 text-base font-semibold text-neutral-900">
        {step.title}
      </h4>
      <p className="mt-2 text-sm text-neutral-700">
        <span className="font-medium text-neutral-900">Goal:</span> {step.goal}
      </p>
      <p className="mt-1 text-sm text-neutral-700">
        <span className="font-medium text-neutral-900">What you will paste:</span>{" "}
        {step.whatYouWillPaste}
      </p>
      <div className="mt-3 rounded-lg border border-neutral-200 bg-white p-3 font-mono text-xs text-neutral-800">
        <p className="mb-1 text-xs font-semibold text-neutral-600">
          Example input
        </p>
        <pre className="whitespace-pre-line font-mono text-xs text-neutral-800">
          {step.exampleInput}
        </pre>
      </div>
      <div className="mt-3">
        <p className="mb-1 text-xs font-semibold text-neutral-600">Prompt</p>
        <CopyPrompt promptText={step.promptAsksQuestionsFirst} alwaysShowPrompt={alwaysShowPrompt} />
      </div>
      <div className="mt-3">
        <p className="mb-1 text-xs font-semibold text-neutral-600">
          How to use
        </p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-neutral-700">
          {step.howToUseChecklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="mt-3">
        <p className="mb-1 text-xs font-semibold text-neutral-600">
          Done checklist
        </p>
        <ul className="space-y-2">
          {step.doneChecklist.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-neutral-700"
            >
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-neutral-300 text-[#EA3D2A] focus:ring-[#EA3D2A] focus:ring-offset-1"
                readOnly
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
