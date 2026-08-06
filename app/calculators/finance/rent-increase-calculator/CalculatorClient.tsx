'use client'
import { calculateRentIncrease } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [currentRent, setCurrentRent] = useState(2200)
  const [annualIncrease, setAnnualIncrease] = useState(8)
  const [marketRent, setMarketRent] = useState(2500)
  const [moveOutCosts, setMoveOutCosts] = useState(4500)
  const [newPlaceRent, setNewPlaceRent] = useState(2350)

  const result = useMemo(()=>{
    try{return calculateRentIncrease(currentRent, 12, annualIncrease, marketRent, moveOutCosts, newPlaceRent)}catch(e){return null}
  },[currentRent, annualIncrease, marketRent, moveOutCosts, newPlaceRent])

  return (
    <CalculatorLayout title="Rent Increase Calculator USA 2026 — Stay or Move?" description="Calculate whether to accept a rent increase or move. Compare total cost of staying vs moving, break-even months, and market rent comparison." icon="🏠" category="Finance" relatedCalculators={relatedCalculators} slug="rent-increase-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Monthly Rent ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentRent} onChange={e=>setCurrentRent(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Rent Increase (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={annualIncrease} onChange={e=>setAnnualIncrease(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Market Rent for Similar Unit ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={marketRent} onChange={e=>setMarketRent(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Moving Costs ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={moveOutCosts} onChange={e=>setMoveOutCosts(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">New Place Monthly Rent ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={newPlaceRent} onChange={e=>setNewPlaceRent(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="New Rent After Increase" value={result ? `${Number(result.newRent).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} highlight />
                <ResultCard label="Monthly Increase" value={result ? `${Number(result.increaseAmount).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Annual Extra Cost" value={result ? `${Number(result.annualExtra).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="vs Market Rate" value={result ? `${Number(result.vsMarket).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Months to Break Even if Moving" value={result ? `${Number(result.monthsToBreakEven).toLocaleString()} months` : "—"} />
                <ResultCard label="Better Option" value={result ? String(result.betterOption) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏠 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">When your landlord raises the rent, the move-or-stay decision comes down to simple math: is the total cost of moving (first month + last month + security deposit + moving truck + time lost) less than the total extra rent you'll pay over your next lease term? This calculator gives you the exact break-even point.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Rent Increase Calculator USA 2026 — Stay or Move?" category="finance"
          intro="This calculator compares the next 12 months of staying at an increased rent with moving to a specified alternative after one-time moving costs. It also shows how the increased rent compares with the market-rent estimate you enter."
          howItWorks="New rent = current rent × (1 + increase%). Staying cost = new rent × 12. Moving cost = alternative rent × 12 + moving costs. Break-even months = moving costs ÷ absolute monthly rent difference. The current function receives lease months but still performs a 12-month cost comparison."
          tipsSection="Include deposits or fees only when they are true economic costs rather than refundable transfers. Also consider commute, utilities, concessions and likely future increases. This calculator does not determine whether a rent increase complies with local law."
          conclusion="The output identifies the cash-cost crossover under your assumptions. A small annual difference may not justify moving once nonfinancial costs and uncertainty are considered."
          benefits={[
            {title:"Real-Time USA Results",text:"Uses the calculator-specific assumptions shown on this page."},
            {title:"100% Private",text:"Everything runs in your browser. No data stored or transmitted."},
            {title:"Free Forever",text:"No signup, no paywall, no hidden costs."},
          ]}
          useCases={[
            {title:"Personal Planning",text:"Use your own inputs to test this specific calculation."},
            {title:"Scenario Comparison",text:"Change one relevant input at a time and compare the modeled output."},
          ]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
