'use client'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { TrendingUp, BarChart2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: any[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }
const fmt = (n: number) => '$' + Math.round(n).toLocaleString()
const fmtC = (n: number) => n >= 1000000 ? `$${(n/1000000).toFixed(2)}M` : `$${(n/1000).toFixed(0)}K`

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [lumpsum, setLumpsum] = useState(50000)
  const [monthly, setMonthly] = useState(500)
  const [grossReturn, setGrossReturn] = useState(10)
  const [indexExpense, setIndexExpense] = useState(0.04)
  const [etfExpense, setEtfExpense] = useState(0.03)
  const [indexTaxDrag, setIndexTaxDrag] = useState(0.3)
  const [etfTaxDrag, setEtfTaxDrag] = useState(0.1)
  const [years, setYears] = useState(30)

  const result = useMemo(() => {
    const months = years * 12
    const indexNet = grossReturn - indexExpense - indexTaxDrag
    const etfNet = grossReturn - etfExpense - etfTaxDrag
    const iMR = indexNet / 100 / 12
    const eMR = etfNet / 100 / 12

    const iLump = lumpsum * Math.pow(1 + indexNet / 100, years)
    const eLump = lumpsum * Math.pow(1 + etfNet / 100, years)
    const iMonthly = monthly * ((Math.pow(1 + iMR, months) - 1) / iMR) * (1 + iMR)
    const eMonthly = monthly * ((Math.pow(1 + eMR, months) - 1) / eMR) * (1 + eMR)

    const indexFV = iLump + iMonthly
    const etfFV = eLump + eMonthly
    const invested = lumpsum + monthly * months

    const yearlyData = Array.from({ length: years }, (_, i) => {
      const y = i + 1; const m = y * 12
      const iF = lumpsum * Math.pow(1 + indexNet / 100, y) + monthly * ((Math.pow(1 + iMR, m) - 1) / iMR) * (1 + iMR)
      const eF = lumpsum * Math.pow(1 + etfNet / 100, y) + monthly * ((Math.pow(1 + eMR, m) - 1) / eMR) * (1 + eMR)
      return { year: y, index: Math.round(iF), etf: Math.round(eF), invested: Math.round(lumpsum + monthly * m) }
    })

    return { indexFV: Math.round(indexFV), etfFV: Math.round(etfFV), invested: Math.round(invested), indexNet: indexNet.toFixed(2), etfNet: etfNet.toFixed(2), etfBetter: etfFV > indexFV, difference: Math.round(Math.abs(etfFV - indexFV)), yearlyData }
  }, [lumpsum, monthly, grossReturn, indexExpense, etfExpense, indexTaxDrag, etfTaxDrag, years])

  return (
    <CalculatorLayout title="Index Fund vs ETF Calculator USA 2026" description="Compare index mutual funds vs ETFs on expense ratio, tax drag, and long-term total cost." icon="📈" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Details</h2>
          <div className="space-y-4">
            <InputField label="Initial Investment" value={lumpsum} onChange={setLumpsum} min={0} max={1000000} step={5000} prefix="$" />
            <InputField label="Monthly DCA" value={monthly} onChange={setMonthly} min={0} max={10000} step={100} prefix="$" />
            <InputField label="Gross Market Return" value={grossReturn} onChange={setGrossReturn} min={5} max={15} step={0.5} suffix="%" />
            <InputField label="Index Fund Expense" value={indexExpense} onChange={setIndexExpense} min={0.01} max={1} step={0.01} suffix="%" />
            <InputField label="ETF Expense Ratio" value={etfExpense} onChange={setEtfExpense} min={0.01} max={1} step={0.01} suffix="%" />
            <InputField label="Index Tax Drag" value={indexTaxDrag} onChange={setIndexTaxDrag} min={0} max={1} step={0.05} suffix="%" />
            <InputField label="ETF Tax Drag" value={etfTaxDrag} onChange={setEtfTaxDrag} min={0} max={0.5} step={0.05} suffix="%" />
            <InputField label="Years" value={years} onChange={setYears} min={5} max={40} step={5} suffix="Yrs" />
          </div>
          <div className={`mt-4 p-3 rounded-xl border-2 text-center ${result.etfBetter ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'}`}>
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">More Tax-Efficient</p>
            <p className="text-xl font-black" style={{ color: result.etfBetter ? '#10b981' : '#3b82f6' }}>{result.etfBetter ? 'ETF' : 'Index Fund'} 🏆</p>
            <p className="text-sm text-gray-500">by {fmtC(result.difference)}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="ETF Final Value" value={fmtC(result.etfFV)} subValue={`Net ${result.etfNet}%`} highlight={result.etfBetter} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Index Fund Value" value={fmtC(result.indexFV)} subValue={`Net ${result.indexNet}%`} highlight={!result.etfBetter} icon={<BarChart2 className="w-4 h-4" />} />
            <ResultCard label="Total Invested" value={fmtC(result.invested)} subValue={`${years}yr period`} />
            <ResultCard label="Cost Difference" value={fmtC(result.difference)} subValue="Over investment life" highlight />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Index Fund vs ETF Wealth Over {years} Years</h3>
            <div style={{ height: 250 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={result.yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={72} tickFormatter={v => v >= 1000000 ? `$${(v/1000000).toFixed(1)}M` : `$${(v/1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, n) => [fmt(v), n]} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="invested" name="Invested" stroke="#94a3b8" strokeDasharray="4 2" strokeWidth={1.5} dot={false} />
                  <Line type="monotone" dataKey="index" name="Index Fund" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="etf" name="ETF" stroke="#10b981" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-3">
            <Card>
              <h3 className="text-sm font-semibold text-blue-400 mb-2">📊 Index Mutual Fund</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>- Auto-invest via payroll or bank</li><li>- Easy fractional share investing</li>
                <li>- Automatic DRIP reinvestment</li><li>- May have capital gains distributions</li>
                <li className="text-blue-300 font-semibold">Examples: VFIAX (0.04%), FXAIX (0.015%)</li>
              </ul>
            </Card>
            <Card>
              <h3 className="text-sm font-semibold text-green-400 mb-2">📈 ETF</h3>
              <ul className="text-xs text-gray-400 space-y-1">
                <li>- Superior tax efficiency (in-kind)</li><li>- Trade intraday at market price</li>
                <li>- Often lowest expense ratios</li><li>- May need fractional share broker</li>
                <li className="text-green-300 font-semibold">Examples: VOO (0.03%), IVV (0.03%)</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Index Fund vs Etf: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Index Fund?</h3>
              <p>Index Fund is a USA investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Etf?</h3>
              <p>Etf takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Index Fund and Etf is how returns are generated and taxed. Index Fund typically suits growth-oriented investors while Etf may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Index Fund and Etf based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Index Fund Vs ETF Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Index Fund Vs ETF USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Index Fund vs ETF Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with $250,000 in a US index fund vs ETF, your index fund vs ETF calculator USA 2026 shows the 20-year total cost difference and which option is better for your investing style.
        </p>
      </Card>

            <SEOContent
        title="Index Fund vs ETF Calculator USA – Which Has Lower Costs and Better Returns Over Time in 2026?"
        category="finance"
        intro={`Index funds and ETFs are often described as essentially the same thing — both track market indexes passively and offer low-cost market exposure — but important structural differences affect which is more appropriate for specific situations. Understanding those differences lets you choose intelligently rather than defaulting to whichever a brokerage happens to market.

Both track the same underlying indexes (Vanguard's VOO ETF and VFIAX index fund both track the S&P 500), and both have very low expense ratios at major providers. The primary differences are: ETFs trade intraday at market prices (useful for some investors, dangerous for others), while index funds trade once per day at NAV; ETFs are more flexible for tax-loss harvesting; and index funds have no bid-ask spread or brokerage commissions at most platforms.

For long-term buy-and-hold investors using major brokerages, the practical difference is minimal. Both VOO and VFIAX have expense ratios of 0.03% and track the same S&P 500 index identically. The choice between them matters primarily for tax-loss harvesting flexibility, account type (401ks use mutual funds; most IRAs can use either), and whether you want to invest exact dollar amounts (easier with index fund minimum $3,000 purchases vs ETF fractional share availability).`}
        howItWorks={`Expense ratio impact: Return difference = expense ratio differential × investment amount × years compounded. VOO at 0.03% vs a comparable fund at 0.40%: on $100,000 over 30 years at 7% gross return, the 0.37% expense differential compounds to approximately $40,000 in lost returns. Always compare expense ratios.

ETF bid-ask spread: When buying or selling ETFs intraday, you pay a small spread between the bid (selling price) and ask (buying price). For highly liquid ETFs like SPY, IVV, or VOO, spreads are fractions of a cent per share — negligible. For less liquid ETFs (small-cap international, niche factor ETFs), spreads can be 0.1-0.5%, which matters for frequent traders.

Tax efficiency comparison: ETFs have a structural tax advantage over traditional mutual funds (not index funds) through in-kind creation/redemption, which avoids capital gains distributions. Index mutual funds (especially those that don't trade frequently) are already highly tax-efficient — the ETF advantage over index mutual funds is smaller than versus actively managed funds.`}
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
        tipsSection={`For taxable brokerage accounts, ETFs are slightly more tax-efficient than index funds at most brokerages due to the in-kind creation mechanism. For tax-advantaged accounts (401k, IRA), this distinction is irrelevant — choose whichever has the lower expense ratio and best execution in your specific account.

Automatic investment schedules work better with mutual funds than ETFs at most platforms. With index funds, you can invest a specific dollar amount (say $500/month) automatically. With ETFs, you invest in whole shares (though fractional shares at Fidelity, Schwab, and some others have closed this gap substantially).

Tax-loss harvesting works best with ETFs: sell VOO (S&P 500 ETF) to harvest a loss, immediately buy IVV (also tracks S&P 500) to maintain market exposure without triggering the wash-sale rule — you avoid realizing a loss that would otherwise be disallowed.`}
        conclusion={`The index fund vs ETF decision has become increasingly less important as major brokerages have eliminated commissions, introduced fractional shares, and aligned expense ratios between ETF and index fund versions of the same strategy. The most important decision is to use passive, low-cost index products at all — whether ETF or fund format is secondary.

The S&P 500 has beaten approximately 85-90% of actively managed large-cap US equity funds over any 15-year period, after fees. This is the fundamental argument for index investing, and it applies equally to ETF and index fund versions. Use [our Mutual Fund Calculator](/calculators/finance/mutual-fund-calculator) to model the long-term impact of expense ratio differences.`}

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
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "401k vs Roth IRA Calculator", href: "/calculators/finance/401k-vs-roth-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Taxable Account Calculator", href: "/calculators/finance/401k-vs-taxable-account-calculator", icon: "📊", desc: "Free calculator" },          { name: "401k vs Pension Calculator", href: "/calculators/finance/401k-vs-pension-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs Traditional IRA Calculator", href: "/calculators/finance/roth-ira-vs-traditional-ira-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs 401k Employer Match Calculator", href: "/calculators/finance/roth-ira-vs-401k-employer-match-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA vs HSA Calculator", href: "/calculators/finance/roth-ira-vs-hsa-calculator", icon: "📊", desc: "Free calculator" },          { name: "HSA vs FSA Calculator", href: "/calculators/finance/hsa-vs-fsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "Sep IRA vs Solo 401k Calculator", href: "/calculators/finance/sep-ira-vs-solo-401k-calculator", icon: "💼", desc: "Free calculator" },          { name: "Bonds vs Cds USA Calculator", href: "/calculators/finance/bonds-vs-cds-usa-calculator", icon: "📋", desc: "Free calculator" },          { name: "Cd vs HYSA Calculator", href: "/calculators/finance/cd-vs-hysa-calculator", icon: "💰", desc: "Free calculator" },          { name: "I Bonds vs Tips Calculator", href: "/calculators/finance/i-bonds-vs-tips-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "S&P500 vs Bonds Calculator", href: "/calculators/finance/sp500-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
