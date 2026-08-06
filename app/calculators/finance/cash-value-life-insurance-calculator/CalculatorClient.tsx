'use client'
import { calculateCashValueLifeInsurance } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [annualPremium, setAnnualPremium] = useState(8400)
  const [deathBenefit, setDeathBenefit] = useState(500000)
  const [age, setAge] = useState(40)
  const [yearsHeld, setYearsHeld] = useState(20)

  const result = useMemo(()=>{
    try{return calculateCashValueLifeInsurance(annualPremium, deathBenefit, age, yearsHeld, 'whole')}catch(e){return null}
  },[annualPremium, deathBenefit, age, yearsHeld])

  return (
    <CalculatorLayout title="Cash Value Life Insurance Calculator USA 2026 — Buy Term or Whole Life?" description="Compare whole life, universal life, and variable life insurance cash value growth against buy-term-and-invest strategy. Calculate opportunity cost." icon="🛡️" category="Finance" relatedCalculators={relatedCalculators} slug="cash-value-life-insurance-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Premium ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualPremium} onChange={e=>setAnnualPremium(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Death Benefit ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={deathBenefit} onChange={e=>setDeathBenefit(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years to Hold</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={yearsHeld} onChange={e=>setYearsHeld(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Term Equivalent Cost" value={result ? `${Number(result.termEquivalentCost).toLocaleString(undefined,{maximumFractionDigits:0})} /yr` : "—"} highlight />
                <ResultCard label="Annual Surplus" value={result ? `${Number(result.annualSurplus).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Cash Value Projected" value={result ? `${Number(result.cashValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Term + Invest Value" value={result ? `${Number(result.termAndInvestValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Opportunity Cost" value={result ? `${Number(result.opportunityCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Recommendation" value={result ? String(result.recommendation) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🛡️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The buy-term-and-invest-the-difference debate is one of personal finance's most analyzed questions. For pure wealth building, the math almost always favors term insurance + investment. Permanent insurance wins in specific estate planning, business succession, and high-income tax planning scenarios. This calculator models both paths for your numbers.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Cash Value Life Insurance Calculator USA 2026 — Buy Term or Whole Life?" category="finance"
          intro="Compare the calculator's modeled cash-value policy with a simplified 'buy term and invest the difference' scenario. The result is driven by premium, death benefit, age, holding period and policy type, but it is not an illustration from an insurer and should not be treated as a policy quote."
          howItWorks="The current model estimates a rough term-equivalent cost, assumes 70% of premium is available to build cash value, and applies a fixed growth assumption of 3.5% for whole life, 4.5% for universal life or 7% for variable life. The alternative scenario compounds the modeled premium difference at 7%. Actual policy charges, guarantees, crediting rates and subaccount returns can differ materially."
          tipsSection="Change one assumption at a time and compare the result with the underlying contract, tax rule, lender terms, or official source before making a decision."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor about your specific situation."
          benefits={[
            {title:"Real-Time USA Results",text:"Instant calculations based on the assumptions documented on this page."},
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
