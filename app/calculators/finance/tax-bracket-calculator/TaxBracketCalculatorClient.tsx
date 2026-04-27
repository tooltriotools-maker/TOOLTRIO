'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent } from '@/components/ui/SEOContent'
import { taxBracketSEOContent } from '@/lib/seo/calculator-seo-content'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { SearchableTable } from '@/components/ui/SearchableTable'
import { taxBracketsByState2026 } from '@/lib/seo/finance-tables'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string }
// 2026 IRS Federal Tax Brackets (IRS Rev. Proc. 2026-28)
const BRACKETS_2026 = {
  single: [
    { min: 0,       max: 11925,  rate: 0.10 },
    { min: 11925,   max: 48475,  rate: 0.12 },
    { min: 48475,   max: 103350, rate: 0.22 },
    { min: 103350,  max: 197300, rate: 0.24 },
    { min: 197300,  max: 250525, rate: 0.32 },
    { min: 250525,  max: 626350, rate: 0.35 },
    { min: 626350,  max: Infinity, rate: 0.37 },
  ],
  married: [
    { min: 0,       max: 23850,  rate: 0.10 },
    { min: 23850,   max: 96950,  rate: 0.12 },
    { min: 96950,   max: 206700, rate: 0.22 },
    { min: 206700,  max: 394600, rate: 0.24 },
    { min: 394600,  max: 501050, rate: 0.32 },
    { min: 501050,  max: 751600, rate: 0.35 },
    { min: 751600,  max: Infinity, rate: 0.37 },
  ],
}

const STANDARD_DEDUCTION_2026 = { single: 15000, married: 30000, hoh: 22500 }

function calcFederalTax(taxableIncome: number, filing: 'single' | 'married') {
  const brackets = BRACKETS_2026[filing]
  let tax = 0
  const breakdown = []
  for (const b of brackets) {
    if (taxableIncome <= b.min) break
    const taxable = Math.min(taxableIncome, b.max) - b.min
    const bracketTax = taxable * b.rate
    tax += bracketTax
    breakdown.push({ rate: `${(b.rate * 100).toFixed(0)}%`, min: b.min, max: b.max === Infinity ? 9999999 : b.max, taxable: Math.round(taxable), tax: Math.round(bracketTax) })
  }
  return { tax: Math.round(tax), breakdown: breakdown.filter(b => b.taxable > 0) }
}

export default function TaxBracketCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug}: Props) {
  const { fmt, fmtCompact } = useCurrency()

  const [grossIncome, setGrossIncome]   = useState(85000)
  const [filing, setFiling]             = useState<'single' | 'married'>('single')
  const [k401Contrib, set401k]          = useState(7000)
  const [iraContrib, setIRA]            = useState(0)
  const [hsaContrib, setHSA]            = useState(0)
  const [itemized, setItemized]         = useState(0)
  const [stateRate, setStateRate]       = useState(5.0)

  const stdDeduction  = STANDARD_DEDUCTION_2026[filing]
  const aboveLineDeductions = k401Contrib + iraContrib + hsaContrib
  const agi           = Math.max(0, grossIncome - aboveLineDeductions)
  const deduction     = Math.max(stdDeduction, itemized)
  const taxableIncome = Math.max(0, agi - deduction)

  const { tax: federalTax, breakdown } = useMemo(() => calcFederalTax(taxableIncome, filing), [taxableIncome, filing])
  const fica          = Math.round(Math.min(grossIncome, 176100) * 0.062 + grossIncome * 0.0145)
  const stateTax      = Math.round(taxableIncome * stateRate / 100)
  const totalTax      = federalTax + fica + stateTax
  const netIncome     = grossIncome - totalTax - aboveLineDeductions
  const effectiveRate = grossIncome > 0 ? Math.round(federalTax / grossIncome * 1000) / 10 : 0
  const marginalRate  = breakdown.length > 0 ? breakdown[breakdown.length - 1].rate : '10%'

  const barData = breakdown.map(b => ({ bracket: b.rate, tax: b.tax, taxable: b.taxable }))
  const COLORS  = ['#16a34a', '#3b82f6', '#f59e0b', '#f97316', '#ef4444', '#8b5cf6', '#ec4899']

  return (
    <CalculatorLayout title="Tax Bracket Calculator USA 2026" description="See which 2026 federal tax brackets apply to your income, marginal rate, and effective rate." icon="🧾" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="tax-bracket-calculator"
      blogSlug={blogSlug}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">2026 Tax Details</h2>
          <div className="space-y-5">
            <InputField label="Gross Annual Income ($)" value={grossIncome} onChange={setGrossIncome} min={0} max={5000000} step={1000} prefix="$" />

            <div>
              <label className="text-xs text-gray-500 mb-2 block">Filing Status</label>
              <div className="grid grid-cols-2 gap-2">
                {(['single', 'married'] as const).map(f => (
                  <button key={f} onClick={() => setFiling(f)}
                    className={`py-2 rounded-xl text-sm font-semibold transition-colors ${filing === f ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {f === 'single' ? 'Single' : 'Married MFJ'}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Pre-Tax Deductions</p>
              <InputField label="401k Contribution ($)" value={k401Contrib} onChange={set401k} min={0} max={23500} step={500} prefix="$" />
              <InputField label="IRA Contribution ($)" value={iraContrib} onChange={setIRA} min={0} max={7000} step={500} prefix="$" />
              <InputField label="HSA Contribution ($)" value={hsaContrib} onChange={setHSA} min={0} max={4300} step={100} prefix="$" />
            </div>

            <div className="space-y-3 pt-1">
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Deductions</p>
              <InputField label="Itemized Deductions ($)" value={itemized} onChange={setItemized} min={0} max={500000} step={500} prefix="$" />
              <p className="text-xs text-gray-500">Standard deduction: <strong className="text-gray-900">{fmt(stdDeduction)}</strong> -- using {itemized > stdDeduction ? 'itemized' : 'standard'}</p>
              <InputField label="State Tax Rate (%)" value={stateRate} onChange={setStateRate} min={0} max={13.3} step={0.1} suffix="%" />
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Federal Tax" value={fmt(federalTax)} subValue={`Eff. rate ${effectiveRate}%`} highlight />
            <ResultCard label="Marginal Rate" value={marginalRate} subValue="Top bracket" />
            <ResultCard label="Total Tax Burden" value={fmt(totalTax)} subValue="Fed + FICA + State" />
            <ResultCard label="Take-Home Pay" value={fmtCompact(netIncome)} subValue="After all taxes" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Card className="text-center p-3">
              <p className="text-xs text-gray-500 mb-1">Gross Income</p>
              <p className="text-lg font-black text-gray-900">{fmtCompact(grossIncome)}</p>
            </Card>
            <Card className="text-center p-3">
              <p className="text-xs text-gray-500 mb-1">AGI</p>
              <p className="text-lg font-black text-gray-900">{fmtCompact(agi)}</p>
            </Card>
            <Card className="text-center p-3">
              <p className="text-xs text-gray-500 mb-1">Taxable Income</p>
              <p className="text-lg font-black text-gray-900">{fmtCompact(taxableIncome)}</p>
            </Card>
            <Card className="text-center p-3">
              <p className="text-xs text-gray-500 mb-1">FICA (SS + Med)</p>
              <p className="text-lg font-black text-gray-900">{fmt(fica)}</p>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">2026 Federal Tax by Bracket</h3>
            <ChartWrapper height={200}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="bracket" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} width={70} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`} />
                  <Tooltip contentStyle={{ background: '#ffffff', border: '1px solid #d1fae5', borderRadius: 10, boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }} formatter={(v: number) => fmt(v)} />
                  <Bar dataKey="tax" name="Tax in Bracket" radius={[4, 4, 0, 0]}>
                    {barData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">2026 Federal Tax Breakdown by Bracket</h3>
            <div className="overflow-x-auto">
              <table className="calc-table">
                <thead><tr><th>Rate</th><th>Bracket Range</th><th>Income in Bracket</th><th>Tax Owed</th></tr></thead>
                <tbody>
                  {breakdown.map((b, i) => (
                    <tr key={b.rate} className={i === breakdown.length - 1 ? 'bg-amber-50' : ''}>
                      <td className="font-bold" style={{ color: COLORS[i % COLORS.length] }}>{b.rate}</td>
                      <td>{fmt(b.min)} - {b.max >= 9999999 ? 'infinity' : fmt(b.max)}</td>
                      <td>{fmt(b.taxable)}</td>
                      <td className="font-semibold text-gray-900">{fmt(b.tax)}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50 font-bold">
                    <td colSpan={3} className="text-gray-900">Total Federal Tax</td>
                    <td className="text-green-600">{fmt(federalTax)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-sm">
              {[
                ['Federal Tax', fmt(federalTax)],
                ['FICA', fmt(fica)],
                ['State Tax (est.)', fmt(stateTax)],
                ['Total Tax', fmt(totalTax)],
                ['Effective Rate', `${effectiveRate}%`],
                ['Marginal Rate', marginalRate],
              ].map(([l, v]) => (
                <div key={l} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">{l}</p>
                  <p className="font-black text-gray-900">{v}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        {/* Internal Links - 10+ Related Finance Calculators */}
        <InternalLinks
          title="Related Finance Calculators"
          variant="grid"
          links={[
          { name: "Annual Income Calculator", href: "/calculators/finance/annual-income-calculator", icon: "💰", desc: "Free calculator" },          { name: "Salary Calculator", href: "/calculators/finance/salary-calculator", icon: "💼", desc: "Free calculator" },          { name: "Paycheck Calculator", href: "/calculators/finance/paycheck-calculator", icon: "💵", desc: "Free calculator" },          { name: "Salary Hike Calculator", href: "/calculators/finance/salary-hike-calculator", icon: "📈", desc: "Free calculator" },          { name: "Income Tax Calculator", href: "/calculators/finance/income-tax-calculator", icon: "📋", desc: "Free calculator" },          { name: "Budget Planner Calculator", href: "/calculators/finance/budget-planner-calculator", icon: "📊", desc: "Free calculator" },          { name: "Savings Rate Calculator", href: "/calculators/finance/savings-rate-calculator", icon: "💰", desc: "Free calculator" },          { name: "Mortgage Calculator", href: "/calculators/finance/mortgage-calculator", icon: "🏡", desc: "Free calculator" },          { name: "401k Calculator", href: "/calculators/finance/401k-calculator", icon: "🏛️", desc: "Free calculator" },          { name: "Compound Interest Calculator", href: "/calculators/finance/compound-interest-calculator", icon: "📈", desc: "Free calculator" },          { name: "Roth IRA Calculator", href: "/calculators/finance/roth-ira-calculator", icon: "🛡️", desc: "Free calculator" },          { name: "Debt Payoff Calculator", href: "/calculators/finance/debt-payoff-calculator", icon: "🔓", desc: "Free calculator" },
          ]}
        />

        <SearchableTable
          title="State Income Tax Rates by State (2026)"
          description="State tax comparison -- find where you pay less"
          headers={['State', 'State Tax Rate', 'Top Rate', '$80K State Tax', 'No State Tax']}
          rows={taxBracketsByState2026}
          searchKey="State"
          searchPlaceholder="Search..."
        />

        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Tax Bracket Calculator Example (USA 2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A single filer earning $85,000 in 2026 falls in the 22% federal tax bracket, paying approximately <strong>$13,234</strong> in federal income tax with an effective rate of 15.6%.
        </p>
        <p className="text-sm text-gray-600">
          This Tax Bracket USA 2026 calculator uses current IRS brackets to give you accurate tax estimates and take-home pay projections.
        </p>
      </Card>
      <SEOContent {...taxBracketSEOContent} category="finance" />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
