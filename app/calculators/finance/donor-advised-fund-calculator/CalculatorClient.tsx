'use client'
import { useState, useMemo } from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { CalculatorLayout } from '@/components/ui/CalculatorLayout'
import { InternalLinks } from '@/components/ui/InternalLinks'
import { Card, ResultCard } from '@/components/ui/Card'
import { FAQSection } from '@/components/ui/FAQSection'
import { SEOContent } from '@/components/ui/SEOContent'
import { calculateDonorAdvisedFund } from '@/lib/calculations/finance'
interface Props { faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[] }
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props) {
  const [contributionAmount, setContributionAmount] = useState(50000)
  const [appreciatedStockBasis, setAppreciatedStockBasis] = useState(15000)
  const [currentMarketValue, setCurrentMarketValue] = useState(50000)
  const [taxRate, setTaxRate] = useState(35)
  const [annualGrantPercent, setAnnualGrantPercent] = useState(5)
  const result = useMemo(()=>{try{return calculateDonorAdvisedFund(contributionAmount,appreciatedStockBasis,currentMarketValue,taxRate,annualGrantPercent)}catch(e){return null}},[contributionAmount, appreciatedStockBasis, currentMarketValue, taxRate, annualGrantPercent])
  return (
    <CalculatorLayout title="Donor-Advised Fund Calculator USA 2026" description="Donor-Advised Fund Calculator USA 2026" icon="🎁" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="donor-advised-fund-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Cash Contribution</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={contributionAmount} onChange={e=>setContributionAmount(Number(e.target.value))} step={2500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Stock Tax Basis</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={appreciatedStockBasis} onChange={e=>setAppreciatedStockBasis(Number(e.target.value))} step={1000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Stock Market Value</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={currentMarketValue} onChange={e=>setCurrentMarketValue(Number(e.target.value))} step={2500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Federal Marginal Tax Rate</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={taxRate} onChange={e=>setTaxRate(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Annual Grant Rate</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={annualGrantPercent} onChange={e=>setAnnualGrantPercent(Number(e.target.value))} step={0.5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right" />
              <span className="text-gray-400 text-sm">%</span>
            </div>
          </div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Deduction Value" value={result?`${Number(result.deductionValue).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight />
                <ResultCard label="Tax Savings" value={result?`${Number(result.taxSavings).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Cap Gains Avoided" value={result?`${Number(result.capitalGainsAvoided).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Total Tax Benefit" value={result?`${Number(result.totalTaxBenefit).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Net Cost of Giving" value={result?`${Number(result.netCostOfGiving).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} />
                <ResultCard label="Years of Giving" value={result?`${Number(result.yearsOfGiving)} yrs`:"-"} />
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">Understanding these results</h2><p className="text-sm text-gray-600">Compare a cash contribution with a simplified donation of appreciated securities to a donor-advised fund (DAF). The model estimates a charitable-deduction value, assumed income-tax savings, avoided capital-gain tax, annual grants and hypothetical fund growth.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Donor-Advised Fund Tax Benefit Model" category="finance"
          intro="Compare a cash contribution with a simplified donation of appreciated securities to a donor-advised fund (DAF). The model estimates a charitable-deduction value, assumed income-tax savings, avoided capital-gain tax, annual grants and hypothetical fund growth."
          howItWorks="When current market value is above zero, the calculator treats that market value as the donated amount and estimates embedded gain as market value − basis. It assumes 20% capital-gain tax avoided, income-tax savings equal deduction value × entered tax rate, 6% annual fund growth for 10 years, and annual grants equal the initial deduction value × grant percentage."
          tipsSection="The model does not test whether you itemize, AGI deduction limits, holding period, appraisal rules, excess-contribution carryforwards, NIIT, state tax, DAF fees or the sponsoring charity's policies. A DAF contribution is generally irrevocable and the sponsoring organization retains legal control of contributed assets; grants are recommendations subject to its rules."
          conclusion="The useful comparison is the mechanics of donating cash versus appreciated property under the model. Actual deductibility and capital-gain treatment depend on the asset, donor, recipient organization and tax rules, so verify the transaction before contributing."
          benefits={[{title:"Methodology",text:"Explains the exact assumptions used by this ToolTrio model."},{title:"Scenario testing",text:"Change the inputs to see which assumptions drive the result."},{title:"Limitations",text:"Highlights important factors the simplified model does not capture."}]}
          useCases={[{title:"Planning",text:"Build a calculator-specific baseline from your own inputs."},{title:"Sensitivity check",text:"Compare a conservative scenario with a more optimistic one."}]}
          caseStudy={{title:"Worked example",scenario:"Appreciated-stock contribution — Model stock worth $50,000 with a $15,000 basis, a 35% marginal income-tax input and a 5% annual grant rate.",result:"The calculator uses $50,000 as the deduction value, models $35,000 of embedded gain at a 20% capital-gain rate, and separately estimates income-tax savings from the entered 35% rate.",takeaway:"Use the example to understand the calculation flow, then replace every assumption with values relevant to your situation."}} />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
