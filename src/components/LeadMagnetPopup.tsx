"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { LeadMagnetModal } from "@/components/LeadMagnetModal";

const LeadMagnetWizard = dynamic(
  () => import("@/components/LeadMagnetWizard").then((m) => ({ default: m.LeadMagnetWizard })),
  { ssr: false, loading: () => <div className="flex min-h-[200px] items-center justify-center p-6"><div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" /></div> }
);

const IDLE_MS = 5000;
const EXIT_INTENT_THRESHOLD = 50;
const SESSION_KEYS = { idle: "flowai_leadmagnet_popup_idle", exit: "flowai_leadmagnet_popup_exit" };

function getPath(): string {
  if (typeof window === "undefined") return "";
  const p = (window.location.pathname ?? "").replace(/\/$/, "") || "/";
  return p;
}

function pathAllowsPopup(path: string): boolean {
  if (path === "/lead-magnet" || path === "/lead-magnet/results") return false;
  if (path.startsWith("/plans/")) return false;
  return true;
}

function isHomePath(path: string): boolean {
  return path === "/" || path === "";
}

/** True if a Calendly booking window is open (popup or visible iframe) or user is in another tab (e.g. Calendly in new tab). */
function isCalendlyOpen(): boolean {
  if (typeof document === "undefined") return false;
  if (document.hidden) return true;
  const iframes = document.querySelectorAll<HTMLIFrameElement>('iframe[src*="calendly.com"]');
  for (const el of iframes) {
    const rect = el.getBoundingClientRect();
    if (rect.width > 50 && rect.height > 50) return true;
  }
  return false;
}

export function LeadMagnetPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const idleTimerRef = useRef<number | null>(null);
  const exitTriggeredRef = useRef(false);

  const close = useCallback(() => setOpen(false), []);

  // Close when navigating to lead-magnet or results (router-based)
  useEffect(() => {
    if (pathname === "/lead-magnet" || pathname === "/lead-magnet/results") {
      setOpen(false);
    }
  }, [pathname]);

  // Single mount effect: idle (home only) + exit intent. Use window.location only so we don't depend on router.
  useEffect(() => {
    const path = getPath();
    if (!pathAllowsPopup(path)) return;

    const markIdleShown = () => {
      try {
        window.sessionStorage.setItem(SESSION_KEYS.idle, "1");
      } catch {}
    };
    const markExitShown = () => {
      try {
        window.sessionStorage.setItem(SESSION_KEYS.exit, "1");
      } catch {}
    };
    const alreadyShownIdle = () => {
      try {
        return window.sessionStorage?.getItem(SESSION_KEYS.idle) === "1";
      } catch {
        return false;
      }
    };
    const alreadyShownExit = () => {
      try {
        return window.sessionStorage?.getItem(SESSION_KEYS.exit) === "1";
      } catch {
        return false;
      }
    };

    const startIdleTimer = () => {
      if (!isHomePath(getPath()) || alreadyShownIdle() || isCalendlyOpen()) return;
      idleTimerRef.current = window.setTimeout(() => {
        idleTimerRef.current = null;
        if (!isHomePath(getPath()) || alreadyShownIdle()) return;
        if (isCalendlyOpen()) return; // don't show on idle when Calendly is open; exit intent still allowed
        markIdleShown();
        setOpen(true);
      }, IDLE_MS);
    };

    const clearIdleTimer = () => {
      if (idleTimerRef.current) {
        window.clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const resetAndStartIdle = () => {
      if (!isHomePath(getPath()) || isCalendlyOpen()) return;
      clearIdleTimer();
      startIdleTimer();
    };

    const events = ["mousemove", "keydown", "scroll", "touchstart"] as const;

    const tryShowExit = (e: MouseEvent) => {
      if (exitTriggeredRef.current || alreadyShownExit()) return;
      if (!pathAllowsPopup(getPath())) return; // e.g. results page: user already completed quiz
      if (e.clientY > EXIT_INTENT_THRESHOLD) return;
      exitTriggeredRef.current = true;
      markExitShown();
      setOpen(true);
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget !== null) return;
      tryShowExit(e);
    };
    const handleMouseLeave = (e: MouseEvent) => tryShowExit(e);

    // Delay so we're definitely past hydration and path is correct
    const setupTimer = window.setTimeout(() => {
      if (isHomePath(getPath())) {
        startIdleTimer();
        for (const ev of events) document.addEventListener(ev, resetAndStartIdle);
      }
      document.documentElement.addEventListener("mouseout", handleMouseOut);
      document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    }, 400);

    return () => {
      window.clearTimeout(setupTimer);
      clearIdleTimer();
      for (const ev of events) document.removeEventListener(ev, resetAndStartIdle);
      document.documentElement.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []); // Run once on mount; path read from window inside

  return (
    <LeadMagnetModal open={open} onClose={close}>
      <LeadMagnetWizard inModal onBeforeResultsNavigate={close} />
    </LeadMagnetModal>
  );
}
