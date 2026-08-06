'use client'
import {useState,useMemo} from 'react'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import { calculateI401kSEPComparison } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [netSEIncome, setNetSEIncome] = useState(150000)
  const [age, setAge] = useState(45)
  const result=useMemo(()=>{try{return calculateI401kSEPComparison(netSEIncome,age)}catch(e){return null}},[netSEIncome, age])
  return(
    <CalculatorLayout title="Self-Employed Retirement Plan Comparison USA 2026" description="Compare Solo 401k vs SEP-IRA vs SIMPLE IRA contribution limits and tax savings for self-employed individuals." icon="💼" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="self-employed-retirement-plan-comparison">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Net Self-Employment Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={netSEIncome} onChange={e=>setNetSEIncome(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
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
                <ResultCard label="Solo 401k Total" value={result?`${Number(result.solo401kTotal).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="SEP-IRA Total" value={result?`${Number(result.sepIRA).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="SIMPLE IRA Total" value={result?`${Number(result.simplePlan).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Solo 401k Advantage" value={result?`${Number(result.advantage401k).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Solo 401k Tax Savings" value={result?`${Number(result.taxSavings401k).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Recommendation" value={result?String(result.recommendation):"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">💼 Self-Employed Retirement Plan Comparison USA 2026</h2><p className="text-sm text-gray-600">Compare Solo 401k vs SEP-IRA vs SIMPLE IRA contribution limits and tax savings for self-employed individuals.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <div className="space-y-6 text-sm text-gray-700 leading-7">
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">How the self-employed plan comparison works</h2><p>This comparison models the maximum contribution space for a one-person business using three different plan designs. For the Solo 401(k), it combines an employee elective deferral with an employer contribution, while the SEP-IRA estimate uses the self-employed contribution percentage. The SIMPLE IRA result models the employee salary-reduction limit. Age matters because federal catch-up limits increase at age 50, with a higher catch-up for ages 60–63 in 2026.</p><p className="mt-3">For 2026, the calculator uses a $24,500 regular 401(k) deferral, an $8,000 age-50 catch-up, an $11,250 catch-up for ages 60–63, and a $72,000 defined-contribution annual-additions limit before catch-up contributions.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">Understanding the inputs and results</h2><p><strong>Net self-employment income</strong> is the earnings base used by this simplified comparison. Actual deductible employer contributions for a sole proprietor require the IRS self-employed contribution calculation, so the estimate should not be treated as a tax-return figure. <strong>Age</strong> determines whether catch-up contributions are available. The “advantage” result is simply the modeled Solo 401(k) total minus the modeled SEP contribution; it does not mean the Solo 401(k) is automatically the best plan.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">Worked example</h2><p>At $150,000 of modeled self-employment income and age 45, the calculator allows a $24,500 Solo 401(k) employee deferral plus an employer component, subject to the $72,000 annual-additions ceiling. The SEP estimate is based on the calculator’s self-employed contribution percentage. Compare the contribution gap with the extra administration, employee-eligibility rules, and plan costs before choosing a structure.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">Important limitations</h2><p>This is a contribution-space comparison, not a plan-eligibility determination or tax return calculation. Employees, entity type, W-2 wages, plan documents, compensation definitions, employer matching obligations, and the special self-employed deduction calculation can materially change the permitted amount. The displayed tax-savings estimate uses a fixed illustrative marginal rate and is not a personalized tax estimate.</p><p className="mt-3"><strong>Primary source:</strong> <a className="text-green-700 underline" href="https://www.irs.gov/retirement-plans/cola-increases-for-dollar-limitations-on-benefits-and-contributions" target="_blank" rel="noreferrer">IRS 2026 retirement-plan limits</a>.</p></Card>
        </div>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
