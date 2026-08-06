'use client'
import { useState, useMemo } from 'react'
import { calculateProteinSynthesisOptimizer } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [bodyWeight, setBodyWeight] = useState(80)
  const [leanMass, setLeanMass] = useState(65)
  const [trainingFreq, setTrainingFreq] = useState(4)
  const [trainingIntensity, setTrainingIntensity] = useState(7)
  const [age, setAge] = useState(32)
  const [proteinGrams, setProteinGrams] = useState(140)
  const [mealsPerDay, setMealsPerDay] = useState(3)
  const [postWorkoutProtein, setPostWorkoutProtein] = useState(30)
  const [sleepHours, setSleepHours] = useState(7)
  const result = useMemo(() => calculateProteinSynthesisOptimizer(bodyWeight, leanMass, trainingFreq, trainingIntensity, age, proteinGrams, mealsPerDay, postWorkoutProtein, sleepHours), [bodyWeight, leanMass, trainingFreq, trainingIntensity, age, proteinGrams, mealsPerDay, postWorkoutProtein, sleepHours])
  const synthColor = result.synthScore >= 80 ? '#22c55e' : result.synthScore >= 60 ? '#84cc16' : result.synthScore >= 40 ? '#eab308' : '#ef4444'
  return (
    <CalculatorLayout title="Protein Synthesis Optimizer" description="Calculate optimal protein intake, per-meal MPS targets, leucine threshold, and post-workout timing for maximum muscle building." icon="💪" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="protein-synthesis-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Training Profile</h2>
          <div className="space-y-3">
            <InputField label="Body Weight" value={bodyWeight} onChange={setBodyWeight} min={40} max={180} step={1} suffix="kg" />
            <InputField label="Lean Body Mass (est.)" value={leanMass} onChange={setLeanMass} min={30} max={130} step={1} suffix="kg" />
            <InputField label="Training frequency" value={trainingFreq} onChange={setTrainingFreq} min={1} max={7} step={1} suffix="days/wk" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Training Intensity (1–10): <span className="font-bold text-rose-600">{trainingIntensity}</span></label>
              <input type="range" min={1} max={10} step={1} value={trainingIntensity} onChange={e => setTrainingIntensity(Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={15} max={90} step={1} suffix="yrs" />
            <InputField label="Daily protein intake" value={proteinGrams} onChange={setProteinGrams} min={30} max={400} step={5} suffix="g/day" />
            <InputField label="Meals per day" value={mealsPerDay} onChange={setMealsPerDay} min={1} max={8} step={1} suffix="meals" />
            <InputField label="Post-workout protein" value={postWorkoutProtein} onChange={setPostWorkoutProtein} min={0} max={80} step={5} suffix="g" />
            <InputField label="Sleep" value={sleepHours} onChange={setSleepHours} min={3} max={12} step={0.5} suffix="hrs/night" />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Synthesis Score" value={`${result.synthScore}/100`} highlight />
            <ResultCard label="Daily Target" value={`${result.dailyProteinTarget}g`} subValue="recommended" />
            <ResultCard label="Per-Meal Target" value={`${result.mpsStimulatingThreshold}g`} subValue="to maximize MPS" />
            <ResultCard label="MPS Efficiency" value={`${result.mpsEfficiency}%`} subValue="per meal" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Protein Synthesis Score</h3>
            <div className="relative h-6 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.synthScore}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Poor</span><span>Moderate</span><span>Optimised</span></div>
            <p className="text-center font-black text-3xl mt-2" style={{ color: synthColor }}>{result.synthScore}/100</p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Current intake</span><span className="font-bold">{proteinGrams}g</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Target intake</span><span className="font-bold">{result.dailyProteinTarget}g</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Per-meal protein</span><span className="font-bold">{result.perMealProtein}g</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Leucine per meal</span><span className={`font-bold ${result.leucineAdequate ? 'text-green-600' : 'text-red-500'}`}>{result.estimatedLeucinePerMeal}g {result.leucineAdequate ? '✓' : '⚠️'}</span></div>
              <div className="flex justify-between col-span-2"><span className="text-gray-500">Intake vs target</span><span className={`font-bold ${result.deficitOrSurplus >= 0 ? 'text-green-600' : 'text-red-500'}`}>{result.deficitOrSurplus >= 0 ? '+' : ''}{result.deficitOrSurplus}g</span></div>
            </div>
          </Card>
          {result.recommendations.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Optimisation Tips</h3>
              <ul className="space-y-1">{result.recommendations.map(r => <li key={r} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-green-500 flex-shrink-0 mt-0.5">→</span>{r}</li>)}</ul>
            </Card>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Understanding this protein synthesis calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This calculator uses Body Weight, Lean Body Mass (est.), Training frequency, Age, Daily protein intake, Meals per day, Post-workout protein. The displayed result is generated from the tool&apos;s implemented formula and the values entered.</p>
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
