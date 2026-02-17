import type { LeadMagnetSubmission } from "./types";

const STORAGE_KEY = "FLOWAI_LEADMAGNET_SUBMISSION";

export function saveSubmission(submission: LeadMagnetSubmission): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(submission));
}

export function loadSubmission(): LeadMagnetSubmission | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LeadMagnetSubmission;
  } catch {
    return null;
  }
}

export function clearSubmission(): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
}
