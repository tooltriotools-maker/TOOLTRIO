'use client'
import { useState, useMemo } from 'react'
import { calculateCharitableGiving } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [cashDonation, setCashDonation] = useState(5000)
  const [stockFMV, setStockFMV] = useState(10000)
  const [stockBasis, setStockBasis] = useState(2000)
  const [agiIncome, setAgiIncome] = useState(150000)
  const [taxRate, setTaxRate] = useState(32)
  const result = useMemo(() => calculateCharitableGiving(cashDonation, stockFMV, stockBasis, agiIncome, taxRate), [cashDonation, stockFMV, stockBasis, agiIncome, taxRate])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  return (
    <CalculatorLayout title="Charitable Giving Tax Calculator USA 2026" description="Calculate the true after-tax cost of charitable donations — cash, appreciated stock, and Donor Advised Funds." icon="❤️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="charitable-giving-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Donation Details</h2>
          {[
            { label: 'Cash Donation', value: cashDonation, set: setCashDonation, step: 500, prefix: '$' },
            { label: 'Appreciated Stock FMV', value: stockFMV, set: setStockFMV, step: 500, prefix: '$' },
            { label: 'Stock Original Cost Basis', value: stockBasis, set: setStockBasis, step: 500, prefix: '$' },
            { label: 'Adjusted Gross Income (AGI)', value: agiIncome, set: setAgiIncome, step: 5000, prefix: '$' },
            { label: 'Your Tax Bracket', value: taxRate, set: setTaxRate, step: 1, suffix: '%' },
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
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total Tax Benefit" value={fmt(result.totalTaxBenefit)} highlight />
            <ResultCard label="Capital Gains Avoided" value={fmt(result.capitalGainsTaxAvoided)} subValue="by donating stock" />
            <ResultCard label="Effective Cost to Donate" value={fmt(result.effectiveCostToDonate)} subValue="after tax savings" />
            <ResultCard label="Cash Tax Savings" value={fmt(result.cashTaxSavings)} subValue="from deduction" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-green-700 mb-3">💵 Cash Donation</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Amount Donated</span><span className="font-bold">{fmt(result.cashDonation)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Deduction Allowed</span><span className="font-bold">{fmt(result.cashDeduction)}</span></div>
                <div className="flex justify-between text-green-600"><span>Tax Savings</span><span className="font-black">{fmt(result.cashTaxSavings)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Net Cost</span><span className="font-bold">{fmt(cashDonation - result.cashTaxSavings)}</span></div>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-blue-700 mb-3">📈 Appreciated Stock</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">FMV Donated</span><span className="font-bold">{fmt(result.stockFMV)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Deduction Allowed</span><span className="font-bold">{fmt(result.stockDeduction)}</span></div>
                <div className="flex justify-between text-green-600"><span>CG Tax Avoided</span><span className="font-semibold">{fmt(result.capitalGainsTaxAvoided)}</span></div>
                <div className="flex justify-between font-black text-green-700"><span>Total Savings</span><span>{fmt(result.stockTaxSavings)}</span></div>
              </div>
            </Card>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            <p className="font-bold mb-1">💡 {result.donorAdvisedFundTip}</p>
            <p className="mt-1">Total giving: {fmt(cashDonation + stockFMV)} | After-tax cost: {fmt(result.effectiveCostToDonate)} | You save {fmt(result.totalTaxBenefit)} in taxes.</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
