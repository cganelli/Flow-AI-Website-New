import type { LeadQuestionId } from "./questions";
import { questions } from "./questions";
import type { PlanV2, PlanV2Key } from "./types";
import { plansV2 } from "./plans-v2";
import { CALENDLY_BOOKING_SOURCE } from "@/lib/leadMagnet/calendly";

export type LeadAnswers = Record<LeadQuestionId, string>;

const q3PlanMap: Record<string, PlanV2Key> = {
  "lead-follow-up": "plan1",
  "customer-support": "plan2",
  "scheduling-follow-ups": "plan3",
  "status-updates": "plan4",
  "approvals-handoffs": "plan5",
};

export function getPlanKeyFromQ3(answerQ3: string): PlanV2Key {
  return q3PlanMap[answerQ3] ?? "plan1";
}

export function getPlan(planKey: PlanV2Key): PlanV2 {
  return plansV2[planKey];
}

export function buildCalendlyUrl(
  baseUrl: string,
  email: string,
  answers: LeadAnswers,
  plan: PlanV2,
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
    ["a4", CALENDLY_BOOKING_SOURCE.LET_US_BUILD_IT], // 4th Calendly question = booking source (We build it)
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
