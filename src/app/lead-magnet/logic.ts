import type { LeadQuestionId } from "./questions";
import { questions } from "./questions";
import type { Plan, PlanKey } from "./plans";
import { plans } from "./plans";

export type LeadAnswers = Record<LeadQuestionId, string>;

const q3PlanMap: Record<string, PlanKey> = {
  "lead-follow-up": "lead-follow-up-system",
  "customer-support": "support-triage-system",
  "scheduling-follow-ups": "meeting-follow-up-system",
  "status-updates": "weekly-visibility-system",
  "approvals-handoffs": "handoff-tracker-system",
};

export function getPlanKeyFromQ3(answerQ3: string): PlanKey {
  return q3PlanMap[answerQ3] ?? "lead-follow-up-system";
}

export function getPlan(planKey: PlanKey): Plan {
  return plans[planKey];
}

export function buildCalendlyUrl(
  baseUrl: string,
  email: string,
  answers: LeadAnswers,
  plan: Plan,
): string {
  if (!baseUrl) {
    return "";
  }
  const answerLabels = questions.map((q) => getOptionLabel(q.id, answers[q.id] ?? ""));
  const queryParts = [
    ["email", email ?? ""],
    ["a1", answerLabels[0] ?? ""],
    ["a2", answerLabels[1] ?? ""],
    ["a3", answerLabels[2] ?? ""],
    ["a4", answerLabels[3] ?? ""],
    ["a5", answerLabels[4] ?? ""],
    ["a6", plan?.name ?? ""],
  ]
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join("&");

  const joiner = baseUrl.includes("?") ? "&" : "?";
  return queryParts ? `${baseUrl}${joiner}${queryParts}` : baseUrl;
}

export function getOptionLabel(questionId: LeadQuestionId, value: string): string {
  const question = questions.find((item) => item.id === questionId);
  const found = question?.options.find((opt) => opt.value === value);
  return found?.label ?? value;
}
