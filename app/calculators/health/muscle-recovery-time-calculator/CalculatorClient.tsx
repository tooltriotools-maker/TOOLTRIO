'use client'
import { useState, useMemo } from 'react'
import { calculateMuscleRecoveryTime } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [muscleGroup, setMuscleGroup] = useState('legs')
  const [sets, setSets] = useState(16)
  const [repRange, setRepRange] = useState<'1-5' | '6-12' | '12+'>('6-12')
  const [trainingAge, setTrainingAge] = useState<'beginner' | 'intermediate' | 'advanced'>('intermediate')
  const [ageYears, setAgeYears] = useState(30)
  const [sleepHours, setSleepHours] = useState(7)
  const [proteinGrams, setProteinGrams] = useState(140)
  const [bodyweightKg, setBodyweightKg] = useState(80)

  const result = useMemo(() => calculateMuscleRecoveryTime(muscleGroup, sets, repRange, trainingAge, ageYears, sleepHours, proteinGrams, bodyweightKg), [muscleGroup, sets, repRange, trainingAge, ageYears, sleepHours, proteinGrams, bodyweightKg])

  const muscleGroups = ['chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'glutes', 'calves']

  const recoveryColor = result.recoveryHours <= 48 ? '#22c55e' : result.recoveryHours <= 72 ? '#eab308' : '#ef4444'

  return (
    <CalculatorLayout title="Muscle Recovery Time Calculator" description="Calculate personalised muscle recovery time based on muscle group, training intensity, age, sleep, and protein intake." icon="💪" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="muscle-recovery-time-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Workout Details</h2>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Muscle Group</label>
              <div className="grid grid-cols-4 gap-1">
                {muscleGroups.map(m => (
                  <button key={m} onClick={() => setMuscleGroup(m)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${muscleGroup === m ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{m}</button>
                ))}
              </div>
            </div>
            <InputField label="Sets completed" value={sets} onChange={setSets} min={1} max={40} step={1} suffix="sets" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Rep Range (intensity)</label>
              <div className="grid grid-cols-3 gap-1">
                {(['1-5', '6-12', '12+'] as const).map(r => (
                  <button key={r} onClick={() => setRepRange(r)} className={`py-2 rounded-xl text-xs font-bold transition-all ${repRange === r ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{r === '1-5' ? 'Strength\n1–5' : r === '6-12' ? 'Hypertrophy\n6–12' : 'Endurance\n12+'}</button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Training Experience</label>
              <div className="grid grid-cols-3 gap-1">
                {(['beginner', 'intermediate', 'advanced'] as const).map(t => (
                  <button key={t} onClick={() => setTrainingAge(t)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${trainingAge === t ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{t}</button>
                ))}
              </div>
            </div>
            <InputField label="Your age" value={ageYears} onChange={setAgeYears} min={15} max={80} step={1} suffix="yrs" />
            <InputField label="Sleep last night" value={sleepHours} onChange={setSleepHours} min={3} max={12} step={0.5} suffix="hrs" />
            <InputField label="Protein today" value={proteinGrams} onChange={setProteinGrams} min={30} max={300} step={5} suffix="g" />
            <InputField label="Body weight" value={bodyweightKg} onChange={setBodyweightKg} min={40} max={180} step={1} suffix="kg" />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Recovery Time" value={`${result.recoveryHours} hrs`} highlight />
            <ResultCard label="Recovery Days" value={`${result.recoveryDays} days`} />
            <ResultCard label="Protein Status" value={result.factors.protein} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Recovery Timeline</h3>
            <div className="relative pt-4 pb-2">
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, (result.recoveryHours / 96) * 100)}%`, background: recoveryColor }} />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>0h</span><span>24h</span><span>48h</span><span>72h</span><span>96h+</span></div>
            </div>
            <div className="mt-3 p-3 rounded-xl border border-gray-100 bg-gray-50 text-sm">
              <p className="text-gray-500 text-xs">Estimated ready to train again</p>
              <p className="font-bold text-gray-800 mt-0.5">{result.readyDateTime}</p>
            </div>
            <div className="mt-3 space-y-2 text-sm">
              {Object.entries(result.factors).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-gray-500 capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-semibold">{String(v)}</span>
                </div>
              ))}
            </div>
          </Card>
          {result.tipsToSpeedRecovery.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Speed Up Recovery</h3>
              <ul className="space-y-1">
                {result.tipsToSpeedRecovery.map(t => <li key={t} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>{t}</li>)}
              </ul>
            </Card>
          )}
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
