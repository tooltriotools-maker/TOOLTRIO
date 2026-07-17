'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculatePrenupAssetProtection } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [separatePropertyValue, setSeparatePropertyValue] = useState(350000)
  const [businessValue, setBusinessValue] = useState(500000)
  const [yearsMarried, setYearsMarried] = useState(10)
  const result = useMemo(()=>{try{return calculatePrenupAssetProtection(separatePropertyValue,0,businessValue,yearsMarried,'equitableDistribution')}catch(e){return null}},[separatePropertyValue, businessValue, yearsMarried])
  return (
    <CalculatorLayout title="Prenup Asset Protection Calculator USA 2026" description="Prenup Asset Protection Calculator USA 2026" icon="📋" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="prenup-asset-protection-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Separatepropertyvalue</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={separatePropertyValue} onChange={e=>setSeparatePropertyValue(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Businessvalue</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={businessValue} onChange={e=>setBusinessValue(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Yearsmarried</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={yearsMarried} onChange={e=>setYearsMarried(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Exposure Without Prenup" value={result?`${Number(result.withoutPrenupExposure).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Protected With Prenup" value={result?`${Number(result.withPrenupProtected).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Business Appreciation" value={result?`${Number(result.appreciationDuringMarriage).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Total Protection" value={result?`${Number(result.totalAssetProtection).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="ROI on Prenup" value={result?`${Number(result.roiOnPrenup).toFixed(2)}x`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📋 Prenup Asset Protection Calculator USA 2026</h2><p className="text-sm text-gray-600">Enter your values above to see instant results using 2026 US-standard formulas. All calculations run locally in your browser.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Prenup Asset Protection Calculator USA 2026" category="finance" intro="Prenup Asset Protection Calculator USA 2026" howItWorks="Enter your values for instant 2026 results." tipsSection="Try different scenarios." conclusion="Consult a financial advisor for personalized advice."
          benefits={[{title:"Real-Time",text:"2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact of changes."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
