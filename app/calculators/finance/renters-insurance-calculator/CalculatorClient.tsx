'use client'
import { calculateRentersInsurance } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [personalPropertyValue, setPersonalPropertyValue] = useState(25000)
  const [liabilityLimit, setLiabilityLimit] = useState(100000)
  const [deductible, setDeductible] = useState(500)

  const result = useMemo(()=>{
    try{return calculateRentersInsurance(personalPropertyValue, liabilityLimit, deductible, 'TX', '78701')}catch(e){return null}
  },[personalPropertyValue, liabilityLimit, deductible])

  return (
    <CalculatorLayout title="Renters Insurance Calculator USA 2026 — Coverage & Cost" description="Estimate renters insurance premium by state, calculate coverage needed for personal property, and see how deductible choices affect your annual cost." icon="🏠" category="Finance" relatedCalculators={relatedCalculators} slug="renters-insurance-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Personal Property Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={personalPropertyValue} onChange={e=>setPersonalPropertyValue(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Liability Limit ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={liabilityLimit} onChange={e=>setLiabilityLimit(Number(e.target.value))} step={25000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Deductible ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={deductible} onChange={e=>setDeductible(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Estimated Annual Premium" value={result ? `${Number(result.annualPremium).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Monthly Premium" value={result ? `${Number(result.monthlyPremium).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Coverage per Premium Dollar" value={result ? String(result.coveragePerDollar) : "—"} />
                <ResultCard label="Replacement Cost Add-On" value={result ? `${Number(result.replacementCostAdd).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Average Claim Amount" value={result ? `${Number(result.averageClaimAmount).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Worth It" value={result ? String(result.worthIt ? 'Yes — great value' : 'Marginal') : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏠 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Renters insurance averages $15-25/month — protecting $25,000 in personal property, $100,000 in liability, and temporary housing costs. It's one of the most cost-effective insurance products available, providing enormous protection per dollar of premium. This calculator estimates your specific premium by state and shows the coverage-to-cost ratio.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Renters Insurance Calculator USA 2026 — Coverage & Cost" category="finance"
          intro="Renters insurance averages $15-25/month — protecting $25,000 in personal property, $100,000 in liability, and temporary housing costs. It's one of the most cost-effective insurance products available, providing enormous protection per dollar of premium. This calculator estimates your specific premium by state and shows the coverage-to-cost ratio."
          howItWorks="This calculator estimates premium from personal-property value, liability limit and deductible, using an internal Texas/78701 rating scenario. It is best used to see how those three inputs interact inside this model, not as an insurance quote."
          tipsSection="Start by inventorying belongings at realistic replacement values, then compare liability limits and deductibles you could afford after a covered loss. A larger deductible generally shifts more loss cost to you."
          conclusion="The current function is hard-coded to Texas ZIP 78701 and uses internal rating assumptions. It does not price a user-selected state, insurer underwriting, credit-based insurance score, catastrophe exposure, endorsements or actual-cash-value versus replacement-cost terms."
          benefits={[{title:"Real-Time USA Results",text:"Calculator-specific scenario outputs."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup or paywall."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation with real numbers."},{title:"Scenario Comparison",text:"Change inputs to see the impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
