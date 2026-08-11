/**
 * Public-discovery visibility rules.
 *
 * Finance and Health YMYL tools remain directly accessible for internal review,
 * but are intentionally excluded from public discovery surfaces and marked
 * noindex. Finance/Health-related blog content follows the same policy.
 */

export function isRestrictedToolHref(href: string): boolean {
  return href.startsWith('/calculators/finance/') || href.startsWith('/calculators/health/')
}

export function isRestrictedToolCategory(category: string): boolean {
  const normalized = category.toLowerCase()
  return normalized === 'finance' || normalized === 'health'
}

const RESTRICTED_BLOG_CATEGORIES = new Set([
  'investment',
  'retirement',
  'loans',
  'personal-finance',
  'tax',
  'health',
  'property',
  'commodity',
])

export function isRestrictedBlogCategory(slug: string): boolean {
  return RESTRICTED_BLOG_CATEGORIES.has(slug)
}

/**
 * Only these 22 blog posts are currently allowed in public discovery/indexing:
 * 21 ZIP-code guides + 1 developer-tools/JSON guide.
 * All other blog posts remain directly accessible but are noindex/follow.
 */
export const PUBLIC_BLOG_HREFS = new Set([
  '/blog/can-a-zip-code-cross-county-lines',
  '/blog/can-a-zip-code-cross-state-lines',
  '/blog/can-two-cities-have-the-same-zip-code',
  '/blog/dev-tools-calculator-guide-json-meta-tags-hash-unix-timestamp',
  '/blog/how-are-zip-codes-assigned',
  '/blog/how-far-apart-are-two-zip-codes',
  '/blog/how-many-zip-codes-are-in-the-united-states',
  '/blog/how-to-find-a-county-from-a-zip-code',
  '/blog/how-to-find-a-time-zone-from-a-zip-code',
  '/blog/how-to-find-a-zip-code-from-an-address',
  '/blog/how-to-find-latitude-and-longitude-from-zip-code',
  '/blog/how-to-find-the-population-of-a-zip-code',
  '/blog/how-to-find-zip-codes-within-a-radius',
  '/blog/how-to-validate-a-zip-code',
  '/blog/what-do-the-5-digits-in-a-zip-code-mean',
  '/blog/what-is-a-usps-zip-code',
  '/blog/what-is-a-valid-us-zip-code-format',
  '/blog/what-is-a-zip-code-prefix',
  '/blog/what-is-a-zip-plus-4-code',
  '/blog/which-state-has-the-fewest-zip-codes',
  '/blog/which-state-has-the-most-zip-codes',
  '/blog/zip-code-vs-postal-code',
])

export function isPublicBlogPost(post: { slug?: string; href?: string }): boolean {
  const href = post.href ?? (post.slug ? `/blog/${post.slug}` : '')
  return PUBLIC_BLOG_HREFS.has(href)
}

export function isRestrictedBlogPost(post: {
  slug?: string
  categorySlug?: string
  href?: string
  relatedCalc?: { href?: string }
  relatedCalcs?: Array<{ href?: string }>
}): boolean {
  return !isPublicBlogPost(post)
}

export function isRestrictedBlogCatalogItem(item: { name?: string; href?: string; kw?: string }): boolean {
  return !PUBLIC_BLOG_HREFS.has(item.href ?? '')
}

export const PUBLIC_BLOG_CATEGORY_SLUGS = new Set(['zip-codes', 'developer-tools'])
