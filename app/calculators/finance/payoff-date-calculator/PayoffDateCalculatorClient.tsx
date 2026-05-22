'use client'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts'
import { calculatePayoffDate } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { payoffDateSEOContent } from '@/lib/seo/calculator-seo-content'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { SearchableTable } from '@/components/ui/SearchableTable'
import { loanPayoffByExtra } from '@/lib/seo/finance-tables'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
export default function PayoffDateCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug}: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [balance, setBalance]           = useState(d.loanAmount)
  const [rate, setRate]                 = useState(7.5)
  const [monthlyPayment, setMonthlyPayment] = useState(currency.code === 'INR' ? 12000 : 600)
  const [extraPayment, setExtraPayment] = useState(0)

  const result = useMemo(() => calculatePayoffDate(balance, rate, monthlyPayment, extraPayment), [balance, rate, monthlyPayment, extraPayment])

  const scenarioData = [0, 50, 100, 200, 500].map(extra => {
    const r = calculatePayoffDate(balance, rate, monthlyPayment, extra)
    return { extra: `+${currency.symbol}${extra}`, months: r.months, interest: r.totalInterest, savings: extra > 0 ? calculatePayoffDate(balance, rate, monthlyPayment, 0).totalInterest - r.totalInterest : 0 }
  })

  return (
    <CalculatorLayout title="Loan Payoff Date Calculator USA 2026" description="Find your exact debt-free date and see how extra payments accelerate your loan payoff." icon="📅" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="payoff-date-calculator"
      blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Loan Details</h2>
          <div className="space-y-5">
            <InputField label={`Current Balance (${currency.symbol})`} value={balance} onChange={setBalance} min={1000} max={1000000} step={1000} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={0.5} max={30} step={0.25} suffix="%" />
            <InputField label={`Monthly Payment (${currency.symbol})`} value={monthlyPayment} onChange={setMonthlyPayment} min={100} max={50000} step={50} prefix={currency.symbol} />
            <InputField label={`Extra Monthly Payment (${currency.symbol})`} value={extraPayment} onChange={setExtraPayment} min={0} max={10000} step={25} prefix={currency.symbol} />
          </div>
          {result.monthsSaved > 0 && (
            <div className="mt-5 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-xs font-bold text-green-700 mb-1">💰 Extra payment impact</p>
              <p className="text-xs text-green-800">Adding {fmt(extraPayment)}/month saves <strong>{fmtCompact(result.interestSaved)}</strong> in interest and pays off <strong>{result.monthsSaved} months</strong> earlier.</p>
            </div>
          )}
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Payoff Date" value={result.payoffDate} subValue={`${result.years}y ${result.remainingMonths}m`} highlight />
            <ResultCard label="Total Interest" value={fmtCompact(result.totalInterest)} subValue="Cost of loan" />
            {result.monthsSaved > 0
              ? <ResultCard label="Months Saved" value={`${result.monthsSaved} mo`} subValue="From extra payment" />
              : <ResultCard label="Total Payments" value={`${result.months}`} subValue="Monthly payments" />
            }
            {result.interestSaved > 0
              ? <ResultCard label="Interest Saved" value={fmtCompact(result.interestSaved)} subValue="From extra payment" />
              : <ResultCard label="Total Paid" value={fmtCompact(result.totalPaid)} subValue="Principal + interest" />
            }
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Interest Saved by Extra Payment Amount</h3>
            <div className="overflow-x-auto">
              <table className="calc-table">
                <thead><tr><th>Extra Payment</th><th>Payoff Months</th><th>Total Interest</th><th>Interest Saved</th></tr></thead>
                <tbody>
                  {scenarioData.map(s => (
                    <tr key={s.extra} className={s.extra === `+${currency.symbol}${extraPayment}` ? 'bg-green-50/60' : ''}>
                      <td className="font-semibold">{s.extra}/mo</td>
                      <td>{s.months} mo ({Math.floor(s.months / 12)}y {s.months % 12}m)</td>
                      <td>{fmtCompact(s.interest)}</td>
                      <td className={s.savings > 0 ? 'text-green-600 font-semibold' : 'text-gray-500'}>{s.savings > 0 ? fmtCompact(s.savings) : '--'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Payoff Timeline</h3>
            <p className="text-xs text-gray-500 mb-4">With {fmt(monthlyPayment + extraPayment)}/month total payment, your loan is paid off <strong>{result.payoffDate}</strong></p>
            <div className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl text-center">
              <p className="text-xs text-gray-600 mb-1">Debt-free date</p>
              <p className="text-3xl font-black text-green-700">{result.payoffDate}</p>
              <p className="text-sm text-gray-600 mt-1">{result.years} years and {result.remainingMonths} months from today</p>
              {result.monthsSaved > 0 && (
                <p className="text-xs text-green-600 mt-2 font-semibold">🎉 {result.monthsSaved} months sooner than minimum payment alone</p>
              )}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },          { name: "Credit Card Payoff Calculator", href: "/calculators/finance/credit-card-payoff-calculator", icon: "💳", desc: "Free calculator" },          { name: "Student Loan Calculator", href: "/calculators/finance/student-loan-calculator", icon: "🎓", desc: "Free calculator" },          { name: "Personal Loan Calculator", href: "/calculators/finance/personal-loan-calculator", icon: "💳", desc: "Free calculator" },          { name: "Loan Prepayment Calculator", href: "/calculators/finance/loan-prepayment-calculator", icon: "⚡", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Loan Comparison Calculator", href: "/calculators/finance/loan-comparison-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },
          ]}
        />

        <SearchableTable
          title="Interest Saved by Extra Monthly Payment"
          description="How much does each extra dollar save on common loan balances at 7% interest?"
          headers={['Loan Balance', 'Rate', 'Min Payment', '+$50/mo saves', '+$100/mo saves', '+$200/mo saves']}
          rows={loanPayoffByExtra}
          searchKey="Loan Balance"
          searchPlaceholder="Search..."
        />

        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Payoff Date Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Payoff Date USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Loan Payoff Date Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, on a $45,000 car loan at 6.9%, your loan payoff date calculator USA 2026 shows your exact debt-free month with your current payment — and how quickly extra payments accelerate it.
        </p>
      </Card>

        <SEOContent {...payoffDateSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
