'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateMeritRaiseVsJobChange } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [currentSalary, setCurrentSalary] = useState(78000)
  const [meritRaisePercent, setMeritRaisePercent] = useState(3.5)
  const [jobOfferSalary, setJobOfferSalary] = useState(95000)
  const [jobChangeRisk, setJobChangeRisk] = useState(10)
  const [yearsToStay, setYearsToStay] = useState(5)
  const result = useMemo(()=>{try{return calculateMeritRaiseVsJobChange(currentSalary,meritRaisePercent,jobOfferSalary,jobChangeRisk,yearsToStay)}catch(e){return null}},[currentSalary, meritRaisePercent, jobOfferSalary, jobChangeRisk, yearsToStay])
  return (
    <CalculatorLayout title="Merit Raise vs Job Change Calculator USA 2026" description="Merit Raise vs Job Change Calculator USA 2026" icon="💼" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="merit-raise-vs-job-change-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Currentsalary</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentSalary} onChange={e=>setCurrentSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Merit Raise</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={meritRaisePercent} onChange={e=>setMeritRaisePercent(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Job Offer Salary</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={jobOfferSalary} onChange={e=>setJobOfferSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Job Change Risk</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={jobChangeRisk} onChange={e=>setJobChangeRisk(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years to Compare</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={yearsToStay} onChange={e=>setYearsToStay(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Stay Final Salary" value={result?`${Number(result.meritFinalSalary).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Stay Total Earnings" value={result?`${Number(result.meritTotalEarnings).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Switch Final Salary" value={result?`${Number(result.jobChangeFinalSalary).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Risk-Adj Switch Total" value={result?`${Number(result.riskAdjustedJobChange).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="5-Year Difference" value={result?`${Number(result.difference).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Better Option" value={result?String(result.betterOption):"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">💼 Merit Raise vs Job Change Calculator USA 2026</h2><p className="text-sm text-gray-600">Compare the compensation path of staying for percentage merit raises with accepting a higher starting salary elsewhere. The model compounds your entered stay raise each year, assumes 3% annual raises after switching, and applies your job-change risk discount to the switch path.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Merit Raise vs Job Change Calculator USA 2026" category="finance" intro={`Compare the compensation path of staying for percentage merit raises with accepting a higher starting salary elsewhere. The model compounds your entered stay raise each year, assumes 3% annual raises after switching, and applies your job-change risk discount to the switch path.`} howItWorks={`The stay path applies your merit-raise percentage at the start of each modeled year and sums those salaries. The switch path starts at the offered salary and grows 3% per year. Risk-adjusted switch earnings = projected switch earnings × (1 − job-change risk %). The difference compares that risk-adjusted total with staying.`} tipsSection={`Treat job-change risk as a scenario discount, not a probability forecast. Compare several values and separately consider bonuses, equity, retirement match, health benefits, commute, vesting and taxes because the calculator models salary only.`} conclusion={`A higher offer can create a compounding salary advantage, but this output is a salary scenario model rather than a prediction of employment stability or total compensation.`}
          benefits={[{title:"Calculator-specific model",text:"Methodology is explained so you can see what the output assumes."},{title:"Scenario testing",text:"Change the inputs to compare outcomes that matter to this calculation."},{title:"Private",text:"Inputs are calculated locally in your browser."}]}
          useCases={[{title:"Decision support",text:"Compare the modeled result before taking the next planning step."},{title:"Assumption check",text:"See which inputs have the largest effect on the result."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
