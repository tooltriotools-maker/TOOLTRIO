'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useCurrency } from '@/context/CurrencyContext'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
import { ChartWrapper } from '@/components/ui/ChartWrapper'
import { SEOContent, SEOContentProps } from '@/components/ui/SEOContent'
import { walkingCalorieSEOContent } from '@/lib/seo/calculator-seo-content'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[]; blogSlug?: string; seoContent?: SEOContentProps }

// MET values from ACSM Compendium of Physical Activities
const ACTIVITIES = [
  { name: 'Walking 2 mph (slow)', met: 2.8 },
  { name: 'Walking 3 mph (moderate)', met: 3.5 },
  { name: 'Walking 3.5 mph (brisk)', met: 4.3 },
  { name: 'Walking 4 mph (fast)', met: 5.0 },
  { name: 'Walking uphill 3.5 mph', met: 6.0 },
  { name: 'Hiking with pack', met: 7.0 },
  { name: 'Jogging 5 mph', met: 8.0 },
  { name: 'Running 6 mph', met: 10.0 },
  { name: 'Running 8 mph', met: 13.5 },
]

export default function CalorieBurnedWalkingCalculatorClient({ faqs, structuredData, relatedCalculators, blogSlug, seoContent }: Props) {
  const [weight, setWeight] = useState(154)   // kg
  const [duration, setDuration]   = useState(30)   // minutes
  const [activityIdx, setActivity] = useState(2)   // brisk walk default
  const [unit, setUnit]           = useState<'imperial' | 'metric'>('imperial')

  const weightKg  = unit === 'imperial' ? weight * 0.453592 : weight
  const activity  = ACTIVITIES[activityIdx]

  // Formula: Calories = MET x weight(kg) x duration(hours)
  const calories  = useMemo(() => Math.round(activity.met * weightKg * (duration / 60)), [activity, weightKg, duration])

  // Weekly projections
  const weekly3   = calories * 3
  const weekly5   = calories * 5
  const weekly7   = calories * 7

  // Pounds lost per week (3,500 cal = 1 lb)
  const lbsPerWeek5 = (weekly5 / 3500).toFixed(2)

  const weightDisplay = unit === 'imperial' ? weight : Math.round(weight / 2.20462)
  const weightLabel = unit === 'imperial' ? 'lbs' : 'kg'

  const comparisonData = ACTIVITIES.map(a => ({
    name: a.name.replace('Walking ', '').replace('Jogging ', '').replace('Running ', '').replace('Hiking with pack', 'Hiking'),
    calories: Math.round(a.met * weightKg * (duration / 60)),
  }))

  return (
    <CalculatorLayout title="Calories Burned Walking Calculator" description="Calculate calories burned walking based on your weight, pace, and duration using the MET formula (ACSM standard)." icon="🚶" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} blogSlug={blogSlug} slug="calorie-burned-walking-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider mb-5">Your Walk Details</h2>
          <div className="space-y-5">
            <div>
              <label className="text-xs text-gray-500 mb-2 block">Weight Unit</label>
              <div className="grid grid-cols-2 gap-2">
                {(['imperial', 'metric'] as const).map(u => (
                  <button key={u} onClick={() => {
                    if (u !== unit) {
                      setWeight(u === 'imperial' ? Math.round(weight * 2.205) : Math.round(weight / 2.205))
                      setUnit(u)
                    }
                  }} className={`py-2 rounded-xl text-sm font-semibold transition-colors ${unit === u ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {u.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <InputField label={`Your Weight (${weightLabel})`} value={weight} onChange={setWeight} min={unit === 'imperial' ? 80 : 36} max={unit === 'imperial' ? 400 : 181} step={1} suffix={weightLabel} />
            <InputField label="Duration (minutes)" value={duration} onChange={setDuration} min={5} max={300} step={5} suffix="min" />

            <div>
              <label className="text-xs text-gray-500 mb-2 block">Activity / Pace</label>
              <div className="space-y-1">
                {ACTIVITIES.map((a, i) => (
                  <button key={a.name} onClick={() => setActivity(i)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${activityIdx === i ? 'bg-green-600 text-white font-semibold' : 'text-gray-500 hover:bg-gray-100'}`}>
                    {a.name} <span className={`float-right ${activityIdx === i ? 'text-green-200' : 'text-gray-600'}`}>MET {a.met}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Calories Burned" value={`${calories} cal`} subValue={`${duration} min session`} highlight />
            <ResultCard label="3x Per Week" value={`${weekly3} cal`} subValue={`${(weekly3 / 3500).toFixed(2)} lbs/wk`} />
            <ResultCard label="5x Per Week" value={`${weekly5} cal`} subValue={`${lbsPerWeek5} lbs/wk`} />
            <ResultCard label="Daily Walk" value={`${weekly7} cal/wk`} subValue={`${(weekly7 / 3500).toFixed(2)} lbs/wk`} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Calories per Minute at {weight}{weightLabel}</h3>
              <div className="space-y-2">
                {ACTIVITIES.slice(0, 6).map((a, i) => {
                  const cal = Math.round(a.met * weightKg * (duration / 60))
                  const calPerMin = (a.met * weightKg / 60).toFixed(1)
                  return (
                    <div key={a.name} className={`flex items-center gap-3 p-2 rounded-lg ${i === activityIdx ? 'bg-green-50 border border-green-200' : ''}`}>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500">{a.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">{cal} cal</p>
                        <p className="text-xs text-gray-500">{calPerMin}/min</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </Card>

            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Weight Loss Projection</h3>
              <div className="space-y-3 text-sm">
                {[
                  ['This session', `${calories} calories`],
                  ['Sessions/week to lose 1 lb', `${Math.ceil(3500 / calories)} sessions`],
                  ['3x/week: lbs lost/month', `${((weekly3 * 4) / 3500).toFixed(1)} lbs`],
                  ['5x/week: lbs lost/month', `${((weekly5 * 4) / 3500).toFixed(1)} lbs`],
                  ['Daily: lbs lost/month', `${((weekly7 * 4) / 3500).toFixed(1)} lbs`],
                  ['MET value', `${activity.met} (${activity.name})`],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between border-b border-gray-100 pb-1 last:border-0">
                    <span className="text-gray-500">{l}</span><span className="font-semibold">{v}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 p-3 bg-blue-50 border border-blue-300 rounded-xl text-xs text-blue-700">
                Formula: Cal = MET x weight(kg) x hours<br/>
                Source: ACSM Compendium of Physical Activities
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Calories Burned by Activity ({duration} min, {weight} {weightLabel})</h3>
            <ChartWrapper height={220}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} layout="vertical" margin={{ top: 5, right: 60, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis type="category" dataKey="name" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} width={90} />
                  <Tooltip formatter={(v: number) => [`${v} cal`, 'Calories']} />
                  <Bar dataKey="calories" name="Calories" fill="#16a34a" radius={[0, 4, 4, 0]} label={{ position: 'right', fill: '#9ca3af', fontSize: 10, formatter: (v: number) => `${v}` }} />
                </BarChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </Card>
        </div>
      </div>
      <div className="mt-8">
        
      <Card className="mt-6">
        <h2 className="text-lg font-black text-gray-900 mb-3">
          Calorie Burned Walking Calculator Example (2026)
        </h2>
        <p className="text-sm text-gray-600 mb-2">
          A 165 lb person walking briskly for 45 minutes burns approximately <strong>280–320 calories</strong>. The same person cycling moderately for 45 minutes burns approximately 380–420 calories.
        </p>
        <p className="text-sm text-gray-600">
          This Calorie Burned Walking 2026 uses MET (Metabolic Equivalent of Task) values — the same method used by exercise physiologists and fitness trackers — to give accurate calorie burn estimates.
        </p>
      </Card>
      <SEOContent {...walkingCalorieSEOContent} category="health" />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
