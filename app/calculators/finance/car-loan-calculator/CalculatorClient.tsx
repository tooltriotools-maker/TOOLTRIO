'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts'
import { calculateEMI } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, TrendingUp, Calendar, Percent } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [principal, setPrincipal] = useState(800000)
  const [rate, setRate] = useState(9)
  const [tenure, setTenure] = useState(60)

  const result = useMemo(() => calculateEMI(principal, rate, tenure), [principal, rate, tenure])
  const r = result as any

  const pie = [
    { name: 'Principal', value: principal, color: '#93c5fd' },
    { name: 'Interest', value: r.totalInterest || 0, color: '#16a34a' },
  ]

  // Annual data
  const annualData: any[] = []
  if (r.schedule) {
    for (let y = 1; y <= Math.ceil(tenure / 12); y++) {
      const monthsInYear = r.schedule.slice((y - 1) * 12, y * 12)
      const principalPaid = monthsInYear.reduce((s: number, m: any) => s + m.principal, 0)
      const interestPaid = monthsInYear.reduce((s: number, m: any) => s + m.interest, 0)
      const balance = monthsInYear[monthsInYear.length - 1]?.balance || 0
      annualData.push({ year: y, principal: Math.round(principalPaid), interest: Math.round(interestPaid), balance: Math.round(balance) })
    }
  }

  return (
    <CalculatorLayout title="Car Loan Calculator USA 2026" description="Calculate your exact monthly car payment, total interest, and full amortization schedule." icon="🚗" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Loan Details</h2>
          <div className="space-y-5">
            <InputField label="Loan Amount" value={principal} onChange={setPrincipal} min={10000} max={50000000} step={10000} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={1} max={30} step={0.1} suffix="%" />
            <InputField label="Tenure (Months)" value={tenure} onChange={setTenure} min={6} max={120} step={6} suffix="Mo" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-green-50 border border-green-200 text-center">
            <p className="text-xs text-green-700 font-bold mb-1">Monthly EMI</p>
            <p className="text-2xl font-black text-green-700">{fmt(r.emi || 0)}</p>
            <p className="text-xs text-green-600 mt-0.5">for {tenure} months</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly EMI" value={fmt(r.emi || 0)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Total Interest" value={fmt(r.totalInterest || 0)} icon={<TrendingUp className="w-4 h-4" />} />
            <ResultCard label="Total Payment" value={fmt(r.totalPayment || 0)} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Tenure" value={"`${Math.floor(tenure/12)}yr ${tenure%12}mo`"} icon={<Calendar className="w-4 h-4" />} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Principal vs Interest</h3>
              <div style={{ height: 180 }} className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={3}>
                      {pie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4">
                {pie.map(e => <div key={e.name} className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full" style={{ background: e.color }} /><span className="text-xs text-gray-600 font-medium">{e.name}</span></div>)}
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Annual Principal vs Interest</h3>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={annualData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                    <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={55} />
                    <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [fmt(v), '']} />
                    <Bar dataKey="principal" name="Principal" fill="#93c5fd" radius={[4, 4, 0, 0]} stackId="a" />
                    <Bar dataKey="interest" name="Interest" fill="#16a34a" radius={[4, 4, 0, 0]} stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Amortization Schedule</h3>
            <div className="overflow-x-auto max-h-60 overflow-y-auto">
              <table className="calc-table">
                <thead><tr><th>Month</th><th>EMI</th><th>Principal</th><th>Interest</th><th>Balance</th></tr></thead>
                <tbody>{(r.schedule || []).map((row: any) => (
                  <tr key={row.month}><td className="text-gray-500">{row.month}</td><td>{fmt(row.emi)}</td><td className="text-blue-600">{fmt(row.principal)}</td><td className="text-green-600">{fmt(row.interest)}</td><td className="font-semibold text-gray-900">{fmt(row.balance)}</td></tr>
                ))}</tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Car Loan Calculator - Total Cost of Car Ownership in the US USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Car Loan Basics - Interest Rates and Eligibility</h3>
              <p>Car loans in the US are secured loans where the vehicle serves as collateral. Banks and NBFCs offer car loans for 80-100% of the vehicle's out-of-pocket price (LTV varies by lender). Loan tenure ranges from 1 to 7 years, with 5 years being most common. Interest rates in 2026 range from 8.5-12% for salaried individuals at major banks (HDFC, SBI, ICICI). NBFCs like Bajaj Auto Finance, Tata Capital typically charge 9.5-14%. Used car loans carry higher rates (12-18%) due to higher risk. Your credit score significantly impacts the rate offered - CIBIL score above 750 typically gets the best rates.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">On-Road Price vs Ex-Showroom - What You\'re Actually Paying</h3>
              <p>The car loan amount is based on the out-of-pocket price, which includes: Ex-showroom price (manufacturer\'s price), Road tax (8-12% of ex-showroom, varies by state and car type), Registration charges ($5,000-15,000 depending on state and vehicle cost), Third-party insurance (mandatory, $4,000-8,000/year), Accessories/extended warranty (optional, $20,000-1,00,000+). The out-of-pocket price can be 15-25% higher than ex-showroom. For a $10 thousand ex-showroom car, the out-of-pocket price in Mumbai might be $12-12.5 thousands. Always calculate EMI on out-of-pocket price, not ex-showroom.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Car Depreciation - The Hidden Cost of Ownership</h3>
              <p>Cars are one of the fastest depreciating assets. Typical Indian car depreciation (for insurance purposes): Year 1: 15-20% depreciation. Year 2: 15%. Year 3: 15%. Year 4-5: 10% each year. Year 5+: 5% per year. A $10 thousand car could be worth only $5-5.5 thousands after 5 years. This means by the time you finish your 5-year loan, the car is worth less than what you paid in total (car price + total interest). Understanding depreciation is critical: (1) Buy insurance for IDV (Insured Declared Value) not ex-showroom to avoid underinsurance. (2) Prefer low-depreciation brands (Maruti, Hyundai) over high-depreciation luxury cars if resale value matters.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Should You Take a Loan or Buy a Car Outright?</h3>
              <p>If you have the cash to buy outright, the math often favors taking a loan - but with caveats. Scenario: $10 thousand car, $10 thousand available in cash. If you invest $10 thousands in equity MF (12% CAGR for 5 years): grows to $17.6 thousands. Car loan at 9% for 5 years: total interest = $2.56 thousands. Net advantage of investing vs buying outright = $17.6 - $10 - $2.56 = $5 thousands better off. However, this assumes disciplined investing and ignores emotional comfort of being debt-free. For depreciating assets like cars, a short 3-year loan tenure is optimal - minimizes interest while maintaining investment flexibility.</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Car Loan Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A $25,000 loan at 8% APR over 5 years results in monthly payments of approximately <strong>$507</strong> with total interest of $4,420.
        </p>
        <p className="text-sm text-gray-600">
          Use this Car Loan USA 2026 tool to compare different loan scenarios and find the fastest, cheapest path to debt freedom.
        </p>
      </Card>
      <SEOContent
        title="Car Loan Calculator USA – What Is Your Monthly Car Payment Going to Be in 2026?"
        category="finance"
        intro={`Car loans are one of the most misunderstood consumer financial products. The advertised monthly payment is calculated after a down payment, for a specific term and rate — but most buyers negotiate around the monthly payment rather than the total cost, which is exactly what dealers prefer. Moving from a 48-month to a 72-month loan reduces the payment but increases total interest paid by thousands of dollars and leaves you owing more than the car is worth for years.

The total interest on a car loan is substantial even at low rates. A $30,000 loan at 6.5% for 60 months costs $4,977 in interest. The same loan for 72 months costs $6,085. Extending the term by just 12 months costs an extra $1,108 in interest — while also leaving you upside-down on the loan (owing more than the car's value) for an additional year.

Down payment size directly affects both your monthly payment and your risk of being underwater. Putting 15-20% down on a new vehicle means the loan balance stays below market value from day one — important if the car is totaled or you need to sell early.`}
        howItWorks={`Monthly payment formula: M = P × [r(1+r)^n] / [(1+r)^n - 1], where P = loan principal, r = monthly interest rate (APR/12), n = total months. This is identical to the mortgage amortization formula.

Total interest = (Monthly payment × number of payments) - loan principal. The ratio of interest to principal increases dramatically with term length at the same rate: 48 months at 6.5% pays 8% of principal as interest; 84 months at the same rate pays 20%.

Amortization front-loading: Like mortgages, car loans front-load interest. In month 1, most of your payment is interest; in the final months, most is principal. This is why prepaying early has a much larger impact on total interest paid than prepaying later.`}
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
        tipsSection={`Before going to a dealership, get pre-approved for a loan from your bank or credit union. Dealer financing can be convenient but often carries higher rates or hidden fees. Walking in with pre-approval gives you negotiating leverage and lets you compare the dealer's offer directly.

Negotiate the purchase price separately from the financing. Many buyers negotiate the monthly payment but allow the dealer to adjust term length to hit their target payment while charging a higher rate. Agree on a purchase price before discussing payment terms.

For used car loans, confirm the loan amount doesn't exceed the vehicle's book value (use Kelley Blue Book or Edmunds). Some lenders will finance more than a used car is worth, but that's a trap — you're immediately upside-down and paying interest on depreciation.`}
        conclusion={`The true monthly cost of a car includes more than the loan payment. Add insurance ($100-$300/month depending on vehicle and record), fuel, maintenance, and registration fees to your budgeting. Many first-time car buyers successfully qualify for the loan payment but are surprised by the total monthly burden.

The financially optimal new car buying strategy: put at least 20% down, choose the shortest term your budget allows (48 or 60 months), and buy a vehicle whose total payment (including insurance and other costs) doesn't exceed 15% of take-home pay. Use [our Lease vs Buy Calculator](/calculators/finance/lease-vs-buy-calculator) to compare whether leasing makes more sense for your driving patterns and vehicle preferences.`}

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
            { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Credit Card Payoff Calculator", href: "/calculators/finance/credit-card-payoff-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Paycheck Calculator", href: "/calculators/finance/paycheck-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Emergency Fund Calculator", href: "/calculators/finance/emergency-fund-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
      </div>
      
    </CalculatorLayout>
  )
}
