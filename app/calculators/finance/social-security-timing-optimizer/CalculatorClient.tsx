'use client'
import { calculateSocialSecurityDelayROI } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [monthlyBenefit, setMonthlyBenefit] = useState(2400)
  const [currentAge, setCurrentAge] = useState(58)
  const [healthRating, setHealthRating] = useState(2)

  const result = useMemo(()=>{
    try{return calculateSocialSecurityDelayROI(monthlyBenefit, 67, currentAge)}catch(e){return null}
  },[monthlyBenefit, currentAge, healthRating])

  return (
    <CalculatorLayout title="Social Security Timing Optimizer USA 2026 — Best Age to Claim" description="Find your optimal Social Security claiming age based on health, life expectancy, and lifetime benefit maximization at ages 62 through 70." icon="🏛️" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="social-security-timing-optimizer">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Estimated Monthly Benefit at FRA ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyBenefit} onChange={e=>setMonthlyBenefit(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Current Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={currentAge} onChange={e=>setCurrentAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Health Rating (1=poor 2=avg 3=excellent)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={healthRating} onChange={e=>setHealthRating(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Benefit at 62" value={result ? `${Number(result.benefitAt62).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} highlight />
                <ResultCard label="Benefit at 67 (FRA)" value={result ? `${Number(result.benefitAt67).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Benefit at 70" value={result ? `${Number(result.benefitAt70).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Delay ROI (62→70)" value={result ? `${Number(result.delayROI).toFixed(1)}%` : "—"} />
                <ResultCard label="Optimal Age (to 85)" value={result ? String(result.optimal85.claimAge) : "—"} />
                <ResultCard label="Optimal Age (to 90)" value={result ? String(result.optimal90.claimAge) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏛️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Social Security claiming age has more impact on retirement income than almost any other decision. Delaying from 62 to 70 increases monthly benefits by 76% — a guaranteed 8% annual return from the US government. This optimizer shows exactly what each claiming age pays, which maximizes lifetime benefits at different life expectancies, and the true ROI of delaying.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Social Security Timing Optimizer USA 2026 — Best Age to Claim" category="finance"
          intro="Social Security claiming age has more impact on retirement income than almost any other decision. Delaying from 62 to 70 increases monthly benefits by 76% — a guaranteed 8% annual return from the US government. This optimizer shows exactly what each claiming age pays, which maximizes lifetime benefits at different life expectancies, and the true ROI of delaying."
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
