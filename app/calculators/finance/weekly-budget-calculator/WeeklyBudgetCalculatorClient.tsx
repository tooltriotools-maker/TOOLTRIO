'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { weeklyBudgetSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
const DEFAULT_CATEGORIES = [
  { name: 'Groceries & Food', amount: 150, color: '#16a34a' },
  { name: 'Transportation/Gas', amount: 60, color: '#3b82f6' },
  { name: 'Dining & Coffee', amount: 80, color: '#f59e0b' },
  { name: 'Entertainment', amount: 40, color: '#8b5cf6' },
  { name: 'Personal Care', amount: 25, color: '#ec4899' },
  { name: 'Health/Pharmacy', amount: 20, color: '#14b8a6' },
  { name: 'Shopping/Clothing', amount: 50, color: '#f97316' },
  { name: 'Subscriptions', amount: 20, color: '#64748b' },
]

export default function WeeklyBudgetCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug}: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const m = currency.code === 'INR' ? 10 : 1

  const [weeklyIncome, setWeeklyIncome] = useState(1200 * m)
  const [categories, setCategories]     = useState(DEFAULT_CATEGORIES.map(c => ({ ...c, amount: Math.round(c.amount * m) })))

  const totalSpending    = categories.reduce((s, c) => s + c.amount, 0)
  const weeklySurplus    = weeklyIncome - totalSpending
  const annualSavings    = weeklySurplus * 52
  const savingsRate      = weeklyIncome > 0 ? Math.round(weeklySurplus / weeklyIncome * 100) : 0
  const monthlyEquiv     = Math.round(weeklyIncome * 52 / 12)
  const monthlySpending  = Math.round(totalSpending * 52 / 12)

  const updateCategory = (idx: number, amount: number) => {
    const updated = [...categories]
    updated[idx] = { ...updated[idx], amount }
    setCategories(updated)
  }

  const pieData = categories.filter(c => c.amount > 0).map(c => ({ name: c.name, value: c.amount, color: c.color }))

  const annualData = [
    { name: 'Spending', value: totalSpending * 52 },
    { name: 'Savings', value: Math.max(0, weeklySurplus * 52) },
  ]

  return (
    <CalculatorLayout title="Weekly Budget Calculator USA 2026" description="Plan your weekly spending and savings with the 50/30/20 rule tailored for weekly paychecks." icon="📆" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="weekly-budget-calculator"
      blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Weekly Income</h2>
          <InputField label={`Weekly Take-Home (${currency.symbol})`} value={weeklyIncome} onChange={setWeeklyIncome} min={100} max={50000} step={50} prefix={currency.symbol} />
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mt-6 mb-4">Weekly Expenses</h2>
          <div className="space-y-3">
            {categories.map((cat, idx) => (
              <div key={cat.name}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                  <label className="text-xs text-gray-500">{cat.name}</label>
                </div>
                <InputField label="" value={cat.amount} onChange={(v) => updateCategory(idx, v)} min={0} max={weeklyIncome} step={5} prefix={currency.symbol} showSlider={false} />
              </div>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label={weeklySurplus >= 0 ? 'Weekly Surplus' : 'Weekly Deficit'} value={fmt(Math.abs(weeklySurplus))} subValue={weeklySurplus >= 0 ? 'Saved per week' : 'Over budget!'} highlight />
            <ResultCard label="Savings Rate" value={`${Math.max(0, savingsRate)}%`} subValue={savingsRate >= 20 ? 'v Great' : savingsRate >= 10 ? '^ Keep going' : '⚠️ Low'} />
            <ResultCard label="Weekly Spending" value={fmt(totalSpending)} subValue="Total expenses" />
            <ResultCard label="Annual Savings" value={fmtCompact(Math.max(0, annualSavings))} subValue="If consistent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Weekly Spending Breakdown</h3>
              <ChartWrapper height={200}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2} dataKey="value">
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Annualized Summary</h3>
              <div className="space-y-2 text-sm">
                {[
                  ['Weekly Income', fmt(weeklyIncome)],
                  ['Weekly Spending', fmt(totalSpending)],
                  ['Weekly Surplus', fmt(Math.abs(weeklySurplus))],
                  ['Monthly Income (/12x52)', fmt(monthlyEquiv)],
                  ['Monthly Spending (/12x52)', fmt(monthlySpending)],
                  ['Annual Income', fmtCompact(weeklyIncome * 52)],
                  ['Annual Spending', fmtCompact(totalSpending * 52)],
                  ['Annual Savings', fmtCompact(Math.max(0, annualSavings))],
                ].map(([l, v]) => (
                  <div key={l} className={`flex justify-between border-b border-gray-100 pb-1.5 last:border-0 ${l === 'Annual Savings' ? 'font-bold text-gray-900' : ''}`}>
                    <span className="text-gray-500">{l}</span><span>{v}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Category Breakdown (weekly)</h3>
            <div className="space-y-2">
              {[...categories].sort((a, b) => b.amount - a.amount).map((cat) => (
                <div key={cat.name} className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                  <span className="text-xs text-gray-500 w-36 truncate">{cat.name}</span>
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${Math.min(100, Math.round(cat.amount / totalSpending * 100))}%`, background: cat.color }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-900 w-16 text-right">{fmt(cat.amount)}</span>
                  <span className="text-xs text-gray-500 w-8 text-right">{Math.round(cat.amount / weeklyIncome * 100)}%</span>
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
          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Budget Calculator", href: "/calculators/finance/budget-calculator", icon: "📋", desc: "Free calculator" },          { name: "Emergency Fund Calculator", href: "/calculators/finance/emergency-fund-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "Savings Goal Calculator", href: "/calculators/finance/savings-goal-calculator", icon: "🎯", desc: "Free calculator" },          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },          { name: "Annual Income Calculator", href: "/calculators/finance/annual-income-calculator", icon: "💰", desc: "Free calculator" },          { name: "Paycheck Calculator", href: "/calculators/finance/paycheck-calculator", icon: "💵", desc: "Free calculator" },          { name: "Wealth Calculator", href: "/calculators/finance/wealth-calculator", icon: "💎", desc: "Free calculator" },          { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },
          ]}
        />
        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Weekly Budget Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          On a $75,000 salary, the 50/30/20 rule suggests: <strong>$37,500</strong> for needs, $22,500 for wants, and $15,000 for savings and debt repayment.
        </p>
        <p className="text-sm text-gray-600">
          This Weekly Budget USA 2026 planner helps you allocate your income optimally and track progress toward your financial goals.
        </p>
      </Card>
      
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-black text-gray-900 mb-3">Weekly Budget Calculator USA 2026 – A Practical Budget for Weekly Paychecks</h2>
        <p className="text-sm text-gray-600">Monthly budgets can feel abstract when you're paid weekly. This weekly budget calculator USA 2026 breaks your finances into weekly increments that match your pay cycle — making it easier to track spending.</p>
      </Card>

        <SEOContent {...weeklyBudgetSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
      
    
    </CalculatorLayout>
  )
}
