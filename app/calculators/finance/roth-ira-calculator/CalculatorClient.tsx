'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar } from 'recharts'
import { calculateRothIRA } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [currentAge, setCurrentAge] = useState(28)
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentBalance, setCurrentBalance] = useState(5000)
  const [annualContrib, setAnnualContrib] = useState(7000)
  const [annualReturn, setAnnualReturn] = useState(8)
  const [taxRate, setTaxRate] = useState(22)

  const result = useMemo(() => calculateRothIRA(currentAge, retirementAge, currentBalance, annualContrib, annualReturn, taxRate),
    [currentAge, retirementAge, currentBalance, annualContrib, annualReturn, taxRate])

  const fmt = (v: number) => `$${Math.round(v).toLocaleString()}`
  const fmtK = (v: number) => v >= 1000000 ? `$${(v / 1000000).toFixed(2)}M` : `$${(v / 1000).toFixed(0)}k`

  const maxContrib = currentAge >= 50 ? 8000 : 7000
  const isMaxing = annualContrib >= maxContrib

  const compareData = [
    { name: 'Roth IRA\n(Tax-Free)', balance: result.finalBalance, taxBill: 0 },
    { name: 'Taxable\nAccount', balance: result.taxableEquivalent * (1 - taxRate / 100) * 0.85, taxBill: result.taxSavings },
  ]

  return (
    <CalculatorLayout title="Roth IRA Calculator USA 2026" description="See how much your Roth IRA will be worth at retirement with tax-free compound growth." icon="🛡️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Roth IRA Details</h2>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Current Age', value: currentAge, set: setCurrentAge, step: 1, suffix: 'yrs' },
              { label: 'Retirement Age', value: retirementAge, set: setRetirementAge, step: 1, suffix: 'yrs' },
            ].map(({ label, value, set, step, suffix }) => (
              <div key={label} className="space-y-1">
                <label className="text-xs font-medium text-gray-600">{label}</label>
                <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                  <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
                  <span className="text-gray-400 text-xs">{suffix}</span>
                </div>
              </div>
            ))}
          </div>

          {[
            { label: 'Current Roth IRA Balance', value: currentBalance, set: setCurrentBalance, step: 500, prefix: '$' },
          ].map(({ label, value, set, step, prefix }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <span className="text-green-600 text-sm">{prefix}</span>
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              </div>
            </div>
          ))}

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">Annual Contribution</label>
              <span className={`text-xs font-bold ${isMaxing ? 'text-green-600' : 'text-amber-600'}`}>{isMaxing ? 'v Maxed!' : `Max: $${maxContrib.toLocaleString()}`}</span>
            </div>
            <input type="range" min={500} max={maxContrib} step={500} value={Math.min(annualContrib, maxContrib)} onChange={e => setAnnualContrib(Number(e.target.value))} className="w-full accent-green-500" />
            <div className="flex justify-between text-xs text-gray-400">
              <span>$500</span>
              <span className="font-bold text-gray-700">${annualContrib.toLocaleString()}/yr</span>
              <span>${maxContrib.toLocaleString()}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Annual Return', value: annualReturn, set: setAnnualReturn, step: 0.5, suffix: '%' },
              { label: 'Tax Rate', value: taxRate, set: setTaxRate, step: 1, suffix: '%' },
            ].map(({ label, value, set, step, suffix }) => (
              <div key={label} className="space-y-1">
                <label className="text-xs font-medium text-gray-600">{label}</label>
                <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                  <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
                  <span className="text-gray-400 text-xs">{suffix}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-center">
            <p className="text-xs text-gray-500">Tax-Free Savings</p>
            <p className="text-xl font-black text-green-700">{fmtK(result.taxSavings)}</p>
            <p className="text-xs text-green-600 mt-0.5">vs equivalent taxable account</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Final Balance" value={fmtK(result.finalBalance)} highlight />
            <ResultCard label="Monthly Income" value={fmt(result.monthlyIncome)} subValue="at 4% withdrawal" />
            <ResultCard label="Total Contributed" value={fmtK(result.totalContributed)} />
            <ResultCard label="Tax-Free Growth" value={fmtK(result.growth)} subValue="never taxed" />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Tax-Free Growth Over Time</h3>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="rothGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02} />
                    </linearGradient>
                    <linearGradient id="contribGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Age', position: 'insideBottomRight', fill: '#94a3b8', fontSize: 10 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={65} tickFormatter={v => `$${v >= 1000000 ? (v / 1000000).toFixed(1) + 'M' : (v / 1000).toFixed(0) + 'k'}`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => fmtK(v)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="balance" name="Roth Balance (Tax-Free)" stroke="#22c55e" strokeWidth={2.5} fill="url(#rothGrad)" />
                  <Area type="monotone" dataKey="contributed" name="Total Contributed" stroke="#3b82f6" strokeWidth={1.5} fill="url(#contribGrad)" strokeDasharray="4 2" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Roth IRA vs Taxable Account at Retirement</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={compareData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={65} tickFormatter={v => `$${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => fmtK(v)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="balance" name="After-Tax Value" fill="#22c55e" radius={[4, 4, 0, 0]} stackId="a" />
                  <Bar dataKey="taxBill" name="Tax Owed" fill="#ef4444" radius={[4, 4, 0, 0]} stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Roth IRA Calculator - Maximize Tax-Free Retirement Wealth USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">The Power of Tax-Free Compounding</h3>
              <p>A Roth IRA's greatest advantage is tax-free compounding over decades. A 28-year-old maxing at $7,000/year earning 8% annually will have approximately $2.0-2.5M by age 67 - all completely tax-free. That same $7,000/year in a taxable brokerage account earning 8% (paying 15% LTCG on growth annually) would accumulate to only $1.4-1.7M after taxes. The difference of $300,000-800,000 is pure tax savings. Roth IRAs also have no Required Minimum Distributions (RMDs), allowing the account to compound indefinitely.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">2026 Contribution Rules and Income Limits</h3>
              <p>The 2026 Roth IRA contribution limit is $7,000 ($8,000 if age 50+). Income phaseouts for 2026: single filers $146,000-$161,000 MAGI, married filing jointly $230,000-$240,000. Above these limits, use the Backdoor Roth: contribute to a non-deductible Traditional IRA, then convert to Roth. Important: you must have earned income (wages, self-employment) at least equal to your contribution. Spousal IRA allows a non-working spouse to contribute based on the working spouse\'s income.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Roth IRA vs Roth 401k</h3>
              <p>Both offer tax-free growth but have key differences. Roth IRA: $7,000 limit, income limits apply, more investment flexibility (any broker, any asset), no RMDs, contributions withdrawable anytime. Roth 401k: $23,500 limit, no income limits (anyone can contribute regardless of income), typically limited to employer plan investment options, historically had RMDs (SECURE 2.0 eliminated Roth 401k RMDs starting 2024). The optimal strategy for most: maximize Roth 401k to get employer match, then max Roth IRA for flexibility, then return to Roth 401k up to the limit.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Roth Conversion Strategy</h3>
              <p>Roth conversions - moving money from Traditional IRA or 401k to Roth - are taxable events but can be strategic. Best times to convert: years with unusually low income (job loss, early retirement before Social Security), years before RMDs start (typically age 73), or when tax rates are legislatively low. Fill up low tax brackets by converting just enough each year to stay in the 12% or 22% bracket. This reduces future RMDs, reduces Social Security taxation, and potentially reduces Medicare IRMAA surcharges in retirement.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Roth IRA Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Contributing $7,000/year to a Roth IRA starting at age 25 at 7% return can grow to over <strong>$1.4M</strong> by age 65 — completely tax-free.
        </p>
        <p className="text-sm text-gray-600">
          This Roth IRA USA 2026 calculator helps you compare Roth vs Traditional IRA tax advantages and project your retirement balance.
        </p>
      </Card>
      <SEOContent
        title="Roth IRA Calculator USA 2026"
        category="finance"
        intro={`The Roth IRA is the most flexible tax-advantaged retirement account available to most Americans — and it's significantly underutilized because people overestimate its income limits and underestimate the long-term value of tax-free compounding. Contributions come from after-tax income, but all growth and qualifying withdrawals are completely tax-free forever. Unlike traditional IRAs, there are no required minimum distributions — your money can compound tax-free for as long as you live.

For young investors in their 20s and 30s, the Roth IRA's value is almost impossible to overstate. $7,000 contributed at 25 at 8% annual return is worth approximately $148,000 at 65 — completely tax-free. The same $7,000 in a traditional IRA is worth the same nominally, but you'll pay income tax on every dollar withdrawn, potentially at 22-32% rates. For someone in a low tax bracket now who expects to be in a higher bracket in retirement, the Roth is the clear winner.

The 2024 contribution limit is $7,000 ($8,000 if age 50+), with phase-outs beginning at $146,000 (single) and $230,000 (married filing jointly). High-income earners above these limits can use the backdoor Roth conversion strategy — converting non-deductible traditional IRA contributions to Roth.`}
        howItWorks={`Roth IRA projection: Annual contribution × [(1+r)^n - 1] / r × (1+r) = future value. At $7,000/year, 8% return, 30 years: $7,000 × [(1.08)^30 - 1] / 0.08 × 1.08 = $856,851 tax-free.

Tax-free value: The Roth balance is fully spendable — no taxes owed on withdrawal. A traditional IRA balance of $856,851 at 22% effective withdrawal rate = $668,344 after-tax. The Roth's additional value is $856,851 - $668,344 = $188,507 in this example — the permanent tax savings from 30 years of tax-free compounding.

Roth conversion value: Converting $50,000 traditional IRA to Roth at 22% marginal rate costs $11,000 in immediate taxes. If the $50,000 grows to $200,000 by retirement (taxed at 22% in traditional = $156,000 net), vs Roth value of $200,000 net: $44,000 additional value from the conversion, minus the $11,000 paid upfront = $33,000 net benefit.`}
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
        tipsSection={`Maximize Roth IRA contributions every year before any taxable investment. The permanent tax-free compounding of the Roth wrapper is an advantage that compounds for decades and cannot be recreated in a taxable account at any price.

For high earners above the contribution limit: the backdoor Roth involves contributing to a non-deductible traditional IRA (no income limit) and then converting to Roth. The pro-rata rule applies if you have other traditional IRA balances — consult a tax professional to ensure clean execution.

Roth IRA contributions (not earnings) can be withdrawn penalty-free and tax-free at any time for any reason. This makes the Roth a superior emergency fund for people who want to optimize: it earns market returns rather than savings account rates, and the contribution basis is always accessible without penalty.`}
        conclusion={`The sequence of traditional vs Roth contributions should follow your current vs expected future tax rates. In your first years of working (low income, low marginal rate), Roth is usually optimal — you pay low taxes now on money that will grow tax-free for decades. As income grows in your 40s and 50s, traditional 401k becomes more compelling (high tax deduction now, potentially lower rates in retirement).

For married couples, coordination matters: one spouse may benefit from Roth contributions while the other uses traditional, based on their individual income levels and projected career trajectories. Use [our Roth IRA vs 401k Calculator](/calculators/finance/roth-ira-vs-401k-employer-match-calculator) to model the specific comparison for your situation.`}

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
            { name: "Retirement Calculator", href: "/calculators/finance/retirement-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Roth Conversion Calculator", href: "/calculators/finance/roth-conversion-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
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
          { name: "HSA Calculator", href: "/calculators/finance/hsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "HSA vs FSA Calculator", href: "/calculators/finance/hsa-vs-fsa-calculator", icon: "🏥", desc: "Free calculator" },          { name: "Roth IRA vs HSA Calculator", href: "/calculators/finance/roth-ira-vs-hsa-calculator", icon: "📊", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Medicare vs Private Insurance Calculator", href: "/calculators/finance/medicare-vs-private-insurance-calculator", icon: "🏥", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },          { name: "Wealth Calculator", href: "/calculators/finance/wealth-calculator", icon: "💎", desc: "Free calculator" },
          ]}
        />

    </CalculatorLayout>
  )
}
