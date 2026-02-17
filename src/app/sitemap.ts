import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const BASE_URL = process.env.SITE_URL ?? 'https://thisisflowai.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString()

  const baseUrl = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  const withSlash = (path: string) => `${baseUrl}${path}/`;

  return [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      // Include specific last modified dates for better SEO
      alternates: {
        languages: {
          'en-US': `${baseUrl}/`,
        },
      },
    },
    {
      url: withSlash('/contact'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9, // High priority for conversion page
      alternates: {
        languages: {
          'en-US': withSlash('/contact'),
        },
      },
    },
    {
      url: withSlash('/faq'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // Important for SEO and user support
      alternates: {
        languages: {
          'en-US': withSlash('/faq'),
        },
      },
    },
    {
      url: withSlash('/resources'),
      lastModified: currentDate,
      changeFrequency: 'weekly', // Resources may be updated frequently
      priority: 0.8, // Important for content discovery
      alternates: {
        languages: {
          'en-US': withSlash('/resources'),
        },
      },
    },
    {
      url: withSlash('/use-cases'),
      lastModified: currentDate,
      changeFrequency: 'weekly', // Use cases may be updated frequently
      priority: 0.8, // Important for content discovery
      alternates: {
        languages: {
          'en-US': withSlash('/use-cases'),
        },
      },
    },
    {
      url: withSlash('/training'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8, // Important for lead generation
      alternates: {
        languages: {
          'en-US': withSlash('/training'),
        },
      },
    },
    {
      url: withSlash('/solutions'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'en-US': withSlash('/solutions'),
        },
      },
    },
    {
      url: withSlash('/book-call'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          'en-US': withSlash('/book-call'),
        },
      },
    },
    {
      url: withSlash('/lead-magnet'),
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'en-US': withSlash('/lead-magnet'),
        },
      },
    },
    {
      url: withSlash('/accessibility'),
      lastModified: currentDate,
      changeFrequency: 'yearly',
      priority: 0.5,
      alternates: {
        languages: {
          'en-US': withSlash('/accessibility'),
        },
      },
    },
    {
      url: withSlash('/privacy-terms'),
      lastModified: currentDate,
      changeFrequency: 'yearly', // Legal pages change less frequently
      priority: 0.3, // Lower priority for legal pages
      alternates: {
        languages: {
          'en-US': withSlash('/privacy-terms'),
        },
      },
    },
  ]
}
