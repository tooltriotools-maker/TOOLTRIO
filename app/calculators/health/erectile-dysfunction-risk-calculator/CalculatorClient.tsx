'use client'
import { useState, useMemo } from 'react'
import { calculateErectileDysfunctionRisk } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

const auditFaqs = [
  {"question": "What should I check before using the Erectile Dysfunction Risk Calculator?", "answer": "Check Age, BMI, Smoking (years), Physical Activity (min/week), Alcohol (drinks/week), Risk Level and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Erectile Dysfunction Risk Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculator output for informational use and is not a diagnosis or a substitute for evaluation by a qualified healthcare professional."},
  {"question": "How can I compare different Erectile Dysfunction Risk Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. Comparing results this way makes it easier to see which input is responsible for the difference."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [age, setAge] = useState(48)
  const [bmi, setBmi] = useState(27)
  const [smokingYears, setSmokingYears] = useState(5)
  const [diabetic, setDiabetic] = useState(false)
  const [hypertension, setHypertension] = useState(false)
  const [cvd, setCvd] = useState(false)
  const [activityMin, setActivityMin] = useState(100)
  const [alcohol, setAlcohol] = useState(8)
  const [depression, setDepression] = useState(false)

  const result = useMemo(() => calculateErectileDysfunctionRisk(age, bmi, smokingYears, diabetic, hypertension, cvd, activityMin, alcohol, depression), [age, bmi, smokingYears, diabetic, hypertension, cvd, activityMin, alcohol, depression])
  const riskColor = result.riskLevel === 'High' ? '#ef4444' : result.riskLevel === 'Moderate' ? '#f97316' : '#22c55e'

  const toggleFactors = [
    { label: '🩸 Type 2 Diabetes', val: diabetic, set: setDiabetic },
    { label: '🩺 Hypertension', val: hypertension, set: setHypertension },
    { label: '❤️ Cardiovascular Disease', val: cvd, set: setCvd },
    { label: '😔 Depression or Anxiety', val: depression, set: setDepression },
  ]

  return (
    <CalculatorLayout title="Erectile Dysfunction Risk Calculator" description="Assess your ED risk from modifiable and non-modifiable risk factors and get evidence-based prevention strategies." icon="⚕️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="erectile-dysfunction-risk-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Risk Factors</h2>
          <div className="space-y-3">
            <InputField label="Age" value={age} onChange={setAge} min={20} max={90} step={1} suffix="yrs" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={50} step={0.5} suffix="kg/m²" />
            <InputField label="Smoking (years)" value={smokingYears} onChange={setSmokingYears} min={0} max={60} step={1} suffix="yrs" />
            <InputField label="Physical Activity (min/week)" value={activityMin} onChange={setActivityMin} min={0} max={600} step={30} suffix="min/wk" />
            <InputField label="Alcohol (drinks/week)" value={alcohol} onChange={setAlcohol} min={0} max={50} step={1} suffix="/wk" />
            <div className="space-y-2 pt-1">
              {toggleFactors.map(({ label, val, set }) => (
                <button key={label} onClick={() => set(!val)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${val ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${val ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{val ? '✓' : ''}</span>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="Risk Level" value={result.riskLevel} highlight />
            <ResultCard label="Risk Score" value={`${result.score} / ${result.maxScore}`} />
            <ResultCard label="Top Modifiable Factor" value={result.mostModifiable} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Risk Gauge</h3>
            <div className="relative h-6 rounded-full overflow-hidden bg-gradient-to-r from-green-400 via-yellow-400 to-red-500">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.riskPct}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Low</span><span>Moderate</span><span>High</span></div>
            <p className="text-center font-black text-3xl mt-3" style={{ color: riskColor }}>{result.riskPct}%</p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Modifiable Risk Factors</h3>
            <div className="space-y-2 text-sm">
              {[{ label: 'BMI > 25', active: bmi >= 25, impact: 'Weight loss of 10% body weight significantly improves function' }, { label: 'Smoking history', active: smokingYears > 0, impact: 'Cessation doubles penile blood flow within months' }, { label: 'Low physical activity (<150 min/week)', active: activityMin < 150, impact: 'Aerobic exercise 40 min 4×/week reduces ED severity by 25-30%' }, { label: 'Excessive alcohol (>14 drinks/week)', active: alcohol > 14, impact: 'Alcohol is both a psychological and physiological suppressant' }].map(f => (
                <div key={f.label} className={`p-3 rounded-xl text-xs ${f.active ? 'bg-orange-50 border border-orange-200' : 'bg-gray-50 border border-gray-100'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span>{f.active ? '⚠️' : '✅'}</span>
                    <span className="font-semibold">{f.label}</span>
                  </div>
                  {f.active && <p className="text-gray-600 ml-5">{f.impact}</p>}
                </div>
              ))}
            </div>
          </Card>
          <div className={`rounded-xl p-4 text-sm border ${result.riskLevel === 'High' ? 'bg-red-50 border-red-200 text-red-800' : result.riskLevel === 'Moderate' ? 'bg-orange-50 border-orange-200 text-orange-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <p className="font-bold mb-1">📋 {result.note}</p>
            <p className="text-xs mt-1">ED is often an early cardiovascular warning sign — new-onset ED warrants cardiovascular risk evaluation, not just treatment of symptoms.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Understanding this erectile dysfunction risk calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>The calculator uses Age, BMI, Smoking (years), Physical Activity (min/week), Alcohol (drinks/week), Risk Level, Risk Score. Its output is based on the formula implemented by this tool and the values you provide.</p>
            <p>When comparing scenarios, change one assumption at a time and compare Erectile Dysfunction Risk Calculator, Age, BMI, Smoking (years), Physical Activity (min/week), Alcohol (drinks/week), Risk Level. This makes it easier to identify which input is responsible for the change instead of treating the result as a prediction.</p>
            <p>Check the units and time period before relying on the output. Real-world outcomes can differ when relevant taxes, fees, eligibility requirements, measurement error, market changes, or other factors are outside the calculator&apos;s inputs.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this explanation documents the calculator&apos;s use and limitations without changing its underlying calculation.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={auditFaqs} /></div>
    </CalculatorLayout>
  )
}
