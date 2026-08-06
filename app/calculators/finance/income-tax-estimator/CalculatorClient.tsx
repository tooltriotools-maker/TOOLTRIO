'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateIncomeTaxEstimate } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [wages,setWages]=useState(85000)
  const [selfEmploymentIncome,setSelfEmploymentIncome]=useState(0)
  const [otherIncome,setOtherIncome]=useState(5000)
  const [deductions,setDeductions]=useState(0)
  const [credits,setCredits]=useState(2000)
  const [withholding,setWithholding]=useState(18000)
  const result=useMemo(()=>{try{return calculateIncomeTaxEstimate(wages,selfEmploymentIncome,otherIncome,deductions,credits,'single',withholding)}catch(e){return null}},[wages, selfEmploymentIncome, otherIncome, deductions, credits, withholding])
  return(
    <CalculatorLayout title="2026 Income Tax Estimator USA — All Income Sources" description="Estimate your complete 2026 federal income tax from all sources — wages, self-employment, investments — and see your refund or amount owed." icon="🧾" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="income-tax-estimator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">W-2 Wages ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={wages} onChange={e=>setWages(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Self-Employment Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={selfEmploymentIncome} onChange={e=>setSelfEmploymentIncome(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Other Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={otherIncome} onChange={e=>setOtherIncome(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Additional Deductions ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={deductions} onChange={e=>setDeductions(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Tax Credits ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={credits} onChange={e=>setCredits(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">YTD Withholding ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={withholding} onChange={e=>setWithholding(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Income" value={result?`${Number(result.totalIncome).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Taxable Income" value={result?`${Number(result.taxable).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total Tax" value={result?`${Number(result.totalTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Effective Rate" value={result?`${Number(result.effectiveRate).toFixed(1)}%`:"-"}/>
                <ResultCard label="Marginal Rate" value={result?`${Number(result.marginalRate).toFixed(1)}%`:"-"}/>
                <ResultCard label="Refund / Owe" value={result?`${Number(result.refundOrOwed).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🧾 2026 Income Tax Estimator USA — All Income Sources</h2><p className="text-sm text-gray-600">Estimate your complete 2026 federal income tax from all sources — wages, self-employment, investments — and see your refund or amount owed.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="2026 Federal Income Tax Estimator" category="finance"
          intro="Combines wages, self-employment income and other income, subtracts a standard-or-entered deduction, calculates progressive federal income tax, adds simplified self-employment tax, subtracts credits and compares the result with withholding."
          howItWorks="AGI starts with total entered income less half of modeled self-employment tax. Taxable income then subtracts the larger of the filing-status standard deduction or entered deductions. Progressive 2026 brackets are applied to taxable income before credits and withholding."
          tipsSection="Worked example — Example: $85,000 wages plus $5,000 other income is first reduced by the applicable deduction; only the portions falling inside each bracket are taxed at that bracket’s rate."
          conclusion="Important assumptions and limitations — This is a simplified federal estimate. It does not model every adjustment, credit, capital-gain rate, NIIT, Additional Medicare Tax, QBI rule or state tax. Self-employment tax also needs wage-base coordination when wages and SE earnings coexist."
          benefits={[
            {title:"What the inputs mean",text:"Use the fields above to model the specific amounts, rates, ages or time horizon described for this calculator."},
            {title:"How to read the results",text:"Treat the outputs as scenario estimates and focus on which assumptions drive the result most strongly."},
            {title:"Decision support",text:"Compare realistic scenarios rather than treating a single result as a prediction or professional recommendation."},
          ]}
          useCases={[
            {title:"Worked scenario",text:"Start with the default example, then replace each input with values that match the situation you are evaluating."},
            {title:"Assumption check",text:"Review the methodology and limitations before relying on the result for a financial, tax, benefit or investment decision."},
          ]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
