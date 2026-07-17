'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateCollegeDebtBurden } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [loanBalance, setLoanBalance] = useState(68000)
  const [expectedSalary, setExpectedSalary] = useState(58000)
  const [loanRate, setLoanRate] = useState(6.53)
  const [repaymentYears, setRepaymentYears] = useState(10)

  const result = useMemo(()=>{
    try{return calculateCollegeDebtBurden(loanBalance,expectedSalary,loanRate,repaymentYears,'single')}catch(e){return null}
  },[loanBalance, expectedSalary, loanRate, repaymentYears])

  return (
    <CalculatorLayout title="College Debt Burden Calculator USA 2026 — Is Your Loan Manageable?" description="Calculate whether your student loan burden is manageable relative to expected salary, monthly payment-to-income ratio, and whether IDR forgiveness makes sense." icon="🎓" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="college-debt-burden-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Student Loan Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={loanBalance} onChange={e=>setLoanBalance(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Expected Starting Salary ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={expectedSalary} onChange={e=>setExpectedSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Loan Interest Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={loanRate} onChange={e=>setLoanRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Repayment Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={repaymentYears} onChange={e=>setRepaymentYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Monthly Payment" value={result ? `${Number(result.monthlyPayment).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} highlight />
                <ResultCard label="Payment-to-Income Ratio" value={result ? `${Number(result.paymentToIncome).toFixed(1)}%` : "—"} />
                <ResultCard label="Debt-to-Income Ratio" value={result ? String(result.debtToIncome) : "—"} />
                <ResultCard label="Total Interest" value={result ? `${Number(result.totalInterest).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Affordable" value={result ? String(result.affordable ? 'Yes (under 10%)' : 'Unaffordable — consider IDR') : "—"} />
                <ResultCard label="IDR Monthly Est." value={result ? `${Number(result.idRMonthlyEst).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🎓 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The student loan debt burden is best measured as payment-to-income ratio. When monthly payments exceed 10% of gross income, the burden becomes unmanageable — and Income-Driven Repayment (IDR) provides the safety valve. A $68,000 balance at $58,000 salary produces a 13% payment-to-income ratio on standard repayment, but only 3.6% on the SAVE plan. This calculator shows both paths.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="College Debt Burden Calculator USA 2026 — Is Your Loan Manageable?" category="finance" intro="The student loan debt burden is best measured as payment-to-income ratio. When monthly payments exceed 10% of gross income, the burden becomes unmanageable — and Income-Driven Repayment (IDR) provides the safety valve. A $68,000 balance at $58,000 salary produces a 13% payment-to-income ratio on standard repayment, but only 3.6% on the SAVE plan. This calculator shows both paths."
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
