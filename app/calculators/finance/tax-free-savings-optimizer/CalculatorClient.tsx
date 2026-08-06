'use client'
import {useState,useMemo} from 'react'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import { calculateTaxFreeSavingsOptimizer } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [annualIncome, setAnnualIncome] = useState(95000)
  const [taxRate, setTaxRate] = useState(24)
  const [age, setAge] = useState(38)
  const result=useMemo(()=>{try{return calculateTaxFreeSavingsOptimizer(annualIncome,taxRate,'single',age)}catch(e){return null}},[annualIncome, taxRate, age])
  return(
    <CalculatorLayout title="Tax-Free Savings Optimizer USA 2026" description="Find every tax-free and tax-deferred savings account available to you in 2026 with the optimal funding order." icon="💡" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="tax-free-savings-optimizer">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualIncome} onChange={e=>setAnnualIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="401k Limit" value={result?`${Number(result.k401Limit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="HSA Limit" value={result?`${Number(result.hsaLimit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="IRA Limit" value={result?`${Number(result.iraLimit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total Pre-Tax Deductions" value={result?`${Number(result.totalPreTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total Tax Savings" value={result?`${Number(result.totalTaxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="% of Income Sheltered" value={result?`${Number(result.percentOfIncomeSheltered).toFixed(1)}%`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">💡 Tax-Free Savings Optimizer USA 2026</h2><p className="text-sm text-gray-600">Find every tax-free and tax-deferred savings account available to you in 2026 with the optimal funding order.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <div className="space-y-6 text-sm text-gray-700 leading-7">
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">How this tax-advantaged savings optimizer works</h2><p>The tool inventories contribution room across a 401(k), self-only HSA, IRA, health FSA, and dependent-care FSA, then estimates the current-year income-tax effect of contributions the model treats as pre-tax. It is a prioritization aid rather than a promise that every account is available to the same person.</p><p className="mt-3">The 2026 constants used here are $24,500 for the regular 401(k) elective deferral, $4,400 for a self-only HSA, $7,500 for an IRA, $3,400 for a health FSA, and $7,500 for dependent-care assistance. Age-based catch-ups are added where the calculator supports them.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">What your inputs change</h2><p><strong>Annual income</strong> is used to put the modeled account capacity in context; it is not a complete MAGI calculation. <strong>Tax rate</strong> drives the simplified current-year income-tax estimate on amounts treated as pre-tax. <strong>Age</strong> can unlock 401(k) and IRA catch-up room. HSA eligibility additionally requires qualifying HDHP coverage, and a general-purpose health FSA can conflict with HSA eligibility.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">Worked example</h2><p>For a 38-year-old earning $95,000 with a 24% assumed marginal rate, the model starts with the regular 2026 limits: $24,500 of 401(k) deferral room, $4,400 of self-only HSA room, and $7,500 of IRA room. The tax estimate should be read as a scenario: Roth contributions do not create the same current-year deduction as pre-tax contributions, and payroll-tax treatment differs by account and contribution method.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">Assumptions, eligibility and source data</h2><p>The funding order is educational, not individualized advice. Employer match formulas, family HSA coverage, Roth eligibility, IRA deductibility, workplace-plan access, dependent-care expenses, and cash-flow needs can change the order. Do not contribute merely to reach a displayed maximum.</p><p className="mt-3"><strong>Sources:</strong> <a className="text-green-700 underline" href="https://www.irs.gov/retirement-plans/cola-increases-for-dollar-limitations-on-benefits-and-contributions" target="_blank" rel="noreferrer">IRS retirement limits</a>, <a className="text-green-700 underline" href="https://www.irs.gov/irb/2025-21_IRB" target="_blank" rel="noreferrer">IRS 2026 HSA limits</a>, and <a className="text-green-700 underline" href="https://www.irs.gov/publications/p15b" target="_blank" rel="noreferrer">IRS Publication 15-B</a>.</p></Card>
        </div>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
