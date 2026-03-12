import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "7-Day AI Plan Quiz | Flow AI - Find Your Best Starting Point",
  description:
    "Take the Flow AI quiz to get a personalized 7-day plan. Discover which AI workflows will have the biggest impact for your business.",
  alternates: {
    canonical: "https://thisisflowai.com/lead-magnet/",
  },
  openGraph: {
    title: "7-Day AI Plan Quiz | Flow AI - Find Your Best Starting Point",
    description:
      "Take the Flow AI quiz to get a personalized 7-day plan. Discover which AI workflows will have the biggest impact for your business.",
    url: "https://thisisflowai.com/lead-magnet/",
    siteName: "Flow AI",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Flow AI - 7-Day AI Plan Quiz" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "7-Day AI Plan Quiz | Flow AI - Find Your Best Starting Point",
    description:
      "Take the Flow AI quiz to get a personalized 7-day plan. Discover which AI workflows will have the biggest impact for your business.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LeadMagnetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
