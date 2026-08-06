'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateAlimonySupport } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [payorIncome, setPayorIncome] = useState(120000)
  const [recipientIncome, setRecipientIncome] = useState(45000)
  const [marriageDurationYears, setMarriageDurationYears] = useState(12)
  const result = useMemo(()=>{try{return calculateAlimonySupport(payorIncome,recipientIncome,marriageDurationYears,'other')}catch(e){return null}},[payorIncome, recipientIncome, marriageDurationYears])
  return (
    <CalculatorLayout title="Alimony & Spousal Support Calculator USA 2026" description="Estimate a rough spousal-support range using common income-gap and marriage-length guideline formulas — a starting point for planning, not a substitute for a family-law attorney or your state's actual guidelines." icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="alimony-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Higher Earner's Annual Income</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={payorIncome} onChange={e=>setPayorIncome(Number(e.target.value))} step={2000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Lower Earner's Annual Income</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={recipientIncome} onChange={e=>setRecipientIncome(Number(e.target.value))} step={2000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Length of Marriage</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={marriageDurationYears} onChange={e=>setMarriageDurationYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Monthly Alimony" value={result?`${Number(result.monthlyAlimony).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Annual Alimony" value={result?`${Number(result.annualAlimony).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Duration Guideline" value={result?`${Number(result.durationGuidelineYears)} yrs`:"-"} />
                <ResultCard label="Lifetime Estimate" value={result?`${Number(result.lifetimeEstimate).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">⚖️ What these numbers mean</h2><p className="text-sm text-gray-600">"Duration Guideline" is a rough rule-of-thumb, not a legal rule — most states give judges discretion over how long support lasts. "Lifetime Estimate" simply multiplies the monthly figure by the guideline duration; it doesn't account for cost-of-living changes, remarriage, or a support modification down the road.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Alimony & Spousal Support Calculator USA 2026" category="finance"
          intro={`Most states give family court judges broad discretion over alimony — there's no single national formula. But several states publish advisory guideline formulas based on the income gap between spouses, and courts everywhere weigh marriage length heavily when setting both the amount and the duration of support.

This calculator applies the two most commonly referenced guideline formulas (used as informal benchmarks in California and New York courts, and a general income-gap formula for other states) to give you a realistic planning range before mediation or a settlement conversation — not a legal prediction of what a judge will actually order.`}
          howItWorks={`Enter each spouse's income and the marriage length, and the calculator estimates monthly support using one of these guideline approaches:

California-style formula: Monthly Support = (Payor Income × 40% − Recipient Income × 50%) ÷ 12

New York-style formula: Monthly Support = (Payor Income × 20% − Recipient Income × 25%) ÷ 12

General income-gap formula (used for other states): Monthly Support = (Income Difference × 25%) ÷ 12

For duration, the calculator applies a common rule-of-thumb: roughly half the marriage length for marriages under 10 years, roughly 60% of the marriage length for marriages between 10 and 20 years, and potentially indefinite/long-term support for marriages over 20 years. These are planning heuristics drawn from patterns in state guidelines — actual judicial orders vary by state, judge, and case-specific factors like health, earning capacity, and child custody arrangements.`}
          benefits={[
            {title:'Guideline-Based Estimate', text:'See a monthly and lifetime support range based on formulas courts commonly reference, not just a guess.'},
            {title:'Duration Modeling', text:'Get a rule-of-thumb duration estimate tied to your specific marriage length, not a one-size-fits-all number.'},
            {title:'Negotiation-Ready Numbers', text:'Walk into mediation or settlement talks with a defensible starting range instead of an anchor pulled from nowhere.'},
          ]}
          comparisonTable={[
            {label:'California-style guideline', value:'(40% payor − 50% recipient income) ÷ 12', note:'Used informally as a temporary-support benchmark in CA courts'},
            {label:'New York-style guideline', value:'(20% payor − 25% recipient income) ÷ 12', note:'New York publishes an advisory statutory formula'},
            {label:'General/other-state formula', value:'25% of income difference ÷ 12', note:'A simplified approximation — many states use pure judicial discretion instead'},
          ]}
          caseStudy={{
            title:'A 12-year marriage with a real income gap',
            scenario:'One spouse earns $120,000/year, the other $45,000/year, after a 12-year marriage. Using the general income-gap formula: a $75,000 annual difference × 25% ÷ 12 months ≈ $1,563/month.',
            result:'The duration guideline for a 12-year marriage (10–20 year band) suggests roughly 7.2 years of support, for a lifetime estimate near $135,000 — before any modification, remarriage, or change in either spouse\'s income.',
            takeaway:'The monthly number and the duration are two separate estimates — a modest monthly amount over 7+ years can still add up to a six-figure lifetime total.'
          }}
          useCases={[
            {title:'Preparing for mediation or settlement talks', text:'Walk into a negotiation with a realistic range instead of a guess, so you can evaluate whether an opposing proposal is in the ballpark.'},
            {title:'Budgeting after a likely divorce', text:'Estimate monthly cash flow — either paying or receiving support — to plan a post-divorce budget before the final order is entered.'},
            {title:'Comparing state guideline approaches', text:'If you\'re deciding where to file or how state residency might affect an outcome, compare how different guideline formulas treat the same income numbers.'},
          ]}
          tipsSection={`Alimony guideline formulas are meant for negotiation and temporary orders — permanent support orders in most states are set by judicial discretion, weighing factors like health, age, earning capacity, child custody, and standard of living during the marriage, not a single formula. Short marriages (typically under 5 years) often result in little or no alimony regardless of the income gap. If your state has an official statutory guideline (New York and a handful of others do), check it directly rather than relying solely on this general estimate.`}
          commonMistakes={`A common mistake is assuming alimony works like child support, with a fixed, enforceable formula every judge must follow — in most states it doesn't, and two judges can reach different numbers on identical facts. Another is forgetting the 2018 tax law change: for divorces finalized after December 31, 2018, alimony is not tax-deductible to the payer and not taxable income to the recipient, which is the opposite of the pre-2019 rule and can change what a "fair" number actually looks like after taxes for both sides.`}
          conclusion={`Use this calculator to get a realistic planning range, not a prediction of your court order. Real alimony awards depend heavily on your specific state's law, the judge assigned to your case, and factors this calculator doesn't capture — health, custody arrangements, earning capacity versus actual earnings, and marital standard of living among them. A consultation with a family-law attorney licensed in your state is the only reliable way to know what to actually expect.`}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
