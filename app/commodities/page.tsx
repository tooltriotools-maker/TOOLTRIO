'use client'
import { useState } from 'react'
import { useCommodityPrices, getGoldKaratPrices, COMMODITY_META, type CommodityData } from '@/hooks/useCommodityPrices'
import { CommodityPriceCard } from '@/components/commodities/CommodityPriceCard'
import Link from 'next/link'
import { RefreshCw, TrendingUp, TrendingDown, Clock, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react'

const PRECIOUS: (keyof CommodityData)[] = ['gold','silver','platinum','palladium']
const ENERGY:   (keyof CommodityData)[] = ['crude_wti','crude_brent','natural_gas','copper']
const AGRI:     (keyof CommodityData)[] = ['wheat','corn']

const CALCS = [
  { name: 'Gold Price Calculator',     desc: '24K/22K/20K/18K/14K/10K live karat prices, per gram & tola',  href: '/commodities/gold-price-calculator',             emoji: '🥇', hot: true  },
  { name: 'Silver Price Calculator',   desc: 'Live silver by purity: 999/925/900/800 per gram & oz',          href: '/commodities/silver-price-calculator',           emoji: '🥈', hot: false },
  { name: 'Platinum Calculator',       desc: 'Live platinum price per gram, pennyweight, troy oz',            href: '/commodities/platinum-price-calculator',         emoji: '💎', hot: false },
  { name: 'Palladium Calculator',      desc: 'Palladium price - auto-catalyst value estimator',               href: '/commodities/palladium-price-calculator',        emoji: '⚗️', hot: false },
  { name: 'Crude Oil (WTI)',           desc: 'WTI price per barrel, gallon, liter and metric ton',            href: '/commodities/crude-oil-calculator',              emoji: '🛢️', hot: false },
  { name: 'Brent Crude Calculator',    desc: 'Global benchmark oil - barrel, gallon, litre cost',            href: '/commodities/brent-crude-calculator',            emoji: '⛽', hot: false },
  { name: 'Natural Gas Calculator',    desc: 'Price per MMBtu, therm, cubic foot & cubic meter',              href: '/commodities/natural-gas-calculator',            emoji: '🔥', hot: false },
  { name: 'Gold Loan Calculator',      desc: 'Loan against gold - LTV, EMI & interest breakdown',            href: '/commodities/gold-loan-calculator',              emoji: '🏦', hot: true  },
  { name: 'Precious Metals P&amp;L',      desc: 'Buy/sell profit for gold, silver, platinum &amp; palladium',       href: '/commodities/precious-metals-profit-calculator', emoji: '💰', hot: false },
  { name: 'Commodity Portfolio',       desc: 'Track your entire commodity portfolio at live prices',          href: '/commodities/commodity-portfolio-tracker',       emoji: '🗂️', hot: false },
]

const SYM: Record<string, string> = { USD:'$', INR:'₹', GBP:'£', EUR:'€', AED:'د.إ' }


/* ─── FAQ data ─────────────────────────────────────────────── */
const FAQS = [
  {
    q: 'How is the live gold price per gram calculated from the spot price?',
    a: `The spot price of gold is quoted in troy ounces on global exchanges (COMEX, LBMA). One troy ounce equals 31.1035 grams. To get price per gram: divide spot by 31.1035. For karat gold, multiply by the purity factor — 22K is 91.67% pure, so 22K price per gram = (spot ÷ 31.1035) × 0.9167. Our [Gold Price Calculator](/commodities/gold-price-calculator) does this live for all karats (24K, 22K, 20K, 18K, 14K, 10K) and converts to gram, tola, and troy oz simultaneously.`,
  },
  {
    q: 'What is the difference between gold spot price and jewellery price?',
    a: `Spot price is the raw cost of pure (24K) gold on the commodity exchange with no fabrication. Jewellery price adds three layers on top: (1) Making charges — 8–25% of metal value depending on design complexity; (2) Hallmarking and certification costs; (3) Retailer margin. In India, a jeweller's price for 22K gold is typically 12–18% above the pure metal value. Our [Gold Price Calculator](/commodities/gold-price-calculator) shows the exact metal value with an adjustable making-charges slider (0–30%) so you can verify what you're being charged.`,
  },
  {
    q: 'Should I invest in gold, silver, or platinum right now?',
    a: `Each metal serves a different purpose in a portfolio. Gold is the primary inflation hedge and safe-haven asset — it has returned ~10.6% CAGR over the last 20 years (World Gold Council). Silver is more volatile (gold-silver ratio currently 80–90:1 vs. historical average of 60:1), meaning silver is historically undervalued relative to gold. Platinum trades below gold despite being rarer — it's largely an industrial metal tied to automotive catalytic converter demand. Use our [Precious Metals Profit Calculator](/commodities/precious-metals-profit-calculator) to model buy/sell scenarios across all four metals before committing.`,
  },
  {
    q: 'What does the gold-silver ratio tell me about when to buy?',
    a: `The gold-silver ratio is simply the gold price divided by the silver price. When it's above 80, silver is considered cheap relative to gold — historically a buying signal for silver. When it's below 50, gold is relatively cheap. In April 2026, the ratio sits around 88, suggesting silver is historically undervalued. Our [Silver Price Calculator](/commodities/silver-price-calculator) shows live silver prices per gram and ounce, so you can track the ratio in real time and use the [Precious Metals P&L Calculator](/commodities/precious-metals-profit-calculator) to model a rotation trade.`,
  },
  {
    q: 'How does a Gold Loan work and how much can I borrow?',
    a: `A gold loan lets you pledge your gold jewellery or coins as collateral to a bank or NBFC in exchange for immediate cash — no credit score required. The Loan-to-Value (LTV) ratio in India is capped at 75% by the RBI, meaning you can borrow up to ₹75 for every ₹100 of gold value. Interest rates range from 7% to 24% p.a. depending on the lender. Our [Gold Loan Calculator](/commodities/gold-loan-calculator) computes eligible loan amount, monthly EMI, and total interest for your exact weight and karat, so you know your real cost before walking into the bank.`,
  },
  {
    q: 'What is palladium used for and why is it so expensive?',
    a: `Palladium is used primarily in catalytic converters for petrol (gasoline) vehicles — roughly 85% of global demand comes from automotive manufacturing. It is rarer than gold in the Earth's crust, with the majority of supply coming from Russia (40%) and South Africa (38%). Supply disruptions from these regions (sanctions, mining strikes) cause sharp price spikes. At ~$1,000/oz, palladium trades close to gold but with much higher volatility. Our [Palladium Price Calculator](/commodities/palladium-price-calculator) shows live prices per gram, pennyweight, and troy ounce, and the [Commodity Portfolio Tracker](/commodities/commodity-portfolio-tracker) lets you monitor palladium alongside your other holdings.`,
  },
  {
    q: 'How do I track my total precious metals portfolio value?',
    a: `Most investors hold a mix — some gold jewellery, silver coins, maybe platinum bars — but have no single view of total value. Our [Commodity Portfolio Tracker](/commodities/commodity-portfolio-tracker) lets you enter each holding (metal type, quantity, unit, purchase price) and instantly see your total portfolio value at live prices, unrealized gain/loss per position, and overall P&L. For detailed trade-by-trade analysis, the [Precious Metals Profit Calculator](/commodities/precious-metals-profit-calculator) computes ROI, annualized return, and break-even price including dealer fees.`,
  },
  {
    q: 'Is gold a good hedge against inflation and rupee depreciation?',
    a: `Gold has historically been one of the strongest hedges against both inflation and currency devaluation. The rupee has depreciated roughly 65% against the USD over the last 20 years (from ~45 to ~83), meaning even a flat USD gold price would have delivered a 65% return in rupee terms. In 2020, gold in INR hit an all-time high despite being range-bound in USD terms — because of rupee weakness. For a direct comparison of gold vs. SIP returns in your specific scenario, use our [SIP vs Gold Calculator](/calculators/finance/sip-vs-gold-calculator) and [Lumpsum vs Gold Calculator](/calculators/finance/lumpsum-vs-gold-calculator).`,
  },
  {
    q: 'What is the difference between troy ounce and regular ounce for precious metals?',
    a: `All precious metals are priced in troy ounces, NOT regular (avoirdupois) ounces. 1 troy ounce = 31.1035 grams. 1 regular ounce = 28.3495 grams. So a troy ounce is about 10% heavier than a regular ounce. This distinction matters: if you see gold at "$3,200/oz" that's $3,200 per troy ounce = $102.88/gram. Our calculators always use troy ounce as the base unit and clearly display per-gram and per-tola conversions so there's no ambiguity when you compare prices across dealers.`,
  },
  {
    q: 'How are precious metal prices affected by the US dollar strength?',
    a: `Precious metals are globally priced in USD, so there is a strong inverse correlation between the US Dollar Index (DXY) and gold/silver prices. When the dollar strengthens (DXY rises), gold typically falls in USD terms — but the drop may be muted or reversed in local currency terms. When the Fed cuts rates or prints money, the dollar weakens and gold rallies. In 2020–2021, aggressive Fed stimulus drove gold from $1,500 to $2,000/oz. Our live price feed reflects the current spot in USD with real-time conversion to INR, GBP, EUR, and AED so you always see the true local currency impact.`,
  },
]

/* ─── FAQ accordion component ───────────────────────────────── */
function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)
  return (
    <section className="mb-10" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="text-2xl font-black text-gray-900 mb-2">
        ❓ Precious Metals FAQ — Everything You Need to Know
      </h2>
      <p className="text-sm text-gray-500 mb-6">Detailed answers to the most common questions about gold, silver, platinum & palladium investing, pricing, and calculations.</p>
      <div className="space-y-2">
        {FAQS.map((faq, i) => (
          <div key={i} className={`bg-white rounded-2xl border transition-all ${open === i ? 'border-yellow-300 shadow-md' : 'border-gray-100 hover:border-yellow-200'}`}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={open === i}
            >
              <span className="font-bold text-gray-900 text-sm leading-snug">{faq.q}</span>
              {open === i
                ? <ChevronUp className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
              }
            </button>
            {open === i && (
              <div className="px-5 pb-5">
                <div className="h-px bg-yellow-100 mb-4" />
                <p className="text-sm text-gray-600 leading-relaxed">
                  {faq.a.split(/(\[.*?\]\(.*?\))/g).map((part, j) => {
                    const m = part.match(/^\[(.+?)\]\((.+?)\)$/)
                    if (m) return <Link key={j} href={m[2]} className="text-yellow-700 font-semibold underline underline-offset-2 hover:text-yellow-800">{m[1]}</Link>
                    return <span key={j}>{part}</span>
                  })}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── Related calculators ────────────────────────────────────── */
const RELATED_CALCS = [
  { emoji: '🥇', name: 'Gold Price Calculator',                href: '/commodities/gold-price-calculator',                  desc: 'Live 24K–10K prices per gram, tola & troy oz with making charges & GST' },
  { emoji: '🥈', name: 'Silver Price Calculator',              href: '/commodities/silver-price-calculator',                desc: 'Live silver by purity: 999 / 925 / 900 / 800 per gram and troy oz' },
  { emoji: '💎', name: 'Platinum Price Calculator',            href: '/commodities/platinum-price-calculator',              desc: 'Live platinum per gram, pennyweight, and troy oz — updated every minute' },
  { emoji: '⚗️', name: 'Palladium Price Calculator',           href: '/commodities/palladium-price-calculator',             desc: 'Auto-catalyst value estimator with live palladium prices per gram & oz' },
  { emoji: '💰', name: 'Precious Metals Profit Calculator',    href: '/commodities/precious-metals-profit-calculator',      desc: 'Buy/sell P&L, ROI, annualized return, and break-even for all 4 metals' },
  { emoji: '🏦', name: 'Gold Loan Calculator',                 href: '/commodities/gold-loan-calculator',                   desc: 'Loan amount (75% LTV), EMI, and total interest against your gold holdings' },
  { emoji: '🗂️', name: 'Commodity Portfolio Tracker',          href: '/commodities/commodity-portfolio-tracker',            desc: 'Track your full portfolio — gold, silver, platinum, palladium — at live prices' },
  { emoji: '⚖️', name: 'SIP vs Gold Calculator',               href: '/calculators/finance/sip-vs-gold-calculator',         desc: 'Mutual fund SIP vs physical gold — which built more wealth over your period?' },
  { emoji: '📊', name: 'Lumpsum vs Gold Calculator',           href: '/calculators/finance/lumpsum-vs-gold-calculator',     desc: 'One-time stock/fund investment vs gold — historical return comparison' },
  { emoji: '📈', name: 'Inflation Calculator',                 href: '/calculators/finance/inflation-calculator',           desc: 'How much purchasing power has the rupee lost? See what ₹1 lakh is worth today' },
  { emoji: '💱', name: 'Currency Converter',                   href: '/calculators/finance/currency-converter',             desc: 'USD ↔ INR ↔ GBP ↔ EUR ↔ AED live exchange rates for cross-border gold trades' },
  { emoji: '📉', name: 'Crypto Profit Calculator',             href: '/calculators/finance/crypto-profit-calculator',       desc: 'Compare gold returns vs Bitcoin and altcoin trades side by side' },
]

function RelatedCalculators() {
  return (
    <section className="mb-10" aria-labelledby="related-calcs-heading">
      <h2 id="related-calcs-heading" className="text-2xl font-black text-gray-900 mb-2">🔗 Related Calculators</h2>
      <p className="text-sm text-gray-500 mb-5">Every tool you need for precious metals investing, pricing, and portfolio tracking — all with live spot prices.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {RELATED_CALCS.map(c => (
          <Link key={c.href} href={c.href}
            className="group bg-white rounded-2xl border border-gray-100 hover:border-yellow-300 hover:shadow-md transition-all p-4 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{c.emoji}</span>
              <p className="font-black text-gray-900 text-sm group-hover:text-yellow-700 transition-colors leading-tight">{c.name}</p>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed flex-1">{c.desc}</p>
            <span className="text-xs font-bold text-yellow-600 flex items-center gap-1 mt-auto">Open <ArrowRight className="w-3 h-3" /></span>
          </Link>
        ))}
      </div>
    </section>
  )
}

/* ─── SEO rich text section ──────────────────────────────────── */
function PreciousMetalsSEO() {
  return (
    <section className="mb-10 max-w-4xl" aria-labelledby="seo-guide-heading">
      {/* Divider */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px flex-1 bg-gray-100" />
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest px-3">Complete Guide</span>
        <div className="h-px flex-1 bg-gray-100" />
      </div>

      {/* Key Stats */}
      <div className="rounded-2xl p-5 bg-yellow-50 border border-yellow-100 mb-8">
        <p className="text-xs font-bold uppercase tracking-wider mb-3 text-yellow-700">📊 Key Data Points — Precious Metals 2026</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { stat: '$3,100–$3,300/oz', source: 'Gold spot price range, Q1 2026 (COMEX)' },
            { stat: '~88:1', source: 'Gold-Silver ratio April 2026 — silver historically cheap' },
            { stat: '₹8,800+/gram', source: 'Gold 24K price in India, April 2026 (INR terms)' },
            { stat: '75% LTV', source: 'RBI maximum gold loan ratio for NBFCs (2024 circular)' },
            { stat: '~10.6% CAGR', source: 'Gold 20-year return in USD terms (World Gold Council)' },
            { stat: '31.1035g', source: '1 troy ounce — the global unit for all metal pricing' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-xl p-3 border border-yellow-100">
              <p className="text-lg font-black text-yellow-700">{s.stat}</p>
              <p className="text-xs text-gray-500 mt-0.5">{s.source}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Introduction */}
      <h2 id="seo-guide-heading" className="text-2xl font-black text-gray-900 mb-4">
        Precious Metals Price Calculators — Complete India & Global Guide 2026
      </h2>
      <div className="space-y-4 text-gray-600 leading-relaxed text-base mb-8">
        <p>
          Gold, silver, platinum, and palladium are the four precious metals that form the backbone of both retail jewellery markets and institutional investment portfolios worldwide. Yet most people — whether buying their first gold bangle or managing a serious commodity allocation — lack a single, reliable tool to calculate what their metals are actually worth right now, at the correct karat or purity, in their local currency. This is exactly the gap our <Link href="/commodities/gold-price-calculator" className="text-yellow-700 font-semibold underline underline-offset-2 hover:text-yellow-800">Gold Price Calculator</Link>, <Link href="/commodities/silver-price-calculator" className="text-yellow-700 font-semibold underline underline-offset-2 hover:text-yellow-800">Silver Price Calculator</Link>, and the full suite of commodity tools on this page are built to fill.
        </p>
        <p>
          The live prices you see here are sourced from open commodity feeds updated every 60 seconds. Gold is displayed across all six karats (24K, 22K, 20K, 18K, 14K, and 10K) in five currencies (USD, INR, GBP, EUR, AED) with per-gram, per-tola, and per-troy-oz breakdowns — the exact units used by jewellers in Mumbai, Dubai, and London respectively. Silver is displayed at .999 fine, .925 sterling, .900 coin silver, and .800 European silver purity levels.
        </p>
        <p>
          For investors, the key number is not just the current price — it is the <strong className="text-gray-900">net profit or loss on your position</strong> after accounting for the dealer's buy/sell spread (typically 1–3% each way). Use our <Link href="/commodities/precious-metals-profit-calculator" className="text-yellow-700 font-semibold underline underline-offset-2 hover:text-yellow-800">Precious Metals Profit Calculator</Link> to enter your exact buy price, quantity, and fees for gold, silver, platinum, or palladium and see your real ROI and annualized return in seconds. It also shows the P&L scenario chart — what happens to your profit if the price moves ±5%, ±10%, ±20% from where you bought.
        </p>
      </div>

      {/* Understanding Precious Metal Pricing */}
      <div className="rounded-2xl p-6 border border-yellow-100 bg-yellow-50 mb-8">
        <h3 className="text-xl font-black text-yellow-800 mb-4">🔬 How Precious Metal Prices Are Set</h3>
        <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
          <p>
            Gold and silver spot prices are determined by the COMEX (Commodity Exchange) in New York and the LBMA (London Bullion Market Association) in London — the two dominant price-setting venues globally. The <strong>"spot price"</strong> is the price for immediate delivery of one troy ounce of .999 fine metal. It moves 24 hours a day, 5 days a week, driven by macro factors: US Federal Reserve interest rate decisions, dollar index movements, geopolitical risk, central bank buying (China and India together bought over 1,000 tonnes of gold in 2023), and ETF flows.
          </p>
          <p>
            Platinum and palladium prices follow a different driver profile — both are platinum group metals (PGMs) used intensively in catalytic converters. Palladium is used in petrol/gasoline converters while platinum is used in diesel converters. The transition to electric vehicles is a structural headwind for palladium demand long-term, which has contributed to its price decline from $3,000+/oz in 2021 to ~$1,000/oz in 2026. Use our <Link href="/commodities/palladium-price-calculator" className="text-yellow-700 font-semibold underline underline-offset-2 hover:text-yellow-800">Palladium Calculator</Link> and <Link href="/commodities/platinum-price-calculator" className="text-yellow-700 font-semibold underline underline-offset-2 hover:text-yellow-800">Platinum Calculator</Link> to track live prices and evaluate whether current levels represent attractive entry points.
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <h3 className="text-xl font-black text-gray-900 mb-4">📊 Gold vs Silver vs Platinum vs Palladium — Side-by-Side 2026</h3>
      <div className="overflow-x-auto rounded-2xl border border-gray-200 mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-yellow-50 border-b border-yellow-100">
              <th className="px-4 py-3 text-left font-bold text-yellow-800 text-xs uppercase tracking-wider">Metal</th>
              <th className="px-4 py-3 text-left font-bold text-yellow-800 text-xs uppercase tracking-wider">Approx Price/oz</th>
              <th className="px-4 py-3 text-left font-bold text-yellow-800 text-xs uppercase tracking-wider">Primary Use</th>
              <th className="px-4 py-3 text-left font-bold text-yellow-800 text-xs uppercase tracking-wider">Volatility</th>
              <th className="px-4 py-3 text-left font-bold text-yellow-800 text-xs uppercase tracking-wider">Calculator</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {[
              { m: '🥇 Gold', price: '~$3,200', use: 'Safe haven, jewellery, central bank reserve', vol: 'Low–Medium', href: '/commodities/gold-price-calculator' },
              { m: '🥈 Silver', price: '~$36', use: 'Industrial (solar, EVs), jewellery, investment', vol: 'Medium–High', href: '/commodities/silver-price-calculator' },
              { m: '💎 Platinum', price: '~$960', use: 'Diesel catalytic converters, jewellery', vol: 'Medium', href: '/commodities/platinum-price-calculator' },
              { m: '⚗️ Palladium', price: '~$980', use: 'Petrol catalytic converters, electronics', vol: 'High', href: '/commodities/palladium-price-calculator' },
            ].map((row, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-gray-800">{row.m}</td>
                <td className="px-4 py-3 font-black text-yellow-700">{row.price}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{row.use}</td>
                <td className="px-4 py-3 text-gray-600 text-xs">{row.vol}</td>
                <td className="px-4 py-3"><Link href={row.href} className="text-yellow-700 font-bold text-xs underline hover:text-yellow-800">Calculator →</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gold in India section */}
      <h3 className="text-xl font-black text-gray-900 mb-3">🇮🇳 Gold Prices in India — What You're Actually Paying</h3>
      <div className="space-y-3 text-gray-600 leading-relaxed text-sm mb-8">
        <p>
          India is the world's second-largest gold consumer (after China), importing 700–800 tonnes annually. The domestic price of gold is the international spot price converted to INR, plus a 15% import duty and 3% GST. This means Indian gold prices can diverge significantly from global prices during periods of rupee weakness or changes in import duty — as happened in 2013 when the government raised import duty from 4% to 10% overnight, creating a ₹2,000/10g gap between international and domestic prices.
        </p>
        <p>
          For jewellery buyers, the price you pay includes: pure metal value (calculated using our <Link href="/commodities/gold-price-calculator" className="text-yellow-700 font-semibold underline underline-offset-2 hover:text-yellow-800">Gold Price Calculator</Link>) + making charges (8–25% depending on design) + 3% GST on the total. A 22K gold chain of 10 grams at ₹7,200/gram (metal value) with 12% making charges costs: ₹72,000 + ₹8,640 making + ₹2,419 GST = ₹83,059 total. Always verify the pure metal component against our live calculator before negotiating.
        </p>
        <p>
          For gold loans, the RBI mandates that lenders can advance a maximum of 75% of the gold's value (LTV ratio). If you have 50 grams of 22K gold worth ₹3,60,000, the maximum loan is ₹2,70,000. Our <Link href="/commodities/gold-loan-calculator" className="text-yellow-700 font-semibold underline underline-offset-2 hover:text-yellow-800">Gold Loan Calculator</Link> computes eligible loan amount, monthly EMI breakdown across different tenure options (3 months to 3 years), and total interest cost — critical for comparing offers from Muthoot, Manappuram, and your local bank.
        </p>
      </div>

      {/* Investment use cases */}
      <h3 className="text-xl font-black text-gray-900 mb-4">🎯 How to Use These Calculators — Real Scenarios</h3>
      <div className="space-y-4 mb-8">
        {[
          {
            title: 'Buying Gold Jewellery — Verify Before You Pay',
            text: 'Before visiting a jeweller, open the Gold Price Calculator, enter your target weight (e.g., 20 grams of 22K), and note the pure metal value. Then add the jeweller\'s making charges (ask them what % they charge). If their total price is more than 20% above the metal value, you\'re overpaying for making charges. Use this as your negotiation baseline. Track live gold prices with our real-time feed to catch the right buying window — gold often dips 1–2% after a US CPI data release.',
          },
          {
            title: 'Tracking Investment Returns on Bullion',
            text: 'If you bought 100 grams of silver at ₹72/gram last year and want to know your exact P&L today including the 2% dealer sell commission, open the Precious Metals Profit Calculator, select silver, enter buy price, quantity, and fees. The calculator shows net profit in INR and %, annualized return, and your exact break-even price — all updated at the live silver price.',
          },
          {
            title: 'Deciding Between Gold ETF vs Physical Gold',
            text: 'Physical gold has storage and insurance costs (0.3–0.5% p.a.) plus making charges at purchase. Gold ETFs have expense ratios of 0.4–0.6% p.a. and no storage cost, but no jewellery utility. Sovereign Gold Bonds (SGBs) offer 2.5% p.a. interest on top of gold price appreciation and are capital gains tax-free at maturity. Use our SIP vs Gold Calculator to compare a monthly SGB/ETF purchase against an equivalent SIP in equity mutual funds over your investment horizon.',
          },
        ].map((uc, i) => (
          <div key={i} className="border-l-4 border-yellow-300 pl-5 bg-white rounded-r-2xl py-4 pr-4">
            <h4 className="font-black text-gray-900 mb-2 text-sm">{uc.title}</h4>
            <p className="text-gray-600 text-sm leading-relaxed">{uc.text}</p>
          </div>
        ))}
      </div>

      {/* Tips section */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-black text-amber-800 mb-4">💡 Pro Tips for Precious Metal Buyers & Investors</h3>
        <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
          <p><strong className="text-amber-800">1. Always calculate metal value independently.</strong> Before any gold purchase, run the weight and karat through our <Link href="/commodities/gold-price-calculator" className="text-yellow-700 font-semibold">Gold Price Calculator</Link>. Retailers sometimes use a slightly lower rate than the current market price when computing making charges.</p>
          <p><strong className="text-amber-800">2. Watch the gold-silver ratio.</strong> Historically, the ratio averages around 60:1. At 88:1 (April 2026), silver is historically cheap relative to gold. Many sophisticated investors rotate from gold to silver when the ratio is above 80 and back when below 50.</p>
          <p><strong className="text-amber-800">3. Account for bid-ask spread in profit calculations.</strong> The spot price is theoretical — you buy at the ask (spot + dealer premium, typically 2–4% for coins) and sell at the bid (spot minus dealer discount, typically 1–2%). A coin bought at +3% premium and sold at -1% discount means you need gold to rise 4% just to break even. Our <Link href="/commodities/precious-metals-profit-calculator" className="text-yellow-700 font-semibold">P&L Calculator</Link> includes separate buy and sell fee fields for this reason.</p>
          <p><strong className="text-amber-800">4. Track your portfolio holistically.</strong> Don't track each metal purchase in isolation — use the <Link href="/commodities/commodity-portfolio-tracker" className="text-yellow-700 font-semibold">Commodity Portfolio Tracker</Link> to see your total precious metals exposure, average cost per ounce, and overall gain/loss at live prices.</p>
          <p><strong className="text-amber-800">5. Compare gold against other inflation hedges.</strong> Gold is not the only inflation hedge — I-Bonds, TIPS, REITs, and equities all protect against inflation differently. Use our <Link href="/calculators/finance/inflation-calculator" className="text-yellow-700 font-semibold">Inflation Calculator</Link> to quantify what you need your investment to return just to maintain purchasing power.</p>
        </div>
      </div>

      {/* Conclusion */}
      <div className="rounded-2xl p-6 border-2 border-yellow-200 bg-white">
        <h3 className="text-xl font-black text-gray-900 mb-4">🏁 Bottom Line</h3>
        <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
          <p>
            Precious metals — gold, silver, platinum, palladium — remain essential components of a diversified portfolio and the foundation of retail jewellery in India and across the Gulf. The challenge has always been getting <em>accurate, current pricing</em> in the right unit (grams, not just troy ounces), the right currency (INR or AED, not just USD), and the right purity (22K, not just 24K). Our calculator suite solves this with live spot feeds and instant conversion across every meaningful unit, purity, and currency combination.
          </p>
          <p>
            Whether you are a first-time jewellery buyer checking that you're not being overcharged, a serious investor calculating your true ROI after fees, someone pledging gold for a loan, or a hobbyist tracking a diversified commodity portfolio — the tools above give you the numbers you need in seconds, with no sign-up required.
          </p>
          <p>
            Start with the <Link href="/commodities/gold-price-calculator" className="text-yellow-700 font-semibold underline">Gold Price Calculator</Link> for today's live karat prices, use the <Link href="/commodities/precious-metals-profit-calculator" className="text-yellow-700 font-semibold underline">Precious Metals Profit Calculator</Link> to analyze any trade, and track your total exposure with the <Link href="/commodities/commodity-portfolio-tracker" className="text-yellow-700 font-semibold underline">Portfolio Tracker</Link>. All live, all free, all accurate.
          </p>
        </div>
      </div>
    </section>
  )
}

export default function CommoditiesPage() {
  const { data, loading, anyLive, lastFetched, refresh, usdInr } = useCommodityPrices(60)
  const FX: Record<string, number> = { USD:1, INR:usdInr, GBP:0.775, EUR:0.918, AED:3.673 }
  const [fxKey, setFxKey] = useState<keyof typeof FX>('USD')
  const goldKarats = getGoldKaratPrices(data.gold.price)
  const fmt = (usd: number, dp = 2) => `${SYM[fxKey]}${(usd * FX[fxKey]).toLocaleString(undefined, { minimumFractionDigits: dp, maximumFractionDigits: dp })}`

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* -- Hero ------------------------------------------------ */}
      <div className="flex flex-wrap items-start gap-3 mb-8">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-100 border border-yellow-300 text-yellow-800 text-[11px] font-black uppercase tracking-wider">
              <span className={`w-1.5 h-1.5 rounded-full ${anyLive ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              {anyLive ? '🟢 Live Prices' : '🟡 Cached Prices'}
            </span>
            {lastFetched && (
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3 h-3" />Updated {lastFetched.toLocaleTimeString()}
              </span>
            )}
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-1">🏅 Commodity Prices &amp; Calculators</h1>
          <p className="text-gray-500 max-w-2xl">Live gold, silver, platinum, palladium, crude oil (WTI &amp; Brent), and natural gas prices with calculators. Gold shown in 24K, 22K, 20K, 18K, 14K and 10K.</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* FX selector */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
            {Object.keys(FX).map(k => (
              <button key={k} onClick={() => setFxKey(k)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${fxKey === k ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>{k}</button>
            ))}
          </div>
          <button onClick={refresh} disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:border-gray-300 transition-all disabled:opacity-50">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* -- Gold Karat Live Table -------------------------------- */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-black text-gray-900 flex items-center gap-2">
              🥇 Gold Price Today - Live by Karat
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Spot: <strong className={data.gold.changePct >= 0 ? 'text-green-600' : 'text-red-500'}>{SYM[fxKey]}{(data.gold.price * FX[fxKey]).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}/oz</strong>
              &nbsp;&nbsp;
              <span className={`font-bold ${data.gold.changePct >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                {data.gold.changePct >= 0 ? '^' : 'v'} {Math.abs(data.gold.changePct).toFixed(2)}%
              </span>
              &nbsp;today - {data.gold.source}
            </p>
          </div>
          <Link href="/commodities/gold-price-calculator" className="text-sm font-bold text-yellow-700 hover:text-yellow-800 flex items-center gap-1">
            Gold Calculator <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-yellow-100 shadow-card overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-5 px-5 py-2.5 bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-yellow-100 text-[11px] font-black text-gray-500 uppercase tracking-widest">
            <span>Karat</span><span>Purity</span><span>Per Gram</span><span>Per Tola</span><span>Per Troy Oz</span>
          </div>
          {(Object.entries(goldKarats) as [string, ReturnType<typeof getGoldKaratPrices>['24K']][]).map(([karat, info], i) => (
            <div key={karat} className={`grid grid-cols-5 px-5 py-3 border-b border-gray-50 last:border-0 items-center ${i < 2 ? 'bg-yellow-50/60' : 'hover:bg-gray-50'} transition-colors`}>
              <div className="flex items-center gap-2">
                <span className="font-black text-gray-900">{karat}</span>
                {i < 2 && <span className="text-[10px] px-1.5 py-0.5 bg-yellow-200 text-yellow-800 rounded-full font-bold">Popular</span>}
              </div>
              <span className="text-gray-500 text-sm">{(info.purity * 100).toFixed(1)}%</span>
              <span className="font-black text-gray-900">{fmt(info.perGram, 3)}</span>
              <span className="font-bold text-gray-700">{fmt(info.perTola)}</span>
              <span className="font-bold text-gray-700">{fmt(info.perOz)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* -- Precious Metals ------------------------------------- */}
      <section className="mb-10">
        <h2 className="text-xl font-black text-gray-900 mb-4">🏅 Precious Metals - Live Spot Prices</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRECIOUS.map(key => (
            <CommodityPriceCard key={key} commodity={data[key]} emoji={COMMODITY_META[key].emoji}
              href={COMMODITY_META[key].href} loading={loading} />
          ))}
        </div>
      </section>

      {/* -- Energy ---------------------------------------------- */}
      <section className="mb-10">
        <h2 className="text-xl font-black text-gray-900 mb-4">⚡ Energy Commodities - Live Prices</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ENERGY.map(key => (
            <CommodityPriceCard key={key} commodity={data[key]} emoji={COMMODITY_META[key].emoji}
              href={COMMODITY_META[key].href !== '/commodities' ? COMMODITY_META[key].href : undefined}
              loading={loading} />
          ))}
        </div>
      </section>

      {/* -- Market Summary -------------------------------------- */}
      <section className="mb-10">
        <h2 className="text-xl font-black text-gray-900 mb-4">📊 Today's Market Summary</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
          <div className="grid grid-cols-4 sm:grid-cols-8 px-4 py-2 bg-gray-50 border-b border-gray-100 text-[11px] font-black text-gray-400 uppercase tracking-wider">
            <span className="col-span-2">Commodity</span><span className="hidden sm:block">Price</span><span className="hidden sm:block">Change</span><span className="hidden sm:block">%</span><span className="hidden sm:block">Unit</span><span className="hidden sm:block">Source</span><span>Status</span>
          </div>
          {(Object.entries(data) as [keyof CommodityData, typeof data[keyof CommodityData]][]).map(([key, c]) => {
            const up = c.changePct >= 0
            return (
              <Link key={key} href={COMMODITY_META[key].href}
                className="grid grid-cols-4 sm:grid-cols-8 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors items-center">
                <div className="col-span-2 flex items-center gap-2">
                  <span className="text-lg">{COMMODITY_META[key].emoji}</span>
                  <span className="font-bold text-gray-900 text-sm">{c.name}</span>
                </div>
                <span className="hidden sm:block font-black text-gray-900">${c.price.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</span>
                <span className={`hidden sm:block font-bold text-sm ${up ? 'text-green-600' : 'text-red-500'}`}>{up ? '+' : ''}{c.change.toFixed(2)}</span>
                <span className={`hidden sm:block font-bold text-sm ${up ? 'text-green-600' : 'text-red-500'}`}>{up ? '+' : ''}{c.changePct.toFixed(2)}%</span>
                <span className="hidden sm:block text-xs text-gray-400">{c.unit}</span>
                <span className="hidden sm:block text-xs text-gray-400 truncate">{c.source}</span>
                <span>{c.live ? <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200"><span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />LIVE</span> : <span className="text-[10px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full border border-gray-200">CACHED</span>}</span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* -- All Calculators ------------------------------------- */}
      <section className="mb-10">
        <h2 className="text-xl font-black text-gray-900 mb-4">🧮 Commodity Calculators</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {CALCS.map(c => (
            <Link key={c.href} href={c.href}
              className="group relative bg-white rounded-2xl border border-gray-100 shadow-card hover:border-yellow-200 hover:shadow-lg transition-all p-4 flex flex-col gap-3">
              {c.hot && <span className="absolute top-3 right-3 text-[10px] font-black px-1.5 py-0.5 bg-red-100 text-red-700 rounded-full border border-red-200">HOT</span>}
              <span className="text-3xl">{c.emoji}</span>
              <div>
                <p className="font-black text-gray-900 text-sm group-hover:text-yellow-700 transition-colors leading-tight mb-1">{c.name}</p>
                <p className="text-[11px] text-gray-500 leading-relaxed">{c.desc}</p>
              </div>
              <span className="mt-auto text-xs font-bold text-yellow-600 flex items-center gap-1">Open <ArrowRight className="w-3 h-3" /></span>
            </Link>
          ))}
        </div>
      </section>

      {/* -- SEO Rich Content ------------------------------------ */}
      <PreciousMetalsSEO />

      {/* -- Related Calculators --------------------------------- */}
      <RelatedCalculators />

      {/* -- FAQ ------------------------------------------------- */}
      <FAQSection />

      {/* -- Disclaimer ------------------------------------------ */}
      <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4">
        <p className="text-xs text-gray-500 leading-relaxed">
          <strong className="text-gray-700">Disclaimer:</strong> Prices sourced from free public APIs (open.er-api.com, metals.live, stooq.com, frankfurter.app) and may be delayed up to 15 minutes.
          For informational use only - not for trading decisions. Gold karat prices calculated from spot price; actual jewellery prices include making charges and markups.
          Currency rates are indicative. Always verify with your broker before transacting.
        </p>
      </div>
    </div>
  )
}
