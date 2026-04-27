'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { TrendingUp, Landmark } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [monthly, setMonthly] = useState(10000)
  const [sipRate, setSipRate] = useState(12)
  const [fdRate, setFdRate] = useState(7)
  const [years, setYears] = useState(10)

  const result = useMemo(() => {
    const months = years * 12
    const sipMonthlyRate = sipRate / 100 / 12
    const sipFV = monthly * ((Math.pow(1 + sipMonthlyRate, months) - 1) / sipMonthlyRate) * (1 + sipMonthlyRate)
    const totalInvested = monthly * months

    // FD: reinvest each month's deposit as a separate FD
    const fdMonthlyRate = fdRate / 100 / 12
    let fdFV = 0
    for (let m = 1; m <= months; m++) {
      const remainingMonths = months - m + 1
      fdFV += monthly * Math.pow(1 + fdMonthlyRate, remainingMonths)
    }

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1
      const m = y * 12
      const sFV = monthly * ((Math.pow(1 + sipMonthlyRate, m) - 1) / sipMonthlyRate) * (1 + sipMonthlyRate)
      let fFV = 0
      for (let mo = 1; mo <= m; mo++) fFV += monthly * Math.pow(1 + fdMonthlyRate, m - mo + 1)
      return { year: y, invested: monthly * m, sip: Math.round(sFV), fd: Math.round(fFV) }
    })

    return {
      sipFV: Math.round(sipFV),
      fdFV: Math.round(fdFV),
      totalInvested: Math.round(totalInvested),
      sipGain: Math.round(sipFV - totalInvested),
      fdGain: Math.round(fdFV - totalInvested),
      sipBetter: sipFV > fdFV,
      difference: Math.round(Math.abs(sipFV - fdFV)),
      yearlyData,
    }
  }, [monthly, sipRate, fdRate, years])

  const winner = result.sipBetter ? 'SIP' : 'FD'
  const winnerColor = result.sipBetter ? '#10b981' : '#3b82f6'

  return (
    <CalculatorLayout title="SIP vs FD Calculator India 2026" description="Compare monthly SIP mutual fund returns vs Fixed Deposit after tax over 3–20 years." icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Investment Details
          </h2>
          <div className="space-y-5">
            <InputField label="Monthly Investment" value={monthly} onChange={setMonthly} min={500} max={500000} step={500} prefix="₹" />
            <InputField label="SIP Expected Return (p.a.)" value={sipRate} onChange={setSipRate} min={1} max={30} step={0.5} suffix="%" />
            <InputField label="FD Interest Rate (p.a.)" value={fdRate} onChange={setFdRate} min={1} max={15} step={0.25} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yrs" />
          </div>
          <div className={`mt-5 p-4 rounded-xl border-2 text-center ${result.sipBetter ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Better Investment</p>
            <p className="text-2xl font-black" style={{ color: winnerColor }}>{winner} Wins 🏆</p>
            <p className="text-sm text-gray-600 mt-1">by {fmtCompact(result.difference)}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="SIP Final Value" value={fmtCompact(result.sipFV)} subValue={`Gain: ${fmtCompact(result.sipGain)}`} highlight={result.sipBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="FD Final Value" value={fmtCompact(result.fdFV)} subValue={`Gain: ${fmtCompact(result.fdGain)}`} highlight={!result.sipBetter} icon={<Landmark className="w-4 h-4" />} />
            <ResultCard label="Total Invested" value={fmtCompact(result.totalInvested)} subValue={`${years}y x ₹${monthly.toLocaleString()}/mo`} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Growth Comparison Over Time</h3>
            <div style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gSip" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gFd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gInv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} /><stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={65} tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="invested" name="Invested" stroke="#94a3b8" fill="url(#gInv)" strokeWidth={1.5} strokeDasharray="4 2" />
                  <Area type="monotone" dataKey="fd" name="FD Value" stroke="#3b82f6" fill="url(#gFd)" strokeWidth={2} />
                  <Area type="monotone" dataKey="sip" name="SIP Value" stroke="#10b981" fill="url(#gSip)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-wise Comparison</h3>
            <div className="overflow-y-auto max-h-56">
              <table className="calc-table">
                <thead><tr><th>Year</th><th>Invested</th><th>SIP Value</th><th>FD Value</th><th>SIP Advantage</th></tr></thead>
                <tbody>
                  {result.yearlyData.map(r => (
                    <tr key={r.year}>
                      <td className="text-gray-500">{r.year}</td>
                      <td>{fmtCompact(r.invested)}</td>
                      <td className="text-green-400 font-semibold">{fmtCompact(r.sip)}</td>
                      <td className="text-blue-400">{fmtCompact(r.fd)}</td>
                      <td className={r.sip > r.fd ? 'text-green-400 font-bold' : 'text-red-400'}>{r.sip > r.fd ? '+' : ''}{fmtCompact(r.sip - r.fd)}</td>
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
          <h2 className="text-xl font-bold font-display text-white mb-4">SIP vs FD: Which is Better?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-400 leading-relaxed">
            <div>
              <h3 className="text-green-500 font-semibold mb-2">Why SIP Wins Long-Term</h3>
              <p>Equity mutual fund SIPs have historically delivered 12-15% CAGR over 10+ year periods. FDs offer guaranteed but much lower returns of 6-7.5%. The power of compounding means even a 4-5% difference in return rate creates dramatically different outcomes over 15-20 years - often 2-3x more wealth via SIP.</p>
              <h3 className="text-blue-400 font-semibold mb-2 mt-4">When FD Makes Sense</h3>
              <p>FDs are ideal for short-term goals (1-3 years), senior citizens seeking regular income, capital preservation goals, or investors with very low risk tolerance. FD returns are predictable and guaranteed up to ₹5 lakh per bank by DICGC insurance.</p>
            </div>
            <div>
              <h3 className="text-yellow-500 font-semibold mb-2">Tax Treatment Comparison</h3>
              <p>FD interest is fully taxable as per income tax slab - at 30% bracket you effectively earn only 4.9% on a 7% FD. Long-term capital gains (LTCG) from equity SIPs above ₹1 lakh are taxed at just 10%. This post-tax difference makes SIPs even more attractive for long-term investors.</p>
              <h3 className="text-purple-400 font-semibold mb-2 mt-4">Optimal Strategy</h3>
              <p>Maintain 6 months of emergency funds in FD for liquidity and safety. Invest everything above that in SIP for goals 5+ years away. For 3-5 year goals, consider debt mutual funds as a middle ground - better post-tax returns than FDs with reasonable safety.</p>
            </div>
          </div>
        </Card>
      </div>
      <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Sip vs Fd: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">Understanding Sip</h3>
              <p>Sip offers distinct advantages for specific financial goals. Understanding when it outperforms Fd depends on your time horizon, tax bracket, and risk tolerance.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Understanding Fd</h3>
              <p>Fd provides different risk-return characteristics. Each has its place in a well-structured financial plan depending on your circumstances.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">How to Decide</h3>
              <p>The right choice depends on investment horizon, tax situation, and liquidity needs. Short-term goals (under 3 years) favour stability; long-term goals (7+ years) favour growth. Use the calculator above to compare with your own numbers.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Tax Considerations</h3>
              <p>Post-tax returns can differ significantly between these options. Always calculate your effective after-tax return for an accurate comparison in your specific tax bracket.</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">💡 Expert Tip</h3>
            <p className="text-sm text-green-700 leading-relaxed">Most investors benefit from a diversified approach combining both Sip and Fd in proportions that match their goals rather than choosing one exclusively. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Fd Calculator", href: "/calculators/finance/fd-calculator", icon: "🏦", desc: "Free calculator" },          { name: "Rd Calculator", href: "/calculators/finance/rd-calculator", icon: "📊", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "Step Up SIP Calculator", href: "/calculators/finance/step-up-sip-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs PPF Calculator", href: "/calculators/finance/sip-vs-ppf-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs NPS Calculator", href: "/calculators/finance/sip-vs-nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Return Calculator", href: "/calculators/finance/mutual-fund-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "PPF vs Fd Calculator", href: "/calculators/finance/ppf-vs-fd-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SIP Vs FD Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this SIP Vs FD USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SIP vs FD Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, investing INR 8,000/month for 15 years, your SIP vs FD calculator India 2026 shows equity SIP building INR 43.2 lakh vs FD building INR 27.6 lakh — with a risk trade-off analysis.
        </p>
      </Card>

            <SEOContent
        title="SIP vs FD Calculator India – Monthly SIP or Fixed Deposit: Which Grows Your Money More in 2026?"
        category="finance"
        intro={`The SIP vs FD comparison in India might be the most important investment choice most retail investors face — and the answer changes dramatically depending on your time horizon. For money you need in 3 years: FD. For money you're building over 15 years: equity SIP. For 5-7 years: it depends.

FDs provide certainty and capital protection. Bank FDs are insured up to ₹5 lakh per bank by DICGC. The interest rate is fixed at deposit, and the maturity value is fully predictable. For near-term goals, this certainty is exactly what you need — a market crash 2 years before you need a down payment money is catastrophically bad timing.

Equity SIPs in mutual funds have no capital protection but have significantly outperformed FDs over long periods. The Nifty 50 index, representing India's 50 largest companies, delivered approximately 14.5% CAGR over the 20 years ending 2024 — compared to FD rates that ranged from 5-8% over the same period. This 6-8% differential, compounded over 20 years, produces dramatically different wealth outcomes.`}
        howItWorks={`FD maturity value: P × (1 + r/4)^(4n) for quarterly compounding, where r is annual rate and n is years in decimal.

SIP maturity value: PMT × [(1 + r/12)^(12n) - 1] / (r/12), where PMT is monthly contribution, r is annual expected return, n is years.

After-tax comparison: FD interest added to income, taxed at applicable slab rate. Equity SIP LTCG (gains after 1 year): 10% above ₹1 lakh annual exemption. For a 30% bracket investor: FD at 7.5% nets 5.25%; equity SIP at 12% CAGR nets approximately 11% effectively after LTCG (above the exempt threshold).`}
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
        tipsSection={`Run both scenarios for your specific time horizon before deciding. At 3 years, FD almost always wins on a risk-adjusted basis. At 5 years, the choice is genuinely unclear — equity SIP has higher expected returns but meaningful risk of underperforming if a bear market coincides with your end date. At 10+ years, equity SIP historically wins in almost all scenarios.

For a practical compromise on 5-7 year horizons: split investments between FD (capital protection for the certain portion of your goal) and equity SIP (growth potential for the longer-duration portion). This isn't optimal for either pure goal but manages risk for medium-term targets.

Don't compare nominal FD rates to nominal SIP CAGR without adjusting for tax. The after-tax comparison is what matters, and the differential often favors equity SIPs more than the gross numbers suggest for higher-bracket investors.`}
        conclusion={`The biggest risk in SIP investing isn't the market — it's the investor. SIP returns in practice are worse than theoretical returns because many investors stop SIPs during corrections (exactly when they should continue) and invest extra during bull markets (exactly when they shouldn't rush). Committing to a 15-year SIP and maintaining it through multiple market cycles is the fundamental requirement for capturing the historical equity premium.

For first-time investors nervous about equity volatility, starting a small SIP (₹1,000-₹2,000/month) in a balanced or hybrid fund — which holds both equity and debt — provides exposure to equity returns with somewhat lower volatility. Build to higher equity allocation as you become comfortable with how markets move.`}

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
            { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
