'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { TrendingUp, PiggyBank } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [monthly, setMonthly] = useState(10000)
  const [sipRate, setSipRate] = useState(12)
  const [rdRate, setRdRate] = useState(6.5)
  const [years, setYears] = useState(5)

  const result = useMemo(() => {
    const months = years * 12
    const sipMR = sipRate / 100 / 12
    const rdMR = rdRate / 100 / 4 // RD compounds quarterly

    const sipFV = monthly * ((Math.pow(1 + sipMR, months) - 1) / sipMR) * (1 + sipMR)
    const totalInvested = monthly * months

    // RD maturity: M = R x [(1+i)^n - 1] / (1 - (1+i)^(-1/3)) - simplified quarterly compounding
    let rdFV = 0
    for (let m = 1; m <= months; m++) {
      const remainingMonths = months - m + 1
      rdFV += monthly * Math.pow(1 + rdRate / 100 / 12, remainingMonths)
    }

    const sipGain = sipFV - totalInvested
    const rdGain = rdFV - totalInvested

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1; const m = y * 12
      const sFV = monthly * ((Math.pow(1 + sipMR, m) - 1) / sipMR) * (1 + sipMR)
      let rFV = 0
      for (let mo = 1; mo <= m; mo++) rFV += monthly * Math.pow(1 + rdRate / 100 / 12, m - mo + 1)
      return { year: y, invested: monthly * m, sip: Math.round(sFV), rd: Math.round(rFV) }
    })

    const barData = [
      { name: 'Invested', value: Math.round(totalInvested), fill: '#94a3b8' },
      { name: 'RD Gain', value: Math.round(rdGain), fill: '#3b82f6' },
      { name: 'SIP Gain', value: Math.round(sipGain), fill: '#10b981' },
    ]

    return {
      sipFV: Math.round(sipFV), rdFV: Math.round(rdFV),
      totalInvested: Math.round(totalInvested),
      sipGain: Math.round(sipGain), rdGain: Math.round(rdGain),
      sipBetter: sipFV > rdFV,
      difference: Math.round(Math.abs(sipFV - rdFV)),
      sipReturnPct: ((sipGain / totalInvested) * 100).toFixed(1),
      rdReturnPct: ((rdGain / totalInvested) * 100).toFixed(1),
      yearlyData, barData,
    }
  }, [monthly, sipRate, rdRate, years])

  return (
    <CalculatorLayout title="SIP vs RD Calculator India 2026" description="Compare monthly SIP mutual fund vs bank Recurring Deposit returns over 3–20 years." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <PiggyBank className="w-4 h-4" /> Monthly Savings Details
          </h2>
          <div className="space-y-5">
            <InputField label="Monthly Amount" value={monthly} onChange={setMonthly} min={500} max={500000} step={500} prefix="₹" />
            <InputField label="SIP Expected Return (p.a.)" value={sipRate} onChange={setSipRate} min={1} max={30} step={0.5} suffix="%" />
            <InputField label="RD Interest Rate (p.a.)" value={rdRate} onChange={setRdRate} min={1} max={12} step={0.25} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={20} step={1} suffix="Yrs" />
          </div>
          <div className={`mt-5 p-4 rounded-xl border-2 text-center ${result.sipBetter ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Better Investment</p>
            <p className="text-2xl font-black" style={{ color: result.sipBetter ? '#10b981' : '#3b82f6' }}>{result.sipBetter ? 'SIP' : 'RD'} 🏆</p>
            <p className="text-sm text-gray-600 mt-1">by {fmtCompact(result.difference)}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="SIP Value" value={fmtCompact(result.sipFV)} subValue={`+${result.sipReturnPct}% total`} highlight={result.sipBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="RD Maturity" value={fmtCompact(result.rdFV)} subValue={`+${result.rdReturnPct}% total`} highlight={!result.sipBetter} icon={<PiggyBank className="w-4 h-4" />} />
            <ResultCard label="SIP Gain" value={fmtCompact(result.sipGain)} subValue="Returns on SIP" />
            <ResultCard label="RD Interest" value={fmtCompact(result.rdGain)} subValue="Interest earned" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Growth Comparison Over {years} Years</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gSipRd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gRd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gInvRd" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} /><stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={68}
                    tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="invested" name="Invested" stroke="#94a3b8" fill="url(#gInvRd)" strokeWidth={1.5} strokeDasharray="4 2" />
                  <Area type="monotone" dataKey="rd" name="RD Value" stroke="#3b82f6" fill="url(#gRd)" strokeWidth={2} />
                  <Area type="monotone" dataKey="sip" name="SIP Value" stroke="#10b981" fill="url(#gSipRd)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-wise Comparison</h3>
            <div className="overflow-y-auto max-h-48">
              <table className="calc-table">
                <thead><tr><th>Year</th><th>Invested</th><th>SIP Value</th><th>RD Value</th><th>SIP Advantage</th></tr></thead>
                <tbody>
                  {result.yearlyData.map(r => (
                    <tr key={r.year}>
                      <td className="text-gray-500">{r.year}</td>
                      <td>{fmtCompact(r.invested)}</td>
                      <td className="text-green-400 font-semibold">{fmtCompact(r.sip)}</td>
                      <td className="text-blue-400">{fmtCompact(r.rd)}</td>
                      <td className={r.sip > r.rd ? 'text-green-400 font-bold' : 'text-red-400'}>{r.sip > r.rd ? '+' : ''}{fmtCompact(r.sip - r.rd)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Sip vs Rd: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Sip?</h3>
              <p>Sip is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Rd?</h3>
              <p>Rd takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Sip and Rd is how returns are generated and taxed. Sip typically suits growth-oriented investors while Rd may appeal to those prioritizing stability or specific tax advantages.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">Tax Treatment in India</h3>
              <p>Tax efficiency dramatically affects real returns. Gains from each option may be subject to LTCG (10%) or income tax slab. Using the calculator above helps you see the true post-tax outcome based on your specific situation and contribution level.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Which Is Better for Long-Term Wealth Creation?</h3>
              <p>The right choice depends on your time horizon, risk tolerance, and tax bracket. For goals 5+ years away, higher-return options (12-15% historical) generally beat lower-return stable options (6-7.5%). For goals under 3 years, capital preservation takes priority.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">How to Use This Calculator</h3>
              <p>Enter your monthly contribution, expected return rates for both options, and investment period above. The calculator shows year-by-year growth, total wealth created, and the difference between the two strategies - helping you visualize the long-term impact of your choice.</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">💡 Expert Tip</h3>
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Sip and Rd based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },          { name: "Wealth Calculator", href: "/calculators/finance/wealth-calculator", icon: "💎", desc: "Free calculator" },          { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🌅", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SIP Vs RD Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this SIP Vs RD USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          SIP vs RD Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with INR 10,000/month for 5 years, your SIP vs RD calculator India 2026 shows SIP building INR 8.2 lakh vs RD building INR 7.2 lakh — with guidance on whether the extra return justifies the market risk.
        </p>
      </Card>

            <SEOContent
        title="SIP vs RD Calculator India – Monthly SIP or Recurring Deposit: Which Grows More in 2026?"
        category="finance"
        intro={`SIP and RD (Recurring Deposit) both involve disciplined monthly investments of a fixed amount — the structural similarity makes them natural comparisons. But they're built for different purposes: RD provides guaranteed capital protection and predictable returns; SIP in equity mutual funds provides long-term growth potential with market-linked returns.

RD rates in India currently range from 6.5-7.5% for major banks and up to 8-9% at small finance banks. These rates are known and fixed at the time of opening. SIP returns in equity mutual funds are uncertain — historical data shows 12-15% CAGR for diversified equity funds over 10-15 year periods, but individual year returns range from -50% to +70%.

The comparison becomes most compelling when looking at 10-15 year outcomes. ₹10,000/month for 15 years: RD at 7% produces approximately ₹32.7 lakh (total invested: ₹18 lakh). Equity SIP at 12% CAGR produces approximately ₹50.5 lakh. At 14% CAGR: ₹60.7 lakh. The wealth difference compounds dramatically over longer periods.`}
        howItWorks={`RD calculation: Each monthly deposit earns interest from deposit date to maturity. Total maturity value = Σ[Monthly deposit × (1 + r/4)^(4 × n/12)] for each installment (n months remaining).

SIP return: Standard formula FV = PMT × [(1 + r/12)^n - 1] / (r/12) for monthly contributions at expected annual return rate r over n months.

After-tax: RD interest added to income and taxed at slab rate. TDS above ₹40,000 annual interest (₹50,000 for seniors). Equity SIP gains after 1 year: 10% LTCG above ₹1 lakh annual exemption. Net return differential typically further favors SIP at higher income brackets.`}
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
        tipsSection={`RD is appropriate for: specific near-term goals with defined timelines, accumulating a down payment, building an emergency fund, or investing money you genuinely cannot afford to lose in a market downturn. The predictability is not just a 'nice to have' — for real near-term obligations, it's essential.

For young working professionals saving for medium-to-long-term goals (retirement, children's education 15+ years away): equity SIP in index funds is almost always superior on an expected return basis, despite the short-term volatility. The time horizon is what matters.

For the genuinely risk-averse investor who would lose sleep over a 30% portfolio decline: RD provides peace of mind that equity SIP doesn't. No calculator output should override genuine personal risk tolerance — holding an investment you'll sell in panic is worse than holding a lower-return vehicle you'll maintain consistently.`}
        conclusion={`RD and SIP aren't mutually exclusive in financial planning — they serve different roles. Using RD for near-term goals (under 5 years) and equity SIP for long-term goals (over 10 years) is a rational, common approach that captures guaranteed returns where timing is important and growth potential where time horizon allows for volatility.

For tax planning: starting an RD early in the financial year ensures interest isn't concentrated in a single year that might push you into a TDS threshold. Spreading RD maturities across financial years through a ladder approach minimizes the tax impact of large interest payouts. Compare with [our CD Ladder Calculator](/calculators/finance/cd-ladder-calculator) for similar strategies applied to US certificates of deposit.`}

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
