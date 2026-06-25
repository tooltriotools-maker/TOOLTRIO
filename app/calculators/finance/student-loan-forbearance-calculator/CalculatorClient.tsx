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

  const result = useMemo(()=>{
    try{return calculateForbearanceVsRepayment(balance, rate, forbearanceMonths, resumePayment)}catch(e){return null}
  },[balance, rate, forbearanceMonths, resumePayment])

  return (
    <CalculatorLayout title="Student Loan Forbearance Cost Calculator USA 2026" description="Calculate the true cost of student loan forbearance — interest accrued, balance increase, and long-term payment impact vs continuing to pay." icon="🎓" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="student-loan-forbearance-calculator">
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
                <p className="text-sm text-gray-600 leading-relaxed">Student loan forbearance pauses payments but not interest — and that interest capitalizes, permanently increasing your loan balance. 12 months of forbearance on $45,000 at 6.5% adds $2,925 to your balance and increases all future interest. Income-driven repayment often provides $0 payments without these costs, and counts toward forgiveness. This calculator shows the true forbearance cost.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Student Loan Forbearance Cost Calculator USA 2026" category="finance"
          intro="Student loan forbearance pauses payments but not interest — and that interest capitalizes, permanently increasing your loan balance. 12 months of forbearance on $45,000 at 6.5% adds $2,925 to your balance and increases all future interest. Income-driven repayment often provides $0 payments without these costs, and counts toward forgiveness. This calculator shows the true forbearance cost."
          howItWorks="Enter your values and results update instantly using 2026 US-standard formulas. All calculations run locally in your browser."
          tipsSection="Try multiple scenarios by changing one input at a time to understand which variable has the most impact."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor."
          benefits={[{title:"Real-Time USA Results",text:"Instant 2026 IRS calculations."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup or paywall."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation with real numbers."},{title:"Scenario Comparison",text:"Change inputs to see the impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
