'use client'
import { useState, useMemo } from 'react'
import { calculateMetabolicAge } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [bmi, setBmi] = useState(24)
  const [restingHR, setRestingHR] = useState(68)
  const [fitnessLevel, setFitnessLevel] = useState(5)
  const [age, setAge] = useState(40)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [waistCm, setWaistCm] = useState(85)
  const [heightCm, setHeightCm] = useState(175)

  const result = useMemo(() => calculateMetabolicAge(bmi, restingHR, fitnessLevel, age, gender, waistCm, heightCm), [bmi, restingHR, fitnessLevel, age, gender, waistCm, heightCm])

  const diff = result.metabolicAge - age
  const diffColor = diff <= -5 ? '#22c55e' : diff <= 0 ? '#84cc16' : diff <= 5 ? '#eab308' : diff <= 10 ? '#f97316' : '#ef4444'

  return (
    <CalculatorLayout title="Metabolic Age Calculator" description="Compare your metabolic age to your chronological age based on BMI, resting heart rate, fitness, and waist ratio." icon="⚡" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="metabolic-age-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Your Metrics</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={45} step={0.5} suffix="kg/m²" />
            <InputField label="Resting Heart Rate" value={restingHR} onChange={setRestingHR} min={35} max={110} step={1} suffix="bpm" />
            <InputField label="Waist Circumference" value={waistCm} onChange={setWaistCm} min={50} max={180} step={1} suffix="cm" />
            <InputField label="Height" value={heightCm} onChange={setHeightCm} min={140} max={220} step={1} suffix="cm" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Fitness Level (1 = very unfit, 10 = elite)</label>
              <div className="flex gap-1 flex-wrap">
                {[1,2,3,4,5,6,7,8,9,10].map(v => (
                  <button key={v} onClick={() => setFitnessLevel(v)} className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${fitnessLevel === v ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{v}</button>
                ))}
              </div>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Metabolic Age" value={`${result.metabolicAge} yrs`} highlight />
            <ResultCard label="Chronological Age" value={`${age} yrs`} />
            <ResultCard label="Difference" value={`${diff > 0 ? '+' : ''}${diff} yrs`} subValue={diff <= 0 ? 'younger!' : 'older'} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Age Comparison</h3>
            <div className="flex items-end gap-6 justify-center py-4">
              <div className="text-center">
                <div className="text-5xl font-black text-gray-300">{age}</div>
                <div className="text-xs text-gray-400 mt-1">Chronological Age</div>
              </div>
              <div className="text-2xl font-bold" style={{ color: diffColor }}>{diff > 0 ? '▲' : diff < 0 ? '▼' : '='}</div>
              <div className="text-center">
                <div className="text-5xl font-black" style={{ color: diffColor }}>{result.metabolicAge}</div>
                <div className="text-xs text-gray-400 mt-1">Metabolic Age</div>
              </div>
            </div>
            <p className="text-center text-sm font-semibold" style={{ color: diffColor }}>{result.assessment}</p>
          </Card>
          {result.improvementAreas.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Key Improvement Areas</h3>
              <ul className="space-y-1">
                {result.improvementAreas.map(a => <li key={a} className="text-sm text-orange-700 flex items-start gap-2"><span className="flex-shrink-0 mt-0.5">→</span>{a}</li>)}
              </ul>
            </Card>
          )}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-bold mb-1">📊 Waist-to-Height Ratio: {result.whr}</p>
            <p>Ratio below 0.50 is associated with lowest cardiometabolic risk. Your ratio indicates {result.whr > 0.50 ? 'elevated central adiposity — prioritize waist reduction' : 'healthy body fat distribution'}.</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
