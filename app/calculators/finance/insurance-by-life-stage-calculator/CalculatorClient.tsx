'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateInsuranceNeedsByLifeStage } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [age,setAge]=useState(35)
  const [income,setIncome]=useState(85000)
  const [debts,setDebts]=useState(280000)
  const [dependents,setDependents]=useState(2)
  const [savings,setSavings]=useState(125000)
  const result=useMemo(()=>{try{return calculateInsuranceNeedsByLifeStage(age,income,debts,dependents,savings,'newFamily')}catch(e){return null}},[age, income, debts, dependents, savings])
  return(
    <CalculatorLayout title="Insurance Needs by Life Stage Calculator USA 2026" description="Get a comprehensive insurance needs assessment based on your life stage — covering life, disability, umbrella, and long-term care priorities." icon="🛡️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="insurance-by-life-stage-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Your Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={income} onChange={e=>setIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Total Debts ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={debts} onChange={e=>setDebts(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Number of Dependents</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={dependents} onChange={e=>setDependents(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Savings & Investments ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={savings} onChange={e=>setSavings(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Life Insurance Needed" value={result?`${Number(result.lifeInsuranceNeeded).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Disability Monthly Benefit" value={result?`${Number(result.disabilityMonthly).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"}/>
                <ResultCard label="Umbrella Coverage Needed" value={result?`${Number(result.umbrellaNeeded).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="LTC Consider" value={result?String(result.ltcInsuranceConsider ? 'Yes (age 50+)' : 'Not yet'):"-"}/>
                <ResultCard label="Est. Annual Premiums" value={result?`${Number(result.totalAnnualPremiumEst).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🛡️ Insurance Needs by Life Stage Calculator USA 2026</h2><p className="text-sm text-gray-600">Get a comprehensive insurance needs assessment based on your life stage — covering life, disability, umbrella, and long-term care priorities.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Insurance Needs by Life Stage Calculator USA 2026" category="finance" intro={`Estimate broad life, disability, umbrella and long-term-care planning amounts from age, income, debts, dependents, savings and a selected life stage. The calculator uses explicit ToolTrio planning multipliers rather than insurer underwriting rules.`} howItWorks={`Life coverage is modeled as income × the selected stage multiplier + debts − savings, floored at zero. Disability need uses 60% of income for single/new-family/established-family stages and 50% pre-retirement. Umbrella need is either zero or at least $1 million based on stage and savings thresholds; long-term-care consideration turns on after age 50.`} tipsSection={`These multipliers are planning heuristics, not quotes or coverage recommendations. Employer benefits, Social Security disability eligibility, policy exclusions, waiting periods, assets, estate goals and insurer underwriting can materially change actual needs and premiums.`} conclusion={`Use the result as a checklist for coverage gaps to investigate, then compare actual policy terms and professional advice where appropriate.`}
          benefits={[{title:"Calculator-specific model",text:"Methodology is explained so you can see what the output assumes."},{title:"Scenario testing",text:"Change the inputs to compare outcomes that matter to this calculation."},{title:"Private",text:"Inputs are calculated locally in your browser."}]}
          useCases={[{title:"Decision support",text:"Compare the modeled result before taking the next planning step."},{title:"Assumption check",text:"See which inputs have the largest effect on the result."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
