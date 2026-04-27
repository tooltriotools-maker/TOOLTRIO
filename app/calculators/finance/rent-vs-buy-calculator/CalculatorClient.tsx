'use client'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts'
import { calculateRentVsBuy } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()
  const [homePrice, setHomePrice] = useState(400000)
  const [downPct, setDownPct] = useState(20)
  const [mortgageRate, setMortgageRate] = useState(6.5)
  const [mortgageYears, setMortgageYears] = useState(30)
  const [monthlyRent, setMonthlyRent] = useState(2200)
  const [rentIncrease, setRentIncrease] = useState(3)
  const [appreciation, setAppreciation] = useState(4)
  const [propertyTax, setPropertyTax] = useState(1.2)
  const [years, setYears] = useState(10)

  const result = useMemo(() => calculateRentVsBuy(homePrice, downPct, mortgageRate, mortgageYears, monthlyRent, rentIncrease, appreciation, propertyTax, 1, years), [homePrice, downPct, mortgageRate, mortgageYears, monthlyRent, rentIncrease, appreciation, propertyTax, years])

  const finalYear = result.yearData[result.yearData.length - 1]
  const buyBetter = result.buyBetter

  return (
    <CalculatorLayout title="Rent vs Buy Calculator USA 2026" description="Compare the complete 10-year financial outcome of renting vs buying a home in your area." icon="🏠" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Home &amp; Mortgage</h2>
          <div className="space-y-4">
            {[
              { label: 'Home Price', val: homePrice, set: setHomePrice, prefix: '$', min: 50000, max: 2000000, step: 10000 },
              { label: 'Monthly Rent', val: monthlyRent, set: setMonthlyRent, prefix: '$', min: 500, max: 10000, step: 100 },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}: <span className="text-green-600">{fmt(f.val)}</span></label>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.val} onChange={e => f.set(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
            ))}
            {[
              { label: `Down Payment: ${downPct}%`, val: downPct, set: setDownPct, min: 3, max: 50, step: 1, suffix: '%' },
              { label: `Mortgage Rate: ${mortgageRate}%`, val: mortgageRate, set: setMortgageRate, min: 1, max: 12, step: 0.1, suffix: '%' },
              { label: `Rent Increase: ${rentIncrease}%/yr`, val: rentIncrease, set: setRentIncrease, min: 0, max: 8, step: 0.5, suffix: '%' },
              { label: `Home Appreciation: ${appreciation}%/yr`, val: appreciation, set: setAppreciation, min: 0, max: 10, step: 0.5, suffix: '%' },
              { label: `Property Tax: ${propertyTax}%`, val: propertyTax, set: setPropertyTax, min: 0, max: 3, step: 0.1, suffix: '%' },
              { label: `Compare over: ${years} years`, val: years, set: setYears, min: 1, max: 30, step: 1, suffix: ' yrs' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.val} onChange={e => f.set(Number(e.target.value))} className="w-full accent-green-600" />
              </div>
            ))}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* Verdict */}
          <div className={`rounded-2xl border p-5 ${buyBetter ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm text-gray-500">After {years} years...</p>
                <p className={`text-2xl font-black ${buyBetter ? 'text-green-700' : 'text-blue-700'}`}>{buyBetter ? '🏠 Buying wins' : '🏢 Renting wins'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Monthly Mortgage</p>
                <p className="text-2xl font-black text-gray-900">{fmt(result.monthlyMortgage)}</p>
                <p className="text-xs text-gray-500">vs Rent: {fmt(monthlyRent)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Down Payment" value={fmt(result.downPayment)} subValue={`${downPct}% of price`} />
            <ResultCard label="Monthly Mortgage" value={fmt(result.totalMonthlyBuy)} subValue="Incl. tax + maintenance" />
            <ResultCard label={`Equity (Yr ${years})`} value={fmt(finalYear?.equity || 0)} subValue="Home value - loan" highlight={buyBetter} />
            <ResultCard label="Property Tax/mo" value={fmt(result.monthlyPropertyTax)} subValue={`${propertyTax}% annual`} />
          </div>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Equity Growth vs Total Rent Paid</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={result.yearData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="year" tickFormatter={v => `Y${v}`} tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                <Legend />
                <Line type="monotone" dataKey="equity" stroke="#16a34a" strokeWidth={2} name="Home Equity" dot={false} />
                <Line type="monotone" dataKey="totalRentCost" stroke="#3b82f6" strokeWidth={2} name="Total Rent Paid" dot={false} />
                <Line type="monotone" dataKey="homeValue" stroke="#f59e0b" strokeWidth={1} strokeDasharray="4 4" name="Home Value" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
            <div className="mt-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6">Rent vs Buy: Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-900 mb-2 text-base">What is Rent?</h3>
              <p>Rent is a USA investment or financial product that offers distinct advantages depending on your goals, tax situation, and time horizon. Understanding how it works is key to making the most of your money.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">What is Buy?</h3>
              <p>Buy takes a different approach to growing or protecting your wealth. Each has its own risk profile, liquidity characteristics, and tax treatment that makes it suited to specific financial situations.</p>
              <h3 className="font-bold text-gray-900 mb-2 mt-4 text-base">Key Differences</h3>
              <p>The most important distinction between Rent and Buy is how returns are generated and taxed. Rent typically suits growth-oriented investors while Buy may appeal to those prioritizing stability or specific tax advantages.</p>
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
            <p className="text-sm text-green-700 leading-relaxed">Most financial advisors recommend not putting all your money in one option. A diversified approach - splitting between Rent and Buy based on your specific goals - often provides better risk-adjusted returns than going all-in on either. Use this calculator to find your optimal split.</p>
          </div>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Rent Vs Buy Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A home purchased for $400,000 with 20% down at 6.5% over 30 years builds <strong>$250,000+</strong> in equity while appreciating at the historical 3.5% annual rate.
        </p>
        <p className="text-sm text-gray-600">
          Use this Rent Vs Buy USA 2026 tool to compare buying vs renting, estimate ROI, and make data-driven real estate decisions.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Rent vs Buy Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, comparing your $2,800/month rent vs buying a $500,000 home in your city, your rent vs buy calculator USA 2026 shows the 10-year financial outcome of each path with your specific numbers.
        </p>
      </Card>

            <SEOContent
        title="Rent vs Buy Calculator USA – Should You Rent or Buy a Home in 2026?"
        category="finance"
        intro={`The rent vs buy decision is deeply personal, financially complex, and often made for the wrong reasons in both directions. Many people buy because 'renting is throwing money away' — a statement that's factually wrong (rent buys housing services you'd otherwise have to pay for another way). Many people rent indefinitely because of fear of commitment — missing out on the equity-building leverage that homeownership provides over long periods.

The financially correct answer depends on four key variables: how long you'll stay, the price-to-rent ratio in your specific market, your investment alternative for the down payment, and home price appreciation expectations. In markets where the price-to-rent ratio is 25 or above (you'd pay 25x annual rent to buy), renting and investing is frequently the better wealth outcome. In markets below 15x, buying typically wins clearly.

Transaction costs are often underweighted. Buying a $400,000 home costs 3-5% in closing costs ($12,000-$20,000). Selling costs another 5-6% in commissions and fees ($20,000-$24,000). The home must appreciate enough to recover these round-trip costs before buying produces any financial advantage over renting. At 5% annual appreciation, recovery takes roughly 18-24 months.`}
        howItWorks={`Buyer's total ownership cost: Mortgage payments + property taxes + insurance + HOA + maintenance (1-2% of value/year) + opportunity cost of down payment invested - mortgage interest tax deduction - equity buildup. Net outcome: home value at sale - remaining mortgage balance - selling costs.

Renter's total cost: Monthly rent growing at 3-4% annually over the comparison period. Renter's investment return: down payment equivalent invested at market return + monthly savings (if rent is less than ownership cost) invested.

Net wealth comparison at end of period: Buyer's net equity (home value minus remaining mortgage) vs Renter's investment portfolio. The comparison requires assumptions about appreciation rate, investment return, and rent growth that significantly affect the outcome.`}
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
        tipsSection={`Run the comparison at your specific expected holding period — the national median is 7 years, but your situation may be very different. Buying for 3 years rarely makes financial sense; buying with a 10+ year expectation almost always makes financial sense in most markets.

Factor the down payment opportunity cost explicitly. $80,000 down on a $400,000 home invested in index funds at 8% annual return grows to $172,717 in 10 years. This $92,717 in foregone investment growth is part of the true cost of homeownership.

Consider what 'buying a house' means for your specific finances: a first purchase at 25% of gross income with 20% down is categorically different from a first purchase at 40% of gross income with 3.5% FHA down. Affordability constraints matter as much as rent vs buy math.`}
        conclusion={`The emotional pull toward homeownership is not irrational. Stability, control over your living environment, community roots, and the psychological safety of ownership have real value. These factors appropriately enter the decision alongside the financial calculation — the mistake is pretending the financial case is clear when it often isn't.

For families planning to stay in one place for 10+ years, the financial case for buying is typically strong regardless of market conditions. For early-career professionals uncertain about location, or people in cities with extreme price-to-rent ratios, renting and investing is often the better path. Use [our Mortgage vs Renting Calculator](/calculators/finance/mortgage-vs-renting-usa-calculator) for the specific monthly payment vs rent analysis.`}

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
          { name: "Real Estate ROI Calculator", href: "/calculators/finance/real-estate-roi-calculator", icon: "🏠", desc: "Free calculator" },          { name: "Rental Yield Calculator", href: "/calculators/finance/rental-yield-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "REIT vs Direct Property USA Calculator", href: "/calculators/finance/reit-vs-direct-property-usa-calculator", icon: "🏢", desc: "Free calculator" },          { name: "S&P500 vs Real Estate USA Calculator", href: "/calculators/finance/sp500-vs-real-estate-usa-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Home Affordability Calculator", href: "/calculators/finance/home-affordability-calculator", icon: "💰", desc: "Free calculator" },          { name: "HELOC Calculator", href: "/calculators/finance/heloc-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "Down Payment Calculator", href: "/calculators/finance/down-payment-calculator", icon: "💵", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
