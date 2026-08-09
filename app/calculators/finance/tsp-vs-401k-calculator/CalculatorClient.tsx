'use client'
import { calculateTSPvs401k } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [salary, setSalary] = useState(95000)
  const [tspContrib, setTspContrib] = useState(9500)
  const [yearsService, setYearsService] = useState(15)
  const [age, setAge] = useState(42)

  const result = useMemo(()=>{
    try{return calculateTSPvs401k(salary, tspContrib, 5, yearsService, 'FERS', age)}catch(e){return null}
  },[salary, tspContrib, yearsService, age])

  return (
    <CalculatorLayout title="TSP vs 401(k) Calculator USA 2026 — Federal Employee Retirement" description="Compare Thrift Savings Plan (TSP) vs private sector 401k. Calculate FERS pension value, TSP matching, and total federal employee retirement package." icon="🏛️" category="Finance" relatedCalculators={relatedCalculators} slug="tsp-vs-401k-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Salary ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={salary} onChange={e=>setSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">TSP Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={tspContrib} onChange={e=>setTspContrib(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years of Federal Service</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={yearsService} onChange={e=>setYearsService(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Annual TSP Match" value={result ? `${Number(result.annualMatch).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Total Annual Contribution" value={result ? `${Number(result.totalAnnualContrib).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="TSP Growth (30yr)" value={result ? `${Number(result.tspGrowth30yr).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Annual FERS Pension" value={result ? `${Number(result.annualPension).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Pension Present Value" value={result ? `${Number(result.pensionPresentValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Retirement Value" value={result ? `${Number(result.totalRetirementValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>
              {result?.yearData && result.yearData.length > 0 && (
                <Card>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Projection Over Time</h3>
                  <div style={{height:220}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.yearData} margin={{top:5,right:10,left:0,bottom:0}}>
                        <defs><linearGradient id="cg3" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                        <XAxis dataKey={result.yearData[0]?.age!==undefined?"age":"year"} tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false}/>
                        <YAxis tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false} width={65} tickFormatter={v=>`$${v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?(v/1000).toFixed(0)+'k':v}`}/>
                        <Tooltip contentStyle={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,fontSize:12}} formatter={(v:number)=>[`$${v.toLocaleString()}`,'Value']}/>
                        <Area type="monotone" dataKey={Object.keys(result.yearData[0]||{}).filter(k=>!['year','age','progress','fireNumber','fireReached','month'].includes(k))[0]||'value'} stroke="#22c55e" strokeWidth={2.5} fill="url(#cg3)"/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}
              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏛️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Federal employees have the FERS three-legged retirement stool — pension, TSP, and Social Security — plus the FEHB health benefit. Understanding the full value of the FERS package, including the pension present value, is essential for federal workforce career and financial decisions.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="TSP vs 401(k) Calculator USA 2026 — Federal Employee Retirement" category="finance"
          intro="This federal-retirement model combines an entered TSP contribution, a fixed 5% matching assumption and a simplified FERS pension estimate. It illustrates how federal retirement can combine defined-contribution savings with a pension; it is not a full private-sector 401(k) comparison."
          howItWorks="Annual modeled match = salary × 5%. The current function grows one year of contribution plus match at 7% for 30 minus current service years; it does not add a fresh contribution every future year. FERS pension = salary × 1% × service years, or 1.1% at age 62+ with 20+ years. Pension present value is approximated as annual pension ÷ 4%."
          tipsSection="The 7% return and 4% pension capitalization rate are assumptions. Actual FERS uses high-3 average pay and eligibility rules. The 2026 TSP elective-deferral limit is $24,500; catch-up is $8,000 generally at 50+, or $11,250 at ages 60–63."
          conclusion="Use this to understand the model, not as an official OPM annuity estimate. It omits Social Security, FEHB value, taxes, salary growth and several FERS elections/reductions."
          benefits={[
            {title:"Methodology-specific results",text:"Outputs follow the formulas and assumptions described on this page."},
            {title:"100% Private",text:"Everything runs in your browser. No data stored or transmitted."},
            {title:"Free Forever",text:"No signup, no paywall, no hidden costs."},
          ]}
          useCases={[
            {title:"Decision support",text:"Use your own inputs to evaluate the specific calculation shown here."},
            {title:"Assumption testing",text:"Change the inputs that materially drive this calculator and compare the result."},
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
