'use client'
import { useState, useMemo } from 'react'
import { calculateCardiacOutputEstimate } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [heartRate, setHeartRate] = useState(68)
  const [strokeVolume, setStrokeVolume] = useState(72)
  const [systolicBP, setSystolicBP] = useState(120)
  const [diastolicBP, setDiastolicBP] = useState(78)
  const [age, setAge] = useState(42)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const result = useMemo(() => calculateCardiacOutputEstimate(heartRate, strokeVolume, systolicBP, diastolicBP, age, gender), [heartRate, strokeVolume, systolicBP, diastolicBP, age, gender])
  return (
    <CalculatorLayout title="Cardiac Output Estimate Calculator" description="Estimate cardiac output, cardiac index, MAP, and SVR from heart rate, stroke volume, and blood pressure." icon="🫀" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="cardiac-output-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Cardiac Parameters</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male','female'] as const).map(g => <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>{g === 'male' ? '♂ Male' : '♀ Female'}</button>)}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            <InputField label="Heart Rate" value={heartRate} onChange={setHeartRate} min={30} max={200} step={1} suffix="bpm" />
            <InputField label="Stroke Volume (est.)" value={strokeVolume} onChange={setStrokeVolume} min={20} max={200} step={1} suffix="mL/beat" />
            <InputField label="Systolic BP" value={systolicBP} onChange={setSystolicBP} min={70} max={220} step={1} suffix="mmHg" />
            <InputField label="Diastolic BP" value={diastolicBP} onChange={setDiastolicBP} min={40} max={140} step={1} suffix="mmHg" />
            <p className="text-xs text-gray-400 bg-gray-50 p-3 rounded-xl">Normal stroke volume at rest: 60-100 mL/beat. Use 70 mL if unknown.</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Cardiac Output" value={`${result.cardiacOutput} L/min`} highlight />
            <ResultCard label="Cardiac Index" value={`${result.cardiacIndex} L/min/m²`} />
            <ResultCard label="MAP" value={`${result.mapBP} mmHg`} subValue="mean arterial pressure" />
            <ResultCard label="Status" value={result.status} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Haemodynamic Parameters</h3>
            <div className="space-y-3 text-sm">
              {[
                { label: 'Cardiac Output', value: `${result.cardiacOutput} L/min`, normal: '4–8 L/min', good: result.cardiacOutput >= 4 && result.cardiacOutput <= 8 },
                { label: 'Cardiac Index', value: `${result.cardiacIndex} L/min/m²`, normal: '2.5–4.0 L/min/m²', good: result.cardiacIndex >= 2.5 && result.cardiacIndex <= 4.0 },
                { label: 'Mean Arterial Pressure', value: `${result.mapBP} mmHg`, normal: '70–100 mmHg', good: result.mapBP >= 70 && result.mapBP <= 100 },
                { label: 'Systemic Vascular Resistance', value: `${result.svr} dyn·s/cm⁵`, normal: '800–1200 dyn·s/cm⁵', good: result.svr >= 800 && result.svr <= 1200 },
                { label: 'Heart Workload (RPP)', value: `${result.heartWorkload} ×100`, normal: '< 120 at rest', good: result.heartWorkload < 120 },
                { label: 'O₂ Delivery Estimate', value: `${result.oxygenDelivery} mL O₂/min`, normal: '~900-1100 mL/min', good: result.oxygenDelivery >= 700 },
              ].map(row => (
                <div key={row.label} className="flex items-center justify-between gap-4">
                  <span className="text-gray-500 flex-shrink-0">{row.label}</span>
                  <span className={`font-bold ${row.good ? 'text-green-600' : 'text-orange-500'}`}>{row.value}</span>
                  <span className="text-xs text-gray-300 flex-shrink-0">{row.normal}</span>
                </div>
              ))}
            </div>
          </Card>
          <div className={`rounded-xl p-4 text-sm border ${result.color === '#22c55e' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-orange-50 border-orange-200 text-orange-800'}`}>
            <p className="font-bold mb-1">🫀 {result.status}</p>
            <p className="text-xs">Normal CO range: {result.normalRange}. Age-adjusted stroke volume estimate: {result.ageAdjStrokeVolume} mL/beat.</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
