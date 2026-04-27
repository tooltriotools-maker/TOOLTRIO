'use client'
import { useState } from 'react'
import { useCommodityPrices } from '@/hooks/useCommodityPrices'
import { CommodityPriceCard } from '@/components/commodities/CommodityPriceCard'
import { RefreshCw, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const TROY_OZ_TO_GRAM = 31.1035


function PalladiumFAQ() {
  const [open, setOpen] = useState<number|null>(null)
  const faqs = [
    {q:'Why did palladium hit $3,000/oz in 2021 and drop so sharply since?',a:'Palladium spiked because of a multi-year supply deficit — demand from gasoline car production was growing while South African and Russian supply could not keep up. The spike triggered several responses: car manufacturers accelerated R&D into platinum substitution (platinum can replace palladium in gasoline converters with some engineering changes), COVID reduced auto production (reducing demand), and the EV transition accelerated — EVs need no catalytic converter at all. These converging factors collapsed the supply deficit, and prices fell from $3,000+ to ~$1,000 by 2026.'},
    {q:'What percentage of palladium demand comes from catalytic converters?',a:'Approximately 80–85% of global palladium demand comes from gasoline (petrol) engine catalytic converters. This makes palladium uniquely exposed to two threats: first, the EV transition (electric vehicles have no exhaust and need no catalytic converter); second, thrifting and substitution (automakers are actively reducing palladium loadings per vehicle and substituting platinum). The remaining 15–20% demand is from electronics, dentistry, and chemical catalysts.'},
    {q:'Where does most of the world\'s palladium come from?',a:'Russia supplies approximately 40% of global palladium, primarily as a byproduct of nickel mining in the Norilsk region. South Africa supplies about 38%. These two countries together control nearly 80% of global supply, creating significant geopolitical concentration risk. The Russia-Ukraine war and associated sanctions created supply anxiety in 2022, though Russian palladium continued to reach markets through indirect channels. Any new supply disruption would cause an immediate price spike.'},
    {q:'Can platinum replace palladium in catalytic converters?',a:'Yes, with modifications — platinum and palladium are both effective at oxidizing exhaust pollutants in gasoline engines. Automakers have been actively working on platinum substitution since palladium prices spiked above $2,000/oz. BASF and Johnson Matthey (the two dominant catalytic converter manufacturers) have developed formulations that use higher platinum content and less palladium. This substitution is accelerating and is one reason palladium prices have been pressured even beyond the EV transition impact.'},
    {q:'Is palladium a good investment in 2026?',a:'Palladium is a high-risk, high-volatility commodity play rather than a traditional store of value. The structural thesis is negative (EV transition eroding core demand), but the counter-argument is concentrated supply and potential for substitution dynamics to reverse if platinum becomes too expensive. Most precious metals investors treat palladium as a small speculative position (1–3% of metals allocation) rather than a core holding. If you are interested, track the platinum-palladium spread using our individual calculators — when palladium trades at a significant discount to platinum, substitution incentives reduce and demand stabilizes.'},
    {q:'How do I calculate the catalytic converter value of my car\'s palladium?',a:'Catalytic converters in gasoline cars contain 2–7 grams of palladium (depending on vehicle size and emission standards). A mid-size sedan might contain 3–4g. At $1,000/oz ($32.15/g), that\'s $96–$129 of palladium at spot. Actual recycler prices are 60–75% of spot after processing costs and refining. This is why catalytic converter theft is lucrative — thieves can extract converters in under 2 minutes and sell to scrap dealers for $100–$400 depending on the vehicle type.'},
  ]
  return (
    <section>
      <h3 className="text-xl font-black text-gray-900 mb-4">❓ Palladium FAQ</h3>
      <div className="space-y-2">
        {faqs.map((f,i)=>(
          <div key={i} className={`bg-white rounded-2xl border transition-all ${open===i?'border-purple-300 shadow-md':'border-gray-100 hover:border-purple-200'}`}>
            <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left">
              <span className="font-bold text-gray-900 text-sm leading-snug">{f.q}</span>
              <span className="text-purple-400 font-black flex-shrink-0">{open===i?'▲':'▼'}</span>
            </button>
            {open===i&&<div className="px-5 pb-5"><div className="h-px bg-purple-100 mb-3"/><p className="text-sm text-gray-600 leading-relaxed">{f.a}</p></div>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Page() {
  const { data, loading, refresh } = useCommodityPrices(60)
  const c = data['palladium' as keyof typeof data]
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
        <span className="text-gray-700 font-medium">Palladium Price Calculator</span>
      </nav>
      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900">⚗️ Palladium Price Calculator</h1>
          <p className="text-gray-500 mt-1">Live palladium price per gram and troy oz. Critical for gasoline engine catalytic converters.</p>
        </div>
        <button onClick={refresh} disabled={loading} className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl border border-gray-200">
          <RefreshCw className={`w-3.5 h-3.5 ${loading?'animate-spin':''}`} />Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <CommodityPriceCard commodity={c} emoji="⚗️" loading={loading} />
          <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-gray-600 leading-relaxed">Palladium: ~80% demand from gasoline car catalytic converters. South Africa and Russia supply ~80% of global output. Prices can be highly volatile on supply disruptions.</div>
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
            <h2 className="font-black text-gray-900 mb-5">Calculate Palladium Value</h2>
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

        <div className="rounded-2xl p-5 bg-purple-50 border border-purple-100">
          <p className="text-xs font-bold uppercase tracking-wider mb-3 text-purple-700">📊 Palladium Key Facts — 2026</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[{s:'~$1,000/oz',n:'Palladium spot Q1 2026 — down from $3,000+ in 2021'},{s:'~85%',n:'Palladium demand from gasoline car catalytic converters'},{s:'40% Russia',n:'Russia supplies ~40% of global palladium — supply concentration risk'},{s:'2–7g',n:'Palladium content in a typical gasoline car catalytic converter'},{s:'80%',n:'Russia + South Africa combined global supply share'},{s:'EV headwind',n:'Electric vehicles need no catalytic converter — structural demand risk'}].map((k,i)=>(
              <div key={i} className="bg-white rounded-xl p-3 border border-purple-100"><p className="text-lg font-black text-purple-700">{k.s}</p><p className="text-xs text-gray-500 mt-0.5">{k.n}</p></div>
            ))}
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Palladium Price Calculator — Complete Guide 2026</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p>Palladium is the most industrially specialized of the four major precious metals — approximately 85% of its global demand comes from a single application: catalytic converters in gasoline (petrol) powered vehicles. This concentration made palladium the best-performing commodity on earth in 2018–2021, when supply deficits from concentrated Russian and South African production sent prices from $1,000/oz to over $3,000/oz. The same concentration is now working in reverse as the electric vehicle transition accelerates and automakers actively substitute platinum for palladium in converter formulations.</p>
            <p>For the palladium price calculation itself: like all precious metals, palladium is quoted in USD per troy ounce (31.1035g). Convert to per gram by dividing spot by 31.1035. There is no purity variation for investment purposes — most traded palladium is .9995 fine. The calculator shows per-gram, per-tola (11.6638g), and per-troy-oz prices with a quick reference weight table for common amounts.</p>
            <p>For scrap palladium from catalytic converters: the converter value is calculated from the palladium loading (2–7 grams depending on vehicle) × palladium spot price × recycling yield (typically 60–75% at scrap dealers). Our calculator gives you the spot price baseline — multiply by 0.65 for a realistic scrap value estimate. Track your palladium investment alongside other metals in our <Link href="/commodities/commodity-portfolio-tracker" className="text-purple-700 font-semibold underline underline-offset-2">Portfolio Tracker</Link>.</p>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">🎯 Use Cases</h3>
          <div className="space-y-4">
            {[
              {t:'Valuing Catalytic Converter Scrap',b:'Enter your estimated palladium weight (2–7g for most passenger cars, up to 15g for SUVs or luxury vehicles — check your specific make/model online). The calculator shows spot value. Multiply by 0.65 to estimate realistic scrap dealer payment. Major scrap palladium buyers: local metal recyclers, auto dismantlers. Compare quotes from at least 3 buyers — pricing varies significantly.'},
              {t:'Speculative Position on Supply Disruption',b:'Palladium is one of the most supply-shock-sensitive commodities. A major Russian sanctions escalation, South African mine strike, or natural disaster in the Norilsk mining region could spike prices 30–50% within weeks. Some traders hold small palladium positions specifically for this tail-risk scenario. Use our Precious Metals Profit Calculator to define your target price and stop-loss levels before entering any position.'},
            ].map((u,i)=>(<div key={i} className="border-l-4 border-purple-200 pl-5 py-3 bg-white rounded-r-2xl"><h4 className="font-black text-gray-900 mb-1 text-sm">{u.t}</h4><p className="text-gray-600 text-sm leading-relaxed">{u.b}</p></div>))}
          </div>
        </section>

        <PalladiumFAQ />

        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">🔗 Related Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[{e:'💎',n:'Platinum Calculator',h:'/commodities/platinum-price-calculator',d:'Live platinum — the sibling PGM metal'},{e:'🥇',n:'Gold Price Calculator',h:'/commodities/gold-price-calculator',d:'Live gold karat prices in 5 currencies'},{e:'💰',n:'Precious Metals P&L',h:'/commodities/precious-metals-profit-calculator',d:'ROI, break-even & annualized return on palladium trades'},{e:'🗂️',n:'Portfolio Tracker',h:'/commodities/commodity-portfolio-tracker',d:'Track all 4 metals at live prices'},{e:'🥈',n:'Silver Calculator',h:'/commodities/silver-price-calculator',d:'Live silver by purity — 999, 925, 900, 800'},{e:'🏅',n:'All Commodities',h:'/commodities',d:'Full precious metals & energy price hub'},].map(c=>(<Link key={c.h} href={c.h} className="group bg-white rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all p-4 flex flex-col gap-2"><div className="flex items-center gap-2"><span className="text-2xl">{c.e}</span><p className="font-black text-gray-900 text-sm group-hover:text-purple-700 leading-tight">{c.n}</p></div><p className="text-[11px] text-gray-500 flex-1 leading-relaxed">{c.d}</p><span className="text-xs font-bold text-purple-500 flex items-center gap-1 mt-auto">Open <ArrowRight className="w-3 h-3"/></span></Link>))}
          </div>
        </section>
      </div>
    </div>
  )
}
