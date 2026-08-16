import { NextRequest, NextResponse } from 'next/server'

/**
 * Permanently removed calculator categories.
 * These URLs must not remain discoverable or redirect to another category.
 * Returning 410 Gone also gives search engines a clear removal signal.
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const removedFunTools = new Set([
    '/fun/calories-in-beer',
    '/fun/how-rich-am-i',
    '/fun/life-expectancy-fun',
    '/fun/procrastination-score',
    '/fun/screen-time-calculator',
    '/fun/sleep-debt-calculator',
    '/fun/social-media-addiction',
  ])

  if (removedFunTools.has(pathname)) {
    return new NextResponse('Gone', {
      status: 410,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Robots-Tag': 'noindex',
      },
    })
  }

  const removedCategory =
    pathname === '/calculators/finance' || pathname.startsWith('/calculators/finance/') ||
    pathname === '/calculators/health' || pathname.startsWith('/calculators/health/') ||
    pathname === '/calculators/dev' || pathname.startsWith('/calculators/dev/')

  if (!removedCategory) return NextResponse.next()

  return new NextResponse('Gone', {
    status: 410,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

export const config = {
  matcher: ['/calculators/finance/:path*', '/calculators/health/:path*', '/calculators/dev/:path*', '/fun/:path*'],
}
