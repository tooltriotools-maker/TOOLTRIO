'use client'
import { useState, useMemo } from 'react'
import { calculateLongevityRiskIndex } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
const auditFaqs = [
  {"question": "What should I check before using the Longevity Risk Calculator?", "answer": "Check Age, BMI, Systolic BP, Smoking (pack-years), Exercise (hrs/week), Sleep (hrs/night) and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Longevity Risk Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculator output for informational use and is not a diagnosis or a substitute for evaluation by a qualified healthcare professional."},
  {"question": "How can I compare different Longevity Risk Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. Comparing results this way makes it easier to see which input is responsible for the difference."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [age, setAge] = useState(45)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [bmi, setBmi] = useState(25)
  const [systolicBP, setSystolicBP] = useState(125)
  const [smokingYears, setSmokingYears] = useState(0)
  const [exerciseHrs, setExerciseHrs] = useState(4)
  const [sleepHrs, setSleepHrs] = useState(7.5)
  const [vegServings, setVegServings] = useState(4)
  const [alcoholPerWeek, setAlcoholPerWeek] = useState(5)
  const [familyHistory, setFamilyHistory] = useState(false)
  const [chronicDiseases, setChronicDiseases] = useState(0)
  const [stressLevel, setStressLevel] = useState(5)
  const [socialConnection, setSocialConnection] = useState(7)
  const result = useMemo(() => calculateLongevityRiskIndex(age, gender, bmi, systolicBP, smokingYears, exerciseHrs, sleepHrs, vegServings, alcoholPerWeek, familyHistory, chronicDiseases, stressLevel, socialConnection), [age, gender, bmi, systolicBP, smokingYears, exerciseHrs, sleepHrs, vegServings, alcoholPerWeek, familyHistory, chronicDiseases, stressLevel, socialConnection])
  return (
    <CalculatorLayout title="Longevity Risk Index Calculator" description="Project your life expectancy from 13 validated lifestyle and health factors including exercise, sleep, diet, and social connection." icon="♾️" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="longevity-risk-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Health Profile</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male','female'] as const).map(g => <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>{g === 'male' ? '♂ Male' : '♀ Female'}</button>)}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={20} max={90} step={1} suffix="yrs" />
            <InputField label="BMI" value={bmi} onChange={setBmi} min={15} max={50} step={0.5} suffix="kg/m²" />
            <InputField label="Systolic BP" value={systolicBP} onChange={setSystolicBP} min={90} max={200} step={1} suffix="mmHg" />
            <InputField label="Smoking (pack-years)" value={smokingYears} onChange={setSmokingYears} min={0} max={60} step={1} suffix="pk-yrs" />
            <InputField label="Exercise (hrs/week)" value={exerciseHrs} onChange={setExerciseHrs} min={0} max={20} step={0.5} suffix="hrs/wk" />
            <InputField label="Sleep (hrs/night)" value={sleepHrs} onChange={setSleepHrs} min={3} max={12} step={0.5} suffix="hrs" />
            <InputField label="Veg/Fruit (servings/day)" value={vegServings} onChange={setVegServings} min={0} max={15} step={0.5} suffix="/day" />
            <InputField label="Alcohol (drinks/week)" value={alcoholPerWeek} onChange={setAlcoholPerWeek} min={0} max={50} step={1} suffix="/wk" />
            <InputField label="Chronic diseases (count)" value={chronicDiseases} onChange={setChronicDiseases} min={0} max={6} step={1} suffix="" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Stress level: <span className="font-bold text-rose-600">{stressLevel}</span></label>
              <input type="range" min={0} max={10} step={1} value={stressLevel} onChange={e => setStressLevel(Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Social connection (0–10): <span className="font-bold text-rose-600">{socialConnection}</span></label>
              <input type="range" min={0} max={10} step={1} value={socialConnection} onChange={e => setSocialConnection(Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
            <button onClick={() => setFamilyHistory(!familyHistory)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${familyHistory ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${familyHistory ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{familyHistory ? '✓' : ''}</span>
              Family history of early death (&lt;70)
            </button>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Projected LE" value={`${result.projectedLE} yrs`} highlight />
            <ResultCard label="Years Remaining" value={`${result.yearsRemaining} yrs`} />
            <ResultCard label="Healthy Years" value={`~${result.healthyYears} yrs`} subValue="quality years" />
            <ResultCard label="Adjustment" value={`${result.leAdjust > 0 ? '+' : ''}${result.leAdjust} yrs`} subValue="vs population" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Life Expectancy Comparison</h3>
            <div className="flex items-end justify-center gap-8 py-4">
              <div className="text-center"><div className="text-3xl font-black text-gray-200">{result.baseLE}</div><div className="text-xs text-gray-400">Population Average</div></div>
              <div className="text-2xl" style={{ color: result.color }}>{result.leAdjust > 0 ? '▲' : result.leAdjust < 0 ? '▼' : '='}</div>
              <div className="text-center"><div className="text-5xl font-black" style={{ color: result.color }}>{result.projectedLE}</div><div className="text-xs text-gray-400">Your Projection</div></div>
            </div>
          </Card>
          {result.topGains.length > 0 && (
            <Card>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Top Longevity Gains Available</h3>
              <ul className="space-y-1">{result.topGains.map(g => <li key={g} className="text-sm text-green-700 flex items-center gap-2"><span>🔼</span>{g}</li>)}</ul>
            </Card>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to interpret this longevity risk calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This tool uses Age, BMI, Systolic BP, Smoking (pack-years), Exercise (hrs/week), Sleep (hrs/night), Veg/Fruit (servings/day) to calculate the displayed result. The output reflects the formula implemented on this page and the values you enter.</p>
            <p>For scenario comparisons, change one input at a time. This helps separate the effect of that assumption from other inputs and avoids treating a model result as a guaranteed real-world outcome.</p>
            <p>Review the units, measurement method, time period, and any eligibility or real-world factors that are not represented by the inputs before using the result for a decision.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this section documents how to use the calculator and does not alter its underlying formula.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={auditFaqs} /></div>
    </CalculatorLayout>
  )
}
