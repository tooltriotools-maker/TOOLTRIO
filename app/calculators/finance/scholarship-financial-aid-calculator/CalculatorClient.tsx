'use client'
import { calculateScholarship } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [efc, setEfc] = useState(15000)
  const [merit, setMerit] = useState(10000)

  const result = useMemo(()=>{
    try{return calculateScholarship('public', true, 2026, efc, merit)}catch(e){return null}
  },[efc, merit])

  return (
    <CalculatorLayout title="Scholarship & Financial Aid Calculator USA 2026 — College Aid" description="Estimate Pell Grant eligibility, need-based aid, net college cost, and loan requirements based on Expected Family Contribution." icon="🎓" category="Finance" relatedCalculators={relatedCalculators} slug="scholarship-financial-aid-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Expected Family Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={efc} onChange={e=>setEfc(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Merit Scholarship ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={merit} onChange={e=>setMerit(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Annual College Cost (Public)" value={result ? `${Number(result.baseCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Pell Grant" value={result ? `${Number(result.pellGrant).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Need-Based Aid" value={result ? `${Number(result.needBasedAid).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Cost After Aid" value={result ? `${Number(result.netCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Loans Needed Per Year" value={result ? `${Number(result.loanNeeded).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="4-Year Total Debt" value={result ? `${Number(result.fourYearDebt).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🎓 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">College affordability starts with FAFSA and the Expected Family Contribution. A public university averaging $22,000/year can cost families anywhere from $0 (with full aid) to $22,000 (no aid) depending on EFC. This calculator estimates your Pell Grant, need-based aid package, and true out-of-pocket cost so you can plan realistically.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Scholarship & Financial Aid Calculator USA 2026 — College Aid" category="finance"
          intro="College affordability starts with FAFSA and the Expected Family Contribution. A public university averaging $22,000/year can cost families anywhere from $0 (with full aid) to $22,000 (no aid) depending on EFC. This calculator estimates your Pell Grant, need-based aid package, and true out-of-pocket cost so you can plan realistically."
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
