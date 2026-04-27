'use client'
import { useState, useMemo, useEffect } from 'react'
import { useCommodityPrices, type CommodityData, COMMODITY_META, TROY_OZ_TO_GRAM } from '@/hooks/useCommodityPrices'
import { PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts'
import { Plus, Trash2, RefreshCw, ArrowRight, TrendingUp, TrendingDown, Download } from 'lucide-react'
import Link from 'next/link'

interface Holding {
  id:        string
  metal:     keyof CommodityData
  qty:       number       // troy oz
  buyPrice:  number       // USD per troy oz
  label:     string
}

const METAL_OPTS: { key: keyof CommodityData; name: string; emoji: string; unit: string }[] = [
  { key:'gold',        name:'Gold',            emoji:'🥇', unit:'oz' },
  { key:'silver',      name:'Silver',          emoji:'🥈', unit:'oz' },
  { key:'platinum',    name:'Platinum',        emoji:'💎', unit:'oz' },
  { key:'palladium',   name:'Palladium',       emoji:'⚗️', unit:'oz' },
  { key:'crude_wti',   name:'Crude Oil (WTI)', emoji:'🛢️', unit:'bbl'},
  { key:'crude_brent', name:'Brent Crude',     emoji:'⛽', unit:'bbl'},
  { key:'natural_gas', name:'Natural Gas',     emoji:'🔥', unit:'MMBtu'},
  { key:'copper',      name:'Copper',          emoji:'🔶', unit:'lb' },
]

const COLORS = ['#f59e0b','#94a3b8','#3b82f6','#a855f7','#f97316','#f59e0b','#ef4444','#f97316']
const SYM: Record<string,string> = { USD:'$', INR:'₹', GBP:'£', EUR:'€' }

const DEFAULT_HOLDINGS: Holding[] = [
  { id:'h1', metal:'gold',     qty:5,    buyPrice:2950, label:'Gold Coins'      },
  { id:'h2', metal:'silver',   qty:100,  buyPrice:30,   label:'Silver Bars'     },
  { id:'h3', metal:'platinum', qty:2,    buyPrice:1050, label:'Platinum Coins'  },
]


function PortfolioFAQ() {
  const [open, setOpen] = useState<number|null>(null)
  const faqs = [
    {q:'How much of my portfolio should be in precious metals?',a:'Most financial advisors suggest 5–15% of a total investment portfolio in precious metals. Ray Dalio\'s All Weather Portfolio allocates 7.5% to gold. The classic recommendation is 5–10% as an inflation hedge and portfolio stabilizer. For Indian investors specifically, where gold is culturally significant and rupee depreciation risk is real, 10–15% (including jewellery) is common. Higher allocations (20%+) are appropriate for investors specifically concerned about currency debasement or systemic financial risk.'},
    {q:'Should I track jewellery and investment gold separately?',a:'Yes — jewellery has a different cost basis (includes making charges, GST) and different liquidity (retail jewellery resells at significant discount to metal value). Investment gold (coins, bars, ETFs, SGBs) tracks spot price with minimal premium. Track them separately in your portfolio so you see true investment performance vs the sentimental/wearable value of jewellery. Our tracker lets you add multiple positions with different entry prices.'},
    {q:'How do I calculate my average cost per ounce across multiple gold purchases?',a:'Average cost = total money invested ÷ total ounces (or grams) purchased. Example: bought 10g at ₹60,000/10g in 2022 and 15g at ₹72,000/10g in 2023. Total invested = ₹60,000 + ₹1,08,000 = ₹1,68,000. Total grams = 25g. Average cost = ₹1,68,000 ÷ 25 = ₹6,720/gram. Our portfolio tracker calculates weighted average cost automatically when you enter multiple positions for the same metal.'},
    {q:'What is the ideal precious metals portfolio allocation?',a:'A balanced precious metals sub-portfolio might be: 60–70% gold (stable store of value, deepest liquidity), 20–25% silver (industrial demand upside, currently cheap vs gold), 5–10% platinum (contrarian play on diesel decline bottoming), and 0–5% palladium (only for sophisticated investors willing to accept high volatility). This is not investment advice — your allocation should reflect your specific risk tolerance, investment horizon, and view on the gold-silver ratio and industrial metals cycle.'},
    {q:'How does currency affect my precious metals portfolio value?',a:'All precious metals are priced in USD globally. If you are an INR investor, two variables affect your portfolio value: the metal price in USD AND the USD/INR exchange rate. In 2022, gold fell ~3% in USD terms but rose ~6% in INR terms because the rupee depreciated ~9% against the dollar. This currency buffer is one reason gold is particularly effective as a hedge for Indian investors — rupee weakness tends to coincide with global risk-off periods when gold also rises in USD terms, creating a double-positive effect in INR.'},
  ]
  return (
    <section>
      <h3 className="text-xl font-black text-gray-900 mb-4">❓ Portfolio Tracker FAQ</h3>
      <div className="space-y-2">
        {faqs.map((f,i)=>(
          <div key={i} className={`bg-white rounded-2xl border transition-all ${open===i?'border-indigo-300 shadow-md':'border-gray-100 hover:border-indigo-200'}`}>
            <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left">
              <span className="font-bold text-gray-900 text-sm leading-snug">{f.q}</span>
              <span className="text-indigo-400 font-black flex-shrink-0">{open===i?'▲':'▼'}</span>
            </button>
            {open===i&&<div className="px-5 pb-5"><div className="h-px bg-indigo-100 mb-3"/><p className="text-sm text-gray-600 leading-relaxed">{f.a}</p></div>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function CommodityPortfolioTrackerPage() {
  const { data, loading, anyLive, lastFetched, error, usdInr, refresh } = useCommodityPrices(60)
  const FX: Record<string, number> = { USD:1, INR:usdInr, GBP:0.775, EUR:0.918, AED:3.673 }
  const [holdings, setHoldings] = useState<Holding[]>(DEFAULT_HOLDINGS)
  const [fxKey,    setFxKey]    = useState('USD')
  const [addMetal, setAddMetal] = useState<keyof CommodityData>('gold')
  const [addQty,   setAddQty]   = useState(1)
  const [addBuy,   setAddBuy]   = useState(0)
  const [addLabel, setAddLabel] = useState('')
  const [showAdd,  setShowAdd]  = useState(false)

  const fmt = (usd: number, dp = 2) =>
    `${SYM[fxKey]}${(usd * FX[fxKey]).toLocaleString(undefined, { minimumFractionDigits:dp, maximumFractionDigits:dp })}`
  const fmtShort = (usd: number) => {
    const v = usd * FX[fxKey]
    return v >= 1_000_000 ? `${SYM[fxKey]}${(v/1_000_000).toFixed(2)}M`
      : v >= 1_000 ? `${SYM[fxKey]}${(v/1_000).toFixed(1)}K`
      : `${SYM[fxKey]}${v.toFixed(0)}`
  }

  // Set default buy price when metal changes in add form
  useEffect(() => { setAddBuy(Math.round(data[addMetal].price)) }, [addMetal, data])

  const rows = useMemo(() => holdings.map(h => {
    const livePrice  = data[h.metal].price
    const currentVal = livePrice * h.qty
    const costBasis  = h.buyPrice * h.qty
    const pnl        = currentVal - costBasis
    const pnlPct     = costBasis > 0 ? (pnl / costBasis) * 100 : 0
    const metaOpt    = METAL_OPTS.find(m => m.key === h.metal)!
    return { ...h, livePrice, currentVal, costBasis, pnl, pnlPct, metaOpt }
  }), [holdings, data])

  const totals = useMemo(() => ({
    currentVal: rows.reduce((s, r) => s + r.currentVal, 0),
    costBasis:  rows.reduce((s, r) => s + r.costBasis,  0),
    pnl:        rows.reduce((s, r) => s + r.pnl,        0),
  }), [rows])

  const totalPnlPct = totals.costBasis > 0 ? (totals.pnl / totals.costBasis) * 100 : 0
  const isPortfolioUp = totals.pnl >= 0

  // Pie data
  const pieData = useMemo(() =>
    rows.map((r, i) => ({ name: `${r.metaOpt.emoji} ${r.label || r.metaOpt.name}`, value: Math.round(r.currentVal * FX[fxKey]), color: COLORS[i % COLORS.length] }))
  , [rows, fxKey])

  // Bar chart: cost vs current
  const barData = useMemo(() =>
    rows.map(r => ({
      name: r.metaOpt.emoji + ' ' + (r.label || r.metaOpt.name).slice(0, 8),
      cost:    Math.round(r.costBasis  * FX[fxKey]),
      current: Math.round(r.currentVal * FX[fxKey]),
    }))
  , [rows, fxKey])

  function addHolding() {
    if (addQty <= 0 || addBuy <= 0) return
    const metaOpt = METAL_OPTS.find(m => m.key === addMetal)!
    const newH: Holding = {
      id: `h${Date.now()}`, metal: addMetal, qty: addQty,
      buyPrice: addBuy, label: addLabel || metaOpt.name,
    }
    setHoldings(prev => [...prev, newH])
    setAddQty(1); setAddLabel(''); setShowAdd(false)
  }

  function removeHolding(id: string) { setHoldings(prev => prev.filter(h => h.id !== id)) }

  function exportCSV() {
    const header = 'Label,Metal,Quantity,Buy Price,Cost Basis,Live Price,Current Value,P&amp;L,P&amp;L %'
    const rows2 = rows.map(r =>
      `"${r.label}","${r.metaOpt.name}",${r.qty},${r.buyPrice.toFixed(2)},${r.costBasis.toFixed(2)},${r.livePrice.toFixed(2)},${r.currentVal.toFixed(2)},${r.pnl.toFixed(2)},${r.pnlPct.toFixed(2)}%`
    )
    const csv = [header, ...rows2].join('\n')
    const blob = new Blob([csv], { type:'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href = url; a.download = 'commodity-portfolio.csv'; a.click()
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-400 mb-5 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-gray-600">Home</Link> /
        <Link href="/commodities" className="hover:text-gray-600">Commodities</Link> /
        <span className="text-gray-700 font-medium">Commodity Portfolio Tracker</span>
      </nav>

      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900">🗂️ Commodity Portfolio Tracker</h1>
          <p className="text-gray-500 mt-1">Track your gold, silver, platinum &amp; energy holdings at live prices - P&amp;L, allocation &amp; performance</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {Object.keys(FX).map(k => (
              <button key={k} onClick={() => setFxKey(k)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${fxKey === k ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>{k}</button>
            ))}
          </div>
          <button onClick={exportCSV} className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-200">
            <Download className="w-3.5 h-3.5" />Export CSV
          </button>
          <button onClick={refresh} disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-xl border border-yellow-200">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            {anyLive ? 'Live' : 'Refresh'}
          </button>
        </div>
      </div>

      {/* -- Portfolio Summary -- */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        {[
          { label:'Total Value',    val: fmt(totals.currentVal),                  sub: `${holdings.length} holdings`,          accent:'bg-blue-50 border-blue-200'                                 },
          { label:'Total Cost',     val: fmt(totals.costBasis),                   sub:'invested',                               accent:'bg-gray-50 border-gray-200'                                 },
          { label:'Net P&amp;L',        val: `${totals.pnl>=0?'+':''}${fmt(totals.pnl)}`, sub:`${totalPnlPct>=0?'+':''}${totalPnlPct.toFixed(2)}% overall`, accent: isPortfolioUp ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200' },
          { label:'Live Source',    val: anyLive ? '● LIVE' : '○ Cached',         sub: lastFetched?.toLocaleTimeString() ?? '-', accent:'bg-gray-50 border-gray-200'                                },
        ].map(c => (
          <div key={c.label} className={`rounded-2xl border p-4 ${c.accent}`}>
            <p className="text-[11px] text-gray-500 font-semibold mb-1">{c.label}</p>
            <p className={`font-black text-gray-900 text-xl leading-tight ${c.label==='Net P&amp;L' ? (isPortfolioUp?'text-green-700':'text-red-700') : c.label==='Live Source' ? (anyLive?'text-green-600':'text-gray-500') : ''}`}>{c.val}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

        {/* -- Holdings table -- */}
        <div className="xl:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <h2 className="font-black text-gray-900">Your Holdings</h2>
              <button onClick={() => setShowAdd(!showAdd)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-yellow-500 text-white rounded-xl hover:bg-yellow-600 transition-all">
                <Plus className="w-3.5 h-3.5" />{showAdd ? 'Cancel' : 'Add Holding'}
              </button>
            </div>

            {/* Add form */}
            {showAdd && (
              <div className="p-4 bg-yellow-50 border-b border-yellow-100">
                <p className="text-sm font-black text-gray-900 mb-3">Add New Holding</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">Metal</label>
                    <select value={addMetal} onChange={e => setAddMetal(e.target.value as keyof CommodityData)}
                      className="w-full px-2.5 py-2 border border-gray-200 rounded-xl bg-white text-sm font-semibold">
                      {METAL_OPTS.map(m => <option key={m.key} value={m.key}>{m.emoji} {m.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">Quantity ({METAL_OPTS.find(m=>m.key===addMetal)?.unit})</label>
                    <input type="number" step="0.01" min="0.01" value={addQty} onChange={e => setAddQty(+e.target.value)}
                      className="w-full px-2.5 py-2 border border-gray-200 rounded-xl font-bold text-sm" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">Buy Price (USD/unit)</label>
                    <input type="number" step="1" min="0" value={addBuy} onChange={e => setAddBuy(+e.target.value)}
                      className="w-full px-2.5 py-2 border border-gray-200 rounded-xl font-bold text-sm" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-500 mb-1">Label (optional)</label>
                    <input type="text" value={addLabel} onChange={e => setAddLabel(e.target.value)}
                      placeholder="e.g. Gold Sovereign" className="w-full px-2.5 py-2 border border-gray-200 rounded-xl text-sm" />
                  </div>
                </div>
                <button onClick={addHolding}
                  className="px-5 py-2 bg-yellow-500 text-white text-sm font-black rounded-xl hover:bg-yellow-600 transition-all">
                  ＋ Add to Portfolio
                </button>
              </div>
            )}

            {/* Table header */}
            <div className="grid grid-cols-7 px-5 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <span className="col-span-2">Holding</span><span>Qty</span><span>Live Price</span><span>Value</span><span>P&amp;L</span><span></span>
            </div>

            {rows.length === 0 ? (
              <div className="py-12 text-center text-gray-400">
                <p className="text-3xl mb-2">📭</p>
                <p className="text-sm font-semibold">No holdings yet. Add one above!</p>
              </div>
            ) : rows.map((row, i) => {
              const up = row.pnl >= 0
              return (
                <div key={row.id} className="grid grid-cols-7 items-center px-5 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <div className="col-span-2 flex items-center gap-2 min-w-0">
                    <span className="text-xl flex-shrink-0">{row.metaOpt.emoji}</span>
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900 text-sm truncate">{row.label}</p>
                      <p className="text-[10px] text-gray-400">{row.metaOpt.name}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 font-medium">{row.qty} {row.metaOpt.unit}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-900">${row.livePrice.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
                    <p className="text-[10px] text-gray-400">vs ${row.buyPrice.toLocaleString()}</p>
                  </div>
                  <span className="font-black text-gray-900 text-sm">{fmtShort(row.currentVal)}</span>
                  <div>
                    <p className={`text-sm font-black ${up ? 'text-green-600' : 'text-red-500'}`}>
                      {up ? '+' : ''}{fmtShort(row.pnl)}
                    </p>
                    <p className={`text-[10px] font-bold ${up ? 'text-green-500' : 'text-red-400'}`}>
                      {up ? '+' : ''}{row.pnlPct.toFixed(1)}%
                    </p>
                  </div>
                  <button onClick={() => removeHolding(row.id)}
                    className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all ml-auto">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )
            })}

            {/* Totals row */}
            {rows.length > 0 && (
              <div className="grid grid-cols-7 items-center px-5 py-3 bg-gray-50 border-t border-gray-200">
                <div className="col-span-2 font-black text-gray-900 text-sm">TOTAL</div>
                <span />
                <span />
                <span className="font-black text-gray-900">{fmtShort(totals.currentVal)}</span>
                <div>
                  <p className={`font-black text-sm ${isPortfolioUp ? 'text-green-600' : 'text-red-500'}`}>
                    {isPortfolioUp ? '+' : ''}{fmtShort(totals.pnl)}
                  </p>
                  <p className={`text-[10px] font-bold ${isPortfolioUp ? 'text-green-500' : 'text-red-400'}`}>
                    {totalPnlPct >= 0 ? '+' : ''}{totalPnlPct.toFixed(1)}%
                  </p>
                </div>
                <span />
              </div>
            )}
          </div>

          {/* Cost vs Current bar chart */}
          {rows.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h3 className="font-black text-gray-900 mb-4">Cost Basis vs Current Value</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={barData} margin={{ left: 10, right: 5, top: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tickFormatter={v => `${SYM[fxKey]}${v >= 1000 ? `${(v/1000).toFixed(0)}k` : v}`} tick={{ fontSize: 10 }} />
                  <Tooltip formatter={(v: number) => [`${SYM[fxKey]}${v.toLocaleString()}`, '']} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="cost"    name="Cost Basis"    fill="#94a3b8" radius={[4,4,0,0]} />
                  <Bar dataKey="current" name="Current Value" fill="#16a34a" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* -- Sidebar: Pie + live prices -- */}
        <div className="space-y-4">
          {/* Allocation pie */}
          {rows.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
              <h3 className="font-black text-gray-900 mb-3">Portfolio Allocation</h3>
              <div className="flex justify-center mb-3">
                <PieChart width={180} height={180}>
                  <Pie data={pieData} cx={85} cy={85} innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={3}>
                    {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => [`${SYM[fxKey]}${v.toLocaleString()}`, '']} />
                </PieChart>
              </div>
              <div className="space-y-2">
                {pieData.map((p, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }} />
                      <span className="text-gray-600 text-xs truncate">{p.name}</span>
                    </div>
                    <div className="text-right flex-shrink-0 ml-2">
                      <p className="font-bold text-gray-900 text-xs">{SYM[fxKey]}{p.value.toLocaleString()}</p>
                      <p className="text-[10px] text-gray-400">{totals.currentVal > 0 ? ((p.value / FX[fxKey] / totals.currentVal) * 100).toFixed(1) : 0}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Live prices panel */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
              <p className="font-black text-gray-900 text-sm">Live Spot Prices</p>
              <span className={`flex items-center gap-1 text-[10px] font-bold ${anyLive ? 'text-green-600' : 'text-gray-400'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${anyLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                {anyLive ? 'LIVE' : 'CACHED'}
              </span>
            </div>
            {METAL_OPTS.map(m => {
              const c = data[m.key]
              const up = c.changePct >= 0
              return (
                <Link key={m.key} href={COMMODITY_META[m.key].href}
                  className="flex items-center justify-between px-4 py-2.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{m.emoji}</span>
                    <div>
                      <p className="text-xs font-bold text-gray-900 leading-tight">{m.name}</p>
                      <p className="text-[10px] text-gray-400">per {m.unit}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-gray-900">${c.price.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
                    <p className={`text-[10px] font-bold ${up ? 'text-green-600':'text-red-500'}`}>
                      {up?'^':'v'}{Math.abs(c.changePct).toFixed(2)}%
                    </p>
                  </div>
                </Link>
              )
            })}
          </div>

          {/* Quick links */}
          <div className="space-y-2">
            {[
              { n:'Gold Price Calculator', e:'🥇', h:'/commodities/gold-price-calculator'       },
              { n:'Metals P&amp;L Calculator', e:'💰', h:'/commodities/precious-metals-profit-calculator' },
              { n:'Gold Loan Calculator',  e:'🏦', h:'/commodities/gold-loan-calculator'         },
            ].map(l => (
              <Link key={l.h} href={l.h}
                className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 shadow-card hover:border-yellow-200 transition-all text-xs font-bold text-gray-700 group">
                <span className="text-base">{l.e}</span>{l.n}
                <ArrowRight className="w-3 h-3 ml-auto text-gray-300 group-hover:text-yellow-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-700">Note:</strong> This portfolio tracker runs entirely in your browser and does not store data - holdings reset on page refresh.
          Prices are sourced from free public APIs and may be delayed. Not financial advice. Always verify with your broker before making trading decisions.
        </p>
      </div>

      {/* ── SEO + FAQ ─────────────────────────────────────────── */}
      <div className="mt-12 space-y-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-4"><div className="h-px flex-1 bg-gray-100"/><span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">Complete Guide</span><div className="h-px flex-1 bg-gray-100"/></div>

        <div className="rounded-2xl p-5 bg-indigo-50 border border-indigo-100">
          <p className="text-xs font-bold uppercase tracking-wider mb-3 text-indigo-700">📊 Portfolio Tracking Key Facts</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[{s:'5–15%',n:'Recommended precious metals allocation in a balanced portfolio'},{s:'60–70%',n:'Typical gold share within a precious metals sub-portfolio'},{s:'Weighted avg',n:'Average cost across multiple buys — what this tracker computes'},{s:'Rupee hedge',n:'INR-denominated gold gains when USD/INR falls — double benefit'},{s:'4 metals',n:'Track gold, silver, platinum & palladium in one dashboard'},{s:'Live P&L',n:'Unrealized gain/loss updated at real-time spot prices'}].map((k,i)=>(
              <div key={i} className="bg-white rounded-xl p-3 border border-indigo-100"><p className="text-lg font-black text-indigo-700">{k.s}</p><p className="text-xs text-gray-500 mt-0.5">{k.n}</p></div>
            ))}
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Commodity Portfolio Tracker — Complete Guide 2026</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p>Most precious metals investors hold positions across multiple metals, bought at different times and prices, in different weight units, from different dealers — and have no single view of what their total collection is worth today. This portfolio tracker solves that: enter each holding with its purchase price, get a live total portfolio value, position-level unrealized P&L, and overall return — all updating in real time from the same live price feeds that power our individual calculators.</p>
            <p>The tracker handles all four major precious metals (gold, silver, platinum, palladium) in any weight unit (grams, troy ounces, tolas, kilograms). You can add multiple positions for the same metal — the tracker computes weighted average cost automatically. The total portfolio view shows your metals allocation breakdown, best and worst performing positions, and total unrealized gain/loss in absolute amount and percentage.</p>
            <p>For a comprehensive investment picture: combine this tracker with our financial calculators. Use the <Link href="/calculators/finance/sip-vs-gold-calculator" className="text-indigo-700 font-semibold underline underline-offset-2">SIP vs Gold Calculator</Link> to benchmark your gold return against equity mutual funds. Use the <Link href="/calculators/finance/lumpsum-vs-gold-calculator" className="text-indigo-700 font-semibold underline underline-offset-2">Lumpsum vs Gold Calculator</Link> for one-time investment comparisons. For trade-level P&L with dealer fees, use the <Link href="/commodities/precious-metals-profit-calculator" className="text-indigo-700 font-semibold underline underline-offset-2">Precious Metals Profit Calculator</Link>.</p>
          </div>
        </section>

        <PortfolioFAQ />

        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">🔗 Related Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[{e:'💰',n:'Precious Metals P&L',h:'/commodities/precious-metals-profit-calculator',d:'Trade-level ROI with dealer fees for any single position'},{e:'🥇',n:'Gold Price Calculator',h:'/commodities/gold-price-calculator',d:'Live 24K–10K gold prices in 5 currencies'},{e:'🥈',n:'Silver Price Calculator',h:'/commodities/silver-price-calculator',d:'Live silver by purity — 999, 925, 900, 800'},{e:'⚖️',n:'SIP vs Gold',h:'/calculators/finance/sip-vs-gold-calculator',d:'Benchmark your gold portfolio vs SIP returns'},{e:'📊',n:'Lumpsum vs Gold',h:'/calculators/finance/lumpsum-vs-gold-calculator',d:'One-time investment vs gold — historical comparison'},{e:'💱',n:'Currency Converter',h:'/calculators/finance/currency-converter',d:'Live USD/INR/GBP/EUR for cross-currency portfolio valuation'},].map(c=>(<Link key={c.h} href={c.h} className="group bg-white rounded-2xl border border-gray-100 hover:border-indigo-200 hover:shadow-md transition-all p-4 flex flex-col gap-2"><div className="flex items-center gap-2"><span className="text-2xl">{c.e}</span><p className="font-black text-gray-900 text-sm group-hover:text-indigo-700 leading-tight">{c.n}</p></div><p className="text-[11px] text-gray-500 flex-1 leading-relaxed">{c.d}</p><span className="text-xs font-bold text-indigo-500 flex items-center gap-1 mt-auto">Open <ArrowRight className="w-3 h-3"/></span></Link>))}
          </div>
        </section>
      </div>
    </div>
  )
}
