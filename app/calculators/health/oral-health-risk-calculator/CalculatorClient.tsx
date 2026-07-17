'use client'
import { useState, useMemo } from 'react'
import { calculateOralHealthRisk } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [brushingFreq, setBrushingFreq] = useState(2)
  const [flossingFreq, setFlossingFreq] = useState(2)
  const [sugarConsumption, setSugarConsumption] = useState(2)
  const [smoker, setSmoker] = useState(false)
  const [alcoholPerWeek, setAlcoholPerWeek] = useState(5)
  const [lastDentalVisit, setLastDentalVisit] = useState(12)
  const [dryMouth, setDryMouth] = useState(false)
  const [nightGrinding, setNightGrinding] = useState(false)
  const [acidicDiet, setAcidicDiet] = useState(2)
  const result = useMemo(() => calculateOralHealthRisk(brushingFreq, flossingFreq, sugarConsumption, smoker, alcoholPerWeek, lastDentalVisit, dryMouth, nightGrinding, acidicDiet), [brushingFreq, flossingFreq, sugarConsumption, smoker, alcoholPerWeek, lastDentalVisit, dryMouth, nightGrinding, acidicDiet])
  return (
    <CalculatorLayout title="Oral Health Risk Calculator" description="Assess your risk of tooth decay, gum disease, and oral cancer from habits, diet, and lifestyle factors." icon="🦷" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="oral-health-risk-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Oral Health Habits</h2>
          <div className="space-y-3">
            <InputField label="Brushing frequency (times/day)" value={brushingFreq} onChange={setBrushingFreq} min={0} max={5} step={1} suffix="/day" />
            <InputField label="Flossing frequency (times/week)" value={flossingFreq} onChange={setFlossingFreq} min={0} max={14} step={1} suffix="/wk" />
            <InputField label="Sugar/sweets servings per day" value={sugarConsumption} onChange={setSugarConsumption} min={0} max={10} step={1} suffix="/day" />
            <InputField label="Alcohol (drinks/week)" value={alcoholPerWeek} onChange={setAlcoholPerWeek} min={0} max={50} step={1} suffix="/wk" />
            <InputField label="Last dental visit" value={lastDentalVisit} onChange={setLastDentalVisit} min={0} max={120} step={1} suffix="months ago" />
            <InputField label="Acidic foods/drinks (0–5)" value={acidicDiet} onChange={setAcidicDiet} min={0} max={5} step={1} suffix="" />
            {[
              { label: '🚬 Current smoker', val: smoker, set: setSmoker },
              { label: '😮 Dry mouth (xerostomia)', val: dryMouth, set: setDryMouth },
              { label: '😬 Nighttime teeth grinding (bruxism)', val: nightGrinding, set: setNightGrinding },
            ].map(c => (
              <button key={c.label} onClick={() => c.set(!c.val)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${c.val ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${c.val ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{c.val ? '✓' : ''}</span>{c.label}
              </button>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Risk Score" value={`${result.oralRisk}/100`} highlight />
            <ResultCard label="Category" value={result.category.split(' — ')[0]} />
            <ResultCard label="Cancer Risk" value={result.cancerRisk.split(' — ')[0]} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Oral Risk Gauge</h3>
            <div className="relative h-6 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.oralRisk}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Low risk</span><span>Moderate</span><span>High risk</span></div>
            <p className="text-center font-black text-3xl mt-2" style={{ color: result.color }}>{result.oralRisk}/100</p>
            <p className="text-center text-sm font-semibold mt-0.5" style={{ color: result.color }}>{result.category}</p>
          </Card>
          {result.systemicLinks.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Systemic Health Links</h3>
              <ul className="space-y-1">{result.systemicLinks.map(l => <li key={l} className="text-sm text-orange-700 flex items-start gap-2"><span>⚠️</span>{l}</li>)}</ul>
            </Card>
          )}
          {result.grindingTip && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <p className="font-bold mb-1">💊 Bruxism Tip</p>
              <p>{result.grindingTip}</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
