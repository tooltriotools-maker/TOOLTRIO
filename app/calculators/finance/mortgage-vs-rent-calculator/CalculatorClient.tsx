'use client'
import { calculateMortgageVsRent } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [homePrice, setHomePrice] = useState(450000)
  const [downPayment, setDownPayment] = useState(90000)
  const [mortgageRate, setMortgageRate] = useState(7.0)
  const [monthlyRent, setMonthlyRent] = useState(2400)
  const [appreciationRate, setAppreciationRate] = useState(3.5)
  const [rentInflation, setRentInflation] = useState(3.5)
  const [years, setYears] = useState(7)

  const result = useMemo(()=>{
    try{return calculateMortgageVsRent(homePrice, downPayment, mortgageRate, monthlyRent, appreciationRate, rentInflation, years, 22)}catch(e){return null}
  },[homePrice, downPayment, mortgageRate, monthlyRent, appreciationRate, rentInflation, years])

  return (
    <CalculatorLayout title="Mortgage vs Rent Calculator USA 2026 — True Cost Comparison" description="Calculate the true total cost of buying vs renting over any time horizon including appreciation, equity buildup, taxes, maintenance, and opportunity cost." icon="⚖️" category="Finance" relatedCalculators={relatedCalculators} slug="mortgage-vs-rent-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Home Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={homePrice} onChange={e=>setHomePrice(Number(e.target.value))} step={10000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Down Payment ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={downPayment} onChange={e=>setDownPayment(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Mortgage Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={mortgageRate} onChange={e=>setMortgageRate(Number(e.target.value))} step={0.125} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Rent ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyRent} onChange={e=>setMonthlyRent(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Appreciation (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={appreciationRate} onChange={e=>setAppreciationRate(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Rent Inflation (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={rentInflation} onChange={e=>setRentInflation(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Years to Compare</label>
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
                <ResultCard label="Monthly Mortgage (P&I)" value={result ? `${Number(result.monthlyMortgage).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} highlight />
                <ResultCard label="Total Monthly Ownership Cost" value={result ? `${Number(result.totalOwningCost).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Home Value at End" value={result ? `${Number(result.homeValueAtEnd).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Equity Built" value={result ? `${Number(result.equityAtEnd).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Cumulative Rent Paid" value={result ? `${Number(result.cumulativeRentPaid).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Buy Net Cost" value={result ? `${Number(result.buyNetCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">⚖️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">The rent vs buy decision is one of the most consequential financial choices Americans make. In 2026 with mortgage rates near 7%, the monthly cost of ownership typically exceeds equivalent rent — making the appreciation, equity buildup, and rent inflation assumptions critical to the long-term comparison. This calculator models the full picture over your specific time horizon.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Mortgage vs Rent Calculator USA 2026 — True Cost Comparison" category="finance"
          intro="This buy-versus-rent model compares cumulative rent with a simplified net cost of owning. Ownership includes a 30-year mortgage plus modeled property tax, insurance and maintenance, then subtracts estimated ending home equity."
          howItWorks="The function assumes property tax of 1.1% of home value yearly, insurance of 0.5%, maintenance of 1%, and a rough mortgage-interest tax benefit. Rent grows at the entered inflation rate and home value compounds at the entered appreciation rate."
          tipsSection="Closing/selling costs, PMI, HOA dues, tax-law limits, major repairs, opportunity cost of the down payment and renter investment returns are not fully modeled."
          conclusion="Use the result as a scenario comparison, not a prediction that buying or renting will be cheaper in your market."
          benefits={[{title:"Methodology-specific results",text:"Results update from the values you enter."},{title:"100% Private",text:"Everything runs locally."},{title:"Available without a paid plan",text:"No account is required to run the calculation."}]}
          useCases={[{title:"Decision support",text:"Model your situation with real numbers."},{title:"Assumption testing",text:"Change inputs to see the impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
