'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateStockProfit } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues
  const scale = currency.code === 'INR' ? 1 : 1

  const [buyPrice, setBuyPrice] = useState(150)
  const [sellPrice, setSellPrice] = useState(210)
  const [quantity, setQuantity] = useState(100)
  const [buyBrokerage, setBuyBrokerage] = useState(0)
  const [sellBrokerage, setSellBrokerage] = useState(0)
  const [taxRate, setTaxRate] = useState(15)
  const [holdingType, setHoldingType] = useState<'short' | 'long'>('long')

  const effectiveTax = holdingType === 'short' ? 22 : taxRate

  const result = useMemo(() => calculateStockProfit(buyPrice, sellPrice, quantity, buyBrokerage, sellBrokerage, effectiveTax),
    [buyPrice, sellPrice, quantity, buyBrokerage, sellBrokerage, effectiveTax])

  const isProfit = result.netProfit >= 0
  const pieData = [
    { name: 'Net Profit', value: Math.max(0, result.netProfit), color: '#22c55e' },
    { name: 'Tax', value: Math.max(0, result.taxAmount), color: '#f59e0b' },
    { name: 'Brokerage', value: buyBrokerage + sellBrokerage, color: '#6b7280' },
    { name: 'Principal', value: result.investedAmount, color: '#3b82f6' },
  ].filter(d => d.value > 0)

  const scenarios = [
    { label: 'Current', sell: sellPrice },
    { label: '-20%', sell: buyPrice * 0.8 },
    { label: '-10%', sell: buyPrice * 0.9 },
    { label: '+10%', sell: buyPrice * 1.1 },
    { label: '+25%', sell: buyPrice * 1.25 },
    { label: '+50%', sell: buyPrice * 1.5 },
  ].map(s => {
    const r = calculateStockProfit(buyPrice, s.sell, quantity, buyBrokerage, sellBrokerage, effectiveTax)
    return { label: s.label, profit: r.netProfit, roi: r.roi }
  })

  const InputRow = ({ label, value, onChange, step = 1, prefix = '', suffix = '' }: any) => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
        {prefix && <span className="text-green-600 text-sm">{prefix}</span>}
        <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} step={step}
          className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
        {suffix && <span className="text-gray-500 text-sm">{suffix}</span>}
      </div>
    </div>
  )

  return (
    <CalculatorLayout title="Stock Profit Calculator USA 2026" description={`Calculate stock trade profit, ROI and after-tax returns in ${currency.name}.`} icon="📈" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Trade Details</h2>

          <div className="grid grid-cols-2 gap-3">
            <InputRow label="Buy Price" value={buyPrice} onChange={setBuyPrice} step={0.01} prefix={currency.symbol} />
            <InputRow label="Sell Price" value={sellPrice} onChange={setSellPrice} step={0.01} prefix={currency.symbol} />
          </div>
          <InputRow label="Quantity (Shares)" value={quantity} onChange={setQuantity} step={1} />
          <div className="grid grid-cols-2 gap-3">
            <InputRow label="Buy Brokerage" value={buyBrokerage} onChange={setBuyBrokerage} step={0.01} prefix={currency.symbol} />
            <InputRow label="Sell Brokerage" value={sellBrokerage} onChange={setSellBrokerage} step={0.01} prefix={currency.symbol} />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Holding Period</label>
            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-50 rounded-xl">
              {([['short', 'Short-term'], ['long', 'Long-term']] as const).map(([val, label]) => (
                <button key={val} onClick={() => setHoldingType(val)}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${holdingType === val ? 'bg-green-600 text-white' : 'text-gray-500'}`}>
                  {label}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400">{holdingType === 'short' ? 'Under 1 year -- taxed as ordinary income (~22%)' : 'Over 1 year -- long-term capital gains rate'}</p>
          </div>

          {holdingType === 'long' && (
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">LTCG Tax Rate (%)</label>
              <div className="flex gap-2">
                {[0, 15, 20].map(r => (
                  <button key={r} onClick={() => setTaxRate(r)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all ${taxRate === r ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {r}%
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Invested Amount" value={fmtCompact(result.investedAmount)} />
            <ResultCard label="Sale Amount" value={fmtCompact(result.saleAmount)} />
            <ResultCard label="Net Profit/Loss" value={fmtCompact(result.netProfit)} highlight subValue={`${result.roi >= 0 ? '+' : ''}${result.roi.toFixed(2)}% ROI`} />
            <ResultCard label="Tax Payable" value={fmtCompact(result.taxAmount)} subValue={`${effectiveTax}% rate`} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Return Breakdown</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} innerRadius={45} dataKey="value" paddingAngle={2}>
                      {pieData.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {pieData.map(e => <span key={e.name} className="text-xs flex items-center gap-1"><span className="w-2 h-2 rounded-full" style={{ background: e.color }} />{e.name}</span>)}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Price Scenarios</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scenarios} margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={50} tickFormatter={v => `${currency.symbol}${Math.abs(v) >= 1000 ? (v/1000).toFixed(0)+'k' : v}`} />
                    <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="profit" name="Net Profit" fill="#22c55e" radius={[4, 4, 0, 0]}
                      label={{ position: 'top', fontSize: 9, fill: '#374151', formatter: (v: number) => `${v >= 0 ? '+' : ''}${v.toFixed(0)}` }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Trade Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {[
                { label: 'Buy Price', value: fmt(buyPrice) },
                { label: 'Sell Price', value: fmt(sellPrice) },
                { label: 'Quantity', value: `${quantity} shares` },
                { label: 'Gross Profit', value: fmt(result.grossProfit) },
                { label: 'Tax Amount', value: fmt(result.taxAmount) },
                { label: 'Net Profit', value: fmt(result.netProfit) },
                { label: 'ROI', value: `${result.roi.toFixed(2)}%` },
                { label: 'Tax Rate', value: `${effectiveTax}%` },
                { label: 'Break-even Price', value: fmt(buyPrice + (buyBrokerage + sellBrokerage) / quantity) },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <p className="font-bold text-gray-800">{value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Stock Profit Calculator -- Calculate True Returns After Tax and Brokerage USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How Stock Profit is Calculated</h3>
              <p>Gross profit = (Sell price - Buy price) x Quantity. This sounds simple, but the real return must account for brokerage fees and capital gains tax. In the USA, most major brokers (Fidelity, Schwab, Robinhood) charge zero commission on US stock trades, making brokerage a non-factor for most investors. The key cost is capital gains tax -- which varies dramatically based on how long you held the investment. Short-term gains are taxed at your ordinary income rate (up to 37%), while long-term gains are taxed at 0%, 15%, or 20%.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Tax-Loss Harvesting</h3>
              <p>Tax-loss harvesting means selling losing positions to offset gains elsewhere in your portfolio. If you have $10,000 in gains and $3,000 in losses, you only pay tax on $7,000. Up to $3,000 of excess losses can offset ordinary income annually, with remaining losses carried forward. Wash-sale rule: you cannot buy back the same or substantially identical security within 30 days before or after the sale or the loss is disallowed.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Long-term vs Short-term Holding Strategy</h3>
              <p>The tax difference between short-term and long-term capital gains is enormous. Example: $50,000 gain. Short-term at 24% bracket: $12,000 tax. Long-term at 15%: $7,500 tax. Holding just one day past the one-year mark saves $4,500 in this example. This is why the "buy and hold" strategy is recommended for most individual investors -- it naturally results in long-term capital gains treatment and aligns with the S&amp;P 500 long-run upward trend. Frequent trading is a tax-inefficient strategy for most investors.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Dollar Cost Averaging vs Lump Sum</h3>
              <p>For regular investors, dollar cost averaging (DCA) through automatic 401k or brokerage contributions removes the need to calculate entry prices at all. Each contribution is a separate tax lot with its own cost basis and holding period. Tax software and brokers track this automatically. The break-even price shown in our calculator helps you understand when a trade becomes profitable after all costs -- useful for setting realistic price targets and stop-loss levels.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Stock Profit Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          $500/month invested in the S&P 500 at an average 10% annual return grows to over <strong>$1.1M</strong> in 30 years through the power of compound growth.
        </p>
        <p className="text-sm text-gray-600">
          This Stock Profit USA 2026 calculator helps you model investment scenarios and understand the long-term impact of consistent contributions.
        </p>
      </Card>
      <SEOContent
        title="Stock Profit Calculator USA – What Is Your Real Profit After Fees and Capital Gains Tax in 2026?"
        category="finance"
        intro={`Stock trading profits are simple to calculate but easy to miscalculate when you include fees, currency effects, and tax implications. The gross profit on a trade is (selling price - purchase price) × shares. The net profit after costs is what actually matters — and for frequent traders, transaction fees, bid-ask spreads, and short-term capital gains taxes can consume a surprising fraction of gross gains.

The tax implications of stock trading in the US are straightforward but frequently overlooked until tax season. Shares held less than 12 months generate short-term capital gains, taxed as ordinary income at your marginal rate (potentially 32-37% for high earners). Shares held longer than 12 months generate long-term capital gains taxed at 0%, 15%, or 20% depending on total income. For a 35% bracket investor, the difference between selling after 11 months versus 13 months can save 15-20% in taxes on the gain — often worth waiting for.

For international traders or those dealing in foreign-denominated stocks, currency gains and losses add another calculation layer. US taxpayers must report foreign currency transactions; gains and losses from currency movements on foreign stock holdings are generally treated as ordinary income or loss.`}
        howItWorks={`Profit calculation: Gross profit = (Sale price - Purchase price) × Shares. Net profit = Gross profit - Transaction fees (in + out) - Taxes on gains.

Return on investment: ROI = Net profit / Total cost basis × 100, where total cost basis = purchase price × shares + purchase fees. Annualized ROI = (1 + ROI)^(365/days held) - 1. Annualizing is important for comparing trades of different durations — a 10% gain in 30 days = 214% annualized; in 365 days = 10%.

Break-even calculation: If you paid fees of $20 in and $20 out on 100 shares at $50 purchase price: break-even sale price = ($5,000 + $40) / 100 = $50.40. Below this price, selling locks in a net loss even if the stock price has moved up from $50.`}
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
        tipsSection={`Tax-aware selling: for gains close to the 12-month mark, calculate the net benefit of waiting for LTCG vs. STCG treatment before deciding when to sell. At the 22% bracket, long-term rate is 15% — a 7% tax savings on the gain. For a $10,000 gain, waiting 2 months to cross the 12-month threshold saves $700.

Tax-loss harvesting: if you have other positions with unrealized losses, selling them strategically to offset gains reduces your tax liability. A $5,000 loss harvested against a $10,000 gain means you pay tax on only $5,000 net capital gains. The wash-sale rule (can't buy back substantially identical security within 30 days) applies.

For frequent trading: track your cost basis method consistently. FIFO (first-in, first-out) is the IRS default; specific identification allows you to choose which lots to sell to maximize tax efficiency. Once you select specific identification, maintain it consistently.`}
        conclusion={`Short-term trading generates ordinary income tax rates and produces inconsistent returns for most retail investors who compete with institutional algorithms, professional traders, and insider-adjacent information flows. Academic research consistently shows that most retail day traders lose money net of taxes and fees over periods of 2+ years.

For building long-term wealth, the stock profit calculator is most valuable for understanding the tax implications of portfolio rebalancing decisions (when to sell appreciated positions), not for supporting active trading strategies. Use alongside [our CAGR Calculator](/calculators/finance/cagr-calculator) to evaluate portfolio returns on a properly annualized, after-cost basis.`}

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
            { name: "Dividend Calculator", href: "/calculators/finance/dividend-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Pe Ratio Calculator", href: "/calculators/finance/pe-ratio-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial planning" },
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
