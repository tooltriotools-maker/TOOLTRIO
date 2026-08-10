'use client'
import { calculateRothConversionLadder } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [iraBalance, setIraBalance] = useState(500000)
  const [currentAge, setCurrentAge] = useState(45)
  const [retirementAge, setRetirementAge] = useState(60)
  const [currentTaxRate, setCurrentTaxRate] = useState(22)
  const [retirementTaxRate, setRetirementTaxRate] = useState(28)
  const [annualConversion, setAnnualConversion] = useState(40000)
  const [returnRate, setReturnRate] = useState(7)

  const result = useMemo(()=>{
    try{return calculateRothConversionLadder(iraBalance, currentAge, retirementAge, currentTaxRate, retirementTaxRate, annualConversion, returnRate)}catch(e){return null}
  },[iraBalance, currentAge, retirementAge, currentTaxRate, retirementTaxRate, annualConversion, returnRate])

  return (
    <CalculatorLayout title="Roth Conversion Ladder Calculator USA 2026" description="Plan systematic Roth IRA conversions to minimize lifetime taxes, model the 5-year ladder for early retirement, and compare vs no conversion." icon="🪜" category="Finance" relatedCalculators={relatedCalculators} slug="roth-conversion-ladder-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">IRA Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={iraBalance} onChange={e=>setIraBalance(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={currentAge} onChange={e=>setCurrentAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Retirement Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={retirementAge} onChange={e=>setRetirementAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={currentTaxRate} onChange={e=>setCurrentTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Retirement Tax Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={retirementTaxRate} onChange={e=>setRetirementTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Conversion ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualConversion} onChange={e=>setAnnualConversion(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Expected Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={returnRate} onChange={e=>setReturnRate(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Converted" value={result ? `${Number(result.totalConverted).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Tax Paid During Conversion" value={result ? `${Number(result.taxPaidNow).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Roth Growth" value={result ? `${Number(result.rothGrowth).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Lifetime Tax Savings" value={result ? `${Number(result.taxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Worth It" value={result ? String(result.worthIt ? 'Yes — convert' : 'Keep pre-tax') : "—"} />
                <ResultCard label="Conversion Years" value={result ? `${Number(result.conversionYears).toLocaleString()} years` : "—"} />
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
                <h2 className="text-lg font-black text-gray-900 mb-3">🪜 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">This calculator models a planned series of Traditional IRA-to-Roth conversions before retirement. It compares tax paid on the conversions with a simplified no-conversion case, then projects Roth and remaining pre-tax balances at the return rate you enter.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Roth Conversion Ladder Calculator USA 2026" category="finance"
          intro="This calculator models a planned series of Traditional IRA-to-Roth conversions before retirement. It compares tax paid on the conversions with a simplified no-conversion case, then projects Roth and remaining pre-tax balances at the return rate you enter."
          howItWorks="The model converts the annual amount until retirement or until the starting IRA balance has been allocated. Tax paid now equals converted dollars × current tax rate. Both converted and unconverted amounts are then grown at the entered return rate; remaining pre-tax money is charged the entered retirement tax rate for the comparison. The projection does not model changing tax brackets, RMDs, Medicare IRMAA, Social Security taxation, or the separate five-year distribution rules."
          tipsSection="Use the annual conversion input as a scenario variable, not a recommended amount. A conversion can raise taxable income and affect other tax items, so compare the calculator with an actual tax projection before executing a conversion."
          conclusion="The output is a simplified tax-rate comparison, not a prediction of lifetime tax savings. Roth conversions are taxable events and the best conversion schedule depends on your full return and retirement-income picture."
          benefits={[
            {title:"Calculator results",text:"Results follow the calculation methodology and assumptions explained on this page."},
            {title:"100% Private",text:"Everything runs in your browser. No data stored or transmitted."},
            {title:"Available without a paid plan",text:"No account is required to run the calculation."},
          ]}
          useCases={[
            {title:"Personal Planning",text:"Use the calculator inputs to test a concrete planning scenario."},
            {title:"Scenario Comparison",text:"Compare the result after changing the input that matters to this calculation."},
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
