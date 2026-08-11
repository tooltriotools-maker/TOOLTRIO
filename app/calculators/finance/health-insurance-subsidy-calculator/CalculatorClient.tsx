'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateHealthInsuranceSubsidy } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [householdIncome, setHouseholdIncome] = useState(55000)
  const [householdSize, setHouseholdSize] = useState(2)
  const [age, setAge] = useState(45)
  const [benchmarkPremium, setBenchmarkPremium] = useState(650)

  const result = useMemo(()=>{
    try{return calculateHealthInsuranceSubsidy(householdIncome,householdSize,'CA',age,false,benchmarkPremium)}catch(e){return null}
  },[householdIncome, householdSize, age, benchmarkPremium])

  return (
    <CalculatorLayout title="ACA Health Insurance Subsidy Calculator USA 2026 — Marketplace Tax Credit" description="Estimate an ACA Marketplace premium tax credit using household income, size, an entered benchmark Silver premium and the 2026 federal applicable-percentage table." icon="💊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="health-insurance-subsidy-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Household Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={householdIncome} onChange={e=>setHouseholdIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Household Size</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={householdSize} onChange={e=>setHouseholdSize(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
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
            <label className="text-xs font-medium text-gray-600">Benchmark Silver Premium ($/month)</label>
            <input type="number" value={benchmarkPremium} onChange={e=>setBenchmarkPremium(Number(e.target.value))} step={25} className="w-full border rounded-xl px-3 py-2 text-right" />
            <p className="text-[11px] text-gray-400">Use the applicable second-lowest-cost Silver premium for the household/location; this value is not guessed by the calculator.</p>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (<>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="FPL Percentage" value={result ? `${Number(result.fplPercent).toFixed(1)}%` : "—"} highlight />
                <ResultCard label="Benchmark Premium (annual)" value={result ? `${Number(result.benchmarkPremiumAnnual).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Annual Subsidy" value={result ? `${Number(result.annualSubsidy).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Monthly Subsidy" value={result ? `${Number(result.monthlySubsidy).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Your Net Monthly Premium" value={result ? `${Number(result.netMonthlyPremium).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Cost-Sharing Reduction" value="Not modeled" />
              </div>

              <Card><h2 className="text-lg font-black text-gray-900 mb-3">💊 About</h2><p className="text-sm text-gray-600">The premium tax credit depends on household income, household size and the applicable benchmark Silver premium; age and state-specific factors can affect the actual Marketplace offer, but are not used to calculate the federal PTC amount in this simplified model. This calculator is a planning estimate; actual eligibility and credit amounts are determined through the Marketplace application and tax reconciliation process.</p></Card>
            </>):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="ACA Marketplace Subsidy Calculator" category="finance"
          intro="Provides a rough Marketplace premium-tax-credit scenario from household income, household size and age using an entered benchmark Silver premium and the 2026 applicable-percentage table."
          howItWorks="The model calculates an income-to-poverty-guideline percentage, uses the 2026 IRS applicable-percentage table and the 2025 federal poverty guideline for the 2026 Marketplace calculation, applies the 2026 applicable-percentage table, and subtracts the resulting expected contribution from the entered benchmark premium."
          tipsSection="Worked example — Example: for the default $55,000 household income, size 2 and age 45, the displayed subsidy is driven by both the model’s poverty percentage and the entered benchmark premium—not an actual local second-lowest-cost Silver premium unless you enter the applicable figure."
          conclusion="Important assumptions and limitations — Do not use this result as an enrollment quote. Actual PTC eligibility uses Marketplace rules and the benchmark premium for the household’s location. For 2026, the temporary expansion above 400% FPL ended; IRS guidance again generally limits PTC eligibility to 100%–400% FPL. The model does not determine eligibility for Medicaid/CHIP, employer-affordability rules, or the exact Marketplace premium tax credit."
          benefits={[
            {title:"What the inputs mean",text:"Use the fields above to model the specific amounts, rates, ages or time horizon described for this calculator."},
            {title:"How to read the results",text:"Treat the outputs as scenario estimates and focus on which assumptions drive the result most strongly."},
            {title:"Decision support",text:"Compare realistic scenarios rather than treating a single result as a prediction or professional recommendation."},
          ]}
          useCases={[
            {title:"Worked scenario",text:"Start with the default example, then replace each input with values that match the situation you are evaluating."},
            {title:"Assumption check",text:"Review the methodology and limitations before relying on the result for a financial, tax, benefit or investment decision."},
          ]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
