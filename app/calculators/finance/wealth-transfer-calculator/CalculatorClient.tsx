'use client'
import { calculateWealthTransfer } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];
;relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [assets, setAssets] = useState(5000000)
  const [annualGrowth, setAnnualGrowth] = useState(7)
  const [yearsToTransfer, setYearsToTransfer] = useState(20)
  const [annualGifts, setAnnualGifts] = useState(36000)

  const result = useMemo(()=>{
    try{return calculateWealthTransfer(assets, annualGrowth, yearsToTransfer, annualGifts, 'grat')}catch(e){return null}
  },[assets, annualGrowth, yearsToTransfer, annualGifts])

  return (
    <CalculatorLayout title="Wealth Transfer Calculator USA 2026 — Estate & Gift Strategy" description="Calculate future estate value, estate tax liability, and savings from trust strategies vs direct gifting." icon="👨‍👩‍👧" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="wealth-transfer-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Asset Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={assets} onChange={e=>setAssets(Number(e.target.value))} step={100000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Growth Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={annualGrowth} onChange={e=>setAnnualGrowth(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years to Transfer</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={yearsToTransfer} onChange={e=>setYearsToTransfer(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Gifts ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualGifts} onChange={e=>setAnnualGifts(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Future Asset Value" value={result ? `${Number(result.futureValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Amount In Estate" value={result ? `${Number(result.inEstate).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Estate Tax Owed" value={result ? `${Number(result.estateTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net to Heirs (no trust)" value={result ? `${Number(result.netToHeirs).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Trust Tax Savings" value={result ? `${Number(result.trustSavings).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net to Heirs (with trust)" value={result ? `${Number(result.netWithTrust).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">👨‍👩‍👧 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Wealth transfer planning is about moving assets to the next generation in the most tax-efficient way possible. With the $13.61M estate tax exemption potentially reverting to ~$7M after 2025, 2026 is a critical year. This calculator shows the estate tax impact and trust strategy savings for your specific asset level.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Wealth Transfer Calculator USA 2026 — Estate & Gift Strategy" category="finance"
          intro="Wealth transfer planning is about moving assets to the next generation in the most tax-efficient way possible. With the $13.61M estate tax exemption potentially reverting to ~$7M after 2025, 2026 is a critical year. This calculator shows the estate tax impact and trust strategy savings for your specific asset level."
          howItWorks="Enter your values and results update instantly using 2026 US-standard formulas. All calculations run locally in your browser."
          tipsSection="Try multiple scenarios by changing one input at a time to understand which variable has the most impact on your outcome."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor about your specific situation."
          benefits={[
            {title:"Real-Time USA Results",text:"Instant 2026 calculations using current IRS limits and US-standard formulas."},
            {title:"100% Private",text:"Everything runs in your browser. No data stored or transmitted."},
            {title:"Free Forever",text:"No signup, no paywall, no hidden costs."},
          ]}
          useCases={[
            {title:"Personal Planning",text:"Model your specific situation with real numbers before making decisions."},
            {title:"Scenario Comparison",text:"Change one variable at a time to understand the impact of each factor."},
          ]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
