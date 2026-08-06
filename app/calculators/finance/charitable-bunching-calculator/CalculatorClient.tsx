'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateMegaDonorAdvisedBunching } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [annualGivingNormal, setAnnualGivingNormal] = useState(8000)
  const [bunchYears, setBunchYears] = useState(3)
  const [standardDeduction, setStandardDeduction] = useState(16100)
  const [otherItemized, setOtherItemized] = useState(12000)
  const [taxRate, setTaxRate] = useState(24)
  const result = useMemo(()=>{try{return calculateMegaDonorAdvisedBunching(annualGivingNormal,bunchYears,standardDeduction,taxRate,otherItemized)}catch(e){return null}},[annualGivingNormal, bunchYears, standardDeduction, taxRate, otherItemized])
  return (
    <CalculatorLayout title="Charitable Bunching Strategy Calculator USA 2026" description="Calculate the extra tax savings from combining several years of planned charitable giving into a single tax year to clear the standard deduction threshold." icon="🎁" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="charitable-bunching-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Normal Annual Giving</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualGivingNormal} onChange={e=>setAnnualGivingNormal(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years to Bunch Together</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <input type="number" value={bunchYears} onChange={e=>setBunchYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Standard Deduction</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={standardDeduction} onChange={e=>setStandardDeduction(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
            <p className="text-[11px] text-gray-400">2026: $16,100 single / $32,200 married filing jointly</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Other Itemized Deductions</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={otherItemized} onChange={e=>setOtherItemized(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
            <p className="text-[11px] text-gray-400">Mortgage interest, state/local taxes (capped), etc. — everything itemizable besides your giving</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Marginal Tax Rate</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Bunched Amount" value={result?`${Number(result.bunchedAmount).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Total Itemized (Bunch Year)" value={result?`${Number(result.totalItemizedBunchYear).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Itemize Benefit" value={result?`${Number(result.itemizeBenefit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Tax Savings from Bunching" value={result?`${Number(result.taxSavingsFromBunching).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🎁 What these numbers mean</h2><p className="text-sm text-gray-600">"Tax Savings from Bunching" compares itemizing in one concentrated year against taking the standard deduction every year — it's the extra benefit bunching adds on top of what you'd get giving the same total amount spread evenly across years.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Charitable Bunching Strategy Calculator USA 2026" category="finance"
          intro={`If your annual giving plus other itemized deductions falls short of the standard deduction, itemizing every year gets you nothing extra — you're better off just taking the standard deduction and getting no incremental tax benefit from your donations. Bunching fixes this by concentrating several years of giving into one tax year, clearing the standard deduction threshold that year, then taking the standard deduction in the "off" years.

This calculator is for donors who give consistently but whose annual itemized total sits close to (or below) the standard deduction — the exact situation where a donor-advised fund and a bunching strategy typically produce the most extra tax benefit.`}
          howItWorks={`Bunching only helps when your itemized total would otherwise fall short of the standard deduction in a normal year. The calculator compares two paths:

Bunched year: Total Itemized = (Annual Giving × Bunch Years) + Other Itemized Deductions. If this exceeds your standard deduction, the excess — Itemize Benefit = Total Itemized − Standard Deduction — is deductible on top of what the standard deduction alone would give you.

Normal (unbunched) years: each individual year, your itemized total is just Annual Giving + Other Itemized Deductions. If that's below the standard deduction, you'd take the standard deduction and get zero extra benefit from your giving in that year.

Bunching Benefit = Itemize Benefit (bunched year) − Itemize Benefit (summed across the years you'd have otherwise itemized normally). The tax savings from bunching is simply that benefit multiplied by your marginal tax rate:

Tax Savings = Bunching Benefit × Marginal Tax Rate

The 2026 standard deduction is $16,100 for single filers and $32,200 for married couples filing jointly (IRS Revenue Procedure 2025-32) — enter the figure matching your filing status.`}
          keyStats={[
            {stat:'$16,100', source:'2026 standard deduction, single filers (IRS Rev. Proc. 2025-32)'},
            {stat:'$32,200', source:'2026 standard deduction, married filing jointly'},
            {stat:'~90%', source:'Approximate share of US taxpayers who take the standard deduction rather than itemize'},
          ]}
          benefits={[
            {title:'Bunched-Year Itemize Benefit', text:'See exactly how much extra deduction a concentrated giving year produces above your standard deduction.'},
            {title:'True Incremental Savings', text:'Compare bunching against giving the same total amount spread evenly, not against giving nothing at all.'},
            {title:'Filing-Status Aware', text:'Enter your actual 2026 standard deduction so the comparison reflects your real filing status, not a generic assumption.'},
          ]}
          caseStudy={{
            title:'A donor giving $8,000/year, bunching 3 years',
            scenario:'A single filer normally gives $8,000/year and has $12,000 in other itemized deductions (mortgage interest, state/local taxes). Neither figure alone, nor the two combined ($20,000), clears the 2026 single standard deduction of $16,100 by much — so most years they\'d just take the standard deduction anyway.',
            result:'By bunching 3 years of giving ($24,000) into one year through a donor-advised fund, total itemized deductions reach $36,000 — an itemize benefit of $19,900 above the standard deduction. Compared to itemizing normally in each of those years (a combined benefit of roughly $7,800 across 2 of the 3 years), bunching adds about $12,100 in extra deductible amount, worth roughly $2,904 in tax savings at a 24% marginal rate.',
            takeaway:'The donor gives the exact same $24,000 total either way — bunching just changes the tax outcome, not the amount given.'
          }}
          useCases={[
            {title:'Deciding whether a donor-advised fund is worth it', text:'See whether the tax savings from bunching justify setting up and maintaining a DAF, versus giving directly each year.'},
            {title:'Timing a high-income year', text:'If you expect an unusually high-income year (bonus, RSU vesting, business sale), bunching multiple years of giving into that year can offset it at your highest marginal rate.'},
            {title:'Comparing filing statuses', text:'Since the standard deduction differs sharply by filing status, see how married filing jointly vs. single changes whether bunching helps at all.'},
          ]}
          tipsSection={`Bunching adds the most value when your annual giving plus other itemized deductions sits close to — but below — the standard deduction; if you're already well above it every year from mortgage interest and state taxes alone, bunching adds little extra. A donor-advised fund lets you take the full deduction in the bunch year while still distributing grants to charities gradually, so your favorite organizations don't have to wait for a lump sum. The 2026 SALT (state and local tax) deduction cap of $40,400 affects how large "other itemized deductions" can realistically be for high-tax-state filers — check current SALT rules if that's a major component of your itemized total.`}
          commonMistakes={`A common mistake is bunching without a donor-advised fund, which forces an awkward choice: either donate a lump sum directly to one charity in the bunch year (disrupting your normal giving pattern), or scramble to write checks to several charities the same December. A DAF decouples the tax deduction (claimed the year you fund the DAF) from the actual grants (which you can distribute over years at your own pace). Another mistake is ignoring the Pease-style or AGI-based limits on charitable deductions for very large gifts relative to income — most typical donors won't hit these limits, but very large bunched contributions in a single year can.`}
          conclusion={`This calculator estimates the tax value of bunching using your specific giving amount, other deductions, and standard deduction — the actual benefit depends on your exact filing status, whether tax law changes between now and when you'd unwind the strategy, and any AGI-based limits on charitable deductions for large gifts. If bunching multiple years' worth of giving would be a meaningful sum for you, a tax advisor can confirm the exact numbers before you fund a donor-advised fund.`}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
