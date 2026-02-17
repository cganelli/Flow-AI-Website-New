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

function getPathnameFromWindow(): string {
  if (typeof window === "undefined") return "";
  const p = window.location.pathname ?? "";
  return p.endsWith("/") && p.length > 1 ? p.slice(0, -1) : p || "/";
}

function useShouldShowPopup() {
  const pathname = usePathname();
  const path = pathname ?? getPathnameFromWindow();
  if (path === "/lead-magnet" || path === "/lead-magnet/results") return false;
  if (path.startsWith("/plans/")) return false;
  return true;
}

export function LeadMagnetPopup() {
  const pathname = usePathname();
  const path = pathname ?? (typeof window !== "undefined" ? getPathnameFromWindow() : "");
  const shouldShow = useShouldShowPopup();
  const [open, setOpen] = useState(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleStartedRef = useRef(false);
  const exitTriggeredRef = useRef(false);

  const isHome = path === "/" || path === "";

  const close = useCallback(() => setOpen(false), []);

  // Close when navigating to lead-magnet or results
  useEffect(() => {
    if (pathname === "/lead-magnet" || pathname === "/lead-magnet/results") {
      setOpen(false);
    }
  }, [pathname]);

  // Home: 5s idle timer (reset on activity). Delay start so pathname/router is ready after static hydrate.
  useEffect(() => {
    if (!shouldShow || !isHome) return;

    const markIdleShown = () => {
      try {
        if (typeof window !== "undefined" && window.sessionStorage) {
          window.sessionStorage.setItem(SESSION_KEYS.idle, "1");
        }
      } catch {}
    };

    const alreadyShown = () => {
      try {
        return typeof window !== "undefined" && window.sessionStorage?.getItem(SESSION_KEYS.idle) === "1";
      } catch {
        return false;
      }
    };

    const startIdleTimer = () => {
      if (alreadyShown()) return;
      idleTimerRef.current = setTimeout(() => {
        idleTimerRef.current = null;
        if (!alreadyShown()) {
          markIdleShown();
          setOpen(true);
        }
      }, IDLE_MS);
    };

    const clearIdleTimer = () => {
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
        idleTimerRef.current = null;
      }
    };

    const resetAndStart = () => {
      clearIdleTimer();
      startIdleTimer();
    };

    const events = ["mousemove", "keydown", "scroll", "touchstart"] as const;

    if (!idleStartedRef.current) {
      idleStartedRef.current = true;
      const start = () => {
        startIdleTimer();
        for (const ev of events) document.addEventListener(ev, resetAndStart);
      };
      const t = setTimeout(start, 150);
      return () => {
        clearTimeout(t);
        clearIdleTimer();
        for (const ev of events) document.removeEventListener(ev, resetAndStart);
      };
    }

    for (const ev of events) document.addEventListener(ev, resetAndStart);
    return () => {
      clearIdleTimer();
      for (const ev of events) document.removeEventListener(ev, resetAndStart);
    };
  }, [shouldShow, isHome]);

  // Exit intent: every page (once per session) – mouse leaves viewport toward top (address bar / back)
  useEffect(() => {
    if (!shouldShow) return;

    const markExitShown = () => {
      try {
        if (typeof window !== "undefined" && window.sessionStorage) {
          window.sessionStorage.setItem(SESSION_KEYS.exit, "1");
        }
      } catch {}
    };

    const alreadyShown = () => {
      try {
        return typeof window !== "undefined" && window.sessionStorage?.getItem(SESSION_KEYS.exit) === "1";
      } catch {
        return false;
      }
    };

    const tryShowExit = (e: MouseEvent) => {
      if (exitTriggeredRef.current || alreadyShown()) return;
      if (e.clientY > EXIT_INTENT_THRESHOLD) return;
      exitTriggeredRef.current = true;
      markExitShown();
      setOpen(true);
    };

    const handleMouseOut = (e: MouseEvent) => {
      if (e.relatedTarget !== null) return;
      tryShowExit(e);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      tryShowExit(e);
    };

    document.documentElement.addEventListener("mouseout", handleMouseOut);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      document.documentElement.removeEventListener("mouseout", handleMouseOut);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldShow]);

  return (
    <LeadMagnetModal open={open} onClose={close}>
      <LeadMagnetWizard inModal onBeforeResultsNavigate={close} />
    </LeadMagnetModal>
  );
}
