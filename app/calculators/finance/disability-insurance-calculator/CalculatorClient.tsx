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

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🦽 Disability Insurance Needs Calculator USA 2026</h2><p className="text-sm text-gray-600">Enter your values above to see instant results using 2026 US-standard formulas. All calculations run locally in your browser.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Disability Insurance Needs Calculator USA 2026" category="finance" intro="Disability Insurance Needs Calculator USA 2026" howItWorks="Enter your values for instant 2026 results." tipsSection="Try different scenarios." conclusion="Consult a financial advisor for personalized advice."
          benefits={[{title:"Real-Time",text:"2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact of changes."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
