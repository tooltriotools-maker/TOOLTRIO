'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line } from 'recharts'
import { calculateEMI } from '@/lib/calculations/finance'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { mortgageSEOContent } from '@/lib/seo/calculator-seo-content'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { SearchableTable } from '@/components/ui/SearchableTable'
import { mortgageByStateData, mortgageByCreditScore } from '@/lib/seo/finance-tables'

interface Props {
  faqs: { question: string; answer: string }[]
  structuredData: object[]
  relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]
  blogSlug?: string
}

export default function MortgageCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug }: Props) {
  const { currency, fmt, fmtCompact } = useCurrency()
  const d = currency.defaultValues

  const [homePrice, setHomePrice]     = useState(d.homeLoan)
  const [downPayPct, setDownPayPct]   = useState(20)
  const [rate, setRate]               = useState(7.0)
  const [years, setYears]             = useState(30)
  const [propTaxRate, setPropTaxRate] = useState(1.2)
  const [insuranceAmt, setInsuranceAmt] = useState(currency.code === 'INR' ? 15000 : 1400)
  const [pmiRate, setPmiRate]         = useState(0.8)

  const downPayment  = Math.round(homePrice * downPayPct / 100)
  const loanAmount   = homePrice - downPayment
  const needsPMI     = downPayPct < 20
  const result       = useMemo(() => calculateEMI(loanAmount, rate, years * 12), [loanAmount, rate, years])

  const monthlyPropTax  = Math.round(homePrice * propTaxRate / 100 / 12)
  const monthlyInsurance = Math.round(insuranceAmt / 12)
  const monthlyPMI      = needsPMI ? Math.round(loanAmount * pmiRate / 100 / 12) : 0
  const totalMonthly    = result.emi + monthlyPropTax + monthlyInsurance + monthlyPMI

  const piePITI = [
    { name: 'Principal & Interest', value: result.emi,        color: '#16a34a' },
    { name: 'Property Tax',         value: monthlyPropTax,    color: '#3b82f6' },
    { name: 'Insurance',            value: monthlyInsurance,  color: '#f59e0b' },
    ...(needsPMI ? [{ name: 'PMI', value: monthlyPMI, color: '#ef4444' }] : []),
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

  const COLORS = ['#16a34a', '#3b82f6', '#f59e0b', '#ef4444']

  return (
    <CalculatorLayout
      title="Mortgage Calculator USA 2026"
      description="Calculate your complete monthly PITI payment with principal, interest, taxes, insurance, and PMI."
      icon="🏡"
      category="Finance"
      structuredData={structuredData}
      relatedCalculators={relatedCalculators}
      blogSlug={blogSlug}
      slug="mortgage-calculator"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inputs */}
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Loan Details</h2>
          <div className="space-y-5">
            <InputField label={`Home Price (${currency.symbol})`} value={homePrice} onChange={setHomePrice}
              min={50000} max={5000000} step={10000} prefix={currency.symbol} />
            <InputField label="Down Payment (%)" value={downPayPct} onChange={setDownPayPct}
              min={3} max={50} step={1} suffix="%" />
            <InputField label="Annual Interest Rate" value={rate} onChange={setRate}
              min={1} max={20} step={0.05} suffix="%" />
            <InputField label="Loan Term" value={years} onChange={setYears}
              min={5} max={30} step={5} suffix="Yrs" />
          </div>

          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mt-6 mb-4">Monthly Extras (PITI)</h2>
          <div className="space-y-5">
            <InputField label="Property Tax Rate" value={propTaxRate} onChange={setPropTaxRate}
              min={0} max={4} step={0.1} suffix="%" />
            <InputField label={`Annual Insurance (${currency.symbol})`} value={insuranceAmt} onChange={setInsuranceAmt}
              min={0} max={10000} step={100} prefix={currency.symbol} />
            {needsPMI && (
              <InputField label="PMI Rate (if <20% down)" value={pmiRate} onChange={setPmiRate}
                min={0.1} max={3} step={0.1} suffix="%" />
            )}
          </div>

          {needsPMI && (
            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800">
              ⚠️ PMI required -- down payment under 20%. Put 20%+ down to eliminate PMI and save {fmt(monthlyPMI * 12)}/yr.
            </div>
          )}
        </Card>

        {/* Results */}
        <div className="lg:col-span-2 space-y-4">
          {/* PITI Breakdown */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total Monthly (PITI)" value={fmt(totalMonthly)} subValue="Complete payment" highlight />
            <ResultCard label="Principal & Interest" value={fmt(result.emi)} subValue="Loan payment" />
            <ResultCard label="Taxes + Insurance" value={fmt(monthlyPropTax + monthlyInsurance)} subValue="Escrow monthly" />
            <ResultCard label="Total Interest" value={fmtCompact(result.totalInterest)} subValue={`Over ${years} years`} />
          </div>

          {/* PITI Pie */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Monthly Payment Breakdown</h3>
              <ChartWrapper height={200}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={piePITI} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                      {piePITI.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip formatter={(v: number) => fmt(v)} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartWrapper>
              <div className="mt-2 space-y-1.5">
                {piePITI.map((item, i) => (
                  <div key={item.name} className="flex justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: COLORS[i] }} />
                      <span className="text-gray-600">{item.name}</span>
                    </div>
                    <span className="font-semibold">{fmt(item.value)}/mo</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Loan Summary</h3>
              <div className="space-y-3 text-sm">
                {[
                  ['Home Price',       fmt(homePrice)],
                  ['Down Payment',     `${fmt(downPayment)} (${downPayPct}%)`],
                  ['Loan Amount',      fmt(loanAmount)],
                  ['Monthly P&I',      fmt(result.emi)],
                  ['Total Payments',   fmt(result.totalPayment)],
                  ['Total Interest',   fmt(result.totalInterest)],
                  ['Interest %',       `${Math.round(result.totalInterest / result.totalPayment * 100)}%`],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between border-b border-gray-100 pb-2 last:border-0">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-gray-900">{val}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Amortization chart */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Amortization Schedule (Yearly)</h3>
            <ChartWrapper height={240}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} interval={Math.floor(years / 6)} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={70} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => fmt(v)} />
                  <Legend wrapperStyle={{ fontSize: 12, color: '#374151' }} />
                  <Bar dataKey="principal" name="Principal" stackId="a" fill="#16a34a" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="interest"  name="Interest"  stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </Card>

          {/* Balance line */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Remaining Balance Over Time</h3>
            <ChartWrapper height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} interval={Math.floor(years / 6)} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={70} tickFormatter={tickFmt} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => fmt(v)} />
                  <Line type="monotone" dataKey="balance" name="Remaining Balance" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </Card>

          {/* Full amortization table */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Full Amortization Schedule</h3>
            <div className="overflow-y-auto max-h-60">
              <table className="calc-table">
                <thead>
                  <tr><th>Year</th><th>Principal</th><th>Interest</th><th>Balance</th></tr>
                </thead>
                <tbody>
                  {yearlyData.map((row) => (
                    <tr key={row.year}>
                      <td className="text-gray-500">{row.year}</td>
                      <td className="text-green-600">{fmtCompact(row.principal)}</td>
                      <td className="text-amber-600">{fmtCompact(row.interest)}</td>
                      <td className="font-semibold text-gray-900">{fmtCompact(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        {/* Internal Links - Inside Content */}
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Real Estate ROI Calculator", href: "/calculators/finance/real-estate-roi-calculator", icon: "🏠", desc: "Free calculator" },          { name: "Rental Yield Calculator", href: "/calculators/finance/rental-yield-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "REIT vs Direct Property USA Calculator", href: "/calculators/finance/reit-vs-direct-property-usa-calculator", icon: "🏢", desc: "Free calculator" },          { name: "S&P500 vs Real Estate USA Calculator", href: "/calculators/finance/sp500-vs-real-estate-usa-calculator", icon: "📊", desc: "Free calculator" },          { name: "Home Affordability Calculator", href: "/calculators/finance/home-affordability-calculator", icon: "💰", desc: "Free calculator" },          { name: "Rent vs Buy Calculator", href: "/calculators/finance/rent-vs-buy-calculator", icon: "🔄", desc: "Free calculator" },          { name: "HELOC Calculator", href: "/calculators/finance/heloc-calculator", icon: "🏘️", desc: "Free calculator" },          { name: "Down Payment Calculator", href: "/calculators/finance/down-payment-calculator", icon: "💵", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Tax Bracket Calculator", href: "/calculators/finance/tax-bracket-calculator", icon: "🧾", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },
          ]}
        />

        {/* Searchable Table: Mortgage by State */}
        <SearchableTable
          title="2026 Mortgage Rates & Payments by US State"
          description="Average 30-year fixed rate and monthly PITI payment by state (20% down, national median home price)"
          headers={['State', 'Avg Rate (30yr)', 'Median Home Price', 'Monthly PITI (20% down)', 'Property Tax Rate']}
          rows={mortgageByStateData}
          searchKey="State"
          searchPlaceholder="Search your state..."
        />

        {/* Searchable Table: Rate by Credit Score */}
        <SearchableTable
          title="Mortgage Rate by Credit Score (2026)"
          description="How your FICO score affects your mortgage rate and monthly payment"
          headers={['Credit Score', 'Rate Estimate', '$300K Payment', '$500K Payment', 'Annual Savings vs 620']}
          rows={mortgageByCreditScore}
        />

        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Mortgage Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A $350,000 mortgage at 6.5% over 30 years results in a monthly payment of approximately <strong>$2,212</strong> with total interest paid of $446,320.
        </p>
        <p className="text-sm text-gray-600">
          Use this Mortgage USA 2026 tool to compare different loan amounts, interest rates, and terms to find your best option.
        </p>
      </Card>
      <SEOContent {...mortgageSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
      
    </CalculatorLayout>
  )
}
