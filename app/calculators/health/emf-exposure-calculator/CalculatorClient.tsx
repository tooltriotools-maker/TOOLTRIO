'use client'
import { useState, useMemo } from 'react'
import { calculateEMFExposureScore } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
const auditFaqs = [
  {"question": "What should I check before using the Emf Exposure Calculator?", "answer": "Check Daily Wi-Fi usage, Daily phone call duration, Distance from Wi-Fi router, Distance from smart meter, Microwave oven use, Exposure Score and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Emf Exposure Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculator output for informational use and is not a diagnosis or a substitute for evaluation by a qualified healthcare professional."},
  {"question": "How can I compare different Emf Exposure Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. Comparing results this way makes it easier to see which input is responsible for the difference."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [wifiHours, setWifiHours] = useState(10)
  const [phoneCallHours, setPhoneCallHours] = useState(1.5)
  const [routerDistance, setRouterDistance] = useState(2)
  const [sleepsNearPhone, setSleepsNearPhone] = useState(true)
  const [wiredEarphones, setWiredEarphones] = useState(false)
  const [smartMeterDistance, setSmartMeterDistance] = useState(5)
  const [microwaveUse, setMicrowaveUse] = useState(2)
  const result = useMemo(() => calculateEMFExposureScore(wifiHours, phoneCallHours, routerDistance, sleepsNearPhone, wiredEarphones, smartMeterDistance, microwaveUse), [wifiHours, phoneCallHours, routerDistance, sleepsNearPhone, wiredEarphones, smartMeterDistance, microwaveUse])
  return (
    <CalculatorLayout title="EMF Exposure Score Calculator" description="Educational tool scoring your relative RF/EMF exposure from phone use, Wi-Fi, and smart devices based on WHO guidelines." icon="📶" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="emf-exposure-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Device Usage</h2>
          <div className="space-y-3">
            <InputField label="Daily Wi-Fi usage" value={wifiHours} onChange={setWifiHours} min={0} max={24} step={0.5} suffix="hrs/day" />
            <InputField label="Daily phone call duration" value={phoneCallHours} onChange={setPhoneCallHours} min={0} max={10} step={0.25} suffix="hrs/day" />
            <InputField label="Distance from Wi-Fi router" value={routerDistance} onChange={setRouterDistance} min={0.5} max={20} step={0.5} suffix="metres" />
            <InputField label="Distance from smart meter" value={smartMeterDistance} onChange={setSmartMeterDistance} min={0.5} max={30} step={0.5} suffix="metres" />
            <InputField label="Microwave oven use" value={microwaveUse} onChange={setMicrowaveUse} min={0} max={10} step={1} suffix="/day" />
            {[
              { label: '🛏️ Sleep with phone within 1 metre', val: sleepsNearPhone, set: setSleepsNearPhone },
              { label: '🎧 Use wired earphones for calls', val: wiredEarphones, set: setWiredEarphones },
            ].map(c => (
              <button key={c.label} onClick={() => c.set(!c.val)} className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-semibold text-left border transition-all ${c.val ? 'bg-rose-50 border-rose-300 text-rose-700' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
                <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${c.val ? 'bg-rose-500 border-rose-500 text-white' : 'border-gray-300'}`}>{c.val ? '✓' : ''}</span>{c.label}
              </button>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <ResultCard label="Exposure Score" value={`${result.exposureScore}/100`} highlight />
            <ResultCard label="Status" value={result.status} />
            <ResultCard label="Biggest Source" value={result.biggestSource.split(' ')[0] + ' ' + (result.biggestSource.split(' ')[1] || '')} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Relative Exposure Gauge</h3>
            <div className="relative h-6 bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500 rounded-full overflow-hidden">
              <div className="absolute top-0 h-full w-1.5 bg-white rounded-full shadow-lg transition-all" style={{ left: `${result.exposureScore}%` }} />
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>Low</span><span>Moderate</span><span>High relative</span></div>
            <p className="text-center font-black text-3xl mt-2" style={{ color: result.color }}>{result.exposureScore}/100</p>
            <p className="text-center text-sm font-semibold mt-0.5" style={{ color: result.color }}>{result.status}</p>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Biggest Source</h3>
            <p className="text-sm text-gray-700 mb-3">{result.biggestSource}</p>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Simple Reduction Tips</h3>
            <ul className="space-y-1">{result.reduceTips.map(t => <li key={t} className="text-sm text-gray-700 flex items-start gap-2"><span className="text-green-500 flex-shrink-0 mt-0.5">✓</span>{t}</li>)}</ul>
          </Card>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-bold mb-1">ℹ️ Scientific Context</p>
            <p className="text-xs">{result.note}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Understanding this emf exposure calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>The calculator uses Daily Wi-Fi usage, Daily phone call duration, Distance from Wi-Fi router, Distance from smart meter, Microwave oven use, Exposure Score, Status. Its output is based on the formula implemented by this tool and the values you provide.</p>
            <p>When comparing scenarios, change one assumption at a time and compare EMF Exposure Score Calculator, Daily Wi-Fi usage, Daily phone call duration, Distance from Wi-Fi router, Distance from smart meter, Microwave oven use, Exposure Score. This makes it easier to identify which input is responsible for the change instead of treating the result as a prediction.</p>
            <p>Check the units and time period before relying on the output. Real-world outcomes can differ when relevant taxes, fees, eligibility requirements, measurement error, market changes, or other factors are outside the calculator&apos;s inputs.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this explanation documents the calculator&apos;s use and limitations without changing its underlying calculation.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={auditFaqs} /></div>
    </CalculatorLayout>
  )
}
