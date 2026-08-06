'use client'
import { calculateCoveredCall } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [sharesOwned, setSharesOwned] = useState(500)
  const [currentPrice, setCurrentPrice] = useState(85)
  const [strikePrice, setStrikePrice] = useState(90)
  const [premium, setPremium] = useState(2.5)
  const [daysToExpiry, setDaysToExpiry] = useState(30)

  const result = useMemo(()=>{
    try{return calculateCoveredCall(sharesOwned, currentPrice, strikePrice, premium, daysToExpiry)}catch(e){return null}
  },[sharesOwned, currentPrice, strikePrice, premium, daysToExpiry])

  return (
    <CalculatorLayout title="Covered Call Calculator USA 2026 — Options Income Strategy" description="Calculate covered call premium income, annualized yield, maximum profit, break-even price, and contracts available on your stock position." icon="📊" category="Finance" relatedCalculators={relatedCalculators} slug="covered-call-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Shares Owned</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={sharesOwned} onChange={e=>setSharesOwned(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Stock Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentPrice} onChange={e=>setCurrentPrice(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Strike Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={strikePrice} onChange={e=>setStrikePrice(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Option Premium ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={premium} onChange={e=>setPremium(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Days to Expiry</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={daysToExpiry} onChange={e=>setDaysToExpiry(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">days</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Premium Received" value={result ? `${Number(result.totalPremiumReceived).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Annualized Yield" value={result ? `${Number(result.annualizedYield).toFixed(1)}%` : "—"} />
                <ResultCard label="Max Profit" value={result ? `${Number(result.maxProfit).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Break-Even Price" value={result ? `${Number(result.breakEven).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Contracts Writable" value={result ? String(result.contractsWritable) : "—"} />
                <ResultCard label="Contract Value Each" value={result ? `${Number(result.contractValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📊 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Covered calls turn stock you already own into an income-generating machine. Selling a 30-day call on 500 shares at $2.50/share generates $1,250 in immediate income — 1.47% on a $85,000 position in one month, or ~17% annualized. This calculator shows your exact income, annualized yield, and maximum profit on any covered call position.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="Covered Call Calculator" category="finance"
          intro="This tool measures premium income, annualized premium yield, maximum profit and break-even price for covered calls written against shares you already own."
          howItWorks="Contracts writable = floor(shares ÷ 100). Premium income = option premium × 100 × contracts. Break-even = stock price − premium. Maximum profit assumes assignment at the strike: (strike − current price + premium) × 100 × contracts."
          tipsSection="Worked example: Example: 300 shares at $50 with a $55 strike and $2 premium supports 3 contracts and $600 of premium. If assigned, the modeled maximum profit is ($55 − $50 + $2) × 300 = $2,100."
          conclusion="Important assumptions and limitations: The model ignores commissions, taxes, dividends, early assignment, option liquidity and changes in implied volatility. Annualizing a short option premium does not mean the same yield can be repeated all year."
          benefits={[{title:"Methodology",text:"The explanation above follows the calculation actually performed by this page."},{title:"Interpret the output",text:"Treat the result as a scenario estimate and test the assumptions that matter most."},{title:"Privacy",text:"Calculator inputs are processed in your browser."}]}
          useCases={[{title:"Decision support",text:"Compare the calculator-specific trade-offs before taking the next step."},{title:"Scenario testing",text:"Change one relevant input at a time and observe which output is most sensitive."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
