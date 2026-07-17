'use client'
import { useState, useMemo } from 'react'
import { calculateDefinedBenefitPension } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [yearsOfService, setYearsOfService] = useState(25)
  const [finalSalary, setFinalSalary] = useState(80000)
  const [multiplier, setMultiplier] = useState(1.5)
  const [retirementAge, setRetirementAge] = useState(65)
  const [earlyAge, setEarlyAge] = useState(55)
  const result = useMemo(() => calculateDefinedBenefitPension(yearsOfService, finalSalary, multiplier, retirementAge, earlyAge), [yearsOfService, finalSalary, multiplier, retirementAge, earlyAge])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  return (
    <CalculatorLayout title="Defined Benefit Pension Calculator USA 2026" description="Calculate your monthly pension benefit, replacement rate, and lifetime pension value." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="defined-benefit-pension-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Pension Details</h2>
          {[
            { label: 'Years of Service', value: yearsOfService, set: setYearsOfService, step: 1, suffix: 'yrs' },
            { label: 'Final Average Salary', value: finalSalary, set: setFinalSalary, step: 2500, prefix: '$' },
            { label: 'Benefit Multiplier (%/yr)', value: multiplier, set: setMultiplier, step: 0.1, suffix: '%' },
            { label: 'Normal Retirement Age', value: retirementAge, set: setRetirementAge, step: 1, suffix: 'yrs' },
            { label: 'Early Retirement Age', value: earlyAge, set: setEarlyAge, step: 1, suffix: 'yrs' },
          ].map(({ label, value, set, step, prefix, suffix }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                {prefix && <span className="text-green-600 text-sm">{prefix}</span>}
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
                {suffix && <span className="text-gray-400 text-sm">{suffix}</span>}
              </div>
            </div>
          ))}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
            <p className="font-bold">Formula: Yrs × Multiplier% × Salary</p>
            <p className="mt-1">{yearsOfService} × {multiplier}% × {fmt(finalSalary)} = {fmt(result.annualBenefit)}/yr</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Monthly Benefit" value={fmt(result.monthlyBenefit)} highlight />
            <ResultCard label="Annual Benefit" value={fmt(result.annualBenefit)} />
            <ResultCard label="Replacement Rate" value={result.replacementRate + '%'} subValue="of final salary" />
            <ResultCard label="Lifetime Value" value={fmt(result.totalLifetimeBenefit)} subValue="to age 85" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-green-700 mb-3">✅ Full Retirement (Age {retirementAge})</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Monthly</span><span className="font-black text-green-700">{fmt(result.monthlyBenefit)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Annual</span><span className="font-bold">{fmt(result.annualBenefit)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Lump Sum Equiv.</span><span className="font-bold">{fmt(result.lumpSumEquivalent)}</span></div>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-orange-600 mb-3">⚡ Early Retirement (Age {earlyAge})</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Monthly</span><span className="font-black text-orange-600">{fmt(result.earlyRetirementBenefit / 12)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Annual</span><span className="font-bold">{fmt(result.earlyRetirementBenefit)}</span></div>
                <div className="flex justify-between text-red-500"><span>Reduction</span><span className="font-semibold">-{result.earlyReductionPct}%</span></div>
              </div>
            </Card>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            <p className="font-bold mb-1">📊 Replacement Rate: {result.replacementRate}%</p>
            <p>Financial planners typically target 70-85% income replacement in retirement. Your pension alone provides {result.replacementRate}% — {result.replacementRate >= 70 ? 'a strong foundation' : 'supplement with 401k and Social Security for a complete retirement plan'}.</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
