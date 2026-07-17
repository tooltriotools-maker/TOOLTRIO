'use client'
import {useState,useMemo} from 'react'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateK1PassiveLoss } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [passiveLoss,setPassiveLoss]=useState(35000)
  const [passiveIncome,setPassiveIncome]=useState(8000)
  const [agi,setAgi]=useState(95000)
  const [realEstatePro,setRealEstatePro]=useState(0)
  const result=useMemo(()=>{try{return calculateK1PassiveLoss(passiveLoss,passiveIncome,agi,realEstatePro>0)}catch(e){return null}},[passiveLoss, passiveIncome, agi, realEstatePro])
  return(
    <CalculatorLayout title="K-1 Passive Activity Loss Calculator USA 2026" description="Calculate how much of your K-1 passive activity loss is deductible now vs suspended under IRS passive activity rules." icon="📋" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="k1-passive-loss-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Passive Loss ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={passiveLoss} onChange={e=>setPassiveLoss(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Passive Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={passiveIncome} onChange={e=>setPassiveIncome(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">AGI ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={agi} onChange={e=>setAgi(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Real Estate Pro (1=yes)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={realEstatePro} onChange={e=>setRealEstatePro(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Net Passive Loss" value={result?`${Number(result.netPassive).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Currently Deductible" value={result?`${Number(result.rentalAllowance).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Carry-Forward" value={result?`${Number(result.carryForward).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Tax Savings Now" value={result?`${Number(result.taxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Status" value={result?String(result.note):"-"}/>
            </div>
            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📋 K-1 Passive Activity Loss Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate how much of your K-1 passive activity loss is deductible now vs suspended under IRS passive activity rules.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="K-1 Passive Activity Loss Calculator USA 2026" category="finance" intro="Calculate how much of your K-1 passive activity loss is deductible now vs suspended under IRS passive activity rules." howItWorks="Enter values for instant results." tipsSection="Try different scenarios." conclusion="Consult a financial advisor."
          benefits={[{title:"Real-Time",text:"2026 calcs."},{title:"Private",text:"Local."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model it."},{title:"Compare",text:"See impact."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
