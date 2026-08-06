'use client'
import { calculateBondLadder } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [totalAmount, setTotalAmount] = useState(100000)
  const [rungs, setRungs] = useState(5)
  const [startYield, setStartYield] = useState(4.5)
  const [yieldStep, setYieldStep] = useState(0.25)

  const result = useMemo(()=>{
    try{return calculateBondLadder(totalAmount, rungs, startYield, yieldStep, true)}catch(e){return null}
  },[totalAmount, rungs, startYield, yieldStep])

  return (
    <CalculatorLayout title="Bond Ladder Calculator USA 2026 — CD and Treasury Ladder" description="Build a bond or CD ladder: calculate yield at each rung, annual liquidity events, total interest earned, and reinvestment value." icon="📊" category="Finance" relatedCalculators={relatedCalculators} slug="bond-ladder-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Total Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={totalAmount} onChange={e=>setTotalAmount(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Number of Rungs</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={rungs} onChange={e=>setRungs(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Shortest Yield (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={startYield} onChange={e=>setStartYield(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Yield Step per Rung (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={yieldStep} onChange={e=>setYieldStep(Number(e.target.value))} step={0.05} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Amount Per Rung" value={result ? `${Number(result.amountPerRung).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Average Yield" value={result ? `${Number(result.avgYield).toFixed(1)}%` : "—"} />
                <ResultCard label="Total Interest Earned" value={result ? `${Number(result.totalInterest).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Reinvested Final Value" value={result ? `${Number(result.reinvestedValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📊 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">A bond ladder spreads fixed-income investments across multiple maturity dates, ensuring liquidity at regular intervals while capturing yield across the curve. With 2026 Treasury yields at 4-5%, a $100,000 ladder generates $4,000-$5,000/year in interest — far better than traditional savings accounts. This calculator shows your annual liquidity events, total interest, and reinvestment value.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Bond Ladder Calculator USA 2026 — CD and Treasury Ladder" category="finance"
          intro="Build an equal-dollar bond or CD ladder with staggered maturities. The calculator shows how much is placed in each rung, assigns a modeled yield to each maturity, estimates simple interest to maturity, and illustrates annual liquidity as rungs mature."
          howItWorks="Amount per rung = Total Amount ÷ Number of Rungs. The yield for rung i is Start Yield + Yield Step × i. The model estimates Interest = Rung Amount × Yield × Years to Maturity. If reinvestment is enabled in the underlying calculation, it compounds the total amount at the ladder’s average modeled yield for the number of rungs."
          tipsSection="Use yields that match securities you can actually buy at each maturity. Treasury, CD and corporate-bond ladders have different credit, call, liquidity, insurance and tax characteristics. Reinvestment rates at future maturities are unknown."
          conclusion="A ladder can spread maturity dates and reinvestment timing, but it does not eliminate interest-rate or credit risk. The calculator’s upward yield step is an input assumption, not a forecast of the yield curve."
          benefits={[{title:"Methodology",text:"Explains the calculation actually used on this page."},{title:"Scenario planning",text:"Change inputs to see which assumptions drive the result."},{title:"Private",text:"Calculations run locally in your browser."}]}
          useCases={[{title:"Worked scenario",text:"Use realistic inputs and compare the output with the methodology."},{title:"Decision support",text:"Use the result as an estimate, then verify rules, rates or product terms that apply to you."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
