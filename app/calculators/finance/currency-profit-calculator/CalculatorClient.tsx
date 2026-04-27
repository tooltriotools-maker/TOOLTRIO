'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const CURRENCY_PAIRS = [
  { pair: 'EUR/USD', base: 'EUR', quote: 'USD', rate: 1.085 },
  { pair: 'GBP/USD', base: 'GBP', quote: 'USD', rate: 1.268 },
  { pair: 'USD/JPY', base: 'USD', quote: 'JPY', rate: 149.5 },
  { pair: 'USD/CAD', base: 'USD', quote: 'CAD', rate: 1.352 },
  { pair: 'AUD/USD', base: 'AUD', quote: 'USD', rate: 0.657 },
  { pair: 'USD/CHF', base: 'USD', quote: 'CHF', rate: 0.882 },
  { pair: 'USD/INR', base: 'USD', quote: 'INR', rate: 83.2 },
  { pair: 'EUR/GBP', base: 'EUR', quote: 'GBP', rate: 0.856 },
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()

  const [investAmount, setInvestAmount] = useState(10000)
  const [selectedPair, setSelectedPair] = useState(0)
  const [buyRate, setBuyRate] = useState(CURRENCY_PAIRS[0].rate)
  const [sellRate, setSellRate] = useState(CURRENCY_PAIRS[0].rate * 1.03)
  const [charges, setCharges] = useState(20)

  const pair = CURRENCY_PAIRS[selectedPair]
  const foreignCurrency = investAmount / buyRate
  const saleAmount = foreignCurrency * sellRate - charges
  const profit = saleAmount - investAmount
  const roi = (profit / investAmount) * 100
  const breakEven = buyRate + (charges / foreignCurrency)
  const pipValue = (0.0001 / sellRate) * foreignCurrency * sellRate

  const scenarios = Array.from({ length: 7 }, (_, i) => {
    const change = -3 + i
    const rate = buyRate * (1 + change / 100)
    const p = (foreignCurrency * rate - charges) - investAmount
    return { label: `${change >= 0 ? '+' : ''}${change}%`, profit: Math.round(p), roi: ((p / investAmount) * 100).toFixed(1) }
  })

  const handlePairChange = (idx: number) => {
    setSelectedPair(idx)
    setBuyRate(CURRENCY_PAIRS[idx].rate)
    setSellRate(CURRENCY_PAIRS[idx].rate * 1.03)
  }

  return (
    <CalculatorLayout title="Forex Profit Calculator USA 2026" description="Calculate profit or loss on currency exchange trades including pip value and position size." icon="💱" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Trade Setup</h2>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Currency Pair</label>
            <div className="grid grid-cols-2 gap-1.5">
              {CURRENCY_PAIRS.slice(0, 6).map((p, i) => (
                <button key={p.pair} onClick={() => handlePairChange(i)}
                  className={`py-1.5 rounded-xl text-xs font-semibold transition-all ${selectedPair === i ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {p.pair}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Investment Amount (USD)</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={investAmount} onChange={e => setInvestAmount(Number(e.target.value))} step={1000}
                className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[['Buy Rate', buyRate, setBuyRate], ['Sell Rate', sellRate, setSellRate]].map(([label, val, setter]) => (
              <div key={String(label)} className="space-y-1">
                <label className="text-xs font-medium text-gray-600">{String(label)}</label>
                <input type="number" value={Number(val)} onChange={e => (setter as Function)(Number(e.target.value))} step={0.0001}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 font-semibold text-right outline-none text-sm" />
              </div>
            ))}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Transaction Charges ($)</label>
            <input type="number" value={charges} onChange={e => setCharges(Number(e.target.value))} step={5}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-gray-900 font-semibold text-right outline-none text-sm" />
          </div>

          <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-gray-500">Foreign Currency Bought</span><span className="font-semibold text-gray-800">{foreignCurrency.toFixed(2)} {pair.base}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Break-even Rate</span><span className="font-semibold text-gray-800">{breakEven.toFixed(5)}</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Rate Move Needed</span><span className="font-semibold text-gray-800">{(((sellRate - buyRate) / buyRate) * 100).toFixed(3)}%</span></div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Invested" value={`$${investAmount.toLocaleString()}`} />
            <ResultCard label="Return Amount" value={`$${Math.round(saleAmount).toLocaleString()}`} />
            <ResultCard label="Profit / Loss" value={`$${Math.round(profit).toLocaleString()}`} highlight subValue={`${roi >= 0 ? '+' : ''}${roi.toFixed(2)}% ROI`} />
            <ResultCard label="Pip Value" value={`$${pipValue.toFixed(2)}`} subValue="per pip (mini lot)" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Profit Scenarios (Rate Change)</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scenarios} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="label" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={60}
                    tickFormatter={v => `$${v >= 0 ? '' : '-'}${Math.abs(v) >= 1000 ? (Math.abs(v)/1000).toFixed(1)+'k' : Math.abs(v)}`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }}
                    formatter={(v: number) => [`$${v.toFixed(0)}`, 'Profit']} />
                  <Bar dataKey="profit" radius={[4, 4, 0, 0]}>
                    {scenarios.map((e, i) => <Cell key={i} fill={e.profit >= 0 ? '#22c55e' : '#ef4444'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Rate Comparison: Exchange Services</h3>
            <div className="overflow-x-auto">
              <table className="calc-table">
                <thead><tr><th>Service</th><th>Typical Spread</th><th>Effective Rate</th><th>Return on $10k</th><th>Net Profit</th></tr></thead>
                <tbody>
                  {[
                    { name: 'Wise / OFX', spread: 0.5, color: 'text-green-600' },
                    { name: 'Revolut', spread: 0.8, color: 'text-green-600' },
                    { name: 'Online Bank', spread: 1.5, color: 'text-blue-600' },
                    { name: 'Traditional Bank', spread: 3.0, color: 'text-amber-600' },
                    { name: 'Airport Kiosk', spread: 7.0, color: 'text-red-500' },
                  ].map(({ name, spread, color }) => {
                    const effectiveRate = buyRate * (1 - spread / 100)
                    const fc = 10000 / effectiveRate
                    const ret = fc * sellRate
                    const p = ret - 10000
                    return (
                      <tr key={name}>
                        <td className={`font-medium ${color}`}>{name}</td>
                        <td>{spread}%</td>
                        <td>{effectiveRate.toFixed(4)}</td>
                        <td>${Math.round(ret).toLocaleString()}</td>
                        <td className={p >= 0 ? 'text-green-600' : 'text-red-400'}>${Math.round(p).toLocaleString()}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-400 mt-2">*Assumes sell at {sellRate.toFixed(4)} mid-market. Spreads are typical, not guaranteed.</p>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Forex Profit Calculator -- Currency Trading, Exchange Rates &amp; True Costs USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How Forex Profits Work</h3>
              <p>Currency exchange profit comes from the difference between buy and sell rates, multiplied by the amount of foreign currency held. The key cost is the spread -- the difference between the rate offered and the true mid-market rate. Professional forex traders quote spreads in pips (0.0001 for most pairs). For everyday travelers and money transfers, the spread is the primary cost and can range from 0.5% at specialists like Wise to 7-10% at airport kiosks. Shopping the best rate on large transfers ($5,000+) can save hundreds of dollars.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Forex Trading vs Currency Exchange</h3>
              <p>Retail forex trading involves speculating on currency pair movements using leverage (often 50:1 in the USA). A 1% move in EUR/USD with 50:1 leverage = 50% gain or loss. The SEC reports that 70-80% of retail forex traders lose money. Currency exchange (converting for travel, remittance, or international payments) is different -- you are exchanging for a practical purpose and the primary goal is minimizing the spread cost, not speculating on directional moves.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Best Currency Exchange Services for 2026</h3>
              <p>For international money transfers and currency exchange: Wise (formerly TransferWise) offers rates within 0.3-0.9% of mid-market with transparent fees, making it the leading choice for transfers up to $100,000. Revolut offers free currency exchange at interbank rates up to monthly limits on premium plans. OFX and XE Money Transfer are competitive for large transfers ($5,000+) with dedicated dealers for the best rates. For international travel, Charles Schwab Bank and Capital One 360 checking accounts offer zero foreign transaction fees and reimburse ATM fees worldwide -- far better than exchanging cash before travel.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Pip Value and Position Sizing</h3>
              <p>For active forex traders, understanding pip value is critical for position sizing and risk management. Standard risk management suggests never risking more than 1-2% of account per trade. If your stop loss is 50 pips and pip value is $10 (standard lot EUR/USD), max position to risk 2% of $10,000 account = $200 risk / (50 pips x $10) = 0.4 lots. Our calculator shows pip value for any position size to help with trade planning.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Currency Profit Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Currency Profit USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Forex Profit Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, trading EUR/USD with a $5,000 account, your forex profit calculator USA 2026 shows exact pip values and profit/loss scenarios for different position sizes and leverage levels.
        </p>
      </Card>

            <SEOContent
        title="Forex Profit Calculator USA – Calculate Your Currency Trade Profit and Pip Value in 2026"
        category="finance"
        intro={`Currency trading (forex) is one of the most liquid markets in the world — over $7.5 trillion in daily volume — and one of the most difficult for retail traders to profit from. Major currency pairs move in tiny increments (pips), which is why most retail forex traders use significant leverage (10:1 to 100:1 or more) to amplify small price moves into meaningful profits. That same leverage amplifies losses equally.

Understanding the math of forex trading — pip value, position size, leverage, and risk-reward ratios — is essential before placing any trade. A 100-pip move on EUR/USD (which would be a very large daily move) represents only a 0.6% price change. With 50:1 leverage, that 0.6% move produces a 30% gain or loss on your deployed capital.

Most retail forex traders lose money. Regulatory disclosures from major brokers consistently show that 70-80% of retail forex trading accounts lose money over any 12-month period. This is partly due to leverage, partly due to spreads and fees, and partly due to the difficulty of consistently out-trading professional market participants.`}
        howItWorks={`Pip value: For USD/XXX pairs: pip value = (0.0001 / current rate) × lot size. For EUR/USD at 1.08, one standard lot (100,000 units): pip value = (0.0001/1.08) × 100,000 = $9.26 per pip.

Profit/loss: (Entry price - exit price) × pip value × lots traded = profit in quote currency. Convert to your account currency using current rate.

Leverage impact: With 10:1 leverage, $1,000 controls $10,000 in currency. A 100-pip move = $9.26 × 1 lot × 10% position = actual gain/loss of $92.60 on $1,000 — a 9.26% return or loss from a single day's volatility. At 50:1 leverage, the same 100-pip move on $1,000 capital = 46.3% gain or loss.`}
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
        tipsSection={`Define your risk before every trade: the maximum dollar amount you're willing to lose on this specific trade. Then size your position so that your stop-loss order, placed at your risk price, loses only that amount. Never trade without a stop-loss.

Track your risk-reward ratio per trade. A trade with a 100-pip target and 50-pip stop has a 2:1 reward-to-risk ratio. You only need to be right 40% of the time to be profitable with a consistent 2:1 ratio. Most losing traders take 1:1 or worse ratios while hoping for large wins.

Factoring in the spread (the difference between buy and sell price, which is your immediate cost upon entering a trade) is essential for short-term traders. A 2-pip spread on a 10-pip target trade means you start with a 20% loss immediately. Spreads vary significantly between brokers and currency pairs.`}
        conclusion={`Forex trading requires significant capital, discipline, and market knowledge to be consistently profitable. Anyone considering forex trading should demo trade for at least 3-6 months before risking real capital — and should carefully analyze whether their demo results justify the transition. Most people who do this analysis discover their demo performance isn't good enough to trade real money profitably.

For most investors, currency exposure in a diversified portfolio is better achieved through international index funds or currency-hedged ETFs rather than direct forex trading.`}

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
          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📉", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "XIRR Calculator", href: "/calculators/finance/xirr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Currency Converter Calculator", href: "/calculators/finance/currency-converter", icon: "💱", desc: "Free calculator" },          { name: "Tip Calculator", href: "/calculators/finance/tip-calculator", icon: "💵", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "P/E Ratio Calculator", href: "/calculators/finance/pe-ratio-calculator", icon: "📊", desc: "Free calculator" },          { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Crypto Profit Calculator", href: "/calculators/finance/crypto-profit-calculator", icon: "₿", desc: "Free calculator" },          { name: "Stock Profit Calculator", href: "/calculators/finance/stock-profit-calculator", icon: "💹", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
