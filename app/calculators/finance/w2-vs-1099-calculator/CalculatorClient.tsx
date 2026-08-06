'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateW2vs1099 } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { InternalLinks } from '@/components/ui/InternalLinks'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [grossIncome, setGrossIncome] = useState(100000)
  const [businessExpenses, setBusinessExpenses] = useState(10000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')

  const result = useMemo(() => calculateW2vs1099(grossIncome, businessExpenses, filingStatus), [grossIncome, businessExpenses, filingStatus])

  const chartData = [
    { name: 'W-2 Employee', 'Federal Tax': result.w2.federalTax, 'FICA Tax': result.w2.ficaTax, 'Net Take-Home': result.w2.netTakeHome },
    { name: '1099 Contractor', 'SE Tax': result.contractor.seTax, 'Federal Tax': result.contractor.federalTax, 'Net Take-Home': result.contractor.netTakeHome },
  ]

  const fmt = (v: number) => '$' + v.toLocaleString()

  return (
    <CalculatorLayout title="W-2 vs 1099 Calculator USA 2026" description="Compare true take-home pay as a W-2 employee vs 1099 independent contractor after all taxes." icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="w2-vs-1099-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Gross Annual Income</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={grossIncome} onChange={e => setGrossIncome(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Business Expenses (1099 only)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={businessExpenses} onChange={e => setBusinessExpenses(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Filing Status</label>
            <div className="grid grid-cols-2 gap-2">
              {(['single', 'married'] as const).map(s => (
                <button key={s} onClick={() => setFilingStatus(s)} className={`py-2 rounded-xl text-xs font-semibold transition-all ${filingStatus === s ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div className={`rounded-xl p-3 text-xs font-semibold text-center ${result.advantageFor === 'W-2' ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
            {result.advantageFor === 'W-2' ? '🏢 W-2 has lower total tax' : '💼 1099 may have lower net tax with deductions'}
          </div>
        </Card>

        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Card className="space-y-3">
              <h3 className="text-sm font-bold text-blue-700">🏢 W-2 Employee</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Gross Income</span><span className="font-bold">{fmt(result.w2.grossIncome)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Federal Tax</span><span className="font-semibold text-red-500">-{fmt(result.w2.federalTax)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">FICA Tax</span><span className="font-semibold text-red-500">-{fmt(result.w2.ficaTax)}</span></div>
                <div className="border-t pt-2 flex justify-between"><span className="font-bold text-gray-800">Net Take-Home</span><span className="font-black text-blue-700">{fmt(result.w2.netTakeHome)}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-400">Effective Rate</span><span className="font-semibold">{result.w2.effectiveRate}%</span></div>
              </div>
            </Card>
            <Card className="space-y-3">
              <h3 className="text-sm font-bold text-green-700">💼 1099 Contractor</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Gross Income</span><span className="font-bold">{fmt(result.contractor.grossIncome)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Business Expenses</span><span className="font-semibold text-green-600">-{fmt(result.contractor.businessExpenses)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">SE Tax (15.3%)</span><span className="font-semibold text-red-500">-{fmt(result.contractor.seTax)}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Federal Tax</span><span className="font-semibold text-red-500">-{fmt(result.contractor.federalTax)}</span></div>
                <div className="flex justify-between text-xs text-green-600"><span>QBI Deduction</span><span className="font-semibold">-{fmt(result.contractor.qbiDeduction)}</span></div>
                <div className="border-t pt-2 flex justify-between"><span className="font-bold text-gray-800">Net Take-Home</span><span className="font-black text-green-700">{fmt(result.contractor.netTakeHome)}</span></div>
                <div className="flex justify-between text-xs"><span className="text-gray-400">Effective Rate</span><span className="font-semibold">{result.contractor.effectiveRate}%</span></div>
              </div>
            </Card>
          </div>

          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Tax Comparison</h3>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={60} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar dataKey="Federal Tax" fill="#ef4444" radius={[4,4,0,0]} />
                  <Bar dataKey="FICA Tax" fill="#f97316" radius={[4,4,0,0]} />
                  <Bar dataKey="SE Tax" fill="#dc2626" radius={[4,4,0,0]} />
                  <Bar dataKey="Net Take-Home" fill="#22c55e" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm">
            <p className="font-bold text-amber-800 mb-1">💡 Break-Even Point</p>
            <p className="text-amber-700">As a 1099 contractor, you need to earn at least <strong>${result.breakEvenExpenses.toLocaleString()} more</strong> than your W-2 equivalent to cover the extra SE tax burden (before expenses).</p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <FAQSection faqs={faqs} />
        <InternalLinks title="Related Tax Calculators" variant="grid" links={[
          { name: 'Self-Employment Tax', href: '/calculators/finance/self-employment-tax-calculator', icon: '💼', desc: 'SE tax calculator' },
          { name: 'Income Tax Calculator', href: '/calculators/finance/income-tax-calculator', icon: '📋', desc: 'Federal income tax' },
          { name: 'Paycheck Calculator', href: '/calculators/finance/paycheck-calculator', icon: '💵', desc: 'Take-home pay' },
          { name: 'Tax Bracket Calculator', href: '/calculators/finance/tax-bracket-calculator', icon: '🧾', desc: 'Tax brackets 2026' },
        ]} />
      
      <div className="mt-6">
        <Card>
          <h2 className="text-lg font-bold text-gray-900 mb-3">How to review the w2 vs 1099 calculator result</h2>
          <div className="space-y-3 text-sm leading-6 text-gray-600">
            <p>Review the calculated output together with the inputs shown in the calculator. The result reflects the values entered and the calculation implemented by this tool.</p>
            <p>When comparing alternatives, change one input at a time while keeping the other assumptions constant. This makes the effect of each input easier to understand.</p>
          </div>
        </Card>
      </div>
</div>
    </CalculatorLayout>
  )
}
