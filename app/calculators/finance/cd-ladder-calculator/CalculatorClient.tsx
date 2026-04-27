'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { calculateCDLadder } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const RUNG_COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6']

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const [totalInvestment, setTotalInvestment] = useState(50000)
  const [numRungs, setNumRungs] = useState(5)
  const [baseRate, setBaseRate] = useState(4.5)
  const [rateIncrement, setRateIncrement] = useState(0.3)

  const result = useMemo(() => calculateCDLadder(totalInvestment, numRungs, baseRate, rateIncrement),
    [totalInvestment, numRungs, baseRate, rateIncrement])

  const chartData = result.rungs.map((r, i) => ({
    name: `${r.years}yr CD`,
    Principal: r.principal,
    Interest: r.interest,
    rate: r.rate,
    color: RUNG_COLORS[i % RUNG_COLORS.length],
  }))

  return (
    <CalculatorLayout title="CD Ladder Calculator USA 2026" description="Build a certificate of deposit laddering strategy to maximize FDIC-insured yield with annual liquidity." icon="🏗️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">CD Ladder Setup</h2>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Total Investment</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={totalInvestment} onChange={e => setTotalInvestment(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Number of Rungs</label>
            <div className="grid grid-cols-5 gap-1.5">
              {[3, 4, 5, 6, 7].map(n => (
                <button key={n} onClick={() => setNumRungs(n)}
                  className={`py-2 rounded-xl text-sm font-bold transition-all ${numRungs === n ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{n}</button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">1-Year CD Rate (APY)</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <input type="number" value={baseRate} onChange={e => setBaseRate(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Rate Increment per Rung</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <input type="number" value={rateIncrement} onChange={e => setRateIncrement(Number(e.target.value))} step={0.05} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>

          {/* Rates preview */}
          <div className="bg-gray-50 rounded-xl p-3 space-y-1.5">
            <p className="text-xs font-semibold text-gray-600 mb-2">CD Rate Schedule</p>
            {result.rungs.map((r, i) => (
              <div key={i} className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: RUNG_COLORS[i % RUNG_COLORS.length] }} />
                  <span className="text-gray-600">{r.years}-Year CD</span>
                </div>
                <span className="font-bold text-gray-800">{r.rate}% APY</span>
              </div>
            ))}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">Blended Yield</p>
            <p className="text-2xl font-black text-green-700">{result.blendedRate.toFixed(2)}%</p>
            <p className="text-xs text-gray-500 mt-0.5">weighted average APY</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total at Maturity" value={fmtCompact(result.totalMaturity)} highlight />
            <ResultCard label="Total Interest" value={fmtCompact(result.totalInterest)} />
            <ResultCard label="Per Rung" value={fmtCompact(totalInvestment / numRungs)} subValue="invested each" />
            <ResultCard label="Blended Rate" value={`${result.blendedRate.toFixed(2)}%`} subValue="weighted APY" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Maturity Value by CD Rung</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={60} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [`$${v.toLocaleString()}`, name]} />
                  <Bar dataKey="Principal" stackId="a" fill="#e2e8f0" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="Interest" stackId="a" radius={[4, 4, 0, 0]}>
                    {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">CD Ladder Schedule</h3>
            <div className="overflow-x-auto">
              <table className="calc-table">
                <thead><tr><th>Rung</th><th>Term</th><th>APY</th><th>Principal</th><th>Interest Earned</th><th>Maturity Value</th></tr></thead>
                <tbody>
                  {result.rungs.map((r, i) => (
                    <tr key={r.rung}>
                      <td><span className="w-2.5 h-2.5 rounded-full inline-block mr-2" style={{ background: RUNG_COLORS[i % RUNG_COLORS.length] }} />{r.rung}</td>
                      <td className="font-medium">{r.years} year{r.years > 1 ? 's' : ''}</td>
                      <td className="text-green-600 font-bold">{r.rate}%</td>
                      <td>${r.principal.toLocaleString()}</td>
                      <td className="text-green-600">+${r.interest.toLocaleString()}</td>
                      <td className="font-bold">${r.maturityValue.toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="bg-green-50 font-bold">
                    <td colSpan={3}>Total</td>
                    <td>${totalInvestment.toLocaleString()}</td>
                    <td className="text-green-600">+${result.totalInterest.toLocaleString()}</td>
                    <td>${result.totalMaturity.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">CD Ladder Calculator - Build Safe, High-Yield FDIC-Insured Income USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Why CD Laddering Beats a Single CD</h3>
              <p>A CD ladder solves the core trade-off in fixed-income investing: higher rates come with longer terms, but longer terms mean less flexibility. By splitting $50,000 across 1-year, 2-year, 3-year, 4-year, and 5-year CDs ($10,000 each), you get the higher blended rate of the long-term CDs while having $10,000 maturing every year for reinvestment or use. When each CD matures, you reinvest in a new 5-year CD (assuming rates are favorable), maintaining the ladder. This strategy also protects against both rising rates (short CDs reinvest at higher rates soon) and falling rates (long CDs locked in at today's rates).</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">CD vs High-Yield Savings Account</h3>
              <p>High-yield savings accounts (HYSA) at online banks offer 4-5% APY in 2026 with full liquidity - you can withdraw anytime. CDs typically offer slightly higher rates in exchange for locking up funds for a fixed term. HYSAs are better for emergency funds and short-term savings. CDs are better for money you do not need for a defined period - down payment savings, short-term bonds replacement, conservative retirement savings. The CD ladder combines both: regular liquidity from maturing rungs plus the higher CD rates for longer-term portions.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Best CD Rates in 2026</h3>
              <p>Online banks consistently offer the highest CD rates because they lack physical branch overhead. Top 2026 rates: 1-year CDs at 5.0-5.5% APY (Ally, Marcus by Goldman Sachs, Discover, Synchrony). 5-year CDs at 4.5-5.0% APY. Credit unions often match or exceed online bank rates and are NCUA-insured up to $250,000. Traditional big banks (Chase, Bank of America) typically pay 0.1-1% on CDs - significantly lower. Always check Bankrate, NerdWallet, or DepositAccounts.com to compare current rates before committing.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">CD Ladders for Retirement Income</h3>
              <p>Retirees often use CD ladders to fund the first 3-5 years of retirement expenses while longer-term investments (stock index funds) have time to recover from market downturns. This bucket strategy: Bucket 1 (years 1-2): cash and CDs, guaranteed return. Bucket 2 (years 3-7): short-term bonds and CD ladder. Bucket 3 (years 8+): stock index funds for long-term growth. The CD ladder provides predictable income without market risk for the near-term while the stock portfolio compounds for later decades of retirement.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          CD Ladder Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          $10,000 in a high-yield savings account at 4.5% APY earns <strong>$450</strong> in the first year. Over 5 years with monthly additions of $500, it grows to $43,500+.
        </p>
        <p className="text-sm text-gray-600">
          Use this CD Ladder USA 2026 tool to compare rates, terms, and contribution strategies to maximize your savings returns.
        </p>
      </Card>
      <SEOContent
        title="CD Ladder Calculator USA – Build the Perfect CD Ladder for Maximum Yield and Liquidity in 2026"
        category="finance"
        intro={`A CD ladder is one of the most effective strategies for investors who want FDIC-insured safety without locking all their money into a single maturity date. By spreading equal amounts across CDs maturing at different intervals — say, 1, 2, 3, 4, and 5-year CDs — you create a rolling schedule of maturities that provides both higher average yields (from the longer maturities) and regular access to funds as each rung matures.

The problem with putting all your savings into one long-term CD: if rates rise, you miss the higher rates until that CD matures, and early withdrawal penalties are steep (often 180+ days of interest). The problem with all your savings in short-term CDs: you sacrifice yield for liquidity you may not need.

A 5-rung ladder invests equal portions in 1, 2, 3, 4, and 5-year CDs. When the 1-year CD matures, you reinvest it in a new 5-year CD. After year 5, every CD in the ladder is at the highest available rate, and one CD matures every year giving you annual access to funds.`}
        howItWorks={`Ladder construction: Divide total investment by number of rungs. Each rung matures at a different interval. As each CD matures, reinvest at the longest duration in the ladder to maintain the structure.

Total interest calculation: Each rung earns its own APY for its specific term. The blended ladder yield = weighted average of all rung APYs. A 5-rung ladder with rates of 4.5%, 4.6%, 4.7%, 4.8%, and 4.9% earns a blended 4.7% — higher than the 1-year rate alone but with annual liquidity.

Break-even vs savings account: CD ladder yield minus HYSA yield × total invested = annual advantage of the ladder. If the ladder yields 4.7% and a HYSA yields 4.5%, the $2,000 advantage on a $100,000 ladder is $200/year — small, but compounding with FDIC safety.`}
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
        tipsSection={`Consider your actual liquidity needs before committing to any CD. If you might need the money in 18 months, don't buy a 3-year CD without understanding the early withdrawal penalty. Many online banks now offer CDs with no-penalty early withdrawal — useful for uncertain timelines.

Shop rates at multiple institutions. CD rates vary significantly — a 1% difference on $50,000 over 3 years is $1,500 in additional interest. Bankrate, DepositAccounts, and NerdWallet aggregate current rates. Credit unions often offer competitive rates that traditional bank comparisons miss.

Don't ladder beyond FDIC limits at any single institution. The $250,000 per depositor per institution limit applies across all your CDs at the same bank. Spread larger amounts across multiple institutions.`}
        conclusion={`CD ladders work best in stable or rising rate environments. In falling rate environments, the long-term CDs capture the higher rates while short-term rungs that mature get reinvested at lower rates — this is actually still valuable relative to a single long-term CD that you'd have to break to capture any short-term flexibility.

For retirement investors within 5-10 years of their target date, a CD ladder can be a useful complement to bond allocation — providing predictable cash flows with no price volatility risk, unlike bond funds whose NAV fluctuates. Compare with [our CD vs HYSA Calculator](/calculators/finance/cd-vs-hysa-calculator) to understand whether the yield premium over high-yield savings accounts justifies the reduced liquidity.`}

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
            { name: "Savings Goal Calculator", href: "/calculators/finance/savings-goal-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Emergency Fund Calculator", href: "/calculators/finance/emergency-fund-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Bond Calculator", href: "/calculators/finance/government-bond-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
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
          { name: "Cd vs HYSA Calculator", href: "/calculators/finance/cd-vs-hysa-calculator", icon: "💰", desc: "Free calculator" },          { name: "Bonds vs Cds USA Calculator", href: "/calculators/finance/bonds-vs-cds-usa-calculator", icon: "📋", desc: "Free calculator" },          { name: "Government Bond Calculator", href: "/calculators/finance/government-bond-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "I Bonds vs Tips Calculator", href: "/calculators/finance/i-bonds-vs-tips-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Savings Goal Calculator", href: "/calculators/finance/savings-goal-calculator", icon: "🎯", desc: "Free calculator" },          { name: "Emergency Fund Calculator", href: "/calculators/finance/emergency-fund-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
