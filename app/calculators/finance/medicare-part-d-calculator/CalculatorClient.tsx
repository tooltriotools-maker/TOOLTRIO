'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateMedicarePrescriptionCosts } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [brandDrugs, setBrandDrugs] = useState(3600)
  const [genericDrugs, setGenericDrugs] = useState(800)
  const [partDPremium, setPartDPremium] = useState(35)
  const result=useMemo(()=>{try{return calculateMedicarePrescriptionCosts(brandDrugs,genericDrugs,'pdp','standard',partDPremium)}catch(e){return null}},[brandDrugs, genericDrugs, partDPremium])
  return(
    <CalculatorLayout title="Medicare Part D Drug Cost Calculator USA 2026" description="Calculate total 2026 Medicare Part D costs including premiums, deductible, copays, and the new $2,000 annual out-of-pocket cap." icon="💊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="medicare-part-d-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual Brand Drug Costs ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={brandDrugs} onChange={e=>setBrandDrugs(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual Generic Drug Costs ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={genericDrugs} onChange={e=>setGenericDrugs(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Monthly Part D Premium ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={partDPremium} onChange={e=>setPartDPremium(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Monthly Premium" value={result?`${Number(result.monthlyPremium).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"} highlight/>
                <ResultCard label="Annual Premium Cost" value={result?`${Number(result.annualPremiumCost).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Out-of-Pocket Copays" value={result?`${Number(result.oopCopays).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total Annual Cost" value={result?`${Number(result.totalAnnualCost).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="2026 OOP Cap" value={result?`${Number(result.oopMax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">💊 Medicare Part D Drug Cost Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate total 2026 Medicare Part D costs including premiums, deductible, copays, and the new $2,000 annual out-of-pocket cap.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Medicare Part D Drug Cost Calculator USA 2026" category="finance" intro="Calculate total 2026 Medicare Part D costs including premiums, deductible, copays, and the new $2,000 annual out-of-pocket cap." howItWorks="Enter values for instant 2026 US-standard results." tipsSection="Try different scenarios." conclusion="Consult a financial advisor for personalized advice."
          benefits={[{title:"Real-Time",text:"2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
