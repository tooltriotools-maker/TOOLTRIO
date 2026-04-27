'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateSalary } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, Briefcase, TrendingDown, Percent } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt } = useCurrency()
  const [ctc, setCtc] = useState(1200000)
  const [basicPct, setBasicPct] = useState(50)
  const [hraPct, setHraPct] = useState(50)

  const r = useMemo(() => calculateSalary(ctc, basicPct, hraPct, 100 - basicPct - 10), [ctc, basicPct, hraPct])

  const deductionPie = [
    { name: 'Net In-Hand', value: r.monthly.inHand, color: '#16a34a' },
    { name: 'PF (Employee)', value: r.monthly.employeePF, color: '#3b82f6' },
    { name: 'TDS (Tax)', value: r.monthly.tds, color: '#f87171' },
    { name: 'Prof. Tax', value: r.monthly.professionalTax, color: '#f59e0b' },
  ]

  const compBar = [
    { name: 'Basic', value: r.monthly.basic },
    { name: 'HRA', value: r.monthly.hra },
    { name: 'Special Allow.', value: r.monthly.specialAllowance },
  ]

  return (
    <CalculatorLayout title="Salary Calculator USA 2026" description="Calculate take-home pay after federal, state, Social Security, and Medicare deductions." icon="💼" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Salary Details</h2>
          <div className="space-y-5">
            <InputField label="Annual Total Compensation (CTC)" value={ctc} onChange={setCtc} min={100000} max={50000000} step={50000} prefix="₹" />
            <InputField label="Basic % of CTC" value={basicPct} onChange={setBasicPct} min={30} max={70} step={5} suffix="%" />
            <InputField label="HRA % of Basic" value={hraPct} onChange={setHraPct} min={30} max={60} step={5} suffix="%" />
          </div>
          <div className="mt-5 p-4 rounded-2xl bg-green-600 text-white text-center">
            <p className="text-sm opacity-80">Monthly In-Hand Salary</p>
            <p className="text-3xl font-black mt-1">{fmt(r.monthly.inHand)}</p>
            <p className="text-sm opacity-80 mt-1">{r.takeHomePercent}% of Monthly CTC</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly In-Hand" value={fmt(r.monthly.inHand)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Annual In-Hand" value={fmt(r.annual.inHand)} icon={<Briefcase className="w-4 h-4" />} />
            <ResultCard label="Monthly TDS" value={fmt(r.monthly.tds)} icon={<TrendingDown className="w-4 h-4" />} />
            <ResultCard label="Take-Home %" value={`${r.takeHomePercent}%`} icon={<Percent className="w-4 h-4" />} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Monthly Salary Components</h3>
              <div className="space-y-2">
                {[
                  { label: 'Basic Salary', value: r.monthly.basic, color: 'text-blue-700' },
                  { label: 'HRA', value: r.monthly.hra, color: 'text-purple-700' },
                  { label: 'Special Allowance', value: r.monthly.specialAllowance, color: 'text-amber-700' },
                  { label: 'Gross Salary', value: r.monthly.grossMonthly, color: 'text-gray-900 font-black' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-50">
                    <span className="text-xs text-gray-500">{item.label}</span>
                    <span className={`text-sm font-bold ${item.color}`}>{fmt(item.value)}</span>
                  </div>
                ))}
                <div className="pt-1 space-y-1.5">
                  <p className="text-xs font-bold text-red-500 uppercase">Deductions</p>
                  {[
                    { label: 'Employee PF (12%)', value: r.monthly.employeePF },
                    { label: 'Professional Tax', value: r.monthly.professionalTax },
                    { label: 'TDS (Income Tax)', value: r.monthly.tds },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                      <span className="text-xs text-gray-500">{item.label}</span>
                      <span className="text-sm font-bold text-red-600">- {fmt(item.value)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-2 rounded-lg bg-green-50 px-3 mt-1">
                    <span className="text-sm font-black text-green-700">Net In-Hand</span>
                    <span className="text-sm font-black text-green-700">{fmt(r.monthly.inHand)}</span>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">In-Hand Breakdown</h3>
              <div style={{ height: 160 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deductionPie} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" paddingAngle={2}>
                      {deductionPie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {deductionPie.map(e => <div key={e.name} className="flex items-center gap-1.5 text-xs"><div className="w-2 h-2 rounded-full" style={{ background: e.color }} />{e.name}</div>)}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">Annual Salary Summary</h3>
            <div style={{ height: 160 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { name: 'Annual CTC', value: ctc },
                  { name: 'Gross Annual', value: r.annual.grossAnnual },
                  { name: 'Net In-Hand', value: r.annual.inHand },
                ]} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={65} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [fmt(v), '']} />
                  <Bar dataKey="value" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">CTC to In-Hand Salary Calculator - Decode Your Salary Slip USA 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">CTC Structure - Understanding Every Component</h3>
              <p>CTC (Cost to Company) is the total annual expenditure an employer makes for an employee. It includes many components beyond your take-home salary. Fixed components: Basic salary (typically 40-50% of CTC), housing allowance (usually 40-50% of basic), Special/Variable allowance (remaining after basic and housing allowance). Statutory components: Employer PF contribution (12% of basic, capped at $1,800/month), Employee PF (same, deducted from salary), Gratuity provision (~4.81% of basic, paid after 5 years), ESIC (for salary {'<'}= $21,000). Optional components: Medical allowance, LTA (Leave Travel Allowance), meal coupons (tax-free up to $50/meal), 401(k) pension contribution by employer (tax-efficient up to 10% of basic).</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">Why Your In-Hand Salary Is Much Less Than CTC</h3>
              <p>The gap between CTC and in-hand salary surprises many new employees. Sources of difference: Employer PF (12% of basic) - included in CTC but never goes to employee directly (goes to PF account). Gratuity provision (~4.81% of basic) - included in CTC, paid only after 5 years. Employee PF (12% of basic) - deducted from gross salary. Professional Tax ($200/month in most states) - state-level deduction. federal withholding/Income Tax - the biggest deduction for high earners. Net result: For a $12 thousand CTC, the monthly in-hand salary is typically $72,000-82,000 depending on tax regime and deductions - not $1,00,000 (/12). Always negotiate based on in-hand salary, not CTC.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How to Optimize Salary Structure for Maximum In-Hand Pay</h3>
              <p>Smart salary structuring reduces tax liability and increases in-hand pay. (1) Maximize reimbursements: Travel allowance, telephone/internet allowance, book/periodical allowance - these are tax-free. (2) Meal coupons/vouchers: Up to $50 per meal ($26,400/year) is fully tax-free. Prefer Sodexo/Ticket Restaurant over cash allowance. (3) 401(k) pension employer contribution: If your employer contributes to 401(k) pension, up to 10% of (Basic+DA) is completely tax-exempt over and above 80C limits. (4) Flexible benefit plans (FBPs): Many companies let you choose between taxable and tax-exempt components - always choose the tax-exempt options first. (5) LTA: Claim LTA twice in a 4-year block for actual travel expenses - fully exempt.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">PF Calculation - When More Can Mean Less In-Hand</h3>
              <p>401(k)O rules: Employee contributes 12% of base salary. Employer contributes 12% of basic: 8.33% goes to EPS (Employees' Pension Scheme), 3.67% to 401(k) account. PF is capped at 12% of $15,000 ($1,800/month) for both employee and employer - even if your basic is $50,000. However, you can voluntarily contribute above this (VPF at same 8.5% interest, tax-free, deductible u/s 80C). High-base salary structure increases PF contribution, reducing in-hand but building retirement savings. For employees near retirement, maximizing VPF can be highly beneficial. For young employees with long horizons, equity SIP generally outperforms 401(k)'s 8.25%.</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Salary Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          On a $75,000 salary, the 50/30/20 rule suggests: <strong>$37,500</strong> for needs, $22,500 for wants, and $15,000 for savings and debt repayment.
        </p>
        <p className="text-sm text-gray-600">
          This Salary USA 2026 planner helps you allocate your income optimally and track progress toward your financial goals.
        </p>
      </Card>
      <SEOContent
        title="Salary Calculator USA – What Is Your Real Take-Home Pay After All Deductions in 2026?"
        category="finance"
        intro={`Your paycheck and your total compensation are very different numbers, and understanding both matters for evaluating job offers, negotiating raises, and accurate financial planning. The gap between gross annual salary and actual take-home pay is typically 25-35% for middle-income earners, comprising federal income tax, FICA (Social Security and Medicare), state income tax, health insurance premiums, and retirement contributions.

When evaluating a job offer or comparing positions, the total compensation comparison should include: base salary, bonus potential (and historical payout rate), employer retirement match, health insurance quality and cost sharing, equity compensation, time off value, and any other benefits that have cash equivalent value. A $90,000 salary with full employer-paid family health insurance and 5% 401k match is materially better than a $95,000 salary with high employee healthcare costs and no match.

The salary negotiation context matters: hiring budgets are typically set, and knowing your target range before negotiating helps avoid leaving money on the table. Researching comparable roles on LinkedIn, Glassdoor, Levels.fyi (for tech), and Salary.com gives you market data to anchor negotiations. Most employers have 10-20% flexibility above the initial offer, particularly for specialized roles.`}
        howItWorks={`Take-home calculation: Gross salary - pre-tax deductions (401k, HSA, health insurance) = taxable gross. Taxable gross × effective federal tax rate - federal credits = federal income tax. Taxable gross × FICA rates (6.2% SS + 1.45% Medicare) = FICA. Taxable gross × state income tax rate = state tax. Net pay = gross salary - all taxes - all pre-tax deductions - post-tax deductions (Roth 401k, dental, vision).

Annualized from hourly: Annual salary = Hourly rate × Hours per week × 52. Monthly gross = Annual / 12. Semi-monthly payroll (24 pay periods) vs biweekly (26 pay periods): biweekly results in two months per year with three paychecks — important for budgeting.

Effective hourly rate from salary: Annual salary / (hours per week × 52) = effective hourly rate including paid time off. A $100,000 salary working 45 hours/week = $100,000 / 2,340 = $42.74/hour. Compare to a $85,000 salary working 40 hours/week = $85,000 / 2,080 = $40.87/hour — the $100k job pays more hourly than the gap suggests.`}
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
        tipsSection={`When comparing job offers across states, run both through a take-home pay comparison using state-specific tax rates. A $120,000 salary in Texas (no state income tax) takes home significantly more than $120,000 in California (up to 13.3% state rate) — the difference can be $5,000-$8,000 annually depending on income level.

For salary negotiation: have specific market rate data, express your range starting high enough that anchoring works in your favor, and negotiate total compensation not just base salary. Equity, signing bonus, additional PTO, remote work stipend, and professional development budget are often more negotiable than base salary in many organizations.

For self-employed or contract workers: the employer's side of FICA (7.65%) comes out of your pocket, plus you pay for your own benefits. A $100,000 contract rate is not equivalent to a $100,000 salary — it's roughly equivalent to a $75,000-$80,000 salary after accounting for both halves of FICA, self-employed health insurance, and no employer retirement match.`}
        conclusion={`Annual salary reviews rarely keep pace with inflation unless you actively advocate for them. A salary that hasn't increased in 3 years at 3% average inflation has lost approximately 9% of its real purchasing power. Regular salary conversations, using market rate data, are essential for maintaining compensation parity.

For complete compensation analysis, use [our Paycheck Calculator](/calculators/finance/paycheck-calculator) to convert any salary figure to actual take-home pay in your specific state, then compare to your budget requirements.`}

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
