"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { DISCLAIMER_MODAL_BODY, DISCLAIMER_CONSENT_LINE } from "@/lib/leadMagnet/disclaimer";
import { PrimaryButton } from "./PrimaryButton";
import { SecondaryButton } from "./SecondaryButton";

type PdfDownloadModalProps = {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function PdfDownloadModal({ open, onConfirm, onCancel }: PdfDownloadModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onCancel();
    };
    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [onCancel]);

  if (!open) return null;

  const modalContent = (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[100] max-h-[100vh] w-full max-w-[calc(100vw-2rem)] border-0 bg-transparent p-0 shadow-none backdrop:bg-black/50"
      style={{ width: "100%", maxWidth: "min(28rem, calc(100vw - 2rem))" }}
      aria-labelledby="pdf-disclaimer-title"
      aria-modal="true"
    >
      <div className="fixed left-1/2 top-1/2 z-[101] w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl border border-neutral-200 bg-white p-6 shadow-xl">
        <h2 id="pdf-disclaimer-title" className="text-lg font-semibold text-neutral-900">
          Before you download
        </h2>
        <p className="mt-3 text-sm text-neutral-700 whitespace-pre-line">
          {DISCLAIMER_MODAL_BODY}
        </p>
        <p className="mt-3 text-sm font-medium text-neutral-600">
          {DISCLAIMER_CONSENT_LINE}
        </p>
        <div className="mt-6 flex flex-wrap gap-3 justify-end">
          <SecondaryButton as="button" type="button" onClick={onCancel}>
            Cancel
          </SecondaryButton>
          <PrimaryButton as="button" type="button" onClick={onConfirm}>
            Download PDF
          </PrimaryButton>
        </div>
      </div>
    </dialog>
  );

  return typeof document !== "undefined"
    ? createPortal(modalContent, document.body)
    : null;
}
