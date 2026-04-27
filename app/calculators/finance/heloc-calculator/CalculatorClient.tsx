'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'
import { calculateHELOC } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [homeValue, setHomeValue] = useState(450000)
  const [mortgageBalance, setMortgageBalance] = useState(280000)
  const [creditLinePct, setCreditLinePct] = useState(85)
  const [drawAmount, setDrawAmount] = useState(60000)
  const [interestRate, setInterestRate] = useState(8.5)
  const [repaymentYears, setRepaymentYears] = useState(20)

  const result = useMemo(() => calculateHELOC(homeValue, mortgageBalance, creditLinePct, drawAmount, interestRate, repaymentYears),
    [homeValue, mortgageBalance, creditLinePct, drawAmount, interestRate, repaymentYears])

  const fmt = (v: number) => `$${Math.round(v).toLocaleString()}`
  const fmtK = (v: number) => v >= 1000000 ? `$${(v / 1000000).toFixed(2)}M` : `$${(v / 1000).toFixed(0)}k`

  const equityData = [
    { name: 'Mortgage Balance', value: mortgageBalance, fill: '#ef4444' },
    { name: 'Home Equity', value: result.equity, fill: '#22c55e' },
  ]
  const ltvOk = result.ltv <= 80
  const cltv = ((mortgageBalance + drawAmount) / homeValue * 100).toFixed(1)

  return (
    <CalculatorLayout title="HELOC Calculator USA 2026" description="Calculate your available home equity credit line, monthly interest-only payments, and total cost." icon="🏠" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Property &amp; Loan Details</h2>
          {[
            { label: 'Home Value', value: homeValue, set: setHomeValue, step: 5000 },
            { label: 'Mortgage Balance', value: mortgageBalance, set: setMortgageBalance, step: 5000 },
          ].map(({ label, value, set, step }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <span className="text-green-600 text-sm">$</span>
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              </div>
            </div>
          ))}

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">Max CLTV Allowed</label>
              <span className="text-xs font-bold text-gray-700">{creditLinePct}%</span>
            </div>
            <input type="range" min={75} max={90} value={creditLinePct} onChange={e => setCreditLinePct(Number(e.target.value))} className="w-full accent-green-500" />
          </div>

          {[
            { label: 'Draw Amount', value: drawAmount, set: setDrawAmount, step: 5000, prefix: '$' },
          ].map(({ label, value, set, step, prefix }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <span className="text-green-600 text-sm">{prefix}</span>
                <input type="number" value={value} onChange={e => set(Math.min(Number(e.target.value), result.availableCredit))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              </div>
              <p className="text-xs text-gray-400">Max available: {fmtK(result.availableCredit)}</p>
            </div>
          ))}

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Interest Rate</label>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <input type="number" value={interestRate} onChange={e => setInterestRate(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
                <span className="text-gray-400 text-xs">%</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Repayment Years</label>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <input type="number" value={repaymentYears} onChange={e => setRepaymentYears(Number(e.target.value))} step={5} min={5} max={30} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
                <span className="text-gray-400 text-xs">yr</span>
              </div>
            </div>
          </div>

          <div className={`p-3 rounded-xl text-xs ${parseFloat(cltv) <= creditLinePct ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700'}`}>
            <p className="font-bold">Combined LTV (CLTV)</p>
            <p className="text-2xl font-black mt-1">{cltv}%</p>
            <p className="mt-0.5">{parseFloat(cltv) <= creditLinePct ? `Under ${creditLinePct}% lender limit` : `Exceeds ${creditLinePct}% limit - reduce draw`}</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Available Credit" value={fmtK(result.availableCredit)} highlight />
            <ResultCard label="Monthly Payment" value={fmt(result.monthlyPayment)} subValue="principal + interest" />
            <ResultCard label="Interest Only" value={fmt(result.interestOnlyPayment)} subValue="draw period" />
            <ResultCard label="Total Interest" value={fmtK(result.totalInterest)} subValue="over repayment" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Home Equity Breakdown</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={equityData} cx="50%" cy="50%" outerRadius={80} innerRadius={45} dataKey="value" paddingAngle={3} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {equityData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {equityData.map(e => (
                  <div key={e.name} className="text-center bg-gray-50 rounded-lg p-2">
                    <div className="w-2.5 h-2.5 rounded-full mx-auto mb-1" style={{ background: e.fill }} />
                    <p className="text-xs text-gray-500">{e.name}</p>
                    <p className="text-sm font-bold text-gray-800">{fmt(e.value)}</p>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">HELOC vs Home Equity Loan</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'HELOC\n(Variable)', monthly: result.monthlyPayment, total: result.totalCost },
                    { name: 'HEL\n(Fixed 9%)', monthly: Math.round(drawAmount * (0.09 / 12) * Math.pow(1 + 0.09 / 12, repaymentYears * 12) / (Math.pow(1 + 0.09 / 12, repaymentYears * 12) - 1)), total: Math.round(drawAmount * (0.09 / 12) * Math.pow(1 + 0.09 / 12, repaymentYears * 12) / (Math.pow(1 + 0.09 / 12, repaymentYears * 12) - 1) * repaymentYears * 12) },
                  ]} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={60} tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="monthly" name="Monthly Payment" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="total" name="Total Cost" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">HELOC Summary</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Home Value', value: fmt(homeValue) },
                { label: 'Mortgage Balance', value: fmt(mortgageBalance) },
                { label: 'Home Equity', value: fmt(result.equity) },
                { label: 'Current LTV', value: `${result.ltv}%` },
                { label: 'Max Credit Line', value: fmt(result.maxCreditLine) },
                { label: 'Draw Amount', value: fmt(drawAmount) },
                { label: 'Total Repayment', value: fmt(result.totalCost) },
                { label: 'CLTV After Draw', value: `${cltv}%` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <p className="font-bold text-gray-800 text-sm">{value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">HELOC Calculator - Tap Your Home Equity Wisely USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How HELOC Works: Draw vs Repayment Period</h3>
              <p>A HELOC has two phases. The draw period (typically 10 years) allows you to borrow up to your credit limit, often paying interest only on the drawn amount. This is like a credit card secured by your home - flexible, revolving credit. The repayment period (typically 20 years) requires full principal and interest payments on the outstanding balance. Many borrowers are caught off-guard by the payment increase at the end of the draw period, especially if they borrowed the maximum and rates have risen. Always plan for the repayment phase payment amount.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Best Uses for HELOC Funds</h3>
              <p>High-value HELOC uses: (1) Home improvements that increase property value (kitchens, bathrooms, additions) - potentially tax deductible and increases home value. (2) Emergency fund backup - set up the credit line but only draw if needed, paying no interest until you use it. (3) Bridge loan for real estate investors. Lower-value uses: debt consolidation (helps cash flow but extends debt), investment portfolios (leverage risk), vacations (depreciating expense). Never use HELOC to fund lifestyle inflation or volatile assets like cryptocurrencies.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">HELOC Rates in 2026 and Rate Risk</h3>
              <p>HELOC rates are typically variable, tied to the Prime Rate (currently ~7.5% in 2026) plus a margin of 0-2%. When the Federal Reserve raises rates, your HELOC payment increases automatically. A $100,000 HELOC at 8.5% costs $708/month (interest only). If rates rise to 10.5%, the same HELOC costs $875/month - a $167 increase with no changes on your end. Consider a fixed-rate Home Equity Loan if you want payment certainty, especially in a rising rate environment. Some HELOCs offer rate lock options on portions of the balance.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">HELOC Qualification Requirements</h3>
              <p>To qualify for a HELOC in 2026: Minimum credit score of 620 (best rates at 720+), maximum CLTV of 80-85% (some lenders go to 90%), sufficient income to cover all debt payments including the new HELOC, and typically 20%+ equity in the home. The approval process takes 2-6 weeks and includes an appraisal. During the application, avoid large purchases or new credit applications that could reduce your credit score. Shop at least 3 lenders as HELOC margins vary significantly - a 0.5% difference on $100,000 is $500/year.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          HELOC Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this HELOC USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent
        title="HELOC Calculator USA – How Much Home Equity Can You Access and What Will It Cost in 2026?"
        category="finance"
        intro={`A Home Equity Line of Credit works like a credit card secured by your home equity — with important structural differences. During the draw period (typically 10 years), you access funds up to your credit limit and make interest-only payments on the drawn balance. During the repayment period (typically 20 years), you can no longer draw funds and must repay the outstanding balance with principal and interest.

The HELOC interest rate is variable, typically pegged to the prime rate plus a margin (usually 1-3%). When the Fed raised rates from 3.5% to 8.5% in 2022-2023, HELOC rates moved from roughly 5% to 9%+ for many borrowers. A $100,000 HELOC balance at 5% cost $417/month in interest-only payments; at 9%, that same balance costs $750/month. Variable rate risk is real and should be modeled before using a HELOC for large projects.

HELOCs are most appropriate for renovation projects (where the improvements increase home value), debt consolidation from higher-rate unsecured debt, or other uses where the after-tax HELOC rate clearly beats alternatives. Post-2018 tax law, HELOC interest is only deductible if the funds are used to buy, build, or substantially improve the home securing the loan.`}
        howItWorks={`Interest-only payment during draw period: Monthly interest = (Outstanding balance × annual rate) / 12. At $75,000 drawn and 8.5% APR: $75,000 × 0.085 / 12 = $531.25/month.

Repayment period payment: When draw period ends, outstanding balance amortizes over remaining term at current variable rate. PMT = P × r(1+r)^n / [(1+r)^n - 1]. A $75,000 balance at 8.5% amortizing over 20 years: $651/month.

Rate sensitivity: Model your payment at current rate + 1%, + 2%, + 3% to understand exposure to rate increases. On $100,000 outstanding, a 2% rate increase adds $167/month in interest costs. This stress test is essential before committing to a large draw.`}
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
        tipsSection={`Use a HELOC for renovation projects where you're drawing funds over 12-24 months rather than needing all the money upfront. The revolving structure means you only pay interest on what you've actually drawn — unlike a cash-out refinance where you pay interest on the entire lump sum from day one.

Consider a rate cap or switching to a fixed-rate home equity loan if rates rise significantly during your draw period. Many HELOCs allow conversion of drawn amounts to fixed-rate sub-accounts. This optionality is valuable in volatile rate environments.

Keep HELOC availability as emergency backup without drawing on it. The credit line provides a backstop for genuine emergencies without the interest cost of carrying a balance. Having $50,000 available but unused costs nothing beyond any annual fee.`}
        conclusion={`HELOCs are powerful financial tools that carry real risks. The primary risk isn't misuse — it's the variable rate structure in rising rate environments. Borrowers who took large HELOCs in 2021 at 3% rates and are now paying 8-9% on significant balances learned this lesson painfully.

For any use where you need all the money at once and can predict your payoff timeline, a fixed-rate home equity loan (which functions like a second mortgage with predictable payments) is often preferable to a variable-rate HELOC. The certainty of a fixed rate is worth a modest rate premium for large, long-duration borrowings. See [our Cash-Out Refinance vs HELOC Calculator](/calculators/finance/cash-out-refinance-vs-heloc-calculator).`}

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
          { name: "Real Estate ROI Calculator", href: "/calculators/finance/real-estate-roi-calculator", icon: "🏠", desc: "Free calculator" },          { name: "Rental Yield Calculator", href: "/calculators/finance/rental-yield-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "REIT vs Direct Property USA Calculator", href: "/calculators/finance/reit-vs-direct-property-usa-calculator", icon: "🏢", desc: "Free calculator" },          { name: "S&P500 vs Real Estate USA Calculator", href: "/calculators/finance/sp500-vs-real-estate-usa-calculator", icon: "📊", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "Home Affordability Calculator", href: "/calculators/finance/home-affordability-calculator", icon: "💰", desc: "Free calculator" },          { name: "Rent vs Buy Calculator", href: "/calculators/finance/rent-vs-buy-calculator", icon: "🔄", desc: "Free calculator" },          { name: "Down Payment Calculator", href: "/calculators/finance/down-payment-calculator", icon: "💵", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },
          ]}
        />
      
    </CalculatorLayout>
  )
}
