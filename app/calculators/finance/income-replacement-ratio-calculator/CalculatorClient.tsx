'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateIncomeReplacementRatio } from '@/lib/calculations/finance'

interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [preRetirementIncome, setPreRetirementIncome] = useState(95000)
  const [socialSecurity, setSocialSecurity] = useState(2200)
  const [pension, setPension] = useState(0)
  const [portfolioWithdrawal, setPortfolioWithdrawal] = useState(2500)
  const [partTimeIncome, setPartTimeIncome] = useState(0)

  const result = useMemo(()=>{
    try{return calculateIncomeReplacementRatio(preRetirementIncome,socialSecurity*12,pension*12,portfolioWithdrawal*12,partTimeIncome*12,'single')}catch(e){return null}
  },[preRetirementIncome, socialSecurity, pension, portfolioWithdrawal, partTimeIncome])

  return (
    <CalculatorLayout title="Income Replacement Ratio Calculator USA 2026 — Retirement Readiness" description="Calculate your retirement income replacement ratio from all sources — Social Security, pension, portfolio withdrawals, and part-time work. See if you're on track." icon="📊" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="income-replacement-ratio-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Pre-Retirement Annual Income ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={preRetirementIncome} onChange={e=>setPreRetirementIncome(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Social Security (monthly $)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={socialSecurity} onChange={e=>setSocialSecurity(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Pension (monthly $)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={pension} onChange={e=>setPension(Number(e.target.value))} step={50} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Portfolio Withdrawal (monthly $)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={portfolioWithdrawal} onChange={e=>setPortfolioWithdrawal(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Part-Time Income (monthly $)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={partTimeIncome} onChange={e=>setPartTimeIncome(Number(e.target.value))} step={100} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Retirement Income" value={result ? `${Number(result.totalRetirementIncome).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Replacement Ratio" value={result ? `${Number(result.replacementRatio).toFixed(1)}%` : "—"} />
                <ResultCard label="Net Replacement Ratio" value={result ? `${Number(result.netReplacementRatio).toFixed(1)}%` : "—"} />
                <ResultCard label="Income Gap" value={result ? `${Number(result.gap).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Portfolio Needed for Gap" value={result ? `${Number(result.portfolioNeededForGap).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Adequate (70%+ target)" value={result ? String(result.adequate ? 'Yes ✅' : 'No — gap exists') : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">📊 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">This calculator compares projected annual retirement income with your pre-retirement income. It combines Social Security, pension, portfolio withdrawals, and part-time income to show a gross replacement ratio and a simplified after-tax ratio.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Income Replacement Ratio Calculator USA 2026 — Retirement Readiness" category="finance" intro="This calculator compares projected annual retirement income with your pre-retirement income. It combines Social Security, pension, portfolio withdrawals, and part-time income to show a gross replacement ratio and a simplified after-tax ratio."
          howItWorks="Gross replacement ratio = total modeled retirement income ÷ pre-retirement income. The model also assumes a 15% blended tax on retirement income above a standard-deduction amount and assumes working take-home equals 75% of gross pay. Its displayed gap uses an 80% gross-income target and converts that gap to a portfolio estimate using 4%. These are planning assumptions, not universal retirement-income targets."
          tipsSection="Compare the ratio with your expected retirement spending rather than relying on a generic percentage. Housing costs, taxes, healthcare, travel, debt, and savings contributions can make two households with the same salary need very different replacement ratios."
          conclusion="A replacement ratio is a screening metric. A retirement plan should ultimately be built from expected expenses, taxes, income timing, longevity, and portfolio risk."
          benefits={[{title:"Real-Time USA Results",text:"Instant 2026 IRS calculations."},{title:"100% Private",text:"Everything runs locally."},{title:"Free Forever",text:"No signup."}]}
          useCases={[{title:"Personal Planning",text:"Model your situation."},{title:"Scenario Comparison",text:"Change inputs to see impact."}]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
