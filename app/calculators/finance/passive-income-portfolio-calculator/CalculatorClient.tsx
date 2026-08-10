'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculatePassiveIncomePortfolio } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [targetMonthlyIncome, setTargetMonthlyIncome] = useState(5000)
  const [dividendYield, setDividendYield] = useState(3.5)
  const [rentalYield, setRentalYield] = useState(6)
  const [bondYield, setBondYield] = useState(4.5)
  const [divAlloc, setDivAlloc] = useState(50)

  const result = useMemo(()=>{
    try{return calculatePassiveIncomePortfolio(targetMonthlyIncome,dividendYield,rentalYield,bondYield,{dividends:divAlloc,rental:20,bonds:20,other:100-divAlloc-20-20})}catch(e){return null}
  },[targetMonthlyIncome, dividendYield, rentalYield, bondYield, divAlloc])

  return (
    <CalculatorLayout title="Passive Income Portfolio Calculator USA 2026" description="Calculate how large your dividend, rental, and bond portfolio needs to be to generate any target monthly passive income. Model the path to financial independence." icon="💰" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="passive-income-portfolio-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Target Monthly Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={targetMonthlyIncome} onChange={e=>setTargetMonthlyIncome(Number(e.target.value))} step={250} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Dividend Yield (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={dividendYield} onChange={e=>setDividendYield(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Rental Yield (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={rentalYield} onChange={e=>setRentalYield(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Bond Yield (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={bondYield} onChange={e=>setBondYield(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Dividend Allocation (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={divAlloc} onChange={e=>setDivAlloc(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Portfolio Needed" value={result ? `${Number(result.portfolioNeeded).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Blended Yield" value={result ? `${Number(result.blendedYield).toFixed(1)}%` : "—"} />
                <ResultCard label="Dividend Portfolio Needed" value={result ? `${Number(result.dividendPortfolio).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Rental Equity Needed" value={result ? `${Number(result.rentalEquity).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Annual Tax on Income" value={result ? `${Number(result.taxOnIncome).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Monthly (after tax)" value={result ? `${Number(result.netMonthlyIncome).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💰 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">This calculator works backward from a target monthly cash-flow amount to an estimated portfolio size. It blends the dividend, rental, bond, and 'other' allocations you enter and divides annual target income by that blended yield.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Passive Income Portfolio Calculator USA 2026" category="finance" intro="This calculator works backward from a target monthly cash-flow amount to an estimated portfolio size. It blends the dividend, rental, bond, and 'other' allocations you enter and divides annual target income by that blended yield."
          howItWorks="Blended yield is the allocation-weighted average of the entered dividend, rental, and bond yields, with the model assigning 4% to the residual 'other' allocation. Required portfolio = annual target income ÷ blended yield. The page then allocates that required capital across the modeled asset buckets and applies a flat 15% tax assumption to all target income. Actual dividend, rental, REIT, and bond taxation differs, and yields can fall or distributions can be cut."
          tipsSection="Stress-test lower yields as well as higher ones. A higher stated yield reduces the calculated capital requirement, but high yield can come with higher credit, concentration, property, distribution-cut, or principal-loss risk."
          conclusion="The result estimates capital required under a yield assumption; it does not establish a safe withdrawal rate or guarantee that the portfolio can maintain the target income."
          benefits={[{title:"Calculator results",text:"Results update from the values you enter."},{title:"100% Private",text:"Everything runs locally."},{title:"Available without a paid plan",text:"No account is required to run the calculation."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation."},{title:"Scenario Comparison",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
