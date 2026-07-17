'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateSocialSecurityDisabilityBenefit } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [avgMonthlyEarnings, setAvgMonthlyEarnings] = useState(4200)
  const [yearsWorked, setYearsWorked] = useState(15)
  const [age, setAge] = useState(42)
  const [disabilityAge, setDisabilityAge] = useState(42)
  const result=useMemo(()=>{try{return calculateSocialSecurityDisabilityBenefit(avgMonthlyEarnings,yearsWorked,age,disabilityAge)}catch(e){return null}},[avgMonthlyEarnings, yearsWorked, age, disabilityAge])
  return(
    <CalculatorLayout title="Social Security Disability (SSDI) Calculator USA 2026" description="Estimate SSDI monthly benefit using the Social Security PIA formula and work credit eligibility requirements." icon="🦽" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="ssdi-benefit-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Average Monthly Earnings ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={avgMonthlyEarnings} onChange={e=>setAvgMonthlyEarnings(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Years Worked</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={yearsWorked} onChange={e=>setYearsWorked(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Current Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Disability Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={disabilityAge} onChange={e=>setDisabilityAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Est. Monthly SSDI" value={result?`${Number(result.estimatedMonthlyBenefit).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"} highlight/>
                <ResultCard label="Annual Benefit" value={result?`${Number(result.annualBenefit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Eligible" value={result?String(result.eligible ? 'Yes' : 'Check work credits'):"-"}/>
                <ResultCard label="Credits Needed" value={result?String(result.workCreditsNeeded):"-"}/>
                <ResultCard label="Medicare Eligibility Age" value={result?String(result.medicareEligibilityAge):"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🦽 Social Security Disability (SSDI) Calculator USA 2026</h2><p className="text-sm text-gray-600">Estimate SSDI monthly benefit using the Social Security PIA formula and work credit eligibility requirements.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Social Security Disability (SSDI) Calculator USA 2026" category="finance" intro="Estimate SSDI monthly benefit using the Social Security PIA formula and work credit eligibility requirements." howItWorks="Enter values for instant 2026 US-standard results." tipsSection="Try different scenarios." conclusion="Consult a financial advisor for personalized advice."
          benefits={[{title:"Real-Time",text:"2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
