import { NextRequest, NextResponse } from 'next/server'
import { lookupZip, getNearby } from '@/lib/data/zip-loader'
import { API_LIMITS, clampPositiveInt, clampPositiveNumber } from '@/lib/api/request-limits'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const zip    = req.nextUrl.searchParams.get('zip')?.trim()
  const radius = clampPositiveNumber(req.nextUrl.searchParams.get('radius'), 25, API_LIMITS.nearbyRadiusMiles)
  const limit  = clampPositiveInt(req.nextUrl.searchParams.get('limit'), 30, API_LIMITS.nearbyLimit)
  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json({ error: 'Enter a valid 5-digit ZIP code' }, { status: 400 })
  }
  const origin = lookupZip(zip)
  if (!origin) return NextResponse.json({ error: `ZIP ${zip} not found` }, { status: 404 })
  const results = getNearby(zip, radius, limit)
  return NextResponse.json(
    { center: origin, nearby: results, origin, results, count: results.length },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
  )
}
