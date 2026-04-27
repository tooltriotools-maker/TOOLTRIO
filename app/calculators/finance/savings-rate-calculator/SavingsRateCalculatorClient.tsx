'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { calculateSavingsRate } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { savingsRateSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
export default function SavingsRateCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug}: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const m = currency.code === 'INR' ? 10 : 1

  const [income, setIncome]       = useState(5000 * m)
  const [expenses, setExpenses]   = useState(3500 * m)
  const [retirement, setRetirement] = useState(500 * m)
  const [otherSavings, setOtherSavings] = useState(200 * m)

  const result = useMemo(() => calculateSavingsRate(income, expenses, retirement, otherSavings), [income, expenses, retirement, otherSavings])

  const tableData = Object.entries(result.yearsToFIRETable).map(([rate, years]) => ({
    rate: `${rate}%`, years, color: Number(rate) >= 40 ? '#16a34a' : Number(rate) >= 25 ? '#f59e0b' : '#ef4444'
  }))

  const barColors = tableData.map(d => d.color)

  return (
    <CalculatorLayout title="Savings Rate Calculator USA 2026" description="Calculate your personal savings rate and how each 1% increase accelerates your FIRE date." icon="💰" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="savings-rate-calculator"
      blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Your Finances</h2>
          <div className="space-y-5">
            <InputField label={`Monthly Take-Home Income (${currency.symbol})`} value={income} onChange={setIncome} min={500} max={100000} step={100} prefix={currency.symbol} />
            <InputField label={`Monthly Expenses (${currency.symbol})`} value={expenses} onChange={setExpenses} min={0} max={income} step={100} prefix={currency.symbol} />
            <InputField label={`Retirement Contributions (${currency.symbol})`} value={retirement} onChange={setRetirement} min={0} max={income} step={50} prefix={currency.symbol} />
            <InputField label={`Other Monthly Savings (${currency.symbol})`} value={otherSavings} onChange={setOtherSavings} min={0} max={income} step={50} prefix={currency.symbol} />
          </div>

          <div className="mt-5 p-4 bg-white rounded-xl">
            <p className="text-xs font-bold text-gray-600 mb-2">Savings Rate Benchmarks</p>
            <div className="space-y-1 text-xs">
              {[['10%', 'Minimum (Fidelity)', '#ef4444'], ['15%', 'Recommended', '#f59e0b'], ['20%', '50/30/20 Target', '#3b82f6'], ['30%', 'Accelerated', '#16a34a'], ['50%+', 'FIRE Fast Track', '#8b5cf6']].map(([r, l, c]) => (
                <div key={r} className="flex justify-between items-center">
                  <span style={{ color: c }} className="font-bold">{r}</span>
                  <span className="text-gray-500">{l}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Your Savings Rate" value={`${result.savingsRate}%`} subValue={result.savingsRate >= 20 ? 'v On track' : '⚠️ Build more'} highlight />
            <ResultCard label="Years to FIRE" value={result.yearsToFIRE > 100 ? '100+ yrs' : `${result.yearsToFIRE} yrs`} subValue="At current rate" />
            <ResultCard label="Monthly Savings" value={fmt(result.totalSavings)} subValue="Saved per month" />
            <ResultCard label="Annual Savings" value={fmtCompact(result.annualSavings)} subValue="Per year" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Years to Financial Independence by Savings Rate</h3>
            <ChartWrapper height={240}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tableData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="rate" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip formatter={(v: number) => [`${v} years`, 'Years to FI']} />
                  <Bar dataKey="years" name="Years to FI" radius={[4, 4, 0, 0]}>
                    {tableData.map((entry, i) => <Cell key={i} fill={barColors[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Savings Rate Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Monthly Income', fmt(income)],
                ['Monthly Expenses', fmt(expenses)],
                ['Monthly Savings', fmt(result.totalSavings)],
                ['Savings Rate', `${result.savingsRate}%`],
                ['Annual Income', fmtCompact(result.annualIncome)],
                ['Annual Savings', fmtCompact(result.annualSavings)],
                ['Annual Expenses', fmtCompact(result.annualExpenses)],
                ['FIRE Number (25x)', fmtCompact(result.annualExpenses * 25)],
              ].map(([l, v]) => (
                <div key={l} className="flex justify-between border-b border-gray-100 pb-1.5">
                  <span className="text-gray-500">{l}</span><span className="font-semibold">{v}</span>
                </div>
              ))}
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
          { name: "Annual Income Calculator", href: "/calculators/finance/annual-income-calculator", icon: "💰", desc: "Free calculator" },          { name: "Salary Calculator", href: "/calculators/finance/salary-calculator", icon: "💼", desc: "Free calculator" },          { name: "Paycheck Calculator", href: "/calculators/finance/paycheck-calculator", icon: "💵", desc: "Free calculator" },          { name: "Salary Hike Calculator", href: "/calculators/finance/salary-hike-calculator", icon: "📈", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "📋", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },
          ]}
        />
        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Savings Rate Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          $10,000 in a high-yield savings account at 4.5% APY earns <strong>$450</strong> in the first year. Over 5 years with monthly additions of $500, it grows to $43,500+.
        </p>
        <p className="text-sm text-gray-600">
          Use this Savings Rate USA 2026 tool to compare rates, terms, and contribution strategies to maximize your savings returns.
        </p>
      </Card>
      
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-black text-gray-900 mb-3">Savings Rate Calculator USA 2026 – The One Number That Determines When You Retire</h2>
        <p className="text-sm text-gray-600">Your savings rate — not your income — determines when you reach financial independence. This savings rate calculator USA 2026 shows your current rate and exactly how many years each additional 1% cuts from your path to FIRE.</p>
      </Card>

        <SEOContent {...savingsRateSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
