'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateUmbrellaPolicyValue } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [netWorth, setNetWorth] = useState(850000)
  const [autoLiabilityLimit, setAutoLiabilityLimit] = useState(300000)
  const [homeLiabilityLimit, setHomeLiabilityLimit] = useState(300000)
  const [umbrellaCoverage, setUmbrellaCoverage] = useState(1000000)
  const [umbrellaAnnualCost, setUmbrellaAnnualCost] = useState(250)
  const result = useMemo(()=>{try{return calculateUmbrellaPolicyValue(netWorth,autoLiabilityLimit,homeLiabilityLimit,umbrellaCoverage,umbrellaAnnualCost)}catch(e){return null}},[netWorth, autoLiabilityLimit, homeLiabilityLimit, umbrellaCoverage, umbrellaAnnualCost])
  return (
    <CalculatorLayout title="Umbrella Insurance Calculator USA 2026" description="Umbrella Insurance Calculator USA 2026" icon="☂️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="umbrella-insurance-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Net Worth</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={netWorth} onChange={e=>setNetWorth(Number(e.target.value))} step={25000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Auto Liability Limit</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={autoLiabilityLimit} onChange={e=>setAutoLiabilityLimit(Number(e.target.value))} step={50000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Home Liability Limit</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={homeLiabilityLimit} onChange={e=>setHomeLiabilityLimit(Number(e.target.value))} step={50000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Umbrella Coverage</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={umbrellaCoverage} onChange={e=>setUmbrellaCoverage(Number(e.target.value))} step={500000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Umbrella Premium</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={umbrellaAnnualCost} onChange={e=>setUmbrellaAnnualCost(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Assets at Risk" value={result?`${Number(result.assetsAtRisk).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Recommended Coverage" value={result?`${Number(result.recommendedCoverage).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Coverage Gap" value={result?`${Number(result.coverageGap).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Cost Per $1M" value={result?`${Number(result.costPerMillion).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Worth It" value={result?String(result.worthIt ? 'Yes — strongly recommended' : 'Lower priority'):"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">Understanding these results</h2><p className="text-sm text-gray-600">Compare your net worth with the liability limits on your auto and homeowners policies and a proposed umbrella limit. The calculator highlights a simple asset-at-risk estimate, a rounded coverage target, any modeled gap and annual premium per $1 million of umbrella coverage.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Umbrella Liability Coverage Gap Calculator" category="finance"
          intro="Compare your net worth with the liability limits on your auto and homeowners policies and a proposed umbrella limit. The calculator highlights a simple asset-at-risk estimate, a rounded coverage target, any modeled gap and annual premium per $1 million of umbrella coverage."
          howItWorks="Assets at risk = max(0, net worth − the larger underlying liability limit). The modeled coverage target rounds net worth up to the next $1 million, with a $1 million minimum. Coverage gap = target − umbrella coverage − the larger underlying limit. These are planning heuristics in the ToolTrio model, not insurer underwriting rules."
          tipsSection="Do not interpret net worth as the only measure of liability exposure. Future earnings, protected assets, exclusions, household drivers, rental property, business activity and policy-specific requirements can matter. The calculator also cannot determine whether a claim is covered or whether an insurer requires higher underlying limits."
          conclusion="The result is best used to identify questions for an insurance quote: how much underlying liability is required, what the umbrella excludes, and whether the proposed limit fits the assets and exposures you want to protect."
          benefits={[{title:"Methodology",text:"Explains the exact assumptions used by this ToolTrio model."},{title:"Scenario testing",text:"Change the inputs to see which assumptions drive the result."},{title:"Limitations",text:"Highlights important factors the simplified model does not capture."}]}
          useCases={[{title:"Planning",text:"Build a calculator-specific baseline from your own inputs."},{title:"Sensitivity check",text:"Compare a conservative scenario with a more optimistic one."}]}
          caseStudy={{title:"Worked example",scenario:"$850,000 net worth household — Enter $850,000 net worth, $300,000 auto liability, $300,000 home liability, a $1 million umbrella and $250 annual premium.",result:"The model compares the $300,000 underlying limit with net worth, rounds its heuristic target to $1 million and reports the cost per $1 million of umbrella coverage.",takeaway:"Use the example to understand the calculation flow, then replace every assumption with values relevant to your situation."}} />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
