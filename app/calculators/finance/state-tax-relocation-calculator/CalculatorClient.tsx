'use client'
import { calculateStateIncomeTax } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [grossIncome, setGrossIncome] = useState(200000)
  const [deductions, setDeductions] = useState(15000)

  const result = useMemo(()=>{
    try{return calculateStateIncomeTax(grossIncome, 'CA', 'TX', deductions)}catch(e){return null}
  },[grossIncome, deductions])

  return (
    <CalculatorLayout title="State Tax Relocation Calculator USA 2026 — Save by Moving" description="Calculate annual state income tax savings from relocating between any two US states. See 10-year savings and break-even on moving costs." icon="🗺️" category="Finance" relatedCalculators={relatedCalculators} slug="state-tax-relocation-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Gross Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={grossIncome} onChange={e=>setGrossIncome(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Standard Deductions ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={deductions} onChange={e=>setDeductions(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="CA State Tax" value={result ? `${Number(result.fromStateTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="TX State Tax (no tax)" value={result ? `${Number(result.toStateTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Annual Savings" value={result ? `${Number(result.annualSavings).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="10-Year Savings" value={result ? `${Number(result.tenYearSavings).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="From State Rate" value={result ? `${Number(result.fromRate).toFixed(1)}%` : "—"} />
                <ResultCard label="Worth Moving" value={result ? String(result.worthMoving ? 'Yes — significant savings' : 'Marginal') : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🗺️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">State income taxes are one of the most significant and most avoidable tax burdens for high earners. Moving from California (top rate 13.3%) or New York (top rate 10.9%) to no-income-tax states like Texas or Florida can save $20,000-$200,000+ annually depending on income level. This calculator shows your exact savings for any state-to-state move.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="State Tax Relocation Calculator USA 2026 — Save by Moving" category="finance"
          intro="State income taxes are one of the most significant and most avoidable tax burdens for high earners. Moving from California (top rate 13.3%) or New York (top rate 10.9%) to no-income-tax states like Texas or Florida can save $20,000-$200,000+ annually depending on income level. This calculator shows your exact savings for any state-to-state move."
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
