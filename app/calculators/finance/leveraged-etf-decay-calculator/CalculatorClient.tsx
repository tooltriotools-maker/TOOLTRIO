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
        <Card className="space-y-5">
          <section><h2 className="text-xl font-black text-gray-900 mb-2">How Leveraged ETF Volatility Decay Calculator Works</h2><p className="text-sm leading-6 text-gray-700">The code multiplies the entered daily return by leverage and subtracts a volatility-decay term based on leverage² × volatility² ÷ 2. It annualizes that simplified daily result over 252 trading days and compounds it over the selected horizon.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding the Inputs</h2><p className="text-sm leading-6 text-gray-700">Enter starting investment, assumed daily underlying return, leverage multiple, holding days and daily volatility. Daily volatility must be interpreted consistently with the model; it is not an annualized volatility input.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding Your Results</h2><p className="text-sm leading-6 text-gray-700">Compare leveraged final value with the unleveraged path and the “no decay” benchmark. A larger decay percentage means the leveraged path has fallen further behind the simple leveraged benchmark under the assumptions.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Worked Example</h2><p className="text-sm leading-6 text-gray-700">Example: a 3× fund with alternating or volatile daily moves can finish far from three times the index’s multi-day return because each day starts from a newly reset base. The calculator approximates that effect rather than simulating an actual ETF price path.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Important Assumptions and Limitations</h2><p className="text-sm leading-6 text-gray-700">Real leveraged ETFs have fees, financing costs, tracking error, derivatives exposure and actual sequences of daily returns. The SEC notes that most leveraged and inverse ETFs target daily performance and can differ significantly from that objective over longer periods.</p></section>
        </Card>
        <SEOContent title="Leveraged ETF Volatility Decay Calculator" category="finance" intro="Illustrate why a daily-reset leveraged ETF can diverge from a simple multiple of an index over multi-day periods. The model combines a target daily return, leverage multiple and volatility input to demonstrate compounding drag." howItWorks="The code multiplies the entered daily return by leverage and subtracts a volatility-decay term based on leverage² × volatility² ÷ 2. It annualizes that simplified daily result over 252 trading days and compounds it over the selected horizon." tipsSection="Review the assumptions above before using the result for a real-world decision." conclusion="Use this calculator as an educational estimate, not individualized financial, tax, legal, insurance or investment advice."
          benefits={[{title:"Specific methodology",text:"The page explains the exact assumptions used by this calculator."},{title:"Scenario testing",text:"Change the inputs to understand which assumptions drive the result."},{title:"Private",text:"Calculations run locally in your browser."}]}
          useCases={[{title:"Planning",text:"Create a baseline scenario before comparing alternatives."},{title:"Sensitivity",text:"Test how the result changes when a major assumption moves."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
