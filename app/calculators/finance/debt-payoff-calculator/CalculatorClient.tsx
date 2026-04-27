'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { calculateDebtPayoff } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { Plus, Trash2 } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [debts, setDebts] = useState([
    { name: 'Credit Card', balance: d.smallAmount * 3, rate: 20, minPayment: Math.round(d.smallAmount * 0.2) },
    { name: 'Car Loan', balance: d.mediumAmount * 2, rate: 8, minPayment: Math.round(d.smallAmount * 0.8) },
    { name: 'Personal Loan', balance: d.mediumAmount, rate: 12, minPayment: Math.round(d.smallAmount * 0.4) },
  ])
  const [extraPayment, setExtraPayment] = useState(Math.round(d.smallAmount * 0.5))
  const [method, setMethod] = useState<'avalanche' | 'snowball'>('avalanche')

  const result = useMemo(() => calculateDebtPayoff(debts, extraPayment, method), [debts, extraPayment, method])
  const noExtra = useMemo(() => calculateDebtPayoff(debts, 0, method), [debts, method])

  const update = (idx: number, field: string, val: any) => {
    const next = [...debts]; (next[idx] as any)[field] = val; setDebts(next)
  }
  const remove = (idx: number) => setDebts(debts.filter((_, i) => i !== idx))
  const add = () => setDebts([...debts, { name: 'New Debt', balance: d.smallAmount, rate: 10, minPayment: Math.round(d.smallAmount * 0.1) }])

  const step = currency.code === 'INR' ? 1000 : 100

  return (
    <CalculatorLayout title="Debt Payoff Calculator USA 2026" description={`Find the fastest way to pay off all your debts using avalanche or snowball method in ${currency.name}.`} icon="🔓" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-4">Strategy</h2>
          {/* Method toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-gray-50 rounded-xl mb-5">
            {(['avalanche', 'snowball'] as const).map(m => (
              <button key={m} onClick={() => setMethod(m)}
                className={`py-2 rounded-xl text-sm font-semibold transition-all capitalize ${method === m ? 'bg-green-600 text-white' : 'text-gray-500 hover:text-white'}`}>
                {m === 'avalanche' ? '🏔️ Avalanche' : '⛄ Snowball'}
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-400 mb-5">
            {method === 'avalanche' ? '📉 Highest interest first - saves the most money overall.' : '⬆️ Smallest balance first - quick wins for motivation.'}
          </p>

          {/* Extra payment */}
          <div className="space-y-2 mb-5">
            <label className="text-sm font-medium text-gray-700">Extra Monthly Payment</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 text-sm">{currency.symbol}</span>
              <input type="number" value={extraPayment} onChange={e => setExtraPayment(Number(e.target.value))} step={step}
                className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>

          {/* Debts list */}
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Your Debts</h3>
          <div className="space-y-4">
            {debts.map((debt, i) => (
              <div key={i} className="p-3 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                <div className="flex items-center justify-between">
                  <input value={debt.name} onChange={e => update(i, 'name', e.target.value)}
                    className="bg-transparent text-sm font-semibold text-white outline-none flex-1" />
                  <button onClick={() => remove(i)} className="text-slate-600 hover:text-red-400 transition-colors ml-2"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <div className="grid grid-cols-3 gap-1.5">
                  {[['Balance', 'balance', step, d.mediumAmount * 10], ['Rate %', 'rate', 0.5, 50], ['Min Pay', 'minPayment', step / 10, d.mediumAmount]].map(([label, field, s, max]) => (
                    <div key={String(field)}>
                      <p className="text-xs text-gray-400 mb-0.5">{String(label)}</p>
                      <input type="number" value={(debt as any)[field as string]} onChange={e => update(i, String(field), Number(e.target.value))} step={Number(s)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1 text-white text-xs font-semibold outline-none text-right" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={add} className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-dashed border-green-300 text-green-600 text-sm hover:bg-teal-500/5 transition-all">
              <Plus className="w-4 h-4" /> Add Debt
            </button>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Debt-Free In" value={`${result.totalMonths} mo`} subValue={`${Math.floor(result.totalMonths / 12)}y ${result.totalMonths % 12}m`} highlight />
            <ResultCard label="Total Interest" value={fmtCompact(result.totalInterest)} />
            <ResultCard label="Interest Saved" value={fmtCompact(noExtra.totalInterest - result.totalInterest)} subValue="vs no extra payment" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Payoff Plan per Debt</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={result.debts} margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={76}
                    tickFormatter={v => v >= 1000 ? `${currency.symbol}${(v / 1000).toFixed(0)}K` : `${currency.symbol}${v}`} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number, name) => [name === 'Months' ? `${v} months` : fmt(v), name]} />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#374151' }} />
                  <Bar dataKey="balance" name="Balance" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="totalInterest" name="Total Interest" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Payoff Schedule</h3>
            <table className="calc-table">
              <thead><tr><th>Debt</th><th>Balance</th><th>Rate</th><th>Total Interest</th><th>Paid Off In</th></tr></thead>
              <tbody>
                {result.debts.map((d, i) => (
                  <tr key={i}>
                    <td className="font-medium text-white">{d.name}</td>
                    <td>{fmtCompact(d.balance)}</td>
                    <td className="text-amber-400">{d.rate}%</td>
                    <td className="text-red-400">{fmtCompact(d.totalInterest)}</td>
                    <td className="text-green-600">{d.months} months</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Debt Payoff Calculator - Become Debt-Free Faster with Avalanche &amp; Snowball USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Two Proven Debt Payoff Strategies</h3>
              <p>The Debt Avalanche method targets the debt with the highest interest rate first (regardless of balance), then rolls that payment to the next highest rate once paid off. Mathematically optimal - saves the most total interest and is ideal for disciplined, numbers-focused individuals. The Debt Snowball method targets the smallest debt balance first (regardless of interest rate), creating quick wins and psychological momentum. Research by Harvard Business Review shows snowball users pay off debt faster in practice because the psychological wins improve motivation and compliance. Our calculator shows results for both methods so you can choose what fits your personality and situation.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">How Extra Payments Accelerate Debt Freedom</h3>
              <p>Even small extra payments create dramatic results through the debt payoff snowball. Example: 3 debts - credit card ($1L at 36%), personal loan ($3L at 18%), car loan ($5L at 10%). Total minimum payments = $18,000/month. Paying just $3,000/month extra ($21,000 total) using avalanche method: Saves $1.87 thousands in interest. Becomes debt-free 16 months sooner. The power grows because each paid-off debt frees up its minimum payment to accelerate the next debt, creating an exponential payoff acceleration - the 'snowball' or 'avalanche' rolling effect.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">High-Interest Debt Priority - Credit Cards vs Personal Loans</h3>
              <p>Not all debt is created equal. Credit card debt at 36-48% p.a. is financial poison - it can double your outstanding in 2 years if you only pay minimums. Personal loans at 14-24% are expensive but manageable. Car loans at 8-10% are relatively affordable. Home loans at 8.5-9% are the cheapest and have tax benefits. Priority: Pay off credit card debt first, always. Carrying a credit card balance even for one month wipes out any rewards earned. Once credit cards are cleared, build an emergency fund before aggressively paying off lower-interest debt - having 3-6 months expenses in liquid savings prevents debt relapse.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Debt Consolidation - Is It Worth It?</h3>
              <p>Debt consolidation combines multiple high-interest debts into a single lower-interest loan. Common options in the US: Personal loan consolidation (10-15% vs 24-36% on credit cards) - can save significantly if credit score qualifies you for good rates. Balance transfer on credit cards (0% for 3-6 months) - useful but watch for transfer fees and post-promotional rates. Home loan top-up (8.5-9%) for large debt consolidation if you own property. Caution: Consolidation only works if you address the spending habits that created the debt. Without behavioral change, consolidation often leads to accumulating new debt alongside the consolidated loan, worsening the situation.</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Debt Payoff Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A $25,000 loan at 8% APR over 5 years results in monthly payments of approximately <strong>$507</strong> with total interest of $4,420.
        </p>
        <p className="text-sm text-gray-600">
          Use this Debt Payoff USA 2026 tool to compare different loan scenarios and find the fastest, cheapest path to debt freedom.
        </p>
      </Card>
      <SEOContent
        title="Debt Payoff Calculator USA 2026"
        category="finance"
        intro={`Paying off debt is one of the highest-return guaranteed investments most people can make. Eliminating a 20% credit card balance is equivalent to earning a guaranteed 20% return — after tax, since you're paying down debt with after-tax dollars. No broadly available investment consistently matches this guaranteed return.

The challenge with multiple debts is deciding which to pay off first. The mathematical answer is always the avalanche method: pay minimums on all debts, then direct every extra dollar toward the highest interest rate debt first. Once it's paid off, redirect that payment to the next highest rate. This minimizes total interest paid over the payoff period.

But the behavioral answer is sometimes different. The debt snowball method — smallest balance first, regardless of rate — has been shown in behavioral economics research to be more effective for many people because eliminating individual accounts provides motivational wins that sustain the payoff effort. The extra interest cost of choosing snowball over avalanche is the price of behavioral sustainability.`}
        howItWorks={`Avalanche calculation: List all debts by interest rate. Calculate minimum payments for all. Determine extra payment amount. Apply entire extra payment to highest-rate debt until eliminated, then cascade to next. Total interest saved vs minimum-only payments = (sum of interest under minimums) - (sum of interest under avalanche strategy).

Debt-free date: For each debt in sequence, calculate months to payoff given its rate and payment amount, then calculate cascading payoff dates as each debt eliminates and its payment transfers to the next.

Net worth impact: Each dollar of debt eliminated increases your net worth by exactly one dollar. Unlike equity investments (which carry risk), debt payoff is a guaranteed net worth improvement. The psychological value of a specific debt-free date — made visible by the calculator — is a powerful motivational tool.`}
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
        tipsSection={`List every debt: credit cards, personal loans, medical debt, student loans, auto loans, and any other liabilities. Aggregate them before making strategy decisions — sometimes a debt you've mentally minimized is actually costing more in interest than you realized.

For debts with similar interest rates, prioritize by emotional weight. Some people are more motivated by eliminating the debt with the most unpleasant payment experience — the creditor with aggressive collectors, or the card associated with a purchase you regret. This isn't mathematically optimal, but it's behaviorally valid.

Consider whether refinancing or balance transfers make sense for the highest-rate debts before committing to a payoff strategy. Moving a 25% credit card balance to a 0% offer for 18 months, or refinancing a 15% personal loan to 9%, changes the math significantly and should be captured in your payoff plan.`}
        conclusion={`The debt-free date is a goal worth celebrating, but it's also the beginning of a transition: the same monthly payment that was eliminating debt should immediately start building wealth. Debt payoff often builds the discipline and cash flow management skills that make systematic investing possible.

For student loans specifically, the calculus is sometimes different — low-rate student debt (under 5-6%) may not be worth accelerating if you're also saving for retirement in tax-advantaged accounts. The [Pay Off Mortgage vs Invest Calculator](/calculators/finance/pay-off-mortgage-vs-invest-calculator) logic applies to student loans: compare the guaranteed return of paying off the debt to the expected return of investing the same money.`}

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
