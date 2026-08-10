'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateCollectiblesInvestment } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [purchasePrice, setPurchasePrice] = useState(15000)
  const [holdYears, setHoldYears] = useState(10)
  const [insuranceCost, setInsuranceCost] = useState(300)
  const [storageCost, setStorageCost] = useState(200)
  const result = useMemo(()=>{try{return calculateCollectiblesInvestment(purchasePrice,'art',holdYears,insuranceCost,storageCost)}catch(e){return null}},[purchasePrice, holdYears, insuranceCost, storageCost])
  return (
    <CalculatorLayout title="Collectibles Investment Calculator USA 2026" description="Collectibles Investment Calculator USA 2026" icon="🎨" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="collectibles-investment-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Purchaseprice</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={purchasePrice} onChange={e=>setPurchasePrice(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Holdyears</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={holdYears} onChange={e=>setHoldYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Insurancecost</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={insuranceCost} onChange={e=>setInsuranceCost(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Storagecost</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={storageCost} onChange={e=>setStorageCost(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Future Value" value={result?`${Number(result.futureValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Total Costs" value={result?`${Number(result.totalCosts).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Net Proceeds" value={result?`${Number(result.netProceeds).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Total Return" value={result?`${Number(result.totalReturn).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="ROI" value={result?`${Number(result.roi).toFixed(1)}%`:"-"} />
                <ResultCard label="Tax at 28%" value={result?`${Number(result.capitalGainsTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🎨 Collectibles Investment Calculator USA 2026</h2><p className="text-sm text-gray-600">The result separates modeled appreciation from recurring carrying costs and a 15% selling-fee assumption, so a high headline resale value does not automatically mean a high net return.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Collectibles Investment Calculator USA 2026" category="finance" intro="Estimate a collectible’s modeled resale economics after appreciation, recurring insurance/storage costs and a 15% selling-fee assumption." howItWorks="The code assigns a fixed annual appreciation assumption by category, compounds purchase price for the holding period, subtracts annual insurance and storage costs, and subtracts 15% of future value as a selling fee. ROI compares net profit with purchase price plus recurring costs. A separate tax estimate applies 28% to modeled appreciation." tipsSection="The category growth rates and 15% selling fee are ToolTrio assumptions, not market forecasts. Authentication, restoration, buyer premiums, dealer spreads, shipping, liquidity and supported by the cited methodology or source where applicableance can materially change realized returns. IRS rules provide a maximum 28% rate for net long-term collectibles gain; your actual rate can be lower." conclusion="Treat projected appreciation as a scenario, not an expected return. Collectible prices can be volatile and sales can take time."
          benefits={[{title:"Method",text:"Explains the calculation actually used on this page."},{title:"Inputs",text:"Shows which assumptions drive the result."},{title:"Limits",text:"Calls out important exclusions and simplifications."}]}
          useCases={[{title:"Scenario planning",text:"Compare realistic input combinations."},{title:"Decision support",text:"Understand the trade-offs behind the outputs."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
