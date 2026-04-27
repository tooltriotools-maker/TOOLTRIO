'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, ReferenceLine } from 'recharts'
import { calculateGovernmentBond } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const BOND_PRESETS = [
  { name: '🇬🇧 UK 10yr Gilt', country: 'UK', coupon: 4.25, maturity: 10, price: 97, faceValue: 100, symbol: '£' },
  { name: '🇩🇪 German 10yr Bund', country: 'Germany', coupon: 2.6, maturity: 10, price: 94, faceValue: 100, symbol: '€' },
  { name: '🇫🇷 French 10yr OAT', country: 'France', coupon: 3.0, maturity: 10, price: 95, faceValue: 100, symbol: '€' },
  { name: '🇮🇹 Italian 10yr BTP', country: 'Italy', coupon: 4.35, maturity: 10, price: 96, faceValue: 100, symbol: '€' },
  { name: '🇪🇸 Spanish 10yr Bono', country: 'Spain', coupon: 3.55, maturity: 10, price: 95.5, faceValue: 100, symbol: '€' },
  { name: '🇨🇭 Swiss 10yr Eidg.', country: 'Switzerland', coupon: 0.5, maturity: 10, price: 88, faceValue: 100, symbol: 'CHF' },
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [presetIdx, setPresetIdx] = useState(0)
  const [faceValue, setFaceValue] = useState(10000)
  const [couponRate, setCouponRate] = useState(4.25)
  const [maturity, setMaturity] = useState(10)
  const [marketPrice, setMarketPrice] = useState(9700)
  const [symbol, setSymbol] = useState('£')

  const result = useMemo(() => calculateGovernmentBond(faceValue, couponRate, maturity, marketPrice),
    [faceValue, couponRate, maturity, marketPrice])

  const fmt = (v: number) => `${symbol}${Math.round(v).toLocaleString()}`
  const fmtK = (v: number) => `${symbol}${(v / 1000).toFixed(1)}k`
  const priceAsPct = ((marketPrice / faceValue) * 100).toFixed(2)

  const handlePreset = (i: number) => {
    const p = BOND_PRESETS[i]
    setPresetIdx(i)
    setCouponRate(p.coupon)
    setMaturity(p.maturity)
    setMarketPrice(Math.round(faceValue * p.price / 100))
    setSymbol(p.symbol)
  }

  // YTM vs price relationship
  const priceRange = Array.from({ length: 21 }, (_, i) => {
    const pricePct = 80 + i * 2
    const price = faceValue * pricePct / 100
    const r = calculateGovernmentBond(faceValue, couponRate, maturity, price)
    return { price: `${pricePct}%`, ytm: parseFloat(r.ytm.toFixed(3)) }
  })

  return (
    <CalculatorLayout title="Government Bond Calculator USA 2026" description="Calculate yield to maturity, current yield, bond price, and duration for any government bond." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Bond Details</h2>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Quick Presets</label>
            <div className="space-y-1.5">
              {BOND_PRESETS.map((p, i) => (
                <button key={p.name} onClick={() => handlePreset(i)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex justify-between items-center ${presetIdx === i ? 'bg-green-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
                  <span className="font-medium">{p.name}</span>
                  <span>{p.coupon}% coupon</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Face Value (Nominal)</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 font-bold text-sm">{symbol}</span>
              <input type="number" value={faceValue} onChange={e => { setFaceValue(Number(e.target.value)); setMarketPrice(Math.round(Number(e.target.value) * parseFloat(priceAsPct) / 100)) }} step={1000}
                className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Coupon Rate</label>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <input type="number" value={couponRate} onChange={e => setCouponRate(Number(e.target.value))} step={0.05}
                  className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
                <span className="text-gray-400 text-xs">%</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Years to Maturity</label>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <input type="number" value={maturity} onChange={e => setMaturity(Number(e.target.value))} step={1} min={1}
                  className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
                <span className="text-gray-400 text-xs">yr</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">Market Price</label>
              <span className={`text-xs font-bold ${marketPrice < faceValue ? 'text-amber-600' : 'text-green-600'}`}>
                {priceAsPct}% of face value
              </span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 font-bold text-sm">{symbol}</span>
              <input type="number" value={marketPrice} onChange={e => setMarketPrice(Number(e.target.value))} step={10}
                className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>

          <div className={`p-3 rounded-xl text-center ${result.capitalGainLoss >= 0 ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
            <p className="text-xs text-gray-500">{result.capitalGainLoss >= 0 ? 'Capital Gain at Maturity' : 'Capital Loss at Maturity'}</p>
            <p className={`text-xl font-black ${result.capitalGainLoss >= 0 ? 'text-green-700' : 'text-amber-600'}`}>{result.capitalGainLoss >= 0 ? '+' : ''}{fmt(result.capitalGainLoss)}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Yield to Maturity" value={`${result.ytm}%`} highlight />
            <ResultCard label="Annual Coupon" value={fmt(result.annualCoupon)} />
            <ResultCard label="Total Return" value={fmt(result.totalReturn)} subValue={`${result.totalReturnPct}% over ${maturity}yr`} />
            <ResultCard label="Duration" value={`${result.macaulayDuration}yr`} subValue="interest rate risk" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Annual Coupon Income over {maturity} Years</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.yearData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Year', position: 'insideBottomRight', fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={65} tickFormatter={v => fmt(v)} />
                  <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="coupon" name="Annual Coupon" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="cumulative" name="Cumulative Income" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Price-Yield Inverse Relationship</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceRange} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="price" tick={{ fill: '#374151', fontSize: 9 }} axisLine={false} tickLine={false} label={{ value: 'Bond Price (% of face)', position: 'insideBottom', offset: -3, fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={45} tickFormatter={v => `${v}%`} />
                  <Tooltip formatter={(v: number) => [`${v}%`, 'YTM']} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                  <ReferenceLine x={`${priceAsPct}%`} stroke="#22c55e" strokeWidth={2} strokeDasharray="4 2" />
                  <Line type="monotone" dataKey="ytm" name="Yield to Maturity" stroke="#ef4444" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-400 text-center mt-1">Green line = your current price. As price falls, yield rises (inverse relationship)</p>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Government Bond Calculator - UK Gilts and European Sovereign Bonds USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">UK Gilts in 2026</h3>
              <p>UK government bonds (Gilts) are issued by HM Treasury and traded on the London Stock Exchange. They come in Conventional Gilts (fixed coupon, fixed maturity), Index-Linked Gilts (coupon adjusted for RPI inflation), and Treasury Bills (short-term, no coupon). UK 10-year gilt yields in 2026 are around 4.2-4.8% - elevated versus the 2010-2021 near-zero environment due to Bank of England rate cycle. Gilts can be held in an ISA or SIPP, making interest income and capital gains tax-free. The UK Debt Management Office auctions new gilts regularly at gilts.gov.uk.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Macaulay Duration - Understanding Rate Sensitivity</h3>
              <p>Duration measures how sensitive a bond's price is to interest rate changes. A 10-year bond with duration of 7.5 years will lose approximately 7.5% in market value if interest rates rise by 1%. Shorter-dated bonds have lower duration (less rate sensitivity). Zero-coupon bonds have duration equal to their maturity - maximum sensitivity. Investors expecting rate cuts should buy longer-duration bonds to maximise capital gain. Investors expecting rate rises should hold short-dated bonds or cash to avoid capital losses.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">German Bunds: The Eurozone Benchmark</h3>
              <p>German Bunds are the safest eurozone sovereign bonds and serve as the benchmark against which all other eurozone bonds are priced. The spread between Italian BTPs and German Bunds (typically 1.5-2.5% in 2026) is a key indicator of eurozone financial stress. When spreads widen, it signals investor concern about peripheral country debt. ECB bond purchase programmes (QE) historically compressed spreads - their removal has allowed spreads to normalise. Germany\'s conservative fiscal policy (debt brake) and manufacturing export strength underpin Bund creditworthiness.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Gilt Laddering Strategy for UK Retirees</h3>
              <p>A gilt ladder is a portfolio of UK Gilts with staggered maturities (e.g., 1-year, 3-year, 5-year, 7-year, 10-year) providing a predictable income stream. Each year, the maturing gilt provides cash while longer gilts continue earning higher yields. This strategy is used by UK defined benefit pension trustees and cautious retirees who want guaranteed income without annuity lock-in. With 10-year gilt yields around 4.5% in 2026, a £500,000 ladder generates approximately £22,500 per year in tax-free coupon income (held in ISA).</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Government Bond Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Government Bond USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent
        title="Government Bond Calculator USA – What Is the Yield to Maturity on Your Bond in 2026?"
        category="finance"
        intro={`Government bonds are the bedrock of conservative portfolio construction and cash management — and they're also among the most misunderstood asset classes for retail investors. The relationship between price and yield moves in opposite directions: when interest rates rise, existing bond prices fall; when rates fall, prices rise. Understanding why this happens — and how to calculate the impact — is essential for anyone holding bonds outside of a fund.

For US investors, Treasury bonds offer the additional advantage of being exempt from state and local income taxes. For an investor in California (13.3% state tax) or New York (10.9%), a 4.5% Treasury yield is equivalent to roughly 5.1-5.0% taxable yield — making Treasuries more competitive than they appear at face value compared to CDs and corporate bonds.

Duration is the key risk metric for bonds: it measures the sensitivity of price to interest rate changes. A bond with duration of 7 years will fall approximately 7% in price for each 1% rise in interest rates. Short-duration bonds (T-bills, 2-year notes) have much lower price sensitivity than long-duration bonds (30-year Treasuries), which helps explain why many investors in 2022-2023 who held long-term bonds saw dramatic unrealized losses.`}
        howItWorks={`Yield to Maturity (YTM): The discount rate that makes the present value of all future cash flows (coupon payments + face value) equal to the current price. For a bond selling at par, YTM = coupon rate. For a discount bond (price < par), YTM > coupon rate; for a premium bond, YTM < coupon rate.

Bond price from YTM: Price = Sum of [Coupon/(1+YTM)^t] for t=1 to n, plus [Face Value/(1+YTM)^n]. For a $1,000 face value bond with 3% coupon, 5% YTM, and 10 years remaining: Price ≈ $845.

Duration calculation: Modified duration = Macaulay duration / (1 + YTM/frequency). Macaulay duration is the weighted average time to cash flows. For the above bond, modified duration ≈ 8.8 years — meaning a 1% rate rise reduces price by approximately 8.8%.`}
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
        tipsSection={`Match bond maturities to your investment timeline. If you need money in 3 years, buy a bond maturing in 3 years — you receive exactly the YTM you locked in regardless of rate movements between now and maturity. Buying a 10-year bond for a 3-year need exposes you to interest rate risk during the holding period.

For tax-equivalent yield comparisons: Tax-equivalent yield = Treasury yield / (1 - state tax rate). A 4.5% Treasury yield for a California 13.3% state taxpayer = 4.5% / 0.867 = 5.19% taxable equivalent. Compare this to CDs and corporate bonds at the state-taxable rate.

Ladder Treasuries like CDs for predictable cash flows. TreasuryDirect.gov allows direct purchase without brokerage commissions. I Bonds (Series I Savings Bonds) offer inflation-linked returns with state tax exemption — particularly valuable in high-inflation periods.`}
        conclusion={`The 2022-2023 bond market selloff reminded many investors that bonds carry real risk of significant unrealized losses when rates rise — losses that felt acutely uncomfortable for people who thought they were in 'safe' assets. Understanding duration before buying bonds is not optional for anyone holding individual bonds rather than short-duration funds.

For most retail investors, short-duration Treasury ETFs (1-3 year or ultra-short) or Treasury money market funds provide government bond exposure with minimal interest rate risk and excellent liquidity. Individual bond selection is most appropriate for investors who want specific maturity dates for cash flow planning.`}

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
            { name: "S&P 500 vs Bonds Calculator", href: "/calculators/finance/sp500-vs-bonds-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "🔗", desc: "Related financial tool" },
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
          { name: "Cd Ladder Calculator", href: "/calculators/finance/cd-ladder-calculator", icon: "🏦", desc: "Free calculator" },          { name: "Cd vs HYSA Calculator", href: "/calculators/finance/cd-vs-hysa-calculator", icon: "💰", desc: "Free calculator" },          { name: "Bonds vs Cds USA Calculator", href: "/calculators/finance/bonds-vs-cds-usa-calculator", icon: "📋", desc: "Free calculator" },          { name: "I Bonds vs Tips Calculator", href: "/calculators/finance/i-bonds-vs-tips-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Savings Goal Calculator", href: "/calculators/finance/savings-goal-calculator", icon: "🎯", desc: "Free calculator" },          { name: "Emergency Fund Calculator", href: "/calculators/finance/emergency-fund-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
