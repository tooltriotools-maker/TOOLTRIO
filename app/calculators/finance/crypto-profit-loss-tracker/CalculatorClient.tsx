'use client'
import { calculateCryptoProfitLossTracking } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [startPrice, setStartPrice] = useState(42000)
  const [endPrice, setEndPrice] = useState(68000)
  const [totalAmount, setTotalAmount] = useState(10000)

  const result = useMemo(()=>{
    try{return calculateCryptoProfitLossTracking([{date:'2024-01-01',type:'buy',amount:totalAmount/startPrice,price:startPrice},{date:'2024-08-01',type:'sell',amount:totalAmount/startPrice*0.6,price:endPrice}])}catch(e){return null}
  },[startPrice, endPrice, totalAmount])

  return (
    <CalculatorLayout title="Crypto Profit Loss Tracker USA 2026 — Cost Basis & Tax" description="Track cryptocurrency buy/sell transactions, calculate average cost basis, realized gains, and estimated tax owed using FIFO method." icon="₿" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="crypto-profit-loss-tracker">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Buy Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={startPrice} onChange={e=>setStartPrice(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Sell Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={endPrice} onChange={e=>setEndPrice(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Amount Bought</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={totalAmount} onChange={e=>setTotalAmount(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Cost Basis" value={result ? `${Number(result.totalCostBasis).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Total Proceeds" value={result ? `${Number(result.totalProceeds).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Realized Gain" value={result ? `${Number(result.realizedGain).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Tax at LT Rate (15%)" value={result ? `${Number(result.taxAtLTCG).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Tax at ST Rate (32%)" value={result ? `${Number(result.taxAtSTCG).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Wash Sale Rule" value={result ? String(result.washSaleNote) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">₿ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Cryptocurrency tax tracking requires accurate cost basis records for every transaction. The IRS treats crypto as property — every sale, swap, or use triggers a taxable event. This calculator models buy/sell transactions using FIFO cost basis, calculates realized gains, and estimates taxes at both short-term (ordinary income) and long-term (15%) rates.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Crypto Profit Loss Tracker USA 2026 — Cost Basis & Tax" category="finance" intro="Cryptocurrency tax tracking requires accurate cost basis records for every transaction. The IRS treats crypto as property — every sale, swap, or use triggers a taxable event. This calculator models buy/sell transactions using FIFO cost basis, calculates realized gains, and estimates taxes at both short-term (ordinary income) and long-term (15%) rates."
          howItWorks="Enter your values and results update instantly using 2026 US-standard formulas."
          tipsSection="Try multiple scenarios by changing one input at a time."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor."
          benefits={[{title:"Real-Time USA Results",text:"Instant 2026 IRS calculations."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation."},{title:"Scenario Comparison",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
