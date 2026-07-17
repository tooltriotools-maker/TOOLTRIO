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
    <CalculatorLayout title="State Estate Tax Calculator USA 2026" description="Calculate combined federal and state estate tax — 12 states plus DC have separate estate taxes with lower exemptions than the federal $13.61M." icon="⚖️" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="state-estate-tax-calculator">
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

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">⚖️ State Estate Tax Calculator USA 2026</h2><p className="text-sm text-gray-600">Calculate combined federal and state estate tax — 12 states plus DC have separate estate taxes with lower exemptions than the federal $13.61M.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <SEOContent title="State Estate Tax Calculator USA 2026" category="finance" intro="Calculate combined federal and state estate tax — 12 states plus DC have separate estate taxes with lower exemptions than the federal $13.61M." howItWorks="Enter values for instant 2026 results." tipsSection="Try different scenarios." conclusion="Consult a qualified financial advisor."
          benefits={[{title:"Real-Time",text:"2026 calculations."},{title:"Private",text:"Runs locally."},{title:"Free",text:"No signup."}]}
          useCases={[{title:"Planning",text:"Model your situation."},{title:"Comparison",text:"See impact."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
