'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateRetirementBucketStrategy } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [portfolio,setPortfolio]=useState(1200000)
  const [annualExpenses,setAnnualExpenses]=useState(72000)
  const [cashYears,setCashYears]=useState(2)
  const [bondYears,setBondYears]=useState(8)
  const [cashReturn,setCashReturn]=useState(4.5)
  const [bondReturn,setBondReturn]=useState(5.5)
  const [stockReturn,setStockReturn]=useState(8)
  const result=useMemo(()=>{try{return calculateRetirementBucketStrategy(portfolio,annualExpenses,cashYears,bondYears,cashReturn,bondReturn,stockReturn)}catch(e){return null}},[portfolio, annualExpenses, cashYears, bondYears, cashReturn, bondReturn, stockReturn])
  return(
    <CalculatorLayout title="Retirement Bucket Strategy Calculator USA 2026" description="Allocate your retirement portfolio into cash, bond, and stock buckets — eliminating sequence-of-returns risk by matching liquidity to time horizon." icon="🪣" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="retirement-bucket-strategy-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Total Portfolio ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={portfolio} onChange={e=>setPortfolio(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual Expenses ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={annualExpenses} onChange={e=>setAnnualExpenses(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Cash Bucket (years)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={cashYears} onChange={e=>setCashYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Bond Bucket (years)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={bondYears} onChange={e=>setBondYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Cash Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={cashReturn} onChange={e=>setCashReturn(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Bond Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={bondReturn} onChange={e=>setBondReturn(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Stock Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={stockReturn} onChange={e=>setStockReturn(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Cash Bucket" value={result?`${Number(result.cashBucket).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Bond Bucket" value={result?`${Number(result.bondBucket).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Stock Bucket" value={result?`${Number(result.stockBucket).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Annual Income from Fixed" value={result?`${Number(result.annualIncomFromFixed).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Stock Growth Annual" value={result?`${Number(result.stockGrowthAnnual).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Stock Bucket (30yr)" value={result?`${Number(result.stockBucket30yr).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🪣 Retirement Bucket Strategy Calculator USA 2026</h2><p className="text-sm text-gray-600">Allocate your retirement portfolio into cash, bond, and stock buckets — eliminating sequence-of-returns risk by matching liquidity to time horizon.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Retirement Bucket Strategy Calculator USA 2026" category="finance" intro="Allocate your retirement portfolio into cash, bond, and stock buckets — eliminating sequence-of-returns risk by matching liquidity to time horizon." howItWorks="Enter values for instant 2026 results." tipsSection="Try different scenarios." conclusion="Consult a qualified financial advisor."
          benefits={[{title:"Real-Time",text:"2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
