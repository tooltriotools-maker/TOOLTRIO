import { MetadataRoute } from 'next'
import { publicBlogPosts, blogCategories } from '@/lib/blog/posts'
import { MASTER_TOOL_REGISTRY } from '@/lib/catalog'

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
  const uniqueBlogPosts = publicBlogPosts.filter(post => {
    if (seenBlogSlugs.has(post.slug)) return false
    seenBlogSlugs.add(post.slug)
    return true
  })

  const toolUrls = MASTER_TOOL_REGISTRY.map(tool => ({
      url: `${BASE}${tool.href}`,
      ...(tool.metadata.lastReviewed ? { lastModified: tool.metadata.lastReviewed } : {}),
    }))

  const categoryRoutes = [
    '/fun',
    '/zip',
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
    { url: `${BASE}/blog/category/zip-codes` },
  ]
}
