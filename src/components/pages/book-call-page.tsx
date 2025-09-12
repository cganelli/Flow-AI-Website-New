"use client";

import Layout from "@/components/layout/layout";
import Link from "next/link";

export default function BookCallPage() {
  return (
    <Layout>
      <section className="py-20 md:py-32">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <h1 className="heading-xl mb-8">Let's Talk</h1>
          <p className="text-xl md:text-2xl mb-16">
            Choose the <strong>time</strong> and <strong>date</strong> that fits you best
          </p>

          {/* Calendar Placeholder - In a real implementation, this would be replaced with a Calendly or similar booking widget */}
          <div className="bg-gray/10 p-8 rounded-xl min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-xl font-medium mb-4">Booking Calendar</p>
              <p className="text-gray mb-6">Select a date and time for your AI strategy call</p>
              <Link href="/" className="btn-primary">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
