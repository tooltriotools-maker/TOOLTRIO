'use client'
import { calculateNetSalaryAfterTax } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [grossSalary, setGrossSalary] = useState(95000)
  const [retirement401k, setRetirement401k] = useState(9400)
  const [hsaContrib, setHsaContrib] = useState(4300)
  const [fsa, setFsa] = useState(1500)

  const result = useMemo(()=>{
    try{return calculateNetSalaryAfterTax(grossSalary, 'CA', 'single', retirement401k, hsaContrib, fsa)}catch(e){return null}
  },[grossSalary, retirement401k, hsaContrib, fsa])

  return (
    <CalculatorLayout title="Net Salary Calculator USA 2026 — Take-Home Pay by State" description="Estimate California take-home pay after simplified 2026 federal tax, FICA, modeled state tax, and entered 401(k), HSA, and FSA deductions." icon="💰" category="Finance" relatedCalculators={relatedCalculators} slug="net-salary-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Gross Salary ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={grossSalary} onChange={e=>setGrossSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">401k Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={retirement401k} onChange={e=>setRetirement401k(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">HSA Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={hsaContrib} onChange={e=>setHsaContrib(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">FSA Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={fsa} onChange={e=>setFsa(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Pre-Tax Deductions" value={result ? `${Number(result.preTaxDeductions).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Federal Income Tax" value={result ? `${Number(result.federalTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="FICA (SS + Medicare)" value={result ? `${Number(result.fica).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="State Tax (CA est.)" value={result ? `${Number(result.stateTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Annual Salary" value={result ? `${Number(result.netSalary).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Monthly Take-Home" value={result ? `${Number(result.monthlyTakeHome).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💰 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">This page estimates annual and monthly take-home pay after a simplified federal income-tax calculation, FICA, modeled state tax, and the 401(k), HSA, and FSA amounts you enter. The current interface specifically calculates California and single filing status, so it should not be read as an all-state payroll quote.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Net Salary Calculator USA 2026 — Take-Home Pay by State" category="finance"
          intro="This page estimates annual and monthly take-home pay after a simplified federal income-tax calculation, FICA, modeled state tax, and the 401(k), HSA, and FSA amounts you enter. The current interface specifically calculates California and single filing status, so it should not be read as an all-state payroll quote."
          howItWorks="The calculator subtracts the entered pre-tax deductions and a 2026 single standard deduction, applies simplified 2026 federal brackets, estimates Social Security/Medicare payroll tax, and applies the model's California state rate to gross salary. It does not reproduce Form W-4 withholding, California's progressive brackets, local payroll items, benefit premiums, Additional Medicare filing-status rules, or employer payroll configuration."
          tipsSection="Use gross annual salary and annual employee contributions. Treat the result as a planning estimate; an actual paycheck can differ because payroll withholding is based on pay frequency, Form W-4 elections, benefit treatment, bonuses, and state/local rules."
          conclusion="This calculator is best for rough California take-home comparisons, not filing a tax return or predicting an exact paycheck."
          benefits={[
            {title:"Real-Time USA Results",text:"Results follow the calculation methodology and assumptions explained on this page."},
            {title:"100% Private",text:"Everything runs in your browser. No data stored or transmitted."},
            {title:"Free Forever",text:"No signup, no paywall, no hidden costs."},
          ]}
          useCases={[
            {title:"Personal Planning",text:"Use the calculator inputs to test a concrete planning scenario."},
            {title:"Scenario Comparison",text:"Compare the result after changing the input that matters to this calculation."},
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
