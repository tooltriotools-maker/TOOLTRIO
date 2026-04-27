'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { compareLoanOptions } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { loanComparisonSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
export default function LoanComparisonCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug}: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const m = currency.code === 'INR' ? 20 : 1

  const [loans, setLoans] = useState([
    { name: 'Lender A', principal: 25000 * m, rate: 7.5, months: 60, fees: 0 },
    { name: 'Lender B', principal: 25000 * m, rate: 8.9, months: 60, fees: 0 },
    { name: 'Lender C', principal: 25000 * m, rate: 6.9, months: 72, fees: 500 * m },
  ])

  const results = useMemo(() => compareLoanOptions(loans), [loans])

  const updateLoan = (idx: number, field: string, val: string | number) => {
    const updated = [...loans]
    updated[idx] = { ...updated[idx], [field]: val }
    setLoans(updated)
  }

  const chartData = results.map(r => ({ name: r.name, monthly: r.emi, interest: r.totalInterest, total: r.totalPayment }))
  const COLORS = ['#3b82f6', '#f59e0b', '#16a34a', '#8b5cf6']

  return (
    <CalculatorLayout title="Loan Comparison Calculator USA 2026" description="Compare up to 4 loan offers simultaneously on monthly payment, total interest, and APR." icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="loan-comparison-calculator"
      blogSlug={blogSlug}>
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {loans.map((loan, idx) => (
            <Card key={idx}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ background: COLORS[idx] }} />
                <input
                  type="text"
                  value={loan.name}
                  onChange={e => updateLoan(idx, 'name', e.target.value)}
                  className="text-sm font-bold bg-transparent border-b border-gray-200 focus:outline-none focus:border-green-500 text-gray-900 w-full"
                />
              </div>
              <div className="space-y-4">
                <InputField label={`Loan Amount (${currency.symbol})`} value={loan.principal} onChange={v => updateLoan(idx, 'principal', v)} min={1000} max={5000000} step={500} prefix={currency.symbol} />
                <InputField label="Interest Rate (APR %)" value={loan.rate} onChange={v => updateLoan(idx, 'rate', v)} min={0.5} max={30} step={0.1} suffix="%" />
                <InputField label="Term (Months)" value={loan.months} onChange={v => updateLoan(idx, 'months', v)} min={12} max={360} step={12} suffix="Mo" />
                <InputField label={`Origination Fees (${currency.symbol})`} value={loan.fees} onChange={v => updateLoan(idx, 'fees', v)} min={0} max={10000} step={50} prefix={currency.symbol} />
              </div>
              {results[idx]?.bestValue && (
                <div className="mt-3 text-center py-2 bg-green-600 rounded-xl text-xs font-black text-gray-900">⭐ BEST TOTAL VALUE</div>
              )}
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {results.map((r, i) => (
            <div key={r.name} className={`p-4 rounded-xl border-2 ${r.bestValue ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full" style={{ background: COLORS[i] }} />
                <span className="font-bold text-sm">{r.name}</span>
                {r.bestValue && <span className="ml-auto text-xs text-green-600 font-bold">BEST</span>}
              </div>
              <div className="space-y-1.5 text-xs">
                {[
                  ['Monthly Payment', fmt(r.emi)],
                  ['Total Interest', fmtCompact(r.totalInterest)],
                  ['Total Cost', fmtCompact(r.totalPayment)],
                  ['APR (with fees)', `${r.apr}%`],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between">
                    <span className="text-gray-500">{l}</span>
                    <span className={`font-semibold ${r.bestValue ? 'text-green-600' : ''}`}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Payment Comparison</h3>
            <ChartWrapper height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={70} tickFormatter={(v) => `${currency.symbol}${(v / 1000).toFixed(1)}K`} />
                  <Tooltip formatter={(v: number) => fmt(v)} />
                  <Bar dataKey="monthly" name="Monthly Payment" radius={[4, 4, 0, 0]}>
                    {chartData.map((_, i) => <Bar key={i} dataKey="monthly" fill={COLORS[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Total Interest Comparison</h3>
            <ChartWrapper height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={70} tickFormatter={(v) => `${currency.symbol}${(v / 1000).toFixed(1)}K`} />
                  <Tooltip formatter={(v: number) => fmt(v)} />
                  <Bar dataKey="interest" name="Total Interest" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
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
          { name: "Business Loan Calculator", href: "/calculators/finance/business-loan-calculator", icon: "🏢", desc: "Free calculator" },          { name: "Break Even Calculator", href: "/calculators/finance/break-even-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Invoice Calculator", href: "/calculators/finance/invoice-calculator", icon: "🧾", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Annual Income Calculator", href: "/calculators/finance/annual-income-calculator", icon: "💰", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },
          ]}
        />
        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Loan Comparison Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A $25,000 loan at 8% APR over 5 years results in monthly payments of approximately <strong>$507</strong> with total interest of $4,420.
        </p>
        <p className="text-sm text-gray-600">
          Use this Loan Comparison USA 2026 tool to compare different loan scenarios and find the fastest, cheapest path to debt freedom.
        </p>
      </Card>
      
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-black text-gray-900 mb-3">Loan Comparison Calculator USA 2026 – Compare Every Loan Offer Before You Sign</h2>
        <p className="text-sm text-gray-600">Shopping multiple lenders is the single highest-return action you can take before any major loan. This loan comparison calculator USA 2026 puts up to 4 loan offers side-by-side so you can see exactly which one costs the least.</p>
      </Card>

        <SEOContent {...loanComparisonSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
      
      
    </CalculatorLayout>
  )
}
