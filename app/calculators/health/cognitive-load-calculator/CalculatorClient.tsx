'use client'
import { useState, useMemo } from 'react'
import { calculateCognitiveLoadScore } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [taskComplexity, setTaskComplexity] = useState(6)
  const [workingMemory, setWorkingMemory] = useState(5)
  const [timePressure, setTimePressure] = useState(4)
  const [interruptions, setInterruptions] = useState(6)
  const [multitasking, setMultitasking] = useState(4)
  const [noiseLevel, setNoiseLevel] = useState(3)
  const [hoursNoBreak, setHoursNoBreak] = useState(2)
  const result = useMemo(() => calculateCognitiveLoadScore(taskComplexity, workingMemory, timePressure, interruptions, multitasking, noiseLevel, hoursNoBreak), [taskComplexity, workingMemory, timePressure, interruptions, multitasking, noiseLevel, hoursNoBreak])
  return (
    <CalculatorLayout title="Cognitive Load Calculator" description="Measure your total cognitive load and know when you are approaching overload before errors start." icon="🧩" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="cognitive-load-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Current Conditions</h2>
          <div className="space-y-3">
            {[
              { label: 'Task Complexity (1–10)', value: taskComplexity, set: setTaskComplexity },
              { label: 'Working Memory Demand (1–10)', value: workingMemory, set: setWorkingMemory },
              { label: 'Time Pressure (1–10)', value: timePressure, set: setTimePressure },
              { label: 'Interruptions per Hour (0–10)', value: interruptions, set: setInterruptions },
              { label: 'Multitasking Level (1–10)', value: multitasking, set: setMultitasking },
              { label: 'Noise/Distraction Level (1–10)', value: noiseLevel, set: setNoiseLevel },
            ].map(s => (
              <div key={s.label} className="space-y-1">
                <label className="text-xs font-medium text-gray-500">{s.label}: <span className="font-bold text-rose-600">{s.value}</span></label>
                <input type="range" min={1} max={10} step={1} value={s.value} onChange={e => s.set(Number(e.target.value))} className="w-full accent-rose-500" />
              </div>
            ))}
            <InputField label="Hours since last break" value={hoursNoBreak} onChange={setHoursNoBreak} min={0} max={8} step={0.5} suffix="hrs" />
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <ResultCard label="Total Load" value={`${result.totalLoad}/100`} highlight />
            <ResultCard label="Status" value={result.status.split(' — ')[0]} />
            <ResultCard label="Error Risk" value={result.errorRisk.split(' — ')[0]} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Cognitive Load Gauge</h3>
            <div className="relative h-8 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-full overflow-hidden">
              <div className="absolute top-1 h-6 w-2 bg-white rounded-full shadow-lg transition-all" style={{ left: `${Math.min(97,result.totalLoad)}%`, transform: 'translateX(-50%)' }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Under-stimulated</span><span>Optimal Zone</span><span>Overload</span></div>
            <p className="text-center font-black text-3xl mt-2" style={{ color: result.color }}>{result.totalLoad}/100</p>
            <p className="text-center text-sm font-semibold mt-0.5" style={{ color: result.color }}>{result.status}</p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Load Breakdown</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Intrinsic Load (task difficulty)</span><span className="font-bold">{result.intrinsicLoad}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Extraneous Load (environment)</span><span className="font-bold">{result.extraneousLoad}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Peak Performance Window</span><span className="font-semibold text-green-600">{result.peakPerformanceWindow}</span></div>
            </div>
          </Card>
          <div className={`rounded-xl p-4 text-sm border ${result.totalLoad >= 70 ? 'bg-red-50 border-red-200 text-red-800' : result.totalLoad >= 40 ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-green-50 border-green-200 text-green-800'}`}>
            <p className="font-bold mb-1">⏱️ {result.breakRecommendation}</p>
            <p className="text-xs mt-1">{result.errorRisk}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to review the cognitive load calculator result</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>Review the calculated output together with Hours since last break, Total Load, Status, Error Risk. The result reflects the values entered and the calculation implemented by this tool.</p>
            <p>When comparing alternatives, change one input at a time while keeping the other assumptions constant. This makes the effect of each input easier to understand.</p>
          </div>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
