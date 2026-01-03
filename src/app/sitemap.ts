import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE_URL = process.env.SITE_URL ?? 'https://thisisflowai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()

  return [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      // Include specific last modified dates for better SEO
      alternates: {
        languages: {
          'en-US': BASE_URL,
        },
      },
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9, // High priority for conversion page
      alternates: {
        languages: {
          'en-US': `${BASE_URL}/contact`,
        },
      },
    },
    {
      url: `${BASE_URL}/faq`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // Important for SEO and user support
      alternates: {
        languages: {
          'en-US': `${BASE_URL}/faq`,
        },
      },
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: currentDate,
      changeFrequency: 'weekly', // Resources may be updated frequently
      priority: 0.8, // Important for content discovery
      alternates: {
        languages: {
          'en-US': `${BASE_URL}/resources`,
        },
      },
    },
    {
      url: `${BASE_URL}/use-cases`,
      lastModified: currentDate,
      changeFrequency: 'weekly', // Use cases may be updated frequently
      priority: 0.8, // Important for content discovery
      alternates: {
        languages: {
          'en-US': `${BASE_URL}/use-cases`,
        },
      },
    },
    {
      url: `${BASE_URL}/training`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // Important for lead generation
      alternates: {
        languages: {
          'en-US': `${BASE_URL}/training`,
        },
      },
    },
    {
      url: `${BASE_URL}/privacy-terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly', // Legal pages change less frequently
      priority: 0.3, // Lower priority for legal pages
      alternates: {
        languages: {
          'en-US': `${BASE_URL}/privacy-terms`,
        },
      },
    },
  ]
}
