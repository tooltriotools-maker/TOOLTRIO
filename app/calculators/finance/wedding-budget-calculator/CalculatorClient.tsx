'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateWeddingBudget } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [totalBudget, setTotalBudget] = useState(35000)
  const [guestCount, setGuestCount] = useState(120)
  const [regionNum, setRegionNum] = useState(1)

  const result = useMemo(()=>{
    try{return calculateWeddingBudget(totalBudget,guestCount,['northeast','west','south','midwest'][regionNum-1]||'northeast','ballroom')}catch(e){return null}
  },[totalBudget, guestCount, regionNum])

  return (
    <CalculatorLayout title="Wedding Budget Calculator USA 2026 — True Cost by Region" description="Create a complete wedding budget breakdown by category including venue, catering, photography, flowers, and more — with regional cost adjustments." icon="💍" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="wedding-budget-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Total Wedding Budget ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={totalBudget} onChange={e=>setTotalBudget(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Guest Count</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={guestCount} onChange={e=>setGuestCount(Number(e.target.value))} step={10} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Region (1=NE 2=W 3=S 4=MW)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={regionNum} onChange={e=>setRegionNum(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Venue Cost" value={result ? `${Number(result.venue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Catering Cost" value={result ? `${Number(result.catering).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Photography" value={result ? `${Number(result.photography).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Planned" value={result ? `${Number(result.planned).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Budget Surplus/Deficit" value={result ? `${Number(result.surplus).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Cost Per Guest" value={result ? `${Number(result.perGuest).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💍 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The average US wedding costs $35,000 in 2026, but varies dramatically by region — Northeast weddings average $45,000-$75,000+ while Midwest weddings average $25,000-$38,000. Venue and catering alone typically consume 45-50% of the total budget. This calculator breaks down your specific budget across all major categories with regional price adjustments so you know exactly where your money goes.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Wedding Budget Calculator USA 2026 — True Cost by Region" category="finance" intro="The average US wedding costs $35,000 in 2026, but varies dramatically by region — Northeast weddings average $45,000-$75,000+ while Midwest weddings average $25,000-$38,000. Venue and catering alone typically consume 45-50% of the total budget. This calculator breaks down your specific budget across all major categories with regional price adjustments so you know exactly where your money goes."
          howItWorks="Enter your values and results update instantly using 2026 US-standard formulas."
          tipsSection="Try multiple scenarios by changing one input at a time."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor."
          benefits={[{title:"Real-Time USA Results",text:"Instant 2026 IRS calculations."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation."},{title:"Scenario Comparison",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
