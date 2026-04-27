'use client'
import { useState, useEffect, useMemo } from 'react'
import { useExchangeRates, CURRENCY_INFO } from '@/hooks/useExchangeRates'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { SEOContent } from '@/components/ui/SEOContent'
import { ArrowLeftRight, RefreshCw, TrendingUp, Clock } from 'lucide-react'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

const ALL_CURRENCIES = Object.keys(CURRENCY_INFO)
const POPULAR = ['USD','INR','EUR','GBP','JPY','AED','SGD','CAD','AUD','CHF']

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { convert, rates, live, loading, data, refresh } = useExchangeRates(300)
  const [amount, setAmount]   = useState(1000)
  const [from,   setFrom]     = useState('USD')
  const [to,     setTo]       = useState('INR')
  const [lastUpdated, setLastUpdated] = useState('')

  useEffect(() => {
    if (data.fetchedAt) setLastUpdated(new Date(data.fetchedAt).toLocaleTimeString())
  }, [data.fetchedAt])

  const result = useMemo(() => convert(amount, from, to), [convert, amount, from, to])

  const quickConversions = useMemo(() => {
    return POPULAR.filter(c => c !== from && c !== to).slice(0, 6).map(c => {
      const r = convert(amount, from, c)
      return { code: c, ...CURRENCY_INFO[c], result: r.result, rate: r.rate }
    })
  }, [convert, amount, from, to])

  // Popular INR rates vs USD
  const inrRates = useMemo(() => {
    if (!rates['INR']) return []
    const usdInr = rates['INR']
    return [
      { from: 'USD', amount: 1,    inr: usdInr },
      { from: 'USD', amount: 100,  inr: usdInr * 100 },
      { from: 'USD', amount: 1000, inr: usdInr * 1000 },
      { from: 'EUR', amount: 1,    inr: (rates['INR'] / rates['EUR']) },
      { from: 'GBP', amount: 1,    inr: (rates['INR'] / rates['GBP']) },
      { from: 'AED', amount: 1,    inr: (rates['INR'] / rates['AED']) },
    ]
  }, [rates])

  const fmt = (n: number, code: string) => {
    const info = CURRENCY_INFO[code]
    const sym = info?.symbol ?? code
    if (n >= 10000000 && code === 'INR') return `${sym}${(n/10000000).toFixed(2)}Cr`
    if (n >= 100000  && code === 'INR') return `${sym}${(n/100000).toFixed(2)}L`
    if (n >= 1000000) return `${sym}${(n/1000000).toFixed(2)}M`
    return `${sym}${n.toLocaleString(undefined, { maximumFractionDigits: n < 10 ? 4 : 2 })}`
  }

  return (
    <CalculatorLayout
      title="Currency Converter USA 2026"
      description="Convert between USD, EUR, GBP, JPY, and 30+ currencies at real-time mid-market exchange rates."
      icon="💱" category="Finance"
      structuredData={structuredData}
      relatedCalculators={relatedCalculators}
      blogSlug={blogSlug}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* -- Input Card -- */}
        <Card className="lg:col-span-1 h-fit">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900">Convert</h2>
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${live ? 'text-green-700 bg-green-50 border-green-200' : 'text-gray-500 bg-gray-100 border-gray-200'}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${live ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                {live ? 'LIVE' : 'CACHED'}
              </span>
              <button onClick={refresh} disabled={loading} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <RefreshCw className={`w-3.5 h-3.5 text-gray-500 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {/* Amount */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Amount</label>
              <input
                type="number" min={0} step={1} value={amount}
                onChange={e => setAmount(+e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-400 font-bold text-lg"
              />
            </div>

            {/* From */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">From</label>
              <select value={from} onChange={e => setFrom(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white font-semibold">
                {ALL_CURRENCIES.map(c => (
                  <option key={c} value={c}>{CURRENCY_INFO[c]?.flag} {c} -- {CURRENCY_INFO[c]?.name}</option>
                ))}
              </select>
            </div>

            {/* Swap */}
            <div className="flex justify-center">
              <button onClick={() => { setFrom(to); setTo(from) }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-green-200 bg-green-50 text-green-700 font-bold text-sm hover:bg-green-100 transition-all">
                <ArrowLeftRight className="w-4 h-4" /> Swap
              </button>
            </div>

            {/* To */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">To</label>
              <select value={to} onChange={e => setTo(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl bg-white font-semibold">
                {ALL_CURRENCIES.map(c => (
                  <option key={c} value={c}>{CURRENCY_INFO[c]?.flag} {c} -- {CURRENCY_INFO[c]?.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Big result */}
          <div className="mt-4 p-4 rounded-2xl bg-green-600 text-white text-center">
            <p className="text-sm opacity-80">{amount.toLocaleString()} {from} =</p>
            <p className="text-3xl font-black mt-1">{fmt(result.result, to)}</p>
            <p className="text-sm opacity-80 mt-1">{CURRENCY_INFO[to]?.flag} {to}</p>
            <p className="text-xs opacity-60 mt-2">
              1 {from} = {result.rate.toFixed(4)} {to} &nbsp;.&nbsp; 1 {to} = {result.inverseRate.toFixed(4)} {from}
            </p>
          </div>

          {/* Source info */}
          <div className={`mt-3 p-3 rounded-xl text-xs border ${live ? 'bg-green-50 border-green-200 text-green-700' : 'bg-amber-50 border-amber-200 text-amber-700'}`}>
            {live ? (
              <p className="flex items-center gap-1"><Clock className="w-3 h-3" /> Live rates . Updated {lastUpdated} . Source: {data.source}</p>
            ) : (
              <p><strong>Cached rates</strong> -- live source temporarily unavailable</p>
            )}
          </div>
        </Card>

        {/* -- Results -- */}
        <div className="lg:col-span-2 space-y-4">

          {/* Rate cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickConversions.map(c => (
              <div key={c.code} className="bg-white border border-gray-100 rounded-2xl p-4 hover:border-green-200 transition-colors cursor-pointer"
                onClick={() => setTo(c.code)}>
                <p className="text-lg font-black text-gray-900">{fmt(c.result, c.code)}</p>
                <p className="text-xs text-gray-500 mt-0.5">{c.flag} {c.code} . {c.name}</p>
                <p className="text-[10px] text-gray-400 mt-1">1 {from} = {c.rate.toFixed(4)} {c.code}</p>
              </div>
            ))}
          </div>

          {/* INR special section */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 rounded-2xl p-5">
            <h3 className="font-black text-gray-900 mb-3 flex items-center gap-2">
              🇮🇳 Live INR Exchange Rates
              {live && <span className="text-[10px] font-black text-green-600 bg-green-100 border border-green-200 px-1.5 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />LIVE
              </span>}
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-orange-200">
                    <th className="pb-2 text-left">Currency</th>
                    <th className="pb-2 text-right">Rate (in ₹)</th>
                    <th className="pb-2 text-right">₹ per unit</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(rates)
                    .filter(([c]) => ['USD','EUR','GBP','AED','SGD','CAD','AUD','CHF','JPY','CNY','MYR','QAR','SAR','KWD'].includes(c))
                    .map(([code, rate]) => {
                      const inrRate = (rates['INR'] ?? 83.92) / rate
                      const info = CURRENCY_INFO[code]
                      return (
                        <tr key={code} className="border-b border-orange-100 last:border-0 hover:bg-orange-100/50 transition-colors">
                          <td className="py-2 font-semibold text-gray-800">{info?.flag} {code} <span className="text-gray-400 font-normal text-xs">. {info?.name}</span></td>
                          <td className="py-2 text-right font-bold text-gray-900">₹{inrRate.toFixed(2)}</td>
                          <td className="py-2 text-right text-gray-500 text-xs">1 ₹ = {(1/inrRate).toFixed(5)} {code}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            <p className="text-[10px] text-gray-400 mt-2">
              USD/INR: <strong className="text-gray-700">₹{(rates['INR'] ?? 83.92).toFixed(2)}</strong> &nbsp;.&nbsp;
              Rates are {live ? 'live from ' + data.source : 'cached estimates'}
            </p>
          </div>

          {/* Rate table for selected pair */}
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <h3 className="font-black text-gray-900 mb-3">{from} -{'>'} {to} -- Quick Reference</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[1, 10, 50, 100, 500, 1000, 5000, 10000].map(n => {
                const r = convert(n, from, to)
                return (
                  <div key={n} className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-xs text-gray-500">{n.toLocaleString()} {from}</p>
                    <p className="font-black text-gray-900 text-sm">{fmt(r.result, to)}</p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Live rate sources info */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-sm text-blue-800">
            <p className="font-bold mb-1 flex items-center gap-2"><TrendingUp className="w-4 h-4" /> About Live Rates</p>
            <p className="text-xs leading-relaxed">
              Exchange rates are fetched live from <strong>open.er-api.com</strong> (free, ECB-sourced, updated daily).
              Rates refresh every 5 minutes. For real money transfers, always verify with your bank or forex broker as
              transaction rates include spreads and fees.
            </p>
          </div>
        </div>
      </div>

      
      <Card className="mt-6">
        <h2 className="text-xl font-black text-gray-900 mb-3">Currency Converter USA 2026 – See the Real Rate Before You Convert</h2>
        <p className="text-sm text-gray-600 mb-2">For example, sending $5,000 USD to the UK, your currency converter USA 2026 shows the mid-market rate vs what banks actually charge — often a $100–$200 difference on a single transfer.</p>
        <p className="text-sm text-gray-600">The exchange rate you see advertised and the rate you actually receive are rarely the same. This currency converter USA 2026 shows the true mid-market rate so you can compare it against your bank or service before converting.</p>
      </Card>
{faqs?.length > 0 && <FAQSection faqs={faqs} />}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📉", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "XIRR Calculator", href: "/calculators/finance/xirr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Currency Profit Calculator", href: "/calculators/finance/currency-profit-calculator", icon: "📊", desc: "Free calculator" },          { name: "Tip Calculator", href: "/calculators/finance/tip-calculator", icon: "💵", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "P/E Ratio Calculator", href: "/calculators/finance/pe-ratio-calculator", icon: "📊", desc: "Free calculator" },          { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Crypto Profit Calculator", href: "/calculators/finance/crypto-profit-calculator", icon: "₿", desc: "Free calculator" },          { name: "Stock Profit Calculator", href: "/calculators/finance/stock-profit-calculator", icon: "💹", desc: "Free calculator" },
          ]}
        />
          </CalculatorLayout>
  )
}
