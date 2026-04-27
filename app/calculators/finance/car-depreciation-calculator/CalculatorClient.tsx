'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from 'recharts'
import { calculateCarDepreciation } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const VEHICLE_TYPES = [
  { label: '🚗 Economy (Honda, Toyota)', value: 'economy' as const },
  { label: '🚙 Standard (Chevy, Ford)', value: 'standard' as const },
  { label: '🛻 Truck/SUV (F-150, RAV4)', value: 'truck' as const },
  { label: '🏎️ Luxury (BMW, Mercedes)', value: 'luxury' as const },
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [purchasePrice, setPurchasePrice] = useState(35000)
  const [age, setAge] = useState(3)
  const [makeType, setMakeType] = useState<'luxury' | 'standard' | 'economy' | 'truck'>('standard')
  const [mileagePerYear, setMileagePerYear] = useState(15000)

  const result = useMemo(() => calculateCarDepreciation(purchasePrice, age, makeType, mileagePerYear),
    [purchasePrice, age, makeType, mileagePerYear])

  const fmt = (v: number) => `$${Math.round(v).toLocaleString()}`

  // Multi-car comparison
  const comparison = (['economy', 'standard', 'truck', 'luxury'] as const).map(type => {
    const r = calculateCarDepreciation(purchasePrice, age, type, mileagePerYear)
    return { type: type.charAt(0).toUpperCase() + type.slice(1), value: r.currentValue, retained: r.retainedPct }
  })
  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444']

  return (
    <CalculatorLayout title="Car Depreciation Calculator USA 2026" description="Calculate how much your vehicle loses in value per year and the true total cost of ownership." icon="🚗" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Vehicle Details</h2>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Purchase Price</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Vehicle Type</label>
            <div className="space-y-1.5">
              {VEHICLE_TYPES.map(t => (
                <button key={t.value} onClick={() => setMakeType(t.value)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${makeType === t.value ? 'bg-green-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">Current Age</label>
              <span className="text-xs font-bold text-gray-700">{age} year{age > 1 ? 's' : ''} old</span>
            </div>
            <input type="range" min={1} max={15} value={age} onChange={e => setAge(Number(e.target.value))} className="w-full accent-green-500" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">Annual Mileage</label>
              <span className={`text-xs font-bold ${mileagePerYear > 15000 ? 'text-amber-600' : 'text-green-600'}`}>{mileagePerYear.toLocaleString()} mi/yr</span>
            </div>
            <input type="range" min={5000} max={30000} step={1000} value={mileagePerYear} onChange={e => setMileagePerYear(Number(e.target.value))} className="w-full accent-green-500" />
            <div className="flex justify-between text-xs text-gray-400"><span>5k</span><span>Avg: 15k</span><span>30k</span></div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500">Value Lost</p>
              <p className="text-lg font-black text-red-600">{fmt(result.totalDepreciation)}</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500">Retained</p>
              <p className="text-lg font-black text-green-700">{result.retainedPct}%</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Current Value" value={fmt(result.currentValue)} highlight />
            <ResultCard label="Value Lost" value={fmt(result.totalDepreciation)} subValue={`${100 - result.retainedPct}% depreciated`} />
            <ResultCard label="Cost Per Mile" value={`$${result.costPerMile.toFixed(3)}`} subValue="depreciation only" />
            <ResultCard label="Value Retained" value={`${result.retainedPct}%`} subValue={`of $${purchasePrice.toLocaleString()}`} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Depreciation Curve - {age} Year Value</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="valGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="depGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Age (Years)', position: 'insideBottomRight', fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={60} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="value" name="Current Value" stroke="#22c55e" strokeWidth={2.5} fill="url(#valGrad)" />
                  <Area type="monotone" dataKey="depreciation" name="Cumul. Depreciation" stroke="#ef4444" strokeWidth={1.5} fill="url(#depGrad)" strokeDasharray="4 2" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Resale Value by Vehicle Type at {age} Years</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparison} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="type" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={60} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number, name) => [name === 'retained' ? `${v}%` : fmt(v), name === 'retained' ? 'Value Retained' : 'Current Value']} />
                  <Bar dataKey="value" name="Resale Value" radius={[4, 4, 0, 0]} label={{ position: 'top', fontSize: 10, fill: '#374151', formatter: (v: number) => `${Math.round(v / purchasePrice * 100)}%` }}>
                    {comparison.map((e, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Car Depreciation Calculator - The Real Cost of Vehicle Ownership USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Why Depreciation Is Your Biggest Car Expense</h3>
              <p>Most drivers focus on gas and insurance as their primary car costs, but depreciation is typically the largest single expense of car ownership. A $40,000 car losing 50% of value over 5 years costs $4,000/year in depreciation - more than insurance ($1,700/year average) or gasoline ($1,800/year average). This is a real cost even though no check is written: it is the difference between what you paid and what you get when you sell. Understanding depreciation is critical to making smart car-buying decisions.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">1-2 Year Old Used Cars: The Sweet Spot</h3>
              <p>Buying a 1-2 year old car lets someone else absorb the steepest depreciation curve. A $45,000 new SUV might be available for $32,000 with 15,000 miles - the original owner absorbed $13,000 in depreciation. You get essentially the same vehicle with minimal wear at 29% savings. The optimal used-car age for most buyers is 2-3 years old: major depreciation absorbed, original factory warranty often still partially active, financing still available at near-new rates, and typically well-maintained (still under original owner).</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Cars That Hold Value Best in 2026</h3>
              <p>Trucks and utility vehicles historically retain value better than sedans. The Toyota Tacoma routinely retains 65-70% of value after 5 years - exceptional among all vehicles. Jeep Wrangler, Toyota 4Runner, and Subaru Outback also top the resale value charts. Luxury vehicles depreciate fastest: a $70,000 BMW 5-Series might be worth $28,000 after 5 years (40% retained). EVs are mixed - Tesla Model 3 retains value well while many other EVs depreciate faster due to rapid battery technology improvement making older models less competitive.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Mileage and Depreciation</h3>
              <p>Average annual mileage is approximately 15,000 miles. Each 10,000 miles above average reduces value by 1-2% on top of age-based depreciation. A 3-year-old car with 65,000 miles (vs average 45,000) might be worth $2,000-3,000 less on a $30,000 vehicle. High-mileage cars from reliability leaders like Toyota and Honda can be exceptional values - a 150,000-mile Camry or Civic with good service records can be extremely reliable transportation at low cost. CarFax or AutoCheck reports verify mileage history before purchase.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Car Depreciation Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Car Depreciation USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent
        title="Car Depreciation Calculator USA – How Much Value Is Your Car Losing Every Year in 2026?"
        category="finance"
        intro={`Your car's total cost of ownership extends far beyond the monthly payment — and depreciation is the biggest cost most people never see. A new $40,000 vehicle loses roughly $8,000-$10,000 in value in its first year alone, and loses about 50% of its value over the first three years. Unlike a loan payment, this cost doesn't appear in your bank statement. But it's real money leaving your net worth every day you own the vehicle.

The true cost of a car includes depreciation, interest on financing, insurance, fuel, maintenance, registration, and taxes. When you add all of these together for a new $40,000 vehicle, the 5-year total cost often exceeds $60,000-$70,000 — even if the sticker price and monthly payment don't suggest it.

The best financial decision in most car purchases is buying a 2-4 year old used vehicle. You avoid the steepest part of the depreciation curve, most models have been reliable long enough to identify any systemic issues, and financing rates for used cars are comparable to new in most market conditions.`}
        howItWorks={`Depreciation uses the MACRS or declining balance method for most consumer vehicles. Typical depreciation rates: Year 1: 15-25% of purchase price (luxury/sports cars depreciate faster), Years 2-3: 10-15%/year, Years 4-5: 8-12%/year, leveling off to 5-8%/year thereafter.

Residual value estimation: RV = Purchase Price × (1 - depreciation rate)^years, adjusted for mileage and condition. Every 1,000 miles above average (12,000-15,000/year) reduces resale value by approximately $100-$150 for most makes.

Cost per mile calculation: Total ownership costs (depreciation + financing + insurance + maintenance + fuel) ÷ total miles driven = true cost per mile. This ranges from $0.40-$0.80/mile for most vehicles, with luxury and performance vehicles easily exceeding $1.00/mile.`}
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
        tipsSection={`Compare total cost of ownership across vehicle options, not just purchase price or monthly payment. A $5,000 more expensive vehicle with lower insurance, better fuel economy, and lower maintenance costs often beats a cheaper vehicle on total 5-year cost.

Consider the breakeven point for electric vehicles. EVs have higher purchase prices but dramatically lower fuel and maintenance costs. At current electricity and gas prices, most EVs break even on total cost of ownership within 3-6 years in typical driving patterns.

For leasing vs buying: leasing is essentially paying for the depreciation during the lease term plus a financing charge. If the vehicle depreciates slowly (Toyotas, Hondas), buying is typically more economical. If it depreciates quickly (most luxury brands), leasing can be more economical. Use [our Lease vs Buy Calculator](/calculators/finance/lease-vs-buy-calculator).`}
        conclusion={`Depreciation should factor into every car purchase decision, not just payment affordability. A salesperson will focus on monthly payment; your focus should be on total 5-year ownership cost including depreciation. The psychology of monthly payments obscures the true financial impact.

For most people, the financially optimal car strategy is: buy a reliable, 3-year-old Japanese or Korean vehicle with a good reliability record, drive it for 8-10 years, and invest the difference between that cost and a new car payment in index funds. The wealth difference between this approach and new car buying every 5 years over a lifetime is significant.`}

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
          { name: "Auto Loan Calculator", href: "/calculators/finance/auto-loan-calculator", icon: "🚗", desc: "Free calculator" },          { name: "Car Loan Calculator", href: "/calculators/finance/car-loan-calculator", icon: "🚙", desc: "Free calculator" },          { name: "Lease vs Buy Calculator", href: "/calculators/finance/lease-vs-buy-calculator", icon: "🔑", desc: "Free calculator" },          { name: "Loan Comparison Calculator", href: "/calculators/finance/loan-comparison-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Interest Rate Calculator", href: "/calculators/finance/interest-rate-calculator", icon: "📈", desc: "Free calculator" },          { name: "Payoff Date Calculator", href: "/calculators/finance/payoff-date-calculator", icon: "📅", desc: "Free calculator" },          { name: "Personal Loan Calculator", href: "/calculators/finance/personal-loan-calculator", icon: "💳", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
