'use client'
import { calculateEstateProbate } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [estateValue, setEstateValue] = useState(850000)
  const [hasWill, setHasWill] = useState(1)
  const [hasTrust, setHasTrust] = useState(0)

  const result = useMemo(()=>{
    try{return calculateEstateProbate(estateValue, 'CA', hasWill > 0, hasTrust > 0)}catch(e){return null}
  },[estateValue, hasWill, hasTrust])

  return (
    <CalculatorLayout title="Estate Probate Cost Calculator USA 2026 — Avoid Probate" description="Calculate estimated probate costs by state, time delays, and savings from a revocable living trust. See exactly what your estate would cost to settle." icon="⚖️" category="Finance" relatedCalculators={relatedCalculators} slug="estate-probate-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Estate Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={estateValue} onChange={e=>setEstateValue(Number(e.target.value))} step={25000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Has Will</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={hasWill} onChange={e=>setHasWill(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Has Living Trust</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={hasTrust} onChange={e=>setHasTrust(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Estimated Probate Cost" value={result ? `${Number(result.probateCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Probate % of Estate" value={result ? `${Number(result.probatePercent).toFixed(1)}%` : "—"} />
                <ResultCard label="Time in Probate" value={result ? `${Number(result.timeCost).toLocaleString()} months` : "—"} />
                <ResultCard label="Trust Setup Cost" value={result ? `${Number(result.trustSetupCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Savings with Trust" value={result ? `${Number(result.netSavings).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Worth Avoiding Probate" value={result ? String(result.worthAvoiding ? 'Yes' : 'Marginal') : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">⚖️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Probate is the court-supervised process for distributing assets after death. In California, it can cost 4%+ of the gross estate and take 18+ months. A revocable living trust eliminates probate entirely — and at $3,500 setup cost vs $30,000+ in probate fees on a typical estate, it's one of the clearest financial planning decisions available.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="Estate Probate Cost Calculator" category="finance"
          intro="This page estimates probate cost under the calculator’s California scenario and compares that modeled cost with a simple living-trust scenario."
          howItWorks="The current UI passes California to a lookup that assigns a 4% probate-cost rate. Without a trust, the model adds either $5,000 when a will is selected or $15,000 without a will. With a trust, modeled probate cost is zero and a $3,500 setup cost is used."
          tipsSection="Worked example: Example: an $850,000 estate with a will and no trust produces a model cost of 4% of the estate plus $5,000. This is a ToolTrio planning estimate, not California statutory probate-fee computation."
          conclusion="Important assumptions and limitations: Probate fees, court procedures, small-estate thresholds, property passing outside probate and attorney/executor compensation depend on state law and estate facts. A living trust also avoids probate only for assets properly transferred to it."
          benefits={[{title:"Methodology",text:"The explanation above follows the calculation actually performed by this page."},{title:"Interpret the output",text:"Treat the result as a scenario estimate and test the assumptions that matter most."},{title:"Privacy",text:"Calculator inputs are processed in your browser."}]}
          useCases={[{title:"Decision support",text:"Compare the calculator-specific trade-offs before taking the next step."},{title:"Scenario testing",text:"Change one relevant input at a time and observe which output is most sensitive."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
