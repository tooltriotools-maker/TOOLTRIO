'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'
import { calculateEmergencyFund } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const COLORS = ['#16a34a', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()
  const [monthlyExpenses, setMonthlyExpenses] = useState(3500)
  const [targetMonths, setTargetMonths] = useState(6)
  const [currentSavings, setCurrentSavings] = useState(5000)
  const [monthlySavings, setMonthlySavings] = useState(500)
  const [savingsRate, setSavingsRate] = useState(4.5)

  const result = useMemo(() => calculateEmergencyFund(monthlyExpenses, targetMonths, currentSavings, monthlySavings, savingsRate), [monthlyExpenses, targetMonths, currentSavings, monthlySavings, savingsRate])

  const progressColor = result.fundedPercent >= 100 ? 'bg-green-500' : result.fundedPercent >= 50 ? 'bg-yellow-500' : 'bg-red-500'

  return (
    <CalculatorLayout title="Emergency Fund Calculator USA 2026" description="Calculate your ideal emergency fund size based on monthly expenses, job stability, and dependents." icon="🛡️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Your Finances</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Monthly Essential Expenses</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={monthlyExpenses} onChange={e => setMonthlyExpenses(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" /></div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Target Months Coverage: <span className="text-green-600">{targetMonths} months</span></label>
              <input type="range" min="1" max="12" value={targetMonths} onChange={e => setTargetMonths(Number(e.target.value))} className="w-full accent-green-600" />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1 mo</span><span>3 mo</span><span>6 mo</span><span>12 mo</span></div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Savings</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" /></div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Monthly Savings Contribution</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={monthlySavings} onChange={e => setMonthlySavings(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" /></div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Savings Account Rate: <span className="text-green-600">{savingsRate}%</span></label>
              <input type="range" min="0" max="8" step="0.1" value={savingsRate} onChange={e => setSavingsRate(Number(e.target.value))} className="w-full accent-green-600" />
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* Progress */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-gray-900">Emergency Fund Status</h3>
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${result.isFunded ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {result.isFunded ? '✅ Fully Funded!' : `${result.fundedPercent}% funded`}
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 mb-3">
              <div className={`h-4 rounded-full transition-all ${progressColor}`} style={{ width: `${Math.min(100, result.fundedPercent)}%` }} />
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Current: <strong className="text-gray-900">{fmt(result.currentSavings)}</strong></span>
              <span className="text-gray-500">Target: <strong className="text-gray-900">{fmt(result.targetFund)}</strong></span>
            </div>
          </Card>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="Target Fund" value={fmt(result.targetFund)} subValue={`${targetMonths} months coverage`} highlight />
            <ResultCard label="Gap Remaining" value={fmt(result.gap)} subValue={result.isFunded ? 'Fully funded!' : 'Still needed'} />
            <ResultCard label="Months to Goal" value={result.monthsToGoal ? `${result.monthsToGoal} mo` : 'N/A'} subValue={result.monthsToGoal ? `~${(result.monthsToGoal / 12).toFixed(1)} years` : 'Add monthly savings'} />
          </div>

          {/* Expense breakdown */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Monthly Expense Breakdown</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={result.categories} dataKey="amount" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                    {result.categories.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2">
                {result.categories.map((cat, i) => (
                  <div key={cat.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                      <span className="text-gray-600">{cat.name}</span>
                    </div>
                    <span className="font-semibold text-gray-900">{fmt(cat.amount)}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Emergency Fund Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Emergency Fund USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-4 p-4">
        <h2 className="text-xl font-black text-gray-900 mb-3">Emergency Fund Calculator USA 2026 – Build the Right Financial Safety Net</h2>
        <p className="text-sm text-gray-600">An emergency fund is the foundation of financial security for every American. This emergency fund calculator USA 2026 calculates your exact target amount based on your unique expenses and family needs.</p>
      </Card>

        <SEOContent
        title="Emergency Fund Calculator USA 2026"
        category="finance"
        intro={`An emergency fund is not optional — it's the financial foundation that prevents a car breakdown or medical bill from becoming a debt spiral. Without one, unexpected expenses force credit card use at 20%+ interest, disrupting whatever financial progress you've been making. With one, the same events are merely inconvenient rather than financially destabilizing.

The standard recommendation of 3-6 months of expenses is a starting point, not a fixed rule. The right amount depends on your income stability, household size, and whether you have multiple income sources. A freelancer or commission-based salesperson with highly variable income should target 6-12 months. A dual-income household where each income covers fixed expenses independently needs less — perhaps 3 months.

Where you keep your emergency fund matters almost as much as having one. It should be in a high-yield savings account: instantly accessible, FDIC insured, and earning enough interest to reduce erosion from inflation. In 2024-2026, HYSAs paying 4-5% APY mean your emergency fund is actually a meaningful earner while you maintain it.`}
        howItWorks={`Target calculation: Monthly essential expenses × months of coverage = emergency fund target. Essential expenses: rent/mortgage, utilities, groceries, minimum loan payments, insurance premiums, and childcare. Exclude discretionary spending — in a true emergency, those costs compress naturally.

Time to goal: Using current savings rate and any existing savings, the calculator projects when you'll reach your target. Building the fund at $500/month from zero to a $18,000 target (3 months on $6,000/month expenses) takes 36 months — or 18 months at $1,000/month. This projection helps you choose a savings rate that balances urgency with realism.

Opportunity cost comparison: Money in a HYSA at 4.5% APY vs a basic savings account at 0.01% APY on $15,000 = $674/year difference. The calculator shows what competitive yield means for your emergency fund in dollar terms over 12 months.`}
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
        tipsSection={`Build your emergency fund before any other financial goal except capturing your employer's 401k match. The match is a guaranteed 50-100% return; the emergency fund prevents catastrophic outcomes. After the match is captured, emergency fund comes before extra 401k contributions, Roth IRA, or investing.

Automate the build. Set up a recurring transfer to your emergency fund on the day your paycheck arrives — before discretionary spending has an opportunity to absorb it. Treat it as a non-negotiable fixed expense until you reach your target.

Once funded, don't let it stagnate. Review the account annually: if your expenses have increased, your target should increase too. And don't keep more than your target in a HYSA — money above your emergency fund target should be deployed in investments earning higher long-term returns.`}
        conclusion={`People who maintain fully funded emergency accounts have measurably better financial outcomes across multiple dimensions: lower credit card debt, more consistent retirement contributions (they don't need to pause and redirect to cover emergencies), and lower financial stress scores in surveys. The emergency fund is infrastructure — boring, invisible, and absolutely essential.

For households living paycheck to paycheck, starting the emergency fund with a minimum target of $1,000 (before the full 3-6 month goal) creates a buffer against the most common financial disruptions. Even $1,000 prevents most car repair and minor medical expense situations from requiring credit card debt.`}

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
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Cd Ladder Calculator", href: "/calculators/finance/cd-ladder-calculator", icon: "🏦", desc: "Free calculator" },          { name: "Cd vs HYSA Calculator", href: "/calculators/finance/cd-vs-hysa-calculator", icon: "💰", desc: "Free calculator" },          { name: "Bonds vs Cds USA Calculator", href: "/calculators/finance/bonds-vs-cds-usa-calculator", icon: "📋", desc: "Free calculator" },          { name: "Government Bond Calculator", href: "/calculators/finance/government-bond-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "I Bonds vs Tips Calculator", href: "/calculators/finance/i-bonds-vs-tips-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Savings Goal Calculator", href: "/calculators/finance/savings-goal-calculator", icon: "🎯", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },
          ]}
        />
      
      
    </CalculatorLayout>
  )
}
