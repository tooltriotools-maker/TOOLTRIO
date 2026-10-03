import { NextRequest, NextResponse } from 'next/server'
import { publishedBlogPosts, blogCategories } from '@/lib/blog/posts'

const BASE_GONE_HEADERS = {
  'Content-Type': 'text/plain; charset=utf-8',
  // Permanently removed URLs should not be indexed again.
  'X-Robots-Tag': 'noindex',
  'X-Content-Type-Options': 'nosniff',
  'Cache-Control': 'public, max-age=0, must-revalidate',
}

const removedCalculatorPrefixes = [
  '/calculators/finance',
  '/calculators/health',
  '/calculators/dev',
] as const

// The Fun section was permanently removed. This prefix-based rule intentionally
// covers every current and future /fun URL without maintaining a manual URL list.
// Legacy /calculators/fun URLs are also permanently gone rather than redirected
// to unrelated ZIP content.
const removedFunPrefixes = [
  '/fun',
  '/calculators/fun',
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

function goneResponse() {
  return new NextResponse('Gone', {
    status: 410,
    headers: BASE_GONE_HEADERS,
  })
}

function isPathUnderPrefixes(pathname: string, prefixes: readonly string[]) {
  return prefixes.some(
    prefix => pathname === prefix || pathname.startsWith(`${prefix}/`),
  )
}

function handleBlogPath(pathname: string) {
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
      : goneResponse()
  }

  // /blog/category/<slug>
  if (segments.length === 2 && segments[0] === 'category') {
    return publishedBlogCategorySlugs.has(segments[1])
      ? NextResponse.next()
      : goneResponse()
  }

  // Any other old/removed blog URL is permanently gone.
  return goneResponse()
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const normalizedPathname = pathname.replace(/\/+$/, '') || '/'

  // Every retired Fun URL, including /fun itself and arbitrarily deep legacy
  // paths, returns HTTP 410 Gone. Query strings do not change this because the
  // rule intentionally operates on pathname.
  if (isPathUnderPrefixes(normalizedPathname, removedFunPrefixes)) {
    return goneResponse()
  }

  if (isPathUnderPrefixes(normalizedPathname, removedCalculatorPrefixes)) {
    return goneResponse()
  }

  if (isPathUnderPrefixes(normalizedPathname, removedCommodityPrefixes)) {
    return goneResponse()
  }

  if (pathname.startsWith('/blog/')) {
    return handleBlogPath(pathname)
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
    '/fun/:path*',
    '/fun',
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
    '/blog/:path*',
  ],
}
