'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateRentalDepreciation } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [propertyValue, setPropertyValue] = useState(350000)
  const [landValue, setLandValue] = useState(70000)
  const [improvements, setImprovements] = useState(0)
  const [propType, setPropType] = useState<'residential' | 'commercial'>('residential')
  const [yearAcquired, setYearAcquired] = useState(2024)
  const result = useMemo(() => calculateRentalDepreciation(propertyValue, landValue, improvements, propType, yearAcquired), [propertyValue, landValue, improvements, propType, yearAcquired])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  return (
    <CalculatorLayout title="Rental Property Depreciation Calculator USA 2026" description="Calculate rental property depreciation schedule, annual deductions, and cumulative tax savings." icon="🏘️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="rental-property-depreciation-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Property Details</h2>
          {[
            { label: 'Total Property Value', value: propertyValue, set: setPropertyValue, step: 10000, prefix: '$' },
            { label: 'Land Value (not depreciable)', value: landValue, set: setLandValue, step: 5000, prefix: '$' },
            { label: 'Improvements / Additions', value: improvements, set: setImprovements, step: 5000, prefix: '$' },
            { label: 'Year Placed in Service', value: yearAcquired, set: setYearAcquired, step: 1, suffix: '' },
          ].map(({ label, value, set, step, prefix, suffix }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                {prefix && <span className="text-green-600 text-sm">{prefix}</span>}
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
                {suffix !== undefined && suffix !== '$' && <span className="text-gray-400 text-sm">{suffix}</span>}
              </div>
            </div>
          ))}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Property Type</label>
            <div className="grid grid-cols-2 gap-2">
              {[{ id: 'residential' as const, label: 'Residential (27.5 yrs)' }, { id: 'commercial' as const, label: 'Commercial (39 yrs)' }].map(t => (
                <button key={t.id} onClick={() => setPropType(t.id)} className={`py-2 px-2 rounded-xl text-xs font-semibold transition-all ${propType === t.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{t.label}</button>
              ))}
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Annual Depreciation" value={fmt(result.annualDepreciation)} highlight />
            <ResultCard label="Annual Tax Savings" value={fmt(result.annualTaxSavings)} subValue="est. 24% bracket" />
            <ResultCard label="Depreciable Basis" value={fmt(result.depreciableBase)} subValue="excl. land" />
            <ResultCard label="Depreciation Life" value={result.lifeYears + ' yrs'} subValue={propType} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Cumulative Depreciation (10 Years)</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.years} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs><linearGradient id="depGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={65} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                  <Area type="monotone" dataKey="cumulative" name="Cumulative Depreciation" stroke="#22c55e" fill="url(#depGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <p className="font-bold mb-1">⚠️ Depreciation Recapture</p>
            <p>When you sell, the IRS recaptures depreciation at 25%. Estimated recapture tax over full depreciation life: <strong>{fmt(result.deprecreciationRecapture)}</strong>. A 1031 exchange can defer this indefinitely.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to use and interpret this rental property depreciation calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This calculator uses Annual Depreciation, Annual Tax Savings, Depreciable Basis, Depreciation Life to produce the results displayed above. Change one input at a time when comparing scenarios so you can see which assumption is responsible for the difference.</p>
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
