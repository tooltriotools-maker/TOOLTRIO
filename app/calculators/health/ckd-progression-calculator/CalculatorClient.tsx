'use client'
import { useState, useMemo } from 'react'
import { calculateChronicKidneyDiseaseProgression } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
const auditFaqs = [
  {"question": "What should I check before using the Ckd Progression Calculator?", "answer": "Check Current eGFR, Annual eGFR Change (negative = declining), Urine Protein, Systolic BP, Risk Category, Risk Score and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Ckd Progression Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculator output for informational use and is not a diagnosis or a substitute for evaluation by a qualified healthcare professional."},
  {"question": "How can I compare different Ckd Progression Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. Comparing results this way makes it easier to see which input is responsible for the difference."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [eGFR, setEGFR] = useState(42)
  const [eGFRChange, setEGFRChange] = useState(-3)
  const [proteinuria, setProteinuria] = useState(150)
  const [systolicBP, setSystolicBP] = useState(138)
  const [diabetic, setDiabetic] = useState(false)
  const [smoking, setSmoking] = useState(false)
  const result = useMemo(() => calculateChronicKidneyDiseaseProgression(eGFR, eGFRChange, proteinuria, systolicBP, diabetic, smoking), [eGFR, eGFRChange, proteinuria, systolicBP, diabetic, smoking])
  return (
    <CalculatorLayout title="CKD Progression Risk Calculator" description="Estimate kidney disease progression rate, years to dialysis, and risk category from eGFR trend and clinical factors." icon="🫘" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="ckd-progression-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Kidney Function</h2>
          <div className="space-y-3">
            <InputField label="Current eGFR" value={eGFR} onChange={setEGFR} min={5} max={120} step={1} suffix="mL/min" />
            <InputField label="Annual eGFR Change (negative = declining)" value={eGFRChange} onChange={setEGFRChange} min={-20} max={5} step={0.5} suffix="mL/min/yr" />
            <InputField label="Urine Protein" value={proteinuria} onChange={setProteinuria} min={0} max={3000} step={10} suffix="mg/day" />
            <InputField label="Systolic BP" value={systolicBP} onChange={setSystolicBP} min={90} max={200} step={1} suffix="mmHg" />
            {[{ label: '🩸 Diabetes', val: diabetic, set: setDiabetic }, { label: '🚬 Smoking', val: smoking, set: setSmoking }].map(c => (
              <button key={c.label} onClick={() => c.set(!c.val)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${c.val ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${c.val ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{c.val ? '✓' : ''}</span>{c.label}
              </button>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Risk Category" value={result.riskCategory} highlight />
            <ResultCard label="Risk Score" value={`${result.kidneyRiskScore}/100`} />
            <ResultCard label="Years to Dialysis" value={result.yearsToDialysis} />
            <ResultCard label="BP Target" value={result.bpTarget} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Progression Gauge</h3>
            <div className="relative h-6 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg" style={{ left: `${result.kidneyRiskScore}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Low</span><span>Moderate</span><span>Very High</span></div>
            <p className="text-center font-black text-2xl mt-2" style={{ color: result.color }}>{result.riskCategory}</p>
            <p className="text-sm text-center text-gray-500 mt-1">Proteinuria: {result.proteinuriaRisk}</p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Key Interventions</h3>
            <ul className="space-y-1">{result.keyInterventions.map(i => <li key={i} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-green-500 flex-shrink-0">✓</span>{i}</li>)}</ul>
          </Card>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Calculator-specific methodology</h2>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">CKD progression: important limitations</h3>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>Kidney-disease progression cannot be predicted reliably from a single eGFR value. Modern CKD risk assessment considers eGFR trend, urine albumin-to-creatinine ratio (ACR), age, diabetes, blood pressure, medications, acute kidney injury, and other clinical factors.</p>
            <p>Any 'years to dialysis' result on this page is therefore a scenario estimate, not a clinical forecast. eGFR decline is often non-linear and can stabilize, accelerate, or temporarily worsen.</p>
            <p>Use serial laboratory results and clinician assessment for CKD staging and prognosis. Medication changes—especially ACE inhibitors, ARBs, SGLT2 inhibitors, diuretics, or NSAIDs—should not be made from this calculator.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Clinical reference: KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of CKD.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={auditFaqs} /></div>
    </CalculatorLayout>
  )
}
