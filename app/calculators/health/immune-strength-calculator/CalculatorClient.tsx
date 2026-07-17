'use client'
import { useState, useMemo } from 'react'
import { calculateImmuneStrengthScore } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [sleepHours, setSleepHours] = useState(7)
  const [stressLevel, setStressLevel] = useState(5)
  const [exerciseMin, setExerciseMin] = useState(150)
  const [fruitVeg, setFruitVeg] = useState(4)
  const [alcohol, setAlcohol] = useState(5)
  const [smoking, setSmoking] = useState(false)
  const [bmi, setBmi] = useState(24)
  const [age, setAge] = useState(38)
  const [chronicConditions, setChronicConditions] = useState(0)
  const [supplements, setSupplements] = useState(3)
  const result = useMemo(() => calculateImmuneStrengthScore(sleepHours, stressLevel, exerciseMin, fruitVeg, alcohol, smoking, bmi, age, chronicConditions, supplements), [sleepHours, stressLevel, exerciseMin, fruitVeg, alcohol, smoking, bmi, age, chronicConditions, supplements])
  return (
    <CalculatorLayout title="Immune Strength Score Calculator" description="Score your immune system resilience from sleep, stress, exercise, diet, BMI, and lifestyle factors." icon="🛡️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="immune-strength-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Lifestyle Factors</h2>
          <div className="space-y-3">
            <InputField label="Sleep (hrs/night)" value={sleepHours} onChange={setSleepHours} min={3} max={12} step={0.5} suffix="hrs" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Stress Level (0–10): <span className="font-bold text-rose-600">{stressLevel}</span></label>
              <input type="range" min={0} max={10} step={1} value={stressLevel} onChange={e => setStressLevel(Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
            <InputField label="Exercise (min/week)" value={exerciseMin} onChange={setExerciseMin} min={0} max={600} step={30} suffix="min/wk" />
            <InputField label="Fruit & Veg (servings/day)" value={fruitVeg} onChange={setFruitVeg} min={0} max={15} step={0.5} suffix="/day" />
            <InputField label="Alcohol (drinks/week)" value={alcohol} onChange={setAlcohol} min={0} max={50} step={1} suffix="/wk" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={50} step={0.5} suffix="kg/m²" />
            <InputField label="Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            <InputField label="Chronic conditions" value={chronicConditions} onChange={setChronicConditions} min={0} max={5} step={1} suffix="" />
            <InputField label="Supplement score (0–5)" value={supplements} onChange={setSupplements} min={0} max={5} step={1} suffix="" />
            <button onClick={() => setSmoking(!smoking)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${smoking ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${smoking ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{smoking ? '✓' : ''}</span>🚬 Current smoker
            </button>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Immune Score" value={`${result.immuneScore}/100`} highlight />
            <ResultCard label="Status" value={result.status} />
            <ResultCard label="Sick Days Est." value={result.sickDaysEstimate} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Immune Strength Gauge</h3>
            <div className="relative h-6 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.immuneScore}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Very Poor</span><span>Moderate</span><span>Strong</span></div>
            <p className="text-center font-black text-3xl mt-2" style={{ color: result.color }}>{result.immuneScore}/100</p>
            <p className="text-center text-sm font-semibold mt-0.5" style={{ color: result.color }}>{result.status}</p>
          </Card>
          <div className={`rounded-xl p-4 text-sm border ${result.immuneScore >= 70 ? 'bg-green-50 border-green-200 text-green-800' : result.immuneScore >= 50 ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <p className="font-bold mb-1">💊 Top Impact Factor</p>
            <p>{result.topImpact}</p>
            <p className="text-xs mt-2">{result.vaccinationNote}</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
