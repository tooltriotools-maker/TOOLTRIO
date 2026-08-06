'use client'
import { useState, useMemo } from 'react'
import { calculateCharitableGiving } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
const finalAuditFaqs = [
  {"question": "What should I check before using the Charitable Giving Tax Calculator?", "answer": "Check Total Tax Benefit, Capital Gains Avoided, Effective Cost to Donate, Cash Tax Savings and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Charitable Giving Tax Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculation based on entered values, not a guarantee of taxes, returns, eligibility, pricing, or other financial outcomes."},
  {"question": "How can I compare different Charitable Giving Tax Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. This makes it easier to identify which input is responsible for the difference between results."}
];

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
      
      <div className="mt-8 space-y-6">
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">How the Donation Comparison Works</h2><p className="text-sm text-gray-600">The calculator separately models cash and appreciated-stock donations. It caps the cash deduction at a percentage of AGI, caps the stock deduction at a lower percentage, applies your entered marginal rate to the modeled deduction, and estimates avoided capital-gain tax on appreciation at a fixed 20% rate.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">2026 Deduction Rules the Model Does Not Fully Capture</h2><p className="text-sm text-gray-600">Beginning in 2026, itemizers generally face a 0.5%-of-AGI floor for charitable contributions. Non-itemizers may have a limited deduction for qualifying cash gifts. Deduction limits also depend on the type of property and recipient organization. Because this calculator does not model all of those rules, its “tax benefit” is an illustration rather than a return-ready deduction.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Worked Example</h2><p className="text-sm text-gray-600">For stock worth $10,000 with a $2,000 basis, the embedded 20% capital-gain assumption produces $1,600 of modeled avoided gain tax if the shares qualify for fair-market-value deduction treatment. The actual result can differ with holding period, deduction limits, tax rate and whether the charity can accept the property.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Limitations and IRS Sources</h2><p className="text-sm text-gray-600">The calculator does not determine whether you itemize, whether an organization is qualified, whether appraisal/substantiation rules apply, or how carryovers work. A donor-advised fund does not automatically create a larger deduction than direct giving; the page's DAF message is only a planning prompt.</p><p className="text-sm mt-2"><a className="text-blue-600 underline" href="https://www.irs.gov/taxtopics/tc506" target="_blank" rel="noreferrer">IRS Topic 506: Charitable contributions</a> · <a className="text-blue-600 underline" href="https://www.irs.gov/publications/p505" target="_blank" rel="noreferrer">IRS Publication 505 (2026 changes)</a></p></Card>
      </div>

      <div className="mt-6"><FAQSection faqs={finalAuditFaqs} /></div>
    </CalculatorLayout>
  )
}
