'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { calculateSleepDebtAccumulation } from '@/lib/calculations/health'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { Card, ResultCard } from '@/components/ui/Card'
import { InputField } from '@/components/ui/InputField'
import { FAQSection } from '@/components/ui/FAQSection'

interface Props { faqs: { question: string; answer: string }[]; structuredData: object[]; relatedCalculators?: { name: string; href: string; icon: string; desc: string }[] }

export default function CalculatorClient({ faqs, structuredData, relatedCalculators }: Props) {
  const [targetSleep, setTargetSleep] = useState(8)
  const [dayLabels] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  const [dailySleep, setDailySleep] = useState([6.5, 6, 6.5, 7, 6, 8.5, 9])

  const result = useMemo(() => calculateSleepDebtAccumulation(targetSleep, dailySleep), [targetSleep, dailySleep])

  const chartData = result.dailyData.map((d, i) => ({ day: dayLabels[i] || `Day ${d.day}`, debt: d.debt, deficit: d.deficit }))

  const debtColor = result.cumulativeDebt <= 2 ? '#22c55e' : result.cumulativeDebt <= 7 ? '#eab308' : result.cumulativeDebt <= 14 ? '#f97316' : '#ef4444'

  return (
    <CalculatorLayout title="Sleep Debt Accumulation Calculator" description="Track your weekly sleep deficit, calculate cognitive impairment level, and find out how many recovery nights you need." icon="😴" category="Health" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="sleep-debt-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit">
          <h2 className="text-sm font-semibold text-rose-400 uppercase tracking-wider mb-4">Your Sleep Week</h2>
          <div className="space-y-3">
            <InputField label="Sleep target (hrs/night)" value={targetSleep} onChange={setTargetSleep} min={5} max={12} step={0.5} suffix="hrs" />
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500">Actual sleep each night (hrs)</p>
              {dayLabels.map((day, i) => (
                <div key={day} className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-gray-500 w-8">{day}</span>
                  <input type="range" min={3} max={12} step={0.5} value={dailySleep[i]} onChange={e => {
                    const updated = [...dailySleep]
                    updated[i] = Number(e.target.value)
                    setDailySleep(updated)
                  }} className="flex-1 accent-rose-500" />
                  <span className={`text-xs font-bold w-8 text-right ${dailySleep[i] < targetSleep ? 'text-red-500' : 'text-green-600'}`}>{dailySleep[i]}h</span>
                </div>
              ))}
            </div>
            <div className="p-4 rounded-xl border text-center" style={{ background: debtColor + '15', borderColor: debtColor + '40' }}>
              <p className="text-xs text-gray-500 mb-1">Cumulative Sleep Debt</p>
              <p className="text-4xl font-black" style={{ color: debtColor }}>{result.cumulativeDebt}h</p>
              <p className="text-xs text-gray-400">avg {result.avgSleep} hrs/night</p>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ResultCard label="Sleep Debt" value={`${result.cumulativeDebt} hrs`} highlight />
            <ResultCard label="Avg Sleep" value={`${result.avgSleep} hrs/night`} />
            <ResultCard label="Days to Recover" value={`${result.daysToRecover}`} subValue="extra sleep nights" />
            <ResultCard label="Target" value={`${targetSleep} hrs/night`} />
          </div>
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Debt Accumulation</h3>
            <div style={{ height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="debtGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="day" tick={{ fill: '#374151', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#374151', fontSize: 10 }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 10, fontSize: 12 }} formatter={(v: number) => [`${v} hrs`, '']} />
                  <Area type="monotone" dataKey="debt" name="Cumulative Debt" stroke="#ef4444" fill="url(#debtGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <div className={`rounded-xl p-4 text-sm border ${result.cumulativeDebt <= 2 ? 'bg-green-50 border-green-200 text-green-800' : result.cumulativeDebt <= 7 ? 'bg-yellow-50 border-yellow-200 text-yellow-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
            <p className="font-bold mb-1">🧠 Cognitive Impact</p>
            <p>{result.cognitiveImpairment}</p>
            {result.performanceDecrement && <p className="mt-1 text-xs font-semibold">{result.performanceDecrement}</p>}
            <p className="mt-2 text-xs">{result.metabolicRisk}</p>
          </div>
        </div>
      </div>
      <div className="mt-6"><FAQSection faqs={faqs} /></div>
    </CalculatorLayout>
  )
}
