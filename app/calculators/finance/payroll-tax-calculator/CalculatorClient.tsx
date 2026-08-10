'use client'
import { calculatePayrollTax } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [grossWages, setGrossWages] = useState(3500)
  const [payPeriod, setPayPeriod] = useState<'weekly' | 'biweekly' | 'semimonthly' | 'monthly'>('biweekly')
  const [allowances, setAllowances] = useState(0)

  const result = useMemo(()=>{
    try{return calculatePayrollTax(grossWages, 'single', allowances, 'CA', payPeriod as any)}catch(e){return null}
  },[grossWages, payPeriod, allowances])

  return (
    <CalculatorLayout title="Payroll Tax Calculator USA 2026 — Federal, State & FICA" description="Calculate exact federal withholding, Social Security, Medicare, and state payroll taxes for any pay period." icon="💵" category="Finance" relatedCalculators={relatedCalculators} slug="payroll-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Gross Pay Per Period ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={grossWages} onChange={e=>setGrossWages(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Pay Frequency</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <select value={payPeriod} onChange={e => setPayPeriod(e.target.value as 'weekly' | 'biweekly' | 'semimonthly' | 'monthly')} className="bg-transparent text-gray-900 font-semibold w-full outline-none">
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="semimonthly">Semimonthly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Allowances (W-4)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={allowances} onChange={e=>setAllowances(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Federal Withholding" value={result ? `${Number(result.fedWithholding).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Social Security" value={result ? `${Number(result.ssTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Medicare" value={result ? `${Number(result.medicareTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="State Tax (est.)" value={result ? `${Number(result.stateTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Withheld" value={result ? `${Number(result.totalWithholding).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Pay" value={result ? `${Number(result.netPay).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💵 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Payroll taxes include federal income tax withholding (based on your W-4 and 2026 tax brackets), Social Security (6.2% on first $176,100), Medicare (1.45%), and state income tax. This calculator computes every component for any pay period — weekly, biweekly, semimonthly, or monthly.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Payroll Tax Calculator USA 2026 — Federal, State & FICA" category="finance"
          intro="Payroll taxes include federal income tax withholding (based on your W-4 and 2026 tax brackets), Social Security (6.2% on first $176,100), Medicare (1.45%), and state income tax. This calculator computes every component for any pay period — weekly, biweekly, semimonthly, or monthly."
          howItWorks="This estimator annualizes the entered paycheck, estimates federal income tax using simplified annual brackets, then adds employee Social Security, Medicare and a flat state-rate approximation before converting federal tax back to the selected pay frequency."
          tipsSection="The 2026 Social Security wage base in the calculation is now $184,500; the employee Social Security rate is 6.2% and Medicare is 1.45%. The federal bracket and standard-deduction constants have also been updated for 2026."
          conclusion="This is not a substitute for IRS Publication 15-T payroll withholding. The allowances input is a custom simplification rather than the current Form W-4 methodology, and state withholding is represented by rough flat rates rather than each state’s payroll rules."
          benefits={[
            {title:"Calculator results",text:"Calculator-specific payroll estimates using the documented 2026 constants and simplified assumptions."},
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
