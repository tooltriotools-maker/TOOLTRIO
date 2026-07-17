'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateStockSplitValue } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [sharesOwned, setSharesOwned] = useState(100)
  const [pricePerShare, setPricePerShare] = useState(150)
  const [splitNum, setSplitNum] = useState(2)
  const result=useMemo(()=>{try{return calculateStockSplitValue(sharesOwned,pricePerShare,splitNum+':1')}catch(e){return null}},[sharesOwned, pricePerShare, splitNum])
  return(
    <CalculatorLayout title="Stock Split Calculator USA 2026" description="Calculate shares and price after any stock split ratio. Includes reverse splits and adjusted cost basis per share." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="stock-split-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Shares Owned</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={sharesOwned} onChange={e=>setSharesOwned(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Price Per Share ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={pricePerShare} onChange={e=>setPricePerShare(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Split Ratio (e.g. 2 for 2:1)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={splitNum} onChange={e=>setSplitNum(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Shares After Split" value={result?String(result.sharesAfter):"-"} highlight/>
                <ResultCard label="Price After Split" value={result?`${Number(result.priceAfter).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total Value (unchanged)" value={result?`${Number(result.totalValueAfter).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="New Cost Basis/Share" value={result?`${Number(result.costBasisPerShareAfter).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Split Type" value={result?String(result.splitType):"-"}/>
                <ResultCard label="Tax Note" value={result?String(result.taxNote):"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📊 Stock Split Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate shares and price after any stock split ratio. Includes reverse splits and adjusted cost basis per share.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Stock Split Calculator USA 2026" category="finance" intro="Calculate shares and price after any stock split ratio. Includes reverse splits and adjusted cost basis per share." howItWorks="Enter values for instant 2026 US-standard results." tipsSection="Try different scenarios." conclusion="Consult a financial advisor for personalized advice."
          benefits={[{title:"Real-Time",text:"2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
