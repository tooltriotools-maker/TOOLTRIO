'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateSideHustleBreakeven } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [startupCosts, setStartupCosts] = useState(3500)
  const [monthlyExpenses, setMonthlyExpenses] = useState(250)
  const [pricePerUnit, setPricePerUnit] = useState(45)
  const [costPerUnit, setCostPerUnit] = useState(18)
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [hourlyOpportunityCost, setHourlyOpportunityCost] = useState(35)
  const result = useMemo(()=>{try{return calculateSideHustleBreakeven(startupCosts,monthlyExpenses,pricePerUnit,costPerUnit,hoursPerWeek,hourlyOpportunityCost)}catch(e){return null}},[startupCosts, monthlyExpenses, pricePerUnit, costPerUnit, hoursPerWeek, hourlyOpportunityCost])
  return (
    <CalculatorLayout title="Side Hustle Break-Even Calculator USA 2026" description="Side Hustle Break-Even Calculator USA 2026" icon="💡" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="side-hustle-breakeven-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Startup Costs</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={startupCosts} onChange={e=>setStartupCosts(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Fixed Expenses</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={monthlyExpenses} onChange={e=>setMonthlyExpenses(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Price per Unit</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={pricePerUnit} onChange={e=>setPricePerUnit(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Variable Cost per Unit</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={costPerUnit} onChange={e=>setCostPerUnit(Number(e.target.value))} step={2} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Hours per Week</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={hoursPerWeek} onChange={e=>setHoursPerWeek(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Hourly Opportunity Cost</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={hourlyOpportunityCost} onChange={e=>setHourlyOpportunityCost(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Contribution Margin" value={result?`${Number(result.contributionMargin).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Break-Even Units/Mo" value={result?String(result.breakEvenUnitsMonthly):"-"} />
                <ResultCard label="True Break-Even (w/ time)" value={result?String(result.trueBreakEvenUnits):"-"} />
                <ResultCard label="Monthly Opp. Cost" value={result?`${Number(result.opportunityCostMonthly).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Annual Opp. Cost" value={result?`${Number(result.annualOpportunityCost).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">Understanding these results</h2><p className="text-sm text-gray-600">Calculate the monthly sales volume needed for a side hustle to cover cash overhead, then add the economic value of your own time to see a second 'true' break-even target. The tool is designed for unit-based work such as products, appointments or fixed-price gigs.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Side Hustle Break-Even Calculator" category="finance"
          intro="Calculate the monthly sales volume needed for a side hustle to cover cash overhead, then add the economic value of your own time to see a second 'true' break-even target. The tool is designed for unit-based work such as products, appointments or fixed-price gigs."
          howItWorks="Contribution margin per unit = selling price − variable cost per unit. Cash break-even units per month = monthly expenses ÷ contribution margin. Monthly opportunity cost = hours per week × 4.33 × hourly opportunity-cost rate. True break-even units = (monthly expenses + opportunity cost) ÷ contribution margin."
          tipsSection="Startup cost is shown separately, but the existing months-to-recoup calculation is not a reliable payback-period measure because it uses break-even volume, where monthly operating profit is approximately zero. Treat the monthly unit targets as the useful outputs. The model also excludes income/self-employment taxes, demand limits, refunds, payment fees and changing costs unless you include them in your inputs."
          conclusion="A side hustle can cover its cash bills while still paying poorly for the owner's time. Compare the cash break-even target with the time-adjusted target, then test whether the required monthly sales are realistic for your available hours and market."
          benefits={[{title:"Methodology",text:"Explains the exact assumptions used by this ToolTrio model."},{title:"Scenario testing",text:"Change the inputs to see which assumptions drive the result."},{title:"Limitations",text:"Highlights important factors the simplified model does not capture."}]}
          useCases={[{title:"Planning",text:"Build a calculator-specific baseline from your own inputs."},{title:"Sensitivity check",text:"Compare a conservative scenario with a more optimistic one."}]}
          caseStudy={{title:"Worked example",scenario:"Small product side business — Assume $3,500 startup cost, $250 monthly overhead, $45 selling price, $18 variable cost, 10 hours per week and a $35 hourly opportunity cost.",result:"Contribution margin is $27 per sale. Cash overhead requires about 9.3 sales per month before rounding; adding roughly $1,516 of monthly time value raises the economic break-even target substantially.",takeaway:"Use the example to understand the calculation flow, then replace every assumption with values relevant to your situation."}} />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
