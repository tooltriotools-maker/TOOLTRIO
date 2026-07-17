'use client'
import { useState, useMemo } from 'react'
import { calculateRespiratoryRate } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [breathsPerMinute, setBreathsPerMinute] = useState(16)
  const [age, setAge] = useState(35)
  const [afterExercise, setAfterExercise] = useState(false)
  const [altitudeFt, setAltitudeFt] = useState(0)

  const result = useMemo(() => calculateRespiratoryRate(breathsPerMinute, age, afterExercise, altitudeFt), [breathsPerMinute, age, afterExercise, altitudeFt])

  const statusColorMap: Record<string, string> = {
    'Normal respiratory rate': '#22c55e',
    'Post-exercise elevation — normal': '#84cc16',
    'Mild tachypnea — slightly elevated': '#eab308',
    'Bradypnea — below normal range': '#f97316',
    'Tachypnea — significantly elevated': '#ef4444',
  }
  const statusColor = statusColorMap[result.status] ?? '#6b7280'

  return (
    <CalculatorLayout title="Respiratory Rate Calculator" description="Check if your resting breathing rate is normal for your age and detect early signs of respiratory distress." icon="🌬️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="respiratory-rate-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Breathing Details</h2>
          <div className="space-y-3">
            <InputField label="Breaths per minute" value={breathsPerMinute} onChange={setBreathsPerMinute} min={4} max={60} step={1} suffix="bpm" />
            <InputField label="Age" value={age} onChange={setAge} min={0} max={100} step={1} suffix="yrs" />
            <InputField label="Altitude" value={altitudeFt} onChange={setAltitudeFt} min={0} max={18000} step={500} suffix="ft" />
            <button onClick={() => setAfterExercise(!afterExercise)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${afterExercise ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${afterExercise ? 'bg-blue-500 border-blue-500 text-white' : 'border-gray-300'}`}>{afterExercise ? '✓' : ''}</span>
              Measured after exercise
            </button>
            <div className="p-4 rounded-xl border text-center" style={{ background: statusColor + '15', borderColor: statusColor + '40' }}>
              <p className="text-xs text-gray-500 mb-1">Your Rate</p>
              <p className="text-5xl font-black" style={{ color: statusColor }}>{breathsPerMinute}</p>
              <p className="text-xs text-gray-400 mt-1">breaths/min</p>
              <p className="text-xs font-semibold mt-2" style={{ color: statusColor }}>{result.status}</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Your Rate" value={`${breathsPerMinute} bpm`} highlight />
            <ResultCard label="Normal Range" value={result.normalRange} subValue={result.ageGroup} />
            <ResultCard label="Minute Ventilation" value={result.minuteVentilation} />
            <ResultCard label="O₂ Per Minute" value={result.oxygenPerMinute} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Normal Ranges by Age Group</h3>
            <div className="space-y-2">
              {[
                { group: 'Infant (0–1 yr)', range: '30–60', highlight: result.ageGroup === 'infant' },
                { group: 'Child (1–12 yr)', range: '18–30', highlight: result.ageGroup === 'child' },
                { group: 'Adolescent (12–18)', range: '12–20', highlight: result.ageGroup === 'teen' },
                { group: 'Adult (18–65)', range: '12–20', highlight: result.ageGroup === 'adult' },
                { group: 'Elderly (65+)', range: '12–28', highlight: result.ageGroup === 'elderly' },
              ].map(r => (
                <div key={r.group} className={`flex justify-between items-center p-3 rounded-xl ${r.highlight ? 'bg-rose-50 border border-rose-200' : 'bg-gray-50'}`}>
                  <span className={`text-sm font-semibold ${r.highlight ? 'text-rose-700' : 'text-gray-600'}`}>{r.group}</span>
                  <span className={`text-sm font-mono font-bold ${r.highlight ? 'text-rose-700' : 'text-gray-500'}`}>{r.range} bpm</span>
                </div>
              ))}
            </div>
          </Card>
          {altitudeFt > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <p className="font-bold mb-1">🏔️ Altitude Effect</p>
              <p>{result.altitudeEffect}</p>
            </div>
          )}
          <div className={`rounded-xl p-4 text-sm border ${result.status.includes('elevated') || result.status.includes('Tachypnea') ? 'bg-red-50 border-red-200 text-red-800' : result.status.includes('below') ? 'bg-orange-50 border-orange-200 text-orange-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <p className="font-bold mb-1">📋 {result.status}</p>
            <p className="text-xs">Normal range for your age group: {result.normalRange} · Red flag threshold: ≥{result.redFlagThreshold} bpm at rest</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
