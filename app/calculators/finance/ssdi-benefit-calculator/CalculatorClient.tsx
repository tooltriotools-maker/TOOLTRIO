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
              
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={avgMonthlyEarnings} onChange={e=>setAvgMonthlyEarnings(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
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
        <SEOContent title="Social Security Disability (SSDI) Calculator USA 2026" category="finance" intro="Estimate a simplified SSDI benefit from an AIME-like monthly earnings input and see the calculator’s work-credit screen. It is most useful for understanding the PIA formula, not for predicting an SSA award." howItWorks="For a worker becoming eligible in 2026, the code now applies SSA’s 2026 PIA bend points: 90% of the first $1,286 of AIME, 32% from $1,286 through $7,749, and 15% above $7,749. The page also compares estimated credits earned from years worked with a simplified age-based credit requirement." tipsSection="Do not enter ordinary recent monthly wages as though they were automatically AIME. SSA indexes covered earnings and applies disability-specific computation rules. The work-credit test here is simplified and does not fully model the recent-work test or every special rule." conclusion="Use this result as an educational estimate only. SSA determines disability status, insured status, AIME and the final PIA from your official earnings record."
          benefits={[{title:"Method",text:"Explains the calculation actually used on this page."},{title:"Inputs",text:"Shows which assumptions drive the result."},{title:"Limits",text:"Calls out important exclusions and simplifications."}]}
          useCases={[{title:"Scenario planning",text:"Compare realistic input combinations."},{title:"Decision support",text:"Understand the trade-offs behind the outputs."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
