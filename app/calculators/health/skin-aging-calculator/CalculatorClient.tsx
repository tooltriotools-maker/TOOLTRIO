'use client'
import { useState, useMemo } from 'react'
import { calculateSkinAgingRisk } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [uvExposure, setUvExposure] = useState(2)
  const [sunscreen, setSunscreen] = useState<'never' | 'sometimes' | 'always'>('sometimes')
  const [smokingYears, setSmokingYears] = useState(0)
  const [sugarGrams, setSugarGrams] = useState(50)
  const [sleepHours, setSleepHours] = useState(7)
  const [waterLiters, setWaterLiters] = useState(1.5)
  const [stressLevel, setStressLevel] = useState(5)
  const [age, setAge] = useState(38)
  const [skinCare, setSkinCare] = useState<'none' | 'basic' | 'advanced'>('basic')

  const result = useMemo(() => calculateSkinAgingRisk(uvExposure, sunscreen, smokingYears, sugarGrams, sleepHours, waterLiters, stressLevel, age, skinCare), [uvExposure, sunscreen, smokingYears, sugarGrams, sleepHours, waterLiters, stressLevel, age, skinCare])

  const skinDiff = result.biologicalSkinAge - age

  return (
    <CalculatorLayout title="Skin Aging Risk Calculator" description="Calculate your skin's biological age and the top accelerators of premature aging based on UV, lifestyle, and skincare routine." icon="✨" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="skin-aging-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Skin Factors</h2>
          <div className="space-y-3">
            <InputField label="Age" value={age} onChange={setAge} min={18} max={80} step={1} suffix="yrs" />
            <InputField label="Daily UV Exposure" value={uvExposure} onChange={setUvExposure} min={0} max={8} step={0.5} suffix="hrs/day" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Sunscreen Use</label>
              <div className="grid grid-cols-3 gap-1">
                {(['never', 'sometimes', 'always'] as const).map(s => (
                  <button key={s} onClick={() => setSunscreen(s)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${sunscreen === s ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>
                ))}
              </div>
            </div>
            <InputField label="Smoking history" value={smokingYears} onChange={setSmokingYears} min={0} max={50} step={1} suffix="yrs" />
            <InputField label="Daily sugar intake" value={sugarGrams} onChange={setSugarGrams} min={0} max={200} step={5} suffix="g/day" />
            <InputField label="Sleep" value={sleepHours} onChange={setSleepHours} min={3} max={12} step={0.5} suffix="hrs/night" />
            <InputField label="Water intake" value={waterLiters} onChange={setWaterLiters} min={0.5} max={5} step={0.25} suffix="L/day" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Stress Level (0–10)</label>
              <div className="flex gap-0.5">
                {[0,2,4,6,8,10].map(v => (
                  <button key={v} onClick={() => setStressLevel(v)} className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${stressLevel === v ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{v}</button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Skincare Routine</label>
              <div className="grid grid-cols-3 gap-1">
                {(['none', 'basic', 'advanced'] as const).map(s => (
                  <button key={s} onClick={() => setSkinCare(s)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${skinCare === s ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Skin Age" value={`${result.biologicalSkinAge} yrs`} highlight />
            <ResultCard label="Actual Age" value={`${age} yrs`} />
            <ResultCard label="Difference" value={`${skinDiff > 0 ? '+' : ''}${skinDiff} yrs`} subValue={skinDiff <= 0 ? 'looking younger!' : 'premature aging'} />
            <ResultCard label="Aging Score" value={`${result.skinAgingScore}/100`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Aging Risk Gauge</h3>
            <div className="relative h-6 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.skinAgingScore}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Minimal aging</span><span>Moderate</span><span>Accelerated</span></div>
            <p className="text-center font-black text-2xl mt-2" style={{ color: result.color }}>{result.category}</p>
          </Card>
          {result.topFactors.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Top Aging Accelerators</h3>
              <ul className="space-y-1">
                {result.topFactors.map(f => <li key={f} className="text-sm text-red-600 flex items-center gap-2"><span>⚠️</span>{f}</li>)}
              </ul>
            </Card>
          )}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Essential Anti-Aging Routine</h3>
            <ul className="space-y-1">
              {result.essentialRoutine.map(r => <li key={r} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>{r}</li>)}
            </ul>
          </Card>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
