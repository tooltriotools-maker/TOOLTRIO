'use client'
import { calculateRealEstateInvestment } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [purchasePrice, setPurchasePrice] = useState(350000)
  const [downPercent, setDownPercent] = useState(20)
  const [mortgageRate, setMortgageRate] = useState(7.25)
  const [monthlyRent, setMonthlyRent] = useState(2400)
  const [vacancyRate, setVacancyRate] = useState(5)
  const [expenses, setExpenses] = useState(1.5)
  const [holdYears, setHoldYears] = useState(10)

  const result = useMemo(()=>{
    try{return calculateRealEstateInvestment(purchasePrice, downPercent, mortgageRate, 30, monthlyRent, vacancyRate, expenses, 3.5, holdYears)}catch(e){return null}
  },[purchasePrice, downPercent, mortgageRate, monthlyRent, vacancyRate, expenses, holdYears])

  return (
    <CalculatorLayout title="Rental Property Investment Calculator USA 2026" description="Calculate cap rate, cash-on-cash return, NOI, monthly cash flow, and total return on US rental property investments." icon="🏘️" category="Finance" relatedCalculators={relatedCalculators} slug="rental-property-investment-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Purchase Price ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={purchasePrice} onChange={e=>setPurchasePrice(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Down Payment (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={downPercent} onChange={e=>setDownPercent(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Mortgage Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={mortgageRate} onChange={e=>setMortgageRate(Number(e.target.value))} step={0.25} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Monthly Rent ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={monthlyRent} onChange={e=>setMonthlyRent(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Vacancy Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={vacancyRate} onChange={e=>setVacancyRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Expenses (% of value)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={expenses} onChange={e=>setExpenses(Number(e.target.value))} step={0.1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Hold Years</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)',backdropFilter:'blur(6px)'}}>
              
              <input type="number" value={holdYears} onChange={e=>setHoldYears(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">yrs</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Net Operating Income" value={result ? `${Number(result.noi).toLocaleString(undefined,{maximumFractionDigits:0})} /yr` : "—"} highlight />
                <ResultCard label="Monthly Cash Flow" value={result ? `${Number(result.cashFlow / 12).toLocaleString(undefined,{maximumFractionDigits:0})} /mo` : "—"} />
                <ResultCard label="Cap Rate" value={result ? `${Number(result.capRate).toFixed(1)}%` : "—"} />
                <ResultCard label="Cash-on-Cash Return" value={result ? `${Number(result.cashOnCash).toFixed(1)}%` : "—"} />
                <ResultCard label="Equity at Sale" value={result ? `${Number(result.equity).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Total Return" value={result ? `${Number(result.totalReturn).toFixed(1)}%` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏘️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Rental property returns come from three sources: monthly cash flow (rent minus all expenses and mortgage), equity paydown (each mortgage payment builds equity), and appreciation (historically 3-5% annually). This calculator models all three to show your actual total return, cap rate, and cash-on-cash return — the metrics professional investors use.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Rental Property Investment Calculator USA 2026" category="finance"
          intro="This rental model separates property operating performance from financing: vacancy-adjusted rent and operating expenses produce NOI, while the mortgage determines cash flow and cash-on-cash return. It then adds a fixed 3.5% annual appreciation scenario to estimate sale equity."
          howItWorks="Effective rent = monthly rent × (1 − vacancy%). Operating expenses are modeled as an annual percentage of purchase price. NOI excludes mortgage payments. Annual cash flow subtracts the 30-year amortizing mortgage. Cap rate = NOI ÷ purchase price; cash-on-cash = annual cash flow ÷ down payment. Sale price compounds at 3.5% annually and remaining loan balance is subtracted to estimate equity."
          tipsSection="Build expenses from realistic property tax, insurance, maintenance, management, HOA and reserve estimates. Closing costs, rehab, selling costs, income taxes and depreciation recapture are not included, so the total-return output can overstate net proceeds."
          conclusion="Use cap rate to evaluate the property independent of financing and cash-on-cash return to evaluate the modeled equity investment. Stress-test vacancy, expenses and rent before relying on the result."
          benefits={[
            {title:"Calculator results",text:"Uses the calculator-specific assumptions shown on this page."},
            {title:"100% Private",text:"Everything runs in your browser. No data stored or transmitted."},
            {title:"Available without a paid plan",text:"No account is required to run the calculation."},
          ]}
          useCases={[
            {title:"Personal Planning",text:"Use your own inputs to test this specific calculation."},
            {title:"Scenario Comparison",text:"Change one relevant input at a time and compare the modeled output."},
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
