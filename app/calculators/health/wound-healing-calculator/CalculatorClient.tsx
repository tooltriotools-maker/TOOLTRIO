'use client'
import { useState, useMemo } from 'react'
import { calculateWoundHealingEstimate } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [woundSize, setWoundSize] = useState(3)
  const [woundDepth, setWoundDepth] = useState<'superficial' | 'partial' | 'full'>('partial')
  const [location, setLocation] = useState<'face' | 'scalp' | 'torso' | 'extremity'>('extremity')
  const [age, setAge] = useState(45)
  const [diabetic, setDiabetic] = useState(false)
  const [bmi, setBmi] = useState(26)
  const [smoking, setSmoking] = useState(false)
  const [nutrition, setNutrition] = useState<'good' | 'moderate' | 'poor'>('good')
  const [immunocompromised, setImmunocompromised] = useState(false)
  const result = useMemo(() => calculateWoundHealingEstimate(woundSize, woundDepth, location, age, diabetic, bmi, smoking, nutrition, immunocompromised), [woundSize, woundDepth, location, age, diabetic, bmi, smoking, nutrition, immunocompromised])
  const infectionColor = result.infectionRisk === 'High' ? '#ef4444' : result.infectionRisk === 'Moderate' ? '#f97316' : '#22c55e'
  return (
    <CalculatorLayout title="Wound Healing Time Calculator" description="Estimate wound healing time and infection risk from wound characteristics, age, diabetes, BMI, smoking, and nutrition." icon="🩹" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="wound-healing-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Wound Details</h2>
          <div className="space-y-3">
            <InputField label="Wound size (cm)" value={woundSize} onChange={setWoundSize} min={0.5} max={30} step={0.5} suffix="cm" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Wound Depth</label>
              <div className="grid grid-cols-3 gap-1">
                {(['superficial','partial','full'] as const).map(d => <button key={d} onClick={() => setWoundDepth(d)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${woundDepth === d ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{d}</button>)}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Location</label>
              <div className="grid grid-cols-2 gap-1">
                {(['face','scalp','torso','extremity'] as const).map(l => <button key={l} onClick={() => setLocation(l)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${location === l ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{l}</button>)}
              </div>
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={1} max={100} step={1} suffix="yrs" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={55} step={0.5} suffix="kg/m²" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Nutrition Status</label>
              <div className="grid grid-cols-3 gap-1">
                {(['good','moderate','poor'] as const).map(n => <button key={n} onClick={() => setNutrition(n)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${nutrition === n ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{n}</button>)}
              </div>
            </div>
            {[
              { label: '🩸 Diabetes mellitus', val: diabetic, set: setDiabetic },
              { label: '🚬 Current smoker', val: smoking, set: setSmoking },
              { label: '💊 Immunocompromised', val: immunocompromised, set: setImmunocompromised },
            ].map(c => (
              <button key={c.label} onClick={() => c.set(!c.val)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${c.val ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${c.val ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{c.val ? '✓' : ''}</span>{c.label}
              </button>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Estimated Healing" value={`${result.estimatedDays} days`} highlight />
            <ResultCard label="Infection Risk" value={result.infectionRisk} />
            <ResultCard label="Care Level" value={result.professionalCare.split(' ')[0]} />
            <ResultCard label="Healing Phase" value="3 stages" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Healing Timeline</h3>
            <div className="space-y-2">
              {result.phases.map((phase, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: ['#3b82f6','#22c55e','#f59e0b'][i] + '12' }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-black text-white flex-shrink-0" style={{ background: ['#3b82f6','#22c55e','#f59e0b'][i] }}>{i+1}</div>
                  <p className="text-sm text-gray-700">{phase}</p>
                </div>
              ))}
            </div>
          </Card>
          {result.complications.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Healing Complications</h3>
              <ul className="space-y-1">{result.complications.map(c => <li key={c} className="text-sm text-orange-700 flex items-start gap-2"><span>⚠️</span>{c}</li>)}</ul>
            </Card>
          )}
          <div className={`rounded-xl p-4 text-sm border ${result.infectionRisk === 'High' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <p className="font-bold mb-1">🥗 Nutrition for Healing</p>
            <p>{result.nutritionTip}</p>
            <p className="text-xs mt-2">{result.professionalCare}</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
