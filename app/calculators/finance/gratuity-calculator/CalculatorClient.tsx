'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateGratuity } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Briefcase, Calendar, DollarSign, Shield } from 'lucide-react'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: any[]; blogSlug?: string }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { fmt, currency } = useCurrency()
  const [lastSalary, setLastSalary] = useState(50000)
  const [yearsOfService, setYearsOfService] = useState(10)
  const [type, setType] = useState<'covered' | 'uncovered'>('covered')

  const r = useMemo(() => calculateGratuity(lastSalary, yearsOfService, type), [lastSalary, yearsOfService, type])

  const chartData = [5, 10, 15, 20, 25, 30].map(y => ({
    years: `${y}Y`,
    gratuity: Math.round(calculateGratuity(lastSalary, y, type).gratuity)
  }))

  return (
    <CalculatorLayout title="Gratuity Calculator USA 2026" description="Estimate end-of-service gratuity, severance benefits, and final settlement based on years of service." icon="🤝" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-base font-bold text-gray-900 mb-5">Gratuity Details</h2>
          <div className="space-y-5">
            <InputField label="Last Drawn Monthly Salary (Basic + DA)" value={lastSalary} onChange={setLastSalary} min={1000} max={1000000} step={1000} prefix={currency.symbol} />
            <InputField label="Years of Service" value={yearsOfService} onChange={setYearsOfService} min={5} max={40} step={1} suffix="Yr" />
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Employment Type</label>
              <div className="space-y-2">
                {(['covered', 'uncovered'] as const).map(t => (
                  <button key={t} onClick={() => setType(t)}
                    className={`w-full py-2.5 px-4 rounded-xl text-sm font-bold border-2 text-left transition-all ${type === t ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                    {t === 'covered' ? '✅ Covered under Gratuity Act' : '⚠️ Not Covered (Govt formula)'}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">{type === 'covered' ? 'Formula: (Salary x 15 x Years) / 26' : 'Formula: (Salary x 15 x Years) / 30'}</p>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700">
            <p className="font-bold mb-1">📌 Key Info</p>
            <p>Minimum 5 years of service required. Statutory amount may be tax-exempt up to local limits.</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Gratuity Amount" value={fmt(r.gratuity)} highlight icon={<DollarSign className="w-4 h-4" />} />
            <ResultCard label="Tax-Free Amount" value={fmt(r.taxFreeAmount)} icon={<Shield className="w-4 h-4" />} />
            <ResultCard label="Taxable Gratuity" value={fmt(r.taxableGratuity)} icon={<Briefcase className="w-4 h-4" />} />
            <ResultCard label="Per Year Earned" value={fmt(r.perYearGratuity)} icon={<Calendar className="w-4 h-4" />} />
          </div>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Gratuity by Years of Service</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="years" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v, true)} width={65} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8 }} formatter={(v: number) => [fmt(v), 'Gratuity']} />
                  <Bar dataKey="gratuity" name="Gratuity" fill="#16a34a" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-bold text-gray-800 mb-4">Gratuity Calculation Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"></div>
          </Card>
        

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
          Gratuity Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          Use this Gratuity USA 2026 calculator to model your specific numbers and make confident financial decisions based on accurate projections.
        </p>
        <p className="text-sm text-gray-600">
          Adjust inputs to see instant results — compare scenarios to find the strategy that best fits your financial goals and timeline.
        </p>
      </Card>
      <SEOContent
        title="Gratuity Calculator USA – Calculate Your End of Service Gratuity and Severance Pay in 2026"
        category="finance"
        intro={`Gratuity is a statutory end-of-service benefit paid to employees who have completed at least 5 years of continuous service with an employer in India. Understanding how much gratuity you've earned — and how it's calculated — is important both for evaluating job offers that include it and for understanding what you'll receive if you leave employment.

The Payment of Gratuity Act, 1972 applies to establishments with 10 or more employees. For employees covered under the Act: Gratuity = (Last drawn basic salary + dearness allowance) × 15/26 × completed years of service. The 15/26 represents 15 days' wages per year, calculated based on a 26-day working month.

Gratuity is tax-free up to ₹20 lakh for private sector employees covered under the Act (as of 2024), and completely tax-free for government employees regardless of amount. This tax exemption makes gratuity a valuable component of total compensation that's often underappreciated in job comparison calculations.`}
        howItWorks={`For employees covered under the Payment of Gratuity Act:
Gratuity = (Last Basic + DA) × 15/26 × Number of Completed Years

For employees not covered (establishments with fewer than 10 employees):
Gratuity = (Last Basic + DA) × 15/30 × Number of Completed Years (using a 30-day month)

Service rounding: Periods above 6 months in the last year are rounded up. If you have 5 years and 7 months of service, the gratuity is calculated for 6 years. If 5 years and 5 months, it's calculated for 5 years.

Maximum: As of 2024, the maximum tax-exempt gratuity is ₹20 lakh. Amounts above this are taxable as income. Many PSU and government employees receive amounts well above the private sector taxable threshold.`}
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
        tipsSection={`Gratuity accrues only after 5 years of continuous service — there's no partial benefit for less than 5 years in most cases. If you're at 4 years and 8 months of service and considering a job change, completing the 5-year threshold before leaving is worth considering. The gratuity you'd receive could easily be ₹1-5 lakh depending on your salary.

Check whether your company offers gratuity above the statutory minimum. Many large corporates have internal policies providing higher gratuity multipliers or different calculation bases. Review your employment agreement and HR policies.

For US and international readers: gratuity in the US context means restaurant tips, not a statutory benefit. The Indian Gratuity Act concept is similar to the UAE's end-of-service gratuity or European severance pay in function — a long-service benefit paid upon termination.`}
        conclusion={`Gratuity as a component of total compensation is most relevant for long-tenure employees. The longer you stay, the larger the gratuity — which creates a real financial incentive against frequent job-hopping for employees in the accumulation phase of their careers.

For professionals evaluating whether to stay at a current employer or move to a new opportunity, include the gratuity forfeiture cost in your analysis if you're within the 5-year threshold. A ₹3 lakh gratuity forfeiture changes the financial calculation of a job move significantly. Use [our Salary Hike Calculator](/calculators/finance/salary-hike-calculator) to evaluate complete compensation package comparisons.`}

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
      </div>
      
    </CalculatorLayout>
  )
}
