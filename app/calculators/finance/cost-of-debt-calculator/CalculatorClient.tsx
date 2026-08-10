'use client'
import { calculateCostOfDebt } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [ccBalance, setCcBalance] = useState(8500)
  const [ccRate, setCcRate] = useState(24)
  const [autoBalance, setAutoBalance] = useState(15000)
  const [autoRate, setAutoRate] = useState(7.5)
  const [extraPayment, setExtraPayment] = useState(200)

  const result = useMemo(()=>{
    try{return calculateCostOfDebt([{name:'Credit Card',balance:ccBalance,rate:ccRate,minPayment:ccBalance*0.02},{name:'Auto Loan',balance:autoBalance,rate:autoRate,minPayment:autoBalance*0.018}], extraPayment)}catch(e){return null}
  },[ccBalance, ccRate, autoBalance, autoRate, extraPayment])

  return (
    <CalculatorLayout title="Cost of Debt Calculator USA 2026 — True Interest Burden" description="Calculate your true cost of debt — weighted average interest rate, annual interest burden, optimal payoff strategy, and interest saved by extra payments." icon="💳" category="Finance" relatedCalculators={relatedCalculators} slug="cost-of-debt-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Credit Card Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={ccBalance} onChange={e=>setCcBalance(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Credit Card Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={ccRate} onChange={e=>setCcRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Auto Loan Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={autoBalance} onChange={e=>setAutoBalance(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Auto Loan Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={autoRate} onChange={e=>setAutoRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Extra Monthly Payment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={extraPayment} onChange={e=>setExtraPayment(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Debt" value={result ? `${Number(result.totalBalance).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Weighted Avg Rate" value={result ? `${Number(result.weightedRate).toFixed(1)}%` : "—"} />
                <ResultCard label="Monthly Interest Charge" value={result ? `${Number(result.monthlyInterest).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Annual Interest Cost" value={result ? `${Number(result.annualCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Payoff Time (Avalanche)" value={result ? `${Number(result.payoffMonthsAvalanche).toLocaleString()} months` : "—"} />
                <ResultCard label="Interest Saved by Extra" value={result ? `${Number(result.interestSavedByExtra).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💳 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Compare the interest burden of the credit-card and auto-loan balances entered on this page and see how an extra monthly payment changes payoff modeling. Minimum payments are approximated as percentages of balance in the UI. Issuer minimum-payment rules, fees, promotional APRs and variable rates are not modeled.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Cost of Debt Calculator USA 2026 — True Interest Burden" category="finance"
          intro="Compare the interest burden of the credit-card and auto-loan balances entered on this page and see how an extra monthly payment changes payoff modeling."
          howItWorks="Each debt has a balance, APR and modeled minimum payment. Interest accrues from APR/12 while payments reduce principal; the extra-payment amount is applied by the underlying payoff model."
          tipsSection="Worked example: A high-rate credit-card balance usually consumes more interest per dollar than a lower-rate auto loan. Enter both balances and compare the modeled payoff cost before allocating extra cash."
          conclusion="Important assumptions and limitations: Minimum payments are approximated as percentages of balance in the UI. Issuer minimum-payment rules, fees, promotional APRs and variable rates are not modeled. Results are educational estimates, not individualized financial, tax, legal or investment advice."
          benefits={[
            {title:"Calculator results",text:"Results update immediately from the inputs and methodology described on this page."},
            {title:"100% Private",text:"Everything runs in your browser. No data stored or transmitted."},
            {title:"Available without a paid plan",text:"No account is required to run the calculation."},
          ]}
          useCases={[
            {title:"Personal Planning",text:"Model your specific situation with real numbers before making decisions."},
            {title:"Scenario Comparison",text:"Change one variable at a time to understand the impact of each factor."},
          ]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
