'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateEstateTaxByState } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [grossEstate,setGrossEstate]=useState(4000000)
  const result=useMemo(()=>{try{return calculateEstateTaxByState(grossEstate,'MA')}catch(e){return null}},[grossEstate])
  return(
    <CalculatorLayout title="State Estate Tax Calculator USA 2026" description="Estimate federal and Massachusetts estate tax exposure from a gross estate value, using the calculator’s simplified exemption-and-rate model." icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="state-estate-tax-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Gross Estate Value ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={grossEstate} onChange={e=>setGrossEstate(Number(e.target.value))} step={100000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Federal Taxable Estate" value={result?`${Number(result.federalTaxable).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"} highlight/>
                <ResultCard label="Federal Estate Tax" value={result?`${Number(result.federalTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="State Estate Tax" value={result?`${Number(result.stateTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Total Tax" value={result?`${Number(result.totalTax).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Net to Heirs" value={result?`${Number(result.netToHeirs).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="State Note" value={result?String(result.stateNote):"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">⚖️ State Estate Tax Calculator USA 2026</h2><p className="text-sm text-gray-600">Estimate federal and Massachusetts estate tax exposure from a gross estate value, using the calculator’s simplified exemption-and-rate model.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="State Estate Tax Calculator USA 2026" category="finance"
          intro={'This planning tool shows how a gross estate can cross two different tax thresholds: the federal estate-tax exclusion and the Massachusetts estate-tax threshold used by this calculator. It is useful for seeing why an estate may have no estimated federal tax but still show state-level exposure. The current calculator models Massachusetts (MA) and should be treated as a simplified screening estimate, not a Form 706 or Massachusetts estate-tax return calculation.'}
          howItWorks={'The calculator sends your gross estate value to its estate-tax function with Massachusetts selected. For 2026, the federal basic exclusion used by the tool is $15,000,000. Federal taxable estate is modeled as max(0, gross estate − $15,000,000), then multiplied by 40%. For Massachusetts, the current function uses a $2,000,000 state threshold and a simplified 16% rate on the amount above that threshold. Real federal and Massachusetts estate-tax computations use credits, deductions, prior taxable gifts, marital/charitable deductions and graduated rules that this simplified model does not reproduce.'}
          tipsSection={'Enter the value of the estate before assuming the calculator has determined an actual tax bill. Gross-estate valuation can include real estate, securities, business interests, insurance proceeds and other property. The result is most useful as a threshold check. Do not treat the flat state-rate estimate as a substitute for the Massachusetts estate-tax computation, and remember that federal filing can depend on adjusted taxable gifts as well as the estate at death.'}
          conclusion={'Use this result to identify whether estate-tax planning deserves closer review, not to prepare a return. The 2026 federal basic exclusion is $15 million, while state rules can apply at much lower estate values. For an actual estate, confirm domicile, deductions, lifetime gifts, portability and the state-specific tax schedule with current federal and state guidance.'}
          caseStudy={{title:'A Massachusetts threshold check',scenario:'An estate is valued at $4,000,000 with no adjustments entered because this tool accepts gross estate value only.',result:'The calculator shows no federal taxable estate under its $15,000,000 federal threshold. Its simplified Massachusetts model treats $2,000,000 as above the state threshold and applies its modeled state rate.',takeaway:'The useful signal is the mismatch between federal and state thresholds; the displayed state tax is a planning estimate, not a filed-return calculation.'}}
          scienceSection={'Primary reference: [IRS estate-tax guidance](https://www.irs.gov/businesses/small-businesses-self-employed/whats-new-estate-and-gift-tax) confirms a $15,000,000 basic exclusion amount for 2026. The calculator’s Massachusetts state computation is intentionally simplified and should be checked against current Massachusetts Department of Revenue rules before relying on a dollar amount.'}
          benefits={[{title:'Federal threshold check',text:'Shows the portion of the entered estate above the calculator’s 2026 federal exclusion.'},{title:'State exposure screen',text:'Highlights that Massachusetts estate-tax exposure may arise even when the federal estimate is zero.'},{title:'Net-to-heirs estimate',text:'Subtracts the calculator’s modeled federal and state tax amounts from the gross estate.'}]}
          useCases={[{title:'Estate planning conversation',text:'Use the threshold result to decide what questions to bring to an estate-planning attorney or tax professional.'},{title:'Domicile-sensitive planning',text:'State estate tax depends on state law and domicile; the current UI specifically models Massachusetts rather than every state listed in the underlying function.'}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
