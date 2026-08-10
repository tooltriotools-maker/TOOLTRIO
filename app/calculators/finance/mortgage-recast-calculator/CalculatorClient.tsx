'use client'
import { calculateMortgageRecast } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [balance, setBalance] = useState(380000)
  const [rate, setRate] = useState(6.75)
  const [remainingYears, setRemainingYears] = useState(25)
  const [lumpSumPayment, setLumpSumPayment] = useState(50000)

  const result = useMemo(()=>{
    try{return calculateMortgageRecast(balance, rate, remainingYears, lumpSumPayment)}catch(e){return null}
  },[balance, rate, remainingYears, lumpSumPayment])

  return (
    <CalculatorLayout title="Mortgage Recast Calculator USA 2026 — Lower Payment Without Refinancing" description="Calculate new mortgage payment after a lump-sum principal reduction (recast). Compare recast vs extra payments vs refinancing." icon="🏠" category="Finance" relatedCalculators={relatedCalculators} slug="mortgage-recast-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Mortgage Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={balance} onChange={e=>setBalance(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Interest Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={rate} onChange={e=>setRate(Number(e.target.value))} step={0.125} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Remaining Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={remainingYears} onChange={e=>setRemainingYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Lump Sum Payment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={lumpSumPayment} onChange={e=>setLumpSumPayment(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Current Monthly Payment" value={result ? `${Number(result.currentPayment).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} highlight />
                <ResultCard label="New Payment After Recast" value={result ? `${Number(result.recastPayment).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Monthly Savings" value={result ? `${Number(result.monthlySavings).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Total Interest Saved" value={result ? `${Number(result.totalInterestSaved).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Recast Fee" value={result ? `${Number(result.recastFee).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Payback Period" value={result ? `${Number(result.paybackMonths).toLocaleString()} months` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏠 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">A mortgage recast lets you lower your monthly payment without refinancing — no credit check, no appraisal, no closing costs. You make a large lump-sum principal payment ($50,000 in this example) and the bank recalculates your payment over the remaining term at your existing rate. On a $380,000 balance at 6.75%, a $50,000 recast reduces your payment by $200-250/month permanently.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Mortgage Recast Calculator USA 2026 — Lower Payment Without Refinancing" category="finance"
          intro="A mortgage recast applies a lump-sum principal reduction, then re-amortizes the smaller balance over the loan's remaining term at the existing interest rate. This page compares the payment before and after that principal reduction; lender eligibility and recast fees are not determined by the calculator."
          howItWorks="The calculation first computes the scheduled payment on the current balance, then subtracts the lump sum and applies the standard amortizing-payment formula to the reduced principal using the same rate and remaining term. A recast changes the payment, not the contractual interest rate."
          tipsSection="Change one assumption at a time and compare the result with the underlying contract, tax rule, lender terms, or official source before making a decision."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor."
          benefits={[{title:"Calculator results",text:"Results update from the values you enter."},{title:"100% Private",text:"Everything runs locally."},{title:"Available without a paid plan",text:"No account is required to run the calculation."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation with real numbers."},{title:"Scenario Comparison",text:"Change inputs to see the impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
