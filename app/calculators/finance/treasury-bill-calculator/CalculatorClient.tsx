'use client'
import { useState, useMemo } from 'react'
import { calculateTBill } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [faceValue, setFaceValue] = useState(10000)
  const [discountRate, setDiscountRate] = useState(4.8)
  const [termDays, setTermDays] = useState(91)
  const result = useMemo(() => calculateTBill(faceValue, discountRate, termDays), [faceValue, discountRate, termDays])
  const fmt = (v: number) => '$' + v.toLocaleString()
  const termLabels: Record<number, string> = { 28: '4-Week', 91: '13-Week', 182: '26-Week', 364: '52-Week' }
  return (
    <CalculatorLayout title="Treasury Bill (T-Bill) Calculator USA 2026" description="Calculate T-Bill purchase price, bond equivalent yield, annualized return, and state tax exemption benefit." icon="🏦" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="treasury-bill-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">T-Bill Details</h2>
          {[
            { label: 'Face Value', value: faceValue, set: setFaceValue, step: 1000, prefix: '$' },
            { label: 'Discount Rate (%)', value: discountRate, set: setDiscountRate, step: 0.05, suffix: '%' },
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
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">T-Bill Term</label>
            <div className="grid grid-cols-2 gap-2">
              {[28, 91, 182, 364].map(d => (
                <button key={d} onClick={() => setTermDays(d)} className={`py-2 rounded-xl text-xs font-semibold transition-all ${termDays === d ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{termLabels[d]}</button>
              ))}
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700 space-y-1">
            <p><strong>You Pay:</strong> {fmt(result.purchasePrice)}</p>
            <p><strong>You Receive:</strong> {fmt(faceValue)} at maturity</p>
            <p><strong>Term:</strong> {termDays} days</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Purchase Price" value={fmt(result.purchasePrice)} />
            <ResultCard label="Interest Earned" value={fmt(result.interestEarned)} highlight />
            <ResultCard label="Bond Equiv. Yield" value={result.bondEquivalentYield + '%'} subValue="365-day basis" />
            <ResultCard label="Annualized Return" value={result.annualizedReturn + '%'} subValue="compound" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Return Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Face Value</span><span className="font-bold">{fmt(faceValue)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Purchase Price (you pay)</span><span className="font-bold">{fmt(result.purchasePrice)}</span></div>
              <div className="flex justify-between text-green-600"><span>Interest Earned ({termDays} days)</span><span className="font-bold">{fmt(result.interestEarned)}</span></div>
              <div className="border-t pt-2 grid grid-cols-2 gap-4">
                <div><p className="text-gray-400 text-xs mb-1">Bank Discount Rate</p><p className="font-bold">{discountRate}%</p></div>
                <div><p className="text-gray-400 text-xs mb-1">Bond Equivalent Yield</p><p className="font-bold text-green-600">{result.bondEquivalentYield}%</p></div>
              </div>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-2">State Tax Advantage</h3>
            <p className="text-sm text-gray-600">{result.taxAdvantage}</p>
            <p className="text-sm text-gray-500 mt-2">{result.comparisonRate}</p>
          </Card>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
