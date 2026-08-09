'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateDividendGrowthPortfolio } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [initialInvestment, setInitialInvestment] = useState(100000)
  const [yieldOnCost, setYieldOnCost] = useState(3.5)
  const [dividendGrowthRate, setDividendGrowthRate] = useState(7)
  const [shareGrowthRate, setShareGrowthRate] = useState(5)
  const [years, setYears] = useState(25)
  const [taxRate, setTaxRate] = useState(24)
  const result=useMemo(()=>{try{return calculateDividendGrowthPortfolio(initialInvestment,yieldOnCost,dividendGrowthRate,shareGrowthRate,years,taxRate)}catch(e){return null}},[initialInvestment, yieldOnCost, dividendGrowthRate, shareGrowthRate, years, taxRate])
  return(
    <CalculatorLayout title="Dividend Growth Portfolio Calculator USA 2026" description="Model a dividend growth investing strategy — showing how yield on cost compounds as dividends grow faster than price." icon="💰" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="dividend-growth-portfolio-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Initial Investment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={initialInvestment} onChange={e=>setInitialInvestment(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Yield on Cost (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={yieldOnCost} onChange={e=>setYieldOnCost(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Dividend Growth Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={dividendGrowthRate} onChange={e=>setDividendGrowthRate(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Share Price Growth (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={shareGrowthRate} onChange={e=>setShareGrowthRate(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
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
                <ResultCard label="Final Portfolio Value" value={result?`${Number(result.finalPortfolioValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Final Annual Dividend" value={result?`${Number(result.finalAnnualDividend).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Final Yield on Cost" value={result?`${Number(result.finalYieldOnCost).toFixed(1)}%`:"-"}/>
                <ResultCard label="Total Dividends Received" value={result?`${Number(result.totalDividendsReceived).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total Return" value={result?`${Number(result.totalReturn).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>
              {result?.yearData&&result.yearData.length>0&&(
                <Card><h3 className="text-sm font-semibold text-gray-700 mb-2">Projection</h3>
                  <div style={{height:200}}><ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={result.yearData} margin={{top:5,right:10,left:0,bottom:0}}>
                      <defs><linearGradient id="cgb7" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                      <XAxis dataKey={Object.prototype.hasOwnProperty.call(result.yearData[0] ?? {}, 'age')?"age":"year"} tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false} width={60} tickFormatter={v=>`$${v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?(v/1000).toFixed(0)+'k':v}`}/>
                      <Tooltip contentStyle={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,fontSize:12}} formatter={(v:number)=>[`$${v.toLocaleString()}`,'Value']}/>
                      <Area type="monotone" dataKey={Object.keys(result.yearData[0]||{}).filter(k=>!['year','age'].includes(k))[0]||'balance'} stroke="#22c55e" strokeWidth={2.5} fill="url(#cgb7)"/>
                    </AreaChart>
                  </ResponsiveContainer></div>
                </Card>)}
            <Card><h2 className="text-lg font-black text-gray-900 mb-2">💰 Dividend Growth Portfolio Calculator USA 2026</h2><p className="text-sm text-gray-600">Model a dividend growth investing strategy — showing how yield on cost compounds as dividends grow faster than price.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Dividend Growth Portfolio Calculator" category="finance"
          intro="Project a dividend-paying portfolio under separate assumptions for starting yield, annual dividend growth and share-price growth. The tool shows how annual cash dividends, yield on original cost and portfolio value can evolve over the selected horizon without assuming dividend reinvestment."
          howItWorks="Starting annual dividend = initial investment × starting yield. Each year, dividends grow by the dividend-growth input and portfolio value grows independently by the share-growth input. Yield on cost = that year's dividend ÷ original investment. Total dividends are summed across the projection. The current code computes a net-dividend series using tax rate × 15%, but headline total dividends remain gross."
          tipsSection="Dividend growth and share-price growth are independent assumptions and neither is guaranteed. The model does not reinvest dividends, model dividend cuts, changing yields, valuation multiples, inflation, trading costs or sequence effects. Its tax treatment is a simplified internal assumption and should not be read as your qualified-dividend tax rate."
          conclusion="This calculator is useful for seeing the difference between dividend growth, yield on cost and market-value growth. It is not a forecast of any stock or fund and does not imply that a high future yield on cost makes the investment low risk."
          benefits={[{title:"Methodology",text:"Explains the exact assumptions used by this ToolTrio model."},{title:"Scenario testing",text:"Change the inputs to see which assumptions drive the result."},{title:"Limitations",text:"Highlights important factors the simplified model does not capture."}]}
          useCases={[{title:"Planning",text:"Build a calculator-specific baseline from your own inputs."},{title:"Sensitivity check",text:"Compare a conservative scenario with a more optimistic one."}]}
          caseStudy={{title:"Worked example",scenario:"Long-term dividend-growth scenario — Start with $100,000 at a 3.5% dividend yield, assume dividends grow 7% annually and portfolio value grows 5% annually for 25 years.",result:"The first modeled dividend is $3,500. Later annual dividends compound at 7%, while portfolio value follows a separate 5% path; yield on cost always uses the original $100,000 denominator.",takeaway:"Use the example to understand the calculation flow, then replace every assumption with values relevant to your situation."}} />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
