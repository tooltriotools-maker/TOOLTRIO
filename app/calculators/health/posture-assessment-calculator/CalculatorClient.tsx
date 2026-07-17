'use client'
import { useState, useMemo } from 'react'
import { calculatePostureAssessment } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [headForward, setHeadForward] = useState(3)
  const [shoulderRounding, setShoulderRounding] = useState(3)
  const [hipTilt, setHipTilt] = useState<'anterior' | 'neutral' | 'posterior'>('anterior')
  const [kneesIn, setKneesIn] = useState(false)
  const [flatFeet, setFlatFeet] = useState(false)
  const [hoursSeated, setHoursSeated] = useState(8)
  const [yearsOffice, setYearsOffice] = useState(5)

  const result = useMemo(() => calculatePostureAssessment(headForward, shoulderRounding, hipTilt, kneesIn, flatFeet, hoursSeated, yearsOffice), [headForward, shoulderRounding, hipTilt, kneesIn, flatFeet, hoursSeated, yearsOffice])

  return (
    <CalculatorLayout title="Posture Assessment Calculator" description="Evaluate your postural deviations and get targeted corrective exercises to restore alignment and reduce pain risk." icon="🧍" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="posture-assessment-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Postural Assessment</h2>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Head Forward Protrusion (cm from ideal)</label>
              <div className="flex gap-1">
                {[0,1,2,3,4,5,6,7,8].map(v => (
                  <button key={v} onClick={() => setHeadForward(v)} className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${headForward === v ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{v}</button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Shoulder Rounding (0=none, 5=severe)</label>
              <div className="flex gap-1">
                {[0,1,2,3,4,5].map(v => (
                  <button key={v} onClick={() => setShoulderRounding(v)} className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${shoulderRounding === v ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{v}</button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Pelvic Tilt</label>
              <div className="grid grid-cols-3 gap-1">
                {(['anterior', 'neutral', 'posterior'] as const).map(t => (
                  <button key={t} onClick={() => setHipTilt(t)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${hipTilt === t ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{t}</button>
                ))}
              </div>
            </div>
            <InputField label="Hours seated per day" value={hoursSeated} onChange={setHoursSeated} min={0} max={18} step={0.5} suffix="hrs/day" />
            <InputField label="Years of office/desk work" value={yearsOffice} onChange={setYearsOffice} min={0} max={40} step={1} suffix="yrs" />
            <div className="space-y-2">
              {[{ label: '🦵 Knee valgus (knees cave inward)', val: kneesIn, set: setKneesIn }, { label: '🦶 Flat feet / overpronation', val: flatFeet, set: setFlatFeet }].map(c => (
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
            <ResultCard label="Posture Score" value={`${result.postureScore}/100`} highlight />
            <ResultCard label="Category" value={result.category.split(' — ')[0]} />
            <ResultCard label="Pain Risk" value={result.paintRisk.split(' ')[0] + ' risk'} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Posture Deviation Score</h3>
            <div className="relative h-6 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.postureScore}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Good posture</span><span>Mild issues</span><span>Poor posture</span></div>
            <p className="text-center font-black text-3xl mt-2" style={{ color: result.color }}>{result.postureScore}/100</p>
          </Card>
          {result.issues.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Identified Issues</h3>
              <ul className="space-y-1">
                {result.issues.map(i => <li key={i} className="text-sm text-orange-700 flex items-center gap-2"><span>⚠️</span>{i}</li>)}
              </ul>
            </Card>
          )}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Corrective Exercises</h3>
            <ul className="space-y-1">
              {result.correctives.map(c => <li key={c} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>{c}</li>)}
            </ul>
          </Card>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
