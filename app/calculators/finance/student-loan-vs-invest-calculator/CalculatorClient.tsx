'use client'
import { calculatePayOffStudentLoanVsInvest } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [loanBalance, setLoanBalance] = useState(45000)
  const [loanRate, setLoanRate] = useState(6.5)
  const [monthlyExtra, setMonthlyExtra] = useState(300)
  const [investReturn, setInvestReturn] = useState(8)
  const [years, setYears] = useState(10)

  const result = useMemo(()=>{
    try{return calculatePayOffStudentLoanVsInvest(loanBalance, loanRate, monthlyExtra, investReturn, years)}catch(e){return null}
  },[loanBalance, loanRate, monthlyExtra, investReturn, years])

  return (
    <CalculatorLayout title="Pay Off Student Loans vs Invest Calculator USA 2026" description="Calculate whether extra money should pay down student loans or go into investments — comparing interest saved vs investment growth." icon="⚖️" category="Finance" relatedCalculators={relatedCalculators} slug="student-loan-vs-invest-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Loan Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={loanBalance} onChange={e=>setLoanBalance(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Loan Interest Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={loanRate} onChange={e=>setLoanRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Extra Monthly Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyExtra} onChange={e=>setMonthlyExtra(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Expected Investment Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={investReturn} onChange={e=>setInvestReturn(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={years} onChange={e=>setYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Min Monthly Payment" value={result ? `${Number(result.minPayment).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} highlight />
                <ResultCard label="Payoff Time (with extra)" value={result ? `${Number(result.payoffMonthsWithExtra).toLocaleString()} months` : "—"} />
                <ResultCard label="Interest Saved by Paying" value={result ? `${Number(result.interestSavedByPaying).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Investment Value Instead" value={result ? `${Number(result.investedValueInstead).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Better Option" value={result ? String(result.betterOption) : "—"} />
                <ResultCard label="Net Difference" value={result ? `${Number(result.difference).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">⚖️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The pay-off-loans vs invest decision depends on two numbers: your loan interest rate and your expected investment return. If investing returns more than the loan costs, invest. But risk, tax deductibility, and psychological value of debt freedom matter too. This calculator runs the math both ways so you can make an informed decision.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Pay Off Student Loans vs Invest Calculator USA 2026" category="finance"
          intro={'This calculator compares two uses for the same monthly surplus: add it to a student-loan payment or invest it while continuing the scheduled loan payment. It is a mathematical comparison of modeled interest cost and investment growth, not a recommendation to give up federal loan protections or take investment risk.'}
          howItWorks={'The loan side first computes the standard amortizing payment from balance, interest rate and term. It then adds the extra monthly amount and simulates the faster payoff month by month. The investment side compounds that same monthly extra amount at the expected return for the full selected term while the loan remains on its scheduled payment. The model labels the higher assumed rate as the better option, but it does not risk-adjust investment returns or value federal repayment and forgiveness features.'}
          tipsSection={'Do not compare a guaranteed loan rate with an optimistic investment return as though both were equally certain. Also consider emergency savings, employer retirement matches, taxes and any federal student-loan benefits before acting.'}
          conclusion={'Use the result as a rate-and-cash-flow scenario. Investment returns can be negative, while paying principal produces a certain reduction in interest-bearing debt.'}
          benefits={[{title:'Accelerated payoff',text:'Estimate payoff months and modeled interest savings when the extra amount goes to the loan.'},{title:'Investment alternative',text:'Project the future value of investing the same monthly surplus.'},{title:'Rate sensitivity',text:'See how the comparison changes when either the loan rate or expected investment return changes.'}]}
          useCases={[{title:'High-rate private loan',text:'Test whether a certain debt payoff compares favorably with a conservative investment-return assumption.'},{title:'Low-rate loan',text:'Explore the tradeoff when the loan rate is well below the return assumption, while separately considering risk.'}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
