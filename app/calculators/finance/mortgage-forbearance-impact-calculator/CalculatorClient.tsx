'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateMortgageForbearanceImpact } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [originalBalance, setOriginalBalance] = useState(385000)
  const [monthlyPayment, setMonthlyPayment] = useState(2450)
  const [rate, setRate] = useState(6.75)
  const [forbearanceMonths, setForbearanceMonths] = useState(6)
  const result=useMemo(()=>{try{return calculateMortgageForbearanceImpact(originalBalance,monthlyPayment,rate,forbearanceMonths,'deferral')}catch(e){return null}},[originalBalance, monthlyPayment, rate, forbearanceMonths])
  return(
    <CalculatorLayout title="Mortgage Forbearance Impact Calculator USA 2026" description="Calculate the true cost of mortgage forbearance including interest accrual and long-term impact on total loan cost." icon="🏠" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="mortgage-forbearance-impact-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Current Loan Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={originalBalance} onChange={e=>setOriginalBalance(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Monthly Payment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyPayment} onChange={e=>setMonthlyPayment(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Interest Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={rate} onChange={e=>setRate(Number(e.target.value))} step={0.125} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Forbearance Months</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={forbearanceMonths} onChange={e=>setForbearanceMonths(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Interest Accrued" value={result?`${Number(result.interestAccrued).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Missed Payments Total" value={result?`${Number(result.missedPayments).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="New Balance" value={result?`${Number(result.newBalance).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Long-Term Cost" value={result?`${Number(result.longTermCost).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🏠 Mortgage Forbearance Impact Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate the true cost of mortgage forbearance including interest accrual and long-term impact on total loan cost.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Mortgage Forbearance Impact Calculator USA 2026" category="finance" intro="Estimate what happens to missed mortgage payments and simple interest during a temporary payment pause under three modeled exit paths: lump sum, deferral or modification." howItWorks="Simple accrued interest = original balance × monthly interest rate × months in forbearance. Missed payments = regular payment × paused months. The lump-sum scenario combines those amounts. The modification scenario adds modeled accrued interest to balance and recalculates a fresh 30-year payment; the deferral scenario leaves the modeled balance unchanged." tipsSection="Real servicer accounting can differ materially: interest, escrow shortages, fees, remaining term and agency rules depend on the loan and agreement. CFPB notes that forbearance does not erase missed amounts and that repayment options can include repayment plans, deferral/partial claim, modification or reinstatement." conclusion="Do not interpret the “one option” label as advice. Ask your servicer for the exact post-forbearance terms available on your loan."
          benefits={[{title:"Method",text:"Explains the calculation actually used on this page."},{title:"Inputs",text:"Shows which assumptions drive the result."},{title:"Limits",text:"Calls out important exclusions and simplifications."}]}
          useCases={[{title:"Scenario planning",text:"Compare realistic input combinations."},{title:"Decision support",text:"Understand the trade-offs behind the outputs."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
