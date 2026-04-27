'use client'
import { useState, useMemo } from 'react'
import { useCommodityPrices, getSilverPurityPrices, TROY_OZ_TO_GRAM } from '@/hooks/useCommodityPrices'
import { CommodityPriceCard } from '@/components/commodities/CommodityPriceCard'
import { RefreshCw, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const SYM: Record<string,string> = { USD:'$', INR:'₹', GBP:'£', EUR:'€' }


function SilverFAQ() {
  const faqs = [
    {q:'Why is silver so much cheaper than gold?',a:'Silver is approximately 88x more abundant in the Earth\'s crust than gold, and annual mining output is around 800 million oz vs gold\'s 120 million oz. The gold-silver ratio (gold price ÷ silver price) has historically averaged 60:1 but currently sits at ~88:1, meaning silver is historically undervalued relative to gold. Many investors see the elevated ratio as a buying opportunity for silver.'},
    {q:'What does 925 sterling silver mean?',a:'925 sterling silver is 92.5% pure silver and 7.5% copper (or other metals). The copper alloy gives sterling silver the hardness needed for jewellery and cutlery — pure 999 silver is too soft for most practical uses. 925 is the most common silver purity for jewellery globally. Our calculator shows live prices for 999, 925, 900, and 800 purity levels.'},
    {q:'Is silver a good investment in 2026?',a:'Silver has dual demand drivers that gold lacks: investment demand (like gold) plus industrial demand — silver is used in solar panels (130mg per panel), EV batteries and charging infrastructure, 5G electronics, and medical devices. The global solar installation boom is creating structural demand growth. Silver has underperformed gold over the last decade, keeping the gold-silver ratio elevated. Many commodity analysts expect silver to outperform gold when the ratio reverts to historical norms.'},
    {q:'How do I calculate the value of my silver jewellery?',a:'Weigh your silver item (jewellers have accurate scales). Check the hallmark: 925 (sterling), 999 (fine), 900 (coin silver), or 800 (European). Enter weight and purity into our Silver Price Calculator to get metal value. Note: silver jewellery resale value at dealers is typically 10–20% below calculator value due to refining costs and dealer margin. Melt value is the floor — not the ceiling — of what your silver is worth.'},
    {q:'What is the difference between troy ounce and regular ounce for silver?',a:'Silver (like all precious metals) is priced in troy ounces, not avoirdupois ounces. 1 troy oz = 31.1035g, while 1 regular oz = 28.3495g. When you see "silver at $36/oz", that is $36 per troy ounce = $1.158/gram. This 10% difference matters when comparing prices — always confirm which ounce a dealer is using.'},
    {q:'How does industrial demand affect silver prices?',a:'Unlike gold (where ~90% of demand is investment + jewellery), silver has ~60% industrial demand. This means silver prices are more sensitive to global economic cycles — silver falls harder in recessions (lower industrial output) and rises more in expansions. The green energy transition is a structural tailwind: a typical solar panel uses 20g of silver, and global solar capacity additions are accelerating. This industrial demand floor supports silver prices independently of investment sentiment.'},
  ]
  const [open, setOpen] = useState<number|null>(null)
  return (
    <section>
      <h3 className="text-xl font-black text-gray-900 mb-4">❓ Silver Price FAQ</h3>
      <div className="space-y-2">
        {faqs.map((f,i)=>(
          <div key={i} className={`bg-white rounded-2xl border transition-all ${open===i?'border-slate-300 shadow-md':'border-gray-100 hover:border-slate-200'}`}>
            <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left">
              <span className="font-bold text-gray-900 text-sm leading-snug">{f.q}</span>
              <span className="text-slate-500 font-black flex-shrink-0">{open===i?'▲':'▼'}</span>
            </button>
            {open===i&&<div className="px-5 pb-5"><div className="h-px bg-slate-100 mb-3"/><p className="text-sm text-gray-600 leading-relaxed">{f.a}</p></div>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Page() {
  const { data, loading, anyLive, lastFetched, error, usdInr, refresh } = useCommodityPrices(60)
  const FX: Record<string, number> = { USD:1, INR:usdInr, GBP:0.775, EUR:0.918, AED:3.673 }
  const purities = getSilverPurityPrices(data.silver.price)
  const purityList = Object.entries(purities) as [string, { purity:number; perGram:number; perOz:number }][]
  const [fxKey,  setFxKey]  = useState('USD')
  const [weight, setWeight] = useState(100)
  const [wUnit,  setWUnit]  = useState<'gram'|'oz'|'kg'>('gram')
  const [purity, setPurity] = useState('925 Sterling')
  const fmt = (usd: number, dp=2) => `${SYM[fxKey]}${(usd*FX[fxKey]).toLocaleString(undefined,{minimumFractionDigits:dp,maximumFractionDigits:dp})}`
  const grams = wUnit==='gram' ? weight : wUnit==='oz' ? weight*TROY_OZ_TO_GRAM : weight*1000
  const info = purities[purity as keyof typeof purities]
  const value = info ? info.perGram * grams : 0

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-400 mb-5 flex items-center gap-1">
        <Link href="/" className="hover:text-gray-600">Home</Link> /
        <Link href="/commodities" className="hover:text-gray-600">Commodities</Link> /
        <span className="text-gray-700 font-medium">Silver Price Calculator</span>
      </nav>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">🥈 Silver Price Calculator - Live by Purity</h1>
          <p className="text-gray-500 mt-1">Live silver price for 999 Fine, 925 Sterling, 900 Coin, 800 European - per gram, troy oz &amp; kg</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {Object.keys(FX).map(k => <button key={k} onClick={()=>setFxKey(k)} className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${fxKey===k?'bg-white shadow text-gray-900':'text-gray-500'}`}>{k}</button>)}
          </div>
          <button onClick={refresh} disabled={loading} className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl border border-slate-200">
            <RefreshCw className={`w-3.5 h-3.5 ${loading?'animate-spin':''}`} />Refresh
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <CommodityPriceCard commodity={data.silver} emoji="🥈" loading={loading} />
          <div className="bg-white rounded-2xl border border-slate-100 shadow-card overflow-hidden">
            <div className="px-4 py-3 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
              <p className="font-black text-gray-900 text-sm">Silver by Purity</p>
              <p className="text-xs text-gray-400">{fxKey} per gram</p>
            </div>
            {purityList.map(([p, info]) => (
              <button key={p} onClick={()=>setPurity(p)} className={`w-full px-4 py-3.5 flex items-center justify-between border-b border-gray-50 last:border-0 transition-colors text-left ${purity===p?'bg-slate-50 ring-1 ring-inset ring-slate-300':'hover:bg-gray-50'}`}>
                <div><p className="font-black text-gray-900 text-sm">{p}</p><p className="text-[11px] text-gray-400">{(info.purity*100).toFixed(1)}% pure</p></div>
                <p className="font-black text-gray-900">{fmt(info.perGram,4)}/g</p>
              </button>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <h2 className="font-black text-gray-900 mb-5">Calculate Silver Value</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Weight</label>
                <div className="flex gap-2">
                  <input type="number" step="0.1" value={weight} onChange={e=>setWeight(+e.target.value)} className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-slate-400 font-bold" />
                  <select value={wUnit} onChange={e=>setWUnit(e.target.value as any)} className="px-3 py-2.5 border border-gray-200 rounded-xl bg-white font-semibold text-sm">
                    <option value="gram">gram</option><option value="oz">troy oz</option><option value="kg">kg</option>
                  </select>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">= {grams.toFixed(3)}g</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Purity</label>
                <div className="grid grid-cols-2 gap-2">
                  {purityList.map(([p]) => (
                    <button key={p} onClick={()=>setPurity(p)} className={`py-2.5 text-xs font-black rounded-xl transition-all ${purity===p?'bg-slate-600 text-white':'bg-gray-100 text-gray-700 hover:bg-slate-100'}`}>{p.split(' ')[0]}</button>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-center">
              <p className="text-sm text-gray-500 mb-1">{purity} Silver Value ({grams.toFixed(2)}g)</p>
              <p className="text-4xl font-black text-slate-700">{fmt(value)}</p>
              <p className="text-sm text-gray-500 mt-1">Spot: ${data.silver.price.toFixed(3)}/oz - {fmt(data.silver.price/TROY_OZ_TO_GRAM,4)}/g</p>
            </div>
            <div className="mt-4 space-y-1">
              {purityList.map(([p, i]) => (
                <div key={p} className="flex justify-between text-sm py-1.5 border-b border-gray-50">
                  <span className="text-gray-600">{p}</span>
                  <span className="font-bold text-gray-900">{fmt(i.perGram*grams)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[['Gold','🥇','/commodities/gold-price-calculator'],['Platinum','💎','/commodities/platinum-price-calculator'],['Metals P&amp;L','💰','/commodities/precious-metals-profit-calculator'],['Portfolio','🗂️','/commodities/commodity-portfolio-tracker']].map(([n,e,h]) => (
              <Link key={h} href={h} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 shadow-card hover:border-slate-200 transition-all text-xs font-bold text-gray-700 group">
                <span className="text-lg">{e}</span>{n}<ArrowRight className="w-3 h-3 ml-auto text-gray-300 group-hover:text-slate-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEO + FAQ ─────────────────────────────────────────── */}
      <div className="mt-12 space-y-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-4"><div className="h-px flex-1 bg-gray-100"/><span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">Complete Guide</span><div className="h-px flex-1 bg-gray-100"/></div>

        <div className="rounded-2xl p-5 bg-slate-50 border border-slate-100">
          <p className="text-xs font-bold uppercase tracking-wider mb-3 text-slate-600">📊 Silver Key Facts — 2026</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[{s:'~88:1',n:'Gold-silver ratio April 2026 — historically silver is cheap'},{s:'92.5%',n:'Purity of 925 sterling silver — most common for jewellery'},{s:'~60%',n:'Silver demand that is industrial (solar, EVs, electronics)'},{s:'130mg',n:'Silver used per solar panel — green energy demand driver'},{s:'800M oz',n:'Annual global silver mine supply (vs 120M oz gold)'},{s:'$36/oz',n:'Approximate silver spot price, Q1 2026 (USD/troy oz)'}].map((k,i)=>(
              <div key={i} className="bg-white rounded-xl p-3 border border-slate-100"><p className="text-lg font-black text-slate-600">{k.s}</p><p className="text-xs text-gray-500 mt-0.5">{k.n}</p></div>
            ))}
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Silver Price Calculator — Complete Guide 2026</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p>Silver is the most misunderstood precious metal. Most people know it as jewellery material, but silver's real price story is driven by a unique combination of investment demand, central bank policy sensitivity, and surging industrial consumption — particularly from solar panels and electric vehicles. The silver price you see quoted is in USD per troy ounce for .999 fine silver (99.9% pure), but silver is sold and traded at multiple purity levels, each requiring a different price calculation.</p>
            <p>The four main purity levels: .999 fine (investment coins, bars) is the spot price benchmark. .925 sterling (jewellery, cutlery) = spot × 0.925. .900 coin silver (pre-1965 US dimes, quarters) = spot × 0.900. .800 European silver (older Continental pieces) = spot × 0.800. Our calculator shows live prices across all four purities simultaneously, in four currencies, per gram, ounce, and kilogram.</p>
            <p>For investors, the key metric is the gold-silver ratio — currently around 88:1 vs. a 20-year average of ~65:1. This means silver is historically cheap relative to gold. A return to 65:1 from 88:1 while gold stays flat would imply a 35% silver price increase. Many commodity analysts see current silver prices as presenting a significant long-term opportunity. Compare metal positions using our <Link href="/commodities/precious-metals-profit-calculator" className="text-slate-600 font-semibold underline underline-offset-2">Precious Metals Profit Calculator</Link>.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">📊 Silver Purity Guide</h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm"><thead><tr className="bg-slate-50 border-b border-slate-100">
              <th className="px-4 py-3 text-left font-bold text-slate-600 text-xs uppercase">Mark</th>
              <th className="px-4 py-3 text-left font-bold text-slate-600 text-xs uppercase">Purity</th>
              <th className="px-4 py-3 text-left font-bold text-slate-600 text-xs uppercase">Common Form</th>
              <th className="px-4 py-3 text-left font-bold text-slate-600 text-xs uppercase">Best For</th>
            </tr></thead><tbody className="divide-y divide-gray-100">
              {[['.999 Fine','99.9%','Investment bars & coins','Maximum investment value; not practical for jewellery'],['.925 Sterling','92.5%','Jewellery, cutlery, flatware','Most common worldwide; hallmarked as "925"'],['.900 Coin','90.0%','Pre-1965 US coins','Junk silver coins — popular among collectors'],['.800 European','80.0%','Older Continental pieces','Common in older German, Scandinavian silverware']].map(([m,p,f,b],i)=>(
                <tr key={i} className="hover:bg-gray-50"><td className="px-4 py-3 font-black text-slate-600">{m}</td><td className="px-4 py-3 font-semibold text-gray-800">{p}</td><td className="px-4 py-3 text-gray-600 text-xs">{f}</td><td className="px-4 py-3 text-gray-500 text-xs">{b}</td></tr>
              ))}
            </tbody></table>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">🎯 Use Cases</h3>
          <div className="space-y-4">
            {[
              {t:'Checking Value of Inherited Silver',b:'Have old silverware, coins, or jewellery? Check the hallmark stamped on the piece (.999, .925, .900, or .800). Weigh it on a kitchen scale (postal scales work fine for silver given lower per-gram value). Enter weight and purity — you\'ll have the melt value in seconds. Dealer buyback is typically 85–90% of melt value.'},
              {t:'Silver Investment — Coins vs Bars',b:'Silver coins (American Eagle, Canadian Maple Leaf) carry a 15–25% premium over spot due to minting and distribution costs. Silver bars carry 3–8% premium. For pure investment, 10oz or 100oz bars from reputable refiners offer the lowest premium. For liquidity, recognizable government coins are easiest to sell. Both track .999 spot — use this calculator with purity .999 and your weight to see current value.'},
              {t:'Identifying Gold-Silver Rotation Opportunity',b:'When the gold-silver ratio exceeds 80 (as it does now at ~88), historically silver has outperformed gold over the following 2–3 years when the ratio reverts. Some investors hold most of their precious metal allocation in silver at these ratios, rotating back to gold when the ratio drops below 50. Use our Precious Metals Profit Calculator to model both positions.'},
            ].map((u,i)=>(<div key={i} className="border-l-4 border-slate-300 pl-5 py-3 bg-white rounded-r-2xl"><h4 className="font-black text-gray-900 mb-1 text-sm">{u.t}</h4><p className="text-gray-600 text-sm leading-relaxed">{u.b}</p></div>))}
          </div>
        </section>

        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
          <h3 className="text-xl font-black text-amber-800 mb-3">💡 Pro Tips for Silver Buyers</h3>
          <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
            <p><strong className="text-amber-800">1.</strong> Buy from LBMA-accredited refiners (PAMP, Umicore, Valcambi) for guaranteed .999 purity and global liquidity.</p>
            <p><strong className="text-amber-800">2.</strong> Silver tarnishes — store in anti-tarnish bags or with silica gel. Tarnish doesn't reduce melt value but reduces resale appeal.</p>
            <p><strong className="text-amber-800">3.</strong> GST on silver in India is 3% — same as gold. Factor this into your buy price when calculating break-even.</p>
            <p><strong className="text-amber-800">4.</strong> Track your full precious metals exposure with our <Link href="/commodities/commodity-portfolio-tracker" className="text-slate-600 font-semibold">Portfolio Tracker</Link> — all metals at live prices in one view.</p>
          </div>
        </div>

        <SilverFAQ />

        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">🔗 Related Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[{e:'🥇',n:'Gold Price Calculator',h:'/commodities/gold-price-calculator',d:'Live 24K–10K gold prices per gram, tola & oz with GST'},{e:'💎',n:'Platinum Calculator',h:'/commodities/platinum-price-calculator',d:'Live platinum per gram and troy oz'},{e:'💰',n:'Precious Metals P&L',h:'/commodities/precious-metals-profit-calculator',d:'ROI, break-even & annualized return on any silver trade'},{e:'🗂️',n:'Portfolio Tracker',h:'/commodities/commodity-portfolio-tracker',d:'All your metals at live prices — total P&L dashboard'},{e:'⚖️',n:'SIP vs Gold',h:'/calculators/finance/sip-vs-gold-calculator',d:'Has gold beaten your mutual fund SIP? Find out.'},{e:'📊',n:'Inflation Calculator',h:'/calculators/finance/inflation-calculator',d:'Measure real purchasing power loss vs silver gains'},].map(c=>(<Link key={c.h} href={c.h} className="group bg-white rounded-2xl border border-gray-100 hover:border-slate-300 hover:shadow-md transition-all p-4 flex flex-col gap-2"><div className="flex items-center gap-2"><span className="text-2xl">{c.e}</span><p className="font-black text-gray-900 text-sm group-hover:text-slate-700 leading-tight">{c.n}</p></div><p className="text-[11px] text-gray-500 flex-1 leading-relaxed">{c.d}</p><span className="text-xs font-bold text-slate-500 flex items-center gap-1 mt-auto">Open <ArrowRight className="w-3 h-3"/></span></Link>))}
          </div>
        </section>
      </div>
    </div>
  )
}
