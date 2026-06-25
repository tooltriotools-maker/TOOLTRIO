'use client'
import { calculateChildTaxCredit } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [numChildren, setNumChildren] = useState(2)
  const [childrenUnder6, setChildrenUnder6] = useState(1)
  const [agi, setAgi] = useState(95000)
  const [earned, setEarned] = useState(90000)

  const result = useMemo(()=>{
    try{return calculateChildTaxCredit(numChildren, childrenUnder6, agi, 'single', earned)}catch(e){return null}
  },[numChildren, childrenUnder6, agi, earned])

  return (
    <CalculatorLayout title="Child Tax Credit Calculator USA 2026 — CTC & ACTC" description="Calculate Child Tax Credit, Additional Child Tax Credit refundable portion, and Child & Dependent Care Credit for your family." icon="👶" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="child-tax-credit-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Number of Children Under 17</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={numChildren} onChange={e=>setNumChildren(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Children Under Age 6</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={childrenUnder6} onChange={e=>setChildrenUnder6(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Adjusted Gross Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={agi} onChange={e=>setAgi(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Earned Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={earned} onChange={e=>setEarned(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Max Credit ($2,000/child)" value={result ? `${Number(result.maxCredit).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Phase-Out Reduction" value={result ? `${Number(result.phaseoutReduction).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Child Tax Credit" value={result ? `${Number(result.netCredit).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Refundable ACTC Portion" value={result ? `${Number(result.refundablePortion).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Child Care Credit" value={result ? `${Number(result.childCareCredit).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Credits" value={result ? `${Number(result.totalCredits).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">👶 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The Child Tax Credit ($2,000 per child under 17 in 2026) is one of the largest tax benefits for American families. The refundable portion (Additional Child Tax Credit, up to $1,700) provides real cash even when taxes owed are zero. Combined with the Dependent Care Credit, a family with 2 children can receive $4,000-$6,000+ in annual tax benefits.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Child Tax Credit Calculator USA 2026 — CTC & ACTC" category="finance"
          intro="The Child Tax Credit ($2,000 per child under 17 in 2026) is one of the largest tax benefits for American families. The refundable portion (Additional Child Tax Credit, up to $1,700) provides real cash even when taxes owed are zero. Combined with the Dependent Care Credit, a family with 2 children can receive $4,000-$6,000+ in annual tax benefits."
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
