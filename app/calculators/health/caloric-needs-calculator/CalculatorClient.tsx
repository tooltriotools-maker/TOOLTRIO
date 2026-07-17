'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { calculateCaloricNeedsMifflin } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField, HeightField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [unit, setUnit] = useState<'imperial' | 'metric'>('imperial')
  const [weight, setWeight] = useState(165)
  const [height, setHeight] = useState(68)
  const [age, setAge] = useState(32)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [activityMultiplier, setActivityMultiplier] = useState(1.55)
  const [goal, setGoal] = useState<'loss' | 'maintain' | 'gain'>('loss')
  const [lossRate, setLossRate] = useState(1)

  const weightKg = unit === 'imperial' ? weight / 2.20462 : weight
  const heightCm = unit === 'imperial' ? height * 2.54 : height
  const result = useMemo(() => calculateCaloricNeedsMifflin(weightKg, heightCm, age, gender, activityMultiplier, goal, lossRate), [weightKg, heightCm, age, gender, activityMultiplier, goal, lossRate])

  const activityLevels = [
    { label: 'Sedentary', value: 1.2, desc: 'Desk job, no exercise' },
    { label: 'Light', value: 1.375, desc: '1–3 days/week' },
    { label: 'Moderate', value: 1.55, desc: '3–5 days/week' },
    { label: 'Very Active', value: 1.725, desc: '6–7 days/week' },
    { label: 'Athlete', value: 1.9, desc: '2× daily training' },
  ]

  const macroData = [
    { name: 'Protein', grams: result.macros.protein, kcal: result.macros.protein * 4, color: '#22c55e' },
    { name: 'Carbs', grams: result.macros.carbs, kcal: result.macros.carbs * 4, color: '#3b82f6' },
    { name: 'Fat', grams: result.macros.fat, kcal: result.macros.fat * 9, color: '#f59e0b' },
  ]

  return (
    <CalculatorLayout title="Caloric Needs Calculator" description="Find your exact daily calorie target for weight loss, maintenance, or muscle gain using Mifflin-St Jeor." icon="🍽️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="caloric-needs-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Your Details</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>{g === 'male' ? '♂ Male' : '♀ Female'}</button>)}
            </div>
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['imperial', 'metric'] as const).map(u => <button key={u} onClick={() => setUnit(u)} className={`py-2 rounded-xl text-xs font-semibold transition-all ${unit === u ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>{u === 'imperial' ? '🇺🇸 lbs/in' : '🌍 kg/cm'}</button>)}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={10} max={100} step={1} suffix="yrs" />
            <InputField label={unit === 'imperial' ? 'Weight (lbs)' : 'Weight (kg)'} value={weight} onChange={setWeight} min={unit === 'imperial' ? 66 : 30} max={unit === 'imperial' ? 450 : 200} step={1} suffix={unit === 'imperial' ? 'lbs' : 'kg'} />
            <HeightField unit={unit} value={height} onChange={setHeight} />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Activity Level</label>
              <div className="space-y-1">
                {activityLevels.map(a => (
                  <button key={a.value} onClick={() => setActivityMultiplier(a.value)} className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all ${activityMultiplier === a.value ? 'bg-rose-500 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                    <span className="font-semibold">{a.label}</span> — {a.desc}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Goal</label>
              <div className="grid grid-cols-3 gap-1">
                {(['loss', 'maintain', 'gain'] as const).map(g => (
                  <button key={g} onClick={() => setGoal(g)} className={`py-2 rounded-xl text-xs font-semibold transition-all ${goal === g ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{g === 'loss' ? '📉 Lose' : g === 'gain' ? '📈 Gain' : '⚖️ Maintain'}</button>
                ))}
              </div>
            </div>
            {goal === 'loss' && <InputField label="Loss Rate (lbs/week)" value={lossRate} onChange={setLossRate} min={0.25} max={2} step={0.25} suffix="lbs/wk" />}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Daily Calories" value={`${result.targetCalories} kcal`} highlight />
            <ResultCard label="TDEE" value={`${result.tdee} kcal`} subValue="maintenance" />
            <ResultCard label={goal === 'loss' ? 'Deficit' : 'Surplus'} value={`${Math.abs(result.deficit)} kcal`} />
            <ResultCard label="BMR" value={`${result.bmr} kcal`} subValue="at rest" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Daily Macro Targets</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={macroData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} formatter={(v: number, name) => [name === 'grams' ? `${v}g` : `${v} kcal`, name]} />
                  <Bar dataKey="grams" name="grams" radius={[6, 6, 0, 0]}>
                    {macroData.map((m, i) => <Cell key={i} fill={m.color} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
              {macroData.map(m => (
                <div key={m.name} className="text-center p-3 rounded-xl" style={{ background: m.color + '15' }}>
                  <p className="text-xs text-gray-500">{m.name}</p>
                  <p className="text-xl font-black" style={{ color: m.color }}>{m.grams}g</p>
                  <p className="text-xs text-gray-400">{m.kcal} kcal</p>
                </div>
              ))}
            </div>
          </Card>
          {goal !== 'maintain' && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
              <p className="font-bold mb-1">📅 Timeline Estimate</p>
              <p>{goal === 'loss' ? `At ${lossRate} lbs/week, you'll lose 10 lbs in approximately ${result.weeksToGoal10lbs} weeks.` : 'At a 300 kcal surplus, expect ~0.5 lbs of muscle gain per week with consistent training.'}</p>
              <p className="mt-1 text-xs">Minimum safe floor: {result.minCalories} kcal/day (your BMR — never eat below this long-term)</p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
