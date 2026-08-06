'use client'
import { useState, useMemo } from 'react'
import { calculateJointMobilityScore } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [shoulder, setShoulder] = useState(155)
  const [hip, setHip] = useState(100)
  const [ankle, setAnkle] = useState(15)
  const [neck, setNeck] = useState(65)
  const [thoracic, setThoracic] = useState(38)
  const [wrist, setWrist] = useState(60)
  const [age, setAge] = useState(40)
  const result = useMemo(() => calculateJointMobilityScore(shoulder, hip, ankle, neck, thoracic, wrist, age), [shoulder, hip, ankle, neck, thoracic, wrist, age])
  const joints = [
    { name: 'Shoulder Abduction', value: shoulder, set: setShoulder, max: 180, norm: 180, unit: '°' },
    { name: 'Hip Flexion', value: hip, set: setHip, max: 120, norm: 120, unit: '°' },
    { name: 'Ankle Dorsiflexion', value: ankle, set: setAnkle, max: 30, norm: 20, unit: '°' },
    { name: 'Neck Rotation', value: neck, set: setNeck, max: 90, norm: 80, unit: '°' },
    { name: 'Thoracic Rotation', value: thoracic, set: setThoracic, max: 60, norm: 45, unit: '°' },
    { name: 'Wrist Extension', value: wrist, set: setWrist, max: 80, norm: 70, unit: '°' },
  ]
  const scoreKeys = ['shoulder', 'hip', 'ankle', 'neck', 'thoracic', 'wrist'] as const
  return (
    <CalculatorLayout title="Joint Mobility Score Calculator" description="Score your range of motion at 6 key joints against clinical norms and identify your tightest restriction." icon="🤸" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="joint-mobility-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Range of Motion (°)</h2>
          <div className="space-y-3">
            <InputField label="Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            {joints.map(j => <InputField key={j.name} label={`${j.name} (norm: ${j.norm}°)`} value={j.value} onChange={j.set} min={0} max={j.max} step={1} suffix={j.unit} />)}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Overall Score" value={`${result.avgScore}%`} highlight />
            <ResultCard label="Age-Adjusted" value={`${result.ageAdjustedScore}%`} />
            <ResultCard label="Tightest Joint" value={result.tightestJoint} subValue={`${result.tightestScore}% of norm`} />
            <ResultCard label="Injury Risk" value={result.injuryRisk.split(' ')[0]} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Joint-by-Joint Scores</h3>
            <div className="space-y-2">
              {scoreKeys.map((key, i) => {
                const score = result.scores[key]
                const color = score >= 90 ? '#22c55e' : score >= 75 ? '#84cc16' : score >= 60 ? '#eab308' : '#ef4444'
                return (
                  <div key={key}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500 capitalize">{key} {key === 'hip' ? 'flexion' : key === 'ankle' ? 'dorsiflexion' : key === 'thoracic' ? 'rotation' : key === 'wrist' ? 'extension' : key === 'neck' ? 'rotation' : 'abduction'}</span>
                      <span className="font-bold" style={{ color }}>{score}%</span>
                    </div>
                    <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, score)}%`, background: color }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
          <div className={`rounded-xl p-4 text-sm border ${result.color === '#22c55e' ? 'bg-green-50 border-green-200 text-green-800' : result.color === '#84cc16' ? 'bg-green-50 border-green-200 text-green-800' : result.color === '#eab308' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <p className="font-bold mb-1">🎯 Priority: {result.stretchPriority}</p>
            <p className="text-xs mt-1">{result.injuryRisk}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to interpret this joint mobility calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This tool uses Age, Overall Score, Age-Adjusted, Tightest Joint, Injury Risk to calculate the displayed result. The output reflects the formula implemented on this page and the values you enter.</p>
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
