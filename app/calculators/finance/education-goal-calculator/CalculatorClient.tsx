'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { calculateEducationGoal } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, SelectField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { GraduationCap, Target, TrendingUp, DollarSign, Calendar } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

const GOAL_PRESETS = [
  { label: 'College (India)', amount: 2000000 },
  { label: 'MBA (India)', amount: 3000000 },
  { label: 'Study Abroad', amount: 8000000 },
  { label: 'School Fees', amount: 500000 },
  { label: 'Custom Goal', amount: 0 },
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [goalAmount, setGoalAmount] = useState(2000000)
  const [years, setYears] = useState(15)
  const [inflationRate, setInflationRate] = useState(8)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [currentSavings, setCurrentSavings] = useState(0)
  const [selectedPreset, setSelectedPreset] = useState(0)

  const r = useMemo(() => calculateEducationGoal(goalAmount, years, inflationRate, expectedReturn, currentSavings), [goalAmount, years, inflationRate, expectedReturn, currentSavings])

  const pie = [
    { name: 'SIP Invested', value: r.totalSIPInvestment, color: '#93c5fd' },
    { name: 'Returns Earned', value: Math.max(0, r.returnsEarned), color: '#16a34a' },
    ...(currentSavings > 0 ? [{ name: 'Current Savings', value: r.fvCurrentSavings, color: '#f59e0b' }] : []),
  ]

  const applyPreset = (i: number) => {
    setSelectedPreset(i)
    if (GOAL_PRESETS[i].amount > 0) setGoalAmount(GOAL_PRESETS[i].amount)
  }

  return (
    <CalculatorLayout title="Education Goal Calculator USA 2026" description="Calculate monthly savings needed to reach any college fund target with tuition inflation." icon="🎓" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-4">Goal Details</h2>

          {/* Quick Presets */}
          <div className="mb-5">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Quick Goal Presets</label>
            <div className="grid grid-cols-2 gap-2">
              {GOAL_PRESETS.map((p, i) => (
                <button key={i} onClick={() => applyPreset(i)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-bold border-2 transition-all text-left ${selectedPreset === i ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  <span className="block">{p.label}</span>
                  {p.amount > 0 && <span className="text-gray-400 font-semibold">{fmt(p.amount, true)}</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <InputField label="Goal Amount (Today's Value)" value={goalAmount} onChange={setGoalAmount} min={10000} max={100000000} step={50000} prefix={currency.symbol} />
            <InputField label="Years to Goal" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yr" />
            <InputField label="Education Inflation Rate" value={inflationRate} onChange={setInflationRate} min={3} max={20} step={0.5} suffix="%" />
            <InputField label="Expected SIP Return" value={expectedReturn} onChange={setExpectedReturn} min={6} max={20} step={0.5} suffix="%" />
            <InputField label="Current Savings (if any)" value={currentSavings} onChange={setCurrentSavings} min={0} max={100000000} step={10000} prefix={currency.symbol} />
          </div>

          <div className="mt-5 p-4 rounded-2xl bg-green-600 text-white text-center shadow-md">
            <p className="text-sm opacity-80">Monthly SIP Needed</p>
            <p className="text-3xl font-black mt-1">{fmt(r.monthlySIP)}</p>
            <p className="text-xs opacity-70 mt-2">For {years} years @ {expectedReturn}% return</p>
          </div>

          <div className="mt-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700 space-y-1">
            <p className="font-bold">📌 Education Cost Reality</p>
       <p>{fmt(goalAmount)} today → <strong>{fmt(r.inflationAdjustedGoal)}</strong> in {years} years</p>
            <p className="text-amber-600">({inflationRate}% annual education inflation)</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly SIP" value={fmt(r.monthlySIP)} highlight icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Inflation-Adj Goal" value={fmt(r.inflationAdjustedGoal)} icon={<Target className="w-4 h-4" />} />
            <ResultCard label="Total SIP Investment" value={fmt(r.totalSIPInvestment)} icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Years to Goal" value={`${years} Yrs`} icon={<Calendar className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">SIP Corpus vs Goal Growth Over {years} Years</h3>
            <div style={{ height: 230 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={r.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="corpusG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                    <linearGradient id="goalG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f87171" stopOpacity={0.15} /><stop offset="95%" stopColor="#f87171" stopOpacity={0} /></linearGradient>
                    <linearGradient id="investedG" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#93c5fd" stopOpacity={0.2} /><stop offset="95%" stopColor="#93c5fd" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `Y${v}`} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                  <Area type="monotone" dataKey="sipInvested" name="Amount Invested" stroke="#93c5fd" fill="url(#investedG)" strokeWidth={1.5} dot={false} />
                  <Area type="monotone" dataKey="goalValue" name="Goal (Inflation-Adjusted)" stroke="#f87171" fill="url(#goalG)" strokeWidth={2} dot={false} strokeDasharray="5 3" />
                  <Area type="monotone" dataKey="sipCorpus" name="SIP Corpus" stroke="#16a34a" fill="url(#corpusG)" strokeWidth={2.5} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">Green line meets red dashed line at Year {years} - goal achieved ✅</p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Corpus Composition at Goal Date</h3>
              <div style={{ height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pie} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={3}>
                      {pie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-1 gap-1 mt-1">
                {pie.map(e => <div key={e.name} className="flex items-center gap-1.5 text-xs"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} /><span className="text-gray-600">{e.name}</span></div>)}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Goal Summary</h3>
              <div className="space-y-2">
                {[
                  { label: "Goal Today", value: fmt(r.goalAmount), color: 'text-gray-700' },
                  { label: `Inflation-Adjusted Goal (${years}Y)`, value: fmt(r.inflationAdjustedGoal), color: 'text-red-600 font-bold' },
                  { label: 'Current Savings (future value)', value: fmt(r.fvCurrentSavings), color: 'text-amber-600' },
                  { label: 'Amount to Build via SIP', value: fmt(r.remainingGoal), color: 'text-blue-700 font-bold' },
                  { label: 'Monthly SIP Required', value: fmt(r.monthlySIP), color: 'text-green-700 font-black' },
                  { label: 'Total SIP Investment', value: fmt(r.totalSIPInvestment), color: 'text-gray-600' },
                  { label: 'Returns from SIP', value: fmt(Math.max(0, r.returnsEarned)), color: 'text-green-600' },
                ].map(row => (
                  <div key={row.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-500">{row.label}</span>
                    <span className={`text-sm ${row.color}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Education Goal SIP Calculator - Plan for Every Rupee of Your Child's Future USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Education Inflation in the US - The Fastest Rising Expense</h3>
              <p>Education inflation in the US runs at 8-12% annually - nearly double the general CPI inflation of 5-6%. This means education costs are doubling every 6-9 years. A college education costing $10 thousands today will cost $21.6 thousands in 10 years (at 8% inflation) and $31 thousands in 12 years. Medical education is even more extreme - private MBBS seats have crossed $1 million for 5-year courses in some states. Study abroad costs (US/UK) have grown 10-15% annually in INR terms, combining both foreign education inflation and INR depreciation. Understanding this education inflation reality is the first step in planning: you\'re not planning for today\'s fees, you\'re planning for significantly higher future fees.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Education Cost Planning by Goal Type</h3>
              <p>
  Current education costs (2026) and 15-year projections at 8% inflation: Government engineering (NIT/IIIT): $4-8 thousands today → $12-25 thousands in 15 years. Private engineering (good college): $8-15 thousands → $25-48 thousands. IIT B.Tech: $8-10 thousands → $25-32 thousands. MBA (IIM-A/B/C): $28-35 thousands → $90 thousands-1.1 million. Private medical MBBS: $50-100 thousands → $1.6-3.2 millions. Study in US (B.Tech + living): $80-120 thousands → $2.5-3.8 millions. UK/Australia: $70-100 thousands → $2.2-3.2 millions. These projections should guide your monthly SIP target - our calculator handles this automatically.
</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Investment Strategy for Education Goals</h3>
              <p>Time-based investment strategy for education goals: 15+ years away (child aged 0-3): 80-90% equity mutual funds (flexi-cap, mid-cap for growth), 10-20% Roth IRA (tax-free safe component). 10-15 years away (child aged 3-8): 70% equity, 30% debt (FD, RD, debt MF). 5-10 years away: 50% equity, 50% debt. Gradually shift to safer instruments. 1-3 years away: 20% equity, 80% debt/liquid funds. Capital preservation mode. Use dedicated SIP accounts labeled specifically for the child\'s education - psychological ownership reduces the temptation to redeem for other purposes. tax-advantaged mutual fund (tax-saving) funds work well for education goals: 3-year lock-in encourages discipline and reduces impulsive redemption.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Education Loans vs Investment - The Real Choice</h3>
              <p>Education loan vs investment: when each makes sense. Invest (preferred): When you have 10+ years, consistent income, and can build a corpus that covers most or all of the education cost. No debt burden means better career choices post-graduation. Education loan (use when necessary): When the goal is near-term and insufficient corpus exists, when the education is at a premium institution with high earning potential post-graduation (IIT, IIM, medical), when interest rates are favourable (8.5-11% with moratorium during study). Hybrid strategy: Build investment corpus targeting 60-70% of projected education cost. Take a smaller education loan for the remaining 30-40%, which is more manageable. The interest burden on a smaller loan is much lower and the entire goal pressure doesn\'t rest on investment performance alone.</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Education Goal Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Education Goal USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent
        title="Education Goal Calculator USA – How Much Do You Need to Save Each Month for College in 2026?"
        category="finance"
        intro={`College savings is a concrete goal with a definite timeline — which makes it one of the most tractable financial targets to plan for. Unlike retirement (where the timeline is uncertain), you generally know approximately when your child will start college. That certainty, combined with a defined target amount, lets you calculate exactly what monthly savings amount will get you there.

The critical input is your savings rate target. Not everyone needs to save 100% of projected college costs — a combination of savings, some student loans, and possible scholarships is a realistic strategy. Setting a target of covering 50-80% of projected costs through savings and financing the remainder with affordable student loans is a legitimate planning approach.

Financial aid eligibility affects this calculation significantly. Families with incomes below ~$75,000 may qualify for substantial need-based aid at selective colleges — making savings less critical for that specific population. For families above $150,000 in income, need-based aid at most schools is limited, and savings do most of the work.`}
        howItWorks={`Monthly savings calculation: PV = 0 (starting from nothing) or current savings balance. FV = projected total college cost at enrollment. n = months until enrollment. Solve for monthly PMT using PMT = r × FV / [(1+r)^n - 1], where r is monthly return rate.

Cost projection: Current annual cost × (1 + education inflation rate)^years until enrollment. Education inflation has run 4-6% annually over the past two decades — higher than CPI inflation. Using a 5% education inflation rate for projections is conservative and realistic.

After-tax return: 529 account earnings are completely tax-free for qualified education expenses. At a 22% marginal tax rate, a 7% pre-tax return in a 529 effectively yields 7% after-tax vs. 5.46% in a taxable account — a meaningful advantage over 18 years.`}
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
        tipsSection={`Review your state's 529 tax deduction before choosing a 529 plan. Many states allow deductions only for in-state 529 plans; others allow deductions for any plan. The state deduction can be worth hundreds to thousands of dollars annually — check before defaulting to a nationally marketed plan.

For lump sum 529 contributions (grandparent gifts, for example), the superfunding provision allows up to 5 years of annual gift tax exclusions at once: 5 × $18,000 = $90,000 per donor per beneficiary in 2024 without gift tax consequences.

Adjust your savings projection every 2-3 years as your child's likely college type becomes clearer. A 14-year-old with strong academic potential and interest in specific programs changes your target significantly compared to open-ended planning for a newborn.`}
        conclusion={`The biggest education savings mistake isn't underfunding — it's not starting. Families who start saving when children are teenagers face monthly savings requirements that are 3-5x higher than those who start at birth for the same final balance. Start with whatever you can, even if it's $25-$50/month, because the compounding period matters enormously.

If you're behind on education savings but well ahead on retirement savings, there are borrowing options for college that don't exist for retirement. Maintain retirement savings priority while building education savings at a realistic pace. See [our 529 vs Roth IRA Education Calculator](/calculators/finance/529-vs-roth-ira-education-calculator) for strategies when retirement and education goals compete for the same dollars.`}

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
      </div>
      
    </CalculatorLayout>
  )
}
