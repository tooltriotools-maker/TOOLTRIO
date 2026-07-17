'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateHSATripleTax } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [annualContrib, setAnnualContrib] = useState(4300)
  const [years, setYears] = useState(20)
  const [investmentReturn, setInvestmentReturn] = useState(7)
  const [taxRate, setTaxRate] = useState(24)
  const [familyCoverage, setFamilyCoverage] = useState(false)
  const result = useMemo(() => calculateHSATripleTax(annualContrib, years, investmentReturn, taxRate, familyCoverage), [annualContrib, years, investmentReturn, taxRate, familyCoverage])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  return (
    <CalculatorLayout title="HSA Triple Tax Growth Calculator USA 2026" description="See the power of the HSA triple tax advantage: pre-tax contributions, tax-free growth, and tax-free withdrawals." icon="🏥" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="hsa-triple-tax-growth-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">HSA Details</h2>
          {[
            { label: `Annual Contribution (2026 limit: ${familyCoverage ? '$8,550' : '$4,300'})`, value: annualContrib, set: setAnnualContrib, step: 100, prefix: '$' },
            { label: 'Years of Contributions', value: years, set: setYears, step: 1, suffix: 'yrs' },
            { label: 'Expected Investment Return', value: investmentReturn, set: setInvestmentReturn, step: 0.5, suffix: '%' },
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
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
            <span className="text-xs font-medium text-gray-600">Family Coverage?</span>
            <button onClick={() => setFamilyCoverage(!familyCoverage)} className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${familyCoverage ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}>{familyCoverage ? 'Family' : 'Individual'}</button>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-xs text-green-700">
            <p className="font-bold">Triple Tax Advantage:</p>
            {result.tripleAdvantage.map((a, i) => <p key={i} className="mt-1">{a}</p>)}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Final Balance" value={fmt(result.finalBalance)} highlight />
            <ResultCard label="Tax-Free Growth" value={fmt(result.taxFreeGrowth)} subValue="earnings" />
            <ResultCard label="Annual Tax Saved" value={fmt(result.taxDeductionAnnual)} subValue="each year" />
            <ResultCard label="Triple Tax Value" value={fmt(result.tripleTaxBenefit)} subValue="total benefit" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">HSA Growth Over Time</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={result.yearData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs><linearGradient id="hsaGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="year" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} label={{ value: 'Years', position: 'insideBottom', offset: -2, fontSize: 10 }} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={70} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} formatter={(v: number) => fmt(v)} labelFormatter={l => `Year ${l}`} />
                  <Area type="monotone" dataKey="balance" name="HSA Balance" stroke="#22c55e" fill="url(#hsaGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
            <p className="font-bold mb-1">💡 Stealth IRA Strategy</p>
            <p>After age 65, HSA funds can be used for ANY expense (not just medical) and taxed like a traditional IRA — making it an extra IRA with no contribution limits beyond the annual HSA max. Pay all medical bills out-of-pocket now and let your HSA compound tax-free for decades.</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
