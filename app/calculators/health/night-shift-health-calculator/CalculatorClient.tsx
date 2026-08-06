'use client'
import { useState, useMemo } from 'react'
import { calculateNightShiftHealthImpact } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
const auditFaqs = [
  {"question": "What should I check before using the Night Shift Health Calculator?", "answer": "Check Years on night shift, Night shifts per week, Sleep after shift, Caffeine intake, Exercise (days/week), Health Risk and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Night Shift Health Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculator output for informational use and is not a diagnosis or a substitute for evaluation by a qualified healthcare professional."},
  {"question": "How can I compare different Night Shift Health Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. Comparing results this way makes it easier to see which input is responsible for the difference."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [yearsOnNight, setYearsOnNight] = useState(5)
  const [shiftsPerWeek, setShiftsPerWeek] = useState(3)
  const [sleepAfterShift, setSleepAfterShift] = useState(6.5)
  const [caffeineMg, setCaffeineMg] = useState(300)
  const [exerciseFreq, setExerciseFreq] = useState(3)
  const [mealTiming, setMealTiming] = useState<'regular' | 'irregular'>('irregular')
  const [lightExposure, setLightExposure] = useState<'managed' | 'unmanaged'>('unmanaged')
  const result = useMemo(() => calculateNightShiftHealthImpact(yearsOnNight, shiftsPerWeek, sleepAfterShift, caffeineMg, exerciseFreq, mealTiming, lightExposure), [yearsOnNight, shiftsPerWeek, sleepAfterShift, caffeineMg, exerciseFreq, mealTiming, lightExposure])
  return (
    <CalculatorLayout title="Night Shift Health Impact Calculator" description="Assess circadian disruption and health risks from shift work — T2D, CVD, and cancer risk with mitigation strategies." icon="🌙" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="night-shift-health-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Shift Work Details</h2>
          <div className="space-y-3">
            <InputField label="Years on night shift" value={yearsOnNight} onChange={setYearsOnNight} min={0} max={40} step={1} suffix="yrs" />
            <InputField label="Night shifts per week" value={shiftsPerWeek} onChange={setShiftsPerWeek} min={1} max={7} step={1} suffix="/wk" />
            <InputField label="Sleep after shift" value={sleepAfterShift} onChange={setSleepAfterShift} min={3} max={10} step={0.5} suffix="hrs" />
            <InputField label="Caffeine intake" value={caffeineMg} onChange={setCaffeineMg} min={0} max={1000} step={50} suffix="mg/day" />
            <InputField label="Exercise (days/week)" value={exerciseFreq} onChange={setExerciseFreq} min={0} max={7} step={1} suffix="days/wk" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Meal timing</label>
              <div className="grid grid-cols-2 gap-1">
                {(['regular','irregular'] as const).map(m => <button key={m} onClick={() => setMealTiming(m)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${mealTiming === m ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{m}</button>)}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Light management</label>
              <div className="grid grid-cols-2 gap-1">
                {(['managed','unmanaged'] as const).map(m => <button key={m} onClick={() => setLightExposure(m)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${lightExposure === m ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{m}</button>)}
              </div>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Health Risk" value={`${result.healthRisk}/100`} highlight />
            <ResultCard label="Circadian Disruption" value={result.circadianDisruption} />
            <ResultCard label="T2D Risk" value={result.t2dRisk} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Health Risk Gauge</h3>
            <div className="relative h-6 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.healthRisk}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Low risk</span><span>Moderate</span><span>High risk</span></div>
            <p className="text-center font-black text-2xl mt-2" style={{ color: result.color }}>{result.healthRisk}/100</p>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Cardiovascular Risk</span><span className="font-bold">{result.cvRisk}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Cancer Classification</span><span className="font-bold text-right ml-4">{result.cancerRisk}</span></div>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Mitigation Strategies</h3>
            <ul className="space-y-1">{result.mitigationStrategies.map(s => <li key={s} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>{s}</li>)}</ul>
          </Card>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to interpret this night shift health calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This tool uses Years on night shift, Night shifts per week, Sleep after shift, Caffeine intake, Exercise (days/week), Health Risk, Circadian Disruption to calculate the displayed result. The output reflects the formula implemented on this page and the values you enter.</p>
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
