'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts'
import { calculateDividendIncome } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const PRESETS = [
  { name: 'S&amp;P 500 (VOO)', yield: 1.4, price: 485, growth: 6 },
  { name: 'Dividend Aristocrats', yield: 2.5, price: 80, growth: 7 },
  { name: 'High Yield ETF (SCHD)', yield: 3.8, price: 78, growth: 8 },
  { name: 'REITs (VNQ)', yield: 4.5, price: 90, growth: 4 },
  { name: 'Custom', yield: 3.0, price: 50, growth: 5 },
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [investmentAmount, setInvestmentAmount] = useState(50000)
  const [dividendYield, setDividendYield] = useState(3.8)
  const [sharePrice, setSharePrice] = useState(78)
  const [growthRate, setGrowthRate] = useState(8)
  const [years, setYears] = useState(20)
  const [reinvest, setReinvest] = useState(true)
  const [preset, setPreset] = useState(2)

  const result = useMemo(() => calculateDividendIncome(investmentAmount, dividendYield, sharePrice, growthRate, years, reinvest),
    [investmentAmount, dividendYield, sharePrice, growthRate, years, reinvest])

  const resultNoDRIP = useMemo(() => calculateDividendIncome(investmentAmount, dividendYield, sharePrice, growthRate, years, false),
    [investmentAmount, dividendYield, sharePrice, growthRate, years])

  const fmt = (v: number) => `$${Math.round(v).toLocaleString()}`
  const fmtK = (v: number) => v >= 1000000 ? `$${(v / 1000000).toFixed(2)}M` : `$${(v / 1000).toFixed(0)}k`

  const handlePreset = (i: number) => {
    setPreset(i)
    setDividendYield(PRESETS[i].yield)
    setSharePrice(PRESETS[i].price)
    setGrowthRate(PRESETS[i].growth)
  }

  return (
    <CalculatorLayout title="Dividend Income Calculator USA 2026" description="Calculate annual dividend income, yield on cost growth, and DRIP compounding projections." icon="💰" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Investment Setup</h2>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Quick Presets</label>
            <div className="space-y-1">
              {PRESETS.map((p, i) => (
                <button key={p.name} onClick={() => handlePreset(i)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex justify-between ${preset === i ? 'bg-green-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
                  <span className="font-medium">{p.name}</span>
                  <span>{p.yield}% yield</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Investment Amount</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={investmentAmount} onChange={e => setInvestmentAmount(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Dividend Yield %', value: dividendYield, set: setDividendYield, step: 0.1, suffix: '%' },
              { label: 'Share Price', value: sharePrice, set: setSharePrice, step: 1, prefix: '$' },
              { label: 'Annual Growth %', value: growthRate, set: setGrowthRate, step: 0.5, suffix: '%' },
              { label: 'Years', value: years, set: setYears, step: 5, suffix: 'yr' },
            ].map(({ label, value, set, step, suffix, prefix }: any) => (
              <div key={label} className="space-y-1">
                <label className="text-xs font-medium text-gray-600">{label}</label>
                <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                  {prefix && <span className="text-green-600 text-xs">{prefix}</span>}
                  <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
                  {suffix && <span className="text-gray-400 text-xs">{suffix}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Dividend Strategy</label>
            <div className="grid grid-cols-2 gap-2">
              {[true, false].map(r => (
                <button key={String(r)} onClick={() => setReinvest(r)}
                  className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${reinvest === r ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {r ? '🔄 DRIP (Reinvest)' : '💵 Take as Cash'}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">Year 1 Annual Income</p>
            <p className="text-xl font-black text-green-700">{fmt(investmentAmount * dividendYield / 100)}</p>
            <p className="text-xs text-green-600">{fmt(Math.round(investmentAmount * dividendYield / 100 / 12))}/month</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Portfolio Value" value={fmtK(result.finalPortfolioValue)} highlight />
            <ResultCard label="Monthly Income" value={fmt(result.monthlyIncome)} subValue="at end of period" />
            <ResultCard label="Total Dividends" value={fmtK(result.totalDividends)} subValue={`${years}yr cumulative`} />
            <ResultCard label="Forward Yield" value={`${result.forwardYield}%`} subValue="on cost basis" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Portfolio Growth: DRIP vs Cash Dividends</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
                  data={result.yearData.map((y, i) => ({
                    ...y,
                    noDRIP: resultNoDRIP.yearData[i]?.portfolioValue ?? 0,
                  }))}>
                  <defs>
                    <linearGradient id="dripGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="noDripGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Year', position: 'insideBottomRight', fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={65} tickFormatter={v => `$${v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : (v / 1000).toFixed(0) + 'k'}`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => fmtK(v)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="portfolioValue" name="With DRIP" stroke="#22c55e" strokeWidth={2.5} fill="url(#dripGrad)" />
                  <Area type="monotone" dataKey="noDRIP" name="Cash Dividends" stroke="#3b82f6" strokeWidth={1.5} fill="url(#noDripGrad)" strokeDasharray="4 2" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Annual Dividend Income Over Time</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.yearData.filter((_, i) => i % Math.max(1, Math.floor(years / 8)) === 0)} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Year', position: 'insideBottomRight', fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={55} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                  <Bar dataKey="annualIncome" name="Annual Dividends" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Dividend Income Calculator - Build Passive Income with Dividend Investing USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">DRIP: The Power of Dividend Reinvestment</h3>
              <p>DRIP (Dividend Reinvestment Plan) automatically buys more shares with each dividend payment instead of receiving cash. This creates exponential compounding: more shares earn more dividends, which buy more shares, accelerating growth over decades. Example: $50,000 in SCHD (3.8% yield, 8% growth): after 20 years without DRIP: $285,000 portfolio plus $85,000 in cash dividends received. With DRIP: $425,000 portfolio - $140,000 more! The compounding effect grows larger each year. All major US brokers offer free DRIP with fractional share reinvestment.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Building a Dividend Portfolio for Retirement</h3>
              <p>A dividend portfolio producing $4,000-5,000/month in income requires approximately $1.2-1.5M invested at a 4% blended yield. Building this portfolio takes decades of consistent investment and DRIP. The strategy: invest in dividend growth stocks and ETFs during accumulation years, reinvesting all dividends. Switch to cash dividends in retirement for income. The Dividend Aristocrats ETF (NOBL) and SCHD are popular diversified dividend options that balance yield with dividend growth consistency.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Qualified vs Non-Qualified Dividends</h3>
              <p>Qualified dividends from US stocks held 61+ days are taxed at favorable rates: 0% (income under $47,025 single), 15% (most middle-income taxpayers), 20% (high earners). Non-qualified dividends (REITs, some foreign stocks, ETFs with bonds) are taxed as ordinary income up to 37%. Strategy: hold REITs and bond funds in tax-advantaged accounts (IRA, 401k) where dividend taxation does not apply. Hold qualified dividend stocks in taxable accounts for the favorable 15% rate. In a Roth IRA, all dividends are completely tax-free.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Dividend Yield Traps to Avoid</h3>
              <p>A high dividend yield (8%+) often signals danger rather than opportunity. Companies that cannot sustain their dividend cut it - and stock prices typically fall 20-40% on announcement. Warning signs: payout ratio above 80% (dividend exceeds 80% of earnings), declining earnings, heavy debt load, cyclical industry in downturn. Focus on dividend growth rate and payout ratio sustainability over current yield. A 2% yield growing at 10% annually doubles to 4% yield on cost basis in 7 years through the rule of 72.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Dividend Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          $500/month invested in the S&P 500 at an average 10% annual return grows to over <strong>$1.1M</strong> in 30 years through the power of compound growth.
        </p>
        <p className="text-sm text-gray-600">
          This Dividend USA 2026 calculator helps you model investment scenarios and understand the long-term impact of consistent contributions.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Dividend Income Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with $150,000 in dividend stocks at 4% yield, your dividend income calculator USA 2026 shows $6,000/year today growing to $10,700/year in 10 years at 6% dividend growth rate.
        </p>
      </Card>

            <SEOContent
        title="Dividend Income Calculator USA – How Much Passive Income Will Your Dividend Portfolio Generate?"
        category="finance"
        intro={`Dividend income is one of the most psychologically satisfying forms of investment return — money arriving in your account without selling anything. For long-term investors, dividends can represent 40-50% of total equity returns when reinvested over decades, according to historical analysis of S&P 500 returns. The compounding effect of reinvested dividends over long periods is one of the most powerful wealth-building mechanisms available.

High dividend yield sounds attractive, but yield alone is a poor selection criterion. A 10% yield is meaningless (or actually dangerous) if the company cuts the dividend — as many high-yielders do. Dividend growth rate is often more important than current yield: a company currently yielding 2% that grows its dividend 10% annually yields an effective 5.2% on your original investment after 10 years.

Dividend investors need to think in terms of total return — dividends plus price appreciation. A portfolio optimized exclusively for current yield often sacrifices growth, resulting in lower total wealth over long periods than a diversified index approach that captures both dividends and capital appreciation.`}
        howItWorks={`Dividend yield: Annual dividend per share ÷ current share price × 100. A $100 stock paying $2.50/year in dividends yields 2.5%.

Projected annual income: Shares owned × annual dividend per share = annual income. With DRIP (Dividend Reinvestment Plan): reinvested dividends buy additional shares each quarter, which pay additional dividends — creating a compound growth effect on the income stream itself.

Dividend growth projection: If you invest $50,000 yielding 3% with 5% annual dividend growth, year 1 income = $1,500. Year 10 income = $1,500 × (1.05)^9 = $2,329. Year 20 income = $3,793. The income stream nearly doubles every 14 years at 5% growth without adding new capital.`}
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
        tipsSection={`Look at dividend coverage ratio (earnings per share ÷ dividend per share) before investing in any dividend stock. Coverage below 1.5x means the company is paying out most of its earnings as dividends, leaving little margin for error if earnings decline. Sustainable dividends typically have coverage ratios of 2x or higher.

Payout consistency matters. Companies that have paid and grown dividends for 25+ consecutive years (Dividend Aristocrats) have demonstrated the discipline and financial durability to maintain dividends through recessions. Newer or inconsistent dividend payers carry more dividend-cut risk.

Tax efficiency: Qualified dividends are taxed at the lower long-term capital gains rate (0-23.8%). Non-qualified dividends are taxed as ordinary income. Most US large-cap stock dividends are qualified; REITs, most international stocks, and some other instruments pay non-qualified dividends. Understand the tax treatment of your specific holdings.`}
        conclusion={`For retirees or near-retirees building income portfolios, dividend-focused investing can provide psychological comfort and practical cash flow — you don't need to sell shares to pay bills. The 'spend only dividends, don't touch principal' strategy has intuitive appeal even if it's not always mathematically optimal.

For long-term wealth builders with 20+ year horizons, broad index fund investing with dividend reinvestment typically outperforms dividend-focused strategies on total return basis, partly because dividend-focused portfolios tend to be sector-concentrated (financials, utilities, consumer staples) and miss high-growth sectors that reinvest rather than pay dividends. Balance your income needs against total return objectives.`}

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
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📉", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "XIRR Calculator", href: "/calculators/finance/xirr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Currency Converter Calculator", href: "/calculators/finance/currency-converter", icon: "💱", desc: "Free calculator" },          { name: "Currency Profit Calculator", href: "/calculators/finance/currency-profit-calculator", icon: "📊", desc: "Free calculator" },          { name: "Tip Calculator", href: "/calculators/finance/tip-calculator", icon: "💵", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "P/E Ratio Calculator", href: "/calculators/finance/pe-ratio-calculator", icon: "📊", desc: "Free calculator" },          { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Crypto Profit Calculator", href: "/calculators/finance/crypto-profit-calculator", icon: "₿", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
