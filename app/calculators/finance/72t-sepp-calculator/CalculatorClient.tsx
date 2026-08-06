'use client'
import { useState, useMemo } from 'react'
import { calculate72TSEPP } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

const finalAuditFaqs = [
  {"question": "What should I check before using the 72t Sepp Calculator?", "answer": "Check Annual Payment, Monthly Payment, Modification Age, Years Locked In and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the 72t Sepp Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculation based on entered values, not a guarantee of taxes, returns, eligibility, pricing, or other financial outcomes."},
  {"question": "How can I compare different 72t Sepp Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. This makes it easier to identify which input is responsible for the difference between results."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [accountBalance, setAccountBalance] = useState(500000)
  const [age, setAge] = useState(45)
  const [interestRate, setInterestRate] = useState(5)
  const [method, setMethod] = useState<'rmd' | 'amortization' | 'annuity'>('amortization')

  const result = useMemo(() => calculate72TSEPP(accountBalance, age, method, interestRate), [accountBalance, age, method, interestRate])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()

  const methods = [{ id: 'rmd' as const, label: 'RMD Method', desc: 'Lowest, recalculates yearly' }, { id: 'amortization' as const, label: 'Amortization', desc: 'Highest, fixed payment' }, { id: 'annuity' as const, label: 'Annuity Factor', desc: 'Similar to amortization' }]

  return (
    <CalculatorLayout title="Rule 72(t) SEPP Calculator USA 2026" description="Calculate penalty-free early IRA withdrawals using Substantially Equal Periodic Payments." icon="🔓" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="72t-sepp-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Account Details</h2>
          {[{ label: 'IRA / 401k Balance', value: accountBalance, set: setAccountBalance, step: 10000, prefix: '$' }, { label: 'Your Current Age', value: age, set: setAge, step: 1, suffix: 'yrs' }, { label: 'SEPP Interest Rate Assumption', value: interestRate, set: setInterestRate, step: 0.5, suffix: '%' }].map(({ label, value, set, step, prefix, suffix }) => (
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
            <label className="text-xs font-medium text-gray-600">Calculation Method</label>
            {methods.map(m => (
              <button key={m.id} onClick={() => setMethod(m.id)} className={`w-full py-2 px-3 rounded-xl text-xs font-semibold text-left transition-all ${method === m.id ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <span className="font-bold">{m.label}</span><br/><span className="opacity-75">{m.desc}</span>
              </button>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Annual Payment" value={fmt(result.annualPayment)} highlight />
            <ResultCard label="Monthly Payment" value={fmt(result.monthlyPayment)} />
            <ResultCard label="Modification Age" value={result.modificationAge.toString()} subValue="can change plan" />
            <ResultCard label="Years Locked In" value={result.yearsUntilModification.toString()} subValue="years" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Compare All Methods</h3>
            <div className="space-y-3">
              {[{ name: 'RMD Method', amount: result.rmdPayment, color: 'bg-blue-400' }, { name: 'Amortization', amount: result.amortizationPayment, color: 'bg-green-500' }, { name: 'Annuity Factor', amount: result.annuityPayment, color: 'bg-purple-400' }].map(m => (
                <div key={m.name} className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${m.color}`} />
                  <span className="text-sm text-gray-600 flex-1">{m.name}</span>
                  <div className="bg-gray-100 rounded-lg h-3 flex-1 overflow-hidden">
                    <div className={`h-full ${m.color}`} style={{ width: `${(m.amount / result.amortizationPayment) * 100}%` }} />
                  </div>
                  <span className="font-bold text-sm w-24 text-right">{fmt(m.amount)}/yr</span>
                </div>
              ))}
            </div>
          </Card>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
            <p className="font-bold mb-1">⚠️ Important: SEPP Rules</p>
            <p>You must continue these payments for at least 5 years OR until age 59½ — whichever is longer. Modifying the plan early triggers a 10% penalty on ALL prior distributions plus interest.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 space-y-6">
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">How the 72(t) Comparison Works</h2><p className="text-sm text-gray-600">The calculator compares three payment estimates from the entered account balance, age and interest rate. Its RMD estimate divides the balance by a simplified life-expectancy value; its amortization and annuity estimates use a level-payment present-value calculation. These are planning approximations, not an implementation of the IRS life-expectancy and mortality tables.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Interest Rate and Payment Duration</h2><p className="text-sm text-gray-600">For a real substantially equal periodic payment plan, the selected interest rate cannot exceed the IRS permitted maximum, and the permitted life-expectancy tables depend on the method. A SEPP generally must continue until the later of five years or age 59½. The input labeled interest rate is therefore a SEPP calculation assumption—not an expected portfolio return.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Worked Example and Interpretation</h2><p className="text-sm text-gray-600">With a $500,000 account, age 45 and a 5% entered rate, the page lets you compare its three modeled annual amounts. Use the comparison to understand why method choice changes cash flow; do not use the displayed amount to start distributions without calculating the permitted IRS method from the applicable tables and account valuation date.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Important Limitations</h2><p className="text-sm text-gray-600">The ToolTrio life-expectancy shortcut (90 minus age) is not an IRS table. The displayed early-exit figure is also only 10% of one modeled annual payment; an actual modification can trigger recapture of the additional tax on prior distributions plus interest. Obtain tax advice before establishing or changing a SEPP.</p><p className="text-sm mt-2"><a className="text-blue-600 underline" href="https://www.irs.gov/retirement-plans/substantially-equal-periodic-payments" target="_blank" rel="noreferrer">IRS: Substantially equal periodic payments</a></p></Card>
      </div>

      <div className="mt-6"><FAQSection faqs={finalAuditFaqs} /></div>
    </CalculatorLayout>
  )
}
