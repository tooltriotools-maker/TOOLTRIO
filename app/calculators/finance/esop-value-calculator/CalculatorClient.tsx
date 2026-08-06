'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateESOPValue } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [esopShares, setEsopShares] = useState(500)
  const [currentValuation, setCurrentValuation] = useState(85)
  const [vestingYears, setVestingYears] = useState(6)
  const [currentYear, setCurrentYear] = useState(3)
  const [distributionAge, setDistributionAge] = useState(65)
  const [currentAge, setCurrentAge] = useState(38)
  const result = useMemo(()=>{try{return calculateESOPValue(esopShares,currentValuation,vestingYears,currentYear,distributionAge,currentAge)}catch(e){return null}},[esopShares, currentValuation, vestingYears, currentYear, distributionAge, currentAge])
  return (
    <CalculatorLayout title="ESOP Value Calculator USA 2026" description="ESOP Value Calculator USA 2026" icon="📈" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="esop-value-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Esopshares</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={esopShares} onChange={e=>setEsopShares(Number(e.target.value))} step={25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Currentvaluation</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={currentValuation} onChange={e=>setCurrentValuation(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Vestingyears</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={vestingYears} onChange={e=>setVestingYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Currentyear</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={currentYear} onChange={e=>setCurrentYear(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Distributionage</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={distributionAge} onChange={e=>setDistributionAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Currentage</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={currentAge} onChange={e=>setCurrentAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Vested %" value={result?`${Number(result.vestedPercent).toFixed(1)}%`:"-"} highlight />
                <ResultCard label="Current Vested Value" value={result?`${Number(result.currentVestedValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Years to Full Vest" value={result?`${Number(result.yearsToFullVest)} yrs`:"-"} />
                <ResultCard label="Projected Future Value" value={result?`${Number(result.projectedFutureValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Tax on Distribution" value={result?`${Number(result.taxOnDistribution).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Net Distribution" value={result?`${Number(result.netDistribution).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📈 ESOP Value Calculator USA 2026</h2><p className="text-sm text-gray-600">Enter your values above to see Esop Value Calculator output using 2026 Calculator methodology and assumptions. All calculations run locally in your browser.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="ESOP Value Calculator" category="finance"
          intro="Estimates vested employer-stock value today and projects the full share balance to a selected distribution age using the calculator’s fixed 6% annual growth assumption."
          howItWorks="Vested percentage = current vesting year ÷ vesting years, capped at 100%. Current vested value multiplies shares, current per-share valuation and vested percentage. Future value compounds the full share value at 6% annually until distribution age; the displayed tax estimate then applies a simplified 22% rate."
          tipsSection="Worked example — Example: 500 shares worth $85 each in year 3 of a 6-year schedule are modeled as 50% vested, so current vested value is $21,250 before plan-specific rules."
          conclusion="Important assumptions and limitations — Actual ESOP valuations are determined under plan and appraisal rules. Future employer-stock returns are unknown, distribution taxation can differ, and the calculator’s 6% growth and 22% tax assumptions are scenarios rather than forecasts."
          benefits={[
            {title:"What the inputs mean",text:"Use the fields above to model the specific amounts, rates, ages or time horizon described for this calculator."},
            {title:"How to read the results",text:"Treat the outputs as scenario estimates and focus on which assumptions drive the result most strongly."},
            {title:"Decision support",text:"Compare realistic scenarios rather than treating a single result as a prediction or professional recommendation."},
          ]}
          useCases={[
            {title:"Worked scenario",text:"Start with the default example, then replace each input with values that match the situation you are evaluating."},
            {title:"Assumption check",text:"Review the methodology and limitations before relying on the result for a financial, tax, benefit or investment decision."},
          ]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
