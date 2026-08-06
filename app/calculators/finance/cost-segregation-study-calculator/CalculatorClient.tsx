'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateCostSegregation } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [buildingCost,setBuildingCost]=useState(1200000)
  const [landCost,setLandCost]=useState(300000)
  const [taxRate,setTaxRate]=useState(37)
  const result=useMemo(()=>{try{return calculateCostSegregation(buildingCost,landCost,'commercial',taxRate)}catch(e){return null}},[buildingCost, landCost, taxRate])
  return(
    <CalculatorLayout title="Cost Segregation Study Calculator USA 2026" description="Calculate the first-year tax savings from a cost segregation study — accelerating depreciation on 5/7/15-year components of commercial or residential property." icon="🏗️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="cost-segregation-study-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Building Cost ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={buildingCost} onChange={e=>setBuildingCost(Number(e.target.value))} step={25000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Land Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={landCost} onChange={e=>setLandCost(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Your Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Standard Annual Depreciation" value={result?`${Number(result.standardAnnualDepreciation).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Year-1 Accelerated Deduction" value={result?`${Number(result.year1AcceleratedDeduction).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Year-1 Tax Savings" value={result?`${Number(result.year1TaxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Study Cost" value={result?`${Number(result.studyCost).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="ROI on Study" value={result?`${Number(result.roi).toFixed(1)}x`:"-"}/>
                <ResultCard label="NPV Benefit" value={result?`${Number(result.npvBenefit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🏗️ Cost Segregation Study Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate the first-year tax savings from a cost segregation study — accelerating depreciation on 5/7/15-year components of commercial or residential property.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Cost Segregation Study Calculator USA 2026" category="finance" intro="Model the timing benefit of reclassifying part of a property’s building basis into shorter-lived asset classes. This page is a screening model for whether a professional study may merit closer analysis." howItWorks="The current model assigns 15% of building basis to 5-year property, 10% to 7-year property and 8% to 15-year property. It then treats all three buckets as a first-year accelerated deduction and compares that amount with straight-line building depreciation over 27.5 or 39 years. Estimated first-year tax savings = modeled acceleration × entered tax rate." tipsSection="Those 15%/10%/8% allocations are assumptions, not IRS safe-harbor percentages, and actual classification requires facts about the property. The current function also effectively assumes immediate deduction of the reclassified buckets; actual depreciation and bonus-depreciation treatment depends on asset class, placed-in-service date and current law." conclusion="Use the result only as a preliminary feasibility screen. A defensible cost-segregation study requires asset identification and tax analysis; the IRS publishes a Cost Segregation Audit Technique Guide for this area."
          benefits={[{title:"Method",text:"Explains the calculation actually used on this page."},{title:"Inputs",text:"Shows which assumptions drive the result."},{title:"Limits",text:"Calls out important exclusions and simplifications."}]}
          useCases={[{title:"Scenario planning",text:"Compare realistic input combinations."},{title:"Decision support",text:"Understand the trade-offs behind the outputs."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
