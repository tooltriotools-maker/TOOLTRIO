'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { RefreshCw } from 'lucide-react'

// Accurate Mar 19 2026 seed prices -- shown instantly, replaced by live data
const SEED = [
  { key:'gold',        symbol:'GOLD',   name:'Gold',        price:4686.00, change:+46.00, unit:'/oz',    href:'/commodities/gold-price-calculator'     },
  { key:'silver',      symbol:'SILVER', name:'Silver',      price:52.20,   change:+0.40,  unit:'/oz',    href:'/commodities/silver-price-calculator'   },
  { key:'crude_wti',   symbol:'WTI',    name:'Crude (WTI)', price:96.42,   change:+0.92,  unit:'/bbl',   href:'/commodities/crude-oil-calculator'      },
  { key:'crude_brent', symbol:'BRENT',  name:'Brent',       price:112.21,  change:+1.41,  unit:'/bbl',   href:'/commodities/brent-crude-calculator'    },
  { key:'natural_gas', symbol:'NATGAS', name:'Nat. Gas',    price:3.82,    change:+0.07,  unit:'/MMBtu', href:'/commodities/natural-gas-calculator'    },
  { key:'platinum',    symbol:'PLAT',   name:'Platinum',    price:1085.00, change:+15.00, unit:'/oz',    href:'/commodities/platinum-price-calculator' },
  { key:'palladium',   symbol:'PALL',   name:'Palladium',   price:1020.00, change:+10.00, unit:'/oz',    href:'/commodities'                           },
  { key:'copper',      symbol:'COPPER', name:'Copper',      price:5.12,    change:+0.07,  unit:'/lb',    href:'/commodities'                           },
]

interface TickerItem { key:string; symbol:string; name:string; price:number; change:number; unit:string; href:string }

export function CommodityTicker() {
  const [mounted,  setMounted]  = useState(false)
  const [items,    setItems]    = useState<TickerItem[]>(SEED)
  const [usdInr,   setUsdInr]   = useState(83.92)
  const [live,     setLive]     = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [clock,    setClock]    = useState('')
  const [countdown,setCountdown]= useState(60)
  const intervalRef = useRef<ReturnType<typeof setInterval>>()
  const cdRef       = useRef<ReturnType<typeof setInterval>>()

  useEffect(() => { setMounted(true) }, [])

  const fetchLive = async () => {
    setLoading(true)
    try {
      const [comRes, fxRes] = await Promise.allSettled([
        fetch('/api/commodities', { cache:'no-store' }),
        fetch('/api/exchange-rates', { cache:'no-store' }),
      ])

      // Update commodity prices
      if (comRes.status === 'fulfilled' && comRes.value.ok) {
        const data = await comRes.value.json()
        const updated = SEED.map(seed => {
          const d = data[seed.key]
          if (d?.price && d.price > 0) return { ...seed, price: d.price, change: d.change ?? seed.change }
          return seed
        })
        setItems(updated)
        setLive(true)
        if (data.usdInr) setUsdInr(data.usdInr)
      }

      // Update USD/INR from FX route as well
      if (fxRes.status === 'fulfilled' && fxRes.value.ok) {
        const fx = await fxRes.value.json()
        if (fx.rates?.INR) setUsdInr(+fx.rates.INR.toFixed(2))
      }
    } catch { /* keep showing seed data */ }
    finally { setLoading(false); setCountdown(60) }
  }

  useEffect(() => {
    const t = setTimeout(fetchLive, 800)
    intervalRef.current = setInterval(fetchLive, 60000)
    cdRef.current = setInterval(() => {
      setClock(new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit', second:'2-digit' }))
      setCountdown(c => c > 0 ? c - 1 : 60)
    }, 1000)
    return () => { clearTimeout(t); clearInterval(intervalRef.current); clearInterval(cdRef.current) }
  }, [])

  const fmtUSD = (p: number) =>
    p >= 1000 ? `$${p.toLocaleString('en-US', { minimumFractionDigits:2, maximumFractionDigits:2 })}`
              : `$${p.toFixed(2)}`

  const fmtINR = (p: number) => {
    const inr = p * usdInr
    if (inr >= 10000000) return `₹${(inr/10000000).toFixed(2)}Cr`
    if (inr >= 100000)   return `₹${(inr/100000).toFixed(2)}L`
    return `₹${Math.round(inr).toLocaleString('en-IN')}`
  }

  if (!mounted) return (
    <div className="bg-gray-950 border-b border-gray-800 overflow-hidden" style={{height:'36px'}}>
      <div className="flex items-center h-full px-3 gap-3">
        <div className="bg-green-600 px-3 py-1 rounded text-white text-[10px] font-black">MARKETS</div>
        {SEED.map(item => (
          <span key={item.key} className="text-white text-xs font-bold whitespace-nowrap">
            {item.symbol} ${item.price.toLocaleString()}
          </span>
        ))}
      </div>
    </div>
  )

  return (
    <div className="bg-gray-950 border-b border-gray-800 overflow-hidden select-none">
      <div className="flex items-stretch" style={{ height:'36px' }}>

        {/* Brand pill */}
        <div className="flex-shrink-0 flex items-center gap-1.5 px-3 bg-green-600 text-white z-10 whitespace-nowrap">
          <span className={`w-1.5 h-1.5 rounded-full ${live ? 'bg-white animate-pulse' : 'bg-white/40'}`} />
          <span className="text-[10px] font-black tracking-widest uppercase">{live ? 'LIVE' : 'MARKETS'}</span>
        </div>

        {/* INR badge */}
        <div className="flex-shrink-0 flex items-center px-2 bg-orange-600/90 text-white border-r border-gray-800 whitespace-nowrap">
          <span className="text-[10px] font-black">
            ₹{usdInr.toFixed(2)}<span className="opacity-70">/USD</span>
          </span>
        </div>

        {/* Scrolling track */}
        <div className="flex-1 min-w-0 overflow-hidden">
          <div
            style={{ animation:'tickerRoll 50s linear infinite', display:'flex', alignItems:'center', height:'100%', width:'max-content' }}
            onMouseEnter={e => (e.currentTarget.style.animationPlayState='paused')}
            onMouseLeave={e => (e.currentTarget.style.animationPlayState='running')}
          >
            {[...items, ...items].map((item, i) => {
              const up = item.change >= 0
              return (
                <Link key={`${item.key}-${i}`} href={item.href}
                  className="flex items-center gap-2 px-4 h-full border-r border-gray-800 hover:bg-gray-800 transition-colors whitespace-nowrap cursor-pointer"
                  style={{ fontSize:'12px' }}
                >
                  <span className="text-gray-400 font-bold text-[11px]">{item.symbol}</span>
                  <span className="text-white font-black">{fmtUSD(item.price)}</span>
                  <span className="text-gray-500 text-[10px]">~={fmtINR(item.price)}</span>
                  <span style={{ color: up ? '#4ade80' : '#f87171', fontWeight:700, fontSize:'11px' }}>
                    {up ? '^' : 'v'}{Math.abs(item.change).toFixed(2)}
                  </span>
                  <span className="text-gray-600 text-[10px]">{item.unit}</span>
                  {live && <span style={{ width:'5px', height:'5px', borderRadius:'50%', background:'#4ade80', flexShrink:0 }} />}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Right: clock + refresh */}
        <div className="flex-shrink-0 flex items-center gap-2 px-3 border-l border-gray-800">
          <span className="hidden md:block" style={{ fontFamily:'monospace', color:'#6b7280', fontSize:'10px' }}>
            {clock} <span style={{ color: countdown <= 5 ? '#fbbf24' : '#4b5563' }}>{countdown}s</span>
          </span>
          <button onClick={fetchLive} disabled={loading} title="Refresh now"
            className="p-1 rounded hover:bg-gray-800 transition-colors disabled:opacity-40" style={{ color:'#6b7280' }}>
            <RefreshCw style={{ width:'11px', height:'11px', animation: loading ? 'spin 1s linear infinite' : 'none' }} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes tickerRoll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </div>
  )
}
