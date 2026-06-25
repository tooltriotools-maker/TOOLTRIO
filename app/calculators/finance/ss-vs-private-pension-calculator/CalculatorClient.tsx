'use client'
import { calculateSSvsPrivatePension } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [ssMonthly, setSsMonthly] = useState(2200)
  const [pensionMonthly, setPensionMonthly] = useState(1800)
  const [age, setAge] = useState(65)
  const [totalContribPaid, setTotalContribPaid] = useState(180000)

  const result = useMemo(()=>{
    try{return calculateSSvsPrivatePension(ssMonthly, pensionMonthly, age, 35, totalContribPaid)}catch(e){return null}
  },[ssMonthly, pensionMonthly, age, totalContribPaid])

  return (
    <CalculatorLayout title="Social Security vs Private Pension Calculator USA 2026" description="Compare Social Security benefits against private pension plans. Calculate lifetime value, break-even, ROI on contributions, and unique strengths of each." icon="📊" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="ss-vs-private-pension-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly SS Benefit ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={ssMonthly} onChange={e=>setSsMonthly(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Private Pension ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={pensionMonthly} onChange={e=>setPensionMonthly(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Total SS Contributions ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={totalContribPaid} onChange={e=>setTotalContribPaid(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="SS Lifetime Value (to 85)" value={result ? `${Number(result.ssLifetime).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Pension Lifetime Value (to 85)" value={result ? `${Number(result.pensionLifetime).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="SS Better" value={result ? String(result.ssBetter ? 'Yes' : 'No') : "—"} />
                <ResultCard label="SS Contribution ROI" value={result ? `${Number(result.roi).toFixed(1)}%` : "—"} />
                <ResultCard label="Break-Even Years" value={result ? `${Number(result.breakEvenYears).toLocaleString()} years` : "—"} />
                <ResultCard label="SS COLA-Adjusted Value" value={result ? `${Number(result.ssCOLAAdjusted).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📊 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Social Security and private pensions both provide retirement income, but they work differently. Social Security offers COLA inflation protection, survivor benefits, and disability coverage. Private pensions often provide fixed amounts without inflation adjustment. This comparison calculates lifetime value, contribution ROI, and break-even for your specific benefit amounts.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Social Security vs Private Pension Calculator USA 2026" category="finance"
          intro="Social Security and private pensions both provide retirement income, but they work differently. Social Security offers COLA inflation protection, survivor benefits, and disability coverage. Private pensions often provide fixed amounts without inflation adjustment. This comparison calculates lifetime value, contribution ROI, and break-even for your specific benefit amounts."
          howItWorks="Enter your values and results update instantly using 2026 US-standard formulas. All calculations run locally in your browser."
          tipsSection="Try multiple scenarios by changing one input at a time to understand which variable has the most impact."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor."
          benefits={[{title:"Real-Time USA Results",text:"Instant 2026 IRS calculations."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup or paywall."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation with real numbers."},{title:"Scenario Comparison",text:"Change inputs to see the impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
