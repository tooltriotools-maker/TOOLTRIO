'use client'
import { useState, useMemo } from 'react'
import { calculateWaistHipRatio } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [waistCm, setWaistCm] = useState(85)
  const [hipCm, setHipCm] = useState(98)
  const [gender, setGender] = useState<'male' | 'female'>('female')
  const [age, setAge] = useState(38)
  const [unit, setUnit] = useState<'cm' | 'in'>('cm')

  const waistVal = unit === 'in' ? waistCm * 2.54 : waistCm
  const hipVal = unit === 'in' ? hipCm * 2.54 : hipCm

  const result = useMemo(() => calculateWaistHipRatio(waistVal, hipVal, gender, age), [waistVal, hipVal, gender, age])

  const whoThresholds = gender === 'male' ? { moderate: 0.90, high: 0.95 } : { moderate: 0.85, high: 0.90 }

  return (
    <CalculatorLayout title="Waist-to-Hip Ratio Calculator" description="Calculate your WHR and cardiovascular disease risk using WHO thresholds, with ideal waist target and metabolic syndrome indicator." icon="📏" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="waist-hip-ratio-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Measurements</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['cm', 'in'] as const).map(u => (
                <button key={u} onClick={() => setUnit(u)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${unit === u ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>{u}</button>
              ))}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            <InputField label={`Waist Circumference (${unit})`} value={waistCm} onChange={setWaistCm} min={unit === 'cm' ? 50 : 20} max={unit === 'cm' ? 180 : 70} step={unit === 'cm' ? 1 : 0.5} suffix={unit} />
            <InputField label={`Hip Circumference (${unit})`} value={hipCm} onChange={setHipCm} min={unit === 'cm' ? 60 : 24} max={unit === 'cm' ? 200 : 80} step={unit === 'cm' ? 1 : 0.5} suffix={unit} />
            <div className="p-4 rounded-xl border text-center" style={{ background: result.color + '15', borderColor: result.color + '40' }}>
              <p className="text-xs text-gray-500 mb-1">Your WHR</p>
              <p className="text-5xl font-black" style={{ color: result.color }}>{result.ratio}</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="WHR" value={result.ratio.toString()} highlight />
            <ResultCard label="Risk Category" value={result.riskCategory.split(' — ')[0]} />
            <ResultCard label="Ideal Waist" value={`${result.idealWaistCm} cm`} />
            <ResultCard label="Waist to Lose" value={result.waistToLoseCm > 0 ? `${result.waistToLoseCm} cm` : 'None — ideal!'} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">WHO Risk Categories ({gender})</h3>
            <div className="space-y-2">
              {[
                { label: 'Low risk', range: gender === 'male' ? '≤ 0.85' : '≤ 0.80', color: '#22c55e', min: 0, max: gender === 'male' ? 0.85 : 0.80 },
                { label: 'Moderate risk', range: gender === 'male' ? '0.86–0.90' : '0.81–0.85', color: '#eab308', min: gender === 'male' ? 0.86 : 0.81, max: whoThresholds.moderate },
                { label: 'High risk', range: gender === 'male' ? '> 0.90' : '> 0.85', color: '#ef4444', min: whoThresholds.moderate, max: 2 },
              ].map(r => {
                const active = result.ratio >= r.min && result.ratio <= r.max
                return (
                  <div key={r.label} className={`flex items-center justify-between p-3 rounded-xl border ${active ? 'border-2' : 'border-transparent'}`} style={{ background: active ? r.color + '15' : '#f9fafb', borderColor: active ? r.color : 'transparent' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                      <span className="text-sm font-semibold" style={{ color: active ? r.color : '#6b7280' }}>{r.label}</span>
                    </div>
                    <span className="text-sm font-mono font-bold" style={{ color: active ? r.color : '#9ca3af' }}>{r.range}</span>
                    {active && <span className="text-xs font-bold bg-white px-2 py-0.5 rounded-full" style={{ color: r.color }}>← You</span>}
                  </div>
                )
              })}
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Health Indicators</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">CV Risk</span><span className="font-bold">{result.cvRisk}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Metabolic Syndrome</span><span className={`font-bold ${result.metabolicSyndromeIndicator ? 'text-red-600' : 'text-green-600'}`}>{result.metabolicSyndromeIndicator ? '⚠️ Meets waist threshold' : '✅ Below threshold'}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Diabetes Risk</span><span className="font-bold">{result.diabetesRisk}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">BMI Equivalent</span><span className="font-bold text-right ml-4">{result.bmiEquivalent}</span></div>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
