'use client'
import { useState, useMemo } from 'react'
import { calculateFreelancerQuarterlyTax } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [annualIncome, setAnnualIncome] = useState(100000)
  const [businessExpenses, setBusinessExpenses] = useState(15000)
  const [retirementContribs, setRetirementContribs] = useState(20000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const [priorYearTax, setPriorYearTax] = useState(12000)
  const result = useMemo(() => calculateFreelancerQuarterlyTax(annualIncome, businessExpenses, retirementContribs, filingStatus, priorYearTax), [annualIncome, businessExpenses, retirementContribs, filingStatus, priorYearTax])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  const quarterColors = ['bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500']
  return (
    <CalculatorLayout title="Freelancer Quarterly Tax Calculator USA 2026" description="Calculate quarterly estimated tax payments for freelancers and self-employed workers — including SE tax, QBI, and safe harbor amounts." icon="📅" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="freelancer-quarterly-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Your Business</h2>
          {[
            { label: 'Gross Annual Income', value: annualIncome, set: setAnnualIncome, step: 5000, prefix: '$' },
            { label: 'Business Expenses', value: businessExpenses, set: setBusinessExpenses, step: 1000, prefix: '$' },
            { label: 'Retirement Contributions', value: retirementContribs, set: setRetirementContribs, step: 1000, prefix: '$' },
            { label: 'Prior Year Tax Liability', value: priorYearTax, set: setPriorYearTax, step: 500, prefix: '$' },
          ].map(({ label, value, set, step, prefix }) => (
            <div key={label} className="space-y-1">
              <label className="text-xs font-medium text-gray-600">{label}</label>
              <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
                {prefix && <span className="text-green-600 text-sm">{prefix}</span>}
                <input type="number" value={value} onChange={e => set(Number(e.target.value))} step={step} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2">
            {(['single', 'married'] as const).map(s => (
              <button key={s} onClick={() => setFilingStatus(s)} className={`py-2 rounded-xl text-xs font-semibold ${filingStatus === s ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'}`}>{s.charAt(0).toUpperCase() + s.slice(1)}</button>
            ))}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Quarterly Payment" value={fmt(result.quarterlyPayment)} highlight />
            <ResultCard label="Annual Tax Total" value={fmt(result.totalAnnualTax)} subValue="fed + SE tax" />
            <ResultCard label="SE Tax" value={fmt(result.seTax)} subValue="15.3% self-emp" />
            <ResultCard label="Effective Rate" value={result.effectiveRate + '%'} subValue="on gross income" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">2026 Quarterly Payment Schedule</h3>
            <div className="space-y-2">
              {result.paymentSchedule.map((p, i) => (
                <div key={p.quarter} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${quarterColors[i]}`}>{p.quarter}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">Due: {p.dueDate}</p>
                    <p className="text-xs text-gray-400">Safe harbor amount</p>
                  </div>
                  <span className="font-black text-green-700">{fmt(p.amount)}</span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Tax Breakdown</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Net Income (after expenses)', value: fmt(result.netIncome), color: '' },
                { label: 'SE Tax Deduction (½ of SE)', value: '-' + fmt(result.seDeduction), color: 'text-green-600' },
                { label: 'QBI Deduction (20%)', value: '-' + fmt(result.qbiDeduction), color: 'text-green-600' },
                { label: 'Self-Employment Tax (15.3%)', value: fmt(result.seTax), color: 'text-red-500' },
                { label: 'Federal Income Tax', value: fmt(result.federalTax), color: 'text-red-500' },
              ].map(r => (
                <div key={r.label} className="flex justify-between">
                  <span className="text-gray-500">{r.label}</span>
                  <span className={'font-semibold ' + r.color}>{r.value}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-black text-gray-800">
                <span>Total Annual Tax</span><span className="text-red-600">{fmt(result.totalAnnualTax)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to use and interpret this freelancer quarterly tax calculator</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>This calculator uses Quarterly Payment, Annual Tax Total, SE Tax, Effective Rate to produce the results displayed above. Change one input at a time when comparing scenarios so you can see which assumption is responsible for the difference.</p>
            <p>The result is an estimate produced from the calculator&apos;s implemented formula and the values you enter. Review the units, time period, and assumptions before using the output for a decision; a calculated result does not add information that is not represented by the inputs.</p>
            <p>Use the worked output as a planning or comparison aid. Real-world results can differ when taxes, fees, eligibility rules, measurement error, market conditions, or other factors not represented by this calculator apply.</p>
          </div>
          <p className="mt-3 text-xs text-gray-500">Full-site audit interpretation: this section describes the calculator implementation on this page and does not change its underlying formula.</p>
        </Card>
      </div>
<div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
