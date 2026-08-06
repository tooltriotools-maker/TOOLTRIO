'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateDisabilityInsuranceNeeds } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [annualIncome, setAnnualIncome] = useState(95000)
  const [monthlyExpenses, setMonthlyExpenses] = useState(5500)
  const [existingCoverage, setExistingCoverage] = useState(0)
  const [employerSTDCoverage, setEmployerSTDCoverage] = useState(2500)
  const [age, setAge] = useState(36)
  const result = useMemo(()=>{try{return calculateDisabilityInsuranceNeeds(annualIncome,monthlyExpenses,existingCoverage,employerSTDCoverage,age)}catch(e){return null}},[annualIncome, monthlyExpenses, existingCoverage, employerSTDCoverage, age])
  return (
    <CalculatorLayout title="Disability Insurance Needs Calculator USA 2026" description="Disability Insurance Needs Calculator USA 2026" icon="🦽" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="disability-insurance-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annualincome</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualIncome} onChange={e=>setAnnualIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthlyexpenses</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={monthlyExpenses} onChange={e=>setMonthlyExpenses(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Existingcoverage</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={existingCoverage} onChange={e=>setExistingCoverage(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Employerstdcoverage</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={employerSTDCoverage} onChange={e=>setEmployerSTDCoverage(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Recommended Coverage" value={result?`${Number(result.recommendedMonthlyCoverage).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"} highlight />
                <ResultCard label="Current Gap" value={result?`${Number(result.currentGap).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"} />
                <ResultCard label="Est. Annual Premium" value={result?`${Number(result.estimatedAnnualPremium).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="SSDI Estimate" value={result?`${Number(result.ssdiEstimate).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"} />
                <ResultCard label="Lifetime Disability Prob." value={result?`${Number(result.lifetimeDisabilityProbability).toFixed(1)}%`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🦽 Disability Insurance Needs Calculator USA 2026</h2><p className="text-sm text-gray-600">Enter your values above to see Disability Insurance Calculator output using 2026 Calculator methodology and assumptions. All calculations run locally in your browser.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <Card className="space-y-5">
          <section><h2 className="text-xl font-black text-gray-900 mb-2">How Disability Insurance Needs Calculator Works</h2><p className="text-sm leading-6 text-gray-700">The current model sets a target equal to 60% of annual income divided by 12, then subtracts existing monthly coverage and employer coverage. It separately shows a rough premium estimate and a simplified SSDI figure. Those two outputs are heuristics and should not be treated as policy pricing or an official Social Security estimate.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding the Inputs</h2><p className="text-sm leading-6 text-gray-700">Use gross annual income, monthly living expenses, monthly disability benefits already owned, employer-provided monthly coverage and your age. Check whether employer benefits are taxable and whether a policy has a monthly cap before comparing it with the model.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding Your Results</h2><p className="text-sm leading-6 text-gray-700">The coverage gap is the most useful output: it is the difference between the modelled 60% income target and entered coverage. A zero gap only means the target is met under this simplified model; it does not test benefit periods, elimination periods, occupation definitions, exclusions or policy limits.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Worked Example</h2><p className="text-sm leading-6 text-gray-700">Example: $120,000 annual income produces a $6,000 monthly 60% target. If existing and employer coverage total $3,500 per month, the model reports a $2,500 monthly gap. Actual underwriting and premium quotes can differ substantially.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Important Assumptions and Limitations</h2><p className="text-sm leading-6 text-gray-700">The calculator does not calculate an official SSDI benefit, probability of approval, insurer underwriting, taxes on employer-paid benefits or policy-specific definitions of disability. Use an SSA account for Social Security estimates and policy documents/insurer quotes for coverage decisions.</p></section>
        </Card>
        <SEOContent title="Disability Insurance Needs Calculator" category="finance" intro="Estimate the monthly income-replacement gap between a planning target and existing individual or employer disability coverage. The model uses income, current coverage and age; it is a coverage-planning estimate, not an insurer quote or an SSA benefit determination." howItWorks="The current model sets a target equal to 60% of annual income divided by 12, then subtracts existing monthly coverage and employer coverage. It separately shows a rough premium estimate and a simplified SSDI figure. Those two outputs are heuristics and should not be treated as policy pricing or an official Social Security estimate." tipsSection="Review the assumptions above before using the result for a real-world decision." conclusion="Use this calculator as an educational estimate, not individualized financial, tax, legal, insurance or investment advice."
          benefits={[{title:"Specific methodology",text:"The page explains the exact assumptions used by this calculator."},{title:"Scenario testing",text:"Change the inputs to understand which assumptions drive the result."},{title:"Private",text:"Calculations run locally in your browser."}]}
          useCases={[{title:"Planning",text:"Create a baseline scenario before comparing alternatives."},{title:"Sensitivity",text:"Test how the result changes when a major assumption moves."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
