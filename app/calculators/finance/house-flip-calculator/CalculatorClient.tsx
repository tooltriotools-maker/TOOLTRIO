'use client'
import { calculateRealEstateFlip } from '@/lib/calculations/finance'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'

interface Props { faqs:{question:string;answer:string}[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }

export default function CalculatorClient({faqs,relatedCalculators}:Props) {
  const [purchasePrice, setPurchasePrice] = useState(185000)
  const [rehabCost, setRehabCost] = useState(45000)
  const [arvSalePrice, setArvSalePrice] = useState(295000)
  const [holdingMonths, setHoldingMonths] = useState(6)
  const [loanRate, setLoanRate] = useState(12)
  const [downPercent, setDownPercent] = useState(20)

  const result = useMemo(()=>{
    try{return calculateRealEstateFlip(purchasePrice, rehabCost, holdingMonths, arvSalePrice, 6, loanRate, downPercent)}catch(e){return null}
  },[purchasePrice, rehabCost, arvSalePrice, holdingMonths, loanRate, downPercent])

  return (
    <CalculatorLayout title="House Flip Calculator USA 2026 — Fix & Flip ROI" description="Calculate gross profit, ROI, annualized return, and 70% rule compliance on any house flip project including financing, holding, and selling costs." icon="🏗️" category="Finance" relatedCalculators={relatedCalculators} slug="house-flip-calculator">
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
            <label className="text-xs font-medium text-gray-600">Rehab Cost ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={rehabCost} onChange={e=>setRehabCost(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">After Repair Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={arvSalePrice} onChange={e=>setArvSalePrice(Number(e.target.value))} step={5000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Hold Time (months)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={holdingMonths} onChange={e=>setHoldingMonths(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">months</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Hard Money Rate (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={loanRate} onChange={e=>setLoanRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Down Payment (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={downPercent} onChange={e=>setDownPercent(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4" data-pdf-results>
          {result ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Total Project Cost" value={result ? `${Number(result.totalCost).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} highlight />
                <ResultCard label="Gross Profit" value={result ? `${Number(result.grossProfit).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="Cash Invested" value={result ? `${Number(result.cashInvested).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
                <ResultCard label="ROI" value={result ? `${Number(result.roi).toFixed(1)}%` : "—"} />
                <ResultCard label="Annualized ROI" value={result ? `${Number(result.annualizedROI).toFixed(1)}%` : "—"} />
                <ResultCard label="70% Rule Max Offer" value={result ? `${Number(result.the70Rule).toLocaleString(undefined,{maximumFractionDigits:0})}` : "—"} />
              </div>

              <Card>
                <h2 className="text-lg font-black text-gray-900 mb-3">🏗️ About This Calculator</h2>
                <p className="text-sm text-gray-600 leading-relaxed">House flipping profitability comes down to the purchase price, rehab estimate, and how fast you can execute. The 70% rule is a quick filter — anything you pay more than 70% of ARV minus repairs will likely not profit. This calculator models every cost layer including financing, holding, and selling to show your true net profit and annualized return.</p>
              </Card>
            </>
          ):(
            <Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>
          )}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent
          title={undefined}
          category="finance"
          intro={'This fix-and-flip calculator combines purchase price, rehab, financing, holding and selling costs to estimate gross profit, cash-on-cash ROI and annualized ROI. It also shows a 70%-rule screening price.'}
          howItWorks={'Loan amount = purchase price − down payment. Holding costs include interest-only financing plus a built-in 1.5% annual property-cost allowance. Selling costs use a fixed 6% agent commission plus 2% other selling costs. Gross profit = ARV sale price − total modeled cost. The 70% rule output = 70% of ARV − rehab cost.'}
          tipsSection={'The 6% commission is currently hard-coded in the client call, so it is not a market quote. A longer holding period raises modeled interest/property costs and reduces annualized ROI. Taxes, permits, utilities, lender points and rehab overruns can materially change a real project.'}
          conclusion={'The 70% rule is only a screening heuristic. Base an acquisition decision on property-specific bids, financing terms, local transaction costs and a contingency budget.'}
          benefits={[
            {title:"Calculator-specific methodology",text:"The explanation above follows the formulas and assumptions used by this ToolTrio calculator."},
            {title:"Scenario planning",text:"Change inputs to see how the modeled result responds; do not treat scenario outputs as guaranteed outcomes."},
          ]}
          useCases={[
            {title:"Check assumptions",text:"Use the methodology and limitations to understand what is included before relying on an output."},
            {title:"Compare scenarios",text:"Test realistic alternatives using the same calculation model."},
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
