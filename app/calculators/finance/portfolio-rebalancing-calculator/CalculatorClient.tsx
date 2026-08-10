'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateRebalancingPortfolio } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [portfolioValue, setPortfolioValue] = useState(250000)
  const [stocksCurrent, setStocksCurrent] = useState(75)
  const [bondsCurrent, setBondsCurrent] = useState(15)
  const [intlCurrent, setIntlCurrent] = useState(10)
  const [stocksTarget, setStocksTarget] = useState(70)
  const [bondsTarget, setBondsTarget] = useState(20)

  const result = useMemo(()=>{
    try{return calculateRebalancingPortfolio({stocks:stocksCurrent,bonds:bondsCurrent,cash:0,international:intlCurrent},{stocks:stocksTarget,bonds:bondsTarget,cash:0,international:100-stocksTarget-bondsTarget},portfolioValue,22)}catch(e){return null}
  },[portfolioValue, stocksCurrent, bondsCurrent, intlCurrent, stocksTarget, bondsTarget])

  return (
    <CalculatorLayout title="Portfolio Rebalancing Calculator USA 2026" description="Calculate exactly what to buy and sell to rebalance your portfolio to target allocation, with tax impact, drift score, and tax-efficient strategy." icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="portfolio-rebalancing-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Portfolio Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={portfolioValue} onChange={e=>setPortfolioValue(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Stocks % (current)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={stocksCurrent} onChange={e=>setStocksCurrent(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Bonds % (current)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={bondsCurrent} onChange={e=>setBondsCurrent(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">International % (current)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={intlCurrent} onChange={e=>setIntlCurrent(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Stock Target %</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={stocksTarget} onChange={e=>setStocksTarget(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Bonds Target %</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={bondsTarget} onChange={e=>setBondsTarget(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Drift Score" value={result ? `${Number(result.driftScore).toFixed(1)}%` : "—"} highlight />
                <ResultCard label="Needs Rebalancing" value={result ? String(result.needsRebalancing ? 'Yes' : 'Within tolerance') : "—"} />
                <ResultCard label="Total Buys" value={result ? `${Number(result.totalBuys).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Sells (taxable)" value={result ? `${Number(result.totalSells).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Estimated Tax Cost" value={result ? `${Number(result.totalTax).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Annual Cost of Drift" value={result ? `${Number(result.annualCostOfDrift).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">⚖️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">This calculator converts current and target asset-allocation percentages into dollar trades for a portfolio value. It is designed to show where the portfolio is overweight or underweight and how large the modeled buy/sell trades would be.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Portfolio Rebalancing Calculator USA 2026" category="finance" intro="This calculator converts current and target asset-allocation percentages into dollar trades for a portfolio value. It is designed to show where the portfolio is overweight or underweight and how large the modeled buy/sell trades would be."
          howItWorks="For each asset class, current dollars = current percentage × portfolio value and target dollars = target percentage × portfolio value. The difference becomes a buy or sell when it exceeds 1% of portfolio value. Drift score is the sum of absolute percentage-point differences. The tax estimate is only a rough assumption: it treats 20% of every taxable sale as gain and multiplies that gain by a hard-coded 22% tax rate from the current UI call."
          tipsSection="Before selling in a taxable account, check cost basis and unrealized gains lot by lot. New contributions, dividends, or trades inside tax-advantaged accounts can sometimes move the allocation toward target without realizing taxable gains."
          conclusion="The trade list is an allocation worksheet, not individualized investment or tax advice. It does not know your actual securities, tax lots, transaction costs, wash sales, or account types."
          benefits={[{title:"Calculator results",text:"Results update from the values you enter."},{title:"100% Private",text:"Everything runs locally."},{title:"Available without a paid plan",text:"No account is required to run the calculation."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation."},{title:"Scenario Comparison",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
