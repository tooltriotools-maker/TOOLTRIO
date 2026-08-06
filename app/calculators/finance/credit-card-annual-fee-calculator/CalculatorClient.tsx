'use client'
import { calculateAnnualFeeVsNoFeeCard } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [annualFee, setAnnualFee] = useState(695)
  const [rewardsRate, setRewardsRate] = useState(3)
  const [noFeeRewardsRate, setNoFeeRewardsRate] = useState(1.5)
  const [monthlySpend, setMonthlySpend] = useState(4000)
  const [redemptionValue, setRedemptionValue] = useState(1.5)

  const result = useMemo(()=>{
    try{return calculateAnnualFeeVsNoFeeCard(annualFee, rewardsRate, noFeeRewardsRate, monthlySpend, redemptionValue)}catch(e){return null}
  },[annualFee, rewardsRate, noFeeRewardsRate, monthlySpend, redemptionValue])

  return (
    <CalculatorLayout title="Credit Card Annual Fee Calculator USA 2026 — Is It Worth It?" description="Calculate whether a premium credit card's annual fee is worth it based on rewards earned, spending level, and comparison to no-fee alternatives." icon="💳" category="Finance" relatedCalculators={relatedCalculators} slug="credit-card-annual-fee-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Fee ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualFee} onChange={e=>setAnnualFee(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Fee Card Rewards Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={rewardsRate} onChange={e=>setRewardsRate(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">No-Fee Card Rewards Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={noFeeRewardsRate} onChange={e=>setNoFeeRewardsRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Spending ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlySpend} onChange={e=>setMonthlySpend(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Redemption Value (cents/pt)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={redemptionValue} onChange={e=>setRedemptionValue(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Annual Fee Card Rewards" value={result ? `${Number(result.feeCardRewards).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Net After Annual Fee" value={result ? `${Number(result.feeCardNet).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="No-Fee Card Rewards" value={result ? `${Number(result.noFeeCardRewards).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Advantage of Fee Card" value={result ? `${Number(result.difference).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Worth Annual Fee" value={result ? String(result.worthAnnualFee ? 'Yes' : 'No') : "—"} />
                <ResultCard label="Break-Even Monthly Spend" value={result ? `${Number(result.breakEvenMonthlySpend).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💳 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Premium credit cards with $500-700 annual fees are only worth it if your spending generates enough rewards to clear the fee and outperform no-fee alternatives. At $4,000/month spending and 3% vs 1.5% rewards rate, a $695 annual fee card needs to return at least $720 in rewards to justify itself. This calculator finds your exact break-even monthly spend.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Credit Card Annual Fee Calculator USA 2026 — Is It Worth It?" category="finance"
          intro="This calculator tests whether the extra rewards value of a fee card exceeds its annual fee compared with a no-fee card. Inputs are monthly spend, both reward rates, the fee and a redemption-value multiplier."
          howItWorks="Annual spend = monthly spend × 12. Fee-card rewards = annual spend × fee-card rate × redemption multiplier; net value subtracts the annual fee. No-fee rewards use the no-fee rate. Break-even spend is where incremental rewards equal the annual fee."
          tipsSection="Only enter spending that actually earns the stated rates. Welcome bonuses, category caps, credits, travel benefits, transfer partners, interest and other fees are outside the model."
          conclusion="A positive result only means modeled rewards exceed the fee relative to the entered alternative; it does not justify carrying a balance or spending more."
          benefits={[{title:"Methodology-specific results",text:"Instant 2026 IRS calculations."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup or paywall."}]}
          useCases={[{title:"Decision support",text:"Model your situation with real numbers."},{title:"Assumption testing",text:"Change inputs to see the impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
