'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { calculateIncomeTax } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { DollarSign, Percent, TrendingDown, Shield } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [income, setIncome] = useState(1200000)
  const [regime, setRegime] = useState<'old' | 'new'>('new')
  const [sec80C, setSec80C] = useState(150000)
  const [sec80D, setSec80D] = useState(25000)
  const [hra, setHra] = useState(0)

  const r = useMemo(() => calculateIncomeTax(income, regime, { sec80C, sec80D, hra, lta: 0, stdDeduction: 50000 }), [income, regime, sec80C, sec80D, hra])
  const rOther = useMemo(() => calculateIncomeTax(income, regime === 'new' ? 'old' : 'new', { sec80C, sec80D, hra, lta: 0, stdDeduction: 50000 }), [income, regime, sec80C, sec80D, hra])

  const pie = [
    { name: 'Net In-Hand', value: r.netIncome, color: '#16a34a' },
    { name: 'Income Tax', value: r.incomeTax, color: '#f87171' },
    { name: 'Cess (4%)', value: r.cess, color: '#fbbf24' },
    ...(r.surcharge > 0 ? [{ name: 'Surcharge', value: r.surcharge, color: '#a78bfa' }] : []),
  ]

  return (
    <CalculatorLayout title="Income Tax Calculator USA 2026" description="Calculate your federal income tax, effective rate, and marginal bracket with 2026 IRS brackets." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Tax Details - FY 2026-27</h2>
          <div className="space-y-4">
            <InputField label="Annual Gross Income" value={income} onChange={setIncome} min={100000} max={50000000} step={50000} prefix="₹" />
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Tax Regime</label>
              <div className="grid grid-cols-2 gap-2">
                {(['new', 'old'] as const).map(t => (
                  <button key={t} onClick={() => setRegime(t)}
                    className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${regime === t ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {t === 'new' ? '✨ New Regime' : '📋 Old Regime'}
                  </button>
                ))}
              </div>
            </div>
            {regime === 'old' && (
              <div className="space-y-3 p-3 rounded-xl bg-gray-50 border border-gray-200">
                <p className="text-xs font-bold text-gray-600">Old Regime Deductions</p>
                <InputField label="Tax Deductions (80C/IRA equiv.)" value={sec80C} onChange={setSec80C} min={0} max={150000} step={5000} prefix="₹" />
                <InputField label="Health Insurance Deduction" value={sec80D} onChange={setSec80D} min={0} max={50000} step={1000} prefix="₹" />
                <InputField label="HRA Exemption" value={hra} onChange={setHra} min={0} max={500000} step={5000} prefix="₹" />
              </div>
            )}
          </div>
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-xs font-bold text-amber-700 mb-1">💡 Regime Comparison</p>
            <div className="text-xs text-amber-700 space-y-1">
              <div className="flex justify-between"><span>New Regime Tax</span><span className="font-bold">{regime === 'new' ? fmt(r.totalTax) : fmt(rOther.totalTax)}</span></div>
              <div className="flex justify-between"><span>Old Regime Tax</span><span className="font-bold">{regime === 'old' ? fmt(r.totalTax) : fmt(rOther.totalTax)}</span></div>
              <div className="flex justify-between border-t border-amber-300 pt-1"><span>You Save (with {r.totalTax < rOther.totalTax ? regime : (regime === 'new' ? 'old' : 'new')} regime)</span><span className="font-bold text-green-700">{fmt(Math.abs(r.totalTax - rOther.totalTax))}</span></div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total Tax Payable" value={fmt(r.totalTax)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Net In-Hand" value={fmt(r.netIncome)} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Effective Rate" value={`${r.effectiveRate}%`} icon={<Percent className="w-4 h-4" />} />
            <ResultCard label="Taxable Income" value={fmt(r.taxableIncome)} icon={<TrendingDown className="w-4 h-4" />} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Tax Breakdown</h3>
              <div style={{ height: 180 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pie} cx="50%" cy="50%" innerRadius={50} outerRadius={75} dataKey="value" paddingAngle={2}>
                      {pie.map((e, i) => <Cell key={i} fill={e.color} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => [fmt(v), '']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-1 mt-1">
                {pie.map(e => <div key={e.name} className="flex items-center gap-1.5 text-xs"><div className="w-2 h-2 rounded-full" style={{ background: e.color }} />{e.name}</div>)}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-bold text-gray-800 mb-3">Slab-wise Tax</h3>
              <div className="space-y-2 max-h-52 overflow-y-auto">
                {r.breakdown.map((row, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100 text-xs">
                    <div>
                      <p className="font-semibold text-gray-700">{row.slab}</p>
                      <p className="text-gray-400">@ {row.rate}</p>
                    </div>
                    <p className="font-bold text-gray-900">{fmt(row.taxAmount)}</p>
                  </div>
                ))}
                {r.cess > 0 && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-amber-50 border border-amber-100 text-xs">
                    <p className="font-semibold text-amber-700">Health &amp; Education Cess (4%)</p>
                    <p className="font-bold text-amber-700">{fmt(r.cess)}</p>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-3">New vs Old Regime</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { regime: 'New Regime', tax: regime === 'new' ? r.totalTax : rOther.totalTax, inhand: regime === 'new' ? r.netIncome : rOther.netIncome },
                  { regime: 'Old Regime', tax: regime === 'old' ? r.totalTax : rOther.totalTax, inhand: regime === 'old' ? r.netIncome : rOther.netIncome },
                ]} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="regime" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={70} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [fmt(v), '']} />
                  <Bar dataKey="tax" name="Tax Payable" fill="#f87171" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="inhand" name="In-Hand" fill="#16a34a" radius={[4, 4, 0, 0]} />
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
          <h2 className="text-xl font-black text-gray-900 mb-4">Income Tax Calculator - New vs Old Regime Complete Guide FY 2026-2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">New Tax Regime vs Old Tax Regime - Key Differences</h3>
              <p>India has two income tax regimes since 2020. New Regime (default from FY 2023-24): Lower tax rates, higher standard deduction ($75,000 from FY 2024-25), but most deductions and exemptions are not available. Cannot claim: 80C, 80D, housing allowance, LTA, home loan interest (24b), state payroll tax, etc. Old Regime: Higher tax rates, but allows all deductions and exemptions. Can claim: 80C ($1.5L), 80D ($25-50K), housing allowance exemption, LTA, home loan interest (up to $2L under 24b), standard deduction ($50,000), 401(k) pension under 80CCD(1B) ($50K). The regime that saves more tax depends on your total eligible deductions.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">New Regime Tax Slabs FY 2026-2026 (Tax Year 2026)</h3>
              <p>New regime slabs (post-Budget 2026-26): 0% tax up to $4 thousand. 5% on $4-8 thousand. 10% on $8-12 thousand. 15% on $12-16 thousand. 20% on $16-20 thousand. 25% on $20-24 thousand. 30% above $24 thousand. Tax rebate under standard deduction: Up to $60,000 rebate if total income {'<'}= $12 thousand (new regime), making income effectively tax-free up to $12 thousand. Standard deduction: $75,000 for salaried. So income up to $12.75 thousand faces zero tax under new regime (after $75K standard deduction + $12L rebate limit). This is a significant benefit for salaried middle class.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Who Benefits From Old Regime?</h3>
              <p>Old regime benefits those with high deductions. Break-even analysis: If total deductions (80C + 80D + housing allowance + Home loan interest + LTA + others) exceed approximately $3-4 thousands, old regime often wins. High-deduction scenarios: Home loan borrower ($2L interest u/s 24b + $1.5L principal u/s 80C + housing allowance = potentially $4.5-5L deductions). Renter in metro ($1.5L 80C + large housing allowance exemption + 80D = $3-4L deductions). Business professional with significant expenses. For income above $25-30 thousands with these deductions, old regime can save $50,000-$1.5 thousand in tax annually. Always calculate both with our calculator before choosing.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">How to File Form 1040 and Key Deadlines</h3>
              <p>Income Tax Return (Form 1040) filing calendar for FY 2026-2026 (Tax Year 2026): July 31, 2027: Due date for individuals (non-audit cases) - file Form 1040-1 (Sahaj) for salaried, Form 1040-2 for capital gains. October 31, 2027: Due date for audit cases (businesses, professions). December 31, 2027: Last date for belated return (with late fee: $1,000 if income {'<'}=5L; $5,000 otherwise). Use your Form 26AS and AIS (Annual Information Statement) to verify federal withholding credits before filing. Common Form 1040 forms: Form 1040-1 (salaried, one house property, income {'<'}=$50L), Form 1040-2 (capital gains, multiple properties, foreign income), Form 1040-3 (business income), Form 1040-4 Sugam (presumptive business/profession).</p>
            </div>
          </div>
        </Card>
      </div>

            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Income Tax Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          On a $75,000 salary, the 50/30/20 rule suggests: <strong>$37,500</strong> for needs, $22,500 for wants, and $15,000 for savings and debt repayment.
        </p>
        <p className="text-sm text-gray-600">
          This Income Tax USA 2026 planner helps you allocate your income optimally and track progress toward your financial goals.
        </p>
      </Card>
      <SEOContent
        title="Income Tax Calculator USA 2026"
        category="finance"
        intro={`US federal income tax uses a progressive marginal rate system — which is the source of one of the most persistent tax misconceptions: that earning more money can somehow result in taking home less money because you've entered a higher bracket. This is simply not how it works. Each dollar of income is taxed only at its marginal rate — the rate applicable to that bracket — not at that rate on all income.

The difference between marginal rate and effective rate matters enormously. In 2024, a single filer with $100,000 in taxable income pays 10% on the first $11,600, 12% on income from $11,600 to $47,150, 22% on income from $47,150 to $100,525 — giving a marginal rate of 22% but an effective rate of approximately 16.8%. The marginal rate is relevant for evaluating additional income, deductions, or Roth vs. traditional decisions; the effective rate shows the actual tax burden.

State income taxes vary dramatically: no income tax in Texas, Florida, Nevada, Wyoming, South Dakota, Washington, and New Hampshire; flat taxes in some states; progressive rates up to 13.3% in California and 10.9% in New York. State taxes add a significant layer that federal-only calculations miss.`}
        howItWorks={`Federal tax calculation: Apply tax brackets progressively to taxable income (gross income minus above-the-line deductions minus standard or itemized deduction). 2024 standard deduction: $14,600 single, $29,200 married filing jointly.

AGI and taxable income: Adjusted Gross Income (AGI) = gross income minus above-the-line adjustments (HSA contributions, student loan interest, traditional IRA contributions, self-employment expenses). Taxable income = AGI minus standard or itemized deductions minus QBI deduction if applicable.

Credits vs deductions: Deductions reduce taxable income (saving taxes at your marginal rate). Credits reduce taxes owed dollar-for-dollar — generally more valuable. Child Tax Credit ($2,000/child), Child and Dependent Care Credit, and education credits are common examples.`}
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
        tipsSection={`Timing income and deductions to your advantage: If you expect a lower income year (sabbatical, job change, retirement transition), accelerate income into that lower-tax year. If you expect a higher income year, defer income and accelerate deductions. This tax timing is legal and can save thousands.

For people who are close to itemized deduction thresholds: bunching charitable deductions in alternating years (large charity donation every other year) combined with the standard deduction in off years can produce better total deductions than spreading charitable giving evenly.

Quarterly estimated taxes: If you have significant income not subject to withholding (self-employment, investments, side income), calculate and pay quarterly estimates to avoid underpayment penalties. The IRS penalty applies when withholding plus estimates cover less than 90% of current year liability or 100% of prior year liability.`}
        conclusion={`The most actionable insight from running income tax calculations: identify your current marginal rate, then evaluate every deduction, pre-tax contribution, and tax credit in terms of that marginal rate. A 22% bracket taxpayer saves $220 in taxes for every $1,000 of traditional 401k contribution. A 32% bracket taxpayer saves $320 for the same contribution — a much stronger argument for traditional over Roth.

Software like TurboTax or Tax Act provides accurate calculations with state tax integration. This calculator helps you understand the structure and make year-round planning decisions. For complex situations (multiple income sources, business income, significant investments), consider a CPA for at least an annual review.`}

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
