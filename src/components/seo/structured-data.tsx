"use client";

export function HomePageStructuredData() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Flow AI",
  url: "https://thisisflowai.com/",
    description: "AI automation solutions for small businesses to boost productivity and cut costs",
    potentialAction: {
      "@type": "SearchAction",
    target: "https://thisisflowai.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Business Automation",
    description: "Flow AI helps small businesses automate repetitive tasks, boost productivity, and scale operations using smart, customized AI workflows",
    provider: {
      "@type": "Organization",
      name: "Flow AI",
    url: "https://thisisflowai.com/"
    },
    serviceType: "Business Process Automation",
    areaServed: {
      "@type": "Country",
      name: "United States"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Automation Services",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Free AI Audit",
          description: "Get a custom roadmap showing exactly how AI can automate your specific business processes",
          price: "0",
          priceCurrency: "USD"
        },
        {
          "@type": "Offer",
          name: "AI Implementation",
          description: "Custom AI systems that integrate with your existing platforms and deliver real results"
        }
      ]
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Flow AI",
    description: "AI automation solutions for small businesses",
  url: "https://thisisflowai.com/",
    telephone: "+1-508-205-9941",
    email: "carissa@thisisflowai.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "US"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "42.3601",
      longitude: "-71.0589"
    },
    openingHours: "Mo-Fr 09:00-18:00",
    priceRange: "$$"
  };

  return (
    <>
      <script
        type="application/ld+json"
        /* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script */
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        /* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script */
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        /* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires inline script */
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
