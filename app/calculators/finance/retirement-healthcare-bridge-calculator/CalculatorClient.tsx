'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateRetirementHealthcareBridge } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [retirementAge, setRetirementAge] = useState(62)
  const [currentPremium, setCurrentPremium] = useState(650)
  const [cobraMonths, setCobraMonths] = useState(18)

  const result = useMemo(()=>{
    try{return calculateRetirementHealthcareBridge(retirementAge,65,currentPremium,cobraMonths)}catch(e){return null}
  },[retirementAge, currentPremium, cobraMonths])

  return (
    <CalculatorLayout title="Retirement Healthcare Bridge Calculator USA 2026 — Before Medicare" description="Calculate the total cost of healthcare coverage between early retirement and Medicare at 65, including COBRA, ACA marketplace plans, and HSA offsets." icon="🏥" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="retirement-healthcare-bridge-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Retirement Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={retirementAge} onChange={e=>setRetirementAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Monthly Premium ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentPremium} onChange={e=>setCurrentPremium(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">COBRA Months Planned</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={cobraMonths} onChange={e=>setCobraMonths(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Bridge Months to Medicare" value={result ? `${Number(result.bridgeMonths).toLocaleString()} mo` : "—"} highlight />
                <ResultCard label="COBRA Total Cost" value={result ? `${Number(result.cobraCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="ACA Coverage Cost" value={result ? `${Number(result.acaCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Bridge Cost" value={result ? `${Number(result.totalBridgeCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="HSA Offset" value={result ? `${Number(result.hsaOffset).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Bridge Cost" value={result ? `${Number(result.netBridgeCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏥 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The healthcare gap between early retirement and Medicare at 65 is one of the most expensive and underplanned retirement costs. Retiring at 62 means 36 months of coverage — COBRA at up to $1,800/month for a couple, or ACA marketplace at $500-$1,500/month. With strategic income management, ACA subsidies can dramatically reduce this cost. This calculator shows your exact bridge cost and HSA offset potential.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Retirement Healthcare Bridge Calculator USA 2026 — Before Medicare" category="finance" intro="The healthcare gap between early retirement and Medicare at 65 is one of the most expensive and underplanned retirement costs. Retiring at 62 means 36 months of coverage — COBRA at up to $1,800/month for a couple, or ACA marketplace at $500-$1,500/month. With strategic income management, ACA subsidies can dramatically reduce this cost. This calculator shows your exact bridge cost and HSA offset potential."
          howItWorks="This tool estimates the health-insurance gap between an early retirement age and Medicare eligibility. COBRA months are priced at 202% of the entered current premium; remaining bridge months use age-based ACA premium assumptions built into the calculator."
          tipsSection="If retirement begins at 60 and Medicare begins at 65, the bridge is 60 months. Entering 18 COBRA months assigns the other 42 months to the calculator’s ACA scenario."
          conclusion="Actual COBRA premiums, Marketplace premiums, premium tax credits and Medicare costs depend on plan, household income, location and eligibility. The calculator now uses the 2026 standard Part B premium of $202.90 in its long-range scenario, but future premiums will change."
          benefits={[{title:"Real-Time USA Results",text:"Calculator-specific scenario outputs."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation."},{title:"Scenario Comparison",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
