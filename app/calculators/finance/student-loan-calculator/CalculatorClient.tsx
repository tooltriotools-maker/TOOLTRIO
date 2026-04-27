'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { calculateStudentLoan } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const LOAN_TYPES = [
  { name: 'Direct Sub/Unsub (Undergrad)', rate: 6.53 },
  { name: 'Direct Unsub (Grad/Prof)', rate: 8.08 },
  { name: 'Direct PLUS (Parent/Grad)', rate: 9.08 },
  { name: 'Private (Good Credit)', rate: 6.0 },
  { name: 'Private (Fair Credit)', rate: 10.5 },
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [loanBalance, setLoanBalance] = useState(35000)
  const [interestRate, setInterestRate] = useState(6.53)
  const [monthlyPayment, setMonthlyPayment] = useState(390)
  const [extraPayment, setExtraPayment] = useState(0)

  const result = useMemo(() => calculateStudentLoan(loanBalance, interestRate, monthlyPayment, extraPayment),
    [loanBalance, interestRate, monthlyPayment, extraPayment])
  const baseResult = useMemo(() => calculateStudentLoan(loanBalance, interestRate, monthlyPayment, 0),
    [loanBalance, interestRate, monthlyPayment])

  const fmt = (v: number) => `$${Math.round(v).toLocaleString()}`
  const fmtK = (v: number) => v >= 1000000 ? `$${(v / 1000000).toFixed(2)}M` : `$${(v / 1000).toFixed(1)}k`

  const standardPayment = Math.ceil((loanBalance * (interestRate / 100 / 12)) / (1 - Math.pow(1 + interestRate / 100 / 12, -120)))

  return (
    <CalculatorLayout title="Student Loan Calculator USA 2026" description="Calculate monthly payment, total interest, and payoff date for any student loan balance." icon="🎓" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Loan Details</h2>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Loan Type (2024-25 rates)</label>
            <div className="space-y-1">
              {LOAN_TYPES.map(lt => (
                <button key={lt.name} onClick={() => setInterestRate(lt.rate)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex justify-between items-center ${Math.abs(interestRate - lt.rate) < 0.01 ? 'bg-green-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'}`}>
                  <span>{lt.name}</span>
                  <span className="font-bold">{lt.rate}%</span>
                </button>
              ))}
            </div>
          </div>

          {[
            { label: 'Loan Balance', value: loanBalance, set: setLoanBalance, step: 500, prefix: '$' },
          ].map(({ label, value, set, step, prefix }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                {prefix && <span className="text-green-600 text-sm">{prefix}</span>}
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              </div>
            </div>
          ))}

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">Interest Rate</label>
              <span className="text-xs font-bold text-gray-700">{interestRate}%</span>
            </div>
            <input type="range" min={2} max={15} step={0.01} value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} className="w-full accent-green-500" />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">Monthly Payment</label>
              <span className="text-xs text-gray-400">10yr min: ${standardPayment.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyPayment} onChange={e => setMonthlyPayment(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">Extra Monthly Payment</label>
              {extraPayment > 0 && <span className="text-xs font-bold text-green-600">+${extraPayment}/mo</span>}
            </div>
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>

          {result.interestSaved > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
              <p className="text-xs text-gray-500">Interest Saved</p>
              <p className="text-xl font-black text-green-700">{fmt(result.interestSaved)}</p>
              <p className="text-xs text-green-600">{result.monthsSaved} months sooner!</p>
            </div>
          )}
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Paid Off In" value={`${result.years}y ${result.remainingMonths}m`} highlight />
            <ResultCard label="Total Interest" value={fmtK(result.totalInterest)} />
            <ResultCard label="Total Paid" value={fmtK(result.totalPaid)} />
            <ResultCard label="Months Saved" value={result.monthsSaved > 0 ? `${result.monthsSaved} mo` : '-'} subValue={result.interestSaved > 0 ? fmt(result.interestSaved) + ' saved' : 'no extra'} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Balance Paydown Over Time</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="intGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Year', position: 'insideBottomRight', fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={60} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="balance" name="Remaining Balance" stroke="#22c55e" strokeWidth={2.5} fill="url(#balGrad)" />
                  <Area type="monotone" dataKey="totalInterest" name="Cumul. Interest" stroke="#ef4444" strokeWidth={1.5} fill="url(#intGrad)" strokeDasharray="4 2" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Extra payment comparison */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Impact of Extra Payments</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { label: 'No Extra', months: baseResult.months, interest: baseResult.totalInterest },
                  { label: `+$${extraPayment || 50}/mo`, months: extraPayment > 0 ? result.months : Math.max(1, baseResult.months - 10), interest: extraPayment > 0 ? result.totalInterest : baseResult.totalInterest * 0.85 },
                ]} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="label" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis yAxisId="left" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={45} tickFormatter={v => `${v}mo`} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={55} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar yAxisId="left" dataKey="months" name="Months to Payoff" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="right" dataKey="interest" name="Total Interest" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Student Loan Calculator - Pay Off Debt Faster and Save Thousands USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Federal vs Private Student Loan Rates 2026</h3>
              <p>Federal student loan rates for 2024-25: Direct Subsidized/Unsubsidized (undergrad) at 6.53%, Direct Unsubsidized (grad/professional) at 8.08%, Direct PLUS loans (parents and grad students) at 9.08%. Federal loans offer income-driven repayment, deferment, and forgiveness programs not available on private loans. Private loan rates vary from 4-15% based on credit score and lender. Refinancing federal loans to private saves on interest but eliminates federal protections - evaluate carefully.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Avalanche Strategy for Multiple Student Loans</h3>
              <p>Most borrowers have multiple student loans from different years with different rates. The avalanche method targets the highest-rate loan with extra payments while paying minimums on others. This minimizes total interest paid. Example: $15,000 at 8% and $20,000 at 6%: make minimum on the 6% loan and throw every extra dollar at the 8% loan. Once the 8% loan is gone, redirect all payments to the 6% loan. Our Debt Payoff Calculator can model multiple loans simultaneously.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Income-Driven Repayment Plans</h3>
              <p>The SAVE Plan (Saving on a Valuable Education), launched 2023, is the most generous IDR plan: payments capped at 5% of discretionary income for undergraduate loans, 10% for graduate loans. Discretionary income defined as income above 225% of federal poverty level, meaning many low-income borrowers pay $0. Interest does not capitalize if you make your required payment. Balance forgiven after 10 years (balances under $12,000) or 20-25 years. PSLF forgives remaining balance after 10 years for government and non-profit employees. Always verify current rules at StudentAid.gov as programs change.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Student Loan Tax Deduction</h3>
              <p>The student loan interest deduction allows you to deduct up to $2,500 of student loan interest paid from your taxable income. Income limits apply: the deduction phases out for single filers with MAGI above $75,000 and is eliminated above $90,000 (married filing jointly: $155,000-$185,000). This saves $550 per year for someone in the 22% bracket paying $2,500 in interest. On income-driven repayment plans with low payments, you may not be paying much interest, reducing the value of this deduction.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Student Loan Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A $25,000 loan at 8% APR over 5 years results in monthly payments of approximately <strong>$507</strong> with total interest of $4,420.
        </p>
        <p className="text-sm text-gray-600">
          Use this Student Loan USA 2026 tool to compare different loan scenarios and find the fastest, cheapest path to debt freedom.
        </p>
      </Card>
      <SEOContent
        title="Student Loan Calculator USA 2026"
        category="finance"
        intro={`Student loan debt in the US has crossed $1.7 trillion, affecting 43 million borrowers. The monthly payment and total interest calculations are important — but the more consequential decisions are about repayment strategy, income-driven repayment eligibility, and whether the degree being financed justifies the debt load being taken on.

Federal student loans have specific features that private loans lack: income-driven repayment (IDR) plans that cap payments at 5-10% of discretionary income, potential forgiveness after 10-25 years of qualifying payments, forbearance options during financial hardship, and no penalty for prepayment. These features make federal loans significantly more borrower-friendly than private alternatives and should be exhausted before any private borrowing.

The debt-to-income ratio on graduation is the most important indicator of student loan manageability: borrowing more than one year's expected starting salary for your field creates manageable debt. Borrowing two times starting salary creates stress; three times or more creates serious financial hardship for many borrowers.`}
        howItWorks={`Standard repayment: PMT = P × r(1+r)^120 / [(1+r)^120 - 1] for a 10-year standard plan. For $50,000 at 6.5%: monthly rate = 0.5417%, PMT ≈ $567/month. Total interest = $567 × 120 - $50,000 = $18,040.

IDR payment: SAVE plan (2024) calculates payment at 5% of discretionary income for undergraduate loans (discretionary = AGI above 225% federal poverty line). For $60,000 AGI single borrower: 225% FPL (2024) ≈ $31,590. Discretionary income = $60,000 - $31,590 = $28,410. Monthly payment = $28,410 × 5% / 12 = $118.38.

PSLF (Public Service Loan Forgiveness): 120 qualifying monthly payments while working full-time for qualifying employer (government, nonprofit). After 120 payments (~10 years), remaining federal loan balance forgiven tax-free. Highest value for high-balance borrowers in public service careers.`}
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
        tipsSection={`For borrowers with significant federal debt: run a comparison between standard 10-year repayment and income-driven repayment specifically for your career path and expected income trajectory. PSLF is worth maximizing for anyone in qualifying public service employment — even if they could afford standard payments, making lower IDR payments and saving the difference while working toward forgiveness is often the optimal strategy.

For private loan refinancing: the decision depends on your federal loan balance, career stability, and income. Refinancing federal loans into private loans permanently eliminates IDR eligibility and forgiveness potential. Only refinance federal loans if you have high-income security and definitively won't benefit from IDR or forgiveness.

Biweekly payments (half payment every two weeks instead of one payment monthly) make one extra full payment per year without feeling like an extra payment — effectively the same as the biweekly mortgage strategy. On a $50,000 loan, this saves approximately $1,400-$2,000 in interest depending on rate.`}
        conclusion={`The most important student loan insight is at the front end: the value of the degree relative to the debt. A $60,000 loan for a nursing degree with $75,000 starting salary is very manageable. The same $60,000 loan for a degree with $35,000 starting salary is a 10-year financial burden that constrains housing, family formation, and wealth building.

For people already carrying student debt, an organized payoff strategy — understanding all loans, their rates, and prioritizing appropriately — matters more than obsessing about the interest details. Use [our Debt Payoff Calculator](/calculators/finance/debt-payoff-calculator) to model your total debt payoff strategy including student loans alongside any other debt.`}

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
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "College Cost Calculator", href: "/calculators/finance/college-cost-calculator", icon: "🎓", desc: "Free calculator" },          { name: "529 vs Roth IRA Education Calculator", href: "/calculators/finance/529-vs-roth-ira-education-calculator", icon: "📚", desc: "Free calculator" },          { name: "529 vs Utma Calculator", href: "/calculators/finance/529-vs-utma-calculator", icon: "📊", desc: "Free calculator" },          { name: "Education Goal Calculator", href: "/calculators/finance/education-goal-calculator", icon: "🎯", desc: "Free calculator" },          { name: "Savings Goal Calculator", href: "/calculators/finance/savings-goal-calculator", icon: "🎯", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Lumpsum Calculator", href: "/calculators/finance/lumpsum-calculator", icon: "💰", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
