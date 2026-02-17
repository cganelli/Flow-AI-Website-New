"use client";

import { PrimaryButton } from "./PrimaryButton";

type PlanPdfExportButtonProps = {
  onClick: () => void;
};

/**
 * Button that triggers the PDF export flow (opens disclaimer modal; export is handled by parent).
 * Exports only the plan wrapper (logo, hero, day nav, day sections), not site header/footer.
 */
export function PlanPdfExportButton({ onClick }: PlanPdfExportButtonProps) {
  return (
    <PrimaryButton as="button" onClick={onClick}>
      Download PDF
    </PrimaryButton>
  );
}
