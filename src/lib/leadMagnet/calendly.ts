import type { LeadMagnetSubmission } from "./types";

/** Use this so you can tell in Calendly which link was used (e.g. AI audit vs We build it). */
export const CALENDLY_CAMPAIGN = {
  AI_AUDIT: "ai_audit",
  WE_BUILD_IT: "we_build_it",
} as const;

/** Append to Calendly URLs used for the AI audit (homepage, footer). */
export const CALENDLY_UTM_AI_AUDIT = "utm_campaign=ai_audit&utm_source=thisisflowai&utm_medium=cta";

/**
 * UTM params for the /book-call page embed: call type "we_build_it" and plan name in utm_content.
 * Calendly stores these on the event (Meetings tab, webhooks). Plan name is URL-encoded.
 */
export function buildBookCallCalendlyParams(planName: string): string {
  const params = new URLSearchParams({
    utm_campaign: CALENDLY_CAMPAIGN.WE_BUILD_IT,
    utm_source: "thisisflowai",
    utm_medium: "cta",
    utm_content: planName,
  });
  return params.toString();
}

export type CalendlyCampaign = (typeof CALENDLY_CAMPAIGN)[keyof typeof CALENDLY_CAMPAIGN];

export function buildCalendlyUrl(
  baseUrl: string,
  submission: LeadMagnetSubmission,
  planName: string,
  options?: { utmCampaign?: CalendlyCampaign }
): string {
  if (!baseUrl) return "";
  const params = new URLSearchParams({
    email: submission.email ?? "",
    a1: submission.answers.a1Outcome ?? "",
    a2: submission.answers.a2WorkPilesUp ?? "",
    a3: submission.answers.a3WorkStarts ?? "",
    a4: submission.answers.a4MissedOpportunity ?? "",
    a5: submission.answers.a5Role ?? "",
    a6: planName ?? "",
    firstName: submission.firstName ?? "",
  });
  if (options?.utmCampaign) {
    params.set("utm_campaign", options.utmCampaign);
    params.set("utm_source", "thisisflowai");
    params.set("utm_medium", "cta");
  }
  const joiner = baseUrl.includes("?") ? "&" : "?";
  return `${baseUrl}${joiner}${params.toString()}`;
}
