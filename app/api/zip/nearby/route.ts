import { NextRequest, NextResponse } from 'next/server'
import { lookupZip, getNearby } from '@/lib/data/zip-loader'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const zip    = req.nextUrl.searchParams.get('zip')?.trim()
  const radius = parseFloat(req.nextUrl.searchParams.get('radius') || '25')
  const limit  = parseInt(req.nextUrl.searchParams.get('limit') || '30')
  if (!zip || !/^\d{5}$/.test(zip)) {
    return NextResponse.json({ error: 'Enter a valid 5-digit ZIP code' }, { status: 400 })
  }
  const origin = lookupZip(zip)
  if (!origin) return NextResponse.json({ error: `ZIP ${zip} not found` }, { status: 404 })
  const results = getNearby(zip, radius, limit)
  return NextResponse.json({ origin, results, count: results.length })
}
