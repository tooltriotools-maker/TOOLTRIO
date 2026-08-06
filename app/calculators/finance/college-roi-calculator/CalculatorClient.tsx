'use client'
import { calculateCollegeROI } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [degreeCost, setDegreeCost] = useState(120000)
  const [yearsToComplete, setYearsToComplete] = useState(4)
  const [salaryWithDegree, setSalaryWithDegree] = useState(75000)
  const [salaryWithout, setSalaryWithout] = useState(42000)
  const [loanRate, setLoanRate] = useState(6.5)
  const [workYears, setWorkYears] = useState(40)

  const result = useMemo(()=>{
    try{return calculateCollegeROI(degreeCost, yearsToComplete, salaryWithDegree, salaryWithout, loanRate, workYears)}catch(e){return null}
  },[degreeCost, yearsToComplete, salaryWithDegree, salaryWithout, loanRate, workYears])

  return (
    <CalculatorLayout title="College ROI Calculator USA 2026 — Is a Degree Worth It?" description="Calculate the financial return on college education: net present value, payback period, lifetime salary premium, and loan vs no-degree comparison." icon="🎓" category="Finance" relatedCalculators={relatedCalculators} slug="college-roi-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Total Degree Cost ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={degreeCost} onChange={e=>setDegreeCost(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years to Complete</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={yearsToComplete} onChange={e=>setYearsToComplete(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Salary With Degree ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={salaryWithDegree} onChange={e=>setSalaryWithDegree(Number(e.target.value))} step={2000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Salary Without Degree ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={salaryWithout} onChange={e=>setSalaryWithout(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Student Loan Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={loanRate} onChange={e=>setLoanRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Working Years After Graduation</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={workYears} onChange={e=>setWorkYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Investment (cost + opp cost)" value={result ? `${Number(result.totalInvestment).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Lifetime Salary Premium" value={result ? `${Number(result.lifetimePremium).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Present Value" value={result ? `${Number(result.npv).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="ROI" value={result ? `${Number(result.roi).toFixed(1)}%` : "—"} />
                <ResultCard label="Payback Period" value={result ? `${Number(result.paybackYears).toLocaleString()} years` : "—"} />
                <ResultCard label="Monthly Loan Payment" value={result ? `${Number(result.monthlyLoanPayment).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
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
                <h2 className="text-lg font-black text-gray-900 mb-3">🎓 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The college ROI question is one of the most important financial decisions young Americans face. At $50,000+/year for private universities and 6.5% loan rates, the math matters. This calculator computes the net present value, payback period, and true ROI of your specific degree program — including the often-ignored opportunity cost of 4 years not working.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="College ROI Calculator USA 2026 — Is a Degree Worth It?" category="finance"
          intro="This calculator compares the direct cost of a degree plus foregone earnings while studying with a simplified lifetime salary premium. It is most useful when you have program-specific net cost and realistic earnings estimates for both the degree and no-degree paths."
          howItWorks="Opportunity cost = salary without degree × years in school. Total investment = degree cost + opportunity cost. Annual salary premium = salary with degree − salary without degree; lifetime premium multiplies that difference by work years. The NPV output discounts annual premiums at a fixed 5% rate and subtracts degree cost. The loan output assumes the full degree cost is financed for 10 years."
          tipsSection="Use net price after grants rather than sticker price. Test lower starting salaries and incomplete-degree scenarios. The model holds the salary gap constant, so it does not capture different raise rates, unemployment, career switching or graduate school."
          conclusion="A positive modeled NPV or ROI means the salary assumptions outweigh the modeled cost—not that enrollment is guaranteed to pay off. Program completion, debt burden and actual career outcomes remain central."
          benefits={[
            {title:"Real-Time USA Results",text:"Uses the calculator-specific assumptions shown on this page."},
            {title:"100% Private",text:"Everything runs in your browser. No data stored or transmitted."},
            {title:"Free Forever",text:"No signup, no paywall, no hidden costs."},
          ]}
          useCases={[
            {title:"Personal Planning",text:"Use your own inputs to test this specific calculation."},
            {title:"Scenario Comparison",text:"Change one relevant input at a time and compare the modeled output."},
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
