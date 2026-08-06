'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateGigEconomyTax } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [gigIncome, setGigIncome] = useState(42000)
  const [businessExpenses, setBusinessExpenses] = useState(3500)
  const [milesDriven, setMilesDriven] = useState(18000)
  const [homeOfficePercent, setHomeOfficePercent] = useState(10)
  const [monthlyPhone, setMonthlyPhone] = useState(85)

  const result = useMemo(()=>{
    try{return calculateGigEconomyTax([{name:'Platform',income:gigIncome}],businessExpenses,milesDriven,homeOfficePercent,45,monthlyPhone)}catch(e){return null}
  },[gigIncome, businessExpenses, milesDriven, homeOfficePercent, monthlyPhone])

  return (
    <CalculatorLayout title="Gig Economy Tax Calculator USA 2026 — Uber Lyft DoorDash" description="Calculate net take-home pay from gig work after SE tax, federal income tax, mileage deduction, and quarterly estimated payments for rideshare and delivery drivers." icon="🚗" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="gig-economy-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Total Gig Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={gigIncome} onChange={e=>setGigIncome(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Business Expenses ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={businessExpenses} onChange={e=>setBusinessExpenses(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Miles Driven (business)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={milesDriven} onChange={e=>setMilesDriven(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Home Office %</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={homeOfficePercent} onChange={e=>setHomeOfficePercent(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Phone Bill ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyPhone} onChange={e=>setMonthlyPhone(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Gross Income" value={result ? `${Number(result.totalIncome).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Mileage Deduction" value={result ? `${Number(result.mileageDeduction).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Deductions" value={result ? `${Number(result.totalDeductions).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="SE Tax" value={result ? `${Number(result.seTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Federal Tax" value={result ? `${Number(result.federalTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Take-Home" value={result ? `${Number(result.netTakeHome).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🚗 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Gig workers face a double tax burden — self-employment tax (15.3%) on top of federal income tax. But strategic deductions dramatically reduce the bill. 18,000 business miles at $0.76/mile (Jul–Dec 2026; $0.725 Jan–Jun) = $12,060 in deductions alone. This calculator shows your exact net take-home from any gig income after all deductions and taxes.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="Gig Economy Tax Calculator" category="finance"
          intro="This calculator estimates net self-employment income after entered expenses, business mileage, a modeled home-office amount and business-use phone costs, then applies simplified SE and federal income taxes."
          howItWorks="Net SE income starts with platform income minus deductions. SE tax is modeled as 15.3% of 92.35% of net SE income. Half the SE tax is deducted before a simplified 20% QBI amount and the 2026 single standard deduction are used for a flat 22% federal-tax estimate."
          tipsSection="Worked example: Example: business mileage directly reduces modeled net income. For mileage incurred July–December 2026, the IRS business rate is 76¢ per mile; January–June 2026 uses 72.5¢. The calculator currently applies 76¢ to every mile entered."
          conclusion="Important assumptions and limitations: This is not a Schedule C or quarterly-payment engine. The home-office calculation assumes $18,000 of annual housing cost, phone business use is fixed at 45% by the UI call, and federal income tax is a flat approximation. Keep date-specific mileage records because 2026 has two business mileage rates."
          benefits={[{title:"Methodology",text:"The explanation above follows the calculation actually performed by this page."},{title:"Interpret the output",text:"Treat the result as a scenario estimate and test the assumptions that matter most."},{title:"Privacy",text:"Calculator inputs are processed in your browser."}]}
          useCases={[{title:"Decision support",text:"Compare the calculator-specific trade-offs before taking the next step."},{title:"Scenario testing",text:"Change one relevant input at a time and observe which output is most sensitive."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
