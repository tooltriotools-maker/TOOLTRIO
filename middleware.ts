import { NextRequest, NextResponse } from 'next/server'
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
])

const removedCalculatorPrefixes = [
  '/calculators/finance',
  '/calculators/health',
  '/calculators/dev',
] as const

const publishedBlogSlugs = new Set(publishedBlogPosts.map(post => post.slug))
const publishedBlogCategorySlugs = new Set(blogCategories.map(category => category.slug))

function goneResponse() {
  return new NextResponse('Gone', {
    status: 410,
    headers: BASE_GONE_HEADERS,
  })
}

function isRemovedCalculatorPath(pathname: string) {
  return removedCalculatorPrefixes.some(
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

  if (removedFunTools.has(pathname)) {
    return goneResponse()
  }

  if (isRemovedCalculatorPath(pathname)) {
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
    '/fun/:path*',
    '/blog/:path*',
  ],
}
