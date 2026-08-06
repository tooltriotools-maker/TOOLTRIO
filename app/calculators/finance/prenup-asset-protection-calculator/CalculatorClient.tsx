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
          intro={`This calculator estimates the dollar value a prenuptial agreement could protect if a marriage ends in divorce — specifically for people entering a marriage with pre-existing wealth, such as a business they founded, an inheritance, or savings built before the wedding.\n\nIt's built for two groups: business owners who don't want a divorce to force a buyout, sale, or ownership dispute with a former spouse, and anyone bringing meaningful separate assets into a marriage who wants to understand what a court might otherwise treat as shared property. The tool compares two outcomes side by side — what a judge might award your spouse without a prenup versus what a properly drafted agreement can keep classified as yours alone.\n\nThe three inputs that drive the estimate are your separate property value, your business value (if applicable), and years married — because most equitable-distribution states phase in a spouse's claim on separate assets gradually as a marriage lengthens and finances become intertwined, rather than granting an equal claim from day one.`}
          howItWorks={`The calculator models two scenarios using simplified equitable-distribution logic, which is how most U.S. states (all except the nine community-property states) approach divorce asset division.\n\nExposure Without Prenup = (Separate Property + Business Value) x 35% x min(1, Years Married / 10)\n\nThe 35% factor reflects a common judicial pattern: courts in equitable-distribution states don't split separate property 50/50 the way community-property states might, but they can still award a spouse a meaningful share once assets have commingled or a spouse has contributed (directly or indirectly) to a business's growth. The min(1, Years Married / 10) term phases that exposure in over the first decade — a 2-year marriage carries much less commingling risk than a 12-year one.\n\nBusiness Appreciation = Business Value x 6% x Years Married\n\nThis estimates how much your business might grow in value over the course of the marriage, using a 6% annual growth assumption. Growth in a business's value during a marriage is one of the most commonly disputed items in divorce — even if you owned the business before marriage, courts in many states can treat the appreciation that happened during the marriage as a joint marital asset unless a prenup specifically addresses it.\n\nWith a prenup that clearly classifies separate property and includes an appreciation clause, the calculator assumes the full separate property and business value stay protected, plus roughly 70% of the business's in-marriage appreciation (accounting for the reality that even strong agreements sometimes concede some appreciation, especially if a spouse actively worked in the business).`}
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
            result: "At 10 years married, without a prenup the calculator estimates roughly $297,500 of exposure ((350,000+500,000) x 35% x 1.0). With a prenup, the $850,000 in starting assets stays protected, plus about 70% of the $300,000 in estimated practice appreciation over that decade — for a total estimated protection near $1.06 million.",
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
