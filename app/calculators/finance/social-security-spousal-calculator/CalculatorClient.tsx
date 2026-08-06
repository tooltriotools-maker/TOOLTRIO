'use client'
import { calculateSocialSecuritySpouse } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [worker1Benefit, setWorker1Benefit] = useState(2500)
  const [worker2Benefit, setWorker2Benefit] = useState(900)
  const [worker1ClaimAge, setWorker1ClaimAge] = useState(67)
  const [worker2ClaimAge, setWorker2ClaimAge] = useState(65)

  const result = useMemo(()=>{
    try{return calculateSocialSecuritySpouse(worker1Benefit, worker2Benefit, 60, 58, worker1ClaimAge, worker2ClaimAge)}catch(e){return null}
  },[worker1Benefit, worker2Benefit, worker1ClaimAge, worker2ClaimAge])

  return (
    <CalculatorLayout title="Social Security Spousal Benefits Calculator USA 2026" description="Calculate spousal Social Security benefits, optimal claiming ages for couples, survivor benefits, and combined lifetime income." icon="👫" category="Finance" relatedCalculators={relatedCalculators} slug="social-security-spousal-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Worker 1 FRA Benefit ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={worker1Benefit} onChange={e=>setWorker1Benefit(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Worker 2 FRA Benefit ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={worker2Benefit} onChange={e=>setWorker2Benefit(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Worker 1 Claim Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={worker1ClaimAge} onChange={e=>setWorker1ClaimAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Worker 2 Claim Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={worker2ClaimAge} onChange={e=>setWorker2ClaimAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Worker 1 Monthly" value={result ? `${Number(result.worker1Monthly).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} highlight />
                <ResultCard label="Worker 2 Monthly (with spousal)" value={result ? `${Number(result.worker2Monthly).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Spousal Boost" value={result ? `${Number(result.spousalBoost).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Combined Monthly" value={result ? `${Number(result.combinedMonthly).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Survivor Benefit" value={result ? `${Number(result.survivorBenefit).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Lifetime (30 years)" value={result ? `${Number(result.lifetime30yr).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">👫 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">For married couples, Social Security claiming strategy can be worth $100,000+ in additional lifetime benefits compared to suboptimal choices. The spousal benefit (up to 50% of the higher earner's PIA), survivor benefit rules, and the 8%/year delayed retirement credit all interact to create a complex optimization problem. This calculator shows the optimal approach for your specific situation.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Social Security Spousal Benefits Calculator" category="finance"
          intro="Compares two FRA benefit amounts and claim ages, then estimates adjusted worker benefits, a simplified spousal top-up, combined monthly income and a survivor amount."
          howItWorks="The code assumes FRA 67. Worker benefits are reduced for claiming before FRA and increased after FRA. It then compares Worker 2’s adjusted own benefit with 50% of Worker 1’s adjusted benefit. This is a simplification: SSA bases the maximum spouse benefit on the worker’s PIA, and spouse-specific early-claim reductions differ from worker reductions."
          tipsSection="Worked example — Example: if Worker 1 has a $2,500 FRA benefit and Worker 2 has $900, the calculator tests whether its modeled spouse amount exceeds Worker 2’s adjusted own benefit and displays the difference as a spousal boost."
          conclusion="Important assumptions and limitations — This is a planning model, not an SSA benefit determination. It hard-codes FRA 67, fixed ages 60 and 58 internally, a 30-year lifetime horizon, and simplifies deemed filing, family maximums, survivor rules and spouse-specific reductions."
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
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
