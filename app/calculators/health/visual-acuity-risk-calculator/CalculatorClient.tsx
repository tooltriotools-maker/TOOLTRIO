'use client'
import { useState, useMemo } from 'react'
import { calculateVisualAcuityRisk } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [screenHours, setScreenHours] = useState(8)
  const [outdoorHours, setOutdoorHours] = useState(1)
  const [age, setAge] = useState(42)
  const [familyGlaucoma, setFamilyGlaucoma] = useState(false)
  const [diabetic, setDiabetic] = useState(false)
  const [lastExamMonths, setLastExamMonths] = useState(18)
  const [rubbingEyes, setRubbingEyes] = useState(false)
  const [contactHygiene, setContactHygiene] = useState<'good' | 'poor' | 'none'>('none')
  const result = useMemo(() => calculateVisualAcuityRisk('', screenHours, outdoorHours, age, familyGlaucoma, diabetic, lastExamMonths, rubbingEyes, contactHygiene), [screenHours, outdoorHours, age, familyGlaucoma, diabetic, lastExamMonths, rubbingEyes, contactHygiene])
  return (
    <CalculatorLayout title="Visual Acuity & Eye Health Risk Calculator" description="Assess glaucoma, myopia, diabetic retinopathy risk, and digital eye strain from screen time, age, and lifestyle." icon="👁️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="visual-acuity-risk-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Eye Health Factors</h2>
          <div className="space-y-3">
            <InputField label="Age" value={age} onChange={setAge} min={5} max={90} step={1} suffix="yrs" />
            <InputField label="Daily screen time" value={screenHours} onChange={setScreenHours} min={0} max={18} step={0.5} suffix="hrs/day" />
            <InputField label="Daily outdoor time" value={outdoorHours} onChange={setOutdoorHours} min={0} max={10} step={0.5} suffix="hrs/day" />
            <InputField label="Last comprehensive eye exam" value={lastExamMonths} onChange={setLastExamMonths} min={0} max={120} step={1} suffix="months ago" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Contact lens hygiene</label>
              <div className="grid grid-cols-3 gap-1">
                {(['good','poor','none'] as const).map(h => <button key={h} onClick={() => setContactHygiene(h)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${contactHygiene === h ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{h === 'none' ? 'No contacts' : h}</button>)}
              </div>
            </div>
            {[
              { label: '👁️ Family history of glaucoma', val: familyGlaucoma, set: setFamilyGlaucoma },
              { label: '🩸 Diabetes (retinopathy risk)', val: diabetic, set: setDiabetic },
              { label: '👀 Frequent eye rubbing', val: rubbingEyes, set: setRubbingEyes },
            ].map(c => (
              <button key={c.label} onClick={() => c.set(!c.val)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${c.val ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${c.val ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{c.val ? '✓' : ''}</span>{c.label}
              </button>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Risk Score" value={`${result.visionRisk}/100`} highlight />
            <ResultCard label="Exam Frequency" value={result.examFrequency} />
            <ResultCard label="Digital Strain" value={screenHours > 6 ? '20-20-20 rule' : 'Low risk'} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Eye Health Risk Profile</h3>
            <div className="space-y-3">
              {[
                { label: 'Overall Risk', value: `${result.visionRisk}/100`, color: result.color },
                { label: 'Glaucoma Risk', value: result.glaucomaRisk, color: familyGlaucoma ? '#ef4444' : '#22c55e' },
                { label: 'Myopia Risk', value: result.myopiaRisk, color: screenHours > 6 && outdoorHours < 2 ? '#f97316' : '#22c55e' },
                { label: 'Diabetic Retinopathy', value: result.diabeticRetinopathy, color: diabetic ? '#ef4444' : '#9ca3af' },
              ].map(r => (
                <div key={r.label} className="flex items-start justify-between gap-4">
                  <span className="text-sm text-gray-500 flex-shrink-0">{r.label}</span>
                  <span className="text-sm font-semibold text-right" style={{ color: r.color }}>{r.value}</span>
                </div>
              ))}
            </div>
          </Card>
          {result.contactLensWarning && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
              <p className="font-bold mb-1">⚠️ Contact Lens Warning</p>
              <p>{result.contactLensWarning}</p>
            </div>
          )}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-bold mb-1">💡 {result.digitalEyeStrain}</p>
            <p className="text-xs mt-1">Recommended exam frequency: <span className="font-semibold">{result.examFrequency}</span></p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
