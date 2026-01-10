import React, { useEffect, useRef } from 'react';

export function AuditModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const firstFocusRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    firstFocusRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <dialog open aria-modal="true" aria-labelledby="audit-title" tabIndex={-1}>
      <h2 id="audit-title">Book Your Free AI Audit</h2>
      <button type="button" ref={firstFocusRef} aria-label="Close booking popup" onClick={onClose}>
        Close
      </button>
    </dialog>
  );
}
