'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateVariableAnnuityFees } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [investedAmount, setInvestedAmount] = useState(200000)
  const [subaccountReturn, setSubaccountReturn] = useState(8)
  const [mortalityExpense, setMortalityExpense] = useState(1.25)
  const [adminFee, setAdminFee] = useState(0.25)
  const [riderFees, setRiderFees] = useState(0.75)
  const [surrenderYears, setSurrenderYears] = useState(7)
  const [years, setYears] = useState(20)
  const result=useMemo(()=>{try{return calculateVariableAnnuityFees(investedAmount,subaccountReturn,mortalityExpense,adminFee,riderFees,surrenderYears,years)}catch(e){return null}},[investedAmount, subaccountReturn, mortalityExpense, adminFee, riderFees, surrenderYears, years])
  return(
    <CalculatorLayout title="Variable Annuity Fee Calculator USA 2026" description="Calculate the true long-term cost of variable annuity fees including M&E, admin, and rider charges vs low-cost ETF alternative." icon="📅" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="variable-annuity-fee-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Invested Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={investedAmount} onChange={e=>setInvestedAmount(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Subaccount Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={subaccountReturn} onChange={e=>setSubaccountReturn(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">M&E Fee (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={mortalityExpense} onChange={e=>setMortalityExpense(Number(e.target.value))} step={0.05} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Admin Fee (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={adminFee} onChange={e=>setAdminFee(Number(e.target.value))} step={0.05} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Rider Fees (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={riderFees} onChange={e=>setRiderFees(Number(e.target.value))} step={0.05} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Surrender Period (years)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={surrenderYears} onChange={e=>setSurrenderYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={years} onChange={e=>setYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Annual Fee" value={result?`${Number(result.totalAnnualFee).toFixed(1)}%`:"-"} highlight/>
                <ResultCard label="Net Return" value={result?`${Number(result.netReturn).toFixed(1)}%`:"-"}/>
                <ResultCard label="Final Value" value={result?`${Number(result.finalValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total Fee Impact" value={result?`${Number(result.feeImpact).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="ETF Alternative" value={result?`${Number(result.alternativeETF).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Fee Drag vs ETF" value={result?`${Number(result.feeDrag).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📅 Variable Annuity Fee Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate the true long-term cost of variable annuity fees including M&E, admin, and rider charges vs low-cost ETF alternative.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Variable Annuity Fee Calculator USA 2026" category="finance" intro="See how annual variable-annuity charges can compound into a meaningful difference in ending account value. Enter the assumed subaccount return plus mortality/expense, administration and rider charges to compare gross growth with growth after the modeled fee load." howItWorks="The calculator subtracts the entered annual charges from the assumed subaccount return and compounds both gross and net scenarios. It separately estimates a surrender charge from the entered surrender period and compares the result with a hypothetical investment charging 0.10% annually. Real annuity contracts can use different fee bases and surrender schedules." tipsSection="Change one assumption at a time and compare the result with the underlying contract, tax rule, lender terms, or official source before making a decision." conclusion="Consult a financial advisor for personalized advice."
          benefits={[{title:"Real-Time",text:"2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
