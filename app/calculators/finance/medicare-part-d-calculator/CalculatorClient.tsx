'use client'
import {useState,useMemo} from 'react'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import { calculateMedicarePrescriptionCosts } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [brandDrugs, setBrandDrugs] = useState(3600)
  const [genericDrugs, setGenericDrugs] = useState(800)
  const [partDPremium, setPartDPremium] = useState(35)
  const result=useMemo(()=>{try{return calculateMedicarePrescriptionCosts(brandDrugs,genericDrugs,'pdp','standard',partDPremium)}catch(e){return null}},[brandDrugs, genericDrugs, partDPremium])
  return(
    <CalculatorLayout title="Medicare Part D Drug Cost Calculator USA 2026" description="Calculate total 2026 Medicare Part D costs including premiums, deductible, copays, and the 2026 $2,100 annual out-of-pocket threshold." icon="💊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="medicare-part-d-calculator">
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

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">💊 Medicare Part D Drug Cost Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate total 2026 Medicare Part D costs including premiums, deductible, copays, and the 2026 $2,100 annual out-of-pocket threshold.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <div className="space-y-6 text-sm text-gray-700 leading-7">
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">How the 2026 Part D estimate works</h2><p>The calculator combines the monthly plan premium with a simplified version of the 2026 defined-standard Part D benefit. It applies the $615 deductible, then models 25% enrollee coinsurance on remaining covered drug spending until modeled out-of-pocket spending reaches the $2,100 2026 threshold. Premiums are added separately because they do not count toward the Part D out-of-pocket threshold.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">Understanding the inputs and output</h2><p><strong>Annual brand and generic drug costs</strong> should represent the negotiated covered-drug cost scenario you want to test; actual pharmacy prices and formulary tiers vary by plan. <strong>Monthly Part D premium</strong> is the plan premium before any income-related adjustment. The total annual result combines 12 months of premium with the calculator’s modeled deductible and coinsurance.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">Worked example</h2><p>For $3,600 of brand-drug cost, $800 of generic-drug cost, and a $35 monthly premium, the modeled drug spending is $4,400. The first $615 is assigned to the deductible, then the calculator applies 25% coinsurance to the remaining amount, subject to the $2,100 out-of-pocket threshold. It then adds $420 of annual premiums to produce the estimated annual plan-plus-drug cost.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">What this estimate does not capture</h2><p>Real Part D costs depend on the specific plan formulary, pharmacy network, negotiated prices, copays, coinsurance, Low-Income Subsidy status, manufacturer discounts, selected-drug rules, and whether each prescription is covered. The calculator uses the defined-standard structure as a planning model; it is not a quote for a specific Medicare plan.</p><p className="mt-3"><strong>Primary source:</strong> <a className="text-green-700 underline" href="https://www.cms.gov/newsroom/fact-sheets/final-cy-2026-part-d-redesign-program-instructions" target="_blank" rel="noreferrer">CMS Final CY 2026 Part D Redesign Program Instructions</a>.</p></Card>
        </div>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
