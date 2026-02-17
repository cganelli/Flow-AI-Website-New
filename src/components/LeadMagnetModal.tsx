"use client";

import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type LeadMagnetModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export function LeadMagnetModal({ open, onClose, children }: LeadMagnetModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) el.showModal?.();
    else el.close?.();
  }, [open]);

  if (!open) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 border-0 bg-transparent backdrop:bg-black/60"
      aria-modal="true"
      aria-labelledby="lead-magnet-modal-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      onKeyDown={(e) => {
        if ((e.key === "Enter" || e.key === " ") && e.target === dialogRef.current) {
          e.preventDefault();
          onClose();
        }
      }}
    >
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-[680px] flex-col rounded-xl bg-white shadow-2xl">
        <div className="flex flex-shrink-0 items-center justify-end border-b border-neutral-200 p-2">
          <h2 id="lead-magnet-modal-title" className="sr-only">
            7-Day Plan quiz
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-base-content/70 hover:bg-base-300 hover:text-base-content focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Close quiz"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto bg-white">
          {children}
        </div>
      </div>
    </dialog>
  );
}
