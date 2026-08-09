'use client'
import { calculateRetirementWithdrawal } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [portfolioBalance, setPortfolioBalance] = useState(1200000)
  const [annualWithdrawal, setAnnualWithdrawal] = useState(60000)
  const [investReturn, setInvestReturn] = useState(6.5)
  const [inflationRate, setInflationRate] = useState(3.0)
  const [startAge, setStartAge] = useState(65)

  const result = useMemo(()=>{
    try{return calculateRetirementWithdrawal(portfolioBalance, annualWithdrawal, investReturn, inflationRate, startAge)}catch(e){return null}
  },[portfolioBalance, annualWithdrawal, investReturn, inflationRate, startAge])

  return (
    <CalculatorLayout title="Retirement Withdrawal Calculator USA 2026 — Portfolio Sustainability" description="Calculate how long your retirement portfolio will last based on withdrawal amount, investment return, inflation, and spending. Tests the 4% rule for your numbers." icon="💰" category="Finance" relatedCalculators={relatedCalculators} slug="retirement-withdrawal-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Portfolio Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={portfolioBalance} onChange={e=>setPortfolioBalance(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Withdrawal ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualWithdrawal} onChange={e=>setAnnualWithdrawal(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Investment Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={investReturn} onChange={e=>setInvestReturn(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Inflation Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={inflationRate} onChange={e=>setInflationRate(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Retirement Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={startAge} onChange={e=>setStartAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Sustainable Withdrawal Rate" value={result ? `${Number(result.sustainableRate).toFixed(1)}%` : "—"} highlight />
                <ResultCard label="Safe Annual Amount (4%)" value={result ? `${Number(result.safeWithdrawal).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Portfolio Lasts" value={result ? String(result.depletes ? `Until age ${result.depletionAge}` : '40+ years ✅') : "—"} />
                <ResultCard label="Surplus at 40 Years" value={result ? `${Number(result.surplus).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
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
                <h2 className="text-lg font-black text-gray-900 mb-3">💰 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The 4% rule is the cornerstone of retirement planning — but your actual sustainable withdrawal rate depends on your specific return assumptions, inflation expectations, and retirement horizon. This calculator tests your withdrawal plan against realistic scenarios and shows exactly when (if ever) your portfolio depletes.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Retirement Withdrawal Calculator USA 2026 — Portfolio Sustainability" category="finance"
          intro="This calculator models a retirement portfolio year by year: the balance earns your assumed annual return, then an inflation-adjusted withdrawal is removed. It tests whether a planned starting withdrawal survives a long retirement under one constant-return scenario."
          howItWorks="For year n, withdrawal = starting withdrawal × (1 + inflation)^n. Balance(n+1) = balance(n) × (1 + investment return) − withdrawal(n). The projection stops if the balance reaches zero."
          tipsSection="Treat return and inflation as scenarios, not forecasts. The model does not simulate market volatility or sequence-of-returns risk, so a surviving constant-return path is not a guarantee."
          conclusion="This deterministic illustration omits taxes, account types, fees, Social Security, RMDs, variable spending and year-to-year market returns."
          benefits={[
            {title:"Methodology-specific results",text:"Outputs follow the formulas and assumptions described on this page."},
            {title:"100% Private",text:"Everything runs in your browser. No data stored or transmitted."},
            {title:"Free Forever",text:"No signup, no paywall, no hidden costs."},
          ]}
          useCases={[
            {title:"Decision support",text:"Use your own inputs to evaluate the specific calculation shown here."},
            {title:"Assumption testing",text:"Change the inputs that materially drive this calculator and compare the result."},
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
