'use client'
import { useState, useMemo } from 'react'
import { useCommodityPrices, type CommodityData } from '@/hooks/useCommodityPrices'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { RefreshCw, TrendingUp, TrendingDown, ArrowRight, DollarSign } from 'lucide-react'
import Link from 'next/link'

const METALS: { key: keyof CommodityData; name: string; emoji: string }[] = [
  { key: 'gold',      name: 'Gold',      emoji: '🥇' },
  { key: 'silver',    name: 'Silver',    emoji: '🥈' },
  { key: 'platinum',  name: 'Platinum',  emoji: '💎' },
  { key: 'palladium', name: 'Palladium', emoji: '⚗️' },
]

const SYM: Record<string,string> = { USD:'$', INR:'₹', GBP:'£', EUR:'€' }


function PnlFAQ() {
  const [open, setOpen] = useState<number|null>(null)
  const faqs = [
    {q:'How do dealer buy/sell fees affect my precious metals profit?',a:'Dealer fees are the biggest hidden cost in precious metals trading. A typical dealer charges 2–4% premium when you buy (above spot) and pays 1–2% below spot when you buy back. On a $10,000 gold investment: buying at 3% above spot costs $300; selling at 1.5% below spot loses another $150. You need gold to rise 4.5% just to break even. Our calculator has separate buy fee and sell fee fields — always enter realistic dealer rates, not zero.'},
    {q:'What is annualized return and why does it matter for gold?',a:'Annualized return (CAGR) normalizes returns across different holding periods so you can compare investments fairly. If gold gained 15% over 3 years, the annualized return is (1.15)^(1/3) - 1 = 4.77%/year — much less impressive than "15% total". Gold\'s 20-year annualized return in USD is ~10.6%, but that includes spectacular years (2010: +29%) and bad ones (2013: -28%). Our calculator computes your exact annualized return based on your specific entry price and holding period.'},
    {q:'How do I calculate break-even price on my gold position?',a:'Break-even = total cost ÷ quantity. Total cost = (buy price × quantity) + buy fees. If you bought 10 oz gold at $3,000 with a 2% dealer fee: total cost = $30,000 + $600 = $30,600. Break-even = $30,600 ÷ 10 = $3,060/oz. You need gold to exceed $3,060 before making any profit. Additionally, if selling through a dealer at 1.5% fee, add that: effective break-even = $3,060 × 1.015 = $3,106/oz. Our calculator shows this automatically.'},
    {q:'Which precious metal has the best ROI historically?',a:'Over the last 20 years (2004–2024): Gold ~10.6% CAGR USD. Silver ~7.2% CAGR (higher volatility). Platinum ~negative over the last 10 years (from $1,800 in 2014 to ~$960 now). Palladium: extraordinary gains 2016–2021, then massive losses — net 10-year return depends heavily on entry timing. Gold has the best risk-adjusted return among the four. However, silver has periodically dramatically outperformed gold (2010: silver +83% vs gold +29%) when the gold-silver ratio reverts.'},
    {q:'Should I sell my gold now or hold?',a:'This depends on your original purpose. If you bought as inflation hedge: inflation hedge gold should be held as long as inflation risk exists — not traded for short-term gains. If you bought as speculation: use your annualized return (from this calculator) to compare against your alternative investments. If gold\'s annualized return is below what you\'d earn elsewhere and you\'ve met your profit target, it may be time to reallocate. If you bought for jewellery: irrelevant — wear it. Never let short-term price moves override your original investment thesis.'},
    {q:'How are precious metal gains taxed in India?',a:'Physical gold held under 3 years: taxed as short-term capital gains at your income tax slab rate. Held over 3 years: long-term capital gains at 20% with indexation benefit (reduces taxable gain by adjusting for inflation). Sovereign Gold Bonds: capital gains tax-free if held to maturity (8 years). Gold ETFs: same LTCG/STCG treatment as physical. This tax treatment significantly affects net returns — a 15% gain on physical gold held 2.5 years might net only 8–9% after tax for someone in the 30% bracket.'},
  ]
  return (
    <section>
      <h3 className="text-xl font-black text-gray-900 mb-4">❓ Precious Metals P&L FAQ</h3>
      <div className="space-y-2">
        {faqs.map((f,i)=>(
          <div key={i} className={`bg-white rounded-2xl border transition-all ${open===i?'border-green-300 shadow-md':'border-gray-100 hover:border-green-200'}`}>
            <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left">
              <span className="font-bold text-gray-900 text-sm leading-snug">{f.q}</span>
              <span className="text-green-500 font-black flex-shrink-0">{open===i?'▲':'▼'}</span>
            </button>
            {open===i&&<div className="px-5 pb-5"><div className="h-px bg-green-100 mb-3"/><p className="text-sm text-gray-600 leading-relaxed">{f.a}</p></div>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function PreciousMetalsProfitPage() {
  const { data, loading, anyLive, refresh, usdInr } = useCommodityPrices(60)
  const FX: Record<string, number> = { USD:1, INR:usdInr, GBP:0.775, EUR:0.918, AED:3.673 }

  const [metal,    setMetal]    = useState<keyof CommodityData>('gold')
  const [buyPrice, setBuyPrice] = useState(2800)
  const [qty,      setQty]      = useState(10)      // troy oz
  const [buyFee,   setBuyFee]   = useState(1.5)     // %
  const [sellFee,  setSellFee]  = useState(1.5)
  const [months,   setMonths]   = useState(12)
  const [useLive,  setUseLive]  = useState(true)
  const [sellPrice, setSellPrice] = useState(3150)
  const [fxKey,    setFxKey]    = useState('USD')

  const livePrice = data[metal].price
  const effectiveSell = useLive ? livePrice : sellPrice

  const fmt = (usd: number, dp = 2) =>
    `${SYM[fxKey]}${(usd * FX[fxKey]).toLocaleString(undefined, { minimumFractionDigits: dp, maximumFractionDigits: dp })}`

  const results = useMemo(() => {
    const buyCost    = buyPrice * qty
    const buyFeeAmt  = buyCost * (buyFee / 100)
    const totalCost  = buyCost + buyFeeAmt
    const sellRev    = effectiveSell * qty
    const sellFeeAmt = sellRev * (sellFee / 100)
    const netProc    = sellRev - sellFeeAmt
    const profit     = netProc - totalCost
    const roi        = totalCost > 0 ? (profit / totalCost) * 100 : 0
    const ann        = months > 0 ? (Math.pow(1 + roi / 100, 12 / months) - 1) * 100 : roi
    const breakEven  = buyFee > 0 || sellFee > 0
      ? totalCost / qty / (1 - sellFee / 100)
      : buyPrice
    const totalFees  = buyFeeAmt + sellFeeAmt
    return { buyCost, buyFeeAmt, totalCost, sellRev, sellFeeAmt, netProc, profit, roi, ann, breakEven, totalFees }
  }, [buyPrice, qty, buyFee, sellFee, effectiveSell, months])

  const isProfit = results.profit >= 0

  // Scenario comparison chart (what-if sell prices)
  const scenarios = useMemo(() => {
    const base = buyPrice
    return [-20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30].map(pct => {
      const sp   = base * (1 + pct / 100)
      const rev  = sp * qty * (1 - sellFee / 100)
      const cost = buyPrice * qty * (1 + buyFee / 100)
      const pnl  = (rev - cost) * FX[fxKey]
      return { label: `${pct > 0 ? '+' : ''}${pct}%`, pnl: Math.round(pnl), sp }
    })
  }, [buyPrice, qty, buyFee, sellFee, fxKey])

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-400 mb-5 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-gray-600">Home</Link> /
        <Link href="/commodities" className="hover:text-gray-600">Commodities</Link> /
        <span className="text-gray-700 font-medium">Precious Metals P&amp;L Calculator</span>
      </nav>

      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900">💰 Precious Metals Profit Calculator</h1>
          <p className="text-gray-500 mt-1">Calculate profit &amp; loss on gold, silver, platinum &amp; palladium - including dealer fees, annualized ROI &amp; break-even price</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {Object.keys(FX).map(k => (
              <button key={k} onClick={() => setFxKey(k)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${fxKey === k ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>{k}</button>
            ))}
          </div>
          <button onClick={refresh} disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-xl border border-yellow-200">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            {anyLive ? 'Live' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* Metal selector */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {METALS.map(m => {
          const c = data[m.key]
          const up = c.changePct >= 0
          return (
            <button key={m.key}
              onClick={() => { setMetal(m.key); if (useLive) {} }}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl border font-bold text-sm transition-all ${metal === m.key ? 'bg-yellow-500 text-white border-yellow-500 shadow-lg' : 'bg-white text-gray-700 border-gray-200 hover:border-yellow-300 shadow-card'}`}>
              <span className="text-2xl">{m.emoji}</span>
              <div className="text-left">
                <p className={metal === m.key ? 'text-white' : 'text-gray-900'}>{m.name}</p>
                <p className={`text-xs ${metal === m.key ? 'text-yellow-100' : up ? 'text-green-600' : 'text-red-500'}`}>
                  ${c.price.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})} {up?'^':'v'}{Math.abs(c.changePct).toFixed(2)}%
                </p>
              </div>
              {c.live && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* -- INPUTS -- */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <h2 className="font-black text-gray-900 mb-4">📥 Buy Details</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Buy Price (USD per troy oz)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input type="number" step="1" min="0" value={buyPrice} onChange={e => setBuyPrice(+e.target.value)}
                    className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 font-bold" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Quantity: <span className="text-yellow-600 font-black">{qty} troy oz</span>
                </label>
                <input type="range" min="0.1" max="1000" step="0.1" value={qty}
                  onChange={e => setQty(+e.target.value)} className="w-full accent-yellow-500" />
                <div className="flex items-center gap-2 mt-1">
                  <input type="number" step="0.1" min="0.1" value={qty} onChange={e => setQty(+e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm font-bold" />
                  <span className="text-xs text-gray-400">{(qty * 31.1035).toFixed(1)}g</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Buy Fee / Premium: <span className="text-orange-600">{buyFee}%</span></label>
                <input type="range" min="0" max="10" step="0.1" value={buyFee}
                  onChange={e => setBuyFee(+e.target.value)} className="w-full accent-orange-500" />
                <p className="text-[11px] text-gray-400 mt-0.5">Dealer markup, mint premium, transaction cost</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <h2 className="font-black text-gray-900 mb-4">📤 Sell Details</h2>
            <div className="space-y-4">

              {/* Live toggle */}
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                <div>
                  <p className="text-sm font-bold text-gray-800">Use Live Price</p>
                  <p className="text-xs text-green-700 font-semibold">
                    {anyLive ? '●' : '○'} ${livePrice.toLocaleString()} / oz
                  </p>
                </div>
                <button onClick={() => setUseLive(!useLive)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${useLive ? 'bg-green-500' : 'bg-gray-300'}`}>
                  <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${useLive ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>

              {!useLive && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Manual Sell Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                    <input type="number" step="1" min="0" value={sellPrice} onChange={e => setSellPrice(+e.target.value)}
                      className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 font-bold" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Sell Fee: <span className="text-orange-600">{sellFee}%</span></label>
                <input type="range" min="0" max="10" step="0.1" value={sellFee}
                  onChange={e => setSellFee(+e.target.value)} className="w-full accent-orange-500" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Holding Period: <span className="text-blue-600 font-black">{months} months</span>
                </label>
                <input type="range" min="1" max="120" value={months}
                  onChange={e => setMonths(+e.target.value)} className="w-full accent-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* -- RESULTS -- */}
        <div className="xl:col-span-2 space-y-4">

          {/* Big P&amp;L verdict */}
          <div className={`rounded-2xl border p-6 ${isProfit ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-br from-red-50 to-rose-50 border-red-200'}`}>
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {isProfit ? <TrendingUp className="w-5 h-5 text-green-600" /> : <TrendingDown className="w-5 h-5 text-red-600" />}
                  <span className="text-sm font-semibold text-gray-500">Net Profit / Loss on {METALS.find(m=>m.key===metal)?.name}</span>
                </div>
                <p className={`text-5xl font-black ${isProfit ? 'text-green-700' : 'text-red-700'}`}>
                  {isProfit ? '+' : '-'}{fmt(Math.abs(results.profit))}
                </p>
                <div className="flex gap-4 mt-2 flex-wrap">
                  <span className={`text-sm font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    ROI: {results.roi >= 0 ? '+' : ''}{results.roi.toFixed(2)}%
                  </span>
                  <span className={`text-sm font-bold ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                    Annualized: {results.ann >= 0 ? '+' : ''}{results.ann.toFixed(1)}%/yr
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-0.5">Break-even price</p>
                <p className="font-black text-gray-900 text-xl">${results.breakEven.toFixed(2)}/oz</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {effectiveSell > results.breakEven ? '✅ Above break-even' : '❌ Below break-even'}
                </p>
              </div>
            </div>
          </div>

          {/* Detail breakdown */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <h3 className="font-black text-gray-900 mb-4">Trade Breakdown</h3>
            <div className="space-y-0">
              {[
                { label: `Buy: ${qty} oz @ $${buyPrice.toLocaleString()}`,              val: fmt(results.buyCost),     dim: false  },
                { label: `Buy fee (${buyFee}%)`,                                         val: `+${fmt(results.buyFeeAmt)}`, dim: true },
                { label: 'Total Cost (incl. fee)',                                        val: fmt(results.totalCost),   bold: true  },
                { label: `Sell: ${qty} oz @ $${effectiveSell.toLocaleString()}${useLive ? ' (live)' : ''}`, val: fmt(results.sellRev), dim: false },
                { label: `Sell fee (${sellFee}%)`,                                        val: `-${fmt(results.sellFeeAmt)}`, dim: true },
                { label: 'Net Proceeds (after fee)',                                      val: fmt(results.netProc),     bold: true  },
                { label: 'Total Fees Paid',                                               val: fmt(results.totalFees),   dim: true   },
                { label: 'Net Profit / Loss',                                             val: `${isProfit?'+':''}${fmt(results.profit)}`, bold: true, accent: isProfit ? 'text-green-700 bg-green-50' : 'text-red-700 bg-red-50' },
              ].map((row, i) => (
                <div key={i} className={`flex justify-between items-center px-3 py-2.5 rounded-lg mb-1 last:mb-0 ${row.accent ?? (row.bold ? 'bg-gray-50' : '')} ${row.dim ? 'opacity-70' : ''}`}>
                  <span className={`text-sm ${row.bold ? 'font-bold text-gray-900' : 'text-gray-600'}`}>{row.label}</span>
                  <span className={`font-black text-sm ${row.accent ?? 'text-gray-900'}`}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scenario P&amp;L chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <h3 className="font-black text-gray-900 mb-1">P&amp;L Scenarios - What If Sell Price Changes?</h3>
            <p className="text-xs text-gray-400 mb-4">P&amp;L vs % change in sell price from your buy price of ${buyPrice.toLocaleString()}</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={scenarios} margin={{ top: 5, right: 5, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="label" tick={{ fontSize: 10 }} />
                <YAxis tickFormatter={v => `${SYM[fxKey]}${Math.abs(v) >= 1000 ? `${(v/1000).toFixed(0)}k` : v}`} tick={{ fontSize: 10 }} />
                <Tooltip formatter={(v: number) => [`${SYM[fxKey]}${v.toLocaleString()}`, 'P&amp;L']} />
                <ReferenceLine y={0} stroke="#9ca3af" strokeWidth={1.5} />
                <Bar dataKey="pnl" radius={[4,4,0,0]}
                  fill="#16a34a"
                  label={false}
                  className="transition-all"
                >
                  {scenarios.map((s, i) => (
                    <rect key={i} fill={s.pnl >= 0 ? '#16a34a' : '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Quick nav */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { n:'Gold Price',   e:'🥇', h:'/commodities/gold-price-calculator'      },
              { n:'Gold Loan',    e:'🏦', h:'/commodities/gold-loan-calculator'        },
              { n:'Portfolio',    e:'🗂️', h:'/commodities/commodity-portfolio-tracker' },
              { n:'Crypto P&amp;L',   e:'₿',  h:'/calculators/finance/crypto-profit-calculator' },
            ].map(l => (
              <Link key={l.h} href={l.h}
                className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 shadow-card hover:border-yellow-200 transition-all text-xs font-bold text-gray-700 group">
                <span className="text-lg">{l.e}</span>{l.n}
                <ArrowRight className="w-3 h-3 ml-auto text-gray-300 group-hover:text-yellow-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEO + FAQ ─────────────────────────────────────────── */}
      <div className="mt-12 space-y-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-4"><div className="h-px flex-1 bg-gray-100"/><span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">Complete Guide</span><div className="h-px flex-1 bg-gray-100"/></div>

        <div className="rounded-2xl p-5 bg-green-50 border border-green-100">
          <p className="text-xs font-bold uppercase tracking-wider mb-3 text-green-700">📊 Precious Metals P&L Key Facts — 2026</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[{s:'2–4%',n:'Typical dealer buy premium over spot — your hidden entry cost'},{s:'1–2%',n:'Dealer sell discount below spot — adds to your break-even gap'},{s:'~10.6%',n:'Gold 20-year annualized return USD (World Gold Council)'},{s:'3 years',n:'Holding period for LTCG tax benefit on physical gold in India'},{s:'20% + indexation',n:'Long-term capital gains tax on physical gold in India'},{s:'Break-even',n:'Buy price + all fees ÷ quantity — what you must exceed to profit'}].map((k,i)=>(
              <div key={i} className="bg-white rounded-xl p-3 border border-green-100"><p className="text-lg font-black text-green-700">{k.s}</p><p className="text-xs text-gray-500 mt-0.5">{k.n}</p></div>
            ))}
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Precious Metals Profit Calculator — Complete Guide 2026</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p>Most precious metals calculators show you the current price. This one shows you what actually matters for an investor: did you make money, how much, and at what annualized rate? The difference between spot price and your actual realized return includes dealer buy premiums (2–4% above spot when you buy), sell discounts (1–2% below spot when you sell), and the time value of your holding period. A 10% gold price gain over 3 years sounds good until you calculate it was a 3.2% annualized return — barely ahead of a fixed deposit.</p>
            <p>This calculator handles all four precious metals — gold, silver, platinum, and palladium — with separate buy fee and sell fee fields so you enter realistic dealer economics rather than theoretical spot-to-spot returns. The break-even price shows exactly what price the metal must reach before your trade becomes profitable (accounting for all fees). The P&L scenario chart shows profit at ±5%, ±10%, ±15%, ±20%, and ±25% from your buy price — essential for setting realistic profit targets and stop-loss levels.</p>
            <p>For active traders: combine this calculator with live price feeds from our <Link href="/commodities/gold-price-calculator" className="text-green-700 font-semibold underline underline-offset-2">Gold Price Calculator</Link> and <Link href="/commodities/silver-price-calculator" className="text-green-700 font-semibold underline underline-offset-2">Silver Price Calculator</Link>. For portfolio-level view, the <Link href="/commodities/commodity-portfolio-tracker" className="text-green-700 font-semibold underline underline-offset-2">Portfolio Tracker</Link> aggregates all positions. For a gold-vs-SIP comparison, use our <Link href="/calculators/finance/sip-vs-gold-calculator" className="text-green-700 font-semibold underline underline-offset-2">SIP vs Gold Calculator</Link>.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">🎯 Use Cases</h3>
          <div className="space-y-4">
            {[
              {t:'Evaluating Whether to Sell Now',b:'Enter your exact buy price and quantity. Set sell price to the current live price (or manually enter if using over-the-counter). Enter realistic dealer fees. The result tells you: your actual net profit after all fees, annualized return, and whether you\'ve held long enough for LTCG tax benefits (3 years in India). If annualized return is below your FD or SIP return and you don\'t have a specific reason to hold, the numbers may support selling.'},
              {t:'Setting a Profit Target Before Buying',b:'Before entering a position, use the calculator in reverse: enter your planned buy price and fees. Adjust the sell price field to find what price gives you your target profit (e.g., 15% net return). This becomes your target sell level. Set a price alert at that level. Also check the break-even price — the gap between entry and break-even tells you the minimum appreciation you need before seeing any profit.'},
              {t:'Comparing Two Metal Positions',b:'Open two browser tabs with this calculator. Enter your gold position in one and silver in the other (or any two metals). Compare annualized returns side by side. If one is dramatically outperforming, it may be time to rebalance. This kind of side-by-side comparison is exactly what the gold-silver ratio trade exploits — rotating from the outperforming metal to the underperforming one when ratios reach extremes.'},
            ].map((u,i)=>(<div key={i} className="border-l-4 border-green-300 pl-5 py-3 bg-white rounded-r-2xl"><h4 className="font-black text-gray-900 mb-1 text-sm">{u.t}</h4><p className="text-gray-600 text-sm leading-relaxed">{u.b}</p></div>))}
          </div>
        </section>

        <PnlFAQ />

        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">🔗 Related Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[{e:'🥇',n:'Gold Price Calculator',h:'/commodities/gold-price-calculator',d:'Live 24K–10K gold prices to get current sell price'},{e:'🥈',n:'Silver Price Calculator',h:'/commodities/silver-price-calculator',d:'Live silver spot for 999/925/900/800 purity'},{e:'🗂️',n:'Portfolio Tracker',h:'/commodities/commodity-portfolio-tracker',d:'Aggregate all metal positions at live prices'},{e:'⚖️',n:'SIP vs Gold',h:'/calculators/finance/sip-vs-gold-calculator',d:'Compare gold ROI against your mutual fund SIP'},{e:'📊',n:'Lumpsum vs Gold',h:'/calculators/finance/lumpsum-vs-gold-calculator',d:'One-time investment vs gold — who won?'},{e:'📈',n:'Stock Profit Calculator',h:'/calculators/finance/stock-profit-calculator',d:'Same P&L analysis for equity trades'},].map(c=>(<Link key={c.h} href={c.h} className="group bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all p-4 flex flex-col gap-2"><div className="flex items-center gap-2"><span className="text-2xl">{c.e}</span><p className="font-black text-gray-900 text-sm group-hover:text-green-700 leading-tight">{c.n}</p></div><p className="text-[11px] text-gray-500 flex-1 leading-relaxed">{c.d}</p><span className="text-xs font-bold text-green-600 flex items-center gap-1 mt-auto">Open <ArrowRight className="w-3 h-3"/></span></Link>))}
          </div>
        </section>
      </div>
    </div>
  )
}
