'use client'
import { calculateAnnuityIncome } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [premium, setPremium] = useState(300000)
  const [age, setAge] = useState(65)
  const [deferralYears, setDeferralYears] = useState(0)
  const [annualReturn, setAnnualReturn] = useState(5)
  const [periodYears, setPeriodYears] = useState(0)

  const result = useMemo(()=>{
    try{return calculateAnnuityIncome(premium, 'immediate', age, deferralYears, annualReturn, 'lifetime', periodYears || 20)}catch(e){return null}
  },[premium, age, deferralYears, annualReturn, periodYears])

  return (
    <CalculatorLayout title="Annuity Income Calculator USA 2026 — Lifetime Income" description="Calculate monthly annuity income, break-even age, tax treatment, and compare immediate vs deferred vs variable annuities." icon="📅" category="Finance" structuredData={} relatedCalculators={relatedCalculators} slug="annuity-income-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Premium / Account Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={premium} onChange={e=>setPremium(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Age at Annuitization</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Deferral Years (0 = immediate)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={deferralYears} onChange={e=>setDeferralYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Expected Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={annualReturn} onChange={e=>setAnnualReturn(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Payout Period (years, 0=lifetime)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={periodYears} onChange={e=>setPeriodYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Accumulated Value" value={result ? `${Number(result.accumulatedValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Monthly Income" value={result ? `${Number(result.monthlyIncome).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Net Monthly (after tax)" value={result ? `${Number(result.netMonthly).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Annual Income" value={result ? `${Number(result.annualIncome).toLocaleString(undefined,{maximumFractionDigits:0})} /yr` : "—"} />
                <ResultCard label="Break-Even Age" value={result ? String(result.breakEvenYears + age) : "—"} />
                <ResultCard label="Lifetime Income" value={result ? `${Number(result.lifetimeIncome).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📅 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Annuities convert a lump sum into a guaranteed income stream — the core appeal being that you cannot outlive the payments. With interest rates elevated in 2026, annuity payout rates are at multi-year highs, making them more attractive relative to bond alternatives. The key trade-off: certainty vs flexibility.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Annuity Income Calculator USA 2026 — Lifetime Income" category="finance"
          intro="Annuities convert a lump sum into a guaranteed income stream — the core appeal being that you cannot outlive the payments. With interest rates elevated in 2026, annuity payout rates are at multi-year highs, making them more attractive relative to bond alternatives. The key trade-off: certainty vs flexibility."
          howItWorks="Enter your values and results update instantly using 2026 US-standard formulas. All calculations run locally in your browser."
          tipsSection="Try multiple scenarios by changing one input at a time to understand which variable has the most impact on your outcome."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor about your specific situation."
          benefits={[
            {title:"Real-Time USA Results",text:"Instant 2026 calculations using current IRS limits and US-standard formulas."},
            {title:"100% Private",text:"Everything runs in your browser. No data stored or transmitted."},
            {title:"Free Forever",text:"No signup, no paywall, no hidden costs."},
          ]}
          useCases={[
            {title:"Personal Planning",text:"Model your specific situation with real numbers before making decisions."},
            {title:"Scenario Comparison",text:"Change one variable at a time to understand the impact of each factor."},
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
