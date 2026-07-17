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
            <label className="text-xs font-medium text-gray-600">Monthlyhours</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={monthlyHours} onChange={e=>setMonthlyHours(Number(e.target.value))} step={10} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Hourlyrate</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={hourlyRate} onChange={e=>setHourlyRate(Number(e.target.value))} step={2} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Facilitymonthly</label>
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

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">👵 Elder Care Cost Calculator USA 2026</h2><p className="text-sm text-gray-600">Enter your values above to see instant results using 2026 US-standard formulas. All calculations run locally in your browser.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Elder Care Cost Calculator USA 2026" category="finance" intro="Elder Care Cost Calculator USA 2026" howItWorks="Enter your values for instant 2026 results." tipsSection="Try different scenarios." conclusion="Consult a financial advisor for personalized advice."
          benefits={[{title:"Real-Time",text:"2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact of changes."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
