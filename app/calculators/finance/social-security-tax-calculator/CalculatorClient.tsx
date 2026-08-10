'use client'
import { calculateSocialSecurityTaxability } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [ssBenefit, setSsBenefit] = useState(28000)
  const [otherIncome, setOtherIncome] = useState(40000)

  const result = useMemo(()=>{
    try{return calculateSocialSecurityTaxability(ssBenefit, otherIncome, 'single')}catch(e){return null}
  },[ssBenefit, otherIncome])

  return (
    <CalculatorLayout title="Social Security Benefits Tax Calculator USA 2026" description="Calculate how much of your Social Security is taxable based on combined income. Find the income thresholds and strategies to reduce SS taxation." icon="🏛️" category="Finance" relatedCalculators={relatedCalculators} slug="social-security-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual SS Benefit ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={ssBenefit} onChange={e=>setSsBenefit(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Other Annual Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={otherIncome} onChange={e=>setOtherIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Combined Income" value={result ? `${Number(result.combinedIncome).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Taxable SS Percentage" value={result ? `${Number(result.taxablePercent).toFixed(1)}%` : "—"} />
                <ResultCard label="Taxable SS Amount" value={result ? `${Number(result.taxableSSIncome).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Estimated Tax on SS" value={result ? `${Number(result.estimatedTaxOnSS).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net SS After Tax" value={result ? `${Number(result.netSSBenefit).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏛️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">For federal tax purposes, combined income helps determine whether part of Social Security benefits may be taxable. This ToolTrio version is a simplified single-filer threshold screen: it does not reproduce the full IRS worksheet, so the displayed taxable percentage and flat-rate tax estimate should not be used as a tax-return calculation.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Social Security Benefits Tax Calculator" category="finance"
          intro="Estimate whether Social Security benefits cross the federal combined-income thresholds for a single filer. The current calculator adds other income to half of annual Social Security benefits and classifies the result into 0%, 50% or 85% taxable-benefit bands."
          howItWorks="Combined income in this simplified model = other income + 50% of Social Security benefits. For the hard-coded single filing status, the first threshold is $25,000 and the upper threshold is $34,000. The code then labels 0%, 50% or 85% of all benefits as taxable and estimates tax at a flat 22% rate."
          tipsSection="The IRS rules say up to 50% or up to 85% of benefits may be taxable; the estimated taxable amount is calculated by a worksheet and is not simply 50% or 85% of the entire benefit as soon as a threshold is crossed. Tax-exempt interest can also enter the IRS calculation. Because this calculator currently uses a simplified band method and single filing status only, use it as a threshold screen rather than a tax-return calculation."
          conclusion="The strongest output here is the combined-income threshold check. For an actual return, use the IRS Social Security benefits worksheet or Publication 915, especially near a threshold or when you have tax-exempt interest, married filing status or other adjustments."
          benefits={[{title:"Methodology",text:"Explains the exact assumptions used by this ToolTrio model."},{title:"Scenario testing",text:"Change the inputs to see which assumptions drive the result."},{title:"Limitations",text:"Highlights important factors the simplified model does not capture."}]}
          useCases={[{title:"Planning",text:"Build a calculator-specific baseline from your own inputs."},{title:"Sensitivity check",text:"Compare a conservative scenario with a more optimistic one."}]}
          caseStudy={{title:"Worked example",scenario:"Single retiree threshold check — Enter $28,000 of annual Social Security and $40,000 of other income.",result:"The simplified combined-income figure is $54,000 ($40,000 + half of $28,000), which is above the single-filer upper threshold. The page flags the 85% band but explicitly does not claim that exactly 85% is taxable under the IRS worksheet.",takeaway:"Use the example to understand the calculation flow, then replace every assumption with values relevant to your situation."}} />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
