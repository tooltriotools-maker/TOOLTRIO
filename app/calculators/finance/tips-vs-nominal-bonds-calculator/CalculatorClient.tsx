'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateTIPSvsBonds } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [tipsFaceValue,setTipsFaceValue]=useState(100000)
  const [tipsRealYield,setTipsRealYield]=useState(1.8)
  const [nominalBondYield,setNominalBondYield]=useState(4.5)
  const [expectedInflation,setExpectedInflation]=useState(3.0)
  const [years,setYears]=useState(10)
  const [taxRate,setTaxRate]=useState(32)
  const result=useMemo(()=>{try{return calculateTIPSvsBonds(tipsFaceValue,tipsRealYield,nominalBondYield,expectedInflation,years,taxRate)}catch(e){return null}},[tipsFaceValue, tipsRealYield, nominalBondYield, expectedInflation, years, taxRate])
  return(
    <CalculatorLayout title="TIPS vs Nominal Bonds Calculator USA 2026" description="Compare TIPS (inflation-protected) vs nominal bonds after tax — find the break-even inflation rate where TIPS becomes the better choice." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="tips-vs-nominal-bonds-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Investment Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={tipsFaceValue} onChange={e=>setTipsFaceValue(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">TIPS Real Yield (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={tipsRealYield} onChange={e=>setTipsRealYield(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Nominal Bond Yield (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={nominalBondYield} onChange={e=>setNominalBondYield(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Expected Inflation (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={expectedInflation} onChange={e=>setExpectedInflation(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={years} onChange={e=>setYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
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
                <ResultCard label="TIPS Final Value" value={result?`${Number(result.totalTIPSValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Nominal Bond Final Value" value={result?`${Number(result.nominalBondValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="TIPS Better" value={result?String(result.tipsBetter ? 'Yes' : 'No — nominal wins'):"-"}/>
                <ResultCard label="Difference" value={result?`${Number(result.difference).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Break-Even Inflation" value={result?`${Number(result.breakEvenInflation).toFixed(1)}%`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📊 TIPS vs Nominal Bonds Calculator USA 2026</h2><p className="text-sm text-gray-600">Compare TIPS (inflation-protected) vs nominal bonds after tax — find the break-even inflation rate where TIPS becomes the better choice.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="TIPS vs Nominal Bonds Calculator USA 2026" category="finance" intro={`Compare a TIPS position with a fixed-rate nominal bond under your own inflation, yield, holding-period and tax assumptions. This is useful for seeing how inflation protection changes the modeled ending value and for checking the simple yield-spread break-even inflation rate.`} howItWorks={`The model inflates TIPS principal by (1 + expected inflation)^years, adds simple real-yield interest, and applies the entered tax rate to modeled TIPS income. The nominal side keeps principal fixed and adds simple coupon interest at the nominal yield. Break-even inflation is shown as nominal yield − TIPS real yield.`} tipsSection={`The model is intentionally simplified: it does not price bonds, reinvest coupons, model changing CPI, accrued interest, market-value changes before maturity, or the exact timing of TIPS inflation adjustments and taxes. TreasuryDirect explains that TIPS principal adjusts with CPI and cannot mature below original principal.`} conclusion={`Use the comparison to test inflation assumptions, not as a forecast of which security will outperform in the market.`}
          benefits={[{title:"Calculator-specific model",text:"Methodology is explained so you can see what the output assumes."},{title:"Scenario testing",text:"Change the inputs to compare outcomes that matter to this calculation."},{title:"Private",text:"Inputs are calculated locally in your browser."}]}
          useCases={[{title:"Decision support",text:"Compare the modeled result before taking the next planning step."},{title:"Assumption check",text:"See which inputs have the largest effect on the result."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
