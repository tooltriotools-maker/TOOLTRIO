'use client'
import { useState, useMemo } from 'react'
import { calculateDietQualityScore } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [vegetables, setVegetables] = useState(2)
  const [fruits, setFruits] = useState(1.5)
  const [wholegrains, setWholegrains] = useState(2)
  const [legumes, setLegumes] = useState(0.5)
  const [nuts, setNuts] = useState(0.5)
  const [fish, setFish] = useState(1)
  const [processedMeat, setProcessedMeat] = useState(2)
  const [redMeat, setRedMeat] = useState(3)
  const [addedSugar, setAddedSugar] = useState(2)
  const [ultraProcessed, setUltraProcessed] = useState(3)
  const [alcohol, setAlcohol] = useState(4)
  const [dairy, setDairy] = useState(1.5)
  const result = useMemo(() => calculateDietQualityScore(vegetables, fruits, wholegrains, legumes, nuts, fish, processedMeat, redMeat, addedSugar, ultraProcessed, alcohol, dairy), [vegetables, fruits, wholegrains, legumes, nuts, fish, processedMeat, redMeat, addedSugar, ultraProcessed, alcohol, dairy])
  return (
    <CalculatorLayout title="Diet Quality Score Calculator" description="Rate your overall diet quality and see how it compares to the Healthy Eating Index." icon="🥗" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="diet-quality-score-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Daily Servings</h2>
          <div className="space-y-3">
            <p className="text-xs font-bold text-green-500 uppercase tracking-wide">✅ Healthy Foods</p>
            {[{l:'Vegetables (servings/day)',v:vegetables,s:setVegetables},{l:'Fruits (servings/day)',v:fruits,s:setFruits},{l:'Whole grains (servings/day)',v:wholegrains,s:setWholegrains},{l:'Legumes (servings/day)',v:legumes,s:setLegumes},{l:'Nuts/seeds (servings/day)',v:nuts,s:setNuts},{l:'Fish (servings/week)',v:fish,s:setFish},{l:'Dairy (servings/day)',v:dairy,s:setDairy}].map(({l,v,s}) => (
              <InputField key={l} label={l} value={v} onChange={s} min={0} max={15} step={0.5} suffix="" />
            ))}
            <p className="text-xs font-bold text-red-500 uppercase tracking-wide pt-1">⚠️ Foods to Limit</p>
            {[{l:'Processed meat (servings/week)',v:processedMeat,s:setProcessedMeat},{l:'Red meat (servings/week)',v:redMeat,s:setRedMeat},{l:'Added sugar (teaspoons/day)',v:addedSugar,s:setAddedSugar},{l:'Ultra-processed foods (servings/day)',v:ultraProcessed,s:setUltraProcessed},{l:'Alcohol (drinks/week)',v:alcohol,s:setAlcohol}].map(({l,v,s}) => (
              <InputField key={l} label={l} value={v} onChange={s} min={0} max={20} step={0.5} suffix="" />
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="Diet Score" value={`${result.dietScore}/100`} highlight />
            <ResultCard label="Category" value={result.category.split(' — ')[0]} />
            <ResultCard label="Top Improvement" value={result.topImprovement} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Diet Quality Gauge</h3>
            <div className="relative h-6 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.dietScore}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Very Poor</span><span>Fair</span><span>Excellent</span></div>
            <p className="text-center font-black text-3xl mt-2" style={{ color: result.color }}>{result.dietScore}/100</p>
            <p className="text-center text-sm font-semibold mt-0.5" style={{ color: result.color }}>{result.category}</p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Health Impact</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Mediterranean Similarity</span><span className="font-bold">{result.mediterraneanSimilarity}%</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Cancer Risk Estimate</span><span className="font-bold">{result.cancerRiskReduction}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Top Improvement</span><span className="font-bold text-green-600">{result.topImprovement}</span></div>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
