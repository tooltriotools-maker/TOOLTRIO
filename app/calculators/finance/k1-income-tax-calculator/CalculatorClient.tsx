'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateK1IncomeTax } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [ordinaryIncome, setOrdinaryIncome] = useState(85000)
  const [guaranteedPayments, setGuaranteedPayments] = useState(40000)
  const [capitalGains, setCapitalGains] = useState(15000)
  const [selfRentalIncome, setSelfRentalIncome] = useState(0)
  const [passiveLoss, setPassiveLoss] = useState(0)
  const [taxRate, setTaxRate] = useState(32)

  const result = useMemo(()=>{
    try{return calculateK1IncomeTax(ordinaryIncome,guaranteedPayments,capitalGains,selfRentalIncome,passiveLoss,taxRate,'single')}catch(e){return null}
  },[ordinaryIncome, guaranteedPayments, capitalGains, selfRentalIncome, passiveLoss, taxRate])

  return (
    <CalculatorLayout title="K-1 Income Tax Calculator USA 2026 — Partnership & S-Corp" description="Calculate federal tax on Schedule K-1 income from partnerships, S-corps, and LLCs including SE tax on guaranteed payments, QBI deduction, and passive loss rules." icon="📋" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="k1-income-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Ordinary Business Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={ordinaryIncome} onChange={e=>setOrdinaryIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Guaranteed Payments ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={guaranteedPayments} onChange={e=>setGuaranteedPayments(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Long-Term Capital Gains ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={capitalGains} onChange={e=>setCapitalGains(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Self-Rental Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={selfRentalIncome} onChange={e=>setSelfRentalIncome(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Passive Losses ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={passiveLoss} onChange={e=>setPassiveLoss(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (<>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total K-1 Income" value={result ? `${Number(result.totalK1Income).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="SE Tax on Guaranteed" value={result ? `${Number(result.seOnGuaranteed).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="QBI Deduction (20%)" value={result ? `${Number(result.qbiDeduction).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Federal Tax" value={result ? `${Number(result.federalTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Capital Gains Tax" value={result ? `${Number(result.capitalGainsTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Quarterly Estimate" value={result ? `${Number(result.quarterlyEstimate).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card><h2 className="text-lg font-black text-gray-900 mb-3">📋 About</h2><p className="text-sm text-gray-600">K-1 income from partnerships and S-corps is taxed differently than W-2 or 1099 income. Guaranteed payments are subject to SE tax (15.3%); ordinary partnership income qualifies for the 20% QBI deduction; passive losses have specific deductibility rules. This calculator handles all three income types with accurate 2026 tax calculations and quarterly estimate.</p></Card>
            </>):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="K-1 Income Tax Calculator USA 2026 — Partnership & S-Corp" category="finance" intro="Break a simplified partnership K-1 scenario into ordinary income, guaranteed payments, capital gains, passive losses and estimated taxes."
          howItWorks="The current model applies passive losses against modeled ordinary/self-rental income, estimates self-employment tax on guaranteed payments, applies a simplified 20% QBI deduction and taxes capital gains at a flat 15%."
          tipsSection="Worked example: Enter ordinary income, guaranteed payments and passive losses separately: their tax treatment is not interchangeable, which is why this calculator keeps the components distinct."
          conclusion="Important assumptions and limitations: This is not a Form 1065/Schedule K-1 tax engine. Basis, at-risk rules, SSTB/wage limits, NIIT, state tax and actual capital-gain brackets can materially change the result. Results are educational estimates, not individualized financial, tax, legal or investment advice."
          benefits={[{title:"Real-Time",text:"Instant 2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact of changes."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
