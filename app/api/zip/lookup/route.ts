import { NextRequest, NextResponse } from 'next/server'
import { lookupZip, getNearby, TIMEZONE_OFFSETS } from '@/lib/data/zip-loader'
import { normalizeZipCode } from '@/lib/data/zip-utils'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const rawZip = req.nextUrl.searchParams.get('zip')?.trim() || ''
  const zip = normalizeZipCode(rawZip)
  if (!zip) {
    return NextResponse.json({ error: 'Enter a valid 5-digit ZIP or 9-digit ZIP+4 code' }, { status: 400 })
  }
  const rec = lookupZip(zip)
  if (!rec) {
    return NextResponse.json({ error: `ZIP code ${zip} not found` }, { status: 404 })
  }
  const nearby = getNearby(zip, 30, 6)
  const tzLabel = TIMEZONE_OFFSETS[rec.timezone] || rec.timezone
  return NextResponse.json(
    { ...rec, tzLabel, nearby },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
  )
}
