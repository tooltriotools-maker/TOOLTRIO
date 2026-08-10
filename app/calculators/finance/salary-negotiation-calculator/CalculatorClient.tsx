'use client'
import { calculateSalaryNegotiation } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [currentSalary, setCurrentSalary] = useState(85000)
  const [offerSalary, setOfferSalary] = useState(95000)
  const [bonusPercent, setBonusPercent] = useState(10)
  const [equityValue, setEquityValue] = useState(80000)
  const [benefits401k, setBenefits401k] = useState(4)
  const [pto, setPto] = useState(20)
  const [costOfLivingDiff, setCostOfLivingDiff] = useState(0)

  const result = useMemo(()=>{
    try{return calculateSalaryNegotiation(currentSalary, offerSalary, bonusPercent, equityValue, benefits401k, 18000, pto, costOfLivingDiff)}catch(e){return null}
  },[currentSalary, offerSalary, bonusPercent, equityValue, benefits401k, pto, costOfLivingDiff])

  return (
    <CalculatorLayout title="Salary Negotiation Calculator USA 2026 — Total Compensation" description="Calculate the full value of a job offer including base, bonus, equity, 401k match, benefits, and PTO. Compare total comp and find your counter-offer." icon="🤝" category="Finance" relatedCalculators={relatedCalculators} slug="salary-negotiation-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Salary ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentSalary} onChange={e=>setCurrentSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">New Offer Salary ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={offerSalary} onChange={e=>setOfferSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Bonus % (same both)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={bonusPercent} onChange={e=>setBonusPercent(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Equity Value (4yr vest $)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={equityValue} onChange={e=>setEquityValue(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">New 401k Match (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={benefits401k} onChange={e=>setBenefits401k(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">PTO Days</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={pto} onChange={e=>setPto(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">days</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Cost of Living Difference (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={costOfLivingDiff} onChange={e=>setCostOfLivingDiff(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Current Total Comp" value={result ? `${Number(result.totalCurrent).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Offer Total Comp" value={result ? `${Number(result.totalOffer).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Adjusted Offer (COL)" value={result ? `${Number(result.adjustedOffer).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Difference" value={result ? `${Number(result.difference).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="% Increase" value={result ? `${Number(result.percentIncrease).toFixed(1)}%` : "—"} />
                <ResultCard label="Suggested Counter" value={result ? `${Number(result.counterOffer).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🤝 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Salary negotiation requires comparing total compensation — base, bonus, equity, 401k match, health benefits, and PTO — not just headline salary. A $95,000 offer with 50% equity vesting and 6% 401k match can be worth $30,000 more annually than a $100,000 offer with minimal benefits. This calculator gives you the full picture and a data-backed counter-offer.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title={"Salary Negotiation Calculator"}
          category="finance"
          intro={'This calculator compares an existing job with an offer using base salary, bonus percentage, annualized equity, 401(k) benefit, a fixed health-benefit value, PTO and a cost-of-living adjustment. It is a compensation-modeling tool, not a market-salary database.'}
          howItWorks={'Current compensation = current salary plus the entered bonus percentage, entered current benefit value, a fixed $18,000 health-benefit value, and PTO valued at salary ÷ 260 per day. Offer compensation adds bonus, one-fourth of entered equity value, 401(k) benefit as a percentage of offer salary, the same fixed health value and PTO. The offer is then reduced by the entered cost-of-living difference.'}
          tipsSection={'The client currently passes $18,000 as health-benefit value and treats equity value as vesting evenly over four years. The counter-offer output is a ToolTrio heuristic based on current salary and modeled percentage improvement; it is not employer or labor-market data.'}
          conclusion={'Compare vesting conditions, bonus targets, healthcare premiums, retirement-match rules, commute/location costs and job risk separately. Equity can lose value and should not be treated as guaranteed cash compensation.'}
          benefits={[
            {title:"Calculator-specific methodology",text:"The explanation above follows the formulas and assumptions used by this ToolTrio calculator."},
            {title:"Scenario planning",text:"Change inputs to see how the modeled result responds; do not treat scenario outputs as guaranteed outcomes."},
          ]}
          useCases={[
            {title:"Check assumptions",text:"Use the methodology and limitations to understand what is included before relying on an output."},
            {title:"Compare scenarios",text:"Test realistic alternatives using the same calculation model."},
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
