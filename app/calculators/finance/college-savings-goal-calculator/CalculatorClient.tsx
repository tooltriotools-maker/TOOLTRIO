'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateCollegeSavingsGoal } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [childAge, setChildAge] = useState(8)
  const [targetCollegeYear, setTargetCollegeYear] = useState(2033)
  const [annualCost, setAnnualCost] = useState(35000)
  const [costInflation, setCostInflation] = useState(5)
  const [currentSavings, setCurrentSavings] = useState(20000)
  const [expectedReturn, setExpectedReturn] = useState(7)
  const result=useMemo(()=>{try{return calculateCollegeSavingsGoal(childAge,targetCollegeYear,annualCost,costInflation,currentSavings,expectedReturn)}catch(e){return null}},[childAge, targetCollegeYear, annualCost, costInflation, currentSavings, expectedReturn])
  return(
    <CalculatorLayout title="College Savings Goal Calculator USA 2026" description="Calculate exactly how much to save monthly for college given your child's age, target year, and inflation-adjusted costs." icon="🎓" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="college-savings-goal-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Child's Current Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={childAge} onChange={e=>setChildAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Target College Year</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={targetCollegeYear} onChange={e=>setTargetCollegeYear(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual College Cost ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualCost} onChange={e=>setAnnualCost(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Cost Inflation (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={costInflation} onChange={e=>setCostInflation(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Current Savings ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentSavings} onChange={e=>setCurrentSavings(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Expected Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={expectedReturn} onChange={e=>setExpectedReturn(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Years to College" value={result?`${Number(result.yearsToCollege)} years`:"-"} highlight/>
                <ResultCard label="Inflation-Adj Annual Cost" value={result?`${Number(result.inflatedAnnualCost).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total 4-Year Cost" value={result?`${Number(result.total4YrCost).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="FV of Current Savings" value={result?`${Number(result.fvCurrentSavings).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Still Needed" value={result?`${Number(result.remainingNeeded).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Required Monthly" value={result?`${Number(result.requiredMonthly).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"}/>
            </div>
              {result?.yearData&&result.yearData.length>0&&(
                <Card><h3 className="text-sm font-semibold text-gray-700 mb-2">Projection</h3>
                  <div style={{height:200}}><ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={result.yearData} margin={{top:5,right:10,left:0,bottom:0}}>
                      <defs><linearGradient id="cgb7" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                      <XAxis dataKey={Object.prototype.hasOwnProperty.call(result.yearData[0] ?? {}, 'age')?"age":"year"} tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false} width={60} tickFormatter={v=>`$${v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?(v/1000).toFixed(0)+'k':v}`}/>
                      <Tooltip contentStyle={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,fontSize:12}} formatter={(v:number)=>[`$${v.toLocaleString()}`,'Value']}/>
                      <Area type="monotone" dataKey={Object.keys(result.yearData[0]||{}).filter(k=>!['year','age'].includes(k))[0]||'balance'} stroke="#22c55e" strokeWidth={2.5} fill="url(#cgb7)"/>
                    </AreaChart>
                  </ResponsiveContainer></div>
                </Card>)}
            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🎓 College Savings Goal Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate exactly how much to save monthly for college given your child's age, target year, and inflation-adjusted costs.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="College Savings Goal Calculator USA 2026" category="finance" intro={`Estimate a monthly college-saving target by projecting today’s annual college cost to the target year, growing current savings, and funding the remaining four-year goal with monthly contributions.`} howItWorks={`Years to college = target year − current calendar year. Annual cost is inflated by (1 + cost inflation)^years. Current savings grow at the entered expected return. The remaining target is funded using the future-value-of-an-annuity relationship with a monthly return of annual return ÷ 12.`} tipsSection={`The model assumes steady inflation and investment returns and treats the four-year cost with a simplified inflation adjustment. It does not model taxes, 529 rules, financial aid, scholarships, market volatility, changing enrollment, room and board choices, or contribution timing beyond the monthly formula.`} conclusion={`The monthly target is a planning estimate; revisit it as college prices, savings balances, investment returns and the student’s plans change.`}
          benefits={[{title:"Calculator-specific model",text:"Methodology is explained so you can see what the output assumes."},{title:"Scenario testing",text:"Change the inputs to compare outcomes that matter to this calculation."},{title:"Private",text:"Inputs are calculated locally in your browser."}]}
          useCases={[{title:"Decision support",text:"Compare the modeled result before taking the next planning step."},{title:"Assumption check",text:"See which inputs have the largest effect on the result."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
