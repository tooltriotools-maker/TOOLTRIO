'use client'
import { useState, useMemo } from 'react'
import { calculateWashSale } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [shares, setShares] = useState(100)
  const [purchasePrice, setPurchasePrice] = useState(150)
  const [salePrice, setSalePrice] = useState(120)
  const [repurchasePrice, setRepurchasePrice] = useState(125)
  const [daysAfterSale, setDaysAfterSale] = useState(25)
  const result = useMemo(() => calculateWashSale(shares, purchasePrice, salePrice, repurchasePrice, daysAfterSale), [shares, purchasePrice, salePrice, repurchasePrice, daysAfterSale])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  return (
    <CalculatorLayout title="Wash Sale Rule Calculator USA 2026" description="Determine if your trade triggers the wash sale rule and how much loss is disallowed." icon="🔄" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="wash-sale-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Trade Details</h2>
          {[{ label: 'Shares Sold', value: shares, set: setShares, step: 10, suffix: 'shares' }, { label: 'Original Purchase Price/Share', value: purchasePrice, set: setPurchasePrice, step: 5, prefix: '$' }, { label: 'Sale Price/Share', value: salePrice, set: setSalePrice, step: 5, prefix: '$' }, { label: 'Repurchase Price/Share', value: repurchasePrice, set: setRepurchasePrice, step: 5, prefix: '$' }, { label: 'Days After Sale to Repurchase', value: daysAfterSale, set: setDaysAfterSale, step: 1, suffix: 'days' }].map(({ label, value, set, step, prefix, suffix }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                {prefix && <span className="text-green-600 text-sm">{prefix}</span>}
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
                {suffix && <span className="text-gray-400 text-sm">{suffix}</span>}
              </div>
            </div>
          ))}
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className={`rounded-2xl p-4 text-center border-2 ${result.isWashSale ? 'bg-red-50 border-red-300' : 'bg-green-50 border-green-300'}`}>
            <p className="text-2xl mb-1">{result.isWashSale ? '⚠️ WASH SALE' : '✅ NOT A WASH SALE'}</p>
            <p className="text-sm font-semibold text-gray-700">{result.recommendation}</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Realized Loss" value={fmt(result.realizedLoss)} highlight />
            <ResultCard label="Disallowed Loss" value={fmt(result.disallowedLoss)} subValue={result.isWashSale ? 'added to new basis' : 'none'} />
            <ResultCard label="Tax Deferred" value={fmt(result.taxSavingsDeferred)} subValue="est. at 37% rate" />
            <ResultCard label="Adjusted Basis" value={fmt(result.adjustedCostBasis)} subValue="total new shares" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Trade Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Sale Proceeds</span><span className="font-bold">{fmt(result.saleProceeds)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Original Cost Basis</span><span className="font-bold">{fmt(result.costBasis)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Realized Loss</span><span className="font-semibold text-red-500">-{fmt(result.realizedLoss)}</span></div>
              {result.isWashSale && <>
                <div className="flex justify-between text-orange-600"><span>Disallowed by Wash Sale</span><span className="font-semibold">+{fmt(result.disallowedLoss)}</span></div>
                <div className="flex justify-between font-bold text-green-600"><span>Deductible Loss</span><span>$0</span></div>
                <div className="bg-orange-50 rounded-lg p-3 text-xs text-orange-700 mt-2">The disallowed loss of {fmt(result.disallowedLoss)} is added to your new cost basis of {fmt(repurchasePrice * shares)}, giving an adjusted basis of {fmt(result.adjustedCostBasis)}.</div>
              </>}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
