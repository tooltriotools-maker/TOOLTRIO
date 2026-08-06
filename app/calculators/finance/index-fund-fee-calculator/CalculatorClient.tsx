'use client'
import { calculateIndexFundFees } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [initialAmount, setInitialAmount] = useState(50000)
  const [annualContrib, setAnnualContrib] = useState(6000)
  const [grossReturn, setGrossReturn] = useState(8)
  const [expenseRatio1, setExpenseRatio1] = useState(0.03)
  const [expenseRatio2, setExpenseRatio2] = useState(1.0)
  const [years, setYears] = useState(30)

  const result = useMemo(()=>{
    try{return calculateIndexFundFees(initialAmount, annualContrib, grossReturn, expenseRatio1, expenseRatio2, years)}catch(e){return null}
  },[initialAmount, annualContrib, grossReturn, expenseRatio1, expenseRatio2, years])

  return (
    <CalculatorLayout title="Index Fund Expense Ratio Fee Calculator" description="Compare two fund expense ratios while holding gross return and annual contributions constant, so you can isolate the long-term effect of recurring fund costs." icon="📉" category="Finance" relatedCalculators={relatedCalculators} slug="index-fund-fee-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Initial Investment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={initialAmount} onChange={e=>setInitialAmount(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualContrib} onChange={e=>setAnnualContrib(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Gross Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={grossReturn} onChange={e=>setGrossReturn(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Low-Fee Fund (% er)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={expenseRatio1} onChange={e=>setExpenseRatio1(Number(e.target.value))} step={0.01} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">High-Fee Fund (% er)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={expenseRatio2} onChange={e=>setExpenseRatio2(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={years} onChange={e=>setYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Low-Fee Balance" value={result ? `${Number(result.lowFeeBalance).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="High-Fee Balance" value={result ? `${Number(result.highFeeBalance).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Projected Fee Drag" value={result ? `${Number(result.feeDifference).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Fee Drag %" value={result ? `${Number(result.feeDragPercent).toFixed(1)}%` : "—"} />
                <ResultCard label="Annual Fee (low)" value={result ? `${Number(result.annualFeeCost1).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Rating" value={result ? String(result.recommendation) : "—"} />
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
                <h2 className="text-lg font-black text-gray-900 mb-3">📉 What This Expense-Ratio Comparison Shows</h2>
                <p className="text-sm text-gray-600 leading-relaxed">This calculator isolates one variable: recurring fund expense ratios. Both projections receive the same starting balance, annual contribution and assumed gross return. The only difference is the fee percentage deducted from that assumed return, so the gap shows modeled fee drag rather than a forecast that one real fund will outperform another.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Index Fund Expense Ratio Fee Calculator" category="finance"
          intro="Compare two mutual fund or ETF expense ratios under identical return and contribution assumptions. This is useful when two investments provide similar exposure and you want to understand how a recurring operating-cost difference can compound over a long holding period."
          howItWorks="For the low-fee projection, Net Return = Gross Return − Low Expense Ratio. For the comparison projection, Net Return = Gross Return − High Expense Ratio. Each year the calculator grows the previous balance by its net return and then adds the annual contribution. The difference between the ending balances is labeled projected fee drag. The model assumes the expense ratio reduces return evenly once per year; real fund expenses accrue through fund operations and real returns vary."
          tipsSection="Worked example using the defaults: $50,000 initially, $6,000 contributed at the end of each modeled year, 8% gross return, 0.03% versus 1.00% expense ratios, and 30 years. The model ends near $1,174,927 for the 0.03% scenario and $947,377 for the 1.00% scenario — a projected gap of about $227,550, or 19.4% of the low-fee ending balance. That example isolates fees; it does not claim the two real-world funds would earn the same gross return."
          conclusion="The SEC notes that fund fees and expenses reduce investment returns and that even small cost differences can create substantial differences over time. But expense ratio is not the only investment consideration. This calculator excludes loads, commissions, bid-ask spreads, advisory fees, taxes, tracking error and differences in holdings or risk. Read the fund prospectus and shareholder reports before comparing actual products."
          benefits={[
            {title:"Isolate Expense-Ratio Drag",text:"Hold gross return constant so the comparison focuses on the cost difference rather than different market forecasts."},
            {title:"See Compounding",text:"Follow the balance gap year by year as lower retained returns compound over the selected horizon."},
            {title:"Test Contributions",text:"See how recurring contributions increase the dollars exposed to each fund's ongoing expense ratio."},
          ]}
          useCases={[
            {title:"Similar-Fund Comparison",text:"Compare cost drag when two funds pursue similar exposure but charge different annual operating expenses."},
            {title:"Retirement Plan Review",text:"Estimate how a higher-cost fund option could affect a long holding period before reviewing the plan's full fee disclosures."},
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
