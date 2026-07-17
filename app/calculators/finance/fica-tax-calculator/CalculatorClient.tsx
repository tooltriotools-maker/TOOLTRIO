'use client'
import { useState, useMemo } from 'react'
import { calculateFICA } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [grossWages, setGrossWages] = useState(120000)
  const [ytdWages, setYtdWages] = useState(0)
  const [selfEmployed, setSelfEmployed] = useState(false)

  const result = useMemo(() => calculateFICA(grossWages, ytdWages, selfEmployed), [grossWages, ytdWages, selfEmployed])
  const fmt = (v: number) => '$' + v.toLocaleString()

  return (
    <CalculatorLayout title="FICA Tax Calculator USA 2026" description="Calculate Social Security and Medicare taxes for employees and self-employed individuals." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="fica-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Your Wages</h2>
          {[{ label: 'Gross Annual Wages', value: grossWages, set: setGrossWages, step: 5000 }, { label: 'Prior YTD Wages (same year)', value: ytdWages, set: setYtdWages, step: 5000 }].map(({ label, value, set, step }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                <span className="text-green-600 text-sm">$</span>
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              </div>
            </div>
          ))}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Employment Type</label>
            <div className="grid grid-cols-2 gap-2">
              {[{ label: 'W-2 Employee', val: false }, { label: 'Self-Employed', val: true }].map(({ label, val }) => (
                <button key={label} onClick={() => setSelfEmployed(val)} className={`py-2 rounded-xl text-xs font-semibold transition-all ${selfEmployed === val ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{label}</button>
              ))}
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
            <p className="font-bold">2026 SS Wage Base: $176,100</p>
            <p className="mt-1">Additional Medicare kicks in at $200,000</p>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="SS Tax" value={fmt(result.ssTax)} highlight />
            <ResultCard label="Medicare Tax" value={fmt(result.medicareTax)} />
            <ResultCard label="Additional Medicare" value={fmt(result.additionalMedicare)} subValue="0.9% surtax" />
            <ResultCard label="Total FICA" value={fmt(result.totalFICA)} subValue={selfEmployed ? 'self-employed' : 'employee share'} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">FICA Breakdown</h3>
            <div className="space-y-3">
              {[
                { label: 'Social Security (6.2%)', emp: result.ssTax, employer: result.employerMatch / 2, color: 'bg-blue-500' },
                { label: 'Medicare (1.45%)', emp: result.medicareTax, employer: result.employerMatch / 2, color: 'bg-green-500' },
                { label: 'Additional Medicare (0.9%)', emp: result.additionalMedicare, employer: 0, color: 'bg-orange-500' },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${row.color}`} />
                  <span className="text-sm text-gray-600 flex-1">{row.label}</span>
                  <span className="font-bold text-sm">{fmt(row.emp)}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold text-gray-800">Total FICA (Your Share)</span>
                <span className="font-black text-red-600">{fmt(result.totalFICA)}</span>
              </div>
              {!selfEmployed && <div className="flex justify-between text-sm text-gray-500">
                <span>Employer Match</span><span className="font-semibold">{fmt(result.employerMatch)}</span>
              </div>}
              {!selfEmployed && <div className="flex justify-between text-sm font-bold text-gray-700">
                <span>Total Employment Cost</span><span>{fmt(result.totalCost)}</span>
              </div>}
            </div>
          </Card>
          {result.additionalMedicare > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <p className="font-bold mb-1">⚠️ Additional Medicare Tax Applies</p>
              <p>Your wages exceed $200,000 — the additional 0.9% Medicare surtax applies to the excess. Note: this is not matched by your employer.</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
