'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateRealEstateSyndicationK1 } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [investmentAmount, setInvestmentAmount] = useState(50000)
  const [distributionsReceived, setDistributionsReceived] = useState(18000)
  const [depreciation, setDepreciation] = useState(15000)
  const [gainOnSale, setGainOnSale] = useState(35000)
  const [holdYears, setHoldYears] = useState(5)
  const [taxRate, setTaxRate] = useState(32)
  const result=useMemo(()=>{try{return calculateRealEstateSyndicationK1(investmentAmount,distributionsReceived,depreciation,gainOnSale,holdYears,taxRate)}catch(e){return null}},[investmentAmount, distributionsReceived, depreciation, gainOnSale, holdYears, taxRate])
  return(
    <CalculatorLayout title="Real Estate Syndication K-1 Tax Calculator USA 2026" description="Calculate after-tax returns from real estate syndication K-1 including depreciation shelter, recapture, and capital gains." icon="📋" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="syndication-k1-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Investment Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={investmentAmount} onChange={e=>setInvestmentAmount(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Distributions Received ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={distributionsReceived} onChange={e=>setDistributionsReceived(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Depreciation Pass-Through ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={depreciation} onChange={e=>setDepreciation(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Gain on Sale ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={gainOnSale} onChange={e=>setGainOnSale(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Hold Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={holdYears} onChange={e=>setHoldYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Passive Income Tax" value={result?`${Number(result.passiveIncomeTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Depreciation Benefit" value={result?`${Number(result.depreciationBenefit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Recapture Tax" value={result?`${Number(result.recaptureTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Capital Gains Tax" value={result?`${Number(result.capitalGainsTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Net Profit" value={result?`${Number(result.netProfit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="After-Tax IRR" value={result?`${Number(result.afterTaxIRR).toFixed(1)}%`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📋 Real Estate Syndication K-1 Tax Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate after-tax returns from real estate syndication K-1 including depreciation shelter, recapture, and capital gains.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Real Estate Syndication K-1 Tax Calculator USA 2026" category="finance" intro={`Estimate a simplified after-tax outcome for a real-estate syndication using invested capital, distributions, allocated depreciation, sale gain, holding period and an entered ordinary tax rate.`} howItWorks={`The model taxes positive distributions above depreciation at your entered rate, values the depreciation shelter at that same rate, applies 25% to the smaller of depreciation or sale gain, applies 20% to remaining modeled sale gain, and converts ending profit to an annualized after-tax return.`} tipsSection={`Real K-1 taxation is more complex. Passive-activity limits, basis and at-risk rules, suspended losses, capital accounts, state taxes, NIIT and the character of sale gain can change the result. IRS guidance notes that gain attributable to depreciation may be subject to the 25% unrecaptured Section 1250 rate.`} conclusion={`Use this as a transparent tax-scenario model, not as a substitute for the partnership K-1, Form 4797/Schedule D calculations or tax advice.`}
          benefits={[{title:"Calculator-specific model",text:"Methodology is explained so you can see what the output assumes."},{title:"Scenario testing",text:"Change the inputs to compare outcomes that matter to this calculation."},{title:"Private",text:"Inputs are calculated locally in your browser."}]}
          useCases={[{title:"Decision support",text:"Compare the modeled result before taking the next planning step."},{title:"Assumption check",text:"See which inputs have the largest effect on the result."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
