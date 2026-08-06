'use client'
import { useState, useMemo } from 'react'
import { calculateBoneMineralDensityScore } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

const auditFaqs = [
  {"question": "What should I check before using the Bone Mineral Density Calculator?", "answer": "Check Age, T-Score, Diagnosis, 10-yr Fracture Risk, Treatment Needed and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Bone Mineral Density Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculator output for informational use and is not a diagnosis or a substitute for evaluation by a qualified healthcare professional."},
  {"question": "How can I compare different Bone Mineral Density Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. Comparing results this way makes it easier to see which input is responsible for the difference."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [tScore, setTScore] = useState(-1.2)
  const [zScore, setZScore] = useState(-0.5)
  const [age, setAge] = useState(62)
  const [gender, setGender] = useState<'male' | 'female'>('female')
  const [site, setSite] = useState<'spine' | 'hip' | 'forearm'>('hip')

  const result = useMemo(() => calculateBoneMineralDensityScore(tScore, zScore, age, gender, site), [tScore, zScore, age, gender, site])

  const tScoreCategories = [
    { label: 'Normal', range: '≥ -1.0', color: '#22c55e' },
    { label: 'Osteopenia', range: '-1.0 to -2.5', color: '#f59e0b' },
    { label: 'Osteoporosis', range: '≤ -2.5', color: '#ef4444' },
  ]

  return (
    <CalculatorLayout title="Bone Mineral Density T-Score Calculator" description="Interpret your DEXA scan T-score and Z-score, get WHO classification, and 10-year fracture risk estimate." icon="🦴" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="bone-mineral-density-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">DEXA Scan Results</h2>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-1 p-1 bg-gray-50 rounded-xl">
              {(['male','female'] as const).map(g => <button key={g} onClick={() => setGender(g)} className={`py-2 rounded-xl text-sm font-semibold transition-all ${gender === g ? 'bg-rose-500 text-white' : 'text-gray-500'}`}>{g === 'male' ? '♂ Male' : '♀ Female'}</button>)}
            </div>
            <InputField label="Age" value={age} onChange={setAge} min={20} max={100} step={1} suffix="yrs" />
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">T-Score (from DEXA report)</label>
              <input type="range" min={-4} max={2} step={0.1} value={tScore} onChange={e => setTScore(Number(e.target.value))} className="w-full accent-rose-500" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">-4.0</span>
                <span className="text-lg font-black text-rose-600">{tScore.toFixed(1)}</span>
                <span className="text-xs text-gray-400">+2.0</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Z-Score (age-matched)</label>
              <input type="range" min={-4} max={2} step={0.1} value={zScore} onChange={e => setZScore(Number(e.target.value))} className="w-full accent-rose-500" />
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">-4.0</span>
                <span className="text-lg font-black text-blue-600">{zScore.toFixed(1)}</span>
                <span className="text-xs text-gray-400">+2.0</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500">Scan Site</label>
              <div className="grid grid-cols-3 gap-1">
                {(['spine','hip','forearm'] as const).map(s => <button key={s} onClick={() => setSite(s)} className={`py-2 rounded-xl text-xs font-semibold capitalize transition-all ${site === s ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{s}</button>)}
              </div>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="T-Score" value={tScore.toFixed(1)} highlight />
            <ResultCard label="Diagnosis" value={result.diagnosis.split(' (')[0]} />
            <ResultCard label="10-yr Fracture Risk" value={`~${result.fracRisk10yr}%`} />
            <ResultCard label="Treatment Needed" value={result.treatmentThreshold ? 'Consider meds' : 'Lifestyle only'} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">WHO T-Score Classification</h3>
            <div className="space-y-2">
              {tScoreCategories.map(cat => {
                const active = (cat.label === 'Normal' && tScore >= -1.0) || (cat.label === 'Osteopenia' && tScore < -1.0 && tScore > -2.5) || (cat.label === 'Osteoporosis' && tScore <= -2.5)
                return (
                  <div key={cat.label} className={`flex items-center justify-between p-3 rounded-xl border ${active ? 'border-2' : 'border-transparent'}`} style={{ background: active ? cat.color + '15' : '#f9fafb', borderColor: active ? cat.color : 'transparent' }}>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ background: cat.color }} /><span className="text-sm font-semibold" style={{ color: active ? cat.color : '#6b7280' }}>{cat.label}</span></div>
                    <span className="text-sm font-mono font-bold" style={{ color: active ? cat.color : '#9ca3af' }}>{cat.range}</span>
                    {active && <span className="text-xs font-bold bg-white px-2 py-0.5 rounded-full" style={{ color: cat.color }}>← You</span>}
                  </div>
                )
              })}
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Management Guidance</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Age-Matched Status</span><span className="font-semibold">{result.ageExpected}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Supplementation</span><span className="font-semibold text-right ml-4">{result.supplementation}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Exercise Rx</span><span className="font-semibold text-right ml-4">{result.exerciseRx}</span></div>
            </div>
          </Card>
          <div className={`rounded-xl p-4 text-sm border ${result.treatmentThreshold ? 'bg-orange-50 border-orange-200 text-orange-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <p className="font-bold mb-1">{result.treatmentThreshold ? '⚕️ Pharmacological treatment threshold reached' : '✅ Lifestyle measures are first-line treatment'}</p>
            <p className="text-xs">{result.treatmentThreshold ? 'Discuss the result with a clinician. Medication decisions depend on fracture history, BMD, age, clinical risk factors, contraindications, and current guidelines.' : 'Lifestyle measures may be appropriate, but calcium/vitamin D needs and the timing of repeat DEXA testing should be individualized.'}</p>
            {result.fallPrevention && <p className="text-xs mt-2 font-semibold text-red-700">⚠️ Fall prevention program recommended — hip fractures at this T-score are life-changing events.</p>}
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-4">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Calculator-specific methodology</h2>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">How to interpret T-scores and Z-scores</h3>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>For postmenopausal women and men age 50 or older, NIAMS describes a T-score of −1 or higher as normal, between −1 and −2.5 as low bone mass (osteopenia), and −2.5 or lower as compatible with osteoporosis. In younger adults, Z-scores are generally more relevant to age-matched interpretation.</p>
            <p>The calculator’s displayed '10-year fracture risk' is a ToolTrio estimate unless it is produced from a validated fracture-risk model. It must not be presented as an official FRAX probability.</p>
            <p>Treatment decisions depend on fracture history, age, measured BMD, clinical risk factors, medication risks, and professional guidelines—not the T-score alone.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Primary reference: NIH National Institute of Arthritis and Musculoskeletal and Skin Diseases (NIAMS), Bone Mineral Density Tests.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={auditFaqs} /></div>
    </CalculatorLayout>
  )
}
