'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateRealEstateAppreciation } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [purchasePrice, setPurchasePrice] = useState(350000)
  const [purchaseYear, setPurchaseYear] = useState(2018)
  const [currentYear, setCurrentYear] = useState(2026)

  const result = useMemo(()=>{
    try{return calculateRealEstateAppreciation(purchasePrice,purchaseYear,currentYear,'suburban','sfr')}catch(e){return null}
  },[purchasePrice, purchaseYear, currentYear])

  return (
    <CalculatorLayout title="Real Estate Appreciation Calculator USA 2026" description="Calculate how much your home or investment property has appreciated using location and property type specific historical appreciation rates." icon="📈" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="real-estate-appreciation-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Purchase Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={purchasePrice} onChange={e=>setPurchasePrice(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Purchase Year</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={purchaseYear} onChange={e=>setPurchaseYear(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Current Year</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={currentYear} onChange={e=>setCurrentYear(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Current Estimated Value" value={result ? `${Number(result.currentValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Total Appreciation" value={result ? `${Number(result.totalAppreciation).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Appreciation %" value={result ? `${Number(result.appreciationPercent).toFixed(1)}%` : "—"} />
                <ResultCard label="Annual Rate (CAGR)" value={result ? `${Number(result.cagr).toFixed(1)}%` : "—"} />
                <ResultCard label="Inflation-Adj Value" value={result ? `${Number(result.inflationAdjValue).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="10-Year Projection" value={result ? `${Number(result.projectedValue10yr).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>
              {result?.yearData && result.yearData.length > 0 && (
                <Card>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Projection Over Time</h3>
                  <div style={{height:220}}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={result.yearData} margin={{top:5,right:10,left:0,bottom:0}}>
                        <defs><linearGradient id="cgb5x" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0"/>
                        <XAxis dataKey={Object.prototype.hasOwnProperty.call(result.yearData[0] ?? {}, 'age')?"age":Object.prototype.hasOwnProperty.call(result.yearData[0] ?? {}, 'year')?"year":"month"} tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false}/>
                        <YAxis tick={{fill:'#374151',fontSize:10}} axisLine={false} tickLine={false} width={65} tickFormatter={v=>`$${v>=1000000?(v/1000000).toFixed(1)+'M':v>=1000?(v/1000).toFixed(0)+'k':v}`}/>
                        <Tooltip contentStyle={{background:'#fff',border:'1px solid #e5e7eb',borderRadius:10,fontSize:12}} formatter={(v:number)=>[`$${v.toLocaleString()}`,'Value']}/>
                        <Area type="monotone" dataKey={Object.keys(result.yearData[0]||{}).filter(k=>!['year','age','month','creditedRate'].includes(k))[0]||'value'} stroke="#22c55e" strokeWidth={2.5} fill="url(#cgb5x)"/>
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              )}
              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📈 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Real estate appreciation varies dramatically by location — urban properties in gateway cities average 5-6% annually while rural areas average 2-3%. On a $350,000 suburban home purchased in 2018, the estimated 2026 value is approximately $490,000 — a $140,000 gain at 4.5% CAGR. This calculator uses location and property type to give the most accurate appreciation estimate.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title="Real Estate Appreciation Calculator USA 2026"
          category="finance"
          intro="This calculator projects property value using ToolTrio's built-in annual appreciation assumptions by location type and property type. For the current UI scenario, purchase price and purchase year are user inputs while the function applies a preset location/property growth rate. These rates are scenario assumptions, not verified forecasts for a particular city or property."
          howItWorks="Current value = purchase price × (1 + assumed annual appreciation rate)^years. The model also compounds purchase price at a fixed 3.5% inflation assumption and labels the difference between projected market value and that inflation-adjusted amount as 'real appreciation.' Five- and ten-year projections continue the same appreciation rate unchanged."
          tipsSection="Historical appreciation is highly local and uneven. Renovations, land, property condition, supply, interest rates and neighborhood changes are not modeled. The built-in rates—such as 4.5% for a suburban single-family scenario—should be treated as editable-model assumptions even though the current UI does not expose them."
          conclusion="Use the output for scenario planning only. For a purchase, sale or refinance decision, compare against recent local comparable sales and a qualified appraisal rather than relying on a constant national-style growth assumption."
          benefits={[
            { title: "Methodology", text: "See the exact assumptions and calculation sequence used by this ToolTrio model." },
            { title: "Result interpretation", text: "Understand what the outputs mean and which important factors the model leaves out." },
            { title: "Scenario testing", text: "Change the calculator inputs to see which assumptions materially move the result." },
          ]}
          useCases={[
            { title: "Decision comparison", text: "Compare realistic alternatives while keeping the model's assumptions visible." },
            { title: "Assumption check", text: "Use the worked example to verify how the calculator turns inputs into outputs." },
          ]}
          caseStudy={{
            title: "Suburban single-family scenario",
            scenario: "A $350,000 purchase compounded at the model's 4.5% suburban single-family rate for eight years becomes roughly $498,000 before transaction costs or improvements.",
            result: "The calculator separately compounds $350,000 at 3.5% as an inflation benchmark and reports the difference as modeled real appreciation.",
            takeaway: "A constant 4.5% path is mathematically smooth; actual home prices can fall or rise sharply from year to year."
          }}
          commonMistakes="Historical appreciation is highly local and uneven. Renovations, land, property condition, supply, interest rates and neighborhood changes are not modeled. The built-in rates—such as 4.5% for a suburban single-family scenario—should be treated as editable-model assumptions even though the current UI does not expose them."
          inlineLinks={[{ text: "FHFA publishes repeat-sales house-price data; local historical data is more appropriate than a universal appreciation rate.", href: "https://www.fhfa.gov/data/hpi", label: "FHFA House Price Index" }]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
