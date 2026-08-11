import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const BLOG_DIR = path.join(ROOT, 'lib/blog')
const BASE = 'https://tooltrio.com'
const TODAY = new Date()
const blogSource = fs.readFileSync(path.join(ROOT, 'lib/blog/posts.ts'), 'utf8')
const REQUIRED_CATEGORIES = new Map([...blogSource.matchAll(/\{\s*name:\s*['"]([^'"]+)['"],\s*slug:\s*['"]([^'"]+)['"]/g)].map(m => [m[2], m[1]]))

function postMatches(source) {
  const matches = [...source.matchAll(/^(\s*)slug:\s*(['"])(.*?)\2,\s*\n\s*title:\s*(['"])(.*?)\4/mg)]
  const groups = new Map()
  for (const match of matches) {
    const indent = match[1].length
    if (!groups.has(indent)) groups.set(indent, [])
    groups.get(indent).push(match)
  }
  return [...groups.values()].sort((a, b) => b.length - a.length)[0] ?? []
}

function constantsFrom(source) {
  const constants = new Map()
  for (const m of source.matchAll(/\b(?:const|let)\s+([A-Z][A-Z0-9_]*)\s*=\s*(['"])(.*?)\2\s*;?/g)) constants.set(m[1], m[3])
  return constants
}

function templateValue(segment, field) {
  const marker = new RegExp('\\b' + field + '\\s*:\\s*' + String.fromCharCode(96)).exec(segment)
  if (!marker) return null
  const start = marker.index + marker[0].length
  let i = start
  let escaped = false
  while (i < segment.length) {
    const c = segment[i]
    if (escaped) { escaped = false; i++; continue }
    if (c === '\\') { escaped = true; i++; continue }
    if (c === '`') return segment.slice(start, i)
    i++
  }
  return null
}

function scalarValue(segment, field, constants) {
  const rx = new RegExp(`\\b${field}\\s*:\\s*(['"])(.*?)\\1\\s*,?`)
  const literal = rx.exec(segment)
  if (literal) return literal[2]
  const constant = new RegExp(`\\b${field}\\s*:\\s*([A-Z][A-Z0-9_]*)\\s*,?`).exec(segment)
  return constant ? constants.get(constant[1]) ?? null : null
}

function arrayValues(segment, field) {
  const marker = new RegExp('\\b' + field + '\\s*:\\s*' + String.fromCharCode(96)).exec(segment)
  if (!marker) return []
  let depth = 1
  let i = marker.index + marker[0].length
  let quote = null
  let escaped = false
  let end = i
  while (i < segment.length) {
    const c = segment[i]
    if (quote) {
      if (escaped) escaped = false
      else if (c === '\\') escaped = true
      else if (c === quote) quote = null
    } else if (c === '\'' || c === '"') quote = c
    else if (c === '[') depth++
    else if (c === ']') { depth--; if (depth === 0) { end = i; break } }
    i++
  }
  return [...segment.slice(marker.index + marker[0].length, end).matchAll(/(['"])(.*?)\1/g)].map(m => m[2])
}

function wordCount(text) { return (text.match(/[\p{L}\p{N}₹$'-]+/gu) ?? []).length }
function shingleSet(text) {
  const words = (text.toLowerCase().match(/[a-z0-9]{4,}/g) ?? [])
  const set = new Set()
  for (let i = 0; i < words.length - 4; i++) set.add(words.slice(i, i + 5).join(' '))
  return set
}
function jaccard(a, b) {
  let intersection = 0
  for (const x of a) if (b.has(x)) intersection++
  const union = a.size + b.size - intersection
  return union ? intersection / union : 0
}

const posts = []
for (const file of fs.readdirSync(BLOG_DIR).filter(name => name.endsWith('.ts') && !name.endsWith('.bak'))) {
  const source = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8')
  const constants = constantsFrom(source)
  const matches = postMatches(source)
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i]
    const segment = source.slice(match.index, i + 1 < matches.length ? matches[i + 1].index : source.length)
    const slug = match[3]
    const title = match[5]
    const content = templateValue(segment, 'content') ?? ''
    const keywords = arrayValues(segment, 'keywords')
    const relatedBlogsBlock = segment.match(/\brelatedBlogs\s*:\s*\[([\s\S]*?)\n\s*\],/)?.[1] ?? ''
    const relatedBlogs = [...relatedBlogsBlock.matchAll(/\bslug:\s*['\"]([^'\"]+)['\"]/g)].map(m => m[1])
    const relatedCalcHref = segment.match(/\brelatedCalc\s*:\s*\{[\s\S]*?\bhref:\s*['\"]([^'\"]+)['\"]/)?.[1] ?? ''
    const relatedCalcsBlock = segment.match(/\brelatedCalcs\s*:\s*\[([\s\S]*?)\n\s*\],/)?.[1] ?? ''
    const relatedCalcHrefs = [relatedCalcHref, ...[...relatedCalcsBlock.matchAll(/\bhref:\s*['\"]([^'\"]+)['\"]/g)].map(m => m[1])].filter(Boolean)
    const publishedAt = scalarValue(segment, 'publishedAt', constants)
    const author = scalarValue(segment, 'author', constants)
    const categorySlug = scalarValue(segment, 'categorySlug', constants)
    const category = scalarValue(segment, 'category', constants)
    const seoTitle = scalarValue(segment, 'seoTitle', constants)
    const seoDescription = scalarValue(segment, 'seoDescription', constants)
    const updatedAt = scalarValue(segment, 'updatedAt', constants)
    const excerpt = scalarValue(segment, 'excerpt', constants)
    const url = `${BASE}/blog/${slug}`
    const futureDate = !publishedAt || Number.isNaN(Date.parse(publishedAt)) || new Date(`${publishedAt}T00:00:00Z`) > TODAY
    const published = !futureDate
    const links = [...content.matchAll(/\]\((\/[^)\s]+)[^)]*\)/g)].map(m => m[1].replace(/[.,;]+$/, ''))
    const h2 = (content.match(/^##\s+/gm) ?? []).length
    const h3 = (content.match(/^###\s+/gm) ?? []).length
    const internalLinks = links.filter(href => href.startsWith('/'))
    const calculatorLinks = links.filter(href => href.startsWith('/calculators/'))
    const wc = wordCount(content)
    const thinContent = wc < 220 || (wc < 300 && h2 < 3 && internalLinks.length < 2)
    const keywordSet = new Set(keywords.map(k => k.toLowerCase()))
    const keywordDuplicates = keywords.length - keywordSet.size
    const suspiciousKeywords = keywords.filter(k => /^(free\s|how to use\s)|\bonline$/i.test(k.trim()))
    posts.push({ file, slug, title, excerpt, category, categorySlug, publishedAt, updatedAt, author, seoTitle, seoDescription, content, keywords, relatedBlogs, relatedCalcHref, relatedCalcHrefs, url, futureDate, published, links, internalLinks, calculatorLinks, wordCount: wc, h2, h3, thinContent, keywordDuplicates, suspiciousKeywords })
  }
}

const slugSet = new Set(posts.map(p => p.slug))
const duplicateSlugs = [...posts.reduce((m, p) => m.set(p.slug, (m.get(p.slug) ?? 0) + 1), new Map()).entries()].filter(([, n]) => n > 1)
const duplicateTitles = [...posts.reduce((m, p) => m.set(p.title, (m.get(p.title) ?? 0) + 1), new Map()).entries()].filter(([, n]) => n > 1)
const duplicateSeoTitles = [...posts.reduce((m, p) => m.set(p.seoTitle, (m.get(p.seoTitle) ?? 0) + 1), new Map()).entries()].filter(([, n]) => n > 1)
const duplicateSeoDescriptions = [...posts.reduce((m, p) => m.set(p.seoDescription, (m.get(p.seoDescription) ?? 0) + 1), new Map()).entries()].filter(([, n]) => n > 1)
const invalidCategories = posts.filter(p => !REQUIRED_CATEGORIES.has(p.categorySlug))
const categoryLabelMismatches = posts.filter(p => REQUIRED_CATEGORIES.has(p.categorySlug) && p.category !== REQUIRED_CATEGORIES.get(p.categorySlug))
const missingFields = Object.fromEntries(['title','excerpt','category','categorySlug','publishedAt','author','seoTitle','seoDescription','content'].map(field => [field, posts.filter(p => !p[field]).length]))

const routeSet = new Set()
function collectRoutes(dir, prefix = '') {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue
    const next = path.join(dir, entry.name)
    const route = `${prefix}/${entry.name}`
    if (fs.existsSync(path.join(next, 'page.tsx'))) routeSet.add(route)
    collectRoutes(next, route)
  }
}
collectRoutes(path.join(ROOT, 'app/calculators'), '/calculators')
routeSet.add('/zip')

const brokenInternal = []
const brokenRelatedArticles = []
const brokenCalculator = []
const brokenStructuredCalculator = []
for (const post of posts) {
  for (const relatedSlug of post.relatedBlogs) {
    if (!slugSet.has(relatedSlug)) brokenRelatedArticles.push({ slug: post.slug, relatedSlug })
  }
  for (const href of post.relatedCalcHrefs) {
    if (href.startsWith('/calculators/') && !routeSet.has(href.replace(/\/$/, ''))) brokenStructuredCalculator.push({ slug: post.slug, href })
  }
  for (const href of post.links) {
    if (href.startsWith('/calculators/') && !routeSet.has(href.replace(/\/$/, ''))) brokenCalculator.push({ slug: post.slug, href })
    else if (href.startsWith('/blog/category/') && !REQUIRED_CATEGORIES.has(href.split('/').filter(Boolean).pop())) brokenInternal.push({ slug: post.slug, href })
    else if (href.startsWith('/blog/') && href !== '/blog' && !slugSet.has(href.split('/').filter(Boolean).pop())) brokenInternal.push({ slug: post.slug, href })
  }
}

const categoryCounts = Object.fromEntries([...REQUIRED_CATEGORIES.keys()].map(slug => [slug, posts.filter(p => p.published && p.categorySlug === slug).length]))
const catalogSource = fs.readFileSync(path.join(ROOT, 'lib/catalog/blog.ts'), 'utf8')
const catalogSlugs = [...catalogSource.matchAll(/href:\s*'\/blog\/([^']+)'/g)].map(m => m[1])
const catalogSet = new Set(catalogSlugs)
const catalogMissing = posts.filter(p => !catalogSet.has(p.slug)).map(p => p.slug)
const catalogExtra = catalogSlugs.filter(slug => !slugSet.has(slug))

const articlePage = fs.readFileSync(path.join(ROOT, 'app/blog/[slug]/page.tsx'), 'utf8')
const visibilityPage = fs.readFileSync(path.join(ROOT, 'lib/visibility.ts'), 'utf8')
const publicBlogBlock = visibilityPage.match(/PUBLIC_BLOG_HREFS\s*=\s*new Set\(\[([\s\S]*?)\]\)/m)?.[1] ?? ''
const publicBlogHrefs = new Set([...publicBlogBlock.matchAll(/['\"](\/blog\/[^'\"]+)['\"]/g)].map(m => m[1]))
function isPublicBlogPost(post) { return publicBlogHrefs.has(post.href ?? (post.slug ? `/blog/${post.slug}` : '')) }
const sitemapPage = fs.readFileSync(path.join(ROOT, 'app/sitemap.ts'), 'utf8')
const blogPage = fs.readFileSync(path.join(ROOT, 'app/blog/page.tsx'), 'utf8')
const categoryPage = fs.readFileSync(path.join(ROOT, 'app/blog/category/[slug]/page.tsx'), 'utf8')
const ogImage = fs.existsSync(path.join(ROOT, 'app/blog/[slug]/opengraph-image.tsx'))
const structural = {
  route: /generateStaticParams/.test(articlePage) && /publishedBlogPosts/.test(articlePage),
  canonical: /alternates:\s*\{\s*canonical:.*\/blog\//s.test(articlePage),
  articleSchema: /'@type': 'Article'/.test(articlePage) && /datePublished: post\.publishedAt/.test(articlePage) && /dateModified: post\.updatedAt/.test(articlePage) && /author:[\s\S]*?name: post\.author/.test(articlePage),
  mainEntityOfPage: /mainEntityOfPage/.test(articlePage),
  publicBlogAllowlist: /PUBLIC_BLOG_HREFS/.test(visibilityPage) && /isPublicBlogPost/.test(visibilityPage),
  sitemapPublicOnly: /publicBlogPosts/.test(sitemapPage) && !/publishedBlogPosts/.test(sitemapPage),
  dynamicBlogCount: /blogPosts\.length/.test(blogPage),
  dynamicCategoryCount: /posts\.length/.test(categoryPage),
  categorySourceOfTruth: /blogCategories/.test(blogPage) && !/const CAT_CONFIG:\s*Record/.test(blogPage),
  noHardcodedBlogCount: !/\b157\b|\b296\b/.test(blogPage),
  markdownRenderer: /MarkdownContent/.test(articlePage) && fs.existsSync(path.join(ROOT, 'lib/blog/markdown.tsx')),
  dynamicOgImage: ogImage,
  contentHasH1: posts.every(p => /^#\s+.+/m.test(p.content)),
}

const publicPosts = posts.filter(p => p.published && isPublicBlogPost({ slug: p.slug }))
if (publicPosts.length !== 22) criticalFailures.push(`Expected 22 public/indexable blog articles, found ${publicPosts.length}`)

const shingles = posts.map(p => ({ slug: p.slug, category: p.categorySlug, title: p.title, set: shingleSet(p.content) }))
const nearDuplicates = []
const titleTokens = text => new Set((text.toLowerCase().match(/[a-z0-9]{3,}/g) ?? []).filter(token => !['2026', 'guide', 'calculator', 'complete'].includes(token)))
for (let i = 0; i < shingles.length; i++) {
  for (let j = i + 1; j < shingles.length; j++) {
    if (shingles[i].category !== shingles[j].category || shingles[i].set.size < 20 || shingles[j].set.size < 20) continue
    const score = jaccard(shingles[i].set, shingles[j].set)
    const titleOverlap = jaccard(titleTokens(shingles[i].title), titleTokens(shingles[j].title))
    if (score >= 0.85 && titleOverlap >= 0.25) nearDuplicates.push({ slugA: shingles[i].slug, slugB: shingles[j].slug, similarity: Number(score.toFixed(3)) })
  }
}

const rows = posts.map(post => ({
  slug: post.slug,
  url: post.url,
  title: post.title,
  category: post.category,
  categoryUrl: `${BASE}/blog/category/${post.categorySlug}`,
  publishedAt: post.publishedAt,
  updatedAt: post.updatedAt ?? '',
  wordCount: post.wordCount,
  thinContent: post.thinContent,
  seoTitle: post.seoTitle,
  seoTitleLength: post.seoTitle?.length ?? 0,
  seoDescription: post.seoDescription,
  seoDescriptionLength: post.seoDescription?.length ?? 0,
  canonical: post.url,
  canonicalValid: structural.canonical,
  indexable: post.published && isPublicBlogPost({ slug: post.slug }),
  sitemapIncluded: post.published && isPublicBlogPost({ slug: post.slug }),
  articleSchema: structural.articleSchema,
  author: post.author,
  internalLinkCount: post.internalLinks.length,
  brokenInternalLinkCount: brokenInternal.filter(x => x.slug === post.slug).length + brokenRelatedArticles.filter(x => x.slug === post.slug).length,
  calculatorLinkCount: post.calculatorLinks.length + post.relatedCalcHrefs.length,
  brokenCalculatorLinkCount: brokenCalculator.filter(x => x.slug === post.slug).length + brokenStructuredCalculator.filter(x => x.slug === post.slug).length,
  relatedArticleCount: post.relatedBlogs.length,
  ogImage: ogImage ? `${BASE}/blog/${post.slug}/opengraph-image` : `${BASE}/og-image.png`,
  duplicateTitle: duplicateTitles.some(([title]) => title === post.title),
  duplicateTopic: nearDuplicates.some(x => x.slugA === post.slug || x.slugB === post.slug),
  futureDate: post.futureDate,
  overallStatus: post.futureDate ? 'SCHEDULED' : post.thinContent ? 'NEEDS_IMPROVEMENT' : 'PASS',
}))

const criticalFailures = []
if (posts.length !== 286) criticalFailures.push(`Expected 286 articles, found ${posts.length}`)
if (new Set(posts.map(p => p.slug)).size !== posts.length) criticalFailures.push('Duplicate slugs found')
if (invalidCategories.length) criticalFailures.push(`${invalidCategories.length} invalid category assignments`)
if (categoryLabelMismatches.length) criticalFailures.push(`${categoryLabelMismatches.length} category label mismatches`)
if (brokenInternal.length) criticalFailures.push(`${brokenInternal.length} broken internal links`)
if (brokenRelatedArticles.length) criticalFailures.push(`${brokenRelatedArticles.length} broken related-article references`)
if (brokenCalculator.length) criticalFailures.push(`${brokenCalculator.length} broken calculator links`)
if (brokenStructuredCalculator.length) criticalFailures.push(`${brokenStructuredCalculator.length} broken structured calculator links`)
if (duplicateSeoTitles.length) criticalFailures.push(`${duplicateSeoTitles.length} duplicate SEO titles`)
if (duplicateSeoDescriptions.length) criticalFailures.push(`${duplicateSeoDescriptions.length} duplicate SEO descriptions`)
if (posts.some(p => (p.seoTitle?.length ?? 0) > 70)) criticalFailures.push('SEO title exceeds 70 characters')
if (posts.some(p => (p.seoDescription?.length ?? 0) > 160)) criticalFailures.push('SEO description exceeds 160 characters')
if (posts.some(p => p.keywordDuplicates || p.suspiciousKeywords.length)) criticalFailures.push('Keyword cleanup checks failed')
if (catalogMissing.length || catalogExtra.length || catalogSet.size !== slugSet.size) criticalFailures.push('Blog catalog does not match article corpus')
if (missingFields.title || missingFields.excerpt || missingFields.category || missingFields.categorySlug || missingFields.seoTitle || missingFields.seoDescription || missingFields.content) criticalFailures.push('Required article metadata/content is missing')
if (!Object.values(structural).every(Boolean)) criticalFailures.push(`Blog structural validation failed: ${Object.entries(structural).filter(([, ok]) => !ok).map(([k]) => k).join(', ')}`)
if (rows.some(r => r.indexable && r.futureDate)) criticalFailures.push('Future-dated article is indexable')
if (rows.some(r => r.indexable && !r.sitemapIncluded)) criticalFailures.push('Public article missing from sitemap')
if (rows.some(r => r.indexable && !r.canonicalValid)) criticalFailures.push('Public article has invalid canonical')
if (rows.some(r => r.indexable && !r.articleSchema)) criticalFailures.push('Published article missing Article schema')

const report = {
  generatedAt: new Date().toISOString(),
  expectedArticles: 286,
  totalArticles: posts.length,
  uniqueSlugs: slugSet.size,
  duplicateSlugs,
  duplicateTitles,
  duplicateSeoTitles,
  duplicateSeoDescriptions,
  missingFields,
  invalidCategories: [...new Set(invalidCategories.map(p => p.categorySlug))],
  invalidCategoryCount: invalidCategories.length,
  categoryLabelMismatchCount: categoryLabelMismatches.length,
  categoryCounts,
  futureDatedArticles: posts.filter(p => p.futureDate).map(p => ({ slug: p.slug, publishedAt: p.publishedAt })),
  brokenInternalLinks: brokenInternal,
  brokenRelatedArticles,
  brokenCalculatorLinks: brokenCalculator,
  brokenCalculatorTargetCount: new Set([...brokenCalculator, ...brokenStructuredCalculator].map(x => x.href)).size,
  brokenStructuredCalculatorLinks: brokenStructuredCalculator,
  metadata: {
    seoTitleOver70: posts.filter(p => (p.seoTitle?.length ?? 0) > 70).map(p => p.slug),
    seoDescriptionOver160: posts.filter(p => (p.seoDescription?.length ?? 0) > 160).map(p => p.slug),
    keywordDuplicateCount: posts.filter(p => p.keywordDuplicates).length,
    suspiciousKeywordCount: posts.reduce((n, p) => n + p.suspiciousKeywords.length, 0),
  },
  content: {
    minWordCount: Math.min(...posts.map(p => p.wordCount)),
    medianWordCount: [...posts.map(p => p.wordCount)].sort((a,b) => a-b)[Math.floor(posts.length/2)],
    maxWordCount: Math.max(...posts.map(p => p.wordCount)),
    thinCount: posts.filter(p => p.thinContent).length,
    needsImprovementCount: posts.filter(p => !p.thinContent && p.wordCount < 300).length,
  },
  catalog: { sourceCount: slugSet.size, catalogCount: catalogSet.size, missing: catalogMissing, extra: catalogExtra },
  structural,
  nearDuplicates,
  rows,
  criticalFailures,
  pass: criticalFailures.length === 0,
}

const reportsDir = path.join(ROOT, 'reports')
fs.mkdirSync(reportsDir, { recursive: true })
fs.writeFileSync(path.join(reportsDir, 'blog-audit-report.json'), JSON.stringify(report, null, 2))

const csvFields = Object.keys(rows[0] ?? {})
const csv = [csvFields.join(','), ...rows.map(row => csvFields.map(field => {
  const value = row[field] ?? ''
  return `"${String(value).replaceAll('"', '""')}"`
}).join(','))].join('\n')
fs.writeFileSync(path.join(reportsDir, 'blog-audit-report.csv'), csv + '\n')

console.log(JSON.stringify({
  totalArticles: posts.length,
  uniqueSlugs: slugSet.size,
  duplicateSlugs: duplicateSlugs.length,
  duplicateTitles: duplicateTitles.length,
  invalidCategoryAssignments: invalidCategories.length,
  futureDatedArticles: report.futureDatedArticles.length,
  brokenInternalLinks: brokenInternal.length,
  brokenCalculatorLinks: brokenCalculator.length,
  brokenCalculatorTargets: report.brokenCalculatorTargetCount,
  thinArticles: report.content.thinCount,
  catalogCount: catalogSet.size,
  nearDuplicatePairs: nearDuplicates.length,
  pass: report.pass,
  criticalFailures,
}, null, 2))

if (criticalFailures.length) process.exit(1)
