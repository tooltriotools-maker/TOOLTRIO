'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { TrendingUp, Shield } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }
const isUSD = false
const fmt = (n: number) => '£' + Math.round(n).toLocaleString()
const fmtC = (n: number) => n >= 1000000 ? '£' + (n/1000000).toFixed(2) + 'M' : '£' + (n/1000).toFixed(0) + 'K'

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [monthly, setMonthly] = useState(500)
  const [rateA, setRateA] = useState(8)
  const [rateB, setRateB] = useState(10)
  const [years, setYears] = useState(20)

  const result = useMemo(() => {
    const months = years * 12
    const mrA = rateA / 100 / 12
    const mrB = rateB / 100 / 12
    const fvA = monthly * ((Math.pow(1 + mrA, months) - 1) / mrA) * (1 + mrA)
    const fvB = monthly * ((Math.pow(1 + mrB, months) - 1) / mrB) * (1 + mrB)
    const invested = monthly * months
    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1; const m = y * 12
      const a = monthly * ((Math.pow(1 + mrA, m) - 1) / mrA) * (1 + mrA)
      const b = monthly * ((Math.pow(1 + mrB, m) - 1) / mrB) * (1 + mrB)
      return { year: y, optA: Math.round(a), optB: Math.round(b), invested: monthly * m }
    })
    return { fvA: Math.round(fvA), fvB: Math.round(fvB), invested: Math.round(invested), gainA: Math.round(fvA - invested), gainB: Math.round(fvB - invested), aBetter: fvA > fvB, diff: Math.round(Math.abs(fvA - fvB)), yearlyData }
  }, [monthly, rateA, rateB, years])

  return (
    <CalculatorLayout title="ISA vs SIPP UK Calculator 2026" description="Compare Stocks and Shares ISA vs Self-Invested Personal Pension on after-tax retirement wealth." icon="🇬🇧" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Investment Details</h2>
          <div className="space-y-4">
            <InputField label="Monthly Contribution" value={monthly} onChange={setMonthly} min={50} max={10000} step={50} prefix="£" />
            <InputField label="ISA Return (p.a.)" value={rateA} onChange={setRateA} min={1} max={20} step={0.25} suffix="%" />
            <InputField label="SIPP Return (p.a.)" value={rateB} onChange={setRateB} min={1} max={15} step={0.25} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yrs" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.aBetter ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Better Investment</p>
            <p className="text-xl font-black" style={{ color: result.aBetter ? '#10b981' : '#3b82f6' }}>{result.aBetter ? 'ISA' : 'SIPP'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtC(result.diff)} over {years} yrs</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-green-900/20 rounded-lg text-center border border-green-800/30">
              <p className="text-green-400 font-bold">ISA</p>
              <p className="text-white font-bold text-base">{fmtC(result.fvA)}</p>
              <p className="text-gray-400">+{fmtC(result.gainA)}</p>
            </div>
            <div className="p-2 bg-blue-900/20 rounded-lg text-center border border-blue-800/30">
              <p className="text-blue-400 font-bold">SIPP</p>
              <p className="text-white font-bold text-base">{fmtC(result.fvB)}</p>
              <p className="text-gray-400">+{fmtC(result.gainB)}</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="ISA Value" value={fmtC(result.fvA)} subValue={`Gain: ${fmtC(result.gainA)}`} highlight={result.aBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="SIPP Value" value={fmtC(result.fvB)} subValue={`Gain: ${fmtC(result.gainB)}`} highlight={!result.aBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Total Invested" value={fmtC(result.invested)} subValue={`${years}yr x £${monthly}/mo`} />
            <ResultCard label="Advantage" value={fmtC(result.diff)} subValue={result.aBetter ? 'ISA wins' : 'SIPP wins'} highlight />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">ISA vs SIPP - Wealth Growth Over {years} Years</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gOptA_isa-vs-sipp-uk-calculator" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gOptB_isa-vs-sipp-uk-calculator" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={v => v >= 1000000 ? '£' + (v/1000000).toFixed(1) + 'M' : '£' + (v/1000).toFixed(0) + 'K'} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, n) => [fmt(v), n]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="invested" name="Contributed" stroke="#94a3b8" fill="none" strokeDasharray="4 2" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="optB" name="SIPP" stroke="#3b82f6" fill="url(#gOptB_isa-vs-sipp-uk-calculator)" strokeWidth={2} />
                  <Area type="monotone" dataKey="optA" name="ISA" stroke="#10b981" fill="url(#gOptA_isa-vs-sipp-uk-calculator)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-by-Year Comparison</h3>
            <div className="overflow-y-auto max-h-52">
              <table className="calc-table">
                <thead><tr><th>Year</th><th>Invested</th><th>ISA</th><th>SIPP</th><th>Advantage</th></tr></thead>
                <tbody>
                  {result.yearlyData.filter((_, i) => i % 2 === 0 || i === result.yearlyData.length - 1).map(r => (
                    <tr key={r.year}>
                      <td className="text-gray-500">{r.year}</td>
                      <td>{fmtC(r.invested)}</td>
                      <td className="text-green-400 font-semibold">{fmtC(r.optA)}</td>
                      <td className="text-blue-400">{fmtC(r.optB)}</td>
                      <td className={r.optA > r.optB ? 'text-green-400 font-bold' : 'text-red-400'}>{r.optA > r.optB ? '+' : ''}{fmtC(r.optA - r.optB)}</td>
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
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Isa vs Sipp Uk: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Isa?</h3>
              <p>Isa is a India investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Sipp Uk?</h3>
              <p>Sipp Uk takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Isa and Sipp Uk is how returns are generated and taxed. Isa typically suits growth-oriented investors while Sipp Uk may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Isa and Sipp Uk based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "UK Income Tax Calculator", href: "/calculators/finance/uk-income-tax-calculator", icon: "🇬🇧", desc: "Free calculator" },          { name: "UK Pension Calculator", href: "/calculators/finance/uk-pension-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "ISA Calculator", href: "/calculators/finance/isa-calculator", icon: "💰", desc: "Free calculator" },          { name: "UK Stamp Duty Calculator", href: "/calculators/finance/uk-stamp-duty-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Buy To Let vs Stocks Calculator", href: "/calculators/finance/uk-buy-to-let-vs-stocks-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Help To Buy vs LISA Calculator", href: "/calculators/finance/uk-help-to-buy-vs-lisa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Lifetime ISA vs SIPp Calculator", href: "/calculators/finance/uk-lifetime-isa-vs-sipp-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Premium Bonds vs Cash ISA Calculator", href: "/calculators/finance/uk-premium-bonds-vs-cash-isa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Pension vs ISA Calculator", href: "/calculators/finance/uk-pension-vs-isa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Fixed Rate vs Tracker Mortgage Calculator", href: "/calculators/finance/uk-fixed-rate-vs-tracker-mortgage-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Stocks vs Bonds Calculator", href: "/calculators/finance/uk-stocks-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Pension Drawdown vs Annuity Calculator", href: "/calculators/finance/uk-pension-drawdown-vs-annuity-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          ISA Vs SIPP UK Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this ISA Vs SIPP UK USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          ISA vs SIPP UK Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, as a 40% taxpayer contributing GBP 15,000/year, your ISA vs SIPP UK calculator 2026 shows the after-tax retirement wealth from each account based on your expected retirement tax rate.
        </p>
      </Card>

            <SEOContent
        title="ISA vs SIPP UK Calculator – ISA or Pension – Which Builds More After-Tax Wealth in 2026?"
        category="finance"
        intro={`For UK investors choosing between maximizing an ISA and a SIPP (Self-Invested Personal Pension), the decision is about when you want tax relief and when you want flexibility. Both are extraordinarily tax-efficient — but they operate differently.

SIPP contributions attract upfront tax relief: a £10,000 SIPP contribution costs a basic-rate taxpayer only £8,000 (the government adds £2,000 as 20% tax relief). A higher-rate taxpayer claiming 40% relief effectively pays £6,000 for a £10,000 SIPP contribution. This immediate return is unmatched in any other savings vehicle. The trade-off: SIPP funds are locked until age 55 (rising to 57 in 2028), and 75% of withdrawals are taxed as income.

ISA contributions come from post-tax income — no upfront relief. But ISA withdrawals are completely tax-free, and there are no age restrictions. For people who want flexibility for financial independence, early retirement, or non-retirement goals, the ISA's unrestricted access is valuable beyond the pure tax calculation.`}
        howItWorks={`SIPP after-tax return: For a £10,000 gross contribution with 40% tax relief, effective net cost = £6,000. If this grows to £40,000 by retirement, and withdrawal is taxed at 20% (basic rate): £40,000 × 80% = £32,000 after tax. True return on £6,000 invested = 433% — vs the 567% if no withdrawal tax applied.

ISA after-tax return: £10,000 post-tax contribution (no relief). Same £40,000 growth = £40,000 withdrawable tax-free. Return on £10,000 invested = 300%.

Break-even analysis: SIPP wins when: relief rate at contribution is significantly higher than effective withdrawal rate. ISA wins when: you need flexible access before 55, you expect similar contribution and withdrawal tax rates, or tax-free status on the full withdrawal is more valuable than the upfront relief.`}
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
        tipsSection={`Maximize SIPP first if you're a higher or additional rate taxpayer — the 40-45% tax relief is genuinely transformative. For basic-rate taxpayers, the decision between ISA and SIPP is closer, and the flexibility of ISA withdrawal at any age often tips the balance toward ISA for younger investors.

The 25% tax-free lump sum from a pension (lifetime allowance considerations aside) is valuable but not fully comparable to ISA tax-free status — 75% of pension withdrawals are still taxable. Plan the sequence of pension and ISA withdrawals in retirement to manage your tax band efficiently.

For employer-matched pension contributions: always contribute enough to your workplace pension to capture the full employer match before considering ISA vs SIPP tradeoffs. Employer match is an immediate 50-100% return that overwhelms any structural advantage of either vehicle.`}
        conclusion={`The optimal UK retirement savings strategy for most people combines both: contribute to workplace pension to capture employer match, make additional SIPP contributions to claim higher-rate relief on earned income above basic rate, and invest remaining savings in Stocks & Shares ISA for flexible access and tax-free growth.

For FIRE (Financial Independence Retire Early) aspirants in the UK, ISA is often the primary vehicle because SIPP access restrictions conflict with early retirement plans. Some UK FIRE investors use 'ISA first' strategy with the understanding that SIPP access at 57 provides additional pension income later.`}

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
