import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { SkipLinks } from "@/components/ui/skip-links";
import CookieConsentBanner from "@/components/legal/cookie-consent-banner";
import Script from "next/script";

// Load Roboto font
const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thisisflowai.com'),
  title: "AI consulting services that design and implement AI strategy, agents, and workflows to drive measurable results.",
  description:
    "Flow AI helps small businesses automate repetitive tasks, boost productivity, and scale operations using smart, customized AI workflows. Discover how we deliver results through a simple 3-step process.",
  keywords: [
    "AI automation",
    "business automation",
    "B2B automation",
    "custom AI solutions",
    "workflow automation",
    "business efficiency",
    "AI systems",
    "process automation"
  ],
  authors: [{ name: "Flow AI Team" }],
  creator: "Flow AI",
  publisher: "Flow AI",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
  },
  openGraph: {
    title: "AI consulting services that design and implement AI strategy, agents, and workflows to drive measurable results.",
    description:
      "Flow AI helps small businesses automate repetitive tasks, boost productivity, and scale operations using smart, customized AI workflows. Discover how we deliver results through a simple 3-step process.",
    url: "https://flowai.com",
    siteName: "Flow AI",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Flow AI - AI consulting services that design and implement AI strategy, agents, and workflows to drive measurable results.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI consulting services that design and implement AI strategy, agents, and workflows to drive measurable results.",
    description:
      "Flow AI helps small businesses automate repetitive tasks, boost productivity, and scale operations using smart, customized AI workflows.",
    images: ["/images/twitter-image.jpg"],
    creator: "@FlowAI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://flowai.com",
  },
  category: "Technology",
  classification: "Business Software",
  other: {
    "revisit-after": "7 days",
    "distribution": "global",
    "rating": "general",
    "language": "EN",
    "HandheldFriendly": "True",
    "MobileOptimized": "320",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flow AI",
    alternateName: "FlowAI",
    description: "AI consultancy, implementation, and support services to help businesses of all sizes streamline operations and achieve lasting impact",
    url: "https://flowai.com",
    logo: {
      "@type": "ImageObject",
      url: "https://flowai.com/images/Flow_AI_Horizontal_Logo.png",
      width: "200",
      height: "50"
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-508-205-9941",
      contactType: "customer service",
      email: "carissa@thisisflowai.com",
      availableLanguage: "English"
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US"
    },
    sameAs: [
      "https://www.linkedin.com/company/flowai",
      "https://www.tiktok.com/@flowai",
      "https://www.youtube.com/@flowai"
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Automation Services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "AI Business Automation",
          description: "Custom AI systems and strategies that streamline business processes and achieve lasting impact",
          category: "Business Automation",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "0",
            priceCurrency: "USD",
            name: "Free AI Audit"
          }
        }
      ]
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "50",
      bestRating: "5",
      worstRating: "1"
    },
    founder: {
      "@type": "Person",
      name: "Carissa"
    }
  };

  return (
    <html lang="en" className={roboto.className}>
      <head>
        {/* Calendly CSS */}
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />

        {/* Safe to use dangerouslySetInnerHTML here as we're using JSON.stringify on known data */}
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: This is safe as we're using JSON.stringify on controlled data
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1B3W2T24NW"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1B3W2T24NW', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `}
        </Script>

        {/* Facebook Pixel */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <Script id="facebook-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}
      </head>
      <body>
        <SkipLinks />
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="sr-only">Loading...</span>
          </div>
        }>
          {children}
        </Suspense>
        <CookieConsentBanner />
      </body>
    </html>
  );
}
