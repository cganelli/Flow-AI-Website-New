import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Call | Flow AI - Schedule Your Free AI Consultation",
  description:
    "Schedule a call with Flow AI to discuss your AI automation needs. We build custom workflows for lead follow-up, invoicing, onboarding, and more.",
  alternates: {
    canonical: "https://thisisflowai.com/book-call/",
  },
  openGraph: {
    title: "Book a Call | Flow AI - Schedule Your Free AI Consultation",
    description:
      "Schedule a call with Flow AI to discuss your AI automation needs. We build custom workflows for lead follow-up, invoicing, onboarding, and more.",
    url: "https://thisisflowai.com/book-call/",
    siteName: "Flow AI",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Flow AI - Book a call" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book a Call | Flow AI - Schedule Your Free AI Consultation",
    description:
      "Schedule a call with Flow AI to discuss your AI automation needs. We build custom workflows for lead follow-up, invoicing, onboarding, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function BookCallLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
