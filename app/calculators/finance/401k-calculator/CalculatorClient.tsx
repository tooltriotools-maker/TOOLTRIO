'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculate401k } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentBalance, setCurrentBalance] = useState(25000)
  const [annualSalary, setAnnualSalary] = useState(80000)
  const [employeeContrib, setEmployeeContrib] = useState(10)
  const [employerMatch, setEmployerMatch] = useState(50)
  const [employerMatchLimit, setEmployerMatchLimit] = useState(6)
  const [annualReturn, setAnnualReturn] = useState(7)
  const [salaryIncrease, setSalaryIncrease] = useState(2)

  const result = useMemo(() => calculate401k(currentAge, retirementAge, currentBalance, annualSalary, employeeContrib, employerMatch, employerMatchLimit, annualReturn, salaryIncrease),
    [currentAge, retirementAge, currentBalance, annualSalary, employeeContrib, employerMatch, employerMatchLimit, annualReturn, salaryIncrease])

  const annualContrib = annualSalary * (employeeContrib / 100)
  const annualMatchAmt = annualSalary * Math.min(employeeContrib, employerMatchLimit) / 100 * (employerMatch / 100)
  const limit2026 = 23500

  const pieData = [
    { name: 'Your Contributions', value: result.totalEmployee, fill: '#22c55e' },
    { name: 'Employer Match', value: result.totalEmployer, fill: '#3b82f6' },
    { name: 'Investment Growth', value: result.totalGrowth, fill: '#f59e0b' },
  ]

  return (
    <CalculatorLayout title="401k Calculator USA 2026" description="Calculate how much your 401k will be worth at retirement with employer match, salary growth, and compound interest." icon="🏦" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Your 401k Details</h2>
          {[
            { label: 'Current Age', value: currentAge, set: setCurrentAge, step: 1, suffix: 'yrs' },
            { label: 'Retirement Age', value: retirementAge, set: setRetirementAge, step: 1, suffix: 'yrs' },
          ].map(({ label, value, set, step, suffix }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
                <span className="text-gray-400 text-sm">{suffix}</span>
              </div>
            </div>
          ))}
          {[
            { label: 'Current 401k Balance', value: currentBalance, set: setCurrentBalance, step: 1000, prefix: '$' },
            { label: 'Annual Salary', value: annualSalary, set: setAnnualSalary, step: 1000, prefix: '$' },
          ].map(({ label, value, set, step, prefix }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <span className="text-green-600 text-sm">{prefix}</span>
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              </div>
            </div>
          ))}

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">Your Contribution</label>
              <span className={`text-xs font-bold ${annualContrib > limit2026 ? 'text-red-500' : 'text-green-600'}`}>${Math.round(annualContrib).toLocaleString()}/yr {annualContrib > limit2026 ? '⚠️ Over limit' : ''}</span>
            </div>
            <input type="range" min={1} max={25} value={employeeContrib} onChange={e => setEmployeeContrib(Number(e.target.value))} className="w-full accent-green-500" />
            <div className="flex justify-between text-xs text-gray-400"><span>1%</span><span className="font-bold text-gray-700">{employeeContrib}%</span><span>25%</span></div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Employer Match %</label>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <input type="number" value={employerMatch} onChange={e => setEmployerMatch(Number(e.target.value))} step={5} max={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
                <span className="text-gray-400 text-xs">%</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Match Up To</label>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <input type="number" value={employerMatchLimit} onChange={e => setEmployerMatchLimit(Number(e.target.value))} step={1} max={10} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
                <span className="text-gray-400 text-xs">%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Annual Return</label>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <input type="number" value={annualReturn} onChange={e => setAnnualReturn(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
                <span className="text-gray-400 text-xs">%</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Salary Growth</label>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <input type="number" value={salaryIncrease} onChange={e => setSalaryIncrease(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
                <span className="text-gray-400 text-xs">%</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
            <p className="font-bold mb-1">Annual Employer Match</p>
            <p className="text-lg font-black text-blue-800">${Math.round(annualMatchAmt).toLocaleString()}</p>
            <p className="text-blue-600 mt-0.5">Free money - maximize this first!</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Retirement Balance" value={fmtCompact(result.finalBalance)} highlight />
            <ResultCard label="Monthly Income" value={fmt(result.monthlyIncome)} subValue="at 4% withdrawal" />
            <ResultCard label="Your Total" value={fmtCompact(result.totalEmployee)} subValue="contributions" />
            <ResultCard label="Employer Total" value={fmtCompact(result.totalEmployer)} subValue="free match" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">401k Growth Over Time</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    {[['green', '#22c55e'], ['blue', '#3b82f6'], ['amber', '#f59e0b']].map(([id, color]) => (
                      <linearGradient key={id} id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={color} stopOpacity={0.02} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Age', position: 'insideBottomRight', fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={60} tickFormatter={v => `$${v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : (v / 1000).toFixed(0) + 'k'}`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} formatter={(v: number) => fmtCompact(v)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="balance" name="Total Balance" stroke="#22c55e" strokeWidth={2.5} fill="url(#ggreen)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Balance Breakdown</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ name: 'At Retirement', ...Object.fromEntries(pieData.map(p => [p.name, p.value])) }]} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v / 1000000).toFixed(1)}M`} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={20} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => fmtCompact(v)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {pieData.map(p => <Bar key={p.name} dataKey={p.name} stackId="a" fill={p.fill} radius={[0, 4, 4, 0]} />)}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {pieData.map(p => (
                <div key={p.name} className="text-center bg-gray-50 rounded-xl p-3">
                  <div className="w-3 h-3 rounded-full mx-auto mb-1" style={{ background: p.fill }} />
                  <p className="text-xs text-gray-500">{p.name}</p>
                  <p className="font-bold text-gray-800 text-sm">{fmtCompact(p.value)}</p>
                  <p className="text-xs text-gray-400">{Math.round((p.value / result.finalBalance) * 100)}%</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">401k Calculator - Maximize Retirement Savings with Employer Match USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">The Employer Match: Your Biggest Financial Advantage</h3>
              <p>The 401k employer match is the single best return available to working Americans. A 50% match up to 6% of salary means every dollar you contribute gets an instant 50% return before any investment growth. On an $80,000 salary contributing 6% ($4,800), your employer adds $2,400 - a guaranteed 50% return on that portion. Not contributing enough to capture the full match is equivalent to leaving part of your salary on the table. The IRS contribution limit for 2026 is $23,500 for employees under 50, with an additional $7,500 catch-up for those 50 and older.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Traditional vs Roth 401k</h3>
              <p>Traditional 401k contributions are pre-tax, reducing your taxable income today. Withdrawals in retirement are taxed as ordinary income. Best choice if your current marginal rate exceeds your expected retirement rate. Roth 401k contributions are after-tax, but all growth and qualified withdrawals are completely tax-free. Best if you are early in your career (lower income now), expect higher income in retirement, or want tax diversification. Many financial advisors recommend splitting between both for flexibility regardless of current bracket.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Maximizing 401k Returns: Fund Selection</h3>
              <p>Most 401k plans offer target-date funds, index funds, and actively managed funds. Target-date funds (e.g., Vanguard Target Retirement 2055) automatically rebalance from aggressive to conservative as you approach retirement - ideal for hands-off investors. Low-cost index funds (S&amp;P 500, total market) historically outperform 80%+ of active managers over 10+ year periods. Always check the expense ratio: a 1% fund vs a 0.05% fund on $500,000 costs $4,750 extra per year in fees. Over a 30-year career, high fees can consume $200,000+ of your retirement savings.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">The Order of Retirement Contributions</h3>
              <p>Financial planning priority order: (1) 401k to full employer match - instant 50-100% return. (2) HSA max contribution if eligible ($4,300 single / $8,550 family 2026) - triple tax advantage. (3) Roth IRA max ($7,000 under 50 / $8,000 over 50) - tax-free growth and more flexible withdrawals. (4) Max 401k to $23,500 limit. (5) Taxable brokerage for additional investing. This sequence maximizes tax advantages at each step, typically saving $15,000-30,000 in lifetime taxes compared to investing in taxable accounts first.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          401k Calculator Example (USA Salary-Based)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          If you earn $80,000 per year and contribute 10% with a 50% employer match up to 6%, your total yearly investment becomes $10,400.
        </p>
        <p className="text-sm text-gray-600">
          With a 7% return over 30 years, your 401k USA 2026 projection can exceed <strong>$1,000,000+</strong>. Increasing contribution to 15% can push this above $1.5M.
        </p>
      </Card>
      <SEOContent
        title="401k Calculator USA 2026"
        category="finance"
        intro={`Your 401k is likely the largest investment account you'll ever have — and most people leave tens of thousands of dollars on the table by not optimizing the two variables that matter most: employer match capture and contribution timing. If your employer matches 50% up to 6% of salary and you're only contributing 4%, you're declining a guaranteed 50% return on the money you're leaving behind.

The math inside a 401k compounds in two directions: your contributions grow tax-deferred, AND you avoid paying income tax on those contributions now, which means more of your money is actually invested from day one. A $1,000 contribution in the 22% bracket really costs you only $780 after-tax — but the full $1,000 compounds inside the account.

This calculator models your 401k balance at retirement based on your current balance, annual contribution, employer match, salary growth rate, and expected return. It shows you how different contribution levels and starting ages change your retirement outcome — often by hundreds of thousands of dollars.`}
        howItWorks={`The compound growth formula applied here: FV = PV × (1+r)^n + PMT × [(1+r)^n - 1]/r, where PV is current balance, PMT is annual contribution (including employer match), r is annual return rate, and n is years to retirement.

Employer match is added as a percentage of your contribution up to the match cap — so a 50% match up to 6% of salary means the calculator adds 3% of your salary to your contributions if you contribute at least 6%. The 2024 IRS 401k contribution limit is $23,000 ($30,500 if age 50+), which the calculator enforces as a ceiling.

Returns are compounded annually using your specified rate. Historical S&P 500 returns average about 10% annually before inflation over long periods, but the calculator lets you model conservative (6%), moderate (8%), and aggressive (10%) scenarios.`}
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
        tipsSection={`Model three scenarios every time you run this: the baseline (your current contribution), the match-capture scenario (contributing exactly enough to get the full employer match), and the maximum scenario (contributing the IRS limit). The gap between baseline and max-match is often $10,000-$30,000 in additional retirement wealth from a relatively small monthly contribution increase.

Don't confuse your contribution rate with your actual savings rate. 6% of a $70,000 salary is $4,200/year — but with a 50% match that becomes $6,300 going into your account. That distinction matters when forecasting your retirement balance.

Run the calculator again after any salary increase. The same percentage contribution on a higher salary means larger absolute contributions — and if your employer match is percentage-based, your match increases automatically too.`}
        conclusion={`The 401k contribution decision compounds over decades — which is why people who start early have such large advantages over late starters. Someone who contributes $6,000/year from age 25 to 65 at 7% real return ends up with about $1.25 million. Someone who starts at 35 with the same contributions ends up with $605,000. Ten years of delay costs you more than half your wealth.

Use this alongside the [Roth IRA Calculator](/calculators/finance/roth-ira-calculator) to understand whether your marginal contributions should go to traditional pre-tax 401k or Roth IRA — the answer depends on whether your tax rate is higher now or expected to be higher in retirement.`}

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
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Roth vs Traditional Calculator", href: "/calculators/finance/roth-ira-vs-traditional-ira-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial planning" },
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
          { name: "HSA Calculator", href: "/calculators/finance/hsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "HSA vs FSA Calculator", href: "/calculators/finance/hsa-vs-fsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "Roth IRA vs HSA Calculator", href: "/calculators/finance/roth-ira-vs-hsa-calculator", icon: "📊", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Medicare vs Private Insurance Calculator", href: "/calculators/finance/medicare-vs-private-insurance-calculator", icon: "🏥", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },          { name: "Wealth Calculator", href: "/calculators/finance/wealth-calculator", icon: "💎", desc: "Free calculator" },
          ]}
        />
      
    </CalculatorLayout>
  )
}
