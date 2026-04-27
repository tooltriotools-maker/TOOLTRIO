'use client'
import { useState } from 'react'
import { useCommodityPrices } from '@/hooks/useCommodityPrices'
import { CommodityPriceCard } from '@/components/commodities/CommodityPriceCard'
import { RefreshCw, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const TROY_OZ_TO_GRAM = 31.1035


function PlatinumFAQ() {
  const [open, setOpen] = useState<number|null>(null)
  const faqs = [
    {q:'Why is platinum cheaper than gold despite being rarer?',a:'Platinum is indeed rarer than gold in the Earth\'s crust, but price is driven by supply, demand, and market perception — not rarity alone. Platinum\'s primary demand driver (catalytic converters for diesel vehicles) has been structurally declining as European diesel car sales fall and EVs rise. Meanwhile, gold benefits from central bank buying, ETF demand, and cultural/investment demand globally. Platinum was historically priced above gold ($2,200/oz vs gold\'s $900/oz in 2008) but the diesel transition reversed this. Current platinum prices (~$960/oz) are considered historically depressed by many analysts.'},
    {q:'What are the main uses of platinum?',a:'Catalytic converters for diesel vehicles (approximately 40% of demand) — platinum oxidizes diesel exhaust pollutants. Jewellery (about 30%) — highly valued in Japan and China for its white luster and hypoallergenic properties. Chemical and petroleum refining catalysts (~15%). Electrical and electronic components. Medical devices including pacemakers, dental implants, and cancer treatment drugs (cisplatin). The shift to EVs is a structural headwind for the first use case, which has weighed on prices.'},
    {q:'Is platinum a good investment in 2026?',a:'Platinum presents a contrarian investment case: it trades below gold despite being rarer, supply is concentrated (80% from South Africa and Russia with significant political/labor risk), and green hydrogen fuel cell technology — where platinum is the key catalyst — could create significant new demand. The downside is timing uncertainty on the hydrogen economy timeline. Most portfolio managers recommend a small allocation (2–5% of precious metals) rather than a primary position. Use our Precious Metals Profit Calculator to model scenarios.'},
    {q:'How does platinum jewellery differ from white gold?',a:'Platinum jewellery is 85–95% pure platinum (vs white gold which is yellow gold alloyed with nickel or palladium to look white, then rhodium-plated). Platinum is denser (twice the density of silver), hypoallergenic, and its white color never fades — white gold\'s rhodium plating wears off every 12–18 months. Platinum jewellery is typically 30–50% more expensive than comparable white gold pieces. The hallmark to look for: "Pt950" (95% pure) or "Pt900" (90% pure).'},
    {q:'What is the pennyweight unit for platinum?',a:'Pennyweight (dwt) is a traditional jewellery weight unit still used by some US jewellers and refiners. 1 pennyweight = 1.5552 grams = 0.05 troy ounces. For platinum at $960/troy oz: price per pennyweight = $960 ÷ 20 = $48/dwt. Our calculator shows per-gram, per-tola, and per-troy-oz prices — ask any dealer quoting per-pennyweight to confirm the conversion.'},
    {q:'How is platinum different from palladium?',a:'Both are platinum group metals (PGMs) but serve different markets. Platinum is used in diesel catalytic converters; palladium in petrol/gasoline converters. They are interchangeable in industrial applications to some extent, and refiners do substitute between them when price differentials are large. Palladium was $3,000+/oz in 2021 (vs platinum at $1,200) — a historic premium that has now reversed with palladium back at ~$1,000 and platinum at ~$960. Compare live prices using our individual calculators.'},
  ]
  return (
    <section>
      <h3 className="text-xl font-black text-gray-900 mb-4">❓ Platinum FAQ</h3>
      <div className="space-y-2">
        {faqs.map((f,i)=>(
          <div key={i} className={`bg-white rounded-2xl border transition-all ${open===i?'border-blue-300 shadow-md':'border-gray-100 hover:border-blue-200'}`}>
            <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left">
              <span className="font-bold text-gray-900 text-sm leading-snug">{f.q}</span>
              <span className="text-blue-400 font-black flex-shrink-0">{open===i?'▲':'▼'}</span>
            </button>
            {open===i&&<div className="px-5 pb-5"><div className="h-px bg-blue-100 mb-3"/><p className="text-sm text-gray-600 leading-relaxed">{f.a}</p></div>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Page() {
  const { data, loading, refresh } = useCommodityPrices(60)
  const c = data['platinum' as keyof typeof data]
  const [weight, setWeight] = useState(10)
  const [unit, setUnit] = useState<'gram'|'oz'|'kg'>('gram')
  const grams = unit==='gram' ? weight : unit==='oz' ? weight*TROY_OZ_TO_GRAM : weight*1000
  const perGram = c.price / TROY_OZ_TO_GRAM
  const value = perGram * grams

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-400 mb-5 flex items-center gap-1">
        <Link href="/" className="hover:text-gray-600">Home</Link> /
        <Link href="/commodities" className="hover:text-gray-600">Commodities</Link> /
        <span className="text-gray-700 font-medium">Platinum Price Calculator</span>
      </nav>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">💎 Platinum Price Calculator</h1>
          <p className="text-gray-500 mt-1">Live platinum spot price per gram, troy oz, pennyweight and kilogram.</p>
        </div>
        <button onClick={refresh} disabled={loading} className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-200">
          <RefreshCw className={`w-3.5 h-3.5 ${loading?'animate-spin':''}`} />Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <CommodityPriceCard commodity={c} emoji="💎" loading={loading} />
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-gray-600 leading-relaxed">Platinum is rarer than gold. Key uses: catalytic converters (~40%), jewellery (~30%), lab equipment &amp; investment. Primarily mined in South Africa and Russia.</div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100"><p className="font-black text-gray-900 text-sm">Quick Reference</p></div>
            {[['1 gram','1'],['5 grams','5'],['10 grams','10'],['1 troy oz','31.1035'],['100 grams','100'],['1 kg','1000']].map(([l,g]) => (
              <div key={l} className="flex justify-between px-4 py-2.5 border-b border-gray-50 last:border-0 text-sm">
                <span className="text-gray-600">{l}</span>
                <span className="font-bold text-gray-900">${(perGram * parseFloat(g)).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <h2 className="font-black text-gray-900 mb-5">Calculate Platinum Value</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Weight</label>
                <div className="flex gap-2">
                  <input type="number" step="0.01" value={weight} onChange={e=>setWeight(+e.target.value)} className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 font-bold" />
                  <select value={unit} onChange={e=>setUnit(e.target.value as any)} className="px-3 py-2.5 border border-gray-200 rounded-xl bg-white font-semibold text-sm">
                    <option value="gram">gram</option><option value="oz">troy oz</option><option value="kg">kg</option>
                  </select>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">= {grams.toFixed(4)}g - {(grams/TROY_OZ_TO_GRAM).toFixed(4)} oz</p>
              </div>
              <div className="flex flex-col justify-end">
                <div className="bg-blue-50 rounded-2xl border border-blue-200 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">Value</p>
                  <p className="text-3xl font-black text-blue-700">${value.toFixed(2)}</p>
                  <p className="text-xs text-gray-500 mt-1">${perGram.toFixed(3)}/gram live spot</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-2xl border border-gray-100 p-4">
              <p className="text-sm font-bold text-gray-700 mb-2">Per Weight Unit (USD)</p>
              <div className="grid grid-cols-3 gap-2">
                {[['Per Gram', perGram],['Per Tola', perGram*11.6638],['Per Troy Oz', c.price],['Per 10g', perGram*10],['Per 100g', perGram*100],['Per Kg', perGram*1000]].map(([l,v]) => (
                  <div key={l} className="bg-white rounded-xl p-2.5 text-center border border-gray-100">
                    <p className="text-[10px] text-gray-400 mb-0.5">{l}</p>
                    <p className="font-black text-gray-900 text-sm">${(v as number).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[['Gold','🥇','/commodities/gold-price-calculator'],['Silver','🥈','/commodities/silver-price-calculator'],['Metals P&amp;L','💰','/commodities/precious-metals-profit-calculator'],['Portfolio','🗂️','/commodities/commodity-portfolio-tracker']].map(([n,e,h]) => (
              <Link key={h} href={h} className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 shadow-card hover:border-blue-200 transition-all text-xs font-bold text-gray-700 group">
                <span className="text-lg">{e}</span>{n}<ArrowRight className="w-3 h-3 ml-auto text-gray-300 group-hover:text-blue-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEO + FAQ ─────────────────────────────────────────── */}
      <div className="mt-12 space-y-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-4"><div className="h-px flex-1 bg-gray-100"/><span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">Complete Guide</span><div className="h-px flex-1 bg-gray-100"/></div>

        <div className="rounded-2xl p-5 bg-blue-50 border border-blue-100">
          <p className="text-xs font-bold uppercase tracking-wider mb-3 text-blue-700">📊 Platinum Key Facts — 2026</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[{s:'~$960/oz',n:'Platinum spot price Q1 2026 — below gold for first time in decades'},{s:'Pt950',n:'Most common jewellery purity — 95% platinum'},{s:'~40%',n:'Share of platinum demand from diesel catalytic converters'},{s:'80%',n:'Global platinum supply from South Africa & Russia'},{s:'2× silver',n:'Platinum density — heaviest of the common jewellery metals'},{s:'H₂ fuel cells',n:'Emerging demand driver — platinum is key hydrogen catalyst'}].map((k,i)=>(
              <div key={i} className="bg-white rounded-xl p-3 border border-blue-100"><p className="text-lg font-black text-blue-700">{k.s}</p><p className="text-xs text-gray-500 mt-0.5">{k.n}</p></div>
            ))}
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Platinum Price Calculator — Complete Guide 2026</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p>Platinum is the rarest and densest of the precious metals commonly used in jewellery and investment, yet it currently trades below gold — a historically unusual situation driven by the structural decline of diesel vehicles (platinum's primary industrial application) and the general underperformance of platinum group metals relative to gold since 2015. Understanding platinum pricing requires understanding both the commodity market dynamics and the emerging demand catalysts that could reverse this trend.</p>
            <p>Unlike gold and silver which have deep, liquid spot markets with constant price discovery, platinum trades in a smaller, less liquid market. The LPPM (London Platinum and Palladium Market) sets the benchmark price twice daily. Our calculator uses the live spot feed and converts it to per-gram, per-tola, and per-troy-oz prices for the most common calculation needs — whether you are appraising jewellery, evaluating refinery output, or tracking an investment position.</p>
            <p>For investors: platinum's contrarian case rests on supply concentration risk (any South African mining disruption or Russia sanctions escalation causes sharp spikes), the hydrogen fuel cell opportunity (platinum is irreplaceable as the catalyst in PEM fuel cells), and the historically wide discount to gold. Track your platinum P&L with our <Link href="/commodities/precious-metals-profit-calculator" className="text-blue-700 font-semibold underline underline-offset-2">Precious Metals Profit Calculator</Link> and compare against your other metal holdings in the <Link href="/commodities/commodity-portfolio-tracker" className="text-blue-700 font-semibold underline underline-offset-2">Portfolio Tracker</Link>.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">🎯 Use Cases</h3>
          <div className="space-y-4">
            {[
              {t:'Appraising Platinum Jewellery',b:'Check the hallmark: Pt950 (95% pure), Pt900 (90%), or Pt850 (85%). Weigh the piece. Enter weight into the calculator — this gives you the metal value at spot. Platinum jewellery typically has lower making charges than gold (5–12%) because the metal itself is more expensive. Dealer buyback is usually 85–90% of metal value. Compare this against what a jeweller is offering.'},
              {t:'Platinum as Portfolio Diversifier',b:'A 3–5% allocation to platinum adds diversification to a precious metals portfolio because platinum\'s price drivers (industrial/automotive, South African supply) differ from gold\'s (USD, central banks, sentiment). Platinum historically showed low correlation with both gold and equities over short time periods, though correlations increase during broad commodity market moves.'},
            ].map((u,i)=>(<div key={i} className="border-l-4 border-blue-200 pl-5 py-3 bg-white rounded-r-2xl"><h4 className="font-black text-gray-900 mb-1 text-sm">{u.t}</h4><p className="text-gray-600 text-sm leading-relaxed">{u.b}</p></div>))}
          </div>
        </section>

        <PlatinumFAQ />

        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">🔗 Related Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[{e:'🥇',n:'Gold Price Calculator',h:'/commodities/gold-price-calculator',d:'Live gold karat prices — 24K to 10K in 5 currencies'},{e:'🥈',n:'Silver Calculator',h:'/commodities/silver-price-calculator',d:'999/925/900/800 silver live prices per gram & oz'},{e:'⚗️',n:'Palladium Calculator',h:'/commodities/palladium-price-calculator',d:'Live palladium — the other platinum group metal'},{e:'💰',n:'Precious Metals P&L',h:'/commodities/precious-metals-profit-calculator',d:'ROI & break-even on any platinum trade'},{e:'🗂️',n:'Portfolio Tracker',h:'/commodities/commodity-portfolio-tracker',d:'All 4 metals at live prices — total portfolio view'},{e:'🏅',n:'All Commodities',h:'/commodities',d:'Gold, silver, platinum, palladium, oil & gas hub'},].map(c=>(<Link key={c.h} href={c.h} className="group bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all p-4 flex flex-col gap-2"><div className="flex items-center gap-2"><span className="text-2xl">{c.e}</span><p className="font-black text-gray-900 text-sm group-hover:text-blue-700 leading-tight">{c.n}</p></div><p className="text-[11px] text-gray-500 flex-1 leading-relaxed">{c.d}</p><span className="text-xs font-bold text-blue-500 flex items-center gap-1 mt-auto">Open <ArrowRight className="w-3 h-3"/></span></Link>))}
          </div>
        </section>
      </div>
    </div>
  )
}
