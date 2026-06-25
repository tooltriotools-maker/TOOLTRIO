'use client'
import { calculateRealEstateSyndicationROI } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [investmentAmount, setInvestmentAmount] = useState(50000)
  const [preferredReturn, setPreferredReturn] = useState(7)
  const [promoterSplit, setPromoterSplit] = useState(30)
  const [holdYears, setHoldYears] = useState(5)
  const [projectedIRR, setProjectedIRR] = useState(15)
  const [annualCashYield, setAnnualCashYield] = useState(6)

  const result = useMemo(()=>{
    try{return calculateRealEstateSyndicationROI(investmentAmount, preferredReturn, promoterSplit, holdYears, projectedIRR, annualCashYield)}catch(e){return null}
  },[investmentAmount, preferredReturn, promoterSplit, holdYears, projectedIRR, annualCashYield])

  return (
    <CalculatorLayout title="Real Estate Syndication ROI Calculator USA 2026" description="Calculate your investor return from a real estate syndication including preferred return, promote split, equity multiple, and IRR on passive investments." icon="🏢" category="Finance" relatedCalculators={relatedCalculators} slug="real-estate-syndication-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Investment Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={investmentAmount} onChange={e=>setInvestmentAmount(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Preferred Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={preferredReturn} onChange={e=>setPreferredReturn(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Sponsor Promote (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={promoterSplit} onChange={e=>setPromoterSplit(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Hold Period (years)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={holdYears} onChange={e=>setHoldYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Projected IRR (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={projectedIRR} onChange={e=>setProjectedIRR(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Cash Yield (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={annualCashYield} onChange={e=>setAnnualCashYield(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Annual Cash Flow" value={result ? `${Number(result.annualCashFlow).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Total Cash Distributions" value={result ? `${Number(result.totalCashDistributions).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Exit Proceeds" value={result ? `${Number(result.exitProceeds).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Return" value={result ? `${Number(result.totalReturn).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Equity Multiple" value={result ? `${Number(result.equityMultiple).toFixed(2)}x` : "—"} />
                <ResultCard label="Actual IRR" value={result ? `${Number(result.actualIRR).toFixed(1)}%` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏢 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Real estate syndications offer passive investors access to institutional-quality properties with preferred returns (typically 6-8%) and equity upside through appreciation. Understanding the waterfall structure — preferred return, equity split, and promote — is essential for evaluating whether a syndication deal delivers fair compensation relative to risk.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Real Estate Syndication ROI Calculator USA 2026" category="finance"
          intro="Real estate syndications offer passive investors access to institutional-quality properties with preferred returns (typically 6-8%) and equity upside through appreciation. Understanding the waterfall structure — preferred return, equity split, and promote — is essential for evaluating whether a syndication deal delivers fair compensation relative to risk."
          howItWorks="Enter your values and results update instantly using 2026 US-standard formulas. All calculations run locally in your browser."
          tipsSection="Try multiple scenarios by changing one input at a time to understand which variable has the most impact."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor."
          benefits={[{title:"Real-Time USA Results",text:"Instant 2026 IRS calculations."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup or paywall."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation with real numbers."},{title:"Scenario Comparison",text:"Change inputs to see the impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
