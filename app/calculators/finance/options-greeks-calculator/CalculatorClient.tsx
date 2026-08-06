'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateStockOptionBlackScholes } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [stockPrice,setStockPrice]=useState(185)
  const [strikePrice,setStrikePrice]=useState(190)
  const [daysToExpiry,setDaysToExpiry]=useState(45)
  const [volatility,setVolatility]=useState(28)
  const [riskFreeRate,setRiskFreeRate]=useState(5.25)
  const result=useMemo(()=>{try{return calculateStockOptionBlackScholes(stockPrice,strikePrice,daysToExpiry,volatility,riskFreeRate)}catch(e){return null}},[stockPrice, strikePrice, daysToExpiry, volatility, riskFreeRate])
  return(
    <CalculatorLayout title="Options Greeks Calculator USA 2026 — Black-Scholes" description="Calculate option fair value and all Greeks (delta, gamma, theta) using the Black-Scholes model for any stock option." icon="📈" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="options-greeks-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Stock Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={stockPrice} onChange={e=>setStockPrice(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Strike Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={strikePrice} onChange={e=>setStrikePrice(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Days to Expiry</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={daysToExpiry} onChange={e=>setDaysToExpiry(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Implied Volatility (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={volatility} onChange={e=>setVolatility(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Risk-Free Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={riskFreeRate} onChange={e=>setRiskFreeRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Call Price" value={result?`${Number(result.callPrice).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Put Price" value={result?`${Number(result.putPrice).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Delta" value={result?String(result.delta):"-"}/>
                <ResultCard label="Gamma" value={result?String(result.gamma):"-"}/>
                <ResultCard label="Theta (daily decay)" value={result?`${Number(result.theta).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Expected Move (±)" value={result?`${Number(result.impliedMove).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📈 Reading These Greeks</h2><p className="text-sm text-gray-600">This call has a delta of {result?String(result.delta):'-'} — meaning its price should move roughly ${result?String(result.delta):'-'} for every $1 move in the underlying stock, before time decay and volatility shifts.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="Options Greeks Calculator USA 2026 — Black-Scholes"
          category="finance"
          intro={`This calculator prices a stock option and computes its key Greeks — delta, gamma, theta, and implied expected move — using the Black-Scholes model, the standard formula options traders use to estimate an option's fair value.\n\nIt's built for options traders and investors who want to check whether an option's market price looks roughly in line with a theoretical fair value, or who want to understand how sensitive a specific option position is to stock price movement (delta), the rate that sensitivity itself changes (gamma), and time decay (theta) before placing a trade.\n\nThe five inputs — stock price, strike price, days to expiry, implied volatility, and the risk-free rate — are the same five variables the Black-Scholes formula requires, and each one independently affects the option's theoretical price and Greeks in a different way.`}
          howItWorks={`Black-Scholes prices a European-style call option using the formula:\n\nCall Price = S x N(d1) - K x e^(-rT) x N(d2)\n\nWhere S is the stock price, K is the strike price, r is the risk-free rate, T is time to expiry in years, and N() is the cumulative standard normal distribution. d1 and d2 are intermediate terms that incorporate implied volatility and combine the moneyness of the option (how far the stock price is from the strike) with the time and volatility available for that gap to close.\n\nDelta = N(d1) — the model's estimate of how much the option's price changes per $1 move in the stock, and also a rough proxy for the option's probability of expiring in-the-money.\n\nGamma measures how fast delta itself changes as the stock price moves — options near the strike price with little time left tend to have the highest gamma, meaning their delta (and therefore their price sensitivity) can shift quickly.\n\nTheta is the option's estimated daily time decay — how much value it's expected to lose per day, all else being equal, purely from time passing. Theta shown here reflects the call option specifically; puts decay somewhat differently near expiration.\n\nExpected Move is calculated as Stock Price x (Volatility / 100) x sqrt(Time to Expiry in years) — a rough one-standard-deviation range for where the market's implied volatility suggests the stock could land by expiration.`}
          benefits={[
            {title:"Theoretical Fair Value", text:"See both the call and put price the Black-Scholes model estimates, so you can compare it against the option's actual quoted market price."},
            {title:"Delta & Gamma", text:"See how sensitive the option's price is to stock movement right now, and how quickly that sensitivity would change as the stock moves."},
            {title:"Daily Time Decay (Theta)", text:"See roughly how much value the option is expected to lose per day just from time passing, holding the stock price and volatility constant."},
            {title:"Implied Expected Move", text:"See the approximate price range the option market is pricing in for the stock by expiration, based on its implied volatility."},
          ]}
          useCases={[
            {title:"Checking if an option looks cheap or expensive before buying", text:"A trader eyeing a call option compares its quoted ask price against the Black-Scholes theoretical value to get a rough sense of whether it's priced rich or cheap relative to the model, before committing capital."},
            {title:"Sizing a position based on delta", text:"An investor wants to build a specific directional exposure — say, the equivalent of 100 shares — and uses delta to figure out roughly how many option contracts would replicate that exposure."},
            {title:"Estimating time decay before earnings", text:"A trader holding a short-dated option ahead of an earnings report wants to understand how much value theta alone is likely to erode per day if the stock doesn't move, separate from any volatility crush after the announcement."},
          ]}
          mistakesDetailed={[
            {mistake: "Treating the Black-Scholes price as the 'correct' market price", fix: "Black-Scholes is a theoretical model built on simplifying assumptions (no dividends, constant volatility, European exercise) — real option prices reflect actual supply and demand and can deviate from the model, especially around earnings or other known catalysts."},
            {mistake: "Using a stale or guessed volatility number", fix: "The model is highly sensitive to the volatility input — use the option's actual quoted implied volatility from your broker's options chain rather than historical volatility or a rough guess, since even a few percentage points of difference meaningfully changes the output."},
            {mistake: "Assuming theta decay is linear", fix: "Time decay accelerates as expiration approaches — the theta shown here is a snapshot for today's inputs, not a constant daily rate that applies evenly across the option's remaining life."},
            {mistake: "Ignoring dividends on dividend-paying stocks", fix: "This calculator uses the basic Black-Scholes model, which assumes no dividends — for stocks with a meaningful dividend before expiration, actual call prices tend to run lower and put prices higher than the model suggests."},
          ]}
          tipsSection={`Use the implied volatility figure quoted directly on your broker's options chain for the specific contract you're evaluating, not a general estimate — implied volatility varies by strike and expiration (a pattern known as the "volatility skew"), so the same stock can have meaningfully different IV across its option chain.\n\nThe risk-free rate should reflect a short-term Treasury yield roughly matching the option's time to expiry — using the current Fed funds rate or short-term Treasury yield is a reasonable proxy for most retail use cases.`}
          conclusion={`Black-Scholes remains the standard starting point for pricing options and understanding their Greeks, but it's a model, not a guarantee — actual market prices are set by real buyers and sellers and can diverge from theoretical value, particularly for American-style options (which can be exercised early) and stocks with irregular dividends or known upcoming volatility events.\n\nUse the output here as a reference point for evaluating an option's relative pricing and risk sensitivity, not as a prediction of what the option or underlying stock will actually do.`}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
