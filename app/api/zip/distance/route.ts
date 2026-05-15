import { NextRequest, NextResponse } from 'next/server'
import { lookupZip, distanceMiles } from '@/lib/data/zip-loader'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const from = req.nextUrl.searchParams.get('from')?.trim()
  const to   = req.nextUrl.searchParams.get('to')?.trim()
  if (!from || !to || !/^\d{5}$/.test(from) || !/^\d{5}$/.test(to)) {
    return NextResponse.json({ error: 'Enter valid 5-digit ZIP codes for both fields' }, { status: 400 })
  }
  const r1 = lookupZip(from)
  const r2 = lookupZip(to)
  if (!r1) return NextResponse.json({ error: `ZIP ${from} not found` }, { status: 404 })
  if (!r2) return NextResponse.json({ error: `ZIP ${to} not found` }, { status: 404 })
  const miles = distanceMiles(r1.lat, r1.lng, r2.lat, r2.lng)
  const km = miles * 1.60934
  return NextResponse.json({ r1, r2, miles: +miles.toFixed(2), km: +km.toFixed(2) })
}
