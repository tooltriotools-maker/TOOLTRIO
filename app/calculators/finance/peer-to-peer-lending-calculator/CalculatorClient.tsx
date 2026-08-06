'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateP2PLendingReturns } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [investAmount, setInvestAmount] = useState(10000)
  const [avgInterestRate, setAvgInterestRate] = useState(10.5)
  const [defaultRate, setDefaultRate] = useState(6)
  const [platformFee, setPlatformFee] = useState(1)
  const [years, setYears] = useState(5)
  const result = useMemo(()=>{try{return calculateP2PLendingReturns(investAmount,avgInterestRate,defaultRate,platformFee,years)}catch(e){return null}},[investAmount, avgInterestRate, defaultRate, platformFee, years])
  return (
    <CalculatorLayout title="Peer-to-Peer Lending Returns Calculator USA 2026" description="Peer-to-Peer Lending Returns Calculator USA 2026" icon="🤝" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="peer-to-peer-lending-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Investamount</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={investAmount} onChange={e=>setInvestAmount(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Avginterestrate</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={avgInterestRate} onChange={e=>setAvgInterestRate(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Defaultrate</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={defaultRate} onChange={e=>setDefaultRate(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Platformfee</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={platformFee} onChange={e=>setPlatformFee(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
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
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Net Return Rate" value={result?`${Number(result.netReturn).toFixed(1)}%`:"-"} highlight />
                <ResultCard label="Final Value" value={result?`${Number(result.finalValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Total Interest" value={result?`${Number(result.totalInterestEarned).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Tax on Interest" value={result?`${Number(result.taxOnInterest).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="After-Tax Value" value={result?`${Number(result.afterTaxValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">🤝 Peer-to-Peer Lending Returns Calculator USA 2026</h2><p className="text-sm text-gray-600">Enter your values above to see Peer To Peer Lending Calculator output using 2026 Calculator methodology and assumptions. All calculations run locally in your browser.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <Card className="space-y-5">
          <section><h2 className="text-xl font-black text-gray-900 mb-2">How Peer-to-Peer Lending Returns Calculator Works</h2><p className="text-sm leading-6 text-gray-700">Net return = stated average interest rate − (default rate × 60% assumed loss-given-default) − platform fee. The model compounds that net rate for the selected years, then applies a fixed 32% tax assumption to modelled interest.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding the Inputs</h2><p className="text-sm leading-6 text-gray-700">Enter invested amount, average borrower interest rate, expected default rate, platform fee and years. Default rate alone is not enough to estimate credit losses; recovery rates and timing of defaults also matter, which is why the code uses a fixed 60% loss severity assumption.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding Your Results</h2><p className="text-sm leading-6 text-gray-700">Net return is the modelled annual rate after default-loss and fee assumptions. Final value assumes that rate compounds smoothly each year. After-tax value uses a fixed 32% tax rate and therefore will not match every investor’s tax treatment.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Worked Example</h2><p className="text-sm leading-6 text-gray-700">Example: 10% gross interest, 5% defaults and a 1% fee gives a modelled net rate of 10% − 3% − 1% = 6%, because the calculator assumes 60% loss severity on defaults.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Important Assumptions and Limitations</h2><p className="text-sm leading-6 text-gray-700">Actual loan portfolios have uneven cash flows, prepayments, collections, recoveries, platform risk, liquidity constraints and changing credit quality. The fixed 32% tax rate and the “100+ notes” diversification message are ToolTrio assumptions, not universal regulatory thresholds.</p></section>
        </Card>
        <SEOContent title="Peer-to-Peer Lending Returns Calculator" category="finance" intro="Estimate a simplified net return for a portfolio of marketplace/P2P loans after assumed borrower defaults and platform fees. The page is designed for scenario comparison, not to forecast a specific platform or note portfolio." howItWorks="Net return = stated average interest rate − (default rate × 60% assumed loss-given-default) − platform fee. The model compounds that net rate for the selected years, then applies a fixed 32% tax assumption to modelled interest." tipsSection="Review the assumptions above before using the result for a real-world decision." conclusion="Use this calculator as an educational estimate, not individualized financial, tax, legal, insurance or investment advice."
          benefits={[{title:"Specific methodology",text:"The page explains the exact assumptions used by this calculator."},{title:"Scenario testing",text:"Change the inputs to understand which assumptions drive the result."},{title:"Private",text:"Calculations run locally in your browser."}]}
          useCases={[{title:"Planning",text:"Create a baseline scenario before comparing alternatives."},{title:"Sensitivity",text:"Test how the result changes when a major assumption moves."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
