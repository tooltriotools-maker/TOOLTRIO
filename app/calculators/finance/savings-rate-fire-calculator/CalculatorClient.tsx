'use client'
import { calculateSavingsRateToFIRE } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [annualIncome, setAnnualIncome] = useState(95000)
  const [annualExpenses, setAnnualExpenses] = useState(65000)
  const [currentSavings, setCurrentSavings] = useState(85000)
  const [returnRate, setReturnRate] = useState(7)

  const result = useMemo(()=>{
    try{return calculateSavingsRateToFIRE(annualIncome, annualExpenses, currentSavings, returnRate)}catch(e){return null}
  },[annualIncome, annualExpenses, currentSavings, returnRate])

  return (
    <CalculatorLayout title="Savings Rate to FIRE Calculator USA 2026" description="Calculate years to financial independence at any savings rate. See how increasing your savings rate from 10% to 50% changes your FIRE date dramatically." icon="💹" category="Finance" relatedCalculators={relatedCalculators} slug="savings-rate-fire-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualIncome} onChange={e=>setAnnualIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Expenses ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualExpenses} onChange={e=>setAnnualExpenses(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Portfolio ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentSavings} onChange={e=>setCurrentSavings(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Expected Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={returnRate} onChange={e=>setReturnRate(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Savings Amount" value={result ? `${Number(result.savingsAmount).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Current Savings Rate" value={result ? `${Number(result.savingsRate).toFixed(1)}%` : "—"} />
                <ResultCard label="FIRE Number" value={result ? `${Number(result.fireNumber).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Years to FIRE" value={result ? `${Number(result.yearsToFIRE).toLocaleString()} years` : "—"} />
                <ResultCard label="Current Coverage" value={result ? `${Number(result.currentCoverage).toFixed(1)}%` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💹 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Your savings rate determines your financial independence timeline more than any other variable — including investment returns. Moving from 10% to 50% savings rate can cut your working years in half. This calculator shows exactly how many years each savings rate scenario takes, making the trade-off between spending today and freedom tomorrow concrete.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Savings Rate to FIRE Calculator USA 2026" category="finance"
          intro="Your savings rate determines your financial independence timeline more than any other variable — including investment returns. Moving from 10% to 50% savings rate can cut your working years in half. This calculator shows exactly how many years each savings rate scenario takes, making the trade-off between spending today and freedom tomorrow concrete."
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
