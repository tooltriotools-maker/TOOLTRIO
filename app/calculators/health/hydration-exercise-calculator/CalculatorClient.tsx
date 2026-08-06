'use client'
import { useState, useMemo } from 'react'
import { calculateHydrationForExercise } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
const auditFaqs = [
  {"question": "What should I check before using the Hydration Exercise Calculator?", "answer": "Check Body Weight, Duration, Air Temperature, Altitude, Total Fluid Need, Sweat Rate and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Hydration Exercise Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculator output for informational use and is not a diagnosis or a substitute for evaluation by a qualified healthcare professional."},
  {"question": "How can I compare different Hydration Exercise Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. Comparing results this way makes it easier to see which input is responsible for the difference."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [bodyWeight, setBodyWeight] = useState(75)
  const [duration, setDuration] = useState(60)
  const [intensity, setIntensity] = useState(6)
  const [tempC, setTempC] = useState(20)
  const [altitude, setAltitude] = useState(0)
  const [exerciseType, setExerciseType] = useState<'cardio' | 'strength' | 'outdoor'>('cardio')
  const result = useMemo(() => calculateHydrationForExercise(bodyWeight, duration, intensity, tempC, altitude, exerciseType), [bodyWeight, duration, intensity, tempC, altitude, exerciseType])
  return (
    <CalculatorLayout title="Hydration for Exercise Calculator" description="Calculate exact pre-workout, during-workout, and post-workout fluid needs for your session." icon="🏃" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="hydration-exercise-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Session Details</h2>
          <div className="space-y-3">
            <InputField label="Body Weight" value={bodyWeight} onChange={setBodyWeight} min={40} max={180} step={1} suffix="kg" />
            <InputField label="Duration" value={duration} onChange={setDuration} min={10} max={360} step={10} suffix="min" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Intensity (1–10): <span className="font-bold text-rose-600">{intensity}</span></label>
              <input type="range" min={1} max={10} step={1} value={intensity} onChange={e => setIntensity(Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
            <InputField label="Air Temperature" value={tempC} onChange={setTempC} min={-10} max={45} step={1} suffix="°C" />
            <InputField label="Altitude" value={altitude} onChange={setAltitude} min={0} max={15000} step={500} suffix="ft" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Exercise Type</label>
              <div className="grid grid-cols-3 gap-1">
                {(['cardio','strength','outdoor'] as const).map(t => <button key={t} onClick={() => setExerciseType(t)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${exerciseType === t ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{t}</button>)}
              </div>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total Fluid Need" value={`${result.totalFluidNeedL}L`} highlight />
            <ResultCard label="Sweat Rate" value={`${result.sweatRateLH}L/hr`} />
            <ResultCard label="Electrolytes" value={result.electrolytesNeeded ? 'Needed' : 'Not needed'} />
            <ResultCard label="Drink Interval" value={result.drinkInterval} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Hydration Timeline</h3>
            <div className="space-y-3">
              {[
                { phase: '🕐 Pre-workout (2 hrs before)', amount: `${result.preDrinkMl}mL`, color: '#3b82f6', note: 'Then 200mL 15 min before' },
                { phase: '🏃 During workout', amount: `${result.duringDrinkMl}mL`, color: '#22c55e', note: result.perBottle + ' per 15 min' },
                { phase: '🛁 Post-workout recovery', amount: `${result.afterDrinkMl}mL`, color: '#f59e0b', note: 'Over 2-4 hours' },
              ].map(p => (
                <div key={p.phase} className="flex items-center gap-3 p-3 rounded-xl" style={{ background: p.color + '12' }}>
                  <div>
                    <p className="text-sm font-semibold text-gray-700">{p.phase}</p>
                    <p className="text-xs text-gray-400">{p.note}</p>
                  </div>
                  <p className="ml-auto text-lg font-black" style={{ color: p.color }}>{p.amount}</p>
                </div>
              ))}
            </div>
          </Card>
          {result.electrolytesNeeded && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-sm text-orange-800">
              <p className="font-bold mb-1">⚡ Electrolyte Replacement Needed</p>
              <p>Estimated sodium loss: ~{result.sodiumMg}mg. {result.sportsDrinkTip}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Understanding this hydration exercise calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>The calculator uses Body Weight, Duration, Air Temperature, Altitude, Total Fluid Need, Sweat Rate, Electrolytes. Its output is based on the formula implemented by this tool and the values you provide.</p>
            <p>When comparing scenarios, change one assumption at a time and compare Hydration for Exercise Calculator, Body Weight, Duration, Air Temperature, Altitude, Total Fluid Need, Sweat Rate. This makes it easier to identify which input is responsible for the change instead of treating the result as a prediction.</p>
            <p>Check the units and time period before relying on the output. Real-world outcomes can differ when relevant taxes, fees, eligibility requirements, measurement error, market changes, or other factors are outside the calculator&apos;s inputs.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this explanation documents the calculator&apos;s use and limitations without changing its underlying calculation.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={auditFaqs} /></div>
    </CalculatorLayout>
  )
}
