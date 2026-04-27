'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { calculateEMI } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'

interface Props {
  faqs: { question: string; answer: string }[]
  structuredData: object[]
  relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]
  blogSlug?: string
}

export default function PersonalLoanCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [loanAmount, setLoanAmount] = useState(d.loanAmount)
  const [rate, setRate]             = useState(11.5)
  const [years, setYears]           = useState(3)

  const result = useMemo(() => calculateEMI(loanAmount, rate, years * 12), [loanAmount, rate, years])

  const pieData = [
    { name: 'Principal', value: loanAmount,           color: '#16a34a' },
    { name: 'Interest',  value: result.totalInterest, color: '#f59e0b' },
  ]

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const slice = result.schedule.slice((y - 1) * 12, y * 12)
    yearlyData.push({
      year: `Y${y}`,
      principal: Math.round(slice.reduce((s, m) => s + m.principal, 0)),
      interest:  Math.round(slice.reduce((s, m) => s + m.interest,  0)),
      balance:   slice[slice.length - 1]?.balance ?? 0,
    })
  }

  const tickFmt = (v: number) => v >= 1000000
    ? `${currency.symbol}${(v / 1000000).toFixed(1)}M`
    : `${currency.symbol}${(v / 1000).toFixed(0)}K`

  const interestPct = Math.round(result.totalInterest / result.totalPayment * 100)

  return (
    <CalculatorLayout
      title="Personal Loan Calculator"
      description="Calculate your personal loan monthly payment, total interest, and full amortization schedule."
      icon="💳"
      category="Finance"
      structuredData={structuredData}
      relatedCalculators={relatedCalculators}
      blogSlug={blogSlug}
      slug="personal-loan-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Loan Details</h2>
          <div className="space-y-5">
            <InputField label={`Loan Amount (${currency.symbol})`} value={loanAmount} onChange={setLoanAmount}
              min={1000} max={200000} step={500} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate (APR)" value={rate} onChange={setRate}
              min={1} max={36} step={0.25} suffix="%" />
            <InputField label="Loan Term" value={years} onChange={setYears}
              min={1} max={7} step={1} suffix="Yrs" />
          </div>

          <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-200">
            <p className="text-xs font-bold text-blue-700 mb-2">💡 Personal Loan APR Guide (2026)</p>
            <div className="space-y-1 text-xs text-blue-800">
              <div className="flex justify-between"><span>Excellent (720+)</span><span>7-12%</span></div>
              <div className="flex justify-between"><span>Good (680-719)</span><span>12-18%</span></div>
              <div className="flex justify-between"><span>Fair (640-679)</span><span>18-26%</span></div>
              <div className="flex justify-between"><span>Poor (&lt;640)</span><span>26-36%</span></div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly Payment" value={fmt(result.emi)} subValue="Per month" highlight />
            <ResultCard label="Total Interest" value={fmtCompact(result.totalInterest)} subValue={`${interestPct}% of total`} />
            <ResultCard label="Total Amount" value={fmtCompact(result.totalPayment)} subValue="Principal + interest" />
            <ResultCard label="Loan Principal" value={fmtCompact(loanAmount)} subValue="Amount borrowed" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Principal vs Interest</h3>
              <div style={{ height: 200 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={80} paddingAngle={4} dataKey="value">
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-around text-xs mt-2">
                {pieData.map((item) => (
                  <div key={item.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    <span className="text-gray-600">{item.name}: <strong>{fmt(item.value)}</strong></span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Loan Summary</h3>
              <div className="space-y-3 text-sm">
                {[
                  ['Loan Amount',      fmt(loanAmount)],
                  ['Interest Rate',    `${rate}% APR`],
                  ['Loan Term',        `${years} year${years > 1 ? 's' : ''} (${years * 12} months)`],
                  ['Monthly Payment',  fmt(result.emi)],
                  ['Total Repayment',  fmt(result.totalPayment)],
                  ['Total Interest',   fmt(result.totalInterest)],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between border-b border-gray-50 pb-2 last:border-0">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Yearly Payment Breakdown</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={70} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => fmt(v)} />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#374151' }} />
                  <Bar dataKey="principal" name="Principal" stackId="a" fill="#16a34a" />
                  <Bar dataKey="interest"  name="Interest"  stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Amortization Schedule</h3>
            <div className="overflow-y-auto max-h-56">
              <table className="calc-table">
                <thead><tr><th>Year</th><th>Principal Paid</th><th>Interest Paid</th><th>Balance</th></tr></thead>
                <tbody>
                  {yearlyData.map((row) => (
                    <tr key={row.year}>
                      <td className="text-gray-500">{row.year}</td>
                      <td className="text-green-600">{fmtCompact(row.principal)}</td>
                      <td className="text-amber-600">{fmtCompact(row.interest)}</td>
                      <td className="font-semibold text-white">{fmtCompact(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
      
      <Card className="mt-6">
        <h2 className="text-xl font-black text-gray-900 mb-3">Personal Loan Calculator USA 2026 – Know the True Cost Before You Apply</h2>
        <p className="text-sm text-gray-600 mb-2">Personal Loan Calculator Example (USA 2026): on a $30,000 personal loan at 10% APR, your personal loan calculator USA 2026 shows a 5-year monthly payment of $637 and total interest of $8,249.</p>
        <p className="text-sm text-gray-600">Personal loan rates vary from 6% to 36% depending on your credit score — and that difference can mean thousands in interest. Use this alongside the [Loan Comparison Calculator](/calculators/finance/loan-comparison-calculator) and [Debt Payoff Calculator](/calculators/finance/debt-payoff-calculator) to find the cheapest borrowing option.</p>
      </Card>
<div className="mt-8">
  
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },          { name: "Credit Card Payoff Calculator", href: "/calculators/finance/credit-card-payoff-calculator", icon: "💳", desc: "Free calculator" },          { name: "Student Loan Calculator", href: "/calculators/finance/student-loan-calculator", icon: "🎓", desc: "Free calculator" },          { name: "Payoff Date Calculator", href: "/calculators/finance/payoff-date-calculator", icon: "📅", desc: "Free calculator" },          { name: "Loan Prepayment Calculator", href: "/calculators/finance/loan-prepayment-calculator", icon: "⚡", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Loan Comparison Calculator", href: "/calculators/finance/loan-comparison-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },
          ]}
        />
      <FAQSection faqs={faqs} />
      </div>
      
    </CalculatorLayout>
  )
}
