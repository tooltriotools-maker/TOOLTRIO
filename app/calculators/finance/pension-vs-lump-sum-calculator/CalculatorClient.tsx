'use client'
import { calculatePensionVsLumpSum } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [monthlyPension, setMonthlyPension] = useState(3200)
  const [lumpSum, setLumpSum] = useState(550000)
  const [age, setAge] = useState(62)
  const [lifeExpectancy, setLifeExpectancy] = useState(85)
  const [discountRate, setDiscountRate] = useState(5)
  const [colaPercent, setColaPercent] = useState(2)

  const result = useMemo(()=>{
    try{return calculatePensionVsLumpSum(monthlyPension, lumpSum, age, lifeExpectancy, discountRate, colaPercent)}catch(e){return null}
  },[monthlyPension, lumpSum, age, lifeExpectancy, discountRate, colaPercent])

  return (
    <CalculatorLayout title="Pension vs Lump Sum Calculator USA 2026" description="Decide between taking a pension annuity or lump sum. Calculate pension present value, break-even age, and which option is worth more over your lifetime." icon="📅" category="Finance" relatedCalculators={relatedCalculators} slug="pension-vs-lump-sum-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Pension ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyPension} onChange={e=>setMonthlyPension(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Lump Sum Offer ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={lumpSum} onChange={e=>setLumpSum(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Your Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Life Expectancy</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={lifeExpectancy} onChange={e=>setLifeExpectancy(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Discount Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={discountRate} onChange={e=>setDiscountRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">COLA (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={colaPercent} onChange={e=>setColaPercent(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Pension Present Value" value={result ? `${Number(result.pensionPV).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Lump Sum Value" value={result ? `${Number(result.lumpSum).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Pension Better" value={result ? String(result.pensionBetter ? 'Yes — take pension' : 'Take lump sum') : "—"} />
                <ResultCard label="Difference" value={result ? `${Number(result.difference).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Break-Even Age" value={result ? String(result.breakEvenAge) : "—"} />
                <ResultCard label="Implied Return" value={result ? `${Number(result.impliedReturn).toFixed(1)}%` : "—"} />
              </div>
              {result?.yearData && result.yearData.length > 0 && (
                <Card>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Projection Over Time</h3>
                  <div style={{height:220}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.yearData} margin={{top:5,right:10,left:0,bottom:0}}>
                        <defs><linearGradient id="cg3" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                        <XAxis dataKey={result.yearData[0]?.age!==undefined?"age":"year"} tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false}/>
                        <YAxis tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false} width={65} tickFormatter={v=>`$${v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?(v/1000).toFixed(0)+'k':v}`}/>
                        <Tooltip contentStyle={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,fontSize:12}} formatter={(v:number)=>[`$${v.toLocaleString()}`,'Value']}/>
                        <Area type="monotone" dataKey={Object.keys(result.yearData[0]||{}).filter(k=>!['year','age','progress','fireNumber','fireReached','month'].includes(k))[0]||'value'} stroke="#22c55e" strokeWidth={2.5} fill="url(#cg3)"/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}
              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📅 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The pension vs lump sum decision is one of the most consequential financial choices in retirement planning. A $550,000 lump sum vs $3,200/month pension for life — which is worth more? The answer depends on life expectancy, investment return assumptions, COLA provisions, and survivor benefits. This calculator models the exact break-even and present value comparison.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title={undefined}
          category="finance"
          intro={'This calculator compares a lifetime monthly pension with a lump-sum offer by discounting future pension payments back to present value and separately projecting how a lump sum could change if it earned the entered discount rate while funding the same pension withdrawals.'}
          howItWorks={'For each year through the entered life expectancy, annual pension = monthly pension × 12 × COLA growth. Each annual payment is discounted by the entered discount rate to calculate pension present value. The model also compounds the lump sum at that rate and subtracts the annual pension. Break-even age is when cumulative nominal pension payments first exceed the original lump sum.'}
          tipsSection={'The discount rate is a valuation assumption, not a guaranteed investment return. Survivor benefits, plan funding, PBGC coverage, taxes, annuity form, health and longevity uncertainty can change the decision materially.'}
          conclusion={'Present value above or below the lump sum does not by itself determine which option is appropriate. Review the pension plan’s actual election forms and consider professional retirement/tax advice before an irrevocable choice.'}
          benefits={[
            {title:"Calculator-specific methodology",text:"The explanation above follows the formulas and assumptions used by this ToolTrio calculator."},
            {title:"Scenario planning",text:"Change inputs to see how the modeled result responds; do not treat scenario outputs as guaranteed outcomes."},
          ]}
          useCases={[
            {title:"Check assumptions",text:"Use the methodology and limitations to understand what is included before relying on an output."},
            {title:"Compare scenarios",text:"Test realistic alternatives using the same calculation model."},
          ]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid"
          links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}
        />
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
