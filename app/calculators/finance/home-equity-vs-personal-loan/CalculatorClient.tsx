'use client'
import {useState,useMemo} from 'react'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateHomeEquityVsPersonalLoan } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [borrowAmount,setBorrowAmount]=useState(30000)
  const [homeEquityRate,setHomeEquityRate]=useState(8.25)
  const [personalLoanRate,setPersonalLoanRate]=useState(14.5)
  const [termMonths,setTermMonths]=useState(60)
  const [taxRate,setTaxRate]=useState(24)
  const [homeValue,setHomeValue]=useState(450000)
  const [mortgageBalance,setMortgageBalance]=useState(280000)
  const result=useMemo(()=>{try{return calculateHomeEquityVsPersonalLoan(borrowAmount,homeEquityRate,personalLoanRate,termMonths,taxRate,homeValue,mortgageBalance)}catch(e){return null}},[borrowAmount, homeEquityRate, personalLoanRate, termMonths, taxRate, homeValue, mortgageBalance])
  return(
    <CalculatorLayout title="Home Equity Loan vs Personal Loan Calculator USA 2026" description="Compare home equity loan vs personal loan — monthly payment, total interest, tax deductibility, and the risk trade-off of secured vs unsecured borrowing." icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="home-equity-vs-personal-loan">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Borrow Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={borrowAmount} onChange={e=>setBorrowAmount(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Home Equity Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={homeEquityRate} onChange={e=>setHomeEquityRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Personal Loan Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={personalLoanRate} onChange={e=>setPersonalLoanRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Term (months)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={termMonths} onChange={e=>setTermMonths(Number(e.target.value))} step={12} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">months</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Home Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={homeValue} onChange={e=>setHomeValue(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Mortgage Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={mortgageBalance} onChange={e=>setMortgageBalance(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="HE Monthly Payment" value={result?`${Number(result.heMonthlyPayment).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"} highlight/>
                <ResultCard label="Personal Loan Payment" value={result?`${Number(result.plMonthlyPayment).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"}/>
                <ResultCard label="Interest Savings (HE)" value={result?`${Number(result.interestSavingsHE).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Monthly Savings" value={result?`${Number(result.monthlySavingsWithHE).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"}/>
                <ResultCard label="CLTV Ratio" value={result?`${Number(result.cltv).toFixed(1)}%`:"-"}/>
                <ResultCard label="Better Option" value={result?String(result.betterOption):"-"}/>
            </div>
            <Card><h2 className="text-lg font-black text-gray-900 mb-2">⚖️ Home Equity Loan vs Personal Loan Calculator USA 2026</h2><p className="text-sm text-gray-600">Compare home equity loan vs personal loan — monthly payment, total interest, tax deductibility, and the risk trade-off of secured vs unsecured borrowing.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Home Equity Loan vs Personal Loan Calculator USA 2026" category="finance" intro="Compare home equity loan vs personal loan — monthly payment, total interest, tax deductibility, and the risk trade-off of secured vs unsecured borrowing." howItWorks="Enter values for instant results." tipsSection="Try different scenarios." conclusion="Consult a financial advisor."
          benefits={[{title:"Real-Time",text:"2026 calcs."},{title:"Private",text:"Local."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model it."},{title:"Compare",text:"See impact."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
