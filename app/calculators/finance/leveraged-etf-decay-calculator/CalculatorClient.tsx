'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateLeveragedETFDecay } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [initialInvestment,setInitialInvestment]=useState(10000)
  const [dailyTargetReturn,setDailyTargetReturn]=useState(0.05)
  const [leverage,setLeverage]=useState(3)
  const [days,setDays]=useState(365)
  const [dailyVolatility,setDailyVolatility]=useState(1.5)
  const result=useMemo(()=>{try{return calculateLeveragedETFDecay(initialInvestment,dailyTargetReturn,leverage,days,dailyVolatility)}catch(e){return null}},[initialInvestment, dailyTargetReturn, leverage, days, dailyVolatility])
  return(
    <CalculatorLayout title="Leveraged ETF Volatility Decay Calculator USA 2026" description="Model how volatility decay erodes leveraged ETF returns over time — showing why 3x ETFs dramatically underperform 3x the underlying in volatile markets." icon="📉" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="leveraged-etf-decay-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Initial Investment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={initialInvestment} onChange={e=>setInitialInvestment(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Daily Target Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={dailyTargetReturn} onChange={e=>setDailyTargetReturn(Number(e.target.value))} step={0.01} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Leverage Multiple</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={leverage} onChange={e=>setLeverage(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Days to Model</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={days} onChange={e=>setDays(Number(e.target.value))} step={30} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Daily Volatility (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={dailyVolatility} onChange={e=>setDailyVolatility(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Leveraged ETF Value" value={result?`${Number(result.leveragedFinalValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Unleveraged Value" value={result?`${Number(result.unleveragedFinalValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Expected (no decay)" value={result?`${Number(result.expectedLeveraged).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Volatility Decay %" value={result?`${Number(result.volatilityDecayPercent).toFixed(1)}%`:"-"}/>
                <ResultCard label="Recommendation" value={result?String(result.recommendation):"-"}/>
                <ResultCard label="Max Hold Period" value={result?String(result.maxHoldPeriod):"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📉 Leveraged ETF Volatility Decay Calculator USA 2026</h2><p className="text-sm text-gray-600">Model how volatility decay erodes leveraged ETF returns over time — showing why 3x ETFs dramatically underperform 3x the underlying in volatile markets.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Leveraged ETF Volatility Decay Calculator USA 2026" category="finance" intro="Model how volatility decay erodes leveraged ETF returns over time — showing why 3x ETFs dramatically underperform 3x the underlying in volatile markets." howItWorks="Enter values for instant 2026 results." tipsSection="Try different scenarios." conclusion="Consult a qualified financial advisor."
          benefits={[{title:"Real-Time",text:"2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
