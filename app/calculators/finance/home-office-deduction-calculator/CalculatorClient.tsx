'use client'
import { calculateHomeOfficeDeduction } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [officeSquareFt, setOfficeSquareFt] = useState(200)
  const [homeTotalSqFt, setHomeTotalSqFt] = useState(1800)
  const [annualRent, setAnnualRent] = useState(18000)
  const [utilities, setUtilities] = useState(3600)
  const [internet, setInternet] = useState(80)

  const result = useMemo(()=>{
    try{return calculateHomeOfficeDeduction(officeSquareFt, homeTotalSqFt, annualRent, utilities, internet, 'self-employed')}catch(e){return null}
  },[officeSquareFt, homeTotalSqFt, annualRent, utilities, internet])

  return (
    <CalculatorLayout title="Home Office Deduction Calculator USA 2026 — Actual vs Simplified" description="Calculate your home office deduction using actual expense method vs $5/sq ft simplified method. Find which saves more for self-employed workers." icon="🏠" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="home-office-deduction-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Office Square Feet</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={officeSquareFt} onChange={e=>setOfficeSquareFt(Number(e.target.value))} step={10} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Total Home Square Feet</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={homeTotalSqFt} onChange={e=>setHomeTotalSqFt(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Rent/Mortgage ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualRent} onChange={e=>setAnnualRent(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Utilities ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={utilities} onChange={e=>setUtilities(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Internet ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={internet} onChange={e=>setInternet(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Office % of Home" value={result ? `${Number(result.percentage).toFixed(1)}%` : "—"} highlight />
                <ResultCard label="Actual Method Deduction" value={result ? `${Number(result.actualDeduction).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Simplified Method ($5/sqft)" value={result ? `${Number(result.simplifiedDeduction).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Better Method" value={result ? String(result.betterMethod) : "—"} />
                <ResultCard label="Optimal Deduction" value={result ? `${Number(result.optimalDeduction).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Tax Savings" value={result ? `${Number(result.taxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏠 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The home office deduction is one of the most valuable and underused deductions for self-employed Americans. A 200 sq ft dedicated office in an 1,800 sq ft home qualifies 11.1% of all home expenses as business deductions. This calculator shows which method — actual or simplified — saves more for your specific situation.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Home Office Deduction Calculator USA 2026 — Actual vs Simplified" category="finance"
          intro="The home office deduction is one of the most valuable and underused deductions for self-employed Americans. A 200 sq ft dedicated office in an 1,800 sq ft home qualifies 11.1% of all home expenses as business deductions. This calculator shows which method — actual or simplified — saves more for your specific situation."
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
