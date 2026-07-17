'use client'
import { useState, useMemo } from 'react'
import { calculateMenstrualHealthScore } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [cycleLength, setCycleLength] = useState(28)
  const [periodLength, setPeriodLength] = useState(5)
  const [painLevel, setPainLevel] = useState(3)
  const [flowHeaviness, setFlowHeaviness] = useState(4)
  const [irregularity, setIrregularity] = useState(1)
  const [pmsSymptoms, setPmsSymptoms] = useState(2)
  const [moodChanges, setMoodChanges] = useState(2)
  const [energyDrop, setEnergyDrop] = useState(2)
  const result = useMemo(() => calculateMenstrualHealthScore(cycleLength, periodLength, painLevel, flowHeaviness, irregularity, pmsSymptoms, moodChanges, energyDrop), [cycleLength, periodLength, painLevel, flowHeaviness, irregularity, pmsSymptoms, moodChanges, energyDrop])
  const sliders = [
    { label: 'Pain level (0=none, 10=debilitating)', value: painLevel, set: setPainLevel, max: 10 },
    { label: 'Flow heaviness (0=light, 10=very heavy)', value: flowHeaviness, set: setFlowHeaviness, max: 10 },
    { label: 'Cycle irregularity (0=regular, 5=very irregular)', value: irregularity, set: setIrregularity, max: 5 },
    { label: 'PMS symptoms severity (0–5)', value: pmsSymptoms, set: setPmsSymptoms, max: 5 },
    { label: 'Mood changes (0–5)', value: moodChanges, set: setMoodChanges, max: 5 },
    { label: 'Energy drop during period (0–5)', value: energyDrop, set: setEnergyDrop, max: 5 },
  ]
  return (
    <CalculatorLayout title="Menstrual Health Score Calculator" description="Assess cycle health from length, pain, flow, PMS symptoms, and irregularity — with red flag detection." icon="🌙" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="menstrual-health-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Cycle Details</h2>
          <div className="space-y-3">
            <InputField label="Cycle length (days)" value={cycleLength} onChange={setCycleLength} min={15} max={60} step={1} suffix="days" />
            <InputField label="Period length (days)" value={periodLength} onChange={setPeriodLength} min={1} max={12} step={1} suffix="days" />
            {sliders.map(s => (
              <div key={s.label} className="space-y-1">
                <label className="text-xs font-medium text-gray-500">{s.label}: <span className="font-bold text-rose-600">{s.value}</span></label>
                <input type="range" min={0} max={s.max} step={1} value={s.value} onChange={e => s.set(Number(e.target.value))} className="w-full accent-rose-500" />
              </div>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Health Score" value={`${result.healthScore}/100`} highlight />
            <ResultCard label="Category" value={result.category.split(' — ')[0]} />
            <ResultCard label="Iron Risk" value={result.ironRisk.split(' — ')[0]} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Cycle Health Gauge</h3>
            <div className="relative h-6 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.healthScore}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Severe dysfunction</span><span>Concerns</span><span>Healthy cycle</span></div>
            <p className="text-center font-black text-3xl mt-2" style={{ color: result.color }}>{result.healthScore}/100</p>
            <p className="text-center text-sm font-semibold mt-0.5" style={{ color: result.color }}>{result.category}</p>
          </Card>
          {result.redFlags.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="font-bold text-sm text-red-800 mb-2">🚨 Red Flags — Medical Evaluation Recommended</p>
              <ul className="space-y-1">{result.redFlags.map(f => <li key={f} className="text-sm text-red-700">{f}</li>)}</ul>
            </div>
          )}
          {result.investigations.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Suggested Investigations</h3>
              <ul className="space-y-1">{result.investigations.map(i => <li key={i} className="text-sm text-gray-700 flex items-center gap-2"><span className="text-blue-500">•</span>{i}</li>)}</ul>
            </Card>
          )}
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
