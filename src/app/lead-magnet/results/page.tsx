"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { loadSubmission } from "@/lib/leadMagnet/storage";
import { selectPlanFromQ2, getPlanBySlug, type PlanSlug } from "@/lib/leadMagnet/plans";
import { buildCalendlyUrl, CALENDLY_CAMPAIGN } from "@/lib/leadMagnet/calendly";
import { PDF_FOOTER_URL, DISCLAIMER_PAGE_TEXT } from "@/lib/leadMagnet/disclaimer";
import { buildPdfDownloadPayload, sendPdfDownloadEvent } from "@/lib/leadMagnet/pdfDownloadEvent";
import { PreviewGrid } from "@/components/leadMagnet/PreviewGrid";
import { Section } from "@/components/leadMagnet/Section";
import { DaySection } from "@/components/leadMagnet/DaySection";
import { RoadmapStickyBar } from "@/components/leadMagnet/RoadmapStickyBar";
import { RoadmapCtas } from "@/components/leadMagnet/RoadmapCtas";
import { BlueprintCallSection } from "@/components/leadMagnet/BlueprintCallSection";
import { BlueprintCallLite } from "@/components/leadMagnet/BlueprintCallLite";
import { Disclaimer } from "@/components/leadMagnet/Disclaimer";
import { PdfDownloadModal } from "@/components/leadMagnet/PdfDownloadModal";

function PdfIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <title>PDF document</title>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M9 15h6M9 18h6M9 12v6" />
    </svg>
  );
}

export default function LeadMagnetResultsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [firstName, setFirstName] = useState("There");
  const [planSlug, setPlanSlug] = useState<PlanSlug | null>(null);
  const [planName, setPlanName] = useState("");
  const [planOneLiner, setPlanOneLiner] = useState("");
  const [planPreviewDays, setPlanPreviewDays] = useState<
    { dayLabel: string; title: string; bullets: string[] }[]
  >([]);
  const [submission, setSubmission] = useState<ReturnType<typeof loadSubmission>>(null);
  const [blueprintCallUrl, setBlueprintCallUrl] = useState("#prefer-done-for-you");
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfCapturing, setPdfCapturing] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownloadPdfClick = () => setPdfModalOpen(true);
  const handlePdfModalConfirm = () => {
    setPdfModalOpen(false);
    void doGeneratePdf();
  };
  const handlePdfModalCancel = () => setPdfModalOpen(false);

  async function doGeneratePdf() {
    if (!pdfRef.current || !planSlug || !submission || typeof window === "undefined") return;
    const plan = getPlanBySlug(planSlug);
    setPdfCapturing(true);
    const fileName = `${plan.meta.name.replace(/\s+/g, "-")}-7-day-plan.pdf`;
    let downloadCompleted = false;
    let errorMessage: string | null = null;
    let fileSizeBytes: number | null = null;
    const PDF_FOOTER_MM = 22;

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
      planSlug,
      fileName,
      fileSizeBytes,
      downloadCompleted,
      errorMessage
    );
    await sendPdfDownloadEvent(payload);
  }

  useEffect(() => {
    const sub = loadSubmission();
    if (!sub) {
      router.replace("/lead-magnet");
      return;
    }
    setSubmission(sub);
    setFirstName(sub.firstName || "There");
    const planMeta = selectPlanFromQ2(sub.answers.a2WorkPilesUp);
    const plan = getPlanBySlug(planMeta.slug);
    setPlanSlug(planMeta.slug);
    setPlanName(plan.meta.name);
    setPlanOneLiner(plan.meta.oneLiner);
    setPlanPreviewDays(plan.previewDays);
    const baseUrl = process.env.NEXT_PUBLIC_CALENDLY_URL ?? "";
    const url = baseUrl ? buildCalendlyUrl(baseUrl, sub, plan.meta.name, { utmCampaign: CALENDLY_CAMPAIGN.WE_BUILD_IT }) : "";
    setBlueprintCallUrl(url || "#prefer-done-for-you");
    setMounted(true);
  }, [router]);

  if (!mounted || !planSlug || !submission) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-gray-600">Loading…</p>
      </div>
    );
  }

  const plan = getPlanBySlug(planSlug);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main" className="pt-20 scroll-smooth">
        {/* Hero — reduced bottom padding to cut gap to "Your 7-day preview" by 50% */}
        <Section className="pb-5 md:pb-6">
          <div className="container-custom">
            <header className="max-w-4xl mx-auto text-center">
              <h1 className="heading-xl mb-6">
                {firstName}, your 7-day plan is ready.
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
                {planName}
              </h2>
              <p className="mt-3 text-xl text-gray-700 max-w-2xl mx-auto">
                {planOneLiner}
              </p>
            </header>
          </div>
        </Section>

        {/* 7-day grid (navigation anchor, clickable) */}
        <Section className="pt-0">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-8 text-center">
                Your 7-day preview
              </h2>
              <PreviewGrid previewDays={planPreviewDays} makeCardsClickable />
            </div>
          </div>
        </Section>

        {/* Sticky bar: day links + Download Guide + CTA (aligned with hero margins) */}
        <RoadmapStickyBar
          fullDays={plan.fullDays}
          blueprintCallUrl={blueprintCallUrl}
          onDownloadClick={handleDownloadPdfClick}
        />

        {/* Day sections: Day 1 expanded, Days 2–7 accordion (ref wraps content for PDF export) */}
        <Section className="pt-0 !pb-0">
          <div className="container-custom">
            <div ref={pdfRef} className="max-w-6xl mx-auto pb-0">
              {/* Logo only visible in PDF (500% larger); hidden on Results page */}
              <div
                className={`flex justify-center mb-6 transition-opacity ${
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
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 mb-2 text-center">
                Your detailed implementation plan
              </h2>
              <p className="text-center text-lg font-semibold text-gray-800 mb-1">{planName}</p>
              <p className="text-center text-neutral-600 mb-6">{planOneLiner}</p>
              <div className="space-y-4 [&>*:last-child]:mb-0">
                {plan.fullDays.map((day, index) => (
                  <div key={day.dayLabel} className="last:mb-0">
                    <DaySection
                      day={day}
                      defaultExpanded={index === 0}
                      forceExpanded={pdfCapturing}
                    />
                    {/* Speed bump: Lite Blueprint banner between Day 3 and Day 4 */}
                    {index === 2 && (
                      <div className="py-6">
                        <BlueprintCallLite submission={submission} plan={plan} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* DIY notice (one line under Day 7), Download PDF ghost, Let us build it CTA — tight spacing */}
        <Section className="pt-4 pb-4">
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <Disclaimer containerClassName="max-w-6xl mx-auto" compact />
              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={handleDownloadPdfClick}
                  className="flex items-center gap-3 text-base font-normal text-neutral-500 hover:text-neutral-700 focus:outline-none focus:ring-2 focus:ring-[#EA3D2A] focus:ring-offset-1 rounded border-0 bg-transparent py-2 px-3 whitespace-nowrap"
                  aria-label="Download PDF"
                >
                  <PdfIcon className="h-7 w-7 flex-shrink-0" />
                  Download PDF
                </button>
              </div>
              <div className="flex justify-center mt-4">
                <RoadmapCtas blueprintCallUrl={blueprintCallUrl} />
              </div>
            </div>
          </div>
        </Section>

        {/* Your Custom Workflow Blueprint Call (full section) */}
        <BlueprintCallSection submission={submission} plan={plan} />

        {/* White divider line between black section and footer */}
        <div className="h-px bg-white" aria-hidden="true" />
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
