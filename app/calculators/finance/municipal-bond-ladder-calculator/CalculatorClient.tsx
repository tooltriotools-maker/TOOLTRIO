'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateMunicipalBondLadder } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [totalAmount, setTotalAmount] = useState(200000)
  const [rungs, setRungs] = useState(5)
  const [startMaturityYear, setStartMaturityYear] = useState(2027)
  const [avgYield, setAvgYield] = useState(4.0)
  const [taxRate, setTaxRate] = useState(32)
  const [stateRate, setStateRate] = useState(9.3)
  const result=useMemo(()=>{try{return calculateMunicipalBondLadder(totalAmount,rungs,startMaturityYear,avgYield,taxRate,stateRate)}catch(e){return null}},[totalAmount, rungs, startMaturityYear, avgYield, taxRate, stateRate])
  return(
    <CalculatorLayout title="Municipal Bond Ladder Calculator USA 2026" description="Build a staggered municipal bond ladder for tax-free income with regular liquidity events at each rung's maturity." icon="🏛️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="municipal-bond-ladder-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Total Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={totalAmount} onChange={e=>setTotalAmount(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Number of Rungs</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={rungs} onChange={e=>setRungs(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Start Maturity Year</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={startMaturityYear} onChange={e=>setStartMaturityYear(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Average Yield (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={avgYield} onChange={e=>setAvgYield(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Federal Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">State Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={stateRate} onChange={e=>setStateRate(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Amount Per Rung" value={result?`${Number(result.amtPerRung).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Average Yield" value={result?`${Number(result.avgYield).toFixed(1)}%`:"-"}/>
                <ResultCard label="Tax-Equiv Yield" value={result?`${Number(result.tey).toFixed(1)}%`:"-"}/>
                <ResultCard label="Total Annual Income" value={result?`${Number(result.totalAnnualIncome).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Taxable Equiv Income" value={result?`${Number(result.taxableEquivalentIncome).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Annual Tax Savings" value={result?`${Number(result.annualTaxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🏛️ Municipal Bond Ladder Calculator USA 2026</h2><p className="text-sm text-gray-600">Build a staggered municipal bond ladder for tax-free income with regular liquidity events at each rung's maturity.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Municipal Bond Ladder Calculator" category="finance"
          intro="Build a hypothetical municipal-bond ladder by dividing one investment across staggered maturity years. The tool estimates annual tax-exempt interest and a taxable-equivalent yield so you can compare the modeled muni income with taxable fixed-income alternatives."
          howItWorks="The investment is divided equally across the number of rungs. The first rung uses your average yield and each later rung adds 0.10 percentage point, which is a modeling assumption rather than a live yield curve. For each rung: annual interest = amount per rung × modeled yield. Tax-equivalent yield = muni yield ÷ (1 − combined federal and state marginal rate)."
          tipsSection="Use your marginal tax rates, not effective rates, when testing tax-equivalent yield. State exemption is not automatic: municipal interest may receive state/local exemption when the bond and investor meet the applicable rules. The calculator does not price individual bonds, calls, premiums, discounts, credit quality, AMT exposure, transaction costs or reinvestment after maturity."
          conclusion="A ladder can spread maturity dates and make future principal availability easier to visualize, but the displayed yield slope is only a scenario. Review each issuer, call provisions, tax treatment and market price before treating the estimate as an investment return."
          benefits={[{title:"Methodology",text:"Explains the exact assumptions used by this ToolTrio model."},{title:"Scenario testing",text:"Change the inputs to see which assumptions drive the result."},{title:"Limitations",text:"Highlights important factors the simplified model does not capture."}]}
          useCases={[{title:"Planning",text:"Build a calculator-specific baseline from your own inputs."},{title:"Sensitivity check",text:"Compare a conservative scenario with a more optimistic one."}]}
          caseStudy={{title:"Worked example",scenario:"Five-rung $200,000 ladder — A $200,000 allocation is split into five $40,000 rungs beginning in 2027. With a 4.0% starting yield, the model steps later rungs upward by 0.10 percentage point.",result:"The calculator totals the interest from all five modeled rungs and converts it to taxable-equivalent income using the entered federal and state marginal rates.",takeaway:"Use the example to understand the calculation flow, then replace every assumption with values relevant to your situation."}} />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
