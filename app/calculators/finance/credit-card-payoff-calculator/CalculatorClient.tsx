'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateCreditCardPayoff } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()
  const [balance, setBalance] = useState(5000)
  const [apr, setApr] = useState(22)
  const [minPayment, setMinPayment] = useState(100)
  const [extraPayment, setExtraPayment] = useState(100)

  const result = useMemo(() => calculateCreditCardPayoff(balance, apr, minPayment, extraPayment), [balance, apr, minPayment, extraPayment])

  const formatMonths = (m: number) => m >= 12 ? `${Math.floor(m / 12)}y ${m % 12}m` : `${m}m`

  return (
    <CalculatorLayout title="Credit Card Payoff Calculator USA 2026" description="Find your debt-free date, total interest paid, and savings from extra payments." icon="💳" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <h2 className="text-lg font-bold text-gray-900 mb-5">Card Details</h2>
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Current Balance</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={balance} onChange={e => setBalance(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" /></div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Annual Interest Rate (APR): <span className="text-red-600">{apr}%</span></label>
              <input type="range" min="5" max="35" step="0.5" value={apr} onChange={e => setApr(Number(e.target.value))} className="w-full accent-red-500" />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>5%</span><span>35%</span></div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Minimum Payment</label>
              <div className="relative"><span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                <input type="number" value={minPayment} onChange={e => setMinPayment(Number(e.target.value))} className="w-full pl-7 pr-3 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-400" /></div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Extra Monthly Payment: <span className="text-green-600">+{fmt(extraPayment)}</span></label>
              <input type="range" min="0" max="1000" step="25" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} className="w-full accent-green-600" />
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* Savings banner */}
          {result.interestSaved > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
              <p className="text-sm text-gray-500 mb-1">By paying {fmt(extraPayment)} extra/month, you save</p>
              <p className="text-4xl font-black text-green-700">{fmt(result.interestSaved)}</p>
              <p className="text-sm text-gray-600 mt-1">and pay off <strong className="text-green-700">{formatMonths(result.monthsSaved)}</strong> sooner</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <p className="text-xs font-bold text-red-500 uppercase tracking-wide mb-2">Minimum Payments Only</p>
              <p className="text-xl font-black text-gray-900">{formatMonths(result.minMonths)}</p>
              <p className="text-sm text-gray-600">Interest paid: <span className="font-bold text-red-600">{fmt(result.minTotalInterest)}</span></p>
              <p className="text-sm text-gray-600">Total paid: <span className="font-bold">{fmt(result.minTotalPaid)}</span></p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
              <p className="text-xs font-bold text-green-600 uppercase tracking-wide mb-2">With Extra {fmt(extraPayment)}/mo</p>
              <p className="text-xl font-black text-gray-900">{formatMonths(result.extraMonths)}</p>
              <p className="text-sm text-gray-600">Interest paid: <span className="font-bold text-green-600">{fmt(result.extraTotalInterest)}</span></p>
              <p className="text-sm text-gray-600">Total paid: <span className="font-bold">{fmt(result.extraTotalPaid)}</span></p>
            </div>
          </div>

          <Card>
            <h3 className="font-bold text-gray-900 mb-4">Balance Payoff Over Time</h3>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={result.monthlyData}>
                <defs>
                  <linearGradient id="balGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tickFormatter={v => `M${v}`} tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                <Area type="monotone" dataKey="balance" stroke="#ef4444" fill="url(#balGrad)" name="Remaining Balance" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Credit Card Payoff Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Credit Card Payoff USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent
        title="Credit Card Payoff Calculator 2026"
        category="finance"
        intro={`Credit card debt is the most expensive debt most consumers carry, and the math is merciless. At 22% APR, a $5,000 balance making only minimum payments (typically 1-2% of the balance) takes 22+ years to pay off and costs over $7,000 in interest — more than the original debt. The reason: minimum payments are calculated to extend your repayment as long as possible, maximizing interest income for the card issuer.

The minimum payment trap is particularly effective because the minimum payment falls as your balance falls — so you're always paying a small percentage of an already-declining balance. To actually escape credit card debt, you need to pay a fixed dollar amount above the minimum — one that doesn't decline as your balance does.

The two most popular payoff strategies have different psychology and different financial outcomes. The avalanche method (highest interest first) minimizes total interest paid. The snowball method (lowest balance first) provides faster motivational wins by eliminating individual accounts quickly. Research suggests snowball produces better real-world outcomes despite costing more in interest — because people actually stick with it.`}
        howItWorks={`Minimum payment calculation: Most credit cards set minimum at max(1-2% of balance, $25-$35). This creates an amortization curve where minimum payments fall over time, extending the payoff period significantly.

Avalanche method: List all cards by interest rate, highest first. Pay minimums on all, put every extra dollar toward the highest-rate card until paid off, then redirect that payment to the next highest. Mathematically optimal — minimizes total interest.

Debt-free date calculation: With a fixed monthly payment P, balance B, and monthly rate r: n = -ln(1 - rB/P) / ln(1+r) gives the number of months to payoff. Example: $8,000 at 21% APR, paying $400/month: r = 1.75%, n = -ln(1 - 0.0175 × 8000/400) / ln(1.0175) = 27.5 months with $2,700 total interest vs 190+ months at minimums.`}
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
        tipsSection={`Calculate your real payoff acceleration: the difference in total interest between minimum payments and a fixed amount above the minimum. Paying $200/month versus $150/month on a $5,000 balance at 20% APR saves roughly $1,200 in total interest and 18 months of payments. This specific calculation — not a vague sense that paying more is better — is what builds motivation to make the sacrifice.

Consider balance transfer cards if you have good credit. A 0% APR transfer for 15-21 months eliminates interest temporarily, letting your entire payment go toward principal. The transfer fee (typically 3-5%) is paid back in saved interest within 2-3 months at high balances. Just commit to paying off the balance before the promotional rate expires.

Cut up the cards you're paying down. The psychological and practical value of not adding new charges to cards you're trying to eliminate is significant — balance transfers and extra payments lose their value quickly if you keep using the card.`}
        conclusion={`Credit card debt at 20%+ APR competes favorably with almost any investment return — meaning paying off credit card debt is the highest-return guaranteed investment available to most people. The psychological resistance to acknowledging and aggressively paying down credit card debt is one of the most expensive financial habits that people maintain.

Once you're out of credit card debt, redirect the former debt payments to savings and investments immediately — before lifestyle inflation absorbs them. The discipline you built paying down debt is the same discipline that builds long-term wealth when directed at savings instead. Use [our Debt Payoff Calculator](/calculators/finance/debt-payoff-calculator) to model multiple debts simultaneously.`}

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
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },          { name: "Student Loan Calculator", href: "/calculators/finance/student-loan-calculator", icon: "🎓", desc: "Free calculator" },          { name: "Personal Loan Calculator", href: "/calculators/finance/personal-loan-calculator", icon: "💳", desc: "Free calculator" },          { name: "Payoff Date Calculator", href: "/calculators/finance/payoff-date-calculator", icon: "📅", desc: "Free calculator" },          { name: "Loan Prepayment Calculator", href: "/calculators/finance/loan-prepayment-calculator", icon: "⚡", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Loan Comparison Calculator", href: "/calculators/finance/loan-comparison-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
