'use client'
import { calculatePropertyTax } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [homeValue, setHomeValue] = useState(450000)
  const [exemptions, setExemptions] = useState(50000)

  const result = useMemo(()=>{
    try{return calculatePropertyTax(homeValue, 'TX', 'Travis County', exemptions)}catch(e){return null}
  },[homeValue, exemptions])

  return (
    <CalculatorLayout title="Property Tax Estimator — Texas Scenario" description="Estimate annual property tax and monthly escrow for this simplified Texas scenario using home value and an entered exemption." icon="🏛️" category="Finance" relatedCalculators={relatedCalculators} slug="property-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Home Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={homeValue} onChange={e=>setHomeValue(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Homestead Exemption ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={exemptions} onChange={e=>setExemptions(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Assessed Value" value={result ? `${Number(result.assessedValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Taxable Value" value={result ? `${Number(result.taxableValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Annual Property Tax" value={result ? `${Number(result.annualTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Monthly Escrow" value={result ? `${Number(result.monthlyEscrow).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Effective Rate" value={result ? `${Number(result.effectiveRate).toFixed(1)}%` : "—"} />
                <ResultCard label="Potential Appeal Savings" value={result ? `${Number(result.appealPotentialSavings).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏛️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Property tax is often the largest recurring homeownership cost after the mortgage — and one of the most misunderstood. Rates vary from 0.3% (Hawaii) to 2.5% (New Jersey) of assessed value annually. Homestead exemptions, assessment challenges, and timing of purchases can significantly reduce your property tax burden.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="Property Tax Estimator — Texas Scenario"
          category="finance"
          intro="This page estimates a planning-level property-tax bill for the calculator's current Texas scenario. It starts with home value, applies the model's 85% assessment ratio, subtracts the entered homestead exemption, then applies its stored Texas effective-rate assumption. Property taxes are administered locally, so this is a scenario model—not a county tax bill or an all-50-state lookup."
          howItWorks="The calculation is: Assessed value = home value × 85%. Taxable value = max(0, assessed value − exemption). Annual tax = taxable value × 1.81% for the current Texas model. Monthly escrow = annual tax ÷ 12. The displayed 'appeal savings' is simply 15% of estimated tax; it is a ToolTrio scenario assumption, not a prediction that an appeal will succeed."
          tipsSection="Use the exemption amount from your actual appraisal/tax documents. Do not assume market value equals assessed value: appraisal methods, assessment caps, exemptions, taxing units and local rates differ by jurisdiction. The hard-coded 85% assessment ratio is the biggest limitation of this simplified model."
          conclusion="Treat the result as a budgeting estimate. Verify assessed value, exemptions and adopted tax rates with the relevant county appraisal/tax authority before making a purchase, escrow or appeal decision."
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
            title: "Texas homeowner budgeting example",
            scenario: "A $450,000 home with a $50,000 entered exemption is modeled at an 85% assessed value: $382,500. Taxable value becomes $332,500.",
            result: "At the calculator's 1.81% Texas rate, estimated annual tax is about $6,018, or about $502 per month.",
            takeaway: "Actual Travis County-area bills combine multiple taxing units and may use different appraisal/exemption rules, so compare the estimate with the official property record."
          }}
          commonMistakes="Use the exemption amount from your actual appraisal/tax documents. Do not assume market value equals assessed value: appraisal methods, assessment caps, exemptions, taxing units and local rates differ by jurisdiction. The hard-coded 85% assessment ratio is the biggest limitation of this simplified model."
          inlineLinks={[{ text: "Texas property tax is locally administered; use official appraisal and taxing-unit data.", href: "https://comptroller.texas.gov/taxes/property-tax/", label: "Texas Comptroller property-tax overview" }]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
