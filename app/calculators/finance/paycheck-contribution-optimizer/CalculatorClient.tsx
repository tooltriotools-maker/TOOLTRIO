'use client'
import { calculatePaycheckContributionOptimizer } from '@/lib/calculations/finance'
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
  const [grossPay, setGrossPay] = useState(3846)
  const [payFrequency, setPayFrequency] = useState(26)
  const [current401k, setCurrent401k] = useState(750)
  const [currentHSA, setCurrentHSA] = useState(165)
  const [currentFSA, setCurrentFSA] = useState(125)
  const [taxRate, setTaxRate] = useState(24)

  const result = useMemo(()=>{
    try{return calculatePaycheckContributionOptimizer(grossPay, payFrequency, current401k, currentHSA, currentFSA, taxRate)}catch(e){return null}
  },[grossPay, payFrequency, current401k, currentHSA, currentFSA, taxRate])

  return (
    <CalculatorLayout title="Paycheck Contribution Optimizer USA 2026 — Maximize Take-Home & Tax Savings" description="Find the optimal 401k, HSA, and FSA contributions per paycheck to maximize tax savings while maintaining target take-home pay." icon="💵" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="paycheck-contribution-optimizer">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Gross Pay Per Check ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={grossPay} onChange={e=>setGrossPay(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Pay Periods/Year</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={payFrequency} onChange={e=>setPayFrequency(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current 401k Per Check ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={current401k} onChange={e=>setCurrent401k(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current HSA Per Check ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentHSA} onChange={e=>setCurrentHSA(Number(e.target.value))} step={10} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current FSA Per Check ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentFSA} onChange={e=>setCurrentFSA(Number(e.target.value))} step={10} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Optimal 401k/Check" value={result ? `${Number(result.opt401k).toLocaleString(undefined,{maximumFractionDigits:0})} /check` : "—"} highlight />
                <ResultCard label="Optimal HSA/Check" value={result ? `${Number(result.optHSA).toLocaleString(undefined,{maximumFractionDigits:0})} /check` : "—"} />
                <ResultCard label="Optimal FSA/Check" value={result ? `${Number(result.optFSA).toLocaleString(undefined,{maximumFractionDigits:0})} /check` : "—"} />
                <ResultCard label="Current Tax Savings" value={result ? `${Number(result.currentTaxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Optimal Tax Savings" value={result ? `${Number(result.optimalTaxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Additional Annual Savings" value={result ? `${Number(result.additionalSavings).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💵 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Most Americans under-contribute to tax-advantaged accounts, leaving thousands in tax savings on the table each year. Maxing 401k, HSA, and FSA in 2026 can save $7,200-$12,000+ in taxes annually — but the take-home reduction is far smaller than the contribution amount because each pre-tax dollar saves you its tax cost. This optimizer finds the exact numbers for your paycheck.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Paycheck Contribution Optimizer USA 2026 — Maximize Take-Home & Tax Savings" category="finance"
          intro="Most Americans under-contribute to tax-advantaged accounts, leaving thousands in tax savings on the table each year. Maxing 401k, HSA, and FSA in 2026 can save $7,200-$12,000+ in taxes annually — but the take-home reduction is far smaller than the contribution amount because each pre-tax dollar saves you its tax cost. This optimizer finds the exact numbers for your paycheck."
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
