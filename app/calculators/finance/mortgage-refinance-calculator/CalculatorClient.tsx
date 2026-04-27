'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { calculateMortgageRefinance } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()
  const [currentBalance, setCurrentBalance] = useState(280000)
  const [currentRate, setCurrentRate] = useState(7.5)
  const [remainingMonths, setRemainingMonths] = useState(300)
  const [newRate, setNewRate] = useState(6.0)
  const [newTermMonths, setNewTermMonths] = useState(360)
  const [closingCosts, setClosingCosts] = useState(5000)

  const result = useMemo(() => calculateMortgageRefinance(currentBalance, currentRate, remainingMonths, newRate, newTermMonths, closingCosts), [currentBalance, currentRate, remainingMonths, newRate, newTermMonths, closingCosts])

  const chartData = [
    { name: 'Current Mortgage', interest: result.interestSavedCurrent, fill: '#ef4444' },
    { name: 'After Refinance', interest: result.interestSavedNew, fill: '#16a34a' },
  ]

  return (
    <CalculatorLayout title="Mortgage Refinance Calculator USA 2026" description="Calculate monthly savings, break-even month, and total interest saved from refinancing." icon="🔄" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Mortgage Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Loan Balance</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={currentBalance} onChange={e => setCurrentBalance(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500" /></div>
            </div>
            {[
              { label: `Current Rate: ${currentRate}%`, val: currentRate, set: setCurrentRate, min: 1, max: 15, step: 0.25, color: 'text-red-500', accent: 'accent-red-500' },
              { label: `Remaining Term: ${Math.round(remainingMonths/12)} years`, val: remainingMonths, set: setRemainingMonths, min: 12, max: 360, step: 12, color: 'text-gray-700', accent: 'accent-gray-500' },
              { label: `New Rate: ${newRate}%`, val: newRate, set: setNewRate, min: 1, max: 12, step: 0.25, color: 'text-green-600', accent: 'accent-green-600' },
              { label: `New Term: ${Math.round(newTermMonths/12)} years`, val: newTermMonths, set: setNewTermMonths, min: 60, max: 360, step: 60, color: 'text-green-600', accent: 'accent-green-600' },
            ].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-semibold text-gray-700 mb-1"><span className={f.color}>{f.label}</span></label>
                <input type="range" min={f.min} max={f.max} step={f.step} value={f.val} onChange={e => f.set(Number(e.target.value))} className={`w-full ${f.accent}`} />
              </div>
            ))}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Closing Costs</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={closingCosts} onChange={e => setClosingCosts(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500" /></div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* Verdict */}
          <div className={`rounded-2xl border p-5 ${result.worthRefinancing ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p className="text-sm text-gray-500">Should you refinance?</p>
                <p className={`text-2xl font-black ${result.worthRefinancing ? 'text-green-700' : 'text-orange-600'}`}>{result.worthRefinancing ? '✅ Yes - refinance saves money' : '⚠️ Not worth it currently'}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Break-Even</p>
                <p className="text-2xl font-black text-gray-900">{result.breakEvenMonths ? `${result.breakEvenMonths} months` : 'N/A'}</p>
                <p className="text-xs text-gray-500">{result.breakEvenMonths ? `~${(result.breakEvenMonths / 12).toFixed(1)} years` : 'Monthly payment increases'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Current Payment" value={fmt(result.currentPayment)} subValue="Monthly" />
            <ResultCard label="New Payment" value={fmt(result.newPayment)} subValue="Monthly" highlight={result.newPayment < result.currentPayment} />
            <ResultCard label="Monthly Savings" value={fmt(result.monthlySavings)} subValue="Per month" highlight={result.monthlySavings > 0} />
            <ResultCard label="Net Savings" value={fmt(result.netSavings)} subValue="After closing costs" highlight={result.netSavings > 0} />
          </div>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Total Interest Paid: Before vs After</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={120} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Interest Paid']} />
                <Bar dataKey="interest" radius={[0, 8, 8, 0]}>
                  {chartData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Mortgage Refinance Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A $350,000 mortgage at 6.5% over 30 years results in a monthly payment of approximately <strong>$2,212</strong> with total interest paid of $446,320.
        </p>
        <p className="text-sm text-gray-600">
          Use this Mortgage Refinance USA 2026 tool to compare different loan amounts, interest rates, and terms to find your best option.
        </p>
      </Card>
      <SEOContent
        title="Mortgage Refinance Calculator USA – Is It Worth Refinancing Your Mortgage in 2026?"
        category="finance"
        intro={`Refinancing a mortgage makes sense when the interest savings over your expected remaining tenure in the home outweigh the closing costs. The break-even analysis is the central question: how many months until the monthly savings from a lower payment pay back the upfront cost of refinancing? If you'll stay in the home past that break-even point, refinancing saves money.

The break-even calculation seems simple but has important nuances. Closing costs for a refinance typically run 2-5% of the loan amount ($4,000-$10,000 on a $200,000 balance). Your monthly savings from a lower payment are straightforward to calculate. Break-even = closing costs ÷ monthly savings. If closing costs are $6,000 and monthly savings are $300, break-even is 20 months.

But this simple calculation ignores that you're restarting the amortization clock. When you refinance a 30-year mortgage you've been paying for 8 years, you have 22 years remaining on your existing loan. A new 30-year refinance extends your payback period by 8 years — which costs significant total interest even at the lower rate. The true comparison considers both the rate savings and the term extension.`}
        howItWorks={`Monthly payment savings: Current payment - new payment = monthly savings. Both payments calculated using standard amortization formula PMT = P × r(1+r)^n / [(1+r)^n - 1].

Break-even period: Closing costs ÷ monthly savings = months to break even. A $6,000 closing cost with $250/month savings = 24 months break-even. If you stay in the home beyond 2 years, refinancing saves money.

True total cost comparison: Sum of all remaining payments on existing loan vs sum of all payments on new loan. This reveals the term extension cost. Refinancing from 22 remaining years to a new 30 years at a lower rate may cost more total interest even though monthly payments are lower. Refinancing to the same remaining term (22 years) or shorter eliminates this issue.`}
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
        tipsSection={`Consider a shorter-term refinance if you can afford the higher payment. Refinancing a 30-year to a 15-year typically gets a significantly lower rate (often 0.5-0.75% lower than 30-year) AND reduces total interest dramatically. The payment is higher but the total interest savings over the loan lifetime can be $80,000-$150,000 on a typical mortgage.

No-closing-cost refinances are not free — the lender recoups costs through a higher interest rate (typically 0.25-0.5% higher). For people who aren't sure how long they'll stay in the home, this trade-off may be acceptable: no upfront cost, slightly higher rate, indefinite break-even.

For investment properties, refinancing to pull out equity can fund additional real estate investments. The key calculation: does the after-tax cost of the refinanced debt (mortgage interest deductible for investment properties) compare favorably to the expected return on the deployed capital?`}
        conclusion={`Mortgage refinancing decisions in 2024-2026 are complicated by the lock-in effect: homeowners who refinanced at 2.5-3.5% rates during 2020-2021 effectively have a below-market mortgage that eliminates most refinancing rationale at current 6-7% rates. These homeowners are often reluctant to sell for the same reason.

For people who purchased with a 7%+ rate in 2023-2024 and rates subsequently fall, the rule of thumb of 'refinance when rates drop 1%' remains useful as a first-pass filter — though the break-even analysis should always confirm the decision. Use [our Mortgage Calculator](/calculators/finance/mortgage-calculator) to model your full amortization schedule alongside this refinance analysis.`}

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
            { name: "Down Payment Calculator", href: "/calculators/finance/down-payment-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Rent vs Buy Calculator", href: "/calculators/finance/rent-vs-buy-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Mortgage Refinance Calculator", href: "/calculators/finance/mortgage-refinance-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Home Affordability Calculator", href: "/calculators/finance/home-affordability-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Net Worth Calculator", href: "/calculators/finance/net-worth-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Home Loan Calculator", href: "/calculators/finance/home-loan-calculator", icon: "🏠", desc: "Free calculator" },          { name: "Biweekly Mortgage Calculator", href: "/calculators/finance/biweekly-mortgage-calculator", icon: "📅", desc: "Free calculator" },          { name: "Down Payment Calculator", href: "/calculators/finance/down-payment-calculator", icon: "💵", desc: "Free calculator" },          { name: "Closing Cost Calculator", href: "/calculators/finance/closing-cost-calculator", icon: "📋", desc: "Free calculator" },          { name: "Home Affordability Calculator", href: "/calculators/finance/home-affordability-calculator", icon: "💰", desc: "Free calculator" },          { name: "HELOC Calculator", href: "/calculators/finance/heloc-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "Rent vs Buy Calculator", href: "/calculators/finance/rent-vs-buy-calculator", icon: "🔄", desc: "Free calculator" },          { name: "Cash Out Refinance vs HELOC Calculator", href: "/calculators/finance/cash-out-refinance-vs-heloc-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage vs Renting USA Calculator", href: "/calculators/finance/mortgage-vs-renting-usa-calculator", icon: "📊", desc: "Free calculator" },          { name: "Pay Off Mortgage vs Invest Calculator", href: "/calculators/finance/pay-off-mortgage-vs-invest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Loan Prepayment Calculator", href: "/calculators/finance/loan-prepayment-calculator", icon: "⚡", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
