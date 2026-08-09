import { MetadataRoute } from 'next'
import { allBlogPosts, blogCategories } from '@/lib/blog/posts'
import { MASTER_TOOL_REGISTRY } from '@/lib/catalog'

const BASE = 'https://tooltrio.com'

// Stable dates prevent every deployment from pretending every URL changed.
const STABLE_DATE = '2026-05-01T00:00:00.000Z'
const SITE_DATE = '2026-06-10T00:00:00.000Z'

const TOOL_PRIORITY: Record<string, number> = {
  finance: 0.90,
  health: 0.90,
  dev: 0.65,
  fun: 0.55,
  zip: 0.80,
  commodities: 0.82,
}

const TOOL_CHANGE_FREQUENCY: Record<string, 'daily' | 'monthly'> = {
  finance: 'monthly',
  health: 'monthly',
  dev: 'monthly',
  fun: 'monthly',
  zip: 'monthly',
  commodities: 'daily',
}

export default function sitemap(): MetadataRoute.Sitemap {
  const seenBlogSlugs = new Set<string>()
  const uniqueBlogPosts = allBlogPosts.filter(post => {
    if (seenBlogSlugs.has(post.slug)) return false
    seenBlogSlugs.add(post.slug)
    return true
  })

  const toolUrls = MASTER_TOOL_REGISTRY.map(tool => ({
    url: `${BASE}${tool.href}`,
    ...(tool.metadata.lastReviewed ? { lastModified: tool.metadata.lastReviewed } : {}),
    changeFrequency: TOOL_CHANGE_FREQUENCY[tool.cat],
    priority: TOOL_PRIORITY[tool.cat],
  }))

  const categoryRoutes = [
    ['finance', '/calculators/finance', 0.95],
    ['health', '/calculators/health', 0.95],
    ['dev', '/calculators/dev', 0.80],
    ['fun', '/calculators/fun', 0.75],
    ['zip', '/zip', 0.75],
    ['commodities', '/commodities', 0.85],
  ] as const

  return [
    { url: BASE, lastModified: SITE_DATE, changeFrequency: 'weekly', priority: 1.0 },
    ...categoryRoutes.map(([, href, priority]) => ({
      url: `${BASE}${href}`,
      lastModified: SITE_DATE,
      changeFrequency: 'weekly' as const,
      priority,
    })),
    { url: `${BASE}/blog`, lastModified: SITE_DATE, changeFrequency: 'weekly', priority: 0.90 },
    { url: `${BASE}/about`, lastModified: STABLE_DATE, changeFrequency: 'monthly', priority: 0.70 },
    { url: `${BASE}/methodology`, lastModified: STABLE_DATE, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/contact`, lastModified: STABLE_DATE, changeFrequency: 'monthly', priority: 0.60 },
    { url: `${BASE}/privacy-policy`, lastModified: STABLE_DATE, changeFrequency: 'yearly', priority: 0.40 },
    { url: `${BASE}/disclaimer`, lastModified: STABLE_DATE, changeFrequency: 'yearly', priority: 0.40 },
    ...toolUrls,
    ...uniqueBlogPosts.map(post => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.publishedAt).toISOString(),
      changeFrequency: 'monthly' as const,
      priority: 0.82,
    })),
    ...blogCategories.map(category => ({
      url: `${BASE}/blog/category/${category.slug}`,
      lastModified: SITE_DATE,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
  ]
}
