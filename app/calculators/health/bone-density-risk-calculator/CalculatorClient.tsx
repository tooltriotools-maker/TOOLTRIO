'use client'
import { useState, useMemo } from 'react'
import { calculateBoneDensityRisk } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [age, setAge] = useState(55)
  const [gender, setGender] = useState<'male' | 'female'>('female')
  const [bmi, setBmi] = useState(22)
  const [smokingYears, setSmokingYears] = useState(0)
  const [alcoholPerWeek, setAlcoholPerWeek] = useState(4)
  const [familyHistory, setFamilyHistory] = useState(false)
  const [corticosteroids, setCorticosteroids] = useState(false)
  const [calciumIntake, setCalciumIntake] = useState(800)

  const result = useMemo(() => calculateBoneDensityRisk(age, gender, bmi, smokingYears, alcoholPerWeek, familyHistory, corticosteroids, calciumIntake), [age, gender, bmi, smokingYears, alcoholPerWeek, familyHistory, corticosteroids, calciumIntake])
  const riskColor = result.riskCategory === 'High' ? '#ef4444' : result.riskCategory === 'Moderate' ? '#f97316' : '#22c55e'

  return (
    <CalculatorLayout title="Bone Density Risk Calculator" description="Estimate your osteoporosis and low bone density risk based on validated clinical risk factors." icon="🦴" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="bone-density-risk-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Risk Factors</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>{g === 'male' ? '♂ Male' : '♀ Female'}</button>)}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={20} max={100} step={1} suffix="yrs" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={45} step={0.5} suffix="kg/m²" />
            <InputField label="Smoking (years)" value={smokingYears} onChange={setSmokingYears} min={0} max={60} step={1} suffix="yrs" />
            <InputField label="Alcohol (drinks/week)" value={alcoholPerWeek} onChange={setAlcoholPerWeek} min={0} max={50} step={1} suffix="/wk" />
            <InputField label="Calcium Intake" value={calciumIntake} onChange={setCalciumIntake} min={200} max={2000} step={50} suffix="mg/day" />
            <div className="space-y-2 pt-1">
              {[{ label: 'Family history of osteoporosis / hip fracture', val: familyHistory, set: setFamilyHistory }, { label: 'Long-term corticosteroid use (3+ months)', val: corticosteroids, set: setCorticosteroids }].map(({ label, val, set }) => (
                <button key={label} onClick={() => set(!val)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${val ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                  <span className={`w-5 h-5 rounded-full flex-shrink-0 border-2 flex items-center justify-center ${val ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{val ? '✓' : ''}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="Risk Score" value={`${result.score} / ${result.maxScore}`} highlight />
            <ResultCard label="Risk Level" value={result.riskCategory} subValue="" />
            <ResultCard label="Calcium Target" value={`${result.calciumTarget} mg/day`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Risk Gauge</h3>
            <div className="relative h-6 rounded-full overflow-hidden bg-gradient-to-r from-green-400 via-yellow-400 to-red-500">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.riskPct}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Low Risk</span><span>High Risk</span></div>
            <p className="text-center font-black text-2xl mt-2" style={{ color: riskColor }}>{result.riskPct}% risk score</p>
          </Card>
          {result.topFactors.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Your Top Risk Factors</h3>
              <ul className="space-y-1">{result.topFactors.map(f => <li key={f} className="text-sm text-red-600 flex items-center gap-2"><span>⚠️</span>{f}</li>)}</ul>
            </Card>
          )}
          <div className={`rounded-xl p-4 text-sm border ${result.riskCategory === 'High' ? 'bg-red-50 border-red-200 text-red-800' : result.riskCategory === 'Moderate' ? 'bg-orange-50 border-orange-200 text-orange-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <p className="font-bold mb-1">📋 Recommendation</p>
            <p>{result.recommendation}</p>
            <p className="mt-2 text-xs">Vitamin D target: {result.vitaminDTarget} IU/day · Calcium target: {result.calciumTarget} mg/day</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
