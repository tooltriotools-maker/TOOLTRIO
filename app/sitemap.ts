import { MetadataRoute } from 'next'
import { publicBlogPosts } from '@/lib/blog/posts'
import { MASTER_TOOL_REGISTRY } from '@/lib/catalog'
import { INSULT_TOOLS } from '@/app/fun/insult-generator/data'

const BASE = 'https://tooltrio.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const seenBlogSlugs = new Set<string>()
  const uniqueBlogPosts = publicBlogPosts.filter(post => {
    if (seenBlogSlugs.has(post.slug)) return false
    seenBlogSlugs.add(post.slug)
    return true
  })

  // MASTER_TOOL_REGISTRY now contains canonical /fun/* links for the 30
  // migrated fun tools. Legacy /calculators/fun/* URLs are intentionally
  // excluded because they permanently redirect and must not be sitemap URLs.
  const toolUrls = MASTER_TOOL_REGISTRY.map(tool => ({
    url: `${BASE}${tool.href}`,
    ...(tool.metadata.lastReviewed ? { lastModified: tool.metadata.lastReviewed } : {}),
  }))

  const insultHub = { url: `${BASE}/fun/insult-generator` }
  const shakespeareInsultPage = { url: `${BASE}/fun/insult-generator/shakespeare-insult-generator` }
  const insultPages = INSULT_TOOLS.map(tool => ({
    url: `${BASE}/fun/insult-generator/${tool.slug}`,
  }))

  const categoryRoutes = ['/fun', '/zip']

  const routes = [
    { url: BASE },
    ...categoryRoutes.map(href => ({ url: `${BASE}${href}` })),
    insultHub,
    ...insultPages,
    shakespeareInsultPage,
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

  const seen = new Set<string>()
  return routes.filter(route => {
    if (seen.has(route.url)) return false
    seen.add(route.url)
    return true
  })
}
