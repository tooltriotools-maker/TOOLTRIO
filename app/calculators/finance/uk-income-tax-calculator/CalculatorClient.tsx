'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateUKIncomeTax } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const [grossIncome, setGrossIncome] = useState(55000)
  const [pensionContrib, setPensionContrib] = useState(2750)

  const result = useMemo(() => calculateUKIncomeTax(grossIncome, pensionContrib),
    [grossIncome, pensionContrib])

  const fmt = (v: number) => `£${Math.round(v).toLocaleString()}`

  const deductionData = [
    { name: 'Income Tax', value: result.incomeTax, fill: '#ef4444' },
    { name: 'National Insurance', value: result.nationalInsurance, fill: '#f97316' },
    { name: 'Pension', value: result.pensionContrib, fill: '#22c55e' },
    { name: 'Take-Home', value: result.netIncome, fill: '#3b82f6' },
  ]

  // Salary comparison
  const salaryPoints = [20000, 30000, 40000, 50000, 60000, 80000, 100000, 125000, 150000].map(s => {
    const r = calculateUKIncomeTax(s, 0)
    return { salary: `£${s >= 1000 ? (s/1000).toFixed(0)+'k' : s}`, net: r.netIncome, tax: r.incomeTax, ni: r.nationalInsurance, effectiveRate: r.effectiveTaxRate }
  })

  const is60PctTrap = grossIncome > 100000 && grossIncome < 125140
  const taperedPA = result.effectivePa

  return (
    <CalculatorLayout title="UK Income Tax Calculator 2026" description="Calculate take-home pay after PAYE income tax, National Insurance, and pension contributions." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-4">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">2026/26 Tax Year</h2>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Gross Income</label>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 font-bold text-sm">£</span>
              <input type="number" value={grossIncome} onChange={e => setGrossIncome(Number(e.target.value))} step={1000}
                className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right text-lg" />
            </div>
          </div>

          <div className="space-y-1">
            <input type="range" min={10000} max={200000} step={1000} value={grossIncome} onChange={e => setGrossIncome(Number(e.target.value))} className="w-full accent-green-500" />
            <div className="flex justify-between text-xs text-gray-400"><span>£10k</span><span>£100k</span><span>£200k</span></div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <label className="text-xs font-medium text-gray-600">Pension Contribution</label>
              <span className="text-xs text-gray-400">{grossIncome > 0 ? ((pensionContrib / grossIncome) * 100).toFixed(1) : 0}% of salary</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2">
              <span className="text-green-600 font-bold text-sm">£</span>
              <input type="number" value={pensionContrib} onChange={e => setPensionContrib(Number(e.target.value))} step={500}
                className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>

          {is60PctTrap && (
            <div className="bg-red-50 border border-red-300 rounded-xl p-3 text-xs text-red-700">
              <p className="font-bold mb-1">⚠️ 60% Effective Tax Trap</p>
              <p>Your income of {fmt(grossIncome)} falls in the £100k-£125,140 band where Personal Allowance tapers. Effective marginal rate = 60%.</p>
              <p className="mt-1 font-semibold">Pension contribution to avoid trap: {fmt(grossIncome - 100000)}</p>
            </div>
          )}

          {!is60PctTrap && (
            <div className="space-y-1.5 bg-gray-50 rounded-xl p-3 text-xs">
              <div className="flex justify-between"><span className="text-gray-500">Personal Allowance</span><span className="font-bold">{fmt(taperedPA)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Effective Tax Rate</span><span className="font-bold">{result.effectiveTaxRate}%</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Total Deduction Rate</span><span className="font-bold">{result.totalDeductionRate}%</span></div>
            </div>
          )}
        </Card>

        <div className="lg:col-span-2 space-y-4">
          {/* Main payslip */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500">Gross Income</p>
                <p className="text-2xl font-black text-gray-800">{fmt(grossIncome)}</p>
              </div>
              <div className="bg-green-600 text-white rounded-xl p-3">
                <p className="text-xs text-green-100">Monthly Take-Home</p>
                <p className="text-2xl font-black">{fmt(result.monthlyNet)}</p>
              </div>
              <div className="bg-white rounded-xl p-3">
                <p className="text-xs text-gray-500">Annual Net</p>
                <p className="text-2xl font-black text-gray-800">{fmt(result.netIncome)}</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-green-200">
              <div className="text-center">
                <p className="text-xs text-gray-500">Income Tax</p>
                <p className="text-lg font-black text-red-500">{fmt(result.incomeTax)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">National Insurance</p>
                <p className="text-lg font-black text-orange-500">{fmt(result.nationalInsurance)}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Pension (employee)</p>
                <p className="text-lg font-black text-green-600">{fmt(result.pensionContrib)}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Income Breakdown</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deductionData} cx="50%" cy="50%" outerRadius={80} innerRadius={40} dataKey="value" paddingAngle={2} label={({ percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                      {deductionData.map((e, i) => <Cell key={i} fill={e.fill} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Tax by Income Level</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salaryPoints} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="salary" tick={{ fill: '#374151', fontSize: 9 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={55} tickFormatter={v => `£${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => fmt(v)} contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 10 }} />
                    <Bar dataKey="net" name="Take-Home" fill="#22c55e" stackId="a" />
                    <Bar dataKey="tax" name="Income Tax" fill="#ef4444" stackId="a" />
                    <Bar dataKey="ni" name="NI" fill="#f97316" stackId="a" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">UK Income Tax Calculator - PAYE, NI and Take-Home Pay 2026/26 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">UK Income Tax Bands 2026/26</h3>
              <p>The UK uses a progressive tax system with four bands. Personal Allowance: £12,570 - no tax on this amount. Basic Rate: 20% on £12,571-£50,270. Higher Rate: 40% on £50,271-£125,140. Additional Rate: 45% above £125,140. The Personal Allowance tapers for high earners: £1 reduction for every £2 earned above £100,000, creating an effective 60% marginal rate between £100,000-£125,140. Scotland has separate rates: 19% starter rate, 20% basic, 21% intermediate, 42% higher, 45% advanced, 48% top rate.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">National Insurance 2026/26</h3>
              <p>Employee Class 1 NI contributions in 2026/26: 8% on earnings between Primary Threshold (£12,570/year) and Upper Earnings Limit (£50,270/year). Above UEL: 2% on all additional earnings. NI is separate from income tax and does not use the personal allowance. Employer NI (not shown here) is 13.8% on earnings above £9,100 (Secondary Threshold, reduced from April 2026). Salary sacrifice pension contributions reduce NI as well as income tax - a significant advantage for both employee and employer.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">The £100,000 Income Trap</h3>
              <p>Earning between £100,000 and £125,140 creates an effective marginal tax rate of 60%. For each £2 of income above £100,000, £1 of Personal Allowance is lost. This means paying 40% tax on the extra income plus 40% tax on the allowance withdrawn (which now becomes taxable). The solution: pension contributions reduce your adjusted net income. A higher-rate taxpayer earning £110,000 who makes £10,000 of pension contributions drops their adjusted income to £100,000, preserving the full Personal Allowance and saving approximately £4,000 in tax - an effective 40% relief on the pension contribution plus another 20% from saving the Personal Allowance.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Maximising Take-Home Pay Legally</h3>
              <p>Key strategies: (1) Salary sacrifice pension contributions reduce income tax and NI simultaneously. (2) ISA contributions shelter investment returns from all future tax - the best wrapper for higher-rate taxpayers. (3) Charitable donations via Gift Aid extend your basic rate band - £100 donated via Gift Aid costs a higher-rate taxpayer £60 net. (4) Marriage Allowance: basic rate taxpayer with partner earning below personal allowance can transfer £1,260 of allowance, saving £252/year. (5) Cycle to Work scheme: up to £1,000 in cycling equipment via salary sacrifice. (6) Working from home allowance: £6/week tax relief for homeworkers.</p>
            </div>
          </div>
        </Card>
  

      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "UK Pension Calculator", href: "/calculators/finance/uk-pension-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "ISA Calculator", href: "/calculators/finance/isa-calculator", icon: "💰", desc: "Free calculator" },          { name: "UK Stamp Duty Calculator", href: "/calculators/finance/uk-stamp-duty-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Buy To Let vs Stocks Calculator", href: "/calculators/finance/uk-buy-to-let-vs-stocks-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Help To Buy vs LISA Calculator", href: "/calculators/finance/uk-help-to-buy-vs-lisa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Lifetime ISA vs SIPp Calculator", href: "/calculators/finance/uk-lifetime-isa-vs-sipp-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Premium Bonds vs Cash ISA Calculator", href: "/calculators/finance/uk-premium-bonds-vs-cash-isa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Pension vs ISA Calculator", href: "/calculators/finance/uk-pension-vs-isa-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Fixed Rate vs Tracker Mortgage Calculator", href: "/calculators/finance/uk-fixed-rate-vs-tracker-mortgage-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Stocks vs Bonds Calculator", href: "/calculators/finance/uk-stocks-vs-bonds-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Pension Drawdown vs Annuity Calculator", href: "/calculators/finance/uk-pension-drawdown-vs-annuity-calculator", icon: "📊", desc: "Free calculator" },          { name: "UK Remortgage vs Invest Calculator", href: "/calculators/finance/uk-remortgage-vs-invest-calculator", icon: "📊", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          UK Income Tax Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          On a $75,000 salary, the 50/30/20 rule suggests: <strong>$37,500</strong> for needs, $22,500 for wants, and $15,000 for savings and debt repayment.
        </p>
        <p className="text-sm text-gray-600">
          This UK Income Tax USA 2026 planner helps you allocate your income optimally and track progress toward your financial goals.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          UK Income Tax Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, on a GBP 80,000 UK salary, your UK income tax calculator 2026 shows exact income tax, NI, and take-home pay — plus the tax saving from increasing pension contributions.
        </p>
      </Card>

            <SEOContent
        title="UK Income Tax Calculator – What Is Your Take-Home Pay After PAYE and National Insurance in 2026?"
        category="finance"
        intro={`UK income tax has a deceptively simple headline rate structure that conceals several genuine complexities: the personal allowance tapering above £100,000, the 60% effective marginal rate trap between £100,000-£125,140, National Insurance contributions, and Scottish income tax rates that differ from the rest of the UK for higher earners.

The 60% marginal rate trap at £100,000-£125,140 is one of the UK tax system's most significant anomalies. For every £2 you earn above £100,000, you lose £1 of your personal allowance (£12,570 in 2024-25). This means the effective marginal rate in this band is 40% income tax + 20% rate (loss of allowance that was sheltering income at 40% rate) = 60% effective marginal rate. For anyone with income near this threshold, pension contributions or other income-reduction strategies deserve immediate attention.

National Insurance is a separate calculation that many people forget when thinking about their total tax bill. Employees pay 8% NI on earnings between £12,570 and £50,270 and 2% above £50,270. Combined with income tax, the effective marginal rate for an employee earning £35,000-£50,270 is 32% + 8% = 40% of additional earned income — making pension contributions and salary sacrifice extremely valuable at this income level.`}
        howItWorks={`Income tax calculation: Apply rates progressively to income above personal allowance (£12,570 in 2024-25, reduced by £1 for every £2 of income above £100,000). Basic rate: 20% on £12,571-£50,270. Higher rate: 40% on £50,271-£125,140. Additional rate: 45% above £125,141.

National Insurance (employee): 0% on first £12,570. 8% on £12,570-£50,270. 2% above £50,270. NI is calculated per week/month based on actual pay, not annualized.

Take-home calculation: Gross salary - income tax - NI - pension contribution (if salary sacrifice) - student loan repayment (if applicable, 9% of income above Plan 1/2/5 thresholds) = take-home pay. Scotland uses different income tax bands (Scottish Basic: 20%, Intermediate: 21%, Higher: 42%, Advanced: 45%, Top: 48%) from the rest of the UK.`}
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
        tipsSection={`For earnings approaching £100,000: pension contributions made through salary sacrifice reduce gross income for both income tax and NI purposes. Contributing £10,000 to pension reduces income from £105,000 to £95,000 — staying below the personal allowance taper and saving at effective 60% rate. Every £10,000 of pension contribution in this band saves £6,000 in tax, net of the pension contribution itself.

For employees near £50,270: crossing into the 40% rate band triggers higher rate on additional income AND loss of the 20% basic rate. Salary sacrifice pension contributions avoid NI as well as income tax — the combined saving is 40% income tax + 2% NI = 42% marginal benefit on each pound contributed at this level.

Scottish taxpayers should model with Scottish rates specifically — the 21% intermediate rate and 42% higher rate (above £43,662) differ from rUK rates and affect the calculation of pension contribution benefits.`}
        conclusion={`UK income tax complexity rewards people who invest time in understanding their specific situation. The personal allowance taper, Scottish rates, and pension salary sacrifice interactions create opportunities for legal tax reduction that aren't obvious from the headline rates.

For most UK employees, the three highest-leverage tax actions are: (1) contribute to workplace pension via salary sacrifice to maximize NI savings, (2) understand your position relative to the £100,000 personal allowance taper, and (3) consider ISA contributions for investment income that would otherwise be taxable. Fee-only UK financial planners or accountants can identify additional tax-planning opportunities specific to your situation.`}

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
            { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Paycheck Calculator", href: "/calculators/finance/paycheck-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Roth Conversion Calculator", href: "/calculators/finance/roth-conversion-calculator", icon: "🔗", desc: "Related financial tool" },
            { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "🔗", desc: "Related financial planning" },
            { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "🔗", desc: "Related financial planning" },
        ]}
      />
      <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
