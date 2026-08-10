'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateHealthcareRetirementCost } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [retirementAge, setRetirementAge] = useState(62)
  const [lifeExpectancy, setLifeExpectancy] = useState(85)
  const [healthStatusNum, setHealthStatusNum] = useState(2)

  const result = useMemo(()=>{
    try{return calculateHealthcareRetirementCost(retirementAge,65,lifeExpectancy,healthStatusNum===1?'fair':healthStatusNum===3?'excellent':'good',false)}catch(e){return null}
  },[retirementAge, lifeExpectancy, healthStatusNum])

  return (
    <CalculatorLayout title="Retirement Healthcare Cost Calculator USA 2026" description="Estimate total healthcare costs in retirement including pre-Medicare bridge coverage, Medicare premiums, out-of-pocket costs, and long-term care probability." icon="🏥" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="retirement-healthcare-cost-calculator">
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
            <label className="text-xs font-medium text-gray-600">Life Expectancy</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={lifeExpectancy} onChange={e=>setLifeExpectancy(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Health Status (1-poor 2-good 3-excellent)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={healthStatusNum} onChange={e=>setHealthStatusNum(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Pre-Medicare Years" value={result ? `${Number(result.preMedicareYears).toFixed(1)} yrs` : "—"} highlight />
                <ResultCard label="Pre-Medicare Cost" value={result ? `${Number(result.preMedicareCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Post-Medicare Cost" value={result ? `${Number(result.postMedicareCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Expected LTC Cost" value={result ? `${Number(result.expectedLTCCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Healthcare Cost" value={result ? `${Number(result.totalHealthcareCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="HSA Recommended" value={result ? `${Number(result.hsaRecommended).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏥 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Healthcare is consistently the most underestimated retirement expense. Retiring at 62 means 3 years of pre-Medicare insurance ($72,000+), then Medicare premiums and out-of-pocket costs through life. Add a 70% probability of needing long-term care ($350/day average), and the total healthcare retirement budget realistically needs to be $300,000-$600,000 per person.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Retirement Healthcare Cost Calculator USA 2026" category="finance" intro="Estimate the healthcare reserve implied by ToolTrio's retirement model, separating years before Medicare eligibility, post-65 healthcare spending and an expected long-term-care component. The page is a scenario planner rather than an insurance-premium or Medicare-benefit quote."
          howItWorks="The current function uses $24,000 per pre-Medicare year and $7,000 per post-Medicare year, adjusted by a health-status multiplier. It then adds an expected long-term-care amount based on $350 per day for 2.5 years multiplied by a modeled probability. These are internal planning assumptions, not CMS premium schedules or individualized long-term-care forecasts."
          tipsSection="Change one assumption at a time and compare the result with the underlying contract, tax rule, lender terms, or official source before making a decision."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor."
          benefits={[{title:"Calculator results",text:"Instant calculations based on the assumptions documented on this page."},{title:"100% Private",text:"Everything runs locally."},{title:"Available without a paid plan",text:"No account is required to run the calculation."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation."},{title:"Scenario Comparison",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
