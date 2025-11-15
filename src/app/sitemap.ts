import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  // Use the actual production URL for the deployed site
  const baseUrl = 'https://same-7f50udlj5du-latest.netlify.app'
  const currentDate = new Date().toISOString()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      // Include specific last modified dates for better SEO
      alternates: {
        languages: {
          'en-US': baseUrl,
        },
      },
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9, // High priority for conversion page
      alternates: {
        languages: {
          'en-US': `${baseUrl}/contact`,
        },
      },
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // Important for SEO and user support
      alternates: {
        languages: {
          'en-US': `${baseUrl}/faq`,
        },
      },
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: currentDate,
      changeFrequency: 'weekly', // Resources may be updated frequently
      priority: 0.8, // Important for content discovery
      alternates: {
        languages: {
          'en-US': `${baseUrl}/resources`,
        },
      },
    },
    {
      url: `${baseUrl}/privacy-terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly', // Legal pages change less frequently
      priority: 0.3, // Lower priority for legal pages
      alternates: {
        languages: {
          'en-US': `${baseUrl}/privacy-terms`,
        },
      },
    },
  ]
}
