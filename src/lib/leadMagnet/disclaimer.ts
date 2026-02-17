/**
 * Single source of truth for PDF download modal and disclaimer text.
 * Used on results page, DIY plan pages, and PDF footer.
 * disclaimer_text_hash is derived from this string for event payloads.
 */
export const DISCLAIMER_VERSION = "v1";

export const DISCLAIMER_MODAL_BODY =
  "Flow AI provides this as general information. You are responsible for reviewing and using it. Flow AI is not responsible for any outcomes from its use.";

export const DISCLAIMER_CONSENT_LINE = "By downloading, you agree to this notice.";

/** Same meaning as modal body, used in Disclaimer component and PDF footer. */
export const DISCLAIMER_PAGE_TEXT =
  "This DIY kit is general guidance, not professional advice. You are responsible for how you use it and what you send to customers. Review all drafts before sending, especially anything involving pricing, contracts, legal, financial, health, or safety topics. Use your company policies and judgment.";

/** Stable hash of the exact disclaimer shown in the modal (DISCLAIMER_MODAL_BODY). */
export async function getDisclaimerTextHash(): Promise<string> {
  if (typeof crypto !== "undefined" && crypto.subtle) {
    const data = new TextEncoder().encode(DISCLAIMER_MODAL_BODY);
    const buf = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  }
  return "sha256-unavailable";
}

export const PDF_FOOTER_URL = "www.ThisIsFlowAI.com";
