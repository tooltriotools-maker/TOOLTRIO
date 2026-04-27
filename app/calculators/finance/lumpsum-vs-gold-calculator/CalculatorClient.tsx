'use client'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { TrendingUp } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, fmtCompact } = useCurrency()
  const [lumpsum, setLumpsum] = useState(500000)
  const [mfRate, setMfRate] = useState(12)
  const [goldRate, setGoldRate] = useState(8)
  const [years, setYears] = useState(10)
  const [goldType, setGoldType] = useState<'sgb' | 'etf' | 'physical'>('sgb')

  const result = useMemo(() => {
    const sgbBonus = goldType === 'sgb' ? 2.5 : 0
    const makingChargeHit = goldType === 'physical' ? 0.88 : 1
    const effectiveGoldRate = goldRate + sgbBonus

    const mfFV = lumpsum * Math.pow(1 + mfRate / 100, years)
    const goldFV = lumpsum * Math.pow(1 + effectiveGoldRate / 100, years) * makingChargeHit

    const mfGain = mfFV - lumpsum
    const goldGain = goldFV - lumpsum

    // Tax: MF equity LTCG 10% above 1L; SGB maturity tax-free; Gold ETF/physical 20% with indexation
    const mfTax = Math.max(0, mfGain - 100000) * 0.10
    const goldTax = goldType === 'sgb' ? 0 : Math.max(0, goldGain - lumpsum * (Math.pow(1.05, years) - 1)) * 0.20
    const mfPostTax = mfFV - mfTax
    const goldPostTax = goldFV - goldTax

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1
      const mFV = lumpsum * Math.pow(1 + mfRate / 100, y)
      const gFV = lumpsum * Math.pow(1 + effectiveGoldRate / 100, y) * makingChargeHit
      return { year: y, mf: Math.round(mFV), gold: Math.round(gFV) }
    })

    return {
      mfFV: Math.round(mfFV), mfGain: Math.round(mfGain), mfPostTax: Math.round(mfPostTax), mfTax: Math.round(mfTax),
      goldFV: Math.round(goldFV), goldGain: Math.round(goldGain), goldPostTax: Math.round(goldPostTax), goldTax: Math.round(goldTax),
      effectiveGoldRate: effectiveGoldRate.toFixed(1),
      mfBetter: mfPostTax > goldPostTax,
      difference: Math.round(Math.abs(mfPostTax - goldPostTax)),
      yearlyData,
    }
  }, [lumpsum, mfRate, goldRate, years, goldType])

  return (
    <CalculatorLayout title="Lump Sum vs Gold Calculator India 2026" description="Compare one-time equity mutual fund vs gold investment on returns, tax, and long-term wealth." icon="🥇" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Investment Details
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">Gold Investment Type</p>
              <div className="grid grid-cols-3 gap-1.5">
                {[{ id: 'sgb', label: 'SGB' }, { id: 'etf', label: 'ETF' }, { id: 'physical', label: 'Physical' }].map(t => (
                  <button key={t.id} onClick={() => setGoldType(t.id as any)}
                    className={`py-2 rounded-xl text-xs font-bold border-2 transition-all ${goldType === t.id ? 'bg-yellow-100 border-yellow-400 text-yellow-700' : 'bg-gray-50 border-gray-200 text-gray-500'}`}>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <InputField label="Lumpsum Investment" value={lumpsum} onChange={setLumpsum} min={10000} max={10000000} step={10000} prefix="₹" />
            <InputField label="Mutual Fund Return (p.a.)" value={mfRate} onChange={setMfRate} min={5} max={25} step={0.5} suffix="%" />
            <InputField label="Gold Appreciation (p.a.)" value={goldRate} onChange={setGoldRate} min={3} max={20} step={0.5} suffix="%" />
            <InputField label="Investment Period" value={years} onChange={setYears} min={1} max={30} step={1} suffix="Yrs" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.mfBetter ? 'bg-green-50 border-green-300' : 'bg-yellow-50 border-yellow-300'}`}>
            <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-1">Post-Tax Winner</p>
            <p className="text-xl font-black" style={{ color: result.mfBetter ? '#10b981' : '#d97706' }}>{result.mfBetter ? 'Mutual Fund' : 'Gold'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtCompact(result.difference)}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="MF Post-Tax" value={fmtCompact(result.mfPostTax)} subValue={`Tax: ${fmtCompact(result.mfTax)}`} highlight={result.mfBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Gold Post-Tax" value={fmtCompact(result.goldPostTax)} subValue={`Eff. rate: ${result.effectiveGoldRate}%`} highlight={!result.mfBetter} />
            <ResultCard label="MF Gain" value={fmtCompact(result.mfGain)} subValue="Before LTCG tax" />
            <ResultCard label="Gold Gain" value={fmtCompact(result.goldGain)} subValue={goldType === 'sgb' ? 'Tax-free at maturity' : 'Before tax'} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Lumpsum Growth: Mutual Fund vs Gold</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70}
                    tickFormatter={v => v >= 10000000 ? `₹${(v/10000000).toFixed(1)}Cr` : v >= 100000 ? `₹${(v/100000).toFixed(0)}L` : `₹${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [fmt(v), name]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="gold" name="Gold Value" stroke="#f59e0b" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="mf" name="Mutual Fund" stroke="#10b981" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Year-wise Summary</h3>
            <div className="overflow-y-auto max-h-44">
              <table className="calc-table">
                <thead><tr><th>Year</th><th>MF Value</th><th>Gold Value</th><th>MF Advantage</th></tr></thead>
                <tbody>
                  {result.yearlyData.filter((_, i) => i % 2 === 0 || i === result.yearlyData.length - 1).map(r => (
                    <tr key={r.year}>
                      <td className="text-gray-500">{r.year}</td>
                      <td className="text-green-400 font-semibold">{fmtCompact(r.mf)}</td>
                      <td className="text-yellow-400">{fmtCompact(r.gold)}</td>
                      <td className={r.mf > r.gold ? 'text-green-400 font-bold' : 'text-red-400'}>{r.mf > r.gold ? '+' : ''}{fmtCompact(r.mf - r.gold)}</td>
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
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Lumpsum vs Gold: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Lumpsum?</h3>
              <p>Lumpsum is a USA investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Gold?</h3>
              <p>Gold takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Lumpsum and Gold is how returns are generated and taxed. Lumpsum typically suits growth-oriented investors while Gold may appeal to those prioritizing stability or specific tax advantages.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">Tax Treatment in USA</h3>
              <p>Tax efficiency dramatically affects real returns. Gains from each option may be subject to capital gains (0-20%) or ordinary income tax. Using the calculator above helps you see the true post-tax outcome based on your specific situation and contribution level.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Which Is Better for Retirement Planning?</h3>
              <p>The right choice depends on your time horizon, risk tolerance, and tax bracket. For goals 5+ years away, higher-return options (10-12% historical) generally beat lower-return stable options (4-5%). For goals under 3 years, capital preservation takes priority.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">How to Use This Calculator</h3>
              <p>Enter your monthly contribution, expected return rates for both options, and investment period above. The calculator shows year-by-year growth, total wealth created, and the difference between the two strategies - helping you visualize the long-term impact of your choice.</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
            <h3 className="font-bold text-green-800 mb-2">💡 Expert Tip</h3>
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Lumpsum and Gold based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "SIP Calculator", href: "/calculators/finance/sip-calculator", icon: "📈", desc: "Free calculator" },          { name: "PPF Calculator", href: "/calculators/finance/ppf-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "NPS Calculator", href: "/calculators/finance/nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Fd Calculator", href: "/calculators/finance/fd-calculator", icon: "🏦", desc: "Free calculator" },          { name: "Rd Calculator", href: "/calculators/finance/rd-calculator", icon: "📊", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "Step Up SIP Calculator", href: "/calculators/finance/step-up-sip-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs Fd Calculator", href: "/calculators/finance/sip-vs-fd-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs PPF Calculator", href: "/calculators/finance/sip-vs-ppf-calculator", icon: "📊", desc: "Free calculator" },          { name: "SIP vs NPS Calculator", href: "/calculators/finance/sip-vs-nps-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Calculator", href: "/calculators/finance/mutual-fund-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mutual Fund Return Calculator", href: "/calculators/finance/mutual-fund-return-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Lumpsum Vs Gold Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Lumpsum Vs Gold USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Lump Sum vs Gold Calculator Example (India 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with INR 5 lakh to invest for 20 years, your lump sum vs gold calculator India 2026 shows equity building INR 48.2 lakh vs gold building INR 23.3 lakh — a INR 24.9 lakh difference.
        </p>
      </Card>

            <SEOContent
        title="Lump Sum vs Gold Calculator India – Equity Mutual Fund or Gold: Which Builds More Wealth in 2026?"
        category="finance"
        intro={`Gold versus diversified equity investment is one of those debates where the empirical record is clear but the psychological appeal of gold persists. Over any 30+ year period measured, a diversified equity portfolio has dramatically outperformed gold on a real (inflation-adjusted) basis. The S&P 500 real CAGR since 1971 (when gold was freely tradeable) is approximately 7-8%; gold's real CAGR over the same period is approximately 1-2%.

Gold's value proposition isn't total return — it's crisis protection and currency debasement insurance. When financial systems are under genuine stress (2008, 2020, geopolitical crises), gold tends to hold or increase value when equities fall. As a small portfolio allocation (5-10%), gold can reduce overall portfolio volatility. As a primary investment, it significantly underperforms equities over most long time horizons.

The appeal of gold as an 'inflation hedge' is also more nuanced than commonly believed. Gold has been a poor short-term inflation hedge — it didn't protect against the 1970s inflation particularly consistently, and in 2022, when US inflation peaked at 9%, gold was largely flat while TIPS and I Bonds outperformed. Gold's inflation protection works over very long periods (decades) but is unreliable over any 1-10 year window.`}
        howItWorks={`Gold return calculation: Gold doesn't pay dividends or interest, so total return = price appreciation only. Historical gold price (USD/oz): from $35 in 1971 to approximately $2,300 in 2024 = roughly 5.4% nominal CAGR. Adjusted for US inflation over the same period (~4% annually), real CAGR is approximately 1.3%.

Equity comparison: S&P 500 total return (including dividends reinvested) from 1971-2024: approximately 10.7% nominal CAGR, 6.4% real CAGR. On $100,000 invested in 1971: Gold → approximately $2.3M nominal ($380K real). S&P 500 → approximately $42M nominal ($7M real).

Volatility comparison: Gold's annual price volatility (standard deviation) is approximately 15-20%, similar to equities but without the dividend income or earnings growth that justifies equity volatility. Gold's Sharpe ratio (return per unit of risk) is typically lower than equities over long periods.`}
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
        tipsSection={`A modest gold allocation (5-10% of portfolio) has historically improved portfolio risk-adjusted returns by reducing correlation with equities — particularly during equity bear markets. This diversification benefit is gold's legitimate contribution to portfolio construction, distinct from expecting gold to be your primary return driver.

For exposure to gold in investment portfolios, gold ETFs (GLD, IAU, SGOL) provide liquid, low-cost access without the storage and insurance costs of physical gold. Physical gold makes sense for investors concerned specifically about systemic risk to financial infrastructure — a scenario where physical possession has advantages that ETF claims don't replicate.

Sovereign gold bonds (SGBs) in India offer a unique gold investment structure: government-backed bonds with 2.5% annual interest plus gold price appreciation, with capital gains tax exemption at maturity. For Indian investors seeking gold exposure, SGBs are generally superior to physical gold or gold ETFs on a risk-adjusted basis.`}
        conclusion={`The cultural and psychological attachment to gold — particularly strong in many Asian and Middle Eastern cultures — creates genuine demand that supports prices regardless of return fundamentals. This cultural bid means gold is unlikely to fall to 'fundamental value' (a concept that barely applies to a non-income-producing asset) and will always have demand.

For most investors, the appropriate gold allocation is zero to small: enough to provide some crisis insurance and portfolio diversification, but not enough to significantly dilute the equity-driven long-term returns that actually build wealth. Use [our Real Return Calculator](/calculators/finance/real-return-calculator) to compare gold versus other asset classes on an inflation-adjusted basis.`}

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
