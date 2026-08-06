'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateRealEstateCrowdfunding } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [investAmount, setInvestAmount] = useState(25000)
  const [targetReturn, setTargetReturn] = useState(12)
  const [holdYears, setHoldYears] = useState(5)
  const [platformFee, setPlatformFee] = useState(1.5)
  const [dividendYield, setDividendYield] = useState(6)
  const [preferredReturn, setPreferredReturn] = useState(8)
  const result=useMemo(()=>{try{return calculateRealEstateCrowdfunding(investAmount,targetReturn,holdYears,platformFee,dividendYield,preferredReturn)}catch(e){return null}},[investAmount, targetReturn, holdYears, platformFee, dividendYield, preferredReturn])
  return(
    <CalculatorLayout title="Real Estate Crowdfunding Calculator USA 2026" description="Calculate real estate crowdfunding returns including dividends, appreciation, platform fees, and after-tax IRR." icon="🏢" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="real-estate-crowdfunding-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Investment Amount ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={investAmount} onChange={e=>setInvestAmount(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Target Annual Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={targetReturn} onChange={e=>setTargetReturn(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Hold Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={holdYears} onChange={e=>setHoldYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Platform Fee (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={platformFee} onChange={e=>setPlatformFee(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Annual Dividend Yield (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={dividendYield} onChange={e=>setDividendYield(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Preferred Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={preferredReturn} onChange={e=>setPreferredReturn(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Annual Dividend Income" value={result?`${Number(result.annualDividend).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Total Dividends" value={result?`${Number(result.totalDividends).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Exit Value" value={result?`${Number(result.exitValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total Return" value={result?`${Number(result.totalReturn).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="IRR" value={result?`${Number(result.irr).toFixed(1)}%`:"-"}/>
                <ResultCard label="Net After-Tax Profit" value={result?`${Number(result.netProfit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>
              {result?.yearData&&result.yearData.length>0&&(
                <Card><h3 className="text-sm font-semibold text-gray-700 mb-2">Projection</h3>
                  <div style={{height:200}}><ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={result.yearData} margin={{top:5,right:10,left:0,bottom:0}}>
                      <defs><linearGradient id="cgb7b" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/></linearGradient></defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                      <XAxis dataKey="year" tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false}/>
                      <YAxis tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false} width={60} tickFormatter={v=>`$${v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?(v/1000).toFixed(0)+'k':v}`}/>
                      <Tooltip contentStyle={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,fontSize:12}} formatter={(v:number)=>[`$${v.toLocaleString()}`,'Value']}/>
                      <Area type="monotone" dataKey="value" stroke="#22c55e" strokeWidth={2.5} fill="url(#cgb7b)"/>
                    </AreaChart>
                  </ResponsiveContainer></div>
                </Card>)}
            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🏢 Real Estate Crowdfunding Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate real estate crowdfunding returns including dividends, appreciation, platform fees, and after-tax IRR.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Real Estate Crowdfunding Return Calculator" category="finance"
          intro="Model a private real-estate crowdfunding scenario using an initial investment, target return, holding period, platform fee, dividend yield and preferred-return hurdle. The outputs separate cash distributions, modeled exit value, IRR and a simplified after-tax profit estimate."
          howItWorks="Annual dividends equal investment × dividend yield and are assumed constant. Exit value compounds only the target-return portion not attributed to dividends: investment × (1 + target return − dividend yield)^years. The displayed IRR annualizes total dividends plus exit value. The platform fee affects the chart projection but is not consistently deducted from every headline return, so compare outputs as a simplified scenario rather than a deal waterfall."
          tipsSection="Preferred return here is shown as investment × preferred-return rate × years; the tool does not implement sponsor promotes, catch-ups or tiered waterfalls. Taxes are simplified to 22% on modeled dividends and 20% on modeled appreciation. Actual partnership allocations, depreciation, K-1 items, debt, fees and sale taxes can materially differ. Private real-estate interests can also be illiquid."
          conclusion="Use this page to stress-test assumptions, not to reproduce an offering memorandum. A real deal should be evaluated from its legal documents, fee schedule, distribution waterfall, financing and property-level risks."
          benefits={[{title:"Methodology",text:"Explains the exact assumptions used by this ToolTrio model."},{title:"Scenario testing",text:"Change the inputs to see which assumptions drive the result."},{title:"Limitations",text:"Highlights important factors the simplified model does not capture."}]}
          useCases={[{title:"Planning",text:"Build a calculator-specific baseline from your own inputs."},{title:"Sensitivity check",text:"Compare a conservative scenario with a more optimistic one."}]}
          caseStudy={{title:"Worked example",scenario:"Five-year private-property scenario — Invest $25,000 with a 12% target return, 6% dividend yield, 1.5% platform fee, five-year hold and 8% preferred-return input.",result:"The model calculates $1,500 of annual dividends, compounds the non-dividend portion into an exit value, then estimates total return and IRR from those modeled cash flows.",takeaway:"Use the example to understand the calculation flow, then replace every assumption with values relevant to your situation."}} />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
