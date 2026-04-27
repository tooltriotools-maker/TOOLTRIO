'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'
import { calculatePERatio } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()

  const [stockPrice, setStockPrice] = useState(150)
  const [eps, setEps] = useState(6)
  const [growthRate, setGrowthRate] = useState(12)
  const [years, setYears] = useState(5)

  const result = useMemo(() => calculatePERatio(stockPrice, eps, growthRate, years), [stockPrice, eps, growthRate, years])

  const valuationColor = result.valuation === 'Undervalued' ? 'text-green-600' : result.valuation === 'Fair Value' ? 'text-blue-600' : result.valuation === 'Overvalued' ? 'text-orange-600' : 'text-red-600'
  const valuationBg = result.valuation === 'Undervalued' ? 'bg-green-50 border-green-200' : result.valuation === 'Fair Value' ? 'bg-blue-50 border-blue-200' : result.valuation === 'Overvalued' ? 'bg-orange-50 border-orange-200' : 'bg-red-50 border-red-200'

  return (
    <CalculatorLayout title="P/E Ratio Calculator USA 2026" description="Calculate Price-to-Earnings ratio, PEG ratio, and estimated fair value for any stock." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <Card className="lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Stock Details</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Stock Price</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                <input type="number" value={stockPrice} onChange={e => setStockPrice(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" /></div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">EPS (Earnings Per Share)</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                <input type="number" step="0.01" value={eps} onChange={e => setEps(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent" /></div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Expected Annual EPS Growth: <span className="text-green-600">{growthRate}%</span></label>
              <input type="range" min="1" max="50" value={growthRate} onChange={e => setGrowthRate(Number(e.target.value))} className="w-full accent-green-600" />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1%</span><span>50%</span></div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Projection Years: <span className="text-green-600">{years} yrs</span></label>
              <input type="range" min="1" max="10" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full accent-green-600" />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1</span><span>10</span></div>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* Valuation verdict */}
          <div className={`rounded-2xl border p-5 ${valuationBg}`}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm text-gray-500 font-medium">Valuation</p>
                <p className={`text-2xl font-black ${valuationColor}`}>{result.valuation}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Fair Value Estimate</p>
                <p className="text-2xl font-black text-gray-900">${result.fairValueDCF}</p>
                <p className={`text-sm font-bold ${result.upside >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {result.upside >= 0 ? '+' : ''}{result.upside.toFixed(1)}% vs current price
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="P/E Ratio" value={result.peRatio.toString() + 'x'} subValue="Price / EPS" />
            <ResultCard label="PEG Ratio" value={result.pegRatio.toFixed(2) + 'x'} subValue={result.pegRatio < 1 ? 'Undervalued' : result.pegRatio < 2 ? 'Fair' : 'Rich'} highlight={result.pegRatio < 1} />
            <ResultCard label="Current Price" value={'$' + stockPrice} subValue="Market price" />
            <ResultCard label="Fair Value" value={'$' + result.fairValueDCF} subValue="DCF estimate" />
          </div>

          {/* EPS & Price Projection chart */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-4">EPS &amp; Projected Price Growth</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={result.projectedPrices}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tickFormatter={v => `Y${v}`} tick={{ fontSize: 11 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 11 }} tickFormatter={v => `$${v}`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} tickFormatter={v => `$${v}`} />
                <Tooltip formatter={(v: number, n: string) => [`$${v}`, n === 'projectedPrice' ? 'Projected Price' : 'Projected EPS']} />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="projectedPrice" stroke="#16a34a" strokeWidth={2} name="Projected Price" dot={false} />
                <Line yAxisId="right" type="monotone" dataKey="projectedEPS" stroke="#3b82f6" strokeWidth={2} name="Projected EPS" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* P/E context */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">P/E Benchmark Guide</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[{ range: '< 10x', label: 'Deep Value', color: 'bg-green-100 text-green-800' }, { range: '10-20x', label: 'Reasonable', color: 'bg-blue-100 text-blue-800' }, { range: '20-35x', label: 'Growth Premium', color: 'bg-yellow-100 text-yellow-800' }, { range: '> 35x', label: 'Highly Speculative', color: 'bg-red-100 text-red-800' }].map(b => (
                <div key={b.range} className={`rounded-xl px-3 py-2 text-center ${b.color} ${result.peRatio >= parseFloat(b.range) ? 'ring-2 ring-offset-1' : ''}`}>
                  <p className="font-black text-sm">{b.range}</p>
                  <p className="text-xs mt-0.5">{b.label}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Pe Ratio Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Pe Ratio USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          P/E Ratio Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, analyzing a $200 stock with $8 EPS and 20% expected growth, your P/E ratio calculator USA 2026 shows a P/E of 25x and PEG of 1.25 — giving you the context to compare against peers.
        </p>
      </Card>

            <SEOContent
        title="P/E Ratio Calculator USA – Is Any Stock Overvalued or Undervalued in 2026?"
        category="finance"
        intro={`The price-to-earnings ratio is the most commonly cited stock valuation metric, and also the most frequently misused. A P/E of 25 means you're paying $25 for every $1 of the company's annual earnings. Whether that's cheap or expensive depends on: how fast those earnings are growing, how confident you are in the earnings estimate, what interest rates are doing, and what comparable companies trade at.

The cyclically adjusted P/E ratio (CAPE or Shiller P/E), which averages 10 years of inflation-adjusted earnings, filters out single-year earnings noise and provides a better long-term valuation signal. As of 2024-2026, the S&P 500's CAPE was approximately 35 — significantly above its historical average of 17, though below the peak of 44 reached in 2000. High CAPE ratios have historically been associated with below-average subsequent 10-year returns.

P/E ratio analysis works best for mature, profitable companies with relatively stable earnings. It's nearly meaningless for early-stage companies with no earnings, cyclical companies at earnings trough or peak (where reported earnings misrepresent normal profitability), and financial companies where earnings have different capital-intensity implications.`}
        howItWorks={`Basic P/E: Stock price / Earnings per share (EPS). Trailing P/E uses last 12 months of actual earnings. Forward P/E uses analyst consensus estimates of next 12 months earnings. Forward P/E is typically lower than trailing P/E for growing companies (because expected earnings are higher than current).

PEG ratio: P/E / expected earnings growth rate (%). A P/E of 25 with 20% expected EPS growth = PEG of 1.25. PEG below 1 is traditionally considered undervalued relative to growth; above 2 is potentially overvalued. Useful for comparing companies with very different growth rates.

EV/EBITDA comparison: Enterprise Value / EBITDA is less affected by capital structure and accounting choices than P/E. More relevant for capital-intensive businesses or leveraged companies where interest expense significantly affects net income.`}
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
        tipsSection={`Always use P/E in the context of the company's growth rate. A 35 P/E for a company growing earnings at 30% annually (PEG of 1.17) may be more attractive than a 15 P/E for a company growing at 3% (PEG of 5). P/E in isolation is nearly meaningless without growth context.

Compare P/E against the company's own history, not just current market average. A company that has historically traded at 25-30x earnings trading at 20x may be discounted; a company that has historically traded at 12-15x trading at 25x may be expensive regardless of absolute level.

Earnings quality matters as much as earnings level. Earnings driven by accounting choices (aggressive revenue recognition, deferred expenses, share buybacks) are less reliable than earnings from actual cash generation. Free cash flow yield (FCF/market cap) is often more meaningful than P/E for evaluating valuation.`}
        conclusion={`P/E ratios for the broad market provide useful long-term return context. Research by John Hussman, GMO, and others consistently shows that starting P/E (or CAPE) is a strong predictor of subsequent 10-year real returns: high starting valuations predict lower returns, low starting valuations predict higher returns. This doesn't tell you anything about 1-year performance but is meaningful for decade-scale expectations.

For individual stock analysis, P/E is a starting point that requires significant additional analysis to reach investment conclusions. Use [our CAGR Calculator](/calculators/finance/cagr-calculator) alongside earnings growth history to contextualize P/E multiples against growth trajectories.`}

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
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📉", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "XIRR Calculator", href: "/calculators/finance/xirr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Currency Converter Calculator", href: "/calculators/finance/currency-converter", icon: "💱", desc: "Free calculator" },          { name: "Currency Profit Calculator", href: "/calculators/finance/currency-profit-calculator", icon: "📊", desc: "Free calculator" },          { name: "Tip Calculator", href: "/calculators/finance/tip-calculator", icon: "💵", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Crypto Profit Calculator", href: "/calculators/finance/crypto-profit-calculator", icon: "₿", desc: "Free calculator" },          { name: "Stock Profit Calculator", href: "/calculators/finance/stock-profit-calculator", icon: "💹", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
