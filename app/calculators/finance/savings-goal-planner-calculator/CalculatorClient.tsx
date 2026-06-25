'use client'
import { calculateSavingsGoalPlanner } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [goalAmount, setGoalAmount] = useState(50000)
  const [currentSavings, setCurrentSavings] = useState(8000)
  const [monthlySavings, setMonthlySavings] = useState(800)
  const [annualReturn, setAnnualReturn] = useState(4.85)
  const [targetYears, setTargetYears] = useState(5)

  const result = useMemo(()=>{
    try{return calculateSavingsGoalPlanner(goalAmount, currentSavings, monthlySavings, annualReturn, targetYears)}catch(e){return null}
  },[goalAmount, currentSavings, monthlySavings, annualReturn, targetYears])

  return (
    <CalculatorLayout title="Savings Goal Planner Calculator USA 2026 — Reach Any Financial Goal" description="Calculate how long to reach any savings goal, required monthly savings, and interest earned. Works for emergency fund, down payment, vacation, or any target." icon="🎯" category="Finance" relatedCalculators={relatedCalculators} slug="savings-goal-planner-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Goal Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={goalAmount} onChange={e=>setGoalAmount(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Savings ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentSavings} onChange={e=>setCurrentSavings(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Savings ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlySavings} onChange={e=>setMonthlySavings(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={annualReturn} onChange={e=>setAnnualReturn(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Target Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={targetYears} onChange={e=>setTargetYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Projected Value" value={result ? `${Number(result.futureValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Goal Amount" value={result ? `${Number(result.goalAmount).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="On Track" value={result ? String(result.onTrack ? '✅ Yes' : '❌ Need adjustment') : "—"} />
                <ResultCard label="Coverage %" value={result ? `${Number(result.coveragePercent).toFixed(1)}%` : "—"} />
                <ResultCard label="Required Monthly" value={result ? `${Number(result.requiredMonthly).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Interest Earned" value={result ? `${Number(result.interestEarned).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>
              {result?.yearData && result.yearData.length > 0 && (
                <Card>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Projection Over Time</h3>
                  <div style={{height:220}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.yearData} margin={{top:5,right:10,left:0,bottom:0}}>
                        <defs><linearGradient id="cgfin" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                        <XAxis dataKey="year" tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false}/>
                        <YAxis tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false} width={65} tickFormatter={v=>`$${v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?(v/1000).toFixed(0)+'k':v}`}/>
                        <Tooltip contentStyle={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,fontSize:12}} formatter={(v:number)=>[`$${v.toLocaleString()}`,'Value']}/>
                        <Area type="monotone" dataKey="savings" name="Savings" stroke="#22c55e" strokeWidth={2.5} fill="url(#cgfin)"/>
                        {result.yearData[0]?.goal && <Area type="monotone" dataKey="goal" name="Goal" stroke="#f59e0b" strokeWidth={1.5} strokeDasharray="4 4" fill="none"/>}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}
              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🎯 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">A savings goal planner turns an abstract target into a concrete monthly action plan. Whether saving for a down payment, emergency fund, vacation, or any other goal, this calculator shows how long you'll take at your current savings rate, how much you need monthly to hit your target on schedule, and how much of the final amount comes from interest earned.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Savings Goal Planner Calculator USA 2026 — Reach Any Financial Goal" category="finance" intro="A savings goal planner turns an abstract target into a concrete monthly action plan. Whether saving for a down payment, emergency fund, vacation, or any other goal, this calculator shows how long you'll take at your current savings rate, how much you need monthly to hit your target on schedule, and how much of the final amount comes from interest earned."
          howItWorks="Enter your values and results update instantly using 2026 US-standard formulas."
          tipsSection="Try multiple scenarios by changing one input at a time."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor."
          benefits={[{title:"Real-Time USA Results",text:"Instant 2026 IRS calculations."},{title:"100% Private",text:"Runs locally in your browser."},{title:"Free Forever",text:"No signup required."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation with real numbers."},{title:"Scenario Comparison",text:"Change inputs to see the impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
