'use client'
import { useState, useMemo } from 'react'
import { calculateFrailtyIndex } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [age, setAge] = useState(72)
  const [weightLoss, setWeightLoss] = useState(false)
  const [exhaustion, setExhaustion] = useState(2)
  const [slowWalk, setSlowWalk] = useState(false)
  const [weakGrip, setWeakGrip] = useState(false)
  const [lowActivity, setLowActivity] = useState(false)

  const result = useMemo(() => calculateFrailtyIndex(age, weightLoss, exhaustion, slowWalk, weakGrip, lowActivity), [age, weightLoss, exhaustion, slowWalk, weakGrip, lowActivity])

  const criteriaList = [
    { label: 'Unintentional weight loss (10+ lbs past year)', val: weightLoss, set: setWeightLoss },
    { label: 'Slow walking speed (>7 sec for 15 feet)', val: slowWalk, set: setSlowWalk },
    { label: 'Weak grip strength (below sex-adjusted threshold)', val: weakGrip, set: setWeakGrip },
    { label: 'Low physical activity (<383 kcal/week men)', val: lowActivity, set: setLowActivity },
  ]

  const stageColors = ['#22c55e', '#f59e0b', '#ef4444']
  const stageLabels = ['Robust', 'Pre-frail', 'Frail']
  const stageRanges = ['0', '1–2', '3–5']

  return (
    <CalculatorLayout title="Frailty Index Calculator" description="Assess frailty using the validated Fried Frailty Phenotype — 5 clinical criteria used worldwide." icon="🧓" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="frailty-index-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Fried Frailty Criteria</h2>
          <div className="space-y-3">
            <InputField label="Age" value={age} onChange={setAge} min={40} max={100} step={1} suffix="yrs" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Exhaustion days/week feeling tired</label>
              <div className="grid grid-cols-5 gap-1">
                {[0,1,2,3,4].map(v => (
                  <button key={v} onClick={() => setExhaustion(v)} className={`py-2 rounded-xl text-sm font-bold transition-all ${exhaustion === v ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{v}</button>
                ))}
              </div>
              <p className="text-xs text-gray-400">3+ days = positive exhaustion criterion</p>
            </div>
            <div className="space-y-2 pt-1">
              {criteriaList.map(c => (
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
            <ResultCard label="Criteria Met" value={`${result.criteriaCount} / 5`} highlight />
            <ResultCard label="Category" value={result.category} />
            <ResultCard label="Fall Risk" value={`${result.fallRiskMultiplier}× baseline`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Frailty Staging</h3>
            <div className="flex gap-3">
              {stageLabels.map((label, i) => {
                const active = (i === 0 && result.criteriaCount === 0) || (i === 1 && result.criteriaCount >= 1 && result.criteriaCount <= 2) || (i === 2 && result.criteriaCount >= 3)
                return (
                  <div key={label} className={`flex-1 p-4 rounded-xl text-center border-2 transition-all ${active ? '' : 'opacity-40'}`} style={{ borderColor: active ? stageColors[i] : '#e5e7eb', background: active ? stageColors[i] + '20' : 'transparent' }}>
                    <p className="text-2xl font-black" style={{ color: stageColors[i] }}>{stageRanges[i]}</p>
                    <p className="text-xs font-semibold text-gray-600 mt-1">{label}</p>
                  </div>
                )
              })}
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Hospitalization Risk</span><span className="font-bold">{result.hospitalizationRisk}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Assessment</span><span className="font-semibold" style={{ color: result.color }}>{result.risk}</span></div>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Evidence-Based Interventions</h3>
            <ul className="space-y-1">
              {result.interventions.map(tip => <li key={tip} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-green-500 mt-0.5 flex-shrink-0">✓</span>{tip}</li>)}
            </ul>
          </Card>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
