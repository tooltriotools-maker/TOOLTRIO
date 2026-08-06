'use client'
import { useState, useMemo } from 'react'
import { calculateMigraineRisk } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [headachesPerMonth, setHeadachesPerMonth] = useState(4)
  const [age, setAge] = useState(34)
  const [gender, setGender] = useState<'female' | 'male'>('female')
  const [familyHistory, setFamilyHistory] = useState(false)
  const [caffeineMg, setCaffeineMg] = useState(250)
  const [sleepHours, setSleepHours] = useState(6.5)
  const [stressLevel, setStressLevel] = useState(7)
  const [screenTime, setScreenTime] = useState(7)
  const [hormoneChanges, setHormoneChanges] = useState(false)

  const result = useMemo(() => calculateMigraineRisk(headachesPerMonth, age, gender, familyHistory, caffeineMg, sleepHours, stressLevel, screenTime, hormoneChanges), [headachesPerMonth, age, gender, familyHistory, caffeineMg, sleepHours, stressLevel, screenTime, hormoneChanges])

  return (
    <CalculatorLayout title="Migraine Risk & Burden Calculator" description="Assess your migraine risk factors and frequency-based burden to get a personalised prevention strategy." icon="🤕" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="migraine-risk-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Your Profile</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['female', 'male'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'female' ? '♀ Female' : '♂ Male'}
                </button>
              ))}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={10} max={80} step={1} suffix="yrs" />
            <InputField label="Headaches per month" value={headachesPerMonth} onChange={setHeadachesPerMonth} min={0} max={30} step={1} suffix="/mo" />
            <InputField label="Caffeine intake" value={caffeineMg} onChange={setCaffeineMg} min={0} max={1000} step={25} suffix="mg/day" />
            <InputField label="Average sleep" value={sleepHours} onChange={setSleepHours} min={3} max={12} step={0.5} suffix="hrs/night" />
            <InputField label="Daily screen time" value={screenTime} onChange={setScreenTime} min={0} max={18} step={0.5} suffix="hrs/day" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Stress Level (0–10)</label>
              <div className="flex gap-0.5">
                {[0,1,2,3,4,5,6,7,8,9,10].map(v => (
                  <button key={v} onClick={() => setStressLevel(v)} className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${stressLevel === v ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{v}</button>
                ))}
              </div>
            </div>
            <div className="space-y-2 pt-1">
              {[
                { label: '👨‍👩‍👧 Family history of migraines', val: familyHistory, set: setFamilyHistory },
                { label: '⚕️ Hormonal changes (menstrual/perimenopause)', val: hormoneChanges, set: setHormoneChanges },
              ].map(c => (
                <button key={c.label} onClick={() => c.set(!c.val)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${c.val ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${c.val ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{c.val ? '✓' : ''}</span>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Risk Score" value={`${result.riskPct}%`} highlight />
            <ResultCard label="Burden Level" value={result.riskCategory} />
            <ResultCard label="Monthly Headaches" value={`${result.headachesPerMonth}/mo`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Risk Gauge</h3>
            <div className="relative h-6 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.riskPct}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Low</span><span>Moderate</span><span>High</span></div>
            <p className="text-center font-black text-3xl mt-2" style={{ color: result.color }}>{result.riskPct}%</p>
            <p className="text-center text-sm font-semibold mt-0.5" style={{ color: result.color }}>{result.riskCategory}</p>
          </Card>
          {result.triggers.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Identified Triggers</h3>
              <ul className="space-y-1">
                {result.triggers.map(t => <li key={t} className="text-sm text-red-600 flex items-center gap-2"><span>⚠️</span>{t}</li>)}
              </ul>
            </Card>
          )}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Prevention Strategies</h3>
            <ul className="space-y-1">
              {result.preventionStrategies.map(s => <li key={s} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>{s}</li>)}
            </ul>
          </Card>
          {headachesPerMonth >= 4 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <p className="font-bold mb-1">💊 Preventive Treatment Threshold Reached</p>
              <p>With ≥4 migraine days/month, guidelines recommend discussing preventive medication with your neurologist (beta-blockers, topiramate, or CGRP monoclonal antibodies).</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to interpret this migraine risk calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This tool uses Age, Headaches per month, Caffeine intake, Average sleep, Daily screen time, Risk Score, Burden Level to calculate the displayed result. The output reflects the formula implemented on this page and the values you enter.</p>
            <p>For scenario comparisons, change one input at a time. This helps separate the effect of that assumption from other inputs and avoids treating a model result as a guaranteed real-world outcome.</p>
            <p>Review the units, measurement method, time period, and any eligibility or real-world factors that are not represented by the inputs before using the result for a decision.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this section documents how to use the calculator and does not alter its underlying formula.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
