'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateBudgetPlan } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { budgetPlannerSEOContent } from '@/lib/seo/calculator-seo-content'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { SearchableTable } from '@/components/ui/SearchableTable'
import { budgetByIncomeLevel } from '@/lib/seo/finance-tables'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
const DEFAULT_EXPENSES = [
  { name: 'Rent/Mortgage', amount: 1500, category: 'needs' as const },
  { name: 'Groceries', amount: 400, category: 'needs' as const },
  { name: 'Utilities', amount: 150, category: 'needs' as const },
  { name: 'Transportation', amount: 300, category: 'needs' as const },
  { name: 'Health Insurance', amount: 200, category: 'needs' as const },
  { name: 'Dining Out', amount: 250, category: 'wants' as const },
  { name: 'Entertainment', amount: 150, category: 'wants' as const },
  { name: 'Shopping', amount: 200, category: 'wants' as const },
  { name: 'Subscriptions', amount: 80, category: 'wants' as const },
  { name: '401k / IRA', amount: 400, category: 'savings' as const },
  { name: 'Emergency Fund', amount: 200, category: 'savings' as const },
]

export default function BudgetPlannerCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug}: Props) {
  const { currency, fmt } = useCurrency()

  const multiplier = currency.code === 'INR' ? 10 : currency.code === 'EUR' ? 0.9 : 1
  const [income, setIncome] = useState(Math.round(5000 * multiplier))
  const [expenses, setExpenses] = useState(DEFAULT_EXPENSES.map(e => ({ ...e, amount: Math.round(e.amount * multiplier) })))

  const result = useMemo(() => calculateBudgetPlan(income, expenses), [income, expenses])

  const updateExpense = (idx: number, amount: number) => {
    const updated = [...expenses]
    updated[idx] = { ...updated[idx], amount }
    setExpenses(updated)
  }

  const pieData = [
    { name: 'Needs', value: result.totalNeeds, color: '#3b82f6' },
    { name: 'Wants', value: result.totalWants, color: '#f59e0b' },
    { name: 'Savings', value: result.totalSavings, color: '#16a34a' },
    ...(result.surplus > 0 ? [{ name: 'Unallocated', value: result.surplus, color: '#8b5cf6' }] : []),
  ]

  const barData = [
    { cat: 'Needs (50%)', actual: result.needsPct, ideal: 50, over: result.needsOver },
    { cat: 'Wants (30%)', actual: result.wantsPct, ideal: 30, over: result.wantsOver },
    { cat: 'Savings (20%)', actual: result.savingsPct, ideal: 20, under: result.savingsUnder },
  ]

  return (
    <CalculatorLayout title="Budget Planner Calculator USA 2026" description="Build a detailed monthly budget and track income vs expenses with savings rate analysis." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="budget-planner-calculator"
      blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Monthly Income</h2>
            <InputField label={`Take-Home Pay (${currency.symbol})`} value={income} onChange={setIncome} min={500} max={100000} step={100} prefix={currency.symbol} />
          </Card>
          <Card>
            <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4">Needs (Housing, Food, Bills)</h2>
            <div className="space-y-3">
              {expenses.filter(e => e.category === 'needs').map((e, i) => (
                <div key={e.name}>
                  <label className="text-xs text-gray-500 mb-1 block">{e.name}</label>
                  <InputField label="" value={e.amount} onChange={(v) => updateExpense(expenses.indexOf(e), v)} min={0} max={income} step={50} prefix={currency.symbol} showSlider={false} />
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-4">Wants (Lifestyle)</h2>
            <div className="space-y-3">
              {expenses.filter(e => e.category === 'wants').map((e) => (
                <div key={e.name}>
                  <label className="text-xs text-gray-500 mb-1 block">{e.name}</label>
                  <InputField label="" value={e.amount} onChange={(v) => updateExpense(expenses.indexOf(e), v)} min={0} max={income} step={25} prefix={currency.symbol} showSlider={false} />
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Savings & Investments</h2>
            <div className="space-y-3">
              {expenses.filter(e => e.category === 'savings').map((e) => (
                <div key={e.name}>
                  <label className="text-xs text-gray-500 mb-1 block">{e.name}</label>
                  <InputField label="" value={e.amount} onChange={(v) => updateExpense(expenses.indexOf(e), v)} min={0} max={income} step={50} prefix={currency.symbol} showSlider={false} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label={result.surplus >= 0 ? 'Monthly Surplus' : 'Monthly Deficit'} value={fmt(Math.abs(result.surplus))} subValue={result.surplus >= 0 ? 'Unallocated' : 'Over budget!'} highlight />
            <ResultCard label="Savings Rate" value={`${result.savingsPct}%`} subValue={result.savingsPct >= 20 ? 'v On track' : '⚠️ Below 20%'} />
            <ResultCard label="Needs" value={`${result.needsPct}%`} subValue={result.needsPct <= 50 ? 'v Good' : '⚠️ Over 50%'} />
            <ResultCard label="Wants" value={`${result.wantsPct}%`} subValue={result.wantsPct <= 30 ? 'v Good' : '⚠️ Over 30%'} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Budget Breakdown</h3>
              <ChartWrapper height={180}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                      {pieData.map((_, i) => <Cell key={i} fill={pieData[i].color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
              <div className="space-y-1.5 mt-1">
                {pieData.map(p => (
                  <div key={p.name} className="flex justify-between text-xs">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: p.color }} />{p.name}</span>
                    <span className="font-semibold">{fmt(p.value)}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">50/30/20 Rule Analysis</h3>
              <div className="space-y-3">
                {[
                  { label: 'Needs', actual: result.totalNeeds, ideal: result.idealNeeds, pct: result.needsPct, color: '#3b82f6', target: 50 },
                  { label: 'Wants', actual: result.totalWants, ideal: result.idealWants, pct: result.wantsPct, color: '#f59e0b', target: 30 },
                  { label: 'Savings', actual: result.totalSavings, ideal: result.idealSavings, pct: result.savingsPct, color: '#16a34a', target: 20 },
                ].map(row => (
                  <div key={row.label} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold" style={{ color: row.color }}>{row.label} (target: {row.target}%)</span>
                      <span className={row.pct > row.target * 1.1 ? 'text-red-500 font-bold' : row.pct < row.target * 0.9 && row.label === 'Savings' ? 'text-amber-500 font-bold' : 'text-gray-500'}>
                        {row.pct}% . {fmt(row.actual)}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, row.pct)}%`, background: row.color }} />
                    </div>
                    <div className="text-xs text-gray-500">Ideal: {fmt(row.ideal)} . {row.actual > row.ideal ? `${fmt(row.actual - row.ideal)} over` : `${fmt(row.ideal - row.actual)} under`}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Monthly Budget Summary</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                {[
                  ['Monthly Income', fmt(income)],
                  ['Total Needs', fmt(result.totalNeeds)],
                  ['Total Wants', fmt(result.totalWants)],
                  ['Total Savings', fmt(result.totalSavings)],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="text-gray-500">{l}</span><span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  ['Total Expenses', fmt(result.totalExpenses)],
                  ['Ideal Needs (50%)', fmt(result.idealNeeds)],
                  ['Ideal Wants (30%)', fmt(result.idealWants)],
                  ['Ideal Savings (20%)', fmt(result.idealSavings)],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between border-b border-gray-100 pb-1">
                    <span className="text-gray-500">{l}</span><span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
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
          { name: "Annual Income Calculator", href: "/calculators/finance/annual-income-calculator", icon: "💰", desc: "Free calculator" },          { name: "Salary Calculator", href: "/calculators/finance/salary-calculator", icon: "💼", desc: "Free calculator" },          { name: "Paycheck Calculator", href: "/calculators/finance/paycheck-calculator", icon: "💵", desc: "Free calculator" },          { name: "Salary Hike Calculator", href: "/calculators/finance/salary-hike-calculator", icon: "📈", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "📋", desc: "Free calculator" },          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },
          ]}
        />

        <SearchableTable
          title="50/30/20 Budget by Income Level (USA 2026)"
          description="Recommended budget allocation by annual salary -- after-tax"
          headers={['Annual Income', 'Take-Home/mo', 'Housing (50% needs)', 'Food', 'Transport', 'Entertainment (30%)', 'Savings (20%)']}
          rows={budgetByIncomeLevel}
          searchKey="Annual Income"
          searchPlaceholder="Search..."
        />

        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Budget Planner Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          On a $75,000 salary, the 50/30/20 rule suggests: <strong>$37,500</strong> for needs, $22,500 for wants, and $15,000 for savings and debt repayment.
        </p>
        <p className="text-sm text-gray-600">
          This Budget Planner USA 2026 planner helps you allocate your income optimally and track progress toward your financial goals.
        </p>
      </Card>
      <SEOContent {...budgetPlannerSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
    
    </CalculatorLayout>
  )
}
