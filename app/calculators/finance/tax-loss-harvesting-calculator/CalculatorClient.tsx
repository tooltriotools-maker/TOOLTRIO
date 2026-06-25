'use client'
import { calculateTaxLossHarvesting } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [gains, setGains] = useState(25000)
  const [lossesToHarvest, setLossesToHarvest] = useState(20000)
  const [taxRate, setTaxRate] = useState(15)
  const [reinvestReturn, setReinvestReturn] = useState(8)
  const [years, setYears] = useState(15)

  const result = useMemo(()=>{
    try{return calculateTaxLossHarvesting(gains, lossesToHarvest, taxRate, reinvestReturn, years)}catch(e){return null}
  },[gains, lossesToHarvest, taxRate, reinvestReturn, years])

  return (
    <CalculatorLayout title="Tax-Loss Harvesting Calculator USA 2026" description="Calculate immediate tax savings from harvesting investment losses, reinvestment growth, and net long-term benefit vs deferred tax bill." icon="🌿" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="tax-loss-harvesting-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Capital Gains to Offset ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={gains} onChange={e=>setGains(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Losses to Harvest ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={lossesToHarvest} onChange={e=>setLossesToHarvest(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Tax Rate on Gains (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Expected Reinvest Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={reinvestReturn} onChange={e=>setReinvestReturn(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Hold Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={years} onChange={e=>setYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Tax Savings Now" value={result ? `${Number(result.taxSavingsNow).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Growth of Tax Savings" value={result ? `${Number(result.reinvestedGrowth).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Deferred Tax Bill" value={result ? `${Number(result.deferredTaxBill).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Long-Term Benefit" value={result ? `${Number(result.netBenefit).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Worth It" value={result ? String(result.worthIt ? 'Yes' : 'Depends on goals') : "—"} />
                <ResultCard label="Annual Benefit" value={result ? `${Number(result.annualizedBenefit).toLocaleString(undefined,{maximumFractionDigits:0})} /yr` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🌿 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Tax-loss harvesting converts investment losses into immediate tax savings, then reinvests those savings to compound over time. The IRS doesn't give you money back forever — when you eventually sell the replacement investment, you'll owe tax on the original basis. But the time value of deferring that tax for 10-20 years creates real, measurable wealth.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Tax-Loss Harvesting Calculator USA 2026" category="finance"
          intro="Tax-loss harvesting converts investment losses into immediate tax savings, then reinvests those savings to compound over time. The IRS doesn't give you money back forever — when you eventually sell the replacement investment, you'll owe tax on the original basis. But the time value of deferring that tax for 10-20 years creates real, measurable wealth."
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
