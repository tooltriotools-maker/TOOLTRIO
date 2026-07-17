'use client'
import { useState, useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { calculateMarginTrading } from '@/lib/calculations/finance'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }
export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [accountEquity, setAccountEquity] = useState(20000)
  const [marginLoan, setMarginLoan] = useState(20000)
  const [investmentReturn, setInvestmentReturn] = useState(10)
  const [marginInterestRate, setMarginInterestRate] = useState(11.5)
  const [holdingPeriodMonths, setHoldingPeriodMonths] = useState(12)
  const result = useMemo(() => calculateMarginTrading(accountEquity, marginLoan, investmentReturn, marginInterestRate, holdingPeriodMonths), [accountEquity, marginLoan, investmentReturn, marginInterestRate, holdingPeriodMonths])
  const fmt = (v: number) => '$' + Math.round(v).toLocaleString()
  const scenarios = [-20, -10, 0, 10, 20, 30].map(ret => {
    const grossRet = (accountEquity + marginLoan) * (ret / 100) * (holdingPeriodMonths / 12)
    const interest = marginLoan * (marginInterestRate / 100) * (holdingPeriodMonths / 12)
    const net = grossRet - interest
    const pct = Math.round((net / accountEquity) * 100 * 10) / 10
    return { return: ret + '%', leveraged: pct, unleveraged: ret * holdingPeriodMonths / 12 }
  })
  return (
    <CalculatorLayout title="Margin Trading Calculator USA 2026" description="Calculate margin trading returns, interest costs, leverage amplification, and break-even return rate." icon="📉" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="margin-trading-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Margin Details</h2>
          {[
            { label: 'Your Account Equity', value: accountEquity, set: setAccountEquity, step: 5000, prefix: '$' },
            { label: 'Margin Loan Amount', value: marginLoan, set: setMarginLoan, step: 5000, prefix: '$' },
            { label: 'Expected Investment Return', value: investmentReturn, set: setInvestmentReturn, step: 1, suffix: '%' },
            { label: 'Margin Interest Rate', value: marginInterestRate, set: setMarginInterestRate, step: 0.25, suffix: '%' },
            { label: 'Holding Period (months)', value: holdingPeriodMonths, set: setHoldingPeriodMonths, step: 1, suffix: 'mo' },
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
          <div className={`rounded-xl p-3 text-xs font-semibold text-center border ${result.leverage > 2 ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
            ⚡ Leverage: {result.leverage}x — {result.risk}
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Total Invested" value={fmt(result.totalInvested)} subValue={result.leverage + 'x leverage'} />
            <ResultCard label="Gross Return" value={fmt(result.grossReturn)} />
            <ResultCard label="Interest Cost" value={fmt(result.interestCost)} subValue="margin interest" />
            <ResultCard label="Net Return" value={fmt(result.netReturn)} highlight />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <ResultCard label="Leveraged Return %" value={result.leveragedReturnPct + '%'} subValue="on your equity" />
            <ResultCard label="Unleveraged Return %" value={result.unleveragedReturnPct + '%'} subValue="without margin" />
            <ResultCard label="Break-Even Return" value={result.breakEvenReturnPct + '%'} subValue="needed annually" />
            <ResultCard label="Return Amplification" value={result.returnAmplification + 'x'} subValue="leverage effect" />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Leveraged vs Unleveraged Returns by Scenario</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scenarios} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="return" tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={45} tickFormatter={v => v + '%'} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} formatter={(v: number) => v + '%'} />
                  <ReferenceLine y={0} stroke="#9ca3af" />
                  <Bar dataKey="unleveraged" name="No Margin" fill="#94a3b8" radius={[4,4,0,0]} />
                  <Bar dataKey="leveraged" name="With Margin" fill="#22c55e" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-800">
            <p className="font-bold mb-1">⚠️ Margin Call Risk</p>
            <p>If your portfolio falls below 25% maintenance margin, your broker will demand immediate cash or force-sell your positions. Leverage amplifies losses just as much as gains — a 20% drop with 2x leverage means a 40%+ loss on your equity.</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
