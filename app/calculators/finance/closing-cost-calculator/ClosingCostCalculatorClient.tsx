'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { calculateClosingCosts } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { closingCostSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function ClosingCostCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()

  const [homePrice, setHomePrice]   = useState(currency.code === 'INR' ? 5000000 : 400000)
  const [downPct, setDownPct]       = useState(20)
  const [downPayment, setDownPayment] = useState(currency.code === 'INR' ? 1000000 : 80000)

  const loanAmount = homePrice - downPayment
  const result = useMemo(() => calculateClosingCosts(homePrice, loanAmount, 'US'), [homePrice, loanAmount])

  const typeColors: Record<string, string> = { lender: '#3b82f6', title: '#8b5cf6', prepaid: '#f59e0b', govt: '#16a34a' }
  const typeLabels: Record<string, string> = { lender: 'Lender Fees', title: 'Title & Legal', prepaid: 'Prepaid Items', govt: 'Govt Fees' }

  const grouped = ['lender', 'title', 'prepaid', 'govt'].map(type => ({
    name: typeLabels[type],
    value: result.breakdown.filter(b => b.type === type).reduce((s, b) => s + b.amount, 0),
    color: typeColors[type],
  }))

  return (
    <CalculatorLayout title="Closing Cost Calculator USA 2026" description="Estimate all home buying closing costs including lender fees, title insurance, and prepaid items." icon="📋" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="closing-cost-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Property Details</h2>
          <div className="space-y-5">
            <InputField label={`Home Price (${currency.symbol})`} value={homePrice} onChange={setHomePrice} min={50000} max={5000000} step={10000} prefix={currency.symbol} />
            <InputField label={`Down Payment (${currency.symbol})`} value={downPayment} onChange={setDownPayment} min={0} max={homePrice} step={5000} prefix={currency.symbol} />
          </div>
          <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            <p className="font-bold mb-1">⚠️ These are estimates</p>
            <p className="leading-relaxed">Closing costs vary by state, lender, and property. This calculator uses national averages (2-5% of home price). Get a Loan Estimate from your lender for exact figures within 3 business days of application.</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Est. Closing Costs" value={fmtCompact(result.total)} subValue={`${result.percentage}% of price`} highlight />
            <ResultCard label="Loan Amount" value={fmtCompact(loanAmount)} subValue="Amount financed" />
            <ResultCard label="Lender Fees" value={fmtCompact(grouped[0].value)} subValue="Origination + appraisal" />
            <ResultCard label="Prepaid Items" value={fmtCompact(grouped[2].value)} subValue="Tax & ins reserves" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Cost Categories</h3>
              <ChartWrapper height={180}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={grouped} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                      {grouped.map((g, i) => <Cell key={i} fill={g.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
              <div className="space-y-1.5 mt-1">
                {grouped.map((g) => (
                  <div key={g.name} className="flex justify-between text-xs">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: g.color }} />{g.name}</span>
                    <span className="font-semibold">{fmt(g.value)}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Cash to Close Summary</h3>
              <div className="space-y-2 text-sm">
                {[
                  ['Down Payment', fmt(downPayment)],
                  ['Estimated Closing Costs', fmt(result.total)],
                  ['Total Cash Needed', fmt(downPayment + result.total)],
                  ['As % of Home Price', `${Math.round((downPayment + result.total) / homePrice * 100)}%`],
                ].map(([l, v]) => (
                  <div key={l} className={`flex justify-between border-b border-gray-100 pb-1.5 last:border-0 ${l === 'Total Cash Needed' ? 'font-bold text-gray-900 text-base' : ''}`}>
                    <span className="text-gray-500">{l}</span><span>{v}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Full Cost Breakdown</h3>
            <div className="space-y-0">
              {['lender', 'title', 'prepaid', 'govt'].map(type => (
                <div key={type} className="mb-3">
                  <div className="text-xs font-bold uppercase tracking-wider mb-2 px-1" style={{ color: typeColors[type] }}>{typeLabels[type]}</div>
                  {result.breakdown.filter(b => b.type === type).map(b => (
                    <div key={b.name} className="flex justify-between text-sm py-1.5 border-b border-gray-100 last:border-0 px-1">
                      <span className="text-gray-500">{b.name}</span>
                      <span className="font-semibold">{fmt(b.amount)}</span>
                    </div>
                  ))}
                </div>
              ))}
              <div className="flex justify-between text-sm font-black pt-3 border-t-2 border-gray-200 px-1">
                <span>Total Estimated Closing Costs</span>
                <span className="text-green-600">{fmt(result.total)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">

        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Home Loan Calculator", href: "/calculators/finance/home-loan-calculator", icon: "🏠", desc: "Free calculator" },          { name: "Biweekly Mortgage Calculator", href: "/calculators/finance/biweekly-mortgage-calculator", icon: "📅", desc: "Free calculator" },          { name: "Down Payment Calculator", href: "/calculators/finance/down-payment-calculator", icon: "💵", desc: "Free calculator" },          { name: "Mortgage Refinance Calculator", href: "/calculators/finance/mortgage-refinance-calculator", icon: "🔄", desc: "Free calculator" },          { name: "Home Affordability Calculator", href: "/calculators/finance/home-affordability-calculator", icon: "💰", desc: "Free calculator" },          { name: "HELOC Calculator", href: "/calculators/finance/heloc-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "Rent vs Buy Calculator", href: "/calculators/finance/rent-vs-buy-calculator", icon: "🔄", desc: "Free calculator" },          { name: "Cash Out Refinance vs HELOC Calculator", href: "/calculators/finance/cash-out-refinance-vs-heloc-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage vs Renting USA Calculator", href: "/calculators/finance/mortgage-vs-renting-usa-calculator", icon: "📊", desc: "Free calculator" },          { name: "Pay Off Mortgage vs Invest Calculator", href: "/calculators/finance/pay-off-mortgage-vs-invest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Loan Prepayment Calculator", href: "/calculators/finance/loan-prepayment-calculator", icon: "⚡", desc: "Free calculator" },
          ]}
        />
        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Closing Cost Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Closing Cost USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-black text-gray-900 mb-3">Closing Cost Calculator USA 2026 – Know All Home Buying Fees Before You Offer</h2>
        <p className="text-sm text-gray-600">Closing costs catch many first-time homebuyers off guard — they can add $8,000–$25,000 on top of your down payment. This closing cost calculator USA 2026 itemizes every fee so you can budget accurately.</p>
      </Card>

        <SEOContent {...closingCostSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
