'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateStockOptionVesting } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [grantShares, setGrantShares] = useState(10000)
  const [strikePrice, setStrikePrice] = useState(12)
  const [currentFMV, setCurrentFMV] = useState(45)
  const [vestingYears, setVestingYears] = useState(4)
  const [projectedGrowthRate, setProjectedGrowthRate] = useState(15)
  const [taxRate, setTaxRate] = useState(32)

  const result = useMemo(()=>{
    try{return calculateStockOptionVesting(grantShares,strikePrice,vestingYears,currentFMV,projectedGrowthRate,taxRate,'nso')}catch(e){return null}
  },[grantShares, strikePrice, currentFMV, vestingYears, projectedGrowthRate, taxRate])

  return (
    <CalculatorLayout title="Stock Option Vesting Calculator USA 2026 — ISO vs NSO" description="Calculate the value of vesting stock options year-by-year, tax impact of ISO vs NSO exercise, AMT risk, and optimal exercise strategy." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="stock-option-vesting-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Total Options Granted</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={grantShares} onChange={e=>setGrantShares(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
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
            <label className="text-xs font-medium text-gray-600">Current FMV ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentFMV} onChange={e=>setCurrentFMV(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Vesting Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={vestingYears} onChange={e=>setVestingYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Projected Annual Growth (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={projectedGrowthRate} onChange={e=>setProjectedGrowthRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
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
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Exercise Cost" value={result ? `${Number(result.exerciseCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Current Total Value" value={result ? `${Number(result.currentTotalValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Spread (projected)" value={result ? `${Number(result.totalSpread).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Tax (NSO est.)" value={result ? `${Number(result.totalTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Gain" value={result ? `${Number(result.netGain).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Strategy" value={result ? String(result.strategy) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📊 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Stock options — ISO or NSO — represent some of the most complex tax planning situations in US personal finance. Exercise timing, AMT exposure, and holding period requirements can mean the difference between paying 15% long-term capital gains versus 37% ordinary income on the same spread. This calculator maps your complete vesting schedule with year-by-year value and tax impact.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Stock Option Vesting Calculator USA 2026 — ISO vs NSO" category="finance" intro="This page models equal annual vesting and the changing option spread as an assumed share price grows. Although the underlying function can represent ISO or NSO treatment, the current page calls the NSO branch, so the displayed tax estimate should be read as an NSO scenario."
          howItWorks="Shares are divided equally across the vesting years. Projected FMV compounds by the entered growth rate. Each year’s spread is max(FMV − strike price, 0) × shares vesting. For the current NSO scenario, the entered tax rate is applied to that spread. Exercise cost is grant shares × strike price."
          tipsSection="Do not treat the projected growth rate as a valuation forecast. Actual vesting can include cliffs and monthly schedules, and NSO tax generally arises on exercise rather than vesting. The page does not model later capital gains, withholding or state taxes."
          conclusion="Use the schedule to understand how strike price, vesting and hypothetical FMV affect option economics. For exercise and tax decisions, rely on your plan documents and professional tax guidance."
          benefits={[{title:"Calculator results",text:"Uses the calculator-specific assumptions shown on this page."},{title:"100% Private",text:"Everything runs locally."},{title:"Available without a paid plan",text:"No account is required to run the calculation."}]}
          useCases={[{title:"Personal Planning",text:"Use your own inputs to test this specific calculation."},{title:"Scenario Comparison",text:"Change one relevant input at a time and compare the modeled output."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
