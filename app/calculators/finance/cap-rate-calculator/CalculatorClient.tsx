'use client'
import { calculateRealEstateCapRate } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [annualGrossRent, setAnnualGrossRent] = useState(36000)
  const [vacancyRate, setVacancyRate] = useState(5)
  const [operatingExpenses, setOperatingExpenses] = useState(8000)
  const [propertyValue, setPropertyValue] = useState(425000)
  const [mortgagePayment, setMortgagePayment] = useState(24000)

  const result = useMemo(()=>{
    try{return calculateRealEstateCapRate(annualGrossRent, vacancyRate, operatingExpenses, propertyValue, mortgagePayment / 12)}catch(e){return null}
  },[annualGrossRent, vacancyRate, operatingExpenses, propertyValue, mortgagePayment])

  return (
    <CalculatorLayout title="Cap Rate Calculator USA 2026 — Real Estate Investment" description="Calculate capitalization rate, NOI, gross rent multiplier, and break-even occupancy for any investment property." icon="🏘️" category="Finance" relatedCalculators={relatedCalculators} slug="cap-rate-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Gross Rent ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualGrossRent} onChange={e=>setAnnualGrossRent(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Vacancy Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={vacancyRate} onChange={e=>setVacancyRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Operating Expenses ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={operatingExpenses} onChange={e=>setOperatingExpenses(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Property Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={propertyValue} onChange={e=>setPropertyValue(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Mortgage Payment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={mortgagePayment} onChange={e=>setMortgagePayment(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Net Operating Income" value={result ? `${Number(result.noi).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Cap Rate" value={result ? `${Number(result.capRate).toFixed(1)}%` : "—"} />
                <ResultCard label="Annual Cash Flow" value={result ? `${Number(result.cashFlow).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Gross Rent Multiplier" value={result ? String(result.grossRentMultiplier) : "—"} />
                <ResultCard label="Break-Even Occupancy" value={result ? `${Number(result.breakEvenOccupancy).toFixed(1)}%` : "—"} />
                <ResultCard label="Implied Value at 6% Cap" value={result ? `${Number(result.impliedValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏘️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Cap rate is the single most important metric for evaluating investment property — it tells you the property's return assuming an all-cash purchase. A 6% cap rate on a $425,000 property means $25,500/year in NOI. This calculator also shows gross rent multiplier, break-even occupancy, and the implied fair value if the market cap rate is 6%.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Cap Rate Calculator USA 2026 — Real Estate Investment" category="finance"
          intro="Cap rate is the single most important metric for evaluating investment property — it tells you the property's return assuming an all-cash purchase. A 6% cap rate on a $425,000 property means $25,500/year in NOI. This calculator also shows gross rent multiplier, break-even occupancy, and the implied fair value if the market cap rate is 6%."
          howItWorks="Cap rate is net operating income (NOI) divided by property value. This tool first reduces gross rent for vacancy, subtracts operating expenses, then compares the resulting NOI with the property value. Mortgage payments are shown separately because debt service is not part of NOI."
          tipsSection="Example: $36,000 annual rent with 5% vacancy leaves $34,200 effective rent. After $8,000 of operating expenses, NOI is $26,200; on a $425,000 property the cap rate is about 6.16%."
          conclusion="Cap rate does not measure financing, appreciation, taxes, depreciation, capital expenditures omitted from your expense input, or future rent growth. Use actual trailing or carefully normalized operating figures."
          benefits={[{title:"Real-Time USA Results",text:"Calculator-specific scenario outputs."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup or paywall."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation with real numbers."},{title:"Scenario Comparison",text:"Change inputs to see the impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
