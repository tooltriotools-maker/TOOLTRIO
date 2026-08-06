'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateQualifiedDividendTax } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [ordinaryDividends, setOrdinaryDividends] = useState(15000)
  const [qualifiedDividends, setQualifiedDividends] = useState(12000)
  const [otherIncome, setOtherIncome] = useState(80000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const result = useMemo(() => calculateQualifiedDividendTax(ordinaryDividends, qualifiedDividends, otherIncome, filingStatus), [ordinaryDividends, qualifiedDividends, otherIncome, filingStatus])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  const chartData = [
    { name: 'If All Ordinary', tax: result.ordinaryDividendTax + result.qualifiedDividendTax },
    { name: 'With Qualified Rates', tax: result.qualifiedDividendTax + result.niit },
    { name: 'Tax Savings', tax: result.savings },
  ]
  return (
    <CalculatorLayout title="Qualified Dividend Tax Calculator USA 2026" description="Calculate tax on qualified vs ordinary dividends using 2026 LTCG rates." icon="💰" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="qualified-dividend-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Dividend Details</h2>
          {[{ label: 'Total Ordinary Dividends', value: ordinaryDividends, set: setOrdinaryDividends }, { label: 'Qualified Dividends (subset)', value: qualifiedDividends, set: setQualifiedDividends }, { label: 'Other Taxable Income', value: otherIncome, set: setOtherIncome }].map(({ label, value, set }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                <span className="text-green-600 text-sm">$</span>
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2">
            {(['single', 'married'] as const).map(s => (
              <button key={s} onClick={() => setFilingStatus(s)} className={`py-2 rounded-xl text-xs font-semibold ${filingStatus === s ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Qualified Div Tax" value={fmt(result.qualifiedDividendTax)} highlight />
            <ResultCard label="Tax Savings" value={fmt(result.savings)} subValue="vs ordinary rates" />
            <ResultCard label="Effective Rate" value={result.effectiveRate + '%'} subValue="on qualified divs" />
            {result.niit > 0 && <ResultCard label="NIIT (3.8%)" value={fmt(result.niit)} subValue="surtax" />}
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">LTCG Rate Breakdown</h3>
            <div className="space-y-2">
              {[{ label: 'Taxed at 0%', value: result.breakdown.at0pct, color: 'text-green-600' }, { label: 'Taxed at 15%', value: result.breakdown.at15pct, color: 'text-yellow-600' }, { label: 'Taxed at 20%', value: result.breakdown.at20pct, color: 'text-red-600' }].map(r => (
                <div key={r.label} className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{r.label}</span>
                  <span className={`font-bold ${r.color}`}>{fmt(r.value)}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Tax Comparison</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={60} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                  <Bar dataKey="tax" fill="#22c55e" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to use and interpret this qualified dividend tax calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This calculator uses Qualified Div Tax, Tax Savings, Effective Rate, NIIT (3.8%) to produce the results displayed above. Change one input at a time when comparing scenarios so you can see which assumption is responsible for the difference.</p>
            <p>The result is an estimate produced from the calculator&apos;s implemented formula and the values you enter. Review the units, time period, and assumptions before using the output for a decision; a calculated result does not add information that is not represented by the inputs.</p>
            <p>Use the worked output as a planning or comparison aid. Real-world results can differ when taxes, fees, eligibility rules, measurement error, market conditions, or other factors not represented by this calculator apply.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this section describes the calculator implementation on this page and does not change its underlying formula.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
