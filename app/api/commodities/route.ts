/**
 * /api/commodities - Live commodity price endpoint
 * Energy: tries 5 sources in parallel (Stooq, Yahoo v8, Yahoo v11, Alpha Vantage, CMC Markets scrape)
 * Precious metals: metals.live, open.er-api, frankfurter
 */

import { NextResponse } from 'next/server'

export const revalidate = 60
export const dynamic    = 'force-dynamic'

interface CPrice {
  symbol:    string
  name:      string
  price:     number
  change:    number
  changePct: number
  unit:      string
  source:    string
  live:      boolean
  ts:        number
}

interface Result {
  gold:        CPrice
  silver:      CPrice
  platinum:    CPrice
  palladium:   CPrice
  crude_wti:   CPrice
  crude_brent: CPrice
  natural_gas: CPrice
  copper:      CPrice
  wheat:       CPrice
  corn:        CPrice
  fetchedAt:   number
  sourceSummary: string[]
}

type CommodityKey = keyof Omit<Result, 'fetchedAt' | 'sourceSummary'>

const SEEDS: Record<string, Omit<CPrice,'change'|'changePct'|'source'|'live'|'ts'> & {prev:number}> = {
  gold:        {symbol:'XAU', name:'Gold',             price:3150.00, prev:3120.00, unit:'troy oz'},
  silver:      {symbol:'XAG', name:'Silver',           price:33.80,   prev:33.50,   unit:'troy oz'},
  platinum:    {symbol:'XPT', name:'Platinum',         price:960.00,  prev:950.00,  unit:'troy oz'},
  palladium:   {symbol:'XPD', name:'Palladium',        price:985.00,  prev:975.00,  unit:'troy oz'},
  crude_wti:   {symbol:'WTI', name:'Crude Oil (WTI)',  price:67.50,   prev:68.10,   unit:'barrel'},
  crude_brent: {symbol:'BRT', name:'Brent Crude',      price:71.20,   prev:71.80,   unit:'barrel'},
  natural_gas: {symbol:'NG',  name:'Natural Gas',      price:3.92,    prev:3.85,    unit:'MMBtu'},
  copper:      {symbol:'HG',  name:'Copper',           price:5.10,    prev:5.05,    unit:'lb'},
  wheat:       {symbol:'ZW',  name:'Wheat',            price:545.00,  prev:543.00,  unit:'bushel'},
  corn:        {symbol:'ZC',  name:'Corn',             price:480.00,  prev:478.00,  unit:'bushel'},
}

function makeSeed(key: string): CPrice {
  const s = SEEDS[key]
  const chg = +(s.price - s.prev).toFixed(3)
  return {
    symbol: s.symbol, name: s.name, price: s.price,
    change: chg, changePct: +((chg / s.prev) * 100).toFixed(2),
    unit: s.unit, source: 'seed', live: false, ts: Date.now(),
  }
}

function buildResult(): Result {
  const r: any = {}
  for (const k of Object.keys(SEEDS)) r[k] = makeSeed(k)
  r.fetchedAt = Date.now()
  r.sourceSummary = []
  return r as Result
}

function apply(r: Result, key: CommodityKey, price: number, source: string) {
  if (price <= 0) return
  // Sanity check ranges to avoid bad data
  const ranges: Record<string, [number, number]> = {
    gold: [1000, 5000], silver: [10, 100], platinum: [400, 2500], palladium: [400, 3500],
    crude_wti: [20, 200], crude_brent: [20, 200], natural_gas: [1, 20],
    copper: [2, 15], wheat: [300, 1500], corn: [200, 1000],
  }
  const [min, max] = ranges[key] ?? [0, Infinity]
  if (price < min || price > max) return
  const seed = SEEDS[key]
  const prev  = seed.prev
  const chg   = +(price - prev).toFixed(4)
  ;(r as any)[key] = {
    ...(r as any)[key],
    price: +price.toFixed(4),
    change: chg,
    changePct: +((chg / prev) * 100).toFixed(2),
    source,
    live: true,
    ts: Date.now(),
  }
  if (!r.sourceSummary.includes(source)) r.sourceSummary.push(source)
}

/* ─── Precious metals ──────────────────────────────────────────────────── */

async function tryMetalsLive(r: Result) {
  try {
    const res = await fetch('https://api.metals.live/v1/spot', {
      cache: 'no-store',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return
    const arr = await res.json() as Array<Record<string,number>>
    if (!Array.isArray(arr)) return
    const map: Record<string,number> = {}
    arr.forEach(item => Object.assign(map, item))
    const pairs: [CommodityKey, string][] = [
      ['gold','gold'],['silver','silver'],['platinum','platinum'],['palladium','palladium']
    ]
    pairs.forEach(([key, k]) => {
      if (map[k] && map[k] > 0) apply(r, key, map[k], 'metals.live')
    })
  } catch { /* skip */ }
}

async function tryOpenER(r: Result) {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/USD', {
      cache: 'no-store',
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) return
    const d = await res.json()
    const rates = d.rates as Record<string,number>
    if (rates?.XAU && rates.XAU > 0 && !r.gold.live)
      apply(r, 'gold', +(1 / rates.XAU).toFixed(2), 'open.er-api.com')
    if (rates?.XAG && rates.XAG > 0 && !r.silver.live)
      apply(r, 'silver', +(1 / rates.XAG).toFixed(3), 'open.er-api.com')
  } catch { /* skip */ }
}

async function tryFrankfurter(r: Result) {
  if (r.gold.live) return
  try {
    const res = await fetch('https://api.frankfurter.app/latest?from=XAU&to=USD', {
      cache: 'no-store',
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return
    const d = await res.json()
    const p = d?.rates?.USD
    if (p && p > 0) apply(r, 'gold', +p.toFixed(2), 'frankfurter.app')
  } catch { /* skip */ }
}

/* ─── Energy: Source 1 — Stooq CSV ────────────────────────────────────── */

async function tryStooq(r: Result) {
  const syms: [CommodityKey, string][] = [
    ['crude_wti',   '@CL.US'],
    ['crude_brent', '@BZ.US'],
    ['natural_gas', '@NG.US'],
    ['copper',      '@HG.US'],
    ['wheat',       '@ZW.US'],
    ['corn',        '@ZC.US'],
  ]
  await Promise.allSettled(
    syms.map(async ([key, sym]) => {
      try {
        const res = await fetch(
          `https://stooq.com/q/l/?s=${encodeURIComponent(sym)}&f=sd2t2ohlcv&h&e=csv`,
          { cache:'no-store', signal: AbortSignal.timeout(7000) }
        )
        if (!res.ok) return
        const txt  = await res.text()
        const rows = txt.trim().split('\n')
        if (rows.length < 2) return
        const cols = rows[1].split(',')
        // Stooq CSV: Symbol,Date,Time,Open,High,Low,Close,Volume
        const close = parseFloat(cols[6] ?? cols[5])
        if (isNaN(close) || close <= 0) return
        apply(r, key, close, 'stooq.com')
      } catch { /* timeout or network error */ }
    })
  )
}

/* ─── Energy: Source 2 — Yahoo Finance v8 ─────────────────────────────── */

async function tryYahooV8(r: Result) {
  const syms: [CommodityKey, string][] = [
    ['gold',        'GC=F'],
    ['silver',      'SI=F'],
    ['platinum',    'PL=F'],
    ['palladium',   'PA=F'],
    ['crude_wti',   'CL=F'],
    ['crude_brent', 'BZ=F'],
    ['natural_gas', 'NG=F'],
    ['copper',      'HG=F'],
  ]
  const needed = syms.filter(([key]) => !(r as any)[key]?.live)
  if (needed.length === 0) return
  await Promise.allSettled(
    needed.map(async ([key, sym]) => {
      try {
        const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1m&range=1d`
        const res = await fetch(url, {
          cache: 'no-store',
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.9',
            'Referer': 'https://finance.yahoo.com/',
          },
          signal: AbortSignal.timeout(8000),
        })
        if (!res.ok) return
        const d = await res.json()
        const meta  = d?.chart?.result?.[0]?.meta
        const price = meta?.regularMarketPrice ?? meta?.previousClose
        if (price && price > 0) apply(r, key, price, 'yahoo-finance')
      } catch { /* skip */ }
    })
  )
}

/* ─── Energy: Source 3 — Yahoo Finance v11 (different endpoint) ────────── */

async function tryYahooV11(r: Result) {
  const syms: [CommodityKey, string][] = [
    ['crude_wti',   'CL=F'],
    ['crude_brent', 'BZ=F'],
    ['natural_gas', 'NG=F'],
  ]
  const needed = syms.filter(([key]) => !(r as any)[key]?.live)
  if (needed.length === 0) return

  const symbolStr = needed.map(([, s]) => s).join(',')
  try {
    const url = `https://query1.finance.yahoo.com/v11/finance/quoteSummary/${encodeURIComponent(needed[0][1])}?modules=price`
    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        'Accept': 'application/json',
        'Referer': 'https://finance.yahoo.com/',
      },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return
    const d = await res.json()
    const price = d?.quoteSummary?.result?.[0]?.price?.regularMarketPrice?.raw
    if (price && price > 0) apply(r, needed[0][0], price, 'yahoo-v11')
  } catch { /* skip */ }
}

/* ─── Energy: Source 4 — Alpha Vantage (free, no key needed for commodities) */

async function tryAlphaVantageEnergy(r: Result) {
  const missing = (['crude_wti', 'crude_brent', 'natural_gas'] as CommodityKey[])
    .filter(k => !(r as any)[k]?.live)
  if (missing.length === 0) return

  // Alpha Vantage commodity endpoints - free, no API key required for demo
  const avMap: Partial<Record<CommodityKey, string>> = {
    crude_wti:   'WTI',
    crude_brent: 'BRENT',
    natural_gas: 'NATURAL_GAS',
  }

  await Promise.allSettled(
    missing.map(async (key) => {
      const func = avMap[key]
      if (!func) return
      try {
        const url = `https://www.alphavantage.co/query?function=${func}&interval=monthly&apikey=demo`
        const res = await fetch(url, {
          cache: 'no-store',
          headers: { 'User-Agent': 'Mozilla/5.0' },
          signal: AbortSignal.timeout(8000),
        })
        if (!res.ok) return
        const d = await res.json()
        // Alpha Vantage returns { "data": [{ "date": "...", "value": "..." }, ...] }
        const data = d?.data
        if (!Array.isArray(data) || data.length === 0) return
        const latest = data[0]
        const price = parseFloat(latest?.value)
        if (!isNaN(price) && price > 0) apply(r, key, price, 'alphavantage')
      } catch { /* skip */ }
    })
  )
}

/* ─── Energy: Source 5 — TwelveData (free tier, 800 calls/day) ─────────── */

async function tryTwelveData(r: Result) {
  const missing = (['crude_wti', 'crude_brent', 'natural_gas'] as CommodityKey[])
    .filter(k => !(r as any)[k]?.live)
  if (missing.length === 0) return

  const symbolMap: Partial<Record<CommodityKey, string>> = {
    crude_wti:   'WTI/USD',
    crude_brent: 'BRENT/USD',
    natural_gas: 'XNG/USD',
  }

  await Promise.allSettled(
    missing.map(async (key) => {
      const sym = symbolMap[key]
      if (!sym) return
      try {
        const url = `https://api.twelvedata.com/price?symbol=${encodeURIComponent(sym)}&apikey=demo`
        const res = await fetch(url, {
          cache: 'no-store',
          headers: { 'User-Agent': 'Mozilla/5.0' },
          signal: AbortSignal.timeout(8000),
        })
        if (!res.ok) return
        const d = await res.json()
        const price = parseFloat(d?.price)
        if (!isNaN(price) && price > 0) apply(r, key, price, 'twelvedata')
      } catch { /* skip */ }
    })
  )
}

/* ─── Energy: Source 6 — Commodities-API.com (free demo) ────────────────── */

async function tryCommoditiesAPI(r: Result) {
  const missing = (['crude_wti', 'crude_brent', 'natural_gas'] as CommodityKey[])
    .filter(k => !(r as any)[k]?.live)
  if (missing.length === 0) return

  try {
    // Map to commodity codes
    const codeMap: Partial<Record<CommodityKey, string>> = {
      crude_wti:   'CRUOIL',
      crude_brent: 'BRENT',
      natural_gas: 'NATGAS',
    }
    const symbols = missing.map(k => codeMap[k]).filter(Boolean).join(',')
    const url = `https://commodities-api.com/api/latest?access_key=demo&base=USD&symbols=${symbols}`
    const res = await fetch(url, {
      cache: 'no-store',
      headers: { 'User-Agent': 'Mozilla/5.0' },
      signal: AbortSignal.timeout(8000),
    })
    if (!res.ok) return
    const d = await res.json()
    const rates = d?.data?.rates
    if (!rates) return
    const reverseMap: Record<string, CommodityKey> = {
      CRUOIL: 'crude_wti', BRENT: 'crude_brent', NATGAS: 'natural_gas',
    }
    for (const [code, key] of Object.entries(reverseMap)) {
      if (rates[code] && !(r as any)[key]?.live) {
        // commodities-api returns rate per USD base (inverse)
        const price = 1 / rates[code]
        apply(r, key, price, 'commodities-api.com')
      }
    }
  } catch { /* skip */ }
}

/* ─── Energy: Source 7 — Mboum (no API key needed) ───────────────────── */

async function tryMboum(r: Result) {
  const missing = (['crude_wti', 'crude_brent', 'natural_gas'] as CommodityKey[])
    .filter(k => !(r as any)[k]?.live)
  if (missing.length === 0) return

  const symbolMap: Partial<Record<CommodityKey, string>> = {
    crude_wti:   'CL=F',
    crude_brent: 'BZ=F',
    natural_gas: 'NG=F',
  }

  await Promise.allSettled(
    missing.map(async (key) => {
      const sym = symbolMap[key]
      if (!sym) return
      try {
        const url = `https://mboum-finance.p.rapidapi.com/v1/markets/quote?symbol=${encodeURIComponent(sym)}&type=FUTURES`
        const res = await fetch(url, {
          cache: 'no-store',
          headers: {
            'User-Agent': 'Mozilla/5.0',
            'X-RapidAPI-Host': 'mboum-finance.p.rapidapi.com',
          },
          signal: AbortSignal.timeout(6000),
        })
        if (!res.ok) return
        const d = await res.json()
        const price = d?.body?.[sym]?.regularMarketPrice ?? d?.[0]?.regularMarketPrice
        if (price && price > 0) apply(r, key, price, 'mboum')
      } catch { /* skip */ }
    })
  )
}

/* ─── Energy: Source 8 — Wise Lending / Spot Scrape ─────────────────────
   Fetch price from a public JSON endpoint that aggregates energy prices     */

async function tryPublicEnergyAPI(r: Result) {
  const missing = (['crude_wti', 'crude_brent', 'natural_gas'] as CommodityKey[])
    .filter(k => !(r as any)[k]?.live)
  if (missing.length === 0) return

  // Try financialmodelingprep.com - free tier, 250 calls/day no key
  const fmpMap: Partial<Record<CommodityKey, string>> = {
    crude_wti:   'CLUSD',
    crude_brent: 'BZUSD',
    natural_gas: 'NGUSD',
  }

  await Promise.allSettled(
    missing.map(async (key) => {
      const sym = fmpMap[key]
      if (!sym) return
      try {
        const url = `https://financialmodelingprep.com/api/v3/quote/${sym}?apikey=demo`
        const res = await fetch(url, {
          cache: 'no-store',
          headers: {
            'User-Agent': 'Mozilla/5.0',
            'Accept': 'application/json',
          },
          signal: AbortSignal.timeout(8000),
        })
        if (!res.ok) return
        const d = await res.json()
        const item = Array.isArray(d) ? d[0] : d
        const price = item?.price ?? item?.regularMarketPrice
        if (price && price > 0) apply(r, key, price, 'fmp')
      } catch { /* skip */ }
    })
  )
}

/* ─── Energy: Source 9 — Intrinio free API ───────────────────────────── */

async function tryIntrinioFree(r: Result) {
  const missing = (['crude_wti', 'crude_brent', 'natural_gas'] as CommodityKey[])
    .filter(k => !(r as any)[k]?.live)
  if (missing.length === 0) return

  // @CL.CBT for WTI, @BZ.CBT for Brent, @NG.CBT for Nat Gas via stooq alt
  const altStooqMap: Partial<Record<CommodityKey, string>> = {
    crude_wti:   'CL.F',
    crude_brent: 'CO.F',
    natural_gas: 'NG.F',
  }

  await Promise.allSettled(
    missing.map(async (key) => {
      const sym = altStooqMap[key]
      if (!sym) return
      try {
        // Alternative stooq symbol format
        const url = `https://stooq.com/q/l/?s=${sym}&f=sd2t2ohlcv&h&e=csv`
        const res = await fetch(url, {
          cache: 'no-store',
          headers: { 'User-Agent': 'Mozilla/5.0' },
          signal: AbortSignal.timeout(7000),
        })
        if (!res.ok) return
        const txt  = await res.text()
        const rows = txt.trim().split('\n')
        if (rows.length < 2) return
        const cols = rows[1].split(',')
        const close = parseFloat(cols[6] ?? cols[5])
        if (isNaN(close) || close <= 0) return
        apply(r, key, close, 'stooq-alt')
      } catch { /* skip */ }
    })
  )
}

/* ─── Main handler ─────────────────────────────────────────────────────── */

export async function GET() {
  const r = buildResult()

  // Round 1: All sources fire in parallel
  await Promise.allSettled([
    tryMetalsLive(r),
    tryOpenER(r),
    tryFrankfurter(r),
    tryStooq(r),
    tryYahooV8(r),
    tryAlphaVantageEnergy(r),
    tryTwelveData(r),
    tryCommoditiesAPI(r),
    tryPublicEnergyAPI(r),
  ])

  // Round 2: Fill any remaining gaps with fallbacks
  const energyMissing = (['crude_wti', 'crude_brent', 'natural_gas'] as CommodityKey[])
    .filter(k => !(r as any)[k]?.live)

  if (energyMissing.length > 0) {
    await Promise.allSettled([
      tryYahooV11(r),
      tryMboum(r),
      tryIntrinioFree(r),
    ])
  }

  r.fetchedAt = Date.now()

  // FX rates
  try {
    const fxRes = await fetch('https://open.er-api.com/v6/latest/USD', {
      cache: 'no-store', signal: AbortSignal.timeout(4000),
    })
    if (fxRes.ok) {
      const fxData = await fxRes.json()
      const usdInr: number = fxData?.rates?.INR ?? 84.50
      ;(r as any).usdInr = +usdInr.toFixed(2)
      ;(r as any).inrLive = true
    }
  } catch {
    ;(r as any).usdInr = 84.50
    ;(r as any).inrLive = false
  }

  const liveCount = Object.keys(SEEDS).filter(k => (r as any)[k]?.live).length

  return NextResponse.json(r, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      'X-Live-Count': String(liveCount),
      'X-Sources':    r.sourceSummary.join(','),
      'Access-Control-Allow-Origin': '*',
    },
  })
}
