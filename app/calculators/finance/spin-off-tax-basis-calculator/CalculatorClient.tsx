'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateSpinOffTaxBasis } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [originalShares, setOriginalShares] = useState(200)
  const [originalCostBasis, setOriginalCostBasis] = useState(18000)
  const [spinOffAllocationPercent, setSpinOffAllocationPercent] = useState(35)
  const [spinOffSharesReceived, setSpinOffSharesReceived] = useState(100)
  const [spinOffFMV, setSpinOffFMV] = useState(25)
  const [parentFMVAfter, setParentFMVAfter] = useState(85)
  const result=useMemo(()=>{try{return calculateSpinOffTaxBasis(originalShares,originalCostBasis,spinOffAllocationPercent,spinOffSharesReceived,spinOffFMV,parentFMVAfter)}catch(e){return null}},[originalShares, originalCostBasis, spinOffAllocationPercent, spinOffSharesReceived, spinOffFMV, parentFMVAfter])
  return(
    <CalculatorLayout title="Spin-Off Tax Basis Calculator USA 2026" description="Calculate adjusted cost basis allocation between parent company and spin-off shares for tax purposes." icon="📈" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="spin-off-tax-basis-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Original Shares Owned</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={originalShares} onChange={e=>setOriginalShares(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Original Cost Basis ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              <span className="text-green-600 text-sm">$</span>
              <input type="number" value={originalCostBasis} onChange={e=>setOriginalCostBasis(Number(e.target.value))} step={500} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Spin-Off Allocation (%)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={spinOffAllocationPercent} onChange={e=>setSpinOffAllocationPercent(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">%</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Spin-Off Shares Received</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={spinOffSharesReceived} onChange={e=>setSpinOffSharesReceived(Number(e.target.value))} step={5} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Spin-Off FMV ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={spinOffFMV} onChange={e=>setSpinOffFMV(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Parent FMV After ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={parentFMVAfter} onChange={e=>setParentFMVAfter(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Basis Allocated to Spin-Off" value={result?`${Number(result.allocatedToSpinOff).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Basis Remaining in Parent" value={result?`${Number(result.allocatedToParent).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Spin-Off Cost Basis/Share" value={result?`${Number(result.spinOffCostBasisPerShare).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Parent Cost Basis/Share" value={result?`${Number(result.parentCostBasisPerShare).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Spin-Off FMV Total" value={result?`${Number(result.spinOffFMVTotal).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📈 Spin-Off Tax Basis Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate adjusted cost basis allocation between parent company and spin-off shares for tax purposes.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="Spin-Off Tax Basis Calculator" category="finance"
          intro="Allocates an existing stock cost basis between parent and spun-off shares using the allocation percentage you enter, then calculates per-share basis for each position."
          howItWorks="Spin-off basis = original basis × entered allocation percentage. Parent basis is the remainder. Each allocated amount is divided by its respective share count to produce per-share basis. FMV fields are displayed for context but the entered allocation percentage controls the calculation."
          tipsSection="Worked example — Example: an $18,000 original basis with a 35% spin-off allocation assigns $6,300 to the new shares and $11,700 to the parent before dividing by share counts."
          conclusion="Important assumptions and limitations — Use the issuer’s tax-basis allocation materials and your broker records. Not every corporate separation is tax-free, and the calculator does not determine Section 355 qualification or derive the allocation percentage from FMV automatically."
          benefits={[
            {title:"What the inputs mean",text:"Use the fields above to model the specific amounts, rates, ages or time horizon described for this calculator."},
            {title:"How to read the results",text:"Treat the outputs as scenario estimates and focus on which assumptions drive the result most strongly."},
            {title:"Decision support",text:"Compare realistic scenarios rather than treating a single result as a prediction or professional recommendation."},
          ]}
          useCases={[
            {title:"Worked scenario",text:"Start with the default example, then replace each input with values that match the situation you are evaluating."},
            {title:"Assumption check",text:"Review the methodology and limitations before relying on the result for a financial, tax, benefit or investment decision."},
          ]}
        />
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
