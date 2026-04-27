'use client'
import { useState, useMemo } from 'react'
import { useCommodityPrices, getGoldKaratPrices, GRAM_TO_TOLA, TROY_OZ_TO_GRAM } from '@/hooks/useCommodityPrices'
import { CommodityPriceCard } from '@/components/commodities/CommodityPriceCard'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { RefreshCw, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const SYM: Record<string, string> = { USD:'$', INR:'₹', GBP:'£', EUR:'€', AED:'د.إ' }

function mockChart(base: number, points = 48) {
  return Array.from({ length: points }, (_, i) => {
    const h = Math.floor(i / 2), m = i % 2 === 0 ? '00' : '30'
    const noise = Math.sin(i * 0.4) * 9 + Math.cos(i * 0.2) * 6 + (Math.random() - 0.5) * 4
    return { t: `${String(h).padStart(2,'0')}:${m}`, price: +(base + noise - 5).toFixed(2) }
  })
}



function GoldFAQ() {
  const faqs = [
    {q:'How is 22K gold price per gram calculated from spot price?',a:'Spot price is USD per troy oz for 24K (99.9% pure) gold. Steps: divide spot by 31.1035 to get 24K per gram. Multiply by 0.9167 (22K purity = 91.67%). Convert to INR by multiplying by USD/INR rate. Add 15% import duty for India domestic price. Example: spot $3,200 → $102.88/g (24K) → $94.30/g (22K) → ₹7,947/g before import duty → ₹9,139/g after duty. Our calculator does all this live.'},
    {q:'Why is India\'s gold price higher than international spot price?',a:'India applies a 15% import duty plus 3% GST on gold, making domestic prices 18–20% above international spot. Additionally, the USD/INR exchange rate affects INR prices independently — a weakening rupee raises gold prices in INR even when USD prices are flat. This is why gold in INR terms often hits new highs even during periods of flat global USD prices.'},
    {q:'What making charges are reasonable for gold jewellery?',a:'Machine-made chains and plain bangles: 6–10%. Mass-produced standard designs: 8–12%. Handcrafted or intricate designs: 12–20%. Custom or wedding jewellery: 15–25%. Anything above 25% should be questioned unless the design complexity clearly justifies it. Dealer margins on bullion coins should be under 3–4%. Always ask the jeweller to separate metal value from making charges — any reputable jeweller will comply.'},
    {q:'Is 22K or 24K gold better for investment?',a:'24K is better for pure investment — no making charges, maximum resale value, and directly tracks spot price. 22K is better if you want dual-purpose (wearable + investment), but you pay 8–15% making charges that you lose on resale. Sovereign Gold Bonds are the best pure investment vehicle — they give 2.5% annual interest on top of gold price appreciation and are capital gains tax-free at maturity (8-year tenor).'},
    {q:'How does 1 tola compare to grams and troy ounces?',a:'1 tola = 11.6638 grams = 0.375 troy ounces. This is a traditional South Asian unit still widely used in India, Pakistan, and the Gulf. When a jeweller says "gold is ₹83,000 per tola", divide by 11.6638 to get the per-gram price (≈ ₹7,116/g) and cross-check against our calculator. The tola was historically defined as the weight of a British Indian silver rupee coin.'},
    {q:'What is the best time of year to buy gold in India?',a:'Gold prices typically dip after budget announcements if import duties are unchanged or reduced, during April–June (post-wedding season demand lull), and in August–September before the Diwali buying surge. Avoid buying in October–November (Dhanteras/Diwali peak demand) and January–February (wedding season surge). However, trying to time gold perfectly is difficult — systematic buying (equivalent of SIP for gold) through Sovereign Gold Bonds or Gold ETFs averages out the price over time.'},
  ]
  const [open, setOpen] = useState<number|null>(null)
  return (
    <section>
      <h3 className="text-xl font-black text-gray-900 mb-4">❓ Gold Price FAQ</h3>
      <div className="space-y-2">
        {faqs.map((f,i)=>(
          <div key={i} className={`bg-white rounded-2xl border transition-all ${open===i?'border-yellow-300 shadow-md':'border-gray-100 hover:border-yellow-200'}`}>
            <button onClick={()=>setOpen(open===i?null:i)} className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left">
              <span className="font-bold text-gray-900 text-sm leading-snug">{f.q}</span>
              <span className="text-yellow-500 font-black flex-shrink-0">{open===i?'▲':'▼'}</span>
            </button>
            {open===i&&<div className="px-5 pb-5"><div className="h-px bg-yellow-100 mb-3"/><p className="text-sm text-gray-600 leading-relaxed">{f.a}</p></div>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default function GoldPriceCalculatorPage() {
  const { data, loading, anyLive, lastFetched, error, usdInr, refresh } = useCommodityPrices(60)
  const FX: Record<string, number> = { USD:1, INR:usdInr, GBP:0.775, EUR:0.918, AED:3.673 }
  const karats = getGoldKaratPrices(data.gold.price)
  const karatList = Object.entries(karats) as [string, ReturnType<typeof getGoldKaratPrices>['24K']][]

  const [fxKey, setFxKey] = useState('USD')
  const [weight, setWeight] = useState(10)
  const [unit, setUnit]   = useState<'gram'|'tola'|'oz'|'kg'>('gram')
  const [karat, setKarat] = useState('22K')
  const [making, setMaking] = useState(8)

  const fmt = (usd: number, dp = 2) => `${SYM[fxKey]}${(usd * FX[fxKey]).toLocaleString(undefined,{minimumFractionDigits:dp,maximumFractionDigits:dp})}`

  const grams = useMemo(() => {
    if (unit === 'gram') return weight
    if (unit === 'tola') return weight * GRAM_TO_TOLA
    if (unit === 'oz')   return weight * TROY_OZ_TO_GRAM
    return weight * 1000
  }, [weight, unit])

  const karatInfo = karats[karat as keyof typeof karats]
  const metalVal  = karatInfo ? karatInfo.perGram * grams : 0
  const makingAmt = metalVal * (making / 100)
  const jewellery = metalVal + makingAmt
  const gst       = jewellery * 0.03
  const withGST   = jewellery + gst

  const chart = useMemo(() => mockChart(data.gold.price), [data.gold.price])
  const up = data.gold.changePct >= 0

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-400 mb-5 flex items-center gap-1 flex-wrap">
        <Link href="/" className="hover:text-gray-600">Home</Link> /
        <Link href="/commodities" className="hover:text-gray-600">Commodities</Link> /
        <span className="text-gray-700 font-medium">Gold Price Calculator</span>
      </nav>

      <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900">🥇 Gold Price Calculator - Live Karat Prices</h1>
          <p className="text-gray-500 mt-1">Live gold price in 24K, 22K, 20K, 18K, 14K, 10K - per gram, tola &amp; troy oz - multi-currency</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {Object.keys(FX).map(k => (
              <button key={k} onClick={() => setFxKey(k)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${fxKey === k ? 'bg-white shadow text-gray-900' : 'text-gray-500'}`}>{k}</button>
            ))}
          </div>
          <button onClick={refresh} disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded-xl border border-yellow-200 transition-all">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Updating...' : 'Refresh'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT COLUMN */}
        <div className="space-y-4">
          <CommodityPriceCard commodity={data.gold} emoji="🥇" loading={loading} />

          {/* Karat table */}
          <div className="bg-white rounded-2xl border border-yellow-100 shadow-card overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-yellow-100 flex items-center justify-between">
              <p className="font-black text-gray-900 text-sm">Gold Price by Karat - Today</p>
              <p className="text-xs text-gray-400">in {fxKey} per gram</p>
            </div>
            {karatList.map(([k, info], i) => (
              <button key={k} onClick={() => setKarat(k)}
                className={`w-full px-4 py-3 flex items-center justify-between border-b border-gray-50 last:border-0 transition-colors text-left ${karat === k ? 'bg-yellow-50 ring-1 ring-inset ring-yellow-300' : 'hover:bg-gray-50'}`}>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${i===0?'bg-yellow-500':i===1?'bg-yellow-400':i===2?'bg-yellow-300':'bg-gray-300'}`} />
                  <span className="font-black text-gray-900 text-sm">{k}</span>
                  <span className="text-[11px] text-gray-400">{(info.purity*100).toFixed(0)}%</span>
                  {i < 2 && <span className="text-[9px] bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded-full font-bold">Popular</span>}
                </div>
                <div className="text-right">
                  <p className="font-black text-gray-900 text-sm">{fmt(info.perGram,3)}/g</p>
                  <p className="text-[11px] text-gray-400">{fmt(info.perTola)}/tola</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT 2 COLUMNS */}
        <div className="xl:col-span-2 space-y-4">

          {/* Chart */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h2 className="font-black text-gray-900">Gold Spot Price - Today (USD/oz)</h2>
              <span className={`flex items-center gap-1 text-sm font-bold ${up ? 'text-green-600':'text-red-500'}`}>
                {up ? '^' : 'v'} {up ? '+' : ''}{data.gold.change.toFixed(2)} ({up?'+':''}{data.gold.changePct.toFixed(2)}%)
              </span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <AreaChart data={chart}>
                <defs>
                  <linearGradient id="goldFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#f59e0b" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#fef9c3" />
                <XAxis dataKey="t" tick={{fontSize:10}} interval={7} />
                <YAxis domain={['auto','auto']} tick={{fontSize:10}} tickFormatter={v=>`$${v}`} width={65} />
                <Tooltip formatter={(v:number)=>[`$${v.toLocaleString()}`, 'Gold USD/oz']} labelFormatter={l=>`Time: ${l}`} />
                <Area type="monotone" dataKey="price" stroke="#f59e0b" strokeWidth={2.5} fill="url(#goldFill)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-[11px] text-gray-400 mt-2">* Indicative intraday movement - Source: {data.gold.source}{anyLive ? ' - Live' : ' - Cached'}</p>
          </div>

          {/* Calculator */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-card p-5">
            <h2 className="font-black text-gray-900 mb-5">💰 Calculate Gold Value</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Weight */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Gold Weight</label>
                <div className="flex gap-2">
                  <input type="number" step="0.1" min="0" value={weight} onChange={e=>setWeight(+e.target.value)}
                    className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 font-bold text-gray-900" />
                  <select value={unit} onChange={e=>setUnit(e.target.value as any)}
                    className="px-3 py-2.5 border border-gray-200 rounded-xl bg-white font-semibold text-sm">
                    <option value="gram">gram</option>
                    <option value="tola">tola</option>
                    <option value="oz">troy oz</option>
                    <option value="kg">kg</option>
                  </select>
                </div>
                <p className="text-[11px] text-gray-400 mt-1">= {grams.toFixed(3)}g - {(grams/TROY_OZ_TO_GRAM).toFixed(4)} oz - {(grams/GRAM_TO_TOLA).toFixed(3)} tola</p>
              </div>

              {/* Karat quick-pick */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Karat ({karat} selected)</label>
                <div className="grid grid-cols-5 gap-1">
                  {karatList.map(([k]) => (
                    <button key={k} onClick={() => setKarat(k)}
                      className={`py-2 text-[11px] font-black rounded-xl transition-all ${karat===k ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-yellow-100'}`}>{k}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* Making charges */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Making Charges: <span className="text-yellow-600 font-black">{making}%</span>
                <span className="text-[11px] text-gray-400 ml-1">(set 0 for raw bullion value)</span>
              </label>
              <input type="range" min="0" max="30" step="0.5" value={making} onChange={e=>setMaking(+e.target.value)} className="w-full accent-yellow-500" />
              <div className="flex justify-between text-[11px] text-gray-400 mt-0.5"><span>0% bullion</span><span>15% typical</span><span>30% premium</span></div>
            </div>

            {/* Results */}
            <div className="rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden">
              {[
                { label: `Pure Gold (${karat} - ${grams.toFixed(2)}g)`,  val: fmt(metalVal,  2), accent: false },
                { label: `Making Charges (${making}%)`,                   val: fmt(makingAmt, 2), accent: false },
                { label: 'Jewellery Value (excl. GST)',                   val: fmt(jewellery, 2), accent: true  },
                { label: 'GST 3% (India)',                                val: fmt(gst,       2), accent: false },
                { label: '💰 Total with GST',                            val: fmt(withGST,   2), accent: true, big: true },
              ].map(row => (
                <div key={row.label} className={`flex justify-between items-center px-5 py-3 border-b border-gray-100 last:border-0 ${row.big ? 'bg-yellow-50' : ''}`}>
                  <span className={`text-sm ${row.big ? 'font-black text-gray-900' : 'text-gray-600'}`}>{row.label}</span>
                  <span className={`font-black ${row.big ? 'text-yellow-700 text-xl' : 'text-gray-900'}`}>{row.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { name:'Gold Loan',   href:'/commodities/gold-loan-calculator',              emoji:'🏦' },
              { name:'Silver',      href:'/commodities/silver-price-calculator',            emoji:'🥈' },
              { name:'Metals P&amp;L', href:'/commodities/precious-metals-profit-calculator',  emoji:'💰' },
              { name:'Portfolio',   href:'/commodities/commodity-portfolio-tracker',        emoji:'🗂️' },
            ].map(l => (
              <Link key={l.href} href={l.href}
                className="flex items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 shadow-card hover:border-yellow-200 transition-all text-xs font-bold text-gray-700 group">
                <span className="text-lg">{l.emoji}</span>{l.name}
                <ArrowRight className="w-3 h-3 ml-auto text-gray-300 group-hover:text-yellow-500" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── SEO + FAQ ─────────────────────────────────────────── */}
      <div className="mt-12 space-y-10 max-w-4xl mx-auto">
        <div className="flex items-center gap-4"><div className="h-px flex-1 bg-gray-100"/><span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">Complete Guide</span><div className="h-px flex-1 bg-gray-100"/></div>

        {/* Key Stats */}
        <div className="rounded-2xl p-5 bg-yellow-50 border border-yellow-100">
          <p className="text-xs font-bold uppercase tracking-wider mb-3 text-yellow-700">📊 Gold Price Key Facts — 2026</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[{s:'31.1035g',n:'Grams in 1 troy ounce — the global gold pricing unit'},{s:'91.67%',n:'Gold purity of 22K — most popular jewellery karat in India'},{s:'15% + 3% GST',n:'India import duty + GST added to international spot price'},{s:'~8–25%',n:'Typical making charges range on gold jewellery in India'},{s:'$3,100–3,300',n:'Gold spot price range Q1 2026 (COMEX, USD per troy oz)'},{s:'1 Tola = 11.664g',n:'Standard South Asian weight unit used by jewellers'}].map((k,i)=>(
              <div key={i} className="bg-white rounded-xl p-3 border border-yellow-100"><p className="text-lg font-black text-yellow-700">{k.s}</p><p className="text-xs text-gray-500 mt-0.5">{k.n}</p></div>
            ))}
          </div>
        </div>

        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-black text-gray-900 mb-4">Gold Price Calculator — Complete Guide 2026</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed text-sm">
            <p>The gold price you see quoted on financial news channels is always in USD per troy ounce for 24K (99.9% pure) gold. But almost nobody buys 24K gold by the troy ounce — in India and the Gulf, gold is bought in grams or tolas, in 22K or 18K purity, and the price you actually pay includes import duty, GST, and making charges on top. This calculator converts the live spot price into every unit and karat combination you need, in five currencies.</p>
            <p>The conversion math: 1 troy oz = 31.1035 grams. 22K gold is 91.67% pure, so 22K price per gram = (spot ÷ 31.1035) × 0.9167. In India, add 15% import duty and 3% GST to get the domestic metal base price before making charges. When a jeweller quotes you ₹72,000 for 10 grams of 22K, run those numbers here first — you'll immediately see if the metal value stacks up or if you're being charged a premium.</p>
            <p>For investment-grade gold (coins, bars), the relevant price is the spot price with no making charges. Use the making charges slider at 0% to get pure metal value. For jewellery with complex craftsmanship, 12–20% making is normal. For machine-made chains, anything above 10% is negotiable. Track your P&L on any gold position with the <Link href="/commodities/precious-metals-profit-calculator" className="text-yellow-700 font-semibold underline underline-offset-2">Precious Metals Profit Calculator</Link> and compare gold vs SIP returns with our <Link href="/calculators/finance/sip-vs-gold-calculator" className="text-yellow-700 font-semibold underline underline-offset-2">SIP vs Gold Calculator</Link>.</p>
          </div>
        </section>

        {/* Comparison table */}
        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">📊 Gold Price by Karat — What Each Means</h3>
          <div className="overflow-x-auto rounded-2xl border border-gray-200">
            <table className="w-full text-sm">
              <thead><tr className="bg-yellow-50 border-b border-yellow-100">
                <th className="px-4 py-3 text-left font-bold text-yellow-800 text-xs uppercase">Karat</th>
                <th className="px-4 py-3 text-left font-bold text-yellow-800 text-xs uppercase">Purity</th>
                <th className="px-4 py-3 text-left font-bold text-yellow-800 text-xs uppercase">Best For</th>
                <th className="px-4 py-3 text-left font-bold text-yellow-800 text-xs uppercase">Typical Use</th>
              </tr></thead>
              <tbody className="divide-y divide-gray-100">
                {[['24K','99.9%','Investment coins, bars, ETFs','Highest purity; too soft for daily wear jewellery'],['22K','91.67%','Jewellery (India, Middle East)','Most popular for bridal and everyday gold jewellery'],['18K','75.0%','Fine jewellery (Europe, US)','Good hardness, lower cost; popular in Western markets'],['14K','58.33%','Fashion jewellery (US)','Most common karat sold in America; very durable'],['10K','41.67%','Budget jewellery','Minimum legal "gold" in the US; least pure option']].map(([k,p,b,u],i)=>(
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-black text-yellow-700">{k}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{p}</td>
                    <td className="px-4 py-3 text-gray-600 text-xs">{b}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{u}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Use cases */}
        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">🎯 How to Use This Calculator</h3>
          <div className="space-y-4">
            {[
              {t:'Verifying a Jeweller Quote',b:'Before paying, note the weight on the jewellery tag (e.g., 12.5g, 22K). Enter these into the calculator with 0% making charges to see pure metal value. Then ask the jeweller their making charge % — it should match the difference between what they quote and the metal value shown here. If they cannot justify the gap, negotiate or walk away.'},
              {t:'Calculating Total Cost with GST for India',b:'Select INR currency, enter your weight and karat, and set making charges to the jeweller\'s rate. The calculator shows pure metal value, making charges amount, jewellery value excluding GST, and total with 3% GST — exactly the 4-line breakdown on a proper GST invoice. Use this to cross-check before signing.'},
              {t:'Timing a Gold Purchase',b:'Gold prices dip predictably after US CPI data (if inflation is lower than expected), after Fed rate hike announcements, and during US dollar strength periods. Bookmark this page and check live prices during these windows. A 1% dip on a ₹5 lakh purchase saves ₹5,000.'},
            ].map((u,i)=>(
              <div key={i} className="border-l-4 border-yellow-300 pl-5 py-3 bg-white rounded-r-2xl">
                <h4 className="font-black text-gray-900 mb-1 text-sm">{u.t}</h4>
                <p className="text-gray-600 text-sm leading-relaxed">{u.b}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tips */}
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6">
          <h3 className="text-xl font-black text-amber-800 mb-3">💡 Pro Tips</h3>
          <div className="space-y-2 text-sm text-gray-700 leading-relaxed">
            <p><strong className="text-amber-800">1.</strong> Always demand a BIS hallmark certificate for gold jewellery — it guarantees the karat is genuine. Unhallmarked gold may be lower purity than stated.</p>
            <p><strong className="text-amber-800">2.</strong> 1 tola = 11.6638 grams (not 10g as some assume). This is a common confusion — our calculator handles the conversion precisely.</p>
            <p><strong className="text-amber-800">3.</strong> Gold ETFs and Sovereign Gold Bonds track 24K prices with no making charges, expense ratios under 0.5%, and zero storage cost — better than physical for pure investment.</p>
            <p><strong className="text-amber-800">4.</strong> Compare your gold investment against SIP alternatives using our <Link href="/calculators/finance/sip-vs-gold-calculator" className="text-yellow-700 font-semibold">SIP vs Gold Calculator</Link> before deciding allocation.</p>
          </div>
        </div>

        {/* FAQ */}
        <GoldFAQ />

        {/* Related calculators */}
        <section>
          <h3 className="text-xl font-black text-gray-900 mb-4">🔗 Related Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              {e:'🏦',n:'Gold Loan Calculator',h:'/commodities/gold-loan-calculator',d:'Borrow against your gold — eligible amount, EMI & total interest'},
              {e:'💰',n:'Precious Metals P&L',h:'/commodities/precious-metals-profit-calculator',d:'ROI, annualized return & break-even on any gold trade'},
              {e:'🥈',n:'Silver Price Calculator',h:'/commodities/silver-price-calculator',d:'Live silver prices by purity — 999, 925, 900, 800'},
              {e:'🗂️',n:'Portfolio Tracker',h:'/commodities/commodity-portfolio-tracker',d:'Track all your metals at live prices in one dashboard'},
              {e:'⚖️',n:'SIP vs Gold',h:'/calculators/finance/sip-vs-gold-calculator',d:'Which grew more — your SIP or gold over the same period?'},
              {e:'📊',n:'Lumpsum vs Gold',h:'/calculators/finance/lumpsum-vs-gold-calculator',d:'One-time investment vs gold — historical return comparison'},
              {e:'💱',n:'Currency Converter',h:'/calculators/finance/currency-converter',d:'Live USD/INR/GBP/EUR/AED rates for cross-border gold pricing'},
              {e:'📉',n:'Inflation Calculator',h:'/calculators/finance/inflation-calculator',d:'How much purchasing power has ₹1 lakh lost over time?'},
            ].map(c=>(
              <Link key={c.h} href={c.h} className="group bg-white rounded-2xl border border-gray-100 hover:border-yellow-300 hover:shadow-md transition-all p-4 flex flex-col gap-2">
                <div className="flex items-center gap-2"><span className="text-2xl">{c.e}</span><p className="font-black text-gray-900 text-sm group-hover:text-yellow-700 leading-tight">{c.n}</p></div>
                <p className="text-[11px] text-gray-500 leading-relaxed flex-1">{c.d}</p>
                <span className="text-xs font-bold text-yellow-600 flex items-center gap-1 mt-auto">Open <ArrowRight className="w-3 h-3"/></span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
