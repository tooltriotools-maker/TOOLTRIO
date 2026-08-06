'use client'
import { useState, useMemo } from 'react'
import { calculateSpO2Risk } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

const auditFaqs = [
  {"question": "What should I check before using the Spo2 Risk Calculator?", "answer": "Check Age, Altitude, SpO₂, Status, Normal Range, Emergency At and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Spo2 Risk Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculator output for informational use and is not a diagnosis or a substitute for evaluation by a qualified healthcare professional."},
  {"question": "How can I compare different Spo2 Risk Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. Comparing results this way makes it easier to see which input is responsible for the difference."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [spO2, setSpO2] = useState(97)
  const [altitude, setAltitude] = useState(0)
  const [age, setAge] = useState(40)
  const [hasLungDisease, setHasLungDisease] = useState(false)
  const [symptoms, setSymptoms] = useState<string[]>([])

  const result = useMemo(() => calculateSpO2Risk(spO2, altitude, age, hasLungDisease, symptoms), [spO2, altitude, age, hasLungDisease, symptoms])

  const symptomOptions = ['Shortness of breath', 'Chest tightness', 'Cough', 'Dizziness', 'Confusion', 'Blue lips/fingers']

  const toggleSymptom = (s: string) => setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const isEmergency = spO2 < 88
  const isLow = spO2 < 92

  return (
    <CalculatorLayout title="SpO₂ Oxygen Saturation Risk Calculator" description="Assess your pulse oximeter reading, understand hypoxemia risk, altitude effects, and when to seek medical care." icon="💨" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="spo2-risk-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Your Reading</h2>
          <div className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">SpO₂ (%)</label>
              <input type="range" min={70} max={100} step={1} value={spO2} onChange={e => setSpO2(Number(e.target.value))} className="w-full accent-rose-500" />
              <div className="flex justify-between text-xs text-gray-400"><span>70%</span><span>85%</span><span>92%</span><span>100%</span></div>
              <div className="p-4 rounded-xl border text-center" style={{ background: result.color + '15', borderColor: result.color + '40' }}>
                <p className="text-5xl font-black" style={{ color: result.color }}>{spO2}%</p>
                <p className="text-xs font-semibold mt-1" style={{ color: result.color }}>{result.status}</p>
              </div>
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={1} max={100} step={1} suffix="yrs" />
            <InputField label="Altitude" value={altitude} onChange={setAltitude} min={0} max={20000} step={500} suffix="ft" />
            <button onClick={() => setHasLungDisease(!hasLungDisease)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${hasLungDisease ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${hasLungDisease ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{hasLungDisease ? '✓' : ''}</span>
              Known lung disease (COPD/asthma)
            </button>
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-500">Current symptoms (select all that apply)</p>
              <div className="grid grid-cols-2 gap-1">
                {symptomOptions.map(s => (
                  <button key={s} onClick={() => toggleSymptom(s)} className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-left transition-all ${symptoms.includes(s) ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>
                ))}
              </div>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {isEmergency && (
            <div className="bg-red-600 text-white rounded-xl p-4 text-center">
              <p className="text-2xl font-black">🚨 SEEK EMERGENCY CARE IMMEDIATELY</p>
              <p className="text-sm mt-1">SpO₂ below 88% — severe hypoxemia. Call 911 or go to the ER now.</p>
            </div>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="SpO₂" value={`${spO2}%`} highlight />
            <ResultCard label="Status" value={result.status} />
            <ResultCard label="Normal Range" value={result.normalRange} />
            <ResultCard label="Emergency At" value={`< ${result.emergencyThreshold}%`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">SpO₂ Reference Scale</h3>
            <div className="space-y-2">
              {[
                { label: 'Optimal', range: '98–100%', color: '#22c55e' },
                { label: 'Normal', range: '95–97%', color: '#84cc16' },
                { label: 'Borderline low', range: '92–94%', color: '#eab308' },
                { label: 'Low / Hypoxemia', range: '88–91%', color: '#f97316' },
                { label: 'Critical', range: '< 88%', color: '#dc2626' },
              ].map(r => {
                const active = result.status.toLowerCase().includes(r.label.toLowerCase().split(' ')[0].toLowerCase()) || (r.label === 'Optimal' && spO2 >= 98) || (r.label === 'Normal' && spO2 >= 95 && spO2 < 98) || (r.label === 'Borderline low' && spO2 >= 92 && spO2 < 95) || (r.label === 'Low / Hypoxemia' && spO2 >= 88 && spO2 < 92) || (r.label === 'Critical' && spO2 < 88)
                return (
                  <div key={r.label} className={`flex justify-between items-center p-3 rounded-xl border ${active ? 'border-2' : 'border-transparent'}`} style={{ background: active ? r.color + '15' : '#f9fafb', borderColor: active ? r.color : 'transparent' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                      <span className="text-sm font-semibold" style={{ color: active ? r.color : '#6b7280' }}>{r.label}</span>
                    </div>
                    <span className="text-sm font-mono font-bold" style={{ color: active ? r.color : '#9ca3af' }}>{r.range}</span>
                  </div>
                )
              })}
            </div>
          </Card>
          <div className={`rounded-xl p-4 text-sm border ${isEmergency ? 'bg-red-50 border-red-200 text-red-800' : isLow ? 'bg-orange-50 border-orange-200 text-orange-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <p className="font-bold mb-1">📋 {result.action}</p>
            {altitude > 0 && <p className="text-xs mt-1">Altitude-adjusted equivalent: {result.altitudeAdjustedSpO2}% · {altitude > 8000 ? 'High altitude significantly affects SpO₂ readings' : 'Mild altitude effect'}</p>}
            {result.concerns.length > 0 && <p className="text-xs mt-1">Concerns: {result.concerns.join(', ')}</p>}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Understanding this spo2 risk calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This calculator uses Age, Altitude, SpO₂, Status, Normal Range, Emergency At. The displayed result is generated from the tool&apos;s implemented formula and the values entered.</p>
            <p>Change one input at a time when comparing scenarios. That makes the result easier to interpret and helps distinguish a modeled relationship from a real-world prediction.</p>
            <p>Check the units, measurement method, time horizon, and any relevant factors that are outside the calculator&apos;s inputs before relying on the output.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this section explains use and limitations without changing the calculator&apos;s underlying formula.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={auditFaqs} /></div>
    </CalculatorLayout>
  )
}
