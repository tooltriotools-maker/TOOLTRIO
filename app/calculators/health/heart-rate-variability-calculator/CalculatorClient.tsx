'use client'
import { useState, useMemo } from 'react'
import { calculateHeartRateVariability } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [rmssd, setRmssd] = useState(42)
  const [age, setAge] = useState(35)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [restingHR, setRestingHR] = useState(62)
  const [trainingLoad, setTrainingLoad] = useState<'low' | 'moderate' | 'high'>('moderate')

  const result = useMemo(() => calculateHeartRateVariability(rmssd, age, gender, restingHR, trainingLoad), [rmssd, age, gender, restingHR, trainingLoad])

  const loadOptions: { value: 'low' | 'moderate' | 'high'; label: string }[] = [
    { value: 'low', label: 'Low / Rest week' },
    { value: 'moderate', label: 'Moderate training' },
    { value: 'high', label: 'High / Race week' },
  ]

  const readinessColor = result.readinessColor

  return (
    <CalculatorLayout title="Heart Rate Variability (HRV) Calculator" description="Calculate your HRV readiness score compared to age-adjusted norms and assess autonomic nervous system balance." icon="💓" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="heart-rate-variability-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">HRV Details</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <InputField label="Average RMSSD (ms)" value={rmssd} onChange={setRmssd} min={5} max={150} step={1} suffix="ms" />
            <InputField label="Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            <InputField label="Resting Heart Rate" value={restingHR} onChange={setRestingHR} min={35} max={110} step={1} suffix="bpm" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Current Training Load</label>
              <div className="space-y-1">
                {loadOptions.map(o => (
                  <button key={o.value} onClick={() => setTrainingLoad(o.value)} className={`w-full py-2 px-3 rounded-xl text-xs font-semibold text-left transition-all ${trainingLoad === o.value ? 'bg-rose-500 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>{o.label}</button>
                ))}
              </div>
            </div>
            <div className="p-4 rounded-xl border text-center" style={{ background: readinessColor + '15', borderColor: readinessColor + '40' }}>
              <p className="text-xs text-gray-500 mb-1">Readiness Score</p>
              <p className="text-4xl font-black" style={{ color: readinessColor }}>{result.readinessScore}</p>
              <p className="text-xs text-gray-400">/100</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Readiness" value={`${result.readinessScore}/100`} highlight />
            <ResultCard label="HRV vs Expected" value={`${result.hrScore}%`} subValue="age-adjusted" />
            <ResultCard label="Expected RMSSD" value={`${result.expectedRMSSD} ms`} subValue={`for age ${age}`} />
            <ResultCard label="Recovery" value={result.recoveryStatus.split(' — ')[0]} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Readiness Gauge</h3>
            <div className="relative h-6 rounded-full overflow-hidden bg-gradient-to-r from-red-500 via-yellow-400 to-green-500">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.readinessScore}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Poor</span><span>Moderate</span><span>Excellent</span></div>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Autonomic Balance</span><span className="font-semibold text-right ml-4">{result.autonomicBalance}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Recovery Status</span><span className="font-semibold text-right ml-4">{result.recoveryStatus}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Stress Indicator</span><span className="font-semibold text-right ml-4">{result.stressIndicator}</span></div>
            </div>
          </Card>
          <div className={`rounded-xl p-4 text-sm border ${result.readinessScore >= 70 ? 'bg-green-50 border-green-200 text-green-800' : result.readinessScore >= 40 ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <p className="font-bold mb-1">💡 {result.interpretation}</p>
            <p className="text-xs mt-1">Your RMSSD of {rmssd}ms compares to an age-adjusted expected value of {result.expectedRMSSD}ms — placing you at {result.hrScore}% of expected for your demographics.</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
