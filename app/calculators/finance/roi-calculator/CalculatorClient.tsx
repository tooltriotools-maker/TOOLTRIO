'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { calculateROI } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { TrendingUp, DollarSign, Percent, Zap } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'
import { roiRichSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [initial, setInitial] = useState(100000)
  const [finalValue, setFinalValue] = useState(175000)
  const [years, setYears] = useState(3)
  const [extraCosts, setExtraCosts] = useState(0)

  const r = useMemo(() => calculateROI(initial, finalValue, years, extraCosts), [initial, finalValue, years, extraCosts])

  const pie = [
    { name: 'Initial Investment', value: r.totalCost, color: '#93c5fd' },
    { name: 'Net Profit', value: Math.max(0, r.netProfit), color: '#16a34a' },
  ]
  if (r.netProfit < 0) pie[1] = { name: 'Net Loss', value: Math.abs(r.netProfit), color: '#f87171' }

  const scenarios = [
    { label: 'Conservative (-20%)', value: finalValue * 0.8 },
    { label: 'Expected', value: finalValue },
    { label: 'Optimistic (+20%)', value: finalValue * 1.2 },
  ].map(s => {
    const res = calculateROI(initial, s.value, years, extraCosts)
    return { label: s.label, roi: res.roi, profit: res.netProfit }
  })

  return (
    <CalculatorLayout title="ROI Calculator USA 2026" description="Calculate return on investment, net profit, and annualized ROI for any investment." icon="📈" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Investment Details</h2>
          <div className="space-y-5">
            <InputField label="Initial Investment" value={initial} onChange={setInitial} min={1} max={1000000000} step={1000} prefix={currency.symbol} />
            <InputField label="Final Value / Sale Price" value={finalValue} onChange={setFinalValue} min={0} max={1000000000} step={1000} prefix={currency.symbol} />
            <InputField label="Investment Duration" value={years} onChange={setYears} min={0.1} max={50} step={0.5} suffix="Years" />
            <InputField label="Additional Costs (fees, taxes)" value={extraCosts} onChange={setExtraCosts} min={0} max={100000000} step={100} prefix={currency.symbol} />
          </div>
          <div className={`mt-5 p-4 rounded-2xl text-center ${r.roi >= 0 ? 'bg-green-600' : 'bg-red-500'} text-white`}>
            <p className="text-sm opacity-80">Total ROI</p>
            <p className="text-4xl font-black mt-1">{r.roi >= 0 ? '+' : ''}{r.roi}%</p>
            <p className="text-sm opacity-80 mt-1">{r.annualizedROI}% per year (CAGR)</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total ROI" value={`${r.roi >= 0 ? '+' : ''}${r.roi}%`} highlight icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Net Profit" value={fmt(r.netProfit)} icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Annualized ROI" value={`${r.annualizedROI}%`} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Money Multiplier" value={`${r.multiplier}x`} icon={<Zap className="w-4 h-4" />} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Investment vs Return</h3>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                      {pie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4">
                {pie.map(e => <div key={e.name} className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} />{e.name}</div>)}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">ROI Scenarios</h3>
              <div className="space-y-2.5">
                {scenarios.map((s, i) => (
                  <div key={i} className={`p-3 rounded-xl border ${i === 1 ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold text-gray-600">{s.label}</span>
                      <span className={`text-sm font-black ${s.roi >= 0 ? 'text-green-700' : 'text-red-600'}`}>{s.roi >= 0 ? '+' : ''}{s.roi}%</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">Profit: {s.profit >= 0 ? '+' : ''}{fmt(s.profit)}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Compare With Other ROI Benchmarks</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Your Investment', roi: r.roi },
                  { name: 'FD (7%/yr)', roi: years > 0 ? Math.round((Math.pow(1.07, years) - 1) * 10000) / 100 : 7 },
                  { name: 'S&amp;P 500 (10%/yr)', roi: years > 0 ? Math.round((Math.pow(1.10, years) - 1) * 10000) / 100 : 10 },
                  { name: 'S&amp;P 500 (10%/yr)', roi: years > 0 ? Math.round((Math.pow(1.10, years) - 1) * 10000) / 100 : 10 },
                ]} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} width={45} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [`${v}%`, 'ROI']} />
                  <Bar dataKey="roi" radius={[6, 6, 0, 0]}>
                    {[r.roi, 0, 0, 0].map((val, i) => <Cell key={i} fill={i === 0 ? (val >= 0 ? '#16a34a' : '#f87171') : '#93c5fd'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">ROI Calculator - Complete Return on Investment Analysis Guide USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Understanding ROI - The Universal Investment Metric</h3>
              <p>ROI (Return on Investment) = (Net Profit / Total Cost) x 100. It measures the efficiency of an investment - how much profit you make for every rupee invested. ROI is the most universally applicable financial metric, used for evaluating stocks, real estate, business ventures, mutual funds, gold, and even marketing campaigns. Unlike sector-specific metrics, ROI can compare investments across completely different asset classes. A 15% ROI on real estate can be directly compared with 15% ROI on mutual funds. The limitation: ROI ignores time - a 50% ROI over 10 years is very different from 50% over 1 year. Use CAGR (annualized ROI) for time-adjusted comparisons.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">ROI in Real Estate - What Actually Counts</h3>
              <p>Real estate ROI calculation is more complex than stocks. True ROI components: Rental income yield (gross): Annual rent / Property cost. Net rental yield: (Annual rent - maintenance - property tax) / Property cost. Capital appreciation ROI: (Sale price - purchase price) / Purchase price. Total ROI = rental income + capital appreciation. Example: $50 thousand property. Rent = $20,000/month ($2.4L/year). Gross yield = 4.8%. After expenses ($50K): Net yield = 3.8%. If property value grows to $80 thousand in 10 years: capital appreciation CAGR = 4.8%. Combined CAGR (rent reinvested + appreciation) ~= 8-9%. Compare with S&amp;P 500 at 12% CAGR with much higher liquidity.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">ROI Benchmarks by Asset Class in the US (2026)</h3>
              <p>Historical ROI benchmarks for US investors: Savings account: 3-4% (negative real returns after inflation). FD: 7-8% (marginal positive real returns). Roth IRA: 7.1% (tax-free = effective 10%+ pre-tax equivalent for 30% bracket). Gold (Indian): 8-10% CAGR over 20 years in rupee terms. Real estate (metro India): 8-12% CAGR (wide variation by city/locality). S&amp;P 500 (equity index): ~12% CAGR over 20 years. Small-cap equity: 14-18% CAGR (with high volatility). Startup/Angel investment: 25-40%+ potential CAGR but very high failure rate. These benchmarks help contextualize any specific investment's ROI relative to alternatives.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Social ROI - Beyond Financial Returns</h3>
              <p>ROI extends beyond pure financial metrics in business and personal decisions. Social ROI (SROI) measures social, environmental, and economic value created per rupee invested - relevant for CSR activities, nonprofits, and government programs. Personal ROI: Education ROI = (Increased lifetime earnings - education cost) / Education cost. An IIT/IIM education might have 100%+ ROI due to career earnings differential. Health ROI: Investment in health (gym, nutrition, preventive care) reduces medical costs and lost productivity. Time ROI: Automation tools, delegation, and process improvements free up time for higher-value activities. In business, marketing ROI = (Revenue generated from campaign - campaign cost) / campaign cost x 100. A 300% marketing ROI means every $1 spent generates $3 in additional revenue.</p>
            </div>
          </div>
        </Card>
      </div>

      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Roi Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Roi USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent {...roiRichSEOContent} category="finance" />
    
        {/* Internal Links -- 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Power of compounding" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "💎", desc: "Total portfolio picture" },
            { name: "Real Estate ROI Calculator", href: "/calculators/finance/real-estate-roi-calculator", icon: "🏠", desc: "Property-specific ROI" },
            { name: "FIRE Calculator", href: "/calculators/finance/fire-calculator", icon: "🔥", desc: "ROI vs retirement date" },
            { name: "Stock Profit Calculator", href: "/calculators/finance/stock-profit-calculator", icon: "💹", desc: "Individual stock returns" },
            { name: "Crypto Profit Calculator", href: "/calculators/finance/crypto-profit-calculator", icon: "₿", desc: "Crypto ROI scenarios" },
            { name: "Dividend Calculator", href: "/calculators/finance/dividend-calculator", icon: "💰", desc: "Include dividend income" },
            { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📉", desc: "Real vs nominal returns" },
            { name: "Savings Goal Calculator", href: "/calculators/finance/savings-goal-calculator", icon: "🎯", desc: "Required ROI for goal" },
            { name: "XIRR Calculator", href: "/calculators/finance/xirr-calculator", icon: "📊", desc: "Time-weighted returns" },
            { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📈", desc: "Annualized growth rate" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🌅", desc: "Retirement planning" },
          ]}
        />
        <FAQSection faqs={faqs} />
      </div>
      
    </CalculatorLayout>
  )
}
