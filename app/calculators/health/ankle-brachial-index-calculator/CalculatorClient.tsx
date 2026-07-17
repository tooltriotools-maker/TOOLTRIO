'use client'
import { useState, useMemo } from 'react'
import { calculateAnkleBrachialIndex } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [ankleSystolic, setAnkleSystolic] = useState(120)
  const [armSystolic, setArmSystolic] = useState(130)

  const result = useMemo(() => calculateAnkleBrachialIndex(ankleSystolic, armSystolic), [ankleSystolic, armSystolic])

  const categories = [
    { label: 'Critical PAD', range: '< 0.40', color: '#dc2626' },
    { label: 'Moderate PAD', range: '0.40–0.69', color: '#ef4444' },
    { label: 'Mild PAD', range: '0.70–0.89', color: '#f97316' },
    { label: 'Normal', range: '0.90–1.30', color: '#22c55e' },
    { label: 'Non-compressible', range: '> 1.30', color: '#8b5cf6' },
  ]

  return (
    <CalculatorLayout title="Ankle-Brachial Index (ABI) Calculator" description="Calculate your ABI score to assess peripheral artery disease risk and cardiovascular health." icon="🦵" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="ankle-brachial-index-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Blood Pressure Readings</h2>
          <div className="space-y-4">
            <InputField label="Ankle Systolic Pressure (mmHg)" value={ankleSystolic} onChange={setAnkleSystolic} min={50} max={250} step={1} suffix="mmHg" />
            <InputField label="Arm Systolic Pressure (mmHg)" value={armSystolic} onChange={setArmSystolic} min={50} max={250} step={1} suffix="mmHg" />
            <div className="mt-4 p-4 rounded-xl border" style={{ background: result.color + '15', borderColor: result.color + '40' }}>
              <p className="text-xs text-gray-500 mb-1">Your ABI Score</p>
              <p className="text-4xl font-black" style={{ color: result.color }}>{result.abi}</p>
              <p className="text-sm font-semibold mt-1" style={{ color: result.color }}>{result.category}</p>
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="ABI Score" value={result.abi.toString()} highlight />
            <ResultCard label="Category" value={result.category} subValue="" />
            <ResultCard label="Walking Impact" value={result.walkingImpact.split(' — ')[0] || result.walkingImpact} />
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">ABI Reference Ranges</h3>
            <div className="space-y-2">
              {categories.map(cat => (
                <div key={cat.label} className={`flex items-center justify-between p-3 rounded-xl border ${result.category === cat.label ? 'border-2' : 'border'}`} style={{ borderColor: result.category === cat.label ? cat.color : '#e5e7eb', background: result.category === cat.label ? cat.color + '15' : 'transparent' }}>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: cat.color }} />
                    <span className="text-sm font-semibold text-gray-800">{cat.label}</span>
                  </div>
                  <span className="text-xs font-mono text-gray-500">{cat.range}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Risk Assessment</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-gray-500">Cardiovascular Risk</span><span className="font-bold text-gray-800">{result.cardiovascularRisk}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Walking Impact</span><span className="font-bold text-gray-800">{result.walkingImpact}</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Ankle Pressure</span><span className="font-bold">{result.ankleSystolic} mmHg</span></div>
              <div className="flex justify-between text-sm"><span className="text-gray-500">Arm Pressure</span><span className="font-bold">{result.armSystolic} mmHg</span></div>
            </div>
          </Card>

          <div className={`rounded-xl p-4 text-sm border ${result.abi < 0.9 ? 'bg-red-50 border-red-200 text-red-800' : result.abi > 1.30 ? 'bg-purple-50 border-purple-200 text-purple-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <p className="font-bold mb-1">{result.risk}</p>
            {result.abi < 0.9 && <p className="text-xs mt-1">An ABI below 0.90 is diagnostic of peripheral artery disease. Consult your physician — lifestyle modification and vascular evaluation are indicated.</p>}
            {result.abi > 1.30 && <p className="text-xs mt-1">A very high ABI suggests arterial calcification (common in diabetes/CKD). Toe-brachial index (TBI) testing is recommended for accurate assessment.</p>}
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
