'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { calculateCapitalGainsHarvesting } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [portfolioValue, setPortfolioValue] = useState(500000)
  const [unrealizedGains, setUnrealizedGains] = useState(80000)
  const [unrealizedLosses, setUnrealizedLosses] = useState(25000)
  const [ordinaryIncome, setOrdinaryIncome] = useState(70000)
  const [filingStatus, setFilingStatus] = useState<'single' | 'married'>('single')
  const result = useMemo(() => calculateCapitalGainsHarvesting(portfolioValue, unrealizedGains, unrealizedLosses, ordinaryIncome, filingStatus), [portfolioValue, unrealizedGains, unrealizedLosses, ordinaryIncome, filingStatus])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  const chartData = [
    { name: 'At 0%', value: result.breakdown.at0pct },
    { name: 'At 15%', value: result.breakdown.at15pct },
    { name: 'At 20%', value: result.breakdown.at20pct },
  ]
  return (
    <CalculatorLayout title="Capital Gains Harvesting Calculator USA 2026" description="Optimize your capital gains and losses — find 0% LTCG space, harvest losses to offset gains, and minimize taxes." icon="🌱" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="capital-gains-harvesting-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Portfolio Details</h2>
          {[
            { label: 'Portfolio Value', value: portfolioValue, set: setPortfolioValue, step: 25000, prefix: '$' },
            { label: 'Unrealized Gains', value: unrealizedGains, set: setUnrealizedGains, step: 5000, prefix: '$' },
            { label: 'Unrealized Losses', value: unrealizedLosses, set: setUnrealizedLosses, step: 5000, prefix: '$' },
            { label: 'Other Ordinary Income', value: ordinaryIncome, set: setOrdinaryIncome, step: 5000, prefix: '$' },
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
            <ResultCard label="0% LTCG Space" value={fmt(result.availableSpace0pct)} highlight />
            <ResultCard label="Net Taxable Gains" value={fmt(result.netGains)} subValue="after losses" />
            <ResultCard label="Estimated Tax" value={fmt(result.estimatedTax)} subValue="on gains" />
            <ResultCard label="Loss Harvest Savings" value={fmt(result.harvestingSavings)} subValue="est. at 20% rate" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Gains by LTCG Rate</h3>
            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={65} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} formatter={(v: number) => fmt(v)} />
                  <Bar dataKey="value" name="Gains" fill="#22c55e" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Gains Breakdown</h3>
            <div className="space-y-2 text-sm">
              {[
                { label: 'Unrealized Gains', value: fmt(result.unrealizedGains), color: 'text-orange-500' },
                { label: 'Unrealized Losses (offset)', value: '-' + fmt(result.unrealizedLosses), color: 'text-green-600' },
                { label: 'Net Taxable Gains', value: fmt(result.netGains), color: 'text-gray-800' },
              ].map(r => (
                <div key={r.label} className="flex justify-between">
                  <span className="text-gray-500">{r.label}</span>
                  <span className={'font-semibold ' + r.color}>{r.value}</span>
                </div>
              ))}
            </div>
          </Card>
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-800">
            <p className="font-bold mb-1">💡 Action Plan</p>
            <p>{result.strategy}</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
