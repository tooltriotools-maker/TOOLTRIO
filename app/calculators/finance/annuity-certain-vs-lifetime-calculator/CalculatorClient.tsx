'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateAnnuityCertainVsLifetime } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [premium, setPremium] = useState(250000)
  const [age, setAge] = useState(65)
  const [periodCertainYears, setPeriodCertainYears] = useState(20)
  const [lifetimeMonthly, setLifetimeMonthly] = useState(1350)
  const [periodCertainMonthly, setPeriodCertainMonthly] = useState(1550)
  const [discountRate, setDiscountRate] = useState(5)
  const result=useMemo(()=>{try{return calculateAnnuityCertainVsLifetime(premium,age,periodCertainYears,lifetimeMonthly,periodCertainMonthly,discountRate)}catch(e){return null}},[premium, age, periodCertainYears, lifetimeMonthly, periodCertainMonthly, discountRate])
  return(
    <CalculatorLayout title="Period Certain vs Lifetime Annuity Calculator USA 2026" description="Compare period certain annuity vs lifetime annuity — which pays more given your life expectancy and the break-even age." icon="📅" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="annuity-certain-vs-lifetime-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Premium ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={premium} onChange={e=>setPremium(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Your Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Period Certain (years)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={periodCertainYears} onChange={e=>setPeriodCertainYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Lifetime Monthly ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={lifetimeMonthly} onChange={e=>setLifetimeMonthly(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Period Certain Monthly ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={periodCertainMonthly} onChange={e=>setPeriodCertainMonthly(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Discount Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={discountRate} onChange={e=>setDiscountRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Lifetime Total (to avg life)" value={result?`${Number(result.lifetimeTotal).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Period Certain Total" value={result?`${Number(result.periodTotal).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="PV Lifetime Payments" value={result?`${Number(result.pvLifetime).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="PV Period Certain" value={result?`${Number(result.pvPeriod).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Break-Even Age" value={result?String(result.breakEvenAge):"-"}/>
                <ResultCard label="Recommendation" value={result?String(result.recommendation):"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📅 Period Certain vs Lifetime Annuity Calculator USA 2026</h2><p className="text-sm text-gray-600">Compare period certain annuity vs lifetime annuity — which pays more given your life expectancy and the break-even age.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Period Certain vs Lifetime Annuity Calculator USA 2026" category="finance" intro="Compare period certain annuity vs lifetime annuity — which pays more given your life expectancy and the break-even age." howItWorks="Enter values for instant 2026 US-standard results." tipsSection="Try different scenarios." conclusion="Consult a financial advisor for personalized advice."
          benefits={[{title:"Real-Time",text:"2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
