import { NextRequest, NextResponse } from 'next/server'

/**
 * SEO canonical-host enforcement.
 * Every www request is permanently redirected to the non-www hostname.
 * This prevents Google from keeping www URLs as duplicate/alternative pages.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0].toLowerCase()

  if (host === 'www.tooltrio.com') {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    url.hostname = 'tooltrio.com'
    url.port = ''
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
