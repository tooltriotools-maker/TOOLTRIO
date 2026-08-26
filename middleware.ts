import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { publishedBlogPosts, blogCategories } from '@/lib/blog/posts'

const BASE_GONE_HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
  // Permanently removed URLs should not be indexed again.
  'X-Robots-Tag': 'noindex, follow',
}

const removedFunTools = new Set([
  '/fun/calories-in-beer',
  '/fun/how-rich-am-i',
  '/fun/life-expectancy-fun',
  '/fun/procrastination-score',
  '/fun/screen-time-calculator',
  '/fun/sleep-debt-calculator',
  '/fun/social-media-addiction',

  // Removed insult-generator URLs — permanently gone (HTTP 410).
  '/fun/insult-generator/roast-generator',
  '/fun/insult-generator/savage-insult-generator',
  '/fun/insult-generator/schoolyard-insult-generator',
  '/fun/insult-generator/office-roast-generator',
  '/fun/insult-generator/best-friend-roast-generator',
])

const removedShakespearePaths = new Set([
  '/fun/shakespeare-insult-generator',
  '/fun/insult-generator/shakespear-insult-generator',
  '/calculators/fun/shakespeare-insult-generator',
])

const removedCalculatorPrefixes = [
  '/calculators/finance',
  '/calculators/health',
  '/calculators/dev',
] as const

// Commodity tools were permanently removed from ToolTrio. Keep all legacy
// commodity URL families as HTTP 410 so old indexed URLs are explicitly
// retired instead of falling through to a normal 404.
const removedCommodityPrefixes = [
  '/commodity',
  '/commodities',
  '/calculator/commodity',
  '/calculator/commodities',
  '/calculators/commodity',
  '/calculators/commodities',
  '/tools/commodity',
  '/tools/commodities',
  '/commodity-tools',
  '/commodities-tools',
] as const

const publishedBlogSlugs = new Set(publishedBlogPosts.map(post => post.slug))
const publishedBlogCategorySlugs = new Set(blogCategories.map(category => category.slug))


const INDEXNOW_KEY = process.env.INDEXNOW_KEY || '5a108cc9e1994443af3e9bfb8b969aa8'
const INDEXNOW_KEY_LOCATION = `https://tooltrio.com/${INDEXNOW_KEY}.txt`

/**
 * Notify IndexNow whenever a request matches one of our permanent HTTP 410
 * rules. We do this from the existing 410 path so no deleted-URL list is
 * required. The 410 response remains the source of truth; IndexNow only
 * tells Bing that the URL changed and should be checked again.
 */
function notifyIndexNowForGoneUrl(request: NextRequest, event: NextFetchEvent) {
  const url = `https://tooltrio.com${request.nextUrl.pathname}`

  event.waitUntil(
    fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'tooltrio.com',
        key: INDEXNOW_KEY,
        keyLocation: INDEXNOW_KEY_LOCATION,
        urlList: [url],
      }),
    }).catch(() => {
      // IndexNow must never affect the 410 response.
    }),
  )
}

function goneResponse(request: NextRequest, event: NextFetchEvent) {
  notifyIndexNowForGoneUrl(request, event)
  return new NextResponse('Gone', {
    status: 410,
    headers: BASE_GONE_HEADERS,
  })
}


function handleLegacyFunCalculatorPath(pathname: string, request: NextRequest, event: NextFetchEvent) {
  const normalized = pathname.replace(/\/+$/, '') || '/'

  if (normalized === '/calculators/fun/shakespeare-insult-generator') {
    return goneResponse(request, event)
  }

  if (normalized === '/calculators/fun') {
    return NextResponse.redirect(new URL('/fun', request.url), 308)
  }

  if (normalized.startsWith('/calculators/fun/')) {
    const suffix = normalized.slice('/calculators/fun'.length)
    return NextResponse.redirect(new URL(`/fun${suffix}`, request.url), 308)
  }

  return NextResponse.next()
}

function isRemovedCalculatorPath(pathname: string) {
  return removedCalculatorPrefixes.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

function isRemovedCommodityPath(pathname: string) {
  return removedCommodityPrefixes.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

function handleBlogPath(pathname: string, request: NextRequest, event: NextFetchEvent) {
  // Keep Next.js-generated Open Graph image routes for valid posts working.
  if (pathname.endsWith('/opengraph-image')) {
    return NextResponse.next()
  }

  const blogPrefix = '/blog/'
  const relativePath = pathname.slice(blogPrefix.length).replace(/\/+$/, '')

  if (!relativePath) {
    return NextResponse.next()
  }

  const segments = relativePath.split('/').filter(Boolean)

  // /blog/<slug>
  if (segments.length === 1) {
    return publishedBlogSlugs.has(segments[0])
      ? NextResponse.next()
      : goneResponse(request, event)
  }

  // /blog/category/<slug>
  if (segments.length === 2 && segments[0] === 'category') {
    return publishedBlogCategorySlugs.has(segments[1])
      ? NextResponse.next()
      : goneResponse(request, event)
  }

  // Any other old/removed blog URL is permanently gone.
  return goneResponse(request, event)
}

export function middleware(request: NextRequest, event: NextFetchEvent) {
  const pathname = request.nextUrl.pathname

  const normalizedPathname = pathname.replace(/\/+$/, '') || '/'

  // Shakespeare insult generator was intentionally moved to the corrected
  // canonical [slug] URL. Do not redirect these retired URLs; return 410 Gone
  // so search engines permanently remove the old URLs from their index.
  if (removedShakespearePaths.has(normalizedPathname)) {
    return goneResponse(request, event)
  }

  if (normalizedPathname === '/calculators/fun' || normalizedPathname.startsWith('/calculators/fun/')) {
    return handleLegacyFunCalculatorPath(pathname, request, event)
  }

  if (removedFunTools.has(normalizedPathname)) {
    return goneResponse(request, event)
  }

  if (isRemovedCalculatorPath(normalizedPathname)) {
    return goneResponse(request, event)
  }

  if (isRemovedCommodityPath(normalizedPathname)) {
    return goneResponse(request, event)
  }

  if (pathname.startsWith('/blog/')) {
    return handleBlogPath(pathname, request, event)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/calculators/finance/:path*',
    '/calculators/health/:path*',
    '/calculators/dev/:path*',
    '/calculators/fun/:path*',
    '/calculators/fun',
    '/commodity/:path*',
    '/commodities/:path*',
    '/calculator/commodity/:path*',
    '/calculator/commodities/:path*',
    '/calculators/commodity/:path*',
    '/calculators/commodities/:path*',
    '/tools/commodity/:path*',
    '/tools/commodities/:path*',
    '/commodity-tools/:path*',
    '/commodities-tools/:path*',
    '/fun/:path*',
    '/blog/:path*',
  ],
}
