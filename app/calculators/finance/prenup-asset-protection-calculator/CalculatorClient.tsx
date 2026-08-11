'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculatePrenupAssetProtection } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [separatePropertyValue, setSeparatePropertyValue] = useState(350000)
  const [businessValue, setBusinessValue] = useState(500000)
  const [yearsMarried, setYearsMarried] = useState(10)
  const result = useMemo(()=>{try{return calculatePrenupAssetProtection(separatePropertyValue,0,businessValue,yearsMarried,'equitableDistribution')}catch(e){return null}},[separatePropertyValue, businessValue, yearsMarried])
  return (
    <CalculatorLayout title="Prenup Asset Protection Calculator USA 2026" description="Prenup Asset Protection Calculator USA 2026" icon="📋" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="prenup-asset-protection-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Separate Property Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={separatePropertyValue} onChange={e=>setSeparatePropertyValue(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Business Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={businessValue} onChange={e=>setBusinessValue(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years Married</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={yearsMarried} onChange={e=>setYearsMarried(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Exposure Without Prenup" value={result?`${Number(result.withoutPrenupExposure).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Protected With Prenup" value={result?`${Number(result.withPrenupProtected).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Business Appreciation" value={result?`${Number(result.appreciationDuringMarriage).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Total Protection" value={result?`${Number(result.totalAssetProtection).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="ROI on Prenup" value={result?`${Number(result.roiOnPrenup).toFixed(2)}x`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📋 Your Asset Protection Snapshot</h2><p className="text-sm text-gray-600">Based on {yearsMarried} year{yearsMarried===1?'':'s'} of marriage, a prenup could protect roughly ${result?Number(result.withPrenupProtected).toLocaleString():'-'} of separate property and business value that would otherwise be exposed to division.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="Prenup Asset Protection Calculator USA 2026"
          category="finance"
          intro={`This calculator shows the value of assets you may want a prenuptial agreement to address if a marriage ends in divorce — specifically for people entering a marriage with pre-existing wealth, such as a business they founded, an inheritance, or savings built before the wedding.\n\nIt's built for two groups: business owners who don't want a divorce to force a buyout, sale, or ownership dispute with a former spouse, and anyone bringing meaningful separate assets into a marriage who wants to understand what a court might otherwise treat as shared property. The tool compares two outcomes side by side — a neutral asset-value scenario rather than a prediction of what a judge would award.\n\nThe inputs describe the assets and marriage context. Years married is shown for context only; it is not converted into a fabricated percentage exposure.`}
          howItWorks={`This page is a scenario worksheet, not a prediction of a divorce award. It adds the separate-property and business values you enter and labels that amount as assets that could be addressed by a prenuptial agreement if the agreement is valid and enforceable. It intentionally does not invent a judicial percentage, assume a fixed business growth rate, or claim that a prenup guarantees protection. Actual treatment depends on state law, characterization of property, commingling, contributions, disclosure, execution and the agreement's terms.`}
          benefits={[
            {title:"Exposure Without a Prenup", text:"See a dollar estimate of what a court in an equitable-distribution state might award your spouse from your separate property and business, absent any agreement."},
            {title:"Business Appreciation Risk", text:"Understand how much of your business's growth during the marriage could become a marital asset dispute, independent of its starting value."},
            {title:"Protection With a Prenup", text:"See the value a well-drafted, properly executed prenup could keep classified as separate property."},
            {title:"Rough ROI on Legal Fees", text:"Compare the value protected against a typical drafting-cost estimate to gauge whether legal fees are proportionate to what's at stake."},
          ]}
          useCases={[
            {title:"Founder marrying before an exit", text:"A startup founder with equity that hasn't been valued or sold yet wants to understand how much of that stake a future divorce could put at risk if it appreciates significantly during the marriage."},
            {title:"Second marriage with inherited assets", text:"Someone remarrying later in life, with an inheritance or retirement savings they want to preserve for children from a prior relationship, models what stays separate under a prenup versus community efforts."},
            {title:"Small business owner with a spouse joining the business", text:"An owner whose future spouse plans to work in the business needs to think through how 'sweat equity' contributions could affect the appreciation-sharing terms of a prenup, not just the starting valuation."},
          ]}
          caseStudy={{
            title: "A dental practice owner marries at 34",
            scenario: "Dr. Patel owns a dental practice valued at $500,000 and has $350,000 in pre-marital savings and investments when she marries. She and her spouse plan to stay married long-term.",
            result: "The worksheet reports the $850,000 of entered separate-property and business value as the assets addressed by the enforceable-prenup scenario. It does not predict what a court would award or forecast business appreciation.",
            takeaway: "The gap between the two scenarios widens the longer the marriage lasts and the faster the business grows — which is exactly why appreciation clauses, not just a static list of separate assets, matter in a prenup for business owners.",
          }}
          mistakesDetailed={[
            {mistake: "Treating a prenup as a one-time document that never needs updating", fix: "Revisit the agreement (or add a postnuptial amendment) after major events — a business valuation jump, an acquisition offer, or a new business line — since a stale valuation weakens enforceability arguments later."},
            {mistake: "Commingling separate funds into joint accounts", fix: "Keep inherited money, pre-marital savings, and business distributions in accounts titled solely in your name — depositing them into a joint account is one of the most common ways separate property becomes marital property regardless of what the prenup says."},
            {mistake: "One spouse using the same attorney to 'save money'", fix: "Independent legal counsel for each party is one of the strongest factors courts weigh when deciding whether to enforce a prenup — skipping it to save a few thousand dollars is the single most common reason agreements get thrown out."},
            {mistake: "Incomplete financial disclosure", fix: "Both spouses should exchange a full, honest accounting of assets, debts, and income before signing — an agreement built on hidden or understated assets is highly vulnerable to challenge."},
          ]}
          tipsSection={`This tool assumes an equitable-distribution state. The nine community-property states (Arizona, California, Idaho, Louisiana, Nevada, New Mexico, Texas, Washington, and Wisconsin) generally start from a presumption of a 50/50 split of marital property, so exposure without a prenup tends to run higher there than this estimate — a state-specific attorney can tell you exactly how your state treats separate versus marital property.\n\nIf your business involves co-founders or outside investors, loop in a business attorney alongside your family law attorney — a prenup alone can't override obligations in a shareholder or operating agreement.`}
          conclusion={`A prenuptial agreement is a legal tool for clarifying — in advance, while both parties can negotiate calmly — which assets stay separate and how future appreciation is treated. The numbers above are a simplified estimate meant to illustrate the scale of what's typically at stake, not a prediction of what any specific court would award; actual outcomes depend heavily on state law, how the assets were handled during the marriage, and the specific terms a court finds enforceable.\n\nIf the estimated exposure feels significant relative to your situation, that's usually a sign it's worth a conversation with a family law attorney before the wedding, not after a dispute arises.`}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
