'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateVacationRentalROI } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [propertyValue, setPropertyValue] = useState(450000)
  const [annualRentalRevenue, setAnnualRentalRevenue] = useState(72000)
  const [occupancyRate, setOccupancyRate] = useState(65)
  const [platformFeePercent, setPlatformFeePercent] = useState(15)
  const [annualExpenses, setAnnualExpenses] = useState(18000)
  const [mortgagePayment, setMortgagePayment] = useState(2200)

  const result = useMemo(()=>{
    try{return calculateVacationRentalROI(propertyValue,annualRentalRevenue,occupancyRate,platformFeePercent,annualExpenses,mortgagePayment)}catch(e){return null}
  },[propertyValue, annualRentalRevenue, occupancyRate, platformFeePercent, annualExpenses, mortgagePayment])

  return (
    <CalculatorLayout title="Vacation Rental ROI Calculator USA 2026 — Airbnb VRBO" description="Calculate cap rate, cash flow, and total return on short-term rental properties. Compare Airbnb/VRBO income against long-term rental and break-even occupancy." icon="🏖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="vacation-rental-roi-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Property Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={propertyValue} onChange={e=>setPropertyValue(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Rental Revenue ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualRentalRevenue} onChange={e=>setAnnualRentalRevenue(Number(e.target.value))} step={2000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Occupancy Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={occupancyRate} onChange={e=>setOccupancyRate(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Platform Fee (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={platformFeePercent} onChange={e=>setPlatformFeePercent(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Operating Expenses ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualExpenses} onChange={e=>setAnnualExpenses(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Mortgage ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={mortgagePayment} onChange={e=>setMortgagePayment(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Effective Annual Revenue" value={result ? `${Number(result.effectiveRevenue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Net Operating Income" value={result ? `${Number(result.netOperatingIncome).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Annual Cash Flow" value={result ? `${Number(result.cashFlow).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Cap Rate" value={result ? `${Number(result.capRate).toFixed(1)}%` : "—"} />
                <ResultCard label="Cash-on-Cash Return" value={result ? `${Number(result.cashOnCash).toFixed(1)}%` : "—"} />
                <ResultCard label="Break-Even Occupancy" value={result ? `${Number(result.breakEvenOccupancy).toFixed(1)}%` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏖️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Short-term rentals (Airbnb/VRBO) can generate 2-3x the income of long-term rentals in the right markets — but platform fees (15%), variable occupancy (50-70%), and STR regulations create significant complexity. This calculator models your exact cap rate, cash flow, and break-even occupancy point, helping you evaluate any STR investment against realistic revenue assumptions.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Vacation Rental ROI Calculator USA 2026 — Airbnb VRBO" category="finance" intro="This calculator evaluates a short-term-rental scenario using property value, potential revenue, occupancy, platform fees, expenses and mortgage payment. It reports effective revenue, NOI, cash flow, cap rate, cash-on-cash return and break-even occupancy."
          howItWorks="Effective revenue = potential revenue × occupancy × (1 − platform fee). NOI subtracts operating expenses; cash flow then subtracts 12 mortgage payments. Cash-on-cash assumes cash invested equals 25% of property value. The 10-year scenario assumes 4% annual appreciation."
          tipsSection="The 25% down-payment basis and 4% appreciation are assumptions. STR licensing, lodging taxes, seasonality, cleaning, furnishing replacement, vacancy and management can materially change results."
          conclusion="This is an investment-screening model, not a forecast or a determination that a property is legally eligible for short-term rental use."
          benefits={[{title:"Methodology-specific results",text:"Results update from the values you enter."},{title:"100% Private",text:"Everything runs locally."},{title:"Available without a paid plan",text:"No account is required to run the calculation."}]}
          useCases={[{title:"Decision support",text:"Model your situation."},{title:"Assumption testing",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
