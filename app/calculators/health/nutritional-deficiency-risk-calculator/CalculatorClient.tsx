'use client'
import { useState, useMemo } from 'react'
import { calculateNutritionalDeficiencyRisk } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [fruitVeg, setFruitVeg] = useState(3)
  const [redMeat, setRedMeat] = useState(2)
  const [dairy, setDairy] = useState(1)
  const [sunExposure, setSunExposure] = useState(0.5)
  const [seafood, setSeafood] = useState(1)
  const [wholegrains, setWholegrains] = useState(2)
  const [legumes, setLegumes] = useState(1)
  const [supplementUse, setSupplementUse] = useState(false)
  const [diet, setDiet] = useState<'vegan' | 'vegetarian' | 'pescatarian' | 'none'>('none')
  const [age, setAge] = useState(35)
  const [gender, setGender] = useState<'male' | 'female'>('female')

  const result = useMemo(() => calculateNutritionalDeficiencyRisk(fruitVeg, redMeat, dairy, sunExposure, seafood, wholegrains, legumes, supplementUse, diet, age, gender), [fruitVeg, redMeat, dairy, sunExposure, seafood, wholegrains, legumes, supplementUse, diet, age, gender])

  const dietOptions: { value: 'none' | 'pescatarian' | 'vegetarian' | 'vegan'; label: string }[] = [
    { value: 'none', label: 'Omnivore' },
    { value: 'pescatarian', label: 'Pescatarian' },
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
  ]

  return (
    <CalculatorLayout title="Nutritional Deficiency Risk Calculator" description="Identify your risk for vitamin B12, D, iron, calcium, omega-3, and other deficiencies based on your diet pattern." icon="🥗" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="nutritional-deficiency-risk-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Diet Pattern</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={10} max={90} step={1} suffix="yrs" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Dietary Pattern</label>
              <div className="grid grid-cols-2 gap-1">
                {dietOptions.map(o => (
                  <button key={o.value} onClick={() => setDiet(o.value)} className={`py-2 rounded-xl text-xs font-semibold transition-all ${diet === o.value ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{o.label}</button>
                ))}
              </div>
            </div>
            <InputField label="Fruit & Veg (servings/day)" value={fruitVeg} onChange={setFruitVeg} min={0} max={15} step={0.5} suffix="/day" />
            <InputField label="Red meat (servings/week)" value={redMeat} onChange={setRedMeat} min={0} max={21} step={0.5} suffix="/wk" />
            <InputField label="Dairy (servings/day)" value={dairy} onChange={setDairy} min={0} max={6} step={0.5} suffix="/day" />
            <InputField label="Seafood (servings/week)" value={seafood} onChange={setSeafood} min={0} max={14} step={0.5} suffix="/wk" />
            <InputField label="Sun exposure" value={sunExposure} onChange={setSunExposure} min={0} max={4} step={0.25} suffix="hrs/day" />
            <InputField label="Whole grains (servings/day)" value={wholegrains} onChange={setWholegrains} min={0} max={10} step={0.5} suffix="/day" />
            <button onClick={() => setSupplementUse(!supplementUse)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${supplementUse ? 'bg-green-50 border-green-300 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${supplementUse ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{supplementUse ? '✓' : ''}</span>
              Taking daily multivitamin / supplements
            </button>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Overall Risk" value={result.overallRisk} highlight />
            <ResultCard label="Deficiencies Found" value={`${result.deficiencies.length}`} subValue="potential risks" />
            <ResultCard label="Bloodwork Advised" value={result.recommendBloodwork ? 'Yes' : 'Not urgent'} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Potential Deficiencies</h3>
            {result.deficiencies.length === 0 ? (
              <p className="text-sm text-green-600 font-semibold">✅ No significant deficiency risks detected for your diet pattern.</p>
            ) : (
              <div className="space-y-2">
                {result.deficiencies.map(d => (
                  <div key={d.nutrient} className="flex items-start gap-3 p-3 rounded-xl border" style={{ background: d.color + '10', borderColor: d.color + '40' }}>
                    <div className="w-3 h-3 rounded-full flex-shrink-0 mt-0.5" style={{ background: d.color }} />
                    <div>
                      <p className="text-sm font-bold" style={{ color: d.color }}>{d.nutrient}</p>
                      <p className="text-xs text-gray-600">{d.risk}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
          {result.keyRecommendations.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Key Recommendations</h3>
              <ul className="space-y-1">
                {result.keyRecommendations.map(r => <li key={r} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-blue-500 flex-shrink-0 mt-0.5">→</span>{r}</li>)}
              </ul>
            </Card>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Understanding this nutritional deficiency risk calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This calculator uses Age, Fruit & Veg (servings/day), Red meat (servings/week), Dairy (servings/day), Seafood (servings/week), Sun exposure, Whole grains (servings/day). The displayed result is generated from the tool&apos;s implemented formula and the values entered.</p>
            <p>Change one input at a time when comparing scenarios. That makes the result easier to interpret and helps distinguish a modeled relationship from a real-world prediction.</p>
            <p>Check the units, measurement method, time horizon, and any relevant factors that are outside the calculator&apos;s inputs before relying on the output.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this section explains use and limitations without changing the calculator&apos;s underlying formula.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
