'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { calculateLumpsum } from '@/lib/calculations/finance'
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
  const [principal, setPrincipal] = useState(currency.defaultValues.mediumAmount)
  const [rate, setRate] = useState(10)
  const [years, setYears] = useState(10)

  const result = useMemo(() => calculateLumpsum(principal, rate, years), [principal, rate, years])

  // Rule of 72
  const doublingYears = (72 / rate).toFixed(1)
  const doublingCount = Math.floor(years / Number(doublingYears))

  const pieData = [
    { name: 'Principal', value: result.principal, color: '#3b82f6' },
    { name: 'Returns', value: result.totalReturns, color: '#14b8a6' },
  ]

  const tickFmt = (v: number) => {
    if (currency.code === 'INR') return v >= 10000000 ? `₹${(v / 10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v / 100000).toFixed(0)}L` : `₹${(v / 1000).toFixed(0)}K`
    return v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`
  }

  return (
    <CalculatorLayout title="Lump Sum Investment Calculator USA 2026" description={`Calculate the future value of a one-time investment in ${currency.name} with compound growth.`} icon="💼" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Investment Details</h2>
          <div className="space-y-5">
            <InputField label={`One-time Investment (${currency.symbol})`} value={principal} onChange={setPrincipal}
              min={currency.code === 'INR' ? 1000 : 100}
              max={currency.code === 'INR' ? 100000000 : 10000000}
              step={currency.code === 'INR' ? 1000 : 100}
              prefix={currency.symbol}
            />
            <InputField label="Expected Annual Return" value={rate} onChange={setRate} min={1} max={30} step={0.5} suffix="%" />
            <InputField label="Investment Duration" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yrs" />
          </div>
          <div className="mt-5 space-y-3">
            <div className="p-3 rounded-xl bg-green-100 border border-green-200">
              <p className="text-xs text-gray-500">Rule of 72 - Money doubles every</p>
              <p className="text-xl font-bold text-green-700">{doublingYears} years</p>
              <p className="text-xs text-gray-400">Doubles {doublingCount}x in {years} years at {rate}%</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Maturity Value" value={fmtCompact(result.maturityAmount)} subValue={fmt(result.maturityAmount)} highlight />
            <ResultCard label="Principal Invested" value={fmtCompact(result.principal)} />
            <ResultCard label="Total Gain" value={fmtCompact(result.totalReturns)} subValue={`${((result.totalReturns / result.principal) * 100).toFixed(1)}%`} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Investment Growth</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lsP" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                    <linearGradient id="lsT" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} /><stop offset="95%" stopColor="#14b8a6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={76} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 10 }} />
                  <Area type="monotone" dataKey="invested" name="Principal" stroke="#3b82f6" fill="url(#lsP)" strokeWidth={2} />
                  <Area type="monotone" dataKey="total" name="Total Value" stroke="#14b8a6" fill="url(#lsT)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Principal vs Returns</h3>
              <div style={{ height: 190 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [fmt(v), name]} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-wise Growth</h3>
              <div className="overflow-y-auto max-h-[190px]">
                <table className="calc-table">
                  <thead><tr><th>Year</th><th>Gain</th><th>Total</th></tr></thead>
                  <tbody>
                    {result.yearlyData.filter((_, i) => i % 2 === 0 || i === result.yearlyData.length - 1).map(row => (
                      <tr key={row.year}>
                        <td className="text-gray-500">{row.year}</td>
                        <td className="text-green-600">{fmtCompact(row.returns)}</td>
                        <td className="font-semibold text-white">{fmtCompact(row.total)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Lumpsum Calculator - Maximize One-Time Investment Returns USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">What is Lumpsum Investment?</h3>
              <p>A lumpsum investment is a one-time investment of a fixed amount (as opposed to SIP which invests periodically). You invest the entire amount at once and let it grow with compounding. Lumpsum works best when: (1) You receive a windfall - bonus, inheritance, matured insurance, property sale proceeds. (2) Markets have corrected significantly (buying during dips). (3) You have a long investment horizon and confidence in the asset's long-term potential. (4) You\'re investing in relatively less volatile instruments like debt funds or FDs. The formula for lumpsum returns: Future Value = Present Value x (1 + r)^n, where r = annual return rate and n = years.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">When to Invest Lumpsum vs SIP?</h3>
              <p>The lumpsum vs SIP debate is nuanced. Historical data from NYSE / NASDAQ shows: In clearly bullish markets (trending up), lumpsum typically outperforms SIP over 5+ years because SIP buys at progressively higher prices. In volatile/range-bound markets, SIP outperforms lumpsum through rupee cost averaging. In bear markets (downtrend), lumpsum at the bottom outperforms massively. Since timing the market perfectly is impossible, a hybrid approach works best: invest 50% lumpsum immediately and deploy the remaining 50% as STP (Systematic Transfer Plan) over 6-12 months. This balances the risk of both approaches.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Lumpsum Investment in Mutual Funds vs FD</h3>
              <p>Comparing a $10 thousand lumpsum over 10 years: FD at 7.5%: Matures to $20.6 thousands. Large-cap equity MF at 12% CAGR: Grows to $31 thousands. Mid-cap MF at 15% CAGR: Grows to $40.5 thousands. The equity advantage compounds enormously: $10 thousand more in large-cap vs FD; $20 thousand more in mid-cap vs FD. Tax efficiency adds another advantage: FD interest is fully taxable at income tax bracket. LTCG on equity MF (after 1 year) is only 12.5% above $1.25 thousand annual gain. For long-term goals (5+ years), equity lumpsum investments typically dominate despite short-term volatility.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Lumpsum STP Strategy - The Smart Way to Invest Large Amounts</h3>
              <p>For lumpsum amounts above $5 thousands being invested in equity mutual funds, financial advisors often recommend a Systematic Transfer Plan (STP). Here\'s how it works: (1) Park the entire lumpsum in a liquid or overnight fund (safe, ~6-7% return). (2) Set up an STP to transfer a fixed amount every month to your target equity fund (typically over 6-12 months). (3) Benefit: you earn liquid fund returns on the uninvested portion, while gradually deploying into equity to average out entry points. STP captures the benefits of both lumpsum (returns on full amount immediately) and SIP (rupee cost averaging for equity portion).</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Lumpsum Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Lumpsum USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Lump Sum Investment Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, investing a $100,000 inheritance today, your lump sum investment calculator USA 2026 shows it grows to $196,000 at 7% in 10 years and $761,000 in 25 years — making the case for investing early and leaving it alone.
        </p>
      </Card>

            <SEOContent
        title="Lump Sum Investment Calculator USA – How Much Will Your One-Time Investment Be Worth?"
        category="finance"
        intro={`A lump sum investment represents a one-time capital deployment decision — whether from an inheritance, property sale, business exit, bonus, or gradual accumulation of savings that you're ready to invest. The question is how to deploy it effectively: what to invest in, how much, and whether to invest all at once or spread it over time.

The mathematical case for immediate lump sum investment is well-documented: markets trend upward over time, so money invested immediately has the maximum time to compound. Research consistently shows that investing a lump sum immediately outperforms spreading the investment (dollar-cost averaging) about 65-70% of the time over any given subsequent period.

The psychological challenge is real: if you invest $500,000 on a single day and the market drops 15% the following month, your account shows a $75,000 loss almost immediately. For most people, this emotional experience is difficult regardless of the intellectual understanding that long-term investors should be indifferent to short-term fluctuations. The calculator helps you see both the expected value of immediate investment and the trade-offs of alternative approaches.`}
        howItWorks={`Lump sum growth: FV = PV × (1 + r)^n where PV is initial investment, r is annual return, n is years. $500,000 at 8% for 20 years = $500,000 × (1.08)^20 = $2,330,479.

Inflation-adjusted projection: Real return = (1 + nominal return) / (1 + inflation) - 1. At 8% nominal and 2.5% inflation: real return = 5.37%. $500,000 in real purchasing power after 20 years = $500,000 × (1.0537)^20 = $1,421,857 — the amount in today's dollars.

DCA comparison: If the same $500,000 is deployed $50,000/month over 10 months, the average investment date is 4.5 months later than immediate investment. Expected cost of this delay at 8% annual return: $500,000 × [(1.08)^(4.5/12) - 1] ≈ $14,700. That's the expected DCA disadvantage in rising markets — modest in absolute terms but real.`}
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
        tipsSection={`For large lump sums (above $250,000), consider the psychological impact of deploying in 2-3 tranches over 3-6 months. The mathematical cost is small; the behavioral benefit of reducing regret risk (investing the whole amount at a temporary peak) can be significant.

Asset allocation for a lump sum should reflect your long-term target allocation, not react to current market conditions. Timing the market is reliably unsuccessful for most investors. Allocating to your planned stocks/bonds/cash mix immediately — and maintaining it — is almost always better than trying to be clever about entry timing.

For investment selection: a globally diversified index fund (MSCI World, ACWI, or S&P 500) is the appropriate starting point for most lump sum investments. There's no compelling evidence that complex multi-asset strategies outperform simple index investing for retail investors after fees.`}
        conclusion={`A lump sum received from an inheritance, house sale, or business exit carries emotional weight beyond the financial value. Take 30-90 days to make no major investment decisions — park the money in a HYSA or money market fund, get your tax implications assessed, and make a deliberate plan. Decisions made immediately after receiving large sums are often poor ones.

After deploying the investment, the most important action is to set a calendar reminder to review — not react — to the portfolio in 12 months. Long-term wealth building requires resisting the urge to make changes in response to market movements. Use [our Dollar-Cost Averaging vs Lump Sum Calculator](/calculators/finance/dollar-cost-averaging-vs-lumpsum-usa-calculator) to model the specific timing comparison for your amount.`}

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
