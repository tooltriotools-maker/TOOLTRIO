'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, ReferenceLine } from 'recharts'
import { calculateSocialSecurity } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [currentAge, setCurrentAge] = useState(55)
  const [startAge, setStartAge] = useState(67)
  const [benefit62, setBenefit62] = useState(1800)

  const result = useMemo(() => calculateSocialSecurity(currentAge, startAge, benefit62), [currentAge, startAge, benefit62])

  const fmt = (v: number) => `$${v.toLocaleString()}`
  const fmtK = (v: number) => v >= 1000000 ? `$${(v / 1000000).toFixed(2)}M` : `$${(v / 1000).toFixed(0)}k`

  // Lifetime cumulative chart
  const lifeData = Array.from({ length: 30 }, (_, i) => {
    const age = startAge + i
    const entry: Record<string, any> = { age }
    result.scenarios.forEach(s => {
      const monthsCollecting = Math.max(0, age - s.age) * 12
      entry[`Age ${s.age}`] = s.monthly * monthsCollecting
    })
    return entry
  })

  const selectedScenario = result.scenarios.find(s => s.age === startAge) || result.scenarios[4]
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899']

  return (
    <CalculatorLayout title="Social Security Calculator USA 2026" description="Estimate your monthly Social Security benefit based on earnings history and claiming age." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Your SSA Details</h2>

          {[
            { label: 'Current Age', value: currentAge, set: setCurrentAge, min: 40, max: 70, step: 1 },
          ].map(({ label, value, set, min, max, step }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} min={min} max={max} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
                <span className="text-gray-400 text-sm">yrs</span>
              </div>
            </div>
          ))}

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Benefit at Age 62</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={benefit62} onChange={e => setBenefit62(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
            <p className="text-xs text-gray-400">Find your estimate at SSA.gov/myaccount</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Claiming Age</label>
            <div className="grid grid-cols-4 gap-1.5">
              {[62, 65, 67, 70].map(age => (
                <button key={age} onClick={() => setStartAge(age)}
                  className={`py-2 rounded-xl text-sm font-bold transition-all ${startAge === age ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {age}
                </button>
              ))}
            </div>
            <input type="range" min={62} max={70} value={startAge} onChange={e => setStartAge(Number(e.target.value))} className="w-full accent-green-500" />
            <div className="flex justify-between text-xs text-gray-400"><span>62</span><span className="font-bold text-gray-700">{startAge}</span><span>70</span></div>
          </div>

          <div className={`p-3 rounded-xl text-xs ${selectedScenario && selectedScenario.pct >= 100 ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-amber-50 border border-amber-200 text-amber-700'}`}>
            <p className="font-bold">Benefit Adjustment</p>
            <p className="text-2xl font-black mt-1">{selectedScenario?.pct ?? 0}% of PIA</p>
            <p className="mt-1">{startAge < 67 ? `${67 - startAge} year${67 - startAge > 1 ? 's' : ''} before FRA` : startAge > 67 ? `${startAge - 67} year${startAge - 67 > 1 ? 's' : ''} after FRA` : 'Full Retirement Age'}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly Benefit" value={fmt(result.adjustedMonthly)} highlight />
            <ResultCard label="Annual Benefit" value={fmtK(result.adjustedMonthly * 12)} />
            <ResultCard label="Lifetime (to 85)" value={fmtK(result.totalBenefit)} />
            <ResultCard label="Adjustment" value={`${result.adjustmentPct}%`} subValue="of full benefit" />
          </div>

          {/* Monthly comparison bar */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Monthly Benefit by Claiming Age</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.scenarios} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="age" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Claiming Age', position: 'insideBottom', offset: -2, fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={55} tickFormatter={v => `$${v.toLocaleString()}`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => [`$${v.toLocaleString()}/mo`, 'Monthly Benefit']} />
                  <ReferenceLine x={startAge} stroke="#22c55e" strokeWidth={2} strokeDasharray="4 2" />
                  <Bar dataKey="monthly" name="Monthly Benefit" radius={[4, 4, 0, 0]}
                    fill="#3b82f6"
                    label={{ position: 'top', fontSize: 10, fill: '#374151', formatter: (v: number) => `$${v.toLocaleString()}` }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Lifetime cumulative */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Lifetime Cumulative Benefits - Break-Even Analysis</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lifeData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="age" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={60} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => fmtK(v)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {['Age 62', 'Age 65', 'Age 67', 'Age 70'].map((key, i) => (
                    <Line key={key} type="monotone" dataKey={key} stroke={colors[i * 2]} strokeWidth={key === `Age ${startAge}` ? 3 : 1.5} dot={false} strokeDasharray={key === `Age ${startAge}` ? undefined : '4 2'} />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Scenario table */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Claiming Age Comparison</h3>
            <div className="overflow-x-auto">
              <table className="calc-table">
                <thead><tr><th>Age</th><th>Monthly</th><th>Annual</th><th>Vs Age 62</th><th>Lifetime (to 85)</th></tr></thead>
                <tbody>
                  {result.scenarios.map(s => (
                    <tr key={s.age} className={s.age === startAge ? 'bg-green-50 font-bold' : ''}>
                      <td className={s.age === startAge ? 'text-green-700 font-bold' : ''}>{s.age}{s.age === 67 ? ' (FRA)' : s.age === startAge ? ' ★' : ''}</td>
                      <td>${s.monthly.toLocaleString()}</td>
                      <td>${(s.monthly * 12).toLocaleString()}</td>
                      <td className={s.monthly > benefit62 ? 'text-green-600' : 'text-red-500'}>{s.monthly >= benefit62 ? '+' : ''}{fmt(s.monthly - benefit62)}/mo</td>
                      <td>{fmtK(s.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Social Security Calculator - Optimize Your Claiming Strategy USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Early vs Delayed Claiming: The Math</h3>
              <p>Claiming at 62 reduces your benefit by 30% permanently compared to your Full Retirement Age (FRA) of 67. Claiming at 70 increases it by 24% above FRA. The monthly difference between claiming at 62 versus 70 on a $2,000/month FRA benefit is $600/month more at 70 ($1,400 vs $2,480). The break-even - when cumulative lifetime payments equalize - is typically around age 78-82. If you live past the break-even, delaying was the better financial decision. If you die before it, claiming early was better. Since life expectancy for a 62-year-old American is currently 85+ years, delaying often pays off.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Spousal and Survivor Benefits</h3>
              <p>Spouses can claim up to 50% of their partner's FRA benefit as a spousal benefit, even with no work history. Widows and widowers can claim 100% of their deceased spouse\'s benefit. This makes the higher-earning spouse\'s claiming decision critically important for couples. The optimal strategy for many couples: the lower earner claims early at 62 for income, while the higher earner delays to 70 to maximize the survivor benefit. This is particularly valuable as women typically outlive men and benefit from the higher survivor payment for potentially decades.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Working While Collecting Social Security</h3>
              <p>Before your Full Retirement Age, earning above $22,320 (2026) reduces benefits by $1 for every $2 over the limit. In the year you reach FRA, the limit rises to $59,520 with a less aggressive $1-for-$3 reduction. After FRA, there is no earnings test - you can earn unlimited income without any benefit reduction. Importantly, withheld benefits are not lost: SSA recalculates your benefit at FRA to credit back the months payments were withheld, resulting in a higher monthly benefit going forward. So early retirement earned income can actually reduce the early-claiming penalty effect.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Social Security Taxation</h3>
              <p>Up to 85% of Social Security benefits may be subject to federal income tax depending on your combined income (AGI plus non-taxable interest plus half your SS benefits). Combined income below $25,000 (single) or $32,000 (married): SS is not taxed. $25,000-$34,000 single: up to 50% of SS taxable. Above $34,000 single or $44,000 married: up to 85% of SS is taxable. Strategic Roth conversions before claiming SS can reduce this tax impact by lowering future required minimum distributions (RMDs) that increase combined income in retirement.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Social Security Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Delaying Social Security from age 62 to 70 can increase monthly benefits from <strong>$1,400 to $2,480</strong> — a 77% lifetime increase for those who live past age 80.
        </p>
        <p className="text-sm text-gray-600">
          This Social Security USA 2026 tool helps you model claiming strategies and determine the optimal age to start benefits based on your situation.
        </p>
      </Card>
      <SEOContent
        title="Social Security Calculator USA 2026"
        category="finance"
        intro={`Social Security is the most valuable guaranteed income most Americans will ever receive, yet the timing decision — when to claim — is consistently made too early by the majority of recipients. Each year you delay claiming beyond age 62 increases your monthly benefit by 6-8%, and delaying from 62 to 70 increases the benefit by approximately 76%. For the average worker, that's the difference between $1,800/month and $3,175/month — a lifetime difference of potentially hundreds of thousands of dollars.

The decision is complex because it's partly a longevity bet. Claiming early gets you more payments but at lower amounts; claiming late gets you fewer payments but larger ones. The break-even age — the point at which delaying has paid off more than early claiming — is typically 78-80 depending on your specific benefit amount and the comparison start date. Given that the average 65-year-old man will live to 84 and woman to 87, many people will live well past the break-even point.

For married couples, coordination strategy matters enormously. The higher earner should generally delay to 70 to maximize the lifetime benefit and the surviving spouse's benefit. The lower earner's timing is more flexible — claiming earlier while the higher earner delays can provide income during the gap years.`}
        howItWorks={`Full Retirement Age (FRA) is the age at which you receive 100% of your primary insurance amount (PIA). For those born 1960 or later: FRA is 67. Claiming at 62: 70% of PIA. Claiming at 67: 100% of PIA. Claiming at 70: 124% of PIA. Each month of delay between FRA and 70 adds 2/3% per month = 8%/year.

PIA calculation: Based on your 35 highest earning years, indexed for inflation. Average Indexed Monthly Earnings (AIME) is applied to a bend-point formula that replaces a higher percentage of lower earnings (90% on first $1,174 AIME in 2024) and lower percentage of higher earnings (32% on next tier).

Break-even analysis: Total lifetime benefits at different claiming ages. Delay from 62 to 67 requires living until approximately 78-79 for the larger benefit to catch up. Delay from 67 to 70 breaks even around age 82-83.`}
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
        tipsSection={`Get your Social Security statement annually at SSA.gov to see your estimated benefits at different claiming ages. Verify that your earnings history is accurate — errors in reported earnings (gaps or understatements) directly reduce your calculated benefit.

For married couples: model the survivor benefit carefully. If the higher earner claims early and dies first, the surviving spouse's benefit is permanently locked at the lower amount. Delaying the higher earner's claim is essentially life insurance for the surviving spouse.

Consider Roth conversions in the years between retirement and Social Security claiming. These low-income years often have lower marginal rates, making Roth conversions more tax-efficient. The converted amounts don't affect Social Security benefit calculation, but managing adjusted gross income affects whether Social Security benefits are taxed at 0%, 50%, or 85% inclusion rate.`}
        conclusion={`The optimal claiming strategy depends on health, other income sources, marital status, and financial needs. For someone in poor health with no other retirement income, early claiming at 62 may be the right choice. For a healthy married couple where the higher earner is in good health, delaying to 70 is almost always financially optimal.

The Social Security decision is one of the highest-stakes financial choices in retirement planning — and also one of the most irreversible. Claiming early can be undone once (by repaying all benefits received within 12 months of claiming), but this option is rarely used in practice. Use [our Retirement Calculator](/calculators/finance/retirement-calculator) to model how Social Security timing interacts with portfolio withdrawal strategy.`}

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
          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🌅", desc: "Free calculator" },          { name: "Roth Conversion Calculator", href: "/calculators/finance/roth-conversion-calculator", icon: "🔄", desc: "Free calculator" },          { name: "401k vs Roth IRA Calculator", href: "/calculators/finance/401k-vs-roth-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Pension Calculator", href: "/calculators/finance/401k-vs-pension-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Taxable Account Calculator", href: "/calculators/finance/401k-vs-taxable-account-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k Early Withdrawal vs Loan Calculator", href: "/calculators/finance/401k-early-withdrawal-vs-loan-calculator", icon: "📊", desc: "Free calculator" },          { name: "Sep IRA vs Solo 401k Calculator", href: "/calculators/finance/sep-ira-vs-solo-401k-calculator", icon: "💼", desc: "Free calculator" },          { name: "Roth IRA vs 401k Employer Match Calculator", href: "/calculators/finance/roth-ira-vs-401k-employer-match-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs Traditional IRA Calculator", href: "/calculators/finance/roth-ira-vs-traditional-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "Annuity vs Lumpsum Calculator", href: "/calculators/finance/annuity-vs-lumpsum-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
