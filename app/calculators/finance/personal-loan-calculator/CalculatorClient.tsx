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
  const [principal, setPrincipal] = useState(500000)
  const [rate, setRate] = useState(14)
  const [tenure, setTenure] = useState(36)

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
    <CalculatorLayout title="Personal Loan Calculator USA 2026" description="Calculate monthly payment, total interest, and amortization for any personal loan." icon="💳" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
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
           <ResultCard 
  label="Tenure" 
  value={`${Math.floor(tenure / 12)}yr ${tenure % 12}mo`} 
  icon={<Calendar className="w-4 h-4" />} 
/>
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
          <h2 className="text-xl font-black text-gray-900 mb-4">Personal Loan Calculator - True Cost and Smart Borrowing Guide USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">What is a Personal Loan and When Should You Use It?</h3>
              <p>A personal loan is an unsecured loan (no collateral required) offered by banks and NBFCs for any purpose - medical emergency, home renovation, wedding, travel, debt consolidation. Approval is based purely on creditworthiness (income, CIBIL score, employer, existing obligations). Interest rates range from 10.5% (best credit score at top banks) to 36%+ (fintech lenders for poor credit). The key advantage: quick disbursal (24-72 hours digitally). The key disadvantage: highest interest rate among secured loans. Personal loans should be a last resort after exhausting lower-cost options like home loan top-up (8-9%), loan against FD (1-2% above FD rate), or loan against securities.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">How CIBIL Score Affects Personal Loan Interest Rate</h3>
              <p>Your CIBIL score determines your personal loan fate: 750-900: Premium rates (10.5-14%), easy approval, highest loan amount. 700-749: Good rates (13-18%), approval likely with documentation. 650-699: Average rates (17-24%), may need co-applicant or salary proof. 600-649: Poor rates (24-36%), often only approved by NBFCs/fintechs. Below 600: Likely rejection by banks; only high-cost digital lenders may approve. Tips to improve CIBIL: Pay all EMIs and credit card bills on time (most impactful), maintain credit utilization below 30%, don't apply for multiple loans simultaneously (each hard inquiry lowers score slightly), and maintain old credit cards to build credit history length.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Personal Loan vs Credit Card EMI - Key Differences</h3>
              <p>When you need to finance a large purchase, compare these options: Personal Loan: Fixed interest rate (10.5-24%), fixed EMI, clear repayment timeline. Best for large amounts ($2-25 thousands). Credit Card EMI conversion: Often 12-18% (sometimes lower with offers), convenience of no separate application. Watch for processing fees. No-cost EMI (0% interest): Available on specific products through brand tie-ups - always check if price is inflated to cover the 'no cost.' Personal loan wins for: large amounts, medical emergencies, home renovation. Credit card EMI wins for: smaller amounts (under $1-2L), products already on credit card, when 0% offers are genuine.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Reducing Personal Loan Interest Burden</h3>
              <p>Five smart strategies to minimize personal loan costs: (1) Negotiate the rate - if you\'re a premium customer with high salary and good CIBIL, banks have more flexibility than published rates. (2) Pre-close when possible - most personal loans allow prepayment after 6-12 months with 2-4% penalty. Even with the penalty, pre-closing saves money. (3) Choose shorter tenure - a 24-month term at 15% vs 48 months saves significant total interest. (4) Consider overdraft facility - for recurring short-term needs, bank overdraft against FD or property is cheaper (9-12%) than personal loans. (5) Balance transfer - if your credit score improved after taking the loan, switch to a lower-rate lender.</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Personal Loan Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A $25,000 loan at 8% APR over 5 years results in monthly payments of approximately <strong>$507</strong> with total interest of $4,420.
        </p>
        <p className="text-sm text-gray-600">
          Use this Personal Loan USA 2026 tool to compare different loan scenarios and find the fastest, cheapest path to debt freedom.
        </p>
      </Card>
      <SEOContent
        title="Personal Loan Calculator USA – What Is Your Monthly Personal Loan Payment in 2026?"
        category="finance"
        intro={`Personal loans are unsecured installment debt — unlike mortgages and auto loans, there's no collateral backing them. This means the lender's only recourse if you default is suing you and damaging your credit — which is why personal loan rates are substantially higher than secured debt, typically ranging from 8% to 36% APR depending on credit score and lender.

Personal loans have a legitimate role in financial planning: consolidating higher-interest credit card debt at a lower rate, funding home improvements without using home equity, covering specific one-time expenses (medical bills, relocation costs), or bridging a known cash flow gap when you have specific repayment certainty. The misuse is treating a personal loan as consumption financing — borrowing for lifestyle spending that your income doesn't support.

The interest rate on a personal loan is largely determined by your credit score and debt-to-income ratio. A 750+ credit score might qualify for 8-12% from a bank or credit union; a 650 score might see 18-24%. This means improving your credit score before borrowing (if you can wait) is often worth more than shopping aggressively between lenders at the same credit profile.`}
        howItWorks={`Monthly payment: PMT = P × r(1+r)^n / [(1+r)^n - 1], where P = loan amount, r = monthly rate (APR/12), n = total months. For a $15,000 personal loan at 12% APR for 36 months: r = 1%, n = 36. PMT = $15,000 × 0.01 × (1.01)^36 / [(1.01)^36 - 1] = $498/month.

Total interest: (Monthly payment × number of payments) - principal. For above: ($498 × 36) - $15,000 = $2,928 total interest.

Origination fees: Many personal loan lenders charge 1-6% of loan amount as an origination fee, deducted from disbursement. A $15,000 loan with 3% origination gives you $14,550 but you still make payments on $15,000. The APR calculation legally required by lenders incorporates these fees — always compare APRs, not just interest rates.`}
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
        tipsSection={`Shop multiple lenders before accepting a personal loan. Rates vary significantly: online lenders (SoFi, LightStream, Discover), credit unions (often lowest rates for members), and traditional banks all have different pricing. Prequalification (soft credit pull) lets you compare real rate offers without affecting your credit score.

For credit card consolidation: compare the personal loan's total interest cost against what you'd pay continuing to make accelerated credit card payments. If your discipline and payment amount stay the same, the credit card paydown (especially via avalanche method) often costs similar total interest to a consolidation loan — and doesn't require a new debt obligation.

Prepayment flexibility matters: check whether your specific personal loan has prepayment penalties. Many online lenders offer no prepayment penalty; some traditional lenders do penalize early payoff. If you might pay it off early, this term matters for total cost comparison.`}
        conclusion={`The most important personal loan calculation is whether you actually need to borrow. For non-emergency expenses, a disciplined savings approach avoids interest entirely. For genuine financial emergencies without other options, personal loans are far better than credit cards (lower rates) or payday loans (predatory rates of 400%+ APR).

If you're considering a personal loan to consolidate credit card debt, commit to not re-accumulating the credit card balances after consolidation. This is the pattern that turns a debt management solution into a debt multiplication problem — consolidating, then running balances back up, and ending up with more total debt than before.`}

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
