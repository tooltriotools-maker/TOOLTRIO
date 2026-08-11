'use client'
import { calculateForbearanceVsRepayment } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [balance, setBalance] = useState(45000)
  const [rate, setRate] = useState(6.5)
  const [forbearanceMonths, setForbearanceMonths] = useState(12)
  const [resumePayment, setResumePayment] = useState(500)
  const [termYears, setTermYears] = useState(30)
  const [capitalizeInterest, setCapitalizeInterest] = useState(true)

  const result = useMemo(()=>{
    try{return calculateForbearanceVsRepayment(balance, rate, forbearanceMonths, resumePayment, termYears, capitalizeInterest)}catch(e){return null}
  },[balance, rate, forbearanceMonths, resumePayment, termYears, capitalizeInterest])

  return (
    <CalculatorLayout title="Student Loan Forbearance Cost Calculator USA 2026" description="Model interest accrued during student-loan forbearance and compare payment and balance effects under explicit capitalization assumptions." icon="🎓" category="Finance" relatedCalculators={relatedCalculators} slug="student-loan-forbearance-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Loan Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={balance} onChange={e=>setBalance(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Interest Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={rate} onChange={e=>setRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Forbearance Months</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={forbearanceMonths} onChange={e=>setForbearanceMonths(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Resume Payment Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={resumePayment} onChange={e=>setResumePayment(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Monthly Interest Accruing" value={result ? `${Number(result.interestAccrued / forbearanceMonths).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} highlight />
                <ResultCard label="Total Interest Accrued" value={result ? `${Number(result.interestAccrued).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="New Balance After Forbearance" value={result ? `${Number(result.newBalance).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="New Monthly Payment" value={result ? `${Number(result.newPayment).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Payment Increase" value={result ? `${Number(result.paymentIncrease).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Total Long-Term Cost" value={result ? `${Number(result.totalCostForbearance).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🎓 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Student loan forbearance pauses payments but not interest — and that interest capitalizes, permanently increasing your loan balance. Interest can continue to accrue during forbearance. Whether unpaid interest capitalizes depends on the loan type and the reason for the forbearance, so this calculator makes capitalization an explicit scenario choice rather than assuming it always happens.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="Student Loan Forbearance Cost Calculator" category="finance"
          intro="This calculator models how unpaid interest during a temporary payment pause can increase a student-loan balance and compares the modeled payment needed over the remaining term."
          howItWorks="Interest accrued is modeled as balance × annual rate ÷ 12 × pause months. The calculator then either adds that accrued interest to principal or keeps it outside principal, according to the explicit capitalization toggle. The post-pause payment is modeled over the remaining term."
          tipsSection="Worked example: $45,000 at 6.5% for 12 months produces about $2,925 of simple monthly-rate interest before considering the servicer’s actual capitalization and payment rules. The result is a scenario, not a statement of what every federal loan must do."
          conclusion="Important assumptions and limitations: Federal student-loan capitalization rules and repayment options depend on loan type and event. Interest can accrue during forbearance, but it is inaccurate to assume every forbearance automatically capitalizes all interest in the same way. The post-pause payment assumption is used to show the payment comparison; actual repayment-plan terms must be confirmed with the servicer."
          benefits={[{title:"Methodology",text:"The explanation above follows the calculation actually performed by this page."},{title:"Interpret the output",text:"Treat the result as a scenario estimate and test the assumptions that matter most."},{title:"Privacy",text:"Calculator inputs are processed in your browser."}]}
          useCases={[{title:"Decision support",text:"Compare the calculator-specific trade-offs before taking the next step."},{title:"Scenario testing",text:"Change one relevant input at a time and observe which output is most sensitive."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
