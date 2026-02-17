import type { LeadMagnetSubmission } from "./types";
import type { PlanSlug } from "./plans";
import { getPlanKeyFromSlug, getPlanBySlug } from "./plans";
import { DISCLAIMER_VERSION, getDisclaimerTextHash } from "./disclaimer";

export type PdfDownloadEventPayload = {
  event_type: "pdf_download";
  event_version: "v1";
  created_at: string; // ISO

  lead_id?: string | null;
  email: string;
  first_name: string | null;
  last_name: string | null;

  plan_key: "plan1" | "plan2" | "plan3" | "plan4" | "plan5";
  plan_name: string;
  answers: {
    q1_role: string;
    q2_goal: string;
    q3_pileup: string;
    q4_start: string;
    q5_lost: string;
  };

  page_path: string;
  referrer: string | null;
  utm: {
    source: string | null;
    medium: string | null;
    campaign: string | null;
    content: string | null;
    term: string | null;
  };

  user_agent: string | null;
  ip_address: string | null;
  timezone: string | null;
  locale: string | null;

  pdf_format: "plan_pdf";
  pdf_version: "v1";
  download_method: "button_modal";
  disclaimer_presented: true;
  disclaimer_version: string;
  disclaimer_text_hash: string;
  file_name: string;
  file_size_bytes: number | null;

  download_started: true;
  download_completed: boolean;
  error_message: string | null;
};

function getTimezone(): string | null {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone ?? null;
  } catch {
    return null;
  }
}

function getLocale(): string | null {
  try {
    return navigator.language ?? null;
  } catch {
    return null;
  }
}

export async function buildPdfDownloadPayload(
  submission: LeadMagnetSubmission,
  slug: PlanSlug,
  fileName: string,
  fileSizeBytes: number | null,
  downloadCompleted: boolean,
  errorMessage: string | null
): Promise<PdfDownloadEventPayload> {
  const plan = getPlanBySlug(slug);
  const disclaimerHash = await getDisclaimerTextHash();
  return {
    event_type: "pdf_download",
    event_version: "v1",
    created_at: new Date().toISOString(),

    email: submission.email ?? "",
    first_name: submission.firstName || null,
    last_name: submission.lastName ?? null,

    plan_key: getPlanKeyFromSlug(slug),
    plan_name: plan.meta.name,
    answers: {
      q1_role: submission.answers.a5Role ?? "",
      q2_goal: submission.answers.a1Outcome ?? "",
      q3_pileup: submission.answers.a2WorkPilesUp ?? "",
      q4_start: submission.answers.a3WorkStarts ?? "",
      q5_lost: submission.answers.a4MissedOpportunity ?? "",
    },

    page_path: typeof window !== "undefined" ? window.location.pathname : submission.path,
    referrer: typeof window !== "undefined" ? document.referrer || null : null,
    utm: {
      source: submission.utm?.utm_source ?? null,
      medium: submission.utm?.utm_medium ?? null,
      campaign: submission.utm?.utm_campaign ?? null,
      content: submission.utm?.utm_content ?? null,
      term: submission.utm?.utm_term ?? null,
    },

    user_agent: typeof navigator !== "undefined" ? navigator.userAgent ?? null : null,
    ip_address: null,
    timezone: getTimezone(),
    locale: getLocale(),

    pdf_format: "plan_pdf",
    pdf_version: "v1",
    download_method: "button_modal",
    disclaimer_presented: true,
    disclaimer_version: DISCLAIMER_VERSION,
    disclaimer_text_hash: disclaimerHash,
    file_name: fileName,
    file_size_bytes: fileSizeBytes,

    download_started: true,
    download_completed: downloadCompleted,
    error_message: errorMessage,
  };
}

export async function sendPdfDownloadEvent(payload: PdfDownloadEventPayload): Promise<void> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.warn("[pdf_download] API returned", res.status);
    }
  } catch (err) {
    console.warn("[pdf_download] Failed to send event:", err);
  }
}
