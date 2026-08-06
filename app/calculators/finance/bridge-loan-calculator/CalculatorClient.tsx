'use client'
import { useState, useMemo } from 'react'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { calculateBridgeLoan } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [currentHomeValue, setCurrentHomeValue] = useState(480000)
  const [currentMortgageBalance, setCurrentMortgageBalance] = useState(220000)
  const [newHomePrice, setNewHomePrice] = useState(550000)
  const [bridgeLoanRate, setBridgeLoanRate] = useState(9.5)
  const [expectedSaleMonths, setExpectedSaleMonths] = useState(4)
  const result = useMemo(()=>{try{return calculateBridgeLoan(currentHomeValue,currentMortgageBalance,newHomePrice,bridgeLoanRate,expectedSaleMonths)}catch(e){return null}},[currentHomeValue, currentMortgageBalance, newHomePrice, bridgeLoanRate, expectedSaleMonths])
  return (
    <CalculatorLayout title="Bridge Loan Calculator USA 2026" description="Bridge Loan Calculator USA 2026" icon="🌉" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="bridge-loan-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Currenthomevalue</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentHomeValue} onChange={e=>setCurrentHomeValue(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Currentmortgagebalance</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentMortgageBalance} onChange={e=>setCurrentMortgageBalance(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Newhomeprice</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={newHomePrice} onChange={e=>setNewHomePrice(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Bridgeloanrate</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={bridgeLoanRate} onChange={e=>setBridgeLoanRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Expectedsalemonths</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={expectedSaleMonths} onChange={e=>setExpectedSaleMonths(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Current Equity" value={result?`${Number(result.currentEquity).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Bridge Loan Amount" value={result?`${Number(result.bridgeLoanAmount).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Monthly Interest" value={result?`${Number(result.monthlyInterest).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Total Interest" value={result?`${Number(result.totalInterestCost).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Origination Fee" value={result?`${Number(result.originationFee).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Total Bridge Cost" value={result?`${Number(result.totalBridgeCost).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🌉 Bridge Loan Calculator USA 2026</h2><p className="text-sm text-gray-600">Enter your values above to see Bridge Loan Calculator output using 2026 Calculator methodology and assumptions. All calculations run locally in your browser.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <div className="space-y-6 text-sm text-gray-700 leading-7">
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">How this bridge-loan estimate works</h2><p>The calculator first estimates current home equity as home value minus the outstanding mortgage. It then models a bridge amount as the smaller of 80% of that equity or 20% of the new-home price. Interest is modeled as simple monthly interest for the expected sale period, and the current implementation adds a 1.5% illustrative origination fee.</p><p className="mt-3"><strong>Formulas:</strong> Equity = Current home value − Mortgage balance. Monthly interest = Bridge amount × annual rate ÷ 12. Total modeled bridge cost = monthly interest × months outstanding + origination fee.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">Understanding the inputs</h2><p><strong>Current home value</strong> affects available equity; use a realistic market estimate rather than an optimistic asking price. <strong>Mortgage balance</strong> is the amount still owed, not the original loan. <strong>New home price</strong> sets the modeled 20% funding need. <strong>Bridge rate</strong> and <strong>months until sale</strong> directly drive interest cost, so a delayed sale can materially increase the estimate.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">Worked example</h2><p>With a $480,000 current home, a $220,000 mortgage, and a $550,000 purchase, modeled equity is $260,000. Eighty percent of that equity is $208,000, while 20% of the new-home price is $110,000, so this calculator uses a $110,000 bridge amount. At 9.5% for four months, simple interest is about $3,483; the modeled 1.5% fee adds $1,650, for an estimated bridge cost of about $5,133.</p></Card>
          <Card><h2 className="text-xl font-black text-gray-900 mb-3">Important limitations and alternatives</h2><p>Actual bridge products vary by lender: maximum combined loan-to-value, fees, appraisal requirements, repayment structure, interest compounding, and whether payments are deferred can all differ. The model also excludes closing costs and the risk that the existing home takes longer to sell. A HELOC is a different product that also borrows against home equity and may be worth comparing where available.</p><p className="mt-3"><strong>Consumer reference:</strong> <a className="text-green-700 underline" href="https://www.consumerfinance.gov/ask-cfpb/what-is-a-home-equity-line-of-credit-heloc-en-107/" target="_blank" rel="noreferrer">CFPB guide to HELOCs and home equity</a>.</p></Card>
        </div>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
