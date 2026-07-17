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
    <CalculatorLayout title="Social Security Couples Optimization Calculator USA 2026" description="Find the Social Security claiming strategy that maximizes lifetime benefits for married couples across 6 different age-combination strategies." icon="👫" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="social-security-couples-optimizer">
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

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">👫 Social Security Couples Optimization Calculator USA 2026</h2><p className="text-sm text-gray-600">Find the Social Security claiming strategy that maximizes lifetime benefits for married couples across 6 different age-combination strategies.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Social Security Couples Optimization Calculator USA 2026" category="finance" intro="Find the Social Security claiming strategy that maximizes lifetime benefits for married couples across 6 different age-combination strategies." howItWorks="Enter values for instant 2026 results." tipsSection="Try different scenarios." conclusion="Consult a qualified financial advisor."
          benefits={[{title:"Real-Time",text:"2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
