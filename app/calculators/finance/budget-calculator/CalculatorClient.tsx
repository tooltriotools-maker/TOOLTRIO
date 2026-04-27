'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateBudget } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const DEFAULT_CATEGORIES = [
  { name: 'Housing / Rent', planned: 1500, actual: 1500 },
  { name: 'Groceries', planned: 600, actual: 650 },
  { name: 'Transportation', planned: 400, actual: 420 },
  { name: 'Utilities', planned: 200, actual: 185 },
  { name: 'Healthcare', planned: 150, actual: 120 },
  { name: 'Dining Out', planned: 300, actual: 380 },
  { name: 'Entertainment', planned: 200, actual: 175 },
  { name: 'Clothing', planned: 150, actual: 90 },
  { name: 'Savings / Invest', planned: 500, actual: 500 },
  { name: 'Other', planned: 200, actual: 220 },
]

const COLORS = ['#22c55e','#3b82f6','#f59e0b','#ec4899','#8b5cf6','#06b6d4','#ef4444','#84cc16','#f97316','#6b7280']

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues
  const scale = currency.code === 'INR' ? 80 : 1

  const [income, setIncome] = useState(Math.round(5000 * scale))
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES.map(c => ({
    ...c, planned: Math.round(c.planned * scale), actual: Math.round(c.actual * scale)
  })))
  const [activeTab, setActiveTab] = useState<'planned' | 'actual'>('actual')

  const result = useMemo(() => calculateBudget(income, categories), [income, categories])
  const step = currency.code === 'INR' ? 500 : 50

  const update = (idx: number, field: string, val: any) => {
    const next = [...categories]; (next[idx] as any)[field] = val; setCategories(next)
  }
  const remove = (idx: number) => setCategories(categories.filter((_, i) => i !== idx))
  const add = () => setCategories([...categories, { name: 'New Category', planned: Math.round(100 * scale), actual: Math.round(100 * scale) }])

  const pieData = result.categories.map((c, i) => ({ name: c.name, value: activeTab === 'planned' ? c.planned : c.actual, color: COLORS[i % COLORS.length] })).filter(c => c.value > 0)
  const rule5030 = { needs: result.categories.filter((_, i) => i < 5).reduce((s, c) => s + c.actual, 0), wants: result.categories.filter((_, i) => i >= 5 && i < 8).reduce((s, c) => s + c.actual, 0), savings: result.categories.filter((_, i) => i >= 8).reduce((s, c) => s + c.actual, 0) }

  return (
    <CalculatorLayout title="Budget Calculator USA 2026" description={`Plan and track your monthly budget in ${currency.name}. 50/30/20 rule analysis, spending breakdown, and savings rate.`} icon="💰" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Monthly Income</h2>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 mb-6">
            <span className="text-green-600 text-sm">{currency.symbol}</span>
            <input type="number" value={income} onChange={e => setIncome(Number(e.target.value))} step={step}
              className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
          </div>

          <h3 className="text-sm font-semibold text-gray-700 mb-3">Budget Categories</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {categories.map((cat, i) => (
              <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="w-3 h-3 rounded-full flex-shrink-0 mr-1" style={{ background: COLORS[i % COLORS.length] }} />
                  <input value={cat.name} onChange={e => update(i, 'name', e.target.value)}
                    className="bg-transparent text-sm font-semibold text-gray-800 outline-none flex-1" />
                  <button onClick={() => remove(i)} className="text-gray-300 hover:text-red-400 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['planned', 'actual'] as const).map(field => (
                    <div key={field}>
                      <p className="text-xs text-gray-400 mb-0.5 capitalize">{field}</p>
                      <input type="number" value={cat[field]} onChange={e => update(i, field, Number(e.target.value))} step={step}
                        className="w-full bg-white border border-gray-200 rounded-lg px-2 py-1 text-gray-800 text-xs font-semibold outline-none text-right" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <button onClick={add} className="w-full mt-3 flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-green-300 text-green-600 text-sm hover:bg-green-50 transition-all">
            <Plus className="w-4 h-4" /> Add Category
          </button>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly Income" value={fmtCompact(income)} />
            <ResultCard label="Total Spent" value={fmtCompact(result.totalActual)} />
            <ResultCard label="Surplus / Deficit" value={fmtCompact(result.surplus)} highlight subValue={result.surplus >= 0 ? 'Surplus' : 'Deficit'} />
            <ResultCard label="Savings Rate" value={`${result.savingsRate.toFixed(1)}%`} subValue={result.savingsRate >= 20 ? 'Great!' : result.savingsRate >= 10 ? 'Good' : 'Improve'} />
          </div>

          {/* 50/30/20 Rule */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">50/30/20 Rule Analysis</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Needs (50%)', value: rule5030.needs, target: income * 0.5, color: 'green' },
                { label: 'Wants (30%)', value: rule5030.wants, target: income * 0.3, color: 'blue' },
                { label: 'Savings (20%)', value: rule5030.savings, target: income * 0.2, color: 'purple' },
              ].map(({ label, value, target, color }) => {
                const pct = income > 0 ? (value / income) * 100 : 0
                const ok = value <= target
                return (
                  <div key={label} className="p-3 rounded-xl bg-gray-50 border border-gray-100 text-center">
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className={`text-lg font-black ${ok ? 'text-green-600' : 'text-red-500'}`}>{pct.toFixed(0)}%</p>
                    <p className="text-xs text-gray-400">{fmt(value)}</p>
                    <div className="mt-2 bg-gray-200 rounded-full h-1.5">
                      <div className={`h-1.5 rounded-full transition-all ${ok ? 'bg-green-500' : 'bg-red-400'}`} style={{ width: `${Math.min(pct / (income > 0 ? 60 : 1) * 100, 100)}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pie chart */}
            <Card>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700">Spending Breakdown</h3>
                <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
                  {(['planned', 'actual'] as const).map(t => (
                    <button key={t} onClick={() => setActiveTab(t)}
                      className={`text-xs px-2 py-0.5 rounded-md font-medium capitalize transition-all ${activeTab === t ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500'}`}>{t}</button>
                  ))}
                </div>
              </div>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={2}>
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Planned vs Actual bar */}
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Planned vs Actual</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={result.categories.slice(0, 6)} margin={{ top: 0, right: 5, left: 0, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 9 }} angle={-30} textAnchor="end" axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={50} tickFormatter={v => `${currency.symbol}${v >= 1000 ? (v/1000).toFixed(0)+'k' : v}`} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="planned" name="Planned" fill="#3b82f6" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="actual" name="Actual" fill="#22c55e" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Category table */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Full Budget Summary</h3>
            <div className="overflow-x-auto">
              <table className="calc-table">
                <thead><tr><th>Category</th><th>Planned</th><th>Actual</th><th>Variance</th><th>% of Income</th></tr></thead>
                <tbody>
                  {result.categories.map((c, i) => (
                    <tr key={i}>
                      <td className="font-medium text-gray-800">
                        <span className="inline-block w-2.5 h-2.5 rounded-full mr-2" style={{ background: COLORS[i % COLORS.length] }} />
                        {c.name}
                      </td>
                      <td>{fmt(c.planned)}</td>
                      <td>{fmt(c.actual)}</td>
                      <td className={c.variance >= 0 ? 'text-green-600' : 'text-red-400'}>{c.variance >= 0 ? '+' : ''}{fmt(c.variance)}</td>
                      <td>{c.percentOfIncome.toFixed(1)}%</td>
                    </tr>
                  ))}
                  <tr className="font-bold bg-green-50">
                    <td>Total</td>
                    <td>{fmt(result.totalPlanned)}</td>
                    <td>{fmt(result.totalActual)}</td>
                    <td className={result.surplus >= 0 ? 'text-green-600' : 'text-red-400'}>{result.surplus >= 0 ? '+' : ''}{fmt(result.surplus)}</td>
                    <td>{((result.totalActual / (income || 1)) * 100).toFixed(1)}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Budget Calculator -- Plan Every Dollar, Build Real Wealth USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">The 50/30/20 Rule Explained</h3>
              <p>The 50/30/20 rule provides a simple framework: 50% of after-tax income for needs (housing, food, utilities, minimum debt payments, insurance), 30% for wants (dining out, entertainment, hobbies, subscriptions), and 20% for savings and extra debt payments. It is a starting guideline, not a rigid rule -- high-cost-of-living cities like New York or San Francisco may require 60-65% for needs, leaving less for wants.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Zero-Based Budgeting vs Percentage Budgeting</h3>
              <p>Zero-based budgeting (popularized by YNAB) assigns every dollar a specific purpose so income minus all allocations equals zero. It requires more discipline but eliminates the "where did my money go?" problem. Percentage budgeting (50/30/20) is simpler and more forgiving -- ideal for beginners. Either system works if followed consistently. The best budget is the one you actually use.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Increasing Your Savings Rate</h3>
              <p>The most powerful financial lever is your savings rate. Moving from 10% to 20% can cut your path to financial independence by 8 years. Strategies: (1) Automate savings on payday before spending -- out of sight, out of mind. (2) Direct 50% of every raise to savings before lifestyle inflation occurs. (3) Audit subscriptions monthly -- the average American has 4+ unused subscriptions totaling $200+/month. (4) Meal prep and cook at home -- food is typically the highest-variance budget category.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Emergency Fund First, Then Invest</h3>
              <p>Before aggressively investing, build a 3-6 month expense emergency fund in a high-yield savings account (HYSA). FDIC-insured accounts at Ally, Marcus, or SoFi currently earn 4-5% APY. This prevents going into high-interest debt when unexpected expenses hit. Once your emergency fund is fully funded, direct all surplus to retirement accounts (401k match first, then Roth IRA, then max 401k), then taxable brokerage investing in low-cost index funds.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Budget Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          On a $75,000 salary, the 50/30/20 rule suggests: <strong>$37,500</strong> for needs, $22,500 for wants, and $15,000 for savings and debt repayment.
        </p>
        <p className="text-sm text-gray-600">
          This Budget USA 2026 planner helps you allocate your income optimally and track progress toward your financial goals.
        </p>
      </Card>
      <SEOContent
        title="Budget Calculator USA 2026"
        category="finance"
        intro={`A budget isn't a punishment — it's a map of where your money is actually going versus where you want it to go. Most people who feel financially stressed aren't necessarily spending too much overall; they're often spending in patterns that don't align with their actual priorities. Understanding those patterns is the first step to changing them.

The 50/30/20 framework (50% needs, 30% wants, 20% savings/debt) is a starting point, not a hard rule. Someone with high housing costs in an expensive city might run 60% on needs; that's not wrong, it's just their reality — and it means the 30% wants category needs to shrink. What matters is the saving and debt payoff category: are you consistently putting money toward your financial future?

Expense categorization reveals patterns that plain bank statements obscure. Most people dramatically underestimate their food spending (restaurants, groceries, and coffee combined), entertainment, and subscription services. The goal isn't to eliminate spending in any category — it's to make the spending visible so it becomes a conscious choice.`}
        howItWorks={`The calculator takes your income and categorizes expenses into needs (housing, utilities, groceries, insurance, minimum debt payments, transportation), wants (dining out, entertainment, subscriptions, clothing, hobbies), and savings/investments/extra debt payments.

Savings rate calculation: Monthly savings ÷ gross monthly income = savings rate. At a 20% savings rate, you reach retirement with roughly 30 years of expenses in investment accounts (using historical market returns). At 10%, you'll work longer or retire on less. At 30%+, you're on a path to financial independence faster than most people.

Debt payoff integration: High-interest debt (credit cards over 15% APR) should be treated as a near-mandatory expense with urgency comparable to fixed costs — the interest compounds against you just as powerfully as investment returns compound for you.`}
        benefits={[
          { title: "Instant Real-Time Results", text: "Results update as you type \u2014 no button clicks needed. Compare multiple scenarios in minutes to understand how each variable changes your outcome. Small changes in rate, time, or amount often have surprisingly large long-term impacts due to compounding. Use alongside the [Compound Interest Calculator](/calculators/finance/compound-interest-calculator) to model growth scenarios." },
          { title: "US-Standard Formula Accuracy", text: "All calculations use formulas recognized by US financial institutions, the CFP Board, and IRS guidelines. Whether comparing to the S&P 500's historical 10.5% annual return or evaluating debt at your specific rate, the math is the same as professional advisors use. Connect to the [ROI Calculator](/calculators/finance/roi-calculator) to benchmark your results." },
          { title: "Complete Privacy \u2014 No Data Stored", text: "Everything runs locally in your browser. No financial data is transmitted to any server or stored anywhere. When you close the tab, your inputs disappear permanently. This is essential for sensitive financial information \u2014 your income, debts, and savings details stay entirely private." },
          { title: "Connects to Your Complete Financial Picture", text: "No single calculator tells the whole story. This tool is most powerful when used alongside related calculators. The [Net Worth Calculator](/calculators/finance/net-worth-calculator) shows your total position. The [Savings Rate Calculator](/calculators/finance/savings-rate-calculator) shows whether you're saving enough. The [FIRE Calculator](/calculators/finance/fire-calculator) connects everything to your retirement timeline." },
          { title: "Scenario Comparison for Better Decisions", text: "The most valuable feature is rapid scenario comparison: what if the rate changes by 1%? What if you extend the time period by 5 years? What if you increase the monthly amount by $200? These small changes, compounded over time, often produce dramatically different outcomes. Use alongside the [Savings Goal Calculator](/calculators/finance/savings-goal-calculator) to find the inputs needed to hit specific targets." },
          { title: "Tax-Aware Planning Context", text: "Most financial calculations have tax implications. Investment returns face capital gains tax (0%, 15%, or 20% for long-term gains). Retirement account withdrawals face ordinary income tax. This calculator provides pre-tax results \u2014 use the [Income Tax Calculator](/calculators/finance/income-tax-calculator) and the [Paycheck Calculator](/calculators/finance/paycheck-calculator) to estimate after-tax outcomes for your specific situation." },
        ]}
        useCases={[
          { title: "Annual Financial Planning", text: "Run this calculator as part of your annual financial review \u2014 updating inputs with current balances, rates, and goals. Connecting results to the [Net Worth Calculator](/calculators/finance/net-worth-calculator) gives you a complete annual snapshot. Financial clarity once per year prevents the drift that leads to retirement shortfalls and unnecessary debt." },
          { title: "Major Life Decisions", text: "Career change, home purchase, marriage, having children \u2014 each major life event requires financial recalculation. Run scenarios before and after the event to understand the financial impact. Combine with the [Budget Planner Calculator](/calculators/finance/budget-planner-calculator) to verify the new scenario fits within your income and savings targets." },
          { title: "Comparing Financial Products", text: "Banks, brokers, and lenders offer products at different rates, terms, and fee structures. Run each option through this calculator to find which product produces the best outcome for your specific inputs. This is especially valuable for loans \u2014 a 0.5% rate difference on a large loan changes total cost by thousands of dollars. See also the [Compound Interest Calculator](/calculators/finance/compound-interest-calculator) for growth-side comparisons." },
          { title: "Setting Achievable Goals", text: "Work backwards from your target outcome: what inputs do you need to reach $500,000 in 20 years? What monthly contribution at your expected rate reaches your goal? This reverse-engineering approach transforms vague financial intentions into specific, actionable monthly commitments. Use the [Savings Goal Calculator](/calculators/finance/savings-goal-calculator) for goal-based projections." },
          { title: "Tracking Progress Over Time", text: "Save your baseline calculation and rerun it quarterly to measure progress. Are you on track against your original projection? Has the market return or interest rate environment changed enough to require adjusting your plan? Regular recalculation turns this from a one-time tool into an ongoing financial management system. Track your net worth progress with the [Net Worth Calculator](/calculators/finance/net-worth-calculator)." },
          { title: "Teaching Financial Concepts", text: "The best way to understand compound interest, investment returns, or debt amortization is to see the math with real numbers. This calculator makes abstract financial concepts concrete \u2014 especially valuable for teaching younger family members about money. The [FIRE Calculator](/calculators/finance/fire-calculator) is particularly powerful for demonstrating how savings rate connects to retirement age." },
        ]}
        tipsSection={`Track actual spending for 30 days before setting budget targets. Most people's estimates of their discretionary spending are wrong by 30-50%. Real data produces a budget you'll actually follow.

Build in irregular expenses from the start. Annual insurance premiums, car maintenance, holiday gifts, and medical expenses average significant monthly amounts when divided by 12 — ignoring them creates predictable budget failures. Divide your expected annual irregular expenses by 12 and put that amount into a dedicated savings account monthly.

Set a personal spending number — a weekly or daily amount that you can spend on discretionary items without tracking every line item. This provides structure without the tedium of categorizing every coffee and lunch.`}
        conclusion={`The most powerful budgeting insight isn't specific to any category — it's that small daily decisions compound into large annual outcomes. Spending an extra $15/day on food and coffee relative to a budget adds up to $5,475/year. Over 30 years invested at 7%, that daily $15 differential is worth nearly $556,000. That doesn't mean you shouldn't spend it — it means you should spend it deliberately.

A budget works best as a tool for aligning spending with values, not as a ledger of deprivation. If travel is deeply important to you, the budget should reflect that. If it's not, that money belongs somewhere else. Use [our Savings Goal Calculator](/calculators/finance/savings-goal-calculator) alongside this to set specific targets for what you're working toward.`}

        didYouKnow={[
          "The average American has only $87,000 saved for retirement by ages 55\u201364 \u2014 far below the $1.5M+ typically needed for a secure retirement (Vanguard 2026).",
          "Starting to invest at 25 vs. 35 with $500/month at 7% produces $1.3M vs. $567,000 by age 65 \u2014 a $745,000 difference from just 10 extra years of compounding.",
          "The S&P 500 has returned approximately 10.5% per year on average since 1957, turning $1 into over $1,400 with dividends reinvested over 68 years.",
        ]}
      />
      <InternalLinks
        title="Related Finance Calculators"
        variant="grid"
        links={[
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Emergency Fund Calculator", href: "/calculators/finance/emergency-fund-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
      </div>
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Weekly Budget Calculator", href: "/calculators/finance/weekly-budget-calculator", icon: "📆", desc: "Free calculator" },          { name: "Emergency Fund Calculator", href: "/calculators/finance/emergency-fund-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "Savings Goal Calculator", href: "/calculators/finance/savings-goal-calculator", icon: "🎯", desc: "Free calculator" },          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },          { name: "Annual Income Calculator", href: "/calculators/finance/annual-income-calculator", icon: "💰", desc: "Free calculator" },          { name: "Paycheck Calculator", href: "/calculators/finance/paycheck-calculator", icon: "💵", desc: "Free calculator" },          { name: "Wealth Calculator", href: "/calculators/finance/wealth-calculator", icon: "💎", desc: "Free calculator" },          { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },
          ]}
        />
      
    </CalculatorLayout>
  )
}
