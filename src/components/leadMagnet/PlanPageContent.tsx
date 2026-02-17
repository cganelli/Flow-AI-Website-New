"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { loadSubmission } from "@/lib/leadMagnet/storage";
import { getPlanBySlug, type PlanSlug } from "@/lib/leadMagnet/plans";
import { PDF_FOOTER_URL, DISCLAIMER_PAGE_TEXT } from "@/lib/leadMagnet/disclaimer";
import { buildPdfDownloadPayload, sendPdfDownloadEvent } from "@/lib/leadMagnet/pdfDownloadEvent";
import { DayJumpNav } from "./DayJumpNav";
import { DaySection } from "./DaySection";
import { BlueprintCallSection } from "./BlueprintCallSection";
import { Disclaimer } from "./Disclaimer";
import { PdfDownloadModal } from "./PdfDownloadModal";
import { PlanPdfExportButton } from "./PlanPdfExportButton";
import { Section } from "./Section";

type PlanPageContentProps = {
  slug: PlanSlug;
};

const PDF_FOOTER_MM = 22;

export function PlanPageContent({ slug }: PlanPageContentProps) {
  const router = useRouter();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [plan, setPlan] = useState<ReturnType<typeof getPlanBySlug> | null>(null);
  const [submission, setSubmission] = useState<ReturnType<typeof loadSubmission>>(null);
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfCapturing, setPdfCapturing] = useState(false);

  useEffect(() => {
    const sub = loadSubmission();
    if (!sub) {
      router.replace("/lead-magnet");
      return;
    }
    setSubmission(sub);
    setFirstName(sub.firstName || "There");
    setPlan(getPlanBySlug(slug));
    setMounted(true);
  }, [router, slug]);

  const doGeneratePdf = async () => {
    if (!pdfRef.current || !plan || !submission || typeof window === "undefined") return;
    setPdfCapturing(true);
    const fileName = `${plan.meta.name.replace(/\s+/g, "-")}-7-day-plan.pdf`;
    let downloadCompleted = false;
    let errorMessage: string | null = null;
    let fileSizeBytes: number | null = null;

    try {
      await new Promise((r) => setTimeout(r, 100));
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const contentH = pageH - PDF_FOOTER_MM;
      const imgW = pageW;
      const imgH = (canvas.height * pageW) / canvas.width;
      const totalPages = Math.ceil(imgH / contentH) || 1;

      for (let p = 0; p < totalPages; p++) {
        if (p > 0) pdf.addPage();
        const yOffset = -p * contentH;
        pdf.addImage(imgData, "PNG", 0, yOffset, imgW, imgH);
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, pageH - PDF_FOOTER_MM, pageW, PDF_FOOTER_MM, "F");
        pdf.setFontSize(8);
        pdf.setTextColor(80, 80, 80);
        pdf.text(PDF_FOOTER_URL, 10, pageH - 14);
        const splitDisclaimer = pdf.splitTextToSize(DISCLAIMER_PAGE_TEXT, pageW - 20);
        pdf.text(splitDisclaimer, 10, pageH - 8);
      }

      const blob = pdf.output("blob");
      fileSizeBytes = blob.size;
      pdf.save(fileName);
      downloadCompleted = true;
    } catch (err) {
      errorMessage = err instanceof Error ? err.message : "Unknown error";
    } finally {
      setPdfCapturing(false);
    }

    const payload = await buildPdfDownloadPayload(
      submission,
      slug,
      fileName,
      fileSizeBytes,
      downloadCompleted,
      errorMessage
    );
    await sendPdfDownloadEvent(payload);
  };

  const handleDownloadPdfClick = () => {
    setPdfModalOpen(true);
  };

  const handlePdfModalConfirm = () => {
    setPdfModalOpen(false);
    void doGeneratePdf();
  };

  const handlePdfModalCancel = () => {
    setPdfModalOpen(false);
  };

  if (!mounted || !plan || !submission) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-gray-600">Loading…</p>
      </div>
    );
  }

  // "There" is the placeholder fallback when the quiz submission has no firstName
  const heroIntro = firstName
    ? `${firstName}, here’s your 7-Day DIY Plan`
    : "Your 7-Day DIY Plan";
  const heroTagline = "to capture missed opportunities this week.";

  const planNameTitleCase = plan.meta.name
    .split(/\s+/)
    .map((w) =>
      w
        .split("-")
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase())
        .join("-")
    )
    .join(" ");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main" className="pt-20">
        <Section>
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              {/* PDF export wraps only this block (no header/footer in PDF) */}
              <div ref={pdfRef}>
                {/* Logo only visible in PDF (500% larger); hidden on plan page */}
                <div
                  className={`flex justify-center mb-8 transition-opacity ${
                    pdfCapturing ? "opacity-100 h-[200px]" : "opacity-0 h-0 overflow-hidden pointer-events-none mb-0"
                  }`}
                >
                  <img
                    src="/images/Flow_AI_Horizontal_Logo.png"
                    alt="Flow AI"
                    className={`w-auto object-contain ${pdfCapturing ? "h-[200px]" : "h-0"}`}
                    width={200}
                    height={200}
                  />
                </div>
                <header className="max-w-4xl mx-auto text-center mb-10">
                  <h1 className="heading-xl mb-4 text-gray-900">
                    {heroIntro}
                  </h1>
                  <p className="text-xl font-normal text-gray-900 mb-6">
                    {heroTagline}
                  </p>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                    {planNameTitleCase}
                  </h2>
                  <p className="text-xl font-normal text-gray-700">
                    {plan.meta.oneLiner}
                  </p>
                </header>
                <div className="mt-8">
                  <DayJumpNav fullDays={plan.fullDays} />
                </div>
                <div className="mt-8 space-y-4">
                  {plan.fullDays.map((day) => (
                    <DaySection key={day.dayLabel} day={day} forceExpanded={pdfCapturing} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
                <span className="text-sm text-gray-600">7 days, 3 steps per day</span>
                <PlanPdfExportButton onClick={handleDownloadPdfClick} />
              </div>
            </div>
          </div>
        </Section>

        <BlueprintCallSection submission={submission} plan={plan} />

        <Section>
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <Disclaimer />
            </div>
          </div>
        </Section>
      </main>
      <Footer />
      <PdfDownloadModal
        open={pdfModalOpen}
        onConfirm={handlePdfModalConfirm}
        onCancel={handlePdfModalCancel}
      />
    </div>
  );
}
