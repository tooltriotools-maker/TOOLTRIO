import { NextRequest, NextResponse } from 'next/server'
import { loadState } from '@/lib/data/zip-loader'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code')?.trim().toUpperCase()
  if (!code || code.length !== 2) {
    return NextResponse.json({ error: 'Enter a valid 2-letter state code' }, { status: 400 })
  }
  const results = loadState(code)
  if (!results.length) return NextResponse.json({ error: `No ZIPs found for ${code}` }, { status: 404 })
  return NextResponse.json({ state: code, results, count: results.length })
}
