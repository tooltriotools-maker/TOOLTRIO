'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateQualifiedSmallBusinessStock } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [investmentAmount, setInvestmentAmount] = useState(250000)
  const [holdYears, setHoldYears] = useState(6)
  const [exitMultiple, setExitMultiple] = useState(25)
  const [companyAssetsAtIssuance, setCompanyAssetsAtIssuance] = useState(8000000)
  const result = useMemo(()=>{try{return calculateQualifiedSmallBusinessStock(investmentAmount,holdYears,exitMultiple,companyAssetsAtIssuance)}catch(e){return null}},[investmentAmount, holdYears, exitMultiple, companyAssetsAtIssuance])
  return (
    <CalculatorLayout title="QSBS Section 1202 Calculator USA 2026" description="QSBS Section 1202 Calculator USA 2026" icon="🚀" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="qsbs-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Investment Amount</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={investmentAmount} onChange={e=>setInvestmentAmount(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Holding Period</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={holdYears} onChange={e=>setHoldYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Exit Multiple</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={exitMultiple} onChange={e=>setExitMultiple(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Company Gross Assets at Issuance</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={companyAssetsAtIssuance} onChange={e=>setCompanyAssetsAtIssuance(Number(e.target.value))} step={500000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Exit Value" value={result?`${Number(result.exitValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Total Gain" value={result?`${Number(result.totalGain).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="QSBS Eligible" value={result?String(result.qsbsEligible ? 'Yes ✅' : 'No ❌'):"-"} />
                <ResultCard label="Excluded Gain" value={result?`${Number(result.excludedGain).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Tax Savings from QSBS" value={result?`${Number(result.taxSavingsFromQSBS).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Net Proceeds" value={result?`${Number(result.netProceeds).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">Understanding these results</h2><p className="text-sm text-gray-600">Estimate a potential Section 1202 gain exclusion from an original startup-stock investment. The calculator models exit value, gain, an exclusion cap and simplified federal tax savings, but QSBS qualification depends on facts that four numeric inputs cannot establish.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="QSBS Section 1202 Calculator" category="finance"
          intro="Estimate a potential Section 1202 gain exclusion from an original startup-stock investment. The calculator models exit value, gain, an exclusion cap and simplified federal tax savings, but QSBS qualification depends on facts that four numeric inputs cannot establish."
          howItWorks="Exit value = investment × exit multiple; gain = exit value − investment. The current model treats stock as eligible only when held at least five years and company assets at issuance are below $50 million. It then caps excluded gain at the greater of $10 million or 10× the entered investment and applies a flat 23.8% rate to taxable/excluded gain for illustration."
          tipsSection="Important: the current eligibility test reflects older Section 1202 thresholds and cannot determine original-issuance status, qualified trade/business use, shareholder eligibility or acquisition date. IRS 2025 Schedule D instructions state that the gross-asset threshold is $75 million for stock issued after July 4, 2025, versus $50 million for earlier stock. The page therefore treats its eligibility output as a screening estimate, not a tax conclusion."
          conclusion="The exclusion can be valuable, but eligibility is highly fact-specific. Use the modeled gain and cap as a conversation starter and verify issuance date, corporation status, gross assets, active-business requirements, holding period and the law applicable to the shares."
          benefits={[{title:"Methodology",text:"Explains the exact assumptions used by this ToolTrio model."},{title:"Scenario testing",text:"Change the inputs to see which assumptions drive the result."},{title:"Limitations",text:"Highlights important factors the simplified model does not capture."}]}
          useCases={[{title:"Planning",text:"Build a calculator-specific baseline from your own inputs."},{title:"Sensitivity check",text:"Compare a conservative scenario with a more optimistic one."}]}
          caseStudy={{title:"Worked example",scenario:"Startup shares held six years — Model a $250,000 original investment, six-year hold, 25× exit multiple and $8 million of company assets at issuance.",result:"The model calculates a $6.25 million exit value and $6 million gain, then compares that gain with its modeled Section 1202 exclusion cap.",takeaway:"Use the example to understand the calculation flow, then replace every assumption with values relevant to your situation."}} />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
