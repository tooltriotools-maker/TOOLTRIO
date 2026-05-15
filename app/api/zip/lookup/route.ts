import { NextRequest, NextResponse } from 'next/server'
import { lookupZip, getNearby, TIMEZONE_OFFSETS } from '@/lib/data/zip-loader'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const zip = req.nextUrl.searchParams.get('zip')?.trim()
  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json({ error: 'Enter a valid 5-digit ZIP code' }, { status: 400 })
  }
  const rec = lookupZip(zip)
  if (!rec) {
    return NextResponse.json({ error: `ZIP code ${zip} not found` }, { status: 404 })
  }
  const nearby = getNearby(zip, 30, 6)
  const tzLabel = TIMEZONE_OFFSETS[rec.timezone] || rec.timezone
  return NextResponse.json({ ...rec, tzLabel, nearby })
}
