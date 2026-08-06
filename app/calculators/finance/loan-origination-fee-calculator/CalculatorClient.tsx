'use client'
import { calculateLoanOriginationFee } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [loanAmount, setLoanAmount] = useState(350000)
  const [originationFeePercent, setOriginationFeePercent] = useState(1.0)
  const [interestRate, setInterestRate] = useState(6.875)
  const [loanTermYears, setLoanTermYears] = useState(30)
  const [alternativeRate, setAlternativeRate] = useState(7.125)

  const result = useMemo(()=>{
    try{return calculateLoanOriginationFee(loanAmount, originationFeePercent, interestRate, loanTermYears, alternativeRate)}catch(e){return null}
  },[loanAmount, originationFeePercent, interestRate, loanTermYears, alternativeRate])

  return (
    <CalculatorLayout title="Loan Origination Fee Calculator USA 2026 — Is the Fee Worth It?" description="Calculate the true cost of loan origination fees, effective APR, and break-even vs a no-fee higher-rate loan." icon="💵" category="Finance" relatedCalculators={relatedCalculators} slug="loan-origination-fee-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Loan Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={loanAmount} onChange={e=>setLoanAmount(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Origination Fee (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={originationFeePercent} onChange={e=>setOriginationFeePercent(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Interest Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={interestRate} onChange={e=>setInterestRate(Number(e.target.value))} step={0.125} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Loan Term (years)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={loanTermYears} onChange={e=>setLoanTermYears(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">No-Fee Alt Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={alternativeRate} onChange={e=>setAlternativeRate(Number(e.target.value))} step={0.125} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Origination Fee $" value={result ? `${Number(result.originationFee).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Monthly Payment" value={result ? `${Number(result.monthlyPayment).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Total Cost (with fee)" value={result ? `${Number(result.totalCostWithFee).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Cost (no fee)" value={result ? `${Number(result.totalCostNoFee).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Effective APR" value={result ? `${Number(result.effectiveAPR).toFixed(1)}%` : "—"} />
                <ResultCard label="Break-Even Months" value={result ? `${Number(result.breakEvenMonths).toLocaleString()} months` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💵 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Loan origination fees are upfront costs that reduce your loan proceeds or increase closing costs. The key question: does the lower interest rate from paying the fee save more than the fee costs over your expected loan term? A 1% origination fee on a $350,000 loan costs $3,500 — you need to break even in monthly payment savings before refinancing or selling.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Loan Origination Fee Calculator USA 2026 — Is the Fee Worth It?" category="finance" intro="Loan origination fees are upfront costs that reduce your loan proceeds or increase closing costs. The key question: does the lower interest rate from paying the fee save more than the fee costs over your expected loan term? A 1% origination fee on a $350,000 loan costs $3,500 — you need to break even in monthly payment savings before refinancing or selling."
          howItWorks="The calculator compares two fully amortizing loans for the same principal and term: one with the entered origination fee and lower rate, and one with no fee at the alternative rate. It calculates each monthly payment, adds the upfront fee to the first loan's lifetime cost, and divides the fee by monthly payment savings to estimate a break-even month. The displayed effective APR is only a simplified rate-plus-fee-per-year approximation, not the Regulation Z APR disclosed by a lender."
          tipsSection="Try multiple scenarios by changing one input at a time."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor."
          benefits={[{title:"Upfront fee",text:"Loan amount × origination-fee percentage."},{title:"Payment comparison",text:"Compare amortized monthly payments at the two entered interest rates over the same term."},{title:"Break-even month",text:"Estimate how long monthly savings take to recover the fee; selling or refinancing earlier can change the decision."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation with real numbers."},{title:"Scenario Comparison",text:"Change inputs to see the impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
