'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateNegotiatedSalaryLifetimeImpact } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [currentSalary,setCurrentSalary]=useState(75000)
  const [negotiatedSalary,setNegotiatedSalary]=useState(85000)
  const [annualRaiseRate,setAnnualRaiseRate]=useState(3.5)
  const [yearsToRetirement,setYearsToRetirement]=useState(30)
  const [retirementMultiplier,setRetirementMultiplier]=useState(0.1)
  const result=useMemo(()=>{try{return calculateNegotiatedSalaryLifetimeImpact(currentSalary,negotiatedSalary,annualRaiseRate,yearsToRetirement,retirementMultiplier)}catch(e){return null}},[currentSalary, negotiatedSalary, annualRaiseRate, yearsToRetirement, retirementMultiplier])
  return(
    <CalculatorLayout title="Salary Negotiation Lifetime Impact Calculator USA 2026" description="Calculate the true lifetime financial impact of a salary negotiation — earnings compound over a 30-year career." icon="💼" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="salary-negotiation-lifetime-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Current Salary ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentSalary} onChange={e=>setCurrentSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Negotiated Salary ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={negotiatedSalary} onChange={e=>setNegotiatedSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual Raise Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={annualRaiseRate} onChange={e=>setAnnualRaiseRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Years to Retirement</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={yearsToRetirement} onChange={e=>setYearsToRetirement(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Retirement Savings Multiple</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={retirementMultiplier} onChange={e=>setRetirementMultiplier(Number(e.target.value))} step={0.01} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Immediate Raise" value={result?`${Number(result.immediateRaise).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Raise Percentage" value={result?`${Number(result.raisePercent).toFixed(1)}%`:"-"}/>
                <ResultCard label="10-Year Earnings Impact" value={result?`${Number(result.tenYearImpact).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Lifetime Extra Earnings" value={result?`${Number(result.lifetimeExtraEarnings).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Retirement Benefit" value={result?`${Number(result.retirementBenefit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total Lifetime Value" value={result?`${Number(result.totalLifetimeValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">💼 Salary Negotiation Lifetime Impact Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate the true lifetime financial impact of a salary negotiation — earnings compound over a 30-year career.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Salary Negotiation Lifetime Impact Calculator USA 2026" category="finance" intro="Measure how a higher starting salary can compound when future percentage raises are applied to both salary paths. It turns a one-time negotiation difference into a multi-year earnings comparison." howItWorks="Immediate raise = negotiated salary − current salary. For each future year, the calculator grows that difference by the annual raise rate and sums it through the selected career horizon. The 10-year result uses the same compounding method. The retirement benefit field is only the salary difference multiplied by your entered retirement-savings multiple." tipsSection="Use the same raise assumption only if you intentionally want a controlled comparison. Promotions, job changes, bonuses, equity, layoffs, taxes and inflation are outside this model. The displayed total lifetime value adds modeled extra salary and the simple retirement-benefit amount; it does not include investment growth on saved raises." conclusion="This tool quantifies one compensation scenario and should not be read as a forecast of future employment income."
          benefits={[{title:"Method",text:"Explains the calculation actually used on this page."},{title:"Inputs",text:"Shows which assumptions drive the result."},{title:"Limits",text:"Calls out important exclusions and simplifications."}]}
          useCases={[{title:"Scenario planning",text:"Compare realistic input combinations."},{title:"Decision support",text:"Understand the trade-offs behind the outputs."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
