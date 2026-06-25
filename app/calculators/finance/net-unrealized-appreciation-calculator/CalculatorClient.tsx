'use client'
import { calculateNetUnrealizedAppreciation } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [nua, setNua] = useState(200000)
  const [costBasis, setCostBasis] = useState(40000)
  const [otherIncome, setOtherIncome] = useState(80000)
  const [age, setAge] = useState(58)

  const result = useMemo(()=>{
    try{return calculateNetUnrealizedAppreciation(nua, costBasis, otherIncome, age)}catch(e){return null}
  },[nua, costBasis, otherIncome, age])

  return (
    <CalculatorLayout title="Net Unrealized Appreciation (NUA) Calculator USA 2026" description="Calculate tax savings from the NUA strategy for company stock in your 401k. Compare NUA treatment vs rollover to IRA." icon="📈" category="Finance" relatedCalculators={relatedCalculators} slug="net-unrealized-appreciation-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Company Stock in 401k ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={nua} onChange={e=>setNua(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Cost Basis ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={costBasis} onChange={e=>setCostBasis(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Other Annual Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={otherIncome} onChange={e=>setOtherIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Stock Value" value={result ? `${Number(result.totalStock).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="NUA Amount" value={result ? `${Number(result.nuaAmount).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="NUA Tax Rate" value={result ? `${Number(result.nuaTaxRate).toFixed(1)}%` : "—"} />
                <ResultCard label="Total NUA Tax Owed" value={result ? `${Number(result.totalNUATax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="NUA Net Value" value={result ? `${Number(result.nuaNetValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Worth Using NUA" value={result ? String(result.worthUsing ? 'Yes' : 'Run the full numbers') : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📈 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The Net Unrealized Appreciation strategy can save tens of thousands in taxes on highly appreciated company stock in a 401k. Instead of rolling all shares to an IRA (where all withdrawals face ordinary income rates up to 37%), NUA allows the appreciation to be taxed at long-term capital gains rates of 15-20%. The math is compelling when stock has grown 5-10x from the original cost basis.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Net Unrealized Appreciation (NUA) Calculator USA 2026" category="finance"
          intro="The Net Unrealized Appreciation strategy can save tens of thousands in taxes on highly appreciated company stock in a 401k. Instead of rolling all shares to an IRA (where all withdrawals face ordinary income rates up to 37%), NUA allows the appreciation to be taxed at long-term capital gains rates of 15-20%. The math is compelling when stock has grown 5-10x from the original cost basis."
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
