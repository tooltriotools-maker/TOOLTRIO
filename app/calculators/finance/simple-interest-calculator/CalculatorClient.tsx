'use client'
import { useState, useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateSimpleInterest, calculateCompoundInterest } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, Percent, Calendar, TrendingUp } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [principal, setPrincipal] = useState(100000)
  const [rate, setRate] = useState(8)
  const [years, setYears] = useState(5)

  const r = useMemo(() => calculateSimpleInterest(principal, rate, years), [principal, rate, years])
  const ci = useMemo(() => calculateCompoundInterest(principal, rate, years, 12), [principal, rate, years])

  const chartData = Array.from({ length: years }, (_, i) => {
    const y = i + 1
    const siInterest = (principal * rate * y) / 100
    const ciResult = calculateCompoundInterest(principal, rate, y, 12)
    return { year: `Y${y}`, SI: Math.round(principal + siInterest), CI: Math.round(ciResult.maturityAmount) }
  })

  return (
    <CalculatorLayout title="Simple Interest Calculator USA 2026" description="Calculate simple interest, total amount, and compare simple vs compound interest for any loan." icon="📐" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Inputs</h2>
          <div className="space-y-5">
            <InputField label="Principal Amount" value={principal} onChange={setPrincipal} min={1000} max={100000000} step={1000} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate} min={0.1} max={50} step={0.5} suffix="%" />
            <InputField label="Time Period" value={years} onChange={setYears} min={1} max={50} step={1} suffix="Years" />
          </div>
          <div className="mt-5 space-y-2">
            <div className="flex justify-between items-center p-3 rounded-xl bg-blue-50 border border-blue-200">
              <span className="text-xs font-semibold text-blue-700">Simple Interest</span>
              <span className="text-sm font-black text-blue-700">{fmt(r.simpleInterest)}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-green-50 border border-green-200">
              <span className="text-xs font-semibold text-green-700">Compound Interest</span>
              <span className="text-sm font-black text-green-700">{fmt(Math.round(ci.maturityAmount - principal))}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-amber-50 border border-amber-200">
              <span className="text-xs font-semibold text-amber-700">CI Advantage</span>
              <span className="text-sm font-black text-amber-700">{fmt(Math.round(ci.maturityAmount - r.totalAmount))}</span>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total Amount (SI)" value={fmt(r.totalAmount)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Simple Interest" value={fmt(r.simpleInterest)} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Principal" value={fmt(r.principal)} icon={<Calendar className="w-4 h-4" />} />
            <ResultCard label="Effective Rate" value={`${((r.simpleInterest / principal) * 100).toFixed(1)}%`} icon={<TrendingUp className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Simple Interest vs Compound Interest</h3>
            <div style={{ height: 230 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="year" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} labelFormatter={y => `Year ${y.replace('Y', '')}`} />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#374151' }} />
                  <Line type="monotone" dataKey="SI" name="Simple Interest" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="CI" name="Compound Interest" stroke="#16a34a" strokeWidth={2.5} dot={false} strokeDasharray="0" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Year-wise Breakdown</h3>
            <div className="max-h-52 overflow-y-auto">
              <table className="calc-table">
                <thead><tr><th>Year</th><th>SI Total</th><th>CI Total</th><th>CI Advantage</th></tr></thead>
                <tbody>{chartData.map((row, i) => (
                  <tr key={i}>
                    <td className="text-gray-500">{i + 1}</td>
                    <td>{fmt(row.SI)}</td>
                    <td className="text-green-600">{fmt(row.CI)}</td>
                    <td className="font-bold text-amber-600">+{fmt(row.CI - row.SI)}</td>
                  </tr>
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
          <h2 className="text-xl font-black text-gray-900 mb-4">Simple Interest Calculator - When and Why Simple Interest Is Used USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">The Simple Interest Formula Explained</h3>
              <p>Simple Interest (SI) is calculated using the straightforward formula: SI = P x R x T / 100, where P = Principal (original amount), R = Annual interest rate (%), T = Time period (years). Total Amount = Principal + Simple Interest. Unlike compound interest, simple interest is calculated only on the original principal, never on accumulated interest. This means growth is linear, not exponential. Example: $1,00,000 at 8% for 5 years. SI = $1,00,000 x 8 x 5 / 100 = $40,000. Total = $1,40,000. In contrast, compound interest (monthly compounding) on the same inputs: $1,48,985 - $8,985 more, showing the compounding premium.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Real-World Applications of Simple Interest</h3>
              <p>Simple interest appears in specific financial instruments: Short-term personal loans (some lenders): Flat rate interest calculated on original principal. Vehicle loans in some markets: Some dealers quote 'flat rate' loans which are actually simple interest on original principal - effectively double the 'reducing balance' rate. Government securities: Some T-bills and bonds calculate simple interest. Trade credit: Suppliers offering '2/10 Net 30' (2% discount if paid in 10 days) use simple interest concepts. Short-term corporate loans. Important note: In India, most bank loans and deposits use compound interest (reducing balance for loans, compounding for deposits). If a lender quotes 'flat rate' interest, convert to compound equivalent to compare fairly - a 10% flat rate approximately equals 18-20% effective compound rate.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Simple Interest vs Compound Interest - The Long-term Divergence</h3>
              <p>The gap between SI and CI grows dramatically with time and rate. For $10 thousands at 10% for various periods: 5 years: SI = $15L total; CI (annual) = $16.1L; CI advantage = $1.1L. 10 years: SI = $20L; CI = $25.9L; CI advantage = $5.9L. 20 years: SI = $30L; CI = $67.3L; CI advantage = $37.3L. 30 years: SI = $40L; CI = $174.5L; CI advantage = $134.5L. The CI advantage at 30 years is 3.4x your original principal - this is the power of compounding that Einstein reportedly called the 'eighth wonder of the world.' For any investment horizon beyond 5 years, compound interest creates dramatically superior outcomes.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Compound vs Simple Interest - Which Benefits Borrowers?</h3>
              <p>From a borrower's perspective, simple interest is always better because you pay less total interest on the same principal, rate, and time period. This is why borrowers should: (1) Prefer 'reducing balance' (compound) loans marketed as lower rates over 'flat rate' (simple-interest based) loans marketed as lower rates - flat rates are deceptive. (2) Understand that a 10% flat rate personal loan costs more total interest than a 16-18% compound (reducing balance) personal loan over the same tenure. Always ask for the 'effective annual rate' (EAR) or 'annual percentage rate' (APR) which gives the compound equivalent. From an investor\'s perspective, compound interest is always better - seek investments with compounding (FDs compound quarterly; equity funds compound continuously through mark-to-market valuations).</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Simple Interest Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Simple Interest USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent
        title="Simple Interest Calculator USA – Calculate Principal, Rate, and Time with the SI Formula in 2026"
        category="finance"
        intro={`Simple interest is the foundation of all lending and investing mathematics — and unlike compound interest, where interest earns interest on itself, simple interest is calculated only on the original principal. Most people encounter compound interest in real investments, but understanding simple interest clarifies the baseline and helps you recognize when compound interest is making (or costing) significantly more than simple interest would.

Simple interest appears in specific real financial contexts: some short-term consumer loans, specific bond pricing calculations, and some short-term business financing. Car loans, mortgages, credit cards, and most investments use compound interest — which grows dramatically faster than simple interest over long periods.

The distinction matters for verifying loan calculations. A payday lender advertising '15% fee' on a 2-week loan may seem modest, but annualized (using simple interest annualization: 15% × 26 two-week periods = 390% APR), the true cost is immediately visible. APR disclosures from lenders use this annualization methodology, making them directly comparable regardless of loan term.`}
        howItWorks={`Simple interest formula: I = P × R × T, where P = principal, R = annual interest rate (decimal), T = time in years. Total amount = P + I = P(1 + R × T).

For $10,000 at 8% for 3 years: I = $10,000 × 0.08 × 3 = $2,400. Total = $12,400.

Compound vs simple comparison: Same $10,000 at 8% annually for 3 years compound: $10,000 × (1.08)^3 = $12,597. Difference = $197 — small at 3 years but grows significantly with time. At 30 years: simple = $34,000; compound = $100,627. The gap illustrates why compound interest matters so much for long-term investing.`}
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
        tipsSection={`Use simple interest calculations to verify short-term loan costs quickly. For a 6-month loan at 1.5% monthly: I = P × 0.015 × 6 months = 9% of principal — versus (1.015)^6 - 1 = 9.34% compound. The difference is small for short periods but knowing the calculation helps you spot inflated rate claims.

For educational purposes, simple interest is the appropriate starting point for understanding time value of money concepts before introducing the complexity of compounding. Teaching children and students about interest using simple interest examples builds the mathematical intuition before introducing the more powerful compound interest formula.

For US Treasury bill pricing: T-bills are quoted on a bank discount basis, which uses a simple interest formula with actual/360 day count. Understanding this calculation helps evaluate T-bill yields against other short-term investment alternatives.`}
        conclusion={`Simple interest is rarely the right tool for serious long-term financial planning — compound interest dominates real investment and debt calculations. But understanding simple interest makes compound interest more intuitive: compound interest is what happens when you calculate simple interest each period on the previous period's total balance rather than on the original principal.

The most important practical application of simple interest concepts: quickly estimating and verifying interest costs on short-term loans, comparing loan offers, and identifying when a lender is obscuring true costs through non-standard fee structures. Use [our Compound Interest Calculator](/calculators/finance/compound-interest-calculator) for real investment and debt projections.`}

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
    </CalculatorLayout>
  )
}
