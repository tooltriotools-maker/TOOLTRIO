'use client'
import { useState, useMemo } from 'react'
import { calculateExerciseAddictionRisk } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [workoutsPerWeek, setWorkoutsPerWeek] = useState(5)
  const [restDayGuilt, setRestDayGuilt] = useState(3)
  const [missedAnxiety, setMissedAnxiety] = useState(3)
  const [exerciseOverInjury, setExerciseOverInjury] = useState(false)
  const [socialSacrifice, setSocialSacrifice] = useState(2)
  const [identityTied, setIdentityTied] = useState(4)
  const [exerciseForControl, setExerciseForControl] = useState(3)
  const [unableToReduce, setUnableToReduce] = useState(false)
  const result = useMemo(() => calculateExerciseAddictionRisk(workoutsPerWeek, restDayGuilt, missedAnxiety, exerciseOverInjury, socialSacrifice, identityTied, exerciseForControl, unableToReduce), [workoutsPerWeek, restDayGuilt, missedAnxiety, exerciseOverInjury, socialSacrifice, identityTied, exerciseForControl, unableToReduce])
  const sliders = [
    { label: 'Rest day guilt (0=none, 5=severe)', value: restDayGuilt, set: setRestDayGuilt },
    { label: 'Anxiety when missing sessions (0–5)', value: missedAnxiety, set: setMissedAnxiety },
    { label: 'Social life sacrificed for exercise (0–5)', value: socialSacrifice, set: setSocialSacrifice },
    { label: 'Identity tied to exercise/body (0–5)', value: identityTied, set: setIdentityTied },
    { label: 'Exercise used for emotional control (0–5)', value: exerciseForControl, set: setExerciseForControl },
  ]
  return (
    <CalculatorLayout title="Exercise Addiction Risk Calculator" description="Assess compulsive exercise patterns using validated EAI criteria — guilt, anxiety, social sacrifice, and control." icon="🏋️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="exercise-addiction-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Exercise Patterns</h2>
          <div className="space-y-3">
            <InputField label="Workouts per week" value={workoutsPerWeek} onChange={setWorkoutsPerWeek} min={0} max={14} step={1} suffix="/wk" />
            {sliders.map(s => (
              <div key={s.label} className="space-y-1">
                <label className="text-xs font-medium text-gray-500">{s.label}: <span className="font-bold text-rose-600">{s.value}</span></label>
                <div className="flex gap-0.5">
                  {[0,1,2,3,4,5].map(v => <button key={v} onClick={() => s.set(v)} className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${s.value === v ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{v}</button>)}
                </div>
              </div>
            ))}
            {[{ label: '🤕 Continue exercising despite injury', val: exerciseOverInjury, set: setExerciseOverInjury }, { label: '🔒 Unable to reduce exercise when needed', val: unableToReduce, set: setUnableToReduce }].map(c => (
              <button key={c.label} onClick={() => c.set(!c.val)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${c.val ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${c.val ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{c.val ? '✓' : ''}</span>{c.label}
              </button>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Risk Score" value={`${result.riskPct}%`} highlight />
            <ResultCard label="Category" value={result.category.split(' — ')[0]} />
            <ResultCard label="Pattern" value={result.distinguisher} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Risk Gauge</h3>
            <div className="relative h-6 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.riskPct}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Healthy</span><span>Concerning</span><span>Addiction</span></div>
            <p className="text-center font-black text-3xl mt-2" style={{ color: result.color }}>{result.riskPct}%</p>
            <p className="text-center text-sm font-semibold mt-0.5" style={{ color: result.color }}>{result.category}</p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Recommendations</h3>
            <ul className="space-y-1">{result.recommendations.map(r => <li key={r} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-blue-500 flex-shrink-0 mt-0.5">→</span>{r}</li>)}</ul>
          </Card>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-bold mb-1">💡 Key Distinction</p>
            <p>Healthy athletic commitment is defined by choice and flexibility — you can take a rest day without significant distress. Exercise addiction is defined by compulsion and harm. Volume alone does not determine addiction.</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
