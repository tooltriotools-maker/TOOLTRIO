'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateInvestmentPropertyDepreciation } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [buildingValue, setBuildingValue] = useState(320000)
  const [landValue, setLandValue] = useState(80000)
  const [placedInServiceYear, setPlacedInServiceYear] = useState(2021)
  const [currentYear, setCurrentYear] = useState(2026)
  const [taxRate, setTaxRate] = useState(32)
  const result = useMemo(()=>{try{return calculateInvestmentPropertyDepreciation(buildingValue,landValue,'residential',placedInServiceYear,currentYear,taxRate)}catch(e){return null}},[buildingValue, landValue, placedInServiceYear, currentYear, taxRate])
  return (
    <CalculatorLayout title="Investment Property Depreciation Calculator USA 2026" description="Investment Property Depreciation Calculator USA 2026" icon="🏘️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="investment-property-depreciation-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Buildingvalue</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={buildingValue} onChange={e=>setBuildingValue(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Landvalue</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={landValue} onChange={e=>setLandValue(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Placedinserviceyear</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={placedInServiceYear} onChange={e=>setPlacedInServiceYear(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
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
            <label className="text-xs font-medium text-gray-600">Taxrate</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Annual Depreciation" value={result?`${Number(result.annualDepreciation).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Accumulated Depreciation" value={result?`${Number(result.accumulatedDepreciation).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Remaining Basis" value={result?`${Number(result.remainingBasis).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Annual Tax Savings" value={result?`${Number(result.annualTaxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Total Tax Savings" value={result?`${Number(result.totalTaxSavingsToDate).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Recapture Tax on Sale" value={result?`${Number(result.recaptureTaxOnSale).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🏘️ Investment Property Depreciation Calculator USA 2026</h2><p className="text-sm text-gray-600">The annual deduction is driven by the building basis and the 27.5- or 39-year recovery period. Land value is shown as an input but is not included in the depreciable basis.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Investment Property Depreciation Calculator USA 2026" category="finance" intro="Estimate straight-line MACRS depreciation for the building portion of a rental property and separate nondepreciable land from the depreciable basis." howItWorks="The calculator treats the entered building value as depreciable basis. Residential rental property uses 27.5 years and nonresidential real property uses 39 years. Annual depreciation = building basis ÷ recovery period; accumulated depreciation is annual depreciation multiplied by modeled years in service." tipsSection="Allocate purchase price between land and building using supportable basis information; land is not depreciated. The model does not apply the mid-month convention, partial first/last-year tables, basis adjustments, improvements, dispositions, passive-loss limits, or a full cost-segregation study." conclusion="The 25% recapture output is only an illustrative assumption and is not a complete sale-tax calculation. Cost-segregation results are not estimated as a fixed percentage of the property value. Use tax records and Form 4562 schedules for filing decisions."
          benefits={[{title:"Method",text:"Explains the calculation actually used on this page."},{title:"Inputs",text:"Shows which assumptions drive the result."},{title:"Limits",text:"Calls out important exclusions and simplifications."}]}
          useCases={[{title:"Scenario planning",text:"Compare realistic input combinations."},{title:"Decision support",text:"Understand the trade-offs behind the outputs."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
