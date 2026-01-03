"use client";

import Layout from "@/components/layout/layout";
import Link from "next/link";

export default function BookCallPage() {
  return (
    <Layout>
      <section className="py-20 md:py-32" aria-labelledby="book-call-heading">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <h1 id="book-call-heading" className="heading-xl mb-8">Let's Talk</h1>
          <p className="text-xl md:text-2xl mb-16">
            Choose the <strong>time</strong> and <strong>date</strong> that fits you best
          </p>

          {/* Calendar Placeholder - In a real implementation, this would be replaced with a Calendly or similar booking widget */}
          <div className="bg-gray/10 p-8 rounded-xl min-h-[400px] flex items-center justify-center" role="region" aria-label="Booking calendar placeholder">
            <div className="text-center">
              <h2 className="text-xl font-medium mb-4">Booking Calendar</h2>
              <p className="text-gray mb-6">Select a date and time for your AI strategy call</p>
              <Link href="/" className="btn-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" aria-label="Return to Flow AI homepage">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
