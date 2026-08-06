'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateElderCareCost } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [monthlyHours, setMonthlyHours] = useState(120)
  const [hourlyRate, setHourlyRate] = useState(32)
  const [facilityMonthly, setFacilityMonthly] = useState(0)
  const result = useMemo(()=>{try{return calculateElderCareCost('assisted',monthlyHours,hourlyRate,facilityMonthly,'CA')}catch(e){return null}},[monthlyHours, hourlyRate, facilityMonthly])
  return (
    <CalculatorLayout title="Elder Care Cost Calculator USA 2026" description="Elder Care Cost Calculator USA 2026" icon="👵" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="elder-care-cost-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Care Hours</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={monthlyHours} onChange={e=>setMonthlyHours(Number(e.target.value))} step={10} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Hourly Care Rate ($/hour)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={hourlyRate} onChange={e=>setHourlyRate(Number(e.target.value))} step={2} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">$/hr</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Facility Monthly Quote ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={facilityMonthly} onChange={e=>setFacilityMonthly(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Home Care Monthly" value={result?`${Number(result.homeCareMonthly).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"} highlight />
                <ResultCard label="Facility Monthly" value={result?`${Number(result.facilityMonthly).toLocaleString(undefined,{maximumFractionDigits:0})}/mo`:"-"} />
                <ResultCard label="Annual Home Care" value={result?`${Number(result.annualHomeCare).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Annual Facility" value={result?`${Number(result.annualFacility).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="5-Year Home Care" value={result?`${Number(result.fiveYearHomeCare).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="5-Year Facility" value={result?`${Number(result.fiveYearFacility).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">👵 Elder Care Cost Calculator USA 2026</h2><p className="text-sm text-gray-600">The result compares the current California-adjusted home-care scenario with the facility amount used by this model. Change care hours and quoted rates to see where the cost crossover occurs.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Elder Care Cost Calculator USA 2026" category="finance" intro="Compare the modeled cost of paid in-home care with a facility budget. The calculator multiplies monthly care hours by your hourly rate and applies the code’s California cost factor, then shows annual and five-year totals." howItWorks="Home care = monthly care hours × hourly rate × 1.25 because this page currently calls the calculation with California. Facility care uses your monthly facility quote, or the built-in assisted-living estimate when the field is zero, and applies the same factor. Five-year figures are simple five-year totals with a 4% uplift; they are not a year-by-year inflation forecast." tipsSection="Use an actual agency quote for hourly care and a facility quote that includes recurring room-and-care charges. The current model does not separately price medication management, transportation, home modifications, one-time community fees, or changes in care intensity." conclusion="This is a budgeting comparison, not a Medicaid eligibility determination. Medicaid finances many long-term services and supports, but financial and level-of-care rules vary by state; verify eligibility with the relevant state Medicaid program."
          benefits={[{title:"Method",text:"Explains the calculation actually used on this page."},{title:"Inputs",text:"Shows which assumptions drive the result."},{title:"Limits",text:"Calls out important exclusions and simplifications."}]}
          useCases={[{title:"Scenario planning",text:"Compare realistic input combinations."},{title:"Decision support",text:"Understand the trade-offs behind the outputs."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
