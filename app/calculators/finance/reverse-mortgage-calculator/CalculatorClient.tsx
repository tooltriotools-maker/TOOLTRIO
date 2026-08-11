'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateReverseMortgage } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [homeValue, setHomeValue] = useState(450000)
  const [age, setAge] = useState(72)
  const [existingMortgage, setExistingMortgage] = useState(0)
  const [interestRate, setInterestRate] = useState(7.5)
  const result = useMemo(()=>{try{return calculateReverseMortgage(homeValue,age,existingMortgage,interestRate,'lumpsum')}catch(e){return null}},[homeValue, age, existingMortgage, interestRate])
  return (
    <CalculatorLayout title="Reverse Mortgage Calculator USA 2026" description="Model a simplified FHA HECM-style reverse-mortgage scenario using home value, age, mortgage payoff and interest assumptions; this is not an FHA quote." icon="🏠" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="reverse-mortgage-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Home Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={homeValue} onChange={e=>setHomeValue(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" min={62} max={100} value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Existing Mortgage Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={existingMortgage} onChange={e=>setExistingMortgage(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Interest Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={interestRate} onChange={e=>setInterestRate(Number(e.target.value))} step={0.125} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Principal Limit" value={result?`${Number(result.principalLimit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Available Proceeds" value={result?`${Number(result.availableProceeds).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Closing Costs" value={result?`${Number(result.closingCosts).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Net Proceeds" value={result?`${Number(result.netProceeds).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="10-Year Balance" value={result?`${Number(result.tenYearBalance).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Remaining Equity" value={result?`${Number(result.remainingEquity10yr).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🏠 Reverse Mortgage Calculator USA 2026</h2><p className="text-sm text-gray-600">Explore a simplified reverse-mortgage scenario using home value, borrower age, existing mortgage balance and interest rate, including modeled proceeds, costs and 10-year balance.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Reverse Mortgage Calculator USA 2026" category="finance"
          intro={'This reverse-mortgage planner models a simplified age-based principal-limit scenario using the 2026 HECM maximum claim amount. It is not an FHA HECM quote because official principal-limit factors depend on HUD tables and expected-rate assumptions. It then subtracts an existing mortgage and modeled closing costs, projects the loan balance for ten years, and compares that balance with a home value assumed to appreciate 3% annually.'}
          howItWorks={'The model first caps the property value at the 2026 HECM maximum claim amount of $1,249,125, then applies an explicitly simplified age-band factor. It subtracts the existing mortgage and modeled HECM-style closing costs. The modeled upfront MIP is 2% of the claim amount and the origination fee follows the HUD-style tiered structure capped at $6,000. The age-band factor remains an educational assumption rather than HUD’s official PLF table. The ten-year balance compounds net proceeds monthly at the entered annual interest rate; remaining equity compares that balance with a home value grown at 3% per year. Actual FHA HECM principal-limit factors depend on HUD tables and expected rates, so these age bands are only a simplified illustration.'}
          tipsSection={'Use the property value and current mortgage payoff—not the original purchase price or original loan amount. Interest rate has a large compounding effect on the projected balance. A real HECM also depends on borrower eligibility, FHA maximum claim amount, counseling, property requirements and lender pricing. For 2026, HUD lists a nationwide HECM maximum claim amount of $1,249,125.'}
          conclusion={'The most important output is the relationship among modeled proceeds, growing loan balance and remaining home equity. A reverse mortgage can reduce required monthly mortgage payments while increasing the balance secured by the home. Obtain a HUD-approved counseling session and lender-specific HECM calculation before making a borrowing decision.'}
          caseStudy={{title:'Ten-year equity scenario',scenario:'A 72-year-old homeowner enters a $450,000 home value, no existing mortgage and a 7.5% rate.',result:'The calculator uses its 52% age-band factor to model a $234,000 principal limit, subtracts its modeled closing costs, and compounds the resulting balance for 120 months while assuming the home appreciates 3% per year.',takeaway:'The projection illustrates the tradeoff: accessing equity today can create a materially larger loan balance later, while future home appreciation remains uncertain.'}}
          scienceSection={'Primary reference: HUD’s HECM program page lists the 2026 maximum claim amount at $1,249,125 and publishes official principal-limit-factor resources. The calculator intentionally does not present its simplified age-band factor as an official HUD PLF.'}
          benefits={[{title:'Modeled proceeds',text:'Estimates principal limit, payoff of an existing mortgage and net proceeds after modeled costs.'},{title:'Balance growth',text:'Shows how the entered interest rate compounds the projected loan balance over ten years.'},{title:'Equity comparison',text:'Compares the modeled balance with a home value assumed to grow 3% annually.'}]}
          useCases={[{title:'Stay-in-home planning',text:'Explore whether modeled proceeds could pay off an existing mortgage and leave additional cash.'},{title:'Heir-equity discussion',text:'Compare the projected balance with modeled future home value before discussing estate goals with family or advisers.'}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
