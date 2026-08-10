import { MetadataRoute } from 'next'
import { publishedBlogPosts, blogCategories } from '@/lib/blog/posts'
import { MASTER_TOOL_REGISTRY } from '@/lib/catalog'
import { getYMYLQuality } from '@/lib/seo/ymyl'

const BASE = 'https://tooltrio.com'

/**
 * Sitemap policy:
 * - Include only canonical/indexable tool routes.
 * - Use a real content/review date when one exists.
 * - Do not invent deployment dates for pages that were not materially changed.
 * - Google ignores priority/changefreq, so we omit those signals entirely.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const seenBlogSlugs = new Set<string>()
  const uniqueBlogPosts = publishedBlogPosts.filter(post => {
    if (seenBlogSlugs.has(post.slug)) return false
    seenBlogSlugs.add(post.slug)
    return true
  })

  const toolUrls = MASTER_TOOL_REGISTRY
    .filter(tool => {
      if (tool.cat !== 'finance' && tool.cat !== 'health') return true
      const slug = tool.href.split('/').filter(Boolean).at(-1) ?? ''
      return getYMYLQuality(tool.cat, slug).indexable
    })
    .map(tool => ({
      url: `${BASE}${tool.href}`,
      ...(tool.metadata.lastReviewed ? { lastModified: tool.metadata.lastReviewed } : {}),
    }))

  const categoryRoutes = [
    '/calculators/finance',
    '/calculators/health',
    '/calculators/dev',
    '/calculators/fun',
    '/zip',
    '/commodities',
  ]

  return [
    { url: BASE },
    ...categoryRoutes.map(href => ({ url: `${BASE}${href}` })),
    { url: `${BASE}/blog` },
    { url: `${BASE}/about` },
    { url: `${BASE}/methodology` },
    { url: `${BASE}/contact` },
    { url: `${BASE}/privacy-policy` },
    { url: `${BASE}/disclaimer` },
    ...toolUrls,
    ...uniqueBlogPosts.map(post => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt).toISOString(),
    })),
    ...blogCategories.map(category => ({
      url: `${BASE}/blog/category/${category.slug}`,
    })),
  ]
}
