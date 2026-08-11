import { NextRequest, NextResponse } from 'next/server'

/**
 * YMYL discovery policy:
 * Finance and Health calculator routes remain directly reachable for internal
 * review, but every response is explicitly marked noindex. We intentionally
 * do not disallow these routes in robots.txt because Google must be able to
 * crawl the response and see the noindex directive.
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const restrictedTool =
    pathname === '/calculators/finance' || pathname.startsWith('/calculators/finance/') ||
    pathname === '/calculators/health' || pathname.startsWith('/calculators/health/')

  if (!restrictedTool) return NextResponse.next()

  const response = NextResponse.next()
  response.headers.set('X-Robots-Tag', 'noindex, follow')
  return response
}

export const config = {
  matcher: ['/calculators/finance/:path*', '/calculators/health/:path*'],
}
