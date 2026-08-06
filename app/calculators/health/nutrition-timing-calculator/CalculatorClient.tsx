'use client'
import { useState, useMemo } from 'react'
import { calculateTimingNutritionWindow } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
const auditFaqs = [
  {"question": "What should I check before using the Nutrition Timing Calculator?", "answer": "Check Fasting window, Eating Window, Pre-Workout Meal, Post-Workout, Last Meal and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Nutrition Timing Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculator output for informational use and is not a diagnosis or a substitute for evaluation by a qualified healthcare professional."},
  {"question": "How can I compare different Nutrition Timing Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. Comparing results this way makes it easier to see which input is responsible for the difference."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [wakeUpTime, setWakeUpTime] = useState(7)
  const [exerciseTime, setExerciseTime] = useState(17)
  const [bedTime, setBedTime] = useState(23)
  const [mainGoal, setMainGoal] = useState<'fat-loss' | 'muscle-gain' | 'performance' | 'longevity'>('fat-loss')
  const [intermittentFasting, setIntermittentFasting] = useState(false)
  const [fastingWindow, setFastingWindow] = useState(16)
  const result = useMemo(() => calculateTimingNutritionWindow(wakeUpTime, exerciseTime, bedTime, mainGoal, intermittentFasting, fastingWindow), [wakeUpTime, exerciseTime, bedTime, mainGoal, intermittentFasting, fastingWindow])
  const goals = [
    { id: 'fat-loss' as const, label: '📉 Fat Loss' },
    { id: 'muscle-gain' as const, label: '💪 Muscle Gain' },
    { id: 'performance' as const, label: '⚡ Performance' },
    { id: 'longevity' as const, label: '♾️ Longevity' },
  ]
  const timeSlots = Array.from({ length: 24 }, (_, i) => i)
  const fmt = (h: number) => { const hh = h % 24; return `${hh % 12 || 12}:00 ${hh >= 12 ? 'PM' : 'AM'}` }
  return (
    <CalculatorLayout title="Nutrition Timing Calculator" description="Optimise your meal timing for fat loss, muscle gain, performance, or longevity with circadian eating windows." icon="⏱️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="nutrition-timing-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Your Schedule</h2>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Goal</label>
              <div className="grid grid-cols-2 gap-1">
                {goals.map(g => <button key={g.id} onClick={() => setMainGoal(g.id)} className={`py-2 rounded-xl text-xs font-semibold transition-all ${mainGoal === g.id ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{g.label}</button>)}
              </div>
            </div>
            {[{l:'Wake up time',v:wakeUpTime,s:setWakeUpTime},{l:'Exercise time',v:exerciseTime,s:setExerciseTime},{l:'Bedtime',v:bedTime,s:setBedTime}].map(({l,v,s}) => (
              <div key={l} className="space-y-1">
                <label className="text-xs font-medium text-gray-500">{l}: <span className="font-bold text-rose-600">{fmt(v)}</span></label>
                <input type="range" min={0} max={23} step={1} value={v} onChange={e => s(Number(e.target.value))} className="w-full accent-rose-500" />
              </div>
            ))}
            <button onClick={() => setIntermittentFasting(!intermittentFasting)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${intermittentFasting ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${intermittentFasting ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{intermittentFasting ? '✓' : ''}</span>
              Intermittent fasting
            </button>
            {intermittentFasting && <InputField label="Fasting window" value={fastingWindow} onChange={setFastingWindow} min={12} max={20} step={1} suffix="hrs" />}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Eating Window" value={result.eatingWindow} highlight />
            <ResultCard label="Pre-Workout Meal" value={result.preWorkoutMeal} subValue="eat by" />
            <ResultCard label="Post-Workout" value={result.postWorkoutMeal} subValue="eat within" />
            <ResultCard label="Last Meal" value={result.lastMeal} subValue="cutoff" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Goal-Specific Strategy</h3>
            <div className="space-y-3">
              <div className="p-3 bg-rose-50 rounded-xl text-sm">
                <p className="font-bold text-rose-700 mb-1">🎯 {mainGoal.replace('-', ' ').replace(/\w/g, l => l.toUpperCase())} Strategy</p>
                <p className="text-rose-600 text-xs">{result.goalSpecificTip}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl text-sm">
                <p className="font-bold text-blue-700 mb-1">🌙 Circadian Alignment</p>
                <p className="text-blue-600 text-xs">{result.circadianNote}</p>
              </div>
              {intermittentFasting && (
                <div className="p-3 bg-green-50 rounded-xl text-sm">
                  <p className="font-bold text-green-700 mb-1">⏱️ Fasting Benefits</p>
                  <p className="text-green-600 text-xs">{result.fastingBenefits}</p>
                </div>
              )}
              <div className="p-3 bg-gray-50 rounded-xl text-sm">
                <p className="font-bold text-gray-700 mb-1">😴 Melatonin Window</p>
                <p className="text-gray-600 text-xs">{result.melatoninWindow}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to interpret this nutrition timing calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This tool uses Fasting window, Eating Window, Pre-Workout Meal, Post-Workout, Last Meal to calculate the displayed result. The output reflects the formula implemented on this page and the values you enter.</p>
            <p>For scenario comparisons, change one input at a time. This helps separate the effect of that assumption from other inputs and avoids treating a model result as a guaranteed real-world outcome.</p>
            <p>Review the units, measurement method, time period, and any eligibility or real-world factors that are not represented by the inputs before using the result for a decision.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this section documents how to use the calculator and does not alter its underlying formula.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={auditFaqs} /></div>
    </CalculatorLayout>
  )
}
