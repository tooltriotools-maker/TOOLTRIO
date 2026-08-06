'use client'
import { useState, useMemo } from 'react'
import { calculateAlimonyTaxImpact } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
const finalAuditFaqs = [
  {"question": "What should I check before using the Alimony Tax Calculator?", "answer": "Check Annual Alimony, Payer Net Cost, Recipient Net Received, Payer Deduction and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Alimony Tax Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculation based on entered values, not a guarantee of taxes, returns, eligibility, pricing, or other financial outcomes."},
  {"question": "How can I compare different Alimony Tax Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. This makes it easier to identify which input is responsible for the difference between results."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [alimonyAmount, setAlimonyAmount] = useState(30000)
  const [divorceYear, setDivorceYear] = useState(2020)
  const [payerIncome, setPayerIncome] = useState(150000)
  const [recipientIncome, setRecipientIncome] = useState(50000)
  const [payerTaxRate, setPayerTaxRate] = useState(32)
  const [recipientTaxRate, setRecipientTaxRate] = useState(22)
  const result = useMemo(() => calculateAlimonyTaxImpact(alimonyAmount, divorceYear, payerIncome, recipientIncome, payerTaxRate, recipientTaxRate), [alimonyAmount, divorceYear, payerIncome, recipientIncome, payerTaxRate, recipientTaxRate])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  return (
    <CalculatorLayout title="Alimony Tax Calculator USA 2026" description="Calculate alimony tax impact for payer and recipient under pre-2019 and post-TCJA rules." icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="alimony-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Alimony Details</h2>
          {[
            { label: 'Annual Alimony Payment', value: alimonyAmount, set: setAlimonyAmount, step: 1000, prefix: '$' },
            { label: 'Year Divorce Finalized', value: divorceYear, set: setDivorceYear, step: 1, suffix: '' },
            { label: "Payer's Tax Bracket", value: payerTaxRate, set: setPayerTaxRate, step: 1, suffix: '%' },
            { label: "Recipient's Tax Bracket", value: recipientTaxRate, set: setRecipientTaxRate, step: 1, suffix: '%' },
          ].map(({ label, value, set, step, prefix, suffix }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                {prefix && <span className="text-green-600 text-sm">{prefix}</span>}
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
                {suffix !== undefined && <span className="text-gray-400 text-sm">{suffix}</span>}
              </div>
            </div>
          ))}
          <div className={`rounded-xl p-3 text-xs font-semibold text-center border ${result.isOldLaw ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
            {result.isOldLaw ? '📜 Pre-2019 Rules Apply — Deductible / Taxable' : '🆕 TCJA Rules Apply — Neither deductible nor taxable'}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Annual Alimony" value={fmt(result.annualAlimony)} />
            <ResultCard label="Payer Net Cost" value={fmt(result.payerNetCost)} subValue={result.isOldLaw ? 'after deduction' : 'no deduction'} highlight />
            <ResultCard label="Recipient Net Received" value={fmt(result.recipientNetReceived)} subValue={result.isOldLaw ? 'after taxes' : 'tax-free'} />
            <ResultCard label="Payer Deduction" value={fmt(result.payerDeduction)} subValue={result.isOldLaw ? 'tax savings' : 'not available'} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-red-600 mb-3">💸 Payer ({payerTaxRate}% bracket)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Annual Payment</span><span className="font-bold">{fmt(result.annualAlimony)}</span></div>
                {result.isOldLaw ? (
                  <div className="flex justify-between text-green-600"><span>Tax Deduction</span><span className="font-semibold">-{fmt(result.payerDeduction)}</span></div>
                ) : (
                  <div className="flex justify-between text-gray-400"><span>Deduction</span><span>None (TCJA)</span></div>
                )}
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Net Annual Cost</span><span className="text-red-600">{fmt(result.payerNetCost)}</span>
                </div>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-green-700 mb-3">💰 Recipient ({recipientTaxRate}% bracket)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Amount Received</span><span className="font-bold">{fmt(result.annualAlimony)}</span></div>
                {result.isOldLaw ? (
                  <div className="flex justify-between text-red-500"><span>Income Tax Owed</span><span className="font-semibold">-{fmt(result.recipientTaxBurden)}</span></div>
                ) : (
                  <div className="flex justify-between text-green-600"><span>Tax (TCJA)</span><span>$0 — tax-free</span></div>
                )}
                <div className="border-t pt-2 flex justify-between font-bold">
                  <span>Net Received</span><span className="text-green-700">{fmt(result.recipientNetReceived)}</span>
                </div>
              </div>
            </Card>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-bold mb-1">📋 {result.taxRule}</p>
            <p>{result.note}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 space-y-6">
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">How Federal Alimony Tax Treatment Is Modeled</h2><p className="text-sm text-gray-600">The calculator compares the annual payment with the payer's and recipient's entered marginal tax rates. For qualifying instruments executed before 2019, it models a payer deduction and recipient taxable income. For instruments executed after 2018, it models neither a payer deduction nor recipient income.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Why the Agreement Date Matters</h2><p className="text-sm text-gray-600">A pre-2019 agreement can be affected by a later modification if the modification expressly adopts the post-2018 federal treatment. This calculator only asks for the divorce/agreement year and cannot read the terms of a modification, distinguish child support or property settlements, or determine whether a payment legally qualifies as alimony.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Worked Example</h2><p className="text-sm text-gray-600">For $24,000 of annual qualifying alimony under an unmodified 2018 instrument, a payer entering a 32% marginal rate would see a modeled $7,680 federal tax effect, while a recipient entering 22% would see $5,280 of modeled tax. For a 2020 instrument, this calculator sets both federal effects to zero.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Limitations and Source</h2><p className="text-sm text-gray-600">The result is a federal income-tax illustration. It does not calculate state treatment, filing status, actual taxable income, withholding, estimated tax, recapture rules or the legal classification of payments.</p><p className="text-sm mt-2"><a className="text-blue-600 underline" href="https://www.irs.gov/taxtopics/tc452" target="_blank" rel="noreferrer">IRS Topic 452: Alimony and separate maintenance</a></p></Card>
      </div>

      <div className="mt-6"><FAQSection faqs={finalAuditFaqs} /></div>
    </CalculatorLayout>
  )
}
