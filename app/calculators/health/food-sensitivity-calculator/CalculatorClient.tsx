'use client'
import { useState, useMemo } from 'react'
import { calculateFoodSensitivityLoad } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [gluten, setGluten] = useState(4)
  const [dairy, setDairy] = useState(3)
  const [eggs, setEggs] = useState(1)
  const [soy, setSoy] = useState(2)
  const [nuts, setNuts] = useState(1)
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [eliminated, setEliminated] = useState<string[]>([])
  const [severity, setSeverity] = useState(3)
  const result = useMemo(() => calculateFoodSensitivityLoad(gluten, dairy, eggs, soy, nuts, symptoms, eliminated, severity), [gluten, dairy, eggs, soy, nuts, symptoms, eliminated, severity])
  const symptomList = ['Bloating', 'Brain fog', 'Fatigue', 'Headache', 'Skin rash', 'Joint pain', 'Diarrhoea', 'Constipation']
  const foods = ['Gluten', 'Dairy', 'Eggs', 'Soy', 'Nuts']
  const toggleArr = (arr: string[], setArr: (v: string[]) => void, val: string) => setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])
  const foodStates = [{ f: 'Gluten', v: gluten, s: setGluten }, { f: 'Dairy', v: dairy, s: setDairy }, { f: 'Eggs', v: eggs, s: setEggs }, { f: 'Soy', v: soy, s: setSoy }, { f: 'Nuts', v: nuts, s: setNuts }]
  return (
    <CalculatorLayout title="Food Sensitivity Load Calculator" description="Assess cumulative food sensitivity burden and get elimination diet guidance for gluten, dairy, eggs, soy and nuts." icon="🌾" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="food-sensitivity-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Sensitivity Assessment</h2>
          <div className="space-y-3">
            <p className="text-xs text-gray-500">Rate reaction severity per food (0 = no reaction, 5 = severe)</p>
            {foodStates.map(({ f, v, s }) => (
              <div key={f} className="space-y-1">
                <label className="text-xs font-medium text-gray-500">{f}: <span className="font-bold text-rose-600">{v}</span></label>
                <div className="flex gap-0.5">
                  {[0,1,2,3,4,5].map(n => <button key={n} onClick={() => s(n)} className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${v === n ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{n}</button>)}
                </div>
              </div>
            ))}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Reaction Severity (0–5)</label>
              <div className="flex gap-0.5">
                {[0,1,2,3,4,5].map(n => <button key={n} onClick={() => setSeverity(n)} className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${severity === n ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{n}</button>)}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500">Symptoms you experience</p>
              <div className="grid grid-cols-2 gap-1">
                {symptomList.map(s => <button key={s} onClick={() => toggleArr(symptoms, setSymptoms, s)} className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-left transition-all ${symptoms.includes(s) ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>)}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500">Currently eliminated foods</p>
              <div className="grid grid-cols-3 gap-1">
                {foods.map(f => <button key={f} onClick={() => toggleArr(eliminated, setEliminated, f)} className={`py-1.5 rounded-lg text-xs font-semibold transition-all ${eliminated.includes(f) ? 'bg-orange-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{f}</button>)}
              </div>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Burden Score" value={`${result.overallBurden}/100`} highlight />
            <ResultCard label="Category" value={result.category.split(' — ')[0]} />
            <ResultCard label="Top Sensitivity" value={result.topSensitivity} />
            <ResultCard label="Foods Eliminated" value={`${result.eliminatedFoods}`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Sensitivity Gauge</h3>
            <div className="relative h-6 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.overallBurden}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Low burden</span><span>Moderate</span><span>High burden</span></div>
            <p className="text-center font-black text-2xl mt-2" style={{ color: result.color }}>{result.category}</p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Guidance</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Testing Recommendation</span><span className="font-semibold">{result.testing}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Nutrition Risk</span><span className="font-semibold">{result.nutritionRisk}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Symptoms Reported</span><span className="font-semibold">{result.symptomCount}</span></div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Understanding this food sensitivity calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>The calculator uses Burden Score, Category, Top Sensitivity, Foods Eliminated. Its output is based on the formula implemented by this tool and the values you provide.</p>
            <p>When comparing scenarios, change one assumption at a time and compare Food Sensitivity Load Calculator, Burden Score, Category, Top Sensitivity, Foods Eliminated. This makes it easier to identify which input is responsible for the change instead of treating the result as a prediction.</p>
            <p>Check the units and time period before relying on the output. Real-world outcomes can differ when relevant taxes, fees, eligibility requirements, measurement error, market changes, or other factors are outside the calculator&apos;s inputs.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this explanation documents the calculator&apos;s use and limitations without changing its underlying calculation.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
