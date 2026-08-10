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
                <p className="text-sm text-gray-600 leading-relaxed">Measure student-loan payments against expected salary instead of looking only at the loan balance. The IDR and forgiveness fields are simplified scenarios and do not implement current Department of Education plan eligibility, discretionary-income definitions or forgiveness rules.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="College Debt Burden Calculator USA 2026 — Is Your Loan Manageable?" category="finance" intro="Measure student-loan payments against expected salary instead of looking only at the loan balance."
          howItWorks="The page amortizes the entered balance over the selected term and calculates annual payment ÷ expected salary. It also compares debt with one year of salary. The 10% affordability line is a ToolTrio planning heuristic, not a federal eligibility rule."
          tipsSection="Worked example: For $40,000 at 6.5% over 10 years, the calculator estimates the fixed payment and then measures twelve payments against the salary you enter."
          conclusion="Important assumptions and limitations: The IDR and forgiveness fields are simplified scenarios and do not implement current Department of Education plan eligibility, discretionary-income definitions or forgiveness rules. Results are educational estimates, not individualized financial, tax, legal or investment advice."
          benefits={[{title:"Calculator results",text:"Results update from the values you enter."},{title:"100% Private",text:"Everything runs locally."},{title:"Available without a paid plan",text:"No account is required to run the calculation."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation."},{title:"Scenario Comparison",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
