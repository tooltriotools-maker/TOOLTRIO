'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateRVAnnualCost } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [rvPrice, setRvPrice] = useState(85000)
  const [downPercent, setDownPercent] = useState(20)
  const [loanRate, setLoanRate] = useState(8.5)
  const [loanTermYears, setLoanTermYears] = useState(15)
  const [campingNights, setCampingNights] = useState(45)
  const [fuelMPG, setFuelMPG] = useState(9)

  const result = useMemo(()=>{
    try{return calculateRVAnnualCost(rvPrice,loanRate,loanTermYears,downPercent,3600,1.5,campingNights,fuelMPG,250)}catch(e){return null}
  },[rvPrice, downPercent, loanRate, loanTermYears, campingNights, fuelMPG])

  return (
    <CalculatorLayout title="RV Annual Cost Calculator USA 2026 — Is It Worth It?" description="Calculate the true annual cost of RV ownership including loan payment, insurance, fuel, maintenance, storage, and campsite fees vs equivalent hotel stays." icon="🚌" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="rv-annual-cost-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">RV Purchase Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={rvPrice} onChange={e=>setRvPrice(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Down Payment (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={downPercent} onChange={e=>setDownPercent(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Loan Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={loanRate} onChange={e=>setLoanRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Loan Term (years)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={loanTermYears} onChange={e=>setLoanTermYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Nights Used Per Year</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={campingNights} onChange={e=>setCampingNights(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Fuel Economy (MPG)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={fuelMPG} onChange={e=>setFuelMPG(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Monthly Loan Payment" value={result ? `${Number(result.monthlyPayment).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} highlight />
                <ResultCard label="Annual Total Cost" value={result ? `${Number(result.totalAnnual).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Cost Per Night" value={result ? `${Number(result.costPerNight).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Hotel Equivalent Cost" value={result ? `${Number(result.hotelEquivalent).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Savings vs Hotel" value={result ? `${Number(result.savingsVsHotel).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Break-Even Nights" value={result ? `${Number(result.breakEvenNights).toLocaleString()} nights` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🚌 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">RV ownership has romantic appeal but real financial complexity. An $85,000 RV used 45 nights per year costs $332/night all-in — often more expensive than comparable hotel stays. The economics improve dramatically for full-timers or families using the RV 60-80+ nights annually. This calculator gives you the complete annual cost breakdown and exact break-even usage needed to justify the purchase.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="RV Annual Cost Calculator USA 2026 — Is It Worth It?" category="finance" intro="This calculator turns an RV purchase into annual-use cost by combining financing, insurance, maintenance, fuel, storage and campsite fees. It divides modeled annual cash cost by camping nights and compares it with a $200-per-night hotel benchmark."
          howItWorks="Loan payment uses standard amortization. The model fixes insurance at $3,600/year, maintenance at 1.5% of price, storage at $2,400/year, campsites at $45/night, fuel at $3.80/gallon and travel at 250 miles per trip/night input. Break-even nights = annual cost ÷ $200."
          tipsSection="The function calculates 15% first-year depreciation but does not include it in total annual cash cost. Taxes, registration, repairs, towing vehicle costs and resale value are also outside the total."
          conclusion="Cost per night depends heavily on usage and these fixed assumptions; it is not a universal RV-versus-hotel comparison."
          benefits={[{title:"Methodology-specific results",text:"Instant 2026 IRS calculations."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup."}]}
          useCases={[{title:"Decision support",text:"Model your situation."},{title:"Assumption testing",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
