'use client'
import { useState, useMemo } from 'react'
import { calculateDietaryInflammatoryIndex } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [redMeat, setRedMeat] = useState(4)
  const [processedMeat, setProcessedMeat] = useState(2)
  const [sugarDrinks, setSugarDrinks] = useState(1)
  const [vegetables, setVegetables] = useState(3)
  const [fruit, setFruit] = useState(2)
  const [fish, setFish] = useState(1)
  const [wholegrains, setWholegrains] = useState(2)
  const [alcohol, setAlcohol] = useState(5)
  const [turmeric, setTurmeric] = useState(false)
  const [omega3, setOmega3] = useState(false)

  const result = useMemo(() => calculateDietaryInflammatoryIndex(redMeat, processedMeat, sugarDrinks, vegetables, fruit, fish, wholegrains, alcohol, turmeric, omega3), [redMeat, processedMeat, sugarDrinks, vegetables, fruit, fish, wholegrains, alcohol, turmeric, omega3])

  const gaugePosition = Math.min(100, Math.max(0, ((result.score + 4) / 8) * 100))

  return (
    <CalculatorLayout title="Dietary Inflammatory Index Calculator" description="Score your diet's inflammatory potential and find your top anti-inflammatory improvements." icon="🔬" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="dietary-inflammatory-index-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Weekly Food Servings</h2>
          <div className="space-y-3">
            <p className="text-xs text-gray-500">Pro-inflammatory foods ↑ score · Anti-inflammatory ↓ score</p>
            <div className="space-y-1">
              <p className="text-xs font-bold text-red-500 uppercase tracking-wide">Pro-inflammatory</p>
              <InputField label="Red meat servings/week" value={redMeat} onChange={setRedMeat} min={0} max={21} step={1} suffix="/wk" />
              <InputField label="Processed meat servings/week" value={processedMeat} onChange={setProcessedMeat} min={0} max={21} step={1} suffix="/wk" />
              <InputField label="Sugary drinks per day" value={sugarDrinks} onChange={setSugarDrinks} min={0} max={8} step={0.5} suffix="/day" />
              <InputField label="Alcohol drinks/week" value={alcohol} onChange={setAlcohol} min={0} max={50} step={1} suffix="/wk" />
            </div>
            <div className="space-y-1 pt-2">
              <p className="text-xs font-bold text-green-500 uppercase tracking-wide">Anti-inflammatory</p>
              <InputField label="Vegetable servings/day" value={vegetables} onChange={setVegetables} min={0} max={15} step={0.5} suffix="/day" />
              <InputField label="Fruit servings/day" value={fruit} onChange={setFruit} min={0} max={10} step={0.5} suffix="/day" />
              <InputField label="Fish/seafood servings/week" value={fish} onChange={setFish} min={0} max={14} step={0.5} suffix="/wk" />
              <InputField label="Whole grains servings/day" value={wholegrains} onChange={setWholegrains} min={0} max={10} step={0.5} suffix="/day" />
            </div>
            <div className="space-y-2 pt-1">
              {[{ label: '🌿 Daily turmeric use', val: turmeric, set: setTurmeric }, { label: '🐟 Omega-3 supplement', val: omega3, set: setOmega3 }].map(({ label, val, set }) => (
                <button key={label} onClick={() => set(!val)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm font-semibold border transition-all ${val ? 'bg-green-50 border-green-300 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs flex-shrink-0 ${val ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{val ? '✓' : ''}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="DII Score" value={result.score.toFixed(1)} highlight />
            <ResultCard label="Category" value={result.category} />
            <ResultCard label="CRP Estimate" value={result.crpEstimate} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Inflammatory Spectrum</h3>
            <div className="relative h-8 rounded-full overflow-hidden bg-gradient-to-r from-green-500 via-yellow-400 to-red-500">
              <div className="absolute top-1 h-6 w-2 bg-white rounded-full shadow-lg transition-all" style={{ left: `${gaugePosition}%`, transform: 'translateX(-50%)' }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Anti-inflammatory</span><span>Neutral</span><span>Pro-inflammatory</span></div>
            <p className="text-center mt-2 font-black text-2xl" style={{ color: result.color }}>{result.category}</p>
            <p className="text-center text-xs text-gray-500">DII score: {result.score.toFixed(1)} (scale: -4 to +4)</p>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Health Impact</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">CRP Estimate</span><span className="font-bold">{result.crpEstimate}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Disease Risk</span><span className="font-bold">{result.diseaseRisk}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Top Improvement</span><span className="font-bold text-green-600">{result.topImprovement}</span></div>
            </div>
          </Card>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            <p className="font-bold mb-1">💡 Your #1 Improvement: {result.topImprovement}</p>
            <p>A Mediterranean-style diet (vegetables, fish, olive oil, whole grains, nuts) consistently achieves DII scores of -1.5 to -3.0, associated with 30-40% lower cardiovascular events in clinical trials.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to review the dietary inflammatory index calculator result</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>Review the calculated output together with Red meat servings/week, Processed meat servings/week, Sugary drinks per day, Alcohol drinks/week, Vegetable servings/day, Fruit servings/day. The result reflects the values entered and the calculation implemented by this tool.</p>
            <p>When comparing alternatives, change one input at a time while keeping the other assumptions constant. This makes the effect of each input easier to understand.</p>
          </div>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
