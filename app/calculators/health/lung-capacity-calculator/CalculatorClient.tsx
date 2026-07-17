'use client'
import { useState, useMemo } from 'react'
import { calculateLungCapacity } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [age, setAge] = useState(45)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [heightCm, setHeightCm] = useState(175)
  const [measuredFVC, setMeasuredFVC] = useState(4.2)
  const [measuredFEV1, setMeasuredFEV1] = useState(3.4)
  const [packYears, setPackYears] = useState(0)

  const result = useMemo(() => calculateLungCapacity(age, gender, heightCm, measuredFVC, measuredFEV1, packYears), [age, gender, heightCm, measuredFVC, measuredFEV1, packYears])

  return (
    <CalculatorLayout title="Lung Capacity Calculator" description="Compare your measured FVC and FEV1 to predicted values and identify obstructive or restrictive spirometry patterns." icon="🫁" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="lung-capacity-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Spirometry Values</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            <InputField label="Height" value={heightCm} onChange={setHeightCm} min={140} max={220} step={1} suffix="cm" />
            <InputField label="Measured FVC (L)" value={measuredFVC} onChange={setMeasuredFVC} min={0.5} max={8} step={0.1} suffix="L" />
            <InputField label="Measured FEV1 (L)" value={measuredFEV1} onChange={setMeasuredFEV1} min={0.3} max={7} step={0.1} suffix="L" />
            <InputField label="Smoking Pack-Years" value={packYears} onChange={setPackYears} min={0} max={100} step={1} suffix="pk-yrs" />
            <div className="p-3 bg-gray-50 rounded-xl text-xs text-gray-500">
              <p>Pack-years = (cigarettes/day ÷ 20) × years smoked</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="FVC %" value={`${result.fvcPct}%`} highlight />
            <ResultCard label="FEV1 %" value={`${result.fev1Pct}%`} />
            <ResultCard label="FEV1/FVC" value={`${result.fev1FvcRatio}%`} subValue="< 70% = obstruction" />
            <ResultCard label="Pattern" value={result.severity} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Measured vs Predicted</h3>
            <div className="space-y-4">
              {[
                { label: 'FVC', measured: measuredFVC, predicted: result.predictedFVC, pct: result.fvcPct },
                { label: 'FEV1', measured: measuredFEV1, predicted: result.predictedFEV1, pct: result.fev1Pct },
              ].map(m => (
                <div key={m.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-semibold text-gray-700">{m.label}</span>
                    <span className="text-gray-500">{m.measured}L / {m.predicted}L predicted ({m.pct}%)</span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, m.pct)}%`, background: m.pct >= 80 ? '#22c55e' : m.pct >= 70 ? '#eab308' : '#ef4444' }} />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-0.5"><span>0%</span><span>80% threshold</span><span>100%</span></div>
                </div>
              ))}
            </div>
          </Card>
          <div className={`rounded-xl p-4 text-sm border ${result.color === '#22c55e' ? 'bg-green-50 border-green-200 text-green-800' : result.color === '#f97316' ? 'bg-orange-50 border-orange-200 text-orange-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <p className="font-bold mb-1">🫁 Pattern: {result.pattern}</p>
            <p className="text-xs mt-1">{result.copd_risk}</p>
            {packYears > 10 && <p className="text-xs mt-1 font-semibold">⚠️ {packYears} pack-years: Consider regular spirometry screening (GOLD guidelines recommend if age &gt;40 with ≥10 pack-years and any symptom)</p>}
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
