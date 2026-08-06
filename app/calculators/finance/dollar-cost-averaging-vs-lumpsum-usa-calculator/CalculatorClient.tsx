'use client'
import { calculateDCAvsLumpSum } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [totalAmount, setTotalAmount] = useState(12000)
  const [dcaMonths, setDcaMonths] = useState(12)
  const [startPrice, setStartPrice] = useState(450)
  const [endPrice, setEndPrice] = useState(580)

  const result = useMemo(()=>{
    try{return calculateDCAvsLumpSum(totalAmount, dcaMonths, startPrice, endPrice, 'index')}catch(e){return null}
  },[totalAmount, dcaMonths, startPrice, endPrice])

  return (
    <CalculatorLayout title="Dollar Cost Averaging vs Lump Sum Calculator USA 2026" description="Compare DCA vs lump sum investing for stocks, index funds, or crypto. Calculate average price, final value, and which strategy wins at different market conditions." icon="📊" category="Finance" relatedCalculators={relatedCalculators} slug="dollar-cost-averaging-vs-lumpsum-usa-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Total Investment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={totalAmount} onChange={e=>setTotalAmount(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">DCA Period (months)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={dcaMonths} onChange={e=>setDcaMonths(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Start Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={startPrice} onChange={e=>setStartPrice(Number(e.target.value))} step={10} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">End Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={endPrice} onChange={e=>setEndPrice(Number(e.target.value))} step={10} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="DCA Monthly Buy" value={result ? `${Number(result.dcaMonthlyBuy).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} highlight />
                <ResultCard label="DCA Average Price" value={result ? `${Number(result.dcaAvgPrice).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="DCA Final Value" value={result ? `${Number(result.dcaValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Lump Sum Final Value" value={result ? `${Number(result.lsValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Winner" value={result ? String(result.winner) : "—"} />
                <ResultCard label="Difference" value={result ? `${Number(result.difference).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>
              {result?.yearData && result.yearData.length > 0 && (
                <Card>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Projection Over Time</h3>
                  <div style={{height:220}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.yearData} margin={{top:5,right:10,left:0,bottom:0}}>
                        <defs><linearGradient id="cgb5" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                        <XAxis dataKey={result.yearData[0]?.month!==undefined?"month":"year"} tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false}/>
                        <YAxis tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false} width={65} tickFormatter={v=>`$${v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?(v/1000).toFixed(0)+'k':v}`}/>
                        <Tooltip contentStyle={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,fontSize:12}} formatter={(v:number)=>[`$${v.toLocaleString()}`,'Value']}/>
                        <Area type="monotone" dataKey={Object.keys(result.yearData[0]||{}).filter(k=>!['year','age','month','price'].includes(k))[0]||'value'} stroke="#22c55e" strokeWidth={2.5} fill="url(#cgb5)"/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}
              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📊 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Dollar-cost averaging invests equal portions at regular intervals, while lump-sum investing puts the available amount to work immediately. This calculator compares the two using your starting and ending prices plus a deterministic simulated path for the monthly DCA purchases. It is useful for understanding timing mechanics, not for predicting which strategy will win in real markets.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Dollar Cost Averaging vs Lump Sum Calculator USA 2026" category="finance" intro="Dollar-cost averaging invests equal portions at regular intervals, while lump-sum investing puts the available amount to work immediately. This calculator compares the two using your starting and ending prices plus a deterministic simulated path for the monthly DCA purchases. It is useful for understanding timing mechanics, not for predicting which strategy will win in real markets."
          howItWorks="The lump-sum side buys all shares at the entered starting price and values them at the ending price. The DCA side divides the amount into equal monthly purchases and generates a deterministic simulated price path from start to end with a small index-fund volatility wave; it then values accumulated shares at the entered ending price. Because the intermediate prices are simulated rather than historical market data, the winner is a scenario result—not evidence that one strategy will outperform in the future."
          tipsSection="Try multiple scenarios by changing one input at a time."
          conclusion="Use these results as a starting point for conversations with a qualified financial advisor."
          benefits={[{title:"Lump-sum scenario",text:"Invest the full amount at the starting price and hold those shares to the ending price."},{title:"DCA scenario",text:"Split the amount into equal monthly purchases along the calculator's simulated price path."},{title:"Average purchase price",text:"See how buying different share quantities at different simulated prices changes the DCA average cost and ending value."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation."},{title:"Scenario Comparison",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
