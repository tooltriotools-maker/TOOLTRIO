'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateRealWageGrowth } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [startingSalary, setStartingSalary] = useState(52000)
  const [currentSalary, setCurrentSalary] = useState(85000)
  const [yearsWorked, setYearsWorked] = useState(8)
  const [avgInflation, setAvgInflation] = useState(3.5)

  const result = useMemo(()=>{
    try{return calculateRealWageGrowth(startingSalary,currentSalary,yearsWorked,[avgInflation])}catch(e){return null}
  },[startingSalary, currentSalary, yearsWorked, avgInflation])

  return (
    <CalculatorLayout title="Real Wage Growth Calculator USA 2026 — Salary vs Inflation" description="Calculate whether your salary raises have kept pace with inflation. See your real vs nominal salary growth and purchasing power gain or loss over your career." icon="💹" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="real-wage-growth-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Starting Salary ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={startingSalary} onChange={e=>setStartingSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Salary ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentSalary} onChange={e=>setCurrentSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years Worked</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={yearsWorked} onChange={e=>setYearsWorked(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Avg Inflation Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={avgInflation} onChange={e=>setAvgInflation(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Nominal Salary Growth" value={result ? `${Number(result.nominalGrowth).toFixed(1)}%` : "—"} highlight />
                <ResultCard label="Nominal CAGR" value={result ? `${Number(result.nominalCAGR).toFixed(1)}%` : "—"} />
                <ResultCard label="Real (Inflation-Adj) Salary" value={result ? `${Number(result.realSalary).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Real Growth" value={result ? `${Number(result.realGrowth).toFixed(1)}%` : "—"} />
                <ResultCard label="Purchasing Power Lost" value={result ? `${Number(result.purchasingPowerLost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Salary Needed (inflation match)" value={result ? `${Number(result.salaryNeededToMatchReal).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>
              {result?.yearData && result.yearData.length > 0 && (
                <Card>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Projection Over Time</h3>
                  <div style={{height:220}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.yearData} margin={{top:5,right:10,left:0,bottom:0}}>
                        <defs><linearGradient id="cgb5x" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                        <XAxis dataKey={Object.prototype.hasOwnProperty.call(result.yearData[0] ?? {}, 'age')?"age":Object.prototype.hasOwnProperty.call(result.yearData[0] ?? {}, 'year')?"year":"month"} tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false}/>
                        <YAxis tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false} width={65} tickFormatter={v=>`$${v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?(v/1000).toFixed(0)+'k':v}`}/>
                        <Tooltip contentStyle={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,fontSize:12}} formatter={(v:number)=>[`$${v.toLocaleString()}`,'Value']}/>
                        <Area type="monotone" dataKey={Object.keys(result.yearData[0]||{}).filter(k=>!['year','age','month','creditedRate'].includes(k))[0]||'value'} stroke="#22c55e" strokeWidth={2.5} fill="url(#cgb5x)"/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}
              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💹 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Separate nominal salary growth from purchasing-power growth after inflation. A single average inflation input cannot reproduce the exact CPI path or your personal spending basket. Results are purchasing-power estimates, not a compensation benchmark.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Real Wage Growth Calculator USA 2026 — Salary vs Inflation" category="finance" intro="Separate nominal salary growth from purchasing-power growth after inflation."
          howItWorks="Nominal CAGR is derived from starting salary, current salary and years worked. The calculator then discounts current salary by (1 + average inflation)^years to express it in starting-year purchasing power."
          tipsSection="Worked example: A salary rising from $60,000 to $80,000 can still produce modest real growth if inflation compounded strongly over the same period."
          conclusion="Important assumptions and limitations: A single average inflation input cannot reproduce the exact CPI path or your personal spending basket. Results are purchasing-power estimates, not a compensation benchmark. Results are educational estimates, not individualized financial, tax, legal or investment advice."
          benefits={[{title:"Real-Time USA Results",text:"Instant 2026 IRS calculations."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation."},{title:"Scenario Comparison",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
