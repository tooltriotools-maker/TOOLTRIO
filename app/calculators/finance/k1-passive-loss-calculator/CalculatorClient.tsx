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
        <SEOContent title="K-1 Passive Activity Loss Calculator" category="finance"
          intro="Estimate how a simplified passive rental loss may be divided between a current-year rental-real-estate allowance and suspended carryforward. The model uses passive income, passive loss, AGI and a real-estate-professional toggle to illustrate the $25,000 special allowance and its AGI phaseout."
          howItWorks="Net passive amount = passive income − passive loss. When that is negative, the model starts with the excess loss. For a non-real-estate-professional, it allows up to $25,000 when AGI is $100,000 or less, phases that allowance down linearly from $100,000 to $150,000, and sets it to zero at $150,000 or more. Remaining modeled loss is carried forward."
          tipsSection="This is narrower than the actual passive-activity rules. The $25,000 exception generally concerns rental real estate with active participation; a K-1 by itself does not make a loss eligible. Basis, at-risk limits, material participation, filing status, grouping, publicly traded partnerships and disposition rules can change the allowed deduction. The model's 32% tax-savings figure is only an assumed rate."
          conclusion="Use the output to understand the phaseout concept, then reconcile the actual K-1 and passive activities under Form 8582 and Publication 925. Do not use the result as the deductible amount on a tax return without applying the other limitations."
          benefits={[{title:"Methodology",text:"Explains the exact assumptions used by this ToolTrio model."},{title:"Scenario testing",text:"Change the inputs to see which assumptions drive the result."},{title:"Limitations",text:"Highlights important factors the simplified model does not capture."}]}
          useCases={[{title:"Planning",text:"Build a calculator-specific baseline from your own inputs."},{title:"Sensitivity check",text:"Compare a conservative scenario with a more optimistic one."}]}
          caseStudy={{title:"Worked example",scenario:"Rental loss below the phaseout — Enter $35,000 passive loss, $8,000 passive income and $95,000 AGI.",result:"The model produces a $27,000 net passive loss, applies up to the $25,000 rental allowance, and carries the remainder forward under its simplified assumptions.",takeaway:"Use the example to understand the calculation flow, then replace every assumption with values relevant to your situation."}} />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
