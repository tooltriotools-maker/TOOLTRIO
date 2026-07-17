'use client'
import { useState, useMemo } from 'react'
import { calculateDehydrationStatus } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [bodyWeight, setBodyWeight] = useState(75)
  const [fluidLost, setFluidLost] = useState(0.5)
  const [exerciseDuration, setExerciseDuration] = useState(60)
  const [tempC, setTempC] = useState(22)
  const [highSweat, setHighSweat] = useState(false)
  const result = useMemo(() => calculateDehydrationStatus(bodyWeight, fluidLost, exerciseDuration, tempC, highSweat), [bodyWeight, fluidLost, exerciseDuration, tempC, highSweat])
  return (
    <CalculatorLayout title="Dehydration Status Calculator" description="Calculate your fluid deficit percentage, dehydration severity, and precise rehydration targets." icon="💧" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="dehydration-status-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Hydration Details</h2>
          <div className="space-y-3">
            <InputField label="Body Weight" value={bodyWeight} onChange={setBodyWeight} min={40} max={180} step={1} suffix="kg" />
            <InputField label="Fluid Already Lost (estimated)" value={fluidLost} onChange={setFluidLost} min={0} max={5} step={0.1} suffix="L" />
            <InputField label="Exercise Duration" value={exerciseDuration} onChange={setExerciseDuration} min={0} max={360} step={15} suffix="min" />
            <InputField label="Air Temperature" value={tempC} onChange={setTempC} min={-10} max={45} step={1} suffix="°C" />
            <button onClick={() => setHighSweat(!highSweat)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${highSweat ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
              <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${highSweat ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{highSweat ? '✓' : ''}</span>
              High sweat rate (very sweaty person)
            </button>
            <div className="p-3 rounded-xl border text-center" style={{ background: result.color + '15', borderColor: result.color + '40' }}>
              <p className="text-xs text-gray-500">Fluid Deficit</p>
              <p className="text-4xl font-black" style={{ color: result.color }}>{result.deficitPct}%</p>
              <p className="text-xs font-semibold mt-1" style={{ color: result.color }}>{result.status}</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Deficit" value={`${result.deficitPct}%`} highlight />
            <ResultCard label="Total Loss" value={`${result.totalFluidLossL}L`} />
            <ResultCard label="Rehydration Target" value={`${result.rehydrationTargetMl}mL`} subValue="150% of loss" />
            <ResultCard label="Rehydration Time" value={`${result.rehydrationTimeMin} min`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Dehydration Severity Scale</h3>
            <div className="space-y-2">
              {[{label:'Well hydrated',range:'< 1%',color:'#22c55e'},{label:'Mild',range:'1–2%',color:'#84cc16'},{label:'Moderate',range:'2–4%',color:'#eab308'},{label:'Significant',range:'4–6%',color:'#f97316'},{label:'Severe',range:'> 6%',color:'#ef4444'}].map(r => {
                const active = (r.label==='Well hydrated' && result.deficitPct<1)||(r.label==='Mild'&&result.deficitPct>=1&&result.deficitPct<2)||(r.label==='Moderate'&&result.deficitPct>=2&&result.deficitPct<4)||(r.label==='Significant'&&result.deficitPct>=4&&result.deficitPct<6)||(r.label==='Severe'&&result.deficitPct>=6)
                return <div key={r.label} className={`flex justify-between items-center p-3 rounded-xl border ${active?'border-2':'border-transparent'}`} style={{background:active?r.color+'15':'#f9fafb',borderColor:active?r.color:'transparent'}}>
                  <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{background:r.color}}/><span className="text-sm font-semibold" style={{color:active?r.color:'#6b7280'}}>{r.label}</span></div>
                  <span className="text-sm font-mono font-bold" style={{color:active?r.color:'#9ca3af'}}>{r.range}</span>
                  {active && <span className="text-xs font-bold bg-white px-2 py-0.5 rounded-full" style={{color:r.color}}>← You</span>}
                </div>
              })}
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Symptoms at This Level</h3>
            <ul className="space-y-1">{result.symptoms.map(s => <li key={s} className="text-sm text-gray-700 flex items-center gap-2"><span className={result.deficitPct >= 4 ? 'text-red-500' : 'text-orange-400'}>•</span>{s}</li>)}</ul>
            <div className="mt-3 pt-3 border-t text-sm">
              <p className="font-semibold text-gray-700">{result.electrolyteNeeded ? '⚡ Electrolytes needed: ' + result.sportsDrinkTip : '💧 ' + result.sportsDrinkTip}</p>
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
