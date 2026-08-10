'use client'
import { calculateSolo401k } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [selfEmploymentIncome, setSelfEmploymentIncome] = useState(150000)
  const [age, setAge] = useState(45)
  const [taxRate, setTaxRate] = useState(32)

  const result = useMemo(()=>{
    try{return calculateSolo401k(selfEmploymentIncome, age, false, taxRate)}catch(e){return null}
  },[selfEmploymentIncome, age, taxRate])

  return (
    <CalculatorLayout title="Solo 401k Calculator USA 2026 — Self-Employed Maximum Contribution" description="Calculate maximum Solo 401k contributions as both employee and employer, super catch-up for ages 60-63, tax savings, and 30-year growth." icon="💼" category="Finance" relatedCalculators={relatedCalculators} slug="solo-401k-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Net Self-Employment Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={selfEmploymentIncome} onChange={e=>setSelfEmploymentIncome(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Employee Contribution" value={result ? `${Number(result.employeeContrib).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Employer Contribution" value={result ? `${Number(result.employerContrib).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Solo 401k" value={result ? `${Number(result.totalContrib).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Tax Savings" value={result ? `${Number(result.taxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Cost After Tax" value={result ? `${Number(result.netCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="30-Year Growth" value={result ? `${Number(result.growth30).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>
              {result?.yearData && result.yearData.length > 0 && (
                <Card>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Projection Over Time</h3>
                  <div style={{height:220}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.yearData} margin={{top:5,right:10,left:0,bottom:0}}>
                        <defs><linearGradient id="cg3" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                        <XAxis dataKey={Object.prototype.hasOwnProperty.call(result.yearData[0] ?? {}, 'age')?"age":"year"} tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false}/>
                        <YAxis tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false} width={65} tickFormatter={v=>`$${v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?(v/1000).toFixed(0)+'k':v}`}/>
                        <Tooltip contentStyle={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,fontSize:12}} formatter={(v:number)=>[`$${v.toLocaleString()}`,'Value']}/>
                        <Area type="monotone" dataKey={Object.keys(result.yearData[0]||{}).filter(k=>!['year','age','progress','fireNumber','fireReached','month'].includes(k))[0]||'value'} stroke="#22c55e" strokeWidth={2.5} fill="url(#cg3)"/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}
              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💼 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The Solo 401k is the most useful retirement account for self-employed Americans. Unlike SEP-IRA, you contribute as both employer (25% of net income) and employee ($23,500 flat), reaching $70,000 at much lower income levels. Ages 60-63 get a SECURE 2.0 super catch-up taking the limit to $81,250.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Solo 401k Calculator USA 2026 — Self-Employed Maximum Contribution" category="finance"
          intro="Estimate employee and employer Solo 401(k) contributions for a self-employed owner using the calculator's simplified net-earnings model. Age matters because catch-up limits can apply, while the displayed tax-savings projection is only a planning estimate."
          howItWorks="The model first multiplies entered self-employment income by 92.35%, then applies an employee-deferral limit and an employer contribution assumption. For 2026, the employee elective-deferral limit is $24,500 and the overall defined-contribution limit is $72,000 before eligible catch-up contributions. Actual employer contribution calculations for an unincorporated owner require the IRS self-employed contribution methodology."
          tipsSection="Change one assumption at a time and compare the result with the underlying contract, tax rule, lender terms, or official source before making a decision."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor about your specific situation."
          benefits={[
            {title:"Calculator results",text:"Instant calculations based on the assumptions documented on this page."},
            {title:"100% Private",text:"Everything runs in your browser. No data stored or transmitted."},
            {title:"Available without a paid plan",text:"No account is required to run the calculation."},
          ]}
          useCases={[
            {title:"Personal Planning",text:"Model your specific situation with real numbers before making decisions."},
            {title:"Scenario Comparison",text:"Change one variable at a time to understand the impact of each factor."},
          ]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
