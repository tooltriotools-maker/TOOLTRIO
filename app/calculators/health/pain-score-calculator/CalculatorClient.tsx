'use client'
import { useState, useMemo } from 'react'
import { calculatePainScoreAnalysis } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [currentPain, setCurrentPain] = useState(5)
  const [painFrequency, setPainFrequency] = useState<'constant' | 'daily' | 'weekly' | 'occasional'>('daily')
  const [sleepDisruption, setSleepDisruption] = useState(5)
  const [activityLimitation, setActivityLimitation] = useState(5)
  const [painDuration, setPainDuration] = useState('chronic')
  const [medication, setMedication] = useState(false)
  const [qualityOfLife, setQualityOfLife] = useState(5)

  const result = useMemo(() => calculatePainScoreAnalysis(currentPain, painFrequency, sleepDisruption, activityLimitation, painDuration, medication, qualityOfLife), [currentPain, painFrequency, sleepDisruption, activityLimitation, painDuration, medication, qualityOfLife])

  const freqOptions: { value: 'occasional' | 'weekly' | 'daily' | 'constant'; label: string }[] = [
    { value: 'occasional', label: 'Occasional' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'daily', label: 'Daily' },
    { value: 'constant', label: 'Constant' },
  ]

  return (
    <CalculatorLayout title="Pain Score Analysis Calculator" description="Calculate your composite pain burden score from intensity, frequency, sleep, activity, and quality of life." icon="🩹" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="pain-score-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Pain Assessment</h2>
          <div className="space-y-4">
            {[
              { label: 'Current Pain Intensity (0–10)', value: currentPain, set: setCurrentPain },
              { label: 'Sleep Disruption (0–10)', value: sleepDisruption, set: setSleepDisruption },
              { label: 'Activity Limitation (0–10)', value: activityLimitation, set: setActivityLimitation },
              { label: 'Quality of Life (0–10, 10 = best)', value: qualityOfLife, set: setQualityOfLife },
            ].map(s => (
              <div key={s.label} className="space-y-1">
                <label className="text-xs font-medium text-gray-500">{s.label}</label>
                <div className="flex gap-0.5">
                  {[0,1,2,3,4,5,6,7,8,9,10].map(v => (
                    <button key={v} onClick={() => s.set(v)} className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${s.value === v ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{v}</button>
                  ))}
                </div>
              </div>
            ))}
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Pain Frequency</label>
              <div className="grid grid-cols-2 gap-1">
                {freqOptions.map(o => (
                  <button key={o.value} onClick={() => setPainFrequency(o.value)} className={`py-2 rounded-xl text-xs font-semibold transition-all ${painFrequency === o.value ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{o.label}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-1">
              {[{ val: 'acute', label: '< 3 months' }, { val: 'chronic', label: '3+ months' }].map(o => (
                <button key={o.val} onClick={() => setPainDuration(o.val)} className={`py-2 rounded-xl text-xs font-semibold transition-all ${painDuration === o.val ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{o.label}</button>
              ))}
            </div>
            <button onClick={() => setMedication(!medication)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${medication ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${medication ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{medication ? '✓' : ''}</span>
              Currently using pain medication
            </button>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Pain Index" value={result.painIndex} highlight />
            <ResultCard label="Category" value={result.category} />
            <ResultCard label="Chronic" value={result.chronicFlag ? 'Yes (3+ months)' : 'Acute'} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Composite Pain Score</h3>
            <div className="relative h-8 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
              <div className="absolute top-1 h-6 w-2 bg-white rounded-full shadow-lg transition-all" style={{ left: `${(result.composite / 10) * 100}%`, transform: 'translateX(-50%)' }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Mild</span><span>Moderate</span><span>Severe</span></div>
            <p className="text-center font-black text-3xl mt-3" style={{ color: result.color }}>{result.composite}/10</p>
            <p className="text-center text-sm font-semibold mt-0.5" style={{ color: result.color }}>{result.category}</p>
          </Card>
          {result.redFlags.length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
              <p className="font-bold mb-2">🚨 Red Flags Identified</p>
              <ul className="space-y-1">{result.redFlags.map(f => <li key={f} className="flex items-center gap-2"><span>⚠️</span>{f}</li>)}</ul>
            </div>
          )}
          <div className={`rounded-xl p-4 text-sm border ${result.composite >= 7 ? 'bg-red-50 border-red-200 text-red-800' : result.composite >= 4 ? 'bg-orange-50 border-orange-200 text-orange-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <p className="font-bold mb-1">📋 Guidance</p>
            <p>{result.guidance}</p>
            {medication && <p className="mt-1 text-xs">{result.medicationNote}</p>}
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
