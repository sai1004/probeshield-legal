import { MetadataRoute } from 'next'
import { posts } from '@/content/posts'

const BASE_URL = 'https://probeshield.com'

// next.config.mjs sets trailingSlash: true, so every route except the root
// is served at /path/ and 308-redirects from /path (no slash). A sitemap
// entry that redirects instead of returning 200 is exactly what Search
// Console flags as "Page with redirect" — every non-root URL here must
// carry the trailing slash to match what's actually served.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/checklist/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/default-passwords/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools/mac-lookup/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}/`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${BASE_URL}/privacy/`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms/`,
      lastModified: new Date('2025-01-01'),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
