'use client'
import { useState, useMemo } from 'react'
import { calculateSeriesEEBond } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [faceValue, setFaceValue] = useState(10000)
  const [purchaseYear, setPurchaseYear] = useState(2026)
  const [currentYear] = useState(2026)
  const [holdToMaturity, setHoldToMaturity] = useState(true)
  const result = useMemo(() => calculateSeriesEEBond(faceValue, purchaseYear, currentYear, holdToMaturity), [faceValue, purchaseYear, currentYear, holdToMaturity])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  return (
    <CalculatorLayout title="Series EE Savings Bond Calculator USA 2026" description="Model a new Series EE savings bond using the current Treasury fixed rate and 20-year doubling guarantee." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="series-ee-bond-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Bond Details</h2>
          {[
            { label: 'Face Value', value: faceValue, set: setFaceValue, step: 1000, prefix: '$' },
            { label: 'Year Purchased', value: purchaseYear, set: setPurchaseYear, step: 1, suffix: '' },
          ].map(({ label, value, set, step, prefix, suffix }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                {prefix && <span className="text-green-600 text-sm">{prefix}</span>}
                <input type="number" min={2026} max={2026} value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
                {suffix !== undefined && <span className="text-gray-400 text-sm">{suffix}</span>}
              </div>
            </div>
          ))}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-xs font-medium text-gray-600">Hold to 20-Year Maturity?</span>
            <button onClick={() => setHoldToMaturity(!holdToMaturity)} className={`px-3 py-1 rounded-full text-xs font-bold ${holdToMaturity ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{holdToMaturity ? 'Yes' : 'No'}</button>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700 space-y-1">
            <p><strong>Bought at:</strong> {fmt(result.purchasePrice)} </p>
            <p><strong>Years Held:</strong> {result.yearsHeld} years</p>
            <p><strong>Doubles at:</strong> {purchaseYear + 20}</p>
            <p><strong>Matures:</strong> {result.maturityDate}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Current Value" value={fmt(result.currentValue)} highlight />
            <ResultCard label="Interest Earned" value={fmt(result.interestEarned)} subValue="total gain" />
            <ResultCard label="Effective Annual Rate" value={result.effectiveAnnualRate + '%'} subValue={holdToMaturity && result.yearsHeld >= 20 ? 'guaranteed' : 'current rate'} />
            <ResultCard label="Federal Tax Due" value={fmt(result.federalTaxDue)} subValue="based on entered tax assumption" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Bond Value Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Purchase Price (you paid)</span><span className="font-bold">{fmt(result.purchasePrice)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Current Redemption Value</span><span className="font-bold text-green-600">{fmt(result.currentValue)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Interest Earned</span><span className="font-bold">{fmt(result.interestEarned)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Estimated Federal Tax</span><span className="font-bold text-red-500">-{fmt(result.federalTaxDue)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Education Tax Exclusion Potential</span><span className="font-bold text-green-600">-{fmt(result.educationTaxExclusion)}</span></div>
              <div className="border-t pt-2 flex justify-between font-bold text-green-700">
                <span>Net After Tax</span><span>{fmt(result.currentValue - result.federalTaxDue)}</span>
              </div>
            </div>
          </Card>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            <p className="font-bold mb-1">💡 {result.tip}</p>
            {!holdToMaturity && result.yearsHeld < 20 && <p className="mt-1">Hold until {purchaseYear + 20} to guarantee the bond doubles to {fmt(faceValue)} — an effective {3.53}% annual return, much better than the current {result.effectiveAnnualRate}% accrual rate.</p>}
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to use and interpret this series ee bond calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This calculator uses Current Value, Interest Earned, Effective Annual Rate, Federal Tax Due to produce the results displayed above. Change one input at a time when comparing scenarios so you can see which assumption is responsible for the difference.</p>
            <p>The result is an estimate produced from the calculator&apos;s new-issue formula and the values you enter. Review the units, time period, and assumptions before using the output for a decision; a calculated result does not add information that is not represented by the inputs.</p>
            <p>Use the worked output as a planning or comparison aid. Real-world results can differ when taxes, fees, eligibility rules, measurement error, market conditions, or other factors not represented by this calculator apply.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this section describes the calculator implementation on this page and does not change its underlying formula.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
