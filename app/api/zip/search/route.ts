import { NextRequest, NextResponse } from 'next/server'
import { searchByCity } from '@/lib/data/zip-loader'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const q     = req.nextUrl.searchParams.get('q')?.trim() || ''
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '30')
  if (!q || q.length < 2) {
    return NextResponse.json({ error: 'Enter at least 2 characters' }, { status: 400 })
  }
  const results = searchByCity(q, limit)
  return NextResponse.json({ results, count: results.length })
}
