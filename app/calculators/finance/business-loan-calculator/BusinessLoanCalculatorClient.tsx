'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { calculateEMI } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { businessLoanSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
const LOAN_TYPES = [
  { name: 'SBA 7(a) Loan', rate: 8.5, maxYears: 10, note: 'Most common SBA loan, up to $5M' },
  { name: 'SBA 504 Loan', rate: 6.5, maxYears: 25, note: 'Equipment & real estate, up to $5.5M' },
  { name: 'Business Line of Credit', rate: 12.0, maxYears: 2, note: 'Revolving credit, flexible draws' },
  { name: 'Equipment Financing', rate: 7.5, maxYears: 7, note: 'Asset-backed, up to 100% financed' },
  { name: 'Invoice Financing', rate: 18.0, maxYears: 1, note: 'Advance on unpaid invoices' },
  { name: 'Merchant Cash Advance', rate: 36.0, maxYears: 1, note: 'Revenue-based, factor rate 1.2-1.5' },
]

export default function BusinessLoanCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug}: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const m = currency.code === 'INR' ? 200 : 1

  const [loanAmount, setLoanAmount] = useState(100000 * m)
  const [rate, setRate]             = useState(8.5)
  const [years, setYears]           = useState(5)
  const [annualRevenue, setAnnualRevenue] = useState(500000 * m)

  const result = useMemo(() => calculateEMI(loanAmount, rate, years * 12), [loanAmount, rate, years])

  const debtServiceCoverage = annualRevenue > 0 ? ((annualRevenue * 0.15) / (result.emi * 12)) : 0
  const isViable = debtServiceCoverage >= 1.25

  const yearlyData = []
  for (let y = 1; y <= years; y++) {
    const slice = result.schedule.slice((y - 1) * 12, y * 12)
    yearlyData.push({
      year: `Y${y}`,
      principal: Math.round(slice.reduce((s: number, mo: { principal: number }) => s + mo.principal, 0)),
      interest: Math.round(slice.reduce((s: number, mo: { interest: number }) => s + mo.interest, 0)),
      balance: slice[slice.length - 1]?.balance ?? 0,
    })
  }

  const pieData = [
    { name: 'Principal', value: loanAmount, color: '#16a34a' },
    { name: 'Total Interest', value: result.totalInterest, color: '#f59e0b' },
  ]

  const tickFmt = (v: number) => v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`

  return (
    <CalculatorLayout title="Business Loan Calculator USA 2026" description="Calculate business loan monthly payments, total interest, and amortization schedule for any loan size." icon="🏢" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="business-loan-calculator"
      blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Loan Details</h2>
          <div className="space-y-5">
            <InputField label={`Loan Amount (${currency.symbol})`} value={loanAmount} onChange={setLoanAmount} min={5000} max={10000000} step={5000} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate (APR)" value={rate} onChange={setRate} min={1} max={50} step={0.25} suffix="%" />
            <InputField label="Loan Term" value={years} onChange={setYears} min={1} max={25} step={1} suffix="Yrs" />
            <InputField label={`Annual Business Revenue (${currency.symbol})`} value={annualRevenue} onChange={setAnnualRevenue} min={0} max={100000000} step={10000} prefix={currency.symbol} />
          </div>

          <div className={`mt-5 p-4 rounded-xl border ${isViable ? 'bg-green-50 border-green-300' : 'bg-red-50 border-red-300'}`}>
            <p className="text-xs font-bold mb-1" style={{ color: isViable ? '#4ade80' : '#f87171' }}>
              {isViable ? 'v DSCR: Lender-Approvable' : '⚠️ DSCR: May Not Qualify'}
            </p>
            <p className="text-2xl font-black" style={{ color: isViable ? '#4ade80' : '#f87171' }}>
              {debtServiceCoverage.toFixed(2)}x
            </p>
            <p className="text-xs text-gray-500 mt-1">Debt Service Coverage Ratio (DSCR). Lenders require ≥1.25x. Higher = easier to qualify.</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly Payment" value={fmt(result.emi)} subValue="Per month" highlight />
            <ResultCard label="Total Interest" value={fmtCompact(result.totalInterest)} subValue="Cost of capital" />
            <ResultCard label="Total Repayment" value={fmtCompact(result.totalPayment)} subValue="Over loan term" />
            <ResultCard label="DSCR" value={`${debtServiceCoverage.toFixed(2)}x`} subValue={isViable ? 'v Qualifies' : '⚠️ Low'} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Common Business Loan Types (2026 Rates)</h3>
            <div className="overflow-x-auto">
              <table className="calc-table">
                <thead><tr><th>Loan Type</th><th>Avg Rate</th><th>Max Term</th><th>Monthly Pmt</th><th>Notes</th></tr></thead>
                <tbody>
                  {LOAN_TYPES.map(lt => {
                    const r = calculateEMI(loanAmount, lt.rate, Math.min(lt.maxYears, years) * 12)
                    return (
                      <tr key={lt.name} className={lt.rate === rate ? 'bg-green-50/60' : ''}>
                        <td className="font-medium">{lt.name}</td>
                        <td>{lt.rate}%</td>
                        <td>{lt.maxYears}yr</td>
                        <td className="font-semibold">{fmt(r.emi)}</td>
                        <td className="text-xs text-gray-500">{lt.note}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Principal vs Interest</h3>
              <ChartWrapper height={180}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={4} dataKey="value">
                      {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
              <div className="flex justify-around text-xs mt-2">
                {pieData.map(p => (
                  <div key={p.name} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                    <span className="text-gray-500">{p.name}: <strong>{fmt(p.value)}</strong></span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Annual Repayment Schedule</h3>
              <ChartWrapper height={180}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearlyData} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={60} tickFormatter={tickFmt} />
                    <Tooltip formatter={(v: number) => fmt(v)} />
                    <Bar dataKey="principal" name="Principal" stackId="a" fill="#16a34a" />
                    <Bar dataKey="interest" name="Interest" stackId="a" fill="#f59e0b" radius={[3, 3, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartWrapper>
            </Card>
          </div>
        </div>
      </div>
      <div className="mt-8">

        {/* Internal Links */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Break Even Calculator", href: "/calculators/finance/break-even-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Invoice Calculator", href: "/calculators/finance/invoice-calculator", icon: "🧾", desc: "Free calculator" },          { name: "ROI Calculator", href: "/calculators/finance/roi-calculator", icon: "📈", desc: "Free calculator" },          { name: "Simple Interest Calculator", href: "/calculators/finance/simple-interest-calculator", icon: "📊", desc: "Free calculator" },          { name: "Loan Comparison Calculator", href: "/calculators/finance/loan-comparison-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Annual Income Calculator", href: "/calculators/finance/annual-income-calculator", icon: "💰", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },
          ]}
        />
        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Business Loan Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A $25,000 loan at 8% APR over 5 years results in monthly payments of approximately <strong>$507</strong> with total interest of $4,420.
        </p>
        <p className="text-sm text-gray-600">
          Use this Business Loan USA 2026 tool to compare different loan scenarios and find the fastest, cheapest path to debt freedom.
        </p>
      </Card>
      <SEOContent {...businessLoanSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
      
    </CalculatorLayout>
  )
}
