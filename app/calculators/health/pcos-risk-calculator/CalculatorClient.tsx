'use client'
import { useState, useMemo } from 'react'
import { calculatePCOSRiskScore } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [cycleLength, setCycleLength] = useState(32)
  const [cycleIrregularity, setCycleIrregularity] = useState(2)
  const [acneScore, setAcneScore] = useState(2)
  const [hirsutismScore, setHirsutismScore] = useState(2)
  const [bmi, setBmi] = useState(27)
  const [fastingInsulin, setFastingInsulin] = useState(12)
  const [familyHistory, setFamilyHistory] = useState(false)
  const [hairLoss, setHairLoss] = useState(1)
  const [ovarianCysts, setOvarianCysts] = useState(false)
  const result = useMemo(() => calculatePCOSRiskScore(cycleLength, cycleIrregularity, acneScore, hirsutismScore, bmi, fastingInsulin, familyHistory, hairLoss, ovarianCysts), [cycleLength, cycleIrregularity, acneScore, hirsutismScore, bmi, fastingInsulin, familyHistory, hairLoss, ovarianCysts])
  const sliders = [
    { label: 'Cycle irregularity (0=regular, 5=very irregular)', value: cycleIrregularity, set: setCycleIrregularity, max: 5 },
    { label: 'Acne severity (0=none, 5=severe)', value: acneScore, set: setAcneScore, max: 5 },
    { label: 'Unwanted hair growth / hirsutism (0–5)', value: hirsutismScore, set: setHirsutismScore, max: 5 },
    { label: 'Hair thinning / loss (0–5)', value: hairLoss, set: setHairLoss, max: 5 },
  ]
  return (
    <CalculatorLayout title="PCOS Risk Score Calculator" description="Assess PCOS likelihood from Rotterdam criteria factors — cycle irregularity, hyperandrogenism, insulin, and ovarian cysts." icon="🌀" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="pcos-risk-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">PCOS Symptom Profile</h2>
          <div className="space-y-3">
            <InputField label="Average cycle length (days)" value={cycleLength} onChange={setCycleLength} min={15} max={90} step={1} suffix="days" />
            {sliders.map(s => (
              <div key={s.label} className="space-y-1">
                <label className="text-xs font-medium text-gray-500">{s.label}: <span className="font-bold text-rose-600">{s.value}</span></label>
                <div className="flex gap-0.5">{[0,1,2,3,4,5].map(n => <button key={n} onClick={() => s.set(n)} className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${s.value === n ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{n}</button>)}</div>
              </div>
            ))}
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={50} step={0.5} suffix="kg/m²" />
            <InputField label="Fasting Insulin (μIU/mL)" value={fastingInsulin} onChange={setFastingInsulin} min={0} max={50} step={0.5} suffix="μIU/mL" />
            {[
              { label: '👨‍👩‍👧 Family history of PCOS', val: familyHistory, set: setFamilyHistory },
              { label: '🔬 Polycystic ovaries on ultrasound', val: ovarianCysts, set: setOvarianCysts },
            ].map(c => (
              <button key={c.label} onClick={() => c.set(!c.val)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${c.val ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${c.val ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{c.val ? '✓' : ''}</span>{c.label}
              </button>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Risk Score" value={`${result.riskPct}%`} highlight />
            <ResultCard label="Likelihood" value={result.category.split(' — ')[0]} />
            <ResultCard label="Insulin Resistance" value={result.insulinResistance.split(' — ')[0]} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">PCOS Risk Gauge</h3>
            <div className="relative h-6 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.riskPct}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Low</span><span>Moderate</span><span>High likelihood</span></div>
            <p className="text-center font-black text-3xl mt-2" style={{ color: result.color }}>{result.riskPct}%</p>
            <p className="text-center text-sm font-semibold mt-0.5" style={{ color: result.color }}>{result.category}</p>
          </Card>
          {result.investigations.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Suggested Investigations</h3>
              <ul className="space-y-1">{result.investigations.map(i => <li key={i} className="text-sm text-gray-700 flex items-center gap-2"><span className="text-blue-500">•</span>{i}</li>)}</ul>
            </Card>
          )}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-bold mb-1">📋 Rotterdam Criteria Note</p>
            <p className="text-xs">{result.roterdamCriteriaNote}</p>
            {result.fertilityNote && <p className="text-xs mt-2 font-semibold text-rose-700">{result.fertilityNote}</p>}
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
