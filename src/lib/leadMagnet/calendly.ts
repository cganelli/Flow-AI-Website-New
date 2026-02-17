import type { LeadMagnetSubmission } from "./types";

/** Use this so you can tell in Calendly which link was used (e.g. AI audit vs We build it). */
export const CALENDLY_CAMPAIGN = {
  AI_AUDIT: "ai_audit",
  WE_BUILD_IT: "we_build_it",
} as const;

/**
 * Booking source (a4) so you can tell from the invite whether they booked from AI Info Session or Let Us Build It.
 * Calendly maps a1=1st custom question, a2=2nd, a3=3rd, a4=4th. If you have 3 questions (e.g. Website URL, Phone, Share anything),
 * add a 4th invitee question (e.g. "Booking source" or "Reason for call"); the site pre-fills a4 so it appears on the invite.
 */
export const CALENDLY_BOOKING_SOURCE = {
  AI_INFO_SESSION: "AI Info Session",
  LET_US_BUILD_IT: "Let Us Build It For You",
} as const;

/** Append to Calendly URLs used for the AI audit (homepage, footer). Includes a4 so invite shows booking source. */
export const CALENDLY_UTM_AI_AUDIT =
  "utm_campaign=ai_audit&utm_source=thisisflowai&utm_medium=cta&a4=" +
  encodeURIComponent(CALENDLY_BOOKING_SOURCE.AI_INFO_SESSION);

/**
 * UTM params for the /book-call page embed: call type "we_build_it" and plan name in utm_content.
 * Includes a4=Let Us Build It For You so the meeting invite shows which flow they used.
 */
export function buildBookCallCalendlyParams(planName: string): string {
  const params = new URLSearchParams({
    utm_campaign: CALENDLY_CAMPAIGN.WE_BUILD_IT,
    utm_source: "thisisflowai",
    utm_medium: "cta",
    utm_content: planName,
    a4: CALENDLY_BOOKING_SOURCE.LET_US_BUILD_IT,
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
    a5: submission.answers.a5Role ?? "",
    a6: planName ?? "",
    a4: CALENDLY_BOOKING_SOURCE.LET_US_BUILD_IT, // 4th question in Calendly = booking source (AI Info vs Let Us Build It)
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
