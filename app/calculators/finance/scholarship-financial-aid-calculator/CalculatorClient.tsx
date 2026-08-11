'use client'
import { calculateScholarship } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [efc, setEfc] = useState(15000)
  const [merit, setMerit] = useState(10000)
  const [federalGrant, setFederalGrant] = useState(7395)

  const result = useMemo(()=>{
    try{return calculateScholarship('public', true, 2026, efc, merit, federalGrant)}catch(e){return null}
  },[efc, merit, federalGrant])

  return (
    <CalculatorLayout title="Scholarship & Financial Aid Calculator USA 2026 — College Aid" description="Estimate a college-cost scenario using entered Student Aid Index/family-contribution, federal-grant and merit-aid assumptions. It does not determine FAFSA or Pell eligibility." icon="🎓" category="Finance" relatedCalculators={relatedCalculators} slug="scholarship-financial-aid-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Student Aid Index / family contribution planning input ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={efc} min={0} onChange={e=>setEfc(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Federal Grant Amount (entered for planning) ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2"><span className="text-green-600 text-sm">$</span><input type="number" min={0} value={federalGrant} onChange={e=>setFederalGrant(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" /></div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Merit Scholarship ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={merit} onChange={e=>setMerit(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Annual College Cost (Public)" value={result ? `${Number(result.baseCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Federal Grant (entered)" value={result ? `${Number(result.pellGrant).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Need-Based Aid" value={result ? `${Number(result.needBasedAid).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Cost After Aid" value={result ? `${Number(result.netCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Loans Needed Per Year" value={result ? `${Number(result.loanNeeded).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="4-Year Total Debt" value={result ? `${Number(result.fourYearDebt).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🎓 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">College affordability depends on school cost of attendance, FAFSA-derived Student Aid Index, grants, scholarships and the school's aid offer. This page deliberately does not claim to reproduce the federal Pell or FAFSA formula; the federal-grant amount is entered by the user for scenario planning.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Scholarship & Financial Aid Calculator USA 2026 — College Aid" category="finance"
          intro="Model a simplified college-aid package from school type, residency, your entered family-contribution figure and merit aid. It estimates a planning cost, entered federal grant, planning aid, net cost and a simplified loan split."
          howItWorks="The calculator uses fixed planning costs and user-entered federal and merit grant amounts. Need-based institutional aid is a clearly labeled planning assumption, not an official FAFSA or Pell calculation."
          tipsSection="The federal-grant field is deliberately user-entered. Actual Pell eligibility and federal aid are determined from FAFSA data and federal formulas, not this calculator. School cost of attendance and institutional grants also vary widely."
          conclusion="Use this page for rough scenario planning only; rely on FAFSA and each college’s official aid offer for eligibility and award amounts."
          benefits={[{title:"Aid components",text:"Separates entered federal grant, modeled need-based aid and merit aid."},{title:"Net-cost view",text:"Shows the remaining modeled cost after aid."},{title:"Private",text:"Inputs are calculated locally in your browser."}]}
          useCases={[{title:"College comparison",text:"Test the page’s public, private and community-college planning costs."},{title:"Aid scenario",text:"See how entered merit aid and family contribution change modeled net cost."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
