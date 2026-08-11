'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateSocialSecurityMaximization } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [worker1PIA,setWorker1PIA]=useState(2800)
  const [worker2PIA,setWorker2PIA]=useState(1400)
  const [worker1Age,setWorker1Age]=useState(60)
  const [worker2Age,setWorker2Age]=useState(58)
  const [jointLifeExpectancy,setJointLifeExpectancy]=useState(88)
  const result=useMemo(()=>{try{return calculateSocialSecurityMaximization(worker1PIA,worker2PIA,worker1Age,worker2Age,jointLifeExpectancy)}catch(e){return null}},[worker1PIA, worker2PIA, worker1Age, worker2Age, jointLifeExpectancy])
  return(
    <CalculatorLayout title="Social Security Couples Optimization Calculator USA 2026" description="Compare six simplified claiming combinations for a married couple using FRA benefit inputs and a joint longevity assumption." icon="👫" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="social-security-couples-optimizer">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Worker 1 Monthly Benefit ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={worker1PIA} onChange={e=>setWorker1PIA(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Worker 2 Monthly Benefit ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={worker2PIA} onChange={e=>setWorker2PIA(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Worker 1 Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={worker1Age} onChange={e=>setWorker1Age(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Worker 2 Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={worker2Age} onChange={e=>setWorker2Age(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Joint Life Expectancy (age)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={jointLifeExpectancy} onChange={e=>setJointLifeExpectancy(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Optimal Strategy" value={result?String(result.optimal.name):"-"} highlight/>
                <ResultCard label="Optimal Monthly Combined" value={result?`${Number(result.optimal.combined).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"}/>
                <ResultCard label="Optimal Lifetime Value" value={result?`${Number(result.optimal.lifetimeValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Benefit vs Worst Strategy" value={result?`${Number(result.highEarnerBenefit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">👫 Social Security Couples Optimization Calculator USA 2026</h2><p className="text-sm text-gray-600">Compare six simplified claiming combinations for a married couple using FRA benefit inputs and a joint longevity assumption.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <Card className="space-y-5">
          <section><h2 className="text-xl font-black text-gray-900 mb-2">How Social Security Couples Optimization Calculator Works</h2><p className="text-sm leading-6 text-gray-700">The model assumes FRA 67, applies the statutory early-claim reduction schedule and delayed credits through age 70, and multiplies combined annual benefits by the modeled years remaining to the entered joint life-expectancy age. It does not model spousal top-ups, survivor timing, COLAs, taxes, earnings tests or exact SSA earnings records.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding the Inputs</h2><p className="text-sm leading-6 text-gray-700">Enter each worker’s monthly PIA, current age and a joint life-expectancy assumption. PIA should be the benefit at full retirement age, not the amount already reduced or increased for a chosen claiming age.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding Your Results</h2><p className="text-sm leading-6 text-gray-700">“Optimal” means highest lifetime value among only the six strategies tested by this code. It does not mean SSA or ToolTrio recommends that strategy. Survivor benefits, spousal-benefit rules, taxes, earnings tests and different death dates can materially change the decision.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Worked Example</h2><p className="text-sm leading-6 text-gray-700">Example: for workers born 1960 or later, SSA says claiming at 62 can reduce a worker benefit by as much as 30%, while waiting from FRA 67 to 70 raises the worker benefit to 124% of PIA. The calculator applies those endpoints to its six scenarios.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Important Assumptions and Limitations</h2><p className="text-sm leading-6 text-gray-700">This is not a complete Social Security claiming optimizer. It assumes both workers fit the FRA-67 factors, uses one joint life-expectancy horizon and does not fully model spousal/survivor benefits, earnings records, COLAs, taxes or the earnings test.</p></section>
        </Card>
        <SEOContent title="Social Security Couples Optimization Calculator" category="finance" intro="Compare six simplified claiming-age combinations for two workers using their entered Primary Insurance Amounts (PIAs). The tool highlights how early-claim reductions and delayed-retirement credits can change combined benefits." howItWorks="The model assumes FRA 67, applies the statutory early-claim reduction schedule and delayed credits through age 70, and multiplies combined annual benefits by the modeled years remaining to the entered joint life-expectancy age. It does not model spousal top-ups, survivor timing, COLAs, taxes, earnings tests or exact SSA earnings records." tipsSection="Review the assumptions above before using the result for a real-world decision." conclusion="Use this calculator as an educational estimate, not individualized financial, tax, legal, insurance or investment advice."
          benefits={[{title:"Specific methodology",text:"The page explains the exact assumptions used by this calculator."},{title:"Scenario testing",text:"Change the inputs to understand which assumptions drive the result."},{title:"Private",text:"Calculations run locally in your browser."}]}
          useCases={[{title:"Planning",text:"Create a baseline scenario before comparing alternatives."},{title:"Sensitivity",text:"Test how the result changes when a major assumption moves."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
