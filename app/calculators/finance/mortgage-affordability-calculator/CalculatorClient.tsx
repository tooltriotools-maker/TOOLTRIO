'use client'
import { calculateMortgageAffordability } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [grossIncome, setGrossIncome] = useState(120000)
  const [monthlyDebts, setMonthlyDebts] = useState(500)
  const [downPayment, setDownPayment] = useState(60000)
  const [rate, setRate] = useState(7.0)
  const [propertyTaxRate, setPropertyTaxRate] = useState(1.1)

  const result = useMemo(()=>{
    try{return calculateMortgageAffordability(grossIncome, monthlyDebts, downPayment, rate, 30, propertyTaxRate, 150)}catch(e){return null}
  },[grossIncome, monthlyDebts, downPayment, rate, propertyTaxRate])

  return (
    <CalculatorLayout title="Mortgage Affordability Calculator USA 2026 — How Much House?" description="Calculate maximum home price and loan amount based on income, debts, down payment, and 2026 lending standards (28/43 DTI rule)." icon="🏡" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="mortgage-affordability-calculator">
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
            <label className="text-xs font-medium text-gray-600">Monthly Debt Payments ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyDebts} onChange={e=>setMonthlyDebts(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Down Payment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={downPayment} onChange={e=>setDownPayment(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Mortgage Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={rate} onChange={e=>setRate(Number(e.target.value))} step={0.125} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Property Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={propertyTaxRate} onChange={e=>setPropertyTaxRate(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Max Home Price" value={result ? `${Number(result.maxPrice).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Max Loan Amount" value={result ? `${Number(result.maxLoan).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Est. Monthly Payment" value={result ? `${Number(result.monthlyPayment).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Property Tax (monthly)" value={result ? `${Number(result.propTax).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Total Housing Cost" value={result ? `${Number(result.totalHousingCost).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Front-End DTI" value={result ? `${Number(result.frontEndRatio).toFixed(1)}%` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏡 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">In 2026 with mortgage rates near 7%, affordability is the defining challenge of home buying. The 28/43 DTI rule determines how much lenders will approve — but approval ceiling and financial comfort zone are different things. This calculator shows both your maximum and a conservative comfortable range.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Mortgage Affordability Calculator USA 2026 — How Much House?" category="finance"
          intro="In 2026 with mortgage rates near 7%, affordability is the defining challenge of home buying. The 28/43 DTI rule determines how much lenders will approve — but approval ceiling and financial comfort zone are different things. This calculator shows both your maximum and a conservative comfortable range."
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
