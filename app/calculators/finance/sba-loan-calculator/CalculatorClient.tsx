'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateSBALoanAffordability } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [loanAmount, setLoanAmount] = useState(350000)
  const [sbaRate, setSbaRate] = useState(11.0)
  const [termYears, setTermYears] = useState(10)
  const [annualRevenue, setAnnualRevenue] = useState(950000)
  const [netProfit, setNetProfit] = useState(85000)

  const result = useMemo(()=>{
    try{return calculateSBALoanAffordability(loanAmount,sbaRate,termYears,annualRevenue,netProfit,0)}catch(e){return null}
  },[loanAmount, sbaRate, termYears, annualRevenue, netProfit])

  return (
    <CalculatorLayout title="SBA Loan Calculator USA 2026 — 7(a) and 504 Loans" description="Calculate SBA loan monthly payment, DSCR eligibility, total interest cost, and maximum loan amount based on your business financials." icon="🏢" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="sba-loan-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Loan Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={loanAmount} onChange={e=>setLoanAmount(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">SBA Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={sbaRate} onChange={e=>setSbaRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Loan Term (years)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={termYears} onChange={e=>setTermYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Business Revenue ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualRevenue} onChange={e=>setAnnualRevenue(Number(e.target.value))} step={25000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Net Annual Profit ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={netProfit} onChange={e=>setNetProfit(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Monthly Payment" value={result ? `${Number(result.monthlyPayment).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} highlight />
                <ResultCard label="Annual Payment" value={result ? `${Number(result.annualPayment).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Interest" value={result ? `${Number(result.totalInterest).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="DSCR" value={result ? String(result.dscr) : "—"} />
                <ResultCard label="Qualifies" value={result ? String(result.qualifies ? 'Yes (DSCR ≥1.25)' : 'Below 1.25 threshold') : "—"} />
                <ResultCard label="SBA Program" value={result ? String(result.eligibleProgram) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏢 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">SBA loans offer below-market rates and longer terms than conventional business loans — but eligibility requires a DSCR of at least 1.25. This calculator models your exact monthly payment, total interest cost, and a simplified DSCR scenario based on entered net profit. Understanding DSCR before applying saves time and helps you structure the loan amount for maximum approval probability.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="SBA Loan Calculator USA 2026 — 7(a) and 504 Loans" category="finance" intro="This page estimates payment burden and a simplified debt-service coverage ratio for a proposed business loan. It can help test whether a requested amount is supportable by the net profit you enter, but it does not perform SBA or lender underwriting."
          howItWorks="The loan is amortized at the entered rate and term. Annual debt service is 12 monthly payments. DSCR = annual net profit ÷ annual modeled payment. The code flags 1.25 or greater as adequate and applies additional internal heuristics for qualification and program labels; existing debt is currently passed as zero."
          tipsSection="Use cash flow available for debt service rather than assuming accounting net profit always equals repayment capacity. Verify current SBA program limits, guaranty fees, permitted uses of proceeds and lender requirements; SBA fees are not modeled because applicable fees vary by program, loan size, guarantee and current rules."
          conclusion="Use the payment and DSCR outputs for scenario planning, not as an approval prediction. SBA eligibility and credit decisions require current program rules and lender review."
          benefits={[{title:"Calculator results",text:"Uses the calculator-specific assumptions shown on this page."},{title:"100% Private",text:"Everything runs locally."},{title:"Available without a paid plan",text:"No account is required to run the calculation."}]}
          useCases={[{title:"Personal Planning",text:"Use your own inputs to test this specific calculation."},{title:"Scenario Comparison",text:"Change one relevant input at a time and compare the modeled output."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
