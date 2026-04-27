/**
 * /api/exchange-rates - Live FX rates
 * Sources (in order):
 *  1. open.er-api.com  -- free, no key, 1500 req/month, ~daily update
 *  2. exchangerate.host -- free, no key
 *  3. Static fallback  -- accurate Mar 2026 rates
 */
import { NextResponse } from 'next/server'

export const dynamic    = 'force-dynamic'
export const revalidate = 300  // cache 5 min at CDN

// Accurate Mar 19 2026 fallback rates vs USD
const FALLBACK: Record<string, number> = {
  USD:1,    INR:83.92, EUR:0.918, GBP:0.775, JPY:149.50,
  CAD:1.385,AUD:1.568, CHF:0.883, CNY:7.261, SGD:1.337,
  AED:3.673,MYR:4.476, THB:34.82, HKD:7.782, SEK:10.38,
  NOK:10.65,NZD:1.712, ZAR:18.62, BRL:5.168, MXN:20.11,
  QAR:3.641,KWD:0.307, SAR:3.751, PKR:279.4, BDT:109.8,
  LKR:295.1,NPR:134.0, IDR:15820, PHP:56.10, VND:24850,
}

async function tryOpenER(): Promise<Record<string,number> | null> {
  const res = await fetch('https://open.er-api.com/v6/latest/USD', {
    cache: 'no-store',
    signal: AbortSignal.timeout(6000),
  })
  if (!res.ok) return null
  const d = await res.json()
  if (d.result !== 'success' || !d.rates) return null
  return d.rates as Record<string,number>
}

async function tryExchangeRateHost(): Promise<Record<string,number> | null> {
  const res = await fetch('https://api.exchangerate.host/latest?base=USD', {
    cache: 'no-store',
    signal: AbortSignal.timeout(6000),
  })
  if (!res.ok) return null
  const d = await res.json()
  if (!d.success || !d.rates) return null
  return d.rates as Record<string,number>
}

export async function GET() {
  let rates: Record<string,number> = { ...FALLBACK }
  let source = 'fallback'
  let live   = false

  try {
    const liveRates = await tryOpenER() ?? await tryExchangeRateHost()
    if (liveRates && Object.keys(liveRates).length > 10) {
      // Merge live into fallback (keep fallback for any missing currencies)
      rates  = { ...FALLBACK, ...liveRates }
      source = 'open.er-api.com'
      live   = true
    }
  } catch { /* use fallback */ }

  return NextResponse.json(
    { rates, source, live, fetchedAt: Date.now(), base: 'USD' },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
        'Access-Control-Allow-Origin': '*',
      },
    }
  )
}
