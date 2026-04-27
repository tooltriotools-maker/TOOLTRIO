'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateLeaseVsBuy } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { Car, DollarSign, TrendingDown, Award } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()

  // Buy inputs
  const [vehiclePrice, setVehiclePrice] = useState(1500000)
  const [downPayment, setDownPayment] = useState(300000)
  const [loanRate, setLoanRate] = useState(9)
  const [loanYears, setLoanYears] = useState(5)
  const [residualValue, setResidualValue] = useState(600000)

  // Lease inputs
  const [leaseMonthly, setLeaseMonthly] = useState(25000)
  const [leaseYears, setLeaseYears] = useState(3)

  // Additional costs
  const [insuranceDiff, setInsuranceDiff] = useState(2000)
  const [maintenanceDiff, setMaintenanceDiff] = useState(1500)

  const r = useMemo(() =>
    calculateLeaseVsBuy(vehiclePrice, downPayment, loanRate, loanYears, leaseMonthly, leaseYears, residualValue, insuranceDiff, maintenanceDiff),
    [vehiclePrice, downPayment, loanRate, loanYears, leaseMonthly, leaseYears, residualValue, insuranceDiff, maintenanceDiff]
  )

  const winner = r.betterOption
  const winnerSaving = r.saving

  return (
    <CalculatorLayout title="Lease vs Buy Car Calculator USA 2026" description="Compare total 5-year cost of leasing vs financing a vehicle including residual value and fees." icon="🚘" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Inputs */}
        <div className="space-y-4">
          {/* Buy */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center"><Car className="w-4 h-4 text-white" /></div>
              <h2 className="text-sm font-black text-blue-700">BUY Option</h2>
            </div>
            <div className="space-y-3">
              <InputField label="Vehicle / Asset Price" value={vehiclePrice} onChange={setVehiclePrice} min={100000} max={100000000} step={50000} prefix={currency.symbol} />
              <InputField label="Down Payment" value={downPayment} onChange={setDownPayment} min={0} max={vehiclePrice} step={10000} prefix={currency.symbol} />
              <InputField label="Loan Interest Rate" value={loanRate} onChange={setLoanRate} min={5} max={24} step={0.25} suffix="%" />
              <InputField label="Loan Tenure" value={loanYears} onChange={setLoanYears} min={1} max={10} step={1} suffix="Yr" />
              <InputField label="Resale / Residual Value" value={residualValue} onChange={setResidualValue} min={0} max={vehiclePrice} step={10000} prefix={currency.symbol} />
            </div>
          </Card>

          {/* Lease */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center"><Car className="w-4 h-4 text-white" /></div>
              <h2 className="text-sm font-black text-purple-700">LEASE Option</h2>
            </div>
            <div className="space-y-3">
              <InputField label="Monthly Lease Payment" value={leaseMonthly} onChange={setLeaseMonthly} min={1000} max={1000000} step={500} prefix={currency.symbol} />
              <InputField label="Lease Duration" value={leaseYears} onChange={setLeaseYears} min={1} max={7} step={1} suffix="Yr" />
            </div>
          </Card>

          {/* Additional costs */}
          <Card>
            <h2 className="text-sm font-black text-gray-700 mb-3">Monthly Cost Differences</h2>
      </Card>
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Lease Vs Buy Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Lease Vs Buy USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Lease vs Buy Car Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, on a $40,000 SUV, your lease vs buy car calculator USA 2026 compares the exact 5-year total cost of leasing vs buying — showing which option saves more based on your driving habits.
        </p>
      </Card>

            <SEOContent
        title="Lease vs Buy Car Calculator USA – Is It Cheaper to Lease or Buy Your Next Vehicle in 2026?"
        category="finance"
        intro={`Leasing versus buying a car is one of the most frequently misunderstood financial decisions, partly because dealers are incentivized to present leasing in a way that emphasizes the lower monthly payment while obscuring total cost. A lease payment is lower because you're only paying for the car's depreciation during the lease term plus a finance charge — not the full value of the vehicle. The question is whether that structure serves your actual needs.

Leasing makes most financial sense when: you drive fewer miles than average (most leases cap at 10,000-15,000 miles/year), you prefer a new car every 2-3 years, the specific model depreciates quickly (making residual-value risk real), or you're a business owner who can deduct lease payments as a business expense. Leasing makes least financial sense for people who drive heavily, keep cars long-term, or want to build equity in a paid-off asset.

The true comparison isn't lease payment vs loan payment — it's total 10-year cost of leasing-and-returning three consecutive times versus buying one car and driving it until it's paid off. That 10-year comparison almost always favors buying, often by $15,000-$30,000.`}
        howItWorks={`Lease cost calculation: (Net cap cost - residual value + fees) / lease term = depreciation component per month. Finance charge: (Net cap cost + residual value) × money factor × 12 = annual interest equivalent. Total monthly payment = depreciation + finance charge + taxes.

Buy cost calculation: Down payment + (loan payment × months) + estimated maintenance and repairs over holding period. At end of loan, vehicle has residual value that partially offsets total cost.

Break-even analysis: Leasing costs are linear (constant outflow). Buying has higher initial cost but then the loan ends, leaving you with a paid-off asset. The break-even point — when buying becomes clearly cheaper — typically falls at 4-5 years for most vehicles. Holding a paid-off car for even 2-3 more years after payoff dramatically favors buying.`}
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
        tipsSection={`Always negotiate the capitalized cost (selling price) of a lease before discussing lease terms. The lower the cap cost, the lower your lease payment. Many lessees don't realize the sale price is fully negotiable in a lease — the same as buying.

Watch for disposition fees, excess wear-and-tear charges, and mileage overage fees at lease end. These can add $500-$3,000+ in unexpected costs. Read the lease contract's wear-and-tear definition carefully — normal dents and stone chips may be charged.

For business leases: lease payments may be 100% deductible as a business expense (subject to luxury limits). Consult a tax professional to compare the after-tax cost of leasing versus Section 179 deduction for vehicle purchase.`}
        conclusion={`The financially optimal car strategy for most households over a 15-20 year period: buy a reliable, 2-4 year old vehicle outright (or with a short loan), maintain it well, and drive it for 8-10 years. The wealth difference between this strategy and continuously leasing new vehicles is substantial — potentially $100,000+ over a working career.

For business owners who genuinely drive frequently, prefer new vehicles for client impressions, and can fully deduct lease payments, leasing becomes competitive or advantageous. For individual consumers without business deductibility, it rarely is on a total-cost basis.`}

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
      </div>
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Auto Loan Calculator", href: "/calculators/finance/auto-loan-calculator", icon: "🚗", desc: "Free calculator" },          { name: "Car Loan Calculator", href: "/calculators/finance/car-loan-calculator", icon: "🚙", desc: "Free calculator" },          { name: "Car Depreciation Calculator", href: "/calculators/finance/car-depreciation-calculator", icon: "📉", desc: "Free calculator" },          { name: "Loan Comparison Calculator", href: "/calculators/finance/loan-comparison-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Interest Rate Calculator", href: "/calculators/finance/interest-rate-calculator", icon: "📈", desc: "Free calculator" },          { name: "Payoff Date Calculator", href: "/calculators/finance/payoff-date-calculator", icon: "📅", desc: "Free calculator" },          { name: "Personal Loan Calculator", href: "/calculators/finance/personal-loan-calculator", icon: "💳", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },
          ]}
        />
      </div>
    </CalculatorLayout>
  )
}
