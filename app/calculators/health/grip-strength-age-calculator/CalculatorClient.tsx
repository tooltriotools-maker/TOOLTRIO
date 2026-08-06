'use client'
import { useState, useMemo } from 'react'
import { calculateHandGripStrengthAge } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

const auditFaqs = [
  {"question": "What should I check before using the Grip Strength Age Calculator?", "answer": "Check Age, Percentile, Category, Age Group Avg, Z-Score and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Grip Strength Age Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculator output for informational use and is not a diagnosis or a substitute for evaluation by a qualified healthcare professional."},
  {"question": "How can I compare different Grip Strength Age Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. Comparing results this way makes it easier to see which input is responsible for the difference."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [measuredGrip, setMeasuredGrip] = useState(95)
  const [age, setAge] = useState(45)
  const [gender, setGender] = useState<'male' | 'female'>('male')
  const [unit, setUnit] = useState<'kg' | 'lbs'>('lbs')

  const result = useMemo(() => calculateHandGripStrengthAge(measuredGrip, age, gender, unit), [measuredGrip, age, gender, unit])

  const pctColor = result.percentile >= 70 ? '#22c55e' : result.percentile >= 40 ? '#eab308' : result.percentile >= 20 ? '#f97316' : '#ef4444'

  return (
    <CalculatorLayout title="Grip Strength Age Percentile Calculator" description="Find your grip strength percentile by age and gender — a validated predictor of longevity and all-cause mortality." icon="✊" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="grip-strength-age-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Your Measurement</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male', 'female'] as const).map(g => (
                <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>
                  {g === 'male' ? '♂ Male' : '♀ Female'}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['lbs', 'kg'] as const).map(u => (
                <button key={u} onClick={() => setUnit(u)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${unit === u ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>{u}</button>
              ))}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={18} max={90} step={1} suffix="yrs" />
            <InputField label={`Grip Strength (${unit})`} value={measuredGrip} onChange={setMeasuredGrip} min={unit === 'lbs' ? 10 : 5} max={unit === 'lbs' ? 250 : 110} step={1} suffix={unit} />
            <div className="p-4 rounded-xl border text-center" style={{ background: result.color + '15', borderColor: result.color + '40' }}>
              <p className="text-xs text-gray-500 mb-1">Your Grip ({result.gripKg} kg / {result.gripLbs} lbs)</p>
              <p className="text-4xl font-black" style={{ color: result.color }}>{result.percentile}th</p>
              <p className="text-sm font-semibold" style={{ color: result.color }}>percentile</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Percentile" value={`${result.percentile}th`} highlight />
            <ResultCard label="Category" value={result.category} />
            <ResultCard label="Age Group Avg" value={`${result.meanForAge} kg`} subValue={result.ageGroup} />
            <ResultCard label="Z-Score" value={result.zScore.toString()} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Percentile Bar</h3>
            <div className="relative h-8 bg-gradient-to-r from-red-500 via-yellow-400 to-green-500 rounded-full overflow-hidden">
              <div className="absolute top-1 h-6 w-2 bg-white rounded-full shadow-lg transition-all" style={{ left: `${Math.min(98, result.percentile)}%`, transform: 'translateX(-50%)' }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Weak</span><span>Average (50th)</span><span>Strong</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Your grip</span><span className="font-bold">{result.gripKg} kg ({result.gripLbs} lbs)</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Age-group average</span><span className="font-bold">{result.meanForAge} kg</span></div>
            </div>
          </Card>
          <div className={`rounded-xl p-4 text-sm border ${result.mortalityNote.startsWith('⚠️') ? 'bg-red-50 border-red-200 text-red-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <p className="font-bold mb-1">🔬 Mortality Research Finding</p>
            <p>{result.mortalityNote}</p>
            <p className="mt-2 text-xs">Source: Lancet study of 140,000 people across 17 countries (Leong et al., 2015)</p>
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">How to Improve Grip Strength</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              {['Dead hangs: 3 × 30–60 sec from a pull-up bar', 'Farmer carries: walk 40m with heavy dumbbells at sides', 'Heavy pulling movements: deadlifts, rows, pull-ups', 'Hand gripper: 3 × 15 reps daily, progressive resistance', 'Plate pinches and towel pull-ups for variety'].map(t => (
                <li key={t} className="flex items-start gap-2"><span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>{t}</li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Understanding this grip strength age calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>The calculator uses Age, Percentile, Category, Age Group Avg, Z-Score. Its output is based on the formula implemented by this tool and the values you provide.</p>
            <p>When comparing scenarios, change one assumption at a time and compare Grip Strength Age Percentile Calculator, Age, Percentile, Category, Age Group Avg, Z-Score. This makes it easier to identify which input is responsible for the change instead of treating the result as a prediction.</p>
            <p>Check the units and time period before relying on the output. Real-world outcomes can differ when relevant taxes, fees, eligibility requirements, measurement error, market changes, or other factors are outside the calculator&apos;s inputs.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this explanation documents the calculator&apos;s use and limitations without changing its underlying calculation.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={auditFaqs} /></div>
    </CalculatorLayout>
  )
}
