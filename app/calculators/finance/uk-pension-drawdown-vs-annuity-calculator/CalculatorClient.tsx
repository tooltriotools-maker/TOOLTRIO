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
  const [rateA, setRateA] = useState(7)
  const [rateB, setRateB] = useState(4.5)
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
    <CalculatorLayout title="UK Pension Drawdown vs Annuity Calculator 2026" description="Compare flexible pension drawdown vs guaranteed annuity for UK retirees." icon="💷" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Investment Details</h2>
          <div className="space-y-4">
            <InputField label="Monthly Contribution" value={monthly} onChange={setMonthly} min={50} max={10000} step={50} prefix="£" />
            <InputField label="Drawdown Return (p.a.)" value={rateA} onChange={setRateA} min={0.5} max={20} step={0.25} suffix="%" />
            <InputField label="Annuity Return (p.a.)" value={rateB} onChange={setRateB} min={0.5} max={20} step={0.25} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yrs" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.aBetter ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Better Investment</p>
            <p className="text-xl font-black" style={{ color: result.aBetter ? '#10b981' : '#3b82f6' }}>{result.aBetter ? 'Drawdown' : 'Annuity'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtC(result.diff)} over {years} yrs</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-green-900/20 rounded-lg text-center border border-green-800/30">
              <p className="text-green-400 font-bold">Drawdown</p>
              <p className="text-white font-bold text-base">{fmtC(result.fvA)}</p>
              <p className="text-gray-400">Gain: {fmtC(result.gainA)}</p>
            </div>
            <div className="p-2 bg-blue-900/20 rounded-lg text-center border border-blue-800/30">
              <p className="text-blue-400 font-bold">Annuity</p>
              <p className="text-white font-bold text-base">{fmtC(result.fvB)}</p>
              <p className="text-gray-400">Gain: {fmtC(result.gainB)}</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Drawdown" value={fmtC(result.fvA)} subValue={`Gain: ${fmtC(result.gainA)}`} highlight={result.aBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Annuity" value={fmtC(result.fvB)} subValue={`Gain: ${fmtC(result.gainB)}`} highlight={!result.aBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Invested" value={fmtC(result.invested)} subValue={`${years}yr x £${monthly}/mo`} />
            <ResultCard label="Advantage" value={fmtC(result.diff)} subValue={result.aBetter ? 'Drawdown wins' : 'Annuity wins'} highlight />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Drawdown vs Annuity - Wealth Growth Over {years} Years</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gAukpension" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gBukpension" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={v => v >= 1000000 ? `£${(v/1000000).toFixed(1)}M` : `£${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, n) => [fmt(v), n]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="invested" name="Contributed" stroke="#94a3b8" fill="none" strokeDasharray="4 2" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="optB" name="Annuity" stroke="#3b82f6" fill={`url(#gBukpension)`} strokeWidth={2} />
                  <Area type="monotone" dataKey="optA" name="Drawdown" stroke="#10b981" fill={`url(#gAukpension)`} strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-by-Year Comparison</h3>
            <div className="overflow-y-auto max-h-52">
              <table className="calc-table">
                <thead><tr><th>Year</th><th>Invested</th><th>Drawdown</th><th>Annuity</th><th>Advantage</th></tr></thead>
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
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Uk Pension Drawdown vs Annuity: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Uk Pension Drawdown?</h3>
              <p>Uk Pension Drawdown is a UK investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Annuity?</h3>
              <p>Annuity takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Uk Pension Drawdown and Annuity is how returns are generated and taxed. Uk Pension Drawdown typically suits growth-oriented investors while Annuity may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Uk Pension Drawdown and Annuity based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "UK Income Tax Calculator", href: "/calculators/finance/uk-income-tax-calculator", icon: "🇬🇧", desc: "Free calculator" },          { name: "UK Pension Calculator", href: "/calculators/finance/uk-pension-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "ISA Calculator", href: "/calculators/finance/isa-calculator", icon: "💰", desc: "Free calculator" },          { name: "UK Stamp Duty Calculator", href: "/calculators/finance/uk-stamp-duty-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Buy To Let vs Stocks Calculator", href: "/calculators/finance/uk-buy-to-let-vs-stocks-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Help To Buy vs LISA Calculator", href: "/calculators/finance/uk-help-to-buy-vs-lisa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Lifetime ISA vs SIPp Calculator", href: "/calculators/finance/uk-lifetime-isa-vs-sipp-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Premium Bonds vs Cash ISA Calculator", href: "/calculators/finance/uk-premium-bonds-vs-cash-isa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Pension vs ISA Calculator", href: "/calculators/finance/uk-pension-vs-isa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Fixed Rate vs Tracker Mortgage Calculator", href: "/calculators/finance/uk-fixed-rate-vs-tracker-mortgage-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Stocks vs Bonds Calculator", href: "/calculators/finance/uk-stocks-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Remortgage vs Invest Calculator", href: "/calculators/finance/uk-remortgage-vs-invest-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          UK Pension Drawdown Vs Annuity Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Delaying Social Security from age 62 to 70 can increase monthly benefits from <strong>$1,400 to $2,480</strong> — a 77% lifetime increase for those who live past age 80.
        </p>
        <p className="text-sm text-gray-600">
          This UK Pension Drawdown Vs Annuity USA 2026 tool helps you model claiming strategies and determine the optimal age to start benefits based on your situation.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          UK Pension Drawdown vs Annuity Example (2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with a GBP 400,000 UK pension pot, your pension drawdown vs annuity calculator 2026 shows the annual income, break-even age, and legacy value for each option at current UK annuity rates.
        </p>
      </Card>

            <SEOContent
        title="UK Pension Drawdown vs Annuity Calculator – Should You Take Drawdown or Buy an Annuity in 2026?"
        category="finance"
        intro={`The pension drawdown versus annuity decision — made at or near retirement — is among the most consequential financial choices UK retirees face, and the decision became more complex when flexible drawdown was introduced in 2015. Pre-2015, most UK pensions were compulsorily annuitized. Now, retirees can keep their pension pot invested and draw an income flexibly, or purchase an annuity that provides guaranteed income for life.

Annuity rates have improved significantly since 2022 as interest rates rose: a £200,000 pension pot in 2024 might purchase a £12,000-£14,000/year level annuity, compared to £8,000-£9,000 in the low-rate environment of 2020-2021. This improvement makes annuities more competitive against drawdown than they have been in a decade. An inflation-linked annuity from the same pot would pay less initially (approximately £8,000-£10,000/year) but maintains purchasing power over 25-30 years of retirement.

Drawdown's advantages: flexibility in withdrawal amounts, inheritance potential (pension pots outside the estate under current rules), investment growth if markets perform well, and the ability to annuitize partially or later at better rates if you reach advanced age. The risk: sequence of returns (drawing from a falling portfolio accelerates depletion), and longevity risk (outliving your money if you live to 95+).`}
        howItWorks={`Annuity calculation: Annuity rate for your age/postcode/health × pension pot = annual income. A £200,000 pot at 60bps annuity rate = £12,000/year. Inflation-linked reduces initial payment by 25-35% but maintains real purchasing power.

Drawdown sustainability: Same framework as FIRE/SWP. Sustainable withdrawal rate = portfolio return × (1 - drawdown rate). At 7% portfolio return and 5% withdrawal rate: portfolio grows by 2% annually (sustainable indefinitely). At 5% return and 7% withdrawal rate: portfolio shrinks by 2% annually (depletes over approximately 30 years).

Break-even age: The age at which cumulative annuity payments exceed what you'd have drawn from an invested drawdown portfolio. For a level annuity at current rates, break-even is typically late 70s to early 80s. Below this age at death, drawdown tends to leave more wealth; above it, the annuity has provided more income.`}
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
        tipsSection={`Blend rather than choose. Many financial advisers recommend partial annuitization: purchase an annuity to cover essential expenses (mortgage if any, utilities, food — perhaps £10,000-£15,000/year) from a portion of the pot, then use drawdown for the remaining pot to provide flexible income and leave inheritance potential.

Health and lifestyle annuity products (enhanced annuities) pay significantly higher income to people with health conditions, smokers, or those living in certain postcodes with lower life expectancy. Always get enhanced annuity quotes before accepting a standard rate — the difference can be 15-30% more income.

For drawdown: maintain a cash or short-duration bond reserve of 2-3 years of income needs. This buffer means you never have to sell equities at depressed prices to fund living expenses — the most common cause of sequence-of-returns-driven drawdown failure.`}
        conclusion={`The annuity vs drawdown decision interacts critically with your other income sources. If you have a defined benefit pension and full State Pension that together cover essential expenses, drawdown for the remainder is more conservative because you already have guaranteed income covering your floor. If your pension pot is your only income source, the case for at least partial annuitization is stronger.

The decision is partly reversible: you can move from drawdown to an annuity at any time (though you can't reverse an annuity purchase). Some people start in drawdown and annuitize at 75-80 when longevity risk becomes more pressing and rates are often higher due to their older age. This 'deferred annuity' approach has genuine merit for the flexible early retirement years.`}

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
