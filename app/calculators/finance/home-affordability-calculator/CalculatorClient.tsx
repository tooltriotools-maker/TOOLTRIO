'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { calculateHomeAffordability } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const scale = currency.code === 'INR' ? 80 : 1

  const [monthlyIncome, setMonthlyIncome] = useState(Math.round(7000 * scale))
  const [monthlyDebts, setMonthlyDebts] = useState(Math.round(500 * scale))
  const [downPayment, setDownPayment] = useState(Math.round(50000 * scale))
  const [interestRate, setInterestRate] = useState(7.0)
  const [loanTerm, setLoanTerm] = useState(30)
  const step = currency.code === 'INR' ? 5000 : 1000

  const result = useMemo(() => calculateHomeAffordability(monthlyIncome, monthlyDebts, downPayment, interestRate, loanTerm),
    [monthlyIncome, monthlyDebts, downPayment, interestRate, loanTerm])

  const breakdown = [
    { name: 'Principal & Interest', value: result.actualMonthlyPayment, color: '#22c55e' },
    { name: 'Property Tax', value: result.monthlyPropertyTax, color: '#3b82f6' },
    { name: 'Insurance', value: result.monthlyInsurance, color: '#f59e0b' },
  ]

  const scenarios = [
    { label: '15yr @ 6.5%', value: calculateHomeAffordability(monthlyIncome, monthlyDebts, downPayment, 6.5, 15).maxHomePrice },
    { label: '20yr @ 6.8%', value: calculateHomeAffordability(monthlyIncome, monthlyDebts, downPayment, 6.8, 20).maxHomePrice },
    { label: '30yr @ 7%', value: calculateHomeAffordability(monthlyIncome, monthlyDebts, downPayment, 7.0, 30).maxHomePrice },
    { label: '30yr @ 7.5%', value: calculateHomeAffordability(monthlyIncome, monthlyDebts, downPayment, 7.5, 30).maxHomePrice },
  ]

  const frontOk = result.frontEndRatio <= 28
  const backOk = result.backEndRatio <= 36

  const InputRow = ({ label, value, onChange, step: s = 100, suffix = '', prefix = '' }: any) => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-gray-600">{label}</label>
      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
        {prefix && <span className="text-green-600 text-sm">{prefix}</span>}
        <input type="number" value={value} onChange={e => onChange(Number(e.target.value))} step={s}
          className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
        {suffix && <span className="text-gray-500 text-sm">{suffix}</span>}
      </div>
    </div>
  )

  return (
    <CalculatorLayout title="Home Affordability Calculator USA 2026" description={`Find out how much home you can afford in ${currency.name} using the 28/36 rule.`} icon="🏠" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Your Finances</h2>
          <InputRow label="Gross Monthly Income" value={monthlyIncome} onChange={setMonthlyIncome} s={step} prefix={currency.symbol} />
          <InputRow label="Monthly Debt Payments" value={monthlyDebts} onChange={setMonthlyDebts} s={step / 5} prefix={currency.symbol} />
          <InputRow label="Down Payment" value={downPayment} onChange={setDownPayment} s={step} prefix={currency.symbol} />
          <InputRow label="Interest Rate (APR)" value={interestRate} onChange={setInterestRate} s={0.1} suffix="%" />
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Loan Term</label>
            <div className="grid grid-cols-3 gap-2">
              {[15, 20, 30].map(y => (
                <button key={y} onClick={() => setLoanTerm(y)}
                  className={`py-2 rounded-xl text-sm font-semibold transition-all ${loanTerm === y ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {y} yr
                </button>
              ))}
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Max Home Price" value={fmtCompact(result.maxHomePrice)} highlight />
            <ResultCard label="Max Loan Amount" value={fmtCompact(result.maxLoanAmount)} />
            <ResultCard label="Total Monthly" value={fmt(result.totalMonthlyPayment)} subValue="P+I+Tax+Ins" />
            <ResultCard label="Down Payment" value={fmtCompact(downPayment)} subValue={`${((downPayment / (result.maxHomePrice || 1)) * 100).toFixed(0)}% of price`} />
          </div>

          {/* DTI Ratios */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Debt-to-Income (DTI) Ratios</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Front-End Ratio', value: result.frontEndRatio, limit: 28, desc: 'Housing costs / income' },
                { label: 'Back-End Ratio', value: result.backEndRatio, limit: 36, desc: 'All debts / income' },
              ].map(({ label, value, limit, desc }) => {
                const ok = value <= limit
                return (
                  <div key={label} className={`p-4 rounded-xl ${ok ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <p className={`text-2xl font-black ${ok ? 'text-green-700' : 'text-red-600'}`}>{value}%</p>
                    <p className="text-xs text-gray-500 mt-1">{desc}</p>
                    <div className="mt-2 bg-gray-200 rounded-full h-2">
                      <div className={`h-2 rounded-full ${ok ? 'bg-green-500' : 'bg-red-400'}`} style={{ width: `${Math.min((value / 50) * 100, 100)}%` }} />
                    </div>
                    <p className="text-xs mt-1 font-medium">{ok ? `Under ${limit}% limit` : `Exceeds ${limit}% limit`}</p>
                  </div>
                )
              })}
            </div>
            {(!frontOk || !backOk) && (
              <p className="text-xs text-amber-600 mt-3 bg-amber-50 p-3 rounded-xl">
                Tip: Reduce monthly debts or increase income to meet the 28/36 rule. Consider a longer loan term to lower monthly payments.
              </p>
            )}
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Monthly Payment Breakdown</h3>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={breakdown} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                    <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false}
                      tickFormatter={v => `${currency.symbol}${v >= 1000 ? (v/1000).toFixed(0)+'k' : v}`} />
                    <YAxis type="category" dataKey="name" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={100} />
                    <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {breakdown.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Rate &amp; Term Scenarios</h3>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={scenarios} margin={{ top: 0, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} axisLine={false} tickLine={false} width={55}
                      tickFormatter={v => `${currency.symbol}${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => fmtCompact(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                    <Bar dataKey="value" name="Max Home Price" fill="#22c55e" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Home Affordability Calculator -- How Much House Can You Really Afford? USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">The 28/36 Rule Explained</h3>
              <p>The 28/36 rule is the standard US mortgage qualification guideline used by lenders. Front-end ratio (28%): Your total monthly housing payment -- principal, interest, property tax, homeowners insurance, and HOA fees -- should not exceed 28% of your gross monthly income. Back-end ratio (36%): All monthly debt payments combined (housing plus car loans, student loans, credit card minimums) should not exceed 36% of gross income. Some lenders allow up to 43-45% back-end DTI, especially for FHA loans, but staying under 36% gives you the best rates and approval odds.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">True Cost of Homeownership Beyond Mortgage</h3>
              <p>The mortgage payment is just one piece. Budget additionally for: Property taxes (1-2% of home value annually, varies by state -- Texas and NJ are highest at 2%+, Hawaii and Alabama lowest at 0.3%). Homeowners insurance ($1,200-2,500/year). HOA fees ($0-600/month depending on community). Maintenance and repairs (budget 1-2% of home value annually -- a $400,000 home needs $4,000-8,000/year). PMI (if down payment under 20%: 0.5-1.5% of loan amount annually).</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Strategies to Afford More Home</h3>
              <p>Increase your maximum home price by: (1) Paying down existing debts before applying -- paying off a $300/month car payment can increase your mortgage budget by $300/month. (2) Increasing your down payment -- more down means smaller loan and possibly eliminates PMI. (3) Improving credit score -- 740+ gets you the best available rates. (4) Shopping multiple lenders -- rate differences of 0.25-0.5% among lenders are common. (5) Choosing a 30-year term over 15-year -- lower monthly payment increases affordability even though total interest is higher.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Renting vs Buying: The Break-Even Analysis</h3>
              <p>Buying a home is not always better than renting -- it depends on how long you stay. Upfront costs (down payment, closing costs of 2-5%, moving costs) can total 7-10% of the purchase price. You need to stay in a home typically 3-7 years to break even vs renting, depending on local rent vs buy ratios, appreciation rates, and opportunity cost of the down payment. In expensive markets like NYC, SF, or Boston, the rent vs buy calculation often favors renting for under 5-7 years. Our Mortgage Calculator can help model the exact break-even for your specific scenario.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Home Affordability Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A home purchased for $400,000 with 20% down at 6.5% over 30 years builds <strong>$250,000+</strong> in equity while appreciating at the historical 3.5% annual rate.
        </p>
        <p className="text-sm text-gray-600">
          Use this Home Affordability USA 2026 tool to compare buying vs renting, estimate ROI, and make data-driven real estate decisions.
        </p>
      </Card>
      <SEOContent
        title="Home Affordability Calculator USA – How Much House Can You Really Afford in 2026?"
        category="finance"
        intro={`Home affordability is the calculation your lender uses before you see any properties — and understanding it gives you a realistic budget before falling in love with something you can't finance. The standard underwriting framework uses two debt-to-income ratios: front-end DTI (PITI as percentage of gross monthly income, typically capped at 28-31%) and back-end DTI (all debt payments including PITI, car loans, student loans, and credit cards, typically capped at 43-45% for conventional loans).

The median US home price in 2024-2026 is approximately $420,000-$440,000. With a median household income of roughly $80,000 and mortgage rates at 6.5-7%, affording a median home on median income requires either a substantial down payment or violating recommended DTI guidelines. This is why affordability is at multi-decade lows despite income growth — rates and prices have outrun income.

Affordability isn't binary. You can qualify for a loan at the maximum DTI while simultaneously making a financially stressful decision. The calculator shows both what you technically qualify for and what more conservative affordability guidelines suggest.`}
        howItWorks={`Front-end affordability: Maximum PITI = Gross monthly income × 28% (or your specific lender's guideline). Then work backward from maximum PITI to maximum loan amount given current rates and your property tax rate.

Back-end constraint: Maximum total monthly debt = Gross monthly income × 43%. Subtract existing monthly debt payments (car, student loans, credit cards minimum) to find maximum mortgage PITI. This is often the binding constraint for buyers with significant existing debt.

Maximum purchase price: Working backward from maximum loan amount + your down payment = maximum purchase price. The calculator adjusts for property tax rates (which vary significantly by location — 0.27% in Hawaii to 2.4% in New Jersey), estimated insurance, and PMI if down payment is under 20%.`}
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
        tipsSection={`Use 28% front-end DTI as a target, not a ceiling. Just because a lender will approve you at 43% back-end DTI doesn't mean you should take that mortgage. At 43% back-end DTI, a small income reduction or unexpected expense can make monthly finances genuinely difficult.

Factor in closing costs (2-5% of purchase price), moving costs, and the reality that you'll want to buy furniture, make some repairs, and have reserves after move-in. The down payment is not the total cash you need.

Get pre-approved (not just pre-qualified) before house hunting. Pre-approval involves actual underwriting of your income, credit, and assets — it gives both you and sellers confidence about your ability to close.`}
        conclusion={`The affordability calculator gives you a number; the right number for your specific situation depends on your income stability, career trajectory, other financial goals, and how much homeownership is a priority. A buyer with variable income, significant student loans, and aggressive retirement goals should buy less house than someone with stable income, no other debt, and a fully funded retirement account.

The 30-year mortgage at historically high rates and historically high prices creates an unusual situation where many buyers' best move may be a smaller initial purchase rather than stretching to a maximum affordability limit. A home that you can comfortably afford gives you financial flexibility; a home at the edge of affordability can become a source of financial stress.`}

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
        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Real Estate ROI Calculator", href: "/calculators/finance/real-estate-roi-calculator", icon: "🏠", desc: "Free calculator" },          { name: "Rental Yield Calculator", href: "/calculators/finance/rental-yield-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "REIT vs Direct Property USA Calculator", href: "/calculators/finance/reit-vs-direct-property-usa-calculator", icon: "🏢", desc: "Free calculator" },          { name: "S&P500 vs Real Estate USA Calculator", href: "/calculators/finance/sp500-vs-real-estate-usa-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Rent vs Buy Calculator", href: "/calculators/finance/rent-vs-buy-calculator", icon: "🔄", desc: "Free calculator" },          { name: "HELOC Calculator", href: "/calculators/finance/heloc-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "Down Payment Calculator", href: "/calculators/finance/down-payment-calculator", icon: "💵", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },
          ]}
        />
      
    </CalculatorLayout>
  )
}
