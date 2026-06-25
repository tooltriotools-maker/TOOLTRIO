'use client'
import { calculateLongTermCareInsurance } from '@/lib/calculations/finance'
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
  const [age, setAge] = useState(58)
  const [dailyBenefit, setDailyBenefit] = useState(200)
  const [benefitPeriod, setBenefitPeriod] = useState(3)
  const [eliminationPeriod, setEliminationPeriod] = useState(90)

  const result = useMemo(()=>{
    try{return calculateLongTermCareInsurance(age, dailyBenefit, benefitPeriod, eliminationPeriod, false)}catch(e){return null}
  },[age, dailyBenefit, benefitPeriod, eliminationPeriod])

  return (
    <CalculatorLayout title="Long-Term Care Insurance Calculator USA 2026" description="Calculate LTC insurance premiums, coverage gap vs nursing home costs, total benefit value, and whether insurance or self-funding makes sense." icon="🏥" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="long-term-care-insurance-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Daily Benefit ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={dailyBenefit} onChange={e=>setDailyBenefit(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Benefit Period (years)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={benefitPeriod} onChange={e=>setBenefitPeriod(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Elimination Period (days)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={eliminationPeriod} onChange={e=>setEliminationPeriod(Number(e.target.value))} step={30} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Average Nursing Home Cost/Day" value={result ? `${Number(result.avgDailyCost).toLocaleString(undefined,{maximumFractionDigits:0})} /day` : "—"} highlight />
                <ResultCard label="Coverage Gap" value={result ? `${Number(result.coverageGap).toLocaleString(undefined,{maximumFractionDigits:0})} /day` : "—"} />
                <ResultCard label="Annual Premium" value={result ? `${Number(result.annualPremium).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Monthly Premium" value={result ? `${Number(result.monthlyPremium).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Total Benefit Value" value={result ? `${Number(result.totalBenefitValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Break-Even Years" value={result ? `${Number(result.breakEvenYears).toLocaleString()} years` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏥 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">70% of Americans will need some form of long-term care after age 65 (HHS), and the average cost exceeds $100,000/year for nursing home care. Long-term care insurance protects against this catastrophic risk — but premiums have risen 50-100% over the past decade as insurers underestimated longevity. This calculator shows whether insurance makes financial sense for your situation.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Long-Term Care Insurance Calculator USA 2026" category="finance"
          intro="70% of Americans will need some form of long-term care after age 65 (HHS), and the average cost exceeds $100,000/year for nursing home care. Long-term care insurance protects against this catastrophic risk — but premiums have risen 50-100% over the past decade as insurers underestimated longevity. This calculator shows whether insurance makes financial sense for your situation."
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
