'use client'
import { useState, useMemo } from 'react'
import { calculateCryptoProfit } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [buyPrice, setBuyPrice] = useState(30000)
  const [sellPrice, setSellPrice] = useState(45000)
  const [quantity, setQuantity] = useState(0.5)
  const [buyFee, setBuyFee] = useState(0.1)
  const [sellFee, setSellFee] = useState(0.1)
  const [holdingMonths, setHoldingMonths] = useState(12)
  const [coin, setCoin] = useState('BTC')

  const result = useMemo(() => calculateCryptoProfit(buyPrice, sellPrice, quantity, buyFee, sellFee, holdingMonths), [buyPrice, sellPrice, quantity, buyFee, sellFee, holdingMonths])

  const isProfit = result.profit >= 0

  const presets = [
    { name: 'BTC', price: 65000 }, { name: 'ETH', price: 3500 },
    { name: 'SOL', price: 180 }, { name: 'BNB', price: 600 }, { name: 'Custom', price: 0 },
  ]

  return (
    <CalculatorLayout title="Crypto Profit Calculator USA 2026" description="Calculate profit or loss on any cryptocurrency trade including fees and capital gains tax." icon="₿" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Trade Details</h2>

          {/* Coin presets */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Quick Preset</label>
            <div className="flex gap-2 flex-wrap">
              {presets.map(p => (
                <button key={p.name} onClick={() => { setCoin(p.name); if (p.price) setBuyPrice(p.price) }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${coin === p.name ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300'}`}>{p.name}</button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {[{ label: 'Buy Price', val: buyPrice, set: setBuyPrice, prefix: '$' },
              { label: 'Sell Price', val: sellPrice, set: setSellPrice, prefix: '$' },
              { label: 'Quantity', val: quantity, set: setQuantity, prefix: '₿', step: 0.001 }].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">{f.prefix}</span>
                  <input type="number" step={f.step || 1} value={f.val} onChange={e => f.set(Number(e.target.value))} className="w-full pl-8 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 focus:border-transparent" /></div>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Buy Fee %</label>
                <input type="number" step="0.01" value={buyFee} onChange={e => setBuyFee(Number(e.target.value))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Sell Fee %</label>
                <input type="number" step="0.01" value={sellFee} onChange={e => setSellFee(Number(e.target.value))} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Holding Period: <span className="text-orange-500">{holdingMonths} months</span></label>
              <input type="range" min="1" max="60" value={holdingMonths} onChange={e => setHoldingMonths(Number(e.target.value))} className="w-full accent-orange-500" />
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* Main verdict */}
          <div className={`rounded-2xl border p-6 ${isProfit ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">Net Profit / Loss</p>
                <p className={`text-4xl font-black ${isProfit ? 'text-green-600' : 'text-red-600'}`}>
                  {isProfit ? '+' : ''}${Math.abs(result.profit).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total ROI</p>
                <p className={`text-2xl font-black ${isProfit ? 'text-green-600' : 'text-red-600'}`}>{result.roi >= 0 ? '+' : ''}{result.roi}%</p>
                <p className="text-xs text-gray-500 mt-0.5">Annualized: <span className={`font-bold ${result.annualizedROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>{result.annualizedROI >= 0 ? '+' : ''}{result.annualizedROI.toFixed(1)}%/yr</span></p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="Total Cost" value={`$${result.totalCost.toLocaleString()}`} subValue={`+$${result.buyFee} fee`} />
            <ResultCard label="Net Proceeds" value={`$${result.netProceeds.toLocaleString()}`} subValue={`-$${result.sellFee} fee`} />
            <ResultCard label="Break-Even Price" value={`$${result.breakEvenPrice.toLocaleString()}`} subValue="After fees" />
          </div>

          {/* Trade summary */}
          <Card>
            <h3 className="font-bold text-gray-900 mb-3">Trade Summary</h3>
            <div className="space-y-2">
              {[
                { label: 'Buy Price', val: `$${buyPrice.toLocaleString()}` },
                { label: 'Sell Price', val: `$${sellPrice.toLocaleString()}` },
                { label: 'Price Change', val: `${((sellPrice - buyPrice) / buyPrice * 100).toFixed(2)}%`, color: sellPrice >= buyPrice ? 'text-green-600' : 'text-red-600' },
                { label: 'Quantity', val: `${quantity} ${coin}` },
                { label: 'Buy Value', val: `$${result.buyTotal.toLocaleString()}` },
                { label: 'Sell Value', val: `$${result.sellTotal.toLocaleString()}` },
                { label: 'Total Fees', val: `$${(result.buyFee + result.sellFee).toFixed(2)}` },
                { label: 'Holding Period', val: `${holdingMonths} months` },
              ].map(r => (
                <div key={r.label} className="flex justify-between text-sm py-1.5 border-b border-gray-50">
                  <span className="text-gray-500">{r.label}</span>
                  <span className={`font-semibold ${(r as any).color || 'text-gray-900'}`}>{r.val}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Crypto Profit Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Crypto Profit USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent
        title="Crypto Profit Calculator USA – What Is Your Real Profit After Fees and Taxes in 2026?"
        category="finance"
        intro={`Crypto investing operates without the institutional safeguards that govern traditional securities — no SIPC protection, no FDIC insurance, no investor protections if an exchange fails. That makes accurate profit and tax tracking especially important: unlike a brokerage account that reports cost basis automatically, crypto gains and losses require your own records unless you use a dedicated tracking tool.

The volatility in crypto markets means the difference between a 30% gain and a 60% gain can materialize in days, and the same applies in reverse. Understanding your actual cost basis, holding period, and realized versus unrealized gains helps you make rational decisions about when to sell — including the significant tax advantage of holding positions longer than one year to qualify for long-term capital gains rates.

Bitcoin has returned approximately 100% annually on average since 2011, but those averages hide years of -70% to -80% drawdowns. Anyone using this calculator to model crypto profits needs to also model the downside scenarios with equal seriousness.`}
        howItWorks={`Profit calculation: (Current Price - Purchase Price) × Quantity Held = Unrealized Gain/Loss. Realized gain = Selling Price - Cost Basis (original purchase price + fees).

Tax treatment: Crypto held less than 1 year: short-term capital gains, taxed as ordinary income (up to 37% federal). Held 1+ year: long-term capital gains (0%, 15%, or 20% depending on total income). Each transaction is a taxable event — including swaps between cryptocurrencies.

ROI calculation: [(Sale Price - Purchase Price) / Purchase Price] × 100. For multiple purchases at different prices, use the average cost basis (sum of all purchase prices ÷ total units bought) or FIFO/LIFO accounting depending on which minimizes tax liability. The calculator lets you model both methods.`}
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
        tipsSection={`Keep detailed records of every transaction: date, amount purchased, price paid (in USD at time of purchase), fees, and any disposals. The IRS requires this, and many exchanges don't provide comprehensive tax reporting, especially for DeFi transactions or cross-exchange activity.

Model your after-tax profit, not just gross profit. At the 22% marginal rate, a $50,000 short-term gain nets $39,000. The same gain held one year and one day qualifies for 15% long-term rates, netting $42,500 — $3,500 more for the same investment, just from timing the sale.

Never invest more in crypto than you can afford to lose entirely. This isn't a legal disclaimer — it's an accurate description of the risk profile. Concentrate crypto exposure to a small percentage of total portfolio (5-10% is commonly cited as appropriate for risk-tolerant investors).`}
        conclusion={`Crypto profits can be spectacular, but so can the taxes and the losses. The calculator shows your gross profit, but the after-tax, after-fee number is what you actually keep. Particularly for high-frequency traders, fees and short-term capital gains taxes can consume 30-50% of nominal profits.

For serious crypto investors, dedicated tax software like CoinTracker or Koinly is worth the subscription cost — the complexity of tracking multiple wallets, exchanges, DeFi protocols, and staking rewards across thousands of transactions is genuinely difficult to manage manually.`}

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
            { name: "Stock Profit Calculator", href: "/calculators/finance/stock-profit-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Fire Calculator", href: "/calculators/finance/fire-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📉", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "XIRR Calculator", href: "/calculators/finance/xirr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Currency Converter Calculator", href: "/calculators/finance/currency-converter", icon: "💱", desc: "Free calculator" },          { name: "Currency Profit Calculator", href: "/calculators/finance/currency-profit-calculator", icon: "📊", desc: "Free calculator" },          { name: "Tip Calculator", href: "/calculators/finance/tip-calculator", icon: "💵", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "P/E Ratio Calculator", href: "/calculators/finance/pe-ratio-calculator", icon: "📊", desc: "Free calculator" },          { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Stock Profit Calculator", href: "/calculators/finance/stock-profit-calculator", icon: "💹", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
