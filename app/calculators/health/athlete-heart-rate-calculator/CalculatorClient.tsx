'use client'
import { useState, useMemo } from 'react'
import { calculateAthleteHeartRate } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [age, setAge] = useState(32)
  const [restingHR, setRestingHR] = useState(58)
  const [intensity, setIntensity] = useState(70)
  const [method, setMethod] = useState<'karvonen' | 'hrr' | 'basic'>('karvonen')

  const result = useMemo(() => calculateAthleteHeartRate(age, restingHR, intensity, method), [age, restingHR, intensity, method])

  const zoneColors = ['#3b82f6','#22c55e','#eab308','#f97316','#ef4444']

  return (
    <CalculatorLayout title="Athlete Heart Rate Zone Calculator" description="Calculate all 5 training zones using the Karvonen formula with your personal heart rate reserve." icon="❤️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="athlete-heart-rate-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Your Details</h2>
          <div className="space-y-3">
            <InputField label="Age" value={age} onChange={setAge} min={15} max={90} step={1} suffix="yrs" />
            <InputField label="Resting Heart Rate" value={restingHR} onChange={setRestingHR} min={35} max={100} step={1} suffix="bpm" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Target Intensity: {intensity}%</label>
              <input type="range" min={50} max={100} step={1} value={intensity} onChange={e => setIntensity(Number(e.target.value))} className="w-full accent-rose-500" />
              <div className="flex justify-between text-xs text-gray-400"><span>50%</span><span>75%</span><span>100%</span></div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Formula</label>
              <div className="grid grid-cols-3 gap-1">
                {(['karvonen', 'hrr', 'basic'] as const).map(m => (
                  <button key={m} onClick={() => setMethod(m)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${method === m ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{m === 'karvonen' ? 'Karvonen' : m === 'hrr' ? '%HRR' : 'Basic'}</button>
                ))}
              </div>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl text-xs space-y-1 text-gray-600">
              <p><span className="font-bold">Max HR:</span> {result.maxHR} bpm (220 − age)</p>
              <p><span className="font-bold">HR Reserve:</span> {result.hrReserve} bpm</p>
              <p><span className="font-bold">Target HR:</span> <span className="text-rose-600 font-black text-sm">{result.target} bpm</span></p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Target HR" value={`${result.target} bpm`} highlight />
            <ResultCard label="Max HR" value={`${result.maxHR} bpm`} />
            <ResultCard label="HR Reserve" value={`${result.hrReserve} bpm`} />
            <ResultCard label="Current Zone" value={result.currentZone.name.split(' — ')[0]} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Your 5 Training Zones (Karvonen)</h3>
            <div className="space-y-2">
              {result.zones.map((z, i) => {
                const isActive = result.target >= z.min && result.target <= z.max
                return (
                  <div key={z.name} className={`p-3 rounded-xl border transition-all ${isActive ? 'border-2' : 'border-transparent'}`} style={{ background: zoneColors[i] + '15', borderColor: isActive ? zoneColors[i] : 'transparent' }}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold" style={{ color: zoneColors[i] }}>{z.name}</p>
                        <p className="text-xs text-gray-500">{z.benefit}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-black" style={{ color: zoneColors[i] }}>{z.min}–{z.max} bpm</p>
                        <p className="text-xs text-gray-400">{z.pct} HRR</p>
                      </div>
                    </div>
                    {isActive && (
                      <div className="mt-2 pt-2 border-t" style={{ borderColor: zoneColors[i] + '40' }}>
                        <p className="text-xs font-semibold" style={{ color: zoneColors[i] }}>← Your current target falls here</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-bold mb-1">💡 Zone 2 Training Tip</p>
            <p>Elite endurance athletes spend ~80% of training volume in Zone 2 ({result.zones[1].min}–{result.zones[1].max} bpm). This builds mitochondrial density and aerobic base — the foundation of all endurance performance.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Calculator-specific methodology</h2>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">Heart-rate-zone methodology</h3>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This calculator uses heart-rate reserve (Karvonen-style zones): HRR = estimated maximum heart rate − resting heart rate, then target heart rate = resting heart rate + HRR × chosen intensity.</p>
            <p>Estimated maximum heart rate is only a population estimate and can differ materially from an individual’s measured maximum. Medication, heat, dehydration, illness, altitude, and measurement error can also shift heart-rate response.</p>
            <p>Use the zones as training estimates, not medical clearance. People with cardiovascular disease, concerning symptoms, or medications that alter heart rate should use clinician-provided exercise targets.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Exercise-intensity context: CDC physical-activity guidance; individual maximum heart rate is best established with appropriate testing when clinically needed.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
