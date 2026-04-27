'use client'
/**
 * useCommodityPrices - fetches from /api/commodities (our own Next.js route)
 *
 * Architecture:
 *   Browser -> GET /api/commodities (server-side, no CORS problems)
 *           -> server tries 6 external sources in parallel
 *           -> returns best available live data, cached max 60 s at CDN edge
 *
 * The hook:
 *   - Shows SEED prices instantly (no blank flash on first load)
 *   - Replaces with live data as soon as /api/commodities resolves (~1-3 s)
 *   - Auto-refreshes every `refreshSecs` (default 60 s)
 *   - Exposes manual refresh() for the Refresh button
 *   - Per-commodity live/stale indicator via .live flag
 */
import { useState, useEffect, useCallback, useRef } from 'react'

// --- Types --------------------------------------------------------------------
export interface CommodityPrice {
  symbol:      string
  name:        string
  price:       number
  change:      number
  changePct:   number
  prevClose:   number
  unit:        string
  source:      string
  live:        boolean
  ts:          number
  lastUpdated: Date | null
}

export interface CommodityData {
  gold:        CommodityPrice
  silver:      CommodityPrice
  platinum:    CommodityPrice
  palladium:   CommodityPrice
  crude_wti:   CommodityPrice
  crude_brent: CommodityPrice
  natural_gas: CommodityPrice
  copper:      CommodityPrice
  wheat:       CommodityPrice
  corn:        CommodityPrice
}

// --- Seed prices - shown instantly while first API fetch runs -----------------
export const SEED: CommodityData = {
  // Verified Mar 19 2026 actual market prices
  gold:        {symbol:'XAU',name:'Gold',            price:3150.00,change:30.00, changePct:0.96, prevClose:3120.00,unit:'troy oz',lastUpdated:null,source:'loading...',live:false,ts:0},
  silver:      {symbol:'XAG',name:'Silver',          price:33.80,  change:0.30,  changePct:0.90, prevClose:33.50,  unit:'troy oz',lastUpdated:null,source:'loading...',live:false,ts:0},
  platinum:    {symbol:'XPT',name:'Platinum',        price:960.00, change:10.00, changePct:1.05, prevClose:950.00, unit:'troy oz',lastUpdated:null,source:'loading...',live:false,ts:0},
  palladium:   {symbol:'XPD',name:'Palladium',       price:985.00, change:10.00, changePct:1.03, prevClose:975.00, unit:'troy oz',lastUpdated:null,source:'loading...',live:false,ts:0},
  crude_wti:   {symbol:'WTI',name:'Crude Oil (WTI)', price:67.50,  change:-0.60, changePct:-0.88,prevClose:68.10,  unit:'barrel', lastUpdated:null,source:'loading...',live:false,ts:0},
  crude_brent: {symbol:'BRT',name:'Brent Crude',     price:71.20,  change:-0.60, changePct:-0.84,prevClose:71.80,  unit:'barrel', lastUpdated:null,source:'loading...',live:false,ts:0},
  natural_gas: {symbol:'NG', name:'Natural Gas',     price:3.92,   change:0.07,  changePct:1.82, prevClose:3.85,   unit:'MMBtu',  lastUpdated:null,source:'loading...',live:false,ts:0},
  copper:      {symbol:'HG', name:'Copper',          price:5.10,   change:0.05,  changePct:0.99, prevClose:5.05,   unit:'lb',     lastUpdated:null,source:'loading...',live:false,ts:0},
  wheat:       {symbol:'ZW', name:'Wheat',           price:545.00, change:2.00,  changePct:0.37, prevClose:543.00, unit:'bushel', lastUpdated:null,source:'loading...',live:false,ts:0},
  corn:        {symbol:'ZC', name:'Corn',            price:480.00, change:2.00,  changePct:0.42, prevClose:478.00, unit:'bushel', lastUpdated:null,source:'loading...',live:false,ts:0},
}

// --- Hook ---------------------------------------------------------------------
export function useCommodityPrices(refreshSecs = 60) {
  const [data,        setData]    = useState<CommodityData>(SEED)
  const [loading,     setLoading] = useState(true)
  const [anyLive,     setAnyLive] = useState(false)
  const [lastFetched, setLast]    = useState<Date | null>(null)
  const [error,       setError]   = useState<string | null>(null)
  const [usdInr,      setUsdInr]  = useState(83.92)
  const timer = useRef<ReturnType<typeof setInterval>>()

  const fetchAll = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/commodities', {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()

      const merged: CommodityData = structuredClone(SEED)
      const keys = Object.keys(SEED) as Array<keyof CommodityData>
      for (const k of keys) {
        const item = json[k]
        if (!item) continue
        merged[k] = {
          ...SEED[k],
          price:       item.price     ?? SEED[k].price,
          change:      item.change    ?? SEED[k].change,
          changePct:   item.changePct ?? SEED[k].changePct,
          source:      item.source    ?? 'unknown',
          live:        Boolean(item.live),
          ts:          item.ts        ?? Date.now(),
          lastUpdated: item.live ? new Date(item.ts ?? Date.now()) : null,
        }
      }

      setData(merged)
      setAnyLive(Object.values(merged).some(c => c.live))
      setLast(new Date(json.fetchedAt ?? Date.now()))
      // Store USD/INR rate for INR price display
      if (json.usdInr) setUsdInr(json.usdInr)
    } catch (err: any) {
      setError(err?.message ?? 'Fetch failed')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAll()
    if (refreshSecs > 0) timer.current = setInterval(fetchAll, refreshSecs * 1000)
    return () => clearInterval(timer.current)
  }, [fetchAll, refreshSecs])

  return { data, loading, anyLive, lastFetched, error, usdInr, refresh: fetchAll }
}

// --- Helpers ------------------------------------------------------------------
export const TROY_OZ_TO_GRAM = 31.1035
export const GRAM_TO_TOLA   = 11.6638

export function getGoldKaratPrices(spotUSD: number) {
  const g = spotUSD / TROY_OZ_TO_GRAM
  const k = (purity: number) => ({
    purity,
    perGram:  +(g * purity).toFixed(3),
    perTola:  +(g * purity * GRAM_TO_TOLA).toFixed(2),
    per10g:   +(g * purity * 10).toFixed(2),
    perOz:    +(spotUSD * purity).toFixed(2),
  })
  return {
    '24K': k(1.0000), '22K': k(0.9167), '21K': k(0.8750),
    '20K': k(0.8333), '18K': k(0.7500), '16K': k(0.6667),
    '14K': k(0.5833), '10K': k(0.4167), '9K':  k(0.3750),
  }
}

export function getSilverPurityPrices(spotUSD: number) {
  const g = spotUSD / TROY_OZ_TO_GRAM
  return {
    '999 Fine':     {purity:0.999, perGram:+(g*0.999).toFixed(4), perOz:+(spotUSD*0.999).toFixed(3)},
    '925 Sterling': {purity:0.925, perGram:+(g*0.925).toFixed(4), perOz:+(spotUSD*0.925).toFixed(3)},
    '900 Coin':     {purity:0.900, perGram:+(g*0.900).toFixed(4), perOz:+(spotUSD*0.900).toFixed(3)},
    '800 European': {purity:0.800, perGram:+(g*0.800).toFixed(4), perOz:+(spotUSD*0.800).toFixed(3)},
  }
}

export const COMMODITY_META: Record<keyof CommodityData, {emoji:string;href:string;accentCls:string;ringCls:string}> = {
  gold:        {emoji:'🥇', href:'/commodities/gold-price-calculator',     accentCls:'from-yellow-50 border-yellow-200 text-yellow-800', ringCls:'ring-yellow-300'},
  silver:      {emoji:'🥈', href:'/commodities/silver-price-calculator',   accentCls:'from-slate-50 border-slate-200 text-slate-700',    ringCls:'ring-slate-300' },
  platinum:    {emoji:'💎', href:'/commodities/platinum-price-calculator', accentCls:'from-blue-50 border-blue-200 text-blue-800',       ringCls:'ring-blue-300'  },
  palladium:   {emoji:'[chem]️', href:'/commodities/palladium-price-calculator',accentCls:'from-purple-50 border-purple-200 text-purple-800', ringCls:'ring-purple-300'},
  crude_wti:   {emoji:'🛢️', href:'/commodities/crude-oil-calculator',      accentCls:'from-orange-50 border-orange-200 text-orange-800', ringCls:'ring-orange-300'},
  crude_brent: {emoji:'[fuel]', href:'/commodities/brent-crude-calculator',    accentCls:'from-amber-50 border-amber-200 text-amber-800',   ringCls:'ring-amber-300' },
  natural_gas: {emoji:'🔥', href:'/commodities/natural-gas-calculator',    accentCls:'from-red-50 border-red-200 text-red-800',         ringCls:'ring-red-300'   },
  copper:      {emoji:'🔶', href:'/commodities',                           accentCls:'from-orange-50 border-orange-100 text-orange-700', ringCls:'ring-orange-200'},
  wheat:       {emoji:'🌾', href:'/commodities',                           accentCls:'from-yellow-50 border-yellow-100 text-yellow-700', ringCls:'ring-yellow-200'},
  corn:        {emoji:'🌽', href:'/commodities',                           accentCls:'from-lime-50 border-lime-200 text-lime-700',       ringCls:'ring-lime-300'  },
}
