'use client'
import { useState, useMemo } from 'react'
import { calculateMentalFatigueScore } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [hoursWork, setHoursWork] = useState(9)
  const [sleepHrs, setSleepHrs] = useState(50)
  const [stressLevel, setStressLevel] = useState(6)
  const [screenTime, setScreenTime] = useState(8)
  const [exerciseMin, setExerciseMin] = useState(90)
  const [socialHrs, setSocialHrs] = useState(1)
  const [mindfulnessMins, setMindfulnessMins] = useState(5)

  const result = useMemo(() => calculateMentalFatigueScore(hoursWork, sleepHrs, stressLevel, screenTime, exerciseMin, socialHrs, mindfulnessMins), [hoursWork, sleepHrs, stressLevel, screenTime, exerciseMin, socialHrs, mindfulnessMins])

  return (
    <CalculatorLayout title="Mental Fatigue Calculator" description="Score your cognitive load and burnout risk from work hours, sleep debt, stress, and recovery habits." icon="🧠" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="mental-fatigue-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Your Week</h2>
          <div className="space-y-3">
            <p className="text-xs text-red-500 font-semibold uppercase tracking-wide">Draining factors</p>
            <InputField label="Daily work hours" value={hoursWork} onChange={setHoursWork} min={1} max={20} step={0.5} suffix="hrs/day" />
            <InputField label="Total sleep last 7 nights" value={sleepHrs} onChange={setSleepHrs} min={20} max={70} step={0.5} suffix="hrs" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Stress Level (0 = calm, 10 = crisis)</label>
              <div className="flex gap-1">
                {[0,1,2,3,4,5,6,7,8,9,10].map(v => (
                  <button key={v} onClick={() => setStressLevel(v)} className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${stressLevel === v ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{v}</button>
                ))}
              </div>
            </div>
            <InputField label="Daily screen time" value={screenTime} onChange={setScreenTime} min={0} max={18} step={0.5} suffix="hrs/day" />
            <p className="text-xs text-green-500 font-semibold uppercase tracking-wide pt-1">Recovery factors</p>
            <InputField label="Exercise this week" value={exerciseMin} onChange={setExerciseMin} min={0} max={600} step={15} suffix="min/wk" />
            <InputField label="Social interaction" value={socialHrs} onChange={setSocialHrs} min={0} max={20} step={0.5} suffix="hrs/wk" />
            <InputField label="Mindfulness practice" value={mindfulnessMins} onChange={setMindfulnessMins} min={0} max={60} step={5} suffix="min/day" />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="Fatigue Score" value={`${result.fatigue}/100`} highlight />
            <ResultCard label="Level" value={result.level} />
            <ResultCard label="Avg Sleep" value={`${result.sleepAvg} hrs/night`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Fatigue Gauge</h3>
            <div className="relative h-8 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
              <div className="absolute top-1 h-6 w-2 bg-white rounded-full shadow-lg transition-all" style={{ left: `${Math.min(97, result.fatigue)}%`, transform: 'translateX(-50%)' }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Well-rested</span><span>Moderate</span><span>Severe</span></div>
            <p className="text-center font-black text-3xl mt-2" style={{ color: result.color }}>{result.fatigue}/100</p>
            <p className="text-center text-sm font-semibold mt-1" style={{ color: result.color }}>{result.level}</p>
          </Card>
          {result.topDrains.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Top Energy Drains</h3>
              <ul className="space-y-1">
                {result.topDrains.map(d => <li key={d} className="text-sm text-red-600 flex items-center gap-2"><span>⚡</span>{d}</li>)}
              </ul>
            </Card>
          )}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Recovery Strategies</h3>
            <ul className="space-y-1">
              {result.recoveryTips.map(t => <li key={t} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>{t}</li>)}
            </ul>
          </Card>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
