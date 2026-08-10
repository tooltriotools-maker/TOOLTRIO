'use client'
import { calculateMunicipalBondTEY } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [couponRate, setCouponRate] = useState(4.0)
  const [federalTaxRate, setFederalTaxRate] = useState(32)
  const [stateTaxRate, setStateTaxRate] = useState(9.3)

  const result = useMemo(()=>{
    try{return calculateMunicipalBondTEY(couponRate, federalTaxRate, stateTaxRate, true)}catch(e){return null}
  },[couponRate, federalTaxRate, stateTaxRate])

  return (
    <CalculatorLayout title="Municipal Bond Tax-Equivalent Yield Calculator USA 2026" description="Calculate the tax-equivalent yield of municipal bonds vs taxable bonds. Find out if munis make sense at your federal and state tax rates." icon="🏛️" category="Finance" relatedCalculators={relatedCalculators} slug="municipal-bond-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Muni Bond Coupon Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={couponRate} onChange={e=>setCouponRate(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Federal Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={federalTaxRate} onChange={e=>setFederalTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">State Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={stateTaxRate} onChange={e=>setStateTaxRate(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Tax-Equivalent Yield" value={result ? `${Number(result.taxEquivalentYield).toFixed(1)}%` : "—"} highlight />
                <ResultCard label="Combined Tax Rate" value={result ? `${Number(result.combinedTaxRate).toFixed(1)}%` : "—"} />
                <ResultCard label="After-Tax Muni Yield" value={result ? `${Number(result.afterTaxMuni).toFixed(2)}%` : "—"} />
                <ResultCard label="Break-Even Taxable Yield" value={result ? `${Number(result.breakEvenRate).toFixed(2)}%` : "—"} />
                <ResultCard label="Muni Advantage" value={result ? (result.muniAdvantage ? "Yes" : "No") : "—"} />
                <ResultCard label="Recommendation" value={result ? String(result.recommendation) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏛️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Translate a municipal-bond coupon into a taxable-equivalent yield using the federal and state rates entered on this page. Not every municipal bond is exempt from every tax. AMT exposure, capital gains, residency, bond credit quality, price changes and fund expenses are outside this calculation.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Municipal Bond Tax-Equivalent Yield Calculator USA 2026" category="finance"
          intro="Translate a municipal-bond coupon into a taxable-equivalent yield using the federal and state rates entered on this page."
          howItWorks="For the state-exempt scenario used by the page, combined tax rate = federal + state − federal×state. Tax-equivalent yield = municipal yield ÷ (1 − combined tax rate)."
          tipsSection="Worked example: A 4% tax-exempt municipal yield can require a materially higher taxable yield to produce the same after-tax income for an investor in higher tax brackets."
          conclusion="Important assumptions and limitations: Not every municipal bond is exempt from every tax. AMT exposure, capital gains, residency, bond credit quality, price changes and fund expenses are outside this calculation. Results are educational estimates, not individualized financial, tax, legal or investment advice."
          benefits={[
            {title:"Calculator results",text:"Results update immediately from the inputs and methodology described on this page."},
            {title:"100% Private",text:"Everything runs in your browser. No data stored or transmitted."},
            {title:"Available without a paid plan",text:"No account is required to run the calculation."},
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
