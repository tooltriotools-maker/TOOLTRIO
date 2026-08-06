'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateTaxExemptBondEquivalent } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [municipalYield, setMunicipalYield] = useState(4.2)
  const [corporateYield, setCorporateYield] = useState(6.1)
  const [treasuryYield, setTreasuryYield] = useState(4.8)
  const [federalRate, setFederalRate] = useState(32)
  const [stateRate, setStateRate] = useState(9.3)

  const result = useMemo(()=>{
    try{return calculateTaxExemptBondEquivalent(municipalYield,corporateYield,treasuryYield,federalRate,stateRate,7.65)}catch(e){return null}
  },[municipalYield, corporateYield, treasuryYield, federalRate, stateRate])

  return (
    <CalculatorLayout title="Tax-Exempt vs Taxable Bond Comparison Calculator USA 2026" description="Compare after-tax yields on municipal bonds vs corporate bonds vs US Treasuries. Calculate the exact tax-equivalent yield for any tax bracket and state." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="tax-exempt-bond-comparison-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Municipal Bond Yield (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={municipalYield} onChange={e=>setMunicipalYield(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Corporate Bond Yield (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={corporateYield} onChange={e=>setCorporateYield(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Treasury Yield (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={treasuryYield} onChange={e=>setTreasuryYield(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Federal Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={federalRate} onChange={e=>setFederalRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">State Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={stateRate} onChange={e=>setStateRate(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Muni Tax-Equiv Yield" value={result ? `${Number(result.muniTEY).toFixed(1)}%` : "—"} highlight />
                <ResultCard label="Corp After-Tax Yield" value={result ? `${Number(result.corpAfterTax).toFixed(1)}%` : "—"} />
                <ResultCard label="Treasury After-Tax Yield" value={result ? `${Number(result.treasuryAfterTax).toFixed(1)}%` : "—"} />
                <ResultCard label="Best Option" value={result ? String(result.best) : "—"} />
                <ResultCard label="Muni Advantage" value={result ? `${Number(result.muniAdvantage).toFixed(1)}%` : "—"} />
                <ResultCard label="On $1M Investment" value={result ? `${Number(result.on100k.muni).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📊 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">For investors in the 32%+ federal tax bracket, municipal bonds often deliver higher after-tax income than comparable corporate bonds — without the credit risk premium that corporations must pay. A 4.2% muni in California at 41.3% combined tax rate has a tax-equivalent yield of 7.16%, decisively beating most investment-grade corporate bonds. This calculator does the exact math for any combination of bond yields and tax rates.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="Tax-Exempt vs Taxable Bond Comparison" category="finance"
          intro="This calculator converts a municipal-bond yield into a tax-equivalent yield and compares after-tax yields for municipal, corporate and Treasury bonds."
          howItWorks="Municipal TEY = muni yield ÷ (1 − federal rate − state rate). Corporate after-tax yield = corporate yield × (1 − federal rate − state rate). Treasury after-tax yield applies federal tax only in this model because Treasury interest is generally exempt from state and local income taxes."
          tipsSection="Worked example: Example: a 4% municipal yield at a combined 30% modeled income-tax rate has a tax-equivalent yield of about 5.71%. That can then be compared with the quoted taxable bond yields."
          conclusion="Important assumptions and limitations: Tax treatment varies by bond, residence and AMT circumstances. The calculator does not compare duration, credit risk, call risk, price volatility or reinvestment risk, so the highest after-tax yield is not automatically the best investment."
          benefits={[{title:"Methodology",text:"The explanation above follows the calculation actually performed by this page."},{title:"Interpret the output",text:"Treat the result as a scenario estimate and test the assumptions that matter most."},{title:"Privacy",text:"Calculator inputs are processed in your browser."}]}
          useCases={[{title:"Decision support",text:"Compare the calculator-specific trade-offs before taking the next step."},{title:"Scenario testing",text:"Change one relevant input at a time and observe which output is most sensitive."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
