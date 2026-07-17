'use client'
import { useState, useMemo } from 'react'
import { calculateSaunaHealthScore } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [sessionsPerWeek, setSessionsPerWeek] = useState(3)
  const [durationMins, setDurationMins] = useState(20)
  const [tempC, setTempC] = useState(85)
  const [saunaType, setSaunaType] = useState<'dry' | 'steam' | 'infrared'>('dry')
  const [yearsOfUse, setYearsOfUse] = useState(2)
  const [cvRisk, setCvRisk] = useState(false)
  const [bp, setBp] = useState<'normal' | 'high' | 'very-high'>('normal')
  const [postHydration, setPostHydration] = useState(true)
  const result = useMemo(() => calculateSaunaHealthScore(sessionsPerWeek, durationMins, tempC, saunaType, yearsOfUse, cvRisk, bp, postHydration), [sessionsPerWeek, durationMins, tempC, saunaType, yearsOfUse, cvRisk, bp, postHydration])
  return (
    <CalculatorLayout title="Sauna Health Benefits Calculator" description="Score your sauna routine for cardiovascular, longevity, and recovery benefits based on the Kuopio Heart Study data." icon="🔥" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="sauna-health-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Sauna Routine</h2>
          <div className="space-y-3">
            <InputField label="Sessions per week" value={sessionsPerWeek} onChange={setSessionsPerWeek} min={1} max={14} step={1} suffix="/wk" />
            <InputField label="Duration per session" value={durationMins} onChange={setDurationMins} min={5} max={60} step={5} suffix="min" />
            <InputField label="Temperature" value={tempC} onChange={setTempC} min={50} max={120} step={5} suffix="°C" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Sauna Type</label>
              <div className="grid grid-cols-3 gap-1">
                {(['dry','steam','infrared'] as const).map(t => <button key={t} onClick={() => setSaunaType(t)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${saunaType === t ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{t}</button>)}
              </div>
            </div>
            <InputField label="Years using sauna" value={yearsOfUse} onChange={setYearsOfUse} min={0} max={40} step={1} suffix="yrs" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Blood Pressure</label>
              <div className="grid grid-cols-3 gap-1">
                {(['normal','high','very-high'] as const).map(b => <button key={b} onClick={() => setBp(b)} className={`py-2 rounded-xl text-xs font-semibold transition-all ${bp === b ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{b === 'very-high' ? 'Very High' : b.charAt(0).toUpperCase() + b.slice(1)}</button>)}
              </div>
            </div>
            {[
              { label: '❤️ Known cardiovascular risk', val: cvRisk, set: setCvRisk },
              { label: '💧 Rehydrate after each session', val: postHydration, set: setPostHydration },
            ].map(c => (
              <button key={c.label} onClick={() => c.set(!c.val)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${c.val ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${c.val ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{c.val ? '✓' : ''}</span>{c.label}
              </button>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Benefit Score" value={`${result.benefitScore}/100`} highlight />
            <ResultCard label="Safety" value={result.safetyTip.split(' — ')[0]} />
            <ResultCard label="GH Boost" value={result.growthHormoneBoost.split(':')[0]} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Benefit Gauge</h3>
            <div className="relative h-6 bg-gradient-to-r from-red-400 via-yellow-400 to-green-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.benefitScore}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Low benefit</span><span>Moderate</span><span>Maximum benefit</span></div>
            <p className="text-center font-black text-3xl mt-2" style={{ color: result.color }}>{result.benefitScore}/100</p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Health Mechanisms</h3>
            <div className="space-y-2 text-sm">
              <div className="p-3 bg-green-50 rounded-xl">
                <p className="font-semibold text-green-700">❤️ Cardiovascular</p>
                <p className="text-xs text-green-600 mt-1">{result.cvBenefit}</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-xl">
                <p className="font-semibold text-blue-700">🧬 HSP Activation</p>
                <p className="text-xs text-blue-600 mt-1">{result.hspActivation}</p>
              </div>
              <div className="p-3 bg-purple-50 rounded-xl">
                <p className="font-semibold text-purple-700">💊 Growth Hormone</p>
                <p className="text-xs text-purple-600 mt-1">{result.growthHormoneBoost}</p>
              </div>
            </div>
          </Card>
          {result.riskFlags.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="font-bold text-sm text-amber-800 mb-2">⚠️ Safety Considerations</p>
              <ul className="space-y-1">{result.riskFlags.map(f => <li key={f} className="text-sm text-amber-700">{f}</li>)}</ul>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
