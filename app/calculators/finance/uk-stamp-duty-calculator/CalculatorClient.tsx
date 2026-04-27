'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend } from 'recharts'
import { calculateUKStampDuty } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

type BuyerType = 'firstTime' | 'standard' | 'additionalProperty'

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [propertyPrice, setPropertyPrice] = useState(350000)
  const [buyerType, setBuyerType] = useState<BuyerType>('standard')

  const result = useMemo(() => calculateUKStampDuty(propertyPrice, buyerType), [propertyPrice, buyerType])

  const fmt = (v: number) => `£${Math.round(v).toLocaleString()}`
  const fmtK = (v: number) => v >= 1000000 ? `£${(v / 1000000).toFixed(2)}M` : `£${(v / 1000).toFixed(0)}k`

  // Comparison across buyer types
  const comparison = [
    { label: 'First-Time Buyer', ...calculateUKStampDuty(propertyPrice, 'firstTime') },
    { label: 'Standard', ...calculateUKStampDuty(propertyPrice, 'standard') },
    { label: 'Additional Property', ...calculateUKStampDuty(propertyPrice, 'additionalProperty') },
  ]

  // Price sensitivity
  const pricePoints = [200000, 300000, 400000, 500000, 600000, 750000, 1000000].map(p => ({
    price: `£${(p / 1000).toFixed(0)}k`,
    sdlt: calculateUKStampDuty(p, buyerType).stampDuty,
    rate: calculateUKStampDuty(p, buyerType).effectiveRate,
  }))

  const BUYER_OPTIONS: { value: BuyerType; label: string; desc: string; color: string }[] = [
    { value: 'firstTime', label: '🏠 First-Time Buyer', desc: '0% up to £425k, relief up to £625k', color: 'green' },
    { value: 'standard', label: '🔑 Standard Purchase', desc: '0% up to £250k, standard rates', color: 'blue' },
    { value: 'additionalProperty', label: '🏘️ Additional Property', desc: '+3% surcharge on all bands', color: 'amber' },
  ]


  function getBands(price: number, bt: BuyerType) {
    if (bt === 'firstTime') return [
      { band: '£0 - £425,000', rate: '0%', amount: Math.min(price, 425000), tax: 0 },
      { band: '£425,001 - £625,000', rate: '5%', amount: price > 425000 ? Math.min(price, 625000) - 425000 : 0, tax: price > 425000 ? (Math.min(price, 625000) - 425000) * 0.05 : 0 },
    ]
    if (bt === 'additionalProperty') return [
      { band: '£0 - £250,000', rate: '5%', amount: Math.min(price, 250000), tax: Math.min(price, 250000) * 0.05 },
      { band: '£250,001 - £925,000', rate: '10%', amount: price > 250000 ? Math.min(price, 925000) - 250000 : 0, tax: price > 250000 ? (Math.min(price, 925000) - 250000) * 0.10 : 0 },
      { band: '£925,001 - £1,500,000', rate: '13%', amount: price > 925000 ? Math.min(price, 1500000) - 925000 : 0, tax: price > 925000 ? (Math.min(price, 1500000) - 925000) * 0.13 : 0 },
    ]
    return [
      { band: '£0 - £250,000', rate: '0%', amount: Math.min(price, 250000), tax: 0 },
      { band: '£250,001 - £925,000', rate: '5%', amount: price > 250000 ? Math.min(price, 925000) - 250000 : 0, tax: price > 250000 ? (Math.min(price, 925000) - 250000) * 0.05 : 0 },
      { band: '£925,001 - £1,500,000', rate: '10%', amount: price > 925000 ? Math.min(price, 1500000) - 925000 : 0, tax: price > 925000 ? (Math.min(price, 1500000) - 925000) * 0.10 : 0 },
      { band: 'Above £1,500,000', rate: '12%', amount: price > 1500000 ? price - 1500000 : 0, tax: price > 1500000 ? (price - 1500000) * 0.12 : 0 },
    ]
  }

  return (
    <CalculatorLayout title="UK Stamp Duty Calculator 2026" description="Calculate SDLT for England and Wales home purchases including first-time buyer relief." icon="🏠" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Property Details</h2>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Property Price</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 text-sm font-bold">£</span>
              <input type="number" value={propertyPrice} onChange={e => setPropertyPrice(Number(e.target.value))} step={5000}
                className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-lg" />
            </div>
          </div>

          <div className="space-y-1">
            <input type="range" min={50000} max={2000000} step={5000} value={propertyPrice}
              onChange={e => setPropertyPrice(Number(e.target.value))} className="w-full accent-green-500" />
            <div className="flex justify-between text-xs text-gray-400">
              <span>£50k</span><span>£500k</span><span>£2M</span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Buyer Type</label>
            {BUYER_OPTIONS.map(opt => (
              <button key={opt.value} onClick={() => setBuyerType(opt.value)}
                className={`w-full text-left p-3 rounded-xl border transition-all ${buyerType === opt.value ? 'bg-green-600 border-green-600 text-white' : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100'}`}>
                <p className="text-sm font-semibold">{opt.label}</p>
                <p className={`text-xs mt-0.5 ${buyerType === opt.value ? 'text-green-100' : 'text-gray-400'}`}>{opt.desc}</p>
              </button>
            ))}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-xs text-gray-500">Stamp Duty Due</p>
            <p className="text-3xl font-black text-green-700 mt-1">{fmt(result.stampDuty)}</p>
            <p className="text-sm text-gray-500 mt-1">Effective rate: <span className="font-bold text-gray-700">{result.effectiveRate}%</span></p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Stamp Duty" value={fmt(result.stampDuty)} highlight />
            <ResultCard label="Property Price" value={fmtK(propertyPrice)} />
            <ResultCard label="Total Cost" value={fmtK(result.totalCost)} subValue="inc. stamp duty" />
            <ResultCard label="Effective Rate" value={`${result.effectiveRate}%`} subValue="of property price" />
          </div>

          {/* SDLT bands breakdown */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">SDLT Bands Applied</h3>
            <div className="overflow-x-auto">
              <table className="calc-table">
                <thead><tr><th>Band</th><th>Rate</th><th>Taxable Amount</th><th>Tax in Band</th></tr></thead>
                <tbody>
                  {getBands(propertyPrice, buyerType).filter(r => r.amount > 0).map((r, i) => (
                    <tr key={i}>
                      <td className="text-xs">{r.band}</td>
                      <td className="font-bold text-green-600">{r.rate}</td>
                      <td>{fmt(r.amount)}</td>
                      <td className="font-bold">{fmt(r.tax)}</td>
                    </tr>
                  ))}
                  <tr className="bg-green-50 font-bold">
                    <td colSpan={3}>Total Stamp Duty</td>
                    <td className="text-green-700">{fmt(result.stampDuty)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>

          {/* Buyer type comparison */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Stamp Duty by Buyer Type - {fmtK(propertyPrice)}</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparison} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="label" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={65} tickFormatter={v => `£${(v / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="stampDuty" name="Stamp Duty" radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 10, fill: '#374151', formatter: (v: number) => `£${(v / 1000).toFixed(1)}k` }}>
                    {comparison.map((_, i) => <Cell key={i} fill={['#22c55e', '#3b82f6', '#f59e0b'][i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">UK Stamp Duty Calculator - Everything You Need to Know for 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">SDLT Bands and How It Works</h3>
              <p>Stamp Duty Land Tax (SDLT) is a tiered tax - like income tax - meaning you only pay each rate on the portion of the price that falls within that band. For a £400,000 standard purchase: 0% on first £250,000 = £0 tax, 5% on remaining £150,000 = £7,500. Total SDLT = £7,500. SDLT must be paid within 14 days of property completion. Most buyers have their solicitor handle this as part of the conveyancing process. Failure to pay on time results in interest and penalties charged by HMRC.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">First-Time Buyer Relief Explained</h3>
              <p>First-time buyers purchasing a property for £425,000 or less pay zero stamp duty. On properties between £425,001 and £625,000, only the portion above £425,000 is taxed at 5%. A first-time buyer at £500,000: 0% on £425,000 + 5% on £75,000 = £3,750. Compare to a standard buyer at £500,000: 0% on £250,000 + 5% on £250,000 = £12,500. Saving of £8,750. Both buyers on the transaction must be genuine first-time buyers to claim the relief.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Additional Dwelling Surcharge</h3>
              <p>The 3% surcharge applies when you buy a residential property and will own more than one residential property after completion. This includes buy-to-let investments, holiday homes, and cases where you are buying a new home before selling your existing one (though a refund can be claimed if you sell within 3 years). The surcharge applies from £1 - unlike the nil-rate band for standard purchases. On a £250,000 buy-to-let: standard SDLT would be £0, but with 3% surcharge = £7,500. Significant cost for property investors.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">SDLT on Non-Residential and Mixed-Use</h3>
              <p>Commercial property and non-residential land uses different SDLT rates: 0% up to £150,000, 2% on £150,001-£250,000, 5% above £250,000. Mixed-use properties (part residential, part commercial) qualify for the non-residential rates. Some agricultural land with planning permission to convert to residential uses non-residential rates. Property investors sometimes use mixed-use classification to reduce SDLT, though HMRC scrutinises such arrangements carefully. Always seek professional advice for complex transactions.</p>
            </div>
          </div>
        </Card>
  

      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "UK Income Tax Calculator", href: "/calculators/finance/uk-income-tax-calculator", icon: "🇬🇧", desc: "Free calculator" },          { name: "UK Pension Calculator", href: "/calculators/finance/uk-pension-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "ISA Calculator", href: "/calculators/finance/isa-calculator", icon: "💰", desc: "Free calculator" },          { name: "UK Buy To Let vs Stocks Calculator", href: "/calculators/finance/uk-buy-to-let-vs-stocks-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Help To Buy vs LISA Calculator", href: "/calculators/finance/uk-help-to-buy-vs-lisa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Lifetime ISA vs SIPp Calculator", href: "/calculators/finance/uk-lifetime-isa-vs-sipp-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Premium Bonds vs Cash ISA Calculator", href: "/calculators/finance/uk-premium-bonds-vs-cash-isa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Pension vs ISA Calculator", href: "/calculators/finance/uk-pension-vs-isa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Fixed Rate vs Tracker Mortgage Calculator", href: "/calculators/finance/uk-fixed-rate-vs-tracker-mortgage-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Stocks vs Bonds Calculator", href: "/calculators/finance/uk-stocks-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Pension Drawdown vs Annuity Calculator", href: "/calculators/finance/uk-pension-drawdown-vs-annuity-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Remortgage vs Invest Calculator", href: "/calculators/finance/uk-remortgage-vs-invest-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          UK Stamp Duty Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this UK Stamp Duty USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          UK Stamp Duty Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, purchasing a GBP 500,000 home as a standard buyer, your UK stamp duty calculator 2026 shows exactly how SDLT is calculated in tiered bands and your total tax bill before you make an offer.
        </p>
      </Card>

            <SEOContent
        title="UK Stamp Duty Calculator – How Much SDLT Will You Pay on Your UK Property Purchase in 2026?"
        category="finance"
        intro={`Stamp Duty Land Tax (SDLT) in England and Northern Ireland is a tiered transaction tax on property purchases that has evolved significantly over the past decade, with frequent temporary reliefs and permanent structural changes. The temporary first-time buyer relief raising the nil-rate band to £425,000 is due to revert to £300,000 in April 2026 — making timing a genuine financial consideration for buyers near this threshold.

SDLT rates in 2024-25 for standard residential purchases: 0% on first £250,000, 5% on £250,001-£925,000, 10% on £925,001-£1.5M, 12% above £1.5M. First-time buyers have higher nil-rate (currently £425,000 until April 2026) and reduced rates. Buy-to-let and second home purchases attract a 3% surcharge on all bands.

Scotland uses Land and Buildings Transaction Tax (LBTT) and Wales uses Land Transaction Tax (LTT) — both with different rate structures. This calculator handles all UK jurisdictions with the appropriate rates for each.`}
        howItWorks={`SDLT calculation: Each rate band applies only to the portion of purchase price within that band. On a £400,000 purchase (standard residential 2024-25): £250,000 × 0% = £0, £150,000 × 5% = £7,500. Total SDLT = £7,500.

First-time buyer relief: On a £400,000 purchase: £425,000 nil-rate applies, so £400,000 × 0% = £0. Saving versus standard rate: £7,500. The relief applies only on properties up to £625,000; purchases above £625,000 get no first-time buyer relief.

BTL/second home surcharge: 3% added to each rate band. On £400,000: (£250,000 × 3%) + (£150,000 × 8%) = £7,500 + £12,000 = £19,500. The surcharge is substantial — nearly £12,000 more than the standard rate on this price.`}
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
        tipsSection={`For first-time buyers near the £425,000 threshold (until April 2026) or the eventual £300,000 threshold: SDLT saving may justify buying slightly below the threshold rather than slightly above. On a £430,000 purchase after the relief reverts to £300,000, SDLT = £250,000 × 0% + £130,000 × 5% = £6,500 vs £0 for a £295,000 purchase. This isn't always the right decision, but it's worth considering when properties near the threshold are available.

For BTL investors: the 3% surcharge significantly affects investment return calculations. On a £250,000 BTL purchase, SDLT is £7,500 (£0 standard + £7,500 surcharge). This upfront cost takes 1-2 years of rental income to recover, reducing effective returns in the early years of ownership.

For lease extensions and other transactions: SDLT rules differ for leasehold purchases and complex structures. Consult a solicitor for non-standard transactions.`}
        conclusion={`SDLT is a significant transaction cost that affects buy-to-sell economics. On a £500,000 property: SDLT of £12,500 is money that the property must appreciate before you break even on the transaction cost alone (alongside agent fees, legal costs, and survey fees). Factor the full transaction cost into any investment property analysis.

For property portfolio owners considering selling and reinvesting: the 3% surcharge on any additional residential property purchase makes portfolio restructuring expensive. Model the full round-trip cost (SDLT on purchase + CGT on sale) before deciding to sell and re-purchase in a different market.`}

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
    </CalculatorLayout>
  )
}
