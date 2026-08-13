import { NextRequest, NextResponse } from 'next/server'
import { searchByCity } from '@/lib/data/zip-loader'
import { API_LIMITS, clampPositiveInt } from '@/lib/api/request-limits'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const q     = req.nextUrl.searchParams.get('q')?.trim() || ''
  const limit = clampPositiveInt(req.nextUrl.searchParams.get('limit'), 30, API_LIMITS.searchLimit)
  if (!q || q.length < 2) {
    return NextResponse.json({ error: 'Enter at least 2 characters' }, { status: 400 })
  }
  if (q.length > API_LIMITS.queryLength) {
    return NextResponse.json({ error: `Search query must be ${API_LIMITS.queryLength} characters or fewer` }, { status: 400 })
  }
  const results = searchByCity(q, limit)
  return NextResponse.json(
    { results, count: results.length },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } }
  )
}
