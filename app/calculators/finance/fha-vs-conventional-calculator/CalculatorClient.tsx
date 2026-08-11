'use client'
import { useState, useMemo } from 'react'
import { calculateFHAvsConventional } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
const finalAuditFaqs = [
  {"question": "What should I check before using the Fha Vs Conventional Calculator?", "answer": "Check the values shown in the calculator and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Fha Vs Conventional Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculation based on entered values, not a guarantee of taxes, returns, eligibility, pricing, or other financial outcomes."},
  {"question": "How can I compare different Fha Vs Conventional Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. This makes it easier to identify which input is responsible for the difference between results."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [purchasePrice, setPurchasePrice] = useState(350000)
  const [downPaymentPct, setDownPaymentPct] = useState(5)
  const [creditScore, setCreditScore] = useState(680)
  const [loanTerm, setLoanTerm] = useState(30)
  const result = useMemo(() => calculateFHAvsConventional(purchasePrice, downPaymentPct, creditScore, loanTerm), [purchasePrice, downPaymentPct, creditScore, loanTerm])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  return (
    <CalculatorLayout title="FHA vs Conventional Mortgage Calculator USA 2026" description="Compare FHA and conventional loans: monthly payments, MIP vs PMI, and total cost over the loan term." icon="🏡" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="fha-vs-conventional-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Loan Details</h2>
          {[
            { label: 'Home Purchase Price', value: purchasePrice, set: setPurchasePrice, step: 10000, prefix: '$' },
            { label: `Down Payment: ${downPaymentPct}%`, value: downPaymentPct, set: setDownPaymentPct, step: 1, suffix: '%', isSlider: true },
            { label: 'Credit Score', value: creditScore, set: setCreditScore, step: 10, suffix: '' },
            { label: 'Loan Term (years)', value: loanTerm, set: setLoanTerm, step: 5, suffix: 'yrs' },
          ].map(({ label, value, set, step, prefix, suffix, isSlider }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              {isSlider ? (
                <>
                  <input type="range" min={3} max={30} step={1} value={value} onChange={e => set(Number(e.target.value))} className="w-full accent-green-500" />
                  <div className="flex justify-between text-xs text-gray-400"><span>3%</span><span>Down: {fmt(purchasePrice * value / 100)}</span><span>30%</span></div>
                </>
              ) : (
                <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                  {prefix && <span className="text-green-600 text-sm">{prefix}</span>}
                  <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
                  {suffix && <span className="text-gray-400 text-sm">{suffix}</span>}
                </div>
              )}
            </div>
          ))}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 text-xs text-blue-700">
            <p className="font-bold">Loan Amount: {fmt(result.loanAmount)}</p>
            <p className="mt-1">Down Payment: {fmt(result.downPayment)}</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <h3 className="text-sm font-bold text-blue-700 mb-3">🏛️ FHA Loan</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Interest Rate</span><span className="font-bold">{result.fha.rate}%</span></div>
                <div className="flex justify-between"><span className="text-gray-500">MIP Upfront</span><span className="font-semibold text-orange-500">{fmt(result.fha.mipUpfront)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Monthly MIP</span><span className="font-semibold text-orange-500">+{fmt(result.fha.mipMonthly)}/mo</span></div>
                <div className="border-t pt-2 flex justify-between"><span className="font-bold">Monthly Payment</span><span className="font-black text-blue-700">{fmt(result.fha.monthly)}</span></div>
                <div className="flex justify-between text-xs text-gray-400"><span>Total Cost ({loanTerm}yr)</span><span>{fmt(result.fha.totalCost)}</span></div>
              </div>
            </Card>
            <Card>
              <h3 className="text-sm font-bold text-green-700 mb-3">🏦 Conventional</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Interest Rate</span><span className="font-bold">{result.conventional.rate}%</span></div>
                <div className="flex justify-between"><span className="text-gray-500">PMI Monthly</span><span className="font-semibold text-orange-500">{result.conventional.pmi > 0 ? `+${fmt(result.conventional.pmi)}/mo` : 'None ✓'}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">MIP Upfront</span><span className="text-green-600">None ✓</span></div>
                <div className="border-t pt-2 flex justify-between"><span className="font-bold">Monthly Payment</span><span className="font-black text-green-700">{fmt(result.conventional.monthly)}</span></div>
                <div className="flex justify-between text-xs text-gray-400"><span>Total Cost ({loanTerm}yr)</span><span>{fmt(result.conventional.totalCost)}</span></div>
              </div>
            </Card>
          </div>
          <div className={`rounded-xl p-4 text-sm font-semibold text-center border-2 ${result.totalSavings > 0 ? 'bg-green-50 text-green-800 border-green-200' : 'bg-blue-50 text-blue-800 border-blue-200'}`}>
            💡 {result.recommendation} {result.totalSavings > 0 ? `— Conventional saves ${fmt(result.totalSavings)} over ${loanTerm} years` : `— Compare actual FHA and conventional Loan Estimates`}
          </div>
          {downPaymentPct < 20 && <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800"><p className="font-bold">💡 Tip: 20% Down Avoids PMI</p><p className="mt-1">A 20% down payment ({fmt(purchasePrice * 0.20)}) eliminates conventional PMI entirely. FHA MIP lasts the life of the loan if you put less than 10% down.</p></div>}
        </div>
      </div>
      
      <div className="mt-8 space-y-6">
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">How the FHA vs Conventional Model Works</h2><p className="text-sm text-gray-600">The calculator starts with purchase price and down-payment percentage to get the base loan amount. It then applies its built-in illustrative FHA and conventional interest-rate adjustments by credit-score band, adds modeled FHA mortgage insurance or conventional PMI, and amortizes principal and interest over the selected term.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Insurance and Rate Assumptions</h2><p className="text-sm text-gray-600">The 6.5% FHA base rate, 6.3% conventional base rate, 0.85% annual FHA MIP and 0.8% conventional PMI used by this calculator are ToolTrio assumptions—not live lender quotes. Actual FHA MIP depends on loan characteristics, and conventional PMI depends on lender/insurer underwriting.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Worked Example</h2><p className="text-sm text-gray-600">For a $350,000 home with 5% down, the base loan is $332,500 before any financed FHA upfront MIP. The calculator then applies its modeled rates and insurance charges to compare monthly and full-term totals. Taxes, homeowners insurance, HOA fees and closing costs are outside this comparison.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">2026 Limits and Limitations</h2><p className="text-sm text-gray-600">FHA loan limits vary by county. For 2026 the one-unit FHA floor is $541,287 and the high-cost ceiling is $1,249,125. This calculator does not check the property's county limit or determine FHA/conventional eligibility, debt-to-income qualification, appraisal rules or actual pricing.</p><p className="text-sm mt-2"><a className="text-blue-600 underline" href="https://www.hud.gov/hud-partners/single-family-lender" target="_blank" rel="noreferrer">HUD/FHA: 2026 mortgage limits</a></p></Card>
      </div>

      <div className="mt-6"><FAQSection faqs={finalAuditFaqs} /></div>
    </CalculatorLayout>
  )
}
