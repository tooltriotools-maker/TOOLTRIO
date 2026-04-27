'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { calculateDownPayment } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { downPaymentSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function DownPaymentCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()

  const [homePrice, setHomePrice]     = useState(currency.code === 'INR' ? 5000000 : 400000)
  const [downPct, setDownPct]         = useState(20)
  const [rate, setRate]               = useState(7.0)
  const [years, setYears]             = useState(30)
  const [propTaxRate, setPropTaxRate] = useState(1.2)
  const [annualIns, setAnnualIns]     = useState(currency.code === 'INR' ? 15000 : 1400)

  const result = useMemo(() => calculateDownPayment(homePrice, downPct, rate, years, propTaxRate, annualIns), [homePrice, downPct, rate, years, propTaxRate, annualIns])

  const scenarioData = result.scenarios.map(s => ({
    pct: `${s.pct}%`,
    monthly: s.totalMonthly,
    pmi: s.pmi,
    emi: s.emi,
    downPayment: s.downPayment,
  }))

  const tickFmt = (v: number) => `${currency.symbol}${(v / 1000).toFixed(0)}K`

  return (
    <CalculatorLayout title="Down Payment Calculator USA 2026" description="Compare 5%, 10%, and 20% down payments on monthly payment, PMI, and total 30-year cost." icon="💵" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="down-payment-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Home Details</h2>
          <div className="space-y-5">
            <InputField label={`Home Price (${currency.symbol})`} value={homePrice} onChange={setHomePrice} min={50000} max={5000000} step={10000} prefix={currency.symbol} />
            <InputField label="Down Payment %" value={downPct} onChange={setDownPct} min={3} max={50} step={1} suffix="%" />
            <InputField label="Interest Rate" value={rate} onChange={setRate} min={1} max={15} step={0.05} suffix="%" />
            <InputField label="Loan Term" value={years} onChange={setYears} min={10} max={30} step={5} suffix="Yrs" />
            <InputField label="Property Tax Rate" value={propTaxRate} onChange={setPropTaxRate} min={0} max={4} step={0.1} suffix="%" />
            <InputField label={`Annual Insurance (${currency.symbol})`} value={annualIns} onChange={setAnnualIns} min={0} max={10000} step={100} prefix={currency.symbol} />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Down Payment" value={fmtCompact(result.downPayment)} subValue={`${downPct}% of price`} highlight />
            <ResultCard label="Monthly PITI" value={fmt(result.totalMonthly)} subValue={downPct < 20 ? 'Incl. PMI' : 'No PMI!'} />
            <ResultCard label="Loan Amount" value={fmtCompact(result.loanAmount)} subValue="Amount financed" />
            {downPct < 20
              ? <ResultCard label="Total PMI Cost" value={fmtCompact(result.totalPMI)} subValue="Until 20% equity" />
              : <ResultCard label="PMI" value="$0" subValue="No PMI at 20%+" />
            }
          </div>

          {downPct < 20 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              ⚠️ <strong>PMI required</strong> -- you're putting down less than 20%. Monthly PMI: {fmt(result.emi > 0 ? Math.round(result.loanAmount * 0.008 / 12) : 0)}. Total PMI until 20% equity: {fmtCompact(result.totalPMI)}. To avoid PMI, you\'d need a {fmt(homePrice * 0.20)} down payment.
            </div>
          )}

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Payment by Down Payment %</h3>
            <ChartWrapper height={240}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scenarioData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="pct" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={70} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => fmt(v)} />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#374151' }} />
                  <Bar dataKey="emi" name="P&I" stackId="a" fill="#16a34a" />
                  <Bar dataKey="pmi" name="PMI" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Down Payment Scenarios</h3>
            <div className="overflow-x-auto">
              <table className="calc-table">
                <thead><tr><th>Down %</th><th>Down Amount</th><th>Loan Amount</th><th>P&I / mo</th><th>PMI / mo</th><th>Total / mo</th></tr></thead>
                <tbody>
                  {result.scenarios.map(s => (
                    <tr key={s.pct} className={s.pct === downPct ? 'bg-green-50/60' : ''}>
                      <td className="font-semibold">{s.pct}%</td>
                      <td>{fmtCompact(s.downPayment)}</td>
                      <td>{fmtCompact(s.loanAmount)}</td>
                      <td>{fmt(s.emi)}</td>
                      <td className={s.pmi > 0 ? 'text-red-500' : 'text-green-600'}>{s.pmi > 0 ? fmt(s.pmi) : 'None'}</td>
                      <td className="font-semibold text-gray-900">{fmt(s.totalMonthly)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
          { name: "Real Estate ROI Calculator", href: "/calculators/finance/real-estate-roi-calculator", icon: "🏠", desc: "Free calculator" },          { name: "Rental Yield Calculator", href: "/calculators/finance/rental-yield-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "REIT vs Direct Property USA Calculator", href: "/calculators/finance/reit-vs-direct-property-usa-calculator", icon: "🏢", desc: "Free calculator" },          { name: "S&P500 vs Real Estate USA Calculator", href: "/calculators/finance/sp500-vs-real-estate-usa-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Home Affordability Calculator", href: "/calculators/finance/home-affordability-calculator", icon: "💰", desc: "Free calculator" },          { name: "Rent vs Buy Calculator", href: "/calculators/finance/rent-vs-buy-calculator", icon: "🔄", desc: "Free calculator" },          { name: "HELOC Calculator", href: "/calculators/finance/heloc-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },
          ]}
        />
        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Down Payment Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Down Payment USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-black text-gray-900 mb-3">Down Payment Calculator USA 2026 – Find the Optimal Down Payment for Your Home</h2>
        <p className="text-sm text-gray-600">The right down payment percentage depends on your cash position, PMI cost, and investment alternatives. This down payment calculator USA 2026 compares every scenario side-by-side so you can make the best decision.</p>
      </Card>

        <SEOContent {...downPaymentSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
