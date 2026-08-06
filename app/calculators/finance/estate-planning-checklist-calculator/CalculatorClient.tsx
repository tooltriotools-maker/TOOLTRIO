'use client'
import {useState,useMemo} from 'react'
import {AreaChart,Area,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {CalculatorLayout} from '@/components/ui/CalculatorLayout'
import {InternalLinks} from '@/components/ui/InternalLinks'
import {Card,ResultCard} from '@/components/ui/Card'
import {FAQSection} from '@/components/ui/FAQSection'
import {SEOContent} from '@/components/ui/SEOContent'
import { calculateEstatePlanningChecklist } from '@/lib/calculations/finance'
interface Props{faqs:{question:string;answer:string}[];structuredData:object[];relatedCalculators?:{name:string;href:string;icon:string;desc:string}[]}
export default function CalculatorClient({faqs,structuredData,relatedCalculators}:Props){
  const [age, setAge] = useState(45)
  const [netWorth, setNetWorth] = useState(750000)
  const [hasWill, setHasWill] = useState(1)
  const [hasTrust, setHasTrust] = useState(0)
  const [hasPOA, setHasPOA] = useState(1)
  const [hasHealthcareDirective, setHasHealthcareDirective] = useState(1)
  const [hasBeneficiaryDesignations, setHasBeneficiaryDesignations] = useState(1)
  const [dependents, setDependents] = useState(2)
  const [lifeInsuranceCoverage, setLifeInsuranceCoverage] = useState(500000)
  const result=useMemo(()=>{try{return calculateEstatePlanningChecklist(age,netWorth,hasWill>0,hasTrust>0,hasPOA>0,hasHealthcareDirective>0,hasBeneficiaryDesignations>0,lifeInsuranceCoverage,dependents)}catch(e){return null}},[age, netWorth, hasWill, hasTrust, hasPOA, hasHealthcareDirective, hasBeneficiaryDesignations, dependents, lifeInsuranceCoverage])
  return(
    <CalculatorLayout title="Estate Planning Readiness Calculator USA 2026" description="Score your estate planning readiness across will, trust, power of attorney, healthcare directive, and beneficiary designations." icon="📋" category="Finance" structuredData={structuredData} relatedCalculators={relatedCalculators} slug="estate-planning-checklist-calculator">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 h-fit space-y-3">
          <h2 className="text-sm font-semibold text-green-600 uppercase tracking-wider">Enter Your Details</h2>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Your Age</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={age} onChange={e=>setAge(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              <span className="text-gray-400 text-sm">yrs</span>
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Net Worth ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={netWorth} onChange={e=>setNetWorth(Number(e.target.value))} step={25000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Has Will (1=yes)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={hasWill} onChange={e=>setHasWill(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Has Living Trust (1=yes)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={hasTrust} onChange={e=>setHasTrust(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Has Power of Attorney (1=yes)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={hasPOA} onChange={e=>setHasPOA(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Has Healthcare Directive (1=yes)</label><div className="flex items-center gap-2 border rounded-xl px-3 py-2"><input type="number" min="0" max="1" value={hasHealthcareDirective} onChange={e=>setHasHealthcareDirective(Number(e.target.value))} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/></div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Beneficiary Designations Reviewed (1=yes)</label><div className="flex items-center gap-2 border rounded-xl px-3 py-2"><input type="number" min="0" max="1" value={hasBeneficiaryDesignations} onChange={e=>setHasBeneficiaryDesignations(Number(e.target.value))} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/></div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Number of Dependents</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={dependents} onChange={e=>setDependents(Number(e.target.value))} step={1} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              
            </div></div>
          <div className="space-y-1"><label className="text-xs font-medium text-gray-600">Life Insurance Coverage ($)</label>
            <div className="flex items-center gap-2 border rounded-xl px-3 py-2" style={{background:'rgba(248,250,248,0.8)',borderColor:'rgba(226,232,240,0.7)'}}>
              
              <input type="number" value={lifeInsuranceCoverage} onChange={e=>setLifeInsuranceCoverage(Number(e.target.value))} step={50000} className="bg-transparent text-gray-900 font-semibold w-full outline-none text-right"/>
              </div></div>
        </Card>
        <div className="lg:col-span-2 space-y-4">
          {result?(<>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <ResultCard label="Readiness Score" value={result?`${Number(result.readinessPercent).toFixed(1)}%`:"-"} highlight/>
                <ResultCard label="Gaps Found" value={result?String(result.urgentGaps):"-"}/>
                <ResultCard label="Est. Cost to Complete" value={result?`${Number(result.costEstimate).toLocaleString(undefined,{maximumFractionDigits:0})}`:"-"}/>
                <ResultCard label="Next Priority" value={result?String(result.nextStep):"-"}/>
            </div>

            <Card><h2 className="text-lg font-black text-gray-900 mb-2">📋 Estate Planning Readiness Calculator USA 2026</h2><p className="text-sm text-gray-600">Score your estate planning readiness across will, trust, power of attorney, healthcare directive, and beneficiary designations.</p></Card>
          </>):(<Card><p className="text-gray-500 text-center py-8">Fill in your details to see results →</p></Card>)}
        </div>
      </div>
      <div className="mt-8">
        <Card className="space-y-5">
          <section><h2 className="text-xl font-black text-gray-900 mb-2">How Estate Planning Readiness Score Calculator Works</h2><p className="text-sm leading-6 text-gray-700">The underlying score gives one point each for a will, qualifying trust condition, durable power of attorney, healthcare directive and beneficiary-designation review. It also flags a separate life-insurance heuristic when dependents are entered.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding the Inputs</h2><p className="text-sm leading-6 text-gray-700">Answer whether you have each core planning item and enter net worth, dependents and life-insurance coverage for context. A trust is not automatically necessary merely because net worth crosses a dollar threshold; needs depend on assets, state law and planning goals.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Understanding Your Results</h2><p className="text-sm leading-6 text-gray-700">Readiness percentage is completed checklist points divided by five. “Gaps found” counts high-priority checklist omissions. The cost estimate is only a ToolTrio placeholder based on $800 per flagged gap and is not a legal-services quote.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Worked Example</h2><p className="text-sm leading-6 text-gray-700">Example: if four of five checklist items are present, the score is 80%. The missing item becomes the next displayed priority; that does not determine whether the document is legally required in your state.</p></section>
          <section><h2 className="text-xl font-black text-gray-900 mb-2">Important Assumptions and Limitations</h2><p className="text-sm leading-6 text-gray-700">Estate planning is state-law dependent. Document validity, probate exposure, trust design, tax planning, guardianship and beneficiary coordination require facts this checklist does not collect. The cost estimate and insurance heuristic are not professional recommendations.</p></section>
        </Card>
        <SEOContent title="Estate Planning Readiness Score Calculator" category="finance" intro="Use a five-item checklist to identify missing estate-planning documents and beneficiary reviews. The score is an organizational prompt, not a legal assessment of whether an estate plan is valid or complete." howItWorks="The underlying score gives one point each for a will, qualifying trust condition, durable power of attorney, healthcare directive and beneficiary-designation review. It also flags a separate life-insurance heuristic when dependents are entered." tipsSection="Review the assumptions above before using the result for a real-world decision." conclusion="Use this calculator as an educational estimate, not individualized financial, tax, legal, insurance or investment advice."
          benefits={[{title:"Specific methodology",text:"The page explains the exact assumptions used by this calculator."},{title:"Scenario testing",text:"Change the inputs to understand which assumptions drive the result."},{title:"Private",text:"Calculations run locally in your browser."}]}
          useCases={[{title:"Planning",text:"Create a baseline scenario before comparing alternatives."},{title:"Sensitivity",text:"Test how the result changes when a major assumption moves."}]}/>
        <InternalLinks title="Related Finance Calculators" variant="grid" links={relatedCalculators?.map(r=>({name:r.name,href:r.href,icon:r.icon,desc:r.desc}))||[]}/>
        <FAQSection faqs={faqs}/>
      </div>
    </CalculatorLayout>
  )
}
