'use client'
import { calculateFreelanceIncome } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [hourlyRate, setHourlyRate] = useState(85)
  const [billableHours, setBillableHours] = useState(1400)
  const [selfEmploymentTaxRate, setSelfEmploymentTaxRate] = useState(22)
  const [businessExpenses, setBusinessExpenses] = useState(8000)
  const [healthInsurance, setHealthInsurance] = useState(6000)
  const [retirementContrib, setRetirementContrib] = useState(15000)

  const result = useMemo(()=>{
    try{return calculateFreelanceIncome(hourlyRate, billableHours, selfEmploymentTaxRate, businessExpenses, healthInsurance, retirementContrib)}catch(e){return null}
  },[hourlyRate, billableHours, selfEmploymentTaxRate, businessExpenses, healthInsurance, retirementContrib])

  return (
    <CalculatorLayout title="Freelance Income Tax Calculator USA 2026 — Self-Employed Net Income" description="Calculate freelance take-home pay after self-employment tax, federal income tax, SE deduction, QBI deduction, and quarterly estimated payments." icon="💻" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="freelance-income-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Hourly Rate ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={hourlyRate} onChange={e=>setHourlyRate(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Billable Hours/Year</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={billableHours} onChange={e=>setBillableHours(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={selfEmploymentTaxRate} onChange={e=>setSelfEmploymentTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Business Expenses ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={businessExpenses} onChange={e=>setBusinessExpenses(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Health Insurance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={healthInsurance} onChange={e=>setHealthInsurance(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Retirement Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={retirementContrib} onChange={e=>setRetirementContrib(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Gross Revenue" value={result ? `${Number(result.grossRevenue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="SE Tax" value={result ? `${Number(result.seTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Federal Tax" value={result ? `${Number(result.federalTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Take-Home" value={result ? `${Number(result.netTakeHome).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Effective Hourly Rate" value={result ? `${Number(result.effectiveHourlyRate).toLocaleString(undefined,{maximumFractionDigits:0})} /hr` : "—"} />
                <ResultCard label="Equivalent Salary" value={result ? `${Number(result.equivalentSalary).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💻 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Freelancers keep less of each dollar than W-2 employees because they pay both employee and employer portions of FICA (15.3%), making gross revenue a misleading measure. A $85/hour freelancer billing 1,400 hours = $119,000 gross, but after SE tax, federal tax, and necessary deductions, take-home may be $65,000-$75,000. Understanding effective hourly rate and salary equivalent is essential for freelance pricing.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Freelance Income Tax Calculator USA 2026 — Self-Employed Net Income" category="finance"
          intro="Freelancers keep less of each dollar than W-2 employees because they pay both employee and employer portions of FICA (15.3%), making gross revenue a misleading measure. A $85/hour freelancer billing 1,400 hours = $119,000 gross, but after SE tax, federal tax, and necessary deductions, take-home may be $65,000-$75,000. Understanding effective hourly rate and salary equivalent is essential for freelance pricing."
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
