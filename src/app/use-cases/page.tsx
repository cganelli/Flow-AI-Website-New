import type { Metadata } from "next";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import UseCasesClientInner from "./useCasesClientInner";

export const metadata: Metadata = {
  title: "Use Cases | Flow AI",
  description:
    "Browse AI use cases by problem, function, and software. Each card shows one workflow to ship.",
};

export default function UseCasesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main id="main" className="pt-20">
        <UseCasesClientInner />
      </main>
      <Footer />
    </div>
  );
}
