'use client'
import { calculateCarAffordability } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [grossMonthlyIncome, setGrossMonthlyIncome] = useState(6500)
  const [monthlyDebts, setMonthlyDebts] = useState(400)
  const [downPayment, setDownPayment] = useState(5000)
  const [tradeInValue, setTradeInValue] = useState(3000)
  const [loanRate, setLoanRate] = useState(7.5)
  const [loanTermMonths, setLoanTermMonths] = useState(60)

  const result = useMemo(()=>{
    try{return calculateCarAffordability(grossMonthlyIncome, monthlyDebts, downPayment, tradeInValue, loanRate, loanTermMonths, 150)}catch(e){return null}
  },[grossMonthlyIncome, monthlyDebts, downPayment, tradeInValue, loanRate, loanTermMonths])

  return (
    <CalculatorLayout title="Car Affordability Calculator USA 2026 — How Much Car Can I Afford?" description="Calculate maximum car price, monthly payment, and total cost of ownership based on income, debts, and 15% rule for vehicle affordability." icon="🚗" category="Finance" relatedCalculators={relatedCalculators} slug="car-affordability-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Gross Monthly Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={grossMonthlyIncome} onChange={e=>setGrossMonthlyIncome(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Debt Payments ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyDebts} onChange={e=>setMonthlyDebts(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Down Payment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={downPayment} onChange={e=>setDownPayment(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Trade-In Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={tradeInValue} onChange={e=>setTradeInValue(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Loan Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={loanRate} onChange={e=>setLoanRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Loan Term (months)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={loanTermMonths} onChange={e=>setLoanTermMonths(Number(e.target.value))} step={12} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Max Car Price" value={result ? `${Number(result.maxCarPrice).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Max Loan Amount" value={result ? `${Number(result.maxLoan).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Monthly Payment" value={result ? `${Number(result.monthlyPayment).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="With Insurance" value={result ? `${Number(result.totalMonthly).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Total Interest" value={result ? `${Number(result.totalInterest).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="% of Income" value={result ? `${Number(result.percentOfIncome).toFixed(1)}%` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🚗 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Car affordability goes beyond the monthly payment — total cost of ownership includes insurance, fuel, maintenance, and depreciation. The 15% gross income rule for vehicle expenses (payment + insurance combined) is a reliable guardrail. At $6,500/month income, that's $975/month maximum. This calculator shows your exact affordable price range.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Car Affordability Calculator USA 2026 — How Much Car Can I Afford?" category="finance"
          intro="This page converts a vehicle-budget guardrail into a maximum financed amount. The model reserves 15% of gross monthly income for the car payment plus a fixed $150 monthly insurance allowance, then uses your APR and term to solve for the loan principal."
          howItWorks="Maximum payment = 15% of gross monthly income − $150 insurance. That payment is converted to a loan present value using the entered monthly interest rate and number of payments. Down payment and trade-in are then added to produce the maximum modeled car price."
          tipsSection="Treat 15% as a ToolTrio budgeting assumption, not a lender rule. The monthly-debt input is currently not used by the underlying function, and actual insurance, fuel, maintenance, taxes and depreciation can materially reduce what is comfortable."
          conclusion="Use the output as a conservative scenario to test price, APR and term combinations. A lender may approve more than this model, but approval and affordability are different questions."
          benefits={[{title:"Real-Time USA Results",text:"Uses the calculator-specific assumptions shown on this page."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup or paywall."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation with real numbers."},{title:"Scenario Comparison",text:"Change inputs to see the impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
