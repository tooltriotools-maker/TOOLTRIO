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
    <CalculatorLayout title="Crypto Profit Loss Tracker USA 2026 — Cost Basis & Tax" description="Track cryptocurrency buy/sell transactions, calculate average cost basis, realized gains, and estimated tax owed using FIFO method." icon="₿" category="Finance" relatedCalculators={relatedCalculators} slug="crypto-profit-loss-tracker">
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
                <p className="text-sm text-gray-600 leading-relaxed">Cryptocurrency tax tracking requires accurate cost basis records for every transaction. The IRS treats crypto as property — every sale, swap, or use triggers a taxable event. This calculator models buy/sell transactions using an average-cost approximation, calculates realized gains, and estimates taxes at both short-term (ordinary income) and long-term (15%) rates.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="Crypto Profit Loss Tracker USA 2026 — Cost Basis & Tax"
          category="finance"
          intro="This tracker summarizes a list of crypto buys and sells into total units bought, total cost, average purchase cost, sale proceeds, realized gain and remaining units. Despite the older page wording, the current code uses an average-cost approximation for sales—it does not perform FIFO tax-lot matching. That distinction matters for U.S. tax reporting."
          howItWorks="Buys increase total units and total cost. For each sale, the code calculates average purchase cost as accumulated cost ÷ accumulated units and estimates realized gain as units sold × (sale price − that average). It then displays illustrative tax amounts at flat 15% and 32% rates. Dates are stored but are not used to classify each disposed lot as short- or long-term."
          tipsSection="Do not use the displayed tax estimate as a tax return calculation. Actual digital-asset basis depends on the units disposed, transaction costs and identification records. This tracker also does not validate that cumulative sales stay within units owned, and it does not model income from staking, mining, forks or payments for services."
          conclusion="Use this page for portfolio-level scenario tracking, then reconcile each taxable disposition against exchange/wallet records and current IRS digital-asset reporting guidance."
          benefits={[
            { title: "Methodology", text: "See the exact assumptions and calculation sequence used by this ToolTrio model." },
            { title: "Result interpretation", text: "Understand what the outputs mean and which important factors the model leaves out." },
            { title: "Scenario testing", text: "Change the calculator inputs to see which assumptions materially move the result." },
          ]}
          useCases={[
            { title: "Decision comparison", text: "Compare realistic alternatives while keeping the model's assumptions visible." },
            { title: "Assumption check", text: "Use the worked example to verify how the calculator turns inputs into outputs." },
          ]}
          caseStudy={{
            title: "Two purchases and a partial sale",
            scenario: "If accumulated purchases total 1 BTC at a $40,000 average cost and 0.25 BTC is sold at $60,000, this model assigns $10,000 of average cost to the sale.",
            result: "Estimated realized gain is $5,000 before transaction costs; remaining modeled holdings are 0.75 BTC.",
            takeaway: "Actual tax-lot identification can produce a different basis and holding period than this average-cost approximation."
          }}
          commonMistakes="Do not use the displayed tax estimate as a tax return calculation. Actual digital-asset basis depends on the units disposed, transaction costs and identification records. This tracker also does not validate that cumulative sales stay within units owned, and it does not model income from staking, mining, forks or payments for services."
          inlineLinks={[{ text: "IRS treats digital assets as property and explains basis and gain/loss concepts.", href: "https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-digital-asset-transactions", label: "IRS digital-asset FAQs" }]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
