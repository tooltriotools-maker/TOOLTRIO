'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateInvestmentPropertyLeverage } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [propertyValue, setPropertyValue] = useState(350000)
  const [downPercent, setDownPercent] = useState(25)
  const [mortgageRate, setMortgageRate] = useState(7.0)
  const [noi, setNoi] = useState(24000)
  const [appreciationRate, setAppreciationRate] = useState(4)
  const [holdYears, setHoldYears] = useState(10)
  const result=useMemo(()=>{try{return calculateInvestmentPropertyLeverage(propertyValue,downPercent,mortgageRate,noi,appreciationRate,holdYears)}catch(e){return null}},[propertyValue, downPercent, mortgageRate, noi, appreciationRate, holdYears])
  return(
    <CalculatorLayout title="Investment Property Leverage Calculator USA 2026" description="Compare leveraged vs unleveraged returns on investment property — showing how mortgage financing amplifies real estate ROI." icon="🏘️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="investment-property-leverage-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Property Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={propertyValue} onChange={e=>setPropertyValue(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Down Payment (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={downPercent} onChange={e=>setDownPercent(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Mortgage Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={mortgageRate} onChange={e=>setMortgageRate(Number(e.target.value))} step={0.125} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual NOI ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={noi} onChange={e=>setNoi(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Appreciation Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={appreciationRate} onChange={e=>setAppreciationRate(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Hold Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={holdYears} onChange={e=>setHoldYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Annual Cash Flow" value={result?`${Number(result.annualCashFlow).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Cash-on-Cash Return" value={result?`${Number(result.cashOnCash).toFixed(1)}%`:"-"}/>
                <ResultCard label="Cap Rate" value={result?`${Number(result.capRate).toFixed(1)}%`:"-"}/>
                <ResultCard label="Leveraged ROI" value={result?`${Number(result.leveragedROI).toFixed(1)}%`:"-"}/>
                <ResultCard label="Unleveraged ROI" value={result?`${Number(result.unleveragedROI).toFixed(1)}%`:"-"}/>
                <ResultCard label="Leverage Multiplier" value={result?`${Number(result.leverageMultiplier).toFixed(2)}x`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🏘️ Investment Property Leverage Calculator USA 2026</h2><p className="text-sm text-gray-600">Compare leveraged vs unleveraged returns on investment property — showing how mortgage financing amplifies real estate ROI.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <Card className="space-y-5">
          <section><h2 className="text-xl font-black text-gray-900 mb-2">How Investment Property Leverage Calculator Works</h2><p className="text-sm leading-6 text-gray-700">Loan amount = property value − down payment. Annual debt service uses a 30-year amortizing mortgage formula. Cash flow = NOI − annual debt service. Exit value compounds appreciation; remaining mortgage balance is calculated after the holding period, and exit equity equals projected value minus remaining debt.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding the Inputs</h2><p className="text-sm leading-6 text-gray-700">Use property value, down-payment percentage, mortgage interest rate, annual net operating income before debt service, expected appreciation and holding period. NOI should already reflect operating expenses but not mortgage principal and interest.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding Your Results</h2><p className="text-sm leading-6 text-gray-700">Cash-on-cash return measures annual cash flow relative to the down payment. Leveraged ROI includes cumulative modelled cash flow plus exit equity relative to initial down payment. Leverage can amplify gains, but it can also amplify losses when NOI or property value falls.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Worked Example</h2><p className="text-sm leading-6 text-gray-700">Example: on a $500,000 property with 25% down, the loan is $375,000. If NOI is $40,000, annual cash flow is the NOI less the calculated mortgage debt service; projected exit equity also depends heavily on the appreciation assumption.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Important Assumptions and Limitations</h2><p className="text-sm leading-6 text-gray-700">The model assumes a fixed-rate 30-year loan and constant annual NOI. It excludes acquisition/sale costs, vacancy changes, capital expenditures, taxes, depreciation, refinancing, variable rates and transaction fees.</p></section>
        </Card>
        <SEOContent title="Investment Property Leverage Calculator" category="finance" intro="Compare a leveraged rental-property scenario with an unleveraged one using purchase price, down payment, mortgage rate, NOI, appreciation and holding period. The calculator focuses on how debt changes cash flow and return on initial equity." howItWorks="Loan amount = property value − down payment. Annual debt service uses a 30-year amortizing mortgage formula. Cash flow = NOI − annual debt service. Exit value compounds appreciation; remaining mortgage balance is calculated after the holding period, and exit equity equals projected value minus remaining debt." tipsSection="Review the assumptions above before using the result for a real-world decision." conclusion="Use this calculator as an educational estimate, not individualized financial, tax, legal, insurance or investment advice."
          benefits={[{title:"Specific methodology",text:"The page explains the exact assumptions used by this calculator."},{title:"Scenario testing",text:"Change the inputs to understand which assumptions drive the result."},{title:"Private",text:"Calculations run locally in your browser."}]}
          useCases={[{title:"Planning",text:"Create a baseline scenario before comparing alternatives."},{title:"Sensitivity",text:"Test how the result changes when a major assumption moves."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
