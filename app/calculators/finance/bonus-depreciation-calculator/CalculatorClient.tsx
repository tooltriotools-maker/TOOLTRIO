'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateBonusDepreciation } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
const finalAuditFaqs = [
  {"question": "What should I check before using the Bonus Depreciation Calculator?", "answer": "Check Year 1 Deduction, Tax Savings Year 1, Straight-Line Annual, Acceleration Benefit and make sure each value uses the unit or format requested by the calculator. The result is based on the values you enter."},
  {"question": "How should I interpret the Bonus Depreciation Calculator result?", "answer": "Read the result together with the inputs and assumptions shown on the page. It is a calculation based on entered values, not a guarantee of taxes, returns, eligibility, pricing, or other financial outcomes."},
  {"question": "How can I compare different Bonus Depreciation Calculator scenarios?", "answer": "Change one input at a time while keeping the other values unchanged. This makes it easier to identify which input is responsible for the difference between results."}
];

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [assetCost, setAssetCost] = useState(50000)
  const [assetLife, setAssetLife] = useState(5)
  const [bonusPct, setBonusPct] = useState(100)
  const [taxRate, setTaxRate] = useState(24)
  const result = useMemo(() => calculateBonusDepreciation(assetCost, assetLife, bonusPct, taxRate), [assetCost, assetLife, bonusPct, taxRate])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  const chartData = [
    { name: 'Sec 179', value: result.sec179Deduction },
    { name: 'Bonus Dep.', value: result.bonusDepreciation },
    { name: 'MACRS Yr1', value: result.macrsYear1 },
    { name: 'Remaining', value: result.remainingBasis },
  ]
  return (
    <CalculatorLayout title="Section 179 & Bonus Depreciation Calculator USA 2026" description="Calculate Year 1 tax deductions from Section 179 and bonus depreciation for business assets." icon="🏗️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="bonus-depreciation-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Asset Details</h2>
          {[
            { label: 'Asset Cost', value: assetCost, set: setAssetCost, step: 5000, prefix: '$' },
            { label: 'Asset Useful Life (years)', value: assetLife, set: setAssetLife, step: 1, suffix: 'yrs' },
            { label: 'Bonus Depreciation % (2026: 20%)', value: bonusPct, set: setBonusPct, step: 5, suffix: '%' },
            { label: 'Business Tax Rate', value: taxRate, set: setTaxRate, step: 1, suffix: '%' },
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
            <p className="font-bold">2026 Sec 179 Limit: $1,220,000</p>
            <p className="mt-1">Bonus: 40% in 2025 → 20% in 2026</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Year 1 Deduction" value={fmt(result.totalYear1Deduction)} highlight />
            <ResultCard label="Tax Savings Year 1" value={fmt(result.taxSavingsYear1)} subValue="immediate benefit" />
            <ResultCard label="Straight-Line Annual" value={fmt(result.straightLineAnnual)} subValue="without bonus" />
            <ResultCard label="Acceleration Benefit" value={fmt(result.accelerationBenefit)} subValue="vs straight-line" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Year 1 Deduction Breakdown</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={65} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                  <Bar dataKey="value" fill="#22c55e" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Deduction Breakdown</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Section 179 Deduction', value: result.sec179Deduction, color: 'text-blue-600' },
                { label: 'Bonus Depreciation (' + bonusPct + '%)', value: result.bonusDepreciation, color: 'text-green-600' },
                { label: 'MACRS Year 1 (remaining basis)', value: result.macrsYear1, color: 'text-purple-600' },
              ].map(r => (
                <div key={r.label} className="flex justify-between">
                  <span className="text-gray-500">{r.label}</span>
                  <span className={'font-bold ' + r.color}>{fmt(r.value)}</span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total Year 1 Deduction</span><span className="text-green-700">{fmt(result.totalYear1Deduction)}</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>Remaining Basis (future years)</span><span>{fmt(result.remainingBasis)}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mt-8 space-y-6">
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">How the First-Year Deduction Estimate Works</h2><p className="text-sm text-gray-600">The model applies Section 179 first, then bonus depreciation to remaining eligible basis, then a simplified first-year depreciation estimate to any basis left. For 2026 the calculator uses the $2.56 million Section 179 dollar limit and $4.09 million phaseout threshold, and defaults eligible bonus depreciation to 100%.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Understanding the Inputs</h2><p className="text-sm text-gray-600">Asset cost is not automatically the deductible amount. Eligibility, business-use percentage, placed-in-service date, taxable-income limits, total Section 179 property acquired during the year and special vehicle/property rules can restrict deductions. Asset life is used only for this calculator's simplified remaining-basis comparison.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Worked Example</h2><p className="text-sm text-gray-600">If a business places $100,000 of fully eligible property in service in 2026 and has enough taxable business income for a Section 179 election, the model can expense the full $100,000 under Section 179, leaving no basis for bonus or regular depreciation. That does not mean every $100,000 asset qualifies.</p></Card>
        <Card><h2 className="text-lg font-bold text-gray-900 mb-2">Limitations and IRS Sources</h2><p className="text-sm text-gray-600">This is not Form 4562. The simplified MACRS line is not a substitute for the correct recovery period, convention and depreciation method. The model also cannot determine whether property is eligible for Section 179 or bonus depreciation.</p><p className="text-sm mt-2"><a className="text-blue-600 underline" href="https://www.irs.gov/publications/p946" target="_blank" rel="noreferrer">IRS Publication 946</a> · <a className="text-blue-600 underline" href="https://www.irs.gov/newsroom/treasury-irs-issue-guidance-on-the-additional-first-year-depreciation-deduction-amended-as-part-of-the-one-big-beautiful-bill" target="_blank" rel="noreferrer">IRS 100% bonus-depreciation guidance</a></p></Card>
      </div>

      <div className="mt-6"><FAQSection faqs={finalAuditFaqs} /></div>
    </CalculatorLayout>
  )
}
