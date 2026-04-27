'use client'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { findInterestRate } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { interestRateSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
export default function InterestRateCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug}: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const m = currency.code === 'INR' ? 20 : 1

  const [principal, setPrincipal]       = useState(25000 * m)
  const [monthlyPayment, setMonthlyPayment] = useState(500 * m)
  const [months, setMonths]             = useState(60)

  const result = useMemo(() => findInterestRate(principal, monthlyPayment, months), [principal, monthlyPayment, months])

  // Rate sensitivity table
  const sensitivityData = [3, 5, 7, 9, 11, 13, 15, 18, 21, 24].map(rate => {
    const r = rate / 100 / 12
    const payment = r > 0 ? principal * r * Math.pow(1 + r, months) / (Math.pow(1 + r, months) - 1) : principal / months
    return { rate: `${rate}%`, payment: Math.round(payment), totalInterest: Math.round(payment * months - principal) }
  })

  const minPayment = principal / months

  return (
    <CalculatorLayout title="Interest Rate Calculator USA 2026" description="Find the true APR on any loan from the monthly payment, balance, and term." icon="📈" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="interest-rate-calculator"
      blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Find Your APR</h2>
          <p className="text-xs text-gray-500 mb-4 leading-relaxed">Know your loan amount, payment, and term? We'll calculate the exact interest rate you\'re being charged.</p>
          <div className="space-y-5">
            <InputField label={`Loan Amount (${currency.symbol})`} value={principal} onChange={setPrincipal} min={500} max={2000000} step={500} prefix={currency.symbol} />
            <InputField label={`Monthly Payment (${currency.symbol})`} value={monthlyPayment} onChange={setMonthlyPayment} min={Math.ceil(minPayment)} max={principal} step={10} prefix={currency.symbol} />
            <InputField label="Loan Term" value={months} onChange={setMonths} min={6} max={360} step={6} suffix="Mo" />
          </div>
          {monthlyPayment <= minPayment && (
            <div className="mt-3 p-3 bg-red-50 border border-red-300 rounded-xl text-xs text-red-700">
              ⚠️ Payment must be higher than {fmt(Math.ceil(minPayment))}/month to pay off the loan.
            </div>
          )}
          <div className="mt-5 p-4 bg-white rounded-xl">
            <p className="text-xs font-bold text-gray-600 mb-2">Your Calculated Rate:</p>
            <p className="text-4xl font-black text-green-600">{result.apr}%</p>
            <p className="text-xs text-gray-500 mt-1">Annual Percentage Rate (APR)</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Your APR" value={`${result.apr}%`} subValue="Annual rate" highlight />
            <ResultCard label="Monthly Rate" value={`${result.monthlyRate}%`} subValue="Per month" />
            <ResultCard label="Total Interest" value={fmtCompact(result.totalInterest)} subValue="Cost of loan" />
            <ResultCard label="Total Paid" value={fmtCompact(result.totalPaid)} subValue="Over loan life" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Payment at Different Rates (same {months}-month term)</h3>
            <ChartWrapper height={220}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={sensitivityData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="rate" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={70} tickFormatter={(v) => `${currency.symbol}${(v / 1000).toFixed(1)}K`} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => fmt(v)} />
                  <Line type="monotone" dataKey="payment" name="Monthly Payment" stroke="#16a34a" strokeWidth={2.5} dot={{ r: 3, fill: '#16a34a' }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Rate Comparison Table</h3>
            <div className="overflow-x-auto">
              <table className="calc-table">
                <thead><tr><th>Rate</th><th>Monthly Payment</th><th>Total Interest</th><th>vs Your Rate</th></tr></thead>
                <tbody>
                  {sensitivityData.map(row => {
                    const diff = row.totalInterest - result.totalInterest
                    return (
                      <tr key={row.rate} className={Math.abs(parseFloat(row.rate) - result.apr) < 1 ? 'bg-green-50/60' : ''}>
                        <td className="font-semibold">{row.rate}</td>
                        <td>{fmt(row.payment)}</td>
                        <td>{fmtCompact(row.totalInterest)}</td>
                        <td className={diff > 0 ? 'text-red-500' : diff < 0 ? 'text-green-600' : 'text-gray-500'}>
                          {diff > 0 ? `+${fmtCompact(diff)}` : diff < 0 ? `-${fmtCompact(Math.abs(diff))}` : '--'}
                        </td>
                      </tr>
                    )
                  })}
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
          { name: "Personal Loan Calculator", href: "/calculators/finance/personal-loan-calculator", icon: "💳", desc: "Free calculator" },          { name: "EMI Calculator", href: "/calculators/finance/emi-calculator", icon: "🏦", desc: "Free calculator" },          { name: "Loan Comparison Calculator", href: "/calculators/finance/loan-comparison-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },          { name: "Credit Card Payoff Calculator", href: "/calculators/finance/credit-card-payoff-calculator", icon: "💳", desc: "Free calculator" },          { name: "Payoff Date Calculator", href: "/calculators/finance/payoff-date-calculator", icon: "📅", desc: "Free calculator" },          { name: "Student Loan Calculator", href: "/calculators/finance/student-loan-calculator", icon: "🎓", desc: "Free calculator" },          { name: "Loan Prepayment Calculator", href: "/calculators/finance/loan-prepayment-calculator", icon: "⚡", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },
          ]}
        />
        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Interest Rate Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Interest Rate USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-black text-gray-900 mb-3">Interest Rate Calculator USA 2026 – Find the True APR on Any Loan</h2>
        <p className="text-sm text-gray-600">Lenders don't always make the true interest rate obvious. This interest rate calculator USA 2026 reverse-engineers the APR from any loan payment, balance, and term — so you can verify rates and compare lenders.</p>
      </Card>

        <SEOContent {...interestRateSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
