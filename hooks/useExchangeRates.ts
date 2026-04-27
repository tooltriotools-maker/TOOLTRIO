'use client'
import { useState, useEffect, useCallback, useRef } from 'react'

export interface ExchangeRates {
  rates:     Record<string, number>
  source:    string
  live:      boolean
  fetchedAt: number
}

// Accurate Mar 19 2026 fallback
const FALLBACK_RATES: Record<string, number> = {
  USD:1,    INR:83.92, EUR:0.918, GBP:0.775, JPY:149.50,
  CAD:1.385,AUD:1.568, CHF:0.883, CNY:7.261, SGD:1.337,
  AED:3.673,MYR:4.476, THB:34.82, HKD:7.782, SEK:10.38,
  NOK:10.65,NZD:1.712, ZAR:18.62, BRL:5.168, MXN:20.11,
  QAR:3.641,KWD:0.307, SAR:3.751, PKR:279.4, BDT:109.8,
  LKR:295.1,NPR:134.0, IDR:15820, PHP:56.10, VND:24850,
}

export const CURRENCY_INFO: Record<string, { flag: string; name: string; symbol: string }> = {
  USD:{ flag:'🇺🇸', name:'US Dollar',         symbol:'$'    },
  INR:{ flag:'🇮🇳', name:'Indian Rupee',       symbol:'₹'    },
  EUR:{ flag:'🇪🇺', name:'Euro',               symbol:'€'    },
  GBP:{ flag:'🇬🇧', name:'British Pound',      symbol:'£'    },
  JPY:{ flag:'🇯🇵', name:'Japanese Yen',       symbol:'¥'    },
  CAD:{ flag:'🇨🇦', name:'Canadian Dollar',    symbol:'CA$'  },
  AUD:{ flag:'🇦🇺', name:'Australian Dollar',  symbol:'A$'   },
  CHF:{ flag:'🇨🇭', name:'Swiss Franc',        symbol:'Fr'   },
  CNY:{ flag:'🇨🇳', name:'Chinese Yuan',       symbol:'¥'    },
  SGD:{ flag:'🇸🇬', name:'Singapore Dollar',   symbol:'S$'   },
  AED:{ flag:'🇦🇪', name:'UAE Dirham',         symbol:'.'  },
  MYR:{ flag:'🇲🇾', name:'Malaysian Ringgit',  symbol:'RM'   },
  THB:{ flag:'🇹🇭', name:'Thai Baht',          symbol:'฿'    },
  HKD:{ flag:'🇭🇰', name:'Hong Kong Dollar',   symbol:'HK$'  },
  SEK:{ flag:'🇸🇪', name:'Swedish Krona',      symbol:'kr'   },
  NOK:{ flag:'🇳🇴', name:'Norwegian Krone',    symbol:'kr'   },
  NZD:{ flag:'🇳🇿', name:'New Zealand Dollar', symbol:'NZ$'  },
  ZAR:{ flag:'🇿🇦', name:'South African Rand', symbol:'R'    },
  BRL:{ flag:'🇧🇷', name:'Brazilian Real',     symbol:'R$'   },
  MXN:{ flag:'🇲🇽', name:'Mexican Peso',       symbol:'MX$'  },
  QAR:{ flag:'🇶🇦', name:'Qatari Riyal',       symbol:'QR'   },
  KWD:{ flag:'🇰🇼', name:'Kuwaiti Dinar',      symbol:'KD'   },
  SAR:{ flag:'🇸🇦', name:'Saudi Riyal',        symbol:'SR'   },
  PKR:{ flag:'🇵🇰', name:'Pakistani Rupee',    symbol:'₨'    },
}

export function useExchangeRates(refreshSecs = 300) {
  const [data,    setData]    = useState<ExchangeRates>({ rates: FALLBACK_RATES, source: 'fallback', live: false, fetchedAt: 0 })
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState<string | null>(null)
  const timer = useRef<ReturnType<typeof setInterval>>()

  const convert = useCallback((amount: number, from: string, to: string) => {
    const r = data.rates
    const usd = amount / (r[from] ?? 1)
    return {
      result:       usd * (r[to] ?? 1),
      rate:         (r[to] ?? 1) / (r[from] ?? 1),
      inverseRate:  (r[from] ?? 1) / (r[to] ?? 1),
      live:         data.live,
      source:       data.source,
    }
  }, [data])

  const fetch_ = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/exchange-rates', { cache: 'no-store' })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(json)
      setError(null)
    } catch (e: any) {
      setError('Using cached rates')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetch_()
    if (refreshSecs > 0) timer.current = setInterval(fetch_, refreshSecs * 1000)
    return () => clearInterval(timer.current)
  }, [fetch_, refreshSecs])

  return { data, loading, error, convert, refresh: fetch_, rates: data.rates, live: data.live }
}

export { FALLBACK_RATES }
