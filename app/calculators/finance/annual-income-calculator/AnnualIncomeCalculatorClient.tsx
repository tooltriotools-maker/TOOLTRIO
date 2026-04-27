'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { calculateAnnualIncome } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { annualIncomeSEOContent } from '@/lib/seo/calculator-seo-content'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { SearchableTable } from '@/components/ui/SearchableTable'
import { hourlyToAnnualTable } from '@/lib/seo/finance-tables'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
export default function AnnualIncomeCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug}: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()

  const [hourlyRate, setHourlyRate]         = useState(currency.code === 'INR' ? 500 : 25)
  const [hoursPerWeek, setHoursPerWeek]     = useState(40)
  const [weeksPerYear, setWeeksPerYear]     = useState(52)
  const [overtimeHours, setOvertimeHours]   = useState(0)
  const [overtimeMultiplier, setOvertimeMultiplier] = useState(1.5)

  const result = useMemo(() => calculateAnnualIncome(hourlyRate, hoursPerWeek, weeksPerYear, overtimeHours, overtimeMultiplier), [hourlyRate, hoursPerWeek, weeksPerYear, overtimeHours, overtimeMultiplier])

  const taxData = [
    { name: 'Take-Home Pay', value: result.netAnnual, color: '#16a34a' },
    { name: 'Federal Tax (~22%)', value: Math.round(result.grossAnnual * 0.22), color: '#ef4444' },
    { name: 'FICA (7.65%)', value: Math.round(result.grossAnnual * 0.0765), color: '#f59e0b' },
    { name: 'State Tax (~5%)', value: Math.round(result.grossAnnual * 0.05), color: '#8b5cf6' },
  ]

  return (
    <CalculatorLayout title="Annual Income Calculator USA 2026" description="Convert hourly wage to annual salary and see monthly, biweekly, and weekly pay with take-home estimates." icon="💵" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="annual-income-calculator"
      blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Your Pay Details</h2>
          <div className="space-y-5">
            <InputField label={`Hourly Rate (${currency.symbol})`} value={hourlyRate} onChange={setHourlyRate} min={1} max={500} step={0.5} prefix={currency.symbol} />
            <InputField label="Hours Per Week" value={hoursPerWeek} onChange={setHoursPerWeek} min={1} max={80} step={1} suffix="hrs" />
            <InputField label="Weeks Worked Per Year" value={weeksPerYear} onChange={setWeeksPerYear} min={1} max={52} step={1} suffix="wks" />
            <InputField label="Overtime Hours/Week" value={overtimeHours} onChange={setOvertimeHours} min={0} max={40} step={1} suffix="hrs" />
            <InputField label="Overtime Multiplier" value={overtimeMultiplier} onChange={setOvertimeMultiplier} min={1} max={3} step={0.25} suffix="x" />
          </div>
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
            <p className="font-bold mb-1">⚠️ Tax estimates only</p>
            <p className="leading-relaxed">Tax calculations use approximate federal (22%), FICA (7.65%), and state (5%) rates. Use our Paycheck Calculator for exact withholding.</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Annual Gross" value={fmtCompact(result.grossAnnual)} subValue="Before taxes" highlight />
            <ResultCard label="Annual Net" value={fmtCompact(result.netAnnual)} subValue="Est. take-home" />
            <ResultCard label="Monthly Net" value={fmt(result.netMonthly)} subValue="After taxes/mo" />
            <ResultCard label="Effective Tax" value={`${result.effectiveTaxRate}%`} subValue="All taxes combined" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="text-center p-4">
              <p className="text-xs text-gray-500 mb-1">Hourly</p>
              <p className="text-xl font-black text-gray-900">{fmt(hourlyRate)}</p>
            </Card>
            <Card className="text-center p-4">
              <p className="text-xs text-gray-500 mb-1">Weekly Gross</p>
              <p className="text-xl font-black text-gray-900">{fmt(result.grossWeekly)}</p>
            </Card>
            <Card className="text-center p-4">
              <p className="text-xs text-gray-500 mb-1">Biweekly Gross</p>
              <p className="text-xl font-black text-gray-900">{fmt(result.grossBiweekly)}</p>
            </Card>
            <Card className="text-center p-4">
              <p className="text-xs text-gray-500 mb-1">Monthly Gross</p>
              <p className="text-xl font-black text-gray-900">{fmt(result.grossMonthly)}</p>
            </Card>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Est. Tax Breakdown (Annual)</h3>
              <ChartWrapper height={180}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={taxData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                      {taxData.map((_, i) => <Cell key={i} fill={taxData[i].color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
              <div className="space-y-1 mt-1">
                {taxData.map(t => (
                  <div key={t.name} className="flex justify-between text-xs">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: t.color }} />{t.name}</span>
                    <span className="font-semibold">{fmt(t.value)}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Full Pay Breakdown</h3>
              <div className="space-y-2 text-sm">
                {[
                  ['Regular Pay', fmtCompact(result.regularPay)],
                  ['Overtime Pay', fmtCompact(result.overtimePay)],
                  ['Gross Annual', fmtCompact(result.grossAnnual)],
                  ['Federal Tax (est.)', fmtCompact(Math.round(result.grossAnnual * 0.22))],
                  ['FICA (SS + Medicare)', fmtCompact(Math.round(result.grossAnnual * 0.0765))],
                  ['State Tax (est.)', fmtCompact(Math.round(result.grossAnnual * 0.05))],
                  ['Net Annual Take-Home', fmtCompact(result.netAnnual)],
                  ['Net Monthly', fmt(result.netMonthly)],
                ].map(([l, v]) => (
                  <div key={l} className={`flex justify-between border-b border-gray-100 pb-1.5 last:border-0 ${l.startsWith('Net') ? 'font-bold text-gray-900' : ''}`}>
                    <span className="text-gray-500">{l}</span><span>{v}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8">
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Salary Calculator", href: "/calculators/finance/salary-calculator", icon: "💼", desc: "Free calculator" },          { name: "Paycheck Calculator", href: "/calculators/finance/paycheck-calculator", icon: "💵", desc: "Free calculator" },          { name: "Salary Hike Calculator", href: "/calculators/finance/salary-hike-calculator", icon: "📈", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "📋", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },
          ]}
        />

        <SearchableTable
          title="Hourly Rate to Annual Salary Conversion Table (USA 2026)"
          description="Complete reference -- every common hourly rate with after-tax take-home estimate"
          headers={['Hourly Rate', 'Annual (40hr/52wk)', 'Monthly Gross', 'After Tax (est.)', 'State Example']}
          rows={hourlyToAnnualTable}
          searchKey="Hourly Rate"
          searchPlaceholder="Search..."
        />

        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Annual Income Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          On a $75,000 salary, the 50/30/20 rule suggests: <strong>$37,500</strong> for needs, $22,500 for wants, and $15,000 for savings and debt repayment.
        </p>
        <p className="text-sm text-gray-600">
          This Annual Income USA 2026 planner helps you allocate your income optimally and track progress toward your financial goals.
        </p>
      </Card>
      <SEOContent {...annualIncomeSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
