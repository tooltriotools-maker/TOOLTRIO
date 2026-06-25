'use client'
import { calculateW4Withholding } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];
;relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [annualSalary, setAnnualSalary] = useState(85000)
  const [spouseIncome, setSpouseIncome] = useState(0)
  const [otherIncome, setOtherIncome] = useState(0)
  const [retirement401k, setRetirement401k] = useState(8500)
  const [itemizedDeductions, setItemizedDeductions] = useState(0)
  const [taxCredits, setTaxCredits] = useState(2000)

  const result = useMemo(()=>{
    try{return calculateW4Withholding(annualSalary, spouseIncome, otherIncome, retirement401k, itemizedDeductions, taxCredits)}catch(e){return null}
  },[annualSalary, spouseIncome, otherIncome, retirement401k, itemizedDeductions, taxCredits])

  return (
    <CalculatorLayout title="Tax Withholding W-4 Calculator USA 2026 — Adjust Your W-4" description="Calculate the correct W-4 withholding allowances to owe zero at tax time. Avoid big refunds (free loans to IRS) and underpayment penalties." icon="📋" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="tax-withholding-w4-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Salary ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualSalary} onChange={e=>setAnnualSalary(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Spouse Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={spouseIncome} onChange={e=>setSpouseIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Other Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={otherIncome} onChange={e=>setOtherIncome(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Pre-Tax 401k ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={retirement401k} onChange={e=>setRetirement401k(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Expected Deductions ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={itemizedDeductions} onChange={e=>setItemizedDeductions(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Tax Credits ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={taxCredits} onChange={e=>setTaxCredits(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Estimated Tax Liability" value={result ? `${Number(result.taxLiability).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Current Withholding (est.)" value={result ? `${Number(result.currentWithholding).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Refund or Owe" value={result ? `${Number(result.refundOrOwe).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Suggested W-4 Step 4b" value={result ? `${Number(result.suggestedDeduction).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Monthly Adjustment Needed" value={result ? `${Number(result.monthlyAdjustment).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Status" value={result ? String(result.status) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📋 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The W-4 form determines how much federal tax your employer withholds from each paycheck. Getting it right means neither a large refund (over-withheld) nor a surprise tax bill (under-withheld). The 2020+ redesigned W-4 eliminated allowances — this calculator translates your tax situation into the correct W-4 entries.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Tax Withholding W-4 Calculator USA 2026 — Adjust Your W-4" category="finance"
          intro="The W-4 form determines how much federal tax your employer withholds from each paycheck. Getting it right means neither a large refund (over-withheld) nor a surprise tax bill (under-withheld). The 2020+ redesigned W-4 eliminated allowances — this calculator translates your tax situation into the correct W-4 entries."
          howItWorks="Enter your values and results update instantly using 2026 US-standard formulas. All calculations run locally in your browser."
          tipsSection="Try multiple scenarios by changing one input at a time to understand which variable has the most impact on your outcome."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor about your specific situation."
          benefits={[{title:"Real-Time USA Results",text:"Instant 2026 IRS calculations."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup or paywall."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation with real numbers."},{title:"Scenario Comparison",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
