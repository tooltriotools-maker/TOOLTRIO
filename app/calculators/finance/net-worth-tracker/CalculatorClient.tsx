'use client'
import { calculateNetWorthSnapshot } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [cashAsset, setCashAsset] = useState(15000)
  const [invAsset, setInvAsset] = useState(85000)
  const [retAsset, setRetAsset] = useState(120000)
  const [reAsset, setReAsset] = useState(95000)
  const [mortgageLiab, setMortgageLiab] = useState(280000)
  const [studentLoanLiab, setStudentLoanLiab] = useState(28000)
  const [creditCardLiab, setCreditCardLiab] = useState(4500)

  const result = useMemo(()=>{
    try{return calculateNetWorthSnapshot({cash:cashAsset,investments:invAsset,retirement:retAsset,realEstate:reAsset,vehicles:15000,other:5000},{mortgage:mortgageLiab,studentLoans:studentLoanLiab,carLoans:0,creditCards:creditCardLiab,otherDebt:0})}catch(e){return null}
  },[cashAsset, invAsset, retAsset, reAsset, mortgageLiab, studentLoanLiab, creditCardLiab])

  return (
    <CalculatorLayout title="Net Worth Calculator USA 2026 — Assets, Liabilities & Percentile" description="Calculate your complete net worth by entering all assets and liabilities. See your US net worth percentile, debt-to-asset ratio, and financial health snapshot." icon="💎" category="Finance" relatedCalculators={relatedCalculators} slug="net-worth-tracker">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Cash & Savings ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={cashAsset} onChange={e=>setCashAsset(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Investment Portfolio ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={invAsset} onChange={e=>setInvAsset(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Retirement Accounts ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={retAsset} onChange={e=>setRetAsset(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Real Estate Equity ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={reAsset} onChange={e=>setReAsset(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Mortgage Balance ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={mortgageLiab} onChange={e=>setMortgageLiab(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Student Loans ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={studentLoanLiab} onChange={e=>setStudentLoanLiab(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Credit Card Debt ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={creditCardLiab} onChange={e=>setCreditCardLiab(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Assets" value={result ? `${Number(result.totalAssets).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Total Liabilities" value={result ? `${Number(result.totalLiabilities).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Net Worth" value={result ? `${Number(result.netWorth).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="US Median Net Worth" value={result ? `${Number(result.medianUSNetWorth).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Your Percentile (est.)" value={result ? `${Number(result.percentileEst).toFixed(1)}%` : "—"} />
                <ResultCard label="Financial Health" value={result ? String(result.health) : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">💎 About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">Net worth is the most comprehensive single measure of financial health — total assets minus total liabilities. The median US household has $192,700 in net worth (2022 data). This calculator gives you your complete snapshot including assets, liabilities, debt-to-asset ratio, estimated US percentile, and a financial health assessment — all instantly, completely private.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title='Net Worth Tracker'
          category="finance"
          intro={'This calculator creates a balance-sheet snapshot by adding the asset categories in the model and subtracting mortgage, student-loan and credit-card balances. It also shows liquidity and debt-to-asset indicators.'}
          howItWorks={'Net worth = total assets − total liabilities. Liquid assets are cash plus taxable investments. Debt-to-asset ratio = liabilities ÷ assets. The current client also includes fixed $15,000 of vehicle value and $5,000 of other assets, while car-loan and other-debt values are fixed at zero.'}
          tipsSection={'If you enter $315,000 across the visible asset fields, remember the model adds $20,000 of hidden vehicle/other assets. The displayed US percentile is a coarse ToolTrio bucket estimate, not a statistical percentile calculation. The Federal Reserve reported 2022 real median family net worth of $192,900; that is historical survey data, not a 2026 median.'}
          conclusion={'Net worth is useful for tracking your own trend, but it does not measure cash flow, retirement readiness or creditworthiness. Review hidden/default categories before relying on the total.'}
          benefits={[
            {title:"Calculator-specific methodology",text:"The explanation above follows the formulas and assumptions used by this ToolTrio calculator."},
            {title:"Scenario planning",text:"Change inputs to see how the modeled result responds; do not treat scenario outputs as guaranteed outcomes."},
          ]}
          useCases={[
            {title:"Check assumptions",text:"Use the methodology and limitations to understand what is included before relying on an output."},
            {title:"Compare scenarios",text:"Test realistic alternatives using the same calculation model."},
          ]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs} />
      </div>
    </CalculatorLayout>
  )
}
