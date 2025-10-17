import Head from 'next/head';

interface MetaTagsProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export function MetaTags({
  title,
  description,
  canonical,
  ogTitle,
  ogDescription,
  ogImage = '/images/og-image.jpg',
  twitterTitle,
  twitterDescription,
  keywords = [],
  noIndex = false
}: MetaTagsProps) {
  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph */}
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Flow AI" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterTitle && <meta name="twitter:title" content={twitterTitle} />}
      {twitterDescription && <meta name="twitter:description" content={twitterDescription} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      <meta name="twitter:creator" content="@FlowAI" />

      {/* SEO Meta Tags */}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <meta name="author" content="Flow AI" />
      <meta name="publisher" content="Flow AI" />
      <meta name="language" content="EN" />
      <meta name="revisit-after" content="7 days" />

      {/* Additional Meta Tags */}
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="theme-color" content="#EA3D2A" />
    </Head>
  );
}
