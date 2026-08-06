'use client'
import { useState, useMemo } from 'react'
import { calculateDefinedBenefitPension } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
const finalAuditFaqs = [
  {"question": "What should I check before using the Defined Benefit Pension Calculator?", "answer": "Check Monthly Benefit, Annual Benefit, Replacement Rate, Lifetime Value and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Defined Benefit Pension Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculation based on entered values, not a guarantee of taxes, returns, eligibility, pricing, or other financial outcomes."},
  {"question": "How can I compare different Defined Benefit Pension Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. This makes it easier to identify which input is responsible for the difference between results."}
];

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
      
      <div className="mt-8 space-y-6">
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">How the Pension Formula Works</h2><p className="text-sm text-gray-600">The core annual pension estimate is Years of Service × Benefit Multiplier × Final Average Salary. Monthly benefit is the annual amount divided by 12. The replacement rate is the modeled annual pension divided by the entered final salary.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Early Retirement and Lifetime Value</h2><p className="text-sm text-gray-600">This ToolTrio model reduces the pension by 5% for each year between the entered early-retirement age and normal-retirement age. It then projects full benefits only to age 85 and labels 75% of that undiscounted total as a “lump sum equivalent.” Those are calculator assumptions, not rules from your pension plan.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Worked Example</h2><p className="text-sm text-gray-600">With 25 years of service, an $80,000 final average salary and a 1.5% multiplier, the formula produces $30,000 per year, or $2,500 per month, before any plan-specific adjustment. Retiring 10 years before the entered normal age would trigger this model's 50% reduction.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Important Limitations</h2><p className="text-sm text-gray-600">Real defined-benefit plans define compensation, service credits, early-retirement factors, survivor options, COLAs and lump-sum conversions in the plan document. The calculator does not value a pension using current actuarial interest/mortality assumptions and should not be used to elect a payout option.</p><p className="text-sm mt-2"><a className="text-blue-600 underline" href="https://www.irs.gov/retirement-plans/cola-increases-for-dollar-limitations-on-benefits-and-contributions" target="_blank" rel="noreferrer">IRS: Retirement-plan limits</a></p></Card>
      </div>

      <div className="mt-6"><FAQSection faqs={finalAuditFaqs} /></div>
    </CalculatorLayout>
  )
}
