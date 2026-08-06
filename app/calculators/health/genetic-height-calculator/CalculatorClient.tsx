'use client'
import { useState, useMemo } from 'react'
import { calculateGeneticHeightPotential } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [fatherHeight, setFatherHeight] = useState(178)
  const [motherHeight, setMotherHeight] = useState(165)
  const [currentHeight, setCurrentHeight] = useState(172)
  const [currentAge, setCurrentAge] = useState(14)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [nutrition, setNutrition] = useState(true)
  const [chronicIllness, setChronicIllness] = useState(false)
  const result = useMemo(() => calculateGeneticHeightPotential(fatherHeight, motherHeight, currentHeight, currentAge, gender, nutrition, chronicIllness), [fatherHeight, motherHeight, currentHeight, currentAge, gender, nutrition, chronicIllness])
  return (
    <CalculatorLayout title="Genetic Height Potential Calculator" description="Predict adult height from parents' heights using the Tanner mid-parental height formula." icon="📏" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="genetic-height-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Parent & Child Details</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male','female'] as const).map(g => <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>{g === 'male' ? '♂ Male' : '♀ Female'}</button>)}
            </div>
            <InputField label="Father's Height (cm)" value={fatherHeight} onChange={setFatherHeight} min={140} max={220} step={1} suffix="cm" />
            <InputField label="Mother's Height (cm)" value={motherHeight} onChange={setMotherHeight} min={130} max={200} step={1} suffix="cm" />
            <InputField label="Current Height (cm)" value={currentHeight} onChange={setCurrentHeight} min={80} max={220} step={1} suffix="cm" />
            <InputField label="Current Age" value={currentAge} onChange={setCurrentAge} min={2} max={25} step={1} suffix="yrs" />
            <div className="space-y-2">
              {[{ label: '🥗 Adequate nutrition throughout childhood', val: nutrition, set: setNutrition }, { label: '🏥 Chronic illness affecting growth', val: chronicIllness, set: setChronicIllness }].map(c => (
                <button key={c.label} onClick={() => c.set(!c.val)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${c.val ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${c.val ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{c.val ? '✓' : ''}</span>{c.label}
                </button>
              ))}
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Target Height" value={`${result.targetHeight} cm`} highlight />
            <ResultCard label="Height Range" value={`${result.rangeMin}–${result.rangeMax} cm`} />
            <ResultCard label="Remaining Growth" value={result.growthComplete ? 'Complete' : `~${result.remainingGrowthCm} cm`} />
            <ResultCard label="Height Percentile" value={`~${result.heightPercentileEst}th`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Height Prediction</h3>
            <div className="relative py-6">
              <div className="flex items-end justify-center gap-8">
                <div className="text-center">
                  <div className="text-4xl font-black text-gray-300">{currentHeight}</div>
                  <div className="text-xs text-gray-400 mt-1">Current</div>
                </div>
                <div className="text-2xl text-gray-300">→</div>
                <div className="text-center">
                  <div className="text-5xl font-black text-rose-500">{result.targetHeight}</div>
                  <div className="text-xs text-gray-400 mt-1">Predicted Adult</div>
                </div>
              </div>
              <p className="text-center text-sm text-gray-500 mt-3">Range: {result.rangeMin} – {result.rangeMax} cm (±8.5 cm)</p>
            </div>
          </Card>
          {result.modifiers.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Growth Modifiers</h3>
              <ul className="space-y-1">{result.modifiers.map(m => <li key={m} className="text-sm text-orange-700 flex items-center gap-2"><span>⚠️</span>{m}</li>)}</ul>
            </Card>
          )}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-bold mb-1">📋 {result.growthComplete ? 'Growth Complete' : `Growth Status: Age ${currentAge}`}</p>
            <p className="text-xs">{result.note}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to review the genetic height calculator result</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>Review the calculated output together with Father, Mother, Current Height (cm), Current Age, Target Height, Height Range. The result reflects the values entered and the calculation implemented by this tool.</p>
            <p>When comparing alternatives, change one input at a time while keeping the other assumptions constant. This makes the effect of each input easier to understand.</p>
          </div>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
