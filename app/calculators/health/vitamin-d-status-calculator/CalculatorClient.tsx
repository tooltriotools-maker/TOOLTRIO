'use client'
import { useState, useMemo } from 'react'
import { calculateVitaminDStatus } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [sunExposure, setSunExposure] = useState(15)
  const [skinTone, setSkinTone] = useState<'light' | 'medium' | 'dark'>('medium')
  const [latitude, setLatitude] = useState(40)
  const [season, setSeason] = useState<'winter' | 'spring' | 'summer' | 'fall'>('winter')
  const [age, setAge] = useState(42)
  const [bmi, setBmi] = useState(25)
  const [supplement, setSupplement] = useState(1000)
  const [dietVitD, setDietVitD] = useState(2)

  const result = useMemo(() => calculateVitaminDStatus(sunExposure, skinTone, latitude, season, age, bmi, supplement, dietVitD), [sunExposure, skinTone, latitude, season, age, bmi, supplement, dietVitD])

  const levelPct = Math.min(100, (result.estimatedLevelNgML / 80) * 100)

  return (
    <CalculatorLayout title="Vitamin D Status Calculator" description="Estimate your vitamin D level from sun exposure, skin tone, latitude, season, BMI, and supplements." icon="☀️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="vitamin-d-status-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Your Profile</h2>
          <div className="space-y-3">
            <InputField label="Age" value={age} onChange={setAge} min={10} max={90} step={1} suffix="yrs" />
            <InputField label="Daily sun exposure (minutes)" value={sunExposure} onChange={setSunExposure} min={0} max={120} step={5} suffix="min/day" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Skin Tone</label>
              <div className="grid grid-cols-3 gap-1">
                {(['light', 'medium', 'dark'] as const).map(t => (
                  <button key={t} onClick={() => setSkinTone(t)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${skinTone === t ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Current Season</label>
              <div className="grid grid-cols-2 gap-1">
                {(['winter', 'spring', 'summer', 'fall'] as const).map(s => (
                  <button key={s} onClick={() => setSeason(s)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${season === s ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{s === 'winter' ? '❄️ Winter' : s === 'spring' ? '🌸 Spring' : s === 'summer' ? '☀️ Summer' : '🍂 Fall'}</button>
                ))}
              </div>
            </div>
            <InputField label="Your Latitude (degrees)" value={latitude} onChange={setLatitude} min={0} max={70} step={1} suffix="°" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={50} step={0.5} suffix="kg/m²" />
            <InputField label="Vitamin D supplement (IU/day)" value={supplement} onChange={setSupplement} min={0} max={10000} step={200} suffix="IU/day" />
            <InputField label="Dietary Vitamin D (mcg/day)" value={dietVitD} onChange={setDietVitD} min={0} max={20} step={0.5} suffix="mcg/day" />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Est. Level" value={`${result.estimatedLevelNgML} ng/mL`} highlight />
            <ResultCard label="Status" value={result.status.split(' (')[0]} />
            <ResultCard label="Recommended Dose" value={`${result.recommendedSupplementIU} IU`} subValue="suggested supplement" />
            <ResultCard label="Blood Test" value={result.bloodTestRecommended ? 'Recommended' : 'Not urgent'} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Vitamin D Level Gauge</h3>
            <div className="relative h-8 rounded-full overflow-hidden" style={{ background: 'linear-gradient(to right, #dc2626, #f97316, #eab308, #22c55e, #22c55e)' }}>
              <div className="absolute top-1 h-6 w-2 bg-white rounded-full shadow-lg transition-all" style={{ left: `${Math.min(97, levelPct)}%`, transform: 'translateX(-50%)' }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Deficient</span><span>20 ng/mL</span><span>30 ng/mL</span><span>Optimal 50+</span></div>
            <p className="text-center font-black text-3xl mt-2" style={{ color: result.color }}>{result.estimatedLevelNgML} ng/mL</p>
            <p className="text-center text-sm font-semibold mt-0.5" style={{ color: result.color }}>{result.status}</p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Source Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">From sun synthesis</span><span className="font-bold">{result.sunSynthesisIU} IU/day</span></div>
              <div className="flex justify-between"><span className="text-gray-500">From supplements</span><span className="font-bold">{result.supplementIU} IU/day</span></div>
              <div className="flex justify-between"><span className="text-gray-500">From diet</span><span className="font-bold">{Math.round(dietVitD * 40)} IU/day</span></div>
              <div className="border-t pt-2 flex justify-between font-bold"><span>Total daily intake</span><span>{result.totalDailyIU} IU</span></div>
            </div>
          </Card>
          <div className={`rounded-xl p-4 text-sm border ${result.deficient ? 'bg-orange-50 border-orange-200 text-orange-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <p className="font-bold mb-1">{result.seasonalRisk}</p>
            <p className="text-xs mt-1">{result.deficient ? `Suggested: ${result.recommendedSupplementIU} IU vitamin D3 daily. Have your level tested to confirm (25-OH vitamin D blood test).` : 'Your estimated level is in the sufficient range. Maintain your current sun and supplement intake year-round.'}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to review the vitamin d status calculator result</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>Review the calculated output together with Age, Daily sun exposure (minutes), Your Latitude (degrees), BMI, Vitamin D supplement (IU/day), Dietary Vitamin D (mcg/day). The result reflects the values entered and the calculation implemented by this tool.</p>
            <p>When comparing alternatives, change one input at a time while keeping the other assumptions constant. This makes the effect of each input easier to understand.</p>
          </div>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
