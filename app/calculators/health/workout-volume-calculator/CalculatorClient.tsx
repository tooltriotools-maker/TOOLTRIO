'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { calculateWorkoutVolumeLoad } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [sets, setSets] = useState(4)
  const [reps, setReps] = useState(10)
  const [weightKg, setWeightKg] = useState(60)
  const [exercises, setExercises] = useState(5)
  const [frequency, setFrequency] = useState(3)
  const [goal, setGoal] = useState<'strength' | 'hypertrophy' | 'endurance'>('hypertrophy')
  const [unit, setUnit] = useState<'kg' | 'lbs'>('lbs')

  const weightKgActual = unit === 'lbs' ? weightKg / 2.205 : weightKg
  const result = useMemo(() => calculateWorkoutVolumeLoad(sets, reps, weightKgActual, exercises, frequency, goal), [sets, reps, weightKgActual, exercises, frequency, goal])

  const chartData = [
    { name: 'Your Sets', value: result.totalWeeklySets },
    { name: 'MEV', value: result.mev },
    { name: 'MRV', value: result.mrv },
  ]

  const goalOptions: { value: 'strength' | 'hypertrophy' | 'endurance'; label: string; icon: string }[] = [
    { value: 'strength', label: 'Strength', icon: '🏋️' },
    { value: 'hypertrophy', label: 'Hypertrophy', icon: '💪' },
    { value: 'endurance', label: 'Endurance', icon: '🏃' },
  ]

  return (
    <CalculatorLayout title="Workout Volume Load Calculator" description="Calculate total training volume, weekly tonnage, and compare your sets vs MEV/MRV thresholds for your training goal." icon="🏋️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="workout-volume-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Training Details</h2>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Training Goal</label>
              <div className="grid grid-cols-3 gap-1">
                {goalOptions.map(g => (
                  <button key={g.value} onClick={() => setGoal(g.value)} className={`py-2 rounded-xl text-xs font-semibold transition-all ${goal === g.value ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{g.icon} {g.label}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['lbs', 'kg'] as const).map(u => (
                <button key={u} onClick={() => setUnit(u)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${unit === u ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>{u}</button>
              ))}
            </div>
            <InputField label="Sets per exercise" value={sets} onChange={setSets} min={1} max={10} step={1} suffix="sets" />
            <InputField label="Reps per set" value={reps} onChange={setReps} min={1} max={30} step={1} suffix="reps" />
            <InputField label={`Weight (${unit})`} value={weightKg} onChange={setWeightKg} min={unit === 'lbs' ? 5 : 2.5} max={unit === 'lbs' ? 500 : 225} step={unit === 'lbs' ? 5 : 2.5} suffix={unit} />
            <InputField label="Exercises per session" value={exercises} onChange={setExercises} min={1} max={15} step={1} suffix="exercises" />
            <InputField label="Sessions per week" value={frequency} onChange={setFrequency} min={1} max={7} step={1} suffix="days/wk" />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Volume Load" value={`${(result.volumeLoad / 1000).toFixed(1)}k kg`} highlight />
            <ResultCard label="Weekly Tonnage" value={`${result.tonnage}t`} subValue="per week" />
            <ResultCard label="Weekly Sets" value={`${result.totalWeeklySets}`} subValue="per muscle group" />
            <ResultCard label="Est. Cals Burned" value={`~${result.calsBurned}`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Your Sets vs MEV / MRV</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} formatter={(v: number) => [`${v} sets`, '']} />
                  <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]}>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className={`mt-3 rounded-xl p-3 text-sm font-semibold text-center border ${result.color === '#22c55e' ? 'bg-green-50 border-green-200 text-green-700' : result.color === '#f97316' ? 'bg-orange-50 border-orange-200 text-orange-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
              {result.volumeStatus}
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Target Volume for {goal.charAt(0).toUpperCase() + goal.slice(1)}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Optimal Sets Range</span><span className="font-bold">{result.targetVolumePerMuscle.sets} sets/week per muscle</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Rep Range</span><span className="font-bold">{result.targetVolumePerMuscle.repsPerSet} reps</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Rest Between Sets</span><span className="font-bold">{result.targetVolumePerMuscle.rest}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">MEV (Minimum)</span><span className="font-bold">{result.mev} sets/week</span></div>
              <div className="flex justify-between"><span className="text-gray-500">MRV (Maximum)</span><span className="font-bold">{result.mrv} sets/week</span></div>
            </div>
          </Card>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-bold mb-1">📈 Progression Tip</p>
            <p>{result.progressionTip}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Understanding this workout volume calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This calculator uses Sets per exercise, Reps per set, Exercises per session, Sessions per week, Volume Load, Weekly Tonnage, Weekly Sets, Est. Cals Burned to produce the displayed result. The output reflects the formula implemented by this tool and the values entered.</p>
            <p>When comparing scenarios, change one input at a time. This makes it easier to understand which assumption is responsible for the change instead of treating the calculated value as a guaranteed outcome.</p>
            <p>Review the units, measurement method, time horizon, and factors outside the calculator&apos;s inputs before relying on the result. For health-related outputs, an online calculation is educational and does not replace appropriate clinical assessment.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this section documents use and limitations without changing the calculator&apos;s underlying formula.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
