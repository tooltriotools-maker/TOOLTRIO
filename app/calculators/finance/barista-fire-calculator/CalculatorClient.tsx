'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateFIREWithPartTime } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [targetAnnualExpenses,setTargetAnnualExpenses]=useState(65000)
  const [partTimeIncome,setPartTimeIncome]=useState(24000)
  const [portfolio,setPortfolio]=useState(650000)
  const [investReturn,setInvestReturn]=useState(7)
  const [startAge,setStartAge]=useState(38)
  const result=useMemo(()=>{try{return calculateFIREWithPartTime(targetAnnualExpenses,partTimeIncome,portfolio,investReturn,3.0,startAge)}catch(e){return null}},[targetAnnualExpenses, partTimeIncome, portfolio, investReturn, startAge])
  return(
    <CalculatorLayout title="Barista FIRE Calculator USA 2026 — Semi-Retirement" description="Calculate how part-time work reduces your FIRE number and accelerates your retirement timeline — the Barista FIRE strategy." icon="☕" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="barista-fire-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual Retirement Expenses ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={targetAnnualExpenses} onChange={e=>setTargetAnnualExpenses(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Part-Time Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={partTimeIncome} onChange={e=>setPartTimeIncome(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Current Portfolio ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={portfolio} onChange={e=>setPortfolio(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Investment Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={investReturn} onChange={e=>setInvestReturn(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Current Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={startAge} onChange={e=>setStartAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Barista FIRE Number" value={result?`${Number(result.baristaFIRENumber).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Full FIRE Number" value={result?`${Number(result.fullFIRENumber).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Portfolio Reduction" value={result?`${Number(result.portfolioReduction).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Years to Barista FIRE" value={result?`${Number(result.yearsToBarista)} years`:"-"}/>
                <ResultCard label="Years to Full FIRE" value={result?`${Number(result.yearsToFullFIRE)} years`:"-"}/>
                <ResultCard label="Years Saved by Part-Time" value={result?`${Number(result.yearsSavedByPartTime)} years`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">☕ Barista FIRE Calculator USA 2026 — Semi-Retirement</h2><p className="text-sm text-gray-600">Calculate how part-time work reduces your FIRE number and accelerates your retirement timeline — the Barista FIRE strategy.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Barista FIRE Calculator USA 2026 — Semi-Retirement" category="finance" intro="Calculate how part-time work reduces your FIRE number and accelerates your retirement timeline — the Barista FIRE strategy." howItWorks="Enter values for instant 2026 results." tipsSection="Try different scenarios." conclusion="Consult a qualified financial advisor."
          benefits={[{title:"Real-Time",text:"2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
