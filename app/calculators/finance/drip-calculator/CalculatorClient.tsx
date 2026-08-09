'use client'
import { calculateDividendReinvestment } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [initialShares, setInitialShares] = useState(100)
  const [pricePerShare, setPricePerShare] = useState(50)
  const [annualDividend, setAnnualDividend] = useState(2.5)
  const [dividendGrowth, setDividendGrowth] = useState(5)
  const [priceGrowth, setPriceGrowth] = useState(7)
  const [years, setYears] = useState(20)

  const result = useMemo(()=>{
    try{return calculateDividendReinvestment(initialShares, pricePerShare, annualDividend, dividendGrowth, priceGrowth, years, true)}catch(e){return null}
  },[initialShares, pricePerShare, annualDividend, dividendGrowth, priceGrowth, years])

  return (
    <CalculatorLayout title="DRIP Calculator USA 2026 — Dividend Reinvestment Plan" description="Calculate how reinvesting dividends compounds wealth vs taking cash — share accumulation, portfolio growth, and total return over time." icon="💧" category="Finance" relatedCalculators={relatedCalculators} slug="drip-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Initial Shares</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={initialShares} onChange={e=>setInitialShares(Number(e.target.value))} step={10} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">shares</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Price Per Share ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={pricePerShare} onChange={e=>setPricePerShare(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Dividend Per Share ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualDividend} onChange={e=>setAnnualDividend(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Dividend Growth Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={dividendGrowth} onChange={e=>setDividendGrowth(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Price Appreciation (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={priceGrowth} onChange={e=>setPriceGrowth(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={years} onChange={e=>setYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Final Portfolio Value (DRIP)" value={result ? `${Number(result.finalValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Without DRIP" value={result ? `${Number(result.withoutDrip).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="DRIP Benefit" value={result ? `${Number(result.dripBenefit).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Dividends Reinvested" value={result ? `${Number(result.totalDividends).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Final Share Count" value={result ? `${Number(result.finalShares).toLocaleString()} shares` : "—"} />
                <ResultCard label="Total Return" value={result ? `${Number(result.totalReturn).toFixed(1)}%` : "—"} />
              </div>
              {result?.yearData && result.yearData.length > 0 && (
                <Card>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Projection Over Time</h3>
                  <div style={{height:220}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.yearData} margin={{top:5,right:10,left:0,bottom:0}}>
                        <defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                        <XAxis dataKey={Object.prototype.hasOwnProperty.call(result.yearData[0] ?? {}, 'age') ? "age" : "year"} tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false}/>
                        <YAxis tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false} width={65} tickFormatter={v=>`$${v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?(v/1000).toFixed(0)+'k':v}`}/>
                        <Tooltip contentStyle={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,fontSize:12}} formatter={(v:number)=>[`$${v.toLocaleString()}`,'Value']}/>
                        <Area type="monotone" dataKey={Object.keys(result.yearData[0]||{}).find(k=>k!=='year'&&k!=='age'&&k!=='progress'&&k!=='fireNumber'&&k!=='fireReached')||'balance'} name="Balance" stroke="#22c55e" strokeWidth={2.5} fill="url(#cg)"/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}
              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💧 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">DRIP investing turns dividend payments into more shares, which generate more dividends, which buy more shares — a compounding cycle that dramatically amplifies long-term returns. The difference between taking dividends as cash vs reinvesting can be 50-100% more wealth over 20+ years from the same initial investment.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="DRIP Calculator USA 2026 — Dividend Reinvestment Plan" category="finance"
          intro={'This DRIP model shows how cash dividends can buy additional shares, which then participate in future dividends and price changes. It is designed for an investor who wants to compare automatic reinvestment with simply holding the original share count.'}
          howItWorks={'For each modeled year, dividend per share grows by the dividend-growth input. Annual dividends equal current shares × dividend per share. With DRIP enabled, those dividends buy additional shares at the modeled share price before the next year. The share price then grows by the price-appreciation assumption. The comparison without DRIP keeps the original share count. Taxes, trading frictions, dividend timing and fractional-share rules are not modeled.'}
          tipsSection={'Use conservative dividend-growth and price-growth assumptions. A company can cut or suspend its dividend, and a higher dividend yield does not guarantee a higher total return.'}
          conclusion={'The output is a deterministic compounding scenario, not a forecast. It is most useful for understanding the mechanics of reinvestment and the sensitivity to dividend and share-price growth assumptions.'}
          benefits={[{title:'Share accumulation',text:'Track how reinvested distributions increase the modeled share count.'},{title:'DRIP benefit',text:'Compare the final modeled value with holding only the original shares.'},{title:'Dividend stream',text:'See annual modeled dividends as both the dividend per share and share count evolve.'}]}
          useCases={[{title:'Dividend-growth stock',text:'Test how a rising dividend can accelerate share accumulation over a long holding period.'},{title:'No-reinvestment comparison',text:'Quantify the model difference between reinvesting distributions and leaving the original share count unchanged.'}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
