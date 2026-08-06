'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateRealEstateOpportunityZone } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [investmentAmount,setInvestmentAmount]=useState(100000)
  const [capitalGain,setCapitalGain]=useState(100000)
  const [holdYears,setHoldYears]=useState(10)
  const [propertyAppreciationRate,setPropertyAppreciationRate]=useState(6)
  const result=useMemo(()=>{try{return calculateRealEstateOpportunityZone(investmentAmount,capitalGain,holdYears,propertyAppreciationRate,5)}catch(e){return null}},[investmentAmount, capitalGain, holdYears, propertyAppreciationRate])
  return(
    <CalculatorLayout title="Opportunity Zone Investment Calculator USA 2026" description="Calculate tax benefits of Opportunity Zone investments — defer capital gains tax and potentially exclude all appreciation if held 10+ years." icon="🏙️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="opportunity-zone-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Investment Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={investmentAmount} onChange={e=>setInvestmentAmount(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Capital Gain to Defer ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={capitalGain} onChange={e=>setCapitalGain(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Hold Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={holdYears} onChange={e=>setHoldYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Property Appreciation Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={propertyAppreciationRate} onChange={e=>setPropertyAppreciationRate(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Deferred Tax Amount" value={result?`${Number(result.deferredTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="OZ Property Value" value={result?`${Number(result.ozPropertyValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Appreciation Excluded" value={result?`${Number(result.appreciationExcluded).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Tax Savings on Exclusion" value={result?`${Number(result.exclusionTaxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Net Tax Benefit" value={result?`${Number(result.netTaxBenefit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Hold Requirement" value={result?String(result.holdRequirement):"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🏙️ Opportunity Zone Investment Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate tax benefits of Opportunity Zone investments — defer capital gains tax and potentially exclude all appreciation if held 10+ years.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <Card className="space-y-5">
          <section><h2 className="text-xl font-black text-gray-900 mb-2">How Opportunity Zone Investment Calculator Works</h2><p className="text-sm leading-6 text-gray-700">The code limits eligible gain to the lesser of capital gain and investment amount, applies a fixed 23.8% assumed tax rate, compounds the investment by the entered appreciation rate, and—at 10+ years—models exclusion of post-investment appreciation. The legacy model also contains old deferral/basis-step-up assumptions.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding the Inputs</h2><p className="text-sm leading-6 text-gray-700">Enter the amount invested, the capital gain associated with the investment, intended holding period and assumed annual appreciation. The calculator hard-codes tax assumptions rather than deriving your actual federal or state rate.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding Your Results</h2><p className="text-sm leading-6 text-gray-700">Property value is a compound-growth projection. “Appreciation excluded” and “tax savings” are scenario outputs based on the model’s assumptions. They are not a determination that a particular fund, gain, investment date or disposition qualifies under current Opportunity Zone law.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Worked Example</h2><p className="text-sm leading-6 text-gray-700">Example: $200,000 invested for 10 years at 5% annual appreciation grows to about $325,779 before taxes and fees. The model then applies its fixed tax assumptions to the $125,779 appreciation.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Important Assumptions and Limitations</h2><p className="text-sm leading-6 text-gray-700">Opportunity Zone law has changed materially. This calculator contains legacy assumptions from the original QOZ regime and should be used only as a scenario model until its tax engine is rebuilt around investment date, gain date, fund qualification and the applicable statutory regime. Consult current IRS guidance before relying on a tax result.</p></section>
        </Card>
        <SEOContent title="Opportunity Zone Investment Calculator" category="finance" intro="Model the investment growth and tax assumptions embedded in this ToolTrio Qualified Opportunity Zone scenario. It is useful for understanding how a long holding period and property appreciation affect the model—not for determining current QOZ eligibility or filing treatment." howItWorks="The code limits eligible gain to the lesser of capital gain and investment amount, applies a fixed 23.8% assumed tax rate, compounds the investment by the entered appreciation rate, and—at 10+ years—models exclusion of post-investment appreciation. The legacy model also contains old deferral/basis-step-up assumptions." tipsSection="Review the assumptions above before using the result for a real-world decision." conclusion="Use this calculator as an educational estimate, not individualized financial, tax, legal, insurance or investment advice."
          benefits={[{title:"Specific methodology",text:"The page explains the exact assumptions used by this calculator."},{title:"Scenario testing",text:"Change the inputs to understand which assumptions drive the result."},{title:"Private",text:"Calculations run locally in your browser."}]}
          useCases={[{title:"Planning",text:"Create a baseline scenario before comparing alternatives."},{title:"Sensitivity",text:"Test how the result changes when a major assumption moves."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
