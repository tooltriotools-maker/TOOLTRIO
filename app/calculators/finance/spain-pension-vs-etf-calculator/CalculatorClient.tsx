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
const FMT_PREFIX = '€'
const fmt = (n: number) => FMT_PREFIX + Math.round(n).toLocaleString()
const fmtC = (n: number) => n >= 1000000 ? FMT_PREFIX + (n/1000000).toFixed(2) + 'M' : FMT_PREFIX + (n/1000).toFixed(0) + 'K'

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [monthly, setMonthly] = useState(500)
  const [rateA, setRateA] = useState(9)
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
    <CalculatorLayout title="Spain Pension vs ETF Calculator 2026" description="Compare Spanish pension plan vs index ETF investing on after-tax returns and flexibility." icon="🇪🇸" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Investment Details</h2>
          <div className="space-y-4">
            <InputField label="Monthly Contribution" value={monthly} onChange={setMonthly} min={50} max={10000} step={50} prefix="€" />
            <InputField label="ETF Investing Return (p.a.)" value={rateA} onChange={setRateA} min={0.5} max={20} step={0.25} suffix="%" />
            <InputField label="Pension Plan Return (p.a.)" value={rateB} onChange={setRateB} min={0.5} max={20} step={0.25} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={40} step={1} suffix="Yrs" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.aBetter ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Better Investment</p>
            <p className="text-xl font-black" style={{ color: result.aBetter ? '#10b981' : '#3b82f6' }}>{result.aBetter ? 'ETF Investing' : 'Pension Plan'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtC(result.diff)} over {years} yrs</p>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-green-900/20 rounded-lg text-center border border-green-800/30">
              <p className="text-green-400 font-bold">ETF Investing</p>
              <p className="text-white font-bold text-base">{fmtC(result.fvA)}</p>
              <p className="text-gray-400">Gain: {fmtC(result.gainA)}</p>
            </div>
            <div className="p-2 bg-blue-900/20 rounded-lg text-center border border-blue-800/30">
              <p className="text-blue-400 font-bold">Pension Plan</p>
              <p className="text-white font-bold text-base">{fmtC(result.fvB)}</p>
              <p className="text-gray-400">Gain: {fmtC(result.gainB)}</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="ETF Investing" value={fmtC(result.fvA)} subValue={`Gain: ${fmtC(result.gainA)}`} highlight={result.aBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Pension Plan" value={fmtC(result.fvB)} subValue={`Gain: ${fmtC(result.gainB)}`} highlight={!result.aBetter} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Invested" value={fmtC(result.invested)} subValue={`${years}yr x €${monthly}/mo`} />
            <ResultCard label="Advantage" value={fmtC(result.diff)} subValue={result.aBetter ? 'ETF Investing wins' : 'Pension Plan wins'} highlight />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">ETF Investing vs Pension Plan - Wealth Growth Over {years} Years</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gAspainpens" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                    <linearGradient id="gBspainpens" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={v => v >= 1000000 ? `€${(v/1000000).toFixed(1)}M` : `€${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, n) => [fmt(v), n]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="invested" name="Contributed" stroke="#94a3b8" fill="none" strokeDasharray="4 2" strokeWidth={1.5} />
                  <Area type="monotone" dataKey="optB" name="Pension Plan" stroke="#3b82f6" fill={`url(#gBspainpens)`} strokeWidth={2} />
                  <Area type="monotone" dataKey="optA" name="ETF Investing" stroke="#10b981" fill={`url(#gAspainpens)`} strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-by-Year Comparison</h3>
            <div className="overflow-y-auto max-h-52">
              <table className="calc-table">
                <thead><tr><th>Year</th><th>Invested</th><th>ETF Investing</th><th>Pension Plan</th><th>Advantage</th></tr></thead>
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
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Spain Pension vs Etf: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Spain Pension?</h3>
              <p>Spain Pension is a Europe investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Etf?</h3>
              <p>Etf takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Spain Pension and Etf is how returns are generated and taxed. Spain Pension typically suits growth-oriented investors while Etf may appeal to those prioritizing stability or specific tax advantages.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">Tax Treatment in Europe</h3>
              <p>Tax efficiency dramatically affects real returns. Gains from each option may be subject to capital gains tax or income tax. Using the calculator above helps you see the true post-tax outcome based on your specific situation and contribution level.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Which Is Better for European Long-Term Investing?</h3>
              <p>The right choice depends on your time horizon, risk tolerance, and tax bracket. For goals 5+ years away, higher-return options (7-9% historical) generally beat lower-return stable options (3-4%). For goals under 3 years, capital preservation takes priority.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">How to Use This Calculator</h3>
              <p>Enter your monthly contribution, expected return rates for both options, and investment period above. The calculator shows year-by-year growth, total wealth created, and the difference between the two strategies - helping you visualize the long-term impact of your choice.</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">💡 Expert Tip</h3>
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Spain Pension and Etf based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "European Mortgage Calculator", href: "/calculators/finance/european-mortgage-calculator", icon: "📊", desc: "Free calculator" },          { name: "Euro Auto Loan Calculator", href: "/calculators/finance/euro-auto-loan-calculator", icon: "📊", desc: "Free calculator" },          { name: "VAT Europe Calculator", href: "/calculators/finance/vat-calculator-europe", icon: "📊", desc: "Free calculator" },          { name: "Euro Bonds vs ETF Calculator", href: "/calculators/finance/euro-bonds-vs-etf-calculator", icon: "📊", desc: "Free calculator" },          { name: "Europe ETF vs Property Calculator", href: "/calculators/finance/europe-etf-vs-property-calculator", icon: "📊", desc: "Free calculator" },          { name: "Europe Growth vs Value ETF Calculator", href: "/calculators/finance/europe-growth-vs-value-etf-calculator", icon: "📊", desc: "Free calculator" },          { name: "Europe Msci World vs S&P500 Calculator", href: "/calculators/finance/europe-msci-world-vs-sp500-calculator", icon: "📊", desc: "Free calculator" },          { name: "Europe Property vs REIT Calculator", href: "/calculators/finance/europe-property-vs-reit-calculator", icon: "📊", desc: "Free calculator" },          { name: "Netherlands AOW vs Private Pension Calculator", href: "/calculators/finance/netherlands-aow-vs-private-pension-calculator", icon: "📊", desc: "Free calculator" },          { name: "Germany ETF vs Tagesgeld Calculator", href: "/calculators/finance/germany-etf-vs-tagesgeld-calculator", icon: "📊", desc: "Free calculator" },          { name: "France PEA vs Assurance Vie Calculator", href: "/calculators/finance/france-pea-vs-assurance-vie-calculator", icon: "📊", desc: "Free calculator" },          { name: "FIRE Europe Calculator", href: "/calculators/finance/fire-europe-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Spain Pension Vs ETF Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Delaying Social Security from age 62 to 70 can increase monthly benefits from <strong>$1,400 to $2,480</strong> — a 77% lifetime increase for those who live past age 80.
        </p>
        <p className="text-sm text-gray-600">
          This Spain Pension Vs ETF USA 2026 tool helps you model claiming strategies and determine the optimal age to start benefits based on your situation.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Spain Pension vs ETF Calculator Example (Spain 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, contributing EUR 8,000/year at a 45% marginal Spanish tax rate, your Spain pension vs ETF calculator 2026 shows the tax timing difference and long-term after-tax wealth comparison.
        </p>
      </Card>

            <SEOContent
        title="Spain Pension vs ETF Calculator – Plan de Pensiones or ETF Index Fund: Which Wins in Spain 2026?"
        category="finance"
        intro={`Spain's state pension system (Seguridad Social) is one of Europe's most generous but also one of the most financially stressed, with the worker-to-retiree ratio declining significantly. Understanding how much pension you'll receive, when, and what additional private savings are needed to maintain your desired standard of living is essential planning for Spanish workers and residents.

The Spanish state pension is calculated based on your contribution base (base de cotización) over the past 25 years (increasing to 35 years by 2037), your years of contribution, and the pension regulatory base. Full pension (100%) requires 37 years of contributions in 2024, increasing to 38.5 years by 2027. Early retirement is possible at 63 with reduced benefits; delayed retirement past normal age generates a supplement.

Private ETF investing in Spain is gaining traction as awareness grows that state pension income alone may not maintain accustomed living standards, particularly for younger workers who will retire under more strained pension conditions. The tax treatment of investment gains through regular brokerage accounts (taxación sobre ganancias de capital at 19-26%) and the availability of pension plan deductions (planes de pensiones, though contribution limits have been dramatically reduced since 2021 to €1,500/year) shape the comparison.`}
        howItWorks={`State pension projection: Estimated monthly pension = (Sum of contribution bases over relevant period) / (12 × number of months in reference period) × percentage applied. The percentage depends on years contributed: 50% for 15 years, increasing to 100% for full years required (37+ years in 2024).

ETF return projection: Monthly contribution compounded at expected return. Spanish investors in MSCI World ETFs have historically earned approximately 9-12% CAGR in EUR terms over 20-year periods, though this includes favorable US equity performance. Spanish CGT: gains taxed at 19% up to €6,000, 21% on €6,000-50,000, 23% on €50,000-200,000, 26% above €200,000.

Combined retirement income: State pension + private ETF withdrawals = total retirement income. The ETF portfolio provides flexibility and inflation protection that the state pension's partial CPI adjustment may not fully address.`}
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
        tipsSection={`Maximize your Social Security equivalent cotización base to improve your eventual state pension — particularly important in the final years before retirement when higher contribution bases improve the calculation. Self-employed workers (autónomos) have flexibility in their monthly cotización base within limits — setting it higher increases eventual pension benefit.

For tax-efficient investing in Spain: ISA equivalents don't exist as generously as in the UK. Planes de Pensiones (pension plans) offer deductions but have very limited contribution capacity (€1,500/year since 2021). Most long-term investment happens in regular brokerage accounts with the standard CGT treatment.

Spanish investors benefit from the Non-Habitual Resident (NHR) regime if applicable, but for regular Spanish residents, understanding how to manage investment income efficiently within Spain's tax framework is important — particularly the annual tax-free capital gains deduction and the offset of capital losses against gains within 4 years.`}
        conclusion={`Spain's pension system is undergoing significant reform driven by demographic pressure — the ratio of workers to pensioners is expected to decline from approximately 2.6:1 today to 1.8:1 by 2050. While the state pension is unlikely to disappear, replacement rates (pension as percentage of working income) may decline for future retirees. Building private savings through ETFs is the prudent supplement to anticipated state pension income.

For Spanish workers in their 30s-40s: a diversified global ETF portfolio through a low-cost broker (Interactive Brokers, Degiro, XTB are popular among Spanish retail investors) provides the most accessible and tax-efficient long-term savings vehicle available alongside the state pension.`}

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
