'use client'
import { calculateEarlyMortgagePayoff } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [balance, setBalance] = useState(320000)
  const [rate, setRate] = useState(6.75)
  const [remainingYears, setRemainingYears] = useState(27)
  const [extraMonthly, setExtraMonthly] = useState(300)
  const [extraAnnual, setExtraAnnual] = useState(2000)

  const result = useMemo(()=>{
    try{return calculateEarlyMortgagePayoff(balance, rate, remainingYears, extraMonthly, extraAnnual)}catch(e){return null}
  },[balance, rate, remainingYears, extraMonthly, extraAnnual])

  return (
    <CalculatorLayout title="Early Mortgage Payoff Calculator USA 2026 — Extra Payment Savings" description="Calculate how much interest you save and how many years you shave off by making extra monthly or annual mortgage payments." icon="🏡" category="Finance" relatedCalculators={relatedCalculators} slug="early-mortgage-payoff-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={balance} onChange={e=>setBalance(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Interest Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={rate} onChange={e=>setRate(Number(e.target.value))} step={0.125} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Remaining Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={remainingYears} onChange={e=>setRemainingYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Extra Monthly Payment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={extraMonthly} onChange={e=>setExtraMonthly(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Extra Annual Payment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={extraAnnual} onChange={e=>setExtraAnnual(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Minimum Monthly Payment" value={result ? `${Number(result.minPayment).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} highlight />
                <ResultCard label="Interest Saved" value={result ? `${Number(result.interestSaved).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Years Saved" value={result ? `${Number(result.yearsSaved).toLocaleString()} years` : "—"} />
                <ResultCard label="New Payoff Months" value={result ? `${Number(result.monthsPaidWithExtra).toLocaleString()} months` : "—"} />
                <ResultCard label="Extra Payment ROI" value={result ? `${Number(result.extraMonthlyROI).toFixed(1)}%` : "—"} />
              </div>
              {result?.yearData && result.yearData.length > 0 && (
                <Card>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Projection Over Time</h3>
                  <div style={{height:220}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.yearData} margin={{top:5,right:10,left:0,bottom:0}}>
                        <defs><linearGradient id="cgb4" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                        <XAxis dataKey={Object.prototype.hasOwnProperty.call(result.yearData[0] ?? {}, 'age')?"age":"year"} tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false}/>
                        <YAxis tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false} width={65} tickFormatter={v=>`$${v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?(v/1000).toFixed(0)+'k':v}`}/>
                        <Tooltip contentStyle={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,fontSize:12}} formatter={(v:number)=>[`$${v.toLocaleString()}`,'Value']}/>
                        <Area type="monotone" dataKey={Object.keys(result.yearData[0]||{}).filter(k=>!['year','age','month'].includes(k))[0]||'value'} stroke="#22c55e" strokeWidth={2.5} fill="url(#cgb4)"/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}
              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏡 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Extra principal payments reduce the balance used to calculate future mortgage interest. This calculator compares your remaining amortization schedule with a schedule that includes the extra monthly and annual principal amounts you enter, so you can see the modeled interest difference and payoff timing.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Early Mortgage Payoff Calculator USA 2026 — Extra Payment Savings" category="finance"
          intro="This calculator compares your remaining mortgage schedule with a schedule that adds an extra monthly amount plus an annual extra payment. It reports the modeled payoff date and interest difference."
          howItWorks="The base payment uses current balance, rate and remaining term. Each month interest is charged on outstanding principal. The accelerated schedule adds the monthly extra and applies the annual extra every twelfth month until the balance reaches zero."
          tipsSection="Extra principal avoids future mortgage interest, but describing it as a interest saving from reducing the loan balance is misleading because taxes, liquidity and alternative uses of cash differ. Confirm extra payments are applied to principal."
          conclusion="The model assumes a fixed-rate loan and unchanged scheduled payment; it does not value tax deductions, investment alternatives, refinancing or escrow."
          benefits={[{title:"Methodology-specific results",text:"Results update from the values you enter."},{title:"100% Private",text:"Everything runs locally."},{title:"Available without a paid plan",text:"No account is required to run the calculation."}]}
          useCases={[{title:"Decision support",text:"Model your situation with real numbers."},{title:"Assumption testing",text:"Change inputs to see the impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
