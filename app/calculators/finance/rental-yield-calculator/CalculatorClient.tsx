'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts'
import { calculateRentalYield } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const UK_CITIES = [
  { name: '🇬🇧 London', avgYield: 4.2, avgPrice: 520000 },
  { name: '🇬🇧 Manchester', avgYield: 6.5, avgPrice: 235000 },
  { name: '🇬🇧 Birmingham', avgYield: 6.0, avgPrice: 210000 },
  { name: '🇬🇧 Leeds', avgYield: 5.8, avgPrice: 225000 },
  { name: '🇬🇧 Glasgow', avgYield: 7.5, avgPrice: 175000 },
  { name: '🇬🇧 Liverpool', avgYield: 8.0, avgPrice: 155000 },
  { name: '🇩🇪 Berlin', avgYield: 3.8, avgPrice: 420000 },
  { name: '🇫🇷 Paris', avgYield: 3.2, avgPrice: 680000 },
  { name: '🇪🇸 Barcelona', avgYield: 5.5, avgPrice: 320000 },
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [propertyValue, setPropertyValue] = useState(250000)
  const [monthlyRent, setMonthlyRent] = useState(1100)
  const [annualCosts, setAnnualCosts] = useState(3600)
  const [mortgagePayment, setMortgagePayment] = useState(900)
  const [vacancyRate, setVacancyRate] = useState(5)
  const [symbol, setSymbol] = useState('£')

  const result = useMemo(() => calculateRentalYield(propertyValue, monthlyRent, annualCosts, mortgagePayment, vacancyRate),
    [propertyValue, monthlyRent, annualCosts, mortgagePayment, vacancyRate])

  const fmt = (v: number) => `${symbol}${Math.round(Math.abs(v)).toLocaleString()}`

  const handleCity = (c: typeof UK_CITIES[0]) => {
    const rent = Math.round(c.avgPrice * c.avgYield / 100 / 12)
    setPropertyValue(c.avgPrice)
    setMonthlyRent(rent)
    setSymbol(c.name.includes('🇬🇧') ? '£' : '€')
  }

  const cashflowBreakdown = [
    { name: 'Annual Rent', value: result.annualRent, fill: '#22c55e' },
    { name: 'Vacancy Loss', value: result.annualRent - result.effectiveRent, fill: '#94a3b8' },
    { name: 'Running Costs', value: annualCosts, fill: '#f97316' },
    { name: 'Mortgage', value: mortgagePayment * 12, fill: '#ef4444' },
  ].filter(d => d.value > 0)

  const yieldColor = result.netYield >= 6 ? 'text-green-600' : result.netYield >= 4 ? 'text-amber-600' : 'text-red-500'

  return (
    <CalculatorLayout title="Rental Yield Calculator USA UK 2026" description="Calculate gross yield, net yield after expenses, and cash-on-cash return for any property." icon="🏘️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Property Details</h2>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">City Benchmark</label>
            <select onChange={e => handleCity(UK_CITIES[Number(e.target.value)])}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-800 outline-none">
              <option value="">- Select a city -</option>
              {UK_CITIES.map((c, i) => <option key={c.name} value={i}>{c.name} - avg {c.avgYield}% yield</option>)}
            </select>
          </div>

          {[
            { label: 'Property Value', value: propertyValue, set: setPropertyValue, step: 5000 },
            { label: 'Monthly Rent', value: monthlyRent, set: setMonthlyRent, step: 25 },
          ].map(({ label, value, set, step }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <span className="text-green-600 font-bold text-sm">{symbol}</span>
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step}
                  className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              </div>
            </div>
          ))}

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Running Costs</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 font-bold text-sm">{symbol}</span>
              <input type="number" value={annualCosts} onChange={e => setAnnualCosts(Number(e.target.value))} step={100}
                className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
            <p className="text-xs text-gray-400">Management, maintenance, insurance, licensing</p>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Mortgage Payment</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 font-bold text-sm">{symbol}</span>
              <input type="number" value={mortgagePayment} onChange={e => setMortgagePayment(Number(e.target.value))} step={25}
                className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
            <p className="text-xs text-gray-400">Enter 0 if you own outright</p>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">Vacancy Rate</label>
              <span className="text-xs font-bold text-gray-700">{vacancyRate}%</span>
            </div>
            <input type="range" min={0} max={20} value={vacancyRate} onChange={e => setVacancyRate(Number(e.target.value))} className="w-full accent-green-500" />
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Gross Yield" value={`${result.grossYield}%`} highlight />
            <ResultCard label="Net Yield" value={`${result.netYield}%`} subValue={result.netYield >= 5 ? 'Good yield' : result.netYield >= 3 ? 'Average' : 'Low yield'} />
            <ResultCard label="Monthly Cashflow" value={`${result.monthlyCashflow >= 0 ? '+' : ''}${fmt(result.monthlyCashflow)}`} subValue={result.monthlyCashflow >= 0 ? 'Positive' : 'Negative'} />
            <ResultCard label="ROI on Equity" value={`${result.roi}%`} subValue="leveraged return" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Annual Cashflow Breakdown</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{ name: 'Annual P&amp;L', ...Object.fromEntries(cashflowBreakdown.map(d => [d.name, d.value])), 'Net Cashflow': result.annualCashflow }]} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} tickFormatter={v => `${symbol}${(v/1000).toFixed(0)}k`} />
                  <YAxis type="category" dataKey="name" tick={false} axisLine={false} tickLine={false} width={5} />
                  <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  {cashflowBreakdown.map(d => <Bar key={d.name} dataKey={d.name} stackId="a" fill={d.fill} />)}
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
              {[
                { label: 'Annual Rent (gross)', value: result.annualRent },
                { label: 'Effective Rent', value: result.effectiveRent },
                { label: 'Annual Costs', value: annualCosts + mortgagePayment * 12 },
                { label: 'Net Annual Income', value: result.annualCashflow },
              ].map(({ label, value }) => (
                <div key={label} className={`rounded-xl p-2 text-center ${value < 0 ? 'bg-red-50' : 'bg-gray-50'}`}>
                  <p className="text-xs text-gray-500">{label}</p>
                  <p className={`font-bold text-sm ${value < 0 ? 'text-red-500' : 'text-gray-800'}`}>{value >= 0 ? '' : '-'}{fmt(value)}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">UK City Yield Comparison 2026</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={UK_CITIES.slice(0, 7).map(c => ({ name: c.name.split(' ')[1], yield: c.avgYield }))} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={35} tickFormatter={v => `${v}%`} />
                  <Tooltip formatter={(v: number) => [`${v}%`, 'Avg Gross Yield']} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                  <Bar dataKey="yield" name="Gross Yield" fill="#22c55e" radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 10, fill: '#374151', formatter: (v: number) => `${v}%` }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Rental Yield Calculator - UK and European Buy-to-Let Analysis USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Gross vs Net Yield - Why the Difference Matters</h3>
              <p>Gross yield ignores all costs - it is a simple indicator but not the number you earn. A Manchester property with 6.5% gross yield might have net yield of 4.5-5% after: letting agency management (10% of rent = £1,320/year on £1,100/month rent), maintenance and repairs (1% of value = £2,350/year on £235,000 property), landlord insurance (£500/year), void periods (5% = £660/year), annual safety checks (£200/year). Total running costs: approximately £5,030/year on gross rent of £13,200 - reducing 6.5% gross to approximately 4.9% net yield before mortgage costs.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">UK Buy-to-Let Tax Changes Post-2017</h3>
              <p>Since 2020, landlords cannot deduct mortgage interest from rental income for tax purposes. Instead, a basic rate (20%) tax credit is available. Higher-rate taxpayers (40%) effectively pay tax on rental income then receive 20% credit - losing 20% compared to pre-2017 rules. This significantly reduced BTL profitability for higher earners. Landlords in limited companies can still deduct full mortgage interest (corporate tax treatment). Many portfolio landlords have incorporated their properties, though this involves legal and stamp duty costs on transfer. Section 24 is the key regulation to understand when modelling BTL returns.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Best UK Cities for Rental Yield 2026</h3>
              <p>Northern English and Scottish cities consistently outperform London on rental yield: Liverpool and Glasgow offer 7-10% gross yields on properties priced £130,000-200,000. Manchester and Birmingham offer 5.5-7% on £200,000-250,000 properties. London offers 3.5-5% on £400,000-600,000 properties - capital appreciation historically compensated for lower yields, though this has moderated since 2022. Yorkshire cities (Leeds, Sheffield, Bradford) offer a yield-and-growth balance at 5.5-7% on £160,000-230,000 properties. HMOs in university cities (Nottingham, Sheffield) can achieve 8-12% gross yield with higher management requirements.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Rental Yield in Europe</h3>
              <p>European rental yields vary significantly: Germany (major cities) 3-5% gross, tightly regulated tenant protections and rising supply make Berlin and Munich less attractive than smaller cities. France has strong tenant rights and restrictive regulations - Paris yields 3-4%, though Lyon and Bordeaux offer 4-5%. Spain is increasingly regulated with rent caps in some regions - Barcelona and Madrid 4-5%, coastal towns 5-7%. Eastern Europe (Warsaw, Prague, Budapest) offers 5-7% yields with growing economies. Portugal (Lisbon, Porto) offers 4-6% with Golden Visa programme attracting international investors, though regulations are tightening.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Rental Yield Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A home purchased for $400,000 with 20% down at 6.5% over 30 years builds <strong>$250,000+</strong> in equity while appreciating at the historical 3.5% annual rate.
        </p>
        <p className="text-sm text-gray-600">
          Use this Rental Yield USA 2026 tool to compare buying vs renting, estimate ROI, and make data-driven real estate decisions.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Rental Yield Calculator Example (USA/UK 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, on a $420,000 US rental property with $2,800/month rent, your rental yield calculator USA UK 2026 shows gross yield, net yield after all expenses, and cash-on-cash return to judge if the investment makes sense.
        </p>
      </Card>

            <SEOContent
        title="Rental Yield Calculator – What Is the True Net Rental Yield on Your Property in 2026?"
        category="finance"
        intro={`Rental yield is the first number you calculate when evaluating a potential investment property — and it's important to calculate it correctly. Most amateur investors look at gross yield (annual rent / purchase price) and stop there. Professionals use net yield (annual rent minus all operating costs / purchase price) because the difference between the two is where investment properties that look attractive become cash-flow negative.

In the UK, gross buy-to-let yields in 2024 ranged from roughly 3-4% in London to 6-8% in Northern cities like Liverpool, Manchester, and Leeds. After deducting mortgage costs, letting agent fees, maintenance, void periods, and insurance, net yields are typically 1-3% in London (often negative after finance) and 3-5% in higher-yielding Northern cities.

For US residential rental, national average gross yields are approximately 5-8% depending on market. Net yields after expenses typically run 60-65% of gross yield — meaning a 6% gross yield property often generates a 3.5-4% net yield. Adding leverage through a mortgage transforms the net yield into cash-on-cash return, which can be significantly positive or negative depending on the interest rate environment.`}
        howItWorks={`Gross yield: (Annual rental income / Purchase price) × 100. For a property purchased at £250,000 generating £1,250/month rent: Annual income = £15,000. Gross yield = (£15,000 / £250,000) × 100 = 6%.

Net yield: (Annual rental income - Operating costs) / Purchase price × 100. Operating costs include letting agent fee (8-12% of rent), maintenance budget (1-1.5% of property value/year), landlord insurance, void allowance (4-8% of potential rent), and any service charges/ground rent. For the above: Annual costs ≈ £4,500. Net yield = (£15,000 - £4,500) / £250,000 = 4.2%.

Cash-on-cash return: (Annual cash flow after all costs including mortgage payments) / Cash invested. If mortgage payment is £800/month on a £187,500 loan (75% LTV): Annual mortgage = £9,600. Cash flow = £15,000 - £4,500 - £9,600 = £900. Cash invested = £62,500 (25% deposit + costs). Cash-on-cash = £900 / £62,500 = 1.4% — much lower than the gross yield suggests.`}
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
        tipsSection={`Calculate net yield before making any offer. The difference between 6% gross and 3% net is not a nuance — it's the difference between a potentially worthwhile investment and a money-losing one on a cash-flow basis. Get actual quotes for insurance, research typical maintenance costs for the property type and age, and use realistic void assumptions.

For UK landlords: factor in Section 24 tax changes if using a standard mortgage (not limited company ownership). Mortgage interest relief is limited to basic rate tax credit rather than full deduction — significantly reducing after-tax returns for higher-rate taxpayers using leveraged buy-to-let. Many UK investors have moved to limited company ownership to preserve full mortgage interest deductibility.

Location selection for yield vs appreciation: high-yield Northern cities typically offer better current income but lower long-term appreciation. London and South East offer lower yields but better appreciation history. Model both the yield and expected appreciation in your total return calculation.`}
        conclusion={`Rental yield is just the starting point — total return includes rent growth over time, mortgage paydown (equity buildup), appreciation, and any value-add from renovations. A 4% net yield with strong rent growth in an undersupplied market can produce excellent total returns. A 6% net yield in a declining market with rising voids can still disappoint.

For comprehensive buy-to-let analysis in the UK, compare against [our UK Buy-to-Let vs Stocks Calculator](/calculators/finance/uk-buy-to-let-vs-stocks-calculator) to evaluate whether direct property investment makes more sense than equivalent index fund investment given current yields, leverage, and appreciation expectations.`}

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
          { name: "Real Estate ROI Calculator", href: "/calculators/finance/real-estate-roi-calculator", icon: "🏠", desc: "Free calculator" },          { name: "REIT vs Direct Property USA Calculator", href: "/calculators/finance/reit-vs-direct-property-usa-calculator", icon: "🏢", desc: "Free calculator" },          { name: "S&P500 vs Real Estate USA Calculator", href: "/calculators/finance/sp500-vs-real-estate-usa-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Home Affordability Calculator", href: "/calculators/finance/home-affordability-calculator", icon: "💰", desc: "Free calculator" },          { name: "Rent vs Buy Calculator", href: "/calculators/finance/rent-vs-buy-calculator", icon: "🔄", desc: "Free calculator" },          { name: "HELOC Calculator", href: "/calculators/finance/heloc-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "Down Payment Calculator", href: "/calculators/finance/down-payment-calculator", icon: "💵", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
