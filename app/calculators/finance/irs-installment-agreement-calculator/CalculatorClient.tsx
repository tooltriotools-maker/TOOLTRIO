'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateIRSInstallmentAgreement } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [taxOwed, setTaxOwed] = useState(25000)
  const [canPayMonthly, setCanPayMonthly] = useState(400)
  const result=useMemo(()=>{try{return calculateIRSInstallmentAgreement(taxOwed,canPayMonthly,true)}catch(e){return null}},[taxOwed, canPayMonthly])
  return(
    <CalculatorLayout title="IRS Installment Agreement Calculator USA 2026" description="Calculate IRS installment agreement payments, penalty and interest costs, and total amount owed under a payment plan." icon="📋" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="irs-installment-agreement-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Tax Owed ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxOwed} onChange={e=>setTaxOwed(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Monthly Payment Possible ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={canPayMonthly} onChange={e=>setCanPayMonthly(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Owed (w/ penalty & interest)" value={result?`${Number(result.totalOwed).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Monthly Payment" value={result?`${Number(result.monthlyPayment).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"}/>
                <ResultCard label="Months to Pay Off" value={result?`${Number(result.monthsToPayoff)} months`:"-"}/>
                <ResultCard label="Setup Fee" value={result?`${Number(result.setupFee).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Extra Cost vs Pay Now" value={result?`${Number(result.extraCostVsPayNow).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Min Payment for 72-Mo Plan" value={result?`${Number(result.threshold72Month).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📋 IRS Installment Agreement Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate IRS installment agreement payments, penalty and interest costs, and total amount owed under a payment plan.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="IRS Installment Agreement Calculator USA 2026" category="finance" intro="Calculate IRS installment agreement payments, penalty and interest costs, and total amount owed under a payment plan." howItWorks="Enter values for instant 2026 US-standard results." tipsSection="Try different scenarios." conclusion="Consult a financial advisor for personalized advice."
          benefits={[{title:"Real-Time",text:"2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
