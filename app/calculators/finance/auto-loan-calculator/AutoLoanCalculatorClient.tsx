'use client'
import { useState, useMemo } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { calculateAutoLoan } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { autoLoanSEOContent } from '@/lib/seo/calculator-seo-content'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { SearchableTable } from '@/components/ui/SearchableTable'
import { autoLoanRatesByCredit, autoLoanByState } from '@/lib/seo/finance-tables'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }

export default function AutoLoanCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [vehiclePrice, setVehiclePrice] = useState(currency.code === 'INR' ? 800000 : 35000)
  const [downPayment, setDownPayment]   = useState(currency.code === 'INR' ? 160000 : 7000)
  const [tradeIn, setTradeIn]           = useState(0)
  const [salesTaxRate, setSalesTaxRate] = useState(currency.code === 'INR' ? 0 : 7.5)
  const [fees, setFees]                 = useState(currency.code === 'INR' ? 5000 : 800)
  const [rate, setRate]                 = useState(7.0)
  const [months, setMonths]             = useState(60)

  const result = useMemo(
    () => calculateAutoLoan(vehiclePrice, downPayment, tradeIn, salesTaxRate, fees, rate, months),
    [vehiclePrice, downPayment, tradeIn, salesTaxRate, fees, rate, months]
  )

  const pieData = [
    { name: 'Principal', value: result.principal, color: '#16a34a' },
    { name: 'Interest',  value: result.totalInterest, color: '#f59e0b' },
    { name: 'Sales Tax', value: result.taxAmount, color: '#3b82f6' },
    { name: 'Fees',      value: fees, color: '#8b5cf6' },
  ].filter(d => d.value > 0)

  const COLORS = ['#16a34a', '#f59e0b', '#3b82f6', '#8b5cf6']

  const yearlyData: { year: string; principal: number; interest: number; balance: number }[] = []
  const yrs = Math.ceil(months / 12)
  for (let y = 1; y <= yrs; y++) {
    const slice = result.schedule.slice((y - 1) * 12, y * 12)
    yearlyData.push({
      year: `Y${y}`,
      principal: Math.round(slice.reduce((s, m) => s + m.principal, 0)),
      interest:  Math.round(slice.reduce((s, m) => s + m.interest, 0)),
      balance:   slice[slice.length - 1]?.balance ?? 0,
    })
  }

  const tickFmt = (v: number) => v >= 1000000 ? `${currency.symbol}${(v / 1000000).toFixed(1)}M` : `${currency.symbol}${(v / 1000).toFixed(0)}K`

  return (
    <CalculatorLayout title="Auto Loan Calculator USA 2026" description="Calculate your monthly car payment, total interest cost, and amortization schedule for any vehicle loan." icon="🚗" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="auto-loan-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Vehicle & Loan</h2>
          <div className="space-y-5">
            <InputField label={`Vehicle Price (${currency.symbol})`} value={vehiclePrice} onChange={setVehiclePrice} min={1000} max={500000} step={500} prefix={currency.symbol} />
            <InputField label={`Down Payment (${currency.symbol})`} value={downPayment} onChange={setDownPayment} min={0} max={vehiclePrice} step={100} prefix={currency.symbol} />
            <InputField label={`Trade-In Value (${currency.symbol})`} value={tradeIn} onChange={setTradeIn} min={0} max={vehiclePrice} step={100} prefix={currency.symbol} />
            <InputField label="Sales Tax Rate" value={salesTaxRate} onChange={setSalesTaxRate} min={0} max={15} step={0.1} suffix="%" />
            <InputField label={`Fees (${currency.symbol})`} value={fees} onChange={setFees} min={0} max={5000} step={50} prefix={currency.symbol} />
            <InputField label="Annual Interest Rate (APR)" value={rate} onChange={setRate} min={0.5} max={30} step={0.1} suffix="%" />
            <InputField label="Loan Term" value={months} onChange={setMonths} min={12} max={84} step={12} suffix="Mo" />
          </div>
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-800">
            <p className="font-bold mb-1">💡 2026 Auto Loan Rates</p>
            <div className="space-y-0.5">
              <div className="flex justify-between"><span>New car (720+)</span><span>5-7%</span></div>
              <div className="flex justify-between"><span>New car (660-719)</span><span>7-10%</span></div>
              <div className="flex justify-between"><span>Used car (720+)</span><span>7-10%</span></div>
              <div className="flex justify-between"><span>Used car (600-659)</span><span>14-20%</span></div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly Payment" value={fmt(result.emi)} subValue="Per month" highlight />
            <ResultCard label="Loan Amount" value={fmtCompact(result.principal)} subValue="Amount financed" />
            <ResultCard label="Total Interest" value={fmtCompact(result.totalInterest)} subValue={`${months} months`} />
            <ResultCard label="Total Cost" value={fmtCompact(result.totalPayment)} subValue="Principal + interest" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Total Cost Breakdown</h3>
              <ChartWrapper height={180}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                      {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
              <div className="space-y-1 mt-1">
                {pieData.map((item, i) => (
                  <div key={item.name} className="flex justify-between text-xs">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full inline-block" style={{ background: COLORS[i] }} />{item.name}</span>
                    <span className="font-semibold">{fmt(item.value)}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Summary</h3>
              <div className="space-y-2.5 text-sm">
                {[
                  ['Vehicle Price', fmt(vehiclePrice)],
                  ['Down Payment', fmt(downPayment)],
                  ['Trade-In', fmt(tradeIn)],
                  ['Sales Tax', fmt(result.taxAmount)],
                  ['Fees', fmt(fees)],
                  ['Loan Amount', fmt(result.principal)],
                  ['Monthly Payment', fmt(result.emi)],
                  ['Total Paid', fmt(result.totalPayment)],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between border-b border-gray-100 pb-1 last:border-0">
                    <span className="text-gray-500">{l}</span><span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Amortization by Year</h3>
            <ChartWrapper height={220}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={70} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => fmt(v)} />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#374151' }} />
                  <Bar dataKey="principal" name="Principal" stackId="a" fill="#16a34a" />
                  <Bar dataKey="interest" name="Interest" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Car Loan Calculator", href: "/calculators/finance/car-loan-calculator", icon: "🚙", desc: "Free calculator" },          { name: "Car Depreciation Calculator", href: "/calculators/finance/car-depreciation-calculator", icon: "📉", desc: "Free calculator" },          { name: "Lease vs Buy Calculator", href: "/calculators/finance/lease-vs-buy-calculator", icon: "🔑", desc: "Free calculator" },          { name: "Loan Comparison Calculator", href: "/calculators/finance/loan-comparison-calculator", icon: "⚖️", desc: "Free calculator" },          { name: "Interest Rate Calculator", href: "/calculators/finance/interest-rate-calculator", icon: "📈", desc: "Free calculator" },          { name: "Payoff Date Calculator", href: "/calculators/finance/payoff-date-calculator", icon: "📅", desc: "Free calculator" },          { name: "Personal Loan Calculator", href: "/calculators/finance/personal-loan-calculator", icon: "💳", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },
          ]}
        />

        <SearchableTable
          title="Auto Loan Rates by Credit Score (2026)"
          description="How your FICO score affects your rate -- Experian Q1 2026"
          headers={['Credit Score Range', 'New Car Rate', 'Used Car Rate', '$30K New/60mo', '$20K Used/48mo']}
          rows={autoLoanRatesByCredit}
          searchKey="Credit Score Range"
          searchPlaceholder="Search..."
        />
        <SearchableTable
          title="Average Auto Loan by US State (2026)"
          description="Average loan amount, rate, and monthly payment by state"
          headers={['State', 'Avg Loan Amount', 'Avg Rate', 'Avg Term', 'Sales Tax', 'Monthly Pmt']}
          rows={autoLoanByState}
          searchKey="State"
          searchPlaceholder="Search..."
        />

        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Auto Loan Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A $25,000 loan at 8% APR over 5 years results in monthly payments of approximately <strong>$507</strong> with total interest of $4,420.
        </p>
        <p className="text-sm text-gray-600">
          Use this Auto Loan USA 2026 tool to compare different loan scenarios and find the fastest, cheapest path to debt freedom.
        </p>
      </Card>
      <SEOContent {...autoLoanSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
