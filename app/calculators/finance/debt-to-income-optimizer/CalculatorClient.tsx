'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateDebtToIncomeOptimizer } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [monthlyGrossIncome, setMonthlyGrossIncome] = useState(7500)
  const [carPayment, setCarPayment] = useState(450)
  const [studentLoanPayment, setStudentLoanPayment] = useState(380)
  const [creditCardPayment, setCreditCardPayment] = useState(150)
  const [otherDebtPayment, setOtherDebtPayment] = useState(0)

  const result = useMemo(()=>{
    try{return calculateDebtToIncomeOptimizer(monthlyGrossIncome,[{name:'Car',payment:carPayment,balance:carPayment*48,rate:7.5},{name:'Student',payment:studentLoanPayment,balance:studentLoanPayment*120,rate:6.5},{name:'Credit Card',payment:creditCardPayment,balance:creditCardPayment*20,rate:22},{name:'Other Debt',payment:otherDebtPayment,balance:otherDebtPayment*24,rate:10}])}catch(e){return null}
  },[monthlyGrossIncome, carPayment, studentLoanPayment, creditCardPayment, otherDebtPayment])

  return (
    <CalculatorLayout title="Debt-to-Income Optimizer USA 2026 — Maximize Mortgage Eligibility" description="Calculate your current DTI ratio, maximum mortgage you qualify for, and optimal debt payoff order to improve mortgage eligibility." icon="📋" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="debt-to-income-optimizer">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Gross Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyGrossIncome} onChange={e=>setMonthlyGrossIncome(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Car Payment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={carPayment} onChange={e=>setCarPayment(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Student Loan ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={studentLoanPayment} onChange={e=>setStudentLoanPayment(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Credit Card Min ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={creditCardPayment} onChange={e=>setCreditCardPayment(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Other Debt ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={otherDebtPayment} onChange={e=>setOtherDebtPayment(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Debt Payments" value={result ? `${Number(result.totalDebtPayments).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} highlight />
                <ResultCard label="Current DTI" value={result ? `${Number(result.currentDTI).toFixed(1)}%` : "—"} />
                <ResultCard label="Mortgage Capacity" value={result ? `${Number(result.mortgageCapacity).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="FHA Capacity" value={result ? `${Number(result.fhaCapacity).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="DTI Healthy" value={result ? String(result.goodDTI ? 'Yes (under 36%)' : 'No — reduce debt first') : "—"} />
                <ResultCard label="DTI After Top Payoff" value={result ? `${Number(result.dtiAfterTopPayoff).toFixed(1)}%` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📋 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Debt-to-income ratio is one part of mortgage underwriting. This calculator totals the listed monthly debts against gross income, then shows planning room under its built-in DTI thresholds and a debt-payoff order. It does not determine lender approval or an interest rate, because underwriting also considers the proposed housing payment, credit profile, assets, loan program and other factors.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Debt-to-Income Optimizer USA 2026 — Maximize Mortgage Eligibility" category="finance" intro="Debt-to-income ratio is one part of mortgage underwriting. This calculator totals the listed monthly debts against gross income, then shows planning room under its built-in DTI thresholds and a debt-payoff order. It does not determine lender approval or an interest rate, because underwriting also considers the proposed housing payment, credit profile, assets, loan program and other factors."
          howItWorks="The calculator adds the entered car, student-loan, and credit-card payments, then divides that total by gross monthly income to show a back-end DTI before housing. It also shows planning capacities using 28% and 43% thresholds and sorts debts by interest rate for an avalanche-style payoff order. Those thresholds are planning heuristics, not universal mortgage approval rules; lenders apply program-specific underwriting, credit, reserves, housing expense, and pricing requirements."
          tipsSection="Try multiple scenarios by changing one input at a time."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor."
          benefits={[{title:"Current DTI",text:"Monthly listed debt payments ÷ gross monthly income × 100."},{title:"Planning capacity",text:"See the amount left under the calculator's 28% and 43% planning thresholds after existing debt payments."},{title:"Payoff priority",text:"Debts are ordered from highest to lowest entered/modelled interest rate to show which payment removal changes DTI first."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation."},{title:"Scenario Comparison",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
