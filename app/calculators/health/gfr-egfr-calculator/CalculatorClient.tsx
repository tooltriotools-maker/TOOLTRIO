'use client'
import { useState, useMemo } from 'react'
import { calculateGlomerularFiltrationRate } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

const auditFaqs = [
  {"question": "What should I check before using the Gfr Egfr Calculator?", "answer": "Check Age, eGFR, CKD Stage, Protein Target and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Gfr Egfr Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculator output for informational use and is not a diagnosis or a substitute for evaluation by a qualified healthcare professional."},
  {"question": "How can I compare different Gfr Egfr Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. Comparing results this way makes it easier to see which input is responsible for the difference."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [creatinine, setCreatinine] = useState(1.1)
  const [age, setAge] = useState(55)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [raceBlack, setRaceBlack] = useState(false)
  const [unit, setUnit] = useState<'mg/dL' | 'μmol/L'>('mg/dL')

  const result = useMemo(() => calculateGlomerularFiltrationRate(creatinine, age, gender, raceBlack, unit), [creatinine, age, gender, raceBlack, unit])

  const stages = [
    { code: 'G1', range: '≥ 90', label: 'Normal', color: '#22c55e' },
    { code: 'G2', range: '60–89', label: 'Mildly decreased', color: '#84cc16' },
    { code: 'G3a', range: '45–59', label: 'Mild-moderate', color: '#eab308' },
    { code: 'G3b', range: '30–44', label: 'Moderate-severe', color: '#f97316' },
    { code: 'G4', range: '15–29', label: 'Severe', color: '#ef4444' },
    { code: 'G5', range: '< 15', label: 'Kidney Failure', color: '#dc2626' },
  ]

  return (
    <CalculatorLayout title="eGFR Kidney Function Calculator" description="Calculate estimated GFR using CKD-EPI 2021 — the gold standard for kidney function assessment." icon="🫘" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="gfr-egfr-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Lab Values</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['mg/dL', 'μmol/L'] as const).map(u => (
                <button key={u} onClick={() => setUnit(u)} className={`py-2 rounded-xl text-xs font-semibold transition-all ${unit === u ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>{u}</button>
              ))}
            </div>
            <InputField label={`Serum Creatinine (${unit})`} value={creatinine} onChange={setCreatinine} min={0.4} max={15} step={0.1} suffix={unit} />
            <InputField label="Age" value={age} onChange={setAge} min={18} max={100} step={1} suffix="yrs" />
            <button onClick={() => setRaceBlack(!raceBlack)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${raceBlack ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${raceBlack ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{raceBlack ? '✓' : ''}</span>
              Black race (CKD-EPI coefficient)
            </button>
            <div className="p-4 rounded-xl border" style={{ background: result.color + '15', borderColor: result.color + '40' }}>
              <p className="text-xs text-gray-500">Your eGFR</p>
              <p className="text-4xl font-black" style={{ color: result.color }}>{result.egfr}</p>
              <p className="text-xs text-gray-400">mL/min/1.73m²</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="eGFR" value={`${result.egfr} mL/min`} highlight />
            <ResultCard label="CKD Stage" value={result.stage.split(' — ')[0]} />
            <ResultCard label="Protein Target" value={result.proteinRestriction} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">CKD Stage Reference</h3>
            <div className="space-y-2">
              {stages.map(s => {
                const active = result.stage.startsWith(s.code)
                return (
                  <div key={s.code} className={`flex items-center gap-3 p-3 rounded-xl border ${active ? 'border-2' : 'border-transparent'}`} style={{ background: active ? s.color + '15' : '#f9fafb', borderColor: active ? s.color : 'transparent' }}>
                    <span className="text-xs font-black w-8" style={{ color: s.color }}>{s.code}</span>
                    <span className="text-xs text-gray-400 w-16 font-mono">{s.range}</span>
                    <span className="text-sm flex-1" style={{ color: active ? s.color : '#6b7280', fontWeight: active ? 700 : 400 }}>{s.label}</span>
                    {active && <span className="text-xs font-bold bg-white px-2 py-1 rounded-full" style={{ color: s.color }}>← Your level</span>}
                  </div>
                )
              })}
            </div>
          </Card>
          <div className={`rounded-xl p-4 text-sm border ${result.egfr < 30 ? 'bg-red-50 border-red-200 text-red-800' : result.egfr < 60 ? 'bg-orange-50 border-orange-200 text-orange-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <p className="font-bold mb-1">📋 {result.desc}</p>
            <p className="text-xs mt-1">Fluid target: {result.fluidTarget} · Protein: {result.proteinRestriction}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Understanding this gfr egfr calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>The calculator uses Age, eGFR, CKD Stage, Protein Target. Its output is based on the formula implemented by this tool and the values you provide.</p>
            <p>When comparing scenarios, change one assumption at a time and compare eGFR Kidney Function Calculator, Age, eGFR, CKD Stage, Protein Target. This makes it easier to identify which input is responsible for the change instead of treating the result as a prediction.</p>
            <p>Check the units and time period before relying on the output. Real-world outcomes can differ when relevant taxes, fees, eligibility requirements, measurement error, market changes, or other factors are outside the calculator&apos;s inputs.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this explanation documents the calculator&apos;s use and limitations without changing its underlying calculation.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={auditFaqs} /></div>
    </CalculatorLayout>
  )
}
