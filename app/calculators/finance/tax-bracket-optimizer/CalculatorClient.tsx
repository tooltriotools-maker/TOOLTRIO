'use client'
import { calculateTaxBracketOptimizer } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];
;relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [ordinaryIncome, setOrdinaryIncome] = useState(135000)
  const [capitalGains, setCapitalGains] = useState(15000)
  const [qualifiedDividends, setQualifiedDividends] = useState(3000)
  const [deductions, setDeductions] = useState(0)
  const [credits, setCredits] = useState(2000)

  const result = useMemo(()=>{
    try{return calculateTaxBracketOptimizer(ordinaryIncome, capitalGains, qualifiedDividends, 'single', deductions, credits)}catch(e){return null}
  },[ordinaryIncome, capitalGains, qualifiedDividends, deductions, credits])

  return (
    <CalculatorLayout title="Tax Bracket Optimizer USA 2026 — Minimize Your Tax Bill" description="See your full tax bracket breakdown, identify room in your current bracket, and get personalized strategies to reduce your 2026 federal income tax." icon="🧾" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="tax-bracket-optimizer">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Ordinary Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={ordinaryIncome} onChange={e=>setOrdinaryIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Capital Gains ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={capitalGains} onChange={e=>setCapitalGains(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Qualified Dividends ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={qualifiedDividends} onChange={e=>setQualifiedDividends(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Additional Deductions ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={deductions} onChange={e=>setDeductions(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Tax Credits ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={credits} onChange={e=>setCredits(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Tax Owed" value={result ? `${Number(result.totalTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Effective Rate" value={result ? `${Number(result.effectiveRate).toFixed(1)}%` : "—"} />
                <ResultCard label="Marginal Rate" value={result ? `${Number(result.marginalRate).toFixed(1)}%` : "—"} />
                <ResultCard label="Room in Current Bracket" value={result ? `${Number(result.roomInCurrentBracket).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="After-Tax Income" value={result ? `${Number(result.afterTaxIncome).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Capital Gains Tax" value={result ? `${Number(result.capitalGainsTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🧾 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Understanding your marginal vs effective tax rate — and the 'room' remaining in your current bracket — unlocks powerful tax optimization strategies. If you have $15,000 of room in the 22% bracket, a Roth conversion of exactly $15,000 costs 22 cents per dollar vs 24%+ if you wait. This optimizer maps your complete bracket situation and identifies the best strategies for your specific income level.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Tax Bracket Optimizer USA 2026 — Minimize Your Tax Bill" category="finance" intro="Understanding your marginal vs effective tax rate — and the 'room' remaining in your current bracket — unlocks powerful tax optimization strategies. If you have $15,000 of room in the 22% bracket, a Roth conversion of exactly $15,000 costs 22 cents per dollar vs 24%+ if you wait. This optimizer maps your complete bracket situation and identifies the best strategies for your specific income level."
          howItWorks="Enter your values and results update instantly using 2026 US-standard formulas."
          tipsSection="Try multiple scenarios by changing one input at a time."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor."
          benefits={[{title:"Real-Time USA Results",text:"Instant 2026 IRS calculations."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation."},{title:"Scenario Comparison",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
