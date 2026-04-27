'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts'
import { calculateLoanPrepayment } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, TrendingDown, Calendar, Percent } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [principal, setPrincipal] = useState(3000000)
  const [rate, setRate] = useState(8.5)
  const [tenure, setTenure] = useState(240)
  const [prepayment, setPrepayment] = useState(200000)
  const [afterMonth, setAfterMonth] = useState(24)

  const result = useMemo(() => calculateLoanPrepayment(principal, rate, tenure, prepayment, afterMonth), [principal, rate, tenure, prepayment, afterMonth])
  const r = result as any

  const monthsSaved = (r.originalMonths || tenure) - (r.newMonths || tenure)
  const yearsSaved = Math.floor(monthsSaved / 12)
  const remMonths = monthsSaved % 12

  // Annual comparison data
  const compData: any[] = []
  const origYears = Math.ceil((r.originalMonths || tenure) / 12)
  const newYears = Math.ceil((r.newMonths || tenure) / 12)
  for (let y = 1; y <= Math.max(origYears, newYears); y++) {
    const origBal = r.originalSchedule?.find((s: any) => Math.ceil(s.month / 12) === y && s.month % 12 === 0)?.balance
    const newBal = r.newSchedule?.find((s: any) => Math.ceil(s.month / 12) === y && s.month % 12 === 0)?.balance
    compData.push({ year: y, original: origBal ?? (y <= origYears ? 0 : null), prepaid: newBal ?? (y <= newYears ? 0 : null) })
  }

  return (
    <CalculatorLayout title="Loan Prepayment Calculator USA 2026" description="Calculate interest saved and months eliminated with any extra monthly or lump sum payment." icon="💰" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Loan Details</h2>
          <div className="space-y-5">
            <InputField label="Loan Amount" value={principal} onChange={setPrincipal} min={10000} max={100000000} step={10000} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={1} max={25} step={0.1} suffix="%" />
            <InputField label="Tenure (Months)" value={tenure} onChange={setTenure} min={12} max={360} step={12} suffix="Mo" />
            <InputField label="Prepayment Amount" value={prepayment} onChange={setPrepayment} min={1000} max={50000000} step={1000} prefix={currency.symbol} />
            <InputField label="Prepay After (Month)" value={afterMonth} onChange={setAfterMonth} min={1} max={tenure - 1} step={1} suffix="Mo" />
          </div>
          <div className="mt-5 p-4 rounded-xl bg-green-50 border border-green-200">
            <p className="text-xs text-green-700 font-bold mb-1">⏱️ Time Saved</p>
            <p className="text-xl font-black text-green-700">{yearsSaved > 0 ? `${yearsSaved}yr ` : ''}{remMonths}mo</p>
            <p className="text-xs text-green-600 mt-0.5">earlier loan closure</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Interest Saved" value={fmt(r.interestSaved || 0)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="New Tenure" value={`${Math.floor((r.newMonths || tenure) / 12)}yr ${(r.newMonths || tenure) % 12}mo`} icon={<Calendar className="w-4 h-4" />} />
            <ResultCard label="Original Interest" value={fmt(r.originalTotalInterest || 0)} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="New Total Interest" value={fmt(r.newTotalInterest || 0)} icon={<TrendingDown className="w-4 h-4" />} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-xs text-gray-500 font-semibold mb-1">Original Tenure</p>
              <p className="text-lg font-black text-gray-900">{Math.floor(tenure / 12)}yr {tenure % 12}mo</p>
            </div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <p className="text-xs text-green-600 font-semibold mb-1">New Tenure</p>
              <p className="text-lg font-black text-green-700">{Math.floor((r.newMonths || tenure) / 12)}yr {(r.newMonths || tenure) % 12}mo</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
              <p className="text-xs text-amber-700 font-semibold mb-1">Prepayment ROI</p>
              <p className="text-lg font-black text-amber-700">
                {prepayment > 0 ? `${((r.interestSaved || 0) / prepayment * 100).toFixed(0)}%` : '-'}
              </p>
            </div>
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Remaining Balance: Original vs Prepaid</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={compData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="lpO" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#fca5a5" stopOpacity={0.3} /><stop offset="95%" stopColor="#fca5a5" stopOpacity={0} /></linearGradient>
                    <linearGradient id="lpN" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#16a34a" stopOpacity={0.15} /><stop offset="95%" stopColor="#16a34a" stopOpacity={0} /></linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} label={{ value: 'Year', position: 'insideBottom', offset: -2, fill: '#9ca3af', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y}`} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  <Area type="monotone" dataKey="original" name="Without Prepayment" stroke="#f87171" fill="url(#lpO)" strokeWidth={1.5} dot={false} connectNulls />
                  <Area type="monotone" dataKey="prepaid" name="With Prepayment" stroke="#16a34a" fill="url(#lpN)" strokeWidth={2.5} dot={false} connectNulls />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Loan Prepayment Calculator - Discover How Much You Can Save USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How Loan Prepayment Saves You Money</h3>
              <p>Loan prepayment is the act of paying extra money towards your loan principal beyond the regular EMI. Since interest is calculated on the outstanding principal, reducing it early creates a multiplier effect - lower principal -{'>'} less interest -{'>'} principal reduces even faster. The savings compound over the remaining loan tenure. For a home loan of $50 thousands at 8.5% for 20 years: every $1 thousand prepaid in Year 1 saves approximately $1.85-2.1 thousands in future interest (depending on timing). The earlier you prepay, the more you save because the interest saved is also compounded over remaining years.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Prepayment vs Investing - Which is Smarter?</h3>
              <p>The classic financial dilemma: use surplus money to prepay loans or invest in equity? The math: Loan interest rate = 8.5%. Post-tax return on equity investment (at 12% CAGR, LTCG at 12.5% above $1.25L) ~= 10.5-11%. On paper, investing wins by 2%. But consider: (1) Investment returns are uncertain; loan interest savings are guaranteed. (2) Risk-adjusted, the certain saving is worth more. (3) Psychological value of being debt-free is real. (4) For home loans with tax benefits (2% interest deductible under 24b), effective loan rate drops to ~6.5-7% - making investing clearly superior for high-income earners in 30% bracket.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Two Types of Prepayment - Full vs Partial</h3>
              <p>Full prepayment (foreclosure): You pay off the entire outstanding loan amount at once. Best if you have a windfall, the loan is nearly done, or you're refinancing. Most banks charge 2-3% prepayment penalty on fixed-rate loans; floating-rate home loans have zero penalty (Federal Reserve mandate). Partial prepayment: You make an extra lump-sum payment on top of your regular EMI. After prepayment, you can choose to: (A) Reduce EMI amount (keeping same tenure) - increases monthly cash flow. (B) Reduce tenure (keeping same EMI) - saves more total interest. Option B always saves more money and is recommended for maximum interest savings.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Best Time to Prepay Your Loan</h3>
              <p>Timing matters for prepayment impact. Prepaying in the first half of the loan term saves significantly more because interest charges are highest early on (front-loaded interest structure). In the first 3 years of a 20-year home loan, approximately 70-75% of each EMI goes to interest. By Year 15, only 30-35% goes to interest. Mathematically, $1 thousand prepaid in Year 1 might save $2 thousands in interest, while the same $1 thousand prepaid in Year 18 saves only $8,000-15,000. So: prepay early, prepay often, and always choose 'reduce tenure' over 'reduce EMI' when given the option.</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Loan Prepayment Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A $25,000 loan at 8% APR over 5 years results in monthly payments of approximately <strong>$507</strong> with total interest of $4,420.
        </p>
        <p className="text-sm text-gray-600">
          Use this Loan Prepayment USA 2026 tool to compare different loan scenarios and find the fastest, cheapest path to debt freedom.
        </p>
      </Card>
      <SEOContent
        title="Loan Prepayment Calculator USA – How Much Do Extra Payments Save You in 2026?"
        category="finance"
        intro={`Prepaying a loan early has a mathematical certainty that investing doesn't: you earn a guaranteed return equal to your loan's interest rate, after tax. In an environment where a mortgage costs 6.5% and investment returns are uncertain, prepaying delivers a 6.5% guaranteed, risk-free return. Comparing this to an 8-10% expected stock market return requires accounting for risk, taxes, and personal psychology.

The front-loading of interest in any amortizing loan means prepayment in the early years is especially powerful. On a 30-year mortgage, you pay mostly interest in the first decade — each extra dollar of principal paid early eliminates years of future interest payments on that exact dollar. A single $5,000 prepayment in year 3 of a 30-year mortgage at 6.5% saves approximately $19,000-$22,000 in interest and cuts 3-4 years from the loan term.

The opposite is also true: prepayments in the final years of a loan have minimal impact on total interest saved, because you're already in the predominantly-principal phase of amortization. This is why prepayment strategy matters — early prepayments are far more valuable than late ones.`}
        howItWorks={`Interest savings calculation: For each prepayment, determine the remaining balance reduction, then calculate what interest would have been paid on that balance over the remaining loan term. Interest saved = P_prepay × r × (remaining years at the margin), where r is the periodic interest rate.

Loan term reduction: After a prepayment, the new loan payoff date moves earlier because the reduced balance is now fully amortized over the original remaining term — but with lower outstanding balance, the payoff accelerates. The calculator solves for the new payoff date numerically.

ROI comparison: Prepayment return = loan interest rate (guaranteed). Investment return = expected market return × (1 - tax rate on returns). At 6.5% mortgage and 7% expected stock return with 20% investment tax: after-tax investment = 5.6% — below the guaranteed 6.5% prepayment return. At higher stock return expectations or tax-advantaged investment accounts, the comparison shifts.`}
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
        tipsSection={`Prioritize tax-advantaged investment accounts over mortgage prepayment for most people. A 401k contribution saves 22-32% in taxes immediately — that's a guaranteed 22-32% return before the money is even invested. Prepaying a 6.5% mortgage doesn't compete with that.

For extra monthly payments: specify that the additional amount be applied to principal, not to next month's payment. Many servicers default to applying extra payments as prepayment toward the next scheduled payment (which doesn't reduce your balance or term). Explicitly designating it as additional principal payment is essential.

Biweekly payment plans achieve one extra monthly payment per year automatically: 26 biweekly payments = 13 monthly equivalents vs 12 monthly payments. On a 30-year mortgage, this strategy alone reduces the term by approximately 4-5 years and saves tens of thousands in interest.`}
        conclusion={`The prepay-vs-invest decision is ultimately both mathematical and psychological. For people who have significant anxiety about debt, the peace of mind from a paid-off mortgage may be worth more than the marginal investment return difference. For people who are comfortable with debt and disciplined investors, maintaining the mortgage and investing the difference often builds more wealth.

Most financial planners recommend a middle path: maintain mortgage for tax deductibility and capital deployment, but pay it off strategically as retirement approaches to eliminate the fixed expense. Entering retirement with no mortgage significantly reduces the income you need to generate from your portfolio.`}

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
