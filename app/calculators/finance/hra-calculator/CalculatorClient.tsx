'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateHRA } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Home, DollarSign, Shield, Percent } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [basicSalary, setBasicSalary] = useState(40000)
  const [hra, setHra] = useState(20000)
  const [rentPaid, setRentPaid] = useState(18000)
  const [isMetro, setIsMetro] = useState(true)

  const r = useMemo(() => calculateHRA(basicSalary, hra, rentPaid, isMetro), [basicSalary, hra, rentPaid, isMetro])

  const conditions = [
    { name: 'Actual HRA Received', value: r.condition1, color: '#3b82f6' },
    { name: 'Rent - 10% Basic', value: r.condition2, color: '#f59e0b' },
    { name: `${isMetro ? '50' : '40'}% of Basic`, value: r.condition3, color: '#8b5cf6' },
  ]

  return (
    <CalculatorLayout title="HRA Housing Allowance Calculator 2026" description="Calculate tax exemption on house rent allowance and tax savings on rent paid." icon="🏠" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">HRA Details</h2>
          <div className="space-y-4">
            <InputField label="Basic Monthly Salary" value={basicSalary} onChange={setBasicSalary} min={1000} max={500000} step={1000} prefix={currency.symbol} />
            <InputField label="HRA Received (Monthly)" value={hra} onChange={setHra} min={0} max={300000} step={500} prefix={currency.symbol} />
            <InputField label="Actual Rent Paid (Monthly)" value={rentPaid} onChange={setRentPaid} min={0} max={300000} step={500} prefix={currency.symbol} />
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">City Type</label>
              <div className="grid grid-cols-2 gap-2">
                {[true, false].map(metro => (
                  <button key={String(metro)} onClick={() => setIsMetro(metro)}
                    className={`py-2.5 rounded-xl text-sm font-bold border-2 transition-all ${isMetro === metro ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {metro ? '🏙️ Metro (50%)' : '🏘️ Non-Metro (40%)'}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-green-50 border border-green-200">
            <p className="text-xs font-bold text-green-700 mb-2">HRA Exemption = Least of 3 conditions</p>
            <div className="space-y-1">
              {conditions.map((c, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{i+1}. {c.name}</span>
                  <span className={`font-bold ${c.value === r.hraExemption ? 'text-green-700' : 'text-gray-600'}`}>{fmt(c.value)}{c.value === r.hraExemption ? ' ✅' : ''}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="HRA Exemption" value={fmt(r.hraExemption)} highlight icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Taxable HRA" value={fmt(r.taxableHRA)} icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Annual Savings" value={fmt(r.hraExemption * 12)} icon={<Home className="w-4 h-4" />} />
            <ResultCard label="Exemption %" value={`${hra > 0 ? Math.round((r.hraExemption / hra) * 100) : 0}%`} icon={<Percent className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Three Conditions Compared</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conditions} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={65} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [fmt(v), '']} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {conditions.map((e, i) => (
                      <rect key={i} fill={e.value === r.hraExemption ? '#16a34a' : e.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-center text-gray-400 mt-2">✅ Green bar = minimum value (your HRA exemption)</p>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Monthly &amp; Annual HRA Summary</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { title: 'Monthly', items: [['HRA Received', fmt(hra)], ['HRA Exemption', fmt(r.hraExemption)], ['Taxable HRA', fmt(r.taxableHRA)], ['Rent Paid', fmt(rentPaid)]] },
                { title: 'Annual', items: [['HRA Received', fmt(hra * 12)], ['HRA Exemption', fmt(r.hraExemption * 12)], ['Taxable HRA', fmt(r.taxableHRA * 12)], ['Rent Paid', fmt(rentPaid * 12)]] },
              ].map(sec => (
                <div key={sec.title}>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">{sec.title}</p>
                  <div className="space-y-1.5">
                    {sec.items.map(([label, value]) => (
                      <div key={label} className="flex justify-between items-center py-1.5 border-b border-gray-50">
                        <span className="text-xs text-gray-500">{label}</span>
                        <span className="text-sm font-bold text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
      {/* 600-word SEO explanation */}
      <div className="mt-10">
        <Card>
          <h2 className="text-xl font-black text-gray-900 mb-4">housing allowance Calculator - Maximize Your House Rent Allowance Tax Exemption 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 leading-relaxed">
            <div>
              <h3 className="font-bold text-gray-800 mb-2">How housing allowance Exemption Saves Tax - Step by Step</h3>
              <p>housing allowance (House Rent Allowance) is a salary component provided to cover rental expenses. The housing allowance exemption reduces your taxable income under the old tax regime. Exemption = Minimum of these three conditions: (1) Actual housing allowance received from employer. (2) Actual rent paid minus 10% of base salary. (3) 50% of base salary for metro cities (New York, Los Angeles, Chicago, Houston) or 40% for smaller city / suburb cities. The minimum of all three is your tax-free housing allowance. Any housing allowance above this minimum is taxable. Example: Basic = $40,000, housing allowance = $20,000, rent = $18,000, major US city. Condition 1: $20,000. Condition 2: $18,000 - $4,000 = $14,000. Condition 3: $20,000. housing allowance exemption = $14,000. Taxable housing allowance = $6,000.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">housing allowance Exemption - Common Mistakes to Avoid</h3>
              <p>Top housing allowance claim mistakes that trigger scrutiny: (1) Claiming housing allowance without submitting rent receipts - rental receipts required if annual rent exceeds $1 thousand. (2) Paying rent in cash without receipts. (3) Paying rent to spouse - tax authorities routinely disallow this. Paying rent to parents is acceptable if they own the property and declare rental income. (4) Not deducting 10% of base salary correctly - many people forget this deduction from rent paid when calculating Condition 2. (5) Using ex-showroom salary as 'basic' - only the base salary component (not gross) is used in housing allowance calculation. (6) Claiming old regime housing allowance benefits while opting for new tax regime (not allowed).</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Rent Receipt Requirements and Documentation</h3>
              <p>Mandatory documentation for housing allowance claims: Rent receipts (monthly or quarterly) signed by landlord. Landlord's PAN mandatory if monthly rent exceeds $8,333 (annual $1 thousand). Rental agreement (not mandatory but strongly recommended). Bank transfer proof of rent payment (preferred over cash). Form 12BB submitted to employer annually. Digital rent receipts are acceptable (email, SMS). Best practice: Pay rent via bank transfer and get receipts via email - creates clean audit trail. If you\'re paying rent to parents, ensure they file Form 1040 showing rental income, and have proper rental agreement in place.</p>
              <h3 className="font-bold text-gray-800 mb-2 mt-4">housing allowance in Metro vs Non-Metro Cities - Impact on Exemption</h3>
              <p>The metro/smaller city / suburb classification directly impacts housing allowance exemption through Condition 3 (50% vs 40% of basic). Metro cities (50% of basic): Delhi, Mumbai (including Navi Mumbai and Thane), Kolkata, Chennai. Non-metro cities (40% of basic): Bengaluru, Hyderabad, Pune, Ahmedabad, Surat, Jaipur, and all other cities. Note: Despite being major metropolises, Bengaluru and Hyderabad are classified as smaller city / suburb for housing allowance purposes. This means an employee with $80,000 basic in Bengaluru gets Condition 3 = $32,000 vs $40,000 in Mumbai - a $8,000/month difference in potential exemption. If relocating, factor this in your salary negotiation to request higher housing allowance component.</p>
            </div>
          </div>
        </Card>
      </div>


      {/* Internal Links */}
      {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Inflation Calculator", href: "/calculators/finance/inflation-calculator", icon: "📉", desc: "Free calculator" },          { name: "Real Return Calculator", href: "/calculators/finance/real-return-calculator", icon: "📊", desc: "Free calculator" },          { name: "XIRR Calculator", href: "/calculators/finance/xirr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Currency Converter Calculator", href: "/calculators/finance/currency-converter", icon: "💱", desc: "Free calculator" },          { name: "Currency Profit Calculator", href: "/calculators/finance/currency-profit-calculator", icon: "📊", desc: "Free calculator" },          { name: "Tip Calculator", href: "/calculators/finance/tip-calculator", icon: "💵", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "P/E Ratio Calculator", href: "/calculators/finance/pe-ratio-calculator", icon: "📊", desc: "Free calculator" },          { name: "CAGR Calculator", href: "/calculators/finance/cagr-calculator", icon: "📊", desc: "Free calculator" },          { name: "Crypto Profit Calculator", href: "/calculators/finance/crypto-profit-calculator", icon: "₿", desc: "Free calculator" },
          ]}
        />
            
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          HRA Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this HRA USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          HRA Housing Allowance Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600">
          For example, with a INR 1,00,000 basic salary, INR 40,000 HRA, and INR 30,000 monthly rent in Delhi, your HRA calculator 2026 shows the exact exemption amount and annual tax saving.
        </p>
      </Card>

            <SEOContent
        title="HRA Housing Allowance Calculator – Calculate Your Tax Exemption on Rent in 2026"
        category="finance"
        intro={`Housing Rent Allowance (HRA) is one of the most valuable tax benefits available to salaried employees in India — and also one of the most frequently underclaimed due to misunderstanding of the calculation rules. HRA exemption reduces your taxable income, potentially saving thousands of rupees annually in income tax.

The HRA exemption is the minimum of three amounts: (1) Actual HRA received from employer, (2) Actual rent paid minus 10% of basic salary, and (3) 50% of basic salary for metros (Delhi, Mumbai, Chennai, Kolkata) or 40% for non-metro cities. Understanding which of these three is your binding constraint — and how to maximize the exemption — is the practical goal of this calculator.

Many employees living with family (paying no rent) or in company-provided accommodation assume HRA is irrelevant to them. However, if you pay rent to family members (parents, spouse — with spouse rent now allowed in many cases after proper documentation), you may still be able to claim partial HRA exemption while providing your family member with rental income that may be taxable at a lower rate than your own.`}
        howItWorks={`The three-part HRA exemption calculation:
1. Actual HRA received from employer
2. Actual rent paid - 10% of basic salary
3. 50% of basic salary (metro cities) or 40% (non-metro)

Exempt HRA = minimum of the above three amounts. The remaining HRA (above the exemption) is added to taxable income.

Example: Basic salary = ₹50,000/month, HRA = ₹20,000/month, Rent paid = ₹18,000/month, City = Bengaluru (metro).
1. ₹20,000
2. ₹18,000 - ₹5,000 = ₹13,000
3. 50% × ₹50,000 = ₹25,000
Minimum = ₹13,000/month = ₹1,56,000/year HRA exemption.`}
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
        tipsSection={`To maximize HRA exemption, maintain documentation: rent receipts for amounts exceeding ₹1 lakh/year must include the landlord's PAN. Create a proper rental agreement, even for family arrangements. The Income Tax Department scrutinizes HRA claims without supporting documentation.

If your actual rent payment is the limiting factor (clause 2 is the minimum), consider whether negotiating higher rent (with corresponding additional HRA from employer) or moving to a different accommodation changes your exemption.

For employees in the new tax regime (post-FY 2023-24), note that HRA exemption is NOT available under the new default tax regime. You must opt for the old tax regime specifically to claim HRA. Calculate your tax liability under both regimes to determine which is more beneficial.`}
        conclusion={`The HRA exemption is most valuable for employees in higher tax brackets who pay significant rents in metro cities. At the 30% tax bracket, every ₹1 lakh of HRA exemption saves ₹30,000 in taxes. For a Bengaluru software engineer paying ₹25,000/month in rent with basic salary of ₹80,000, the annual HRA exemption might be ₹2.4 lakh, saving ₹72,000 in tax annually.

For self-employed individuals and people who receive no HRA component, Section 80GG provides a deduction for rent paid (subject to limits) even without an HRA component in salary. The maximum deduction under 80GG is ₹5,000/month, significantly less generous than HRA exemption for most salaried employees.`}

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
