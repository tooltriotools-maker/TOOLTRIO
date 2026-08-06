'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateInvestmentFeeDrag } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [portfolioValue, setPortfolioValue] = useState(100000)
  const [annualContrib, setAnnualContrib] = useState(10000)
  const [grossReturn, setGrossReturn] = useState(8)
  const [years, setYears] = useState(30)

  const result = useMemo(()=>{
    try{return calculateInvestmentFeeDrag(portfolioValue,annualContrib,grossReturn,[0.03,0.25,0.75,1.5],years)}catch(e){return null}
  },[portfolioValue, annualContrib, grossReturn, years])

  return (
    <CalculatorLayout title="Investment Fee Drag Calculator USA 2026 — How Fees Destroy Wealth" description="Calculate the compounding wealth destruction from investment fees. Compare 0.03% index funds vs 1%+ actively managed funds over 10-40 years." icon="📉" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="investment-fee-drag-calculator">
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
            <label className="text-xs font-medium text-gray-600">Annual Contribution ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={annualContrib} onChange={e=>setAnnualContrib(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Gross Market Return (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={grossReturn} onChange={e=>setGrossReturn(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
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
          {result ? (<>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Index Fund (0.03%)" value={result ? `${Number(result.scenarios[0].finalValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Low-Cost (0.25%)" value={result ? `${Number(result.scenarios[1].finalValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Average Active (0.75%)" value={result ? `${Number(result.scenarios[2].finalValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="High-Cost (1.5%)" value={result ? `${Number(result.scenarios[3].finalValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Fee Drag (vs index)" value={result ? `${Number(result.totalDrag).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Recommendation" value={result ? String(result.recommendation) : "—"} />
              </div>

              <Card><h2 className="text-lg font-black text-gray-900 mb-3">📉 About</h2><p className="text-sm text-gray-600">Investment fees appear small but compound into wealth destruction over decades. A 1.5% expense ratio vs 0.03% index fund on a $100,000 portfolio with $10,000 annual contributions costs $297,000 over 30 years — nearly 3 years of contributions lost to fees alone. This calculator makes the true long-term cost of any fee level impossible to ignore.</p></Card>
            </>):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Investment Fee Drag Calculator USA 2026 — How Fees Destroy Wealth" category="finance" intro="Compare how different annual investment fees change the same portfolio over time. The model subtracts each fee rate from the gross return before compounding the starting balance and annual contributions, making the opportunity cost of fees visible."
          howItWorks="For each fee scenario, Net Return = Gross Return − Annual Fee. Each year the calculator grows the existing balance by that net return and then adds the annual contribution. Fee drag is the difference between the lowest-fee scenario and each higher-fee scenario at the end of the selected horizon."
          tipsSection="Compare expense ratios, advisory fees and plan-level fees separately. A fee quoted as a small percentage can still have a large long-run effect because the dollars paid in fees no longer remain invested and compounding."
          conclusion="The SEC notes that fees and expenses reduce the amount of money left in a portfolio to earn returns. This model isolates that effect; it does not predict which investment will outperform or whether a higher-fee service provides other value."
          benefits={[{title:"Methodology",text:"Explains the calculation actually used on this page."},{title:"Scenario planning",text:"Change inputs to see which assumptions drive the result."},{title:"Private",text:"Calculations run locally in your browser."}]}
          useCases={[{title:"Worked scenario",text:"Use realistic inputs and compare the output with the methodology."},{title:"Decision support",text:"Use the result as an estimate, then verify rules, rates or product terms that apply to you."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
