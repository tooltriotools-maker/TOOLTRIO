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
const FMT_PREFIX = '£'
const fmt = (n: number) => FMT_PREFIX + Math.round(n).toLocaleString()
const fmtC = (n: number) => n >= 1000000 ? FMT_PREFIX + (n/1000000).toFixed(2) + 'M' : FMT_PREFIX + (n/1000).toFixed(0) + 'K'

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [monthly, setMonthly] = useState(500)
  const [rateA, setRateA] = useState(8)
  const [rateB, setRateB] = useState(7)
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
    return { fvA: Math.round(fvA), fvB: Math.round(fvB), invested: Math.round(invested), gainA: Math.round(fvA-invested), gainB: Math.round(fvB-invested), aBetter: fvA>fvB, diff: Math.round(Math.abs(fvA-fvB)), yearlyData }
  }, [monthly, rateA, rateB, years])

  return (
    <CalculatorLayout title="UK Help to Buy vs Lifetime ISA Calculator 2026" description="Compare government bonuses for first-time buyers under Help to Buy ISA vs Lifetime ISA." icon="🏡" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Investment Details</h2>
          <div className="space-y-4">
            <InputField label="Monthly Contribution" value={monthly} onChange={setMonthly} min={50} max={10000} step={50} prefix="£" />
            <InputField label="Lifetime ISA Return (p.a.)" value={rateA} onChange={setRateA} min={0.5} max={20} step={0.25} suffix="%" />
            <InputField label="Help to Buy Return (p.a.)" value={rateB} onChange={setRateB} min={0.5} max={20} step={0.25} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yrs" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.aBetter ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Better Investment</p>
            <p className="text-xl font-black" style={{ color: result.aBetter ? '#10b981' : '#3b82f6' }}>{result.aBetter ? 'Lifetime ISA' : 'Help to Buy'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtC(result.diff)} over {years} yrs</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-green-900/20 rounded-lg text-center border border-green-800/30">
              <p className="text-green-400 font-bold">Lifetime ISA</p>
              <p className="text-white font-bold text-base">{fmtC(result.fvA)}</p>
              <p className="text-gray-400">Gain: {fmtC(result.gainA)}</p>
            </div>
            <div className="p-2 bg-blue-900/20 rounded-lg text-center border border-blue-800/30">
              <p className="text-blue-400 font-bold">Help to Buy</p>
              <p className="text-white font-bold text-base">{fmtC(result.fvB)}</p>
              <p className="text-gray-400">Gain: {fmtC(result.gainB)}</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Lifetime ISA" value={fmtC(result.fvA)} subValue={`Gain: ${fmtC(result.gainA)}`} highlight={result.aBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Help to Buy" value={fmtC(result.fvB)} subValue={`Gain: ${fmtC(result.gainB)}`} highlight={!result.aBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Invested" value={fmtC(result.invested)} subValue={`${years}yr x £${monthly}/mo`} />
            <ResultCard label="Advantage" value={fmtC(result.diff)} subValue={result.aBetter ? 'Lifetime ISA wins' : 'Help to Buy wins'} highlight />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Lifetime ISA vs Help to Buy - Wealth Growth Over {years} Years</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gAukhelpto" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gBukhelpto" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={v => v >= 1000000 ? `£${(v/1000000).toFixed(1)}M` : `£${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, n) => [fmt(v), n]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="invested" name="Contributed" stroke="#94a3b8" fill="none" strokeDasharray="4 2" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="optB" name="Help to Buy" stroke="#3b82f6" fill={`url(#gBukhelpto)`} strokeWidth={2} />
                  <Area type="monotone" dataKey="optA" name="Lifetime ISA" stroke="#10b981" fill={`url(#gAukhelpto)`} strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-by-Year Comparison</h3>
            <div className="overflow-y-auto max-h-52">
              <table className="calc-table">
                <thead><tr><th>Year</th><th>Invested</th><th>Lifetime ISA</th><th>Help to Buy</th><th>Advantage</th></tr></thead>
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
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Uk Help To Buy vs Lisa: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Uk Help To Buy?</h3>
              <p>Uk Help To Buy is a UK investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Lisa?</h3>
              <p>Lisa takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Uk Help To Buy and Lisa is how returns are generated and taxed. Uk Help To Buy typically suits growth-oriented investors while Lisa may appeal to those prioritizing stability or specific tax advantages.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">Tax Treatment in UK</h3>
              <p>Tax efficiency dramatically affects real returns. Gains from each option may be subject to CGT (18%/28%) or income tax (20-45%). Using the calculator above helps you see the true post-tax outcome based on your specific situation and contribution level.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Which Is Better for Retirement And Isa Planning?</h3>
              <p>The right choice depends on your time horizon, risk tolerance, and tax bracket. For goals 5+ years away, higher-return options (7-9% historical) generally beat lower-return stable options (4-5%). For goals under 3 years, capital preservation takes priority.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">How to Use This Calculator</h3>
              <p>Enter your monthly contribution, expected return rates for both options, and investment period above. The calculator shows year-by-year growth, total wealth created, and the difference between the two strategies - helping you visualize the long-term impact of your choice.</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">💡 Expert Tip</h3>
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Uk Help To Buy and Lisa based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "UK Income Tax Calculator", href: "/calculators/finance/uk-income-tax-calculator", icon: "🇬🇧", desc: "Free calculator" },          { name: "UK Pension Calculator", href: "/calculators/finance/uk-pension-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "ISA Calculator", href: "/calculators/finance/isa-calculator", icon: "💰", desc: "Free calculator" },          { name: "UK Stamp Duty Calculator", href: "/calculators/finance/uk-stamp-duty-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Buy To Let vs Stocks Calculator", href: "/calculators/finance/uk-buy-to-let-vs-stocks-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Lifetime ISA vs SIPp Calculator", href: "/calculators/finance/uk-lifetime-isa-vs-sipp-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Premium Bonds vs Cash ISA Calculator", href: "/calculators/finance/uk-premium-bonds-vs-cash-isa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Pension vs ISA Calculator", href: "/calculators/finance/uk-pension-vs-isa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Fixed Rate vs Tracker Mortgage Calculator", href: "/calculators/finance/uk-fixed-rate-vs-tracker-mortgage-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Stocks vs Bonds Calculator", href: "/calculators/finance/uk-stocks-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Pension Drawdown vs Annuity Calculator", href: "/calculators/finance/uk-pension-drawdown-vs-annuity-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Remortgage vs Invest Calculator", href: "/calculators/finance/uk-remortgage-vs-invest-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          UK Help To Buy Vs LISA Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this UK Help To Buy Vs LISA USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          UK Help to Buy vs Lifetime ISA Example (2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, saving GBP 300/month toward your first home, your UK Help to Buy vs Lifetime ISA calculator 2026 shows how much government bonus you earn under each scheme and the maximum property price each supports.
        </p>
      </Card>

            <SEOContent
        title="UK Help to Buy vs Lifetime ISA Calculator – Which Account Gets First-Time Buyers on the Ladder Faster?"
        category="finance"
        intro={`The UK government's first-time buyer support landscape shifted significantly when Help to Buy equity loans closed to new applications in March 2023. The Lifetime ISA (LISA) is now the primary government-subsidized first home savings vehicle — offering a 25% bonus on contributions up to £4,000/year, which translates to up to £1,000 free government money annually. For a first-time buyer saving for a deposit over 4-5 years, the LISA bonus can add £4,000-£5,000 to their deposit.

The LISA has specific constraints: you must be 18-39 when you first open the account, you must be a first-time buyer, the property must cost no more than £450,000, and you must use the property as your main home (not buy-to-let). The 25% withdrawal penalty if you access the funds for any other reason effectively means 6.25% of your savings is lost — the bonus minus the withdrawal charge — making it important to be genuinely committed to using LISA funds for the qualifying purchase.

For Scottish buyers, the First Home Fund and other Scottish-specific schemes may also be relevant. The LISA stacks with Help to Buy in the few markets where HTB is still available (Wales has its own scheme; Scotland's is separate).`}
        howItWorks={`LISA bonus calculation: Annual contribution × 25% = government bonus. Maximum contribution: £4,000/year. Maximum bonus: £1,000/year. Over 5 years: £20,000 contributed + £5,000 bonus = £25,000 available for deposit (plus investment growth in S&S LISA).

LISA vs standard S&S ISA: The 25% government bonus makes LISA far superior to a standard ISA for qualifying first-time buyers. £4,000 in LISA becomes £5,000 immediately — a guaranteed 25% return before any investment growth. The same £4,000 in a standard ISA earns no bonus.

Property price ceiling: LISA property limit is £450,000. Properties above this don't qualify, and you'd face the withdrawal penalty. In London and South East, significant portions of the market are above this threshold — check whether your target area has meaningful supply below £450,000 before making LISA your primary vehicle.`}
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
        tipsSection={`Open a LISA as early as possible (from age 18) even with minimal contributions — the account must be open for at least 12 months before using the funds for a property purchase. Opening with £1 a year before your purchase timeline starts the clock.

For the investment element: Stocks and Shares LISA (S&S LISA) offers better expected long-term returns than Cash LISA for deposits you won't need for 3+ years. Providers including AJ Bell, Moneybox, and Hargreaves Lansdown offer S&S LISA options with equity index funds.

Max the LISA before adding to a standard ISA for first home savings. The 25% bonus is a guaranteed return that standard ISA returns can't match. After maxing the £4,000 LISA contribution, additional savings can go to a standard S&S ISA.`}
        conclusion={`The LISA is most valuable when you're committed to buying within your local market at prices below £450,000 and you have 4+ years to accumulate. For buyers targeting markets where the £450,000 ceiling is binding (parts of London, Surrey, Berkshire), a standard ISA may be more appropriate to preserve flexibility.

For buyers close to their purchase timeline who don't have an existing LISA: if you're more than 12 months from purchase, opening a LISA now captures the bonus on whatever you contribute before completing. The time constraint on the 12-month rule makes opening immediately the right default.`}

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
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
    </CalculatorLayout>
  )
}
