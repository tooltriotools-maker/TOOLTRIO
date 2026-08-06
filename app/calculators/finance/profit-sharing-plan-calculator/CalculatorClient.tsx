'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateProfitSharingPlan } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [annualCompensation, setAnnualCompensation] = useState(120000)
  const [profitSharingPercent, setProfitSharingPercent] = useState(15)
  const [businessProfit, setBusinessProfit] = useState(500000)
  const [numEmployees, setNumEmployees] = useState(5)
  const [age, setAge] = useState(45)
  const result=useMemo(()=>{try{return calculateProfitSharingPlan(annualCompensation,profitSharingPercent,businessProfit,numEmployees,age)}catch(e){return null}},[annualCompensation, profitSharingPercent, businessProfit, numEmployees, age])
  return(
    <CalculatorLayout title="Profit Sharing Plan Calculator USA 2026" description="Calculate profit sharing plan contributions, tax savings, and long-term growth for business owners and employees." icon="💼" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="profit-sharing-plan-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual Compensation ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={annualCompensation} onChange={e=>setAnnualCompensation(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Profit Sharing % of Comp</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={profitSharingPercent} onChange={e=>setProfitSharingPercent(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Business Annual Profit ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={businessProfit} onChange={e=>setBusinessProfit(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Number of Employees</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={numEmployees} onChange={e=>setNumEmployees(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Owner Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Owner Contribution" value={result?`${Number(result.employerContrib).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Total Plan Contribution" value={result?`${Number(result.totalPoolContrib).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Tax Savings" value={result?`${Number(result.taxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Net Cost to Employer" value={result?`${Number(result.netCostToEmployer).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="30-Year Growth" value={result?`${Number(result.growth30).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Limit Used" value={result?`${Number(result.limitUsed).toFixed(1)}%`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">💼 Profit Sharing Plan Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate profit sharing plan contributions, tax savings, and long-term growth for business owners and employees.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Profit Sharing Plan Calculator USA 2026" category="finance" intro="Estimate an employer profit-sharing contribution as a percentage of compensation, compare it with the 2026 defined-contribution annual-additions ceiling, and illustrate a business-wide contribution pool." howItWorks="Owner contribution = compensation × selected percentage, capped by the code at $72,000 for 2026. Pool contribution = business profit × selected percentage, capped at $72,000 × number of employees. The tax-savings output uses a fixed 37% assumption, while growth compounds the owner contribution at 7% until age 65." tipsSection="The $72,000 annual-additions limit covers total annual additions, not necessarily profit sharing alone. IRS also states an employer deduction limit generally tied to 25% of eligible compensation. This simplified calculator does not model plan allocation formulas, compensation caps, nondiscrimination testing, elective deferrals, catch-ups or entity-specific deduction rules." conclusion="Use this as a plan-design illustration, not a contribution or tax-return determination. A plan administrator or tax professional should test the actual allocation."
          benefits={[{title:"Method",text:"Explains the calculation actually used on this page."},{title:"Inputs",text:"Shows which assumptions drive the result."},{title:"Limits",text:"Calls out important exclusions and simplifications."}]}
          useCases={[{title:"Scenario planning",text:"Compare realistic input combinations."},{title:"Decision support",text:"Understand the trade-offs behind the outputs."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
