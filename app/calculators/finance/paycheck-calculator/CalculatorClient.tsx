'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculatePaycheck } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

const US_STATES = [
  { name: 'No State Tax (TX/FL/WA/NV)', rate: 0 },
  { name: 'California', rate: 9.3 },
  { name: 'New York', rate: 6.85 },
  { name: 'Illinois', rate: 4.95 },
  { name: 'Pennsylvania', rate: 3.07 },
  { name: 'Ohio', rate: 3.99 },
  { name: 'Georgia', rate: 5.49 },
  { name: 'North Carolina', rate: 4.5 },
  { name: 'Arizona', rate: 2.5 },
  { name: 'Colorado', rate: 4.4 },
]

const PAY_PERIODS = [
  { label: 'Weekly (52x)', value: 'weekly' as const },
  { label: 'Bi-Weekly (26x)', value: 'biweekly' as const },
  { label: 'Semi-Monthly (24x)', value: 'semimonthly' as const },
  { label: 'Monthly (12x)', value: 'monthly' as const },
]

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [annualSalary, setAnnualSalary] = useState(75000)
  const [payPeriod, setPayPeriod] = useState<'weekly' | 'biweekly' | 'semimonthly' | 'monthly'>('biweekly')
  const [filingStatus, setFilingStatus] = useState<'single' | 'married' | 'hoh'>('single')
  const [stateRate, setStateRate] = useState(0)
  const [contrib401k, setContrib401k] = useState(10)
  const [healthIns, setHealthIns] = useState(2400)
  const [hsa, setHsa] = useState(0)

  const result = useMemo(() => calculatePaycheck(annualSalary, payPeriod, filingStatus, 1, stateRate, contrib401k, healthIns, hsa),
    [annualSalary, payPeriod, filingStatus, stateRate, contrib401k, healthIns, hsa])

  const fmt = (v: number) => `$${Math.round(v).toLocaleString()}`

  const deductionData = [
    { name: 'Federal Tax', value: result.federalTax, fill: '#ef4444' },
    { name: 'State Tax', value: result.stateTax, fill: '#f97316' },
    { name: 'Social Security', value: result.socialSecurity, fill: '#eab308' },
    { name: 'Medicare', value: result.medicare, fill: '#84cc16' },
    { name: '401k', value: result.retirement401k, fill: '#22c55e' },
    { name: 'Health Ins.', value: result.healthInsurance, fill: '#06b6d4' },
    { name: 'HSA', value: result.hsa, fill: '#8b5cf6' },
  ].filter(d => d.value > 0)

  return (
    <CalculatorLayout title="Paycheck Calculator USA 2026" description="Calculate your exact take-home pay after federal tax, state tax, Social Security, and Medicare." icon="💵" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Paycheck Details</h2>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Gross Salary</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualSalary} onChange={e => setAnnualSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Pay Frequency</label>
            <div className="grid grid-cols-2 gap-1.5">
              {PAY_PERIODS.map(p => (
                <button key={p.value} onClick={() => setPayPeriod(p.value)}
                  className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all text-center ${payPeriod === p.value ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Filing Status</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(['single', 'married', 'hoh'] as Array<'single'|'married'|'hoh'>).map((val) => {
                const labelMap: Record<string,string> = {single:'Single',married:'Married',hoh:'HoH'}
                return (
                  <button key={val} onClick={() => setFilingStatus(val)}
                    className={`py-2 rounded-xl text-xs font-semibold transition-all ${filingStatus === val ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {labelMap[val]}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">State</label>
            <select value={stateRate} onChange={e => setStateRate(Number(e.target.value))} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 outline-none">
              {US_STATES.map(s => <option key={s.name} value={s.rate}>{s.name} ({s.rate}%)</option>)}
            </select>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">401k Contribution</label>
              <span className="text-xs font-bold text-gray-700">{contrib401k}%</span>
            </div>
            <input type="range" min={0} max={25} value={contrib401k} onChange={e => setContrib401k(Number(e.target.value))} className="w-full accent-green-500" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Health Ins/yr</label>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <span className="text-green-600 text-xs">$</span>
                <input type="number" value={healthIns} onChange={e => setHealthIns(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">HSA/yr</label>
              <div className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
                <span className="text-green-600 text-xs">$</span>
                <input type="number" value={hsa} onChange={e => setHsa(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-sm" />
              </div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="p-5 rounded-2xl bg-green-50 border-2 border-green-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-500 mb-1">Gross Pay</p>
                <p className="text-2xl font-black text-gray-800">{fmt(result.grossPerPeriod)}</p>
                <p className="text-xs text-gray-500">per paycheck</p>
              </div>
              <div className="border-x border-green-200">
                <p className="text-xs text-gray-500 mb-1">Take-Home Pay</p>
                <p className="text-3xl font-black text-green-700">{fmt(result.netPay)}</p>
                <p className="text-xs text-green-600">per paycheck</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Annual Net</p>
                <p className="text-2xl font-black text-gray-800">{fmt(result.annualNet)}</p>
                <p className="text-xs text-gray-500">per year</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-green-200">
              <div className="flex justify-between text-xs">
                <span className="text-gray-500">Effective Federal Rate: <span className="font-bold text-gray-700">{result.effectiveFederalRate}%</span></span>
                <span className="text-gray-500">Total Deductions: <span className="font-bold text-gray-700">{fmt(result.grossPerPeriod - result.netPay)}</span> per check</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Deduction Breakdown</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deductionData} cx="50%" cy="50%" outerRadius={80} innerRadius={40} dataKey="value" paddingAngle={2}>
                      {deductionData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Per-Paycheck Breakdown</h3>
              <div className="space-y-2">
                {[
                  { label: 'Gross Pay', value: result.grossPerPeriod, color: 'bg-gray-200' },
                  { label: 'Federal Income Tax', value: -result.federalTax, color: 'bg-red-400' },
                  { label: 'State Income Tax', value: -result.stateTax, color: 'bg-orange-400' },
                  { label: 'Social Security', value: -result.socialSecurity, color: 'bg-yellow-400' },
                  { label: 'Medicare', value: -result.medicare, color: 'bg-lime-400' },
                  { label: '401k (Pre-Tax)', value: -result.retirement401k, color: 'bg-green-500' },
                  { label: 'Health Insurance', value: -result.healthInsurance, color: 'bg-cyan-400' },
                  { label: 'HSA', value: -result.hsa, color: 'bg-purple-400' },
                  { label: 'Net Take-Home', value: result.netPay, color: 'bg-green-600' },
                ].filter(r => r.value !== 0).map(({ label, value, color }) => (
                  <div key={label} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${color}`} />
                      <span className="text-gray-600">{label}</span>
                    </div>
                    <span className={`font-bold ${value < 0 ? 'text-red-500' : 'text-green-700'}`}>{value < 0 ? '-' : ''}{fmt(Math.abs(value))}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">Paycheck Calculator - Understand Every Dollar of Your Take-Home Pay USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Federal Income Tax Withholding</h3>
              <p>Federal income tax uses progressive brackets - each dollar is taxed at the rate for that bracket, not your entire income at the highest rate. In 2026, single filers pay 10% on the first $11,600, 12% on $11,600-$47,150, 22% on $47,150-$100,525, and so on. The standard deduction ($14,600 single, $29,200 married) is subtracted before applying brackets. Payroll withholding is an estimate - your actual tax is calculated when you file your annual return. If you receive a large refund, consider increasing your allowances on Form W-4 to get more money each paycheck.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">The Hidden Value of Pre-Tax Deductions</h3>
              <p>Pre-tax deductions (Traditional 401k, health insurance premiums, FSA, HSA) reduce your taxable income before calculating federal and state taxes. Contributing $7,500/year to a 401k (10% on $75,000) does not reduce your paycheck by $7,500 - it reduces by approximately $5,000-$5,500 after the tax savings. The government subsidizes your retirement savings by reducing your tax bill. This is why maxing pre-tax accounts before spending is almost always the optimal financial strategy for most Americans.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">State Income Tax Comparison</h3>
              <p>State income tax varies enormously: nine states have no income tax (Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, Wyoming) while California taxes top earners at 13.3%. For a $150,000 earner, the difference between living in Texas versus California is approximately $8,000-12,000 per year in state taxes. High-income earners in high-tax states often consider domicile planning as one of the highest-impact financial decisions available. Remote work has made this more feasible than ever for many knowledge workers.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">HSA: The Triple Tax Advantage</h3>
              <p>The Health Savings Account (HSA) is the most tax-efficient account in the US tax code, offering a triple tax advantage: contributions are pre-tax (reduce income), growth is tax-free, and withdrawals for qualified medical expenses are tax-free. For 2026, individual contribution limits are $4,300 ($8,550 family). After age 65, you can withdraw for any purpose, making it effectively a second IRA. The strategy: pay medical expenses out-of-pocket while investing HSA funds in low-cost index funds, letting the account grow tax-free for decades, then use tax-free for healthcare or taxed (but penalty-free) for anything else after 65.</p>
            </div>
          </div>
        </Card>
  
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Paycheck Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A single filer earning $85,000 in 2026 falls in the 22% federal tax bracket, paying approximately <strong>$13,234</strong> in federal income tax with an effective rate of 15.6%.
        </p>
        <p className="text-sm text-gray-600">
          This Paycheck USA 2026 calculator uses current IRS brackets to give you accurate tax estimates and take-home pay projections.
        </p>
      </Card>
      <SEOContent
        title="Paycheck Calculator USA 2026"
        category="finance"
        intro={`Most Americans have a rough idea of their annual salary but a much hazier sense of their actual take-home pay after taxes, Social Security, Medicare, and benefits deductions. This gap between gross and net is often surprising — and getting the exact number right matters for budgeting, evaluating job offers, and understanding the real cost of pre-tax benefit elections.

Federal income tax withholding depends on your W-4 filing status and allowances. State income tax varies from 0% (Texas, Florida, Nevada, and others) to over 13% (California). FICA taxes — Social Security (6.2% up to the wage base of $168,600 in 2024) and Medicare (1.45%, with an additional 0.9% above $200,000) — are flat percentages with specific cutoffs.

Pre-tax deductions — 401k contributions, HSA contributions, FSA contributions, health insurance premiums, and commuter benefits — reduce both your taxable income and your FICA base for most elections. Understanding this interaction explains why a $500/month 401k contribution reduces your paycheck by significantly less than $500 — the tax savings partially offset the contribution.`}
        howItWorks={`Federal tax withholding: Calculated on taxable gross (gross pay minus pre-tax deductions) using Publication 15-T withholding tables, adjusted for W-4 filing status and any additional withholding elected.

FICA: Social Security = 6.2% × gross wages (up to annual wage base). Medicare = 1.45% × gross wages (no cap). Additional Medicare = 0.9% × gross wages over $200,000. Unlike income tax, FICA applies to gross wages before most pre-tax deductions (health insurance premiums and a few others are FICA-exempt under Section 125 cafeteria plans).

State and local taxes: Flat, progressive, or zero depending on state. State withholding tables or flat rate applied to state taxable wages. Some states exempt certain income types that federal does not.`}
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
        tipsSection={`Review your W-4 annually and whenever your circumstances change (marriage, divorce, new child, major income change, purchase of home for mortgage interest deduction). An inaccurate W-4 either withholds too much (interest-free loan to the IRS) or too little (surprise tax bill plus possible penalties at filing).

For dual-income households: complete the W-4 worksheet for the higher-earning spouse. The second income is taxed at the marginal rate of the combined household income — common source of under-withholding and surprise tax bills for couples.

Pre-tax benefits elections significantly affect take-home pay. A $500/month 401k contribution costs approximately $390/month in take-home pay reduction for a 22% bracket employee, because the income tax and FICA savings offset $110 of the contribution. This is why calculating the actual paycheck impact before making elections matters.`}
        conclusion={`The gap between gross compensation and net take-home pay is typically 25-35% for most middle-income American workers. This is important context for salary negotiations — a $5,000 annual raise increases take-home pay by roughly $3,250-$3,750, not $5,000, depending on your marginal tax rate and state.

Understanding your marginal versus average tax rate matters for financial decisions. Your marginal rate (the rate on each additional dollar of income) is what matters for evaluating deductions, retirement contributions, and investment income. Your average rate (total taxes ÷ gross income) shows your overall tax burden. See [our Income Tax Calculator](/calculators/finance/income-tax-calculator) for detailed annual tax analysis.`}

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
          { name: "Annual Income Calculator", href: "/calculators/finance/annual-income-calculator", icon: "💰", desc: "Free calculator" },          { name: "Salary Calculator", href: "/calculators/finance/salary-calculator", icon: "💼", desc: "Free calculator" },          { name: "Salary Hike Calculator", href: "/calculators/finance/salary-hike-calculator", icon: "📈", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "📋", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },
          ]}
        />
      
    </CalculatorLayout>
  )
}
