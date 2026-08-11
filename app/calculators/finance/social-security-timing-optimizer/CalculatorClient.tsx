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

  const result = useMemo(()=>{
    try{return calculateSocialSecurityDelayROI(monthlyBenefit, 67, currentAge)}catch(e){return null}
  },[monthlyBenefit, currentAge])

  return (
    <CalculatorLayout title="Social Security Timing Optimizer USA 2026 — Best Age to Claim" description="Compare Social Security claiming ages 62 through 70 using SSA early-claim reductions, delayed credits, and simple lifetime totals through ages 85 and 90." icon="🏛️" category="Finance" relatedCalculators={relatedCalculators} slug="social-security-timing-optimizer">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Estimated Monthly Benefit at FRA ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyBenefit} onChange={e=>setMonthlyBenefit(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">/mo</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Current Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={currentAge} onChange={e=>setCurrentAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
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
                <ResultCard label="Benefit Increase (62→70)" value={result ? `${Number(result.delayROI).toFixed(1)}%` : "—"} />
                <ResultCard label="Optimal Age (to 85)" value={result ? String(result.optimal85.claimAge) : "—"} />
                <ResultCard label="Optimal Age (to 90)" value={result ? String(result.optimal90.claimAge) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏛️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Social Security claiming age has more impact on retirement income than almost any other decision. Delaying Social Security increases the monthly benefit under the statutory delayed-retirement-credit rules; this is a benefit-formula adjustment, not an investment return. This optimizer shows exactly what each claiming age pays, which maximizes lifetime benefits at different life expectancies, and the increase in the statutory Social Security benefit amount from delaying.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="Social Security Timing Optimizer USA 2026 — Best Age to Claim"
          category="finance"
          intro="This calculator compares claiming ages 62 through 70 using a monthly benefit entered at full retirement age (FRA), with FRA fixed at 67. It applies Social Security's monthly early-claim reductions and delayed-retirement credits, then compares simple cumulative benefits through ages 85 and 90. It does not predict lifespan or choose a universally 'best' claiming age."
          howItWorks="For FRA 67, months claimed early are reduced by 5/9 of 1% for each of the first 36 months and 5/12 of 1% for additional months. After FRA, the model adds delayed credits at 8% per year through age 70. Lifetime totals equal adjusted monthly benefit × 12 × years from claim age to age 85 or 90. Taxes, COLAs, survivor benefits, earnings-test withholding and investment returns are excluded."
          tipsSection="Use the FRA benefit from your Social Security statement rather than today's benefit. The two 'optimal' outputs only maximize undiscounted dollars through age 85 or 90; family benefits, health, cash-flow needs and continued work can change the decision. Delaying increases the Social Security benefit formula; the result should not be interpreted as a guaranteed market investment return."
          conclusion="Use the age comparison to understand the benefit trade-off, then review your personal SSA estimate and claiming rules before filing."
          benefits={[
            { title: "Methodology", text: "See the exact assumptions and calculation sequence used by this ToolTrio model." },
            { title: "Result interpretation", text: "Understand what the outputs mean and which important factors the model leaves out." },
            { title: "Scenario testing", text: "Change the calculator inputs to see which assumptions materially move the result." },
          ]}
          useCases={[
            { title: "Decision comparison", text: "Compare realistic alternatives while keeping the model's assumptions visible." },
            { title: "Assumption check", text: "Use the worked example to verify how the calculator turns inputs into outputs." },
          ]}
          caseStudy={{
            title: "FRA benefit of $2,400",
            scenario: "With FRA 67, claiming at 62 applies the full 60-month early-retirement reduction; claiming at 70 applies 36 months of delayed credits.",
            result: "The model produces about $1,680/month at 62, $2,400 at 67 and $2,976 at 70, then compares cumulative dollars through 85 and 90.",
            takeaway: "Later claiming raises the monthly amount, but fewer payment years means the lifetime crossover depends on how long benefits are received."
          }}
          commonMistakes="Use the FRA benefit from your Social Security statement rather than today's benefit. The two 'optimal' outputs only maximize undiscounted dollars through age 85 or 90; family benefits, health, cash-flow needs and continued work can change the decision. Delaying increases the Social Security benefit formula; the result should not be interpreted as a guaranteed market investment return."
          inlineLinks={[{ text: "SSA explains the monthly early-retirement reductions and delayed-retirement credits.", href: "https://www.ssa.gov/OACT/quickcalc/early_late.html", label: "SSA early or late retirement" }]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
