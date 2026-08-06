'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateBackgroundCheckROI } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [badHireCost, setBadHireCost] = useState(45000)
  const [screeningCost, setScreeningCost] = useState(75)
  const [hiresPerYear, setHiresPerYear] = useState(25)
  const [badHireRateWithout, setBadHireRateWithout] = useState(18)
  const [badHireRateWith, setBadHireRateWith] = useState(6)
  const result = useMemo(()=>{try{return calculateBackgroundCheckROI(badHireCost,screeningCost,hiresPerYear,badHireRateWithout,badHireRateWith)}catch(e){return null}},[badHireCost, screeningCost, hiresPerYear, badHireRateWithout, badHireRateWith])
  return (
    <CalculatorLayout title="Background Check ROI Calculator USA 2026" description="Background Check ROI Calculator USA 2026" icon="🔍" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="background-check-roi-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Cost per Bad Hire</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={badHireCost} onChange={e=>setBadHireCost(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Screening Cost per Hire</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={screeningCost} onChange={e=>setScreeningCost(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Hires per Year</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={hiresPerYear} onChange={e=>setHiresPerYear(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Bad-Hire Rate Without Screening</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={badHireRateWithout} onChange={e=>setBadHireRateWithout(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Bad-Hire Rate With Screening</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={badHireRateWith} onChange={e=>setBadHireRateWith(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Bad Hires Prevented" value={result?String(result.badHiresPrevented):"-"} highlight />
                <ResultCard label="Cost Without Screening" value={result?`${Number(result.costWithoutScreening).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Cost With Screening" value={result?`${Number(result.costWithScreening).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Net Annual Savings" value={result?`${Number(result.netSavings).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="ROI" value={result?`${Number(result.roi).toFixed(1)}%`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">Understanding these results</h2><p className="text-sm text-gray-600">Estimate the financial break-even of an employee-screening program using your own assumptions for bad-hire cost, screening price, annual hires and bad-hire rates with and without screening. This is an employer budgeting model, not evidence that a background check will prevent a specific hiring outcome.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Background Check ROI Calculator" category="finance"
          intro="Estimate the financial break-even of an employee-screening program using your own assumptions for bad-hire cost, screening price, annual hires and bad-hire rates with and without screening. This is an employer budgeting model, not evidence that a background check will prevent a specific hiring outcome."
          howItWorks="Expected bad hires = annual hires × assumed bad-hire rate. Cost without screening = expected bad hires without screening × cost per bad hire. Cost with screening = expected bad hires after screening × bad-hire cost + screening cost × hires. Net savings is the difference; ROI divides net savings by total screening spend."
          tipsSection="The two bad-hire rates are user assumptions and drive the result heavily. The model does not measure screening accuracy, adverse impact, legal compliance, candidate experience, turnaround time or the cost of false positives. Employment background checks can be subject to federal, state and local requirements, so financial ROI is only one part of a screening policy."
          conclusion="Use the calculator to find the assumptions required for screening to pay for itself. If the business case depends on an unrealistically large drop in bad hires, the displayed ROI should not be treated as a reliable forecast."
          benefits={[{title:"Methodology",text:"Explains the exact assumptions used by this ToolTrio model."},{title:"Scenario testing",text:"Change the inputs to see which assumptions drive the result."},{title:"Limitations",text:"Highlights important factors the simplified model does not capture."}]}
          useCases={[{title:"Planning",text:"Build a calculator-specific baseline from your own inputs."},{title:"Sensitivity check",text:"Compare a conservative scenario with a more optimistic one."}]}
          caseStudy={{title:"Worked example",scenario:"25 hires per year — Assume 25 hires, $75 screening cost per hire, $45,000 cost per bad hire, and bad-hire rates of 18% without screening versus 6% with screening.",result:"The model compares expected annual bad-hire costs in the two scenarios, adds $1,875 of screening spend to the screened scenario, and computes ROI from the modeled net savings.",takeaway:"Use the example to understand the calculation flow, then replace every assumption with values relevant to your situation."}} />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
