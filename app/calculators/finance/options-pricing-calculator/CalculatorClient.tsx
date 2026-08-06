'use client'
import { calculateOptionsPremium } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [stockPrice, setStockPrice] = useState(150)
  const [strikePrice, setStrikePrice] = useState(155)
  const [daysToExpiry, setDaysToExpiry] = useState(30)
  const [impliedVolatility, setImpliedVolatility] = useState(30)
  const [riskFreeRate, setRiskFreeRate] = useState(5.25)

  const result = useMemo(()=>{
    try{return calculateOptionsPremium(stockPrice, strikePrice, daysToExpiry, impliedVolatility, riskFreeRate, 'call')}catch(e){return null}
  },[stockPrice, strikePrice, daysToExpiry, impliedVolatility, riskFreeRate])

  return (
    <CalculatorLayout title="Options Pricing Calculator USA 2026 — Black-Scholes" description="Estimate a European-style call option value with the Black-Scholes model, plus delta, time value, break-even and implied move." icon="📈" category="Finance" relatedCalculators={relatedCalculators} slug="options-pricing-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Stock Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={stockPrice} onChange={e=>setStockPrice(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Strike Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={strikePrice} onChange={e=>setStrikePrice(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Days to Expiry</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={daysToExpiry} onChange={e=>setDaysToExpiry(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">days</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Implied Volatility (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={impliedVolatility} onChange={e=>setImpliedVolatility(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Risk-Free Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={riskFreeRate} onChange={e=>setRiskFreeRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Call Price" value={result ? `${Number(result.price).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Intrinsic Value" value={result ? `${Number(result.intrinsicValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Time Value" value={result ? `${Number(result.timeValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Delta" value={result ? String(result.delta) : "—"} />
                <ResultCard label="Break-Even Price" value={result ? `${Number(result.breakEven).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Expected Move (±)" value={result ? `${Number(result.impliedMove).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📈 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">This calculator prices a European-style call option with the Black-Scholes model using stock price, strike, time to expiration, implied volatility and a risk-free rate. It also reports intrinsic value, time value, delta, a simple implied move and the expiration break-even.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Options Pricing Calculator USA 2026 — Black-Scholes" category="finance"
          intro="This calculator prices a European-style call option with the Black-Scholes model using stock price, strike, time to expiration, implied volatility and a risk-free rate. It also reports intrinsic value, time value, delta, a simple implied move and the expiration break-even."
          howItWorks="The function converts days to years, volatility and interest to decimals, calculates d1 and d2, and uses the Black-Scholes call equation C = S·N(d1) − K·e^(−rT)·N(d2). Break-even is strike + theoretical premium. The current UI always prices a call; despite older copy, it does not let the user select a put."
          tipsSection="Implied volatility usually has a large effect on theoretical value. Compare the model price with the market quote, but remember Black-Scholes assumes constant volatility/rates and continuous trading and this implementation does not include dividends."
          conclusion="A theoretical option value is not a prediction of the market price or future profit. American exercise features, dividends, volatility skew, liquidity and transaction costs can make traded prices differ from this simplified model."
          benefits={[
            {title:"Real-Time USA Results",text:"Results update from the calculator inputs and stated assumptions."},
            {title:"100% Private",text:"Everything runs in your browser. No data stored or transmitted."},
            {title:"Free Forever",text:"No signup, no paywall, no hidden costs."},
          ]}
          useCases={[
            {title:"Personal Planning",text:"Model your specific situation with real numbers before making decisions."},
            {title:"Scenario Comparison",text:"Change one variable at a time to understand the impact of each factor."},
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
