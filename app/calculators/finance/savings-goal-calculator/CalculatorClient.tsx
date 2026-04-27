'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { calculateSavingsGoal } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [goalAmount, setGoalAmount] = useState(d.loanAmount * 2)
  const [currentSavings, setCurrentSavings] = useState(d.smallAmount)
  const [annualRate, setAnnualRate] = useState(8)
  const [years, setYears] = useState(5)

  const result = useMemo(() => calculateSavingsGoal(goalAmount, currentSavings, annualRate, years), [goalAmount, currentSavings, annualRate, years])

  const goalProgress = Math.min(100, Math.round((currentSavings / goalAmount) * 100))

  const tickFmt = (v: number) => {
    if (currency.code === 'INR') return v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`
    return v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`
  }

  return (
    <CalculatorLayout title="Savings Goal Calculator USA 2026" description={`Calculate how much to save monthly to reach your financial goal in ${currency.name}.`} icon="🎯" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Your Goal</h2>
          <div className="space-y-5">
            <InputField label={`Target Amount (${currency.symbol})`} value={goalAmount} onChange={setGoalAmount}
              min={currency.code === 'INR' ? 10000 : 1000}
              max={currency.code === 'INR' ? 100000000 : 10000000}
              step={currency.code === 'INR' ? 10000 : 1000}
              prefix={currency.symbol}
            />
            <InputField label={`Current Savings (${currency.symbol})`} value={currentSavings} onChange={setCurrentSavings}
              min={0} max={goalAmount}
              step={currency.code === 'INR' ? 1000 : 100}
              prefix={currency.symbol}
            />
            <InputField label="Expected Annual Return" value={annualRate} onChange={setAnnualRate} min={1} max={25} step={0.5} suffix="%" />
            <InputField label="Time to Goal" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yrs" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-gradient-to-br from-teal-500/10 to-transparent border border-green-200">
            <p className="text-xs text-gray-500 mb-1">Goal Progress</p>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-3xl font-bold font-display text-green-700">{goalProgress}%</span>
              <span className="text-gray-400 text-xs pb-1">funded</span>
            </div>
            <div className="h-2 bg-gray-50 rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-300" style={{ width: `${goalProgress}%` }} />
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly Savings Needed" value={fmt(result.monthlySIPRequired)} subValue="Start investing now" highlight />
            <ResultCard label="Goal Amount" value={fmtCompact(goalAmount)} />
            <ResultCard label="Current Savings (grown)" value={fmtCompact(result.currentSavingsGrown)} />
            <ResultCard label="Still Need" value={fmtCompact(Math.max(0, goalAmount - result.currentSavingsGrown))} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Savings Progress to Goal</h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="sgGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} /><stop offset="95%" stopColor="#14b8a6" stopOpacity={0} /></linearGradient>
                    <linearGradient id="sgInv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={76} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  {/* Goal line as reference */}
                  <Area type="monotone" dataKey="invested" name="Total Invested" stroke="#3b82f6" fill="url(#sgInv)" strokeWidth={2} />
                  <Area type="monotone" dataKey="total" name="Projected Savings" stroke="#14b8a6" fill="url(#sgGrad)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-wise Progress</h3>
            <div className="overflow-y-auto max-h-56">
              <table className="calc-table">
                <thead><tr><th>Year</th><th>Total Invested</th><th>Returns</th><th>Total Savings</th><th>% of Goal</th></tr></thead>
                <tbody>
                  {result.yearlyData.map(row => (
                    <tr key={row.year}>
                      <td className="text-gray-500">{row.year}</td>
                      <td>{fmtCompact(row.invested)}</td>
                      <td className="text-green-600">{fmtCompact(row.returns)}</td>
                      <td className="font-semibold text-white">{fmtCompact(row.total)}</td>
                      <td className="text-gray-700">{Math.min(100, Math.round((row.total / goalAmount) * 100))}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Savings Goal Calculator - Plan and Achieve Any Financial Goal USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How to Calculate Monthly Savings for Any Goal</h3>
              <p>The Savings Goal Calculator answers the critical question: 'How much do I need to save every month to reach my financial goal?' The formula is the Present Value of annuity reversed: Monthly Savings = FV x r / [(1+r)^n - 1], where FV = future value of goal, r = monthly return rate, n = months. For example, to accumulate $50 thousands in 10 years at 12% expected return: Monthly savings needed = $21,694. If you already have $5 thousands saved, the future value of that savings at 12% for 10 years = $15.5 thousands, reducing your monthly requirement to approximately $15,000. The calculator does all this instantly.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Common Financial Goals and How Much to Save</h3>
              <p>Benchmarks for common financial goals at 12% expected return: Emergency fund ($5 thousands in 1 year): $39,500/month. Child's education ($30 thousands in 15 years): $7,500/month. Car down payment ($5 thousands in 3 years): $11,400/month. House down payment ($20 thousands in 5 years): $24,600/month. Vacation abroad ($3 thousands in 2 years): $11,000/month (use safer instruments like RD since horizon is short). Retirement ($2 millions in 20 years): $19,800/month. Each goal requires a different time horizon and therefore a different investment instrument with appropriate risk.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Choosing the Right Investment for Each Goal</h3>
              <p>Goal time horizon should dictate your investment vehicle: Short-term goals (less than 1 year): High-yield savings account, liquid mutual funds, short-duration debt funds, FDs. Medium-term goals (1-3 years): RD, FD ladder, conservative hybrid funds, arbitrage funds (tax-efficient). Medium-long term goals (3-5 years): Balanced advantage funds, aggressive hybrid funds, 3-year FDs with rollover. Long-term goals (5+ years): Equity mutual funds (SIP), 401(k) pension, Roth IRA, direct equity. The golden rule: never invest money you\'ll need within 3 years in equity. Market corrections can take 2-3 years to recover and you don\'t want to redeem at a loss.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">The Impact of Starting Early on Your Savings Goal</h3>
              <p>Time is the most powerful variable in goal planning. To accumulate $1 million at 12% annual return: Starting at 25 (35 years): Only $2,143/month needed. Starting at 30 (30 years): $4,144/month. Starting at 35 (25 years): $7,500/month. Starting at 40 (20 years): $13,879/month. Starting at 45 (15 years): $26,445/month. Starting at 50 (10 years): $58,737/month. Starting 5 years later roughly doubles your monthly requirement. This exponential effect illustrates why 'Start now, start small' is the most important principle of financial planning. Even $2,000-3,000/month started today is far better than waiting for the 'right time' to invest larger amounts.</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Savings Goal Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          $10,000 in a high-yield savings account at 4.5% APY earns <strong>$450</strong> in the first year. Over 5 years with monthly additions of $500, it grows to $43,500+.
        </p>
        <p className="text-sm text-gray-600">
          Use this Savings Goal USA 2026 tool to compare rates, terms, and contribution strategies to maximize your savings returns.
        </p>
      </Card>
      <SEOContent
        title="Savings Goal Calculator USA 2026"
        category="finance"
        intro={`Having a specific savings target changes your relationship with saving. Vague goals ('I should save more') produce vague results. Specific goals ('I need $18,000 for a car down payment in 24 months, which requires saving $750/month') create a clear decision: is that monthly amount feasible, and if not, what adjustments make it so?

The savings goal framework works for any finite target: emergency fund ($15,000), vacation fund ($5,000), home down payment ($80,000), or car replacement ($25,000). Each goal becomes a PMT problem — given the future value needed, the time horizon, and the interest earned on savings, what monthly contribution closes the gap from your current balance?

Prioritizing multiple simultaneous goals requires explicit trade-offs. Saving for both a house down payment and retirement while also building an emergency fund means allocating a finite monthly savings capacity across competing demands. The calculator helps you see the monthly cost of each goal and whether your savings rate can realistically fund them all in the time frames you've imagined.`}
        howItWorks={`Savings required: PMT = r × (FV - PV × (1+r)^n) / [(1+r)^n - 1], where FV is target, PV is current savings, r is monthly rate, n is months. For $18,000 goal, $3,000 starting balance, 4.5% APY HYSA, 24 months: monthly contribution = approximately $618.

Time to goal with fixed contribution: n = ln[(FV × r + PMT) / (PV × r + PMT)] / ln(1+r). If saving $500/month toward $18,000 with $3,000 starting at 4.5% APY: approximately 28 months.

Goal priority ranking: Sort goals by urgency and return impact. Emergency fund first (prevents high-interest debt). Then employer match capture in 401k (guaranteed return). Then other specific goals. Using a HYSA earning 4-5% for savings goals beats most alternatives for amounts needed within 1-3 years.`}
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
        tipsSection={`For each savings goal, use the right vehicle. Emergency fund and goals within 1-2 years: HYSA (liquid, FDIC-insured, 4-5% APY). Goals in 2-5 years: CD ladder or intermediate savings. Goals 5+ years away: consider investing, because the expected return advantage of equity over savings accounts is meaningful over that horizon.

Automate savings to separate accounts labeled for specific goals. Having one 'savings' account creates competition between goals and makes it easy to dip into emergency funds for discretionary spending. Separate accounts with labels ('House Down Payment,' 'Emergency Fund,' 'Vacation') make the trade-off visible and reduce casual spending from goal-designated funds.

Review and recalibrate goals annually or when circumstances change. A job change, salary increase, or life event typically changes both your income and your goal priorities. A financial plan that's never updated becomes irrelevant quickly.`}
        conclusion={`The discipline of working backward from goals to monthly savings amounts is genuinely transformative for financial planning. Most people budget by looking at what's left over after spending. Goal-based planning asks how much is needed for specific objectives, then forces the spending side to accommodate.

For major long-term goals (retirement, financial independence), use [our FIRE Calculator](/calculators/finance/fire-calculator) for the portfolio-size and timeline analysis that goes beyond the savings accumulation phase this calculator covers.`}

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
            { name: "Emergency Fund Calculator", href: "/calculators/finance/emergency-fund-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
      </div>
      
    </CalculatorLayout>
  )
}
