'use client'
import { useState, useMemo } from 'react'
import { calculateObesityComorbidityRisk } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
const auditFaqs = [
  {"question": "What should I check before using the Obesity Comorbidity Calculator?", "answer": "Check Age, BMI, Waist Circumference, Systolic BP, Fasting Glucose, Triglycerides and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Obesity Comorbidity Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculator output for informational use and is not a diagnosis or a substitute for evaluation by a qualified healthcare professional."},
  {"question": "How can I compare different Obesity Comorbidity Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. Comparing results this way makes it easier to see which input is responsible for the difference."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [bmi, setBmi] = useState(31)
  const [waistCm, setWaistCm] = useState(98)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [age, setAge] = useState(48)
  const [systolicBP, setSystolicBP] = useState(132)
  const [fastingGlucose, setFastingGlucose] = useState(108)
  const [triglycerides, setTriglycerides] = useState(165)
  const [hdl, setHdl] = useState(38)
  const result = useMemo(() => calculateObesityComorbidityRisk(bmi, waistCm, gender, age, systolicBP, fastingGlucose, triglycerides, hdl), [bmi, waistCm, gender, age, systolicBP, fastingGlucose, triglycerides, hdl])
  return (
    <CalculatorLayout title="Obesity Comorbidity Risk Calculator" description="Calculate metabolic syndrome components, T2D risk, NAFLD, and sleep apnoea risk from your metabolic profile." icon="⚖️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="obesity-comorbidity-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Metabolic Profile</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male','female'] as const).map(g => <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>{g === 'male' ? '♂ Male' : '♀ Female'}</button>)}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={60} step={0.5} suffix="kg/m²" />
            <InputField label="Waist Circumference" value={waistCm} onChange={setWaistCm} min={50} max={180} step={1} suffix="cm" />
            <InputField label="Systolic BP" value={systolicBP} onChange={setSystolicBP} min={90} max={200} step={1} suffix="mmHg" />
            <InputField label="Fasting Glucose" value={fastingGlucose} onChange={setFastingGlucose} min={60} max={300} step={1} suffix="mg/dL" />
            <InputField label="Triglycerides" value={triglycerides} onChange={setTriglycerides} min={50} max={1000} step={5} suffix="mg/dL" />
            <InputField label="HDL Cholesterol" value={hdl} onChange={setHdl} min={20} max={120} step={1} suffix="mg/dL" />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Overall Risk" value={result.overallRisk} highlight />
            <ResultCard label="BMI Category" value={result.bmiCategory} />
            <ResultCard label="Metabolic Syndrome" value={result.hasMetSyn ? `Yes (${result.metSynComponents}/5)` : `No (${result.metSynComponents}/5)`} />
            <ResultCard label="T2D Risk" value={result.t2dRisk.split(' — ')[0]} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Comorbidity Risk Profile</h3>
            <div className="space-y-2 text-sm">
              {[{l:'NAFLD Risk',v:result.nafldRisk},{l:'Sleep Apnoea Risk',v:result.apneaRisk},{l:'T2D Risk',v:result.t2dRisk}].map(r => (
                <div key={r.l} className="flex justify-between items-center gap-4"><span className="text-gray-500">{r.l}</span><span className={`font-bold text-right ${r.v.startsWith('High') ? 'text-red-600' : r.v.startsWith('Moderate') ? 'text-orange-500' : 'text-green-600'}`}>{r.v}</span></div>
              ))}
            </div>
          </Card>
          <div className={`rounded-xl p-4 text-sm border ${result.color === '#dc2626' || result.color === '#ef4444' ? 'bg-red-50 border-red-200 text-red-800' : result.color === '#f97316' ? 'bg-orange-50 border-orange-200 text-orange-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <p className="font-bold mb-1">🎯 Weight Loss Target</p>
            <p>{result.weightLossTarget}</p>
            {result.metformConsider && <p className="text-xs mt-2 font-semibold">{result.metformConsider}</p>}
          </div>
        </div>
      </div>
      
      <div className="mt-8 space-y-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-2">How This Screening Calculator Works</h2>
          <p className="text-sm text-gray-600">This tool combines the values you enter for BMI, waist circumference, systolic blood pressure, fasting glucose, triglycerides and HDL cholesterol. It flags patterns used by the calculator to summarize metabolic risk. BMI is weight relative to height; it does not directly measure body fat or diagnose a disease.</p>
          <p className="text-sm text-gray-600 mt-2"><strong>Important:</strong> the overall risk label, diabetes/NAFLD/sleep-apnoea flags and any combined score shown here are ToolTrio screening heuristics, not validated diagnostic or prediction models.</p>
        </Card>
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Understanding the Inputs and Results</h2>
          <p className="text-sm text-gray-600">Enter recent measured values rather than guesses where possible. BMI of 30 or greater falls in the CDC adult obesity category. Waist size, blood pressure, glucose, triglycerides and HDL add information that BMI alone cannot provide. A flagged result means the entered values crossed this calculator's screening threshold; it does not establish that you have diabetes, fatty-liver disease, sleep apnoea or metabolic syndrome.</p>
        </Card>
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Worked Example</h2>
          <p className="text-sm text-gray-600">For an adult entering BMI 31, waist 98 cm, systolic pressure 132 mmHg, fasting glucose 108 mg/dL, triglycerides 165 mg/dL and HDL 38 mg/dL, several entered markers are outside commonly used screening ranges. The useful interpretation is to identify which inputs triggered flags and discuss confirmed measurements with a clinician—not to treat the combined label as a diagnosis.</p>
        </Card>
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-2">Limitations and Sources</h2>
          <p className="text-sm text-gray-600">BMI can misclassify people because it does not distinguish fat, muscle and bone or show fat distribution. Medical history, medications, laboratory confirmation, symptoms and physical examination can materially change clinical interpretation. This calculator is for adults and is not a substitute for medical care.</p>
          <p className="text-sm mt-2"><a className="text-blue-600 underline" href="https://www.cdc.gov/bmi/about/index.html" target="_blank" rel="noreferrer">CDC: About BMI</a> · <a className="text-blue-600 underline" href="https://www.cdc.gov/bmi/adult-calculator/bmi-categories.html" target="_blank" rel="noreferrer">CDC: Adult BMI categories</a></p>
        </Card>
      </div>

      <div className="mt-6"><FAQSection faqs={auditFaqs} /></div>
    </CalculatorLayout>
  )
}
