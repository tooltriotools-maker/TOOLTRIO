'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from 'recharts'
import { calculateCollegeCost } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

type CollegeType = 'public_instate' | 'public_outstate' | 'private' | 'community'

const COLLEGE_TYPES: { value: CollegeType; label: string; current: number }[] = [
  { value: 'community', label: '🏫 Community College', current: 12000 },
  { value: 'public_instate', label: '🎓 Public In-State', current: 28000 },
  { value: 'public_outstate', label: '🏛️ Public Out-of-State', current: 45000 },
  { value: 'private', label: '🎯 Private University', current: 62000 },
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [childAge, setChildAge] = useState(5)
  const [collegeType, setCollegeType] = useState<CollegeType>('public_instate')
  const [collegeYears, setCollegeYears] = useState(4)
  const [currentSavings, setCurrentSavings] = useState(5000)
  const [monthlySavings, setMonthlySavings] = useState(300)
  const [investmentReturn, setInvestmentReturn] = useState(7)
  const [inflationRate, setInflationRate] = useState(6)

  const result = useMemo(() => calculateCollegeCost(childAge, collegeType, collegeYears, currentSavings, monthlySavings, investmentReturn, inflationRate),
    [childAge, collegeType, collegeYears, currentSavings, monthlySavings, investmentReturn, inflationRate])

  const fmt = (v: number) => `$${Math.round(v).toLocaleString()}`
  const fmtK = (v: number) => v >= 1000000 ? `$${(v / 1000000).toFixed(2)}M` : `$${(v / 1000).toFixed(0)}k`
  const yearsUntilCollege = 18 - childAge
  const fundedPct = Math.min(100, (result.projectedSavings / result.totalFutureCost) * 100)

  // Savings growth projection
  const r = investmentReturn / 100 / 12
  const savingsData = Array.from({ length: yearsUntilCollege + 1 }, (_, y) => {
    const n = y * 12
    const balance = currentSavings * Math.pow(1 + r, n) + (r > 0 ? monthlySavings * (Math.pow(1 + r, n) - 1) / r : monthlySavings * n)
    return { year: y, savings: Math.round(balance), needed: Math.round(result.totalFutureCost) }
  })

  const allTypes = COLLEGE_TYPES.map(t => {
    const r2 = calculateCollegeCost(childAge, t.value, collegeYears, currentSavings, monthlySavings, investmentReturn, inflationRate)
    return { name: t.label.split(' ').slice(1).join(' '), cost: r2.totalFutureCost, gap: Math.max(0, r2.gap) }
  })

  return (
    <CalculatorLayout title="College Cost Calculator USA 2026" description="Calculate future tuition costs with inflation and monthly savings needed via 529 plan." icon="🎓" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">College Plan</h2>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">Child Age</label>
              <span className="text-xs font-bold text-gray-700">{childAge} yrs ({yearsUntilCollege} until college)</span>
            </div>
            <input type="range" min={0} max={17} value={childAge} onChange={e => setChildAge(Number(e.target.value))} className="w-full accent-green-500" />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">College Type</label>
            <div className="space-y-1.5">
              {COLLEGE_TYPES.map(t => (
                <button key={t.value} onClick={() => setCollegeType(t.value)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all flex justify-between ${collegeType === t.value ? 'bg-green-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
                  <span>{t.label}</span>
                  <span className="opacity-80">${(t.current / 1000).toFixed(0)}k/yr</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Years in College</label>
            <div className="grid grid-cols-4 gap-1.5">
              {[2, 3, 4, 5].map(y => (
                <button key={y} onClick={() => setCollegeYears(y)}
                  className={`py-2 rounded-xl text-sm font-bold transition-all ${collegeYears === y ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{y}yr</button>
              ))}
            </div>
          </div>

          {[
            { label: 'Current 529 Balance', value: currentSavings, set: setCurrentSavings, step: 500, prefix: '$' },
            { label: 'Monthly Savings', value: monthlySavings, set: setMonthlySavings, step: 50, prefix: '$' },
          ].map(({ label, value, set, step, prefix }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <span className="text-green-600 text-sm">{prefix}</span>
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              </div>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Investment Return', value: investmentReturn, set: setInvestmentReturn, step: 0.5, suffix: '%' },
              { label: 'Tuition Inflation', value: inflationRate, set: setInflationRate, step: 0.5, suffix: '%' },
            ].map(({ label, value, set, step, suffix }) => (
              <div key={label} className="space-y-1">
                <label className="text-xs font-medium text-gray-600">{label}</label>
                <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                  <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
                  <span className="text-gray-400 text-xs">{suffix}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total Future Cost" value={fmtK(result.totalFutureCost)} highlight />
            <ResultCard label="Cost Per Year" value={fmtK(result.futureCostPerYear)} />
            <ResultCard label="Projected Savings" value={fmtK(result.projectedSavings)} subValue={`${fundedPct.toFixed(0)}% funded`} />
            <ResultCard label={result.isFunded ? 'Surplus' : 'Gap'} value={fmtK(Math.abs(result.gap))} subValue={result.isFunded ? 'Over-funded!' : `Need $${result.requiredMonthly.toLocaleString()}/mo`} />
          </div>

          {/* Funding progress */}
          <Card>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-semibold text-gray-700">Funding Progress</h3>
              <span className={`text-sm font-bold ${result.isFunded ? 'text-green-600' : 'text-amber-600'}`}>{fundedPct.toFixed(1)}% funded</span>
            </div>
            <div className="bg-gray-100 rounded-full h-4 mb-4">
              <div className={`h-4 rounded-full transition-all duration-500 ${result.isFunded ? 'bg-green-500' : fundedPct > 60 ? 'bg-amber-400' : 'bg-red-400'}`} style={{ width: `${fundedPct}%` }} />
            </div>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={savingsData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="savGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Years from Now', position: 'insideBottomRight', fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={60} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => fmtK(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="savings" name="Projected 529 Balance" stroke="#22c55e" strokeWidth={2.5} fill="url(#savGrad)" />
                  <Area type="monotone" dataKey="needed" name="Total Cost Target" stroke="#f59e0b" strokeWidth={1.5} fill="none" strokeDasharray="5 3" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Projected Cost by College Type</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={allTypes} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 9 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={60} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => fmtK(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="cost" name="Total Cost" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="gap" name="Funding Gap" stackId="b" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">College Cost Calculator - Plan for Tuition That Doubles Every 12 Years USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">College Tuition Inflation: 6% Average Annually</h3>
              <p>College tuition has historically increased at 6-8% annually - roughly double general CPI inflation. At 6% annual growth, college costs double every 12 years. A public in-state school costing $28,000 today will cost approximately $50,000/year when a 5-year-old child turns 18. A private university at $62,000 today will cost $112,000+/year. The 529 plan investment return must exceed tuition inflation to make progress. Investing in broad stock market index funds (historical 7-10% return) inside a 529 plan provides the best chance of outpacing tuition inflation over 10-18 year horizons.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">529 Plan Tax Advantages</h3>
              <p>529 plan contributions grow tax-free and withdraw tax-free for qualified education expenses (tuition, fees, room and board, books, computers). Many states offer a state income tax deduction for contributions: New York deducts up to $5,000 single ($10,000 married), Indiana offers a 20% tax credit up to $1,000/year. Even states without deductions, the tax-free growth is valuable - a $50,000 account growing at 7% for 15 years produces $40,000 in growth that is never taxed. SECURE Act 2.0 allows rolling up to $35,000 of unused 529 funds to a Roth IRA after 15 years, reducing overfunding risk.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Financial Aid and Net Cost vs Sticker Price</h3>
              <p>The sticker price of college is rarely what students pay. The average net price (after grants and scholarships) for private universities is approximately $28,000-32,000 vs the $62,000 sticker price - because wealthy private schools have large endowments funding significant aid. Public schools offer less institutional aid but lower sticker prices. The Expected Family Contribution (EFC) calculated by FAFSA determines federal aid eligibility. 529 plan assets owned by parents count at 5.64% toward EFC (less impactful on aid than student-owned assets at 20%). Complete FAFSA every year, even if you do not expect to qualify - policies change and many families are pleasantly surprised.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Community College and Transfer Strategy</h3>
              <p>Attending community college for two years then transferring to a 4-year university can save $30,000-60,000 on a degree while earning the same diploma. Many states have guaranteed transfer agreements between community colleges and state universities. For undecided students or those requiring remediation, community college allows exploration without the full 4-year cost commitment. Trade programs at community colleges offer high-demand skills in 1-2 years at a fraction of university costs: HVAC, electrical, and nursing programs consistently produce graduates with starting salaries of $50,000-70,000 with minimal debt.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          College Cost Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this College Cost USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent
        title="College Cost Calculator USA – How Much Will College Cost and How Much Should You Save?"
        category="finance"
        intro={`College costs have been growing at roughly 5-7% annually for decades — roughly double the general inflation rate — and show no signs of slowing. A student starting college in 2026 at a public in-state university will pay roughly $30,000-$35,000 per year including room and board; private universities average $60,000-$75,000 per year. A 4-year degree from a private university for a child born today is projected to cost $350,000-$500,000.

The gap between sticker price and what families actually pay is enormous and misunderstood. Only about 12% of students pay the full published tuition at private universities — the rest receive institutional aid, merit scholarships, or need-based grants that reduce the actual cost significantly. The net price calculator available on every accredited college's website gives you a realistic estimate of actual cost for your income level.

The most important insight for college savings: the goal isn't to save the full projected cost but to save enough that borrowing the remainder is manageable. A student who graduates with $30,000-$40,000 in loans (less than one year's starting salary for most college-educated jobs) is in a manageable position. A student who graduates with $150,000+ in debt has a serious financial burden regardless of their degree.`}
        howItWorks={`529 projection: Monthly contribution × [(1+r/12)^(n×12) - 1] / (r/12) = future value at college start. Combined with any lump sum already saved: lump sum × (1+r)^n + monthly contribution formula = total balance at enrollment.

Annual cost escalation: If you're saving for a child born today, project current costs forward at 5%/year to estimate actual costs at enrollment. A $30,000/year public university cost today becomes approximately $77,000/year in 18 years at 5% inflation. Total 4-year cost at projected inflation: roughly $337,000 for what currently costs $120,000 over 4 years.

Aid eligibility estimate: The Expected Family Contribution (EFC, now called Student Aid Index) is calculated from parent income, assets, and student assets. Parent assets count at roughly 5.64% in aid calculations; student assets count at 20%. FAFSA-eligible aid reduces the out-of-pocket cost that savings need to cover.`}
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
        tipsSection={`Start early, even with small amounts. A $100/month contribution from birth at 7% annual return produces $40,000 by age 18. Starting at age 10 with the same amount produces only $22,000. The time value of early contributions is enormous for college savings.

Apply to 3-4 safety schools (where you'd definitely be admitted), 3-4 match schools, and 2-3 reach schools in your financial range. Compare the actual net price at each school after financial aid — the most prestigious school isn't always the most expensive out-of-pocket for families that qualify for institutional aid.

Explore merit scholarships actively. Some students with strong academic profiles can attend very good schools at near-full scholarship cost, particularly at schools outside the top 20 rankings that are competing for high-caliber students.`}
        conclusion={`Student loan repayment reality: Federal student loans at 6.5% with a $40,000 balance require about $450/month for 10 years — manageable at most professional salaries. At $100,000, that's $1,130/month — a serious burden for many graduates, particularly those in lower-earning fields. Borrowing decisions should be calibrated to specific career income expectations, not just cost-of-attendance.

Income-driven repayment plans and public service loan forgiveness are real options that change the math for graduates with specific career paths. Use [our Student Loan Calculator](/calculators/finance/student-loan-calculator) alongside this to model both the savings needed and the repayment strategy for any loans that remain.`}

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
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "529 vs Roth IRA Education Calculator", href: "/calculators/finance/529-vs-roth-ira-education-calculator", icon: "📚", desc: "Free calculator" },          { name: "529 vs Utma Calculator", href: "/calculators/finance/529-vs-utma-calculator", icon: "📊", desc: "Free calculator" },          { name: "Education Goal Calculator", href: "/calculators/finance/education-goal-calculator", icon: "🎯", desc: "Free calculator" },          { name: "Savings Goal Calculator", href: "/calculators/finance/savings-goal-calculator", icon: "🎯", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Student Loan Calculator", href: "/calculators/finance/student-loan-calculator", icon: "🎓", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },
          ]}
        />
      
    </CalculatorLayout>
  )
}
