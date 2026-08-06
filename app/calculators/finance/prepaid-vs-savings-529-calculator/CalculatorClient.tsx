'use client'
import { useState, useMemo } from 'react'
import { calculatePrepaidVsSavings529 } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [childAge, setChildAge] = useState(5)
  const [collegeStartAge, setCollegeStartAge] = useState(18)
  const [statePlanCost, setStatePlanCost] = useState(9500)
  const [savingsPlanContrib, setSavingsPlanContrib] = useState(500)
  const [savingsPlanReturn, setSavingsPlanReturn] = useState(7)
  const result = useMemo(() => calculatePrepaidVsSavings529(childAge, collegeStartAge, statePlanCost, 4, savingsPlanContrib, savingsPlanReturn), [childAge, collegeStartAge, statePlanCost, savingsPlanContrib, savingsPlanReturn])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  return (
    <CalculatorLayout title="529 Prepaid vs Savings Plan Calculator USA 2026" description="Compare 529 prepaid tuition vs 529 savings plan — future tuition costs, coverage, and which option saves more." icon="🎓" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="prepaid-vs-savings-529-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Your 529 Plan</h2>
          {[
            { label: "Child's Current Age", value: childAge, set: setChildAge, step: 1, suffix: 'yrs' },
            { label: 'College Start Age', value: collegeStartAge, set: setCollegeStartAge, step: 1, suffix: 'yrs' },
            { label: 'Prepaid Plan Cost (per year)', value: statePlanCost, set: setStatePlanCost, step: 250, prefix: '$' },
            { label: 'Monthly Savings Plan Contribution', value: savingsPlanContrib, set: setSavingsPlanContrib, step: 50, prefix: '$' },
            { label: 'Expected Annual Return', value: savingsPlanReturn, set: setSavingsPlanReturn, step: 0.5, suffix: '%' },
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
            <p className="font-bold">Years to College: {result.yearsToCollege}</p>
            <p className="mt-1">Future Tuition (Yr 1): {fmt(result.futureTuitionYear1)}</p>
            <p className="mt-1">4-Year Total: {fmt(result.totalFutureTuition)}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Future 4-Year Cost" value={fmt(result.totalFutureTuition)} />
            <ResultCard label="Savings Plan Balance" value={fmt(result.savings.balance)} highlight />
            <ResultCard label="Coverage" value={result.savings.coveragePct + '%'} subValue="of projected cost" />
            <ResultCard label="Shortfall" value={fmt(result.savings.shortfall)} subValue={result.savings.shortfall > 0 ? 'funding gap' : '✓ fully funded'} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-blue-700 mb-3">📋 Prepaid Plan</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Total Cost (4 yrs)</span><span className="font-bold">{fmt(result.prepaid.cost)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Tuition Covered</span><span className="font-bold text-green-600">{fmt(result.prepaid.benefit)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Effective ROI</span><span className="font-bold">{result.prepaid.roi}%</span></div>
                <div className="text-xs text-gray-400 mt-2">✓ Locks in today's tuition rate<br/>⚠ Only covers in-state tuition</div>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-green-700 mb-3">📈 Savings Plan</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Projected Balance</span><span className="font-bold text-green-700">{fmt(result.savings.balance)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Coverage</span><span className="font-bold">{result.savings.coveragePct}%</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Shortfall</span><span className={`font-bold ${result.savings.shortfall > 0 ? 'text-red-500' : 'text-green-600'}`}>{fmt(result.savings.shortfall)}</span></div>
                <div className="text-xs text-gray-400 mt-2">✓ Use for any school, room & board<br/>⚠ Market risk applies</div>
              </div>
            </Card>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            <p className="font-bold mb-1">💡 {result.recommendation}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to review the prepaid vs savings 529 calculator result</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>Review the calculated output together with Future 4-Year Cost, Savings Plan Balance, Coverage, Shortfall. The result reflects the values entered and the calculation implemented by this tool.</p>
            <p>When comparing alternatives, change one input at a time while keeping the other assumptions constant. This makes the effect of each input easier to understand.</p>
          </div>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
